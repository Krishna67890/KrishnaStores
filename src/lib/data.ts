import { Book, Game } from "@/types";

export const books: Book[] = [
  // 1. Digital Survival Guide
  {
    id: "digital-survival-guide",
    slug: "digital-survival-guide",
    title: "The Digital Survival Guide",
    subtitle: "Essential Digital Security, Privacy & Tech Survival Handbook",
    author: "Krishna Patil Rajput",
    publisher: "Krishna Patil Rajput",
    price: 75,
    discountPrice: 75,
    buyLink: "https://krishnapatilrajput.gumroad.com/l/digital-survival-guide",
    description: "The Digital Survival Guide breaks down essential digital privacy, security practices, password protection, and online survival strategies in simple, actionable terms.",
    coverImage: "/assets/web-roadmap-1.png",
    images: [
      "/assets/web-roadmap-1.png",
      "/assets/web-roadmap-2.png"
    ],
    category: "Programming",
    tags: ["books", "Security", "Privacy", "Guide", "Digital"],
    rating: 4.8,
    reviewsCount: 120,
    pages: "45",
    language: "English",
    format: ["PDF"],
    isBestseller: false,
    isNew: true,
    publishedDate: "2026",
    learnings: [
      "Digital Privacy & Security",
      "Password & Identity Protection",
      "Data Encryption Fundamentals",
      "Online Safety Protocols"
    ],
    whyBuy: [
      { title: "Essential Protection", description: "Learn key privacy and security skills to safeguard your digital footprint." }
    ],
    features: ["Beginners", "Developers", "Students"],
    contents: [
      { title: "Digital Privacy Basics", duration: "Chapter 1" }
    ]
  },

  // 2. Android App Development with React Native
  {
    id: "android-app-development-react-native-2026",
    slug: "android-app-development-react-native-2026",
    title: "Android App Development with React Native (2026 Edition)",
    subtitle: "Build Professional Android Apps with Modern React Native",
    author: "Krishna Patil Rajput",
    publisher: "Krishna Patil Rajput",
    price: 2096,
    discountPrice: 299,
    buyLink: "https://krishnapatilrajput.gumroad.com/l/android-app-development-react-native-2026",
    description: "Stop wasting time switching between scattered tutorials and outdated resources. This comprehensive guide provides a structured roadmap covering React Native fundamentals through production-ready Android development.\n\nLearn how to create beautiful mobile applications, integrate modern backend services, implement authentication, optimize performance, and publish applications professionally.",
    aiVoice: "Master the complete Android application development journey using React Native, JavaScript, TypeScript, Firebase, APIs, AI integration, and deployment techniques.",
    whyWritten: "Designed for beginners as well as aspiring mobile developers, this book combines theory with practical examples and portfolio-ready projects.",
    coverImage: "/assets/android-native-2026.png",
    images: [
      "/assets/Android Native React 1.png",
      "/assets/Android Native React 2.png",
      "/assets/android-native-2026.png",
      "/assets/android-react-1.png",
      "/assets/android-react-2.png"
    ],
    category: "Programming",
    tags: ["books", "Android", "React Native", "Mobile Dev", "2026"],
    rating: 4.9,
    reviewsCount: 156,
    pages: "50",
    language: "English",
    format: ["PDF"],
    isBestseller: true,
    isNew: true,
    publishedDate: "2026",
    learnings: [
      "React Native Fundamentals",
      "JavaScript & TypeScript",
      "Expo & Navigation",
      "Components & Hooks",
      "State Management",
      "REST APIs & Firebase",
      "Push Notifications",
      "Performance Optimization",
      "Google Play Publishing"
    ],
    whyBuy: [
      { title: "Learn Modern React Native", description: "Master the latest React Native development practices for 2026." },
      { title: "Practical Code Examples", description: "Understand concepts through real coding examples." }
    ],
    features: [
      "Computer Science Students",
      "React Native Beginners",
      "Android Developers"
    ],
    contents: [
      { title: "Environment & Architecture", duration: "Module 1" }
    ]
  },

  // 3. Why Was I Only an Option?
  {
    id: "why-was-i-only-an-option",
    slug: "why-was-i-only-an-option",
    title: "Why Was I Only an Option?",
    subtitle: "A Journey Through Love, Heartbreak, Healing & Self-Worth",
    author: "Aniket S. Kardile",
    publisher: "Krishna Patil Rajput",
    price: 2096,
    discountPrice: 477,
    buyLink: "https://krishnapatilrajput.gumroad.com/l/why-was-i-only-an-option",
    description: "Some experiences change us forever. This heartfelt book explores the emotional journey of love, heartbreak, healing, and rediscovering self-worth.\n\nThrough thoughtful reflections and relatable life lessons, readers are encouraged to let go of unhealthy attachments, rebuild confidence, and embrace personal growth.",
    aiVoice: "A Journey Through Love, Heartbreak, Healing & Self-Worth. This book offers compassionate guidance and encouragement to help you move forward with strength and hope.",
    whyWritten: "Whether you're healing from a difficult relationship or seeking emotional clarity, this book offers compassionate guidance and encouragement to help you move forward with strength and hope.",
    coverImage: "/assets/Why Was I Only An Option.png",
    images: [
      "/assets/Why Was I Only An Option 1.png",
      "/assets/Why Was I Only An Option 2.png",
      "/assets/Why Was I Only An Option 3.png",
      "/assets/why-only-an-option.png",
      "/assets/why-option-1.png",
      "/assets/why-option-2.png",
      "/assets/why-option-3.png"
    ],
    category: "Self-Help",
    tags: ["books", "Love", "Heartbreak", "Healing", "Self-Worth"],
    rating: 5.0,
    reviewsCount: 240,
    pages: 97,
    language: "English",
    format: ["PDF"],
    isBestseller: true,
    isNew: false,
    publishedDate: "2024",
    learnings: [
      "Understanding Heartbreak",
      "Emotional Healing",
      "Letting Go",
      "Self Worth"
    ],
    whyBuy: [
      { title: "Emotional Healing", description: "Gain practical insights for navigating heartbreak and emotional recovery." }
    ],
    features: [
      "Young Adults",
      "Personal Growth Readers"
    ],
    contents: [
      { title: "The Silent Awakening", duration: "Chapter 1-5" }
    ]
  },

  // 4. Web Development Fundamentals & Advanced Concepts
  {
    id: "web-dev-2026",
    slug: "web-development-roadmap-2026",
    title: "Web Development Fundamentals & Advanced Concepts (2026 Edition)",
    subtitle: "Become a Modern Full-Stack Web Developer",
    author: "Krishna Patil Rajput",
    publisher: "Krishna Patil Rajput",
    price: 2096,
    discountPrice: 94,
    buyLink: "https://krishnapatilrajput.gumroad.com/l/web-development-roadmap-2026",
    description: "Instead of spending months watching disconnected tutorials and reading outdated blogs, this book provides a complete learning roadmap in one well-organized resource.\n\nCovering everything from web fundamentals to modern development workflows, it helps readers build strong programming foundations while creating practical projects that prepare them for internships, freelance work, and software development careers.",
    aiVoice: "Become a Modern Full-Stack Web Developer. Master HTML, CSS, JavaScript, React, Node.js, MongoDB, APIs, Authentication, Deployment, and modern web technologies through a structured roadmap designed for beginners and aspiring professionals.",
    whyWritten: "In an era where technology evolves every week, I saw many students getting lost in a 'tutorial hell' of scattered resources. I wrote this roadmap to provide a clear, concise, and structured path through the chaos.",
    coverImage: "/assets/web-dev-roadmap-2026.png",
    images: [
      "/assets/Web devlopment roadmap 1.png",
      "/assets/Web Devlopment Roadmap 2.png",
      "/assets/web-dev-roadmap-2026.png",
      "/assets/web-roadmap-1.png",
      "/assets/web-roadmap-2.png"
    ],
    category: "Programming",
    tags: ["books", "Web Dev", "Full Stack", "Roadmap", "2026"],
    rating: 4.9,
    reviewsCount: 184,
    pages: "Complete Guide",
    language: "English",
    format: ["PDF"],
    isBestseller: true,
    isNew: true,
    publishedDate: "2026",
    learnings: [
      "HTML5 & CSS3 Advanced Layouts",
      "Responsive Design with Tailwind CSS",
      "JavaScript ES6+ & TypeScript",
      "DOM Manipulation & Web APIs"
    ],
    whyBuy: [
      { title: "Complete Roadmap", description: "Learn from beginner concepts to advanced development." }
    ],
    features: [
      "Students",
      "Beginners",
      "Self Learners"
    ],
    contents: [
      {
        title: "Foundation of the Web",
        duration: "Week 1-2",
        subChapters: ["How the Internet Works", "HTML5 Semantic Tags"]
      }
    ]
  }
];

