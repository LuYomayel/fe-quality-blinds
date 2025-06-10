import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;
    const postcode = formData.get("postcode") as string;
    const address = formData.get("address") as string;
    const service = formData.get("service") as string;
    const product = formData.get("product") as string;
    const chatSummary = formData.get("chatSummary") as string;

    // Handle uploaded images
    const images: File[] = [];
    for (const [key, value] of formData.entries()) {
      if (key === "images" && value instanceof File) {
        images.push(value);
      }
    }

    // Here you would typically send an email with all the information
    // For now, we'll just log it
    console.log("Contact form submission received:", {
      name,
      email,
      phone,
      message,
      postcode,
      address,
      service,
      product,
      chatSummary,
      imageCount: images.length,
    });

    // Simulate email sending
    const emailContent = `
New Contact Form Submission from ${name}

Contact Information:
- Name: ${name}
- Email: ${email}
- Phone: ${phone}
- Address: ${address || "Not provided"}
- Postcode: ${postcode || "Not provided"}

Service Request:
- Service: ${service}
- Product: ${product}

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
