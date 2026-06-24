import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { isAuthenticated } from '@/lib/adminAuth';
import { getAllProjects } from '@/lib/projects';
import DeleteButton from './DeleteButton';
import ReorderButtons from './ReorderButtons';
import LogoutButton from '../LogoutButton';

export default async function AdminProjectsPage() {
  if (!await isAuthenticated()) redirect('/admin');
  const projects = getAllProjects();

  const th: React.CSSProperties = { padding: '10px 14px', textAlign: 'left', fontWeight: 700, fontSize: 12, color: '#888', background: '#fafafa', borderBottom: '1px solid #eee', letterSpacing: '0.05em', textTransform: 'uppercase' };
  const td: React.CSSProperties = { padding: '12px 14px', borderBottom: '1px solid #eee', fontSize: 13, verticalAlign: 'middle' };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '0 28px', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <span style={{ fontWeight: 700, fontSize: 16 }}>Cityplan Admin</span>
          <Link href="/projekte" style={{ fontSize: 13, color: '#888' }}>← Zur Webseite</Link>
        </div>
        <LogoutButton />
      </div>

      <div style={{ maxWidth: 1100, margin: '32px auto', padding: '0 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Projekte</h1>
          <Link href="/admin/projekte/neu" style={{ background: '#1a1a1a', color: '#fff', padding: '9px 18px', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
            + Neues Projekt
          </Link>
        </div>

        <div style={{ background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={th}>Reihenfolge</th>
                <th style={th}>Bild</th>
                <th style={th}>Titel</th>
                <th style={th}>Kategorie</th>
                <th style={th}>Jahr</th>
                <th style={th}>Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p, i) => (
                <tr key={p.id}>
                  <td style={td}>
                    <ReorderButtons id={p.id} isFirst={i === 0} isLast={i === projects.length - 1} />
                  </td>
                  <td style={td}>
                    {p.coverImage ? (
                      <div style={{ position: 'relative', width: 80, height: 54 }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.coverImage} alt={p.title} style={{ width: 80, height: 54, objectFit: 'cover' }} />
                      </div>
                    ) : (
                      <div style={{ width: 80, height: 54, background: '#eee' }} />
                    )}
                  </td>
                  <td style={td}><span style={{ fontWeight: 600 }}>{p.title}</span></td>
                  <td style={td}>{p.category}</td>
                  <td style={td}>{p.year}</td>
                  <td style={td}>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <Link href={`/admin/projekte/${p.id}`} style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>Bearbeiten</Link>
                      <DeleteButton id={p.id} title={p.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {projects.length === 0 && (
            <div style={{ padding: 40, textAlign: 'center', color: '#999' }}>Noch keine Projekte.</div>
          )}
        </div>
      </div>
    </div>
  );
}
