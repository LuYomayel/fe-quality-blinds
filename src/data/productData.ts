export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  images: Array<{
    src: string;
    alt: string;
  }>;
  relatedProducts: Array<{
    id: string;
    name: string;
    image: string;
    alt?: string;
    href: string;
    shortDescription: string;
  }>;
  variants: {
    // Traditional size variants
    width: string[];
    height: string[];
    // Enhanced variant system with rich data
    colors?: Array<{
      name: string;
      value: string; // hex color or color class
      image?: string; // Optional image showing the color
      description?: string;
      available: boolean;
    }>;
    fabrics?: Array<{
      id: string;
      name: string;
      image: string;
      thumbnail: string;
      type: string; // "blockout", "translucent", "sheer", "sunscreen", etc.
      description: string;
      features: string[]; // ["UV Protection", "Easy Clean", etc.]
      opacity: number; // 0-100, 0 = transparent, 100 = blockout
      available: boolean;
      premium?: boolean;
      sampleAvailable?: boolean;
    }>;
    materials?: Array<{
      id: string;
      name: string;
      image: string;
      thumbnail: string;
      type: string; // "wood", "aluminum", "pvc", "fabric", etc.
      description: string;
      features: string[];
      finish?: string; // "matte", "glossy", "textured", etc.
      available: boolean;
      premium?: boolean;
    }>;
    slatSizes?: Array<{
      size: string; // "25mm", "50mm", "63mm", "89mm"
      name: string;
      image: string;
      description: string;
      recommended: string[]; // Room types where this size works best
      available: boolean;
    }>;
    controls?: Array<{
      type: string; // "manual", "motorized", "smart"
      name: string;
      image: string;
      description: string;
      features: string[];
      available: boolean;
      premium?: boolean;
    }>;
    mountings?: Array<{
      type: string; // "inside", "outside", "ceiling"
      name: string;
      image: string;
      description: string;
      compatibility: string[]; // Which products this works with
      available: boolean;
    }>;
    // Legacy color array (keep for backward compatibility)
    color: string[];
  };
  rating: number;
  reviewCount: number;
  stock: number;
  features: string[];
  specifications: Record<string, string>;
  category?: string;
  subcategory?: string;
  heroImage?: string;
  benefits?: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
}

