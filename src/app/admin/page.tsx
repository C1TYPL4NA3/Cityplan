import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/adminAuth';
import LoginForm from './LoginForm';

export default async function AdminPage() {
  if (await isAuthenticated()) redirect('/admin/projekte');
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: '#f5f5f5'
    }}>
      <div style={{
        background: '#fff', borderRadius: 4, padding: '48px 40px',
        width: '100%', maxWidth: 400, boxShadow: '0 2px 16px rgba(0,0,0,0.08)'
      }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Admin</h1>
          <p style={{ color: '#888', marginTop: 6, fontSize: 14 }}>Cityplan AG</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
