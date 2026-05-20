import path from 'path';
import fs from 'fs';

export type ProjectCategory = 'residential' | 'commercial' | 'urban' | 'public';

export interface Project {
  id: string;
  slug: string;
  title: { de: string; en: string };
  category: ProjectCategory;
  location: string;
  year: number;
  client?: { de: string; en: string };
  area?: string;
  status: { de: string; en: string };
  description: { de: string; en: string };
  longDescription?: { de: string; en: string };
  coverImage: string;
  images: string[];
  featured: boolean;
}

const DATA_PATH = path.join(process.cwd(), 'src', 'data', 'projects.json');

export function getAllProjects(): Project[] {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(raw) as Project[];
}

export function saveAllProjects(projects: Project[]): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(projects, null, 2), 'utf-8');
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter(p => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find(p => p.slug === slug);
}

export function getProjectById(id: string): Project | undefined {
  return getAllProjects().find(p => p.id === id);
}

export function getProjectsByCategory(category: ProjectCategory | 'all'): Project[] {
  const all = getAllProjects();
  if (category === 'all') return all;
  return all.filter(p => p.category === category);
}
