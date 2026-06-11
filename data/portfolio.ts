export const navLinks = [
  { href: "#home", icon: "fa-home", label: "Home" },
  { href: "#about", icon: "fa-user", label: "About" },
  { href: "#education", icon: "fa-graduation-cap", label: "Education" },
  { href: "#certifications", icon: "fa-certificate", label: "Certifications" },
  { href: "#experience", icon: "fa-briefcase", label: "Experience" },
  { href: "#skills", icon: "fa-cogs", label: "Skills" },
  { href: "#achievements", icon: "fa-trophy", label: "Achievements" },
  { href: "#projects", icon: "fa-code", label: "Projects" },
  { href: "#additional-info", icon: "fa-info-circle", label: "Additional Info" },
  { href: "#contact", icon: "fa-envelope", label: "Contact" },
] as const;

export const aboutParagraphs = [
  "Software Development Engineer focused on agentic AI systems, distributed backend architecture, and production-grade LLM orchestration. I design and ship event-driven microservices, multi-step inference pipelines, and REST/JSON service layers using Python, FastAPI, Node.js, Redis, Kafka, React.js, and Next.js.",
  "At Rapid Innovation (Ruh AI), I engineered a Workflow Orchestrator for autonomous agents — multi-step LLM pipelines with OpenClaw/Hermes runtimes, Kafka/Redis event buses, SQL-backed auth microservices, automated sandbox deployment, and Grafana/SigNoz observability for latency and system health at scale.",
  "Grounded in core CS — data structures, algorithms, OOP/SOLID, low-level design, system design, and query optimization — I build fault-tolerant, high-throughput systems and operate effectively in ambiguous, fast-paced Agile product environments.",
];

export const education = [
  {
    title: "Bachelor of Technology (B.Tech)",
    subtitle: "Computer Science Engineering (Data Science)",
    school: "ABES Institute of Technology, Ghaziabad, India",
    detail: "2020 – 2024 | Percentage: 75.4%",
    extra:
      "Coursework: Data Structures & Algorithms, Object-Oriented Design, Low-Level Design (LLD), System Design, Database Systems, Operating Systems, Networking, Concurrency, Complexity Analysis (Big-O)",
  },
  {
    title: "Senior Secondary (XII)",
    subtitle: "Science — CBSE",
    school: "Saraswati Vidya Mandir, Sultanpur, UP",
    detail: "CBSE Board | 88%",
  },
];

export type ProjectLink = { label: string; href: string; icon: string };

export type Certification = {
  title: string;
  subtitle: string;
  description: string;
  links?: ProjectLink[][];
};

export const certifications: Certification[] = [
  {
    title: "Intensive Java Programming Certification",
    subtitle: "ABESIT • 2023",
    description:
      "Validated proficiency in object-oriented architecture, algorithmic problem-solving, and modular Java design patterns.",
  },
  {
    title: "Smart India Hackathon 2022 — Ranker",
    subtitle: "Ministry of Education, Govt. of India • 2022",
    description:
      "Ranked for the Centralised Grievance System Portal — a role-based grievance routing platform connecting AKTU institutions to AICTE.",
    links: [
      [
        {
          label: "View Certificate",
          href: "https://github.com/adiri77/SIH-2022/blob/main/sih.jpg",
          icon: "fas fa-certificate",
        },
      ],
    ],
  },
];

