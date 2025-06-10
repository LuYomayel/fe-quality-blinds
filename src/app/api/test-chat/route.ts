import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function GET() {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: "Hola, ¿cómo estás?",
        },
      ],
      max_tokens: 50,
    });

    return NextResponse.json({
      success: true,
      message: "Conexión con OpenAI establecida correctamente",
      response: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error al conectar con OpenAI:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error al conectar con OpenAI",
      },
      { status: 500 }
    );
  }
}