export const games: Game[] = [
  // 5. Candy Match Game
  {
    id: "candy-match-game",
    slug: "candy-match-game",
    title: "Candy Match Game",
    subtitle: "Interactive HTML5 Match-3 Game Source Code",
    developer: "Krishna Patil Rajput",
    platform: "HTML5 / Web Browser",
    genre: "Puzzle / Arcade",
    price: 100,
    discountPrice: 100,
    buyLink: "https://krishnapatilrajput.gumroad.com/l/candy-match-game",
    itchUrl: "https://krishnapatilrajput.itch.io/candy-match-game",
    description: "A vibrant, fully responsive HTML5 Match-3 puzzle game with smooth animations, custom sound effects, and clean JavaScript architecture.",
    coverImage: "/assets/Candy-Match 1.png",
    images: [
      "/assets/Candy-Match 1.png",
      "/assets/Candy-Match 2.png",
      "/assets/Candy-Match 3.png"
    ],
    category: "game",
    tags: ["games", "html5", "javascript", "match-3", "source-code"],
    features: [
      "Responsive Canvas/HTML",
      "Sound Effects & SFX",
      "Score & Combo System"
    ],
    whatsIncluded: [
      "Full Source Code (ZIP)",
      "Asset Pack (Images & Audio)"
    ],
    requirements: [
      "Any Web Browser"
    ]
  },

  // 6. BlockCraft Builder
  {
    id: "blockcraft-builder-dream-house-edition",
    slug: "blockcraft-builder-dream-house-edition",
    title: "🏡 BlockCraft Builder: Dream House Edition",
    subtitle: "Creative 3D Block Building Game Engine",
    developer: "Krishna Patil Rajput",
    platform: "WebGL / Browser",
    genre: "Sandbox / Building",
    price: 100,
    discountPrice: 100,
    buyLink: "https://krishnapatilrajput.gumroad.com/l/BlockCraft-Builder-Dream-House-Edition",
    itchUrl: "https://krishnapatilrajput.itch.io/blockcraft-builder-dream-house-edition",
    description: "A voxel-style 3D block building game engine allowing players to design and construct dream houses directly in the browser.",
    coverImage: "/assets/BlockCraft-Builder-Dream-House-Edition.png",
    images: [
      "/assets/BlockCraft-Builder-Dream-House-Edition.png",
      "/assets/Blockcraft 1.png",
      "/assets/Blockcraft 2.png",
      "/assets/Blockcraft 3.png",
      "/assets/Blockcraft 4.png"
    ],
    category: "game",
    tags: ["games", "3d", "webgl", "voxel", "minecraft-style", "source-code"],
    features: [
      "3D Voxel Engine",
      "Multiple Block Types",
      "Pointer Lock Controls"
    ],
    whatsIncluded: [
      "Complete 3D Source Code",
      "Texture Atlas & Assets"
    ],
    requirements: [
      "Modern Browser with WebGL"
    ]
  }
];