export const experiences = [
  {
    role: "Software Development Engineer",
    company: "Rapid Innovation (Product: Ruh AI)",
    period: "May 2025 – Present | Remote, India",
    bullets: [
      "Engineer core services on an Agentic Workforce Platform — end-to-end AI agent creation, sandboxed runtime provisioning, and automated deployment pipelines.",
      "Designed and implemented a Workflow Orchestrator for multi-step LLM pipelines with user-defined DAG-style agent task flows.",
      "Architected event-driven agent execution using Python, FastAPI, Node.js, LangChain, Redis, and Kafka for low-latency, fault-tolerant orchestration.",
      "Integrated OpenClaw and Hermes agent runtimes with pluggable backend selection per workflow configuration.",
      "Built REST microservices and SQL-backed auth/lifecycle services with secure HTTP/JSON inter-service communication.",
      "Wired OpenAI, Codex, Claude Code, and external LLM API key management for production agent deployments.",
      "Optimized inference latency via prompt engineering, Redis caching, and algorithmic hot-path improvements.",
      "Instrumented Grafana and SigNoz dashboards for distributed tracing, logging, and real-time system health monitoring.",
      "Applied OOP/SOLID and fault-tolerance patterns for high-throughput distributed workloads.",
      "Contributed React.js/Next.js frontend modules for orchestration UI and platform administration.",
    ],
  },
  {
    role: "Software Development Engineer",
    company: "Rapid Innovation",
    period: "July 2024 – May 2025 | Noida, India",
    bullets: [
      "Shipped production React.js/Next.js SPAs with reusable component libraries and clean separation of concerns.",
      "Implemented Stripe payment integration and multi-role RBAC admin dashboards.",
      "Integrated REST APIs across a multi-tier architecture for scalable frontend-backend communication.",
      "Participated in Agile SDLC — sprint planning, code reviews, and cross-team system design discussions.",
      "Collaborated on data-flow optimization and reliability improvements across platform services.",
    ],
  },
  {
    role: "Software Development Intern",
    company: "Rapid Innovation",
    period: "April 2024 – July 2024 | Ghaziabad, India",
    bullets: [
      "Built Next.js interfaces for an internal deployment platform with REST API integration and ops dashboards.",
      "Connected monitoring/analytics APIs for deployment visibility and runtime metrics.",
      "Profiled and resolved frontend rendering bottlenecks — reduced latency on critical user paths.",
    ],
  },
];

export const skillCategories = [
  {
    icon: "fa-brain",
    title: "AI & LLM Engineering",
    skills: [
      "Prompt Engineering",
      "LangChain",
      "RAG Pipelines",
      "AI Agents",
      "Agentic Workflows",
      "OpenClaw",
      "Hermes",
      "OpenAI APIs",
      "Anthropic APIs",
      "Vector Databases",
      "Embedding Pipelines",
    ],
  },
  {
    icon: "fa-server",
    title: "Backend & Distributed Systems",
    skills: [
      "Python",
      "FastAPI",
      "Node.js",
      "REST APIs",
      "Microservices",
      "Redis",
      "Kafka",
      "Event-Driven Architecture",
      "SQL",
      "Fault-Tolerant Systems",
      "High Availability",
    ],
  },
  {
    icon: "fa-network-wired",
    title: "Orchestration & Architecture",
    skills: [
      "Workflow Orchestrator Systems",
      "Multi-step LLM Pipelines",
      "API Orchestration",
      "System Design",
      "Low-Level Design (LLD)",
      "Multi-tier Systems",
      "Distributed Computing",
    ],
  },
  {
    icon: "fa-laptop-code",
    title: "Frontend",
    skills: ["React.js", "Next.js", "React Flow", "JavaScript", "TypeScript", "Zustand", "HTML5", "CSS3"],
  },
  {
    icon: "fa-chart-bar",
    title: "Observability & Performance",
    skills: [
      "Grafana",
      "SigNoz",
      "OpenTelemetry Concepts",
      "Logging & Monitoring",
      "Latency Optimization",
      "Performance Benchmarking",
    ],
  },
  {
    icon: "fa-sitemap",
    title: "Core CS & Engineering Practices",
    skills: [
      "Data Structures & Algorithms",
      "OOP & SOLID",
      "Design Patterns",
      "C++",
      "Database Systems",
      "Query Optimization",
      "CI/CD",
      "Git",
      "Agile/SDLC",
    ],
  },
];

