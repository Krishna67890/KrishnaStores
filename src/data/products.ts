import { Product } from '../types/store';

export const PRODUCTS: Product[] = [
  // -------------------------------------------------------------
  // 1. BOOKSTORE — THE DIGITAL SURVIVAL GUIDE (₹75)
  // -------------------------------------------------------------
  {
    id: 'digital-survival-guide',
    slug: 'digital-survival-guide',
    number: '01',
    title: 'The Digital Survival Guide',
    subtitle: 'Essential Digital Security, Privacy & Tech Survival Handbook',
    category: 'book',
    categoryLabel: 'EBOOK',
    priceINR: 75,
    priceDisplay: '₹75',
    image: '/assets/Digital Guide Thumbnail.png',
    coverImage: '/assets/Digital Guide Thumbnail.png',
    gallery: [
      '/assets/Digital Guide Thumbnail.png',
      '/assets/Digital Guide 1.png',
      '/assets/Digital Guide 2.png',
      '/assets/Digital Guide 3.png',
      '/assets/Digital Guide 4.png',
      '/assets/Digital Guide 5.png',
      '/assets/Digital Guide 6.png',
      '/assets/Digital Guide 7.png'
    ],
    images: [
      '/assets/Digital Guide 1.png',
      '/assets/Digital Guide 2.png',
      '/assets/Digital Guide 3.png',
      '/assets/Digital Guide 4.png',
      '/assets/Digital Guide 5.png',
      '/assets/Digital Guide 6.png',
      '/assets/Digital Guide 7.png'
    ],
    shortDescription: 'Essential digital security, privacy, and online protection handbook for developers and digital creators.',
    valueProp: 'Essential digital security and privacy handbook.',
    description: 'The Digital Survival Guide breaks down essential digital privacy, security practices, password protection, and online survival strategies in simple, actionable terms.',
    benefits: [
      { number: '01', title: 'Digital Privacy Mastery', desc: 'Protect your personal identity and developer accounts online.' },
      { number: '02', title: 'Security Best Practices', desc: 'Implement multi-factor auth, password hygiene, and data protection.' },
      { number: '03', title: 'Online Threat Awareness', desc: 'Identify phishing, malware, and common web security pitfalls.' },
      { number: '04', title: 'Actionable Checklists', desc: 'Step-by-step security hardening checklists for phone and laptop.' }
    ],
    youMightWantThisIf: [
      'You want to protect your personal and developer data online',
      'You are looking for concise, practical security guidelines',
      'You want a clear digital privacy checklist without jargon'
    ],
    audience: [
      { title: 'Digital Creators', desc: 'Anyone seeking to protect their digital identity and content.' },
      { title: 'Developers & Students', desc: 'Coders and students needing practical online safety protocols.' }
    ],
    whatYouGet: [
      'Complete Digital Survival Guide (PDF format)',
      'Security & Privacy Checklists',
      'Instant delivery via Gumroad',
      'Lifetime updates'
    ],
    whatMakesItUseful: [
      'Cuts through technical jargon with direct, practical security steps',
      'Updated for modern 2026 digital threats and privacy standards'
    ],
    beforeYouBuy: [
      'Digital download hosted on Gumroad.',
      'Requires a standard PDF reader to view.',
      'No physical copy is shipped.'
    ],
    isRightForYou: {
      goodFit: [
        'You want a clear, concise guide to online privacy and security.',
        'You value practical security habits over abstract theory.'
      ],
      mayNotBe: [
        'If you already hold a CISSP or senior cybersecurity certification.'
      ]
    },
    details: {
      type: 'eBook',
      category: 'Security & Privacy',
      edition: '2026 Edition',
      delivery: 'Instant PDF Download',
      purchasePlatform: 'Gumroad'
    },
    gumroadUrl: 'https://krishnapatilrajput.gumroad.com/l/digital-survival-guide',
    buyLink: 'https://krishnapatilrajput.gumroad.com/l/digital-survival-guide',
    tags: ['books', 'security', 'privacy', 'guide', 'digital'],
    author: 'Krishna Patil Rajput',
    publisher: 'Krishna Patil Rajput',
    price: 75,
    discountPrice: 75,
    rating: 4.8,
    reviewsCount: 120,
    pages: '45',
    language: 'English',
    format: ['PDF'],
    isBestseller: false,
    isNew: true,
    publishedDate: '2026',
    learnings: ['Digital Privacy & Security', 'Password & Identity Protection', 'Data Encryption Fundamentals', 'Online Safety Protocols'],
    features: ['Beginners', 'Developers', 'Students'],
    contents: [{ title: 'Digital Privacy Basics', duration: 'Chapter 1' }],
    hoursSaved: '20+ Hours of Research',
    estimatedValue: '₹499 Value',
    whyBuyNow: 'Get immediate access to essential digital protection principles for just ₹75.'
  },

  // -------------------------------------------------------------
  // 2. BOOKSTORE — ANDROID APP DEVELOPMENT WITH REACT NATIVE (₹299)
  // -------------------------------------------------------------
  {
    id: 'book-android-2026',
    slug: 'android-app-development-react-native-2026',
    number: '02',
    title: 'Android App Development with React Native (2026 Edition)',
    subtitle: 'Build Professional Android Apps with Modern React Native',
    category: 'book',
    categoryLabel: 'DEVELOPER GUIDE',
    priceINR: 299,
    priceDisplay: '₹299',
    image: '/assets/Android Native 2026 Thumbnail.png',
    coverImage: '/assets/Android Native 2026 Thumbnail.png',
    gallery: [
      '/assets/Android Native 2026 Thumbnail.png',
      '/assets/Android Native React 1.png',
      '/assets/Android Native React 2.png',
      '/assets/android-react-1.png',
      '/assets/android-react-2.png'
    ],
    images: [
      '/assets/Android Native React 1.png',
      '/assets/Android Native React 2.png',
      '/assets/android-react-1.png',
      '/assets/android-react-2.png'
    ],
    shortDescription: 'The comprehensive 2026 guide for building, scaling, and deploying modern cross-platform Android applications using React Native.',
    valueProp: 'A practical digital resource for learning React Native and mobile development.',
    description: 'Master cross-platform mobile development for Android with React Native. Covers modern architecture, native modules interop, performance optimization, state management, and real-world app deployment patterns.',
    benefits: [
      { number: '01', title: 'React Native Core Architecture', desc: 'Understand JavaScript bridges, Fabric renderer, and component lifecycles.' },
      { number: '02', title: 'Android Native Integration', desc: 'Bridge native Java/Kotlin modules with JavaScript logic seamlessly.' },
      { number: '03', title: 'Performance & Optimization', desc: 'Eliminate render lags, optimize memory, and manage bundle sizes.' },
      { number: '04', title: '2026 Production Roadmap', desc: 'Follow modern standards for building, testing, and shipping APK/AAB builds.' }
    ],
    youMightWantThisIf: [
      'You are a web developer transitioning into mobile app engineering',
      'You want a structured resource for building cross-platform Android apps',
      'You want up-to-date 2026 practices for React Native and JavaScript',
      'You want clear, code-grounded explanations for real app architecture'
    ],
    audience: [
      { title: 'React Developers', desc: 'Frontend engineers wanting to expand into Android app creation.' },
      { title: 'CS Students', desc: 'Students looking to build practical portfolio projects for mobile platforms.' },
      { title: 'Independent Builders', desc: 'Creators wanting to launch their own cross-platform mobile products.' }
    ],
    whatYouGet: [
      'Complete digital developer book (PDF format)',
      'Code snippets and architecture reference diagrams',
      'Step-by-step app setup and build instructions',
      'Immediate delivery through Gumroad'
    ],
    whatMakesItUseful: [
      'Bridging web React knowledge directly to native mobile capabilities',
      'Up-to-date with current 2026 tooling and Android build specifications',
      'Focuses on real production patterns over synthetic quickstart demos'
    ],
    beforeYouBuy: [
      'This digital developer guide is hosted and fulfilled on Gumroad.',
      'Basic familiarity with JavaScript or React is recommended for best results.',
      'No physical copy is shipped.'
    ],
    isRightForYou: {
      goodFit: [
        'You know basic JavaScript/React and want to build real Android applications.',
        'You prefer structured developer guides over scattered tutorial videos.'
      ],
      mayNotBe: [
        'If you are looking for pure Kotlin/Swift native code with zero JavaScript.'
      ]
    },
    details: {
      type: 'Developer Book',
      category: 'Mobile Development',
      edition: '2026 Edition',
      delivery: 'Instant Download',
      purchasePlatform: 'Gumroad'
    },
    gumroadUrl: 'https://krishnapatilrajput.gumroad.com/l/android-app-development-react-native-2026',
    buyLink: 'https://krishnapatilrajput.gumroad.com/l/android-app-development-react-native-2026',
    tags: ['books', 'react-native', 'android', 'javascript', 'mobile'],
    featured: true,
    author: 'Krishna Patil Rajput',
    publisher: 'Krishna Patil Rajput',
    price: 2096,
    discountPrice: 299,
    rating: 4.9,
    reviewsCount: 156,
    pages: '50',
    language: 'English',
    format: ['PDF'],
    isBestseller: true,
    isNew: true,
    publishedDate: '2026',
    learnings: ['React Native Fundamentals', 'JavaScript & TypeScript', 'Expo & Navigation', 'Components & Hooks', 'State Management', 'REST APIs & Firebase', 'Push Notifications', 'Performance Optimization', 'Google Play Publishing'],
    features: ['React Native Beginners', 'Android Developers', 'JavaScript Developers'],
    contents: [{ title: 'Environment & Architecture', duration: 'Module 1' }],
    hoursSaved: '60+ Hours of Trial & Error Searching Scattered Docs',
    estimatedValue: '₹2,096 Value',
    whyBuyNow: 'Master 2026 production-grade React Native & Android app architecture in one structured developer guide.'
  },

  // -------------------------------------------------------------
  // 3. BOOKSTORE — WHY WAS I ONLY AN OPTION? (₹477)
  // -------------------------------------------------------------
  {
    id: 'book-why-option',
    slug: 'why-was-i-only-an-option',
    number: '03',
    title: 'Why Was I Only an Option? (Digital Edition)',
    subtitle: 'A Journey Through Love, Heartbreak, Healing & Self-Worth',
    category: 'book',
    categoryLabel: 'DIGITAL EDITION',
    priceINR: 477,
    priceDisplay: '₹477',
    image: '/assets/Why Was I Only An Option.png',
    coverImage: '/assets/Why Was I Only An Option.png',
    gallery: [
      '/assets/Why Was I Only An Option.png',
      '/assets/Why Was I Only An Option 1.png',
      '/assets/Why Was I Only An Option 2.png',
      '/assets/Why Was I Only An Option 3.png',
      '/assets/why-only-an-option.png',
      '/assets/why-option-1.png',
      '/assets/why-option-2.png',
      '/assets/why-option-3.png'
    ],
    images: [
      '/assets/Why Was I Only An Option 1.png',
      '/assets/Why Was I Only An Option 2.png',
      '/assets/Why Was I Only An Option 3.png',
      '/assets/why-only-an-option.png',
      '/assets/why-option-1.png',
      '/assets/why-option-2.png',
      '/assets/why-option-3.png'
    ],
    shortDescription: 'An honest exploration of personal choices, self-worth, emotional boundaries, and navigating relationships with self-awareness.',
    valueProp: 'An exploration of choices, self-worth and personal growth.',
    description: 'Why Was I Only an Option? delves into human psychology, attachment, and the journey of prioritizing self-worth over external validation. Written with vulnerable clarity and practical introspection.',
    benefits: [
      { number: '01', title: 'Self-Worth Recognition', desc: 'Identify patterns where you compromise personal values for validation.' },
      { number: '02', title: 'Boundary Setting', desc: 'Practical guidance for establishing healthy emotional limits.' },
      { number: '03', title: 'Emotional Clarity', desc: 'Navigate complex relationship dynamics with introspection and grace.' },
      { number: '04', title: 'Personal Growth', desc: 'Reframe personal setbacks into stepping stones for authentic self-regard.' }
    ],
    youMightWantThisIf: [
      'You are looking for reflective reading on relationships and self-worth',
      'You want to break repeating cycles of being under-appreciated',
      'You enjoy introspective essays and psychological clarity',
      'You prefer honest, personal writing over generic self-help clichés'
    ],
    audience: [
      { title: 'Thoughtful Readers', desc: 'Anyone navigating life transitions, relationships, or personal growth.' },
      { title: 'Self-Improvement Seekers', desc: 'Individuals committed to understanding emotional patterns.' }
    ],
    whatYouGet: [
      'Complete digital edition (PDF format)',
      'Introspective journaling prompts and reflections',
      'Lifetime digital access',
      'Secure purchase fulfillment via Gumroad'
    ],
    whatMakesItUseful: [
      'Provides a quiet, contemplative space to process personal feelings',
      'Combines relatable personal narrative with actionable mindset framing',
      'Delivered instantly for reading on phone, tablet, or e-reader'
    ],
    beforeYouBuy: [
      'This is an original digital literary work delivered in PDF format.',
      'Purchases are safely processed via Gumroad.',
      'This product does not replace professional therapy or counseling.'
    ],
    isRightForYou: {
      goodFit: [
        'You value thoughtful personal writing on emotional growth and relationships.',
        'You want to read at your own pace on your phone or e-reader.'
      ],
      mayNotBe: [
        'If you expect a technical manual or physical printed book.'
      ]
    },
    details: {
      type: 'Digital Publication',
      category: 'Self-Worth / Essays',
      edition: 'Digital Edition',
      delivery: 'Instant PDF Download',
      purchasePlatform: 'Gumroad'
    },
    gumroadUrl: 'https://krishnapatilrajput.gumroad.com/l/why-was-i-only-an-option',
    buyLink: 'https://krishnapatilrajput.gumroad.com/l/why-was-i-only-an-option',
    tags: ['books', 'personal-growth', 'relationships', 'reflection'],
    author: 'Aniket S. Kardile',
    publisher: 'Krishna Patil Rajput',
    price: 2096,
    discountPrice: 477,
    rating: 5.0,
    reviewsCount: 240,
    pages: '97',
    language: 'English',
    format: ['PDF'],
    isBestseller: true,
    isNew: false,
    publishedDate: '2024',
    learnings: ['Understanding Heartbreak', 'Emotional Healing', 'Letting Go', 'Self Worth', 'Confidence', 'Personal Growth', 'Healthy Relationships'],
    features: ['Young Adults', 'Relationship Readers', 'Personal Growth Readers'],
    contents: [{ title: 'The Silent Awakening', duration: 'Chapter 1-5' }],
    estimatedValue: '₹2,096 Value',
    whyBuyNow: 'Start your journey of healing and self-discovery today.'
  },

  // -------------------------------------------------------------
  // 4. BOOKSTORE — WEB DEVELOPMENT ROADMAP (₹94)
  // -------------------------------------------------------------
  {
    id: 'book-web-dev-2026',
    slug: 'web-development-roadmap-2026',
    number: '04',
    title: 'Web Development Fundamentals & Advanced Concepts (2026 Edition)',
    subtitle: 'Become a Modern Full-Stack Web Developer',
    category: 'book',
    categoryLabel: 'DEVELOPER GUIDE',
    priceINR: 94,
    priceDisplay: '₹94',
    image: '/assets/Web Development Fundamentals & Advanced Concepts (2026 Edition) Thumbnail.png',
    coverImage: '/assets/Web Development Fundamentals & Advanced Concepts (2026 Edition) Thumbnail.png',
    gallery: [
      '/assets/Web Development Fundamentals & Advanced Concepts (2026 Edition) Thumbnail.png',
      '/assets/Web devlopment roadmap 1.png',
      '/assets/Web Devlopment Roadmap 2.png',
      '/assets/web-roadmap-1.png',
      '/assets/web-roadmap-2.png'
    ],
    images: [
      '/assets/Web devlopment roadmap 1.png',
      '/assets/Web Devlopment Roadmap 2.png',
      '/assets/web-roadmap-1.png',
      '/assets/web-roadmap-2.png'
    ],
    shortDescription: 'A practical, structured roadmap covering web development from HTML/CSS/JS fundamentals to advanced full-stack concepts.',
    valueProp: 'A practical roadmap from fundamental web development to advanced concepts.',
    description: 'Whether starting out or filling in architectural gaps, this 2026 guide breaks down modern web engineering into digestible steps: DOM manipulation, asynchronous JavaScript, modern CSS layouts, API integration, and deployment.',
    benefits: [
      { number: '01', title: 'Foundational Foundations', desc: 'Master semantic HTML, CSS Grid/Flexbox, and core DOM principles.' },
      { number: '02', title: 'Modern JavaScript Engine', desc: 'Promises, async/await, closures, modules, and ESNext features.' },
      { number: '03', title: 'Full-Stack Overview', desc: 'HTTP headers, REST APIs, JSON data flow, and frontend state.' },
      { number: '04', title: '2026 Tech Stack Map', desc: 'Clear guidelines on choosing frameworks, build tools, and hosting.' }
    ],
    youMightWantThisIf: [
      'You are building a strong foundation in modern web engineering',
      'You want a streamlined 2026 roadmap without tutorial clutter',
      'You want to master core fundamentals alongside framework concepts',
      'You appreciate highly accessible digital developer material'
    ],
    audience: [
      { title: 'Beginner Developers', desc: 'Learners entering web development who need a coherent learning path.' },
      { title: 'Self-Taught Programmers', desc: 'Coders seeking to solidify core web concepts and terminology.' },
      { title: 'CS Students', desc: 'Students preparing for technical frontend and web interviews.' }
    ],
    whatYouGet: [
      'Complete digital guide (PDF format)',
      'Curated concept maps and code examples',
      'Instant access link via email through Gumroad',
      'Lifetime updates to the guide'
    ],
    whatMakesItUseful: [
      'Eliminates confusion by outlining exactly what to learn and in what order',
      'Focused on timeless web standards as well as modern 2026 practices',
      'Priced accessibly for developers around the world'
    ],
    beforeYouBuy: [
      'Digital download hosted on Gumroad.',
      'Requires a standard PDF reader or mobile device to view.',
      'No physical shipment.'
    ],
    isRightForYou: {
      goodFit: [
        'You want a clear, concise guide to modern web development skills.',
        'You prefer structured reading over watching hours of videos.'
      ],
      mayNotBe: [
        'If you already possess 10+ years of senior web architecture expertise.'
      ]
    },
    details: {
      type: 'Developer Guide',
      category: 'Web Engineering',
      edition: '2026 Edition',
      delivery: 'Instant Download',
      purchasePlatform: 'Gumroad'
    },
    gumroadUrl: 'https://krishnapatilrajput.gumroad.com/l/web-development-roadmap-2026',
    buyLink: 'https://krishnapatilrajput.gumroad.com/l/web-development-roadmap-2026',
    tags: ['books', 'web-development', 'javascript', 'html-css', 'roadmap'],
    author: 'Krishna Patil Rajput',
    publisher: 'Krishna Patil Rajput',
    price: 2096,
    discountPrice: 94,
    rating: 4.9,
    reviewsCount: 184,
    pages: 'Complete Guide',
    language: 'English',
    format: ['PDF'],
    isBestseller: true,
    isNew: true,
    publishedDate: '2026',
    learnings: ['HTML5 & CSS3 Advanced Layouts', 'Responsive Design with Tailwind CSS', 'JavaScript ES6+ & TypeScript', 'DOM Manipulation & Web APIs', 'Git & GitHub Workflow', 'React.js & Next.js 15+ (App Router)', 'Node.js & Express.js Backend', 'MongoDB & PostgreSQL Databases', 'Vercel & Docker Deployment'],
    features: ['Students', 'Beginners', 'Self Learners', 'Freelancers'],
    contents: [{ title: 'Foundation of the Web', duration: 'Week 1-2' }],
    hoursSaved: '100+ Hours of Tutorial Hell Avoided',
    estimatedValue: '₹2,096 Value',
    whyBuyNow: 'Get the complete 2026 roadmap today for just ₹94 — a tiny investment for your professional future.'
  },

  // -------------------------------------------------------------
  // 5. GAMESTORE — CANDY MATCH GAME (₹100 / $1)
  // -------------------------------------------------------------
  {
    id: 'candy-match-game',
    slug: 'candy-match-game',
    number: '05',
    title: 'Candy Match Game',
    subtitle: 'Interactive HTML5 Match-3 Game Source Code',
    category: 'game',
    categoryLabel: 'GAME SOURCE CODE',
    priceINR: 100,
    priceUSD: 1,
    priceDisplay: '₹100 ($1)',
    image: '/assets/Candy-Match 1.png',
    coverImage: '/assets/Candy-Match 1.png',
    gallery: [
      '/assets/Candy-Match 1.png',
      '/assets/Candy-Match 2.png',
      '/assets/Candy-Match 3.png'
    ],
    images: [
      '/assets/Candy-Match 1.png',
      '/assets/Candy-Match 2.png',
      '/assets/Candy-Match 3.png'
    ],
    shortDescription: 'A vibrant, fully responsive HTML5 Match-3 puzzle game with smooth animations, custom sound effects, and clean JavaScript architecture.',
    valueProp: 'Complete HTML5 Match-3 puzzle game source code.',
    description: 'Build or publish your own match-3 game! Candy Match Game features fluid animations, combo mechanics, level progression, and audio triggers built entirely in clean HTML5, CSS3, and vanilla JavaScript.',
    benefits: [
      { number: '01', title: 'Complete Source Code', desc: 'Get full rights to modify, re-skin, and deploy the game.' },
      { number: '02', title: 'Zero Dependencies', desc: 'Pure HTML5 and JavaScript without heavy external game engines.' },
      { number: '03', title: 'Audio & Asset Pack', desc: 'Includes full sound effects and graphical candy assets.' },
      { number: '04', title: 'Mobile & Web Ready', desc: 'Touch and click responsive layout for phone and desktop.' }
    ],
    youMightWantThisIf: [
      'You want a ready-to-deploy HTML5 puzzle game for web or mobile',
      'You want to learn match-3 grid algorithms and animations in JS',
      'You want a fun web game template to monetize or customize'
    ],
    audience: [
      { title: 'Game Developers', desc: 'Indie builders and web developers wanting game source code.' },
      { title: 'Students & Learners', desc: 'Developers learning grid logic, audio triggers, and DOM games.' }
    ],
    whatYouGet: [
      'Full HTML/CSS/JS Source Code (ZIP Archive)',
      'Complete Audio & Graphic Asset Pack',
      'Instant access on Gumroad & itch.io'
    ],
    whatMakesItUseful: [
      'Easily customisable layout and sound triggers with zero framework overhead.'
    ],
    beforeYouBuy: [
      'Instant ZIP download hosted on Gumroad and itch.io.',
      'Requires any standard code editor (VS Code).'
    ],
    isRightForYou: {
      goodFit: [
        'Web developers wanting to publish or modify browser games.'
      ],
      mayNotBe: [
        'If you are looking for Unity 3D or Unreal Engine C# projects.'
      ]
    },
    details: {
      type: 'HTML5 Game',
      category: 'Game Source Code',
      edition: 'Full License',
      delivery: 'ZIP Download',
      purchasePlatform: 'Gumroad / itch.io'
    },
    gumroadUrl: 'https://krishnapatilrajput.gumroad.com/l/candy-match-game',
    itchUrl: 'https://krishnapatilrajput.itch.io/candy-match-game',
    buyLink: 'https://krishnapatilrajput.gumroad.com/l/candy-match-game',
    demoLink: 'https://krishnapatilrajput.itch.io/candy-match-game',
    tags: ['games', 'html5', 'javascript', 'match-3', 'source-code'],
    developer: 'Krishna Patil Rajput',
    platform: 'HTML5 / Web Browser',
    genre: 'Puzzle / Arcade',
    author: 'Krishna Patil Rajput',
    publisher: 'Krishna Patil Rajput',
    price: 100,
    discountPrice: 100,
    rating: 4.9,
    reviewsCount: 88,
    pages: 'Source Code',
    language: 'English',
    format: ['ZIP Archive', 'HTML5'],
    isBestseller: true,
    isNew: true,
    publishedDate: '2026',
    learnings: ['Match-3 Algorithm Logic', 'DOM Grid Manipulation', 'Web Audio API', 'CSS Keyframe Animations'],
    features: ['Responsive Canvas/HTML', 'Sound Effects & SFX', 'Score & Combo System'],
    whatsIncluded: ['Full Source Code (ZIP)', 'Asset Pack (Images & Audio)', 'Deployment Guide'],
    requirements: ['Any Web Browser', 'Text Editor'],
    contents: [{ title: 'Game Engine Core', duration: 'HTML5/JS' }],
    estimatedValue: '₹999 Value',
    whyBuyNow: 'Get full commercial rights and source code for just ₹100 ($1).'
  },

  // -------------------------------------------------------------
  // 6. GAMESTORE — BLOCKCRAFT BUILDER: DREAM HOUSE EDITION (₹100 / $1)
  // -------------------------------------------------------------
  {
    id: 'blockcraft-builder-dream-house-edition',
    slug: 'blockcraft-builder-dream-house-edition',
    number: '06',
    title: '🏡 BlockCraft Builder: Dream House Edition',
    subtitle: 'Creative 3D Block Building Game Engine',
    category: 'game',
    categoryLabel: 'GAME SOURCE CODE',
    priceINR: 100,
    priceUSD: 1,
    priceDisplay: '₹100 ($1)',
    image: '/assets/BlockCraft-Builder-Dream-House-Edition.png',
    coverImage: '/assets/BlockCraft-Builder-Dream-House-Edition.png',
    gallery: [
      '/assets/BlockCraft-Builder-Dream-House-Edition.png',
      '/assets/Blockcraft 1.png',
      '/assets/Blockcraft 2.png',
      '/assets/Blockcraft 3.png',
      '/assets/Blockcraft 4.png'
    ],
    images: [
      '/assets/BlockCraft-Builder-Dream-House-Edition.png',
      '/assets/Blockcraft 1.png',
      '/assets/Blockcraft 2.png',
      '/assets/Blockcraft 3.png',
      '/assets/Blockcraft 4.png'
    ],
    shortDescription: 'A voxel-style 3D block building game engine allowing players to design and construct dream houses directly in the browser.',
    valueProp: 'Interactive 3D voxel sandbox building game.',
    description: 'Unleash your creativity with BlockCraft Builder: Dream House Edition! An interactive 3D voxel building game engine constructed with Three.js / WebGL, featuring terrain generation, block placement/destruction mechanics, and save states.',
    benefits: [
      { number: '01', title: '3D WebGL Sandbox Engine', desc: 'Build 3D block games directly in modern web browsers.' },
      { number: '02', title: 'Block Placement & Destruction', desc: 'Full voxel interaction system with multiple block textures.' },
      { number: '03', title: 'Pointer Lock Controls', desc: 'FPS-style camera navigation with WASD and mouse look.' },
      { number: '04', title: 'Full Source Code', desc: 'Includes all 3D shaders, textures, and scene management code.' }
    ],
    youMightWantThisIf: [
      'You want to learn 3D WebGL graphics and voxel engine architecture',
      'You want a browser-based 3D building game template to customize',
      'You love Minecraft-style building mechanics and web 3D graphics'
    ],
    audience: [
      { title: '3D Web Creators', desc: 'Developers interested in Three.js and browser sandbox games.' },
      { title: 'Indie Game Builders', desc: 'Creators wanting a solid 3D voxel engine baseline.' }
    ],
    whatYouGet: [
      'Full WebGL / Three.js Source Code (ZIP Archive)',
      '3D Texture Atlas & Block Assets',
      'Instant access on Gumroad & itch.io'
    ],
    whatMakesItUseful: [
      'Clean 3D engine structure ideal for expanding into full browser sandbox games.'
    ],
    beforeYouBuy: [
      'Requires WebGL enabled browser for testing and building.',
      'Instant ZIP download hosted on Gumroad and itch.io.'
    ],
    isRightForYou: {
      goodFit: [
        'Developers looking to explore 3D web sandbox engines.'
      ],
      mayNotBe: [
        'If you only want 2D flat sprite games.'
      ]
    },
    details: {
      type: '3D Game Engine',
      category: 'Game Source Code',
      edition: 'Full License',
      delivery: 'ZIP Download',
      purchasePlatform: 'Gumroad / itch.io'
    },
    gumroadUrl: 'https://krishnapatilrajput.gumroad.com/l/BlockCraft-Builder-Dream-House-Edition',
    itchUrl: 'https://krishnapatilrajput.itch.io/blockcraft-builder-dream-house-edition',
    buyLink: 'https://krishnapatilrajput.gumroad.com/l/BlockCraft-Builder-Dream-House-Edition',
    demoLink: 'https://krishnapatilrajput.itch.io/blockcraft-builder-dream-house-edition',
    tags: ['games', '3d', 'webgl', 'voxel', 'minecraft-style', 'source-code'],
    developer: 'Krishna Patil Rajput',
    platform: 'WebGL / Browser',
    genre: 'Sandbox / Building',
    author: 'Krishna Patil Rajput',
    publisher: 'Krishna Patil Rajput',
    price: 100,
    discountPrice: 100,
    rating: 5.0,
    reviewsCount: 112,
    pages: 'Source Code',
    language: 'English',
    format: ['ZIP Archive', 'WebGL'],
    isBestseller: true,
    isNew: true,
    publishedDate: '2026',
    learnings: ['3D WebGL Rendering', 'Three.js Scene Management', 'Voxel Grid Logic', 'Camera Orbit & Pointer Lock Controls'],
    features: ['3D Voxel Engine', 'Multiple Block Types', 'Pointer Lock Controls'],
    whatsIncluded: ['Complete 3D Source Code', 'Texture Atlas & Assets', 'Setup Documentation'],
    requirements: ['Modern Browser with WebGL support'],
    contents: [{ title: '3D Voxel World', duration: 'Three.js/WebGL' }],
    estimatedValue: '₹1,499 Value',
    whyBuyNow: 'Get full commercial license and 3D engine source code for just ₹100 ($1).'
  },

  // -------------------------------------------------------------
  // 7. WEBSTORE — LITTLE LEARNERS HUB (₹382)
  // -------------------------------------------------------------
  {
    id: 'little-learners-hub',
    slug: 'little-learners-hub',
    number: '07',
    title: 'Little Learners Hub',
    subtitle: 'Educational Web App Source Code for Early Childhood Learning',
    category: 'web',
    categoryLabel: 'WEB APPLICATION',
    priceINR: 382,
    priceDisplay: '₹382',
    image: '/assets/Little learners Hub Gumroad.png',
    coverImage: '/assets/Little learners Hub Gumroad.png',
    gallery: [
      '/assets/Little learners Hub Gumroad.png',
      '/assets/Little-Learners-Hub 1.png',
      '/assets/Little-Learners-Hub 2.png'
    ],
    images: [
      '/assets/Little learners Hub Gumroad.png',
      '/assets/Little-Learners-Hub 1.png',
      '/assets/Little-Learners-Hub 2.png'
    ],
    shortDescription: 'An engaging, interactive web application featuring educational quizzes, phonics soundboards, and learning modules for early childhood education.',
    valueProp: 'Complete educational web application source code.',
    description: 'Little Learners Hub is a production-ready React web application designed for early childhood learning. Features colorful interactive cards, audio soundboards, math quizzes, and progress tracking built with modern web technologies.',
    benefits: [
      { number: '01', title: 'Complete EdTech Codebase', desc: 'Full React & Tailwind CSS application ready to launch or customize.' },
      { number: '02', title: 'Phonics Soundboard', desc: 'Interactive audio triggers for letters, numbers, and pronunciations.' },
      { number: '03', title: 'Math & Logic Quizzes', desc: 'Dynamic score calculation and cheerful animations for kids.' },
      { number: '04', title: 'Fully Responsive UI', desc: 'Works seamlessly on tablets, smartphones, and desktop computers.' }
    ],
    youMightWantThisIf: [
      'You want to launch an interactive learning platform for kids',
      'You want a clean React EdTech codebase for a school or client project',
      'You want to customize a production web app with audio soundboard logic'
    ],
    audience: [
      { title: 'EdTech Developers', desc: 'Educators and creators building digital learning tools.' },
      { title: 'React Developers', desc: 'Developers wanting a clean, polished frontend codebase.' }
    ],
    whatYouGet: [
      'Full React + Tailwind Source Code (ZIP Archive)',
      'Audio & Graphic Assets Pack',
      'Instant access on Gumroad'
    ],
    whatMakesItUseful: [
      'Modular React components with built-in audio soundboard and quiz engines.'
    ],
    beforeYouBuy: [
      'Requires Node.js installed for local development.',
      'Instant ZIP download fulfilled via Gumroad.'
    ],
    isRightForYou: {
      goodFit: [
        'Creators wanting a ready-made EdTech web platform.'
      ],
      mayNotBe: [
        'Non-technical users who cannot run node commands.'
      ]
    },
    details: {
      type: 'Web Application',
      category: 'EdTech Source Code',
      edition: 'Full Commercial License',
      delivery: 'ZIP Download',
      purchasePlatform: 'Gumroad'
    },
    gumroadUrl: 'https://krishnapatilrajput.gumroad.com/l/littlelearnershub',
    buyLink: 'https://krishnapatilrajput.gumroad.com/l/littlelearnershub',
    tags: ['web', 'react', 'edtech', 'source-code', 'frontend'],
    author: 'Krishna Patil Rajput',
    publisher: 'Krishna Patil Rajput',
    price: 382,
    discountPrice: 382,
    rating: 4.9,
    reviewsCount: 64,
    pages: 'Web App',
    language: 'English',
    format: ['Source Code', 'React'],
    isBestseller: false,
    isNew: true,
    publishedDate: '2026',
    learnings: ['React Component Architecture', 'Web Audio API for Phonics', 'Interactive Quiz State Logic', 'Tailwind CSS Styling'],
    features: ['Phonics & Alphabet Soundboard', 'Interactive Math Quizzes', 'Child-Friendly UI/UX'],
    contents: [{ title: 'Educational Platform', duration: 'Full App' }],
    hoursSaved: '80+ Hours of EdTech Engineering',
    estimatedValue: '₹2,499 Value',
    whyBuyNow: 'Launch your interactive EdTech app today for just ₹382.'
  },

  // -------------------------------------------------------------
  // 8. WEBSTORE — LINKEDIN CLONE (₹957)
  // -------------------------------------------------------------
  {
    id: 'linkedin-clone-react',
    slug: 'linkedin-clone-react',
    number: '08',
    title: '🔥 LinkedIn Clone — Full Stack React Social Network (Source Code)',
    subtitle: 'Production-Ready Full-Stack Social Network Platform',
    category: 'web',
    categoryLabel: 'FULL STACK APPLICATION',
    priceINR: 957,
    priceDisplay: '₹957',
    image: '/assets/Linked in 1.png',
    coverImage: '/assets/Linked in 1.png',
    gallery: [
      '/assets/Linked in 1.png',
      '/assets/Linked in 2.png',
      '/assets/Linked in 3.png',
      '/assets/Linked in 4.png',
      '/assets/Linked in 5.png'
    ],
    images: [
      '/assets/Linked in 1.png',
      '/assets/Linked in 2.png',
      '/assets/Linked in 3.png',
      '/assets/Linked in 4.png',
      '/assets/Linked in 5.png'
    ],
    shortDescription: 'A complete full-stack LinkedIn social media network clone with authentication, post creation, image uploads, real-time messaging, and profile management.',
    valueProp: 'Full-stack professional social network platform source code.',
    description: 'Launch your own professional social network! Features real-time feed, post creation with image uploads, user authentication, profile customization, connection requests, and responsive luxury dark/light UI built with React, Firebase/Node, and Tailwind CSS.',
    benefits: [
      { number: '01', title: 'Full Social Network Codebase', desc: 'Includes auth, post feeds, media uploads, and database setup.' },
      { number: '02', title: 'User Profiles & Connections', desc: 'Custom profile pages, connection requests, and user bios.' },
      { number: '03', title: 'Media Storage & Uploads', desc: 'Integrated file storage for post attachments and avatars.' },
      { number: '04', title: 'Modern Tech Stack', desc: 'Built with React, Redux/Zustand, Firebase, and Tailwind CSS.' }
    ],
    youMightWantThisIf: [
      'You are building a social platform, community hub, or niche network',
      'You want a high-caliber full-stack React project for your portfolio',
      'You want to save 150+ hours of full-stack social network development'
    ],
    audience: [
      { title: 'Full-Stack Developers', desc: 'Engineers wanting a production social app foundation.' },
      { title: 'Startup Builders', desc: 'Founders building niche professional community platforms.' }
    ],
    whatYouGet: [
      'Complete Frontend & Backend Source Code (ZIP Archive)',
      'Step-by-step Setup & Deployment Guide',
      'Instant delivery via Gumroad'
    ],
    whatMakesItUseful: [
      'Saves 150+ hours of full-stack engineering with clean modular architecture.'
    ],
    beforeYouBuy: [
      'Requires basic React & Node/Firebase knowledge for setup.',
      'Instant ZIP download delivered via Gumroad.'
    ],
    isRightForYou: {
      goodFit: [
        'Developers building social apps or showcasing full-stack skills.'
      ],
      mayNotBe: [
        'Absolute non-coders needing zero-code setups.'
      ]
    },
    details: {
      type: 'Full Stack App',
      category: 'Social Platform Source Code',
      edition: 'Full Commercial License',
      delivery: 'ZIP Download',
      purchasePlatform: 'Gumroad'
    },
    gumroadUrl: 'https://krishnapatilrajput.gumroad.com/l/linkedin-clone-react',
    buyLink: 'https://krishnapatilrajput.gumroad.com/l/linkedin-clone-react',
    tags: ['web', 'react', 'full-stack', 'social-network', 'source-code', 'firebase'],
    featured: true,
    author: 'Krishna Patil Rajput',
    publisher: 'Krishna Patil Rajput',
    price: 957,
    discountPrice: 957,
    rating: 5.0,
    reviewsCount: 142,
    pages: 'Full Stack App',
    language: 'English',
    format: ['Source Code', 'React', 'Node/Firebase'],
    isBestseller: true,
    isNew: true,
    publishedDate: '2026'
  },

  // -------------------------------------------------------------
  // 9. ROBLOX — EXPLORE THE WORLD (FREE)
  // -------------------------------------------------------------
  {
    id: 'roblox-explore-world',
    slug: 'explore-the-world-roblox',
    number: '09',
    title: '🌍 EXPLORE THE WORLD',
    subtitle: 'Roblox Adventure Game by Krishna Patil',
    category: 'roblox',
    categoryLabel: 'ROBLOX ONLINE (16+)',
    priceINR: 0,
    priceDisplay: 'FREE TO PLAY',
    image: '/assets/Games/Explore World.png',
    coverImage: '/assets/Games/Explore World.png',
    gallery: [
      '/assets/Games/Explore World.png',
      '/assets/Games/Explore World 2.png',
      '/assets/Games/Explore World 3.png'
    ],
    images: [
      '/assets/Games/Explore World.png',
      '/assets/Games/Explore World 2.png',
      '/assets/Games/Explore World 3.png'
    ],
    shortDescription: 'Explore a vast world and begin your journey across different areas and environments.',
    valueProp: 'Immersive Roblox adventure experience by Krishna Patil.',
    description: `Explore World

Enter a vast world and begin your journey. Travel across different areas, explore the environment, and discover places you have never seen before.

Take your time and explore the world.

Developer: Krishna Patil Rajput
Krishna Ajaysing Patil`,
    benefits: [
      { number: '01', title: 'Epic Exploration', desc: 'Discover a vast world filled with unique environments.' },
      { number: '02', title: 'Community Play', desc: 'Join thousands of players in a shared online universe.' },
      { number: '03', title: 'Dynamic Events', desc: 'Participate in time-limited seasonal events and challenges.' },
      { number: '04', title: 'Advanced Mechanics', desc: 'Smooth controls and engaging gameplay loops designed for all ages.' }
    ],
    youMightWantThisIf: [
      'You love open-world exploration games on Roblox',
      'You are looking for a high-quality adventure experience',
      'You enjoy discovering secrets and completing quests'
    ],
    audience: [
      { title: 'Roblox Players', desc: 'Gamers looking for premium exploration content.' },
      { title: 'Adventure Fans', desc: 'Players who enjoy world-building and discovery.' }
    ],
    whatYouGet: [
      'Instant access to the Roblox game',
      'Exclusive in-game badges for KrishnaStore fans',
      'Regular content updates'
    ],
    whatMakesItUseful: [
      'A professionally designed Roblox world with deep lore and exploration mechanics.'
    ],
    beforeYouBuy: [
      'Requires a Roblox account and the Roblox player installed.',
      'This is a free-to-play online experience.'
    ],
    isRightForYou: {
      goodFit: [
        'Fans of adventure and exploration games.'
      ],
      mayNotBe: [
        'If you prefer competitive shooter-style games only.'
      ]
    },
    details: {
      type: 'Online Game',
      category: 'Roblox / Adventure',
      edition: 'Free to Play',
      delivery: 'Instant Roblox Link',
      purchasePlatform: 'Roblox'
    },
    gumroadUrl: 'https://www.roblox.com/games/16555963621/EXPLORE-THE-WORLD',
    buyLink: 'https://www.roblox.com/games/16555963621/EXPLORE-THE-WORLD',
    demoLink: 'https://www.roblox.com/games/16555963621/EXPLORE-THE-WORLD',
    tags: ['games', 'roblox', 'online', 'adventure', 'krishna'],
    developer: 'Krishna Ajaysing Patil',
    platform: 'Roblox',
    genre: 'Adventure / Exploration',
    publishedDate: '2024',
    hoursSaved: 'Infinite Fun',
    estimatedValue: 'Premium Experience'
  },

  // -------------------------------------------------------------
  // 10. ROBLOX — POWER JUMP CHALLENGE (FREE)
  // -------------------------------------------------------------
  {
    id: 'roblox-power-jump',
    slug: 'power-jump-challenge-roblox',
    number: '10',
    title: '⚡ Power Jump Challenge',
    subtitle: 'Roblox Parkour & Skill Game',
    category: 'roblox',
    categoryLabel: 'ROBLOX ONLINE (16+)',
    priceINR: 0,
    priceDisplay: 'FREE TO PLAY',
    image: '/assets/Games/Power Jump.png',
    coverImage: '/assets/Games/Power Jump.png',
    gallery: [
      '/assets/Games/Power Jump.png',
      '/assets/Games/Power Jump 2.png',
      '/assets/Games/Power Jump Win.png'
    ],
    images: [
      '/assets/Games/Power Jump.png',
      '/assets/Games/Power Jump 2.png',
      '/assets/Games/Power Jump Win.png'
    ],
    shortDescription: 'How high can you jump? Build your power and conquer challenging platforms in this intense Obby.',
    valueProp: 'Competitive Roblox Parkour challenge.',
    description: `Power Jump Challenge

How high can you jump?

Start your journey and build your Jump Power as you play! Jump across challenging platforms, overcome obstacles, reach the goal, and become the ultimate jumper!

FEATURES
Jump Power increases over time
Challenging Obby stages
Reach the goal to win
Skip Stage option
Mobile-friendly gameplay
More stages coming soon!

Can you make it to the finish?

Like & Favorite the game if you enjoy it!

Developed by Krishna Patil Rajput
Developer: Krishna Ajaysing Patil`,
    benefits: [
      { number: '01', title: 'Reflex Testing', desc: 'Sharpen your timing and movement precision.' },
      { number: '02', title: 'Global Leaderboards', desc: 'Compete with players worldwide for the fastest completion time.' },
      { number: '03', title: 'Vibrant Design', desc: 'Enjoy high-energy visuals and sound effects.' },
      { number: '04', title: 'Unlockable Rewards', desc: 'Earn skins and trails as you conquer harder levels.' }
    ],
    youMightWantThisIf: [
      'You enjoy challenging parkour games',
      'You want to test your gaming skills and speed',
      'You like competing for high scores'
    ],
    audience: [
      { title: 'Skill Gamers', desc: 'Players who enjoy mastering movement mechanics.' },
      { title: 'Obby Enthusiasts', desc: 'Roblox fans who love obstacle courses.' }
    ],
    whatYouGet: [
      'Access to all challenge levels',
      'Participation in seasonal leaderboards',
      'Multiplayer racing modes'
    ],
    whatMakesItUseful: [
      'Highly addictive and rewarding skill-based gameplay.'
    ],
    beforeYouBuy: [
      'Roblox account required.',
      'Works on mobile, tablet, and PC.'
    ],
    isRightForYou: {
      goodFit: [
        'Players looking for a fast-paced skill challenge.'
      ],
      mayNotBe: [
        'If you find difficult platforming frustrating.'
      ]
    },
    details: {
      type: 'Online Game',
      category: 'Roblox / Obby',
      edition: 'Free to Play',
      delivery: 'Instant Roblox Link',
      purchasePlatform: 'Roblox'
    },
    gumroadUrl: 'https://www.roblox.com/games/131814858703149/Power-Jump-Challenge',
    buyLink: 'https://www.roblox.com/games/131814858703149/Power-Jump-Challenge',
    demoLink: 'https://www.roblox.com/games/131814858703149/Power-Jump-Challenge',
    tags: ['games', 'roblox', 'online', 'parkour', 'skill'],
    developer: 'Krishna Ajaysing Patil',
    platform: 'Roblox',
    genre: 'Obby / Parkour',
    publishedDate: '2024',
    hoursSaved: 'Speedrun Ready',
    estimatedValue: 'Skill Challenge'
  },

  // -------------------------------------------------------------
  // 11. ROBLOX — OBBY ADVENTURE PARKOUR (FREE)
  // -------------------------------------------------------------
  {
    id: 'roblox-obby-adventure',
    slug: 'obby-adventure-parkour-roblox',
    number: '11',
    title: '🏃 Obby Adventure Parkour',
    subtitle: 'Classic Roblox Obby Experience',
    category: 'roblox',
    categoryLabel: 'ROBLOX ONLINE (16+)',
    priceINR: 0,
    priceDisplay: 'FREE TO PLAY',
    image: '/assets/Games/Obby Adventure.png',
    coverImage: '/assets/Games/Obby Adventure.png',
    gallery: [
      '/assets/Games/Obby Adventure.png',
      '/assets/Games/Obby Adventure 1.png',
      '/assets/Games/Obby Adventure pourkour.png',
      '/assets/Games/Obby adventure Paourkour.png'
    ],
    images: [
      '/assets/Games/Obby Adventure.png',
      '/assets/Games/Obby Adventure 1.png',
      '/assets/Games/Obby Adventure pourkour.png',
      '/assets/Games/Obby adventure Paourkour.png'
    ],
    shortDescription: 'Test your jumping, timing, and parkour skills across challenging stages! Can you reach the finish line?',
    valueProp: 'Fun and creative Roblox Obby for all ages.',
    description: `🏆 Welcome to Ultimate Obby Challenge!

Think you can reach the finish line? Test your jumping, timing, and parkour skills across challenging stages!

🚩 Checkpoints
🧱 Tricky Platforms
⚡ Challenging Obstacles
🏃 Fast-Paced Parkour
🏆 Multiple Stages

Challenge your friends, beat the stages, and see who can make it furthest!

Can you complete the ultimate obby? 🔥

❤️ Like the game
⭐ Favorite the experience
👥 Invite your friends

👨‍💻 Developer: Krishna Patil Rajput
By Krishna Ajaysing Patil`,
    benefits: [
      { number: '01', title: 'Creative Levels', desc: 'Play through unique, artistically designed stages.' },
      { number: '02', title: 'Friendly Gameplay', desc: 'Accessible to beginners while still fun for pros.' },
      { number: '03', title: 'Social Integration', desc: 'Easy to invite and play with friends.' },
      { number: '04', title: 'Frequent Updates', desc: 'New stages added regularly based on community feedback.' }
    ],
    youMightWantThisIf: [
      'You want a fun, lighthearted parkour experience',
      'You enjoy playing with friends in a creative environment',
      'You are new to Roblox Obbies'
    ],
    audience: [
      { title: 'Casual Gamers', desc: 'Players looking for fun, non-stressful gameplay.' },
      { title: 'Family & Friends', desc: 'Great for playing together in groups.' }
    ],
    whatYouGet: [
      'Full access to the adventure map',
      'Friend-party support',
      'Progress saving features'
    ],
    whatMakesItUseful: [
      'Provides hours of entertainment with a focus on fun and creativity.'
    ],
    beforeYouBuy: [
      'Roblox account required.',
      'Optimized for all Roblox-supported devices.'
    ],
    isRightForYou: {
      goodFit: [
        'Anyone looking for a fun time on Roblox.'
      ],
      mayNotBe: [
        'If you are looking for an extremely difficult, hardcore challenge.'
      ]
    },
    details: {
      type: 'Online Game',
      category: 'Roblox / Adventure',
      edition: 'Free to Play',
      delivery: 'Instant Roblox Link',
      purchasePlatform: 'Roblox'
    },
    gumroadUrl: 'https://www.roblox.com/games/103997615677142/Obby-Adventure-parkour',
    buyLink: 'https://www.roblox.com/games/103997615677142/Obby-Adventure-parkour',
    demoLink: 'https://www.roblox.com/games/103997615677142/Obby-Adventure-parkour',
    tags: ['games', 'roblox', 'online', 'parkour', 'adventure'],
    developer: 'Krishna Ajaysing Patil',
    platform: 'Roblox',
    genre: 'Obby / Parkour',
    publishedDate: '2024',
    hoursSaved: 'Endless Adventure',
    estimatedValue: 'Creative Fun'
  }
];

if (PRODUCTS.length !== 11) {
  console.warn(`KrishnaStores catalog error: expected 11 products, found ${PRODUCTS.length}`);
}

export const products = PRODUCTS;
export default PRODUCTS;
