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
function generateMockResponse(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase();

  // Casos específicos de productos para habitaciones
  if (
    (lowerPrompt.includes("roller") &&
      (lowerPrompt.includes("bed") || lowerPrompt.includes("bedroom"))) ||
    (lowerPrompt.includes("choose") &&
      lowerPrompt.includes("roller") &&
      lowerPrompt.includes("blind"))
  ) {
    return "Perfect choice for a bedroom! For roller blinds in bedrooms, I recommend:\n\n🌑 **BLOCKOUT ROLLER BLINDS** (Most Popular for Bedrooms):\n• 100% light blocking for perfect sleep\n• Energy efficient - reduces heat by 24%\n• Available in many colors to match your decor\n\n🌅 **DOUBLE ROLLER SYSTEM**:\n• Blockout + Sunscreen in one\n• Day privacy with sunscreen, total darkness with blockout\n• Ultimate flexibility\n\nWhich style appeals to you? I can arrange a FREE measure and quote. Call (02) 9340 5050!";
  }

  if (
    lowerPrompt.includes("roller") &&
    (lowerPrompt.includes("choose") ||
      lowerPrompt.includes("help") ||
      lowerPrompt.includes("recommend"))
  ) {
    return "Great choice! We have 3 main types of roller blinds:\n\n🌑 **BLOCKOUT**: 100% light blocking, perfect for bedrooms and media rooms\n🌞 **SUNSCREEN**: UV protection while maintaining view, great for living areas\n🌅 **TRANSLUCENT**: Privacy with filtered light, ideal for bathrooms and kitchens\n\nWhich room is this for? That will help me recommend the best option. Free consultation available - call (02) 9340 5050!";
  }

  if (
    lowerPrompt.includes("compare") ||
    lowerPrompt.includes("comparison") ||
    lowerPrompt.includes("difference")
  ) {
    return "I'd be happy to help you compare our products! Here are the main differences:\n\n🆚 **ROLLER vs ROMAN BLINDS**:\n• Roller: Modern, space-efficient, easy operation\n• Roman: Elegant fabric pleats, softer look\n\n🆚 **BLOCKOUT vs SUNSCREEN**:\n• Blockout: 100% light block, energy efficient\n• Sunscreen: UV protection + view, day privacy only\n\n🆚 **BLINDS vs SHUTTERS**:\n• Blinds: More affordable, easier to replace\n• Shutters: Permanent, premium, excellent insulation\n\nWhat specific products are you considering? Call (02) 9340 5050 for personalized advice!";
  }

  if (
    lowerPrompt.includes("price") ||
    lowerPrompt.includes("cost") ||
    lowerPrompt.includes("quote")
  ) {
    return "I'd be happy to help you get a FREE quote! We provide completely free, no-obligation quotes with professional measurement. Call (02) 9340 5050 or I can arrange a free home consultation. What type of window treatment are you interested in?";
  }

  if (lowerPrompt.includes("blockout") || lowerPrompt.includes("bedroom")) {
    return "Blockout blinds are perfect for bedrooms! Our blockout roller blinds block 100% of light and can reduce heat by up to 24%, helping with energy efficiency. We also offer blockout Roman blinds and curtains. Would you like me to arrange a free measure and quote?";
  }

  if (lowerPrompt.includes("bathroom") || lowerPrompt.includes("waterproof")) {
    return "For bathrooms, I recommend our ABS Waterproof Shutters - they're 100% waterproof with stainless steel hardware, or our Aluminium Venetian Blinds which are splash-resistant and easy to clean. Both are perfect for humid areas. Shall I arrange a free consultation?";
  }

  if (
    lowerPrompt.includes("awning") ||
    lowerPrompt.includes("outdoor") ||
    lowerPrompt.includes("patio")
  ) {
    return "Our awnings are perfect for outdoor living! We offer Folding Arm awnings (retractable, up to 7m wide), Straight Drop awnings for windows/patios, and Conservatory awnings for glass roofs. All can be motorized with weather sensors. Free quote available - call (02) 9340 5050!";
  }

  if (lowerPrompt.includes("shutter")) {
    return "We offer premium shutters in several materials: ABS Waterproof (bathrooms), Basswood (27 colors, great value), Phoenixwood (luxury, 51 colors), and PVC (budget-friendly). All include invisible tilt mechanism. Lead time is typically 4-6 weeks. Free measure and quote available!";
  }

  if (
    lowerPrompt.includes("how long") ||
    lowerPrompt.includes("lead time") ||
    lowerPrompt.includes("delivery")
  ) {
    return "Lead times vary by product: Blinds are typically 1-2 weeks (we manufacture locally), Shutters 4-6 weeks, and Awnings 2-4 weeks. Installation is usually scheduled within days of completion. For exact timing, call (02) 9340 5050 for your free quote!";
  }

  if (lowerPrompt.includes("warranty") || lowerPrompt.includes("guarantee")) {
    return "We provide comprehensive warranties: 2+ years on mechanisms and components, lifetime warranty on many fabrics, plus professional workmanship guarantee. We also offer ongoing repair and maintenance services. Contact (02) 9340 5050 for specific warranty details.";
  }

  if (
    lowerPrompt.includes("contact") ||
    lowerPrompt.includes("phone") ||
    lowerPrompt.includes("address")
  ) {
    return "📞 Phone: (02) 9340 5050\n✉️ Email: sales@qualityblinds.com.au\n📍 Address: 131 Botany St, Randwick NSW 2031\n\n🕒 Hours: Mon-Fri 9AM-5PM, Sat 9AM-2PM\n\nWe offer free home consultations across Sydney & NSW!";
  }

  // Respuesta general
  return `I'd be happy to help with your window treatment needs! Quality Blinds offers:\n\n• Roller, Roman & Venetian Blinds\n• Premium Shutters\n• Curtains & Awnings\n• FREE quotes & professional installation\n\nFor personalized advice and pricing, call (02) 9340 5050 or I can arrange a free home consultation. What specific product interests you?`;
}
