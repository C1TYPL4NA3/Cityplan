import { NextRequest, NextResponse } from 'next/server';
import { getAllProjects, saveAllProjects } from '@/lib/projects';
import { isAuthenticated } from '@/lib/adminAuth';
import type { Project } from '@/lib/projects';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const data = await req.json() as Project;
  const projects = getAllProjects();
  const idx = projects.findIndex(p => p.id === id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  projects[idx] = { ...data, id };
  saveAllProjects(projects);
  return NextResponse.json(projects[idx]);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const projects = getAllProjects().filter(p => p.id !== id);
  saveAllProjects(projects);
  return NextResponse.json({ ok: true });
}
