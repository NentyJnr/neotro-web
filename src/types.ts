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
