// ============================================
// BUDGET PLANNER PAGE - ENHANCED
// ============================================

let budgetChart = null;
const currencySymbols = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  INR: '₹'
};

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('budget-form');
  if (form) {
    form.addEventListener('submit', calculateBudget);
  }
  loadSavedTrips();
});

// ============================================
// ENHANCED BUDGET CALCULATION
// ============================================

function calculateBudget(e) {
  e.preventDefault();

  const destination = document.getElementById('destination').value;
  const numDays = parseInt(document.getElementById('num-days').value);
  const currency = document.getElementById('currency').value;
  const accommodation = parseFloat(document.getElementById('accommodation').value);
  const food = parseFloat(document.getElementById('food').value);
  const transportation = parseFloat(document.getElementById('transportation').value);
  const activities = parseFloat(document.getElementById('activities').value);

  if (!destination || !numDays || !accommodation || !food || !transportation || !activities) {
    alert('Please fill in all required fields');
    return;
  }

  // Calculate totals
  const dailyTotal = accommodation + food + transportation + activities;
  const tripTotal = dailyTotal * numDays;
  const currencySymbol = currencySymbols[currency] || '$';

  // Calculate individual totals
  const accommodationTotal = accommodation * numDays;
  const foodTotal = food * numDays;
  const transportationTotal = transportation * numDays;
  const activitiesTotal = activities * numDays;

  // Display results
  document.getElementById('result-destination').textContent = destination;
  document.getElementById('result-days').textContent = numDays + ' days';
  document.getElementById('result-currency').textContent = currency;
  document.getElementById('currency-symbol').textContent = currencySymbol;
  document.getElementById('total-cost').textContent = tripTotal.toFixed(2);

  // Get budget status
  const budgetStatus = determineBudgetStatus(dailyTotal);
  document.getElementById('budget-status').textContent = budgetStatus.label;
  document.getElementById('budget-status').style.color = budgetStatus.color;

  // Update progress bar
  const progressBar = document.getElementById('budget-progress');
  progressBar.style.background = budgetStatus.gradient;
  progressBar.style.width = budgetStatus.percentage + '%';
  progressBar.textContent = budgetStatus.percentage + '%';

  // Show budget description
  document.getElementById('budget-description').innerHTML = budgetStatus.description;

  // Display expense breakdown
  displayExpenseBreakdown(accommodation, food, transportation, activities, currencySymbol);

  // Display budget alerts
  displayBudgetAlerts(accommodation, food, transportation, activities, destination, currencySymbol);

  // Create chart
  createBudgetChart(
    accommodationTotal,
    foodTotal,
    transportationTotal,
    activitiesTotal,
    currencySymbol
  );

  // Show results section
  document.getElementById('results-section').style.display = 'block';

  // Scroll to results
  setTimeout(() => {
    document.getElementById('results-section').scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

function displayExpenseBreakdown(accommodation, food, transportation, activities, currencySymbol) {
  const container = document.getElementById('expense-breakdown');
  const expenses = [
    { icon: '🏨', name: 'Accommodation', amount: accommodation },
    { icon: '🍽️', name: 'Food & Dining', amount: food },
    { icon: '🚗', name: 'Transportation', amount: transportation },
    { icon: '🎭', name: 'Activities', amount: activities }
  ];

  container.innerHTML = '';
  expenses.forEach(exp => {
    const div = document.createElement('div');
    div.style.display = 'flex';
    div.style.justifyContent = 'space-between';
    div.style.alignItems = 'center';
    div.style.padding = '0.8rem';
    div.style.background = '#f9f9f9';
    div.style.borderRadius = '8px';
    div.style.borderLeft = '4px solid var(--primary-color)';
    div.innerHTML = `
      <span style="font-size: 1.2rem;">${exp.icon} ${exp.name}</span>
      <span style="font-size: 1.1rem; font-weight: 600; color: var(--primary-color);">${currencySymbol}${exp.amount.toFixed(2)}</span>
    `;
    container.appendChild(div);
  });
}

function displayBudgetAlerts(accommodation, food, transportation, activities, destination, currencySymbol) {
  const container = document.getElementById('budget-alerts');
  container.innerHTML = '';
  const alerts = [];

  // Check for high accommodation
  if (accommodation > 200) {
    alerts.push({
      type: 'warning',
      message: '⚠️ High accommodation costs. Consider alternative lodging options to save money.'
    });
  }

  // Check for low budget
  const dailyTotal = accommodation + food + transportation + activities;
  if (dailyTotal < 30) {
    alerts.push({
      type: 'info',
      message: '💡 Very budget-friendly! This works for some destinations but research local costs first.'
    });
  }

  // Check for unbalanced spending
  const foodPercentage = (food / dailyTotal) * 100;
  if (foodPercentage > 50) {
    alerts.push({
      type: 'warning',
      message: '🍴 Food costs are quite high. Consider eating at local markets or street vendors.'
    });
  }

  // Check for low activities
  if (activities < 10) {
    alerts.push({
      type: 'info',
      message: '💭 Consider allocating more budget for activities and attractions to enhance your experience.'
    });
  }

  alerts.forEach(alert => {
    const div = document.createElement('div');
    const bgColor = alert.type === 'warning' ? '#fff3cd' : '#cce5ff';
    const borderColor = alert.type === 'warning' ? '#ffc107' : '#0066ff';
    div.style.background = bgColor;
    div.style.border = `2px solid ${borderColor}`;
    div.style.padding = '1rem';
    div.style.borderRadius = 'var(--border-radius)';
    div.style.marginBottom = '1rem';
    div.textContent = alert.message;
    container.appendChild(div);
  });
}

function createBudgetChart(accommodation, food, transportation, activities, currencySymbol) {
  const ctx = document.getElementById('budgetChart');
  const total = accommodation + food + transportation + activities;

  if (budgetChart) {
    budgetChart.destroy();
  }

  budgetChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['🏨 Accommodation', '🍽️ Food', '🚗 Transportation', '🎭 Activities'],
      datasets: [{
        data: [
          (accommodation / total * 100).toFixed(1),
          (food / total * 100).toFixed(1),
          (transportation / total * 100).toFixed(1),
          (activities / total * 100).toFixed(1)
        ],
        backgroundColor: [
          '#FF6B6B',
          '#4ECDC4',
          '#FFE66D',
          '#95E1D3'
        ],
        borderColor: 'white',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: { size: 11 },
            padding: 15
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.label + ': ' + context.parsed + '%';
            }
          }
        }
      }
    }
  });
}

