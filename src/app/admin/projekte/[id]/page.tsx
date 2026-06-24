import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { isAuthenticated } from '@/lib/adminAuth';
import { getAllProjects } from '@/lib/projects';
import ProjectForm from '../ProjectForm';
import LogoutButton from '../../LogoutButton';

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  if (!await isAuthenticated()) redirect('/admin');
  const { id } = await params;
  const project = getAllProjects().find(p => p.id === id);
  if (!project) notFound();

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '0 28px', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <span style={{ fontWeight: 700, fontSize: 16 }}>Cityplan Admin</span>
          <Link href="/admin/projekte" style={{ fontSize: 13, color: '#888' }}>← Projekte</Link>
        </div>
        <LogoutButton />
      </div>
      <div style={{ maxWidth: 1100, margin: '32px auto', padding: '0 28px' }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 28 }}>Projekt bearbeiten</h1>
        <ProjectForm initial={project} id={id} />
      </div>
    </div>
  );
}
