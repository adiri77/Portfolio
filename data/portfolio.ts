export const navLinks = [
  { href: "#home", icon: "fa-home", label: "Home" },
  { href: "#about", icon: "fa-user", label: "About" },
  { href: "#education", icon: "fa-graduation-cap", label: "Education" },
  { href: "#certifications", icon: "fa-certificate", label: "Certifications" },
  { href: "#experience", icon: "fa-briefcase", label: "Experience" },
  { href: "#skills", icon: "fa-cogs", label: "Skills" },
  { href: "#projects", icon: "fa-code", label: "Projects" },
  { href: "#achievements", icon: "fa-trophy", label: "Achievements" },
  { href: "#additional-info", icon: "fa-info-circle", label: "Additional Info" },
  { href: "#contact", icon: "fa-envelope", label: "Contact" },
] as const;

export const aboutParagraphs = [
  "I am a Software Development Engineer with experience building AI-powered applications, agentic workflow systems, LLM integrations, orchestration platforms, and scalable backend services. I have hands-on experience with Prompt Engineering, LangChain, RAG pipelines, workflow orchestration, vector database integrations, REST APIs, distributed systems, and microservices architecture using Python, FastAPI, Node.js, Redis, Kafka, React.js, and Next.js.",
  "Currently at Rapid Innovation (Product: Ruh AI), I designed and developed a Workflow Orchestrator platform for autonomous AI agents — implementing multi-step LLM orchestration pipelines with OpenClaw and Hermes, automated sandbox deployment infrastructure, and real-time observability using Grafana and SigNoz. I also architected distributed agent infrastructure with event-driven execution, SQL-backed authentication microservices, and fault-tolerant systems handling high-throughput workloads.",
  "I bring a strong foundation in core computer science — data structures and algorithms, object-oriented design, system design, database optimization, and complexity analysis — and I am passionate about solving ambiguous engineering problems and delivering scalable, maintainable solutions in fast-paced Agile product environments.",
];

export const education = [
  {
    title: "Bachelor of Technology (B.Tech)",
    subtitle: "Computer Science Engineering (Data Science)",
    school: "ABES Institute of Technology, Ghaziabad, India",
    detail: "2020 – 2024 | Percentage: 75.4%",
    extra:
      "Relevant Coursework: Data Structures & Algorithms, Object-Oriented Design, Low-Level Design (LLD), System Design, Database Systems, Operating Systems, Networking, Concurrency, Complexity Analysis (Big-O)",
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
      "Completed an intensive Java programming course validating proficiency in object-oriented architecture, algorithms, and modular design principles.",
  },
  {
    title: "Smart India Hackathon 2022 — Ranker",
    subtitle: "Ministry of Education, Govt. of India • 2022",
    description:
      "Distinguished ranker for the Centralised Grievance System Portal — a platform enabling AKTU institutions to raise technical and management issues directly to AICTE.",
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
      "Working on an Agentic Workforce Platform enabling users to create and deploy end-to-end AI agents with automated sandbox deployment and runtime setup.",
      "Designed and developed a Workflow Orchestrator platform for building AI-driven workflows and autonomous agents with multi-step LLM orchestration pipelines.",
      "Architected scalable agent orchestration using Python, FastAPI, Node.js, LangChain, Redis, and Kafka for real-time event-driven execution.",
      "Integrated OpenClaw and Hermes agent systems, allowing users to deploy agents powered by either framework based on workflow selection.",
      "Built REST-based microservices and SQL-backed services for authentication, lifecycle management, and secure HTTP/JSON communication.",
      "Integrated support for OpenAI, Codex, Claude Code, and external LLM API keys for deployed AI agents.",
      "Worked on prompt engineering, workflow optimization, latency reduction, and scalable AI execution with caching and efficient algorithms.",
      "Enhanced system observability using Grafana and SigNoz for real-time monitoring, logging, and system health tracking.",
      "Designed fault-tolerant distributed computing systems handling high-throughput workloads; applied OOP and SOLID principles for maintainable code.",
      "Collaborated in Agile teams using React.js and Next.js for platform frontend development.",
    ],
  },
  {
    role: "Software Development Engineer",
    company: "Rapid Innovation",
    period: "July 2024 – May 2025 | Noida, India",
    bullets: [
      "Developed scalable frontend applications using React.js and Next.js with clean-code standards and reusable component architecture.",
      "Implemented secure Stripe payment workflows and multi-role admin dashboards for production web applications.",
      "Integrated REST APIs and backend services for scalable multi-tier web applications.",
      "Participated in Agile SDLC — sprint planning, code reviews, and cross-functional collaboration on system design.",
      "Collaborated on multi-tier architecture ensuring efficient data flow, platform scalability, and reliability.",
    ],
  },
  {
    role: "Software Development Intern",
    company: "Rapid Innovation",
    period: "April 2024 – July 2024 | Ghaziabad, India",
    bullets: [
      "Developed Next.js frontend interfaces for a deployment platform with API integrations and monitoring dashboards.",
      "Integrated REST APIs and deployment analytics tools for operational visibility.",
      "Improved debugging and performance optimization workflows by resolving rendering and latency bottlenecks.",
    ],
  },
];

