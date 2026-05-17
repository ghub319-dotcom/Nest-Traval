# 📐 TravelNest - Wireframes & Design Documentation

## Design Principles

1. **Mobile-First**: Design for mobile, enhance for desktop
2. **User-Centered**: Intuitive navigation and clear CTAs
3. **Visual Hierarchy**: Important elements stand out
4. **Consistency**: Same design patterns across pages
5. **Accessibility**: Readable contrast, clear labels

---

## 🏠 Page 1: Home Page

### Wireframe Structure

```
┌─────────────────────────────────────┐
│ NAVIGATION BAR (Sticky)             │
│ Logo | Links | Hamburger (mobile)   │
├─────────────────────────────────────┤
│                                     │
│ HERO SECTION (2 columns grid)       │
│ ┌────────────────┬──────────────┐   │
│ │  Left:         │  Right:      │   │
│ │  - Heading     │  - Image/    │   │
│ │  - Quote       │    Graphic   │   │
│ │  - CTA Buttons │               │   │
│ └────────────────┴──────────────┘   │
│                                     │
├─────────────────────────────────────┤
│ DESTINATION OF THE DAY              │
│ (Gradient background, white text)   │
│ ┌────────────────┬──────────────┐   │
│ │ Image/Graphic  │ Content:     │   │
│ │                │ - Name       │   │
│ │                │ - Country    │   │
│ │                │ - Desc       │   │
│ │                │ - Learn Btn  │   │
│ └────────────────┴──────────────┘   │
│                                     │
├─────────────────────────────────────┤
│ FEATURES SECTION (3-column grid)    │
│ ┌─────┬─────┬─────┐                │
│ │Card │Card │Card │                │
│ │     │     │     │                │
│ └─────┴─────┴─────┘                │
│ ┌─────┬─────┬─────┐                │
│ │Card │Card │Card │                │
│ │     │     │     │                │
│ └─────┴─────┴─────┘                │
│                                     │
├─────────────────────────────────────┤
│ CTA SECTION (Light background)      │
│ Heading + 3 buttons (flex wrap)     │
├─────────────────────────────────────┤
│ FOOTER                              │
│ [Links] [Newsletter] [Contact]      │
└─────────────────────────────────────┘
```

### Key Design Elements
- **Hero**: Split layout with text on left, image on right
- **Sticky Nav**: Follows user as they scroll
- **Cards**: 3-column grid on desktop, 1 on mobile
- **Auto-rotating Quote**: Updates every 5 seconds
- **Destination of Day**: Uses date-based logic
- **Color**: Gradient backgrounds for sections

---

## 🌍 Page 2: Destination Explorer

### Wireframe Structure

```
┌─────────────────────────────────────┐
│ NAVIGATION BAR                      │
├─────────────────────────────────────┤
│ HERO SECTION (Gradient, centered)   │
│ Heading + Subheading                │
├─────────────────────────────────────┤
│ FILTER SECTION (White background)   │
│ ┌──────────┬──────────────┐         │
│ │ Continent│ Search Input │         │
│ │ Dropdown │              │         │
│ └──────────┴──────────────┘         │
│ Results count: "Showing X dest"     │
├─────────────────────────────────────┤
│ DESTINATIONS GRID (3 columns)       │
│ ┌─────┬─────┬─────┐                │
│ │Card │Card │Card │                │
│ │┌──┐ │┌──┐ │┌──┐ │                │
│ ││  │ ││  │ ││  │ │                │
│ │└──┘ │└──┘ │└──┘ │                │
│ │Name │Name │Name │                │
│ │Ctry │Ctry │Ctry │                │
│ └─────┴─────┴─────┘                │
│ ... more cards ...                 │
├─────────────────────────────────────┤
│ MODAL (Click card)                  │
│ ┌──────────────────────┐            │
│ │ Close [X]            │            │
│ │ Destination Name     │            │
│ │ Country: Continent   │            │
│ │ ─────────────────    │            │
│ │ Description...       │            │
│ │ Attractions:         │            │
│ │ • Attraction 1       │            │
│ │ • Attraction 2       │            │
│ │ Cost Table:          │            │
│ │ Budget  | Moderate | Luxury      │            
│ │ ...     | ...      | ...        │
│ │ [Close]              │            │
│ └──────────────────────┘            │
├─────────────────────────────────────┤
│ FOOTER                              │
└─────────────────────────────────────┘
```

