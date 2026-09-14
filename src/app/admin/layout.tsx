export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', background: '#f5f5f5', fontSize: 14, minHeight: '100vh' }}>
      {children}
    </div>
  );
}
