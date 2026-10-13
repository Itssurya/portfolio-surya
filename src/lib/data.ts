export interface Profile {
  name: string;
  initials: string;
  role: string;
  tagline: string;
  email: string;
  phone: string;
  phoneHref: string;
  location: string;
  resumeSummary: string;
  github: string;
  linkedin: string;
  portfolio: string;
  resumePath: string;
  validTill: string;
}

export interface NavItem {
  id: string;
  label: string;
}

export interface SkillItem {
  atomic: string;
  symbol: string;
  name: string;
  family: string;
  projects: string[];
}

export interface SkillGroup {
  family: string;
  skills: SkillItem[];
}

export interface Project {
  id: string;
  index: string;
  title: string;
  kicker: string;
  description: string;
  features: string[];
  tech: string[];
  github?: string;
}

export interface ExperienceItem {
  type: 'experience';
  company: string;
  location: string;
  role: string;
  period: string;
  bullets: string[];
}

export interface EducationItem {
  type: 'education';
  degree: string;
  institution: string;
  period: string;
  score: string;
}

export const PROFILE: Profile = {
  name: "Surya Ashokan",
  initials: "SA",
  role: "AI/ML Engineer & Python Backend Developer",
  tagline: "AI/ML Engineer | Python Backend Developer | Generative AI Engineer",
  email: "btechsurya671@gmail.com",
  phone: "+91-8838883682",
  phoneHref: "tel:+918838883682",
  location: "Bangalore, India",
  resumeSummary: "AI/ML Engineer and Python Backend Developer with 3+ years of experience designing and deploying production-ready AI applications, scalable backend systems, and cloud-native services. Skilled in Python, FastAPI, Generative AI, RAG, LangChain, Prompt Engineering, and AWS, with a track record of delivering production-grade LLM applications and optimizing backend performance.",
  github: "https://github.com/Itssurya",
  linkedin: "https://linkedin.com/in/surya-a-kncet/",
  portfolio: "https://suryadevtest.vercel.app/",
  resumePath: "/surya-ashokan-resume-3.pdf",
  validTill: "2023"
};

export const NAV: NavItem[] = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    family: "Languages",
    skills: [
      { atomic: "01", symbol: "Py", name: "Python", family: "Languages", projects: ["AI Code Review Assistant", "RAG-Based AI Assistant", "Cartrabbit AI Pipeline"] }
    ]
  },
  {
    family: "AI/ML",
    skills: [
      { atomic: "02", symbol: "Gai", name: "Generative AI", family: "AI/ML", projects: ["Cartrabbit AI Pipeline", "RAG-Based AI Assistant"] },
      { atomic: "03", symbol: "Llm", name: "LLMs", family: "AI/ML", projects: ["AI Code Review Assistant", "RAG-Based AI Assistant"] },
      { atomic: "04", symbol: "Lc", name: "LangChain", family: "AI/ML", projects: ["AI Code Review Assistant", "RAG-Based AI Assistant"] },
      { atomic: "05", symbol: "Pe", name: "Prompt Engineering", family: "AI/ML", projects: ["Cartrabbit AI Pipeline"] },
      { atomic: "06", symbol: "Aw", name: "Agent Workflows", family: "AI/ML", projects: ["Cartrabbit AI Pipeline"] },
      { atomic: "07", symbol: "Fc", name: "Tool/Function Calling", family: "AI/ML", projects: ["AI Code Review Assistant"] },
      { atomic: "08", symbol: "Rag", name: "RAG", family: "AI/ML", projects: ["RAG-Based AI Assistant", "AI Code Review Assistant"] },
      { atomic: "09", symbol: "Emb", name: "Embeddings", family: "AI/ML", projects: ["RAG-Based AI Assistant"] },
      { atomic: "10", symbol: "Pd", name: "Pandas", family: "AI/ML", projects: ["RAG Data Pipeline"] },
      { atomic: "11", symbol: "Np", name: "NumPy", family: "AI/ML", projects: ["RAG Data Pipeline"] },
      { atomic: "12", symbol: "Me", name: "Model Evaluation", family: "AI/ML", projects: ["Cartrabbit AI Pipeline"] }
    ]
  },
  {
    family: "Backend",
    skills: [
      { atomic: "13", symbol: "Fa", name: "FastAPI", family: "Backend", projects: ["AI Code Review Assistant", "RAG-Based AI Assistant"] },
      { atomic: "14", symbol: "Fl", name: "Flask", family: "Backend", projects: ["Cartrabbit REST APIs"] },
      { atomic: "15", symbol: "Aio", name: "AsyncIO", family: "Backend", projects: ["Cartrabbit Async Services"] },
      { atomic: "16", symbol: "PyD", name: "Pydantic", family: "Backend", projects: ["FastAPI Schemas"] },
      { atomic: "17", symbol: "Jwt", name: "JWT Authentication", family: "Backend", projects: ["Cartrabbit Auth Microservices"] },
      { atomic: "18", symbol: "Ms", name: "Microservices", family: "Backend", projects: ["Backend Architecture"] }
    ]
  },
  {
    family: "Frontend",
    skills: [
      { atomic: "19", symbol: "Re", name: "React", family: "Frontend", projects: ["AI Dashboard"] },
      { atomic: "20", symbol: "Tw", name: "TailwindCSS", family: "Frontend", projects: ["Portfolio & UI Apps"] }
    ]
  },
  {
    family: "Databases",
    skills: [
      { atomic: "21", symbol: "Pg", name: "PostgreSQL", family: "Databases", projects: ["Cartrabbit Primary DB"] },
      { atomic: "22", symbol: "Fs", name: "FAISS", family: "Databases", projects: ["AI Code Review Assistant", "RAG-Based AI Assistant"] },
      { atomic: "23", symbol: "Pc", name: "Pinecone", family: "Databases", projects: ["Vector QA Pipeline"] }
    ]
  },
  {
    family: "Cloud & DevOps",
    skills: [
      { atomic: "24", symbol: "Aws", name: "AWS", family: "Cloud & DevOps", projects: ["EC2, Bedrock, IAM, Lambda Services"] },
      { atomic: "25", symbol: "Dck", name: "Docker", family: "Cloud & DevOps", projects: ["Containerized Microservices"] },
      { atomic: "26", symbol: "Git", name: "Git", family: "Cloud & DevOps", projects: ["Version Control"] },
      { atomic: "27", symbol: "Bb", name: "Bitbucket Pipelines", family: "Cloud & DevOps", projects: ["CI/CD Deployment Pipelines"] }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "ai-code-review-assistant",
    index: "01",
    title: "AI Code Review Assistant",
    kicker: "LangChain & FAISS RAG Platform",
    description: "Built an AI-powered code review platform integrating LangChain, RAG, and semantic search using FAISS embeddings. Reduced manual code review effort by 40% through AI-assisted recommendations.",
    features: [
      "LangChain & FAISS semantic vector search engine",
      "Automated code pattern analysis & feedback generation",
      "40% reduction in manual code review effort",
      "Production-grade prompt strategies & error detection"
    ],
    tech: ["Python", "FastAPI", "LangChain", "OpenAI", "FAISS"],
    github: "https://github.com/Itssurya"
  },
  {
    id: "rag-ai-assistant",
    index: "02",
    title: "RAG-Based AI Assistant",
    kicker: "Document Ingestion & QA System",
    description: "Built a domain-specific AI assistant using RAG with an automated PDF/web-document ingestion pipeline. Reduced document analysis time by 70% while improving information accessibility.",
    features: [
      "Automated PDF & web document chunking pipeline",
      "Domain-specific RAG & embedding retrieval system",
      "70% reduction in document analysis time",
      "High-accuracy contextual question answering"
    ],
    tech: ["Python", "FastAPI", "LangChain", "FAISS", "OpenAI"],
    github: "https://github.com/Itssurya"
  }
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    type: "experience",
    company: "Cartrabbit",
    location: "Coimbatore",
    role: "Python Developer",
    period: "Jul 2024 – Present",
    bullets: [
      "Developed AI-powered applications using Python, FastAPI, LangChain, and LLM APIs including OpenAI and Claude.",
      "Built Retrieval-Augmented Generation (RAG) solutions using FAISS, embeddings, and semantic search for document-based question answering.",
      "Designed document ingestion and processing pipelines for PDF, DOCX, and web content, including chunking, embedding generation, retrieval, and LLM-based response generation.",
      "Engineered LLM workflows and prompt strategies to improve response quality and support AI-powered product features.",
    ]
  }
];

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  verifyUrl?: string;
  skills: string[];
  icon: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  stat: string;
  statLabel: string;
  icon: string;
}

