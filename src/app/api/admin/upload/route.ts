import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/adminAuth';
import path from 'path';
import fs from 'fs';

export async function POST(req: NextRequest) {
  if (!await isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  const folder = (formData.get('folder') as string) || 'misc';

  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

  const ext = path.extname(file.name).toLowerCase();
  const allowed = ['.jpg', '.jpeg', '.png', '.webp', '.svg'];
  if (!allowed.includes(ext)) return NextResponse.json({ error: 'Dateityp nicht erlaubt' }, { status: 400 });

  const dir = path.join(process.cwd(), 'public', 'images', 'projects', folder);
  fs.mkdirSync(dir, { recursive: true });

  const filename = file.name.replace(/[^a-zA-Z0-9._-]/g, '-').toLowerCase();
  const filepath = path.join(dir, filename);

  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(filepath, buffer);

  return NextResponse.json({ url: `/images/projects/${folder}/${filename}` });
}
