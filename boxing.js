// Mobile menu toggle
const menuButton = document.getElementById('menuButton');
const nav = document.getElementById('nav');

menuButton?.addEventListener('click', () => {
  nav?.classList.toggle('active');
});

// Search functionality
const searchButton = document.getElementById('searchButton');
const searchOverlay = document.getElementById('searchOverlay');
const closeSearch = document.getElementById('closeSearch');
const searchInput = document.getElementById('searchInput');

searchButton?.addEventListener('click', () => {
  searchOverlay?.classList.add('active');
  searchInput?.focus();
});

closeSearch?.addEventListener('click', () => {
  searchOverlay?.classList.remove('active');
});

// Close search on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && searchOverlay?.classList.contains('active')) {
    searchOverlay.classList.remove('active');
  }
});

// Filters sidebar toggle
const filterToggle = document.getElementById('filterToggle');
const filtersSidebar = document.getElementById('filtersSidebar');
const closeFilters = document.getElementById('closeFilters');

filterToggle?.addEventListener('click', () => {
  filtersSidebar?.classList.add('active');
});

closeFilters?.addEventListener('click', () => {
  filtersSidebar?.classList.remove('active');
});

// Price range
const priceRange = document.getElementById('priceRange');
const minPrice = document.getElementById('minPrice');
const maxPrice = document.getElementById('maxPrice');

priceRange?.addEventListener('input', (e) => {
  if (maxPrice) {
    maxPrice.value = e.target.value;
  }
  filterProducts();
});

minPrice?.addEventListener('change', () => {
  if (minPrice && maxPrice) {
    if (parseInt(minPrice.value) > parseInt(maxPrice.value)) {
      minPrice.value = maxPrice.value;
    }
  }
  filterProducts();
});

maxPrice?.addEventListener('change', () => {
  if (minPrice && maxPrice && priceRange) {
    if (parseInt(maxPrice.value) < parseInt(minPrice.value)) {
      maxPrice.value = minPrice.value;
    }
    priceRange.value = maxPrice.value;
  }
  filterProducts();
});

// Shopping Cart
let cart = [];
const cartCount = document.getElementById('cartCount');

function updateCartCount() {
  if (!cartCount) return;
  
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = count.toString();
  cartCount.style.display = count > 0 ? 'flex' : 'none';
  
  // Add animation
  cartCount.classList.add('cart-bump');
  setTimeout(() => {
    cartCount.classList.remove('cart-bump');
  }, 300);
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }
  
  updateCartCount();
  
  // Add button animation
  const button = document.querySelector(`[data-product-id="${productId}"]`);
  if (button) {
    button.classList.add('added-to-cart');
    setTimeout(() => {
      button.classList.remove('added-to-cart');
    }, 1000);
  }
}

