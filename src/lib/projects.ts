import path from 'path';
import fs from 'fs';

const DATA_PATH = path.join(process.cwd(), 'src', 'data', 'projects.json');

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  year: number;
  status: string;
  description: string;
  client?: string;
  area?: string;
  coverImage: string;
  images: string[];
  order: number;
  featured: boolean;
}

export function getAllProjects(): Project[] {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  const projects = JSON.parse(raw) as Project[];
  return projects.sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find(p => p.slug === slug);
}

export function saveAllProjects(projects: Project[]): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(projects, null, 2), 'utf-8');
}

export const CATEGORIES = [
  { value: 'uebersicht', label: 'übersicht' },
  { value: 'wohnen', label: 'wohnen' },
  { value: 'gewerbe', label: 'gewerbe' },
  { value: 'oeffentlich', label: 'öffentlich' },
  { value: 'wettbewerbe', label: 'wettbewerbe' },
];
