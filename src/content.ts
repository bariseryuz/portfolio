export type PortfolioLink = {
  label: string;
  href: string;
};

export type PortfolioProject = {
  title: string;
  description: string;
  tags: string[];
  hrefLabel: string;
  href: string;
};

export type PortfolioContent = {
  name: string;
  initials: string;
  role: string;
  title: string;
  description: string;
  heroHeadlineHtml: string;
  heroLede: string;
  email: string;
  footerNote: string;
  links: {
    github: string;
    linkedin: string;
  };
  projects: PortfolioProject[];
};

export const content: PortfolioContent = {
  name: "Baris Eryuz",
  initials: "BE",
  role: "AI engineer",
  title: "Baris Eryuz — AI Engineer",
  description: "Portfolio — AI engineer building reliable systems with LLMs, evals, and production ML.",
  heroHeadlineHtml:
    'I ship <span class="accent">LLM-powered products</span> with evals, guardrails, and measurable quality.',
  heroLede:
    "I build applied AI systems end-to-end—from data and retrieval to evaluation, tracing, and production reliability.",
  email: "you@email.com",
  footerNote: "TypeScript + Vite.",
  links: {
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
  },
  projects: [
    {
      title: "Shiiman Leads — AI lead generator",
      description:
        "Traditional lead generators are rigid: long forms, low completion rates, and limited context. I built Shiiman Leads to turn lead capture into a conversation—an AI chatbot that qualifies visitors in real time and collects the necessary details with a far better UX.",
      tags: ["LangChain", "Python", "TypeScript", "RAG", "Proxy integration", "Railway", "DB storage"],
      hrefLabel: "Open Shiiman Leads →",
      href: "https://shiimanleads.com/",
    },
    {
      title: "Agent workflow for ops",
      description:
        "Tool-calling agents with human-in-the-loop approvals. Emphasize reliability: retries, structured outputs, and tracing.",
      tags: ["TypeScript", "Temporal", "OTel"],
      hrefLabel: "Live demo →",
      href: "#",
    },
    {
      title: "Model evaluation & regression tests",
      description:
        "Golden datasets, LLM-as-judge where appropriate, and CI gates before prompt or model changes ship.",
      tags: ["pytest", "Weights & Biases", "GitHub Actions"],
      hrefLabel: "Write-up →",
      href: "#",
    },
  ],
};

