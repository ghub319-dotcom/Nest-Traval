// ============================================
// RANDOM TRIP GENERATOR PAGE - ENHANCED
// ============================================

let currentRandomDestination = null;
let currentTravelType = null;
let currentBudgetRange = null;

document.addEventListener('DOMContentLoaded', function() {
  loadWishlist();
});

// ============================================
// GENERATE RANDOM TRIP
// ============================================

function generateRandomTrip() {
  const travelType = document.getElementById('travel-type').value;
  const budgetRange = document.getElementById('budget-range').value;

  if (!travelType || !budgetRange) {
    alert('Please select both travel type and budget range');
    return;
  }

  currentTravelType = travelType;
  currentBudgetRange = budgetRange;

  // Fetch destinations and filter
  fetch('data/destinations.json')
    .then(response => response.json())
    .then(data => {
      const destinations = data.destinations;

      // Filter by travel type and budget
      const filtered = destinations.filter(dest => {
        const matchesType = dest.travelType.includes(travelType);
        const matchesBudget = dest.budgetRange.includes(budgetRange);
        return matchesType && matchesBudget;
      });

      if (filtered.length === 0) {
        alert('No destinations found for your criteria. Try different options!');
        return;
      }

      // Select random destination
      currentRandomDestination = filtered[Math.floor(Math.random() * filtered.length)];
      displayRandomDestination(currentRandomDestination);
      
      // Show results
      document.getElementById('results-section').style.display = 'block';
      setTimeout(() => {
        document.getElementById('results-section').scrollIntoView({ behavior: 'smooth' });
      }, 100);
    });
}

function displayRandomDestination(destination) {
  // Populate basic info
  document.getElementById('result-name').textContent = destination.name;
  document.getElementById('result-country').textContent = `${destination.country} • ${destination.continent}`;
  document.getElementById('result-description').textContent = destination.description;
  
  // Display emoji
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
  document.getElementById('result-emoji').textContent = emojiMap[destination.name] || '✈️';

  // Display travel types
  const travelTypeEmojis = {
    'adventure': '🏃',
    'relaxation': '🏖️',
    'cultural': '🏛️',
    'nature': '🌿'
  };
  const typesDisplay = destination.travelType.map(t => 
    `${travelTypeEmojis[t] || '✈️'} ${t.charAt(0).toUpperCase() + t.slice(1)}`
  ).join(', ');
  document.getElementById('result-travel-types').textContent = typesDisplay;

  // Display budget levels
  const budgetDisplay = destination.budgetRange.map(b => {
    return b === 'low' ? '💰 Budget' : b === 'medium' ? '💵 Moderate' : '💎 Luxury';
  }).join(', ');
  document.getElementById('result-budget-levels').textContent = budgetDisplay;

  // Calculate and display match score
  const matchScore = calculateMatchScore(destination);
  document.getElementById('result-match-score').textContent = matchScore + '%';

  // Display attractions
  displayAttractions(destination.attractions);

  // Display cost comparison
  displayCosts(destination.costComparison);
}

function calculateMatchScore(destination) {
  let score = 50; // Base score
  
  // Check if travel type matches
  if (destination.travelType.includes(currentTravelType)) {
    score += 25;
  }
  
  // Check if budget range matches
  if (destination.budgetRange.includes(currentBudgetRange)) {
    score += 25;
  }
  
  return Math.min(100, score);
}

function displayAttractions(attractions) {
  const container = document.getElementById('result-attractions');
  container.innerHTML = '';
  
  attractions.forEach(attraction => {
    const li = document.createElement('li');
    li.style.marginBottom = '0.8rem';
    li.style.color = '#333';
    li.innerHTML = `
      <strong style="color: var(--primary-color);">${attraction}</strong>
    `;
    container.appendChild(li);
  });
}

