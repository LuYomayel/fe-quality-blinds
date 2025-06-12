import { z } from "zod";
import validator from "validator";

// Función simple para sanitizar texto en el frontend
function sanitizeHtml(text: string): string {
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]*>/g, "")
    .replace(/[<>]/g, "");
}

// Validadores para formato australiano
const phoneRegex = /^(\+61|0)[2-9]\d{8}$/;
const postcodeRegex = /^[0-9]{4}$/;

// Esquemas de validación para formularios del frontend
export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "El nombre contiene caracteres inválidos"),

  email: z
    .string()
    .email("Formato de email inválido")
    .max(320, "Email demasiado largo")
    .refine((email) => validator.isEmail(email), "Email inválido"),

  phone: z
    .string()
    .max(20, "Teléfono demasiado largo")
    .optional()
    .refine(
      (phone) => !phone || phoneRegex.test(phone.replace(/\s/g, "")),
      "Formato de teléfono australiano inválido"
    ),

  message: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(2000, "El mensaje no puede exceder 2000 caracteres"),

  postcode: z
    .string()
    .max(4, "Código postal demasiado largo")
    .optional()
    .refine(
      (code) => !code || postcodeRegex.test(code),
      "Código postal debe tener 4 dígitos"
    ),

  address: z
    .string()
    .max(200, "La dirección no puede exceder 200 caracteres")
    .optional(),

  service: z.enum(["quote", "repair", "consultation", "other"]).optional(),

  product: z
    .enum(["blinds", "shutters", "awnings", "curtains", "other"])
    .optional(),

  chatSummary: z
    .string()
    .max(5000, "Resumen de chat demasiado largo")
    .optional(),
});

export const ChatMessageSchema = z.object({
  message: z
    .string()
    .min(1, "El mensaje no puede estar vacío")
    .max(1000, "El mensaje no puede exceder 1000 caracteres"),

  conversation: z
    .array(
      z.object({
        role: z.enum(["system", "user", "assistant"]),
        content: z.string().max(2000, "Contenido del mensaje demasiado largo"),
      })
    )
    .optional()
    .refine(
      (conv) => !conv || conv.length <= 20,
      "Historial de conversación demasiado largo"
    ),
});

// Función para sanitizar texto del lado cliente
export function sanitizeText(text: string): string {
  if (!text) return "";

  // Sanitizar HTML usando función simple
  const cleaned = sanitizeHtml(text);

  // Eliminar caracteres de control y normalizar espacios
  return cleaned
    .replace(/[\x00-\x1F\x7F]/g, "") // Eliminar caracteres de control
    .replace(/\s+/g, " ") // Normalizar espacios
    .trim();
}

// Función para sanitizar objeto completo en frontend
export function sanitizeFormData(
  formData: Record<string, unknown>
): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(formData)) {
    if (typeof value === "string") {
      sanitized[key] = sanitizeText(value);
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map((item) =>
        typeof item === "string" ? sanitizeText(item) : item
      );
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

// Validación de archivos del lado cliente
export function validateFile(file: File): { valid: boolean; error?: string } {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "application/pdf",
  ];

  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error:
        "Tipo de archivo no permitido. Solo se aceptan: JPEG, PNG, WebP, PDF",
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: "El archivo es demasiado grande. Máximo 5MB",
    };
  }

  // Validar nombre del archivo
  if (!/^[a-zA-Z0-9_.-]+$/.test(file.name)) {
    return {
      valid: false,
      error: "Nombre de archivo contiene caracteres inválidos",
    };
  }

  return { valid: true };
}

// Rate limiting del lado cliente (para UX)
class ClientRateLimit {
  private attempts: Map<string, { count: number; resetTime: number }> =
    new Map();

  check(
    key: string,
    maxAttempts: number = 5,
    windowMs: number = 60000
  ): {
    allowed: boolean;
    remaining: number;
    resetTime: number;
  } {
    const now = Date.now();
    const record = this.attempts.get(key);

    if (!record || now > record.resetTime) {
      // Primera vez o ventana expirada
      const newRecord = { count: 1, resetTime: now + windowMs };
      this.attempts.set(key, newRecord);
      return {
        allowed: true,
        remaining: maxAttempts - 1,
        resetTime: newRecord.resetTime,
      };
    }

    if (record.count >= maxAttempts) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: record.resetTime,
      };
    }

    record.count++;
    return {
      allowed: true,
      remaining: maxAttempts - record.count,
      resetTime: record.resetTime,
    };
  }

  reset(key: string): void {
    this.attempts.delete(key);
  }
}

export const clientRateLimit = new ClientRateLimit();

// Hook personalizado para validación en tiempo real
export function useFormValidation<T extends z.ZodType>(schema: T) {
  const validateField = (fieldName: string, value: unknown) => {
    try {
      // Crear un objeto temporal para validar el campo
      const tempObj = { [fieldName]: value };
      schema.parse(tempObj);
      return { valid: true, error: null };
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        const fieldError = validationError.errors.find((err) =>
          err.path.includes(fieldName)
        );
        return {
          valid: false,
          error: fieldError?.message || "Valor inválido",
        };
      }
      return { valid: false, error: "Error de validación" };
    }
  };

  const validateForm = (data: unknown) => {
    try {
      const result = schema.safeParse(data);
      if (result.success) {
        return { valid: true, errors: {}, data: result.data };
      } else {
        const errors: Record<string, string> = {};
        result.error.errors.forEach((err) => {
          const path = err.path.join(".");
          errors[path] = err.message;
        });
        return { valid: false, errors, data: null };
      }
    } catch {
      return {
        valid: false,
        errors: { general: "Error de validación del formulario" },
        data: null,
      };
    }
  };

  return { validateField, validateForm };
}

// Función para detectar contenido potencialmente malicioso
export function detectSuspiciousContent(text: string): {
  suspicious: boolean;
  reasons: string[];
} {
  const reasons: string[] = [];

  // Detectar scripts
  if (/<script/i.test(text)) {
    reasons.push("Contiene tags de script");
  }

  // Detectar intentos de inyección
  if (/javascript:/i.test(text) || /data:/i.test(text)) {
    reasons.push("Contiene URLs potencialmente maliciosas");
  }

  // Detectar exceso de caracteres especiales
  const specialChars = text.match(/[<>'"&]/g);
  if (specialChars && specialChars.length > text.length * 0.1) {
    reasons.push("Exceso de caracteres especiales");
  }

  // Detectar contenido muy largo inusual
  if (text.length > 10000) {
    reasons.push("Contenido excesivamente largo");
  }

  return {
    suspicious: reasons.length > 0,
    reasons,
  };
}

// Tipos exportados
export type ContactFormData = z.infer<typeof ContactFormSchema>;
export type ChatMessageData = z.infer<typeof ChatMessageSchema>;