### Key Design Elements
- **Filter Bar**: Continent dropdown + search input side by side
- **Card Grid**: 3 on desktop, 2 on tablet, 1 on mobile
- **Card Hover**: Slight lift effect
- **Modal**: Centered overlay with close button
- **Search**: Real-time filtering

---

## 💰 Page 3: Trip Budget Planner

### Wireframe Structure

```
┌─────────────────────────────────────┐
│ NAVIGATION BAR                      │
├─────────────────────────────────────┤
│ HERO SECTION (Gradient)             │
│ Heading + Subheading                │
├─────────────────────────────────────┤
│ FORM SECTION (Card style)           │
│ Max width: 600px, centered          │
│ ┌─────────────────────┐             │
│ │ Budget Planner Form │             │
│ │                     │             │
│ │ [Destination Dropdown]           │
│ │ [Number of Days Input]           │
│ │ [Daily Budget Input]             │
│ │                     │             │
│ │ [Calculate Button]  │             │
│ └─────────────────────┘             │
│                                     │
├─────────────────────────────────────┤
│ RESULTS SECTION (Initially hidden)  │
│ ┌─────────────────────┐             │
│ │ Budget Summary      │             │
│ │ ─────────────────   │             │
│ │ Dest: X  Days: X    │             │
│ │ Daily: $X           │             │
│ │                     │             │
│ │ Total Cost: $XXXX   │             │
│ │ Status: [Color]     │             │
│ │ [Progress Bar]      │             │
│ │ Description text    │             │
│ │                     │             │
│ │ [Save Trip] [New]   │             │
│ └─────────────────────┘             │
│                                     │
│ ┌─────────────────────┐             │
│ │ Saved Trips         │             │
│ │ ┌─────────────────┐ │             │
│ │ │ Trip 1 | Delete│ │             │
│ │ │ Trip 2 | Delete│ │             │
│ │ └─────────────────┘ │             │
│ └─────────────────────┘             │
├─────────────────────────────────────┤
│ FOOTER                              │
└─────────────────────────────────────┘
```

### Key Design Elements
- **Form**: Centered, max-width 600px
- **Results**: Hidden until form submitted
- **Progress Bar**: Color-coded (green/orange/purple)
- **Budget Status**: Three levels with descriptions
- **Saved Trips**: Card list with delete buttons
- **Animations**: Progress bar fills on calculate

---

## 🎲 Page 4: Random Trip Generator

### Wireframe Structure

```
┌─────────────────────────────────────┐
│ NAVIGATION BAR                      │
├─────────────────────────────────────┤
│ HERO SECTION (Gradient)             │
│ Heading: "🎲 Random Trip Generator" │
├─────────────────────────────────────┤
│ PREFERENCES SECTION (Card)          │
│ ┌─────────────────────┐             │
│ │ Tell Us Your Prefs  │             │
│ │                     │             │
│ │ [Travel Type Dropdown]          │
│ │ [Budget Range Dropdown]         │
│ │                     │             │
│ │ [Surprise Me! Button]           │
│ └─────────────────────┘             │
│                                     │
├─────────────────────────────────────┤
│ RESULTS SECTION (Hidden until...)   │
│ ┌──────────────────────┐            │
│ │ Your Random Dest.    │            │
│ │                      │            │
│ │ [Image/Emoji]        │            │
│ │                      │            │
│ │ Destination Name     │            │
│ │ Country              │            │
│ │ Description...       │            │
│ │                      │            │
│ │ Quick Facts:         │            │
│ │ Best For: Type       │            │
│ │ Budget: Level        │            │
│ │                      │            │
│ │ [Add Wishlist]       │            │
│ │ [Surprise Again]     │            │
│ └──────────────────────┘            │
│                                     │
│ ┌──────────────────────┐            │
│ │ ✨ My Wishlist       │            │
│ │ ┌──────────────────┐ │            │
│ │ │ Destination 1 -X│ │            │
│ │ │ Destination 2 -X│ │            │
│ │ └──────────────────┘ │            │
│ └──────────────────────┘            │
├─────────────────────────────────────┤
│ FOOTER                              │
└─────────────────────────────────────┘
```

