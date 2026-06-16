// ============================================
// BLOGIFY - Dark Mode Module
// ============================================

const DarkMode = (function() {
    const STORAGE_KEY = 'blogify-theme';
    let currentTheme = 'light';

    function init() {
        // Load saved theme
        const savedTheme = localStorage.getItem(STORAGE_KEY) || 'light';
        setTheme(savedTheme);

        // Setup dark mode toggle buttons
        const toggleButtons = document.querySelectorAll('.dark-mode-toggle');
        toggleButtons.forEach(btn => {
            btn.addEventListener('click', toggleTheme);
            updateButtonIcon(btn);
        });

        // Listen for system preference changes
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        prefersDark.addEventListener('change', (e) => {
            // Only auto-switch if user hasn't set a preference
            if (!localStorage.getItem(STORAGE_KEY)) {
                setTheme(e.matches ? 'dark' : 'light');
                updateAllButtons();
            }
        });
    }

    function setTheme(theme) {
        currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
        updateAllButtons();
    }

    function toggleTheme() {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        showThemeToast(newTheme);
    }

    function getCurrentTheme() {
        return currentTheme;
    }

    function isDarkMode() {
        return currentTheme === 'dark';
    }

    function updateButtonIcon(btn) {
        if (!btn) return;
        if (currentTheme === 'dark') {
            btn.innerHTML = '☀️';
            btn.setAttribute('title', 'Switch to Light Mode');
        } else {
            btn.innerHTML = '🌙';
            btn.setAttribute('title', 'Switch to Dark Mode');
        }
    }

    function updateAllButtons() {
        const toggleButtons = document.querySelectorAll('.dark-mode-toggle');
        toggleButtons.forEach(btn => updateButtonIcon(btn));
    }

    function showThemeToast(theme) {
        const message = theme === 'dark' ? '🌙 Dark Mode Activated' : '☀️ Light Mode Activated';
        showToast(message);
    }

    // Reuse existing toast function or create simple version
    function showToast(message) {
        if (typeof window.showToast === 'function') {
            window.showToast(message);
            return;
        }
        const existingToast = document.querySelector('.toast');
        if (existingToast) existingToast.remove();
        
        const toast = document.createElement('div');
        toast.className = 'toast show';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Apply dark mode to code blocks
    function applyCodeBlockTheme() {
        document.querySelectorAll('pre code').forEach(block => {
            if (currentTheme === 'dark') {
                block.style.color = '#e8e8e8';
            } else {
                block.style.color = '#2d3436';
            }
        });
    }

    return {
        init,
        setTheme,
        toggleTheme,
        getCurrentTheme,
        isDarkMode
    };
})();

// Initialize dark mode when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    DarkMode.init();
});