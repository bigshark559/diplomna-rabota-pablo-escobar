// Mobile menu toggle
const menuButton = document.getElementById('menuButton');
const nav = document.getElementById('nav');

menuButton.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Search functionality
const searchButton = document.getElementById('searchButton');
const searchOverlay = document.getElementById('searchOverlay');
const closeSearch = document.getElementById('closeSearch');
const searchInput = document.getElementById('searchInput');

searchButton.addEventListener('click', () => {
  searchOverlay.classList.add('active');
  searchInput.focus();
});

closeSearch.addEventListener('click', () => {
  searchOverlay.classList.remove('active');
});

// Close search on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
    searchOverlay.classList.remove('active');
  }
});

// Sports slider
const sportsTrack = document.getElementById('sportsTrack');
const prevSlide = document.getElementById('prevSlide');
const nextSlide = document.getElementById('nextSlide');

let scrollAmount = 0;
const slideWidth = window.innerWidth >= 1280 ? 400 : 300; // Responsive slide width
const slideGap = 32; // Increased gap
const slidesVisible = Math.floor(sportsTrack.offsetWidth / (slideWidth + slideGap));
const maxScroll = sportsTrack.scrollWidth - sportsTrack.offsetWidth;

prevSlide.addEventListener('click', () => {
  scrollAmount = Math.max(scrollAmount - (slideWidth + slideGap), 0);
  sportsTrack.scrollTo({
    left: scrollAmount,
    behavior: 'smooth'
  });
});

nextSlide.addEventListener('click', () => {
  scrollAmount = Math.min(scrollAmount + (slideWidth + slideGap), maxScroll);
  sportsTrack.scrollTo({
    left: scrollAmount,
    behavior: 'smooth'
  });
});

// Collection slider
const collectionTrack = document.getElementById('collectionTrack');
const prevCollection = document.getElementById('prevCollection');
const nextCollection = document.getElementById('nextCollection');

let collectionScrollAmount = 0;
const collectionSlideWidth = window.innerWidth >= 1280 ? 500 : 400; // Responsive slide width
const collectionSlideGap = 32; // Increased gap
const collectionMaxScroll = collectionTrack.scrollWidth - collectionTrack.offsetWidth;

prevCollection.addEventListener('click', () => {
  collectionScrollAmount = Math.max(collectionScrollAmount - (collectionSlideWidth + collectionSlideGap), 0);
  collectionTrack.scrollTo({
    left: collectionScrollAmount,
    behavior: 'smooth'
  });
});

nextCollection.addEventListener('click', () => {
  collectionScrollAmount = Math.min(collectionScrollAmount + (collectionSlideWidth + collectionSlideGap), collectionMaxScroll);
  collectionTrack.scrollTo({
    left: collectionScrollAmount,
    behavior: 'smooth'
  });
});

// Brand sliders
function createSlider(trackId, prevId, nextId) {
  const track = document.getElementById(trackId);
  const prevButton = document.getElementById(prevId);
  const nextButton = document.getElementById(nextId);

  if (!track || !prevButton || !nextButton) return;

  let scrollAmount = 0;
  const slideWidth = window.innerWidth >= 1280 ? 400 : 300; // Responsive slide width
  const slideGap = 32; // Increased gap
  const maxScroll = track.scrollWidth - track.offsetWidth;

  prevButton.addEventListener('click', () => {
    scrollAmount = Math.max(scrollAmount - (slideWidth + slideGap), 0);
    track.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });

  nextButton.addEventListener('click', () => {
    scrollAmount = Math.min(scrollAmount + (slideWidth + slideGap), maxScroll);
    track.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });
}

// Initialize brand sliders
createSlider('nikeTrack', 'prevNike', 'nextNike');
createSlider('adidasTrack', 'prevAdidas', 'nextAdidas');
createSlider('uaTrack', 'prevUA', 'nextUA');

// Add resize handler for responsive slide widths
window.addEventListener('resize', () => {
  // Reinitialize sliders on resize
  createSlider('nikeTrack', 'prevNike', 'nextNike');
  createSlider('adidasTrack', 'prevAdidas', 'nextAdidas');
  createSlider('uaTrack', 'prevUA', 'nextUA');
});