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

  const inputStyle = {
    width: '100%', border: '1px solid #ddd', padding: '10px 12px',
    fontSize: 15, borderRadius: 3, boxSizing: 'border-box' as const, marginTop: 6,
  };
  const btnStyle = {
    width: '100%', background: '#b85535', color: '#fff', border: 'none',
    padding: '12px', fontSize: 15, fontWeight: 700, borderRadius: 3,
    cursor: 'pointer', marginTop: 20,
  };

  return (
    <form onSubmit={handleSubmit}>
      <label style={{ fontSize: 13, fontWeight: 600, color: '#555' }}>
        Passwort
        <input
          type="password"
          value={pw}
          onChange={e => setPw(e.target.value)}
          style={inputStyle}
          placeholder="••••••••"
          required
        />
      </label>
      {error && <p style={{ color: '#b85535', fontSize: 13, marginTop: 8 }}>{error}</p>}
      <button type="submit" style={btnStyle} disabled={loading}>
        {loading ? '...' : 'Einloggen'}
      </button>
    </form>
  );
}
