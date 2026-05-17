// ============================================
// HOME PAGE JAVASCRIPT
// ============================================

let currentQuoteIndex = 0;
let quoteRotationInterval;

document.addEventListener('DOMContentLoaded', function() {
  setupQuoteRotation();
  loadDestinationOfTheDay();
  rotateQuotes();
});

// ============================================
// AUTO-ROTATING QUOTES
// ============================================

function setupQuoteRotation() {
  quoteRotationInterval = setInterval(rotateQuotes, 5000);

  const quoteElement = document.getElementById('quote');
  if (quoteElement) {
    quoteElement.addEventListener('click', function() {
      clearInterval(quoteRotationInterval);
      rotateQuotes();
      quoteRotationInterval = setInterval(rotateQuotes, 5000);
    });
  }
}

function rotateQuotes() {
  fetch('data/destinations.json')
    .then(response => response.json())
    .then(data => {
      const quotes = data.quotes || [];
      const destinations = data.destinations || [];
      const quoteElement = document.getElementById('quote');
      const visualName = document.getElementById('hero-visual-name');
      const visualCountry = document.getElementById('hero-visual-country');
      const visualDescription = document.getElementById('hero-visual-description');
      const visualImage = document.getElementById('hero-visual-image');

      if (quoteElement && quotes.length > 0) {
        quoteElement.style.opacity = '0';
        quoteElement.style.transition = 'opacity 0.3s ease';

        setTimeout(() => {
          quoteElement.textContent = `"${quotes[currentQuoteIndex]}"`;
          quoteElement.style.opacity = '1';
          currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
        }, 300);
      }

      if (destinations.length > 0 && visualName && visualCountry && visualDescription && visualImage) {
        const destination = destinations[currentQuoteIndex % destinations.length];
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
        const colorMap = {
          'Bali': 'linear-gradient(135deg, #FF6B6B, #FFE66D)',
          'Paris': 'linear-gradient(135deg, #4ECDC4, #44AF69)',
          'Tokyo': 'linear-gradient(135deg, #F7B731, #5F27CD)',
          'New Zealand': 'linear-gradient(135deg, #00D2D3, #54A0FF)',
          'Barcelona': 'linear-gradient(135deg, #FF9FF3, #54A0FF)',
          'Thailand': 'linear-gradient(135deg, #48DBFB, #FFE66D)',
          'Iceland': 'linear-gradient(135deg, #A29BFE, #FD79A8)',
          'Morocco': 'linear-gradient(135deg, #FFE66D, #FF7675)',
          'Costa Rica': 'linear-gradient(135deg, #6C5CE7, #74B9FF)',
          'Egypt': 'linear-gradient(135deg, #F0932B, #ED4264)'
        };

        visualName.textContent = destination.name;
        visualCountry.textContent = destination.country;
        visualDescription.textContent = destination.description;
        visualImage.textContent = emojiMap[destination.name] || '✈️';
        visualImage.style.background = colorMap[destination.name] || 'linear-gradient(135deg, #FF6B6B, #4ECDC4)';
      }
    })
    .catch(error => {
      console.log('Error rotating quotes:', error);
    });
}

// ============================================
// DESTINATION OF THE DAY
// ============================================

function loadDestinationOfTheDay() {
  fetch('data/destinations.json')
    .then(response => response.json())
    .then(data => {
      const destinations = data.destinations;
      const today = new Date();
      const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
      const destinationIndex = dayOfYear % destinations.length;
      const destination = destinations[destinationIndex];

      document.getElementById('dotd-name').textContent = destination.name;
      document.getElementById('dotd-country').textContent = destination.country;
      document.getElementById('dotd-desc').textContent = destination.description;

      const imageDiv = document.getElementById('dotd-image');
      const emojiMap = {
        'Bali': { emoji: '🏝️', color: 'linear-gradient(135deg, #FF6B6B, #FFE66D)' },
        'Paris': { emoji: '🗼', color: 'linear-gradient(135deg, #4ECDC4, #44AF69)' },
        'Tokyo': { emoji: '🏮', color: 'linear-gradient(135deg, #F7B731, #5F27CD)' },
        'New Zealand': { emoji: '🏔️', color: 'linear-gradient(135deg, #00D2D3, #54A0FF)' },
        'Barcelona': { emoji: '🏛️', color: 'linear-gradient(135deg, #FF9FF3, #54A0FF)' },
        'Thailand': { emoji: '🐘', color: 'linear-gradient(135deg, #48DBFB, #FFE66D)' },
        'Iceland': { emoji: '❄️', color: 'linear-gradient(135deg, #A29BFE, #FD79A8)' },
        'Morocco': { emoji: '🏜️', color: 'linear-gradient(135deg, #FFE66D, #FF7675)' },
        'Costa Rica': { emoji: '🌴', color: 'linear-gradient(135deg, #6C5CE7, #74B9FF)' },
        'Egypt': { emoji: '🏺', color: 'linear-gradient(135deg, #F0932B, #ED4264)' }
      };
      const { emoji, color } = emojiMap[destination.name] || { emoji: '✈️', color: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)' };
      imageDiv.style.background = color;
      imageDiv.textContent = emoji;
    })
    .catch(error => {
      console.log('Error loading Destination of the Day:', error);
    });
}

function getRandomColor() {
  const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181', '#AA96DA'];
  return colors[Math.floor(Math.random() * colors.length)];
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
