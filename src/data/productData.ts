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
        src: "/images/awning-1.webp",
        alt: "Awning 1",
      },
      {
        src: "/images/awning-2.webp",
        alt: "Awning 2",
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
    features: [],
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
        src: "/images/folding-arm-awning.webp",
        alt: "Folding Arm Awning",
      },
      {
        src: "/images/folding-arm-awning-2.webp",
        alt: "Folding Arm Awning 2",
      },
      {
        src: "/images/folding-arm-awning-3.webp",
        alt: "Folding Arm Awning 3",
      },
      {
        src: "/images/folding-arm-awning-4.webp",
        alt: "Folding Arm Awning 4",
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
    features: [],
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
        src: "/images/awning-1.webp",
        alt: "Awning 1",
      },
      {
        src: "/images/awning-2.webp",
        alt: "Awning 2",
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
    features: [],
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
        src: "/images/awning-1.webp",
        alt: "Awning 1",
      },
      {
        src: "/images/awning-2.webp",
        alt: "Awning 2",
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
    features: [],
    specifications: {},
  },
  {
    id: "aluminium-venetian-blinds",
    name: "Aluminium Venetian Blinds",
    shortDescription:
      "Aluminium Venetian Blinds are splash-resistant, warp-proof, and easy to clean, available in 25 mm and 50 mm slat widths with a thicker alloy for enhanced strength and longevity.",
    description:
      "Constructed from a specialised aluminium alloy (not PVC), our Aluminium Venetian Blinds come in 25 mm and 50 mm slat widths and a wide colour palette—from pastels to metallic and wood-effect finishes. Their thicker slats provide extra durability, while the splash-proof, warp-resistant surface makes them ideal for kitchens, bathrooms, and high-humidity areas.",
    images: [
      {
        src: "/images/aluminium-venetian-blind-1.webp",
        alt: "Aluminium Venetian Blind 1",
      },
      {
        src: "/images/aluminium-venetian-blind-2.webp",
        alt: "Aluminium Venetian Blind 2",
      },
      {
        src: "/images/venetian-blind-1.webp",
        alt: "Venetian Blind 1",
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
    features: [],
    specifications: {},
  },
  {
    id: "basswood-venetian-blinds",
    name: "Basswood Venetian Blinds",
    shortDescription:
      "Basswood Venetian Blinds are lightweight timber blinds available in a wide choice of colours and stains to complement any décor, and are easy to clean and maintain.",
    description:
      "Our Basswood Venetian Blinds enhance your home's natural charm with robust timber stability and a broad palette of colours and stains. Easy to operate, clean, and install, these blinds bring the outdoors inside and suit any décor effortlessly.",
    images: [
      {
        src: "/images/basswood-venetian-blind-1.webp",
        alt: "Basswood Venetian Blind 1",
      },
      {
        src: "/images/venetian-blind-1.webp",
        alt: "Venetian Blind 1",
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
    features: [],
    specifications: {},
  },
  {
    id: "blockout-roller-blinds",
    name: "Blockout Roller Blinds",
    shortDescription:
      "Blockout Roller Blinds are available in a variety of fabrics from across the globe.",
    description:
      "Blockout Roller Blinds are available in a variety of fabrics from across the globe. They are a popular and efficient window covering that provides maximum darkness in gloomy environments. Roller Blinds are a great alternative to drapes or shutters in both home and business settings. Block-out blinds may be used alone or with sheer curtains on a single window for a contemporary look and to save space. Due to their versatility, Blockouts are often utilized in areas where maximum darkness or heat blockout from the sun is desired. They are easy to install, require less maintenance than Venetian blinds, and can be upgraded from manual to automated operation even years after installation. Blockout Roller Blinds form the best barrier against light and help maintain desired room temperature year-round, keeping your environment cooler in summer and warmer in winter, potentially reducing energy bills. Sun Blockout Roller Blinds are a popular choice for bedrooms, offices, and any room where a fully darkened environment is needed. Designed to withstand the harsh Australian climate, all our Blockout products are crafted to guarantee style and durability. Custom-made to your measurements, this high-quality blind features coated fabric that blocks out 100% of sunlight, making it perfect for large living rooms or business windows that require complete darkness during the day.",
    images: [
      {
        src: "/images/blockout-roller-blind-1.webp",
        alt: "Blockout Roller Blind 1",
      },
      {
        src: "/images/blockout-roller-blind-2.webp",
        alt: "Blockout Roller Blind 2",
      },
      {
        src: "/images/blockout-roller-blind-3.webp",
        alt: "Blockout Roller Blind 3",
      },
      {
        src: "/images/blockout-roller-blind-4.webp",
        alt: "Blockout Roller Blind 4",
      },
      {
        src: "/images/roller-blind-1.webp",
        alt: "Roller Blind 1",
      },
      {
        src: "/images/roller-blind-2.webp",
        alt: "Roller Blind 2",
      },
    ],
    relatedProducts: [
      {
        id: "blockout-roman-blinds",
        name: "Blockout Roman Blinds",
        image: "/images/blockout-roman-blind-1.webp",
        href: "/blinds/blockout-roman-blinds",
        shortDescription:
          "Blockout Roller Blinds are available in various premium fabrics globally sourced, providing maximum darkness and maintaining room temperature by keeping interiors cooler in summer and warmer in winter.",
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
    features: [],
    specifications: {},
  },
  {
    id: "blockout-roman-blinds",
    name: "Blockout Roman Blinds",
    shortDescription:
      "Our Blockout Roman Blinds are made from premium Australian materials and include a chain-operated tracking mechanism with aluminium back battens for a straight, tailored look.",
    description:
      "Blockout Roman Blinds are manufactured from quality fabrics sourced from Australian fabric houses. All of our Roman Blinds feature a continuous single-piece fabric design, making it easy to add blackout lining to transform your shades into complete light-blocking solutions. Supplied on our chain-operated tracking system with aluminium back battens, they ensure precise, tailored installation and timeless style.",
    images: [
      {
        src: "/images/blockout-roman-blind-1.webp",
        alt: "Blockout Roman Blind 1",
      },
      {
        src: "/images/roman-blind-1.webp",
        alt: "Roman Blind 1",
      },
      {
        src: "/images/roman-blind-2.webp",
        alt: "Roman Blind 2",
      },
      {
        src: "/images/roman-blind-3.webp",
        alt: "Roman Blind 3",
      },
      {
        src: "/images/roman-blind-4.webp",
        alt: "Roman Blind 4",
      },
    ],
    relatedProducts: [
      {
        id: "blockout-roller-blinds",
        name: "Blockout Roller Blinds",
        image: "/images/blockout-roller-blind-1.webp",
        href: "/blinds/blockout-roller-blinds",
        shortDescription:
          "Blockout Roman Blinds are made from quality fabrics sourced from Australian fabric houses, supplied with a chain-operated tracking system and aluminium back battens for a straight, tailored look.",
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
    features: [],
    specifications: {},
  },
  {
    id: "blockout-curtains",
    name: "Blockout Curtains",
    shortDescription:
      "Blockout Curtains use proprietary three-weave technology to block 99% of harmful UV rays and 100% of harsh sunlight, improving energy efficiency year-round.",
    description:
      "Blockout Curtains minimize heat transfer through windows by up to 24%, keeping rooms cooler in summer and warmer in winter. Made with a proprietary three-weave fabric, they block nearly all sunlight and UV radiation, enhance privacy, reduce noise, and help lower energy bills. Ideal for bedrooms, home theaters, and any space requiring complete light control and insulation.",
    faqs: [
      {
        question: "Why choose blockout curtains?",
        answer:
          "Blockout curtains offer superior light control, privacy, noise reduction, and energy efficiency, making them ideal for bedrooms and home theaters.",
      },
      {
        question: "Are blockout curtains energy efficient?",
        answer:
          "Yes, they can reduce heat transfer by up to 24%, helping keep rooms cooler in summer and warmer in winter.",
      },
      {
        question: "Can blockout curtains improve sleep?",
        answer:
          "By blocking external light, they create a darker sleep environment, which can lead to better sleep quality.",
      },
      {
        question:
          "What is the difference between blockout and regular curtains?",
        answer:
          "Blockout curtains use dense, proprietary fabrics to block nearly all light, while regular curtains allow some light to filter through.",
      },
      {
        question: "Are eyelet blockout curtains a good choice?",
        answer:
          "Eyelet blockout curtains combine easy installation with a stylish, modern look, offering full light control and privacy.",
      },
    ],
    images: [
      {
        src: "/images/blockout-curtains-1.webp",
        alt: "Blockout Curtains 1",
      },
      {
        src: "/images/curtain-1.webp",
        alt: "Curtain 1",
      },
    ],
    relatedProducts: [
      {
        id: "curtains",
        name: "Curtains",
        image: "/images/curtain-1.webp",
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
    features: [],
    specifications: {},
  },
  {
    id: "curtains",
    name: "Curtains",
    shortDescription:
      "Curtains offer privacy, light control, temperature regulation, and elegance, available in a variety of styles—such as blockout, sheer, Veri Shades, and fabric shades—to suit diverse tastes.",
    description:
      "Curtains offer privacy, light control, temperature regulation, and elegance, available in a variety of styles—such as blockout, sheer, Veri Shades, and fabric shades—to suit diverse tastes. They enhance comfort and aesthetics, becoming a focal point of interior décor. ",
    images: [
      {
        src: "/images/curtain-1.webp",
        alt: "Curtain 1",
      },
      {
        src: "/images/blockout-curtains-1.webp",
        alt: "Blockout Curtains 1",
      },
      {
        src: "/images/sheer-curtain-1.webp",
        alt: "Sheer Curtain 1",
      },
      {
        src: "/images/veri-shades-curtain-1.webp",
        alt: "Veri Shades Curtain 1",
      },
    ],
    relatedProducts: [
      {
        id: "blockout-curtains",
        name: "Blockout Curtains",
        image: "/images/blockout-curtains-1.webp",
        href: "/curtains/blockout-curtains",
        shortDescription:
          "Curtains offer privacy, light control, temperature regulation, and elegance, available in a variety of styles—such as blockout, sheer, Veri Shades, and fabric shades—to suit diverse tastes.",
      },
      {
        id: "sheer-curtains",
        name: "Sheer Curtains",
        image: "/images/sheer-curtain-1.webp",
        href: "/curtains/sheer-curtains",
        shortDescription:
          "Curtains offer privacy, light control, temperature regulation, and elegance, available in a variety of styles—such as blockout, sheer, Veri Shades, and fabric shades—to suit diverse tastes.",
      },
      {
        id: "veri-shades",
        name: "Veri Shades",
        image: "/images/veri-shades-curtain-1.webp",
        href: "/curtains/veri-shades",
        shortDescription:
          "Curtains offer privacy, light control, temperature regulation, and elegance, available in a variety of styles—such as blockout, sheer, Veri Shades, and fabric shades—to suit diverse tastes.",
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
    features: [],
    specifications: {},
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
        src: "/images/sheer-curtain-1.webp",
        alt: "Sheer Curtain 1",
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
        image: "/images/blockout-curtains-1.webp",
        href: "/curtains/blockout-curtains",
        shortDescription:
          "Sheer Curtains are lightweight fabrics that soften incoming light and add style to home décor.",
      },
      {
        id: "curtains",
        name: "Curtains",
        image: "/images/curtain-1.webp",
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
    features: [],
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
        image: "/images/blockout-curtains-1.webp",
        href: "/curtains/blockout-curtains",
        shortDescription:
          "Veri Shades combine the elegance of sheer fabrics, the privacy of curtains, and the adaptability of blinds.",
      },
      {
        id: "curtains",
        name: "Curtains",
        image: "/images/curtain-1.webp",
        href: "/curtains/curtains",
        shortDescription:
          "Veri Shades combine the elegance of sheer fabrics, the privacy of curtains, and the adaptability of blinds.",
      },
      {
        id: "sheer-curtains",
        name: "Sheer Curtains",
        image: "/images/sheer-curtain-1.webp",
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
    features: [],
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
        alt: "PVC Shutter 1",
      },
      {
        src: "/images/pvc-shutter-2.webp",
        alt: "PVC Shutter 2",
      },
      {
        src: "/images/shutter-1.webp",
        alt: "Shutter 1",
      },
      {
        src: "/images/shutter-2.webp",
        alt: "Shutter 2",
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
    features: [],
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
        alt: "PVC Shutter 1",
      },
      {
        src: "/images/pvc-shutter-2.webp",
        alt: "PVC Shutter 2",
      },
      {
        src: "/images/shutter-1.webp",
        alt: "Shutter 1",
      },
      {
        src: "/images/shutter-2.webp",
        alt: "Shutter 2",
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
    features: [],
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
        src: "/images/shutter-1.webp",
        alt: "Shutter 1",
      },
      {
        src: "/images/shutter-2.webp",
        alt: "Shutter 2",
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
    features: [],
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
        src: "/images/phoenixwood-shutter.webp",
        alt: "Phoenixwood Shutter",
      },
      {
        src: "/images/shutter-1.webp",
        alt: "Shutter 1",
      },
      {
        src: "/images/shutter-2.webp",
        alt: "Shutter 2",
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
    features: [],
    specifications: {},
  },
  {
    id: "louvers",
    name: "Louvers",
    shortDescription:
      "Louvers meet a range of ventilation, shade, and aesthetic needs, designed as horizontal blades that manage airflow and light penetration while obscuring or concealing light sources in ceilings or windows.",
    description:
      "Louvers meet a range of ventilation, shade, and aesthetic needs, designed as horizontal blades that manage airflow and light penetration while obscuring or concealing light sources in ceilings or windows. Suitable for windows, doors, ceilings, and closet doors, they are used in shutters for fresh air and light while blocking heat and moisture. Available in various slat sizes. ",
    images: [
      {
        src: "/images/shutter-1.webp",
        alt: "Shutter 1",
      },
      {
        src: "/images/shutter-2.webp",
        alt: "Shutter 2",
      },
      {
        src: "/images/roller-shutter-1.webp",
        alt: "Roller Shutter 1",
      },
      {
        src: "/images/roller-shutter-2.webp",
        alt: "Roller Shutter 2",
      },
      {
        src: "/images/roller-shutter-3.webp",
        alt: "Roller Shutter 3",
      },
      {
        src: "/images/roller-shutter-4.webp",
        alt: "Roller Shutter 4",
      },
    ],
    relatedProducts: [
      {
        id: "polycarbonate-roofings",
        name: "Polycarbonate Roofings",
        image: "/images/awning-1.webp",
        href: "/other-product/polycarbonate-roofings",
        shortDescription:
          "Louvers meet a range of ventilation, shade, and aesthetic needs, designed as horizontal blades that manage airflow and light penetration while obscuring or concealing light sources in ceilings or windows.",
      },
      {
        id: "shade-sails",
        name: "Shade Sails",
        image: "/images/awning-1.webp",
        href: "/other-product/shade-sails",
        shortDescription:
          "Louvers meet a range of ventilation, shade, and aesthetic needs, designed as horizontal blades that manage airflow and light penetration while obscuring or concealing light sources in ceilings or windows.",
      },
      {
        id: "umbrellas",
        name: "Umbrellas",
        image: "/images/awning-1.webp",
        href: "/other-product/umbrellas",
        shortDescription:
          "Louvers meet a range of ventilation, shade, and aesthetic needs, designed as horizontal blades that manage airflow and light penetration while obscuring or concealing light sources in ceilings or windows.",
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
    features: [],
    specifications: {},
  },
  {
    id: "polycarbonate-roofings",
    name: "Polycarbonate Roofings",
    shortDescription:
      "Polycarbonate Roof sheets are available in a wide range of colors and standard roofing profiles, including Standard and SolarSmart options that reflect more heat.",
    description:
      "Polycarbonate Roof sheets are available in a wide range of colors and standard roofing profiles, including Standard and SolarSmart options that reflect more heat. They come with a limited lifetime warranty and offer 99.9 % UV protection, making them an outstanding, durable, and lightweight roofing material. ",
    images: [
      {
        src: "/images/awning-1.webp",
        alt: "Awning 1",
      },
      {
        src: "/images/awning-2.webp",
        alt: "Awning 2",
      },
    ],
    relatedProducts: [
      {
        id: "louvers",
        name: "Louvers",
        image: "/images/louvers.webp",
        href: "/other-product/louvers",
        shortDescription:
          "Polycarbonate Roof sheets are available in a wide range of colors and standard roofing profiles, including Standard and SolarSmart options that reflect more heat.",
      },
      {
        id: "shade-sails",
        name: "Shade Sails",
        image: "/images/awning-1.webp",
        href: "/other-product/shade-sails",
        shortDescription:
          "Polycarbonate Roof sheets are available in a wide range of colors and standard roofing profiles, including Standard and SolarSmart options that reflect more heat.",
      },
      {
        id: "umbrellas",
        name: "Umbrellas",
        image: "/images/umbrellas.webp",
        href: "/other-product/umbrellas",
        shortDescription:
          "Polycarbonate Roof sheets are available in a wide range of colors and standard roofing profiles, including Standard and SolarSmart options that reflect more heat.",
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
    features: [],
    specifications: {},
  },
  {
    id: "shade-sails",
    name: "Shade Sails",
    shortDescription:
      "Shade Sails protect against the sun's damaging UV radiation and allow outdoor relaxation, offering quality, performance, and durability.",
    description:
      "Shade Sails protect against the sun's damaging UV radiation and allow outdoor relaxation, offering quality, performance, and durability. ",
    images: [
      {
        src: "/images/awning-1.webp",
        alt: "Awning 1",
      },
      {
        src: "/images/awning-2.webp",
        alt: "Awning 2",
      },
    ],
    relatedProducts: [
      {
        id: "louvers",
        name: "Louvers",
        image: "/images/louvers.webp",
        href: "/other-product/louvers",
        shortDescription:
          "Shade Sails protect against the sun's damaging UV radiation and allow outdoor relaxation, offering quality, performance, and durability.",
      },
      {
        id: "polycarbonate-roofings",
        name: "Polycarbonate Roofings",
        image: "/images/awning-1.webp",
        href: "/other-product/polycarbonate-roofings",
        shortDescription:
          "Shade Sails protect against the sun's damaging UV radiation and allow outdoor relaxation, offering quality, performance, and durability.",
      },
      {
        id: "umbrellas",
        name: "Umbrellas",
        image: "/images/awning-1.webp",
        href: "/other-product/umbrellas",
        shortDescription:
          "Shade Sails protect against the sun's damaging UV radiation and allow outdoor relaxation, offering quality, performance, and durability.",
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
    features: [],
    specifications: {},
  },
  {
    id: "umbrellas",
    name: "Umbrellas",
    shortDescription:
      "Qualitative Blinds Cafe Series Umbrellas are sturdy, lightweight commercial umbrellas suited for commercial usage.",
    description:
      "Qualitative Blinds Cafe Series Umbrellas are sturdy, lightweight commercial umbrellas suited for commercial usage. They come in 3 sizes (2.1 m × 2.1 m, 3.0 m × 3.0 m, and 3.0 m Octagonal) and may be customized with branding. Designed for cafes and restaurants with aluminium frames and high-quality cloth canopies to withstand rigours of commercial use, ideal for printing logos. ",
    images: [
      {
        src: "/images/awning-1.webp",
        alt: "Awning 1",
      },
      {
        src: "/images/awning-2.webp",
        alt: "Awning 2",
      },
    ],
    relatedProducts: [
      {
        id: "louvers",
        name: "Louvers",
        image: "/images/louvers.webp",
        href: "/other-product/louvers",
        shortDescription:
          "Qualitative Blinds Cafe Series Umbrellas are sturdy, lightweight commercial umbrellas suited for commercial usage.",
      },
      {
        id: "polycarbonate-roofings",
        name: "Polycarbonate Roofings",
        image: "/images/awning-1.webp",
        href: "/other-product/polycarbonate-roofings",
        shortDescription:
          "Qualitative Blinds Cafe Series Umbrellas are sturdy, lightweight commercial umbrellas suited for commercial usage.",
      },
      {
        id: "shade-sails",
        name: "Shade Sails",
        image: "/images/awning-1.webp",
        href: "/other-product/shade-sails",
        shortDescription:
          "Qualitative Blinds Cafe Series Umbrellas are sturdy, lightweight commercial umbrellas suited for commercial usage.",
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
    features: [],
    specifications: {},
  },
  {
    id: "sunscreen-roller-blinds",
    name: "Sunscreen Roller Blinds",
    shortDescription:
      "Sunscreen Roller Blinds are made of mesh-like fabric that blocks glare and UV rays, keeping your space cool and protecting furniture from fading.",
    description:
      "Sunscreen Roller Blinds are made of mesh-like fabric that blocks glare and UV rays, keeping your space cool and protecting furniture from fading. They are best used where privacy is not required or combined with a Blockout Blind in a Double Roller Blind system for maximum relaxation. Available in a variety of materials and colors to suit any setting, our custom-made blinds help prevent heat, glare, and UV damage, saving on energy costs. They offer privacy during the day but become revealing at night with interior lights on, so pairing with Blockout is recommended for optimal privacy.",
    category: "blinds",
    subcategory: "roller",
    heroImage: "/images/sunscreen-roller-blind-1.webp",
    images: [
      {
        src: "/images/sunscreen-roller-blind-1.webp",
        alt: "Sunscreen Roller Blind",
      },
      {
        src: "/images/sunscreen-roller-blind-2.webp",
        alt: "Sunscreen Roller Blind in office",
      },
      { src: "/images/roller-blind-1.webp", alt: "Roller Blind detail" },
    ],
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
    category: "blinds",
    subcategory: "roller",
    heroImage: "/images/translucent-roller-blind-1.webp",
    images: [
      {
        src: "/images/translucent-roller-blind-1.webp",
        alt: "Translucent Roller Blind",
      },
      {
        src: "/images/translucent-roller-blind-2.webp",
        alt: "Translucent Roller Blind in bedroom",
      },
      { src: "/images/roller-blind-2.webp", alt: "Roller Blind mechanism" },
    ],
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
        src: "/images/translucent-roman-blind-1.webp",
        alt: "Translucent Roman Blind",
      },
      {
        src: "/images/translucent-roman-blind-2.webp",
        alt: "Translucent Roman Blind in living room",
      },
      { src: "/images/roman-blind-1.webp", alt: "Roman Blind detail" },
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
        src: "/images/cedar-venetian-blind-1.webp",
        alt: "Cedar Venetian Blind",
      },
      {
        src: "/images/cedar-venetian-blind-2.webp",
        alt: "Cedar Venetian Blind detail",
      },
      { src: "/images/venetian-blind-1.webp", alt: "Venetian Blind mechanism" },
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
