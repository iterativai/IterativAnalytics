// Application constants

// User types
export const USER_TYPES = {
  STARTUP: 'startup',
  INVESTOR: 'investor',
  CONSULTANT: 'consultant',
};

// Plan types
export const PLAN_TYPES = {
  BUSINESS_PLAN: 'business_plan',
  PITCH_DECK: 'pitch_deck',
  FINANCIAL_MODEL: 'financial_model',
  MARKETING_PLAN: 'marketing_plan',
};

// Benefits for the landing page (outcome-focused)
export const benefits = [
  {
    title: "70% Faster Planning Cycles",
    description: "Cut weeks of work into days. Our AI handles the heavy lifting while you focus on strategy and execution.",
    icon: "fas fa-clock"
  },
  {
    title: "3x Higher Funding Success",
    description: "Companies using our platform secure funding 3 times more often than traditional approaches.",
    icon: "fas fa-trophy"
  },
  {
    title: "Real-Time Market Insights",
    description: "Stay ahead with continuous benchmarking against industry standards and competitor analysis.",
    icon: "fas fa-chart-line"
  },
  {
    title: "Investor-Grade Quality",
    description: "Every document is optimized to meet investor expectations and pass due diligence with confidence.",
    icon: "fas fa-award"
  }
];

// Statistics for benefits section
export const statistics = [
  {
    value: "87%",
    label: "Funding Success Rate"
  },
  {
    value: "70%",
    label: "Time Saved"
  },
  {
    value: "3.2x",
    label: "ROI Improvement"
  },
  {
    value: "5,000+",
    label: "Businesses Helped"
  }
];

// Features for the features section
export const featuresList = [
  // For startups - option 1 (Upload & Evaluate)
  {
    title: "Document Analysis",
    description: "Upload your existing business plans and get AI-powered feedback and scoring.",
    icon: "fas fa-file-alt",
    benefits: [
      "Instant scoring across 5 key dimensions",
      "Detailed improvement suggestions",
      "Industry benchmarking",
      "Export analysis to PDF"
    ],
    category: "startups",
    option: 1
  },
  {
    title: "Plan Optimization",
    description: "Receive actionable insights to improve your business plans for better results.",
    icon: "fas fa-chart-line",
    benefits: [
      "Section-by-section recommendations",
      "Market fit analysis",
      "Financial projections review",
      "Risk assessment"
    ],
    category: "startups",
    option: 1
  },
  {
    title: "Pitch Deck Scoring",
    description: "Get your pitch deck rated for investor appeal and presentation quality.",
    icon: "fas fa-presentation",
    benefits: [
      "Clarity and message scoring",
      "Visual design feedback",
      "Narrative flow analysis",
      "Investor perspective insights"
    ],
    category: "startups",
    option: 1
  },
  
  // For startups - option 2 (Build with AI)
  {
    title: "AI Co-founder",
    description: "Work with AI to build your business plan from the ground up.",
    icon: "fas fa-robot",
    benefits: [
      "Interactive plan building",
      "Industry-specific templates",
      "Real-time suggestions",
      "Guided step-by-step process"
    ],
    category: "startups",
    option: 2
  },
  {
    title: "Financial Modeling",
    description: "Create detailed financial projections with our intelligent modeling tools.",
    icon: "fas fa-chart-pie",
    benefits: [
      "Revenue projections",
      "Expense forecasting",
      "Cash flow analysis",
      "Break-even calculations"
    ],
    category: "startups",
    option: 2
  },
  {
    title: "Market Analysis",
    description: "Get AI-powered market research and competitive analysis for your business.",
    icon: "fas fa-search",
    benefits: [
      "Industry trends analysis",
      "Competitor benchmarking",
      "Target market identification",
      "Growth opportunity spotting"
    ],
    category: "startups",
    option: 2
  },
  
  // For investors
  {
    title: "Deal Flow Management",
    description: "Streamline your evaluation process for more efficient deal assessment.",
    icon: "fas fa-filter",
    benefits: [
      "Centralized proposal management",
      "Standardized evaluation criteria",
      "Batch processing capabilities",
      "Due diligence workflow"
    ],
    category: "investors"
  },
  {
    title: "Business Plan Analysis",
    description: "Get objective AI-powered scoring of business plans to supplement your expertise.",
    icon: "fas fa-calculator",
    benefits: [
      "Risk factor identification",
      "Financial projection validation",
      "Market opportunity assessment",
      "Founder capability analysis"
    ],
    category: "investors"
  },
  {
    title: "Comparative Analytics",
    description: "Compare multiple business proposals across standardized metrics.",
    icon: "fas fa-balance-scale",
    benefits: [
      "Side-by-side comparison tools",
      "Industry benchmarking",
      "Historical performance context",
      "Portfolio fit assessment"
    ],
    category: "investors"
  },
  
  // For partners
  {
    title: "Accelerator Toolkit",
    description: "Enhance your startup mentoring with AI-powered evaluation and feedback tools.",
    icon: "fas fa-rocket",
    benefits: [
      "Cohort progress tracking",
      "Mentor feedback integration",
      "Startup readiness assessment",
      "Progress reporting"
    ],
    category: "partners"
  },
  {
    title: "Advisor Dashboard",
    description: "Monitor client progress and provide value-added feedback with AI assistance.",
    icon: "fas fa-chalkboard-teacher",
    benefits: [
      "Client portfolio management",
      "Progress milestone tracking",
      "Feedback augmentation",
      "Performance benchmarking"
    ],
    category: "partners"
  },
  {
    title: "Collaboration Tools",
    description: "Facilitate seamless teamwork between advisors and founders with shared workspaces.",
    icon: "fas fa-users",
    benefits: [
      "Real-time document editing",
      "Comment and feedback system",
      "Version history tracking",
      "Role-based permissions"
    ],
    category: "partners"
  },
  
  // General features
  {
    title: "AI-Powered Insights",
    description: "Leverage advanced AI analysis across all aspects of business planning.",
    icon: "fas fa-brain",
    benefits: [
      "Natural language processing",
      "Trend prediction",
      "Pattern recognition",
      "Contextual recommendations"
    ],
    category: "general"
  },
  {
    title: "Secure Document Storage",
    description: "Keep all your business documents safe and accessible in one place.",
    icon: "fas fa-lock",
    benefits: [
      "Bank-level encryption",
      "Role-based access control",
      "Audit trail",
      "Automatic backups"
    ],
    category: "general"
  },
  {
    title: "Export & Sharing",
    description: "Share your plans and analyses with stakeholders in multiple formats.",
    icon: "fas fa-share-alt",
    benefits: [
      "PDF, DOCX, and PPTX export",
      "Secure link sharing",
      "Presentation mode",
      "Email delivery"
    ],
    category: "general"
  }
];

