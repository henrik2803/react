const products = [
  {
    id: 1,
    type: "moto",
    category: "Motos",
    brand: "Yamaha",
    name: "MT-07",
    slug: "yamaha-mt-07",
    price: 52990,
    oldPrice: null,
    image:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80",
    shortDescription:
      "Naked esportiva com visual agressivo e excelente relação peso-potência.",
    badges: ["Destaque"],
    stock: {
      available: true,
    },
    sales: {
      purchasableOnline: false,
      requestQuote: true,
      testRide: true,
      whatsapp: true,
    },
  },
  {
    id: 2,
    type: "moto",
    category: "Motos",
    brand: "Honda",
    name: "CB 500F",
    slug: "honda-cb-500f",
    price: 41900,
    oldPrice: null,
    image:
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=900&q=80",
    shortDescription:
      "Equilíbrio entre desempenho, conforto e uso urbano.",
    badges: ["Nova"],
    stock: {
      available: true,
    },
    sales: {
      purchasableOnline: false,
      requestQuote: true,
      testRide: true,
      whatsapp: true,
    },
  },
  {
    id: 3,
    type: "accessory",
    category: "Capacetes",
    brand: "LS2",
    name: "Capacete Vector II",
    slug: "capacete-ls2-vector-ii",
    price: 1899.9,
    oldPrice: 2199.9,
    image:
      "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=900&q=80",
    shortDescription:
      "Capacete integral com foco em segurança, conforto e aerodinâmica.",
    badges: ["Promoção"],
    stock: {
      available: true,
    },
    sales: {
      purchasableOnline: true,
      requestQuote: false,
      testRide: false,
      whatsapp: true,
    },
  },
  {
    id: 4,
    type: "accessory",
    category: "Jaquetas",
    brand: "Alpinestars",
    name: "Jaqueta T-GP Plus",
    slug: "jaqueta-t-gp-plus",
    price: 1299.9,
    oldPrice: null,
    image:
      "https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&w=900&q=80",
    shortDescription:
      "Jaqueta esportiva com proteção e ventilação para uso diário.",
    badges: [],
    stock: {
      available: true,
    },
    sales: {
      purchasableOnline: true,
      requestQuote: false,
      testRide: false,
      whatsapp: true,
    },
  },
  {
    id: 5,
    type: "accessory",
    category: "Luvas",
    brand: "X11",
    name: "Luva Blackout",
    slug: "luva-x11-blackout",
    price: 249.9,
    oldPrice: null,
    image:
      "https://images.unsplash.com/photo-1525013066836-c6090f0ad9d8?auto=format&fit=crop&w=900&q=80",
    shortDescription:
      "Luva confortável para pilotagem urbana com proteção reforçada.",
    badges: [],
    stock: {
      available: true,
    },
    sales: {
      purchasableOnline: true,
      requestQuote: false,
      testRide: false,
      whatsapp: true,
    },
  },
  {
    id: 6,
    type: "accessory",
    category: "Acessórios",
    brand: "Givi",
    name: "Baú Trekker 46L",
    slug: "bau-givi-trekker-46l",
    price: 2199.9,
    oldPrice: null,
    image:
      "https://images.unsplash.com/photo-1547549082-6bc09f2049ae?auto=format&fit=crop&w=900&q=80",
    shortDescription:
      "Baú resistente para viagens e uso diário.",
    badges: ["Destaque"],
    stock: {
      available: true,
    },
    sales: {
      purchasableOnline: true,
      requestQuote: false,
      testRide: false,
      whatsapp: true,
    },
  },
];

export default products;