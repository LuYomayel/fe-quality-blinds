import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const dynamic = "force-static";
export const revalidate = false;

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
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // PRODUCCIÓN - API real de OpenAI
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Modelo más barato
      messages: [
        {
          role: "system",
          content: QUALITY_BLINDS_CONTEXT,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3, // Más consistente
      max_tokens: 300, // Limita respuesta para controlar costos
    });

    return NextResponse.json({
      answer: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      {
        error:
          "Sorry, I'm having trouble right now. Please call (02) 9340 5050 for immediate assistance.",
      },
      { status: 500 }
    );
  }
}
