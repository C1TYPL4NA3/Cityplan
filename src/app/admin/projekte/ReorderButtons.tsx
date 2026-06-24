'use client';
import { useRouter } from 'next/navigation';

export default function ReorderButtons({ id, isFirst, isLast }: { id: string; isFirst: boolean; isLast: boolean }) {
  const router = useRouter();

  async function move(direction: 'up' | 'down') {
    await fetch(`/api/admin/projekte/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ direction }),
    });
    router.refresh();
  }

  const btn: React.CSSProperties = { background: 'none', border: '1px solid #ddd', width: 26, height: 26, cursor: 'pointer', fontSize: 13, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' };

  return (
    <div style={{ display: 'flex', gap: 4 }}>
      <button onClick={() => move('up')} disabled={isFirst} style={{ ...btn, opacity: isFirst ? 0.3 : 1 }} title="Nach oben">↑</button>
      <button onClick={() => move('down')} disabled={isLast} style={{ ...btn, opacity: isLast ? 0.3 : 1 }} title="Nach unten">↓</button>
    </div>
  );
}
