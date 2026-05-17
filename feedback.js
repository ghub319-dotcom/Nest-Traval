// ============================================
// FEEDBACK & SUPPORT PAGE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  setupFeedbackForm();
  setupAccordion();
  loadFeedback();
});

// ============================================
// FEEDBACK FORM HANDLING
// ============================================

function setupFeedbackForm() {
  const form = document.getElementById('feedback-form');

  if (form) {
    form.addEventListener('submit', handleFeedbackSubmit);
  }
}

function handleFeedbackSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const subject = document.getElementById('contact-subject').value;
  const message = document.getElementById('contact-message').value.trim();

  // Clear previous errors
  document.getElementById('error-name').textContent = '';
  document.getElementById('error-email').textContent = '';
  document.getElementById('error-message').textContent = '';

  // Validate form
  const errors = {};

  if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!validateEmail(email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (message.length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }


  // Display errors
  if (Object.keys(errors).length > 0) {
    if (errors.name) {
      document.getElementById('error-name').textContent = errors.name;
    }
    if (errors.email) {
      document.getElementById('error-email').textContent = errors.email;
    }
    if (errors.message) {
      document.getElementById('error-message').textContent = errors.message;
    }
    return;
  }

  // Save feedback to localStorage
  saveFeedback({
    name: name,
    email: email,
    subject: subject,
    message: message,
    submittedDate: new Date().toLocaleDateString()
  });

  // Show success message
  document.getElementById('feedback-form').style.display = 'none';
  document.getElementById('feedback-success').style.display = 'block';

  // Reset form after 3 seconds
  setTimeout(() => {
    document.getElementById('feedback-form').reset();
    document.getElementById('feedback-form').style.display = 'block';
    document.getElementById('feedback-success').style.display = 'none';
  }, 3000);
}

// ============================================
// FEEDBACK STORAGE
// ============================================

function saveFeedback(feedbackData) {
  let allFeedback = loadFromLocalStorage('all-feedback', []);
  allFeedback.push({
    ...feedbackData,
    id: Date.now()
  });
  saveToLocalStorage('all-feedback', allFeedback);
}

function loadFeedback() {
  // This function can be used to view feedback in a dashboard (future feature)
  const allFeedback = loadFromLocalStorage('all-feedback', []);
  console.log('Total feedback received:', allFeedback.length);
}

// ============================================
// FAQ ACCORDION
// ============================================

function setupAccordion() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      toggleAccordion(this);
    });
  });
}

function toggleAccordion(header) {
  const content = header.nextElementSibling;
  const isActive = header.classList.contains('active');

  // Close all other accordions
  document.querySelectorAll('.accordion-header.active').forEach(h => {
    if (h !== header) {
      h.classList.remove('active');
      h.nextElementSibling.classList.remove('active');
    }
  });

  // Toggle current accordion
  if (isActive) {
    header.classList.remove('active');
    content.classList.remove('active');
  } else {
    header.classList.add('active');
    content.classList.add('active');
  }
}

// Email validation function
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
