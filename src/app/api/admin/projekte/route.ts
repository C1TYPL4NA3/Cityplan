import { NextResponse } from 'next/server';
import { getAllProjects, saveAllProjects } from '@/lib/projects';
import { isAuthenticated } from '@/lib/adminAuth';

export async function GET() {
  if (!await isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(getAllProjects());
}

export async function POST(req: Request) {
  if (!await isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const projects = getAllProjects();
  const newProject = {
    ...body,
    id: String(Date.now()),
    order: projects.length,
  };
  saveAllProjects([...projects, newProject]);
  return NextResponse.json(newProject, { status: 201 });
}
