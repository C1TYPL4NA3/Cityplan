'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Project } from '@/lib/projects';

const EMPTY: Omit<Project, 'id'> = {
  slug: '', featured: false,
  title: { de: '', en: '' },
  category: 'residential',
  location: '', year: new Date().getFullYear(),
  status: { de: 'Realisiert', en: 'Completed' },
  description: { de: '', en: '' },
  longDescription: { de: '', en: '' },
  client: { de: '', en: '' },
  area: '',
  coverImage: '',
  images: [],
};

export default function ProjectForm({ initial, id }: { initial?: Project; id?: string }) {
  const router = useRouter();
  const [data, setData] = useState<Omit<Project, 'id'>>(initial ?? EMPTY);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageInputs, setImageInputs] = useState<string[]>(initial?.images ?? []);

  const isEdit = !!id;

  function set<K extends keyof Omit<Project, 'id'>>(key: K, val: Omit<Project, 'id'>[K]) {
    setData(d => ({ ...d, [key]: val }));
  }
  function setNested<K extends 'title' | 'description' | 'longDescription' | 'status' | 'client'>(
    key: K, lang: 'de' | 'en', val: string
  ) {
    setData(d => ({ ...d, [key]: { ...(d[key] as object), [lang]: val } }));
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
      const newImages = [...imageInputs, url];
      setImageInputs(newImages);
      set('images', newImages);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = { ...data, images: imageInputs };
    const url = isEdit ? `/api/admin/projekte/${id}` : '/api/admin/projekte';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (res.ok) router.push('/admin/projekte');
    else alert('Fehler beim Speichern');
  }

  const inp = (style?: object) => ({
    width: '100%', border: '1px solid #ddd', padding: '9px 12px',
    fontSize: 14, borderRadius: 3, boxSizing: 'border-box' as const, ...style
  });
  const label = (style?: object) => ({ fontSize: 13, fontWeight: 600, color: '#555', display: 'block', marginBottom: 4, ...style });
  const section = { background: '#fff', borderRadius: 4, padding: 28, marginBottom: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' };
  const grid2 = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 };

  return (
    <form onSubmit={handleSave} style={{ maxWidth: 860, margin: '0 auto' }}>

      {/* Basisdaten */}
      <div style={section}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginTop: 0, marginBottom: 20 }}>Basisdaten</h2>
        <div style={grid2}>
          <div>
            <label style={label()}>Titel (Deutsch) *</label>
            <input style={inp()} required value={data.title.de} onChange={e => setNested('title','de',e.target.value)} />
          </div>
          <div>
            <label style={label()}>Titel (English)</label>
            <input style={inp()} value={data.title.en} onChange={e => setNested('title','en',e.target.value)} />
          </div>
        </div>
        <div style={{ ...grid2, marginTop: 16 }}>
          <div>
            <label style={label()}>Slug (URL-Name) *</label>
            <input style={inp()} required value={data.slug}
              onChange={e => set('slug', e.target.value.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,''))}
              placeholder="mein-projekt" />
          </div>
          <div>
            <label style={label()}>Kategorie</label>
            <select style={inp()} value={data.category} onChange={e => set('category', e.target.value as Project['category'])}>
              <option value="residential">Wohnen</option>
              <option value="commercial">Gewerbe</option>
              <option value="urban">Stadtplanung</option>
              <option value="public">Öffentlich</option>
            </select>
          </div>
        </div>
        <div style={{ ...grid2, marginTop: 16 }}>
          <div>
            <label style={label()}>Ort</label>
            <input style={inp()} value={data.location} onChange={e => set('location', e.target.value)} placeholder="Zürich / CH" />
          </div>
          <div>
            <label style={label()}>Jahr</label>
            <input style={inp()} type="number" value={data.year} onChange={e => set('year', parseInt(e.target.value))} />
          </div>
        </div>
        <div style={{ ...grid2, marginTop: 16 }}>
          <div>
            <label style={label()}>Auftraggeber (DE)</label>
            <input style={inp()} value={data.client?.de ?? ''} onChange={e => setNested('client','de',e.target.value)} />
          </div>
          <div>
            <label style={label()}>Auftraggeber (EN)</label>
            <input style={inp()} value={data.client?.en ?? ''} onChange={e => setNested('client','en',e.target.value)} />
          </div>
        </div>
        <div style={{ ...grid2, marginTop: 16 }}>
          <div>
            <label style={label()}>Fläche</label>
            <input style={inp()} value={data.area ?? ''} onChange={e => set('area', e.target.value)} placeholder="1 200 m²" />
          </div>
          <div>
            <label style={label()}>Status (DE)</label>
            <select style={inp()} value={data.status.de}
              onChange={e => set('status', { de: e.target.value, en: e.target.value === 'Realisiert' ? 'Completed' : e.target.value === 'In Bau' ? 'Under Construction' : 'In Planning' })}>
              <option>Realisiert</option>
              <option>In Bau</option>
              <option>In Planung</option>
            </select>
          </div>
        </div>
        <div style={{ marginTop: 16 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 14 }}>
            <input type="checkbox" checked={data.featured} onChange={e => set('featured', e.target.checked)} style={{ width: 16, height: 16 }} />
            <span style={{ fontWeight: 600 }}>Auf Startseite anzeigen (Featured)</span>
          </label>
        </div>
      </div>

      {/* Beschreibungen */}
      <div style={section}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginTop: 0, marginBottom: 20 }}>Beschreibung</h2>
        <div style={{ marginBottom: 16 }}>
          <label style={label()}>Kurzbeschreibung (Deutsch)</label>
          <textarea style={{ ...inp(), height: 80, resize: 'vertical' }} value={data.description.de}
            onChange={e => setNested('description','de',e.target.value)} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={label()}>Kurzbeschreibung (English)</label>
          <textarea style={{ ...inp(), height: 80, resize: 'vertical' }} value={data.description.en}
            onChange={e => setNested('description','en',e.target.value)} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={label()}>Langer Text (Deutsch)</label>
          <textarea style={{ ...inp(), height: 100, resize: 'vertical' }} value={data.longDescription?.de ?? ''}
            onChange={e => setNested('longDescription','de',e.target.value)} />
        </div>
        <div>
          <label style={label()}>Langer Text (English)</label>
          <textarea style={{ ...inp(), height: 100, resize: 'vertical' }} value={data.longDescription?.en ?? ''}
            onChange={e => setNested('longDescription','en',e.target.value)} />
        </div>
      </div>

      {/* Bilder */}
      <div style={section}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginTop: 0, marginBottom: 20 }}>Bilder</h2>
        <div style={{ marginBottom: 20 }}>
          <label style={label()}>Titelbild *</label>
          <input type="file" accept="image/*"
            onChange={e => e.target.files?.[0] && uploadFile(e.target.files[0], 'cover')}
            style={{ fontSize: 14, marginBottom: 8, display: 'block' }}
          />
          {data.coverImage && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.coverImage} alt="Cover" style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 3 }} />
              <span style={{ fontSize: 12, color: '#888' }}>{data.coverImage}</span>
            </div>
          )}
        </div>
        <div>
          <label style={label()}>Weitere Bilder</label>
          <input type="file" accept="image/*" multiple
            onChange={e => {
              if (!e.target.files) return;
              Array.from(e.target.files).forEach(f => uploadFile(f, 'gallery'));
            }}
            style={{ fontSize: 14, marginBottom: 12, display: 'block' }}
          />
          {uploading && <p style={{ fontSize: 13, color: '#b85535' }}>Lade hoch...</p>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {imageInputs.map((url, i) => (
              <div key={i} style={{ position: 'relative' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt={`Bild ${i+1}`} style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 3 }} />
                <button type="button" onClick={() => {
                  const n = imageInputs.filter((_, j) => j !== i);
                  setImageInputs(n); set('images', n);
                }} style={{ position: 'absolute', top: 4, right: 4, background: '#b85535', color: '#fff', border: 'none', borderRadius: '50%', width: 20, height: 20, cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', paddingBottom: 40 }}>
        <button type="button" onClick={() => router.push('/admin/projekte')}
          style={{ padding: '11px 24px', border: '1px solid #ddd', background: '#fff', borderRadius: 3, cursor: 'pointer', fontSize: 14 }}>
          Abbrechen
        </button>
        <button type="submit" disabled={saving || uploading}
          style={{ padding: '11px 28px', background: '#b85535', color: '#fff', border: 'none', borderRadius: 3, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
          {saving ? 'Speichern...' : isEdit ? 'Änderungen speichern' : 'Projekt erstellen'}
        </button>
      </div>
    </form>
  );
}
