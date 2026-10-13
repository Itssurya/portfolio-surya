"use client";

import Image from "next/image";

const BRAND_LOGOS: Record<string, string> = {
  // Languages
  python: "/logos/python.svg",

  // AI / ML
  generativeai: "/logos/generativeai.svg",
  llms: "/logos/llms.svg",
  llm: "/logos/llms.svg",
  langchain: "/logos/langchain.svg",
  promptengineering: "/logos/promptengineering.svg",
  agentworkflows: "/logos/agentworkflows.svg",
  toolfunctioncalling: "/logos/toolfunctioncalling.svg",
  functioncalling: "/logos/toolfunctioncalling.svg",
  rag: "/logos/rag.svg",
  embeddings: "/logos/embeddings.svg",
  pandas: "/logos/pandas.svg",
  numpy: "/logos/numpy.svg",
  modelevaluation: "/logos/modelevaluation.svg",
  openai: "/logos/openai.svg",
  claude: "/logos/claude.svg",

  // Backend
  fastapi: "/logos/fastapi.svg",
  flask: "/logos/flask.svg",
  asyncio: "/logos/asyncio.svg",
  pydantic: "/logos/pydantic.svg",
  jwtauthentication: "/logos/jwt.svg",
  jwt: "/logos/jwt.svg",
  microservices: "/logos/microservices.svg",

  // Frontend
  react: "/logos/react.svg",
  tailwindcss: "/logos/tailwindcss.svg",

  // Databases
  postgresql: "/logos/postgresql.svg",
  faiss: "/logos/faiss.svg",
  pinecone: "/logos/pinecone.svg",

  // Cloud & DevOps
  aws: "/logos/aws.svg",
  docker: "/logos/docker.svg",
  git: "/logos/git.svg",
  bitbucketpipelines: "/logos/bitbucket.svg",
  bitbucket: "/logos/bitbucket.svg",
};

export function isBrand(name: string): boolean {
  const key = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  return key in BRAND_LOGOS;
}

export function TechLogo({ name, size = 48 }: { name: string; size?: number }) {
  const key = name.toLowerCase().replace(/[^a-z0-9]/g, "");

  if (key in BRAND_LOGOS) {
    return (
      <Image
        src={BRAND_LOGOS[key]}
        alt={`${name} logo`}
        width={size}
        height={size}
        className="object-contain"
      />
    );
  }

  // Concept Thin-Line SVG Fallback
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0d0d0d"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="object-contain opacity-80"
    >
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M7 12h10M12 7v10" />
    </svg>
  );
}