export const skillCategories = [
  {
    icon: "fa-code",
    title: "Programming",
    skills: ["Python", "C++", "JavaScript", "SQL", "HTML5", "CSS3"],
  },
  {
    icon: "fa-sitemap",
    title: "Core Computer Science",
    skills: [
      "Data Structures & Algorithms",
      "OOP & SOLID Principles",
      "Design Patterns",
      "Low-Level Design (LLD)",
      "System Design",
      "Distributed Computing",
      "Database Systems",
      "Query Optimization",
      "Operating Systems",
      "Networking",
      "Concurrency",
      "Big-O Analysis",
    ],
  },
  {
    icon: "fa-brain",
    title: "LLM & AI Engineering",
    skills: [
      "Prompt Engineering",
      "LLM Integration",
      "RAG Pipelines",
      "AI Agents",
      "Agentic Workflows",
      "Chain-of-Thought",
      "LangChain",
      "OpenAI APIs",
      "Anthropic APIs",
      "Claude Code",
      "Codex",
      "Vector Databases",
      "Embedding Pipelines",
    ],
  },
  {
    icon: "fa-network-wired",
    title: "Workflow & Orchestration",
    skills: [
      "Workflow Orchestrator Systems",
      "OpenClaw",
      "Hermes",
      "Multi-step LLM Pipelines",
      "API Orchestration",
      "AI Workflow Automation",
    ],
  },
  {
    icon: "fa-server",
    title: "Backend & Distributed Systems",
    skills: [
      "FastAPI",
      "Node.js",
      "REST APIs",
      "Microservices",
      "Multi-tier Systems",
      "Redis",
      "Kafka",
      "Event-Driven Architecture",
      "Fault-Tolerant Systems",
      "High Availability",
    ],
  },
  {
    icon: "fa-chart-bar",
    title: "Monitoring & Observability",
    skills: [
      "Grafana",
      "SigNoz",
      "Logging",
      "Monitoring",
      "OpenTelemetry Concepts",
      "Cost Optimization",
      "Performance Benchmarking",
      "Latency Optimization",
    ],
  },
  {
    icon: "fa-laptop-code",
    title: "Frontend",
    skills: ["React.js", "Next.js", "React Flow", "Zustand", "Bootstrap"],
  },
  {
    icon: "fa-tools",
    title: "Tools & Practices",
    skills: [
      "GitHub",
      "CI/CD Pipelines",
      "Stripe Payments",
      "Razorpay",
      "Agile Methodology",
      "SDLC",
      "Problem Solving",
      "Documentation",
      "Testing",
    ],
  },
];

