'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw }),
    });
    setLoading(false);
    if (res.ok) router.push('/admin/projekte');
    else setError('Falsches Passwort');
  }

  const inp: React.CSSProperties = { width: '100%', border: '1px solid #ddd', padding: '9px 12px', fontSize: 14, boxSizing: 'border-box', marginTop: 4 };

  return (
    <form onSubmit={handleSubmit}>
      <label style={{ fontSize: 13, fontWeight: 600, color: '#555' }}>
        Passwort
        <input type="password" value={pw} onChange={e => setPw(e.target.value)} style={inp} required />
      </label>
      {error && <p style={{ color: '#c00', fontSize: 13, marginTop: 8 }}>{error}</p>}
      <button type="submit" disabled={loading} style={{ marginTop: 20, width: '100%', background: '#1a1a1a', color: '#fff', border: 'none', padding: '11px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
        {loading ? '...' : 'Einloggen'}
      </button>
    </form>
  );
}
