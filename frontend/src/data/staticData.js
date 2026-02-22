// Static site data - no backend required

export const services = [
  {
    id: 'wedding-1',
    name: 'Wedding Decoration',
    category: 'wedding',
    description: 'Transform your special day into a breathtaking celebration with our comprehensive wedding décor services. From elegant floral arrangements to stunning table settings, we create magical atmospheres that reflect your unique love story. Our team works closely with you to understand your vision, whether it\'s a romantic garden wedding, a glamorous ballroom affair, or a rustic barn celebration.',
    short_description: 'Elegant and romantic wedding decorations tailored to your dream day.',
    images: [
      '/wedding.webp',
      '/weding.webp',
      '/web.jpg',
      '/webbbinh.jpg',
      '/wedding-tent-rentals.jpg'
    ],
    starting_price: 2500,
    price_note: 'Starting from $2,500 - Custom quotes available',
    features: [
      'Floral Arrangements',
      'Table Settings',
      'Backdrop Design',
      'Aisle Decoration',
      'Centerpieces',
      'Lighting Design'
    ],
    is_available: true
  },
  // {
  //   id: 'corporate-1',
  //   name: 'Corporate Event Décor',
  //   category: 'corporate',
  //   description: 'Elevate your corporate events with professional décor that impresses clients and motivates teams. We specialize in creating sophisticated environments for conferences, product launches, galas, and team celebrations. Our designs incorporate your brand identity while maintaining an elegant, professional atmosphere.',
  //   short_description: 'Professional décor solutions for impactful corporate events.',
  //   images: [
  //     'https://images.unsplash.com/photo-1758285477208-2300ae0c668d?w=800',
  //     'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'
  //   ],
  //   starting_price: 1500,
  //   price_note: 'Starting from $1,500 - Volume discounts available',
  //   features: [
  //     'Brand Integration',
  //     'Stage Design',
  //     'Networking Lounge Setup',
  //     'Award Ceremony Décor',
  //     'Exhibition Displays',
  //     'Digital Signage Integration'
  //   ],
  //   is_available: true
  // },
  {
    id: 'birthday-1',
    name: 'Birthday Party Decoration',
    category: 'birthday',
    description: 'Make every birthday unforgettable with our creative party decorations. From whimsical children\'s parties to elegant milestone celebrations, we bring your vision to life with custom themes, balloon artistry, and stunning backdrops. Our team creates Instagram-worthy setups that make memories last forever.',
    short_description: 'Fun and creative birthday decorations for all ages.',
    images: [
      '/happy-birthday.webp',
      '/hero-image/andrea-mininni-VLlkOJdzLG0-unsplash.jpg',
      '/birthday.jpg',
      
    ],
    starting_price: 500,
    price_note: 'Packages starting from $500',
    features: [
      'Theme Development',
      'Balloon Arrangements',
      'Photo Backdrops',
      'Table Décor',
      'Cake Display',
      'Party Favors Setup'
    ],
    is_available: true
  },
  {
    id: 'baby-1',
    name: 'Baby Shower Decoration',
    category: 'baby_shower',
    description: 'Welcome the little one in style with our charming baby shower decorations. We create sweet and memorable celebrations with gender-reveal setups, nursery-inspired themes, and delicate color palettes that delight guests and honor parents-to-be.',
    short_description: 'Sweet and memorable baby shower decorations.',
    images: [
      '/baby-shower.webp',
      '/baby-shower2.webp',
      '/baby2.jpg',
      '/baby-1.jpg'
    ],
    starting_price: 400,
    price_note: 'Starting from $400',
    features: [
      'Gender Reveal Setups',
      'Custom Backdrops',
      'Dessert Table Styling',
      'Balloon Garlands',
      'Welcome Signs',
      'Gift Table Décor'
    ],
    is_available: true
  },
  {
    id: 'anniversary-1',
    name: 'Anniversary Celebration Decoration',
    category: 'anniversary',
    description: 'Celebrate years of love with elegant anniversary decorations. Whether it\'s a intimate dinner for two or a grand celebration with family and friends, we create romantic settings that honor your journey together.',
    short_description: 'Romantic anniversary decorations to celebrate your love story.',
    images: [
      '/anniversary.webp',
      '/anavve.jpg',
      '/anv3.jpg'
    ],
    starting_price: 600,
    price_note: 'Starting from $600',
    features: [
      'Romantic Lighting',
      'Floral Centerpieces',
      'Memory Displays',
      'Custom Backdrops',
      'Candlelight Settings',
      'Photo Booth Setup'
    ],
    is_available: true
  },
  {
    id: 'graduation-1',
    name: 'Graduation Party Decoration',
    category: 'graduation',
    description: 'Congratulate your graduate with festive decorations that celebrate their achievement. From high school to doctorate, we create celebratory environments with school colors, achievement displays, and photo-worthy moments.',
    short_description: 'Celebratory decorations for graduation milestones.',
    images: [
      '/gradution.jpg',
    ],
    starting_price: 450,
    price_note: 'Starting from $450',
    features: [
      'School Colors Theme',
      'Achievement Displays',
      'Photo Backdrops',
      'Balloon Arrangements',
      'Centerpieces',
      'Memory Timeline'
    ],
    is_available: true
  }
];

