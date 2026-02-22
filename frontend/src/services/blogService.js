import apiService, { API_ENDPOINTS } from './apiService';

/**
 * Blog Service
 * Manage blog posts and content
 */

const USE_MOCK_DATA = true; // Set to false when backend is ready

// Mock blog data
const mockBlogPosts = [
    {
        id: 'blog-1',
        slug: 'top-10-wedding-tent-styles-2024',
        title: 'Top 10 Wedding Tent Styles for 2024',
        excerpt: 'Discover the most popular wedding tent styles that are trending this year. From classic pole tents to modern clearspan structures.',
        content: 'Full blog post content here...',
        category: 'Weddings',
        author: 'Sarah Johnson',
        authorImage: null,
        publishedDate: '2024-01-15',
        updatedDate: '2024-01-15',
        featured: true,
        image: '/images/EventsProductPictures/Tents/White Frame Tents, Hip End/White_Frame_Tent_Hip_End.jpg',
        tags: ['weddings', 'tents', 'trends'],
    },
    {
        id: 'blog-2',
        slug: 'planning-perfect-outdoor-corporate-event',
        title: 'Planning the Perfect Outdoor Corporate Event',
        excerpt: 'Essential tips and tricks for organizing successful outdoor corporate events that impress clients and employees alike.',
        content: 'Full blog post content here...',
        category: 'Corporate Events',
        author: 'Michael Chen',
        authorImage: null,
        publishedDate: '2024-02-10',
        updatedDate: '2024-02-10',
        featured: true,
        image: '/images/EventsProductPictures/Tents/High Peak Pole Tents/High_Peak_Pole_Tent.jpg',
        tags: ['corporate', 'outdoor', 'planning'],
    },
    {
        id: 'blog-3',
        slug: 'choosing-right-chairs-for-your-event',
        title: 'Choosing the Right Chairs for Your Event',
        excerpt: 'A comprehensive guide to selecting the perfect seating options for any type of event, from weddings to conferences.',
        content: 'Full blog post content here...',
        category: 'Event Planning',
        author: 'Emily Rodriguez',
        authorImage: null,
        publishedDate: '2024-03-05',
        updatedDate: '2024-03-05',
        featured: false,
        image: '/images/EventsProductPictures/TablesChairsBars/chair/gold_chiavari_rental-300x300.jpg',
        tags: ['chairs', 'seating', 'planning'],
    },
];

