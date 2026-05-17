export interface BlogPost {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  category: string;
  publishDate: string;
  updatedDate: string;
  readingTime: number;
  featuredImage: string;
  featuredImageAlt: string;
  color: string;
  excerpt: string;
  tags: string[];
  sections: Section[];
}

export interface Section {
  id: string;
  heading: string;
  level: 2 | 3;
  content: string;
  bullets?: string[];
  image?: { src: string; alt: string; caption: string };
}

export const blogPosts: BlogPost[] = [
  {
    slug: "web-engineering",
    title: "Web Engineering in 2025: Building the Next Dimension of Digital Experiences",
    seoTitle: "Web Engineering 2025: Next-Gen Development Guide | Mantra Devs",
    metaDescription: "Discover how Mantra Devs approaches modern web engineering — from React Server Components to edge computing. A deep-dive into building scalable, fast, and beautiful web applications.",
    category: "Web Engineering",
    publishDate: "May 10, 2025",
    updatedDate: "May 16, 2025",
    readingTime: 8,
    featuredImage: "/blog/web.png",
    featuredImageAlt: "Futuristic glowing code structure representing modern web engineering",
    color: "#6366f1",
    excerpt: "The web is no longer just a document viewer. It is a living, breathing platform. Here is how we engineer it at Mantra Devs.",
    tags: ["React", "Next.js", "Performance", "Scalability", "TypeScript"],
    sections: [
      {
        id: "what-is-modern-web-engineering",
        heading: "What is Modern Web Engineering?",
        level: 2,
        content: "Web engineering today is the discipline of crafting performant, accessible, and scalable digital experiences. It goes far beyond writing HTML and CSS — it encompasses architecture decisions, state management, server strategies, build pipelines, and the invisible art of making milliseconds matter.",
      },
      {
        id: "the-stack-we-use",
        heading: "The Stack We Use at Mantra Devs",
        level: 2,
        content: "We don't chase hype. We chase outcomes. Our core stack is battle-tested and chosen for one reason: it lets us ship quality products fast without sacrificing long-term maintainability.",
        bullets: [
          "Next.js 15 with App Router for hybrid SSR/SSG/ISR",
          "TypeScript for end-to-end type safety",
          "Tailwind CSS v4 for utility-first, design-token-driven styling",
          "React Query for smart server-state management",
          "Zod for runtime schema validation",
          "Vercel Edge Network for global deployment",
        ],
      },
      {
        id: "performance-is-a-feature",
        heading: "Performance is a Feature, Not an Afterthought",
        level: 2,
        content: "Every 100ms of load time costs conversion rates. We engineer for the Core Web Vitals from day one — not as a post-launch patch. Our checklist includes code-splitting, lazy loading, image optimization, critical CSS extraction, and preconnect hints to third-party origins.",
        image: { src: "/blog/web.png", alt: "Performance metrics dashboard showing excellent web vitals", caption: "Core Web Vitals should be green from day one, not fixed after launch." },
      },
      {
        id: "architecture-decisions",
        heading: "Key Architecture Decisions That Change Everything",
        level: 2,
        content: "Choosing between a monolith, micro-frontends, or a headless architecture is one of the highest-leverage decisions you will make. At Mantra Devs, we default to simplicity — then scale complexity only when the product demands it.",
        bullets: [
          "Start with a well-structured monorepo (Turborepo)",
          "Use Server Components for data-heavy UIs, Client Components for interactivity",
          "Adopt feature-based folder structure over layer-based",
          "Deploy to edge runtimes for global sub-50ms TTFB",
        ],
      },
      {
        id: "our-development-process",
        heading: "Our Engineering Process: From Figma to Production",
        level: 2,
        content: "Great engineering starts before a single line of code is written. Our process includes design system alignment, API contract definition, and feature flagging — ensuring that every deploy is a controlled, reversible event, not a prayer.",
      },
    ],
  },
  {
    slug: "ai-integration",
    title: "AI Integration: How We Make Your Product Intelligent Without the Hype",
    seoTitle: "AI Integration for Products: Practical Guide 2025 | Mantra Devs",
    metaDescription: "Mantra Devs breaks down practical AI integration — LLMs, embeddings, RAG systems, and AI-powered UX. Learn how to add real intelligence to your product without the fluff.",
    category: "AI Integration",
    publishDate: "May 12, 2025",
    updatedDate: "May 16, 2025",
    readingTime: 10,
    featuredImage: "/blog/ai.png",
    featuredImageAlt: "Neural network nodes interconnected by glowing light filaments",
    color: "#ec4899",
    excerpt: "AI is the most powerful tool of our generation. But most integrations miss the point. Here is how we do it right.",
    tags: ["AI", "LLMs", "OpenAI", "RAG", "Machine Learning", "GPT"],
    sections: [
      {
        id: "beyond-chatgpt-wrappers",
        heading: "Beyond ChatGPT Wrappers: Real AI Integration",
        level: 2,
        content: "Anyone can put a chat box on a website and call it 'AI-powered'. Real integration means weaving intelligence into your product's core workflows — from intelligent search and personalized recommendations to automated document processing and predictive analytics.",
      },
      {
        id: "our-ai-toolkit",
        heading: "Our AI Toolkit",
        level: 2,
        content: "We pick tools based on the specific problem, not the marketing material. Our toolkit spans the full spectrum of modern AI development.",
        bullets: [
          "OpenAI GPT-4o for complex reasoning and generation tasks",
          "Google Gemini for multimodal (text + image) workflows",
          "Vercel AI SDK for seamless streaming UI integration",
          "Pinecone / pgvector for vector embeddings and semantic search",
          "LangChain for orchestrating multi-step AI pipelines",
          "Whisper API for speech-to-text capabilities",
        ],
      },
      {
        id: "rag-systems",
        heading: "RAG Systems: Making AI Know Your Business",
        level: 2,
        content: "Retrieval-Augmented Generation (RAG) is the secret to making AI actually useful for your specific domain. Instead of relying on a model's frozen training data, RAG lets the AI query your own knowledge base in real time — giving accurate, up-to-date, and grounded answers.",
        image: { src: "/blog/ai.png", alt: "Diagram showing RAG pipeline with vector database and LLM", caption: "RAG architecture connects your private data to the reasoning power of large language models." },
      },
      {
        id: "ai-ux-principles",
        heading: "AI UX: Designing for Trust and Delight",
        level: 2,
        content: "The best AI feature is one users don't realize is AI — they just feel like the product is magical. We apply specific UX principles when designing AI-powered interactions: progressive disclosure, confidence indicators, graceful fallbacks, and always keeping the human in control.",
        bullets: [
          "Show AI uncertainty with confidence scores, not confident hallucinations",
          "Stream responses for a live, responsive feel",
          "Provide edit-and-regenerate controls for AI-generated content",
          "Implement feedback loops to improve model performance over time",
        ],
      },
    ],
  },
  {
    slug: "mobile-verse",
    title: "Mobile Verse: Building Apps That Feel Native, Scale Like the Web",
    seoTitle: "Mobile App Development 2025: React Native & Flutter Guide | Mantra Devs",
    metaDescription: "How Mantra Devs builds cross-platform mobile apps that feel truly native. A deep-dive into React Native, Expo, and the architecture decisions that make or break a mobile product.",
    category: "Mobile Verse",
    publishDate: "May 8, 2025",
    updatedDate: "May 16, 2025",
    readingTime: 9,
    featuredImage: "/blog/mobile.png",
    featuredImageAlt: "Futuristic smartphone screens floating in space with holographic UI",
    color: "#8b5cf6",
    excerpt: "The smartphone is the most personal computer ever built. Here is how we engineer experiences worthy of that intimacy.",
    tags: ["React Native", "Expo", "Mobile", "iOS", "Android", "Cross-platform"],
    sections: [
      {
        id: "native-vs-cross-platform",
        heading: "The Native vs. Cross-Platform Debate: Our Honest Take",
        level: 2,
        content: "For 90% of products, React Native with Expo delivers an experience indistinguishable from native — at a fraction of the cost and timeline. The remaining 10% are apps that push hardware boundaries: high-performance games, AR applications, and those requiring deep OS-level access.",
      },
      {
        id: "our-mobile-stack",
        heading: "Our Mobile Stack in 2025",
        level: 2,
        content: "We have refined our mobile stack over dozens of shipped apps. Every choice is deliberate.",
        bullets: [
          "React Native + Expo SDK 52 (managed workflow)",
          "Expo Router v4 for file-based navigation",
          "Zustand for lightweight global state",
          "TanStack Query for server state and caching",
          "Reanimated 3 for 60fps animations on the UI thread",
          "EAS Build + EAS Submit for seamless CI/CD to app stores",
        ],
      },
      {
        id: "performance-on-mobile",
        heading: "Performance: The Make-or-Break Factor on Mobile",
        level: 2,
        content: "Mobile users are merciless. A 300ms jank and they leave. Our performance checklist includes hermes engine optimizations, memoization strategies, virtualized lists for large data sets, and image caching with expo-image.",
        image: { src: "/blog/mobile.png", alt: "Mobile performance monitoring dashboard", caption: "Smooth 60fps animations are a requirement, not a luxury, on mobile platforms." },
      },
      {
        id: "offline-first-architecture",
        heading: "Offline-First Architecture: Building for the Real World",
        level: 2,
        content: "In Nepal and across emerging markets, network connectivity is unreliable. We design mobile apps to work perfectly offline and sync gracefully when connectivity returns — using optimistic UI updates and conflict-resolution strategies that users never see.",
        bullets: [
          "WatermelonDB for local-first relational data",
          "Background sync queues for deferred server mutations",
          "Optimistic UI patterns for instant perceived performance",
          "Conflict-free replicated data types (CRDTs) for complex sync scenarios",
        ],
      },
    ],
  },
  {
    slug: "cloud-architect",
    title: "Cloud Architecture: Designing Systems That Never Sleep",
    seoTitle: "Cloud Architecture Best Practices 2025 | Mantra Devs Nepal",
    metaDescription: "Mantra Devs shares our cloud architecture principles — from multi-region deployments to serverless functions and infrastructure as code. Build infrastructure that scales with zero drama.",
    category: "Cloud Architect",
    publishDate: "May 6, 2025",
    updatedDate: "May 16, 2025",
    readingTime: 11,
    featuredImage: "/blog/cloud.png",
    featuredImageAlt: "Interconnected server nodes with flowing cyan data streams",
    color: "#06b6d4",
    excerpt: "Your infrastructure is your product's foundation. Build it wrong and everything above it will crack. Here is how we build it right.",
    tags: ["AWS", "GCP", "Serverless", "DevOps", "Kubernetes", "Infrastructure as Code"],
    sections: [
      {
        id: "cloud-first-mindset",
        heading: "The Cloud-First Mindset",
        level: 2,
        content: "Cloud-first does not mean 'everything on one cloud provider'. It means designing your system to leverage managed services, elastic scaling, and global distribution from the very beginning — before you need it, so you are ready when you do.",
      },
      {
        id: "our-infrastructure-stack",
        heading: "Our Infrastructure Stack",
        level: 2,
        content: "We are provider-agnostic but pragmatic. We use the best service for each job, regardless of which cloud it lives on.",
        bullets: [
          "AWS / GCP for primary compute, storage, and networking",
          "Vercel / Cloudflare Pages for frontend CDN and edge functions",
          "Supabase / PlanetScale for managed PostgreSQL",
          "Terraform for infrastructure as code",
          "GitHub Actions for CI/CD pipelines",
          "Grafana + Prometheus for observability and alerting",
        ],
      },
      {
        id: "zero-downtime-deployments",
        heading: "Zero-Downtime Deployments: A Non-Negotiable",
        level: 2,
        content: "Every deployment is a risk. We minimize that risk with blue-green deployments, canary releases, and automated rollback triggers. Our deployments are designed to be events your users never notice.",
        image: { src: "/blog/cloud.png", alt: "Blue-green deployment diagram showing traffic switching", caption: "Blue-green deployments ensure zero-downtime releases by keeping a warm standby environment ready." },
      },
      {
        id: "cost-optimization",
        heading: "Cost Optimization Without Sacrificing Reliability",
        level: 2,
        content: "Cloud bills are the silent startup killer. We implement FinOps practices from day one: right-sizing instances, using spot/preemptible VMs for batch workloads, setting hard budget alerts, and architecting data pipelines to minimize egress costs.",
        bullets: [
          "Reserved instances for predictable baseline workloads",
          "Spot instances for fault-tolerant batch processing",
          "S3 Intelligent-Tiering for automatic storage cost optimization",
          "CloudFront caching to dramatically reduce origin request costs",
        ],
      },
    ],
  },
  {
    slug: "design-systems",
    title: "Design Systems: The Invisible Architecture That Makes Great Products",
    seoTitle: "Building a Design System in 2025: Complete Guide | Mantra Devs",
    metaDescription: "How Mantra Devs builds and maintains design systems that scale. From design tokens and component libraries to documentation and governance — everything you need to ship consistently.",
    category: "Design Systems",
    publishDate: "May 4, 2025",
    updatedDate: "May 16, 2025",
    readingTime: 9,
    featuredImage: "/blog/design.png",
    featuredImageAlt: "Floating glassmorphism panels showing color palettes and typography grids",
    color: "#f59e0b",
    excerpt: "A great design system is the difference between a product that scales beautifully and one that becomes a visual chaos of one-off decisions.",
    tags: ["Design System", "Figma", "Storybook", "Tokens", "Component Library", "UI/UX"],
    sections: [
      {
        id: "what-is-a-design-system",
        heading: "What is a Design System (Really)?",
        level: 2,
        content: "A design system is not a component library. It is not a Figma file. It is the shared language between designers and engineers — a set of decisions, encoded as reusable components and documented conventions, that ensures every product surface feels intentionally crafted.",
      },
      {
        id: "design-tokens",
        heading: "Design Tokens: The Foundation of Everything",
        level: 2,
        content: "Design tokens are the atomic values of your system: colors, spacing, typography, shadows, and radii — expressed as named variables that bridge Figma and code. When a token changes, every component using it updates automatically.",
        bullets: [
          "Semantic tokens (e.g., --color-primary) over raw values (e.g., #6366f1)",
          "Tier your tokens: global → semantic → component-specific",
          "Use Style Dictionary to transform tokens for any platform (CSS, iOS, Android)",
          "Sync tokens between Figma (via Tokens Studio) and your codebase automatically",
        ],
      },
      {
        id: "component-architecture",
        heading: "Component Architecture: Building for Composability",
        level: 2,
        content: "We follow the Compound Component and Polymorphic Component patterns for maximum flexibility. Every component is built with a clear API contract, accessibility built in, and comprehensive Storybook stories documenting every variant.",
        image: { src: "/blog/design.png", alt: "Component library documentation showing button variants and states", caption: "Every component needs documented states: default, hover, focus, active, disabled, and loading." },
      },
      {
        id: "governance-and-adoption",
        heading: "Governance: The Part Everyone Skips",
        level: 2,
        content: "A design system without governance is a graveyard. We establish clear ownership, contribution guidelines, versioning strategies (semver), and breaking change policies. The system only creates value if teams actually use it — which means making contribution easier than going rogue.",
        bullets: [
          "Designate a design system team with dedicated bandwidth",
          "Use Chromatic for visual regression testing on every PR",
          "Publish a public-facing changelog for every release",
          "Run quarterly audits to identify drift and deprecate unused components",
        ],
      },
    ],
  },
  {
    slug: "it-training",
    title: "IT Training Redefined: Crafting Market-Ready Engineers with Real-Life Projects",
    seoTitle: "IT Training Nepal 2025: Learn React, Next.js, NestJS | Mantra Devs",
    metaDescription: "Join Mantra Devs IT training program in Nepal. Master frontend (HTML, CSS, JS, React, Next.js, Tailwind) and backend (NestJS) development through real-life projects and Git/GitHub workflows.",
    category: "IT Training",
    publishDate: "May 15, 2025",
    updatedDate: "May 16, 2025",
    readingTime: 7,
    featuredImage: "/blog/custom.png",
    featuredImageAlt: "Modern developer environment indicating premium project-focused IT training",
    color: "#10b981",
    excerpt: "The gap between theory and industry is huge. Here is how we train developers at Mantra Devs using real-world stacks and modern deployment workflows.",
    tags: ["IT Training", "Next.js", "React", "NestJS", "Tailwind CSS", "GitHub", "Backend"],
    sections: [
      {
        id: "the-industry-gap",
        heading: "The Industry Gap: Why Traditional IT Training Fails",
        level: 2,
        content: "Most academic and basic IT training centers focus on theoretical textbooks or simple 'Todo App' tutorials that do not prepare you for production. At Mantra Devs, we believe in immersive, project-first training that mimics a real-world software studio. We treat our students like junior developers, not passive listeners.",
      },
      {
        id: "the-stack-we-teach",
        heading: "The Tech Stack: Master Frontend and Backend Development",
        level: 2,
        content: "We teach the exact modern stack we use in our day-to-day studio client projects. You will master the ultimate modern development stack from scratch:",
        bullets: [
          "Frontend Essentials: HTML5, CSS3, and modern JavaScript (ES6+)",
          "Advanced Frontend: React 19 and Next.js 15 for lightning-fast server-rendered websites",
          "Modern Styling: Tailwind CSS v4 for clean, highly responsive modern user interfaces",
          "Production Backend: NestJS (TypeScript Node.js framework) for robust, scalable, and secure API architectures",
          "Version Control & Deployments: Git & GitHub workflows for collaborative development and seamless CI/CD deployments",
        ],
      },
      {
        id: "real-world-projects",
        heading: "Hands-On Learning: Building Real-Life Market-Ready Projects",
        level: 2,
        content: "No more boring quizzes or hypothetical scenarios. You will spend 90% of your time writing real code, building fully fledged full-stack applications. From designing database schemas to setting up REST APIs in NestJS and building responsive React/Next.js interfaces, you will experience the complete life cycle of product engineering. Your portfolio will actually stand out to employers.",
        image: { src: "/blog/custom.png", alt: "Hands-on programming workflow with visual code screens", caption: "Write real, production-ready code from day one and build a portfolio that stands out." },
      },
      {
        id: "launch-your-career",
        heading: "Launch Your Career: Mentorship & Professional Workflows",
        level: 2,
        content: "We don't just teach syntax — we teach software engineering best practices. You will learn to commit clean code, open pull requests, perform code reviews, and deploy your projects live via modern cloud platforms. By the end of this program, your skills will be completely market-ready and industry-aligned.",
      },
    ],
  },
];
