// ============================================
// DESTINATIONS EXPLORER PAGE
// ============================================

let allDestinations = [];
let filteredDestinations = [];

document.addEventListener('DOMContentLoaded', function() {
  loadAndDisplayDestinations();
  setupFilters();
});

// ============================================
// LOAD AND DISPLAY DESTINATIONS
// ============================================

function loadAndDisplayDestinations() {
  fetch('data/destinations.json')
    .then(response => response.json())
    .then(data => {
      allDestinations = data.destinations;
      filteredDestinations = [...allDestinations];
      displayDestinations();
    });
}

function displayDestinations() {
  const grid = document.getElementById('destinations-grid');
  grid.innerHTML = '';

  filteredDestinations.forEach(destination => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.cursor = 'pointer';
    
    const colors = [
      { bg: 'linear-gradient(135deg, #FF6B6B, #FFE66D)', emoji: '🏝️' },
      { bg: 'linear-gradient(135deg, #4ECDC4, #44AF69)', emoji: '🗼' },
      { bg: 'linear-gradient(135deg, #F7B731, #5F27CD)', emoji: '🏮' },
      { bg: 'linear-gradient(135deg, #00D2D3, #54A0FF)', emoji: '🏔️' },
      { bg: 'linear-gradient(135deg, #FF9FF3, #54A0FF)', emoji: '🏛️' },
      { bg: 'linear-gradient(135deg, #48DBFB, #FFE66D)', emoji: '🐘' },
      { bg: 'linear-gradient(135deg, #A29BFE, #FD79A8)', emoji: '❄️' },
      { bg: 'linear-gradient(135deg, #FFE66D, #FF7675)', emoji: '🏜️' },
      { bg: 'linear-gradient(135deg, #6C5CE7, #74B9FF)', emoji: '🌴' },
      { bg: 'linear-gradient(135deg, #F0932B, #ED4264)', emoji: '🏺' }
    ];
    
    const colorIndex = destination.id % colors.length;
    const { bg, emoji } = colors[colorIndex];
    
    const imageBlock = destination.image ?
      `<img src="${destination.image}" alt="${destination.name}" style="width:100%; height:250px; object-fit:cover; border-radius: 12px; margin-bottom: 1rem;">` :
      `<div style="width: 100%; height: 250px; background: ${bg}; border-radius: 12px; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 100px; box-shadow: 0 5px 20px rgba(0,0,0,0.1);">
        ${emoji}
      </div>`;

    card.innerHTML = `
      ${imageBlock}
      <h3 class="card-title">${destination.name}</h3>
      <p class="card-text"><strong>${destination.country}</strong></p>
      <p class="card-text" style="color: #999;">${destination.continent}</p>
    `;
    
    card.addEventListener('click', () => showDestinationModal(destination));
    grid.appendChild(card);
  });

  // Update results count
  document.getElementById('results-count').textContent = 
    `Showing ${filteredDestinations.length} destination${filteredDestinations.length !== 1 ? 's' : ''}`;
}

function showDestinationModal(destination) {
  // Populate modal with destination data
  document.getElementById('modal-destination-name').textContent = destination.name;
  document.getElementById('modal-country').textContent = destination.country;
  document.getElementById('modal-continent').textContent = destination.continent;
  document.getElementById('modal-description').textContent = destination.description;

  // Populate attractions list
  const attractionsList = document.getElementById('modal-attractions');
  attractionsList.innerHTML = '';
  destination.attractions.forEach(attraction => {
    const li = document.createElement('li');
    li.textContent = attraction;
    li.style.marginBottom = '0.5rem';
    attractionsList.appendChild(li);
  });

  // Populate cost comparison table
  const costsTable = document.getElementById('modal-costs');
  costsTable.innerHTML = `
    <thead>
      <tr>
        <th>Travel Style</th>
        <th>Daily Cost</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Budget</td>
        <td>${destination.costComparison.budget}</td>
      </tr>
      <tr>
        <td>Moderate</td>
        <td>${destination.costComparison.moderate}</td>
      </tr>
      <tr>
        <td>Luxury</td>
        <td>${destination.costComparison.luxury}</td>
      </tr>
    </tbody>
  `;

  // Open modal
  openModal();
}

// ============================================
// FILTERING & SEARCH
// ============================================

function setupFilters() {
  const continentFilter = document.getElementById('continent-filter');
  const searchInput = document.getElementById('search-destination');

  if (continentFilter) {
    continentFilter.addEventListener('change', applyFilters);
  }

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }
}

function applyFilters() {
  const continent = document.getElementById('continent-filter')?.value || '';
  const searchTerm = document.getElementById('search-destination')?.value.toLowerCase() || '';

  filteredDestinations = allDestinations.filter(destination => {
    const matchesContinent = !continent || destination.continent === continent;
    const matchesSearch = !searchTerm || 
                         destination.name.toLowerCase().includes(searchTerm) ||
                         destination.country.toLowerCase().includes(searchTerm);
    return matchesContinent && matchesSearch;
  });

  displayDestinations();
}

function getEmojiForDestination(name) {
  const emojiMap = {
    'Bali': '🏝️',
    'Paris': '🗼',
    'Tokyo': '🏮',
    'New Zealand': '🏔️',
    'Barcelona': '🏛️',
    'Thailand': '🐘',
    'Iceland': '❄️',
    'Morocco': '🏜️',
    'Costa Rica': '🌴',
    'Egypt': '🏺'
  };
  return emojiMap[name] || '✈️';
}
