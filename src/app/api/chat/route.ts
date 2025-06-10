import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

// Configuración correcta para API routes
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Contexto optimizado para minimizar tokens pero mantener información esencial
const QUALITY_BLINDS_CONTEXT = `You are the Quality Blinds Australia assistant. We're a family business since 1989 based in Sydney.

PRODUCTS & SPECIFIC FEATURES:
• Roller Blinds: 
  - BLOCKOUT: 100% light block, energy efficient (24% heat reduction), perfect for bedrooms, available in 100+ colors
  - SUNSCREEN: UV protection + view, transparent at night, reduces glare, mesh fabric
  - TRANSLUCENT: Privacy + natural light, day privacy only
  - DOUBLE ROLLER: Combines blockout + sunscreen in same bracket for ultimate flexibility

• Roman Blinds: Premium fabric, elegant pleated style, chain operated, blockout lining available

• Venetian Blinds: 
  - ALUMINIUM: 25mm/50mm slats, splash-resistant for kitchens/bathrooms
  - BASSWOOD: Natural timber, stain or paint options
  - CEDAR: Premium red cedar, luxury finish

• Shutters: 
  - ABS WATERPROOF: 100% waterproof, stainless steel, 23 colors, perfect bathrooms
  - BASSWOOD: Real timber, 27 paint colors, great value
  - PHOENIXWOOD: Premium hardwood, 51 colors, furniture quality

PRICING GUIDANCE:
For standard residential windows (1200x1500mm approx):
- Roller Blinds: From $200-400 depending on fabric
- Roman Blinds: From $300-500
- Venetian: From $250-450
- Shutters: From $800-1500 depending on material
*Always mention these are approximate - free measure gives exact pricing*

SERVICES:
• FREE quotes & professional measurement (always emphasize this!)
• Local manufacturing: blinds 1-2 weeks, shutters 4-6 weeks  
• Professional installation included
• Warranty: 2+ years mechanisms, lifetime on many fabrics

CONTACT: (02) 9340 5050 | 131 Botany St, Randwick NSW

IMPORTANT INSTRUCTIONS:
1. Give helpful, specific answers with actual product details
2. For pricing questions: Give approximate ranges BUT always say "for exact pricing, we need to measure - it's FREE!"
3. Recommend specific products based on customer needs (bedroom = blockout, bathroom = waterproof, etc.)
4. Don't just say "contact us" - give useful info THEN suggest free consultation
5. Be conversational and helpful, not robotic
6. When someone wants to book/schedule a measurement or consultation, say "I can help you book a free consultation!" and mention that options will appear to either book online or call directly
7. NEVER mention email - all contact should be through phone or online booking forms`;

export async function POST(req: NextRequest) {
  try {
    const { message, conversation } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Verificar que la API key esté configurada
    if (!process.env.OPENAI_API_KEY) {
      console.error("OpenAI API key not configured");
      return NextResponse.json(
        {
          error:
            "Service temporarily unavailable. Please call (02) 9340 5050 for assistance.",
        },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Si se proporciona el historial de conversación completo, usarlo
    // Si no, usar el formato anterior para compatibilidad
    const messages = conversation || [
      {
        role: "system",
        content: QUALITY_BLINDS_CONTEXT,
      },
      {
        role: "user",
        content: message,
      },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Corregido: era "gpt-o4-mini"
      messages: messages,
      temperature: 0.3,
      max_tokens: 250, // Reducido de 300 a 250 para controlar costos
    });

    const reply =
      completion.choices[0]?.message?.content ||
      "Lo siento, no pude procesar tu consulta.";

    return NextResponse.json({
      reply: reply,
    });
  } catch (error) {
    console.error("Error in chat API:", error);

    // Mejor manejo de errores específicos
    if (error instanceof Error) {
      if (error.message.includes("model")) {
        return NextResponse.json(
          {
            error:
              "Chat service temporarily unavailable. Please call (02) 9340 5050.",
          },
          { status: 500 }
        );
      }
      if (error.message.includes("API key")) {
        return NextResponse.json(
          { error: "Service configuration error. Please call (02) 9340 5050." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      {
        error:
          "Sorry, I'm having trouble right now. Please call (02) 9340 5050 for immediate assistance.",
      },
      { status: 500 }
    );
  }
}
