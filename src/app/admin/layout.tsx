import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Admin — Cityplan AG' };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body style={{ margin: 0, fontFamily: 'DM Sans, system-ui, sans-serif', background: '#f5f5f5' }}>
        {children}
      </body>
    </html>
  );
}
