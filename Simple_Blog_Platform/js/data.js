// ============================================
// BLOGIFY - Data Loader
// ============================================

const BlogData = (function() {
    let blogs = [];
    let authors = [];
    let categories = [];
    let featured = { featured: [], trending: [] };
    let isLoading = true;
    let dataLoaded = false;

    async function loadData() {
        try {
            const [blogsRes, authorsRes, categoriesRes, featuredRes] = await Promise.all([
                fetch('data/blogs.json'),
                fetch('data/authors.json'),
                fetch('data/categories.json'),
                fetch('data/featured.json')
            ]);

            blogs = await blogsRes.json();
            authors = await authorsRes.json();
            categories = await categoriesRes.json();
            featured = await featuredRes.json();
            isLoading = false;
            dataLoaded = true;

            // Dispatch event when data is loaded
            document.dispatchEvent(new CustomEvent('blogDataLoaded', {
                detail: { blogs, authors, categories, featured }
            }));

        } catch (error) {
            console.error('Error loading blog data:', error);
            isLoading = false;
            // Try loading from inline data as fallback
            loadFallbackData();
        }
    }

    function loadFallbackData() {
        // If JSON files fail to load, data will be provided inline
        console.warn('Using inline fallback data');
        document.dispatchEvent(new CustomEvent('blogDataLoaded', {
            detail: { blogs: [], authors: [], categories: [], featured: { featured: [], trending: [] } }
        }));
    }

    function getBlogs() {
        return blogs;
    }

    function getBlogById(id) {
        return blogs.find(blog => blog.id === id);
    }

    function getBlogBySlug(slug) {
        return blogs.find(blog => blog.slug === slug);
    }

    function getFeaturedBlogs() {
        return blogs.filter(blog => featured.featured.includes(blog.id));
    }

    function getTrendingBlogs() {
        return blogs.filter(blog => featured.trending.includes(blog.id));
    }

    function getBlogsByCategory(categoryId) {
        if (!categoryId || categoryId === 'all') return blogs;
        return blogs.filter(blog => blog.category === categoryId);
    }

    function searchBlogs(query) {
        const q = query.toLowerCase().trim();
        if (!q) return blogs;
        return blogs.filter(blog =>
            blog.title.toLowerCase().includes(q) ||
            blog.excerpt.toLowerCase().includes(q) ||
            blog.category.toLowerCase().includes(q) ||
            (blog.content && blog.content.toLowerCase().includes(q))
        );
    }

    function getAuthor(authorId) {
        return authors.find(author => author.id === authorId);
    }

    function getAuthors() {
        return authors;
    }

    function getCategories() {
        return categories;
    }

    function getRelatedBlogs(blogId, limit = 3) {
        const blog = getBlogById(blogId);
        if (!blog) return [];
        return blogs
            .filter(b => b.id !== blogId && b.category === blog.category)
            .slice(0, limit);
    }

    function getLatestBlogs(limit = 6) {
        return [...blogs]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, limit);
    }

    function getBlogsByPage(page = 1, perPage = 9) {
        const start = (page - 1) * perPage;
        const end = start + perPage;
        return {
            blogs: blogs.slice(start, end),
            total: blogs.length,
            pages: Math.ceil(blogs.length / perPage),
            currentPage: page
        };
    }

    function isLoadingData() {
        return isLoading;
    }

    function isDataLoaded() {
        return dataLoaded;
    }

    // Initialize by loading data
    loadData();

    return {
        getBlogs,
        getBlogById,
        getBlogBySlug,
        getFeaturedBlogs,
        getTrendingBlogs,
        getBlogsByCategory,
        searchBlogs,
        getAuthor,
        getAuthors,
        getCategories,
        getRelatedBlogs,
        getLatestBlogs,
        getBlogsByPage,
        isLoadingData,
        isDataLoaded
    };
})();