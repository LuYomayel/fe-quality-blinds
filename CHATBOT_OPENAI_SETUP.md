# 🤖 Configuración de OpenAI para Chatbot - Quality Blinds

## Estado Actual

El chatbot está funcionando en **modo desarrollo** con respuestas simuladas inteligentes. Para activar OpenAI real, sigue estos pasos:

## 🔧 Paso 1: Instalar OpenAI SDK

```bash
npm install openai
```

## 🔑 Paso 2: Configurar Variables de Entorno

Crear/editar `.env.local`:

```env
OPENAI_API_KEY=tu_clave_api_aqui
```

## 📝 Paso 3: Activar OpenAI en la API

En `src/app/api/chat/route.ts`:

1. **Descomenta** el import de OpenAI:

```typescript
import OpenAI from "openai";
```

2. **Descomenta** la variable de contexto:

```typescript
// Cambiar esto:
/* const QUALITY_BLINDS_CONTEXT = `...`; */

// Por esto:
const QUALITY_BLINDS_CONTEXT = `...`;
```

3. **Reemplaza** la lógica en la función POST:

```typescript
// Eliminar:
const mockResponse = generateMockResponse(prompt);
return NextResponse.json({ answer: mockResponse });

// Descomentar y usar:
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
```

4. **Eliminar** la función `generateMockResponse()` (ya no necesaria)

## 💰 Optimización de Costos

### Modelo Recomendado: `gpt-4o-mini`

- **Costo**: ~$0.15 por 1M tokens de input
- **Rendimiento**: Excelente para chat support
- **Contexto**: El prompt optimizado usa ~400 tokens

### Configuración Optimizada:

- `temperature: 0.3` - Respuestas más consistentes
- `max_tokens: 300` - Limita longitud de respuesta
- Contexto conciso pero completo

### Estimación de Costos:

- **Por conversación** (5 mensajes): ~$0.001
- **1000 conversaciones/mes**: ~$1.00
- **Muy económico** para el valor que aporta

## 🔄 Lógica del Chatbot

### Flujo Actual:

1. **Casos específicos** (contacto, saludo) → Respuesta hardcodeada + acciones
2. **Todo lo demás** → Envía a OpenAI con contexto completo
3. **Fallback** → Mensaje de error amigable

### Ventajas de este Enfoque:

- ✅ Respuestas rápidas para acciones comunes
- ✅ IA maneja preguntas complejas/específicas
- ✅ Contexto completo de productos y servicios
- ✅ Costos controlados con límites de tokens

## 🧪 Testing

Una vez activado OpenAI:

1. Probar preguntas sobre productos específicos
2. Verificar que menciona contacto (02) 9340 5050
3. Confirmar que ofrece quotes gratuitos
4. Revisar que la información sea consistente

## 📊 Monitoreo

- Revisar logs de la API para errores
- Monitorear costos en OpenAI dashboard
- Ajustar `max_tokens` si es necesario

---

**Nota**: El sistema actual con respuestas simuladas funciona perfectamente para desarrollo y testing. Activar OpenAI cuando estés listo para producción.