function determineBudgetStatus(dailyBudget) {
  let status = {};

  if (dailyBudget <= 50) {
    status = {
      label: '💰 Budget Travel',
      color: '#27ae60',
      percentage: 33,
      gradient: 'linear-gradient(90deg, #27ae60, #2ecc71)',
      description: '<strong>Great choice!</strong> You\'re planning a budget-conscious trip. Look for hostels, street food, and free attractions. Perfect for backpackers and students.'
    };
  } else if (dailyBudget <= 150) {
    status = {
      label: '🎯 Moderate Travel',
      color: '#f39c12',
      percentage: 66,
      gradient: 'linear-gradient(90deg, #f39c12, #e67e22)',
      description: '<strong>Nice balance!</strong> You\'re planning a comfortable trip with mid-range hotels, restaurants, and activities. This allows for a good experience without breaking the bank.'
    };
  } else {
    status = {
      label: '✨ Luxury Travel',
      color: '#9b59b6',
      percentage: 100,
      gradient: 'linear-gradient(90deg, #9b59b6, #8e44ad)',
      description: '<strong>Living the dream!</strong> You\'re planning a luxury trip with high-end hotels, fine dining, and premium experiences. Enjoy every moment!'
    };
  }

  return status;
}

// ============================================
// SAVE AND MANAGE TRIPS
// ============================================

