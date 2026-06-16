// ============================================
// BLOGIFY - Blog Rendering Module
// ============================================

const BlogRenderer = (function() {
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    function getCategoryBadge(category) {
        const catNames = {
            html: 'HTML',
            css: 'CSS',
            javascript: 'JavaScript',
            react: 'React',
            uiux: 'UI/UX',
            career: 'Career'
        };
        return `<span class="category-badge ${category}">${catNames[category] || category}</span>`;
    }

    function createBlogCard(blog) {
        const author = BlogData.getAuthor(blog.authorId);
        const authorName = author ? author.name : 'Unknown Author';
        const authorInitial = authorName.charAt(0);

        return `
            <article class="blog-card animate-fade-in-up">
                <div class="card-image">
                    <div class="img-placeholder">📝</div>
                    <div class="category-tag">${getCategoryBadge(blog.category)}</div>
                </div>
                <div class="card-content">
                    <div class="card-meta">
                        <span>📅 ${formatDate(blog.date)}</span>
                        <span>📖 ${blog.readTime} min read</span>
                    </div>
                    <h3 class="card-title">
                        <a href="blog.html?slug=${blog.slug}">${blog.title}</a>
                    </h3>
                    <p class="card-excerpt">${blog.excerpt}</p>
                    <div class="card-footer">
                        <div class="card-author">
                            <div class="author-avatar" style="display:flex;align-items:center;justify-content:center;background:var(--primary-color);color:#fff;font-weight:700;font-size:0.8rem;">${authorInitial}</div>
                            <span class="author-name">${authorName}</span>
                        </div>
                        <a href="blog.html?slug=${blog.slug}" class="read-more">
                            Read More →
                        </a>
                    </div>
                </div>
            </article>
        `;
    }

    function createFeaturedCard(blog) {
        const author = BlogData.getAuthor(blog.authorId);
        const authorName = author ? author.name : 'Unknown Author';

        return `
            <div class="featured-card animate-fade-in">
                <div class="featured-image">
                    <div class="img-placeholder" style="height:100%;min-height:400px;">⭐ Featured</div>
                </div>
                <div class="featured-content">
                    <div class="featured-badge">⭐ Featured Article</div>
                    <h2 class="featured-title">${blog.title}</h2>
                    <p class="featured-excerpt">${blog.excerpt}</p>
                    <div class="featured-meta">
                        <span>👤 ${authorName}</span>
                        <span>📅 ${formatDate(blog.date)}</span>
                        <span>📖 ${blog.readTime} min read</span>
                    </div>
                    <a href="blog.html?slug=${blog.slug}" class="btn btn-primary btn-lg">
                        Read Article →
                    </a>
                </div>
            </div>
        `;
    }

    function createTrendingItem(blog, index) {
        return `
            <a href="blog.html?slug=${blog.slug}" class="trending-post">
                <span class="trending-number">${index + 1}</span>
                <div class="trending-content">
                    <h4>${blog.title}</h4>
                    <span class="trending-meta">${blog.readTime} min read · ${blog.likes} likes</span>
                </div>
            </a>
        `;
    }

    function createCategoryCard(category) {
        const icons = {
            html: '🌐',
            css: '🎨',
            javascript: '⚡',
            react: '⚛️',
            uiux: '🎯',
            career: '🚀'
        };

        return `
            <a href="categories.html?cat=${category.id}" class="category-card">
                <span class="category-icon">${icons[category.id] || '📂'}</span>
                <h4>${category.name}</h4>
                <p>${category.description}</p>
                <span class="category-count">${category.count} Articles</span>
            </a>
        `;
    }

    function createAuthorCard(author) {
        const initial = author.name.charAt(0);
        return `
            <div class="author-card">
                <div class="author-card-avatar" style="display:flex;align-items:center;justify-content:center;background:var(--primary-color);color:#fff;font-size:2rem;font-weight:700;">${initial}</div>
                <h4>${author.name}</h4>
                <p class="author-role">${author.role}</p>
                <p>${author.bio}</p>
            </div>
        `;
    }

    function renderBlogGrid(container, blogs) {
        if (!container) return;
        if (blogs.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📭</div>
                    <h3>No Posts Found</h3>
                    <p>We couldn't find any blog posts matching your criteria.</p>
                </div>
            `;
            return;
        }
        container.innerHTML = blogs.map(blog => createBlogCard(blog)).join('');
    }

    function renderFeatured(container, blogs) {
        if (!container || blogs.length === 0) return;
        container.innerHTML = blogs.map(blog => createFeaturedCard(blog)).join('');
    }

    function renderTrending(container, blogs) {
        if (!container || blogs.length === 0) return;
        container.innerHTML = blogs.map((blog, index) => createTrendingItem(blog, index)).join('');

        // Also render in sidebar if exists
        const sidebarTrending = document.getElementById('sidebarTrending');
        if (sidebarTrending) {
            sidebarTrending.innerHTML = blogs.slice(0, 5).map((blog, index) => createTrendingItem(blog, index)).join('');
        }
    }

    function renderCategories(container, cats) {
        if (!container || cats.length === 0) return;
        container.innerHTML = cats.map(cat => createCategoryCard(cat)).join('');
    }

    function renderAuthors(container, authors) {
        if (!container || authors.length === 0) return;
        container.innerHTML = authors.map(author => createAuthorCard(author)).join('');
    }

    function renderBlogPost(slug) {
        const blog = BlogData.getBlogBySlug(slug);
        if (!blog) {
            const container = document.getElementById('blogContent');
            if (container) {
                container.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-state-icon">🔍</div>
                        <h3>Post Not Found</h3>
                        <p>The blog post you're looking for doesn't exist.</p>
                        <a href="index.html" class="btn btn-primary mt-2">Back to Home</a>
                    </div>
                `;
            }
            return;
        }

        const author = BlogData.getAuthor(blog.authorId);
        const authorName = author ? author.name : 'Unknown Author';
        const authorRole = author ? author.role : '';
        const authorInitial = authorName.charAt(0);

        // Convert markdown-like content to HTML
        const contentHtml = formatContent(blog.content);

        const html = `
            <article class="blog-post">
                <h1 class="post-title">${blog.title}</h1>
                
                <div class="post-meta">
                    <div class="author-info">
                        <div class="post-author-avatar" style="display:flex;align-items:center;justify-content:center;background:var(--primary-color);color:#fff;font-weight:700;width:50px;height:50px;border-radius:50%;font-size:1.2rem;">${authorInitial}</div>
                        <div>
                            <strong>${authorName}</strong>
                            <span>${authorRole}</span>
                        </div>
                    </div>
                    <div class="post-stats">
                        <span>📅 ${formatDate(blog.date)}</span>
                        <span>📖 ${blog.readTime} min read</span>
                        <span>❤️ ${blog.likes} likes</span>
                    </div>
                </div>

                ${getCategoryBadge(blog.category)}

                <div class="post-content">
                    ${contentHtml}
                </div>

                <div class="interaction-bar">
                    <button class="interaction-btn like-btn" onclick="toggleLike(this)">
                        ❤️ <span>${blog.likes}</span>
                    </button>
                    <button class="interaction-btn bookmark-btn" onclick="toggleBookmark(this)">
                        🔖 <span>Bookmark</span>
                    </button>
                    <button class="interaction-btn" onclick="sharePost()">
                        🔗 <span>Share</span>
                    </button>
                </div>

                <div class="share-buttons">
                    <button class="share-btn" onclick="shareOnTwitter('${blog.title}')" style="background:#1DA1F2;color:#fff;" title="Share on Twitter">🐦</button>
                    <button class="share-btn" onclick="shareOnFacebook('${blog.title}')" style="background:#4267B2;color:#fff;" title="Share on Facebook">📘</button>
                    <button class="share-btn" onclick="shareOnLinkedIn('${blog.title}')" style="background:#0077B5;color:#fff;" title="Share on LinkedIn">🔗</button>
                </div>
            </article>

            <!-- Author Section -->
            <div class="featured-author">
                <div class="featured-author-img" style="display:flex;align-items:center;justify-content:center;background:var(--primary-color);color:#fff;font-size:2.5rem;font-weight:700;">${authorInitial}</div>
                <div class="featured-author-info">
                    <h3>${authorName}</h3>
                    <p class="author-role">${authorRole}</p>
                    <p>${author ? author.bio : ''}</p>
                </div>
            </div>

            <!-- Related Articles -->
            <div class="related-articles">
                <h3>📚 Related Articles</h3>
                <div class="blog-grid" id="relatedBlogs"></div>
            </div>

            <!-- Comments Section -->
            <div class="comments-section">
                <h3>💬 Comments</h3>
                <div id="commentsList">
                    <div class="comment">
                        <div class="comment-avatar" style="background:var(--primary-color);color:#fff;">JD</div>
                        <div class="comment-body">
                            <h4>Jane Doe</h4>
                            <p class="comment-date">${formatDate(new Date().toISOString())}</p>
                            <p>Great article! This really helped me understand the concept better. Keep up the good work! 👍</p>
                        </div>
                    </div>
                    <div class="comment">
                        <div class="comment-avatar" style="background:var(--secondary-color);color:#fff;">MS</div>
                        <div class="comment-body">
                            <h4>Mike Smith</h4>
                            <p class="comment-date">${formatDate(new Date(Date.now() - 86400000).toISOString())}</p>
                            <p>Excellent explanation with practical examples. Looking forward to more content like this!</p>
                        </div>
                    </div>
                </div>
                <div class="comment-form">
                    <h4>Leave a Comment</h4>
                    <textarea placeholder="Share your thoughts..." id="commentInput"></textarea>
                    <button class="btn btn-primary mt-1" onclick="submitComment()">Post Comment</button>
                </div>
            </div>
        `;

        const container = document.getElementById('blogContent');
        if (container) {
            container.innerHTML = html;
        }

        // Set page title
        document.title = `${blog.title} - Blogify`;

        // Render related blogs
        const related = BlogData.getRelatedBlogs(blog.id);
        const relatedContainer = document.getElementById('relatedBlogs');
        if (relatedContainer) {
            renderBlogGrid(relatedContainer, related);
        }
    }

    function formatContent(content) {
        // Convert markdown-like syntax to HTML
        let html = content;

        // Code blocks
        html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>');

        // Inline code
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

        // Headings (## and ###)
        html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
        html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');

        // Bold
        html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

        // Lists
        html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');

        // Numbered lists
        html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

        // Paragraphs (double newlines)
        html = html.replace(/\n\n/g, '</p><p>');

        // Wrap in paragraphs
        if (!html.startsWith('<')) {
            html = '<p>' + html + '</p>';
        }

        // Clean up empty paragraphs
        html = html.replace(/<p><\/p>/g, '');

        return html;
    }

    function renderPagination(container, currentPage, totalPages, baseUrl) {
        if (!container || totalPages <= 1) return;
        
        let html = '<div class="pagination">';
        
        if (currentPage > 1) {
            html += `<a href="${baseUrl}?page=${currentPage - 1}">‹</a>`;
        }
        
        for (let i = 1; i <= totalPages; i++) {
            if (i === currentPage) {
                html += `<a href="${baseUrl}?page=${i}" class="active">${i}</a>`;
            } else {
                html += `<a href="${baseUrl}?page=${i}">${i}</a>`;
            }
        }
        
        if (currentPage < totalPages) {
            html += `<a href="${baseUrl}?page=${currentPage + 1}">›</a>`;
        }
        
        html += '</div>';
        container.innerHTML = html;
    }

    function renderSkeletons(container, count = 6) {
        if (!container) return;
        let html = '';
        for (let i = 0; i < count; i++) {
            html += `
                <div class="blog-card">
                    <div class="skeleton skeleton-image"></div>
                    <div class="card-content">
                        <div class="skeleton skeleton-text-short"></div>
                        <div class="skeleton skeleton-title"></div>
                        <div class="skeleton skeleton-text"></div>
                        <div class="skeleton skeleton-text"></div>
                        <div style="margin-top:1rem;">
                            <div class="skeleton skeleton-text-short"></div>
                        </div>
                    </div>
                </div>
            `;
        }
        container.innerHTML = html;
    }

    return {
        createBlogCard,
        createFeaturedCard,
        createTrendingItem,
        createCategoryCard,
        createAuthorCard,
        renderBlogGrid,
        renderFeatured,
        renderTrending,
        renderCategories,
        renderAuthors,
        renderBlogPost,
        renderPagination,
        renderSkeletons,
        formatDate
    };
})();

