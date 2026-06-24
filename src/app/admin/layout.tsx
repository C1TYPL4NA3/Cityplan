export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body style={{ margin: 0, fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', background: '#f5f5f5', fontSize: 14 }}>
        {children}
      </body>
    </html>
  );
}
