import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