// Global helpers for blog page interactions
function toggleLike(btn) {
    const span = btn.querySelector('span');
    if (btn.classList.toggle('liked')) {
        span.textContent = parseInt(span.textContent) + 1;
        showToast('You liked this article! ❤️');
    } else {
        span.textContent = parseInt(span.textContent) - 1;
    }
}

function toggleBookmark(btn) {
    if (btn.classList.toggle('bookmarked')) {
        btn.querySelector('span').textContent = 'Bookmarked';
        showToast('Article bookmarked! 🔖');
    } else {
        btn.querySelector('span').textContent = 'Bookmark';
        showToast('Bookmark removed');
    }
}

function sharePost() {
    if (navigator.share) {
        navigator.share({
            title: document.title,
            url: window.location.href
        }).catch(() => {});
    } else {
        navigator.clipboard.writeText(window.location.href).then(() => {
            showToast('Link copied to clipboard! 🔗');
        });
    }
}

function shareOnTwitter(title) {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'width=600,height=400');
}

function shareOnFacebook(title) {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'width=600,height=400');
}

function shareOnLinkedIn(title) {
    const url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(title)}`;
    window.open(url, '_blank', 'width=600,height=400');
}

function submitComment() {
    const input = document.getElementById('commentInput');
    if (!input || !input.value.trim()) {
        showToast('Please write a comment first');
        return;
    }
    const commentsList = document.getElementById('commentsList');
    const newComment = document.createElement('div');
    newComment.className = 'comment animate-fade-in';
    newComment.innerHTML = `
        <div class="comment-avatar" style="background:var(--primary-color);color:#fff;">You</div>
        <div class="comment-body">
            <h4>You</h4>
            <p class="comment-date">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p>${input.value.trim()}</p>
        </div>
    `;
    commentsList.prepend(newComment);
    input.value = '';
    showToast('Comment posted! 💬');
}

function showToast(message) {
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