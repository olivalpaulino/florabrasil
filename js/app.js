/**
 * Flora Brasil - Cardápio Online & Pedidos via WhatsApp
 * Lógica da aplicação, gerenciamento do carrinho e checkout
 */

// Estado da Aplicação
const state = {
  cart: {}, // { [productId]: quantity }
  activeCategory: "all",
  searchQuery: "",
  customer: {
    name: "",
    deliveryType: "delivery", // 'delivery' ou 'pickup'
    address: "",
    neighborhood: "",
    payment: "pix",
    notes: ""
  }
};

// Formatação de Moeda Brasileira (R$ 00,00)
function formatCurrency(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

// Imagem Fallback caso ocorra erro ao carregar imagem remota
const FALLBACK_IMAGE = "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22200%22%20height%3D%22200%22%20viewBox%3D%220%200%20200%20200%22%3E%3Crect%20fill%3D%22%23e2e8f0%22%20width%3D%22200%22%20height%3D%22200%22%2F%3E%3Cpath%20fill%3D%22%23166534%22%20d%3D%22M100%2050c-27.6%200-50%2022.4-50%2050%200%2035%2050%2065%2050%2065s50-30%2050-65c0-27.6-22.4-50-50-50zm0%2075c-13.8%200-25-11.2-25-25s11.2-25%2025-25%2025%2011.2%2025%2025-11.2%2025-25%2025z%22%2F%3E%3C%2Fsvg%3E";

// Salvar / Carregar do LocalStorage
function saveStateToStorage() {
  try {
    localStorage.setItem("florabrasil_cart", JSON.stringify(state.cart));
    localStorage.setItem("florabrasil_customer", JSON.stringify(state.customer));
  } catch (e) {
    console.warn("Não foi possível salvar no localStorage", e);
  }
}

function loadStateFromStorage() {
  try {
    const savedCart = localStorage.getItem("florabrasil_cart");
    if (savedCart) {
      state.cart = JSON.parse(savedCart);
    }
    const savedCustomer = localStorage.getItem("florabrasil_customer");
    if (savedCustomer) {
      state.customer = { ...state.customer, ...JSON.parse(savedCustomer) };
    }
  } catch (e) {
    console.warn("Erro ao ler localStorage", e);
  }
}

// Verificação em Tempo Real do Horário de Atendimento
// Horário: Seg a Sex: 08:00 às 12:00 e das 14:00 às 19:00. Sábado e Domingo fechado.
function updateStoreStatusBadge() {
  const badgeEl = document.getElementById("storeStatusBadge");
  if (!badgeEl) return;

  const now = new Date();
  // Fuso horário do Brasil / Palmeira dos Índios - AL (UTC-3)
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const brazilTime = new Date(utc - (3 * 3600000));

  const day = brazilTime.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
  const hours = brazilTime.getHours();
  const minutes = brazilTime.getMinutes();
  const totalMinutes = (hours * 60) + minutes;

  const morningStart = 8 * 60;   // 08:00 (480)
  const morningEnd = 12 * 60;    // 12:00 (720)
  const afternoonStart = 14 * 60; // 14:00 (840)
  const afternoonEnd = 19 * 60;  // 19:00 (1140)

  let isOpen = false;
  let statusText = "";
  let pillClass = "status-closed";

  if (day >= 1 && day <= 5) {
    // Segunda a Sexta
    if (totalMinutes >= morningStart && totalMinutes < morningEnd) {
      isOpen = true;
      statusText = "Aberto agora • Fecha às 12:00";
      pillClass = "status-open";
    } else if (totalMinutes >= morningEnd && totalMinutes < afternoonStart) {
      isOpen = false;
      statusText = "Intervalo de Almoço • Retorna às 14:00";
      pillClass = "status-closed";
    } else if (totalMinutes >= afternoonStart && totalMinutes < afternoonEnd) {
      isOpen = true;
      statusText = "Aberto agora • Fecha às 19:00";
      pillClass = "status-open";
    } else if (totalMinutes < morningStart) {
      isOpen = false;
      statusText = "Fechado agora • Abre às 08:00";
      pillClass = "status-closed";
    } else {
      isOpen = false;
      statusText = day === 5 ? "Fechado • Abre segunda às 08:00" : "Fechado agora • Abre amanhã às 08:00";
      pillClass = "status-closed";
    }
  } else {
    // Sábado ou Domingo
    isOpen = false;
    statusText = "Fechado no fim de semana • Abre seg às 08:00";
    pillClass = "status-closed";
  }

  badgeEl.className = `status-pill ${pillClass}`;
  badgeEl.innerHTML = `<span class="status-dot"></span><span>${statusText}</span>`;
}

// Renderização das Categorias (Chips)
function renderCategories() {
  const container = document.getElementById("categoriesSlider");
  if (!container) return;

  // Obter categorias únicas
  const categories = ["all", ...new Set(PRODUCTS_DATA.map(p => p.category))];

  const categoryLabels = {
    all: `Todos (${PRODUCTS_DATA.length})`
  };

  container.innerHTML = categories.map(cat => {
    const isActive = state.activeCategory === cat;
    let label = categoryLabels[cat];
    if (!label) {
      const count = PRODUCTS_DATA.filter(p => p.category === cat).length;
      label = `${cat} (${count})`;
    }

    return `
      <button 
        type="button" 
        class="category-pill ${isActive ? "active" : ""}" 
        data-category="${cat}"
        onclick="selectCategory('${cat}')"
      >
        ${label}
      </button>
    `;
  }).join("");
}

function selectCategory(category) {
  state.activeCategory = category;
  renderCategories();
  renderProducts();
}

// Renderização da Lista de Produtos
function renderProducts() {
  const listEl = document.getElementById("productsList");
  const countEl = document.getElementById("itemsCounter");
  const emptyEl = document.getElementById("emptyState");

  if (!listEl) return;

  const query = state.searchQuery.trim().toLowerCase();

  // Filtragem
  const filtered = PRODUCTS_DATA.filter(product => {
    const matchesCategory = state.activeCategory === "all" || product.category === state.activeCategory;
    const matchesSearch = !query || 
      product.name.toLowerCase().includes(query) || 
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  if (countEl) {
    countEl.textContent = `${filtered.length} produto${filtered.length === 1 ? '' : 's'}`;
  }

  if (filtered.length === 0) {
    listEl.style.display = "none";
    if (emptyEl) emptyEl.style.display = "block";
    return;
  }

  listEl.style.display = "flex";
  if (emptyEl) emptyEl.style.display = "none";

  listEl.innerHTML = filtered.map(product => {
    const qty = state.cart[product.id] || 0;
    const hasSelected = qty > 0;

    return `
      <article class="product-card ${hasSelected ? 'has-selected' : ''}" id="product-card-${product.id}">
        <div class="product-content">
          <div>
            ${product.badge ? `<span class="product-tag">${product.badge}</span>` : ''}
            <h3 class="product-title">${product.name}</h3>
            <p class="product-desc">${product.description}</p>
          </div>
          <div class="product-price-row">
            <span class="product-price">${formatCurrency(product.price)}</span>
            <span class="product-unit">/ ${product.unit}</span>
          </div>
        </div>

        <div class="product-media-col">
          <div class="product-thumb-wrapper">
            <img 
              src="${product.image}" 
              alt="${product.name}" 
              class="product-thumb"
              loading="lazy"
              onerror="this.src='${FALLBACK_IMAGE}'"
            />
          </div>

          <div class="qty-controls-box">
            ${qty === 0 ? `
              <button 
                type="button" 
                class="btn-add-initial" 
                onclick="updateItemQty(${product.id}, 1)"
                title="Adicionar à sacola"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Adicionar
              </button>
            ` : `
              <div class="qty-counter">
                <button 
                  type="button" 
                  class="btn-qty" 
                  onclick="updateItemQty(${product.id}, -1)" 
                  title="Diminuir quantidade"
                >
                  −
                </button>
                <span class="qty-number">${qty}</span>
                <button 
                  type="button" 
                  class="btn-qty" 
                  onclick="updateItemQty(${product.id}, 1)" 
                  title="Aumentar quantidade"
                >
                  +
                </button>
              </div>
            `}
          </div>
        </div>
      </article>
    `;
  }).join("");
}

// Alterar Quantidade de Itens no Carrinho
function updateItemQty(productId, delta) {
  const current = state.cart[productId] || 0;
  const next = current + delta;

  if (next <= 0) {
    delete state.cart[productId];
  } else {
    state.cart[productId] = next;
  }

  saveStateToStorage();
  renderProducts();
  updateFloatingBar();

  // Se o modal de checkout estiver aberto, atualiza também a lista dele
  if (isCheckoutOpen()) {
    renderCheckoutSummary();
  }
}

// Totais do Carrinho
function getCartTotals() {
  let totalItems = 0;
  let totalPrice = 0;

  for (const [idStr, qty] of Object.entries(state.cart)) {
    const id = parseInt(idStr, 10);
    const prod = PRODUCTS_DATA.find(p => p.id === id);
    if (prod && qty > 0) {
      totalItems += qty;
      totalPrice += (prod.price * qty);
    }
  }

  return { totalItems, totalPrice };
}

// Atualização da Barra Fixa Flutuante Inferior
function updateFloatingBar() {
  const bar = document.getElementById("floatingOrderBar");
  const countBadge = document.getElementById("barCountBadge");
  const priceEl = document.getElementById("barTotalPrice");

  if (!bar) return;

  const { totalItems, totalPrice } = getCartTotals();

  if (totalItems > 0) {
    if (countBadge) {
      countBadge.textContent = `${totalItems} ${totalItems === 1 ? 'item selecionado' : 'itens selecionados'}`;
    }
    if (priceEl) {
      priceEl.textContent = formatCurrency(totalPrice);
    }
    bar.classList.add("visible");
  } else {
    bar.classList.remove("visible");
    closeCheckoutModal();
  }
}

// Modal de Checkout / Finalização
function isCheckoutOpen() {
  const backdrop = document.getElementById("checkoutModalBackdrop");
  return backdrop && backdrop.classList.contains("open");
}

function openCheckoutModal() {
  const backdrop = document.getElementById("checkoutModalBackdrop");
  if (!backdrop) return;

  renderCheckoutSummary();
  loadCustomerFormFields();
  backdrop.classList.add("open");
  document.body.style.overflow = "hidden"; // trava o scroll da página
}

function closeCheckoutModal() {
  const backdrop = document.getElementById("checkoutModalBackdrop");
  if (!backdrop) return;

  backdrop.classList.remove("open");
  document.body.style.overflow = "";
}

// Renderiza itens dentro do Modal de Checkout
function renderCheckoutSummary() {
  const container = document.getElementById("checkoutItemsList");
  const totalEl = document.getElementById("checkoutTotalPrice");
  if (!container) return;

  const { totalItems, totalPrice } = getCartTotals();

  if (totalItems === 0) {
    closeCheckoutModal();
    return;
  }

  const itemsHtml = Object.entries(state.cart).map(([idStr, qty]) => {
    const id = parseInt(idStr, 10);
    const prod = PRODUCTS_DATA.find(p => p.id === id);
    if (!prod || qty <= 0) return "";

    const subtotal = prod.price * qty;

    return `
      <div class="checkout-item-row">
        <div class="checkout-item-info">
          <div class="checkout-item-name">${prod.name}</div>
          <div class="checkout-item-meta">${prod.unit} • ${formatCurrency(prod.price)} un.</div>
        </div>
        <div class="checkout-item-qty-actions">
          <button type="button" class="btn-sheet-qty" onclick="updateItemQty(${prod.id}, -1)">−</button>
          <span style="font-weight:700; min-width: 16px; text-align: center;">${qty}</span>
          <button type="button" class="btn-sheet-qty" onclick="updateItemQty(${prod.id}, 1)">+</button>
        </div>
        <div class="checkout-item-price">${formatCurrency(subtotal)}</div>
      </div>
    `;
  }).join("");

  container.innerHTML = itemsHtml;
  if (totalEl) {
    totalEl.textContent = formatCurrency(totalPrice);
  }
}

// Preencher campos do formulário
function loadCustomerFormFields() {
  const nameInput = document.getElementById("custName");
  const addrInput = document.getElementById("custAddress");
  const notesInput = document.getElementById("custNotes");
  const deliveryWrapper = document.getElementById("deliveryAddressGroup");

  if (nameInput) nameInput.value = state.customer.name || "";
  if (addrInput) addrInput.value = state.customer.address || "";
  if (notesInput) notesInput.value = state.customer.notes || "";

  // Selecionar radio de entrega
  const deliveryRadio = document.querySelector(`input[name="deliveryType"][value="${state.customer.deliveryType}"]`);
  if (deliveryRadio) deliveryRadio.checked = true;

  // Selecionar radio de pagamento
  const paymentRadio = document.querySelector(`input[name="paymentMethod"][value="${state.customer.payment}"]`);
  if (paymentRadio) paymentRadio.checked = true;

  if (deliveryWrapper) {
    deliveryWrapper.style.display = state.customer.deliveryType === "delivery" ? "flex" : "none";
  }
}

function handleDeliveryTypeChange(value) {
  state.customer.deliveryType = value;
  const deliveryWrapper = document.getElementById("deliveryAddressGroup");
  if (deliveryWrapper) {
    deliveryWrapper.style.display = value === "delivery" ? "flex" : "none";
  }
  saveStateToStorage();
}

function handlePaymentChange(value) {
  state.customer.payment = value;
  saveStateToStorage();
}

// Toast de feedback
function showToast(message) {
  let toast = document.getElementById("appToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "appToast";
    toast.className = "toast-msg";
    document.body.appendChild(toast);
  }
  toast.innerHTML = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Copiar Endereço da Loja
function copyStoreAddress() {
  navigator.clipboard.writeText(STORE_CONFIG.address)
    .then(() => {
      showToast("📍 Endereço copiado para a área de transferência!");
    })
    .catch(() => {
      showToast("Endereço: " + STORE_CONFIG.shortAddress);
    });
}

// ==========================================================================
// Montar Mensagem e Enviar para WhatsApp
// ==========================================================================
function finalizeOrderWhatsApp() {
  const { totalItems, totalPrice } = getCartTotals();

  if (totalItems === 0) {
    showToast("Por favor, selecione ao menos 1 item antes de finalizar!");
    return;
  }

  // Capturar dados do formulário
  const nameInput = document.getElementById("custName");
  const addrInput = document.getElementById("custAddress");
  const notesInput = document.getElementById("custNotes");

  const customerName = nameInput ? nameInput.value.trim() : "";
  const customerAddress = addrInput ? addrInput.value.trim() : "";
  const customerNotes = notesInput ? notesInput.value.trim() : "";

  state.customer.name = customerName;
  state.customer.address = customerAddress;
  state.customer.notes = customerNotes;
  saveStateToStorage();

  // Validação amigável se selecionou entrega sem colocar o endereço
  if (state.customer.deliveryType === "delivery" && !customerAddress) {
    if (addrInput) {
      addrInput.focus();
      addrInput.style.borderColor = "#ef4444";
      setTimeout(() => { addrInput.style.borderColor = ""; }, 2500);
    }
    showToast("⚠️ Informe o seu endereço para que possamos realizar a entrega.");
    return;
  }

  // Montagem do texto do pedido exatamente conforme solicitado:
  // "Olá! Gostaria de comprar esses produtos:
  //  [Lista dos produtos com o preço]
  //  Valor total: R$ XX,XX"
  
  let lines = [];
  lines.push("Olá! Gostaria de comprar esses produtos:\n");

  // Itens do pedido
  for (const [idStr, qty] of Object.entries(state.cart)) {
    const id = parseInt(idStr, 10);
    const prod = PRODUCTS_DATA.find(p => p.id === id);
    if (prod && qty > 0) {
      const subtotal = prod.price * qty;
      lines.push(`• ${qty}x ${prod.name} (${prod.unit}) - ${formatCurrency(subtotal)}`);
    }
  }

  lines.push(`\n*Valor Total: ${formatCurrency(totalPrice)}*`);

  // Informações complementares de entrega e pagamento
  lines.push("\n---");
  if (customerName) {
    lines.push(`👤 *Cliente:* ${customerName}`);
  }

  if (state.customer.deliveryType === "delivery") {
    lines.push(`🛵 *Opção:* Entrega em domicílio`);
    if (customerAddress) {
      lines.push(`📍 *Endereço:* ${customerAddress}`);
    }
  } else {
    lines.push(`🏪 *Opção:* Retirada no Balcão (Flora Brasil - Graciliano Ramos)`);
  }

  const paymentLabels = {
    pix: "Pix",
    money: "Dinheiro",
    card: "Cartão (Débito/Crédito)"
  };
  lines.push(`💳 *Forma de Pagamento:* ${paymentLabels[state.customer.payment] || state.customer.payment}`);

  if (customerNotes) {
    lines.push(`💬 *Observações:* ${customerNotes}`);
  }

  const messageText = lines.join("\n");
  const encodedMessage = encodeURIComponent(messageText);

  // Link Oficial da API do WhatsApp
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${STORE_CONFIG.whatsappNumber}&text=${encodedMessage}`;

  // Abrir WhatsApp
  window.open(whatsappUrl, "_blank");

  showToast("✅ Abrindo o WhatsApp da Flora Brasil...");
}

// Limpar Busca
function clearSearch() {
  const searchInput = document.getElementById("searchInput");
  const clearBtn = document.getElementById("searchClearBtn");

  if (searchInput) searchInput.value = "";
  if (clearBtn) clearBtn.classList.remove("visible");

  state.searchQuery = "";
  renderProducts();
}

// Resetar Todos os Filtros
function resetAllFilters() {
  state.activeCategory = "all";
  clearSearch();
  renderCategories();
}

// Inicialização da Aplicação
document.addEventListener("DOMContentLoaded", () => {
  loadStateFromStorage();
  updateStoreStatusBadge();
  setInterval(updateStoreStatusBadge, 60000); // Atualiza o status a cada minuto

  renderCategories();
  renderProducts();
  updateFloatingBar();

  // Listener para busca
  const searchInput = document.getElementById("searchInput");
  const clearBtn = document.getElementById("searchClearBtn");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      if (clearBtn) {
        if (state.searchQuery.length > 0) {
          clearBtn.classList.add("visible");
        } else {
          clearBtn.classList.remove("visible");
        }
      }
      renderProducts();
    });
  }

  // Fechar modal ao clicar fora do sheet
  const backdrop = document.getElementById("checkoutModalBackdrop");
  if (backdrop) {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) {
        closeCheckoutModal();
      }
    });
  }

  // Prevenir que tecla ESC feche
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isCheckoutOpen()) {
      closeCheckoutModal();
    }
  });
});