export const productData: Product[] = [
  {
    id: "conservatory-awnings",
    name: "Conservatory Awnings",
    shortDescription:
      "The Conservatory Awning is a fully automated and motorized shading system, controlled by remote – so you can sit back and enjoy sun protection at the touch of a button.",
    description:
      "The Conservatory Awning is a fully automated and motorized shading system, controlled by remote – so you can sit back and enjoy sun protection at the touch of a button. When not in use, the awnings fully retract into a discretely positioned headbox to avoid damage from the elements, while also extending the lifespan of your system. ",
    images: [
      {
        src: "/images/conservatory-awning-1.webp",
        alt: "Conservatory Awning",
      },
      {
        src: "/images/conservatory-awning-2.webp",
        alt: "Conservatory Awning Installation",
      },
      {
        src: "/images/conservatory-awning-3.webp",
        alt: "Conservatory Awning Side View",
      },
      {
        src: "/images/conservatory-awning-4.webp",
        alt: "Conservatory Awning Detail",
      },
      {
        src: "/images/conservatory-awning-5.webp",
        alt: "Conservatory Awning Extended",
      },
    ],
    relatedProducts: [
      {
        id: "folding-arm-awnings",
        name: "Folding Arm Awnings",
        image: "/images/folding-arm-awning-1.webp",
        alt: "Folding Arm Awnings",
        href: "/awnings/folding-arm-awnings",
        shortDescription:
          "The Conservatory Awning is a fully automated and motorized shading system, controlled by remote – so you can sit back and enjoy sun protection at the touch of a button.",
      },
      {
        id: "straight-drop-awnings",
        name: "Straight Drop Awnings",
        image: "/images/straight-drop-awning-1.webp",
        alt: "Straight Drop Awnings",
        href: "/awnings/straight-drop-awnings",
        shortDescription:
          "The Conservatory Awning is a fully automated and motorized shading system, controlled by remote – so you can sit back and enjoy sun protection at the touch of a button.",
      },
      {
        id: "canopy-awning",
        name: "Canopy Awning",
        image: "/images/canopy-awning-1.webp",
        alt: "Canopy Awning",
        href: "/awnings/canopy-awning",
        shortDescription:
          "The Conservatory Awning is a fully automated and motorized shading system, controlled by remote – so you can sit back and enjoy sun protection at the touch of a button.",
      },
    ],
    variants: {
      width: [],
      height: [],
      color: [],
      fabrics: [
        {
          id: "sunscreen-charcoal",
          name: "Sunscreen Charcoal",
          image: "/images/fabric-sunscreen-charcoal.jpg",
          thumbnail: "/images/fabric-sunscreen-charcoal-thumb.jpg",
          type: "sunscreen",
          description:
            "High-performance sunscreen fabric that blocks harmful UV rays while maintaining excellent visibility and airflow.",
          features: [
            "95% UV Protection",
            "Breathable",
            "Easy Clean",
            "Fade Resistant",
          ],
          opacity: 15,
          available: true,
          premium: false,
          sampleAvailable: true,
        },
        {
          id: "blockout-white",
          name: "Blockout White",
          image: "/images/fabric-blockout-white.jpg",
          thumbnail: "/images/fabric-blockout-white-thumb.jpg",
          type: "blockout",
          description:
            "Complete light blocking fabric perfect for creating comfortable shaded areas and privacy.",
          features: [
            "100% Light Block",
            "Privacy",
            "Temperature Control",
            "Durable",
          ],
          opacity: 100,
          available: true,
          premium: false,
          sampleAvailable: true,
        },
        {
          id: "translucent-cream",
          name: "Translucent Cream",
          image: "/images/fabric-translucent-cream.jpg",
          thumbnail: "/images/fabric-translucent-cream-thumb.jpg",
          type: "translucent",
          description:
            "Soft translucent fabric that filters light beautifully while providing gentle shade and elegance.",
          features: [
            "Light Filtering",
            "Elegant Appearance",
            "UV Protection",
            "Weather Resistant",
          ],
          opacity: 40,
          available: true,
          premium: true,
          sampleAvailable: true,
        },
      ],
      colors: [
        {
          name: "Classic White",
          value: "#FFFFFF",
          description:
            "Timeless white finish that complements any exterior design",
          available: true,
        },
        {
          name: "Charcoal Grey",
          value: "#36454F",
          description: "Modern charcoal grey for contemporary homes",
          available: true,
        },
        {
          name: "Heritage Green",
          value: "#355E3B",
          description:
            "Traditional green that blends with natural surroundings",
          available: true,
        },
        {
          name: "Coastal Blue",
          value: "#4682B4",
          description: "Fresh blue perfect for coastal and modern properties",
          available: false,
        },
      ],
      controls: [
        {
          type: "motorized",
          name: "Remote Control Motor",
          image: "/images/control-remote.jpg",
          description:
            "Convenient remote control operation with multiple awnings control capability.",
          features: [
            "Multi-awning Control",
            "Quiet Operation",
            "Weather Sensors Compatible",
            "5 Year Warranty",
          ],
          available: true,
          premium: true,
        },
        {
          type: "smart",
          name: "Smart Home Integration",
          image: "/images/control-smart.jpg",
          description:
            "WiFi enabled smart control compatible with Alexa, Google Home, and smartphone apps.",
          features: [
            "Voice Control",
            "Smartphone App",
            "Scheduling",
            "Weather Integration",
          ],
          available: true,
          premium: true,
        },
        {
          type: "manual",
          name: "Manual Crank",
          image: "/images/control-manual.jpg",
          description: "Reliable manual operation with smooth gear mechanism.",
          features: [
            "No Power Required",
            "Durable Mechanism",
            "Cost Effective",
            "Easy Operation",
          ],
          available: true,
          premium: false,
        },
      ],
      mountings: [
        {
          type: "wall",
          name: "Wall Mount",
          image: "/images/mount-wall.jpg",
          description:
            "Standard wall mounting for most conservatory applications.",
          compatibility: ["Brick Walls", "Rendered Walls", "Timber Frames"],
          available: true,
        },
        {
          type: "roof",
          name: "Roof Mount",
          image: "/images/mount-roof.jpg",
          description:
            "Roof mounting system for conservatories without suitable wall space.",
          compatibility: ["Glass Roofs", "Polycarbonate Roofs", "Solid Roofs"],
          available: true,
        },
      ],
    },
    rating: 0,
    reviewCount: 0,
    stock: 0,
    features: [
      "Remote‑controlled operation",
      "Retracts into protective headbox",
      "Reduces heat and glare",
      "Custom sized for glass roofs",
      "Motorised with sun & wind sensors",
      "Durable powder‑coated frame",
    ],
    specifications: {},
  },
  {
    id: "folding-arm-awnings",
    name: "Folding Arm Awnings",
    shortDescription:
      "Folding Arm Awnings allow you to choose how much shade the awning provides; they retract into a compact headbox when closed, offering a neat appearance.",
    description:
      "Folding Arm Awnings allow you to choose how much shade the awning provides; they retract into a compact headbox when closed, offering a neat appearance. Available in manual (gear) or motorised operation (motorisation recommended due to arm tension), constructed with high-tension triple spring arms and PVC-coated stainless steel cables. Frames are powder-coated in Dulux Duralloy range; optional wind, sun, rain, and motion sensors allow automatic operation. ",
    images: [
      {
        src: "/images/folding-arm-awning-1.webp",
        alt: "Folding Arm Awning",
      },
      {
        src: "/images/folding-arm-awning-2.webp",
        alt: "Folding Arm Awning Extended",
      },
      {
        src: "/images/folding-arm-awning-3.webp",
        alt: "Folding Arm Awning Detail",
      },
      {
        src: "/images/folding-arm-awning-4.webp",
        alt: "Folding Arm Awning Installation",
      },
    ],
    relatedProducts: [
      {
        id: "conservatory-awnings",
        name: "Conservatory Awnings",
        image: "/images/conservatory-awning-1.webp",
        alt: "Conservatory Awnings",
        href: "/awnings/conservatory-awnings",
        shortDescription:
          "Folding Arm Awnings allow you to choose how much shade the awning provides; they retract into a compact headbox when closed, offering a neat appearance.",
      },
      {
        id: "straight-drop-awnings",
        name: "Straight Drop Awnings",
        image: "/images/straight-drop-awning-1.webp",
        alt: "Straight Drop Awnings",
        href: "/awnings/straight-drop-awnings",
        shortDescription:
          "Folding Arm Awnings allow you to choose how much shade the awning provides; they retract into a compact headbox when closed, offering a neat appearance.",
      },
      {
        id: "canopy-awning",
        name: "Canopy Awning",
        image: "/images/canopy-awning-1.webp",
        alt: "Canopy Awning",
        href: "/awnings/canopy-awning",
        shortDescription:
          "Folding Arm Awnings allow you to choose how much shade the awning provides; they retract into a compact headbox when closed, offering a neat appearance.",
      },
    ],
    variants: {
      width: [],
      height: [],
      color: [],
    },
    rating: 0,
    reviewCount: 0,
    stock: 0,
    features: [
      "Spans up to 7 m wide",
      "Self‑supporting arms (no posts)",
      "High‑tension triple springs",
      "Semi & full cassette options",
      "Manual or motorised control",
      "Weather‑sensor automation ready",
    ],
    specifications: {},
  },
  {
    id: "straight-drop-awnings",
    name: "Straight Drop Awnings",
    shortDescription:
      "Straight Drop Awnings can be installed on the outside of a window to provide shade without interfering with interior décor.",
    description:
      "Straight Drop Awnings can be installed on the outside of a window to provide shade without interfering with interior décor. Available in acrylic, canvas, or sunscreen fabrics; transparent PVC option offers weather protection without obstructing views. Operated via crank (manual) or motorised; optional weather sensors (wind, sun, rain) for automatic retraction. Technical specifications: minimum width 3000 mm, projection 2000 mm, frame colour options in powder-coated finish. ",
    images: [
      {
        src: "/images/straight-drop-awning-1.webp",
        alt: "Straight Drop Awning",
      },
      {
        src: "/images/straight-drop-awning-2.webp",
        alt: "Straight Drop Awning Extended",
      },
      {
        src: "/images/straight-drop-awning-3.webp",
        alt: "Straight Drop Awning Detail",
      },
      {
        src: "/images/straight-drop-awning-4.webp",
        alt: "Straight Drop Awning Installation",
      },
    ],
    relatedProducts: [
      {
        id: "conservatory-awnings",
        name: "Conservatory Awnings",
        image: "/images/conservatory-awning-1.webp",
        alt: "Conservatory Awnings",
        href: "/awnings/conservatory-awnings",
        shortDescription:
          "Straight Drop Awnings can be installed on the outside of a window to provide shade without interfering with interior décor.",
      },
      {
        id: "folding-arm-awnings",
        name: "Folding Arm Awnings",
        image: "/images/folding-arm-awning-1.webp",
        alt: "Folding Arm Awnings",
        href: "/awnings/folding-arm-awnings",
        shortDescription:
          "Straight Drop Awnings can be installed on the outside of a window to provide shade without interfering with interior décor.",
      },
      {
        id: "canopy-awning",
        name: "Canopy Awning",
        image: "/images/canopy-awning.webp",
        alt: "Canopy Awning",
        href: "/awnings/canopy-awning",
        shortDescription:
          "Straight Drop Awnings can be installed on the outside of a window to provide shade without interfering with interior décor.",
      },
    ],
    variants: {
      width: [],
      height: [],
      color: [],
    },
    rating: 0,
    reviewCount: 0,
    stock: 0,
    features: [
      "Vertical drop design",
      "Acrylic, canvas or mesh fabrics",
      "Crank or motorised operation",
      "UV & weather protection",
      "Clear PVC rain‑barrier option",
      "Optional wind‑sensor retraction",
    ],
    specifications: {},
  },
  {
    id: "canopy-awning",
    name: "Canopy Awning",
    shortDescription:
      "Canopy Awning is not currently listed on the Quality Blinds website; consider providing custom specifications or contacting Quality Blinds for a bespoke solution.",
    description:
      "Canopy Awning is not currently listed on the Quality Blinds website; consider providing custom specifications or contacting Quality Blinds for a bespoke solution. ",
    images: [
      {
        src: "/images/fixed-canopy-awning-1.webp",
        alt: "Fixed Canopy Awning",
      },
      {
        src: "/images/canopy-1.webp",
        alt: "Canopy Awning Style",
      },
      {
        src: "/images/awning-1.webp",
        alt: "Awning Installation",
      },
      {
        src: "/images/awning-2.webp",
        alt: "Awning Detail",
      },
    ],
    relatedProducts: [
      {
        id: "conservatory-awnings",
        name: "Conservatory Awnings",
        image: "/images/conservatory-awning-1.webp",
        alt: "Conservatory Awnings",
        href: "/awnings/conservatory-awnings",
        shortDescription:
          "Canopy Awning is not currently listed on the Quality Blinds website; consider providing custom specifications or contacting Quality Blinds for a bespoke solution.",
      },
      {
        id: "folding-arm-awnings",
        name: "Folding Arm Awnings",
        image: "/images/folding-arm-awnings.webp",
        href: "/awnings/folding-arm-awnings",
        shortDescription:
          "Canopy Awning is not currently listed on the Quality Blinds website; consider providing custom specifications or contacting Quality Blinds for a bespoke solution.",
      },
      {
        id: "straight-drop-awnings",
        name: "Straight Drop Awnings",
        image: "/images/straight-drop-awnings.webp",
        href: "/awnings/straight-drop-awnings",
        shortDescription:
          "Canopy Awning is not currently listed on the Quality Blinds website; consider providing custom specifications or contacting Quality Blinds for a bespoke solution.",
      },
    ],
    variants: {
      width: [],
      height: [],
      color: [],
    },
    rating: 0,
    reviewCount: 0,
    stock: 0,
    features: [
      "Classic curved canopy shape",
      "Custom branding signage friendly",
      "Weather‑resistant acrylic fabrics",
      "Protects doors & shopfronts",
      "Aluminium powder‑coated frame",
      "Multiple projections & shapes",
    ],
    specifications: {},
  },
  {
    id: "aluminium-venetian-blinds",
    name: "Aluminium Venetian Blinds",
    category: "blinds",
    subcategory: "venetian",
    shortDescription:
      "Aluminium Venetian Blinds are splash-resistant, warp-proof, and easy to clean, available in 25 mm and 50 mm slat widths with a thicker alloy for enhanced strength and longevity.",
    description:
      "Constructed from a specialised aluminium alloy (not PVC), our Aluminium Venetian Blinds come in 25 mm and 50 mm slat widths and a wide colour palette—from pastels to metallic and wood-effect finishes. Their thicker slats provide extra durability, while the splash-proof, warp-resistant surface makes them ideal for kitchens, bathrooms, and high-humidity areas.",
    images: [
      {
        src: "/images/external-venetian-1.webp",
        alt: "Aluminium Venetian Blind 1",
      },
      {
        src: "/images/external-venetian-2.webp",
        alt: "Aluminium Venetian Blind 2",
      },
      {
        src: "/images/external-venetian-3.webp",
        alt: "Aluminium Venetian Blind 3",
      },
      {
        src: "/images/external-venetian-4.webp",
        alt: "Aluminium Venetian Blind 4",
      },
      {
        src: "/images/external-venetian-5.webp",
        alt: "Aluminium Venetian Blind 5",
      },
    ],
    relatedProducts: [
      {
        id: "basswood-venetian-blinds",
        name: "Basswood Venetian Blinds",
        image: "/images/basswood-venetian-blind-1.webp",
        alt: "Basswood Venetian Blind 1",
        href: "/blinds/basswood-venetian-blinds",
        shortDescription:
          "Outdoor Aluminium Venetian Blinds are highly practical and versatile, made from a specialised aluminium alloy thicker than market standards for extra durability and strength.",
      },
    ],
    variants: {
      width: [],
      height: [],
      color: [],
    },
    rating: 0,
    reviewCount: 0,
    stock: 0,
    features: [
      "25 mm & 50 mm alloy slats",
      "Moisture & warp‑resistant",
      "Easy wipe‑clean surface",
      "Precise tilt light control",
      "Modern metallic & matte colours",
      "Thicker‑gauge slats for durability",
    ],
    specifications: {},
  },
  {
    id: "basswood-venetian-blinds",
    name: "Basswood Venetian Blinds",
    category: "blinds",
    subcategory: "venetian",
    shortDescription:
      "Basswood Venetian Blinds are lightweight timber blinds available in a wide choice of colours and stains to complement any décor, and are easy to clean and maintain.",
    description:
      "Our Basswood Venetian Blinds enhance your home's natural charm with robust timber stability and a broad palette of colours and stains. Easy to operate, clean, and install, these blinds bring the outdoors inside and suit any décor effortlessly.",
    images: [
      {
        src: "/images/timber-venetian-1.jpg",
        alt: "Basswood Venetian Blind 1",
      },
      {
        src: "/images/timber-venetian-2.jpg",
        alt: "Basswood Venetian Blind 2",
      },
      {
        src: "/images/timber-venetian-3.jpg",
        alt: "Basswood Venetian Blind 3",
      },
      {
        src: "/images/basswood-shutter-1.webp",
        alt: "Basswood Style Detail",
      },
    ],
    relatedProducts: [
      {
        id: "aluminium-venetian-blinds",
        name: "Aluminium Venetian Blinds",
        image: "/images/aluminium-venetian-blind-1.webp",
        alt: "Aluminium Venetian Blind 1",
        href: "/blinds/aluminium-venetian-blinds",
        shortDescription:
          "Basswood Venetian Blinds are lightweight and bring natural beauty into your home, offering a full range of tints and stains to match any decor.",
      },
    ],
    variants: {
      width: [],
      height: [],
      color: [],
    },
    rating: 0,
    reviewCount: 0,
    stock: 0,
    features: [
      "Lightweight basswood timber",
      "Warm natural grain & stains",
      "Excellent thermal insulation",
      "Smooth lift & tilt operation",
      "Custom colour matching",
      "Sustainably sourced wood",
    ],
    specifications: {},
  },
  {
    id: "blockout-roller-blinds",
    name: "Blockout Roller Blinds",
    category: "blinds",
    subcategory: "roller",
    shortDescription:
      "Blocks 100% of light for maximum darkness and privacy. Reduces energy bills and withstands the harsh Australian sun—ideal for bedrooms, living rooms, and offices.",
    description:
      "Blockout Roller Blinds are the ultimate solution for complete light control, privacy, and insulation. Crafted from premium, coated fabrics that block 100% of sunlight, these blinds are perfect for bedrooms, media rooms, offices, and any space requiring total darkness. Their superior insulation keeps your home cooler in summer and warmer in winter, helping to reduce energy bills by up to 24%. Designed to withstand the harsh Australian sun, they are low-maintenance, easy to clean, and can be upgraded from manual to motorised operation—even years after installation. Custom-made to your measurements, Blockout Roller Blinds offer a sleek, contemporary look and are available in over 100 colours and textures. They can be installed alone or paired with sheer curtains for a modern layered effect.",
    images: [
      {
        src: "/images/blockout-roller-blind-5.webp",
        alt: "Blockout Roller Blind 1",
      },
      {
        src: "/images/blockout-roller-blind-6.webp",
        alt: "Blockout Roller Blind 2",
      },
      {
        src: "/images/blockout-roller-blind-7.webp",
        alt: "Blockout Roller Blind 3",
      },
      {
        src: "/images/blockout-roller-blind-8.webp",
        alt: "Blockout Roller Blind 4",
      },
    ],
    relatedProducts: [
      {
        id: "blockout-roman-blinds",
        name: "Blockout Roman Blinds",
        image: "/images/blockout-roman-blind-1.webp",
        href: "/blinds/blockout-roman-blinds",
        shortDescription:
          "Blockout Roman Blinds provide complete darkness and timeless style—ideal for bedrooms and media rooms.",
      },
    ],
    variants: {
      width: [],
      height: [],
      color: [],
    },
    rating: 4.9,
    reviewCount: 211,
    stock: 32,
    features: [
      "Blocks 100% of light",
      "Reduces heat transfer by up to 24%",
      "Available in 100+ colours",
      "Custom made to measure",
      "Easy to clean & maintain",
      "Upgrade to motorised operation anytime",
      "Withstands harsh Australian sun",
    ],
    benefits: [
      {
        title: "Total Darkness",
        description:
          "Ensures restful sleep and complete privacy, day or night.",
      },
      {
        title: "Energy Efficient",
        description:
          "Helps keep your home cooler in summer and warmer in winter, reducing energy costs.",
      },
      {
        title: "Durable & Stylish",
        description:
          "Designed for longevity and available in a huge range of designer fabrics.",
      },
    ],
    specifications: {
      "Fabric Type": "Blockout coated polyester or acrylic",
      "Light Block": "100%",
      Operation: "Manual chain or motorised",
      Mounting: "Inside or outside window frame",
      Warranty: "2+ years on mechanisms, lifetime on many fabrics",
      Customisation: "Over 100 colours, multiple textures",
    },
  },
  {
    id: "blockout-roman-blinds",
    name: "Blockout Roman Blinds",
    category: "blinds",
    subcategory: "roman",
    shortDescription:
      "Elegant pleated blinds with blockout lining for total darkness, privacy, and timeless style—custom-made in premium Australian fabrics.",
    description:
      "Blockout Roman Blinds combine the classic beauty of pleated fabric shades with the practical benefits of total light block and insulation. Made from premium fabrics sourced from trusted Australian suppliers, these blinds feature a continuous single-piece design with optional blockout lining, making them ideal for bedrooms, media rooms, or any space where darkness and privacy are essential. The chain-operated tracking system and aluminium back battens ensure a crisp, tailored fold and easy operation. Their soft, elegant look adds warmth and sophistication to any décor, while the blockout lining helps maintain comfortable room temperatures year-round.",
    images: [
      {
        src: "/images/blockout-roller-blind-5.webp",
        alt: "Blockout Roman Blind Style",
      },
      {
        src: "/images/blockout-curtain-1.webp",
        alt: "Blockout Fabric Detail",
      },
      {
        src: "/images/blockout-curtain-2.webp",
        alt: "Blockout Material Close-up",
      },
    ],
    relatedProducts: [
      {
        id: "blockout-roller-blinds",
        name: "Blockout Roller Blinds",
        image: "/images/blockout-roller-blind-1.webp",
        href: "/blinds/blockout-roller-blinds",
        shortDescription:
          "Blockout Roller Blinds provide total darkness and energy efficiency—perfect for bedrooms and living areas.",
      },
    ],
    variants: {
      width: [],
      height: [],
      color: [],
    },
    rating: 4.8,
    reviewCount: 94,
    stock: 19,
    features: [
      "Elegant pleated style",
      "Blockout lining for 100% light block",
      "Chain-operated tracking system",
      "Aluminium back battens for crisp folds",
      "Premium Australian fabrics",
      "Custom made to measure",
    ],
    benefits: [
      {
        title: "Complete Darkness",
        description:
          "Perfect for restful sleep, home theatres, or shift workers.",
      },
      {
        title: "Timeless Style",
        description:
          "Soft, tailored folds add warmth and sophistication to any room.",
      },
      {
        title: "Thermal Insulation",
        description:
          "Blockout lining helps keep your room cooler in summer and warmer in winter.",
      },
    ],
    specifications: {
      "Fabric Type": "Premium blockout or decorative fabrics",
      Operation: "Chain-operated tracking system",
      Mounting: "Inside or outside window recess",
      Customisation: "Wide choice of colours and patterns",
    },
  },
  {
    id: "blockout-curtains",
    name: "Blockout Curtains",
    shortDescription:
      "Blockout Curtains use proprietary three-weave technology to block 99% of harmful UV rays and 100% of harsh sunlight, improving energy efficiency year-round.",
    description:
      "Blockout Curtains minimize heat transfer through windows by up to 24%, keeping rooms cooler in summer and warmer in winter. Made with a proprietary three-weave fabric, they block nearly all sunlight and UV radiation, enhance privacy, reduce noise, and help lower energy bills. Ideal for bedrooms, home theaters, and any space requiring complete light control and insulation.",
    images: [
      {
        src: "/images/blockout-curtain-1.webp",
        alt: "Blockout Curtains 1",
      },
      {
        src: "/images/blockout-curtain-2.webp",
        alt: "Blockout Curtains 2",
      },
      {
        src: "/images/blockout-curtain-3.webp",
        alt: "Blockout Curtains 3",
      },
      {
        src: "/images/blockout-curtain-4.webp",
        alt: "Blockout Curtains 4",
      },
    ],
    relatedProducts: [
      {
        id: "curtains",
        name: "Curtains",
        image: "/images/curtain-2.webp",
        href: "/curtains/curtains",
        shortDescription:
          "Blockout Curtains are manufactured using a proprietary three-weave technology that blocks 99 % of harmful UV rays and 100 % of harsh sunlight.",
      },
      {
        id: "sheer-curtains",
        name: "Sheer Curtains",
        image: "/images/sheer-curtain-1.webp",
        href: "/curtains/sheer-curtains",
        shortDescription:
          "Blockout Curtains are manufactured using a proprietary three-weave technology that blocks 99 % of harmful UV rays and 100 % of harsh sunlight.",
      },
      {
        id: "veri-shades",
        name: "Veri Shades",
        image: "/images/veri-shades-curtain-1.webp",
        href: "/curtains/veri-shades",
        shortDescription:
          "Blockout Curtains are manufactured using a proprietary three-weave technology that blocks 99 % of harmful UV rays and 100 % of harsh sunlight.",
      },
    ],
    variants: {
      width: [],
      height: [],
      color: [],
    },
    rating: 0,
    reviewCount: 0,
    stock: 0,
    features: [
      "Blocks 99% of light & UV",
      "Triple‑weave thermal fabric",
      "Noise dampening",
      "Energy‑saving insulation",
      "Custom headings & lengths",
      "Wide colour selection",
    ],
    specifications: {},
  },
  {
    id: "curtains",
    name: "Curtains",
    shortDescription:
      "Enhance privacy, control light, and add elegance with custom-made curtains in blockout, sheer, or Veri Shade styles—perfect for any room.",
    description:
      "Curtains are a timeless window dressing that offer privacy, light control, temperature regulation, and a touch of elegance to any interior. Choose from a wide range of styles including blockout curtains for maximum darkness and energy efficiency, sheer curtains for soft filtered light and daytime privacy, or Veri Shades for the combined benefits of blinds and drapes. Professionally measured and installed, our curtains are custom-made to your requirements and available in a vast selection of fabrics, colours, and headings. They can be layered for extra insulation and style, making them suitable for bedrooms, living areas, and home theatres.",
    images: [
      {
        src: "/images/curtain-2.webp",
        alt: "Curtain 1",
      },
      {
        src: "/images/curtain-3.webp",
        alt: "Curtain 2",
      },
      {
        src: "/images/curtain-4.webp",
        alt: "Curtain 3",
      },
      {
        src: "/images/blockout-curtain-1.webp",
        alt: "Blockout Curtains Style",
      },
    ],
    relatedProducts: [
      {
        id: "blockout-curtains",
        name: "Blockout Curtains",
        image: "/images/blockout-curtain-1.webp",
        href: "/curtains/blockout-curtains",
        shortDescription:
          "Blockout Curtains provide complete darkness and insulation—ideal for bedrooms and home theatres.",
      },
      {
        id: "sheer-curtains",
        name: "Sheer Curtains",
        image: "/images/sheer-curtain-1.webp",
        href: "/curtains/sheer-curtains",
        shortDescription:
          "Sheer Curtains offer soft filtered light and daytime privacy, perfect for living areas.",
      },
      {
        id: "veri-shades",
        name: "Veri Shades",
        image: "/images/veri-shades-curtain-1.webp",
        href: "/curtains/veri-shades",
        shortDescription:
          "Veri Shades combine the look of curtains with the versatility of blinds.",
      },
    ],
    variants: {
      width: [],
      height: [],
      color: [],
    },
    rating: 4.7,
    reviewCount: 132,
    stock: 21,
    features: [
      "Custom made to measure",
      "Available in blockout, sheer, and Veri Shade styles",
      "Enhances privacy and comfort",
      "Wide range of fabrics and colours",
      "Professional installation",
      "Layering options for insulation and style",
    ],
    benefits: [
      {
        title: "Versatile Style",
        description:
          "Choose from blockout, sheer, or Veri Shade options to suit your décor.",
      },
      {
        title: "Light & Temperature Control",
        description:
          "Regulate sunlight and insulate your home for year-round comfort.",
      },
      {
        title: "Custom Fit",
        description:
          "Made to your exact window measurements for a perfect finish.",
      },
    ],
    specifications: {
      Styles: "Blockout, Sheer, Veri Shades, Fabric Shades",
      Operation: "Hand-drawn or motorised tracks",
      Customisation: "Wide fabric and heading selection",
      Insulation: "Excellent thermal and acoustic properties (blockout)",
    },
  },
  {
    id: "sheer-curtains",
    name: "Sheer Curtains",
    shortDescription:
      "Sheer Curtains soften incoming light, add style, and offer daytime privacy—perfect for layering with roller or blockout treatments.",
    description:
      "Lightweight sheer curtains soften natural light and add instant style to any décor. They provide daytime privacy and work beautifully as part of layered window treatments. When interior lights are on at night, they become more transparent, so consider pairing with blockout curtains for full privacy. Their versatile, gauzy fabrics create a serene, airy atmosphere in living rooms, bedrooms, or any space.",
    images: [
      {
        src: "/images/sheer-curtain-2.webp",
        alt: "Sheer Curtain 1",
      },
      {
        src: "/images/sheer-curtain-3.webp",
        alt: "Sheer Curtain 2",
      },
      {
        src: "/images/sheer-curtain-4.webp",
        alt: "Sheer Curtain 3",
      },
      {
        src: "/images/sheer-curtain-5.webp",
        alt: "Sheer Curtain 4",
      },
    ],
    relatedProducts: [
      {
        id: "blockout-curtains",
        name: "Blockout Curtains",
        image: "/images/blockout-curtain-1.webp",
        href: "/curtains/blockout-curtains",
        shortDescription:
          "Sheer Curtains are lightweight fabrics that soften incoming light and add style to home décor.",
      },
      {
        id: "curtains",
        name: "Curtains",
        image: "/images/curtain-2.webp",
        href: "/curtains/curtains",
        shortDescription:
          "Sheer Curtains are lightweight fabrics that soften incoming light and add style to home décor.",
      },
      {
        id: "veri-shades",
        name: "Veri Shades",
        image: "/images/veri-shades-curtain-1.webp",
        href: "/curtains/veri-shades",
        shortDescription:
          "Sheer Curtains are lightweight fabrics that soften incoming light and add style to home décor.",
      },
    ],
    variants: {
      width: [],
      height: [],
      color: [],
    },
    rating: 0,
    reviewCount: 0,
    stock: 0,
    features: [
      "Soft diffused daylight",
      "Daytime privacy",
      "Lightweight voile fabrics",
      "Layers beautifully with blinds",
      "Machine‑washable options",
      "Custom pleat styles",
    ],
    specifications: {},
  },
  {
    id: "veri-shades",
    name: "Veri Shades",
    shortDescription:
      "Veri Shades combine the elegance of sheer fabrics, the privacy of curtains, and the adaptability of blinds.",
    description:
      "Veri Shades combine the elegance of sheer fabrics, the privacy of curtains, and the adaptability of blinds. Designed to withstand harsh Australian climate, available in Titan, Titan Forte, Titan Flex, and Millenium variants. Professional consultation, installation, and maintenance services are offered. Choose from a wide colour palette in acrylic, Dickson, and Docril fabrics for folding arm awnings. ",
    images: [
      {
        src: "/images/veri-shades-curtain-1.webp",
        alt: "Veri Shades Curtain 1",
      },
      {
        src: "/images/curtain-1.webp",
        alt: "Curtain 1",
      },
    ],
    relatedProducts: [
      {
        id: "blockout-curtains",
        name: "Blockout Curtains",
        image: "/images/blockout-curtain-1.webp",
        href: "/curtains/blockout-curtains",
        shortDescription:
          "Veri Shades combine the elegance of sheer fabrics, the privacy of curtains, and the adaptability of blinds.",
      },
      {
        id: "curtains",
        name: "Curtains",
        image: "/images/curtain-2.webp",
        href: "/curtains/curtains",
        shortDescription:
          "Veri Shades combine the elegance of sheer fabrics, the privacy of curtains, and the adaptability of blinds.",
      },
      {
        id: "sheer-curtains",
        name: "Sheer Curtains",
        image: "/images/sheer-curtain-2.webp",
        href: "/curtains/sheer-curtains",
        shortDescription:
          "Veri Shades combine the elegance of sheer fabrics, the privacy of curtains, and the adaptability of blinds.",
      },
    ],
    variants: {
      width: [],
      height: [],
      color: [],
    },
    rating: 0,
    reviewCount: 0,
    stock: 0,
    features: [
      "Alternating sheer & opaque panels",
      "Walk‑through cordless design",
      "Tilt for light or privacy",
      "Quiet‑glide track system",
      "Child‑safe wand control",
      "Soft drape look with blind versatility",
    ],
    specifications: {},
  },
  {
    id: "abs-shutters",
    name: "ABS Shutters",
    shortDescription:
      "ABS Shutters are made from a lightweight, hardwearing, engineered wood composite core coated with medical-grade polypropylene, UV-inhibited for fade and yellowing resistance.",
    description:
      "ABS Shutters are made from a lightweight, hardwearing, engineered wood composite (EWC) core coated with medical-grade polypropylene, UV-inhibited for fade and yellowing resistance. They are 100 % waterproof, with stainless steel hardware to resist corrosion, available in 23 solid colours and five louvre sizes (47 mm, 63 mm, 76 mm, 89 mm, 114 mm). Featuring an invisible Easy Tilt drive for seamless operation, they resist warping, sagging, and cupping, meeting VOC-free standards. ",
    images: [
      {
        src: "/images/pvc-shutter-1.webp",
        alt: "ABS Shutter 1",
      },
      {
        src: "/images/pvc-shutter-2.webp",
        alt: "ABS Shutter 2",
      },
      {
        src: "/images/shutter-1.webp",
        alt: "ABS Shutter Installation",
      },
      {
        src: "/images/shutter-2.webp",
        alt: "ABS Shutter Detail",
      },
    ],
    relatedProducts: [
      {
        id: "abs-waterproof-shutters",
        name: "ABS Waterproof Shutters",
        image: "/images/pvc-shutter-1.webp",
        href: "/shutters/abs-waterproof-shutters",
        shortDescription:
          "ABS Shutters are made from a lightweight, hardwearing, engineered wood composite core coated with medical-grade polypropylene, UV-inhibited for fade and yellowing resistance.",
      },
      {
        id: "basswood-shutters",
        name: "Basswood Shutters",
        image: "/images/basswood-shutter-1.webp",
        href: "/shutters/basswood-shutters",
        shortDescription:
          "ABS Shutters are made from a lightweight, hardwearing, engineered wood composite core coated with medical-grade polypropylene, UV-inhibited for fade and yellowing resistance.",
      },
      {
        id: "phoenixwood-shutters",
        name: "Phoenixwood Shutters",
        image: "/images/phoenixwood-shutter.webp",
        href: "/shutters/phoenixwood-shutters",
        shortDescription:
          "ABS Shutters are made from a lightweight, hardwearing, engineered wood composite core coated with medical-grade polypropylene, UV-inhibited for fade and yellowing resistance.",
      },
    ],
    variants: {
      width: [],
      height: [],
      color: [],
    },
    rating: 0,
    reviewCount: 0,
    stock: 0,
    features: [
      "ABS composite panels",
      "Invisible tilt mechanism",
      "Moisture‑resistant",
      "VOC‑safe & recyclable",
      "23 contemporary colours",
      "5 louvre sizes",
    ],
    specifications: {},
  },
  {
    id: "abs-waterproof-shutters",
    name: "ABS Waterproof Shutters",
    shortDescription:
      "ABS Waterproof Shutters are fully waterproof panels and frames, suitable for bathrooms, kitchens, and laundries.",
    description:
      "ABS Waterproof Shutters are fully waterproof panels and frames, suitable for bathrooms, kitchens, and laundries. Constructed from 100 % ABS for lightness and durability, with stainless steel hardware that won't rust or corrode. They feature the same elegant look as Woodlore Plus, with an invisible Easy Tilt drive, available in 23 colours and five louvre sizes (47 mm, 63 mm, 76 mm, 89 mm, 114 mm), ideal for high-traffic family environments. ",
    images: [
      {
        src: "/images/pvc-shutter-1.webp",
        alt: "ABS Waterproof Shutter 1",
      },
      {
        src: "/images/pvc-shutter-2.webp",
        alt: "ABS Waterproof Shutter 2",
      },
      {
        src: "/images/aluminium-shutter-1.webp",
        alt: "Waterproof Shutter Installation",
      },
      {
        src: "/images/aluminium-shutter-2.webp",
        alt: "Waterproof Shutter Detail",
      },
    ],
    relatedProducts: [
      {
        id: "abs-shutters",
        name: "ABS Shutters",
        image: "/images/pvc-shutter-1.webp",
        href: "/shutters/abs-shutters",
        shortDescription:
          "ABS Waterproof Shutters are fully waterproof panels and frames, suitable for bathrooms, kitchens, and laundries.",
      },
      {
        id: "basswood-shutters",
        name: "Basswood Shutters",
        image: "/images/basswood-shutter-1.webp",
        href: "/shutters/basswood-shutters",
        shortDescription:
          "ABS Waterproof Shutters are fully waterproof panels and frames, suitable for bathrooms, kitchens, and laundries.",
      },
      {
        id: "phoenixwood-shutters",
        name: "Phoenixwood Shutters",
        image: "/images/phoenixwood-shutter.webp",
        href: "/shutters/phoenixwood-shutters",
        shortDescription:
          "ABS Waterproof Shutters are fully waterproof panels and frames, suitable for bathrooms, kitchens, and laundries.",
      },
    ],
    variants: {
      width: [],
      height: [],
      color: [],
    },
    rating: 0,
    reviewCount: 0,
    stock: 0,
    features: [
      "100% waterproof ABS",
      "Stainless steel hardware",
      "Invisible tilt drive",
      "23‑colour palette",
      "Ideal for wet areas",
      "Impact & scratch resistant",
    ],
    specifications: {},
  },
  {
    id: "basswood-shutters",
    name: "Basswood Shutters",
    shortDescription:
      "Basswood Shutters are crafted from hardwood sourced from certified sustainable forests, panels made entirely of hardwood with engineered wood composite frames.",
    description:
      "Basswood Shutters are crafted from hardwood sourced from certified sustainable forests. Panels are made entirely of hardwood, with frames built from engineered wood composite finished with a paintable extrusion polymer coating. The panels and frames are colour-matched to premium timber shutter finishes. Available in a choice of 27 colours (plus custom options), five louvre sizes (47 mm, 63 mm, 76 mm, 89 mm, 114 mm), with wider panel specifications for expansive windows. ",
    images: [
      {
        src: "/images/basswood-shutter-1.webp",
        alt: "Basswood Shutter 1",
      },
      {
        src: "/images/basswood-shutter-2.webp",
        alt: "Basswood Shutter 2",
      },
      {
        src: "/images/basswood-shutter-3.webp",
        alt: "Basswood Shutter 3",
      },
      {
        src: "/images/basswood-shutter-4.webp",
        alt: "Basswood Shutter 4",
      },
      {
        src: "/images/timber-shutter-1.webp",
        alt: "Timber Shutter Style",
      },
      {
        src: "/images/timber-shutter-2.webp",
        alt: "Timber Shutter Detail",
      },
    ],
    relatedProducts: [
      {
        id: "abs-shutters",
        name: "ABS Shutters",
        image: "/images/pvc-shutter-1.webp",
        href: "/shutters/abs-shutters",
        shortDescription:
          "Basswood Shutters are crafted from hardwood sourced from certified sustainable forests, panels made entirely of hardwood with engineered wood composite frames.",
      },
      {
        id: "abs-waterproof-shutters",
        name: "ABS Waterproof Shutters",
        image: "/images/pvc-shutter-1.webp",
        href: "/shutters/abs-waterproof-shutters",
        shortDescription:
          "Basswood Shutters are crafted from hardwood sourced from certified sustainable forests, panels made entirely of hardwood with engineered wood composite frames.",
      },
      {
        id: "phoenixwood-shutters",
        name: "Phoenixwood Shutters",
        image: "/images/phoenixwood-shutter.webp",
        href: "/shutters/phoenixwood-shutters",
        shortDescription:
          "Basswood Shutters are crafted from hardwood sourced from certified sustainable forests, panels made entirely of hardwood with engineered wood composite frames.",
      },
    ],
    variants: {
      width: [],
      height: [],
      color: [],
    },
    rating: 0,
    reviewCount: 0,
    stock: 0,
    features: [
      "Solid basswood panels",
      "Lightweight for wide spans",
      "27 paint colours & stains",
      "Natural insulating wood",
      "Invisible tilt optional",
      "Engineered composite frame",
    ],
    specifications: {},
  },
  {
    id: "phoenixwood-shutters",
    name: "Phoenixwood Shutters",
    shortDescription:
      "Phoenixwood Shutters are 100 % premium hardwood shutters offering luxurious timber grain and durability.",
    description:
      "Phoenixwood Shutters are 100 % premium hardwood shutters offering luxurious timber grain and durability. Sustainably sourced from well-managed hardwood forests and plantations, available in 51 paint and stain colours plus custom options. Features multiple hand sanding and finishing for a fine, furniture-grade surface, wider panel options (1095 mm) for expansive views, and invisible Easy Tilt drive. Available in louvre sizes 47 mm, 63 mm, 76 mm, 89 mm, and 114 mm. ",
    images: [
      {
        src: "/images/timber-shutter-1.webp",
        alt: "Phoenixwood Shutter 1",
      },
      {
        src: "/images/timber-shutter-2.webp",
        alt: "Phoenixwood Shutter 2",
      },
      {
        src: "/images/plantation-shutterr-1.webp",
        alt: "Plantation Shutter Style",
      },
      {
        src: "/images/shutter-1.webp",
        alt: "Premium Shutter Installation",
      },
      {
        src: "/images/shutter-2.webp",
        alt: "Luxury Shutter Detail",
      },
    ],
    relatedProducts: [
      {
        id: "abs-shutters",
        name: "ABS Shutters",
        image: "/images/pvc-shutter-1.webp",
        href: "/shutters/abs-shutters",
        shortDescription:
          "Phoenixwood Shutters are 100 % premium hardwood shutters offering luxurious timber grain and durability.",
      },
      {
        id: "abs-waterproof-shutters",
        name: "ABS Waterproof Shutters",
        image: "/images/pvc-shutter-1.webp",
        href: "/shutters/abs-waterproof-shutters",
        shortDescription:
          "Phoenixwood Shutters are 100 % premium hardwood shutters offering luxurious timber grain and durability.",
      },
      {
        id: "basswood-shutters",
        name: "Basswood Shutters",
        image: "/images/basswood-shutter-1.webp",
        href: "/shutters/basswood-shutters",
        shortDescription:
          "Phoenixwood Shutters are 100 % premium hardwood shutters offering luxurious timber grain and durability.",
      },
    ],
    variants: {
      width: [],
      height: [],
      color: [],
    },
    rating: 0,
    reviewCount: 0,
    stock: 0,
    features: [
      "Premium Phoenixwood hardwood",
      "Furniture‑grade finish",
      "51 colour & stain options",
      "Panels up to 1095 mm wide",
      "Sustainable plantation timber",
      "Superior strength‑to‑weight ratio",
    ],
    specifications: {},
  },
  {
    id: "louvers",
    name: "Louvers",
    shortDescription:
      "Control airflow, shade, and privacy with adjustable louvers—ideal for windows, doors, ceilings, and architectural features.",
    description:
      "Louvers are versatile horizontal blades designed to manage airflow, shade, and light penetration while maintaining privacy and concealing light sources. Suitable for windows, doors, ceilings, and closet doors, louvers are also used in shutters to provide fresh air and natural light while blocking heat, moisture, and direct sunlight. Available in a range of slat sizes and materials, they can be fixed or adjustable, making them perfect for both functional and decorative applications. Louvers help reduce glare, improve ventilation, and add a modern architectural accent to any space.",
    images: [
      {
        src: "/images/louver-1.webp",
        alt: "Louver Design 1",
      },
      {
        src: "/images/louver-2.webp",
        alt: "Louver Installation 2",
      },
      {
        src: "/images/louver-3.webp",
        alt: "Louver Detail 3",
      },
      {
        src: "/images/louver-4.webp",
        alt: "Louver Application 4",
      },
      {
        src: "/images/shutter-1.webp",
        alt: "Louver in Shutter",
      },
      {
        src: "/images/external-venetian-1.webp",
        alt: "External Louver Style",
      },
    ],
    relatedProducts: [
      {
        id: "polycarbonate-roofings",
        name: "Polycarbonate Roofings",
        image: "/images/awning-1.webp",
        href: "/other-product/polycarbonate-roofings",
        shortDescription:
          "Polycarbonate Roofings offer durable protection and UV filtering—pair perfectly with louvered features.",
      },
      {
        id: "shade-sails",
        name: "Shade Sails",
        image: "/images/awning-1.webp",
        href: "/other-product/shade-sails",
        shortDescription:
          "Shade Sails provide sun protection and can complement louvered shading solutions.",
      },
      {
        id: "umbrellas",
        name: "Umbrellas",
        image: "/images/awning-1.webp",
        href: "/other-product/umbrellas",
        shortDescription:
          "Umbrellas add flexible shade and work well with fixed or adjustable louvers.",
      },
    ],
    variants: {
      width: [],
      height: [],
      color: [],
    },
    rating: 4.6,
    reviewCount: 38,
    stock: 12,
    features: [
      "Adjustable or fixed slats",
      "Improves ventilation and airflow",
      "Reduces glare and heat",
      "Provides privacy and shade",
      "Suitable for windows, doors, ceilings",
      "Durable materials for indoor/outdoor use",
    ],
    benefits: [
      {
        title: "Ventilation & Shade",
        description: "Lets fresh air in while blocking harsh sun and heat.",
      },
      {
        title: "Privacy",
        description: "Obscures views and conceals light sources for comfort.",
      },
      {
        title: "Architectural Appeal",
        description: "Adds a modern, functional accent to any space.",
      },
    ],
    specifications: {
      "Slat Sizes": "Multiple options (47mm, 63mm, 76mm, 89mm, 114mm)",
      Material: "Aluminium, timber, or composite",
      Mounting: "Windows, doors, ceilings, closets",
      Operation: "Manual or motorised (adjustable models)",
    },
  },
  {
    id: "polycarbonate-roofings",
    name: "Polycarbonate Roofings",
    shortDescription:
      "Polycarbonate Roof sheets are available in a wide range of colors and standard roofing profiles, including Standard and SolarSmart options that reflect more heat.",
    description:
      "Polycarbonate Roof sheets are available in a wide range of colors and standard roofing profiles, including Standard and SolarSmart options that reflect more heat. They come with a limited lifetime warranty and offer 99.9% UV protection, making them an outstanding, durable, and lightweight roofing material. Perfect for carports, patios, pergolas, and outdoor entertainment areas, these versatile sheets combine durability with excellent light transmission while providing superior weather protection.",
    images: [
      {
        src: "/images/polycarbonate-roofing-1.webp",
        alt: "Polycarbonate Roofing Installation",
      },
      {
        src: "/images/polycarbonate-roofing-2.webp",
        alt: "Polycarbonate Roofing Detail",
      },
      {
        src: "/images/polycarbonate-roofing-3.webp",
        alt: "Polycarbonate Roofing Application",
      },
      {
        src: "/images/polycarbonate-roofing-4.webp",
        alt: "Polycarbonate Roofing Style",
      },
    ],
    relatedProducts: [
      {
        id: "louvers",
        name: "Louvers",
        image: "/images/shutter-1.webp",
        href: "/other-product/louvers",
        shortDescription:
          "Adjustable louvers for perfect airflow and light control.",
      },
      {
        id: "shade-sails",
        name: "Shade Sails",
        image: "/images/awning-1.webp",
        href: "/other-product/shade-sails",
        shortDescription:
          "Stylish shade sails for UV protection and modern aesthetics.",
      },
      {
        id: "umbrellas",
        name: "Umbrellas",
        image: "/images/awning-1.webp",
        href: "/other-product/umbrellas",
        shortDescription:
          "Premium outdoor umbrellas for flexible shade solutions.",
      },
    ],
    variants: {
      width: [],
      height: [],
      color: [],
      colors: [
        {
          name: "Clear",
          value: "transparent",
          description: "Maximum light transmission with full UV protection",
          available: true,
        },
        {
          name: "Bronze",
          value: "#8B4513",
          description: "Reduces glare while maintaining good light levels",
          available: true,
        },
        {
          name: "Grey",
          value: "#808080",
          description: "Balanced light control and heat reduction",
          available: true,
        },
        {
          name: "Blue",
          value: "#4682B4",
          description: "Aesthetic appeal with moderate light filtering",
          available: true,
        },
      ],
      materials: [
        {
          id: "standard-polycarbonate",
          name: "Standard Polycarbonate",
          image: "/images/material-polycarbonate-standard.jpg",
          thumbnail: "/images/material-polycarbonate-standard-thumb.jpg",
          type: "polycarbonate",
          description:
            "High-quality polycarbonate with excellent durability and light transmission.",
          features: [
            "UV Protection",
            "Impact Resistant",
            "Lightweight",
            "Easy Installation",
          ],
          finish: "smooth",
          available: true,
          premium: false,
        },
        {
          id: "solarsmart-polycarbonate",
          name: "SolarSmart Polycarbonate",
          image: "/images/material-polycarbonate-solarsmart.jpg",
          thumbnail: "/images/material-polycarbonate-solarsmart-thumb.jpg",
          type: "polycarbonate",
          description:
            "Advanced polycarbonate with superior heat reflection technology.",
          features: [
            "Enhanced Heat Reflection",
            "Premium UV Protection",
            "Energy Efficient",
            "Superior Durability",
          ],
          finish: "textured",
          available: true,
          premium: true,
        },
      ],
    },
    rating: 4.7,
    reviewCount: 63,
    stock: 25,
    features: [
      "99.9% UV Protection",
      "Lifetime Limited Warranty",
      "Lightweight Construction",
      "Multiple Color Options",
      "Standard Roofing Profiles",
      "Easy Installation",
      "Weather Resistant",
      "Impact Resistant",
    ],
    benefits: [
      {
        title: "Superior Protection",
        description:
          "Blocks 99.9% of harmful UV rays while allowing natural light",
      },
      {
        title: "Long-lasting Durability",
        description:
          "Lifetime limited warranty ensures years of reliable performance",
      },
      {
        title: "Versatile Application",
        description:
          "Perfect for carports, patios, pergolas, and outdoor areas",
      },
    ],
    specifications: {
      "UV Protection": "99.9%",
      Material: "High-grade polycarbonate",
      Warranty: "Lifetime Limited",
      Thickness: "Various options available",
      Profiles: "Standard roofing profiles",
      Colors: "Wide range available",
      Installation: "Professional or DIY",
    },
  },
  {
    id: "shade-sails",
    name: "Shade Sails",
    shortDescription:
      "Shade Sails protect against the sun's damaging UV radiation and allow outdoor relaxation, offering quality, performance, and durability.",
    description:
      "Shade Sails protect against the sun's damaging UV radiation and allow outdoor relaxation, offering quality, performance, and durability. Made from high-quality marine-grade fabric, our shade sails are designed to withstand Australian weather conditions while providing stylish and effective sun protection. Available in various shapes and sizes, they create contemporary outdoor spaces perfect for entertaining, relaxation, and play areas.",
    images: [
      {
        src: "/images/shade-sail-1.webp",
        alt: "Shade Sail Installation",
      },
      {
        src: "/images/shade-sail-2.webp",
        alt: "Shade Sail Design",
      },
      {
        src: "/images/shade-sail-4.webp",
        alt: "Shade Sail Application",
      },
      {
        src: "/images/shade-sail-1-3.webp",
        alt: "Shade Sail Style",
      },
    ],
    relatedProducts: [
      {
        id: "louvers",
        name: "Louvers",
        image: "/images/shutter-1.webp",
        href: "/other-product/louvers",
        shortDescription:
          "Adjustable louvers complement shade sails for complete coverage.",
      },
      {
        id: "polycarbonate-roofings",
        name: "Polycarbonate Roofings",
        image: "/images/awning-1.webp",
        href: "/other-product/polycarbonate-roofings",
        shortDescription:
          "Solid roofing protection to pair with flexible shade sails.",
      },
      {
        id: "umbrellas",
        name: "Umbrellas",
        image: "/images/awning-1.webp",
        href: "/other-product/umbrellas",
        shortDescription:
          "Portable umbrellas for additional flexible shade options.",
      },
    ],
    variants: {
      width: [],
      height: [],
      color: [],
      colors: [
        {
          name: "Sand",
          value: "#F4E4C0",
          description: "Neutral sand color that complements most exteriors",
          available: true,
        },
        {
          name: "Charcoal",
          value: "#36454F",
          description: "Modern charcoal for contemporary outdoor spaces",
          available: true,
        },
        {
          name: "Forest Green",
          value: "#355E3B",
          description: "Natural green that blends with landscape",
          available: true,
        },
        {
          name: "Terracotta",
          value: "#E2725B",
          description: "Warm terracotta for Mediterranean-style outdoor areas",
          available: true,
        },
      ],
      fabrics: [
        {
          id: "marine-grade-fabric",
          name: "Marine Grade Fabric",
          image: "/images/fabric-marine-grade.jpg",
          thumbnail: "/images/fabric-marine-grade-thumb.jpg",
          type: "marine-grade",
          description:
            "Premium marine-grade fabric designed for maximum durability and UV protection.",
          features: [
            "95% UV Block",
            "Water Resistant",
            "Fade Resistant",
            "Breathable",
          ],
          opacity: 95,
          available: true,
          premium: true,
          sampleAvailable: true,
        },
      ],
    },
    rating: 4.8,
    reviewCount: 91,
    stock: 18,
    features: [
      "95% UV Protection",
      "Marine-grade fabric construction",
      "Water resistant",
      "Fade resistant",
      "Multiple shapes and sizes",
      "Contemporary design",
      "Professional installation",
      "Custom sizing available",
    ],
    benefits: [
      {
        title: "Effective UV Protection",
        description:
          "Blocks up to 95% of harmful UV radiation for safe outdoor enjoyment",
      },
      {
        title: "Stylish Design",
        description:
          "Contemporary aesthetic that enhances outdoor living spaces",
      },
      {
        title: "Durable Construction",
        description: "Marine-grade materials ensure long-lasting performance",
      },
    ],
    specifications: {
      "UV Protection": "Up to 95%",
      Material: "Marine-grade polyester fabric",
      "Water Resistance": "Yes",
      "Fade Resistance": "Excellent",
      Shapes: "Triangle, Square, Rectangle, Custom",
      Colors: "Multiple options available",
      Installation: "Professional recommended",
      Warranty: "5 years fabric, 2 years hardware",
    },
  },
  {
    id: "umbrellas",
    name: "Umbrellas",
    shortDescription:
      "Sturdy, lightweight commercial umbrellas with UV-resistant canopies—customisable and ideal for outdoor dining, cafes, and events.",
    description:
      "Quality Blinds Cafe Series Umbrellas are engineered for commercial use, offering robust aluminium frames and high-quality, UV-resistant fabric canopies. Available in three sizes (2.1m x 2.1m, 3.0m x 3.0m, and 3.0m Octagonal), these umbrellas provide generous shade and withstand the rigours of daily outdoor use. Perfect for cafes, restaurants, patios, and events, they can be custom-branded with your logo for maximum impact. The lightweight design allows for easy relocation, while the durable construction ensures years of reliable performance in the Australian climate.",
    images: [
      {
        src: "/images/umbrella-1.webp",
        alt: "Commercial Umbrella",
      },
      {
        src: "/images/umbrella-2.webp",
        alt: "Cafe Umbrella Setup",
      },
      {
        src: "/images/umbrella-3.webp",
        alt: "Outdoor Umbrella",
      },
      {
        src: "/images/umbrella-4.webp",
        alt: "Restaurant Umbrella",
      },
      {
        src: "/images/umbrella-5.webp",
        alt: "Event Umbrella",
      },
      {
        src: "/images/umbrella-6.webp",
        alt: "Patio Umbrella",
      },
      {
        src: "/images/umbrella-7.webp",
        alt: "Large Umbrella",
      },
      {
        src: "/images/umbrella-8.webp",
        alt: "Premium Umbrella",
      },
      {
        src: "/images/umbrella-9.webp",
        alt: "Quality Umbrella",
      },
      {
        src: "/images/umbrella-10.webp",
        alt: "Professional Umbrella",
      },
      {
        src: "/images/umbrella-11.webp",
        alt: "Commercial Grade Umbrella",
      },
    ],
    relatedProducts: [
      {
        id: "louvers",
        name: "Louvers",
        image: "/images/shutter-1.webp",
        href: "/other-product/louvers",
        shortDescription:
          "Fixed louvers provide permanent shade to complement portable umbrellas.",
      },
      {
        id: "polycarbonate-roofings",
        name: "Polycarbonate Roofings",
        image: "/images/awning-1.webp",
        href: "/other-product/polycarbonate-roofings",
        shortDescription:
          "Permanent roofing solutions for areas requiring constant coverage.",
      },
      {
        id: "shade-sails",
        name: "Shade Sails",
        image: "/images/awning-1.webp",
        href: "/other-product/shade-sails",
        shortDescription:
          "Large area shade coverage to complement targeted umbrella shade.",
      },
    ],
    variants: {
      width: [],
      height: [],
      color: [],
      colors: [
        {
          name: "White",
          value: "#FFFFFF",
          description:
            "Classic white for maximum light reflection and versatility",
          available: true,
        },
        {
          name: "Navy Blue",
          value: "#000080",
          description: "Professional navy blue for commercial applications",
          available: true,
        },
        {
          name: "Forest Green",
          value: "#355E3B",
          description: "Natural green that blends with outdoor environments",
          available: true,
        },
        {
          name: "Burgundy",
          value: "#800020",
          description: "Rich burgundy for upscale dining and event spaces",
          available: false,
        },
      ],
      materials: [
        {
          id: "commercial-aluminium-frame",
          name: "Commercial Aluminium Frame",
          image: "/images/material-aluminium-frame.jpg",
          thumbnail: "/images/material-aluminium-frame-thumb.jpg",
          type: "aluminium",
          description:
            "Robust aluminium frame designed for commercial durability and daily use.",
          features: [
            "Powder Coated",
            "Corrosion Resistant",
            "Lightweight",
            "Professional Grade",
          ],
          finish: "powder-coated",
          available: true,
          premium: true,
        },
      ],
      fabrics: [
        {
          id: "commercial-canopy-fabric",
          name: "Commercial Canopy Fabric",
          image: "/images/fabric-commercial-canopy.jpg",
          thumbnail: "/images/fabric-commercial-canopy-thumb.jpg",
          type: "commercial-outdoor",
          description:
            "Heavy-duty outdoor fabric designed for commercial use with superior UV resistance.",
          features: [
            "UV Resistant",
            "Waterproof",
            "Fade Resistant",
            "Commercial Grade",
          ],
          opacity: 100,
          available: true,
          premium: true,
          sampleAvailable: true,
        },
      ],
    },
    rating: 4.8,
    reviewCount: 47,
    stock: 16,
    features: [
      "Commercial-grade aluminium frames",
      "UV-resistant, waterproof canopies",
      "Available in 3 sizes and 2 shapes",
      "Custom branding/logo printing",
      "Lightweight and portable",
      "Easy to open, close, and relocate",
      "Professional installation available",
      "Suitable for daily commercial use",
    ],
    benefits: [
      {
        title: "Flexible Shade",
        description: "Moveable design lets you create shade wherever needed.",
      },
      {
        title: "Durable Construction",
        description:
          "Built for Australian conditions—resists fading, rust, and wind.",
      },
      {
        title: "Brand Visibility",
        description:
          "Custom branding options for cafes, restaurants, and events.",
      },
    ],
    specifications: {
      Sizes: "2.1m x 2.1m, 3.0m x 3.0m, 3.0m Octagonal",
      Frame: "Aluminium, powder-coated",
      Canopy: "UV-resistant, waterproof polyester",
      Customisation: "Logo printing available",
      Operation: "Manual opening/closing",
      "Base Options": "Weighted base, in-ground mounting",
      Warranty: "2 years frame, 1 year fabric",
      "Wind Rating": "Suitable for moderate wind conditions",
    },
  },
  {
    id: "sunscreen-roller-blinds",
    name: "Sunscreen Roller Blinds",
    shortDescription:
      "Sunscreen Roller Blinds are made of mesh-like fabric that blocks glare and UV rays, keeping your space cool and protecting furniture from fading.",
    description:
      "Sunscreen Roller Blinds are made of mesh-like fabric that blocks glare and UV rays, keeping your space cool and protecting furniture from fading. They are best used where privacy is not required or combined with a Blockout Blind in a Double Roller Blind system for maximum relaxation. Available in a variety of materials and colors to suit any setting, our custom-made blinds help prevent heat, glare, and UV damage, saving on energy costs. They offer privacy during the day but become revealing at night with interior lights on, so pairing with Blockout is recommended for optimal privacy.",
    images: [
      {
        src: "/images/sunscreen-roller-blind-2.webp",
        alt: "Sunscreen Roller Blind",
      },
      {
        src: "/images/sunscreen-roller-blind-3.webp",
        alt: "Sunscreen Roller Blind in office",
      },
      {
        src: "/images/sunscreen-roller-blind-4.webp",
        alt: "Sunscreen Roller Blind Detail",
      },
      {
        src: "/images/sunscreen-roller-blind-5.webp",
        alt: "Sunscreen Roller Blind Application",
      },
      {
        src: "/images/sunscreen-roller-blind-6.webp",
        alt: "Sunscreen Roller Blind Style",
      },
      {
        src: "/images/sunscreen-roller-blind-7.webp",
        alt: "Sunscreen Roller Blind Installation",
      },
    ],
    category: "blinds",
    subcategory: "roller",
    heroImage: "/images/sunscreen-roller-blind-1.webp",
    features: [
      "UV Protection",
      "Glare Reduction",
      "View Preservation",
      "Office & Living Areas",
    ],
    benefits: [
      {
        title: "UV Protection",
        description: "Blocks harmful UV rays while maintaining natural light",
      },
      {
        title: "Glare Reduction",
        description: "Reduces screen glare and eye strain",
      },
      {
        title: "View Preservation",
        description: "Maintains your view of the outdoors",
      },
    ],
    relatedProducts: [
      {
        id: "blockout-roller-blinds",
        name: "Blockout Roller Blinds",
        image: "/images/blockout-roller-blind-1.webp",
        href: "/blinds/roller/blockout-roller-blinds",
        shortDescription: "Complete light control for bedrooms",
      },
      {
        id: "translucent-roller-blinds",
        name: "Translucent Roller Blinds",
        image: "/images/translucent-roller-blind-1.webp",
        href: "/blinds/roller/translucent-roller-blinds",
        shortDescription: "Soft filtered light with privacy",
      },
    ],
    variants: { width: [], height: [], color: [] },
    rating: 4.8,
    reviewCount: 156,
    stock: 50,
    specifications: {
      "Fabric Type": "Sunscreen mesh",
      "UV Protection": "95%",
      Operation: "Chain or motorised",
      Mounting: "Inside or outside mount",
    },
  },
  {
    id: "translucent-roller-blinds",
    name: "Translucent Roller Blinds",
    shortDescription:
      "Translucent Roller Blinds allow you to create a private, pleasant atmosphere without obstructing natural light.",
    description:
      "Translucent Roller Blinds allow you to create a private, pleasant atmosphere without obstructing natural light, providing 100% daytime privacy while reducing heat and glare. These semi-transparent fabrics offer an opaque shade that lets light filter through, maintaining a clear appearance. Ideal for living areas and bathrooms, they allow natural light to fill your room without sacrificing comfort. Also known as Light Filtering Roller Blinds, they combine elegance, privacy, and sophisticated aesthetic by balancing light and shading.",
    images: [
      {
        src: "/images/translucent-roller-blind-2.webp",
        alt: "Translucent Roller Blind",
      },
      {
        src: "/images/blockout-roller-blind-5.webp",
        alt: "Translucent Roller Blind in bedroom",
      },
      {
        src: "/images/sunscreen-roller-blind-2.webp",
        alt: "Light Filtering Detail",
      },
    ],
    category: "blinds",
    subcategory: "roller",
    heroImage: "/images/translucent-roller-blind-1.webp",
    features: [
      "Light Filtering",
      "Privacy Control",
      "Elegant Finish",
      "Versatile Design",
    ],
    benefits: [
      {
        title: "Light Filtering",
        description: "Allows soft natural light while maintaining privacy",
      },
      {
        title: "Privacy Control",
        description: "Provides daytime privacy without blocking all light",
      },
      {
        title: "Elegant Finish",
        description: "Clean, sophisticated appearance",
      },
    ],
    relatedProducts: [
      {
        id: "blockout-roller-blinds",
        name: "Blockout Roller Blinds",
        image: "/images/blockout-roller-blind-1.webp",
        href: "/blinds/roller/blockout-roller-blinds",
        shortDescription: "Complete light control for bedrooms",
      },
      {
        id: "sunscreen-roller-blinds",
        name: "Sunscreen Roller Blinds",
        image: "/images/sunscreen-roller-blind-1.webp",
        href: "/blinds/roller/sunscreen-roller-blinds",
        shortDescription: "UV protection with view preservation",
      },
    ],
    variants: { width: [], height: [], color: [] },
    rating: 4.7,
    reviewCount: 203,
    stock: 35,
    specifications: {
      "Fabric Type": "Light filtering fabric",
      "Light Transmission": "25-50%",
      Privacy: "Daytime privacy",
      Operation: "Chain or motorised",
    },
  },
  {
    id: "translucent-roman-blinds",
    name: "Translucent Roman Blinds",
    shortDescription:
      "Translucent Roman Blinds provide daytime privacy while allowing natural light to filter through, ideal for living areas.",
    description:
      "Translucent Roman Blinds allow a filtered amount of light to enter your home while blocking external views when closed, creating a comfortable, softly lit environment. Their light-filtering performance depends on the fabric's weight and weave, making them perfect for living spaces that require both privacy and natural illumination.",
    category: "blinds",
    subcategory: "roman",
    heroImage: "/images/translucent-roman-blind-1.webp",
    images: [
      {
        src: "/images/translucent-roller-blind-2.webp",
        alt: "Translucent Roman Blind",
      },
      {
        src: "/images/sheer-curtain-2.webp",
        alt: "Translucent Roman Blind in living room",
      },
      {
        src: "/images/curtain-2.webp",
        alt: "Roman Blind detail",
      },
    ],
    features: [
      "Light Filtering",
      "Decorative Appeal",
      "Versatile Design",
      "Sophisticated Style",
    ],
    benefits: [
      {
        title: "Light Filtering",
        description: "Soft diffused light creates warm ambiance",
      },
      {
        title: "Decorative Appeal",
        description: "Adds sophisticated style to any room",
      },
      {
        title: "Versatile Design",
        description: "Complements both traditional and modern décor",
      },
    ],
    relatedProducts: [
      {
        id: "blockout-roman-blinds",
        name: "Blockout Roman Blinds",
        image: "/images/blockout-roman-blind-1.webp",
        href: "/blinds/roman/blockout-roman-blinds",
        shortDescription: "Complete privacy with classic style",
      },
    ],
    variants: { width: [], height: [], color: [] },
    rating: 4.9,
    reviewCount: 127,
    stock: 28,
    specifications: {
      "Fabric Type": "Premium light filtering fabrics",
      Style: "Classic roman fold",
      Operation: "Chain operated",
      "Light Control": "Gentle diffusion",
    },
  },
  {
    id: "cedar-venetian-blinds",
    name: "Cedar Venetian Blinds",
    shortDescription:
      "Looking for excellent wooden blinds at a low cost? Our Cedar Venetian Blinds may become your new window pal, adding warmth and charm to any room with rich cedar grain.",
    description:
      "One of the main advantages of Cedar Venetian Blinds over other wood blinds is their stability—they won't shrink or expand with temperature or humidity changes. Featuring high-quality cord and easy-to-use tilt mechanisms for precise light and privacy control, our DIY Cedar Venetian Blinds are simple to install and best suited for dry environments like living rooms, bedrooms, and workspaces.",
    category: "blinds",
    subcategory: "venetian",
    heroImage: "/images/cedar-venetian-blind-1.webp",
    images: [
      {
        src: "/images/cedar-shutter-2.webp",
        alt: "Cedar Venetian Blind",
      },
      {
        src: "/images/timber-venetian-1.jpg",
        alt: "Cedar Venetian Blind detail",
      },
      {
        src: "/images/timber-venetian-2.jpg",
        alt: "Cedar Venetian Blind mechanism",
      },
    ],
    features: [
      "Luxury Wood",
      "Rich Grain",
      "Premium Craftsmanship",
      "Natural Beauty",
    ],
    benefits: [
      {
        title: "Luxury Wood",
        description: "Premium cedar timber with natural beauty",
      },
      { title: "Rich Grain", description: "Beautiful natural wood patterns" },
      {
        title: "Premium Craftsmanship",
        description: "Expert construction and finishing",
      },
    ],
    relatedProducts: [
      {
        id: "basswood-venetian-blinds",
        name: "Basswood Venetian Blinds",
        image: "/images/basswood-venetian-blind-1.webp",
        href: "/blinds/venetian/basswood-venetian-blinds",
        shortDescription: "Natural basswood with elegant finish",
      },
      {
        id: "aluminium-venetian-blinds",
        name: "Aluminium Venetian Blinds",
        image: "/images/aluminium-venetian-blind-1.webp",
        href: "/blinds/venetian/aluminium-venetian-blinds",
        shortDescription: "Modern aluminium with precise control",
      },
    ],
    variants: { width: [], height: [], color: [] },
    rating: 4.9,
    reviewCount: 89,
    stock: 15,
    specifications: {
      Material: "Premium cedar timber",
      "Slat Width": "25mm, 50mm",
      Finish: "Natural stain, custom stains available",
      Operation: "Cord tilt and lift",
    },
  },
];

