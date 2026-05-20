import { redirect } from 'next/navigation';
import Link from 'next/link';
import { isAuthenticated } from '@/lib/adminAuth';
import { getAllProjects } from '@/lib/projects';
import DeleteButton from './DeleteButton';
import LogoutButton from '../LogoutButton';

export default async function AdminProjectsPage() {
  if (!await isAuthenticated()) redirect('/admin');
  const projects = getAllProjects();

  const tdStyle = { padding: '14px 16px', borderBottom: '1px solid #eee', fontSize: 14 };
  const thStyle = { ...tdStyle, fontWeight: 700, color: '#555', textAlign: 'left' as const, background: '#fafafa' };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '0 32px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <span style={{ fontWeight: 900, fontSize: 18 }}>Cityplan Admin</span>
          <Link href="/de" style={{ fontSize: 13, color: '#888', textDecoration: 'none' }}>← Zur Webseite</Link>
        </div>
        <LogoutButton />
      </div>

      <div style={{ maxWidth: 1100, margin: '40px auto', padding: '0 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>Projekte</h1>
          <Link href="/admin/projekte/neu" style={{
            background: '#b85535', color: '#fff', padding: '10px 20px',
            textDecoration: 'none', fontWeight: 700, fontSize: 14, borderRadius: 3
          }}>
            + Neues Projekt
          </Link>
        </div>

        <div style={{ background: '#fff', borderRadius: 4, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={thStyle}>Titel (DE)</th>
                <th style={thStyle}>Kategorie</th>
                <th style={thStyle}>Ort</th>
                <th style={thStyle}>Jahr</th>
                <th style={thStyle}>Featured</th>
                <th style={thStyle}>Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(p => (
                <tr key={p.id} style={{ background: '#fff' }}>
                  <td style={tdStyle}>
                    <span style={{ fontWeight: 600 }}>{p.title.de}</span>
                  </td>
                  <td style={tdStyle}><span style={{ fontSize: 12, background: '#f0f0f0', padding: '2px 8px', borderRadius: 20 }}>{p.category}</span></td>
                  <td style={tdStyle}>{p.location}</td>
                  <td style={tdStyle}>{p.year}</td>
                  <td style={tdStyle}>
                    <span style={{ color: p.featured ? '#16a34a' : '#999', fontWeight: 600, fontSize: 13 }}>
                      {p.featured ? '✓ Ja' : '–'}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <Link href={`/admin/projekte/${p.id}`} style={{ fontSize: 13, color: '#b85535', fontWeight: 600, textDecoration: 'none' }}>
                        Bearbeiten
                      </Link>
                      <DeleteButton id={p.id} title={p.title.de} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {projects.length === 0 && (
            <div style={{ padding: 40, textAlign: 'center', color: '#999' }}>Noch keine Projekte vorhanden.</div>
          )}
        </div>
      </div>
    </div>
  );
}
