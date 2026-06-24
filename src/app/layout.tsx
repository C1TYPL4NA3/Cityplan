import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cityplan AG',
  description: 'Architektur und Generalunternehmung — Zürich',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