export const projects = [
  {
    title: "Ruh AI Agentic Platform",
    tech: "FastAPI • Python • Node.js • LangChain • OpenClaw • Hermes • Redis • Kafka • Grafana • SigNoz • React Flow",
    bullets: [
      "Production Agentic Workforce Platform — design, deploy, and execute end-to-end AI agents in isolated sandbox runtimes.",
      "Visual Workflow Orchestrator (React Flow) for composing multi-step agent DAGs with configurable task dependencies.",
      "Kafka/Redis event bus for real-time task distribution with fault-tolerant, low-latency execution semantics.",
      "Pluggable OpenClaw/Hermes agent backends with OpenAI, Anthropic, and Claude Code API interfaces.",
      "Grafana/SigNoz instrumentation for agent latency profiling and resource consumption benchmarking.",
    ],
    links: [
      [{ label: "Source Code", href: "https://github.com/adiri77", icon: "fab fa-github" }],
    ] as ProjectLink[][],
  },
  {
    title: "ModuMentor: Multi-Agent AI Automation System",
    tech: "AutoGen • Gemini 1.5 • FastAPI • Python • MCP Tools • React.js",
    bullets: [
      "Agentic system with AutoGen + Gemini 1.5 as the core reasoning engine for dynamic task decomposition.",
      "Autonomous agents with tool-calling architecture for multi-step execution with contextual state.",
      "Integrated 5 MCP tools: Tavily Web Search, Dictionary API, Gmail, Google Sheets, and Weather API.",
      "FastAPI backend for agent IPC, tool orchestration, and async workflow scheduling.",
      "Async API handlers and modular agent graphs for throughput optimization.",
    ],
    links: [
      [{ label: "Live Demo", href: "https://modumentor-client.netlify.app/", icon: "fa-globe" }],
      [{ label: "Source Code", href: "https://github.com/adiri77/ModuMentor", icon: "fab fa-github" }],
    ] as ProjectLink[][],
  },
  {
    title: "NeuroHR AI: Enterprise HRMS & AI Recruitment Platform",
    tech: "Next.js 14 • TypeScript • Express.js • FastAPI • MongoDB • Groq (Llama 3.3) • Gemini • scikit-learn • Google OAuth • Render",
    bullets: [
      "12-step Groq-first hiring pipeline: KB ingestion → grounded JD generation → resume SOP screening → AI voice interviews → panel review → offer/onboarding.",
      "FastAPI ML microservice (20+ endpoints) orchestrating Llama 3.3 70B with token budgeting, JSON schema enforcement, and Gemini Flash fallback.",
      "KB-grounded JD generation via catalog markdown parsing, tech-stack extraction, and structured 7-section output.",
      "Harness-style resume screening SOPs (10-step fresher / 8-step experienced) with dimension scoring and ≥80% auto-shortlist gates.",
      "5-dimension weighted interview evaluation with composite hiring score (80% resume + 20% interview).",
      "Deployed on Netlify + Render with dual Gmail OAuth, Google Calendar Meet, and sklearn .pkl artifact training.",
    ],
    links: [
      [{ label: "Live Demo", href: "https://neurohrai.netlify.app/", icon: "fa-globe" }],
      [{ label: "Source Code", href: "https://github.com/adiri77/NeuroHr", icon: "fab fa-github" }],
    ] as ProjectLink[][],
  },
  {
    title: "TaskFlow: Team Task Management Platform",
    tech: "React.js • Node.js • Express.js • MongoDB • JWT • RBAC • Tailwind CSS",
    bullets: [
      "Full-stack Kanban task management with To Do → In Progress → Review → Completed workflow stages.",
      "JWT auth and RBAC for role-scoped user/admin access control.",
      "Express.js REST APIs for task CRUD, assignment, and status transitions.",
      "MongoDB persistence layer with real-time state synchronization across clients.",
      "Responsive React.js UI with Tailwind CSS and optimized component state.",
    ],
    links: [
      [{ label: "Live Demo", href: "https://tech-task-management-fe.vercel.app/", icon: "fa-globe" }],
      [{ label: "Source Code", href: "https://github.com/adiri77/TechTask", icon: "fab fa-github" }],
    ] as ProjectLink[][],
  },
  {
    title: "StudyNotion",
    tech: "MERN Stack • React.js • Node.js • Express.js • MongoDB • Razorpay • JWT",
    bullets: [
      "Full-stack LMS with JWT auth, course CRUD, enrollment tracking, and Razorpay payment integration.",
      "Optimized search/retrieval layer using DSA-backed indexing for course discovery.",
      "REST API layer with structured data serialization for scalable enrollment workflows.",
    ],
    links: [
      [{ label: "Source Code", href: "https://github.com/adiri77/StudyNotion", icon: "fab fa-github" }],
    ] as ProjectLink[][],
  },
  {
    title: "Centralised Grievance System Portal",
    tech: "Java • PHP • Bootstrap • MySQL • Smart India Hackathon 2022",
    bullets: [
      "Role-based grievance routing portal for AKTU institutions to escalate issues to AICTE.",
      "MySQL schema design with secure role hierarchies and remote grievance node routing.",
      "SIH 2022 Ranker — recognized for system design, functionality, and civic impact.",
    ],
    links: [] as ProjectLink[][],
  },
  {
    title: "Data Visualization Dashboard",
    tech: "MERN Stack • React.js • Node.js • MongoDB • Chart.js",
    bullets: [
      "Interactive dashboard for multi-dimensional metric analysis (intensity, likelihood, relevance).",
      "Chart.js visualizations with responsive filter controls for ad-hoc data exploration.",
      "Node.js aggregation APIs streaming computed variables from MongoDB.",
    ],
    links: [
      [
        {
          label: "Source Code",
          href: "https://github.com/adiri77/Data_Visualization_Dashboard-MERN-Stack-main",
          icon: "fab fa-github",
        },
      ],
    ] as ProjectLink[][],
  },
  {
    title: "TodoList Backend API",
    tech: "Express.js • MongoDB • Mongoose • Postman",
    bullets: [
      "RESTful task management API with full CRUD and Mongoose schema validation.",
      "Structured document models with input validation and persistence guarantees.",
      "Postman test suites for endpoint contract verification.",
    ],
    links: [
      [{ label: "Source Code", href: "https://github.com/adiri77/BackendTodo", icon: "fab fa-github" }],
    ] as ProjectLink[][],
  },
  {
    title: "NewsBomber",
    tech: "React.js • JavaScript • Bootstrap • News API",
    bullets: [
      "News aggregation SPA with category-based real-time article feeds via News API.",
      "Client-side caching layer to minimize redundant API round-trips.",
      "Dark/light theme toggle implemented with optimized React hook patterns.",
    ],
    links: [
      [{ label: "Source Code", href: "https://github.com/adiri77/newsbomber", icon: "fab fa-github" }],
    ] as ProjectLink[][],
  },
];

