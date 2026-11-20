/**
 * Catálogo de Produtos - Flora Brasil (Palmeira dos Índios - AL)
 * 
 * Você pode editar, adicionar ou remover produtos facilmente nesta lista.
 * Cada produto possui:
 * - id: Identificador único
 * - name: Nome do produto
 * - category: Categoria (ex: 'Mel & Própolis', 'Chás & Ervas', 'Óleos & Aromas', 'Cuidados & Sabonetes', 'Suplementos & Granel')
 * - price: Preço em reais (use ponto para centavos, ex: 32.50)
 * - unit: Quantidade/Peso da embalagem (ex: '500g', '30ml', '100g')
 * - description: Descrição rápida dos benefícios e características
 * - image: URL da foto do produto
 * - badge: Selo opcional (ex: 'Mais Vendido', '100% Puro', 'Destaque', 'Orgânico')
 */

const PRODUCTS_DATA = [
  {
    id: 1,
    name: "Mel Silvestre Puro da Caatinga",
    category: "Mel & Própolis",
    price: 32.00,
    unit: "500g",
    description: "Mel 100% puro e natural, colheita artesanal do sertão alagoano. Rico em antioxidantes e energia natural.",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&q=80",
    badge: "Mais Vendido"
  },
  {
    id: 2,
    name: "Extrato de Própolis Verde Concentrado",
    category: "Mel & Própolis",
    price: 35.00,
    unit: "30ml",
    description: "Alta concentração de flavonoides e Artepillin-C. Fortalecimento imediato da imunidade e defesa natural.",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=400&q=80",
    badge: "Imunidade"
  },
  {
    id: 3,
    name: "Xarope Natural de Guaco, Mel e Própolis",
    category: "Mel & Própolis",
    price: 28.00,
    unit: "250ml",
    description: "Fórmula tradicional expectorante. Alívio de tosses, rouquidão e desconfortos respiratórios sazonais.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80",
    badge: "Tradição"
  },
  {
    id: 4,
    name: "Chá de Camomila & Flor de Melissa",
    category: "Chás & Ervas",
    price: 12.00,
    unit: "50g",
    description: "Flores desidratadas selecionadas para um chá calmante, aromático e relaxante. Ideal para antes de dormir.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80",
    badge: "Calmante"
  },
  {
    id: 5,
    name: "Chá de Espinheira Santa em Folhas",
    category: "Chás & Ervas",
    price: 14.00,
    unit: "50g",
    description: "Planta medicinal consagrada para auxílio da digestão, azia, gastrite e equilíbrio do trato gastrointestinal.",
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=400&q=80",
    badge: "Digestivo"
  },
  {
    id: 6,
    name: "Chá Verde Especial em Folhas Puras",
    category: "Chás & Ervas",
    price: 15.00,
    unit: "100g",
    description: "Camellia sinensis pura com alto poder antioxidante. Acelera o metabolismo, elimina toxinas e dá disposição.",
    image: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&w=400&q=80",
    badge: "Energia"
  },
  {
    id: 7,
    name: "Chá de Flor de Hibisco Desidratado",
    category: "Chás & Ervas",
    price: 16.00,
    unit: "100g",
    description: "Flores de hibisco ricas em antocianinas. Ação diurética natural, diminui a retenção de líquidos e refresca.",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=400&q=80",
    badge: "Detox"
  },
  {
    id: 8,
    name: "Óleo Essencial Puro de Lavanda Francesa",
    category: "Óleos & Aromas",
    price: 42.00,
    unit: "10ml",
    description: "100% puro para aromaterapia e difusores. Alivia o estresse, ansiedade e favorece noites de sono profundo.",
    image: "https://images.unsplash.com/photo-1608571424266-edeb9bbefdec?auto=format&fit=crop&w=400&q=80",
    badge: "Puro 100%"
  },
  {
    id: 9,
    name: "Óleo Essencial de Alecrim Concentrado",
    category: "Óleos & Aromas",
    price: 38.00,
    unit: "10ml",
    description: "Estimula o foco, clareza mental e memória. Excelente também para hidratação e fortalecimento capilar.",
    image: "https://images.unsplash.com/photo-1519735777090-ec97162dc266?auto=format&fit=crop&w=400&q=80",
    badge: "Foco & Mente"
  },
  {
    id: 10,
    name: "Óleo Essencial de Melaleuca (Tea Tree)",
    category: "Óleos & Aromas",
    price: 44.00,
    unit: "10ml",
    description: "Propriedades antissépticas, bactericidas e antifúngicas naturais. Auxilia nos cuidados com a pele e unhas.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80",
    badge: "Antisséptico"
  },
  {
    id: 11,
    name: "Pomada Artesanal de Sucupira e Arnica",
    category: "Cuidados & Sabonetes",
    price: 24.00,
    unit: "50g",
    description: "Ação anti-inflamatória e analgésica tópica. Perfeita para massagens em dores musculares, lombares e articulações.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80",
    badge: "Alívio Rápido"
  },
  {
    id: 12,
    name: "Sabonete Natural de Argila Verde & Alecrim",
    category: "Cuidados & Sabonetes",
    price: 16.00,
    unit: "90g",
    description: "Sabonete vegetal artesanal. Limpeza profunda, ação adstringente, controle de oleosidade e purificação da pele.",
    image: "https://images.unsplash.com/photo-1607006314644-8628b03eefdb?auto=format&fit=crop&w=400&q=80",
    badge: "Artesanal"
  },
  {
    id: 13,
    name: "Sabonete Suave de Mel & Calêndula",
    category: "Cuidados & Sabonetes",
    price: 16.00,
    unit: "90g",
    description: "Nutrição calmante para peles sensíveis e ressecadas. Proporciona maciez, toque aveludado e perfume suave.",
    image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=400&q=80",
    badge: "Hidratante"
  },
  {
    id: 14,
    name: "Maca Peruana Negra Premium Pura",
    category: "Suplementos & Granel",
    price: 48.00,
    unit: "100 Cápsulas",
    description: "Superalimento andino para vigor físico, disposição diária, aumento da libido e equilíbrio hormonal natural.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80",
    badge: "Vitalidade"
  },
  {
    id: 15,
    name: "Colágeno Hidrolisado Verisol + Vitamina C",
    category: "Suplementos & Granel",
    price: 58.00,
    unit: "300g",
    description: "Auxilia na firmeza e elasticidade da pele, fortalecimento de cabelos, unhas e proteção das articulações.",
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=400&q=80",
    badge: "Beleza & Pele"
  },
  {
    id: 16,
    name: "Cloreto de Magnésio P.A. 500mg",
    category: "Suplementos & Granel",
    price: 32.00,
    unit: "100 Cápsulas",
    description: "Mineral essencial para contração muscular, saúde óssea, redução de cãibras e bom funcionamento cardíaco.",
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=400&q=80",
    badge: "Saúde Ativa"
  },
  {
    id: 17,
    name: "Psyllium Puro em Casca / Flocos",
    category: "Suplementos & Granel",
    price: 22.00,
    unit: "200g",
    description: "Fibra solúvel natural. Auxilia no funcionamento intestinal regular, promove saciedade prolongada e controle glicêmico.",
    image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=400&q=80",
    badge: "Fibras"
  },
  {
    id: 18,
    name: "Castanha-do-Pará Selecionada Média",
    category: "Suplementos & Granel",
    price: 29.00,
    unit: "250g",
    description: "Fresquinha e crocante. Principal fonte vegetal de selênio, gorduras boas e antioxidantes protetores do coração.",
    image: "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=400&q=80",
    badge: "Crocante"
  },
  {
    id: 19,
    name: "Castanha de Caju Torrada Sem Sal",
    category: "Suplementos & Granel",
    price: 26.00,
    unit: "200g",
    description: "Torrada artesanal no ponto certo. Excelente para lanches saudáveis entre as refeições e rica em magnésio.",
    image: "https://images.unsplash.com/photo-1536591375315-1b83681463cf?auto=format&fit=crop&w=400&q=80",
    badge: "Snack Saudável"
  },
  {
    id: 20,
    name: "Óleo de Coco Virgem Prensado a Frio",
    category: "Suplementos & Granel",
    price: 36.00,
    unit: "500ml",
    description: "Extra virgem com acidez máxima de 0,3%. Perfeito para culinária funcional, hidratação capilar e corporal.",
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=400&q=80",
    badge: "Extra Virgem"
  }
];

// Configurações do Estabelecimento
const STORE_CONFIG = {
  name: "Flora Brasil",
  subtitle: "Palmeira dos Índios (AL)",
  whatsappNumber: "5582996523335", // 82 99652-3335
  whatsappDisplay: "(82) 99652-3335",
  address: "Graciliano Ramos - R. José Delfim da Mota Branco, 120 - Graciliano Ramos, Palmeira dos Índios - AL, 57604-664",
  shortAddress: "R. José Delfim da Mota Branco, 120 - Graciliano Ramos, Palmeira dos Índios - AL",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=R.+Jos%C3%A9+Delfim+da+Mota+Branco,+120+-+Graciliano+Ramos,+Palmeira+dos+%C3%8Dndios+-+AL,+57604-664",
  hours: {
    weekdays: "Segunda a Sexta: 08:00 às 12:00 e das 14:00 às 19:00",
    weekend: "Sábado e Domingo: Fechado"
  }
};
