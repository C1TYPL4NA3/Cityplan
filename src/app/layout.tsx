import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cityplan AG',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body style={{ margin: 0, fontFamily: 'sans-serif', background: '#fff' }}>
        {children}
      </body>
    </html>
  );
}