export const projects = [
  {
    title: "Ruh AI Agentic Platform",
    tech: "FastAPI • Python • Node.js • LangChain • OpenClaw • Hermes • Redis • Kafka • Grafana • SigNoz • React Flow",
    bullets: [
      "Built an Agentic Workforce Platform allowing users to design, deploy, and execute end-to-end AI agents in sandboxed runtimes.",
      "Developed a visual Workflow Orchestrator (React Flow) for building multi-step agent pipelines with user-defined task flows.",
      "Orchestrated real-time event distribution and task execution using Kafka and Redis for low-latency, fault-tolerant workflow execution.",
      "Integrated OpenClaw and Hermes agent modules with OpenAI, Anthropic, and Claude Code API interfaces.",
      "Deployed comprehensive system health dashboards in Grafana and SigNoz to benchmark agent latency and resource consumption.",
    ],
    links: [
      [{ label: "GitHub Profile", href: "https://github.com/adiri77", icon: "fab fa-github" }],
    ] as ProjectLink[][],
  },
  {
    title: "ModuMentor: Multi-Agent AI Automation System",
    tech: "AutoGen • Gemini 1.5 • FastAPI • Python • MCP Tools • React.js",
    bullets: [
      "Built an agentic AI system using AutoGen integrated with Gemini 1.5 as the core reasoning engine for intelligent task execution.",
      "Designed and orchestrated autonomous AI agents capable of understanding user requests and dynamically selecting actions.",
      "Integrated 5 MCP tools including Tavily Web Search, Dictionary API, Gmail, Google Sheets, and Weather API for real-time information retrieval and workflow automation.",
      "Implemented tool-calling architecture enabling agents to execute multi-step tasks with contextual understanding.",
      "Developed backend APIs using FastAPI and Python for agent communication, tool orchestration, and workflow management.",
      "Improved system efficiency using asynchronous API handling and modular agent workflows.",
    ],
    links: [
      [{ label: "Live Demo", href: "https://modumentor-client.netlify.app/", icon: "fa-globe" }],
      [
        { label: "Frontend", href: "https://github.com/VaishaleeSingh/ModuMentorClient", icon: "fab fa-github" },
        { label: "Agent", href: "https://github.com/VaishaleeSingh/ModumentorAgent-", icon: "fab fa-github" },
        { label: "Backend", href: "https://github.com/VaishaleeSingh/ModuMentorServer", icon: "fab fa-github" },
      ],
    ] as ProjectLink[][],
  },
  {
    title: "NeuroHR AI: Enterprise HRMS & AI Recruitment Platform",
    tech: "Next.js 14 • TypeScript • Express.js • FastAPI • MongoDB • Groq (Llama 3.3) • Gemini • scikit-learn • Google OAuth • Render",
    bullets: [
      "Built a production HRMS with a 12-step Groq-first hiring pipeline: org knowledge base → grounded JD generation → multi-step resume SOP screening → 15-question AI voice interviews → human panel → offer accept/decline → employee onboarding.",
      "Architected a dedicated FastAPI ML microservice (20+ endpoints) orchestrating Llama 3.3 70B for screening, interview evaluation, tailored question generation, and HR email synthesis with token budgeting, JSON schema enforcement, and Gemini Flash fallback.",
      "Engineered KB-grounded JD generation: catalog markdown → Groq tech-stack extraction → must-have/nice-to-have skill mapping → 7-section job descriptions tied to real repo stacks instead of generic templates.",
      "Implemented harness-style resume screening SOPs (10-step fresher / 8-step experienced) returning dimension scores, skill gaps, and human-escalation flags; auto-shortlist at ≥80% JD match with human-in-the-loop gates and no auto-reject.",
      "Designed 5-dimension weighted interview evaluation (Technical, Problem Solving, Communication, Culture, Experience) with composite hiring score (80% resume + 20% interview) and per-candidate Groq question fallbacks when LLM JSON fails.",
      "Deployed full stack on Netlify + Render with dual Gmail OAuth (HR + Agent), Google Calendar Meet scheduling, scikit-learn CSV training to .pkl artifacts, and synchronous offer/leave email delivery for serverless reliability.",
    ],
    links: [
      [{ label: "Live Demo", href: "https://neurohrai.netlify.app/", icon: "fa-globe" }],
      [{ label: "GitHub", href: "https://github.com/VaishaleeSingh/NeuroHr", icon: "fab fa-github" }],
    ] as ProjectLink[][],
  },
  {
    title: "TaskFlow: Team Task Management Platform",
    tech: "React.js • Node.js • Express.js • MongoDB • JWT • RBAC • Tailwind CSS",
    bullets: [
      "Developed a full-stack task management and collaboration platform for organizing projects and tracking team workflows.",
      "Built an interactive Kanban board with task stages including To Do, In Progress, Review, and Completed.",
      "Implemented JWT authentication and Role-Based Access Control (RBAC) for secure user and admin access.",
      "Developed REST APIs using Node.js and Express.js for task creation, assignment, and status updates.",
      "Integrated MongoDB for efficient task storage and real-time data synchronization.",
      "Designed responsive user interfaces using React.js and Tailwind CSS with optimized state management.",
    ],
    links: [
      [{ label: "Live Demo", href: "https://tech-task-management-fe.vercel.app/", icon: "fa-globe" }],
      [
        { label: "Frontend", href: "https://github.com/VaishaleeSingh/tech_task_management_fe", icon: "fab fa-github" },
        { label: "Backend", href: "https://github.com/VaishaleeSingh/tech_task_management_be", icon: "fab fa-github" },
      ],
    ] as ProjectLink[][],
  },
  {
    title: "StudyNotion",
    tech: "MERN Stack • React.js • Node.js • Express.js • MongoDB • Razorpay • JWT",
    bullets: [
      "Built a full-stack learning platform with secure JWT-based authentication, course creation, enrollment tracking, and payments.",
      "Integrated Razorpay for secure transaction flows and course purchase workflows.",
      "Implemented optimized search functionality applying data structures and algorithms to improve backend retrieval workflows.",
      "Applied computer science fundamentals to optimize backend data serialization and scalable user workflows.",
    ],
    links: [
      [{ label: "Source Code", href: "https://github.com/adiri77/StudyNotion", icon: "fab fa-github" }],
    ] as ProjectLink[][],
  },
  {
    title: "Centralised Grievance System Portal",
    tech: "Java • PHP • Bootstrap • MySQL • Smart India Hackathon 2022",
    bullets: [
      "Developed a grievance management portal for Institutions of AKTU to raise technical and management issues directly to AICTE.",
      "Designed secure roles, database architectures, and remote grievance routing nodes for streamlined issue handling.",
      "Recognized as a Ranker at Smart India Hackathon 2022 for outstanding design, functionality, and social impact.",
    ],
    links: [] as ProjectLink[][],
  },
  {
    title: "Data Visualization Dashboard",
    tech: "MERN Stack • React.js • Node.js • MongoDB • Chart.js",
    bullets: [
      "Developed a data visualization dashboard to analyze complex metrics including intensity, likelihood, and relevance.",
      "Implemented interactive charts and responsive filters for multi-dimensional data analysis.",
      "Created backend REST APIs in Node.js to aggregate and stream database variables from MongoDB.",
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
      "Engineered a backend-oriented task management RESTful API supporting flexible CRUD operations.",
      "Designed clean database schemas with Mongoose and validation checks for task persistence.",
      "Employed Postman for rigorous API testing and validation of data payloads.",
    ],
    links: [
      [{ label: "Source Code", href: "https://github.com/adiri77/BackendTodo", icon: "fab fa-github" }],
    ] as ProjectLink[][],
  },
  {
    title: "NewsBomber",
    tech: "React.js • JavaScript • Bootstrap • News API",
    bullets: [
      "Developed a dynamic news aggregation platform offering real-time updates across multiple custom categories.",
      "Integrated News API to stream articles with client-side caching to reduce redundant network requests.",
      "Implemented theme switching (dark/light mode) with optimized React hooks for a polished user experience.",
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
      "Achieved a 5-star rating in Problem Solving on HackerRank, demonstrating strong algorithmic proficiency and DSA mastery.",
  },
  {
    title: "Smart India Hackathon Ranker",
    content:
      "Distinguished ranker at Smart India Hackathon 2022 for building a Centralized Grievance Portal connecting AKTU institutions with AICTE.",
  },
  {
    title: "Vidya-Mandir Cricket Captain",
    content:
      "Served as Cricket Team Captain and won the Vidya-Mandir Cricket Tournament in 2018, demonstrating leadership and teamwork.",
  },
];

export const additionalInfo = [
  {
    icon: "fa-users",
    title: "Soft Skills",
    content:
      "Problem Solving, Team Collaboration, Agile Methodology, Communication, Adaptability, Comfort with Ambiguity",
  },
  {
    icon: "fa-language",
    title: "Languages",
    content: "English (Professional), Hindi (Native)",
  },
  {
    icon: "fa-tasks",
    title: "Work Practices",
    content:
      "Git Version Control, CI/CD Pipelines, System Documentation, Performance Benchmarking, Code Reviews, SDLC Best Practices",
  },
  {
    icon: "fa-brain",
    title: "Technical Focus",
    content:
      "AI Workflow Orchestration, Distributed Systems, Event-Driven Architectures, Observability, Latency Optimization, Scalable System Design",
  },
  {
    icon: "fa-heart",
    title: "Interests",
    content:
      "Agentic AI Frameworks, Large Language Models, Distributed Systems Architecture, Open Source Contribution, Cricket",
  },
];

export const contactLinks = [
  {
    href: "mailto:adityasingh321100@gmail.com",
    icon: "fa-envelope",
    label: "adityasingh321100@gmail.com",
  },
  { href: "tel:+919026201633", icon: "fa-phone", label: "+91-9026201633" },
  {
    href: "https://www.linkedin.com/in/aditya-kumar-singh",
    icon: "fab fa-linkedin",
    label: "LinkedIn",
  },
  { href: "https://github.com/adiri77", icon: "fab fa-github", label: "GitHub" },
];
