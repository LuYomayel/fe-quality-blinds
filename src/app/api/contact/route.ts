import { NextRequest, NextResponse } from "next/server";
import {
  ContactFormSchema,
  sanitizeObject,
  validateUploadedFile,
  checkRateLimit,
  getClientIP,
} from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    // Rate limiting por IP
    const clientIP = getClientIP(req);
    const rateLimit = checkRateLimit(clientIP, 5, 300000); // 5 requests por 5 minutos

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "Too many contact form submissions. Please try again later.",
          resetTime: rateLimit.resetTime,
        },
        { status: 429 }
      );
    }

    const formData = await req.formData();

    // Extraer datos del formulario
    const rawFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || undefined,
      message: formData.get("message") as string,
      postcode: (formData.get("postcode") as string) || undefined,
      address: (formData.get("address") as string) || undefined,
      service: (formData.get("service") as string) || undefined,
      product: (formData.get("product") as string) || undefined,
      chatSummary: (formData.get("chatSummary") as string) || undefined,
    };

    // Validar con zod
    const validationResult = ContactFormSchema.safeParse(rawFormData);

    if (!validationResult.success) {
      console.error(
        "Contact form validation errors:",
        validationResult.error.errors
      );
      return NextResponse.json(
        {
          error: "Invalid form data",
          details: validationResult.error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    // Sanitizar datos validados
    const sanitizedData = sanitizeObject(validationResult.data);

    // Manejar archivos subidos
    const images: File[] = [];
    const fileValidationErrors: string[] = [];

    for (const [key, value] of formData.entries()) {
      if (key === "images" && value instanceof File) {
        const fileValidation = validateUploadedFile(value);
        if (fileValidation.valid) {
          images.push(value);
        } else {
          fileValidationErrors.push(`${value.name}: ${fileValidation.error}`);
        }
      }
    }

    // Si hay errores en archivos, devolverlos
    if (fileValidationErrors.length > 0) {
      return NextResponse.json(
        {
          error: "File validation failed",
          details: fileValidationErrors,
        },
        { status: 400 }
      );
    }

    // Here you would typically send an email with all the information
    // For now, we'll just log it
    console.log("Contact form submission received:", {
      ...sanitizedData,
      imageCount: images.length,
    });

    // Simulate email sending usando datos sanitizados
    const {
      name,
      email,
      phone,
      message,
      postcode,
      address,
      service,
      product,
      chatSummary,
    } = sanitizedData;

    const emailContent = `
New Contact Form Submission from ${name}

Contact Information:
- Name: ${name}
- Email: ${email}
- Phone: ${phone || "Not provided"}
- Address: ${address || "Not provided"}
- Postcode: ${postcode || "Not provided"}

Service Request:
- Service: ${service || "Not specified"}
- Product: ${product || "Not specified"}

Message:
${message}

${images.length > 0 ? `\nAttachments: ${images.length} image(s) uploaded` : ""}

${chatSummary ? `\n--- CHATBOT CONVERSATION SUMMARY ---\n${chatSummary}` : ""}
    `;

    console.log("Contact form email content:", emailContent);

    return NextResponse.json({
      success: true,
      message: "Contact form submitted successfully",
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to process contact form" },
      { status: 500 }
    );
  }
}