// Utility functions for working with product data
export const getProductById = (id: string): Product | undefined => {
  return productData.find((product) => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return productData.filter((product) => product.category === category);
};

export const getProductsBySubcategory = (
  category: string,
  subcategory: string
): Product[] => {
  return productData.filter(
    (product) =>
      product.category === category && product.subcategory === subcategory
  );
};

export const getRelatedProducts = (
  productId: string,
  limit: number = 3
): Product[] => {
  const product = getProductById(productId);
  if (!product) return [];

  return product.relatedProducts
    .map((related) => getProductById(related.id))
    .filter((p): p is Product => p !== undefined)
    .slice(0, limit);
};

// Category configurations for pages
export const categoryConfigs = {
  rollerBlinds: {
    title: "Roller Blinds",
    description:
      "Simple, stylish, and functional. Our roller blinds offer the perfect combination of practicality and elegance for any space.",
    heroImage: "/images/roller-blind-1.webp",
    gradient: "from-blue-900 via-blue-800 to-indigo-900",
    products: getProductsBySubcategory("blinds", "roller"),
    benefits: [
      {
        title: "Easy Operation",
        description:
          "Smooth chain or motorised operation for effortless daily use",
        icon: "CogIcon",
      },
      {
        title: "Durable Quality",
        description:
          "Premium materials and construction for long-lasting performance",
        icon: "ShieldCheckIcon",
      },
      {
        title: "Clean Design",
        description: "Sleek, minimalist appearance that complements any décor",
        icon: "SparklesIcon",
      },
    ],
  },
  romanBlinds: {
    title: "Roman Blinds",
    description:
      "Timeless elegance meets modern functionality. Our roman blinds bring sophisticated style and premium quality to your windows.",
    heroImage: "/images/roman-blinds-hero.webp",
    gradient: "from-amber-900 via-orange-800 to-red-900",
    products: getProductsBySubcategory("blinds", "roman"),
    benefits: [
      {
        title: "Timeless Elegance",
        description:
          "Classic folding design that adds sophistication to any interior",
        icon: "PaintBrushIcon",
      },
      {
        title: "Premium Fabrics",
        description:
          "Wide selection of quality materials and designer patterns",
        icon: "SwatchIcon",
      },
      {
        title: "Superior Quality",
        description:
          "Precision engineering with smooth operation and lasting durability",
        icon: "ShieldCheckIcon",
      },
    ],
  },
  venetianBlinds: {
    title: "Venetian Blinds",
    description:
      "Precision meets style. Our venetian blinds offer unmatched control over light and privacy with timeless elegance.",
    heroImage: "/images/venetian-blinds-hero.webp",
    gradient: "from-slate-900 via-gray-800 to-zinc-900",
    products: getProductsBySubcategory("blinds", "venetian"),
    benefits: [
      {
        title: "Precise Control",
        description:
          "Adjustable slats provide exact light control and privacy levels",
        icon: "AdjustmentsVerticalIcon",
      },
      {
        title: "Versatile Operation",
        description:
          "Smooth tilting and lifting mechanisms for effortless daily use",
        icon: "CogIcon",
      },
      {
        title: "Timeless Style",
        description:
          "Classic design that complements both traditional and modern interiors",
        icon: "SparklesIcon",
      },
    ],
  },
};
