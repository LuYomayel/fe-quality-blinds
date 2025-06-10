import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;
    const postcode = formData.get("postcode") as string;
    const productTypes = JSON.parse(
      (formData.get("productTypes") as string) || "[]"
    );
    const message = formData.get("message") as string;
    const chatSummary = formData.get("chatSummary") as string;

    // Here you would typically send an email with all the information
    // For now, we'll just log it
    console.log("Samples request received:", {
      name,
      email,
      phone,
      address,
      postcode,
      productTypes,
      message,
      chatSummary,
    });

    // Simulate email sending
    const emailContent = `
New Sample Request from ${name}

Contact Information:
- Name: ${name}
- Email: ${email}
- Phone: ${phone}
- Address: ${address}, ${postcode}

Products Requested:
${productTypes.map((product: string) => `- ${product}`).join("\n")}

Additional Message:
${message || "No additional message"}

${chatSummary ? `\n--- CHATBOT CONVERSATION SUMMARY ---\n${chatSummary}` : ""}
    `;

    console.log("Sample request email content:", emailContent);

    return NextResponse.json({
      success: true,
      message: "Sample request submitted successfully",
    });
  } catch (error) {
    console.error("Error processing sample request:", error);
    return NextResponse.json(
      { error: "Failed to process sample request" },
      { status: 500 }
    );
  }
}