export const webProducts = [
  // 7. Little Learners Hub
  {
    id: "little-learners-hub",
    slug: "little-learners-hub",
    title: "Little Learners Hub",
    subtitle: "Educational Web App Source Code for Early Childhood Learning",
    description: "An engaging, interactive web application featuring educational quizzes, phonics soundboards, and learning modules for early childhood education.",
    price: 382,
    discountPrice: 382,
    coverImage: "/assets/Little learners Hub Gumroad.png",
    images: [
      "/assets/Little learners Hub Gumroad.png",
      "/assets/Little-Learners-Hub 1.png",
      "/assets/Little-Learners-Hub 2.png"
    ],
    category: "Website Store",
    tags: ["web", "react", "edtech", "source-code"],
    buyLink: "https://krishnapatilrajput.gumroad.com/l/littlelearnershub"
  },

  // 8. LinkedIn Clone
  {
    id: "linkedin-clone-react",
    slug: "linkedin-clone-react",
    title: "🔥 LinkedIn Clone — Full Stack React Social Network (Source Code)",
    subtitle: "Production-Ready Full-Stack Social Network Platform",
    description: "A complete full-stack LinkedIn social media network clone with authentication, post creation, image uploads, real-time messaging, and profile management.",
    price: 957,
    discountPrice: 957,
    coverImage: "/assets/Linked in 1.png",
    images: [
      "/assets/Linked in 1.png",
      "/assets/Linked in 2.png",
      "/assets/Linked in 3.png",
      "/assets/Linked in 4.png",
      "/assets/Linked in 5.png"
    ],
    category: "Website Store",
    tags: ["web", "react", "full-stack", "social-network", "source-code"],
    buyLink: "https://krishnapatilrajput.gumroad.com/l/linkedin-clone-react"
  }
];

