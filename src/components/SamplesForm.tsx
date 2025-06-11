"use client";

import React, { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../config";

interface SamplesFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  postcode: string;
  productTypes: string[];
  message: string;
}

interface SamplesFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  postcode?: string;
  productTypes?: string;
  message?: string;
}

interface ChatMessage {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

interface SamplesFormProps {
  onClose: () => void;
  chatMessages?: ChatMessage[];
}

const SamplesForm: React.FC<SamplesFormProps> = ({
  onClose,
  chatMessages = [],
}) => {
  const [form, setForm] = useState<SamplesFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    postcode: "",
    productTypes: [],
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errors, setErrors] = useState<SamplesFormErrors>({});

  const productOptions = [
    "Roller Blinds - Blockout",
    "Roller Blinds - Sunscreen",
    "Roller Blinds - Translucent",
    "Roman Blinds",
    "Venetian Blinds - Aluminium",
    "Venetian Blinds - Timber",
    "Curtains - Blockout",
    "Curtains - Sheer",
    "Shutters - ABS",
    "Shutters - Basswood",
    "Shutters - Phoenixwood",
    "Awning Fabrics",
  ];

  const validateForm = () => {
    const newErrors: SamplesFormErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email format";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.postcode.trim()) newErrors.postcode = "Postcode is required";
    if (form.productTypes.length === 0)
      newErrors.productTypes = "Please select at least one product type";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof SamplesFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleProductTypeChange = (productType: string) => {
    setForm((prev) => ({
      ...prev,
      productTypes: prev.productTypes.includes(productType)
        ? prev.productTypes.filter((p) => p !== productType)
        : [...prev.productTypes, productType],
    }));
    if (errors.productTypes) {
      setErrors((prev) => ({ ...prev, productTypes: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus("sending");

    try {
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

      // Crear FormData con todos los datos incluyendo el resumen
      const requestData = {
        ...form,
        chatSummary: conversationSummary,
      };

      // Enviar a endpoint de samples
      const res = await fetch(`${API_BASE_URL}/api/samples`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!res.ok) throw new Error("Error sending samples request");

      setStatus("sent");

      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-xl text-center"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Samples Request Sent!
        </h3>
        <p className="text-gray-600">
          We&apos;ll send your fabric samples within 2-3 business days to your
          provided address.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl space-y-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Request FREE Fabric Samples
        </h2>
        <p className="text-gray-600">
          Choose your products and we&apos;ll send samples to your home
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name*"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder:text-gray-500 font-medium ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address*"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder:text-gray-500 font-medium ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number*"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder:text-gray-500 font-medium ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="postcode"
            value={form.postcode}
            onChange={handleChange}
            placeholder="Postcode*"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder:text-gray-500 font-medium ${
              errors.postcode ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.postcode && (
            <p className="mt-1 text-sm text-red-600">{errors.postcode}</p>
          )}
        </div>
      </div>

      <div>
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Delivery Address*"
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder:text-gray-500 font-medium ${
            errors.address ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-600">{errors.address}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select Product Types* (choose all that interest you):
        </label>
        <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
          {productOptions.map((product) => (
            <label
              key={product}
              className="flex items-center space-x-2 text-sm"
            >
              <input
                type="checkbox"
                checked={form.productTypes.includes(product)}
                onChange={() => handleProductTypeChange(product)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{product}</span>
            </label>
          ))}
        </div>
        {errors.productTypes && (
          <p className="mt-1 text-sm text-red-600">{errors.productTypes}</p>
        )}
      </div>

      <div>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Any specific colors, styles, or requirements? (optional)"
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder:text-gray-500 font-medium"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={status === "sending"}
          className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {status === "sending" ? "Sending..." : "Request Samples"}
        </button>
      </div>
    </motion.form>
  );
};

export default SamplesForm;
