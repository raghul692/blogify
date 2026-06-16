# 📝 Blogify - Simple Blog Platform

A modern, responsive blog platform built with pure **HTML**, **CSS**, and **JavaScript** - no frameworks or backend required.

## 🚀 Features

### Core Features
- **Home Page** - Hero section, featured articles, latest posts, categories, and trending articles
- **Blog Listing** - Browse all blog posts with card-based layout
- **Single Blog View** - Full article view with author info, related posts, and comments
- **Search Functionality** - Real-time search with debounce, search from anywhere with Ctrl+K
- **Category Filtering** - Filter posts by category with URL parameter support
- **Featured Blogs Section** - Highlighted articles on the homepage
- **Trending Posts Section** - Most popular articles sidebar
- **Author Information** - Author profiles linked to articles
- **Dark Mode** - Toggle between light and dark themes with localStorage persistence
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile

### Additional Features
- Newsletter subscription UI
- Like/Bookmark/Share buttons
- Comments UI with sample data
- Reading progress bar
- Scroll to top button
- Loading skeletons
- Keyboard shortcuts (Ctrl+K for search, T for dark mode toggle)
- Toast notifications
- Smooth animations and transitions
- Breadcrumb navigation
- Related articles
- Pagination support
- Mobile-responsive hamburger menu
- Print-friendly styles
- Reduced motion support

## 📁 Project Structure

```
blog-platform/
├── index.html              # Home Page
├── blog.html               # Single Blog View
├── categories.html         # Categories Page
├── search.html             # Search Results
├── about.html              # About Page
├── contact.html            # Contact Page
├── css/
│   ├── style.css           # Main Styles
│   ├── navbar.css          # Navbar Styles
│   ├── footer.css          # Footer Styles
│   ├── cards.css           # Blog Cards
│   ├── forms.css           # Contact Form
│   ├── responsive.css      # Mobile Responsive
│   └── animations.css      # Animations
├── js/
│   ├── data.js             # Data Loader
│   ├── blog.js             # Blog Rendering
│   ├── search.js           # Search Logic
│   ├── filter.js           # Category Filter
│   ├── darkmode.js         # Dark Mode
│   ├── contact.js          # Form Validation
│   └── script.js           # Main Script
├── data/
│   ├── blogs.json          # Blog Posts Data
│   ├── authors.json        # Authors Data
│   ├── categories.json     # Categories Data
│   └── featured.json       # Featured/Trending IDs
├── images/                 # Image assets
├── components/             # Reusable HTML components
└── README.md
```

## 🛠️ Technologies Used

- **HTML5** - Semantic markup, forms, accessibility
- **CSS3** - Flexbox, Grid, animations, responsive design with CSS variables/custom properties
- **JavaScript (ES6+)** - DOM manipulation, events, async/await, modules pattern, localStorage

## 🎯 Skills Demonstrated

- CSS Flexbox & Grid layouts
- CSS custom properties (theming)
- Responsive design with media queries
- CSS animations and transitions
- JavaScript IIFE module pattern
- DOM manipulation and event handling
- JSON data fetching and parsing
- Search with debounce
- Category filtering
- Dark mode with localStorage
- Form validation
- Mobile-first responsive design

## 🚦 Getting Started

1. Clone or download the repository
2. Open `index.html` in your browser - no server required!
3. Or use a local server for better experience:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   ```

## ⌨️ Keyboard Shortcuts

- `Ctrl/Cmd + K` - Focus search or go to search page
- `T` - Toggle dark mode (when not typing in input)
- `Escape` - Close mobile menu

## 📱 Responsive Breakpoints

- Desktop: 1200px+
- Laptop: 992px - 1199px
- Tablet: 768px - 991px
- Mobile: 576px - 767px
- Small Mobile: < 576px

## 📄 License

This project is created for educational purposes. Feel free to use and modify it.

---

Built with ❤️ using HTML, CSS & JavaScript
