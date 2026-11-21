import type { Project, ServiceItem } from '../types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'EduCore Comprehensive School Portal',
    client: 'Grace College & Academy, Lagos',
    sector: 'school',
    sectorLabel: 'School Management',
    summary: 'Single-dashboard solution replacing 7 separate paper registers for admissions, gradebooks, fees, and parent SMS notifications.',
    description: 'EduCore aggregates student registration, automated termly report sheet generation, fee collection tracking via paystack integration, and instant parent SMS alerts into one unified web portal.',
    metrics: '2,400+ Active Students Managed',
    location: 'Ikeja, Lagos',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'SMS Gateway'],
    featured: true,
    status: 'live',
    link: 'https://neotro-portal.vercel.app/',
    year: '2025'
  },
  {
    id: 'proj-2',
    title: 'SmartCheck Verifiable Attendance & Biometric ID System',
    client: 'St. Augustine International Academy',
    sector: 'attendance',
    sectorLabel: 'Attendance & ID',
    summary: 'Hardware-integrated QR & NFC tap-in system for real-time student check-ins and verifiable ID cards.',
    description: 'Designed to eliminate manual attendance roll-calls. Provides instant arrival timestamps sent to parents via WhatsApp/SMS notifications and generates audited monthly attendance reports.',
    metrics: '99.4% Attendance Accuracy',
    location: 'Lekki, Lagos',
    techStack: ['React', 'TypeScript', 'WebSockets', 'NFC SDK'],
    featured: true,
    status: 'live',
    year: '2025'
  },
  {
    id: 'proj-3',
    title: 'Ecclesia Member & Giving Engine',
    client: 'Redeemed Christian Church Network',
    sector: 'church',
    sectorLabel: 'Church & Institution',
    summary: 'Centralized membership directory, tithe & offering record-keeping, and multi-channel member outreach system.',
    description: 'Provides church administrators with real-time financial auditing of weekly giving, automated follow-up workflows for first-time visitors, and event attendance tracking across 4 regional branches.',
    metrics: '15,000+ Members Tracked',
    location: 'Victoria Island, Lagos',
    techStack: ['React', 'Express', 'SQL Server', 'Chart.js'],
    featured: true,
    status: 'live',
    year: '2024'
  },
  {
    id: 'proj-4',
    title: 'TakeoffPro Digital QS Estimating Suite',
    client: 'Vanguard Engineering & Construction Consultants',
    sector: 'construction',
    sectorLabel: 'Construction & QS',
    summary: 'Cloud-based quantity surveying takeoff software converting CAD/PDF blueprints directly into auditable Bills of Quantities (BOQ).',
    description: 'Eliminates repetitive manual spreadsheet copy-pasting for quantity surveyors. Includes live market material price feeds, structural concrete calculators, and auditable client estimate exports.',
    metrics: '70% Faster BOQ Preparation',
    location: 'Ajah, Lagos',
    techStack: ['React', 'TypeScript', 'PDF.js', 'PostgreSQL'],
    featured: true,
    status: 'live',
    year: '2026'
  },
  {
    id: 'proj-5',
    title: 'OmniBiz Merchant Order & Inventory Hub',
    client: 'Crown Logistics & Distribution Ltd',
    sector: 'business',
    sectorLabel: 'Business Portals',
    summary: 'Tailor-made B2B ordering portal for FMCG distributors managing multi-warehouse stock and vendor credit terms.',
    description: 'Custom portal enabling 120+ wholesale vendors to place daily orders, inspect live stock levels, issue automated e-invoices, and settle payments securely online.',
    metrics: '₦450M+ Monthly Order Volume',
    location: 'Apapa, Lagos',
    techStack: ['React', 'Node.js', 'Redis', 'Paystack API'],
    featured: true,
    status: 'live',
    year: '2025'
  },
  {
    id: 'proj-6',
    title: 'Apex Campus Exam & Result Validation Portal',
    client: 'Federal College of Technical Education',
    sector: 'school',
    sectorLabel: 'School Management',
    summary: 'Tamper-proof online result checking portal with cryptographically signed QR verification codes for transcript authenticity.',
    description: 'Prevents grade alteration and fake certificate generation. Enables alumni and employers to instantly verify graduate credentials via automated QR code verification.',
    metrics: '45,000+ Transcripts Verified',
    location: 'Yaba, Lagos',
    techStack: ['React', 'CryptoJS', 'Node.js', 'PostgreSQL'],
    featured: false,
    status: 'live',
    year: '2024'
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'svc-1',
    sector: 'school',
    title: 'School management systems',
    description: 'Admissions, attendance, academics, finance and reporting for Nigerian schools, brought into one dashboard instead of a stack of registers.',
    iconName: 'GraduationCap',
    highlights: ['Automated report cards', 'Parent SMS notifications', 'Fee tracking & receipting']
  },
  {
    id: 'svc-2',
    sector: 'attendance',
    title: 'Attendance & ID systems',
    description: 'Smart, verifiable check-in and ID card systems that replace manual, error-prone attendance taking on the ground.',
    iconName: 'QrCode',
    highlights: ['Biometric & QR tap-in', 'Instant parent alerts', 'Auditable monthly logs']
  },
  {
    id: 'svc-3',
    sector: 'church',
    title: 'Church & institution management',
    description: 'Membership, giving, attendance and communication tools for churches and community organisations.',
    iconName: 'Building2',
    highlights: ['Visitor retention workflows', 'Tithe & offering logs', 'Multi-branch analytics']
  },
  {
    id: 'svc-4',
    sector: 'construction',
    title: 'Construction & QS technology',
    description: 'Digital takeoff and estimating tools that bring quantity surveying workflows out of spreadsheets and into something auditable.',
    iconName: 'Ruler',
    highlights: ['PDF Blueprint takeoff', 'Auditable BOQ generator', 'Live material price feeds']
  },
  {
    id: 'svc-5',
    sector: 'business',
    title: 'Business portals',
    description: 'Purpose-built web portals for local businesses — the specific tools a business needs, not a generic template.',
    iconName: 'Briefcase',
    highlights: ['Custom inventory management', 'B2B order processing', 'Local payment integration']
  }
];