export const achievements = [
  {
    title: "HackerRank 5-Star Coder",
    content:
      "5-star Problem Solving rating on HackerRank — demonstrates advanced DSA and algorithmic optimization capability.",
  },
  {
    title: "Smart India Hackathon Ranker",
    content:
      "Ranked at SIH 2022 for the Centralized Grievance Portal — AKTU-to-AICTE institutional grievance routing system.",
  },
  {
    title: "Vidya-Mandir Cricket Captain",
    content:
      "Team Captain — won the Vidya-Mandir Cricket Tournament 2018; led cross-functional coordination under competitive pressure.",
  },
];

export const additionalInfo = [
  {
    icon: "fa-users",
    title: "Engineering Mindset",
    content:
      "Systems thinking, root-cause debugging, cross-functional collaboration, ambiguity tolerance, technical communication",
  },
  {
    icon: "fa-language",
    title: "Languages",
    content: "English (Professional), Hindi (Native)",
  },
  {
    icon: "fa-tasks",
    title: "Development Practices",
    content:
      "Git, CI/CD pipelines, code reviews, API contract design, performance profiling, technical documentation, Agile SDLC",
  },
  {
    icon: "fa-brain",
    title: "Domain Focus",
    content:
      "Agentic AI orchestration, distributed event-driven systems, LLM inference pipelines, observability, scalable backend architecture",
  },
  {
    icon: "fa-heart",
    title: "Interests",
    content:
      "Agent frameworks, LLM systems research, distributed systems design, open-source contribution, cricket",
  },
];

export const contactLinks = [
  {
    href: "mailto:adityasingh3210@gmail.com",
    icon: "fa-envelope",
    label: "adityasingh3210@gmail.com",
  },
  { href: "tel:+919026201633", icon: "fa-phone", label: "+91-9026201633" },
  {
    href: "https://www.linkedin.com/in/aditya-kumar-singh-4a9379208",
    icon: "fab fa-linkedin",
    label: "LinkedIn",
  },
  { href: "https://github.com/adiri77", icon: "fab fa-github", label: "GitHub" },
];
