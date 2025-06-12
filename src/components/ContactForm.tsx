"use client";

import React, { useState, useRef, FormEvent, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE_URL } from "../config";
import {
  ContactFormSchema,
  sanitizeFormData,
  validateFile,
  clientRateLimit,
  detectSuspiciousContent,
  useFormValidation,
} from "@/lib/frontend-validation";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  postcode: string;
  address: string;
  service: string;
  product: string;
}

interface ChatMessage {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

interface ContactFormProps {
  chatMessages?: ChatMessage[];
}

const ContactForm: React.FC<ContactFormProps> = ({ chatMessages = [] }) => {
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    postcode: "",
    address: "",
    service: "",
    product: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [apiError, setApiError] = useState<string>("");
  const [fileErrors, setFileErrors] = useState<string[]>([]);
  const [rateLimitWarning, setRateLimitWarning] = useState<string>("");
  const filesRef = useRef<File[]>([]);

  // Usar el hook de validación personalizado
  const { validateForm: validateFormSecure } =
    useFormValidation(ContactFormSchema);

  // Function to generate chat summary and pre-fill form based on conversation
  React.useEffect(() => {
    if (chatMessages.length > 0) {
      const chatSummary = generateChatSummary(chatMessages);
      const extractedInfo = extractInfoFromChat(chatMessages);

      setForm((prev) => ({
        ...prev,
        message: chatSummary,
        product: extractedInfo.product,
        service: extractedInfo.service,
        address: extractedInfo.address,
        postcode: extractedInfo.postcode,
      }));
    }
  }, [chatMessages]);

  const generateChatSummary = (messages: typeof chatMessages): string => {
    if (messages.length === 0) return "";

    const conversation = messages
      .filter(
        (msg) => msg.content.trim() && !msg.content.includes("I've opened")
      )
      .map(
        (msg) =>
          `${msg.type === "user" ? "Customer" : "Assistant"}: ${msg.content}`
      )
      .join("\n\n");

    const summary = `CHAT CONVERSATION SUMMARY:
${conversation}

---
Please contact me regarding the above discussion about your window treatments.`;

    return summary;
  };

  const extractInfoFromChat = (messages: typeof chatMessages) => {
    const allText = messages
      .map((m) => m.content)
      .join(" ")
      .toLowerCase();

    // Extract product
    let product = "";
    if (allText.includes("roller blind")) product = "roller-blinds";
    else if (allText.includes("roman blind")) product = "roman-blinds";
    else if (allText.includes("venetian blind")) product = "venetian-blinds";
    else if (allText.includes("curtain")) product = "curtains";
    else if (allText.includes("shutter")) product = "shutters";
    else if (allText.includes("awning")) product = "awnings";
    else product = "other";

    // Extract service intent
    let service = "";
    if (
      allText.includes("quote") ||
      allText.includes("measure") ||
      allText.includes("price")
    ) {
      service = "measure-quote";
    } else if (allText.includes("install")) {
      service = "installation";
    } else if (allText.includes("repair") || allText.includes("fix")) {
      service = "repair";
    } else {
      service = "consultation";
    }

    // Extract location info
    const address = "";
    let postcode = "";

    const postcodeMatch = allText.match(/\b(\d{4})\b/);
    if (postcodeMatch) {
      postcode = postcodeMatch[1];
    }

    return { product, service, address, postcode };
  };

  const validateForm = () => {
    // Sanitizar datos antes de validar (convertir correctamente)
    const formAsRecord: Record<string, unknown> = { ...form };
    const sanitizedFormRecord = sanitizeFormData(formAsRecord);

    // Usar validación de seguridad con zod
    const validation = validateFormSecure(sanitizedFormRecord);

    if (!validation.valid) {
      setErrors(validation.errors as Partial<ContactFormData>);
      return false;
    }

    // Detectar contenido sospechoso
    const suspiciousCheck = detectSuspiciousContent(form.message);
    if (suspiciousCheck.suspicious) {
      setApiError(
        `Contenido sospechoso detectado: ${suspiciousCheck.reasons.join(", ")}`
      );
      return false;
    }

    setErrors({});
    return true;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    // Clear API error when user makes changes
    if (apiError) {
      setApiError("");
    }
  };

  const handleFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).slice(0, 4);
      const validFiles: File[] = [];
      const errors: string[] = [];

      // Validar cada archivo
      selectedFiles.forEach((file) => {
        const validation = validateFile(file);
        if (validation.valid) {
          validFiles.push(file);
        } else {
          errors.push(`${file.name}: ${validation.error}`);
        }
      });

      filesRef.current = validFiles;
      setFileErrors(errors);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Verificar rate limiting
    const rateLimitCheck = clientRateLimit.check("contact-form", 3, 300000); // 3 intentos por 5 minutos
    if (!rateLimitCheck.allowed) {
      const resetTime = new Date(rateLimitCheck.resetTime).toLocaleTimeString();
      setRateLimitWarning(
        `Demasiados intentos. Intenta nuevamente después de las ${resetTime}`
      );
      return;
    } else if (rateLimitCheck.remaining <= 1) {
      setRateLimitWarning(
        `Quedan ${rateLimitCheck.remaining} intentos restantes`
      );
    } else {
      setRateLimitWarning("");
    }

    if (!validateForm()) {
      return;
    }

    setStatus("sending");
    setApiError(""); // Clear previous API errors

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      filesRef.current.forEach((file) => {
        formData.append(`images`, file);
      });

