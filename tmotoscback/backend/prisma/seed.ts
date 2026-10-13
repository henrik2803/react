import { prisma } from "../src/lib/prisma.js";

import {
  ProductType,
} from "../src/generated/prisma/enums.js";

const products = [
  {
    type: ProductType.MOTO,

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

    installmentEnabled: false,
    installmentCount: null,
    installmentValue: null,

    coverUrl:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=85",

    images: [
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1400&q=85",
    ],

    videoUrl: "/videos/mt07.mp4",

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

    stockAvailable: true,
    stockQuantity: null,

    purchasableOnline: false,
    requestQuote: true,
    testRide: true,
    whatsapp: true,

    feedEnabled: true,
    feedFeatured: true,
    feedOrder: 1,
    feedText:
      "Torque, leveza e diversão em cada curva.",

    tags: [
      "moto",
      "yamaha",
      "mt07",
      "naked",
      "esportiva",
      "689cc",
    ],

    seoTitle: "Yamaha MT-07 | TMotos",
    seoDescription:
      "Conheça a Yamaha MT-07 disponível na TMotos.",

    colors: [
      {
        key: "black",
        name: "Preto",
        hex: "#111111",
      },
      {
        key: "blue",
        name: "Azul",
        hex: "#1f4f8a",
      },
    ],

    variants: [],
  },

  {
    type: ProductType.MOTO,

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

    installmentEnabled: false,
    installmentCount: null,
    installmentValue: null,

    coverUrl:
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=85",

    images: [
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1400&q=85",
    ],

    videoUrl: null,

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

    stockAvailable: true,
    stockQuantity: null,

    purchasableOnline: false,
    requestQuote: true,
    testRide: true,
    whatsapp: true,

    feedEnabled: true,
    feedFeatured: true,
    feedOrder: 2,
    feedText:
      "Equilíbrio para cidade, estrada e todos os dias.",

    tags: [
      "moto",
      "honda",
      "cb500f",
      "naked",
      "500cc",
    ],

    seoTitle:
      "Honda CB 500F | TMotos",

    seoDescription:
      "Conheça a Honda CB 500F disponível na TMotos.",

    colors: [
      {
        key: "red",
        name: "Vermelho",
        hex: "#c91d2e",
      },
      {
        key: "black",
        name: "Preto",
        hex: "#111111",
      },
    ],

    variants: [],
  },

  {
    type: ProductType.ACCESSORY,

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

    installmentEnabled: true,
    installmentCount: 10,
    installmentValue: 189.99,

    coverUrl:
      "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=1200&q=85",

    images: [
      "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=1400&q=85",
    ],

    videoUrl: null,

    specs: {
      type: "Integral",
      material: "Fibra HPFC",
      visor:
        "Cristal com proteção UV",
      ventilation: true,
      removableLining: true,
      pinlockReady: true,
    },

    badges: ["Promoção"],

    stockAvailable: true,
    stockQuantity: 11,

    purchasableOnline: true,
    requestQuote: false,
    testRide: false,
    whatsapp: true,

    feedEnabled: true,
    feedFeatured: false,
    feedOrder: 3,
    feedText:
      "Proteção e conforto para sua próxima rota.",

    tags: [
      "capacete",
      "ls2",
      "integral",
      "vector",
    ],

    seoTitle:
      "Capacete LS2 Vector II | TMotos",

    seoDescription:
      "Capacete LS2 Vector II integral disponível na TMotos.",

    colors: [
      {
        key: "black",
        name: "Preto",
        hex: "#111111",
      },
      {
        key: "white",
        name: "Branco",
        hex: "#eeeeee",
      },
    ],

    variants: [
      {
        key: "vector-black-56",
        colorKey: "black",
        size: "56",
        stock: 3,
      },
      {
        key: "vector-black-58",
        colorKey: "black",
        size: "58",
        stock: 4,
      },
      {
        key: "vector-black-60",
        colorKey: "black",
        size: "60",
        stock: 2,
      },
      {
        key: "vector-white-58",
        colorKey: "white",
        size: "58",
        stock: 2,
      },
    ],
  },

  {
    type: ProductType.ACCESSORY,

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

    installmentEnabled: true,
    installmentCount: 10,
    installmentValue: 129.99,

    coverUrl:
      "https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&w=1200&q=85",

    images: [
      "https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&w=1400&q=85",
    ],

    videoUrl: null,

    specs: {
      material:
        "Tecido técnico resistente à abrasão",

      protections: [
        "Ombros",
        "Cotovelos",
      ],

      ventilation: true,
      removableLining: true,
      waterproof: false,
    },

    badges: [],

    stockAvailable: true,
    stockQuantity: 9,

    purchasableOnline: true,
    requestQuote: false,
    testRide: false,
    whatsapp: true,

    feedEnabled: true,
    feedFeatured: false,
    feedOrder: 4,

    feedText:
      "Proteção esportiva sem abrir mão do conforto.",

    tags: [
      "jaqueta",
      "alpinestars",
      "protecao",
      "motociclista",
    ],

    seoTitle:
      "Jaqueta Alpinestars T-GP Plus | TMotos",

    seoDescription:
      "Jaqueta Alpinestars T-GP Plus disponível na TMotos.",

    colors: [
      {
        key: "black",
        name: "Preto",
        hex: "#111111",
      },
      {
        key: "black-red",
        name: "Preto e Vermelho",
        hex: "#b71924",
      },
    ],

    variants: [
      {
        key: "tgp-black-p",
        colorKey: "black",
        size: "P",
        stock: 2,
      },
      {
        key: "tgp-black-m",
        colorKey: "black",
        size: "M",
        stock: 4,
      },
      {
        key: "tgp-black-g",
        colorKey: "black",
        size: "G",
        stock: 3,
      },
    ],
  },

  {
    type: ProductType.ACCESSORY,

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

    installmentEnabled: true,
    installmentCount: 3,
    installmentValue: 83.3,

    coverUrl:
      "https://images.unsplash.com/photo-1525013066836-c6090f0ad9d8?auto=format&fit=crop&w=1200&q=85",

    images: [
      "https://images.unsplash.com/photo-1525013066836-c6090f0ad9d8?auto=format&fit=crop&w=1400&q=85",
    ],

    videoUrl: null,

    specs: {
      material: "Tecido técnico",
      knuckleProtection: true,
      palmProtection: true,
      touchscreen: true,
      waterproof: false,
      cuff: "Curto",
    },

    badges: [],

    stockAvailable: true,
    stockQuantity: 16,

    purchasableOnline: true,
    requestQuote: false,
    testRide: false,
    whatsapp: true,

    feedEnabled: false,
    feedFeatured: false,
    feedOrder: null,
    feedText: "",

    tags: [
      "luva",
      "x11",
      "urbana",
      "protecao",
    ],

    seoTitle:
      "Luva X11 Blackout | TMotos",

    seoDescription:
      "Luva X11 Blackout para motociclistas disponível na TMotos.",

    colors: [
      {
        key: "black",
        name: "Preto",
        hex: "#111111",
      },
    ],

    variants: [
      {
        key: "blackout-p",
        colorKey: "black",
        size: "P",
        stock: 4,
      },
      {
        key: "blackout-m",
        colorKey: "black",
        size: "M",
        stock: 7,
      },
      {
        key: "blackout-g",
        colorKey: "black",
        size: "G",
        stock: 5,
      },
    ],
  },

  {
    type: ProductType.ACCESSORY,

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

    installmentEnabled: true,
    installmentCount: 10,
    installmentValue: 219.99,

    coverUrl:
      "https://images.unsplash.com/photo-1547549082-6bc09f2049ae?auto=format&fit=crop&w=1200&q=85",

    images: [
      "https://images.unsplash.com/photo-1547549082-6bc09f2049ae?auto=format&fit=crop&w=1400&q=85",
    ],

    videoUrl: null,

    specs: {
      capacity: 46,
      capacityUnit: "L",
      material:
        "Polímero reforçado",
      waterproof: true,
      removable: true,
      helmetCapacity: 1,
      lock: "Chave",
    },

    badges: ["Destaque"],

    stockAvailable: true,
    stockQuantity: 8,

    purchasableOnline: true,
    requestQuote: false,
    testRide: false,
    whatsapp: true,

    feedEnabled: true,
    feedFeatured: false,
    feedOrder: 5,

    feedText:
      "Mais espaço para levar sua viagem além.",

    tags: [
      "bau",
      "givi",
      "bagagem",
      "viagem",
      "46l",
    ],

    seoTitle:
      "Baú Givi Trekker 46L | TMotos",

    seoDescription:
      "Baú Givi Trekker 46L disponível na TMotos.",

    colors: [
      {
        key: "black",
        name: "Preto",
        hex: "#111111",
      },
    ],

    variants: [],
  },
];

