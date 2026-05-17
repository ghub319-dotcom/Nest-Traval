# 🌍 TravelNest - Travel Planning Platform

## Project Overview

TravelNest is a comprehensive web-based travel planning platform designed to help users explore destinations, plan trips, manage budgets, and discover travel inspiration. Built with HTML, CSS, and JavaScript, it offers a responsive, interactive, and user-friendly experience.

## ✨ Features

### 1. **Home Page**
- Auto-rotating travel quotes (changes every 5 seconds)
- Destination of the Day feature (changes daily based on date logic)
- Hero section with destination image/illustration using CSS Grid
- Responsive navigation bar with animated hamburger menu
- Feature highlights with 6 key benefits
- Newsletter subscription form
- Call-to-action section

### 2. **Destination Explorer**
- Display 10 curated destinations as interactive cards
- Filter destinations by:
  - Continent (Asia, Europe, Africa, Americas, Oceania)
  - Destination name (live search)
- Click destination card to open modal with:
  - Detailed description
  - Popular attractions list
  - Travel cost comparison table
  - Country and continent information

### 3. **Trip Budget Planner**
- Form inputs:
  - Destination selection
  - Number of days
  - Daily budget
- JavaScript calculations:
  - Total trip cost
  - Budget status indicator (Budget/Moderate/Luxury)
  - Animated progress bar
- Save trip budgets to localStorage
- View saved trips with delete functionality

### 4. **Random Trip Generator**
- Dropdown menus for:
  - Travel type (Adventure, Relaxation, Cultural, Nature)
  - Budget range (Low, Medium, High)
- Algorithm-based destination suggestion
- "Surprise Me Again" button with animation
- Add destinations to personal wishlist
- Wishlist management (add/remove)

### 5. **Travel Mood Curator**
- Ambient travel sounds:
  - 🏖️ Beach Waves
  - 🌲 Forest Sounds
  - 🌃 City Vibes
- Mark destinations as:
  - Visited (with date tracking)
  - Planned (bucket list)
- Travel statistics dashboard
  - Total visited destinations
  - Total planned trips

### 6. **Feedback & Support**
- Contact form with validation:
  - Name (min 2 characters)
  - Email (valid format)
  - Subject selection
  - Message (min 10 characters)
- Success confirmation message
- Data stored in localStorage
- FAQ section with accordion:
  - 9 comprehensive Q&A items
  - Smooth expand/collapse animation
  - Single accordion open at a time

## 📱 Responsive Design

- **Mobile-First Approach**: Optimized for mobile devices first, then scaled up
- **Breakpoints**:
  - Mobile: < 480px
  - Tablet: < 768px
  - Desktop: 768px+
- **Flexbox & CSS Grid**: Modern layout techniques
- **Hamburger Menu**: Responsive navigation on mobile
- **Touch-Friendly**: Large buttons and interactive elements

## 🎨 Design & UX

### Color Palette
- Primary: `#FF6B6B` (Coral Red)
- Secondary: `#4ECDC4` (Turquoise)
- Accent: `#FFE66D` (Golden Yellow)
- Dark: `#2C3E50` (Dark Blue)
- Light: `#ECF0F1` (Light Gray)

### Typography
- **Headings**: Montserrat (600-700 weight)
- **Body**: Poppins (300-500 weight)
- **Google Fonts**: Imported for consistency

### Animations
- Smooth transitions (0.3s ease)
- Hover effects on cards and buttons
- Scroll-based animations
- Modal slide-in animations
- Progress bar animations
- Hamburger menu rotation

## 💾 localStorage Implementation

All user data is stored locally:
- **Newsletter Email**: `newsletter-email`
- **Saved Trips**: `saved-trips`
- **Wishlist**: `wishlist`
- **Visited Destinations**: `visited-destinations`
- **Planned Destinations**: `planned-destinations`
- **Feedback**: `all-feedback`

## 🌐 PWA Features

- **Manifest.json**: PWA metadata and installation
- **Service Worker**: Offline functionality and caching
- **Installable**: Add to home screen on supported devices
- **Offline Support**: Essential pages cached for offline access
- **Theme Color**: Custom brand color in browser UI

## 📁 Project Structure

```
travelnest/
├── index.html                 # Home page
├── destinations.html          # Destination explorer
├── budget-planner.html        # Budget planning tool
├── random-trip.html           # Trip generator
├── travel-mood.html           # Mood curator
├── feedback.html              # Contact & FAQ
├── manifest.json              # PWA manifest
├── css/
│   └── style.css             # Main stylesheet
├── js/
│   ├── common.js             # Shared functions
│   ├── service-worker.js     # PWA service worker
│   ├── home.js               # Home page logic
│   ├── destinations.js       # Destinations logic
│   ├── budget-planner.js     # Budget calculator
│   ├── random-trip.js        # Trip generator
│   ├── travel-mood.js        # Mood features
│   └── feedback.js           # Feedback & FAQ
├── data/
│   └── destinations.json     # Destination data (10 destinations)
└── assets/
    ├── favicon.svg           # PWA icon
    ├── images/               # Destination images
    └── sounds/               # Ambient sounds
```

## 🚀 Getting Started

1. **Extract the project** to your web server
2. **No build process required** - Open `index.html` in a browser
3. **Server recommended** for Service Worker to work properly
4. **Install as app**: Click "Install" in browser (PWA capable)

## 🔧 Technical Stack

- **HTML5**: Semantic markup
- **CSS3**: Grid, Flexbox, Media Queries, Animations
- **Vanilla JavaScript**: No frameworks
- **localStorage**: Client-side data persistence
- **Service Worker**: Offline support and caching

## ✅ JavaScript Requirements Met

✓ Event listeners and DOM manipulation
✓ JSON objects for destination data
✓ Form validation with custom error messages
✓ Animations triggered by user interaction
✓ localStorage for data persistence
✓ Reusable functions across pages (common.js)
✓ Modal functionality
✓ Accordion implementation
✓ Filter and search functionality
✓ Progressive Web App support

## 📊 Reusable Function: subscribeNewsletter()

This function is used across all pages in the footer:
- Validates email format
- Saves to localStorage
- Shows confirmation message
- Available on all 6 pages

## 🎯 Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 13+)
- Mobile browsers: Fully responsive

## 📈 Future Enhancements

- Backend API integration
- User authentication
- Social sharing features
- Real-time weather integration
- Flight booking API
- Hotel booking integration
- Trip sharing with friends
- Advanced analytics dashboard

## 📝 Notes

- All data is stored locally (privacy-focused)
- No external API calls required
- Works offline with Service Worker
- Smooth scroll behavior
- Optimized for all devices
- SEO-friendly structure

## 👨‍💻 Development Notes

- Single-file approach for each page
- Modular JavaScript with clear sections
- Consistent naming conventions
- Comprehensive comments
- Error handling and fallbacks
- Accessibility considerations

---

**Created**: 2024 | **Version**: 1.0 | **License**: MIT
