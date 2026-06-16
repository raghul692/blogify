// ============================================
// BLOGIFY - Search Module
// ============================================

const BlogSearch = (function() {
    let searchTimeout = null;

    function init() {
        // Setup search form on search page
        const searchForm = document.getElementById('searchForm');
        const searchInput = document.getElementById('searchInput');
        const searchButton = document.getElementById('searchButton');
        const searchResults = document.getElementById('searchResults');

        if (searchForm) {
            searchForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const query = searchInput ? searchInput.value.trim() : '';
                performSearch(query, searchResults);
                // Update URL
                if (query) {
                    window.history.pushState({}, '', `search.html?q=${encodeURIComponent(query)}`);
                }
            });
        }

        // Search input with debounce
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    const query = this.value.trim();
                    if (query.length >= 2 || query.length === 0) {
                        performSearch(query, searchResults);
                    }
                }, 400);
            });
        }

        // Quick search button in navbar
        if (searchButton) {
            searchButton.addEventListener('click', function() {
                const query = searchInput ? searchInput.value.trim() : '';
                if (query) {
                    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
                }
            });
        }

        // Check URL for search query on page load
        const urlParams = new URLSearchParams(window.location.search);
        const queryParam = urlParams.get('q');
        if (queryParam && searchInput) {
            searchInput.value = queryParam;
            if (searchResults) {
                performSearch(queryParam, searchResults);
            }
        }

        // Listen for Enter key on search input (quick search)
        if (searchInput && !searchForm) {
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const query = this.value.trim();
                    if (query) {
                        window.location.href = `search.html?q=${encodeURIComponent(query)}`;
                    }
                }
            });
        }
    }

    function performSearch(query, resultsContainer) {
        if (!resultsContainer) return;

        // Show loading
        resultsContainer.innerHTML = '<div class="spinner"></div>';

        // Use setTimeout to allow spinner to render
        setTimeout(() => {
            const results = BlogData.searchBlogs(query);
            renderResults(results, query, resultsContainer);
        }, 300);
    }

    function renderResults(results, query, container) {
        if (!container) return;

        const resultCount = document.getElementById('resultCount');
        const searchQuery = document.getElementById('searchQuery');

        if (resultCount) {
            resultCount.textContent = results.length;
        }

        if (searchQuery && query) {
            searchQuery.textContent = `"${query}"`;
        }

        if (query) {
            // Show results heading
            const resultsHeading = document.querySelector('.search-results-heading');
            if (resultsHeading) {
                resultsHeading.style.display = 'block';
            }
        }

        if (results.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🔍</div>
                    <h3>No Results Found</h3>
                    <p>We couldn't find any posts matching ${query ? `"${query}"` : 'your search'}.</p>
                    <p style="color:var(--text-muted);font-size:0.9rem;">Try different keywords or browse categories</p>
                    <a href="index.html" class="btn btn-primary mt-2">Browse All Posts</a>
                </div>
            `;
            return;
        }

        container.innerHTML = `<div class="blog-grid">${results.map(blog => BlogRenderer.createBlogCard(blog)).join('')}</div>`;
    }

    function initSearchPage() {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q');
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');

        if (query) {
            if (searchInput) searchInput.value = query;
            if (searchResults) {
                BlogRenderer.renderSkeletons(searchResults, 6);
                // Wait for data to load
                if (BlogData.isLoadingData()) {
                    document.addEventListener('blogDataLoaded', () => {
                        performSearch(query, searchResults);
                    });
                } else {
                    performSearch(query, searchResults);
                }
            }
        }
    }

    return {
        init,
        initSearchPage,
        performSearch
    };
})();

// Initialize search when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    BlogSearch.init();
});