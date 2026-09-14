import path from 'path';
import fs from 'fs';
import type { Project } from './categories';

export type { Project };
export { CATEGORIES } from './categories';

const DATA_PATH = path.join(process.cwd(), 'src', 'data', 'projects.json');

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