export const rentals = [
  { id: 'chairs-1', name: 'Chiavari Chairs - Gold', category: 'chairs', description: 'Elegant gold Chiavari chairs for weddings and formal events.', short_description: 'Classic gold Chiavari chairs for elegant events.', images: ['https://images.unsplash.com/photo-1680169256615-19edb85cb7db?w=800', 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800'], price_per_day: 8.50, price_per_week: 45.00, quantity_available: 200, min_rental_days: 1, is_available: true },
  { id: 'chairs-2', name: 'Cross-Back Farm Chairs', category: 'chairs', description: 'Rustic wooden chairs for farmhouse and barn weddings.', short_description: 'Rustic wooden cross-back chairs for farm-style events.', images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800'], price_per_day: 10.00, price_per_week: 55.00, quantity_available: 150, min_rental_days: 1, is_available: true },
  { id: 'chairs-3', name: 'The Crown Empress Throne', category: 'chairs', description: 'Regal throne chair for weddings, quinceañeras, and royal-themed events. A stunning statement piece that adds grandeur to your special day.', short_description: 'Regal throne chair for weddings and royal-themed events.', images: ['https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800', 'https://images.unsplash.com/photo-1590650516494-0c8e0a17a4e8?w=800'], price_per_day: 75.00, price_per_week: 350.00, quantity_available: 4, min_rental_days: 1, is_available: true },
  { id: 'tables-1', name: 'Rectangular Banquet Tables', category: 'tables', description: '8-foot banquet tables for seated dinners and buffets.', short_description: '8-foot banquet tables for seated dinners.', images: ['https://images.unsplash.com/photo-1603920354140-cab69c15e672?w=800'], price_per_day: 15.00, price_per_week: 80.00, quantity_available: 50, min_rental_days: 1, is_available: true },
  { id: 'tables-2', name: 'Round Tables - 60 inch', category: 'tables', description: '60-inch round tables for receptions and galas. Seats 8–10 guests.', short_description: '60-inch round tables seating 8-10 guests.', images: ['https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800'], price_per_day: 18.00, price_per_week: 95.00, quantity_available: 40, min_rental_days: 1, is_available: true },
  { id: 'photo-1', name: 'Classic Photo Booth', category: 'photo_booths', description: 'Enclosed photo booth with prints, backdrops, and props.', short_description: 'Classic enclosed photo booth with props and prints.', images: ['https://images.unsplash.com/photo-1766086893043-d38b06175015?w=800'], price_per_day: 350.00, price_per_week: null, quantity_available: 3, min_rental_days: 1, is_available: true },
  { id: 'photo-2', name: '360 Video Booth', category: 'photo_booths', description: '360-degree video booth for social-ready slow-motion clips.', short_description: '360-degree video booth for viral content creation.', images: ['https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800'], price_per_day: 500.00, price_per_week: null, quantity_available: 2, min_rental_days: 1, is_available: true },
  { id: 'catering-1', name: 'Chafing Dish Set', category: 'catering_equipment', description: 'Stainless steel chafing dishes for buffet service.', short_description: 'Stainless steel chafing dishes for buffet service.', images: ['https://images.unsplash.com/photo-1768725847223-8407142e653a?w=800'], price_per_day: 25.00, price_per_week: 120.00, quantity_available: 30, min_rental_days: 1, is_available: true },
  { id: 'catering-2', name: 'Beverage Dispenser Tower', category: 'catering_equipment', description: 'Glass beverage dispensers for lemonade, water, or cocktails.', short_description: 'Decorative glass beverage dispenser tower.', images: ['https://images.unsplash.com/photo-1527761939622-933c72f6f4e3?w=800'], price_per_day: 45.00, price_per_week: 200.00, quantity_available: 10, min_rental_days: 1, is_available: true },
];

export const testimonials = [
  { id: 't1', client_name: 'Sarah & Michael Thompson', event_type: 'Wedding', rating: 5, review: 'Aruma Events transformed our wedding into a fairytale! The attention to detail was extraordinary - from the stunning floral arrangements to the elegant table settings. Our guests couldn\'t stop complimenting the décor. Worth every penny!', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400', is_featured: true },
  { id: 't2', client_name: 'Jennifer Martinez', event_type: 'Corporate Gala', rating: 5, review: 'We\'ve worked with many event decorators, but Aruma Events stands out. They understood our brand perfectly and created an impressive atmosphere for our annual gala. Professional, creative, and reliable.', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400', is_featured: true },
  { id: 't3', client_name: 'The Anderson Family', event_type: '50th Birthday', rating: 5, review: 'My mother\'s 50th birthday party was absolutely magical thanks to Aruma Events. The balloon arrangements and photo backdrop were Instagram-worthy. They made the planning process so easy!', image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400', is_featured: true },
  { id: 't4', client_name: 'Emily Chen', event_type: 'Baby Shower', rating: 5, review: 'The most beautiful baby shower setup I\'ve ever seen! The team was incredibly creative and brought my vision to life perfectly. Every detail was thoughtful and elegant.', image: null, is_featured: false },
  { id: 't5', client_name: 'Robert & Linda Davis', event_type: 'Anniversary', rating: 5, review: 'For our 25th anniversary, we wanted something special. Aruma Events delivered beyond our expectations. The romantic ambiance they created was perfect for celebrating our love story.', image: null, is_featured: false },
];

export const gallery = [
  { id: 'g1', url: '/gallary-image.jpeg', title: 'Gallery Image', category: 'wedding', event_type: 'Wedding', is_featured: true },
  { id: 'g2', url: '/gallary-image4.jpeg', title: 'Gallery Image 4', category: 'wedding', event_type: 'Wedding', is_featured: true },
  { id: 'g3', url: '/gallary-image43.jpeg', title: 'Gallery Image 43', category: 'corporate', event_type: 'Corporate', is_featured: true },
  { id: 'g4', url: '/event-gallary2.jpeg', title: 'Event Gallery 2', category: 'birthday', event_type: 'Event', is_featured: false },
  //{ id: 'g5', url: '/event-gallary.jpeg', title: 'Event Gallery', category: 'event', event_type: 'Event', is_featured: true },
  { id: 'g6', url: '/event-gallary0.jpeg', title: 'Event Gallery', category: 'event', event_type: 'Event', is_featured: false },
  { id: 'g7', url: '/event-gallary1.jpeg', title: 'Event Gallery', category: 'event', event_type: 'Event', is_featured: false },
  { id: 'g8', url: '/event-gallary-s.jpeg', title: 'Event Gallery', category: 'event', event_type: 'Event', is_featured: false },
  { id: 'g9', url: '/cart-gallary.jpeg', title: 'Cart Gallery', category: 'event', event_type: 'Event', is_featured: false },
];

export const faq = [
  { id: 'f1', question: 'How far in advance should I book?', answer: 'We recommend booking at least 4-6 weeks in advance for most events, and 3-6 months for weddings. However, we do our best to accommodate last-minute requests when possible.', category: 'booking', order: 1 },
  { id: 'f2', question: 'Do you offer setup and takedown services?', answer: 'Yes! All our décor packages include professional setup and takedown. Our team arrives early to ensure everything is perfect before your guests arrive, and we handle all cleanup after your event.', category: 'services', order: 2 },
  { id: 'f3', question: 'Can I customize the décor to match my theme?', answer: 'Absolutely! We specialize in custom designs tailored to your vision. During our consultation, we\'ll discuss colors, themes, and specific elements you\'d like to incorporate.', category: 'services', order: 3 },
  { id: 'f4', question: 'What is your rental policy?', answer: 'Rentals include delivery and pickup within our service area. A security deposit is required at booking, which is refunded upon return of items in good condition. Minimum rental period is typically 1 day.', category: 'rentals', order: 4 },
  { id: 'f5', question: 'Do you travel for destination events?', answer: 'Yes, we travel for destination weddings and events! Travel fees apply based on distance. Contact us with your location for a custom quote.', category: 'booking', order: 5 },
  { id: 'f6', question: 'What happens if rental items are damaged?', answer: 'Minor wear and tear is expected and covered. For significant damage, repair or replacement costs will be deducted from your security deposit. We recommend reviewing items upon delivery.', category: 'rentals', order: 6 },
  { id: 'f7', question: 'How do I get a quote?', answer: 'Simply fill out our contact form with details about your event, and we\'ll respond within 24-48 hours with a customized quote. You can also call us directly for immediate assistance.', category: 'booking', order: 7 },
  { id: 'f8', question: 'What payment methods do you accept?', answer: 'We accept all major credit cards, bank transfers, and checks. A 50% deposit is required to secure your booking, with the balance due one week before your event.', category: 'payment', order: 8 },
];

export const blogPosts = [
  { id: 'b1', title: '10 Wedding Décor Trends for 2025', slug: 'wedding-decor-trends-2025', created_at: '2025-01-15', excerpt: 'Discover the hottest wedding decoration trends that are making waves this year, from sustainable florals to bold color palettes.', content: `<h2>Embrace the Future of Wedding Design</h2>
<p>As we step into 2025, wedding décor continues to evolve with exciting new trends that blend timeless elegance with modern sensibilities. Here are the top trends we're seeing:</p>
<h3>1. Sustainable & Dried Florals</h3>
<p>Eco-conscious couples are opting for dried flowers, pampas grass, and locally-sourced seasonal blooms. These arrangements are not only beautiful but also environmentally responsible.</p>
<h3>2. Bold Color Palettes</h3>
<p>Move over neutrals! Couples are embracing rich jewel tones, unexpected color combinations, and statement-making hues that reflect their personalities.</p>
<h3>3. Intimate Micro-Weddings</h3>
<p>Smaller guest lists mean bigger budgets for décor. Couples are investing in luxurious details and personalized touches that create unforgettable experiences.</p>
<h3>4. Mixed Metal Accents</h3>
<p>Gold, silver, copper, and rose gold are being combined for a sophisticated, eclectic look that adds warmth and dimension to any venue.</p>
<h3>5. Living Installations</h3>
<p>From hanging gardens to moss walls, living plant installations are creating Instagram-worthy moments while bringing nature indoors.</p>
<p>Ready to incorporate these trends into your wedding? Contact us for a consultation!</p>`, cover_image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800', author: 'Emma Rodriguez', tags: ['wedding', 'trends', 'décor'], is_published: true },
  { id: 'b2', title: 'How to Choose the Perfect Photo Booth for Your Event', slug: 'choosing-perfect-photo-booth', created_at: '2025-01-10', excerpt: 'A complete guide to selecting the right photo booth style for your corporate event, wedding, or party.', content: `<h2>Making Memories That Last</h2>
<p>Photo booths have become a must-have at modern events. But with so many options available, how do you choose the right one?</p>
<h3>Classic Enclosed Booths</h3>
<p>Perfect for those who want privacy while striking poses. Great for corporate events and weddings where guests might be camera-shy.</p>
<h3>Open-Air Photo Booths</h3>
<p>Ideal for large groups and interactive experiences. The open design allows for more creativity and larger group shots.</p>
<h3>360 Video Booths</h3>
<p>The latest trend in event entertainment! These create shareable slow-motion videos that guests love posting on social media.</p>
<h3>Mirror Booths</h3>
<p>Combining a full-length mirror with touch-screen technology, these booths add a touch of glamour while providing an interactive experience.</p>
<h3>Key Questions to Ask</h3>
<ul><li>How many guests will be attending?</li><li>What's the vibe of your event?</li><li>Do you want prints, digital copies, or both?</li><li>What's your budget?</li></ul>
<p>Contact us to discuss which photo booth option is perfect for your event!</p>`, cover_image: 'https://images.unsplash.com/photo-1766086893043-d38b06175015?w=800', author: 'Marcus Chen', tags: ['photo booth', 'events', 'entertainment'], is_published: true },
  { id: 'b3', title: 'Corporate Event Planning: Creating Memorable Brand Experiences', slug: 'corporate-event-planning-guide', created_at: '2025-01-05', excerpt: 'Expert tips on designing corporate events that reinforce your brand identity and leave lasting impressions.', content: `<h2>Beyond the Basics</h2>
<p>Corporate events are more than meetings—they're opportunities to strengthen your brand, motivate teams, and impress clients.</p>
<h3>Brand Integration Done Right</h3>
<p>Subtle is key. Instead of plastering logos everywhere, incorporate brand colors through florals, linens, and lighting. Let your brand identity flow naturally through the design.</p>
<h3>Creating Experience Zones</h3>
<p>Design distinct areas within your event: networking lounges, interactive displays, and quiet conversation spaces. Each zone should serve a purpose while maintaining cohesive design.</p>
<h3>Technology Integration</h3>
<p>Digital signage, interactive screens, and app-based engagement can enhance your event without overwhelming the design aesthetic.</p>
<h3>Sustainable Choices</h3>
<p>More companies are prioritizing eco-friendly events. Consider reusable décor, digital alternatives to printed materials, and sustainable catering options.</p>
<p>Let's create an unforgettable corporate experience together!</p>`, cover_image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', author: 'Sarah Williams', tags: ['corporate', 'branding', 'events'], is_published: true },
];

// Inventory categories and items (rental inventory)
export const categories = [
  'Tents',
  'Tables & Chairs',
  'Photo Booth',
  'Decor',
  'Catering Equipment',
  'Linens',
];

export const inventory = [
  // Tents
  {
    id: 'tent-001',
    name: 'Frame Tent - 20x30',
    category: 'Tents',
    shortDescription: 'Large 20x30 frame tent for outdoor events up to 150 guests.',
    description: '20x30 frame tent for weddings, corporate events, and gatherings. No center poles.',
    images: ['/tent.png', '/tent.png'],
  },
  {
    id: 'tent-002',
    name: '20\' x 40\' Weekender Pole Party Tent',
    category: 'Tents',
    shortDescription: 'Large 20x40 pole party tent for outdoor events and gatherings.',
    description: '20x40 Weekender pole party tent for weddings, festivals, and large outdoor events.',
    images: ['/20\'+x+40\'+Weekender+Pole+Party+Tent.webp', '/20+x+40Pole+PartyTent.webp'],
  },

  // Tables & Chairs
  {
    id: 'chair-001',
    name: 'Chiavari Chair - Gold',
    category: 'Tables & Chairs',
    shortDescription: 'Elegant gold Chiavari chairs for weddings and formal events.',
    description: 'Gold Chiavari chairs for weddings, galas, and upscale events.',
    images: ['/EventsProductPictures/TablesChairsBars/chair/gold_chiavari_rental-300x300.jpg', '/EventsProductPictures/TablesChairsBars/Chiavari_Chair_Gold.jpg'],
  },
  {
    id: 'chair-002',
    name: 'Chiavari Chair - White',
    category: 'Tables & Chairs',
    shortDescription: 'Classic white Chiavari chairs for timeless elegance.',
    description: 'White Chiavari chairs for any event. Clean and versatile.',
    images: [ '/EventsProductPictures/TablesChairsBars/Kids_White_Chiavari_Chair.jpg'],
  },
  {
    id: 'chair-003',
    name: 'Folding Banquet Chair',
    category: 'Tables & Chairs',
    shortDescription: 'Durable folding banquet chairs for large events.',
    description: 'Folding banquet chairs for conferences and large gatherings.',
    images: ['/EventsProductPictures/TablesChairsBars/chair/blackpaddedresinchair-300x300.jpg', '/EventsProductPictures/TablesChairsBars/chair/whitepaddedresinchair-300x300.jpg'],
  },
  {
    id: 'table-001',
    name: 'Round Table "',
    category: 'Tables & Chairs',
    shortDescription: 'Large 60-inch round tables seating up to 10 guests.',
    description: '60-inch round tables for banquets. Seats 8–10 guests.',
    images: ['/white-round.webp', '/white-round-table.webp'],
  },
 
  {
    id: 'table-003',
    name: 'Rectangular Banquet Table ',
    category: 'Tables & Chairs',
    shortDescription: 'Long 8-foot rectangular tables for buffet and head tables.',
    description: '8-foot banquet tables for buffets and head tables.',
    images: ['/EventsProductPictures/TablesChairsBars/tables/8ft_rectangular_table_rental-300x300.jpg', '/EventsProductPictures/TablesChairsBars/tables/6ft_rectangular_table_rental-300x300.jpg'],
  },
  
  
  {
    id: 'chair-011',
    name: 'White Folding Chair',
    category: 'Tables & Chairs',
    shortDescription: 'Classic white folding chairs for events and gatherings.',
    description: 'Durable white folding chairs ideal for ceremonies, receptions, and outdoor events.',
    images: ['/EventsProductPictures/TablesChairsBars/chair/white_folding_chair_rental-300x300.jpg', '/EventsProductPictures/TablesChairsBars/chair/whitepaddedresinchair-300x300.jpg'],
  },
  {
    id: 'chair-012',
    name: 'Fabric Upholstered Metal Folding Chair',
    category: 'Tables & Chairs',
    shortDescription: 'Comfortable fabric-upholstered metal folding chairs for events.',
    description: 'Fabric-upholstered metal folding chairs for comfortable seating at ceremonies, receptions, and corporate events.',
    images: ['/Hinged_Fabric_Upholstered_Metal_Folding_Chair_2023-10-07T09-35-49Z_1.webp', '/Fabric_Upholstered_Metal_Folding_Chair.webp'],
  },
  {
    id: 'chair-013',
    name: 'Plastic Folding Chair',
    category: 'Tables & Chairs',
    shortDescription: 'Lightweight white plastic folding chairs for events and gatherings.',
    description: 'Durable white plastic folding chairs with dark metal frames. Compact when folded for easy storage and transport.',
    images: ['/plastic-folding.jpg', '/plastic-white-chair.jpg'],
  },
  {
    id: 'chair-014',
    name: 'The Crown Empress Throne',
    category: 'Tables & Chairs',
    shortDescription: 'Regal throne chair for weddings, quinceañeras, and royal-themed events.',
    description: 'A stunning statement throne that adds grandeur to your special day. Perfect for bridal portraits, sweet sixteen, quinceañeras, and royal-themed celebrations.',
    images: ['/throne-chair.jpeg', '/royale-crown-empress-throne-chair-white-gold.webp'],
  },
  {
    id: 'table-007',
    name: 'White Folding Table',
    category: 'Tables & Chairs',
    shortDescription: 'Versatile white folding tables for any event setup.',
    description: 'White folding tables for buffets, displays, registration, and seating.',
    images: ['/whit-folding-table.jpg', '/white-table-round.png', '/table.png'],
  },

  // Catering Equipment
  {
    id: 'catering-001',
    name: 'Buffet Serving Set',
    category: 'Catering Equipment',
    shortDescription: 'Complete buffet serving set with chafing dishes and serving utensils.',
    description: 'Chafing dishes and serving utensils for buffet service.',
    images: ['/EventsProductPictures/CateringEquipment/Chafer_8qt_Wrought_Iron copy.jpg', '/EventsProductPictures/CateringEquipment/Chafer_Silver_5qt_Round copy.jpg'],
  },
  
  {
    id: 'catering-003',
    name: 'Coffee Service Station',
    category: 'Catering Equipment',
    shortDescription: 'Professional coffee service station with carafes and accessories.',
    description: 'Coffee service with carafes for brunches and morning events.',
    images: ['/EventsProductPictures/CateringEquipment/55_cup_coffee_urn_rental.jpg', '/EventsProductPictures/CateringEquipment/coffee_pump_pot_rental.jpg'],
  },

  // Décor & Accessories
  // {
  //   id: 'decor-001',
  //   name: 'Centerpiece Collection - Classic',
  //   category: 'Decor',
  //   shortDescription: 'Elegant centerpiece collection with vases and candle holders.',
  //   description: 'Glass vases and candle holders for table centerpieces.',
  //   images: ['/EventsProductPictures/DecorRental/Glass_Votive.jpg', '/EventsProductPictures/DecorRental/Hurricane_Glass.jpg'],
  // },
  // {
  //   id: 'decor-002',
  //   name: 'Mirror Collection - Various Sizes',
  //   category: 'Decor',
  //   shortDescription: 'Decorative mirrors in various sizes for elegant displays.',
  //   description: 'Decorative mirrors for depth and elegance.',
  //   images: ['/EventsProductPictures/DecorRental/Shepherd_Hook.jpg', '/EventsProductPictures/DecorRental/White_Market_Umbrella1_9ft.jpg'],
  // },
  // {
  //   id: 'decor-003',
  //   name: 'Vase Collection - Premium',
  //   category: 'Decor',
  //   shortDescription: 'Premium vases in various styles and sizes.',
  //   description: 'Vases for floral arrangements and displays.',
  //   images: ['/EventsProductPictures/DecorRental/Glass_Cylinder_Vase.jpg', '/EventsProductPictures/DecorRental/Glass_Trumpet_Vase.jpg'],
  // },
  // {
  //   id: 'decor-004',
  //   name: 'Wedding Arch - Elegant',
  //   category: 'Decor',
  //   shortDescription: 'Elegant wedding arch for ceremonies and photo backdrops.',
  //   description: 'Wedding arch for ceremonies and photo backdrops.',
  //   images: ['/EventsProductPictures/ArchwaysArbors/Black_Iron_Archway.jpg', '/EventsProductPictures/ArchwaysArbors/Iron_Garden_Gate_Archway_Antique_White.jpg'],
  // },

  // Linens
  {
    id: 'linens-001',
    name: 'Tablecloth Set - Premium',
    category: 'Linens',
    shortDescription: 'Premium table linens in various colors and styles.',
    description: 'Tablecloths, napkins, and runners in multiple colors.',
    images: ['/EventsProductPictures/Linens/Perennial_Linen_Front.jpg', '/EventsProductPictures/Linens/Perennial_Linen_Reverse.jpg'],
  },
  {
    id: 'linens-002',
    name: 'Napkin Set - Premium',
    category: 'Linens',
    shortDescription: 'Premium napkins in various colors and folding styles.',
    description: 'Premium napkins in multiple colors for your table settings.',
    images: ['/EventsProductPictures/Linens/Velvet_Table_Linen_Navy.jpg', '/EventsProductPictures/Linens/Perennial_Linen_Front.jpg'],
  },

  // Photo Booth
  {
    id: 'photo-book-360',
    name: '360 Photo Booth',
    category: 'Photo Booth',
    shortDescription: '360-degree photo booth for viral slow-motion videos.',
    description: '360-degree photo booth creating social-ready slow-motion clips. Perfect for weddings, corporate events, and parties. Guests love the shareable viral content.',
    images: ['/photo-book-360.jpg'],
  },
];

export function getItemsByCategory(category) {
  return inventory.filter((item) => item.category === category);
}

export function getItemById(id) {
  return inventory.find((item) => item.id === id);
}

export function getAllItems() {
  return inventory;
}
