import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/adminAuth';
import LoginForm from './LoginForm';

export default async function AdminPage() {
  if (await isAuthenticated()) redirect('/admin/projekte');
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', padding: '48px 40px', width: '100%', maxWidth: 380, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 6px' }}>Admin</h1>
        <p style={{ color: '#888', fontSize: 13, margin: '0 0 28px' }}>Cityplan AG</p>
        <LoginForm />
      </div>
    </div>
  );
}