async function seedProduct(
  product: (typeof products)[number]
) {
  const {
    colors,
    variants,
    ...productData
  } = product;

  const savedProduct =
    await prisma.product.upsert({
      where: {
        slug: product.slug,
      },

      update: productData,

      create: productData,
    });

  /*
   * Limpamos cores e variantes antes
   * de recriá-las.
   *
   * Isso deixa o seed repetível.
   */
  await prisma.productVariant.deleteMany({
    where: {
      productId: savedProduct.id,
    },
  });

  await prisma.productColor.deleteMany({
    where: {
      productId: savedProduct.id,
    },
  });

  const colorIds =
    new Map<string, number>();

  for (const color of colors) {
    const createdColor =
      await prisma.productColor.create({
        data: {
          productId:
            savedProduct.id,

          key: color.key,
          name: color.name,
          hex: color.hex,
        },
      });

    colorIds.set(
      color.key,
      createdColor.id
    );
  }

  for (const variant of variants) {
    const colorId =
      colorIds.get(
        variant.colorKey
      );

    if (!colorId) {
      throw new Error(
        `Cor ${variant.colorKey} não encontrada para ${product.slug}.`
      );
    }

    await prisma.productVariant.create({
      data: {
        productId:
          savedProduct.id,

        colorId,

        key: variant.key,
        size: variant.size,
        stock: variant.stock,
      },
    });
  }

  console.log(
    `✓ ${product.name}`
  );
}

async function main() {
  console.log(
    "Iniciando seed da TMotos..."
  );

  /*
   * Esse slug pertencia ao seed
   * simplificado que fizemos antes.
   */
  await prisma.product.deleteMany({
    where: {
      slug: "ls2-vector-ii",
    },
  });

  for (const product of products) {
    await seedProduct(product);
  }

  console.log("");
  console.log(
    "Seed executado com sucesso."
  );
  console.log(
    `${products.length} produtos cadastrados.`
  );
}

main()
  .catch((error) => {
    console.error(
      "Erro ao executar seed:"
    );

    console.error(error);

    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });