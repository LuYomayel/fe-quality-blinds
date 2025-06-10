import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-static";
export const revalidate = false;

/* Contexto optimizado para minimizar tokens pero mantener información esencial
const QUALITY_BLINDS_CONTEXT = `You are the Quality Blinds Australia assistant. We're a family business since 1989 based in Sydney.

PRODUCTS & PRICING:
• Roller Blinds: Blockout (100% light block, energy efficient), Sunscreen (UV protection + view, transparent at night), Translucent (privacy + light)
• Roman Blinds: Blockout (chain operated, blackout lining option) & Translucent (light filtering)
• Venetian Blinds: Aluminium (25mm/50mm, splash-resistant), Basswood (natural timber), Cedar (premium red cedar)
• Shutters: ABS Waterproof (bathrooms), Basswood (27 colors), Phoenixwood (luxury, 51 colors), PVC (budget, moisture-proof)
• Curtains: Blockout (99% UV block, 24% heat reduction), Sheer (light filtering), Veri Shades (adjustable panels)
• Awnings: Folding Arm (retractable, up to 7m), Straight Drop (vertical), Conservatory (glass roof cover)

SERVICES:
• FREE quotes & professional measurement
• Local manufacturing: blinds 1-2 weeks, shutters 4-6 weeks
• Professional installation included
• Warranty: 2+ years mechanisms, lifetime on many fabrics
• Repair & maintenance service available

CONTACT:
• Phone: (02) 9340 5050
• Email: sales@qualityblinds.com.au
• Address: 131 Botany St, Randwick NSW 2031
• Service area: Sydney & NSW-wide

Always be helpful, professional, and encourage customers to call for free quotes or book consultations.`;
*/

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Simulamos respuesta de OpenAI para desarrollo
    // En producción, descomenta el código de OpenAI abajo

    // DESARROLLO - Respuesta simulada inteligente
    const mockResponse = generateMockResponse(prompt);

    return NextResponse.json({
      answer: mockResponse,
    });

    /* PRODUCCIÓN - Descomenta esto cuando tengas OpenAI API key:
    
    import OpenAI from "openai";
    
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Modelo más barato
      messages: [
        {
          role: "system",
          content: QUALITY_BLINDS_CONTEXT
        },
        { 
          role: "user", 
          content: prompt 
        },
      ],
      temperature: 0.3, // Más consistente
      max_tokens: 300, // Limita respuesta para controlar costos
    });

    return NextResponse.json({ 
      answer: completion.choices[0].message.content 
    });
    */
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

// Función para simular respuestas inteligentes durante desarrollo
// Esta función simula cómo la IA real analizaría la intención completa, no keywords
function generateMockResponse(prompt: string): string {
  const text = prompt.toLowerCase();

  // Simula análisis contextual inteligente (no solo keywords aisladas)

  // CASO 1: Intención clara de obtener cotización (contexto positivo)
  if (
    (text.includes("quote") ||
      text.includes("price") ||
      text.includes("cost")) &&
    !text.includes("don't want") &&
    !text.includes("no quote") &&
    !text.includes("not interested")
  ) {
    return "I'd be happy to help you get a FREE quote! We provide completely free, no-obligation quotes with professional measurement. Call (02) 9340 5050 or I can arrange a free home consultation. What type of window treatment are you interested in?";
  }

  // CASO 2: Consulta específica sobre roller blinds para dormitorio
  if (
    (text.includes("roller") &&
      (text.includes("bed") || text.includes("bedroom"))) ||
    (text.includes("choose") &&
      text.includes("roller") &&
      text.includes("blind"))
  ) {
    return "Perfect choice for a bedroom! For roller blinds in bedrooms, I recommend:\n\n🌑 **BLOCKOUT ROLLER BLINDS** (Most Popular for Bedrooms):\n• 100% light blocking for perfect sleep\n• Energy efficient - reduces heat by 24%\n• Available in many colors to match your decor\n\n🌅 **DOUBLE ROLLER SYSTEM**:\n• Blockout + Sunscreen in one\n• Day privacy with sunscreen, total darkness with blockout\n• Ultimate flexibility\n\nWhich style appeals to you? I can arrange a FREE measure and quote. Call (02) 9340 5050!";
  }

  // CASO 3: Información de contacto (intención clara)
  if (
    text.includes("contact") ||
    text.includes("phone") ||
    text.includes("address") ||
    text.includes("call you") ||
    text.includes("reach you")
  ) {
    return "📞 Phone: (02) 9340 5050\n✉️ Email: sales@qualityblinds.com.au\n📍 Address: 131 Botany St, Randwick NSW 2031\n\n🕒 Hours: Mon-Fri 9AM-5PM, Sat 9AM-2PM\n\nWe offer free home consultations across Sydney & NSW!";
  }

  // CASO 4: Comparaciones entre productos
  if (
    text.includes("compare") ||
    text.includes("comparison") ||
    text.includes("difference") ||
    text.includes("vs") ||
    text.includes("versus") ||
    text.includes("product comparison")
  ) {
    return "I'd be happy to help you compare our products! Here are the main differences:\n\n🆚 **ROLLER vs ROMAN BLINDS**:\n• Roller: Modern, space-efficient, easy operation\n• Roman: Elegant fabric pleats, softer look\n\n🆚 **BLOCKOUT vs SUNSCREEN**:\n• Blockout: 100% light block, energy efficient\n• Sunscreen: UV protection + view, day privacy only\n\n🆚 **BLINDS vs SHUTTERS**:\n• Blinds: More affordable, easier to replace\n• Shutters: Permanent, premium, excellent insulation\n\nWhat specific products are you considering? Call (02) 9340 5050 for personalized advice!";
  }

  // CASO 5: Productos para baños (contexto específico)
  if (
    (text.includes("bathroom") || text.includes("waterproof")) &&
    !text.includes("not bathroom")
  ) {
    return "For bathrooms, I recommend our ABS Waterproof Shutters - they're 100% waterproof with stainless steel hardware, or our Aluminium Venetian Blinds which are splash-resistant and easy to clean. Both are perfect for humid areas. Shall I arrange a free consultation?";
  }

  // Para todo lo demás, respuesta profesional general
  return `I'd be happy to help with your window treatment needs! Quality Blinds offers:\n\n• Roller, Roman & Venetian Blinds\n• Premium Shutters\n• Curtains & Awnings\n• FREE quotes & professional installation\n\nFor personalized advice and pricing, call (02) 9340 5050 or I can arrange a free home consultation. What specific product interests you?`;
}