export const bundles = [
  {
    id: "the-programming-powerhouse",
    slug: "the-programming-powerhouse",
    title: "The Programming Powerhouse Bundle",
    subtitle: "Web + Android Mastery Roadmap",
    description: "Master both modern web development and professional mobile app development with this curated bundle. Perfect for developers looking to become truly full-stack across platforms.",
    price: 4192,
    discountPrice: 899,
    coverImage: "/assets/web-dev-roadmap-2026.png",
    booksIncluded: [
      "Web Development Fundamentals & Advanced Concepts (2026 Edition)",
      "Android App Development with React Native (2026 Edition)"
    ],
    features: ["Save ₹3,293", "Lifetime Updates", "Exclusive Discord Access"],
    category: "Programming"
  },
  {
    id: "the-ultimate-growth-pack",
    slug: "the-ultimate-growth-pack",
    title: "The Ultimate Growth Pack",
    subtitle: "Healing, Coding & Career Bundle",
    description: "A comprehensive collection covering emotional healing, programming foundations, and career success strategies.",
    price: 6288,
    discountPrice: 1299,
    coverImage: "/assets/Why Was I Only An Option.png",
    booksIncluded: [
      "Web Development Fundamentals & Advanced Concepts (2026 Edition)",
      "Android App Development with React Native (2026 Edition)",
      "Why Was I Only an Option?"
    ],
    features: ["All-in-One Success Kit", "Best Value", "Career Coaching Call"],
    category: "Elite"
  }
];

export const galleryImages = [
  { id: "1", src: "/assets/Web devlopment roadmap 1.png", title: "Core Fundamentals", alt: "Web Development Roadmap - Core Fundamentals", category: "Programming", slug: "web-development-roadmap-2026" },
  { id: "2", src: "/assets/Web Devlopment Roadmap 2.png", title: "Modern Tech Stack", alt: "Modern Web Tech Stack 2026", category: "Programming", slug: "web-development-roadmap-2026" },
  { id: "3", src: "/assets/Android Native React 1.png", title: "Mobile UI Patterns", alt: "React Native Mobile UI Patterns", category: "Programming", slug: "android-app-development-react-native-2026" },
  { id: "4", src: "/assets/Android Native React 2.png", title: "App Architecture", alt: "Mobile App Architecture", category: "Programming", slug: "android-app-development-react-native-2026" },
  { id: "5", src: "/assets/Why Was I Only An Option 1.png", title: "Emotional Resilience", alt: "Emotional Resilience Chapter Preview", category: "Self-Help", slug: "why-was-i-only-an-option" },
  { id: "6", src: "/assets/Why Was I Only An Option 2.png", title: "Healing Process", alt: "Healing Process Visualized", category: "Self-Help", slug: "why-was-i-only-an-option" },
  { id: "7", src: "/assets/Why Was I Only An Option 3.png", title: "Self-Worth Reflections", alt: "Self-Worth Reflections", category: "Self-Help", slug: "why-was-i-only-an-option" }
];

export const upcomingBooks = [
  { title: "AI Agents & Prompt Engineering", category: "AI" },
  { title: "JavaScript Mastery", category: "Programming" },
  { title: "React.js Complete Guide", category: "Programming" },
  { title: "Firebase & Backend Development", category: "Development" },
  { title: "Cybersecurity Fundamentals", category: "Security" },
  { title: "Coding Interview Preparation", category: "Career" },
  { title: "Cloud Computing Essentials", category: "Cloud" },
  { title: "Git & GitHub Masterclass", category: "Tools" },
];

export const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Software Engineer",
    content: "The Web Development Roadmap book is a game changer. It saved me months of searching for the right resources.",
    avatar: "/avatars/user1.jpg"
  },
  {
    name: "Priya Patel",
    role: "Student",
    content: "Why Was I Only an Option? helped me navigate through a very tough time. Truly grateful for this content.",
    avatar: "/avatars/user2.jpg"
  },
  {
    name: "Amit Singh",
    role: "Data Scientist",
    content: "Premium quality books with practical examples. The AI roadmap is incredibly detailed.",
    avatar: "/avatars/user3.jpg"
  }
];