function saveBudget() {
  const destination = document.getElementById('destination').value;
  const numDays = parseInt(document.getElementById('num-days').value);
  const currency = document.getElementById('currency').value;
  const accommodation = parseFloat(document.getElementById('accommodation').value);
  const food = parseFloat(document.getElementById('food').value);
  const transportation = parseFloat(document.getElementById('transportation').value);
  const activities = parseFloat(document.getElementById('activities').value);
  const dailyTotal = accommodation + food + transportation + activities;
  const totalCost = dailyTotal * numDays;

  if (!destination) {
    alert('Please select a destination first');
    return;
  }

  let savedTrips = loadFromLocalStorage('saved-trips', []);

  const newTrip = {
    id: Date.now(),
    destination: destination,
    days: numDays,
    currency: currency,
    accommodation: accommodation,
    food: food,
    transportation: transportation,
    activities: activities,
    dailyTotal: dailyTotal,
    totalCost: totalCost,
    savedDate: new Date().toLocaleDateString()
  };

  savedTrips.push(newTrip);
  saveToLocalStorage('saved-trips', savedTrips);

  alert('✅ Trip saved successfully!');
  loadSavedTrips();
}

function loadSavedTrips() {
  const savedTrips = loadFromLocalStorage('saved-trips', []);
  const container = document.getElementById('saved-trips');

  if (!container) return;

  if (savedTrips.length === 0) {
    container.innerHTML = '<p style=\"color: #999; text-align: center; padding: 2rem;\">No saved trips yet. Create one to get started!</p>';
    return;
  }

  container.innerHTML = '';
  savedTrips.forEach(trip => {
    const tripElement = document.createElement('div');
    tripElement.style.background = 'linear-gradient(135deg, #f9f9f9, #ffffff)';
    tripElement.style.padding = '1.5rem';
    tripElement.style.borderRadius = 'var(--border-radius)';
    tripElement.style.marginBottom = '1rem';
    tripElement.style.border = '1px solid #e0e0e0';
    tripElement.style.display = 'flex';
    tripElement.style.justifyContent = 'space-between';
    tripElement.style.alignItems = 'center';

    const currencySymbol = currencySymbols[trip.currency] || '$';

    tripElement.innerHTML = `
      <div style=\"flex: 1;\">
        <h4 style=\"margin: 0 0 0.5rem; color: var(--primary-color);\">✈️ ${trip.destination}</h4>
        <p style=\"color: #666; font-size: 0.9rem; margin: 0.25rem 0;\">
          <strong>Duration:</strong> ${trip.days} days
        </p>
        <p style=\"color: #666; font-size: 0.9rem; margin: 0.25rem 0;\">
          <strong>Daily:</strong> ${currencySymbol}${trip.dailyTotal.toFixed(2)} | <strong>Total:</strong> ${currencySymbol}${trip.totalCost.toFixed(2)}
        </p>
        <p style=\"color: #999; font-size: 0.85rem; margin: 0.5rem 0 0;\">Saved: ${trip.savedDate}</p>
      </div>
      <button class=\"btn btn-outline\" onclick=\"deleteTrip(${trip.id})\" style=\"white-space: nowrap;\">Delete</button>
    `;
    container.appendChild(tripElement);
  });
}

function deleteTrip(tripId) {
  if (confirm('Are you sure you want to delete this trip?')) {
    let savedTrips = loadFromLocalStorage('saved-trips', []);
    savedTrips = savedTrips.filter(trip => trip.id !== tripId);
    saveToLocalStorage('saved-trips', savedTrips);
    loadSavedTrips();
  }
}

function printBudget() {
  window.print();
}

function resetForm() {
  document.getElementById('budget-form').reset();
  document.getElementById('results-section').style.display = 'none';
  if (budgetChart) {
    budgetChart.destroy();
  }
}