const blogService = {
    /**
     * Get all blog posts
     * @param {Object} options - Query options
     * @param {number} options.limit - Number of posts to return
     * @param {number} options.offset - Offset for pagination
     * @returns {Promise<Object>} Blog posts with pagination info
     */
    getAllBlogPosts: async (options = {}) => {
        try {
            if (USE_MOCK_DATA) {
                const { limit = 10, offset = 0 } = options;
                const posts = mockBlogPosts.slice(offset, offset + limit);

                return Promise.resolve({
                    posts,
                    total: mockBlogPosts.length,
                    limit,
                    offset,
                    hasMore: offset + limit < mockBlogPosts.length,
                });
            }
            return await apiService.get(API_ENDPOINTS.BLOG_POSTS, { params: options });
        } catch (error) {
            console.error('Error fetching blog posts:', error);
            return { posts: mockBlogPosts, total: mockBlogPosts.length };
        }
    },

    /**
     * Get blog post by slug
     * @param {string} slug - Post slug
     * @returns {Promise<Object|null>} Blog post or null
     */
    getBlogPostBySlug: async (slug) => {
        try {
            if (USE_MOCK_DATA) {
                const post = mockBlogPosts.find(p => p.slug === slug);
                return Promise.resolve(post || null);
            }
            return await apiService.get(API_ENDPOINTS.BLOG_POST_BY_SLUG(slug));
        } catch (error) {
            console.error('Error fetching blog post:', error);
            return null;
        }
    },

    /**
     * Get blog posts by category
     * @param {string} category - Category name
     * @returns {Promise<Array>} Filtered blog posts
     */
    getBlogPostsByCategory: async (category) => {
        try {
            if (USE_MOCK_DATA) {
                const filtered = mockBlogPosts.filter(p => p.category === category);
                return Promise.resolve(filtered);
            }
            return await apiService.get(API_ENDPOINTS.BLOG_BY_CATEGORY(category));
        } catch (error) {
            console.error('Error fetching blog posts by category:', error);
            return [];
        }
    },

    /**
     * Search blog posts
     * @param {string} query - Search query
     * @returns {Promise<Array>} Matching blog posts
     */
    searchBlogPosts: async (query) => {
        try {
            if (USE_MOCK_DATA) {
                const lowerQuery = query.toLowerCase();
                const results = mockBlogPosts.filter(
                    post =>
                        post.title.toLowerCase().includes(lowerQuery) ||
                        post.excerpt.toLowerCase().includes(lowerQuery) ||
                        post.content.toLowerCase().includes(lowerQuery) ||
                        post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
                );
                return Promise.resolve(results);
            }
            return await apiService.get(`${API_ENDPOINTS.BLOG_POSTS}/search`, {
                params: { q: query },
            });
        } catch (error) {
            console.error('Error searching blog posts:', error);
            return [];
        }
    },

    /**
     * Get recent blog posts
     * @param {number} limit - Number of posts to return
     * @returns {Promise<Array>} Recent blog posts
     */
    getRecentPosts: async (limit = 5) => {
        try {
            if (USE_MOCK_DATA) {
                const sorted = [...mockBlogPosts].sort(
                    (a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)
                );
                return Promise.resolve(sorted.slice(0, limit));
            }
            return await apiService.get(`${API_ENDPOINTS.BLOG_POSTS}/recent`, {
                params: { limit },
            });
        } catch (error) {
            console.error('Error fetching recent posts:', error);
            return [];
        }
    },

    /**
     * Get featured blog posts
     * @param {number} limit - Number of posts to return
     * @returns {Promise<Array>} Featured blog posts
     */
    getFeaturedPosts: async (limit = 3) => {
        try {
            if (USE_MOCK_DATA) {
                const featured = mockBlogPosts
                    .filter(p => p.featured)
                    .slice(0, limit);
                return Promise.resolve(featured);
            }
            return await apiService.get(`${API_ENDPOINTS.BLOG_POSTS}/featured`, {
                params: { limit },
            });
        } catch (error) {
            console.error('Error fetching featured posts:', error);
            return [];
        }
    },

    /**
     * Get blog categories
     * @returns {Promise<Array>} Array of category names
     */
    getBlogCategories: async () => {
        try {
            if (USE_MOCK_DATA) {
                const categories = [...new Set(mockBlogPosts.map(p => p.category))];
                return Promise.resolve(categories);
            }
            return await apiService.get(`${API_ENDPOINTS.BLOG_POSTS}/categories`);
        } catch (error) {
            console.error('Error fetching blog categories:', error);
            return [];
        }
    },

    /**
     * Get blog tags
     * @returns {Promise<Array>} Array of tag names
     */
    getBlogTags: async () => {
        try {
            if (USE_MOCK_DATA) {
                const allTags = mockBlogPosts.flatMap(p => p.tags);
                const uniqueTags = [...new Set(allTags)];
                return Promise.resolve(uniqueTags);
            }
            return await apiService.get(`${API_ENDPOINTS.BLOG_POSTS}/tags`);
        } catch (error) {
            console.error('Error fetching blog tags:', error);
            return [];
        }
    },

    /**
     * Get posts by tag
     * @param {string} tag - Tag name
     * @returns {Promise<Array>} Blog posts with the tag
     */
    getPostsByTag: async (tag) => {
        try {
            if (USE_MOCK_DATA) {
                const filtered = mockBlogPosts.filter(p =>
                    p.tags.some(t => t.toLowerCase() === tag.toLowerCase())
                );
                return Promise.resolve(filtered);
            }
            return await apiService.get(`${API_ENDPOINTS.BLOG_POSTS}/tag/${tag}`);
        } catch (error) {
            console.error('Error fetching posts by tag:', error);
            return [];
        }
    },

    /**
     * Get related posts
     * @param {string} postSlug - Current post slug
     * @param {number} limit - Number of related posts
     * @returns {Promise<Array>} Related blog posts
     */
    getRelatedPosts: async (postSlug, limit = 3) => {
        try {
            if (USE_MOCK_DATA) {
                const currentPost = mockBlogPosts.find(p => p.slug === postSlug);
                if (!currentPost) return Promise.resolve([]);

                // Find posts with matching category or tags
                const related = mockBlogPosts
                    .filter(p => p.slug !== postSlug)
                    .filter(
                        p =>
                            p.category === currentPost.category ||
                            p.tags.some(tag => currentPost.tags.includes(tag))
                    )
                    .slice(0, limit);

                return Promise.resolve(related);
            }
            return await apiService.get(
                `${API_ENDPOINTS.BLOG_POST_BY_SLUG(postSlug)}/related`,
                { params: { limit } }
            );
        } catch (error) {
            console.error('Error fetching related posts:', error);
            return [];
        }
    },
};

export default blogService;
