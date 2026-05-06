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

export type CVExperience = {
  company: string;
  location: string;
  /** Time period; shown first (e.g. 2021 – 2026, 2024 – Present). */
  dateRange: string;
  title: string;
  bullets: string[];
  /** Optional third line under company · location (e.g. availability). */
  metaNote?: string;
  /** Public asset paths from /public, e.g. "/msc.png". */
  logos?: string[];
};

export type CVEducation = {
  institution: string;
  location: string;
  dateRange: string;
  degree: string;
  detail?: string;
  /** Logo image path from /public, e.g. "/kapadokya.png". */
  logo?: string;
};

export type CVSkillGroup = {
  title: string;
  items: string[];
};

export type CVContent = {
  /** Professional summary (resume / CV). */
  summary: string;
  /** City & country (no street address). */
  location: string;
  phone: string;
  /** Short form for header line, e.g. linkedin.com/in/username */
  linkedinDisplay: string;
  experience: CVExperience[];
  education: CVEducation[];
  /** Grouped technical skills (resume). */
  skillGroups: CVSkillGroup[];
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
  /** PDF or external resume URL; use "#" until you add a file under /public. */
  resume: {
    href: string;
    label: string;
  };
  resumePage: {
    title: string;
    description: string;
  };
  /** Executive single-column CV body (black/white, ATS-oriented). */
  cv: CVContent;
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
  email: "guidebaris@outlook.com",
  footerNote: "TypeScript + Vite.",
  links: {
    github: "https://github.com/bariseryuz",
    linkedin: "https://www.linkedin.com/in/bariseryuz/",
  },
  resume: {
    href: "#",
    /** When "#", the site uses Print → Save as PDF; set to e.g. "/Baris_Eryuz_CV.pdf" for a direct file link. */
    label: "Save as PDF",
  },
  resumePage: {
    title: "Baris Eryuz — Resume",
    description: "Resume — AI engineer building reliable systems with LLMs, evals, and production ML.",
  },
  cv: {
    summary:
      'AI Engineer | Production LLMs & RAG. Building LLM systems with a focus on retrieval, evaluation, and guardrails. I bridge the gap between experimental notebooks and stable production environments through disciplined release practices and rigorous "evals" frameworks. Professional experience is centered on fully remote, engineering-driven organizations. Open to fully remote roles only.',
    location:
      "Istanbul, Turkey · Open only for remote work · Highly compatible with US time zones",
    phone: "+90 539 481 59 76",
    linkedinDisplay: "linkedin.com/in/bariseryuz",
    experience: [
      {
        company: "Apple",
        location: "Remote (Turkey)",
        dateRange: "2019 – 2021",
        title: "Software Support — Tier 1 → Tier 2 Specialist (iOS)",
        metaNote:
          "Fully remote during COVID-19, alongside distance learning at Kapadokya University — Cappadocia.",
        logos: ["/logoapple.png"],
        bullets: [
          "Started as Tier 1 Software Support for iPhone and iPad software; after roughly two years advanced to Tier 2 Software Support Specialist, owning deeper iOS software cases, structured troubleshooting, and handoffs when engineering escalation was required.",
          "Day-to-day scope: customer-facing technical support for iOS device software—reproducing issues, guiding users through recovery and settings paths, documenting outcomes, and maintaining quality and handle-time expectations in a high-volume support environment.",
          "Worked 100% remotely from Turkey for the full tenure; the role ran in parallel with university studies, both the job and Kapadokya coursework delivered online during the pandemic, which demanded strong self-management, written clarity, and calendar discipline across two remote commitments.",
        ],
      },
      {
        company: "MSC Cruises & Viking",
        location: "International",
        dateRange: "2021 – 2026",
        metaNote: "On demand when available, alongside software work.",
        title: "Historical City Tours of Constantinople / Istanbul (Ottoman/Roman Era)",
        logos: ["/msc.png", "/Viking-Cruises_Logo-sm.png"],
        bullets: [
          "Contract guide for MSC Cruises and Viking on historical city tours of Constantinople / Istanbul, with emphasis on Roman, Byzantine, and Ottoman layers of the city—linking monuments, daily life, and food culture for international guests in ship and port programs.",
          "Relationship renewed across roughly four years of contracts (2021–2026): not a second full-time track, but deliberate work chosen for depth of place, pace with diverse crews, and constant practice in clear, accurate historical storytelling.",
          "Highly collaborative by nature: daily coordination with ship hospitality, entertainment, and local operations; comfortable translating dense history into engaging, responsible narratives for non-specialist audiences.",
          "Engagements are scheduled only when time allows around software and product commitments—kept intentionally light for enjoyment and lifelong interest in the city; professional identity and long-term ambition stay in technology, AI, and engineering.",
        ],
      },
      {
        company: "Briggs Lux Consultation",
        location: "Remote",
        dateRange: "2024 – Present",
        title: "AI Engineer",
        bullets: [
          "Builds and ships LLM-powered products and integrations for clients—conversational flows, lead and customer qualification, and retrieval-backed assistants—with emphasis on evals, guardrails, and measurable quality in production.",
          "Designs and implements RAG and agent-style pipelines (e.g. LangChain), cloud deployment and data layers, and observability so failures in retrieval or model behavior are traceable and fixable under real traffic.",
          "Works end-to-end with stakeholders: scoping, iteration, and disciplined releases so experimental ideas move into stable, maintainable software rather than one-off demos.",
        ],
      },
    ],
    education: [
      {
        institution: "Kapadokya University — Cappadocia",
        location: "Nevşehir, Turkey",
        dateRange: "",
        degree: "Tourism Management & Guidance",
        detail:
          "Grounded in Cappadocia: a program that pairs operational tourism skills with serious study of place. Coursework covered running professional tourism operations—guest services, itineraries, safety-conscious field work, and destination logistics—alongside Roman and Byzantine Anatolia, Ottoman history, and the art, architecture, and food culture of the region. The aim was not only to manage programs but to guide visitors with accurate, vivid interpretation of history and landscape.",
        logo: "/kapadokya.png",
      },
      {
        institution: "University of London — Goldsmiths College",
        location: "Distance learning (global) · UK degree pathway",
        dateRange: "In progress",
        degree: "B.Sc. Computer Science",
        detail:
          "Enrolled in the University of London’s online B.Sc. Computer Science, with academic direction from Goldsmiths, University of London. The format is built for working professionals: structured modules and assessments, but no fixed campus timetable, so it does not conflict with client work, product shipping, or business travel. Focus areas include rigorous computer science foundations, software development practice, and systems thinking—aligned with production AI and platform engineering. After graduation, the planned next step is a Master’s degree specialising in robotics; that trajectory is a firm commitment and a core part of long-term professional goals, not an occasional interest.",
        logo: "/college.png",
      },
    ],
    skillGroups: [
      {
        title: "AI & LLM orchestration",
        items: [
          "Production RAG pipelines",
          "Agentic workflows",
          "Prompt engineering & optimization",
          "Fine-tuning (PEFT / LoRA)",
          "Function & tool calling",
          "LangChain",
          "LlamaIndex",
          "DSPy",
          "OpenAI / Anthropic / major model APIs",
          "Streaming responses & latency-aware UX",
          "Structured outputs & JSON / schema-constrained generation",
        ],
      },
      {
        title: "Retrieval & vector databases",
        items: [
          "Pinecone",
          "Weaviate",
          "Milvus",
          "Qdrant / Chroma",
          "Hybrid search",
          "Semantic re-ranking",
          "Document parsing & chunking strategies",
          "Embedding selection & refresh strategies",
        ],
      },
      {
        title: "Evaluation & reliability",
        items: [
          "LLM-as-a-judge",
          "RAGAS",
          "DeepEval",
          "LangSmith",
          "Guardrails (NeMo / Guardrails AI)",
          "PII masking",
          "Prompt-injection mitigation",
          "Golden sets & regression tests for prompts / models",
        ],
      },
      {
        title: "Engineering & DevOps",
        items: [
          "Python",
          "TypeScript",
          "FastAPI",
          "Docker",
          "Kubernetes",
          "CI/CD for AI systems (e.g. GitHub Actions)",
          "Git",
          "Cloud (AWS / GCP / Azure)",
          "OpenTelemetry & production observability",
          "API design (REST) & service boundaries",
        ],
      },
      {
        title: "Data & ML",
        items: [
          "SQL",
          "NoSQL",
          "PyTorch / TensorFlow",
          "Pydantic & data validation",
          "ETL / data pipelines",
          "Redis / caching for RAG & inference hot paths",
        ],
      },
    ],
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
      title: "Direct Shades & Blinds — commercial window coverings",
      description:
        "National commercial window-covering brand: mill-direct positioning, markets, projects, and request-a-bid flows—with AI-assisted integrations and clear lead UX.",
      tags: ["Web design & build", "Lead / bid UX", "AI integrations", "Responsive"],
      hrefLabel: "Visit Direct Shades & Blinds →",
      href: "https://www.directshadesandblinds.com/",
    },
    {
      title: "1311 Events — luxury event production",
      description:
        "Thirteen Eleven Events: luxury rentals, labor, and coordination across Hawaii & SoCal—quotes, booking-style touchpoints, and AI features to reduce planner friction.",
      tags: ["Web design & build", "Forms & CRM hooks", "AI integrations", "Hospitality UX"],
      hrefLabel: "Visit 1311 Events →",
      href: "https://1311events.com/",
    },
    {
      title: "Briggs Brothers Ranch — luxury private retreat",
      description:
        "Luxury private retreat: brand, amenities, inquiry and booking detail flows, plus integrations and lightweight AI for smooth guest and admin communication.",
      tags: ["Web design & build", "Luxury hospitality", "Booking & inquiries", "AI integrations"],
      hrefLabel: "Visit Briggs Brothers Ranch →",
      href: "https://www.briggsbrothersranch.com/",
    },
  ],
};