// How it works steps
export const howItWorksSteps = {
  startupsOption1: [
    {
      icon: "fas fa-upload",
      title: "Upload Your Document",
      description: "Upload your existing business plan, pitch deck, or financial model in any standard format."
    },
    {
      icon: "fas fa-robot",
      title: "AI Analysis",
      description: "Our AI evaluates your document across multiple dimensions including feasibility, scalability, and market fit."
    },
    {
      icon: "fas fa-chart-bar",
      title: "Get Your Score",
      description: "Receive a comprehensive score with detailed breakdown of strengths and weaknesses."
    },
    {
      icon: "fas fa-lightbulb",
      title: "Review Suggestions",
      description: "Explore actionable recommendations to improve specific sections of your document."
    },
    {
      icon: "fas fa-sync",
      title: "Iterate & Improve",
      description: "Update your document based on feedback and resubmit for improved scoring."
    }
  ],
  startupsOption2: [
    {
      icon: "fas fa-chess-knight",
      title: "Choose Your Strategy",
      description: "Select from industry-specific templates or start from scratch with guided assistance."
    },
    {
      icon: "fas fa-puzzle-piece",
      title: "Build Step by Step",
      description: "Work through each section with AI suggestions and best practices guidance."
    },
    {
      icon: "fas fa-chart-line",
      title: "Create Financials",
      description: "Generate realistic financial projections with our intuitive modeling tools."
    },
    {
      icon: "fas fa-check-circle",
      title: "Review & Refine",
      description: "Get real-time feedback as you build to ensure your plan meets investor standards."
    },
    {
      icon: "fas fa-file-export",
      title: "Export & Present",
      description: "Export your completed plan in multiple formats ready for investor presentation."
    }
  ],
  investors: [
    {
      icon: "fas fa-folder-open",
      title: "Import Proposals",
      description: "Upload business plans and pitch decks from your deal flow for standardized analysis."
    },
    {
      icon: "fas fa-microscope",
      title: "Automated Due Diligence",
      description: "Let AI identify potential risks and validate key assumptions in each proposal."
    },
    {
      icon: "fas fa-sort-amount-up",
      title: "Score & Rank",
      description: "Review objective scoring across multiple dimensions to compare opportunities."
    },
    {
      icon: "fas fa-comment-alt",
      title: "Add Your Insights",
      description: "Complement AI analysis with your own notes and evaluations."
    },
    {
      icon: "fas fa-hands-helping",
      title: "Share Feedback",
      description: "Provide constructive feedback to founders with AI-generated improvement suggestions."
    }
  ],
  partners: [
    {
      icon: "fas fa-user-plus",
      title: "Onboard Clients",
      description: "Add startups to your advisor dashboard for centralized oversight and management."
    },
    {
      icon: "fas fa-diagnoses",
      title: "Assess & Benchmark",
      description: "Evaluate client documents against industry standards and success patterns."
    },
    {
      icon: "fas fa-edit",
      title: "Provide Guidance",
      description: "Offer expert advice augmented by AI insights tailored to each client's needs."
    },
    {
      icon: "fas fa-tasks",
      title: "Track Progress",
      description: "Monitor improvement over time with milestone tracking and progress visualization."
    },
    {
      icon: "fas fa-award",
      title: "Certify Readiness",
      description: "Help clients achieve investor-readiness and connect them to funding opportunities."
    }
  ]
};

