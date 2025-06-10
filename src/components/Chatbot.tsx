"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  SparklesIcon,
  QuestionMarkCircleIcon,
  PhoneIcon,
  HomeIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  LightBulbIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import ContactForm from "./ContactForm";
import SamplesForm from "./SamplesForm";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  suggestions?: string[];
  quickActions?: QuickAction[];
}

interface QuickAction {
  id: string;
  label: string;
  action: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface ChatbotProps {
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

// Global chatbot controller
let globalChatbotController: {
  openChatbot: (message?: string, productName?: string) => void;
  closeChatbot: () => void;
} | null = null;

export const openChatbot = (message?: string, productName?: string) => {
  if (globalChatbotController) {
    globalChatbotController.openChatbot(message, productName);
  }
};

export const closeChatbot = () => {
  if (globalChatbotController) {
    globalChatbotController.closeChatbot();
  }
};

const Chatbot: React.FC<ChatbotProps> = ({
  isOpen: externalIsOpen,
  onToggle,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showRestartConfirm, setShowRestartConfirm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showSamplesForm, setShowSamplesForm] = useState(false);
  const [conversationContext, setConversationContext] = useState({
    lastProductMentioned: "",
    userIntent: "",
    conversationStep: 0,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Use external control if provided, otherwise use internal state
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = onToggle || setInternalIsOpen;

  // Predefined responses and quick actions - memoized to prevent re-creation
  const quickActions: QuickAction[] = useMemo(
    () => [
      {
        id: "quote",
        label: "Get Quote",
        action: "REQUEST_QUOTE",
        icon: CurrencyDollarIcon,
      },
      {
        id: "products",
        label: "Browse Products",
        action: "BROWSE_PRODUCTS",
        icon: ShoppingBagIcon,
      },
      {
        id: "contact",
        label: "Contact Us",
        action: "CONTACT_INFO",
        icon: PhoneIcon,
      },
      {
        id: "faq",
        label: "FAQs",
        action: "SHOW_FAQ",
        icon: QuestionMarkCircleIcon,
      },
    ],
    []
  );

  // ── OpenAI helper ─────────────────────────────────────────
  const askOpenAI = async (prompt: string): Promise<string> => {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      return data.answer ?? "Sorry, I couldn't get that right now.";
    } catch {
      return "Sorry, I'm having trouble connecting to our knowledge base.";
    }
  };
  // ──────────────────────────────────────────────────────────

  const restartChat = () => {
    setMessages([]);
    setInputValue("");
    setIsTyping(false);
    setShowRestartConfirm(false);

    // Add welcome message after a short delay
    setTimeout(() => {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        type: "bot",
        content:
          "👋 Hello! I'm here to help you find the perfect window treatments for your home. What can I assist you with today?",
        timestamp: new Date(),
        quickActions: quickActions,
      };
      setMessages([welcomeMessage]);
    }, 300);
  };

  const handleRestartClick = useCallback(() => {
    if (messages.length > 1) {
      setShowRestartConfirm(true);
    } else {
      restartChat();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length]);

  // Handle initial message when chatbot opens
  const handleInitialMessage = useCallback(
    (message: string, productName?: string) => {
      const userMessage: Message = {
        id: Date.now().toString(),
        type: "user",
        content: message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);

      // Enhanced response for quote requests
      setTimeout(() => {
        setIsTyping(false);
        let response = botResponse(message);

        // If it's a quote request and we have a product name, customize the response
        if (message.toLowerCase().includes("quote") && productName) {
          response = {
            ...response,
            content: `Perfect! I'd love to help you get a FREE quote for ${productName}.\n\nI can help you in two ways:\n\n🏠 **Book a FREE Home Consultation** - Our expert will visit your home for professional measurement and samples\n\n📞 **Get Quick Info** - Call us directly for immediate assistance\n\nWhich would you prefer?`,
            quickActions: [
              {
                id: "book-home-visit",
                label: "Book Home Consultation",
                action: "BOOK_HOME_VISIT",
                icon: HomeIcon,
              },
              {
                id: "call-now",
                label: "Call (02) 9340 5050",
                action: "CALL_US",
                icon: PhoneIcon,
              },
              {
                id: "more-info",
                label: `Learn More About ${productName}`,
                action: "PRODUCT_INFO",
                icon: LightBulbIcon,
              },
            ],
          };
        }

        setMessages((prev) => [...prev, response]);
      }, 800);
    },

    []
  );

  // Set up global controller
  useEffect(() => {
    globalChatbotController = {
      openChatbot: (message?: string, productName?: string) => {
        setIsOpen(true);
        if (message && productName) {
          setConversationContext((prev) => ({
            ...prev,
            lastProductMentioned: productName,
            userIntent: message.toLowerCase().includes("quote")
              ? "quote"
              : "general",
          }));
        }
        if (message) {
          setTimeout(() => {
            handleInitialMessage(message, productName);
          }, 500);
        }
      },
      closeChatbot: () => {
        setIsOpen(false);
      },
    };

    return () => {
      globalChatbotController = null;
    };
  }, [setIsOpen, handleInitialMessage]);

  // Function to get product specific information
  const getProductInfo = (productName: string): string => {
    const info: { [key: string]: string } = {
      "Roller Blinds":
        "✅ 100% Blockout options for bedrooms\n✅ Sunscreen fabrics for UV protection with view\n✅ Translucent for privacy with natural light\n✅ Made locally for fast delivery (1-2 weeks)\n✅ Motorisation available",
      "Roman Blinds":
        "✅ Premium designer fabrics\n✅ Elegant pleated style\n✅ Blockout and translucent options\n✅ Chain operation for easy control\n✅ Perfect for living areas and bedrooms",
      "Venetian Blinds":
        "✅ Precise light control with adjustable slats\n✅ Aluminium (25mm/50mm) or timber options\n✅ Splash-resistant for kitchens/bathrooms\n✅ Classic and modern styles available\n✅ Australian made quality",
      Shutters:
        "✅ Premium materials: ABS, Basswood, Phoenixwood\n✅ Waterproof options for wet areas\n✅ Energy efficient insulation\n✅ Adds property value\n✅ 23+ color options",
      Curtains:
        "✅ Energy efficient blockout options\n✅ Elegant sheer fabrics\n✅ Veri Shades for dual functionality\n✅ Custom made to measure\n✅ Professional installation",
      Awnings:
        "✅ Folding arm retractable awnings\n✅ Straight drop for windows\n✅ Weather sensors available\n✅ Premium acrylic fabrics\n✅ Motorised options",
    };

    return (
      info[productName] ||
      "This is a premium window treatment solution with excellent quality and local Australian manufacturing."
    );
  };

  const faqs = [
    {
      question: "What types of blinds do you offer?",
      answer:
        "We offer a comprehensive range including:\n\n🔸 Roller Blinds: Blockout (100% light blocking), Sunscreen (UV protection with view), Translucent (privacy with natural light)\n🔸 Roman Blinds: Blockout and Translucent options with premium fabrics\n🔸 Venetian Blinds: Aluminium (25mm/50mm slats), Basswood, Cedar timber\n🔸 Curtains: Blockout (energy efficient), Sheer, Veri Shades\n🔸 Shutters: ABS, Basswood, Phoenixwood, PVC Plantation\n🔸 Awnings: Folding Arm, Straight Drop, Conservatory\n🔸 Outdoor: Shade Sails, External Venetians, Roller Shutters",
    },
    {
      question: "Do you provide free quotes and measurements?",
      answer:
        "Yes! We provide completely FREE, no-obligation quotes and professional measurements. Our experts visit your home to ensure perfect fit and accurate pricing.\n\n📞 Call (02) 9340 5050 or use our online form\n📍 Service all of Sydney and NSW\n⚡ Fast turnaround - many products ready in 1-2 weeks\n✅ Professional installation included",
    },
    {
      question: "What are your warranty terms?",
      answer:
        "We offer comprehensive warranties:\n\n✅ 2+ years on mechanisms and components\n✅ Lifetime warranty on many fabric components  \n✅ Professional workmanship guarantee\n✅ Free service calls for warranty issues\n\nWarranty covers manufacturing defects and workmanship. Products must be used as intended (e.g. awnings secured in high winds). Contact us immediately for any issues - we stand behind our quality!",
    },
    {
      question: "How long does installation take?",
      answer:
        "Installation is quick and professional:\n\n🏠 Residential: 1-3 hours depending on windows\n🏢 Commercial: Varies by project size\n👥 Professional installers ensure perfect fit\n🧹 Complete cleanup included\n\nMost homes completed in single visit. We manufacture locally so lead times are often just 1-2 weeks for blinds, 4-6 weeks for custom shutters.",
    },
    {
      question: "Can I get fabric samples?",
      answer:
        "Absolutely! We provide FREE fabric samples:\n\n📦 Free samples delivered to your home\n🎨 Huge range: Sorrento, Impulse, Avalon collections\n🌟 See colors in your actual lighting\n📚 Professional sample books during consultation\n\nOur consultant brings extensive sample collections during your free measure, or we can send specific samples by post.",
    },
    {
      question: "Do you offer motorized options?",
      answer:
        "Yes! We offer advanced motorization:\n\n🎮 Remote control operation\n📱 Smart home integration (Alexa, Google)\n🌤️ Weather sensors (wind, sun, rain)\n📅 Automated scheduling\n🔧 Can upgrade manual blinds later\n\nPerfect for hard-to-reach windows, large awnings, or convenience. Motorization available for most blinds, curtains, shutters, and awnings.",
    },
    {
      question: "What's the difference between blockout and sunscreen blinds?",
      answer:
        "Great question! Here's the key differences:\n\n🌑 BLOCKOUT BLINDS:\n• 100% light blocking with coated fabric\n• Perfect for bedrooms, home theaters\n• Energy efficient - up to 24% heat reduction\n• Complete privacy day and night\n\n☀️ SUNSCREEN BLINDS:\n• Mesh fabric blocks 90%+ UV rays\n• Maintains outside view\n• Reduces glare and heat\n• Day privacy only (transparent at night with lights on)\n\nOften combined in 'Double Roller' system for maximum flexibility!",
    },
    {
      question: "Which shutter material is best?",
      answer:
        "Depends on your needs and budget:\n\n💧 ABS WATERPROOF: Best for bathrooms, kitchens\n• 100% waterproof, stainless steel hardware\n• 23 colors, 5 louvre sizes (47-114mm)\n\n🌿 BASSWOOD: Great value real timber\n• 27 paint colors + stains\n• Panels up to 1066mm wide\n\n⭐ PHOENIXWOOD: Premium hardwood luxury\n• 51 colors, hand-sanded finish\n• Furniture-quality appearance\n\n💰 PVC: Most affordable, moisture-proof\n• Rigid PVC with aluminum core\n• Perfect for humid climates",
    },
  ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message when first opened
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        type: "bot",
        content:
          "👋 Hello! I'm here to help you find the perfect window treatments for your home. What can I assist you with today?",
        timestamp: new Date(),
        quickActions: quickActions,
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length, quickActions]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl/Cmd + R to restart chat (only when chat is open and focused)
      if (isOpen && (event.ctrlKey || event.metaKey) && event.key === "r") {
        event.preventDefault();
        handleRestartClick();
      }
      // Escape to close chat
      if (isOpen && event.key === "Escape" && !showRestartConfirm) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, showRestartConfirm, handleRestartClick, setIsOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const botResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    let content = "";
    let quickActions: QuickAction[] = [];

    // SOLO saludos básicos muy específicos - todo lo demás va a IA
    if (
      lowerMessage === "hello" ||
      lowerMessage === "hi" ||
      lowerMessage === "hey" ||
      lowerMessage === "hello!" ||
      lowerMessage === "hi!" ||
      lowerMessage === "hey!" ||
      lowerMessage.match(/^(hello|hi|hey)[\s.,!]*$/i)
    ) {
      content =
        "Hello! Welcome to Quality Blinds Australia! 👋\n\nI'm here to help you find perfect window treatments for your home. We've been serving Sydney & NSW since 1989 with:\n\n✅ FREE quotes & measurements\n✅ Local manufacturing (fast turnaround)\n✅ Professional installation\n✅ Comprehensive warranties\n\nWhat can I help you with today?";
      quickActions = [
        {
          id: "quote",
          label: "Free Quote",
          action: "REQUEST_QUOTE",
          icon: CurrencyDollarIcon,
        },
        {
          id: "products",
          label: "Browse Products",
          action: "BROWSE_PRODUCTS",
          icon: ShoppingBagIcon,
        },
        {
          id: "samples",
          label: "Free Samples",
          action: "REQUEST_SAMPLES",
          icon: SparklesIcon,
        },
      ];
    }
    // TODO LO DEMÁS va a IA - ella determinará la intención real
    else {
      return {
        id: Date.now().toString(),
        type: "bot",
        content: "__OPENAI_PLACEHOLDER__",
        timestamp: new Date(),
      };
    }

    return {
      id: Date.now().toString(),
      type: "bot",
      content,
      timestamp: new Date(),
      suggestions: [],
      quickActions,
    };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    const lower = inputValue.toLowerCase();
    const categories = [
      "Roller Blinds",
      "Roman Blinds",
      "Venetian Blinds",
      "Shutters",
      "Curtains",
      "Awnings",
    ];
    const matched = categories.find((cat) => lower.includes(cat.toLowerCase()));
    if (matched) {
      setConversationContext((prev) => ({
        ...prev,
        lastProductMentioned: matched,
      }));
    }

    addMessage(userMessage);
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false);
      const response = botResponse(inputValue);
      addMessage(response);
      if (response.content === "__OPENAI_PLACEHOLDER__") {
        response.content = "";
        askOpenAI(inputValue).then((aiAnswer) => {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === response.id ? { ...m, content: aiAnswer } : m
            )
          );
        });
        return; // ya gestionado
      }
    }, 800);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "REQUEST_QUOTE":
        const quoteMessage: Message = {
          id: Date.now().toString(),
          type: "bot",
          content:
            "Perfect! I can help you get a FREE quote in the best way for you:\n\n🏠 **Book Free Home Consultation** - Professional measurement, see samples in your lighting, detailed quote\n\n📞 **Call for Quick Quote** - Speak directly with our experts\n\nWhich would you prefer?",
          timestamp: new Date(),
          quickActions: [
            {
              id: "book-home-visit",
              label: "Book Home Consultation",
              action: "BOOK_HOME_VISIT",
              icon: HomeIcon,
            },
            {
              id: "call",
              label: "Call (02) 9340 5050",
              action: "CALL_US",
              icon: PhoneIcon,
            },
          ],
        };
        addMessage(quoteMessage);
        break;

      case "BOOK_HOME_VISIT":
      case "BOOK_CONSULTATION":
        setShowContactForm(true);
        const visitMessage: Message = {
          id: Date.now().toString(),
          type: "bot",
          content:
            "Great choice! I've opened our booking form for you. This will arrange a FREE home consultation where our expert will:\n\n✅ Measure your windows professionally\n✅ Show you samples in your actual lighting\n✅ Provide a detailed quote within 24 hours\n✅ Give design advice\n\nPlease fill out the form and we'll contact you to arrange a convenient time.",
          timestamp: new Date(),
        };
        addMessage(visitMessage);
        break;

      case "REQUEST_SAMPLES":
        setShowSamplesForm(true);
        const samplesMessage: Message = {
          id: Date.now().toString(),
          type: "bot",
          content:
            "Excellent! I've opened our samples request form for you. You can choose exactly which fabric types you'd like to see and we'll send them to your home FREE of charge.\n\nUsually takes 2-3 business days to arrive!",
          timestamp: new Date(),
        };
        addMessage(samplesMessage);
        break;

      case "PRODUCT_INFO":
        if (conversationContext.lastProductMentioned) {
          const productInfoMessage: Message = {
            id: Date.now().toString(),
            type: "bot",
            content: `Here's what makes ${
              conversationContext.lastProductMentioned
            } special:\n\n${getProductInfo(
              conversationContext.lastProductMentioned
            )}\n\nWould you like to:\n• Get a quote for ${
              conversationContext.lastProductMentioned
            }\n• See fabric samples\n• Learn about other products`,
            timestamp: new Date(),
            quickActions: [
              {
                id: "book-home-visit",
                label: `Quote for ${conversationContext.lastProductMentioned}`,
                action: "BOOK_HOME_VISIT",
                icon: CurrencyDollarIcon,
              },
              {
                id: "request-samples",
                label: "Request Samples",
                action: "REQUEST_SAMPLES",
                icon: SparklesIcon,
              },
              {
                id: "browse-products",
                label: "Browse All Products",
                action: "BROWSE_PRODUCTS",
                icon: ShoppingBagIcon,
              },
            ],
          };
          addMessage(productInfoMessage);
        }
        break;

      case "BROWSE_PRODUCTS":
        window.open("/shop", "_blank");
        const browseMessage: Message = {
          id: Date.now().toString(),
          type: "bot",
          content:
            "I've opened our product catalog for you! 🛍️\n\nYou can also tell me about a specific product you're interested in:\n\n🔸 Roller Blinds\n🔸 Roman Blinds\n🔸 Venetian Blinds\n🔸 Shutters\n🔸 Awnings\n🔸 Curtains\n\nJust click on any category or ask me about it!",
          timestamp: new Date(),
          suggestions: [
            "Roller Blinds",
            "Roman Blinds",
            "Venetian Blinds",
            "Shutters",
            "Awnings",
            "Curtains",
          ],
        };
        addMessage(browseMessage);
        break;

      case "CONTACT_INFO":
        const contactMessage: Message = {
          id: Date.now().toString(),
          type: "bot",
          content:
            "Here's how to reach Quality Blinds Australia:\n\n📞 PHONE: (02) 9340 5050\n✉️ EMAIL: sales@qualityblinds.com.au\n📍 SHOWROOM: 131 Botany St, Randwick NSW 2031\n\n🕒 BUSINESS HOURS:\nMonday-Friday: 9AM-5PM\nSaturday: 9AM-2PM (by appointment)\nSunday: Closed\n\n🏠 FREE home consultations available across Sydney & NSW",
          timestamp: new Date(),
          quickActions: [
            {
              id: "call",
              label: "Call (02) 9340 5050",
              action: "CALL_US",
              icon: PhoneIcon,
            },
            {
              id: "book-home-visit",
              label: "Book Home Visit",
              action: "BOOK_HOME_VISIT",
              icon: HomeIcon,
            },
          ],
        };
        addMessage(contactMessage);
        break;

      case "SHOW_FAQ":
        const faqMessage: Message = {
          id: Date.now().toString(),
          type: "bot",
          content:
            "Here are our most frequently asked questions. Click any question to get detailed answers:",
          timestamp: new Date(),
          suggestions: faqs.slice(0, 6).map((faq) => faq.question),
        };
        addMessage(faqMessage);
        break;

      case "CALL_US":
        window.location.href = "tel:+61293405050";
        const callMessage: Message = {
          id: Date.now().toString(),
          type: "bot",
          content:
            "📞 Calling Quality Blinds Australia...\n\nIf you prefer not to call right now, I can also help you:\n• Book a free home consultation\n• Request fabric samples\n• Get product information",
          timestamp: new Date(),
          quickActions: [
            {
              id: "book-home-visit",
              label: "Book Home Visit",
              action: "BOOK_HOME_VISIT",
              icon: HomeIcon,
            },
            {
              id: "request-samples",
              label: "Request Samples",
              action: "REQUEST_SAMPLES",
              icon: SparklesIcon,
            },
          ],
        };
        addMessage(callMessage);
        break;

      case "EMAIL_US":
        window.location.href =
          "mailto:sales@qualityblinds.com.au?subject=Enquiry from Website Chatbot&body=Hello Quality Blinds,%0D%0A%0D%0AI'm interested in learning more about your window treatments. Please contact me to discuss:%0D%0A%0D%0A- Product type: [Please specify]%0D%0A- Room/area: [Please specify]%0D%0A- Preferred contact time: [Please specify]%0D%0A%0D%0AThank you!";
        break;

      default:
        console.log("Unknown action:", action);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    handleSendMessage();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? "bg-red-500 hover:bg-red-600"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6 text-white" />
        ) : (
          <ChatBubbleLeftRightIcon className="h-6 w-6 text-white" />
        )}

        {/* Notification dot */}
        {!isOpen && (
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        )}
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.3 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-3rem)] h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <SparklesIcon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold">Quality Blinds Assistant</h3>
                  <p className="text-xs text-blue-100">
                    We typically reply instantly
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 mr-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-xs">Online</span>
                </div>
                <button
                  onClick={handleRestartClick}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Start new conversation"
                >
                  <ArrowPathIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Restart Confirmation Modal */}
            <AnimatePresence>
              {showRestartConfirm && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/50 flex items-center justify-center z-10"
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-xl p-6 m-4 max-w-sm"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Start New Conversation?
                    </h3>
                    <p className="text-gray-600 mb-4">
                      This will clear your current conversation history. Are you
                      sure you want to continue?
                    </p>
                    <div className="flex space-x-3">
                      <button
                        onClick={restartChat}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Yes, Start New
                      </button>
                      <button
                        onClick={() => setShowRestartConfirm(false)}
                        className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] ${
                      message.type === "user" ? "order-2" : "order-1"
                    }`}
                  >
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        message.type === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-800 shadow-sm border border-gray-100"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">
                        {message.content}
                      </p>
                    </div>
                    <p
                      className={`text-xs text-gray-500 mt-1 ${
                        message.type === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}

              {/* Suggestions */}
              {messages.length > 0 &&
                messages[messages.length - 1].suggestions && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {messages[messages.length - 1].suggestions!.map(
                      (suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full hover:bg-blue-100 transition-colors border border-blue-200"
                        >
                          {suggestion}
                        </button>
                      )
                    )}
                  </div>
                )}

              {/* Quick Actions */}
              {messages.length > 0 &&
                messages[messages.length - 1].quickActions && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {messages[messages.length - 1].quickActions!.map(
                      (action) => {
                        const Icon = action.icon || LightBulbIcon;
                        return (
                          <button
                            key={action.id}
                            onClick={() => handleQuickAction(action.action)}
                            className="inline-flex items-center px-3 py-2 bg-white text-gray-700 text-xs rounded-lg hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm"
                          >
                            <Icon className="h-3 w-3 mr-1" />
                            {action.label}
                          </button>
                        );
                      }
                    )}
                  </div>
                )}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl px-4 py-2 shadow-sm border border-gray-100">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-4 bg-white">
              <div className="flex items-center space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm bg-white text-gray-900 placeholder:text-gray-500 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <PaperAirplaneIcon className="h-4 w-4" />
                </button>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-gray-500">
                  Powered by Quality Blinds Australia
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-400 hidden sm:inline">
                    Ctrl+R: New Chat • Esc: Close
                  </span>
                  {messages.length > 1 && (
                    <button
                      onClick={handleRestartClick}
                      className="text-xs text-blue-600 hover:text-blue-800 transition-colors flex items-center space-x-1"
                    >
                      <ArrowPathIcon className="h-3 w-3" />
                      <span>New Chat</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {showContactForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowContactForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowContactForm(false)}
                className="absolute top-4 right-4 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100"
              >
                <XMarkIcon className="h-5 w-5 text-gray-600" />
              </button>
              <ContactForm />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Samples Form Modal */}
      <AnimatePresence>
        {showSamplesForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowSamplesForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowSamplesForm(false)}
                className="absolute top-4 right-4 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100"
              >
                <XMarkIcon className="h-5 w-5 text-gray-600" />
              </button>
              <SamplesForm onClose={() => setShowSamplesForm(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