### Key Design Elements
- **Dropdown Selects**: Travel type and budget
- **Results**: Appears after selection
- **Wishlist**: Shows added destinations
- **Quick Facts**: Important info at a glance
- **Buttons**: Add to wishlist and surprise again

---

## 🎧 Page 5: Travel Mood Curator

### Wireframe Structure

```
┌─────────────────────────────────────┐
│ NAVIGATION BAR                      │
├─────────────────────────────────────┤
│ HERO SECTION (Gradient)             │
│ Heading + "Set the mood" subtitle   │
├─────────────────────────────────────┤
│ AMBIENT SOUNDS SECTION              │
│ 🎵 Ambient Travel Sounds            │
│ ┌──────┬──────┬──────┐              │
│ │Beach │Forest│City  │              │
│ │ 🏖️   │ 🌲   │ 🌃   │              │
│ │Play  │Play  │Play  │              │
│ │Sound │Sound │Sound │              │
│ └──────┴──────┴──────┘              │
│                                     │
├─────────────────────────────────────┤
│ TRAVEL STATUS SECTION               │
│ 📍 Track Your Travel Status         │
│ ┌──────────────────────┐            │
│ │ Mark Status          │            │
│ │ [Destination Select] │            │
│ │ [Mark Planned] [Mark Visited]     │            │
│ └──────────────────────┘            │
│                                     │
│ ┌──────────────────────┐            │
│ │ ✅ Visited           │            │
│ │ • Destination 1 - X  │            │
│ │ • Destination 2 - X  │            │
│ └──────────────────────┘            │
│                                     │
│ ┌──────────────────────┐            │
│ │ 📋 Planned           │            │
│ │ • Destination A - X  │            │
│ │ • Destination B - X  │            │
│ └──────────────────────┘            │
│                                     │
├─────────────────────────────────────┤
│ STATS SECTION (2 columns)           │
│ ┌──────────┬──────────┐             │
│ │ Visited  │ Planned  │             │
│ │    0     │    0     │             │
│ └──────────┴──────────┘             │
├─────────────────────────────────────┤
│ FOOTER                              │
└─────────────────────────────────────┘
```

### Key Design Elements
- **Sound Cards**: 3 cards with emojis and buttons
- **Destination Selector**: Dropdown to select
- **Status Buttons**: Mark as visited or planned
- **Lists**: Two columns for visited/planned
- **Stats**: Dashboard showing counts
- **Color Coding**: Different colors for different statuses

---

## 📞 Page 6: Feedback & Support

### Wireframe Structure

```
┌─────────────────────────────────────┐
│ NAVIGATION BAR                      │
├─────────────────────────────────────┤
│ HERO SECTION (Gradient)             │
│ Heading + "Contact us" subtitle     │
├─────────────────────────────────────┤
│ CONTACT FORM SECTION (Card)         │
│ ┌──────────────────────┐            │
│ │ Get in Touch         │            │
│ │                      │            │
│ │ [Name Input] Error   │            │
│ │ [Email Input] Error  │            │
│ │ [Subject Dropdown]   │            │
│ │ [Message Textarea]   │            │
│ │                      │            │
│ │ [Send Button]        │            │
│ │                      │            │
│ │ [Success Message]    │            │
│ │ (shown after submit) │            │
│ └──────────────────────┘            │
│                                     │
├─────────────────────────────────────┤
│ FAQ SECTION (Accordion)             │
│ ┌──────────────────────┐            │
│ │ ❓ FAQ               │            │
│ │                      │            │
│ │ ┌─────────────────┐  │            │
│ │ │ Q1              │▼ │            │
│ │ └─────────────────┘  │            │
│ │                      │            │
│ │ ┌─────────────────┐  │            │
│ │ │ Q2              │▼ │            │
│ │ │ A2: Answer...   │  │            │
│ │ └─────────────────┘  │            │
│ │                      │            │
│ │ ┌─────────────────┐  │            │
│ │ │ Q3              │▼ │            │
│ │ └─────────────────┘  │            │
│ └──────────────────────┘            │
├─────────────────────────────────────┤
│ FOOTER                              │
└─────────────────────────────────────┘
```

