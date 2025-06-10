import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const dynamic = "force-static";
export const revalidate = false;

interface Message {
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

const SUMMARY_CONTEXT = `You are a conversation summarizer for Quality Blinds Australia. 

Your task is to create a concise but comprehensive summary of a chatbot conversation for the company's sales team.

IMPORTANT INSTRUCTIONS:
1. Focus on the customer's NEEDS and PREFERENCES
2. Include specific products mentioned or recommended
3. Note any measurements, room details, or special requirements
4. Highlight the customer's budget concerns or price discussions
5. Mention any urgency or timeline requirements
6. Keep it professional and actionable for the sales team
7. Respond in ENGLISH (the company's internal language)

Format the summary like this:
**CONVERSATION SUMMARY - [DATE]**

**Customer interested in:** [Products/services]
**Room/location:** [Room/location details]
**Measurements mentioned:** [Any measurements]
**Budget discussed:** [Budget/pricing discussions]
**Special needs:** [Special requirements]
**Recommendations given:** [Products recommended]
**Next steps:** [What was agreed/requested]

**Additional notes:** [Any other relevant info]`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Convertir mensajes a texto para analizar
    const conversationText = messages
      .map(
        (msg: Message) =>
          `${msg.type === "user" ? "CLIENTE" : "ASISTENTE"}: ${msg.content}`
      )
      .join("\n\n");

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: SUMMARY_CONTEXT,
        },
        {
          role: "user",
          content: `Generate a professional summary of this chatbot conversation:\n\n${conversationText}`,
        },
      ],
      temperature: 0.2, // Más consistente para resúmenes
      max_tokens: 400,
    });

    return NextResponse.json({
      summary: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error generating conversation summary:", error);
    return NextResponse.json(
      {
        error: "Error generating conversation summary",
        summary:
          "Unable to generate automatic summary. Please review conversation manually.",
      },
      { status: 500 }
    );
  }
}
