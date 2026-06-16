// ============================================
// BLOGIFY - Category Filter Module
// ============================================

const BlogFilter = (function() {
    let currentCategory = 'all';
    let currentPage = 1;
    const perPage = 12;

    function init() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const blogGrid = document.getElementById('blogGrid');
        const paginationContainer = document.getElementById('pagination');

        // If we're on a page with filter buttons
        if (filterButtons.length > 0) {
            filterButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    const category = this.dataset.category;
                    filterByCategory(category, filterButtons, blogGrid, paginationContainer);
                });
            });
        }

        // Check URL for category parameter
        const urlParams = new URLSearchParams(window.location.search);
        const catParam = urlParams.get('cat');
        if (catParam && filterButtons.length > 0) {
            setActiveFilter(catParam, filterButtons);
            renderFilteredPosts(catParam, blogGrid, paginationContainer);
        } else if (blogGrid) {
            // Initial render
            if (BlogData.isLoadingData()) {
                BlogRenderer.renderSkeletons(blogGrid, 6);
                document.addEventListener('blogDataLoaded', () => {
                    renderFilteredPosts(currentCategory, blogGrid, paginationContainer);
                });
            } else {
                renderFilteredPosts(currentCategory, blogGrid, paginationContainer);
            }
        }

        // Handle category page initialization
        initCategoryPage();
    }

    function setActiveFilter(category, buttons) {
        buttons.forEach(btn => {
            if (btn.dataset.category === category) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    function filterByCategory(category, buttons, grid, pagination) {
        currentCategory = category;
        currentPage = 1;
        setActiveFilter(category, buttons);
        renderFilteredPosts(category, grid, pagination);

        // Update URL
        if (category && category !== 'all') {
            window.history.pushState({}, '', `?cat=${category}`);
        } else {
            window.history.pushState({}, '', window.location.pathname);
        }
    }

    function renderFilteredPosts(category, grid, pagination) {
        if (!grid) return;

        // Show loading state
        BlogRenderer.renderSkeletons(grid, 6);

        setTimeout(() => {
            const filtered = BlogData.getBlogsByCategory(category);
            
            // For pagination
            const start = (currentPage - 1) * perPage;
            const end = start + perPage;
            const pagePosts = filtered.slice(start, end);
            const totalPages = Math.ceil(filtered.length / perPage);

            BlogRenderer.renderBlogGrid(grid, pagePosts);

            if (pagination) {
                BlogRenderer.renderPagination(pagination, currentPage, totalPages, window.location.pathname + (category !== 'all' ? `?cat=${category}` : ''));
            }

            // Update results count
            const countDisplay = document.getElementById('filterCount');
            if (countDisplay) {
                countDisplay.textContent = filtered.length;
            }
        }, 200);
    }

    function initCategoryPage() {
        // Handle category page specifically
        const categoryGrid = document.getElementById('categoryGrid');
        const filterContainer = document.getElementById('categoryFilter');

        if (categoryGrid) {
            if (BlogData.isLoadingData()) {
                BlogRenderer.renderSkeletons(categoryGrid, 6);
                document.addEventListener('blogDataLoaded', () => {
                    const cats = BlogData.getCategories();
                    BlogRenderer.renderCategories(categoryGrid, cats);
                });
            } else {
                const cats = BlogData.getCategories();
                BlogRenderer.renderCategories(categoryGrid, cats);
            }
        }

        // Category filter tabs on categories page
        if (filterContainer) {
            const urlParams = new URLSearchParams(window.location.search);
            const activeCat = urlParams.get('cat') || 'all';

            // Build filter buttons
            const allCategories = BlogData.getCategories();
            let filterHTML = `<button class="filter-btn ${activeCat === 'all' ? 'active' : ''}" data-category="all">All</button>`;
            allCategories.forEach(cat => {
                filterHTML += `<button class="filter-btn ${activeCat === cat.id ? 'active' : ''}" data-category="${cat.id}">${cat.name}</button>`;
            });
            filterContainer.innerHTML = filterHTML;

            // Initialize filter for this page
            const blogGrid = document.getElementById('categoryBlogGrid');
            const pagination = document.getElementById('categoryPagination');
            
            filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const category = this.dataset.category;
                    currentCategory = category;
                    currentPage = 1;
                    filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');

                    if (blogGrid) {
                        renderFilteredPosts(category, blogGrid, pagination);
                    }

                    // Update URL
                    if (category && category !== 'all') {
                        window.history.pushState({}, '', `?cat=${category}`);
                    } else {
                        window.history.pushState({}, '', window.location.pathname);
                    }
                });
            });

            // Initial render for category page
            if (blogGrid) {
                if (BlogData.isLoadingData()) {
                    BlogRenderer.renderSkeletons(blogGrid, 6);
                    document.addEventListener('blogDataLoaded', () => {
                        renderFilteredPosts(activeCat, blogGrid, pagination);
                    });
                } else {
                    renderFilteredPosts(activeCat, blogGrid, pagination);
                }
            }
        }
    }

    function loadMore() {
        currentPage++;
        const grid = document.getElementById('blogGrid');
        const category = currentCategory;
        
        const filtered = BlogData.getBlogsByCategory(category);
        const start = (currentPage - 1) * perPage;
        const end = start + perPage;
        const pagePosts = filtered.slice(start, end);

        if (pagePosts.length > 0) {
            grid.insertAdjacentHTML('beforeend', pagePosts.map(blog => BlogRenderer.createBlogCard(blog)).join(''));
        }

        // Hide load more button if no more posts
        const loadMoreBtn = document.getElementById('loadMore');
        if (loadMoreBtn && end >= filtered.length) {
            loadMoreBtn.style.display = 'none';
        }
    }

    return {
        init,
        filterByCategory,
        renderFilteredPosts,
        loadMore
    };
})();

// Initialize filter when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    BlogFilter.init();
});