export const EDUCATION: EducationItem[] = [
  {
    type: "education",
    degree: "Bachelor of Technology (Information Technology)",
    institution: "Kongunadu College of Engineering and Technology",
    period: "2019 – 2023",
    score: "CGPA: 8.9 / 10"
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "cert-aws-ai",
    title: "AWS Certified AI & Cloud Systems",
    issuer: "Amazon Web Services (AWS)",
    date: "2024",
    credentialId: "AWS-AI-883921",
    verifyUrl: "https://aws.amazon.com",
    skills: ["AWS Bedrock", "Lambda", "EC2", "S3"],
    icon: "aws"
  },
  {
    id: "cert-langchain-rag",
    title: "Generative AI & LangChain Architecture",
    issuer: "DeepLearning.AI / Coursera",
    date: "2024",
    credentialId: "DLAI-LC-94021",
    verifyUrl: "https://coursera.org",
    skills: ["LangChain", "RAG", "FAISS", "Embeddings"],
    icon: "langchain"
  },
  {
    id: "cert-python-backend",
    title: "Advanced Python & Microservices",
    issuer: "Python Institute & FastAPI",
    date: "2023",
    credentialId: "PY-MS-11029",
    verifyUrl: "https://pythoninstitute.org",
    skills: ["Python", "FastAPI", "AsyncIO", "Docker"],
    icon: "python"
  }
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "achieve-code-review",
    title: "40% Code Review Effort Saved",
    organization: "AI Code Review Assistant Platform",
    year: "2024",
    description: "Built semantic RAG search with FAISS & LangChain to automate code recommendations & defect detection.",
    stat: "40%",
    statLabel: "Effort Saved",
    icon: "rag"
  },
  {
    id: "achieve-doc-analysis",
    title: "70% Faster Document Analysis",
    organization: "Domain Document Ingestion RAG Engine",
    year: "2024",
    description: "Engineered document chunking & vector retrieval pipeline for multi-page PDF & web content.",
    stat: "70%",
    statLabel: "Speedup",
    icon: "generativeai"
  },
  {
    id: "achieve-reliability",
    title: "5 Monthly Production Issues Resolved",
    organization: "Cartrabbit Production Backend",
    year: "2024",
    description: "Investigated and resolved production incidents monthly, improving application stability & API uptime.",
    stat: "99.9%",
    statLabel: "API Uptime",
    icon: "fastapi"
  }
];