function displayCosts(costComparison) {
  const container = document.getElementById('result-costs');
  container.innerHTML = '';
  
  const costs = [
    { label: 'Budget', value: costComparison.budget, icon: '💰', color: '#27ae60' },
    { label: 'Moderate', value: costComparison.moderate, icon: '💵', color: '#f39c12' },
    { label: 'Luxury', value: costComparison.luxury, icon: '💎', color: '#9b59b6' }
  ];
  
  costs.forEach(cost => {
    const div = document.createElement('div');
    div.style.display = 'flex';
    div.style.justifyContent = 'space-between';
    div.style.padding = '0.8rem';
    div.style.background = '#f9f9f9';
    div.style.borderRadius = '8px';
    div.style.marginBottom = '0.8rem';
    div.style.borderLeft = `4px solid ${cost.color}`;
    div.innerHTML = `
      <span><strong>${cost.icon} ${cost.label}</strong></span>
      <span style="color: ${cost.color}; font-weight: 600;">${cost.value}</span>
    `;
    container.appendChild(div);
  });
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

// ============================================
// WISHLIST MANAGEMENT
// ============================================

function addToWishlist() {
  if (!currentRandomDestination) {
    alert('Please generate a trip first');
    return;
  }

  let wishlist = loadFromLocalStorage('wishlist', []);

  // Check if destination already in wishlist
  if (wishlist.some(dest => dest.name === currentRandomDestination.name)) {
    alert('This destination is already in your wishlist!');
    return;
  }

  // Add to wishlist with more details
  wishlist.push({
    name: currentRandomDestination.name,
    country: currentRandomDestination.country,
    continent: currentRandomDestination.continent,
    travelTypes: currentRandomDestination.travelType,
    addedDate: new Date().toLocaleDateString()
  });

  saveToLocalStorage('wishlist', wishlist);
  alert('❤️ Added to your wishlist!');
  loadWishlist();
}

function loadWishlist() {
  const wishlist = loadFromLocalStorage('wishlist', []);
  const container = document.getElementById('wishlist-items');

  if (!container) return;

  if (wishlist.length === 0) {
    container.innerHTML = '<p style="color: #999; text-align: center; padding: 2rem;">Your wishlist is empty. Generate some trips and add your favorites!</p>';
    return;
  }

  container.innerHTML = '';
  wishlist.forEach((item, index) => {
    const wishlistItem = document.createElement('div');
    wishlistItem.style.background = 'linear-gradient(135deg, #f9f9f9, #ffffff)';
    wishlistItem.style.padding = '1.5rem';
    wishlistItem.style.borderRadius = 'var(--border-radius)';
    wishlistItem.style.marginBottom = '1rem';
    wishlistItem.style.border = '1px solid #e0e0e0';
    wishlistItem.style.display = 'flex';
    wishlistItem.style.justifyContent = 'space-between';
    wishlistItem.style.alignItems = 'center';

    wishlistItem.innerHTML = `
      <div style="flex: 1;">
        <h4 style="margin: 0 0 0.5rem; color: var(--primary-color);">✈️ ${item.name}</h4>
        <p style="color: #666; font-size: 0.9rem; margin: 0.25rem 0;">
          <strong>${item.country}</strong> • ${item.continent || 'N/A'}
        </p>
        <p style="color: #999; font-size: 0.85rem; margin: 0.5rem 0 0;">Added: ${item.addedDate}</p>
      </div>
      <button class="btn btn-outline" onclick="removeFromWishlist(${index})" style="white-space: nowrap;">Remove</button>
    `;
    container.appendChild(wishlistItem);
  });
}

function removeFromWishlist(index) {
  if (confirm('Remove this destination from your wishlist?')) {
    let wishlist = loadFromLocalStorage('wishlist', []);
    wishlist.splice(index, 1);
    saveToLocalStorage('wishlist', wishlist);
    loadWishlist();
  }
}

function visitDestination() {
  if (!currentRandomDestination) {
    alert('Please generate a trip first');
    return;
  }
  // Navigate to destinations page
  window.location.href = 'destinations.html';
}
