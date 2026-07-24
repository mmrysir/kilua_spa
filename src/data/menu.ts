export interface MenuItem {
  name: string;
  price: number;
  duration?: string;
  priceOptions?: { label: string; price: number }[];
  description?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  items: MenuItem[];
}

export const menuCategories: MenuCategory[] = [
  {
    id: "therapy",
    name: "Therapy Massages",
    description: "Soothing and traditional massage treatments designed to release stress and restore balance.",
    items: [
      {
        name: "Hot Herbal Elakizhi Massage",
        price: 35,
        duration: "75 Mins",
        description: "A traditional Ayurvedic bolus massage using warm herbal poultices that improves muscle strength, enhances joint mobility and helps reduce inflammation.",
      },
      {
        name: "Warm Herbal Oil Massage",
        price: 35,
        priceOptions: [
          { label: "60 Mins", price: 35 },
          { label: "30 Mins", price: 20 },
        ],
        description: "Very traditional and soothing massage done using warm herbal oil mixed with spices and long soothing movements helping you release all accumulated stress leaving you so relaxed and nourished.",
      },
      {
        name: "Relaxing Massage",
        price: 30,
        duration: "60 Mins",
        description: "This is an exotic treatment that rebalances the body and the mind through the dedicated hands of our therapist and the soothing sounds of nature.",
      },
      {
        name: "Mvua Africa Hot Stone Massage",
        price: 45,
        duration: "75 Mins",
        description: "This is an exotic treatment that rebalances the body, soul and mind by placing heated volcanic stones on the different pressure points of the body.",
      },
      {
        name: "Aromatherapy",
        price: 35,
        duration: "60 Mins",
        description: "A holistic medicinal relaxing massage that is combined with essential oils, candles and incense, which stimulates positive emotions and relaxation, equipping the client with coping mechanisms for many health issues.",
      },
      {
        name: "Deep Tissue Massage",
        price: 40,
        duration: "60 Mins",
        description: "We go deeper into your tired muscles releasing your accumulated stress.",
      },
      {
        name: "Feet and Leg Massage",
        price: 25,
        duration: "40 Mins",
        description: "Get relaxed after a long walk on the beach.",
      },
      {
        name: "Stress Relief",
        price: 15,
        duration: "30 Mins",
        description: "A unique deep style massage that highlights the back, shoulders and neck, releasing pressure on accumulated points.",
      },
    ],
  },
  {
    id: "beauty",
    name: "Beauty Therapy",
    description: "Traditional facial treats that nourish and renew your skin using natural tropical ingredients.",
    items: [
      {
        name: "Africa Wellbeing Face Treat (Facial)",
        price: 30,
        description: "A very traditional old age specialty used to renew & refresh all skin types using traditional and natural ingredients that will leave your skin so fresh and nourished.",
      },
    ],
  },
  {
    id: "grooming",
    name: "Hands & Feet Grooming",
    description: "A thorough grooming to your hands or feet that will condition, nourish and soften them using a cocktail of our rich natural oils melting away all the stress leaving them so relaxed, smooth and moisturised.",
    items: [
      { name: "Pedicure", price: 25 },
      { name: "Manicure", price: 20 },
      { name: "Foot Scrub & Massage", price: 20, duration: "30 Mins", description: "Rejuvenating foot exfoliation and relaxing massage." },
      { name: "Combination of Feet and Hands", price: 30 },
      { name: "Pedicure with Gel Polish", price: 30 },
      { name: "Manicure with Gel Polish", price: 25 },
      { name: "Combination of Feet and Hands with Gel Polish", price: 40 },
      { name: "Acrylic Nails (Tips, Stick-ons)", price: 35, description: "Tips and stick-ons done professionally." },
    ],
  },
  {
    id: "waxing-styling",
    name: "Waxing & Styling",
    description: "Professional waxing, traditional hair plaiting, and elegant henna artistic designs.",
    items: [
      { name: "Brazilian Waxing", price: 40 },
      { name: "Bikini Wax", price: 20 },
      { name: "Back Waxing", price: 25 },
      { name: "Full Leg Waxing", price: 35 },
      { name: "Half Leg Waxing", price: 20 },
      { name: "Full Arm Waxing", price: 25 },
      { name: "Half Arm Waxing", price: 15 },
      { name: "Under Arms Waxing", price: 10 },
      { name: "Lip, Chin & Eyebrow Waxing", price: 15 },
      { name: "Hair Plaiting", price: 30, priceOptions: [{ label: "From", price: 30 }], description: "Elegant traditional and modern hair styling, braids or cornrows." },
      { name: "Henna Art", price: 10, description: "Beautiful organic henna artistic drawing on hands or feet." },
    ],
  },
];