      // Generar resumen de conversación si hay mensajes del chatbot
      let conversationSummary = "";
      if (chatMessages.length > 0) {
        try {
          const summaryResponse = await fetch(
            `${API_BASE_URL}/api/chat/summary`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ messages: chatMessages }),
            }
          );
          const summaryData = await summaryResponse.json();
          conversationSummary =
            summaryData.summary || "Unable to generate automatic summary.";
        } catch (error) {
          console.error("Error generating summary:", error);
          conversationSummary =
            "Error generating chatbot conversation summary.";
        }
      }

      // Agregar el resumen al FormData
      formData.append("chatSummary", conversationSummary);

      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        body: formData,
      });

      const responseData = await res.json();

      if (!res.ok) {
        // Handle validation errors from backend
        if (res.status === 400 && responseData.message) {
          if (Array.isArray(responseData.message)) {
            // Multiple validation errors
            setApiError(responseData.message.join(", "));
          } else {
            // Single error message
            setApiError(responseData.message);
          }
        } else {
          setApiError("Error sending form. Please try again.");
        }
        setStatus("error");
        return;
      }

      setStatus("sent");
      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
        postcode: "",
        address: "",
        service: "",
        product: "",
      });
      filesRef.current = [];
    } catch (err) {
      console.error("Network error:", err);
      setApiError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  const errorClasses = "border-red-500 focus:ring-red-500";

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg sm:rounded-xl shadow-xl border border-gray-200 space-y-4 sm:space-y-6 w-full max-w-full"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-center mb-4 sm:mb-6 lg:mb-8 text-gray-900"
      >
        Enquire For Measures & Quotes
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name*"
            className={`p-3 sm:p-4 rounded-lg border border-gray-300 w-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base ${
              errors.name ? errorClasses : ""
            }`}
            required
          />
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-xs sm:text-sm text-red-600"
            >
              {errors.name}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Your Number*"
            className={`p-3 sm:p-4 rounded-lg border border-gray-300 w-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base ${
              errors.phone ? errorClasses : ""
            }`}
            required
          />
          {errors.phone && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-xs sm:text-sm text-red-600"
            >
              {errors.phone}
            </motion.p>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your Email*"
          className={`p-3 sm:p-4 rounded-lg border border-gray-300 w-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base ${
            errors.email ? errorClasses : ""
          }`}
          required
        />
        {errors.email && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-xs sm:text-sm text-red-600"
          >
            {errors.email}
          </motion.p>
        )}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <input
            type="text"
            name="postcode"
            value={form.postcode}
            onChange={handleChange}
            placeholder="Postcode (Optional)"
            className="p-3 sm:p-4 rounded-lg border border-gray-300 w-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address (Optional)"
            className="p-3 sm:p-4 rounded-lg border border-gray-300 w-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className={`p-3 sm:p-4 rounded-lg border border-gray-300 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base ${
              errors.service ? errorClasses : ""
            }`}
            required
          >
            <option value="">Select Service*</option>
            <option value="measure-quote">Free Measure & Quote</option>
            <option value="installation">Installation Service</option>
            <option value="repair">Repair Service</option>
            <option value="consultation">Design Consultation</option>
          </select>
          {errors.service && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-xs sm:text-sm text-red-600"
            >
              {errors.service}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <select
            name="product"
            value={form.product}
            onChange={handleChange}
            className={`p-3 sm:p-4 rounded-lg border border-gray-300 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base ${
              errors.product ? errorClasses : ""
            }`}
            required
          >
            <option value="">Select Product*</option>
            <option value="roller-blinds">Roller Blinds</option>
            <option value="roman-blinds">Roman Blinds</option>
            <option value="venetian-blinds">Venetian Blinds</option>
            <option value="curtains">Curtains & Drapes</option>
            <option value="shutters">Shutters</option>
            <option value="awnings">Awnings</option>
            <option value="other">Other</option>
          </select>
          {errors.product && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-xs sm:text-sm text-red-600"
            >
              {errors.product}
            </motion.p>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your project..."
          rows={4}
          className={`p-3 sm:p-4 rounded-lg border border-gray-300 w-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none text-sm sm:text-base ${
            errors.message ? errorClasses : ""
          }`}
          required
        />
        {errors.message && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-xs sm:text-sm text-red-600"
          >
            {errors.message}
          </motion.p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
          Upload Images (Optional) - Max 4 files
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFilesChange}
          className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-xs sm:text-sm"
        />

        {/* Errores de archivos */}
        {fileErrors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 space-y-1"
          >
            {fileErrors.map((error, index) => (
              <p
                key={index}
                className="text-xs sm:text-sm text-red-600 flex items-center"
              >
                <svg
                  className="h-4 w-4 mr-1 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </p>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Warning de Rate Limiting */}
      {rateLimitWarning && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
        >
          <div className="flex items-center">
            <svg
              className="h-5 w-5 text-yellow-400 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-yellow-800">{rateLimitWarning}</p>
          </div>
        </motion.div>
      )}

      <motion.button
        type="submit"
        disabled={status === "sending"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.1 }}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 sm:py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed text-sm sm:text-base"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {status === "sending" ? (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Sending...
          </div>
        ) : (
          "Send Enquiry"
        )}
      </motion.button>

      <AnimatePresence>
        {status === "sent" && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 text-green-600 text-center font-medium"
          >
            Your message has been sent successfully!
          </motion.p>
        )}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Error sending form
                </h3>
                <div className="mt-1 text-sm text-red-700">
                  {apiError || "An error occurred. Please try again later."}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
};

export default ContactForm;
