import apiService, { API_ENDPOINTS } from './apiService';

/**
 * Gallery Service
 * Manage gallery images and categories
 */

const USE_MOCK_DATA = true; // Set to false when backend is ready

// Mock gallery data
const mockGalleryData = {
    categories: [
        'Weddings',
        'Corporate Events',
        'Birthday Parties',
        'Outdoor Events',
        'Tents & Structures',
        'Table Settings',
        'Decor',
        'All',
    ],
    images: [
        // Archways & Arbors - Perfect for Weddings
        {
            id: 'gallery-1',
            url: '/EventsProductPictures/ArchwaysArbors/Black_Iron_Archway.jpg',
            category: 'wedding',
            title: 'Black Iron Archway',
            description: 'Elegant black iron archway for ceremonies',
            event_type: 'Wedding Ceremony'
        },
        {
            id: 'gallery-2',
            url: '/EventsProductPictures/ArchwaysArbors/Iron_Garden_Gate_Archway_Antique_White.jpg',
            category: 'wedding',
            title: 'Antique White Garden Gate',
            description: 'Romantic antique white iron garden gate archway',
            event_type: 'Wedding Ceremony'
        },
        {
            id: 'gallery-3',
            url: '/EventsProductPictures/ArchwaysArbors/Heart_Shaped_Iron_Bench_Amore.jpg',
            category: 'wedding',
            title: 'Heart Shaped Bench',
            description: 'Charming heart-shaped iron bench',
            event_type: 'Wedding Photo Op'
        },
        {
            id: 'gallery-4',
            url: '/EventsProductPictures/ArchwaysArbors/Empire_Columns_Rental.jpg',
            category: 'wedding',
            title: 'Empire Columns',
            description: 'Classic empire columns for grand entrances',
            event_type: 'Wedding Decor'
        },
        {
            id: 'gallery-5',
            url: '/EventsProductPictures/ArchwaysArbors/Four_Column_Colonnade.jpg',
            category: 'wedding',
            title: 'Four Column Colonnade',
            description: 'Stunning four-column colonnade setup',
            event_type: 'Wedding Ceremony'
        },
        {
            id: 'gallery-6',
            url: '/EventsProductPictures/ArchwaysArbors/Four_Column_Colonnade1.jpg',
            category: 'wedding',
            title: 'Four Column Colonnade Setup',
            description: 'Beautiful colonnade arrangement',
            event_type: 'Wedding Ceremony'
        },

        // Bars - Great for Corporate & Weddings
        {
            id: 'gallery-7',
            url: '/EventsProductPictures/Bars/Goldie_Bar_6ft.jpg',
            category: 'corporate',
            title: 'Goldie Bar 6ft',
            description: 'Luxurious gold-accented bar',
            event_type: 'Corporate Event'
        },
        {
            id: 'gallery-8',
            url: '/EventsProductPictures/Bars/Winston_Bar_7ft.jpg',
            category: 'corporate',
            title: 'Winston Bar 7ft',
            description: 'Sophisticated Winston bar setup',
            event_type: 'Corporate Reception'
        },
        {
            id: 'gallery-9',
            url: '/EventsProductPictures/Bars/Black_Bar.jpg',
            category: 'corporate',
            title: 'Modern Black Bar',
            description: 'Sleek modern black bar',
            event_type: 'Corporate Cocktail Hour'
        },
        {
            id: 'gallery-10',
            url: '/EventsProductPictures/Bars/Mahogany_Wood_Bar.jpg',
            category: 'wedding',
            title: 'Mahogany Wood Bar',
            description: 'Classic mahogany wood bar',
            event_type: 'Wedding Reception'
        },
        {
            id: 'gallery-11',
            url: '/EventsProductPictures/Bars/Bar_Hard_Rock_Maple.jpg',
            category: 'wedding',
            title: 'Hard Rock Maple Bar',
            description: 'Beautiful hard rock maple bar',
            event_type: 'Wedding Reception'
        },
        {
            id: 'gallery-12',
            url: '/EventsProductPictures/Bars/Black_Montgomery_Bar_Quarter_Round_68.5.jpg',
            category: 'corporate',
            title: 'Black Montgomery Bar',
            description: 'Elegant black Montgomery bar',
            event_type: 'Corporate Event'
        },

        // Catering Equipment
        {
            id: 'gallery-13',
            url: '/EventsProductPictures/CateringEquipment/Chafer_8qt_Wrought_Iron4.jpg',
            category: 'corporate',
            title: 'Wrought Iron Chafer',
            description: 'Elegant 8qt wrought iron chafer',
            event_type: 'Corporate Buffet'
        },
        {
            id: 'gallery-14',
            url: '/EventsProductPictures/CateringEquipment/55_cup_coffee_urn_rental.jpg',
            category: 'corporate',
            title: 'Coffee Urn',
            description: '55-cup coffee urn for large events',
            event_type: 'Corporate Meeting'
        },
        {
            id: 'gallery-15',
            url: '/EventsProductPictures/CateringEquipment/Chafer_Silver_5qt_Round copy.jpg',
            category: 'wedding',
            title: 'Silver Round Chafer',
            description: '5qt silver round chafer',
            event_type: 'Wedding Reception'
        },

        // Rustic & Handcrafted Items
        {
            id: 'gallery-16',
            url: '/EventsProductPictures/RusticHandcrafted/Rustic_Wooden_Bar.jpg',
            category: 'wedding',
            title: 'Rustic Wooden Bar',
            description: 'Beautiful rustic wooden bar',
            event_type: 'Rustic Wedding'
        },
        {
            id: 'gallery-17',
            url: '/EventsProductPictures/RusticHandcrafted/crossbackchair.jpg',
            category: 'wedding',
            title: 'Cross Back Chair',
            description: 'Elegant cross back chairs',
            event_type: 'Rustic Wedding'
        },
        {
            id: 'gallery-18',
            url: '/EventsProductPictures/RusticHandcrafted/wine_barrel.jpg',
            category: 'wedding',
            title: 'Wine Barrel',
            description: 'Authentic wine barrel decor',
            event_type: 'Rustic Wedding'
        },
        {
            id: 'gallery-19',
            url: '/EventsProductPictures/RusticHandcrafted/peacockchairrental.jpg',
            category: 'wedding',
            title: 'Peacock Chair',
            description: 'Stunning peacock chair',
            event_type: 'Boho Wedding'
        },
        {
            id: 'gallery-20',
            url: '/EventsProductPictures/RusticHandcrafted/White_Panel_Bar.jpg',
            category: 'wedding',
            title: 'White Panel Bar',
            description: 'Elegant white panel bar',
            event_type: 'Wedding Reception'
        },
        {
            id: 'gallery-21',
            url: '/EventsProductPictures/RusticHandcrafted/Chesapeake_Groove_Bar.jpg',
            category: 'corporate',
            title: 'Chesapeake Groove Bar',
            description: 'Stylish Chesapeake groove bar',
            event_type: 'Corporate Event'
        },

        // Staging
        {
            id: 'gallery-22',
            url: '/EventsProductPictures/Staging/Stage_Platform_4x4_Section.jpg',
            category: 'corporate',
            title: 'Stage Platform',
            description: '4x4 stage platform section',
            event_type: 'Corporate Presentation'
        },
        {
            id: 'gallery-23',
            url: '/EventsProductPictures/Staging/Tiered_Stage_With_Guard_Rails.jpg',
            category: 'corporate',
            title: 'Tiered Stage',
            description: 'Professional tiered stage with guard rails',
            event_type: 'Corporate Event'
        },
        {
            id: 'gallery-24',
            url: '/EventsProductPictures/Staging/Staging_with_Skirting.jpg',
            category: 'corporate',
            title: 'Stage with Skirting',
            description: 'Professional stage with elegant skirting',
            event_type: 'Corporate Event'
        },
        {
            id: 'gallery-25',
            url: '/EventsProductPictures/Staging/Portable_Three_Tier_Choral_Riser_System.jpg',
            category: 'corporate',
            title: 'Choral Riser System',
            description: 'Three-tier portable choral riser',
            event_type: 'Corporate Performance'
        },

        // Heating & Cooling
        {
            id: 'gallery-26',
            url: '/EventsProductPictures/HeatingCooling/patio_heater.jpg',
            category: 'wedding',
            title: 'Patio Heater',
            description: 'Outdoor patio heater',
            event_type: 'Outdoor Wedding'
        },
        {
            id: 'gallery-27',
            url: '/EventsProductPictures/HeatingCooling/80kbtu_tent_heater.jpg',
            category: 'corporate',
            title: 'Tent Heater',
            description: '80K BTU tent heater',
            event_type: 'Outdoor Corporate Event'
        },
        {
            id: 'gallery-28',
            url: '/EventsProductPictures/HeatingCooling/whitemarketumbrella.jpeg',
            category: 'wedding',
            title: 'White Market Umbrella',
            description: 'Elegant white market umbrella',
            event_type: 'Outdoor Wedding'
        },

        // Audio & Projection
        {
            id: 'gallery-29',
            url: '/EventsProductPictures/Audio&Projection/Speaker_QSC_K12_1000W.jpg',
            category: 'corporate',
            title: 'QSC K12 Speaker',
            description: '1000W professional speaker',
            event_type: 'Corporate Event'
        },
        {
            id: 'gallery-30',
            url: '/EventsProductPictures/Audio&Projection/Projector_Screen.jpg',
            category: 'corporate',
            title: 'Projector Screen',
            description: 'Professional projector screen',
            event_type: 'Corporate Presentation'
        },
        {
            id: 'gallery-31',
            url: '/EventsProductPictures/Audio&Projection/PA_System_150W_Portable.jpg',
            category: 'corporate',
            title: 'Portable PA System',
            description: '150W portable PA system',
            event_type: 'Corporate Event'
        },
        {
            id: 'gallery-32',
            url: '/EventsProductPictures/Audio&Projection/Microphone_Wireless_Handheld_Dual.jpg',
            category: 'corporate',
            title: 'Wireless Microphones',
            description: 'Dual wireless handheld microphones',
            event_type: 'Corporate Event'
        },

        // Birthday Party Themed
        {
            id: 'gallery-33',
            url: '/EventsProductPictures/ThroneKingdom.webp',
            category: 'birthday',
            title: 'Throne Chair',
            description: 'Royal throne chair for special celebrations',
            event_type: 'Birthday Party'
        },

        // Baby Shower Themed
        {
            id: 'gallery-34',
            url: '/EventsProductPictures/pigeon-walks-down-the-aisle-photo-by-lauro-santos-portugal.jpg',
            category: 'baby_shower',
            title: 'Elegant Aisle Setup',
            description: 'Beautiful aisle decoration',
            event_type: 'Baby Shower'
        },

        // Corporate Events
        {
            id: 'gallery-35',
            url: '/EventsProductPictures/Events-Pipe-Drape-Uplight-Furniture-Corporate-Event-1.webp',
            category: 'corporate',
            title: 'Corporate Event Setup',
            description: 'Complete corporate event with pipe & drape, uplighting, and furniture',
            event_type: 'Corporate Event'
        },
        {
            id: 'gallery-36',
            url: '/EventsProductPictures/Community-events.webp',
            category: 'corporate',
            title: 'Community Event',
            description: 'Large-scale community event setup',
            event_type: 'Community Event'
        },

        // Hero Images - Mixed Events
        {
            id: 'gallery-37',
            url: '/EventsProductPictures/Hero Images/rental_events_bars.webp',
            category: 'corporate',
            title: 'Event Bar Setup',
            description: 'Professional bar rental for events',
            event_type: 'Corporate Reception'
        },
        {
            id: 'gallery-38',
            url: '/EventsProductPictures/Hero Images/rental_bars_party.jpg',
            category: 'birthday',
            title: 'Party Bar',
            description: 'Fun party bar setup',
            event_type: 'Birthday Party'
        },
        {
            id: 'gallery-39',
            url: '/EventsProductPictures/Hero Images/pipe-drape-entrance.jpg',
            category: 'wedding',
            title: 'Pipe & Drape Entrance',
            description: 'Elegant pipe and drape entrance',
            event_type: 'Wedding Reception'
        },

        // Wedding Themed
        {
            id: 'gallery-40',
            url: '/EventsProductPictures/wedding-dos-and-donts-jpg.jpg',
            category: 'wedding',
            title: 'Wedding Planning Guide',
            description: 'Professional wedding setup',
            event_type: 'Wedding'
        },
    ],
};

