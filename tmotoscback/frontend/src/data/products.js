const products = [
  {
    id: 1,

    type: "moto",

    category: "Motos",
    subcategory: "Naked",

    brand: "Yamaha",
    name: "MT-07",
    slug: "yamaha-mt-07",

    condition: "novo",

    shortDescription:
      "Naked esportiva com visual agressivo e excelente relação peso-potência.",

    description:
      "A Yamaha MT-07 combina motor bicilíndrico, baixo peso e uma posição de pilotagem versátil. É uma motocicleta desenvolvida para quem busca desempenho no uso urbano sem abrir mão de diversão em trajetos rodoviários.",

    price: 52990,
    oldPrice: null,

    installment: {
      enabled: false,
      installments: null,
      value: null,
    },

    media: {
      cover:
        "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=85",

      images: [
        "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1400&q=85",
      ],

      video: null,
    },

    colors: [
      {
        id: "black",
        name: "Preto",
        hex: "#111111",
      },
      {
        id: "blue",
        name: "Azul",
        hex: "#1f4f8a",
      },
    ],

    variants: [],

    specs: {
      engine: {
        displacement: 689,
        cylinders: 2,
        cooling: "Líquida",
        fuel: "Gasolina",
        injection: "Eletrônica",
      },

      performance: {
        power: 74.8,
        powerUnit: "cv",
        torque: 6.9,
        torqueUnit: "kgf.m",
      },

      transmission: {
        gears: 6,
        type: "Manual",
        finalDrive: "Corrente",
      },

      dimensions: {
        weight: 184,
        weightUnit: "kg",
        seatHeight: 805,
        seatHeightUnit: "mm",
        fuelTank: 14,
        fuelTankUnit: "L",
      },

      features: [
        "ABS",
        "Painel digital",
        "Iluminação LED",
        "Injeção eletrônica",
      ],
    },

    badges: ["Destaque"],

    stock: {
      available: true,
      quantity: null,
    },

    sales: {
      purchasableOnline: false,
      requestQuote: true,
      testRide: true,
      whatsapp: true,
    },

    feed: {
      enabled: true,
      featured: true,
      order: 1,
      text: "Torque, leveza e diversão em cada curva.",
    },

    tags: [
      "moto",
      "yamaha",
      "mt07",
      "naked",
      "esportiva",
      "689cc",
    ],

    seo: {
      title: "Yamaha MT-07 | TMotos",
      description:
        "Conheça a Yamaha MT-07 disponível na TMotos.",
    },
  },

  {
    id: 2,

    type: "moto",

    category: "Motos",
    subcategory: "Naked",

    brand: "Honda",
    name: "CB 500F",
    slug: "honda-cb-500f",

    condition: "novo",

    shortDescription:
      "Equilíbrio entre desempenho, conforto e uso urbano.",

    description:
      "A Honda CB 500F oferece uma combinação equilibrada de desempenho, facilidade de pilotagem e conforto. Seu conjunto foi desenvolvido para atender tanto quem utiliza a motocicleta diariamente quanto quem busca viagens e passeios de fim de semana.",

    price: 41900,
    oldPrice: null,

    installment: {
      enabled: false,
      installments: null,
      value: null,
    },

    media: {
      cover:
        "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=85",

      images: [
        "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1400&q=85",
      ],

      video: null,
    },

    colors: [
      {
        id: "red",
        name: "Vermelho",
        hex: "#c91d2e",
      },
      {
        id: "black",
        name: "Preto",
        hex: "#111111",
      },
    ],

    variants: [],

    specs: {
      engine: {
        displacement: 471,
        cylinders: 2,
        cooling: "Líquida",
        fuel: "Gasolina",
        injection: "Eletrônica",
      },

      performance: {
        power: 50.2,
        powerUnit: "cv",
        torque: 4.54,
        torqueUnit: "kgf.m",
      },

      transmission: {
        gears: 6,
        type: "Manual",
        finalDrive: "Corrente",
      },

      dimensions: {
        weight: 189,
        weightUnit: "kg",
        seatHeight: 785,
        seatHeightUnit: "mm",
        fuelTank: 17.1,
        fuelTankUnit: "L",
      },

      features: [
        "ABS",
        "Painel digital",
        "Iluminação LED",
      ],
    },

    badges: ["Nova"],

    stock: {
      available: true,
      quantity: null,
    },

    sales: {
      purchasableOnline: false,
      requestQuote: true,
      testRide: true,
      whatsapp: true,
    },

    feed: {
      enabled: true,
      featured: true,
      order: 2,
      text: "Equilíbrio para cidade, estrada e todos os dias.",
    },

    tags: [
      "moto",
      "honda",
      "cb500f",
      "naked",
      "500cc",
    ],

    seo: {
      title: "Honda CB 500F | TMotos",
      description:
        "Conheça a Honda CB 500F disponível na TMotos.",
    },
  },

  {
    id: 3,

    type: "accessory",

    category: "Capacetes",
    subcategory: "Integral",

    brand: "LS2",
    name: "Capacete Vector II",
    slug: "capacete-ls2-vector-ii",

    condition: "novo",

    shortDescription:
      "Capacete integral com foco em segurança, conforto e aerodinâmica.",

    description:
      "O LS2 Vector II é um capacete integral desenvolvido para combinar proteção, conforto e aerodinâmica em trajetos urbanos e rodoviários.",

    price: 1899.9,
    oldPrice: 2199.9,

    installment: {
      enabled: true,
      installments: 10,
      value: 189.99,
    },

    media: {
      cover:
        "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=1200&q=85",

      images: [
        "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=1400&q=85",
      ],

      video: null,
    },

    colors: [
      {
        id: "black",
        name: "Preto",
        hex: "#111111",
      },
      {
        id: "white",
        name: "Branco",
        hex: "#eeeeee",
      },
    ],

    variants: [
      {
        id: "vector-black-56",
        colorId: "black",
        size: "56",
        stock: 3,
      },
      {
        id: "vector-black-58",
        colorId: "black",
        size: "58",
        stock: 4,
      },
      {
        id: "vector-black-60",
        colorId: "black",
        size: "60",
        stock: 2,
      },
      {
        id: "vector-white-58",
        colorId: "white",
        size: "58",
        stock: 2,
      },
    ],

    specs: {
      type: "Integral",
      material: "Fibra HPFC",
      visor: "Cristal com proteção UV",
      ventilation: true,
      removableLining: true,
      pinlockReady: true,
    },

    badges: ["Promoção"],

    stock: {
      available: true,
      quantity: 11,
    },

    sales: {
      purchasableOnline: true,
      requestQuote: false,
      testRide: false,
      whatsapp: true,
    },

    feed: {
      enabled: true,
      featured: false,
      order: 3,
      text: "Proteção e conforto para sua próxima rota.",
    },

    tags: [
      "capacete",
      "ls2",
      "integral",
      "vector",
    ],

    seo: {
      title: "Capacete LS2 Vector II | TMotos",
      description:
        "Capacete LS2 Vector II integral disponível na TMotos.",
    },
  },

  {
    id: 4,

    type: "accessory",

    category: "Jaquetas",
    subcategory: "Esportiva",

    brand: "Alpinestars",
    name: "Jaqueta T-GP Plus",
    slug: "jaqueta-t-gp-plus",

    condition: "novo",

    shortDescription:
      "Jaqueta esportiva com proteção e ventilação para uso diário.",

    description:
      "A Alpinestars T-GP Plus combina construção resistente, ventilação e proteções para oferecer conforto e segurança durante a pilotagem.",

    price: 1299.9,
    oldPrice: null,

    installment: {
      enabled: true,
      installments: 10,
      value: 129.99,
    },

    media: {
      cover:
        "https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&w=1200&q=85",

      images: [
        "https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&w=1400&q=85",
      ],

      video: null,
    },

    colors: [
      {
        id: "black",
        name: "Preto",
        hex: "#111111",
      },
      {
        id: "black-red",
        name: "Preto e Vermelho",
        hex: "#b71924",
      },
    ],

    variants: [
      {
        id: "tgp-black-p",
        colorId: "black",
        size: "P",
        stock: 2,
      },
      {
        id: "tgp-black-m",
        colorId: "black",
        size: "M",
        stock: 4,
      },
      {
        id: "tgp-black-g",
        colorId: "black",
        size: "G",
        stock: 3,
      },
    ],

    specs: {
      material: "Tecido técnico resistente à abrasão",
      protections: [
        "Ombros",
        "Cotovelos",
      ],
      ventilation: true,
      removableLining: true,
      waterproof: false,
    },

    badges: [],

    stock: {
      available: true,
      quantity: 9,
    },

    sales: {
      purchasableOnline: true,
      requestQuote: false,
      testRide: false,
      whatsapp: true,
    },

    feed: {
      enabled: true,
      featured: false,
      order: 4,
      text: "Proteção esportiva sem abrir mão do conforto.",
    },

    tags: [
      "jaqueta",
      "alpinestars",
      "protecao",
      "motociclista",
    ],

    seo: {
      title: "Jaqueta Alpinestars T-GP Plus | TMotos",
      description:
        "Jaqueta Alpinestars T-GP Plus disponível na TMotos.",
    },
  },

  {
    id: 5,

    type: "accessory",

    category: "Luvas",
    subcategory: "Urbana",

    brand: "X11",
    name: "Luva Blackout",
    slug: "luva-x11-blackout",

    condition: "novo",

    shortDescription:
      "Luva confortável para pilotagem urbana com proteção reforçada.",

    description:
      "A X11 Blackout foi desenvolvida para uso urbano, oferecendo conforto, mobilidade e proteção para as mãos durante a pilotagem.",

    price: 249.9,
    oldPrice: null,

    installment: {
      enabled: true,
      installments: 3,
      value: 83.3,
    },

    media: {
      cover:
        "https://images.unsplash.com/photo-1525013066836-c6090f0ad9d8?auto=format&fit=crop&w=1200&q=85",

      images: [
        "https://images.unsplash.com/photo-1525013066836-c6090f0ad9d8?auto=format&fit=crop&w=1400&q=85",
      ],

      video: null,
    },

    colors: [
      {
        id: "black",
        name: "Preto",
        hex: "#111111",
      },
    ],

    variants: [
      {
        id: "blackout-p",
        colorId: "black",
        size: "P",
        stock: 4,
      },
      {
        id: "blackout-m",
        colorId: "black",
        size: "M",
        stock: 7,
      },
      {
        id: "blackout-g",
        colorId: "black",
        size: "G",
        stock: 5,
      },
    ],

    specs: {
      material: "Tecido técnico",
      knuckleProtection: true,
      palmProtection: true,
      touchscreen: true,
      waterproof: false,
      cuff: "Curto",
    },

    badges: [],

    stock: {
      available: true,
      quantity: 16,
    },

    sales: {
      purchasableOnline: true,
      requestQuote: false,
      testRide: false,
      whatsapp: true,
    },

    feed: {
      enabled: false,
      featured: false,
      order: null,
      text: "",
    },

    tags: [
      "luva",
      "x11",
      "urbana",
      "protecao",
    ],

    seo: {
      title: "Luva X11 Blackout | TMotos",
      description:
        "Luva X11 Blackout para motociclistas disponível na TMotos.",
    },
  },

  {
    id: 6,

    type: "accessory",

    category: "Acessórios",
    subcategory: "Bagagem",

    brand: "Givi",
    name: "Baú Trekker 46L",
    slug: "bau-givi-trekker-46l",

    condition: "novo",

    shortDescription:
      "Baú resistente para viagens e uso diário.",

    description:
      "O Givi Trekker 46L oferece espaço e resistência para viagens e deslocamentos urbanos, permitindo transportar equipamentos com maior segurança e praticidade.",

    price: 2199.9,
    oldPrice: null,

    installment: {
      enabled: true,
      installments: 10,
      value: 219.99,
    },

    media: {
      cover:
        "https://images.unsplash.com/photo-1547549082-6bc09f2049ae?auto=format&fit=crop&w=1200&q=85",

      images: [
        "https://images.unsplash.com/photo-1547549082-6bc09f2049ae?auto=format&fit=crop&w=1400&q=85",
      ],

      video: null,
    },

    colors: [
      {
        id: "black",
        name: "Preto",
        hex: "#111111",
      },
    ],

    variants: [],

    specs: {
      capacity: 46,
      capacityUnit: "L",
      material: "Polímero reforçado",
      waterproof: true,
      removable: true,
      helmetCapacity: 1,
      lock: "Chave",
    },

    badges: ["Destaque"],

    stock: {
      available: true,
      quantity: 8,
    },

    sales: {
      purchasableOnline: true,
      requestQuote: false,
      testRide: false,
      whatsapp: true,
    },

    feed: {
      enabled: true,
      featured: false,
      order: 5,
      text: "Mais espaço para levar sua viagem além.",
    },

    tags: [
      "bau",
      "givi",
      "bagagem",
      "viagem",
      "46l",
    ],

    seo: {
      title: "Baú Givi Trekker 46L | TMotos",
      description:
        "Baú Givi Trekker 46L disponível na TMotos.",
    },
  },
];

export default products;