import React from 'react';

export interface PartnerItem {
  name: string;
  subtitle?: string;
  type: string;
  tag: string;
  logoUrl?: string;
  icon: React.ReactNode;
}

export const DEFAULT_PARTNERS: PartnerItem[] = [
  {
    name: "Attwool Schools",
    subtitle: "Skills, Ethos & Excellence",
    type: "K-12 Educational Institution",
    logoUrl: "/logos/attwool-logo.png",
    tag: "School Portal & Results",
    icon: (
      <svg className="w-5 h-5 text-[#059669]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    )
  },
  {
    name: "Tosphy Geo-Spatial",
    subtitle: "Nigeria Limited",
    type: "Geospatial & Land Systems",
    logoUrl: "/logos/tosphy-logo.png",
    tag: "GIS & Surveying",
    icon: (
      <svg className="w-5 h-5 text-[#059669]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    )
  },
  {
    name: "EduFacts360",
    subtitle: "Global Education Academy",
    type: "Academy & Research",
    logoUrl: "/logos/edufacts-logo.png",
    tag: "Curriculum & Analytics",
    icon: (
      <svg className="w-5 h-5 text-[#093824]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    )
  },
  {
    name: "Dotmond School",
    subtitle: "Primary & Secondary",
    type: "Academic Institution",
    tag: "Tuition & Grading",
    icon: (
      <svg className="w-5 h-5 text-[#093824]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    )
  },
  {
    name: "BuildCore QS Partners",
    subtitle: "Quantity Surveying Consultants",
    type: "Construction Estimation",
    tag: "Neoppe Takeoff Partner",
    icon: (
      <svg className="w-5 h-5 text-[#059669]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M5 21V7l8-4v18" />
        <path d="M19 21V11l-6-3" />
        <path d="M9 9h1" />
        <path d="M9 13h1" />
        <path d="M9 17h1" />
      </svg>
    )
  },
  {
    name: "CrownGate College",
    subtitle: "Secondary Academic Academy",
    type: "College Education",
    tag: "Result Compilations",
    icon: (
      <svg className="w-5 h-5 text-[#10B981]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
        <path d="M5 20h14" />
      </svg>
    )
  }
];
