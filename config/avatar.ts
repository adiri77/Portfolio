export const AVATAR_TOPICS = {
  intro:
    "I'm Aditya Singh, a Software Development Engineer specializing in agentic AI systems, distributed backend architecture, and LLM orchestration. I build production services with Python, FastAPI, Node.js, Redis, Kafka, React, and Next.js — with a strong foundation in data structures, algorithms, and system design.",
  skills:
    "Core stack: Python, FastAPI, Node.js, Redis, Kafka, SQL, and microservices. AI layer: LangChain, RAG pipelines, prompt engineering, OpenClaw, and Hermes orchestration. Frontend: React, Next.js, and React Flow. Observability: Grafana and SigNoz. Engineering fundamentals: DSA, OOP, SOLID, low-level design, and distributed system design.",
  experience:
    "At Rapid Innovation on Ruh AI, I engineered a Workflow Orchestrator for autonomous agents — multi-step LLM pipelines, Kafka and Redis event buses, OpenClaw and Hermes runtimes, SQL auth microservices, and Grafana/SigNoz monitoring. Earlier roles: React/Next.js production apps, Stripe payments, RBAC dashboards, and deployment platform frontends with performance optimization.",
  projects:
    "Key builds: Ruh AI Agentic Platform with visual workflow orchestration and Kafka/Redis execution. ModuMentor — AutoGen plus Gemini 1.5 multi-agent system with MCP tools. NeuroHR AI — 12-step Groq hiring pipeline with FastAPI ML microservices. TaskFlow — Kanban platform with JWT and RBAC. StudyNotion — MERN LMS with Razorpay. SIH 2022 Grievance Portal.",
} as const;

export type AvatarTopic = keyof typeof AVATAR_TOPICS;

export const AVATAR_TOPIC_LABELS: { id: AvatarTopic; label: string }[] = [
  { id: "intro", label: "About Me" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];
