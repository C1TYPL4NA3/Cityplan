'use client';
import { useRouter } from 'next/navigation';

export default function DeleteButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  async function handleDelete() {
    if (!confirm(`Projekt "${title}" wirklich löschen?`)) return;
    await fetch(`/api/admin/projekte/${id}`, { method: 'DELETE' });
    router.refresh();
  }
  return (
    <button onClick={handleDelete} style={{ fontSize: 13, color: '#c00', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
      Löschen
    </button>
  );
}
