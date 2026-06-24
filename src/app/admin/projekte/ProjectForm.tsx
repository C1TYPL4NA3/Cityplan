'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Project } from '@/lib/projects';

const CATEGORIES = ['wohnen', 'gewerbe', 'oeffentlich', 'wettbewerbe'];

const EMPTY: Omit<Project, 'id' | 'order'> = {
  slug: '', title: '', category: 'wohnen',
  location: '', year: new Date().getFullYear(),
  status: 'Realisiert', description: '',
  client: '', area: '',
  coverImage: '', images: [], featured: false,
};

export default function ProjectForm({ initial, id }: { initial?: Project; id?: string }) {
  const router = useRouter();
  const [data, setData] = useState<Omit<Project, 'id' | 'order'>>(initial ?? EMPTY);
  const [images, setImages] = useState<string[]>(initial?.images ?? []);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const isEdit = !!id;

  function set<K extends keyof typeof data>(key: K, val: (typeof data)[K]) {
    setData(d => ({ ...d, [key]: val }));
  }

  async function uploadFile(file: File, field: 'cover' | 'gallery') {
    const slug = data.slug || 'neu';
    const fd = new FormData();
    fd.append('file', file);
    fd.append('folder', slug);
    setUploading(true);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    setUploading(false);
    if (!res.ok) { alert('Upload fehlgeschlagen'); return; }
    const { url } = await res.json();
    if (field === 'cover') {
      set('coverImage', url);
    } else {
      const n = [...images, url];
      setImages(n);
      set('images', n);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = { ...data, images };
    const url = isEdit ? `/api/admin/projekte/${id}` : '/api/admin/projekte';
    const res = await fetch(url, {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (res.ok) router.push('/admin/projekte');
    else alert('Fehler beim Speichern');
  }

  const inp: React.CSSProperties = { width: '100%', border: '1px solid #ddd', padding: '8px 10px', fontSize: 13, boxSizing: 'border-box' };
  const lbl: React.CSSProperties = { fontSize: 12, fontWeight: 700, color: '#666', display: 'block', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.04em' };
  const box: React.CSSProperties = { background: '#fff', padding: 24, marginBottom: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' };
  const g2: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 };

  return (
    <form onSubmit={handleSave} style={{ maxWidth: 820, margin: '0 auto' }}>
      {/* Basisdaten */}
      <div style={box}>
        <h2 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Basisdaten</h2>
        <div style={g2}>
          <div>
            <label style={lbl}>Titel *</label>
            <input style={inp} required value={data.title}
              onChange={e => set('title', e.target.value)} />
          </div>
          <div>
            <label style={lbl}>Slug (URL) *</label>
            <input style={inp} required value={data.slug}
              onChange={e => set('slug', e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''))}
              placeholder="mein-projekt" />
          </div>
        </div>
        <div style={{ ...g2, marginTop: 14 }}>
          <div>
            <label style={lbl}>Kategorie</label>
            <select style={inp} value={data.category} onChange={e => set('category', e.target.value)}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={lbl}>Status</label>
            <select style={inp} value={data.status} onChange={e => set('status', e.target.value)}>
              <option>Realisiert</option>
              <option>In Bau</option>
              <option>In Planung</option>
              <option>Wettbewerb</option>
            </select>
          </div>
        </div>
        <div style={{ ...g2, marginTop: 14 }}>
          <div>
            <label style={lbl}>Ort</label>
            <input style={inp} value={data.location} onChange={e => set('location', e.target.value)} />
          </div>
          <div>
            <label style={lbl}>Jahr</label>
            <input style={inp} type="number" value={data.year} onChange={e => set('year', parseInt(e.target.value))} />
          </div>
        </div>
        <div style={{ ...g2, marginTop: 14 }}>
          <div>
            <label style={lbl}>Bauherrschaft</label>
            <input style={inp} value={data.client ?? ''} onChange={e => set('client', e.target.value)} />
          </div>
          <div>
            <label style={lbl}>Fläche</label>
            <input style={inp} value={data.area ?? ''} onChange={e => set('area', e.target.value)} placeholder="1 200 m²" />
          </div>
        </div>
      </div>

      {/* Beschreibung */}
      <div style={box}>
        <h2 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Beschreibung</h2>
        <textarea style={{ ...inp, height: 120, resize: 'vertical' }} value={data.description}
          onChange={e => set('description', e.target.value)} />
      </div>

      {/* Bilder */}
      <div style={box}>
        <h2 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Bilder</h2>

        {/* Cover */}
        <div style={{ marginBottom: 24 }}>
          <label style={lbl}>Titelbild</label>
          <input type="file" accept="image/*"
            onChange={e => e.target.files?.[0] && uploadFile(e.target.files[0], 'cover')}
            style={{ fontSize: 13, display: 'block', marginBottom: 8 }} />
          {data.coverImage && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.coverImage} alt="Cover" style={{ width: 120, height: 80, objectFit: 'cover' }} />
              <button type="button" onClick={() => set('coverImage', '')}
                style={{ fontSize: 12, color: '#c00', background: 'none', border: 'none', cursor: 'pointer' }}>
                Entfernen
              </button>
            </div>
          )}
        </div>

        {/* Gallery */}
        <div>
          <label style={lbl}>Weitere Bilder (mehrere möglich)</label>
          <input type="file" accept="image/*" multiple
            onChange={e => { if (!e.target.files) return; Array.from(e.target.files).forEach(f => uploadFile(f, 'gallery')); }}
            style={{ fontSize: 13, display: 'block', marginBottom: 10 }} />
          {uploading && <p style={{ fontSize: 13, color: '#888', margin: '4px 0' }}>Lade hoch...</p>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {images.map((url, i) => (
              <div key={i} style={{ position: 'relative' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt={`Bild ${i + 1}`} style={{ width: 100, height: 68, objectFit: 'cover' }} />
                <button type="button" onClick={() => { const n = images.filter((_, j) => j !== i); setImages(n); set('images', n); }}
                  style={{ position: 'absolute', top: 2, right: 2, background: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none', borderRadius: '50%', width: 18, height: 18, cursor: 'pointer', fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', paddingBottom: 48 }}>
        <button type="button" onClick={() => router.push('/admin/projekte')}
          style={{ padding: '10px 22px', border: '1px solid #ddd', background: '#fff', fontSize: 13, cursor: 'pointer' }}>
          Abbrechen
        </button>
        <button type="submit" disabled={saving || uploading}
          style={{ padding: '10px 26px', background: '#1a1a1a', color: '#fff', border: 'none', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
          {saving ? 'Speichern...' : isEdit ? 'Änderungen speichern' : 'Projekt erstellen'}
        </button>
      </div>
    </form>
  );
}
