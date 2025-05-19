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
    name: 'Swim goggles',
    category: 'running',
    type: 'airmax',
    price: 150,
    image: 'https://www.yourswimlog.com/wp-content/uploads/2024/01/Essential-Swim-Gear-Swim-Goggles.jpg'
  },
  {
    id: 2,
    name: 'Swimming Goggles for Adults - Black',
    category: 'running',
    type: 'running',
    price: 120,
    image: 'https://www.sportihobi.bg/sites/default/files/styles/uc_product_full/public/288502903/88502903_xxl.jpg?itok=KFe2aESY'
  },
  {
    id: 3,
    name: 'Killa 180º Swimming Goggles',
    category: 'running',
    type: 'jordan',
    price: 180,
    image: 'https://www.orca.com/uploads/products/large/na31ttmb-01-orca-killa-180-swimming-goggles-mirror-black_750x1000.jpg'
  },
  {
    id: 4,
    name: 'First Lens Kids Powered Swimming Goggles',
    category: 'running',
    type: 'tshirts',
    price: 35,
    image: 'https://firstlens.in/cdn/shop/products/First-Lens-Kids-swimming-goggles-001-1.png?v=1734777758&width=1000'
  },
  {
    id: 5,
    name: 'Speedo Silicone Swimming Cap Adults',
    category: 'basketball',
    type: 'hoodies',
    price: 110,
    image: 'https://images.sportsdirect.com/images/imgzoom/88/88300803_xxl.jpg'
  },
  {
    id: 6,
    name: 'Biofuse 2.0 - Swimming goggles',
    category: 'running',
    type: 'hoodies',
    price: 110,
    image: 'https://images.hardloop.fr/568824-large_default/speedo-biofuse-20-swimming-goggles.jpg?w=auto&h=auto&q=80'
  },
  {
    id: 7,
    name: 'Big Mesh Mummy Backpack III',
    category: 'basketball',
    type: 'hoodies',
    price: 110,
    image: 'https://www.swimoutlet.com/cdn/shop/files/8638950244520-fluorescentyellow-1a.jpg?v=1727275254'
  },
  {
    id: 8,
    name: 'Mens Powerflex Eco Tone Setter Jammer Swimsuit',
    category: 'basketball',
    type: 'hoodies',
    price: 110,
    image: 'https://www.swimoutlet.com/cdn/shop/files/8640771031208-blackgreen-1a.jpg?crop=center&height=1176&v=1727050638&width=854https://www.swimoutlet.com/cdn/shop/files/8640771031208-blackgreen-1a.jpg?crop=center&height=1176&v=1727050638&width=854'
  },
 
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