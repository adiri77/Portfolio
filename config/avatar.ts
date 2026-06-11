export const AVATAR_TOPICS = {
  intro:
    "Hello! I'm Aditya Singh, a Software Development Engineer based in Lucknow, India. I build AI-powered applications, agentic workflow systems, LLM integrations, and scalable backend services using Python, FastAPI, Node.js, Redis, Kafka, React, and Next.js. I have a strong foundation in data structures, algorithms, system design, and distributed computing, and I'm passionate about delivering high-quality solutions in fast-paced product environments.",
  skills:
    "My technical skills span Python, C++, JavaScript, SQL, HTML, and CSS. In AI engineering, I work with Prompt Engineering, LangChain, RAG pipelines, AI agents, OpenClaw, and Hermes orchestration systems. For backend and distributed systems, I use FastAPI, Node.js, Redis, Kafka, and microservices architecture with SQL and vector databases. I also build frontends with React, Next.js, and React Flow, and monitor production systems using Grafana and SigNoz. My core computer science strengths include data structures, algorithms, OOP, SOLID principles, low-level design, and scalable system design.",
  experience:
    "I currently work as a Software Development Engineer at Rapid Innovation on their Agentic Workforce Platform, Ruh AI. There I designed a Workflow Orchestrator for autonomous AI agents, built multi-step LLM pipelines with OpenClaw and Hermes, implemented event-driven execution with Redis and Kafka, and deployed automated sandbox infrastructure with Grafana and SigNoz monitoring. Previously at Rapid Innovation, I developed React and Next.js applications, integrated Stripe payments, built admin dashboards, and as an intern I worked on deployment platform frontends and performance optimization.",
  projects:
    "I've built several significant projects. The Ruh AI Agentic Platform features a visual workflow orchestrator with Kafka, Redis, and observability integrations. ModuMentor is a multi-agent AI automation system using AutoGen, Gemini 1.5, FastAPI, and MCP tools. NeuroHR AI is an enterprise HRMS with a 12-step Groq-first hiring pipeline, AI voice interviews, and FastAPI ML microservices. TaskFlow is a full-stack Kanban task management platform with JWT authentication and RBAC. StudyNotion is a full-stack learning platform with Razorpay payments, and the Centralized Grievance System Portal ranked at Smart India Hackathon 2022.",
} as const;

export type AvatarTopic = keyof typeof AVATAR_TOPICS;

export const AVATAR_TOPIC_LABELS: { id: AvatarTopic; label: string }[] = [
  { id: "intro", label: "About Me" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];
