import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cityplan AG',
  description: 'Schweizer Architekturbüro für nachhaltige Architektur und Stadtplanung.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