### Key Design Elements
- **Form**: Clear labels and error messages
- **Validation**: Real-time error display
- **Success Message**: Shown after submission
- **Accordion**: Smooth expand/collapse
- **Single Open**: Only one accordion open at a time
- **Color Coding**: Header changes color when expanded

---

## 🎨 Common Design Elements Across All Pages

### Navigation Bar
```
┌─────────────────────────────────────────────────┐
│ Logo | Home | Explore | Budget | Surprise | Mood │ Contact
│                                    (hamburger on mobile)
└─────────────────────────────────────────────────┘
```

### Footer
```
┌─────────────────────────────────────────┐
│ TravelNest Info    | Links           | Newsletter
│ Description        | - Home          | [Email] [Subscribe]
│                    | - Explore       |
│                    | - Budget        |
│                    | - Contact       |
├─────────────────────────────────────────┤
│ © 2024 TravelNest - Made with ❤️         │
└─────────────────────────────────────────┘
```

### Card Component
```
┌──────────────────────┐
│ [Image/Gradient]     │
│                      │
│ Card Title           │
│ Subtitle/Metadata    │
│ Description text...  │
│                      │
│ [Button]             │
└──────────────────────┘
```

### Modal Component
```
┌────────────────────────┐
│ Title          [Close] │
├────────────────────────┤
│                        │
│ Modal Content          │
│ ...                    │
│                        │
│          [Close Button]│
└────────────────────────┘
```

---

## 📱 Responsive Design Breakpoints

### Mobile (< 480px)
- Single column layout
- Full-width inputs
- Hamburger navigation
- Stacked cards
- No hover effects (touch-based)

### Tablet (480px - 768px)
- 2 columns for grids
- Hamburger navigation
- Optimized spacing
- Readable buttons

### Desktop (> 768px)
- Full multi-column layouts
- Horizontal navigation
- Hover effects
- Maximum width containers
- Side-by-side sections

---

## 🎯 User Flows

### New User Flow
1. Land on Home Page
2. View features and CTA
3. Explore Destinations (most common next step)
4. Click destination card to view details
5. Navigate to Budget Planner to plan trip
6. Subscribe to newsletter (footer)

### Returning User Flow
1. Check Destination of the Day
2. View Travel Mood stats
3. Add new destinations to wishlist
4. Update saved trips
5. Check FAQ for support

---

## 🎨 Color Usage by Page

- **Home**: Vibrant gradients, emphasis on exploration
- **Destinations**: Clean cards, color-coded by region
- **Budget**: Progress colors (green/orange/purple)
- **Random Trip**: Playful, surprise element
- **Travel Mood**: Calming colors for zen feeling
- **Feedback**: Professional, trust-building colors

---

## ✅ Design Checklist

- [x] Mobile-first responsive design
- [x] Consistent color palette
- [x] Clear typography hierarchy
- [x] Accessible contrast ratios
- [x] Touch-friendly button sizes (48px minimum)
- [x] Smooth animations and transitions
- [x] Clear call-to-action buttons
- [x] Logical navigation structure
- [x] Empty states handled gracefully
- [x] Error states with helpful messages
- [x] Loading states (if applicable)
- [x] Consistent spacing and padding
- [x] Icons and emojis for visual interest
- [x] Progressive enhancement

---

Created: 2024 | Design Inspiration: Modern travel platforms with focus on UX
