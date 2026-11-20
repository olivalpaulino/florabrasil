# 🌿 Flora Brasil - Palmeira dos Índios (AL)
### Cardápio Online & Sistema de Pedidos via WhatsApp

Um cardápio digital moderno, leve e responsivo para a **Flora Brasil** em Palmeira dos Índios (AL), desenvolvido com foco na agilidade do atendimento via WhatsApp.

Inspirado na usabilidade ágil de cardápios como o Hubt, este projeto foi desenhado de forma **enxuta e centralizada**, eliminando barras laterais pesadas e proporcionando uma experiência rápida tanto no celular (smartphone) quanto no computador.

---

## 📱 Recursos Principais

1. **Cardápio Central Enxuto**:
   - Cards com foto do produto, nome, categoria, preço e unidade (ex: 500g, 30ml, 100 cápsulas).
   - Layout otimizado para celulares (mobile-first), com rolagem suave e visual limpo.

2. **Seleção de Múltiplos Itens**:
   - O cliente adiciona qualquer quantidade de itens com botões `+` e `-`.
   - Destaque visual nos produtos selecionados no cardápio.
   - Os itens ficam salvos no navegador (se o cliente fechar e reabrir, os itens continuam lá).

3. **Barra Fixa Inferior & Checkout**:
   - Aparece automaticamente quando o cliente escolhe ao menos um produto.
   - Mostra o total de itens e o valor total acumulado em tempo real.
   - Botão **"Finalizar Pedido"** abre uma gaveta (bottom sheet) com o resumo completo.

4. **Integração Direta com WhatsApp (`82 99652-3335`)**:
   - Gera um texto limpo e organizado com a lista de produtos, quantidades, subtotais e valor total.
   - Opção para o cliente informar o nome, se deseja **Entrega** (com endereço) ou **Retirada no balcão**, e a forma de pagamento (Pix, Cartão ou Dinheiro).
   - Abre diretamente o WhatsApp da loja para iniciar o atendimento imediatamente.

5. **Banner com Informações da Loja**:
   - **Título**: Flora Brasil - Palmeira dos Índios (AL)
   - **Endereço**: `Graciliano Ramos - R. José Delfim da Mota Branco, 120 - Graciliano Ramos, Palmeira dos Índios - AL, 57604-664`
   - **Botões rápidos**: "Falar no WhatsApp", "Como Chegar" (Google Maps) e "Copiar Endereço".
   - **Status em Tempo Real**: Indicador visual (Aberto agora / Fechado) baseado no horário de funcionamento oficial:
     - Segunda a sexta: `08:00 às 12:00` e `14:00 às 19:00`
     - Sábado e Domingo: `Fechado`

6. **Busca Instantânea & Filtro por Categorias**:
   - Barra de pesquisa rápida para encontrar qualquer item por nome ou benefício.
   - Pílulas de categorias clicáveis: *Todos*, *Mel & Própolis*, *Chás & Ervas*, *Óleos & Aromas*, *Cuidados & Sabonetes*, *Suplementos & Granel*.

---

## 📂 Estrutura de Arquivos

```text
florabrasil/
├── index.html            # Estrutura principal da página
├── css/
│   └── styles.css        # Estilos modernos, responsivos e animações
├── js/
│   ├── products.js       # Catálogo dos 20 produtos e configurações da loja
│   └── app.js            # Lógica do carrinho, status de horário e WhatsApp
└── README.md             # Documentação do projeto
```

---

## 🚀 Como Executar / Testar Localmente

Basta dar um duplo clique no arquivo `index.html` para abrir diretamente no seu navegador de preferência (Google Chrome, Microsoft Edge, Brave, etc.). 

Não é necessária nenhuma instalação ou servidor para rodar o projeto.

---

## ✏️ Como Alterar Produtos e Preços

Abra o arquivo [`js/products.js`](file:///c:/Users/Núcleo/Desktop/florabrasil/js/products.js). Você encontrará a lista `PRODUCTS_DATA`:

```javascript
{
  id: 1,
  name: "Mel Silvestre Puro da Caatinga",
  category: "Mel & Própolis",
  price: 32.00, // Preço em reais (use ponto para centavos)
  unit: "500g",
  description: "Mel 100% puro e natural, colheita artesanal do sertão alagoano.",
  image: "https://link-da-sua-imagem.jpg",
  badge: "Mais Vendido" // opcional
}
```

Para alterar o WhatsApp ou endereço, edite o objeto `STORE_CONFIG` no final de [`js/products.js`](file:///c:/Users/Núcleo/Desktop/florabrasil/js/products.js):

```javascript
const STORE_CONFIG = {
  name: "Flora Brasil",
  subtitle: "Palmeira dos Índios (AL)",
  whatsappNumber: "5582996523335", // DDD + Número
  ...
};
```

---

## 🌐 Como Publicar na Internet (Grátis)

Você pode hospedar esse cardápio em menos de 2 minutos em plataformas gratuitas:

1. **Vercel** ou **Netlify**:
   - Basta arrastar a pasta `florabrasil` para o painel do [Netlify Drop](https://app.netlify.com/drop) ou conectar ao Vercel.
   - Você ganha um link rápido (ex: `florabrasil.netlify.app`) e pode colocar na biografia do Instagram da loja!
2. **GitHub Pages**:
   - Crie um repositório no GitHub, envie esses arquivos e ative o GitHub Pages nas configurações.
