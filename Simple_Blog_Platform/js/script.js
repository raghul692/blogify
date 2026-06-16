// ============================================
// BLOGIFY - Main Script
// ============================================

// ============================================
// NAVBAR & SCROLL BEHAVIOR
// ============================================

(function() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const scrollToTopBtn = document.querySelector('.scroll-to-top');

    // Navbar shadow on scroll
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Mobile menu toggle
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('open');
            document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // Scroll to top button
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Close mobile menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks && navLinks.classList.contains('open')) {
            menuToggle?.classList.remove('active');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
})();

// ============================================
// ACTIVE NAV LINK
// ============================================

(function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
})();

// ============================================
// NEWSLETTER FORM
// ============================================

(function() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input[type="email"]');
            if (input && input.value.trim()) {
                if (isValidEmail(input.value.trim())) {
                    showToast('🎉 Thanks for subscribing!');
                    input.value = '';
                } else {
                    showToast('Please enter a valid email address');
                }
            }
        });
    });

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
})();

// ============================================
// ANIMATION ON SCROLL
// ============================================

(function() {
    // Simple scroll animation using Intersection Observer
    if ('IntersectionObserver' in window) {
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animateElements.forEach(el => observer.observe(el));
    }
})();

// ============================================
// READING PROGRESS BAR
// ============================================

(function() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress-bar';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        z-index: 1001;
        transition: width 0.1s;
        width: 0;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
})();

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

(function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
})();

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

(function() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K: Focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('.search-bar input, #searchInput');
            if (searchInput) {
                searchInput.focus();
            } else {
                window.location.href = 'search.html';
            }
        }

        // Escape: Close mobile menu
        if (e.key === 'Escape') {
            const navLinks = document.querySelector('.nav-links');
            const menuToggle = document.querySelector('.menu-toggle');
            if (navLinks?.classList.contains('open')) {
                menuToggle?.classList.remove('active');
                navLinks.classList.remove('open');
                document.body.style.overflow = '';
            }
        }

        // T: Toggle dark mode
        if (e.key === 't' && !e.ctrlKey && !e.metaKey && !e.target.matches('input, textarea')) {
            DarkMode.toggleTheme();
        }
    });
})();

// ============================================
// IMAGE LAZY LOADING
// ============================================

(function() {
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.src; // Native lazy loading
        });
    }
})();

// ============================================
// PAGE LOAD ANIMATIONS
// ============================================

(function() {
    document.addEventListener('DOMContentLoaded', function() {
        document.body.classList.add('page-loaded');

        // Animate elements with stagger
        const staggerElements = document.querySelectorAll('.stagger-animate');
        staggerElements.forEach((el, index) => {
            el.style.opacity = '0';
            setTimeout(() => {
                el.classList.add('animate-fade-in-up');
            }, 100 * (index + 1));
        });
    });
})();

// ============================================
// SET PAGE TITLE
// ============================================

(function() {
    const pageName = window.location.pathname.split('/').pop().replace('.html', '');
    const titles = {
        'index': 'Blogify - Learn. Build. Grow.',
        'blog': 'Blogify - Article',
        'categories': 'Blogify - Categories',
        'search': 'Blogify - Search',
        'about': 'Blogify - About Us',
        'contact': 'Blogify - Contact'
    };

    if (titles[pageName]) {
        document.title = titles[pageName];
    }
})();

// ============================================
// CONSOLE WELCOME MESSAGE
// ============================================

console.log('%c📝 Blogify', 'font-size: 2rem; font-weight: bold; color: #6c63ff;');
console.log('%cLearn. Build. Grow.', 'font-size: 1.2rem; color: #636e72;');
console.log('%cBuilt with ❤️ using HTML, CSS & JavaScript', 'font-size: 0.9rem; color: #b2bec3;');