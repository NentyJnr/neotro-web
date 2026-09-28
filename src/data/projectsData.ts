export interface ProjectItem {
  id: string;
  name: string;
  tag: string;
  desc: string;
  img?: string;
  link?: string;
  sector?: string;
  highlights?: string[];
}

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    name: 'Neotro Attendance System',
    tag: 'Attendance & ID',
    sector: 'Attendance & Security',
    desc: 'Smart, verifiable attendance and ID card system for schools and institutions, replacing manual sign-in sheets with a real-time digital record.',
    highlights: [
      'Dual-factor biometric verification (Facial + RFID)',
      'Offline sync buffer during network downtime',
      'Automated parent SMS entrance/exit notifications'
    ]
  },
  {
    id: 'proj-2',
    name: 'Neotro School Portal',
    tag: 'School systems',
    sector: 'School OS',
    desc: 'A comprehensive school management portal covering admissions, academics, broadsheet GPA processing, and tuition finance in one dashboard.',
    highlights: [
      'Automated broadsheet GPA calculation engine',
      'Tamper-proof transcript generation & digital verification',
      'Tuition payment gateway reconciliation'
    ]
  },
  {
    id: 'proj-3',
    name: 'Lecturra',
    tag: 'EdTech / AI',
    sector: 'Applied AI',
    desc: 'An AI-assisted platform helping Nigerian and African tertiary faculty generate exams, prepare teaching materials, and manage research and supervision workloads.',
    highlights: [
      'Localized NLP for African academic curricula',
      'Automated exam question generator & rubric grader',
      'Faculty research workload manager'
    ]
  },
  {
    id: 'proj-4',
    name: 'Church Management System',
    tag: 'Institutions',
    sector: 'Church OS',
    desc: 'Membership, giving audit ledgers, attendance tracking, and multi-location communication tools for churches and community organizations.',
    highlights: [
      'Encrypted tithe & offering financial ledger',
      'First-timer follow-up workflow pipeline',
      'Multi-branch real-time synchronization'
    ]
  },
  {
    id: 'proj-5',
    name: 'Neoppe',
    tag: 'Construction / QS',
    sector: 'QS Estimator',
    desc: 'An enterprise quantity surveying takeoff and estimating platform, bringing QS workflows out of spreadsheets and into an auditable digital tool.',
    highlights: [
      'Pre-loaded Nigerian material market rate indices',
      'Automated BOQ generation & rate breakdown',
      'Material price inflation & escalation modeling'
    ]
  },
  {
    id: 'proj-6',
    name: 'Business Portals',
    tag: 'Local business',
    sector: 'Business Portals',
    desc: 'Custom web portals built for local businesses — including Tosphy Geospatial Nigeria Ltd and Edufact Academy — each with the specific tools that business needed.',
    highlights: [
      'Geospatial data viewer for Tosphy Geospatial Ltd',
      'Academy portal & course portal for Edufact Academy',
      'Purpose-built administrative backend'
    ]
  }
];

export const INITIAL_TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Dr. Clement Adeleke',
    role: 'Administrator, Premier Academy Lagos',
    quote: 'Neotro School Portal reduced our term result broadsheet processing time from 3 weeks down to under 15 minutes. Zero mathematical calculation errors.',
    rating: 5
  },
  {
    id: 't-2',
    name: 'Engr. Segun Oladipo',
    role: 'Principal QS, Vanguard Infrastructure',
    quote: 'Neoppe brought our quantity surveying takeoff out of fragile Excel sheets. We generated an auditable BOQ for a ₦3.4B tender in 48 hours.',
    rating: 5
  },
  {
    id: 't-3',
    name: 'Pastor Emmanuel Eze',
    role: 'Head of Operations, Grace Cathedral Network',
    quote: 'Managing giving records across 18 regional branches was a nightmare until Neotro Church OS. Instant receipts, 100% financial audit trail.',
    rating: 5
  }
];
