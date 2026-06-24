import { NextResponse } from 'next/server';
import { getAllProjects, saveAllProjects } from '@/lib/projects';
import { isAuthenticated } from '@/lib/adminAuth';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const projects = getAllProjects();
  const idx = projects.findIndex(p => p.id === id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  projects[idx] = { ...projects[idx], ...body, id };
  saveAllProjects(projects);
  return NextResponse.json(projects[idx]);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const projects = getAllProjects().filter(p => p.id !== id);
  projects.forEach((p, i) => { p.order = i; });
  saveAllProjects(projects);
  return NextResponse.json({ ok: true });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const { direction } = await req.json();
  const projects = getAllProjects();
  const idx = projects.findIndex(p => p.id === id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
  if (swapIdx < 0 || swapIdx >= projects.length) return NextResponse.json({ error: 'Out of bounds' }, { status: 400 });
  [projects[idx].order, projects[swapIdx].order] = [projects[swapIdx].order, projects[idx].order];
  [projects[idx], projects[swapIdx]] = [projects[swapIdx], projects[idx]];
  saveAllProjects(projects);
  return NextResponse.json({ ok: true });
}
