export type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  image: string;
  colSpan?: "full";
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  unit: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  inStock: boolean;
  isFeatured: boolean;
  image: string;
  rating?: number;
  reviews?: number;
};

export const categories: Category[] = [
  {
    id: "bano",
    name: "Baño",
    slug: "bano",
    icon: "bathtub",
    description: "Higiene y accesorios",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80",
    colSpan: "full",
  },
  {
    id: "uso-personal",
    name: "Uso Personal",
    slug: "uso-personal",
    icon: "clean_hands",
    description: "Higiene personal",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80",
  },
  {
    id: "cocina",
    name: "Cocina",
    slug: "cocina",
    icon: "kitchen",
    description: "Limpieza de cocina",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
  },
  {
    id: "casa",
    name: "Casa",
    slug: "casa",
    icon: "home",
    description: "Limpieza del hogar",
    image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&q=80",
  },
  {
    id: "ropa",
    name: "Ropa",
    slug: "ropa",
    icon: "laundry",
    description: "Lavado de ropa",
    image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&q=80",
  },
  {
    id: "etc",
    name: "Etc",
    slug: "etc",
    icon: "more_horiz",
    description: "Lámparas y termos",
    image: "",
  },
];

export const products: Product[] = [
  // Baño
  { id: "1", slug: "odex-bano-doypack-450ml", name: "Odex Limpieza Baño Doy Pack", brand: "Odex", category: "bano", unit: "450ml", price: 1408, description: "Limpiador de baño fórmula concentrada en envase Doy Pack. Elimina cal, bacterias y manchas difíciles.", inStock: true, isFeatured: true, image: "", rating: 4.8, reviews: 42 },
  { id: "2", slug: "odex-vidrio-doypack-450ml", name: "Odex Vidrio Doy Pack", brand: "Odex", category: "bano", unit: "450ml", price: 1408, description: "Limpiador de vidrios y superficies brillantes. Sin rayas ni residuos.", inStock: true, isFeatured: false, image: "" },
  { id: "3", slug: "escobilla-bano-base-silva", name: "Escobilla de Baño con Base", brand: "Silva", category: "bano", unit: "unidad", price: 2983, description: "Escobilla de baño con base incluida. Mango ergonómico.", inStock: true, isFeatured: false, image: "" },
  { id: "4", slug: "esponja-vegetal", name: "Esponja Vegetal", brand: "Virulana", category: "bano", unit: "unidad", price: 1942, description: "Esponja natural vegetal de alta durabilidad.", inStock: true, isFeatured: false, image: "" },
  { id: "5", slug: "sopapa-destapadora-silva", name: "Sopapa Destapadora", brand: "Silva", category: "bano", unit: "unidad", price: 2045, description: "Sopapa de goma para desatascar cañerías.", inStock: true, isFeatured: false, image: "" },

  // Uso Personal
  { id: "6", slug: "colgate-original-70g", name: "Pasta Dientes Original", brand: "Colgate", category: "uso-personal", unit: "70g", price: 2438, description: "Pasta dental original Colgate con flúor.", inStock: true, isFeatured: true, image: "", rating: 4.9, reviews: 120 },
  { id: "7", slug: "colgate-luminous-white-70g", name: "Pasta Dientes Luminous White", brand: "Colgate", category: "uso-personal", unit: "70g", price: 4973, description: "Blanqueamiento avanzado y protección de esmalte.", inStock: true, isFeatured: false, image: "" },
  { id: "8", slug: "colgate-triple-beneficio-70g", name: "Pasta Dientes Triple Beneficio", brand: "Colgate", category: "uso-personal", unit: "70g", price: 2792, description: "Triple acción: blanqueamiento, anticaries y frescura.", inStock: true, isFeatured: false, image: "" },
  { id: "9", slug: "palmolibre-frambuesa", name: "Jabón Palmolibre Frambuesa", brand: "Palmolibre", category: "uso-personal", unit: "60g", price: 730, description: "Barra de jabón hidratante fragancia frambuesa.", inStock: true, isFeatured: false, image: "" },
  { id: "10", slug: "palmolibre-aloe-vera", name: "Jabón Palmolibre Aloe Vera", brand: "Palmolibre", category: "uso-personal", unit: "60g", price: 730, description: "Barra de jabón con aloe vera para piel sensible.", inStock: true, isFeatured: false, image: "" },
  { id: "11", slug: "palmolibre-cacao", name: "Jabón Palmolibre Cacao", brand: "Palmolibre", category: "uso-personal", unit: "60g", price: 730, description: "Barra de jabón hidratante con extracto de cacao.", inStock: true, isFeatured: false, image: "" },
  { id: "12", slug: "toallas-pocket-normal-alas-x8", name: "Toallas Pocket Normal con Alas", brand: "Doncella", category: "uso-personal", unit: "x8", price: 714, description: "Toallas higiénicas con alas para mayor seguridad.", inStock: true, isFeatured: false, image: "" },
  { id: "13", slug: "toallas-pocket-sin-alas-x8", name: "Toallas Pocket Normal sin Alas", brand: "Doncella", category: "uso-personal", unit: "x8", price: 714, description: "Toallas higiénicas sin alas.", inStock: true, isFeatured: false, image: "" },
  { id: "14", slug: "toallas-pocket-nocturnas-x8", name: "Toallas Pocket Nocturnas", brand: "Doncella", category: "uso-personal", unit: "x8", price: 1221, description: "Toallas nocturnas de mayor protección.", inStock: true, isFeatured: false, image: "" },
  { id: "15", slug: "toallas-pocket-nocturnas-x16", name: "Toallas Pocket Nocturnas", brand: "Doncella", category: "uso-personal", unit: "x16", price: 2392, description: "Pack x16 toallas nocturnas.", inStock: true, isFeatured: false, image: "" },
  { id: "16", slug: "protector-diario-anatomico-x20", name: "Protector Diario Anatómico", brand: "Doncella", category: "uso-personal", unit: "x20", price: 811, description: "Protectores diarios anatómicos ultra finos.", inStock: true, isFeatured: false, image: "" },
  { id: "17", slug: "toallas-pocket-tanga-x8", name: "Toallas Pocket Tanga con Alas", brand: "Doncella", category: "uso-personal", unit: "x8", price: 842, description: "Toallas para tanga con alas adhesivas.", inStock: true, isFeatured: false, image: "" },
  { id: "18", slug: "plax-rojo-250ml", name: "Plax Rojo", brand: "Colgate", category: "uso-personal", unit: "250ml", price: 4430, description: "Enjuague bucal Plax fórmula roja anti bacterias.", inStock: true, isFeatured: false, image: "" },
  { id: "19", slug: "plax-menta-suave-250ml", name: "Plax Menta Suave", brand: "Colgate", category: "uso-personal", unit: "250ml", price: 4430, description: "Enjuague bucal Plax menta suave.", inStock: true, isFeatured: false, image: "" },
  { id: "20", slug: "cepillo-extra-clean-mediano-2pack", name: "Cepillo Extra Clean Mediano", brand: "Colgate", category: "uso-personal", unit: "2 pack", price: 3900, description: "Pack 2 cepillos dental extra clean cerdas medianas.", inStock: true, isFeatured: false, image: "" },
  { id: "21", slug: "cepillo-max-white-mediano-2x1", name: "Cepillo Max White Mediano", brand: "Colgate", category: "uso-personal", unit: "2x1", price: 5417, description: "Cepillo blanqueador Max White pack 2x1.", inStock: true, isFeatured: false, image: "" },

  // Cocina
  { id: "22", slug: "virulana-pano-twist", name: "Paño Twist", brand: "Virulana", category: "cocina", unit: "unidad", price: 1566, description: "Paño multiuso torsionado extra absorbente.", inStock: true, isFeatured: true, image: "" },
  { id: "23", slug: "virulana-pano-esponja", name: "Paño Esponja", brand: "Virulana", category: "cocina", unit: "unidad", price: 1240, description: "Paño esponja doble función: lavar y secar.", inStock: true, isFeatured: false, image: "" },
  { id: "24", slug: "virulana-trapo-microfibra-piso", name: "Trapo Microfibra Piso", brand: "Virulana", category: "cocina", unit: "unidad", price: 6232, description: "Trapo de piso microfibra ultra absorbente.", inStock: true, isFeatured: false, image: "" },
  { id: "25", slug: "virulana-expert-microfibra-escurridor", name: "Expert Paño Microfibra Piso Escurridor", brand: "Virulana", category: "cocina", unit: "unidad", price: 6232, description: "Paño microfibra con escurridor incluido.", inStock: true, isFeatured: false, image: "" },
  { id: "26", slug: "guante-mapa-s", name: "Guante Mapa S", brand: "Virulana", category: "cocina", unit: "talle S", price: 2717, description: "Guante de limpieza resistente.", inStock: true, isFeatured: false, image: "" },
  { id: "27", slug: "guante-mapa-m", name: "Guante Mapa M", brand: "Virulana", category: "cocina", unit: "talle M", price: 2717, description: "Guante de limpieza resistente.", inStock: true, isFeatured: false, image: "" },
  { id: "28", slug: "guante-mapa-l", name: "Guante Mapa L", brand: "Virulana", category: "cocina", unit: "talle L", price: 2717, description: "Guante de limpieza resistente.", inStock: true, isFeatured: false, image: "" },
  { id: "29", slug: "guante-plumita-s", name: "Guante Plumita S", brand: "Virulana", category: "cocina", unit: "talle S", price: 1864, description: "Guante liviano de látex.", inStock: true, isFeatured: false, image: "" },
  { id: "30", slug: "guante-plumita-m", name: "Guante Plumita M", brand: "Virulana", category: "cocina", unit: "talle M", price: 1864, description: "Guante liviano de látex.", inStock: true, isFeatured: false, image: "" },
  { id: "31", slug: "esponja-antigrasa", name: "Esponja Antigrasa", brand: "Virulana", category: "cocina", unit: "unidad", price: 742, description: "Esponja doble faz antigrasa.", inStock: true, isFeatured: true, image: "" },
  { id: "32", slug: "esponja-multiuso", name: "Esponja Multiuso", brand: "Virulana", category: "cocina", unit: "unidad", price: 541, description: "Esponja multiuso suave.", inStock: true, isFeatured: false, image: "" },
  { id: "33", slug: "esponja-cuadraditos", name: "Esponja Cuadraditos", brand: "Virulana", category: "cocina", unit: "unidad", price: 592, description: "Pack esponjas cuadradas.", inStock: true, isFeatured: false, image: "" },
  { id: "34", slug: "esponja-lisa", name: "Esponja Lisa", brand: "Virulana", category: "cocina", unit: "unidad", price: 503, description: "Esponja lisa suave para superficies delicadas.", inStock: true, isFeatured: false, image: "" },
  { id: "35", slug: "virulana-inoxi", name: "Inoxi", brand: "Virulana", category: "cocina", unit: "unidad", price: 623, description: "Virulana inoxidable para ollas y sartenes.", inStock: true, isFeatured: false, image: "" },
  { id: "36", slug: "virulana-rollito-x6", name: "Rollito Virulana", brand: "Virulana", category: "cocina", unit: "x6", price: 1072, description: "Pack 6 rollitos de acero inoxidable.", inStock: true, isFeatured: false, image: "" },
  { id: "37", slug: "virulana-rollito-x10", name: "Rollito Virulana", brand: "Virulana", category: "cocina", unit: "x10", price: 1654, description: "Pack 10 rollitos de acero inoxidable.", inStock: true, isFeatured: false, image: "" },
  { id: "38", slug: "odex-antigrasa-doypack-450ml", name: "Antigrasa Doy Pack", brand: "Odex", category: "cocina", unit: "450ml", price: 1480, description: "Desengrasante concentrado en Doy Pack.", inStock: true, isFeatured: false, image: "" },
  { id: "39", slug: "odex-gatillo-antigrasa-500ml", name: "Gatillo Antigrasa", brand: "Odex", category: "cocina", unit: "500ml", price: 2774, description: "Desengrasante con gatillo listo para usar.", inStock: true, isFeatured: false, image: "" },
  { id: "40", slug: "virulana-cabo-metalico", name: "Virulana Cabo Metálico", brand: "Virulana", category: "cocina", unit: "unidad", price: 2834, description: "Virulana con cabo metálico resistente.", inStock: true, isFeatured: false, image: "" },
  { id: "41", slug: "secador-piso-30cm", name: "Secador de Piso 30cm", brand: "Virulana", category: "cocina", unit: "30cm", price: 3127, description: "Secador de piso con goma resistente.", inStock: true, isFeatured: false, image: "" },
  { id: "42", slug: "secador-piso-40cm", name: "Secador de Piso 40cm", brand: "Virulana", category: "cocina", unit: "40cm", price: 3448, description: "Secador de piso ancho de alta cobertura.", inStock: true, isFeatured: false, image: "" },

  // Casa
  { id: "43", slug: "suiza-pasta-roble-claro-250g", name: "Pasta Natural Roble Claro", brand: "Suiza", category: "casa", unit: "250g", price: 8200, description: "Pasta para pisos de madera, tono roble claro.", inStock: true, isFeatured: true, image: "" },
  { id: "44", slug: "suiza-pasta-roble-oscuro-250g", name: "Pasta Natural Roble Oscuro", brand: "Suiza", category: "casa", unit: "250g", price: 8200, description: "Pasta para pisos de madera, tono roble oscuro.", inStock: true, isFeatured: false, image: "" },
  { id: "45", slug: "suiza-cera-neutral-425ml", name: "Cera Líquida Neutral", brand: "Suiza", category: "casa", unit: "425ml", price: 4577, description: "Cera líquida incolora para todo tipo de piso.", inStock: true, isFeatured: false, image: "" },
  { id: "46", slug: "suiza-cera-roble-claro-425ml", name: "Cera Líquida Roble Claro", brand: "Suiza", category: "casa", unit: "425ml", price: 4577, description: "Cera líquida tono roble claro.", inStock: true, isFeatured: false, image: "" },
  { id: "47", slug: "suiza-cera-roble-oscuro-425ml", name: "Cera Líquida Roble Oscuro", brand: "Suiza", category: "casa", unit: "425ml", price: 4577, description: "Cera líquida tono roble oscuro.", inStock: true, isFeatured: false, image: "" },
  { id: "48", slug: "suiza-cera-850ml", name: "Cera Líquida 850ml", brand: "Suiza", category: "casa", unit: "850ml", price: 7486, compareAtPrice: 9500, description: "Cera líquida formato económico 850ml.", inStock: true, isFeatured: false, image: "" },
  { id: "49", slug: "suiza-autobrillo-rojo-400ml", name: "Autobrillo Rojo", brand: "Suiza", category: "casa", unit: "Doy Pack 400ml", price: 3141, description: "Autobrillo líquido para pisos rojos y terracota.", inStock: true, isFeatured: false, image: "" },
  { id: "50", slug: "suiza-autobrillo-negro-400ml", name: "Autobrillo Negro", brand: "Suiza", category: "casa", unit: "Doy Pack 400ml", price: 3141, description: "Autobrillo líquido para pisos negros.", inStock: true, isFeatured: false, image: "" },
  { id: "51", slug: "suiza-autobrillo-incoloro-400ml", name: "Autobrillo Incoloro", brand: "Suiza", category: "casa", unit: "Doy Pack 400ml", price: 3141, description: "Autobrillo incoloro para todo tipo de piso.", inStock: true, isFeatured: false, image: "" },
  { id: "52", slug: "suiza-lustra-muebles-neutro", name: "Lustra Muebles Neutro", brand: "Suiza", category: "casa", unit: "300ml", price: 3393, description: "Lustrador de muebles sin fragancia.", inStock: true, isFeatured: false, image: "" },
  { id: "53", slug: "suiza-lustra-muebles-lavanda", name: "Lustra Muebles Lavanda", brand: "Suiza", category: "casa", unit: "300ml", price: 3393, description: "Lustrador de muebles fragancia lavanda.", inStock: true, isFeatured: false, image: "" },
  { id: "54", slug: "suiza-lustra-muebles-naranja-pimienta", name: "Lustra Muebles Naranja Pimienta", brand: "Suiza", category: "casa", unit: "300ml", price: 3393, description: "Lustrador de muebles fragancia naranja y pimienta.", inStock: true, isFeatured: false, image: "" },
  { id: "55", slug: "virulana-escobon-tradicional", name: "Escobillón Tradicional", brand: "Virulana", category: "casa", unit: "madera", price: 3903, description: "Escobillón mango de madera cerdas resistentes.", inStock: true, isFeatured: false, image: "" },
  { id: "56", slug: "virulana-escobon-clasico", name: "Escobillón Clásico", brand: "Virulana", category: "casa", unit: "plástico", price: 4643, description: "Escobillón mango plástico liviano.", inStock: true, isFeatured: false, image: "" },
  { id: "57", slug: "virulana-balde-escurridor-12l", name: "Balde con Escurridor", brand: "Virulana", category: "casa", unit: "12L", price: 8123, compareAtPrice: 10000, description: "Balde 12 litros con escurridor integrado.", inStock: true, isFeatured: true, image: "" },

  // Ropa
  { id: "58", slug: "querubin-polvo-400g", name: "Polvo Lavar Ropa Baja Espumas", brand: "Querubín", category: "ropa", unit: "400g", price: 1400, description: "Polvo lavante baja espuma ideal para lavarropas.", inStock: true, isFeatured: true, image: "" },
  { id: "59", slug: "querubin-polvo-800g", name: "Polvo Lavar Ropa Baja Espumas", brand: "Querubín", category: "ropa", unit: "800g", price: 2801, compareAtPrice: 3500, description: "Formato económico 800g polvo baja espuma.", inStock: true, isFeatured: false, image: "" },
  { id: "60", slug: "querubin-suavizante-silvestres-3l", name: "Suavizante Flores Silvestres", brand: "Querubín", category: "ropa", unit: "3L", price: 8764, description: "Suavizante fragancia flores silvestres 3 litros.", inStock: true, isFeatured: false, image: "" },
  { id: "61", slug: "querubin-suavizante-estrictas-800ml", name: "Suavizante Flores Estrictas", brand: "Querubín", category: "ropa", unit: "800ml", price: 2788, description: "Suavizante fragancia flores 800ml.", inStock: true, isFeatured: false, image: "" },
  { id: "62", slug: "jabon-blanco-300g", name: "Jabón Blanco", brand: "Genérico", category: "ropa", unit: "300g", price: 2000, description: "Jabón blanco multiuso para ropa.", inStock: true, isFeatured: false, image: "" },
  { id: "63", slug: "querubin-liquido-3l", name: "Líquido Lavar Ropa", brand: "Querubín", category: "ropa", unit: "3L", price: 8764, description: "Detergente líquido para ropa 3 litros.", inStock: true, isFeatured: false, image: "" },
  { id: "64", slug: "querubin-liquido-800ml", name: "Líquido Lavar Ropa", brand: "Querubín", category: "ropa", unit: "800ml", price: 2548, description: "Detergente líquido para ropa 800ml.", inStock: true, isFeatured: false, image: "" },

  // Etc
  { id: "65", slug: "bulbo-7w-frio", name: "Bulbo LED Frío 7W", brand: "Genérico", category: "etc", unit: "7W", price: 866, description: "Lámpara LED luz fría 7 watts.", inStock: true, isFeatured: false, image: "" },
  { id: "66", slug: "bulbo-7w-calido", name: "Bulbo LED Cálido 7W", brand: "Genérico", category: "etc", unit: "7W", price: 866, description: "Lámpara LED luz cálida 7 watts.", inStock: true, isFeatured: false, image: "" },
  { id: "67", slug: "bulbo-9w-frio", name: "Bulbo LED Frío 9W", brand: "Genérico", category: "etc", unit: "9W", price: 907, description: "Lámpara LED luz fría 9 watts.", inStock: true, isFeatured: false, image: "" },
  { id: "68", slug: "bulbo-9w-calido", name: "Bulbo LED Cálido 9W", brand: "Genérico", category: "etc", unit: "9W", price: 907, description: "Lámpara LED luz cálida 9 watts.", inStock: true, isFeatured: false, image: "" },
  { id: "69", slug: "bulbo-12w-frio", name: "Bulbo LED Frío 12W", brand: "Genérico", category: "etc", unit: "12W", price: 1081, description: "Lámpara LED luz fría 12 watts.", inStock: true, isFeatured: false, image: "" },
  { id: "70", slug: "bulbo-12w-calido", name: "Bulbo LED Cálido 12W", brand: "Genérico", category: "etc", unit: "12W", price: 1081, description: "Lámpara LED luz cálida 12 watts.", inStock: true, isFeatured: false, image: "" },
  { id: "71", slug: "bulbo-15w-frio", name: "Bulbo LED Frío 15W", brand: "Genérico", category: "etc", unit: "15W", price: 1316, description: "Lámpara LED luz fría 15 watts.", inStock: true, isFeatured: false, image: "" },
  { id: "72", slug: "bulbo-15w-calido", name: "Bulbo LED Cálido 15W", brand: "Genérico", category: "etc", unit: "15W", price: 1316, description: "Lámpara LED luz cálida 15 watts.", inStock: true, isFeatured: false, image: "" },
  { id: "73", slug: "termo-gris-700ml", name: "Termo Gris", brand: "Genérico", category: "etc", unit: "700ml", price: 50000, description: "Termo acero inoxidable color gris 700ml.", inStock: true, isFeatured: false, image: "" },
  { id: "74", slug: "termo-negro-700ml", name: "Termo Negro", brand: "Genérico", category: "etc", unit: "700ml", price: 50000, description: "Termo acero inoxidable color negro 700ml.", inStock: true, isFeatured: false, image: "" },
];

export function formatPrice(price: number) {
  return `$${price.toLocaleString("es-AR")}`;
}

export function getProductsByCategory(categorySlug: string) {
  return products.filter((p) => p.category === categorySlug);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.isFeatured);
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 3) {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}
