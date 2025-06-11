"use client";

import React, { useState, FormEvent, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  XMarkIcon,
  CheckIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  InformationCircleIcon,
  StarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  UserIcon,
  HomeIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { API_BASE_URL } from "../config";

interface QuoteFormData {
  // Personal Info
  name: string;
  email: string;
  phone: string;
  // Location Info
  address: string;
  city: string;
  postcode: string;
  state: string;
  // Product/Project Info
  roomType: string;
  width: string;
  height: string;
  windowCount: string;
  installationType: string;
  budget: string;
  urgency: string;
  // Scheduling
  preferredDate: string;
  preferredTime: string;
  // Additional
  comments: string;
  // Marketing
  referralSource: string;
  isNewCustomer: boolean;
  wantsNewsletter: boolean;
}

interface ChatMessage {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

interface QuoteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productCategory?: string;
  prefilledInfo?: Partial<QuoteFormData>;
  chatMessages?: ChatMessage[];
}

// Form steps for better UX
const formSteps = [
  {
    id: "contact",
    title: "Contact Information",
    description: "Let us know how to reach you",
    icon: UserIcon,
  },
  {
    id: "location",
    title: "Installation Details",
    description: "Where will we install your product?",
    icon: MapPinIcon,
  },
  {
    id: "project",
    title: "Project Requirements",
    description: "Tell us about your specific needs",
    icon: HomeIcon,
  },
  {
    id: "scheduling",
    title: "Schedule & Budget",
    description: "When and what's your budget?",
    icon: CalendarIcon,
  },
];

const QuoteDialog: React.FC<QuoteDialogProps> = ({
  isOpen,
  onClose,
  productName,
  productCategory = "",
  prefilledInfo = {},
  chatMessages = [],
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<QuoteFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postcode: "",
    state: "NSW",
    roomType: "",
    width: "",
    height: "",
    windowCount: "1",
    installationType: "",
    budget: "",
    urgency: "",
    preferredDate: "",
    preferredTime: "",
    comments: "",
    referralSource: "",
    isNewCustomer: true,
    wantsNewsletter: false,
    ...prefilledInfo, // Auto-fill with any provided info
  });

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errors, setErrors] = useState<Partial<QuoteFormData>>({});
  const [apiError, setApiError] = useState<string>("");
  const [showIncentive, setShowIncentive] = useState(true);

  // Auto-populate room type based on product category
  useEffect(() => {
    if (productCategory && !formData.roomType) {
      const roomMapping: Record<string, string> = {
        bedroom: "Bedroom",
        living: "Living Room",
        kitchen: "Kitchen",
        bathroom: "Bathroom",
        office: "Office",
        outdoor: "Outdoor",
      };

      const suggestedRoom = Object.keys(roomMapping).find((key) =>
        productCategory.toLowerCase().includes(key)
      );

      if (suggestedRoom) {
        setFormData((prev) => ({
          ...prev,
          roomType: roomMapping[suggestedRoom],
        }));
      }
    }
  }, [productCategory, formData.roomType]);

  const validateStep = (step: number) => {
    const newErrors: Partial<QuoteFormData> = {};

    switch (step) {
      case 0: // Contact
        if (!formData.name.trim()) newErrors.name = "Full name is required";
        if (!formData.email.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Invalid email format";
        }
        if (!formData.phone.trim()) {
          newErrors.phone = "Phone number is required";
        } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
          newErrors.phone = "Invalid phone number format";
        }
        break;

      case 1: // Location
        if (!formData.address.trim())
          newErrors.address = "Installation address is required";
        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!formData.postcode.trim())
          newErrors.postcode = "Postcode is required";
        break;

      case 2: // Project
        if (!formData.roomType)
          newErrors.roomType = "Please select a room type";
        if (!formData.windowCount)
          newErrors.windowCount = "Number of windows is required";
        break;

      case 3: // Scheduling
        if (!formData.budget)
          newErrors.budget = "Budget range helps us provide accurate quotes";
        if (!formData.urgency)
          newErrors.urgency = "Timeline helps us schedule appropriately";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof QuoteFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    // Clear API error when user makes changes
    if (apiError) {
      setApiError("");
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, formSteps.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmitQuote = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateStep(currentStep)) {
      return;
    }

    setStatus("sending");
    setApiError(""); // Clear previous API errors

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

      // Filtrar solo los campos que acepta el QuoteDto del backend
      const quoteData = {
        // Campos de BaseContactDto
        name: formData.name,
        email: formData.email,
        phone: formData.phone,

        // Campos específicos de QuoteDto
        address: formData.address,
        city: formData.city,
        postcode: formData.postcode,
        state: formData.state,
        roomType: formData.roomType,
        width: formData.width || undefined,
        height: formData.height || undefined,
        windowCount: formData.windowCount,
        installationType: formData.installationType || undefined,
        budget: formData.budget,
        urgency: formData.urgency,
        preferredDate: formData.preferredDate || undefined,
        preferredTime: formData.preferredTime || undefined,
        comments: formData.comments || undefined,
        referralSource: formData.referralSource || undefined,
        isNewCustomer: formData.isNewCustomer,
        wantsNewsletter: formData.wantsNewsletter,
        product: productName,
        productCategory: productCategory || undefined,
        chatSummary: conversationSummary, // Agregar el resumen al QuoteData
      };

      // Send quote request to backend
      const response = await fetch(`${API_BASE_URL}/api/quotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quoteData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        // Handle validation errors from backend
        if (response.status === 400 && responseData.message) {
          if (Array.isArray(responseData.message)) {
            // Multiple validation errors
            setApiError(responseData.message.join(", "));
          } else {
            // Single error message
            setApiError(responseData.message);
          }
        } else {
          setApiError("Error sending quote request. Please try again.");
        }
        setStatus("error");
        return;
      }

      setStatus("sent");

      // Auto-close after success and show thank you
      setTimeout(() => {
        resetForm();
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Network error:", error);
      setApiError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postcode: "",
      state: "NSW",
      roomType: "",
      width: "",
      height: "",
      windowCount: "1",
      installationType: "",
      budget: "",
      urgency: "",
      preferredDate: "",
      preferredTime: "",
      comments: "",
      referralSource: "",
      isNewCustomer: true,
      wantsNewsletter: false,
    });
    setCurrentStep(0);
    setStatus("idle");
    setErrors({});
    setApiError(""); // Clear API errors
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const inputClasses =
    "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder:text-gray-500 bg-white";
  const errorClasses = "border-red-500 focus:ring-red-500 bg-red-50";
  const progressPercentage = ((currentStep + 1) / formSteps.length) * 100;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[95vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Progress */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
              <div className="relative">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-2xl font-bold mb-1"
                    >
                      Get Your Free Quote
                    </motion.h2>
                    <p className="text-blue-100 text-sm">
                      For {productName} • Step {currentStep + 1} of{" "}
                      {formSteps.length}
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="text-white/80 hover:text-white transition p-1"
                    aria-label="Close modal"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-white/20 rounded-full h-2 mb-4">
                  <motion.div
                    className="bg-white rounded-full h-2"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>

                {/* Current Step Info */}
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    {React.createElement(formSteps[currentStep].icon, {
                      className: "h-5 w-5",
                    })}
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      {formSteps[currentStep].title}
                    </h3>
                    <p className="text-sm text-blue-100">
                      {formSteps[currentStep].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Offer Banner */}
            {showIncentive && currentStep === 0 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-400 p-4 m-6 rounded-lg relative"
              >
                <button
                  onClick={() => setShowIncentive(false)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
                <div className="flex items-center space-x-3">
                  <StarIcon className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-800">
                      Limited Time Offer!
                    </p>
                    <p className="text-sm text-green-700">
                      Complete your quote today and save 15% on installation.
                      Free measurement included!
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Form Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <motion.form onSubmit={handleSubmitQuote} className="space-y-6">
                <AnimatePresence mode="wait">
                  {/* Step 0: Contact Information */}
                  {currentStep === 0 && (
                    <motion.div
                      key="contact"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <UserIcon className="inline h-4 w-4 mr-1" />
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`${inputClasses} ${
                              errors.name ? errorClasses : ""
                            }`}
                            placeholder="Enter your full name"
                          />
                          {errors.name && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-1 text-sm text-red-600 flex items-center"
                            >
                              <InformationCircleIcon className="h-4 w-4 mr-1" />
                              {errors.name}
                            </motion.p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <EnvelopeIcon className="inline h-4 w-4 mr-1" />
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`${inputClasses} ${
                              errors.email ? errorClasses : ""
                            }`}
                            placeholder="your.email@example.com"
                          />
                          {errors.email && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-1 text-sm text-red-600 flex items-center"
                            >
                              <InformationCircleIcon className="h-4 w-4 mr-1" />
                              {errors.email}
                            </motion.p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <PhoneIcon className="inline h-4 w-4 mr-1" />
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`${inputClasses} ${
                            errors.phone ? errorClasses : ""
                          }`}
                          placeholder="0412 345 678"
                        />
                        {errors.phone && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-1 text-sm text-red-600 flex items-center"
                          >
                            <InformationCircleIcon className="h-4 w-4 mr-1" />
                            {errors.phone}
                          </motion.p>
                        )}
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <InformationCircleIcon className="h-5 w-5 text-blue-600" />
                          <p className="text-sm text-blue-800">
                            We&apos;ll use this information to send you your
                            personalized quote and schedule your free
                            measurement.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 1: Location Information */}
                  {currentStep === 1 && (
                    <motion.div
                      key="location"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <MapPinIcon className="inline h-4 w-4 mr-1" />
                          Installation Address *
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className={`${inputClasses} ${
                            errors.address ? errorClasses : ""
                          }`}
                          placeholder="123 Main Street"
                        />
                        {errors.address && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-1 text-sm text-red-600 flex items-center"
                          >
                            <InformationCircleIcon className="h-4 w-4 mr-1" />
                            {errors.address}
                          </motion.p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            City *
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className={`${inputClasses} ${
                              errors.city ? errorClasses : ""
                            }`}
                            placeholder="Sydney"
                          />
                          {errors.city && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-1 text-sm text-red-600"
                            >
                              {errors.city}
                            </motion.p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            State
                          </label>
                          <select
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className={inputClasses}
                          >
                            <option value="NSW">NSW</option>
                            <option value="VIC">VIC</option>
                            <option value="QLD">QLD</option>
                            <option value="WA">WA</option>
                            <option value="SA">SA</option>
                            <option value="TAS">TAS</option>
                            <option value="ACT">ACT</option>
                            <option value="NT">NT</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Postcode *
                          </label>
                          <input
                            type="text"
                            name="postcode"
                            value={formData.postcode}
                            onChange={handleInputChange}
                            className={`${inputClasses} ${
                              errors.postcode ? errorClasses : ""
                            }`}
                            placeholder="2000"
                          />
                          {errors.postcode && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-1 text-sm text-red-600"
                            >
                              {errors.postcode}
                            </motion.p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Project Requirements */}
                  {currentStep === 2 && (
                    <motion.div
                      key="project"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <HomeIcon className="inline h-4 w-4 mr-1" />
                            Room Type *
                          </label>
                          <select
                            name="roomType"
                            value={formData.roomType}
                            onChange={handleInputChange}
                            className={`${inputClasses} ${
                              errors.roomType ? errorClasses : ""
                            }`}
                          >
                            <option value="">Select room type</option>
                            <option value="Living Room">Living Room</option>
                            <option value="Bedroom">Bedroom</option>
                            <option value="Kitchen">Kitchen</option>
                            <option value="Bathroom">Bathroom</option>
                            <option value="Office">Office</option>
                            <option value="Dining Room">Dining Room</option>
                            <option value="Outdoor">Outdoor</option>
                            <option value="Conservatory">Conservatory</option>
                            <option value="Study">Study</option>
                            <option value="Children's Room">
                              Children&apos;s Room
                            </option>
                          </select>
                          {errors.roomType && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-1 text-sm text-red-600"
                            >
                              {errors.roomType}
                            </motion.p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Number of Windows *
                          </label>
                          <select
                            name="windowCount"
                            value={formData.windowCount}
                            onChange={handleInputChange}
                            className={`${inputClasses} ${
                              errors.windowCount ? errorClasses : ""
                            }`}
                          >
                            <option value="">Select quantity</option>
                            <option value="1">1 Window</option>
                            <option value="2">2 Windows</option>
                            <option value="3">3 Windows</option>
                            <option value="4">4 Windows</option>
                            <option value="5+">5+ Windows</option>
                          </select>
                          {errors.windowCount && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-1 text-sm text-red-600"
                            >
                              {errors.windowCount}
                            </motion.p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Approximate Width (mm)
                          </label>
                          <input
                            type="number"
                            name="width"
                            value={formData.width}
                            onChange={handleInputChange}
                            className={inputClasses}
                            placeholder="e.g. 1200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Approximate Height (mm)
                          </label>
                          <input
                            type="number"
                            name="height"
                            value={formData.height}
                            onChange={handleInputChange}
                            className={inputClasses}
                            placeholder="e.g. 1500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Installation Type
                        </label>
                        <select
                          name="installationType"
                          value={formData.installationType}
                          onChange={handleInputChange}
                          className={inputClasses}
                        >
                          <option value="">Select installation type</option>
                          <option value="inside-mount">Inside Mount</option>
                          <option value="outside-mount">Outside Mount</option>
                          <option value="ceiling-mount">Ceiling Mount</option>
                          <option value="not-sure">
                            Not Sure - I need advice
                          </option>
                        </select>
                      </div>

                      <div className="bg-amber-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <InformationCircleIcon className="h-5 w-5 text-amber-600" />
                          <p className="text-sm text-amber-800">
                            Don&apos;t worry if you&apos;re unsure about
                            measurements or installation type. Our expert will
                            provide precise measurements during the free
                            consultation.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Schedule & Budget */}
                  {currentStep === 3 && (
                    <motion.div
                      key="schedule"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <CurrencyDollarIcon className="inline h-4 w-4 mr-1" />
                            Budget Range *
                          </label>
                          <select
                            name="budget"
                            value={formData.budget}
                            onChange={handleInputChange}
                            className={`${inputClasses} ${
                              errors.budget ? errorClasses : ""
                            }`}
                          >
                            <option value="">Select budget range</option>
                            <option value="under-500">Under $500</option>
                            <option value="500-1000">$500 - $1,000</option>
                            <option value="1000-2000">$1,000 - $2,000</option>
                            <option value="2000-5000">$2,000 - $5,000</option>
                            <option value="over-5000">Over $5,000</option>
                          </select>
                          {errors.budget && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-1 text-sm text-red-600"
                            >
                              {errors.budget}
                            </motion.p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <ClockIcon className="inline h-4 w-4 mr-1" />
                            Timeline *
                          </label>
                          <select
                            name="urgency"
                            value={formData.urgency}
                            onChange={handleInputChange}
                            className={`${inputClasses} ${
                              errors.urgency ? errorClasses : ""
                            }`}
                          >
                            <option value="">Select timeline</option>
                            <option value="asap">ASAP (within 1 week)</option>
                            <option value="this-month">This month</option>
                            <option value="next-month">Next month</option>
                            <option value="next-3-months">
                              Within 3 months
                            </option>
                            <option value="just-browsing">Just browsing</option>
                          </select>
                          {errors.urgency && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-1 text-sm text-red-600"
                            >
                              {errors.urgency}
                            </motion.p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <CalendarIcon className="inline h-4 w-4 mr-1" />
                            Preferred Measurement Date
                          </label>
                          <input
                            type="date"
                            name="preferredDate"
                            value={formData.preferredDate}
                            onChange={handleInputChange}
                            className={inputClasses}
                            min={new Date().toISOString().split("T")[0]}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Preferred Time
                          </label>
                          <select
                            name="preferredTime"
                            value={formData.preferredTime}
                            onChange={handleInputChange}
                            className={inputClasses}
                          >
                            <option value="">Select time preference</option>
                            <option value="morning">
                              Morning (9AM - 12PM)
                            </option>
                            <option value="afternoon">
                              Afternoon (12PM - 5PM)
                            </option>
                            <option value="evening">Evening (5PM - 7PM)</option>
                            <option value="flexible">Flexible</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <ChatBubbleLeftRightIcon className="inline h-4 w-4 mr-1" />
                          Additional Comments
                        </label>
                        <textarea
                          name="comments"
                          rows={3}
                          value={formData.comments}
                          onChange={handleInputChange}
                          className={inputClasses}
                          placeholder="Any specific requirements, questions, or details we should know..."
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            name="wantsNewsletter"
                            checked={formData.wantsNewsletter}
                            onChange={handleInputChange}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">
                            Yes, I&apos;d like to receive updates on new
                            products and special offers
                          </span>
                        </label>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.form>
            </div>

            {/* Navigation Footer */}
            <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition ${
                  currentStep === 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                <ArrowLeftIcon className="h-4 w-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center space-x-2">
                {formSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition ${
                      index <= currentStep ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              {currentStep < formSteps.length - 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  <span>Continue</span>
                  <ArrowRightIcon className="h-4 w-4" />
                </button>
              ) : (
                <motion.button
                  type="submit"
                  onClick={handleSubmitQuote}
                  disabled={status === "sending"}
                  className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {status === "sending" ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 text-white"
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
                          d="M4 12a8 8 0 018-8v8z"
                        ></path>
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <CheckIcon className="h-4 w-4" />
                      <span>Get My Free Quote</span>
                    </>
                  )}
                </motion.button>
              )}
            </div>

            {/* Status Messages */}
            <AnimatePresence>
              {status === "sent" && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  className="absolute inset-0 bg-white flex items-center justify-center"
                >
                  <div className="text-center p-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <CheckIcon className="h-8 w-8 text-green-600" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Quote Request Sent!
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Thank you! We&apos;ll contact you within 24 hours with
                      your personalized quote.
                    </p>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-green-800">
                        🎉 <strong>Bonus:</strong> You&apos;re eligible for our
                        15% early bird discount!
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute top-4 left-4 right-4 bg-red-50 border border-red-200 p-4 rounded-lg"
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
                        Error sending quote request
                      </h3>
                      <div className="mt-1 text-sm text-red-700">
                        {apiError ||
                          "An error occurred. Please try again or call us at (02) 1234 5678"}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuoteDialog;
