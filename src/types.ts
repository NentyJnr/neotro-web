export type SectorType = 'all' | 'school' | 'attendance' | 'church' | 'construction' | 'business';

export interface Project {
  id: string;
  title: string;
  client: string;
  sector: SectorType;
  sectorLabel: string;
  summary: string;
  description: string;
  metrics: string;
  location: string;
  techStack: string[];
  featured: boolean;
  status: 'live' | 'in-development' | 'archived';
  link?: string;
  year: string;
}

export interface ServiceItem {
  id: string;
  sector: SectorType;
  title: string;
  description: string;
  iconName: string;
  highlights: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  organization: string;
  sector: SectorType;
  problemDescription: string;
}

export type JobDepartment = 'all' | 'Engineering' | 'Product & Design' | 'Client Solutions' | 'Operations';

export interface JobOpening {
  id: string;
  title: string;
  department: 'Engineering' | 'Product & Design' | 'Client Solutions' | 'Operations';
  location: string;
  type: 'Full-time' | 'Contract' | 'Internship';
  experienceLevel: 'Entry' | 'Mid-Level' | 'Senior' | 'Lead';
  summary: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave?: string[];
  techStack?: string[];
  isOpen: boolean;
  postedDate: string;
}

export interface JobApplicationPayload {
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  experienceLevel: string;
  portfolioUrl?: string;
  resumeUrl: string;
  coverNote?: string;
  website_hp?: string;
}
