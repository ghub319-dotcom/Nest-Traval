// ============================================
// TRAVELNEST - COMMON JAVASCRIPT
// Shared functions used across all pages
// ============================================

let destinationsData = [];

// Register Service Worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('js/service-worker.js')
      .then(reg => {
        console.log('Service Worker registered successfully:', reg);
      })
      .catch(err => {
        console.log('Service Worker registration failed:', err);
      });
  });
}

// Load destinations data on page load
document.addEventListener('DOMContentLoaded', function() {
  loadDestinations();
  setupNavigation();
  loadNewsletterEmail();
  initializeScrollAnimations();
});

// Load destinations from JSON
function loadDestinations() {
  fetch('data/destinations.json')
    .then(response => response.json())
    .then(data => {
      destinationsData = data.destinations;
    })
    .catch(error => console.log('Error loading destinations:', error));
}

// ============================================
// NAVIGATION
// ============================================

function setupNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
}

// ============================================
// NEWSLETTER SUBSCRIPTION
// Reusable function across all pages
// ============================================

function subscribeNewsletter() {
  const emailInput = document.getElementById('newsletter-email');
  const email = emailInput.value.trim();

  if (!email) {
    alert('Please enter a valid email address');
    return;
  }

  if (!validateEmail(email)) {
    alert('Please enter a valid email format');
    return;
  }

  // Save to localStorage
  localStorage.setItem('newsletter-email', email);
  alert('✅ Thank you for subscribing! Check your email for updates.');
  emailInput.value = '';
}

function loadNewsletterEmail() {
  const savedEmail = localStorage.getItem('newsletter-email');
  const emailInputs = document.querySelectorAll('#newsletter-email');
  if (savedEmail) {
    emailInputs.forEach(input => {
      input.value = savedEmail;
    });
  }
}

// ============================================
// FORM VALIDATION
// ============================================

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateForm(formData) {
  const errors = {};

  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email';
  }

  if (!formData.message || formData.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return errors;
}

// ============================================
// MODAL FUNCTIONS
// ============================================

function openModal() {
  const modal = document.getElementById('destination-modal');
  if (modal) {
    modal.classList.add('active');
  }
}

function closeModal() {
  const modal = document.getElementById('destination-modal');
  if (modal) {
    modal.classList.remove('active');
  }
}

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
  const modal = document.getElementById('destination-modal');
  if (modal && event.target === modal) {
    closeModal();
  }
});

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initializeScrollAnimations() {
  const animatedElements = document.querySelectorAll('.slide-in, .fade-in');

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
  });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function getCurrentDate() {
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function getDestinationById(id) {
  return destinationsData.find(dest => dest.id === id);
}

function getDestinationByName(name) {
  return destinationsData.find(dest => dest.name === name);
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.log('Error saving to localStorage:', error);
    return false;
  }
}

function loadFromLocalStorage(key, defaultValue = null) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  } catch (error) {
    console.log('Error loading from localStorage:', error);
    return defaultValue;
  }
}

// ============================================
// SMOOTH SCROLL
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
