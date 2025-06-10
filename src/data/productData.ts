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
    width: string[];
    height: string[];
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
      "Outdoor Aluminium Venetian Blinds are highly practical and versatile, made from a specialised aluminium alloy thicker than market standards for extra durability and strength.",
    description:
      "Outdoor Aluminium Venetian Blinds are highly practical and versatile, made from a specialised aluminium alloy thicker than market standards for extra durability and strength. Available in 25 mm and 50 mm slat widths with various material finishes—from pastels and vibrant metallic shades to wood effects and plain finishes—which are splash-proof, warp-resistant, and easy to clean, making them ideal for kitchens and bathrooms. ",
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
      "Basswood Venetian Blinds are lightweight and bring natural beauty into your home, offering a full range of tints and stains to match any decor.",
    description:
      "Basswood Venetian Blinds are lightweight and bring natural beauty into your home, offering a full range of tints and stains to match any decor. They come in both traditional and modern styles with finishes such as satin, gloss, matt, brushed, pearlised, and perforated, and are easy to maintain and clean while remaining durable. ",
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
      "Blockout Roller Blinds are available in various premium fabrics globally sourced, providing maximum darkness and maintaining room temperature by keeping interiors cooler in summer and warmer in winter.",
    description:
      "Blockout Roller Blinds are available in various premium fabrics globally sourced, providing maximum darkness and maintaining room temperature by keeping interiors cooler in summer and warmer in winter. Custom-made from thick, coated fabric designed to withstand harsh Australian climate. Can be paired with sheer curtains for a contemporary look. Available with manual or automated operation and easy cleaning; multiple fabric options include classic, modern, and textured weaves. ",
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
      "Blockout Roman Blinds are made from quality fabrics sourced from Australian fabric houses, supplied with a chain-operated tracking system and aluminium back battens for a straight, tailored look.",
    description:
      "Blockout Roman Blinds are made from quality fabrics sourced from Australian fabric houses, supplied with a chain-operated tracking system and aluminium back battens for a straight, tailored look. Single-piece fabric design allows easy addition of blackout lining. Available in various fabrics including Barbados, Gala, Kew, Matrix, Metro, and Serengetti. ",
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
      "Blockout Curtains are manufactured using a proprietary three-weave technology that blocks 99 % of harmful UV rays and 100 % of harsh sunlight.",
    description:
      "Blockout Curtains are manufactured using a proprietary three-weave technology that blocks 99 % of harmful UV rays and 100 % of harsh sunlight. They reduce heat transfer through windows by up to 24 %, improving energy efficiency by keeping rooms cooler in summer and warmer in winter. Available with various colours and fabrics suited for thermal insulation and UV protection. ",
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
      "Sheer Curtains are lightweight fabrics that soften incoming light and add style to home décor.",
    description:
      "Sheer Curtains are lightweight fabrics that soften incoming light and add style to home décor. They offer a level of daytime privacy but become transparent at night when interior lights are on. Ideal for layering with other window treatments, they create a serene, airy atmosphere and allow soft, filtered natural light. ",
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
      "Reduce glare while maintaining your view. Ideal for living areas and offices with excellent UV protection and view preservation.",
    description:
      "Sunscreen Roller Blinds offer the perfect balance between sun protection and maintaining your view. Made from specially designed mesh fabrics, they reduce glare and heat while allowing natural light to filter through. Ideal for office spaces, living areas, and any room where you want to preserve your view while protecting against harmful UV rays.",
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
      "Soft, filtered light with privacy. Perfect balance of natural light and discretion for any room in your home.",
    description:
      "Translucent Roller Blinds provide the ideal solution when you want to maintain privacy while allowing soft, natural light to filter into your space. These blinds offer a gentle glow that creates a warm and inviting atmosphere while protecting your privacy during the day.",
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
      "Soft, filtered light with sophisticated style. Ideal for living spaces where gentle illumination meets timeless elegance.",
    description:
      "Translucent Roman Blinds combine the classic elegance of roman styling with light-filtering capabilities. These blinds feature premium fabrics that allow gentle light diffusion while maintaining privacy, creating a sophisticated and inviting atmosphere in any room.",
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
      "Luxurious cedar wood with rich grain patterns. The ultimate choice for those seeking premium quality and natural beauty.",
    description:
      "Cedar Venetian Blinds represent the pinnacle of natural wood window treatments. Crafted from premium cedar timber, these blinds feature rich grain patterns and natural beauty that brings warmth and luxury to any space. Cedar's natural properties provide excellent durability and resistance to moisture and insects.",
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
