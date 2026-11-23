import type { JobOpening } from '../types';

export interface CulturePillar {
  title: string;
  description: string;
  badge: string;
}

export const CULTURE_PILLARS: CulturePillar[] = [
  {
    title: "Mission-Critical African Infrastructure",
    description: "We don't build frivolous clones. We design and operate the digital spine for Nigerian schools, quantity surveying firms, and growing enterprises.",
    badge: "High Impact"
  },
  {
    title: "Clean Architecture & Zero Shortcuts",
    description: "We prioritize maintainable domain-driven architecture, TypeScript strictness, automated testing, and solid engineering standards over rushed hacks.",
    badge: "Engineering Excellence"
  },
  {
    title: "Outcome-Driven Autonomy",
    description: "We value ownership, clear communication, and high-quality deliverables. Enjoy modern hybrid and remote workflows designed around focus and results.",
    badge: "Hybrid Flexibility"
  },
  {
    title: "Rapid Technical Growth",
    description: "Work directly on high-scale systems, real production data partitioning, and AI integrations with seasoned senior engineers who mentor and invest in your craft.",
    badge: "Career Progression"
  }
];

export const INITIAL_JOB_OPENINGS: JobOpening[] = [
  {
    id: "eng-fullstack-sr",
    title: "Senior Full-Stack Engineer (.NET Core & React)",
    department: "Engineering",
    location: "Lagos, Nigeria (Hybrid)",
    type: "Full-time",
    experienceLevel: "Senior",
    summary: "Lead the technical design and delivery of multi-tenant cloud platforms, scalable backend services in C#/.NET Core, and performant React web interfaces.",
    responsibilities: [
      "Architect and implement scalable RESTful APIs and background services using C# and ASP.NET Core 9.",
      "Design relational database schemas, query optimizations, and partitioned storage in SQL Server / PostgreSQL.",
      "Build modular, responsive frontend features using React 19, TypeScript, and modern Tailwind CSS.",
      "Mentor mid-level engineers, conduct rigorous code reviews, and champion clean architecture patterns.",
      "Participate in high-reliability 99.9% uptime SLA monitoring, telemetry, and incident diagnostics."
    ],
    requirements: [
      "5+ years of software engineering experience with strong proficiency in C# and ASP.NET Core.",
      "Deep understanding of relational database design, indexing, and EF Core / Dapper performance tuning.",
      "Solid experience building modern single-page applications with React, TypeScript, and state management.",
      "Hands-on familiarity with Docker, CI/CD pipelines, and cloud hosting (Azure / AWS / Vercel).",
      "Demonstrated experience in domain-driven design, repository patterns, and automated testing."
    ],
    niceToHave: [
      "Experience with school ERP or construction quantity takeoff domain workflows.",
      "Familiarity with the Nigeria Data Protection Act (NDPA 2023) or enterprise compliance standards."
    ],
    techStack: ["C#", ".NET Core", "React", "TypeScript", "SQL Server", "Tailwind CSS", "Docker"],
    isOpen: true,
    postedDate: "November 2026"
  },
  {
    id: "eng-frontend-mid",
    title: "Frontend Engineer (React / TypeScript / Tailwind)",
    department: "Engineering",
    location: "Lagos / Remote (Nigeria)",
    type: "Full-time",
    experienceLevel: "Mid-Level",
    summary: "Craft high-performance, accessible, and responsive user interfaces for Neotro's suite of institutional web platforms and customer portals.",
    responsibilities: [
      "Develop responsive, pixel-accurate web applications with React 19, Vite, TypeScript, and Tailwind CSS.",
      "Collaborate with UI/UX designers to translate Figma design systems into reusable component libraries.",
      "Optimize web vital metrics, bundle chunking, and rendering performance across desktop and mobile devices.",
      "Implement robust client-side validation, error handling, and accessible WCAG 2.2 AA interactions."
    ],
    requirements: [
      "3+ years of professional experience building web applications with modern React and TypeScript.",
      "Expert knowledge of CSS3, responsive layouts, Tailwind CSS, and semantic HTML5.",
      "Proficiency with RESTful API integration, TanStack Query or Axios, and asynchronous state handling.",
      "Strong understanding of browser devtools, web performance profiling, and git workflows."
    ],
    niceToHave: [
      "Experience with 3D web graphics (Three.js / WebGL) or SVG motion animations.",
      "Experience writing unit and integration tests with Vitest or React Testing Library."
    ],
    techStack: ["React 19", "TypeScript", "Tailwind CSS", "Vite", "REST APIs", "Git"],
    isOpen: true,
    postedDate: "November 2026"
  },
  {
    id: "des-product-mid",
    title: "Product & UI/UX Designer",
    department: "Product & Design",
    location: "Remote (Nigeria)",
    type: "Full-time",
    experienceLevel: "Mid-Level",
    summary: "Shape the design language, user journeys, and interfaces for mission-critical software used daily by institutional administrators, teachers, and firms.",
    responsibilities: [
      "Create high-fidelity wireframes, interactive prototypes, and design systems in Figma.",
      "Conduct user research and usability testing with school administrators and enterprise users.",
      "Work closely with frontend engineers to ensure design fidelity and cohesive interaction design.",
      "Design intuitive data visualization dashboards, complex table grids, and report layouts."
    ],
    requirements: [
      "3+ years of experience in digital product and UX/UI design for complex B2B or SaaS applications.",
      "Mastery of Figma (auto-layout, components, variables, interactive prototyping).",
      "Demonstrated portfolio showcasing complex desktop and mobile web workflows.",
      "Strong grasp of information architecture, typography, color theory, and WCAG accessibility standards."
    ],
    niceToHave: [
      "Basic understanding of HTML/CSS capabilities and design system tokens in Tailwind.",
      "Experience designing software for the African education or construction sectors."
    ],
    techStack: ["Figma", "Design Systems", "Prototyping", "User Research", "WCAG AA"],
    isOpen: true,
    postedDate: "November 2026"
  },
  {
    id: "sol-implementation-spec",
    title: "Client Solutions & Implementation Specialist",
    department: "Client Solutions",
    location: "Lagos, Nigeria",
    type: "Full-time",
    experienceLevel: "Mid-Level",
    summary: "Bridge the gap between client operations and Neotro platforms—driving smooth onboarding, user training, and exceptional customer success.",
    responsibilities: [
      "Guide new schools, firms, and enterprise clients through software setup, data migration, and launch.",
      "Conduct interactive staff training sessions (in-person and remote) for school heads, teachers, and admins.",
      "Serve as the primary technical point of contact for operational troubleshooting within our 4-hour SLA.",
      "Gather user feedback, identify friction points, and advocate for feature improvements with the product team."
    ],
    requirements: [
      "2+ years of experience in client onboarding, technical customer success, or solutions consulting in tech.",
      "Outstanding verbal and written communication skills with strong executive presentation ability.",
      "High empathy and patience when training non-technical users on enterprise software systems.",
      "Demonstrated ability to manage implementation timelines and coordinate multiple accounts concurrently."
    ],
    niceToHave: [
      "Prior experience working with primary, secondary, or tertiary institutions in Nigeria.",
      "Basic familiarity with spreadsheet formulas, CSV data formatting, and web SaaS platforms."
    ],
    techStack: ["SaaS Onboarding", "Customer Success", "Training", "Account Management", "CRM"],
    isOpen: true,
    postedDate: "November 2026"
  }
];
