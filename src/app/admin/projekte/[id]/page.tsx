import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { isAuthenticated } from '@/lib/adminAuth';
import { getAllProjects } from '@/lib/projects';
import ProjectForm from '../ProjectForm';
import LogoutButton from '../../LogoutButton';

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  if (!await isAuthenticated()) redirect('/admin');
  const { id } = await params;
  const projects = getAllProjects();
  const project = projects.find(p => p.id === id);
  if (!project) notFound();

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '0 32px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <span style={{ fontWeight: 900, fontSize: 18 }}>Cityplan Admin</span>
          <Link href="/admin/projekte" style={{ fontSize: 13, color: '#888', textDecoration: 'none' }}>← Projekte</Link>
        </div>
        <LogoutButton />
      </div>
      <div style={{ maxWidth: 1100, margin: '40px auto', padding: '0 32px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 32 }}>Projekt bearbeiten</h1>
        <ProjectForm initial={project} id={id} />
      </div>
    </div>
  );
}