// Products data
const products = [
  {
    id: 1,
    name: 'Everlast Spark Boxing Gloves',
    category: 'running',
    type: 'running',
    price: 150,
    image: 'https://images.sportsdirect.com/images/imgzoom/76/76233103_xxl.jpg'
  },
  {
    id: 2,
    name: 'Everlast 1910 Advanced Boxing Gloves',
    category: 'running',
    type: 'running',
    price: 120,
    image: 'https://images.sportsdirect.com/images/imgzoom/77/77309205_xxl.jpg'
  },
  {
    id: 3,
    name: 'Armaplus Boxing Gloves',
    category: 'running',
    type: 'running',
    price: 180,
    image: 'https://stingsports.com/cdn/shop/products/LargePairGRY_600x.jpg?v=1680378136'
  },
  {
    id: 4,
    name: 'Beginner Boxing Gloves 100 - Red',
    category: 'running',
    type: 'running',
    price: 35,
    image: 'https://decathlon.com.sa/cdn/shop/files/e1f03f6630fdbc6acde3c145e8285738_960x.progressive.jpg?v=1729744609'
  },
  {
    id: 5,
    name: 'Venum Pro Boxing Body Protector - Khaki/Gold',
    category: 'basketball',
    type: 'hoodies',
    price: 110,
    image: 'https://www.venum.com/cdn/shop/files/7d43e7ec88b6e8d9290ad6cbab39b8829b9ef0c8_BODY_PROTECTOR_PROBOXING_KHAKI_GOLD_01.jpg?v=1742298375&width=1946'
  },
  {
    id: 6,
    name: 'Hayabusa Pro Boxing Groin Protector',
    category: 'basketball',
    type: 'shorts',
    price: 40,
    image: 'https://images.prismic.io/hayabusa/4a2c1423-325e-4047-ac9a-5f232739775d_Traditional_GroinProtector_Fr_Rev1b.png?auto=compress,format&fm=pjpg&q=80&w=640&h=640&fit=fill&bg=FFFFFF'
  },
  {
    id: 7,
    name: 'HEAD GEAR - Urban™ - JAW/NOSE PROTECTOR',
    category: 'basketball',
    type: 'airforce',
    price: 100,
    image: 'https://www.punchequipment.com/cdn/shop/files/UHG92FRONT2.jpg?v=1698552839&width=2592'
  },
  {
    id: 8,
    name: 'Winning Cheek Protector Headgear - Red',
    category: 'basketball',
    type: 'running',
    price: 160,
    image: 'https://www.wjapanboxing.com/cdn/shop/products/Winning_Red_Cheek_Protector_Headgear_I_1024x1024.jpg?v=1574738519'
  },
  {
    id: 9,
    name: 'PHOENIX: SPARRING HEADGUARD WITH NOSE PROTECTION',
    category: 'basketball',
    type: 'training',
    price: 130,
    image: 'https://cdn.starwebserver.se/shops/jabb/files/cache/phoenix-safe-huvudskydd_medium.jpg?_=1646129780'
  },
  {
    id: 10,
    name: 'TITLE Boxing Super Shield X2 Mouthguard',
    category: 'basketball',
    type: 'skateboarding',
    price: 100,
    image: 'https://www.titleboxing.com/cdn/shop/products/smp2-bk_1_1_2_x300.jpg?v=1698961273'
  },
  {
    id: 11,
    name: 'Boxing Set ',
    category: 'running',
    type: 'casual',
    price: 95,
    image: 'https://m.media-amazon.com/images/I/71UWjni7-hL._AC_SX425_PIcountsize-14,TopRight,0,0_SH20_.jpg'
  },
  {
    id: 12,
    name: 'Rumble Boxing Gloves',
    category: 'running',
    type: 'jackets',
    price: 100,
    image: 'https://www.greenhillsports.com/cdn/shop/products/IMG_3162_70.jpg?v=1667389605&width=1200'
  }
];

// Filter functionality
function getSelectedFilters(name) {
  const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
  return Array.from(checkboxes).map(cb => cb.value);
}

function filterProducts() {
  const selectedCategories = getSelectedFilters('category');
  const selectedTypes = getSelectedFilters('type');
  const minPriceValue = parseInt(minPrice?.value || '0');
  const maxPriceValue = parseInt(maxPrice?.value || '300');

  let filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(product.type);
    const priceMatch = product.price >= minPriceValue && product.price <= maxPriceValue;
    
    return categoryMatch && typeMatch && priceMatch;
  });

  // Apply sorting
  const sortSelect = document.getElementById('sort');
  const sortValue = sortSelect?.value || 'featured';
  
  switch(sortValue) {
    case 'price-low':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      filteredProducts.reverse();
      break;
    default:
      // Featured - keep original order
      break;
  }

  renderProducts(filteredProducts);
}

// Add event listeners to all filter checkboxes
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', filterProducts);
});

// Sort functionality
const sortSelect = document.getElementById('sort');
sortSelect?.addEventListener('change', filterProducts);

// Render products
const productsGrid = document.getElementById('productsGrid');
let currentPage = 1;
const productsPerPage = 8;

function renderProducts(products) {
  if (!productsGrid) return;
  
  const startIndex = 0;
  const endIndex = currentPage * productsPerPage;
  const displayedProducts = products.slice(startIndex, endIndex);
  
  productsGrid.innerHTML = displayedProducts.map(product => `
    <div class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-info">
        <div class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-price-cart">
          <div class="product-price">$${product.price}</div>
          <button class="add-to-cart-btn" data-product-id="${product.id}" onclick="addToCart(${product.id})">
            Add to Cart
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  // Show/hide load more button
  const loadMore = document.getElementById('loadMore');
  if (loadMore) {
    loadMore.style.display = endIndex >= products.length ? 'none' : 'block';
  }
}

// Load more functionality
const loadMore = document.getElementById('loadMore');
loadMore?.addEventListener('click', () => {
  currentPage++;
  filterProducts();
});

// Initial render
renderProducts(products);