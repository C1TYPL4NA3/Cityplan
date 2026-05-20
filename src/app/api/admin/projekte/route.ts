import { NextRequest, NextResponse } from 'next/server';
import { getAllProjects, saveAllProjects } from '@/lib/projects';
import { isAuthenticated } from '@/lib/adminAuth';
import type { Project } from '@/lib/projects';

export async function GET() {
  if (!await isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(getAllProjects());
}

export async function POST(req: NextRequest) {
  if (!await isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const data = await req.json() as Omit<Project, 'id'>;
  const projects = getAllProjects();
  const maxId = projects.reduce((m, p) => Math.max(m, parseInt(p.id) || 0), 0);
  const newProject: Project = { ...data, id: String(maxId + 1) };
  projects.push(newProject);
  saveAllProjects(projects);
  return NextResponse.json(newProject, { status: 201 });
}