const galleryService = {
    /**
     * Get all gallery images
     * @returns {Promise<Array>} Array of gallery images
     */
    getAllGalleryImages: async () => {
        try {
            if (USE_MOCK_DATA) {
                return Promise.resolve(mockGalleryData.images);
            }
            return await apiService.get(API_ENDPOINTS.GALLERY);
        } catch (error) {
            console.error('Error fetching gallery images:', error);
            return mockGalleryData.images;
        }
    },

    /**
     * Get gallery images by category
     * @param {string} category - Category name
     * @returns {Promise<Array>} Filtered gallery images
     */
    getGalleryByCategory: async (category) => {
        try {
            if (USE_MOCK_DATA) {
                if (category === 'All') {
                    return Promise.resolve(mockGalleryData.images);
                }
                const filtered = mockGalleryData.images.filter(
                    img => img.category === category
                );
                return Promise.resolve(filtered);
            }
            return await apiService.get(API_ENDPOINTS.GALLERY_BY_CATEGORY(category));
        } catch (error) {
            console.error('Error fetching gallery by category:', error);
            return [];
        }
    },

    /**
     * Get available gallery categories
     * @returns {Promise<Array>} Array of category names
     */
    getGalleryCategories: async () => {
        try {
            if (USE_MOCK_DATA) {
                return Promise.resolve(mockGalleryData.categories);
            }
            return await apiService.get(`${API_ENDPOINTS.GALLERY}/categories`);
        } catch (error) {
            console.error('Error fetching gallery categories:', error);
            return mockGalleryData.categories;
        }
    },

    /**
     * Load images from public directory
     * This is a helper function to scan and load images dynamically
     * @param {string} directory - Directory path
     * @returns {Promise<Array>} Array of image paths
     */
    loadImagesFromPublic: async (directory = '/images') => {
        try {
            // This would require backend support to scan directories
            // For now, return mock data
            return Promise.resolve(mockGalleryData.images.map(img => img.url));
        } catch (error) {
            console.error('Error loading images from public:', error);
            return [];
        }
    },

    /**
     * Search gallery images
     * @param {string} query - Search query
     * @returns {Promise<Array>} Matching gallery images
     */
    searchGallery: async (query) => {
        try {
            if (USE_MOCK_DATA) {
                const lowerQuery = query.toLowerCase();
                const results = mockGalleryData.images.filter(
                    img =>
                        img.title.toLowerCase().includes(lowerQuery) ||
                        img.description.toLowerCase().includes(lowerQuery) ||
                        img.category.toLowerCase().includes(lowerQuery)
                );
                return Promise.resolve(results);
            }
            return await apiService.get(`${API_ENDPOINTS.GALLERY}/search`, {
                params: { q: query },
            });
        } catch (error) {
            console.error('Error searching gallery:', error);
            return [];
        }
    },

    /**
     * Get featured gallery images
     * @param {number} limit - Number of images to return
     * @returns {Promise<Array>} Featured gallery images
     */
    getFeaturedImages: async (limit = 6) => {
        try {
            if (USE_MOCK_DATA) {
                return Promise.resolve(mockGalleryData.images.slice(0, limit));
            }
            return await apiService.get(`${API_ENDPOINTS.GALLERY}/featured`, {
                params: { limit },
            });
        } catch (error) {
            console.error('Error fetching featured images:', error);
            return [];
        }
    },
};

export default galleryService;