// Testimonials for the testimonials section
export const testimonials = [
  {
    author: "Sarah Johnson",
    position: "CEO, TechVenture Inc.",
    quote: "Iterativ Planner transformed our approach to business planning. The AI insights helped us identify critical gaps in our strategy that we had completely overlooked.",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    author: "Michael Chen",
    position: "Angel Investor",
    quote: "As an investor reviewing dozens of plans monthly, this platform helps me efficiently evaluate proposals with standardized metrics while still preserving my decision autonomy.",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    author: "Lena Williams",
    position: "Founder, EcoStart",
    quote: "The financial modeling tools saved us countless hours. What would have taken weeks with spreadsheets was done in days, and with far greater accuracy and investor-ready presentation.",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg"
  }
];

// Pricing tiers
export const PRICING_TIERS = {
  FREE: {
    name: 'Free',
    price: 0,
    documentsPerMonth: 1,
    aiReviewsPerMonth: 1,
    collaborators: 0,
    features: [
      'Basic document analysis',
      'Score overview',
      'Limited AI feedback',
    ],
  },
  STARTUP: {
    name: 'Startup',
    price: 29,
    documentsPerMonth: 5,
    aiReviewsPerMonth: 10,
    collaborators: 2,
    features: [
      'Advanced document analysis',
      'Comprehensive scoring',
      'Detailed AI feedback',
      'Export to PDF',
      'Team collaboration',
    ],
  },
  BUSINESS: {
    name: 'Business',
    price: 99,
    documentsPerMonth: 20,
    aiReviewsPerMonth: 50,
    collaborators: 10,
    features: [
      'Premium document analysis',
      'Unlimited scoring',
      'Priority AI feedback',
      'Export to multiple formats',
      'Advanced team collaboration',
      'Custom branding',
      'API access',
    ],
  },
};

// FAQ questions for the landing page
export const FAQ_ITEMS = [
  {
    question: 'What is Iterativ Planner?',
    answer: 'Iterativ Planner is an AI-powered platform that helps entrepreneurs and businesses create, analyze, and optimize their business plans and pitch decks. Our platform provides detailed feedback, scoring, and improvement suggestions using advanced AI technology.',
  },
  {
    question: 'How does the AI analysis work?',
    answer: 'Our AI technology analyzes your business documents across multiple dimensions including feasibility, scalability, financial health, innovation, and market fit. The system identifies strengths and weaknesses, provides specific improvement suggestions, and compares your plan against industry standards.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes, we take data security very seriously. All documents are encrypted, and we follow industry best practices for data protection. Your documents are only accessible to you and anyone you explicitly share them with.',
  },
  {
    question: 'Can I collaborate with my team?',
    answer: 'Yes, our Startup and Business plans allow for team collaboration. You can invite team members to view and edit your documents, and everyone can see the AI feedback and improvement suggestions.',
  },
  {
    question: 'What file formats are supported?',
    answer: 'We currently support PDF, DOCX, PPTX, and TXT file formats. You can also create documents directly within our platform using our built-in editor.',
  },
  {
    question: 'How accurate is the AI feedback?',
    answer: 'Our AI system is trained on thousands of successful business plans and pitch decks. While the feedback is highly valuable, we recommend using it as a guide rather than a definitive assessment. The AI continues to improve with each analysis.',
  },
  {
    question: 'Can I export my analyzed documents?',
    answer: 'Yes, you can export your documents along with the AI analysis in PDF format. Business plan subscribers can export to additional formats including DOCX and PPTX.',
  },
  {
    question: 'Is there a free trial available?',
    answer: 'Yes, you can sign up for our Free plan which allows you to analyze one document per month. This gives you a chance to experience the platform before upgrading to a paid plan.',
  },
];

// Document analysis dimensions
export const ANALYSIS_DIMENSIONS = {
  FEASIBILITY: 'feasibility',
  SCALABILITY: 'scalability',
  FINANCIAL_HEALTH: 'financialHealth',
  INNOVATION: 'innovation',
  MARKET_FIT: 'marketFit',
};

// Performance tiers for document analysis
export const PERFORMANCE_TIERS = {
  EXCEPTIONAL: 'exceptional',
  STRONG: 'strong',
  GOOD: 'good',
  NEEDS_WORK: 'needsWork',
  CRITICAL: 'critical',
};

// Demo information
export const DEMO = {
  EMAIL: 'demo@iterativplanner.com',
  PASSWORD: 'demouser123',
};