'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const NAV = [
  {
    group: 'projekte',
    links: [
      { href: '/projekte', label: 'übersicht' },
      { href: '/projekte?kat=wohnen', label: 'wohnen' },
      { href: '/projekte?kat=gewerbe', label: 'gewerbe' },
      { href: '/projekte?kat=oeffentlich', label: 'öffentlich' },
      { href: '/projekte?kat=wettbewerbe', label: 'wettbewerbe' },
    ],
  },
  {
    group: 'büro',
    links: [
      { href: '/buero', label: 'portrait' },
      { href: '/kontakt', label: 'kontakt' },
    ],
  },
];

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 13px; color: #1a1a1a; background: #fff; }
        a { color: inherit; text-decoration: none; }
        .nav-link { display: block; padding: 5px 0; border-bottom: 1px solid #ccc; font-size: 13px; line-height: 1.4; }
        .nav-link:hover { text-decoration: none; opacity: 0.6; }
      `}</style>

      {/* Top bar */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        height: 48, background: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 18px',
        borderBottom: '1px solid #e0e0e0',
      }}>
        {/* Left: hamburger + instagram */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button
            onClick={() => setSidebarOpen(v => !v)}
            aria-label="Menü"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, lineHeight: 1, display: 'flex', flexDirection: 'column', gap: 4 }}
          >
            <span style={{ display: 'block', width: 20, height: 2, background: '#1a1a1a' }} />
            <span style={{ display: 'block', width: 20, height: 2, background: '#1a1a1a' }} />
            <span style={{ display: 'block', width: 20, height: 2, background: '#1a1a1a' }} />
          </button>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" fill="#1a1a1a" stroke="none"/>
            </svg>
          </a>
        </div>

        {/* Right: logo */}
        <Link href="/">
          <Image src="/images/logo.png" alt="Cityplan AG" width={160} height={44} priority style={{ height: 28, width: 'auto' }} />
        </Link>
      </header>

      {/* Page body */}
      <div style={{ display: 'flex', marginTop: 48, minHeight: 'calc(100vh - 48px)' }}>

        {/* Sidebar */}
        <aside style={{
          width: sidebarOpen ? 185 : 0,
          minWidth: sidebarOpen ? 185 : 0,
          overflow: 'hidden',
          transition: 'width 0.2s ease, min-width 0.2s ease',
          flexShrink: 0,
          background: '#fff',
          position: 'sticky',
          top: 48,
          height: 'calc(100vh - 48px)',
          overflowY: 'auto',
          borderRight: '1px solid #e0e0e0',
        }}>
          <nav style={{ padding: '20px 16px 20px 20px' }}>
            {NAV.map(group => (
              <div key={group.group} style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>
                  {group.group}
                </div>
                {group.links.map(link => {
                  const base = link.href.split('?')[0];
                  const active = pathname === base && !link.href.includes('?')
                    || link.href.includes('?') && pathname + (typeof window !== 'undefined' ? window.location.search : '') === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="nav-link"
                      style={{ fontWeight: active ? 700 : 400 }}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, minWidth: 0 }}>
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer style={{ background: '#111', color: '#999', padding: '36px 40px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, fontSize: 13 }}>
        <address style={{ fontStyle: 'normal', lineHeight: 1.9 }}>
          Cityplan AG<br />
          Musterstrasse 12<br />
          8001 Zürich<br />
          T +41 44 000 00 00<br />
          <a href="mailto:info@cityplanag.ch" style={{ color: '#999' }}>info@cityplanag.ch</a>
        </address>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, lineHeight: 1.9 }}>
          <Link href="/projekte" style={{ color: '#999' }}>Portfolio</Link>
          <Link href="/buero" style={{ color: '#999' }}>Büro</Link>
          <Link href="/kontakt" style={{ color: '#999' }}>Kontakt</Link>
        </nav>
      </footer>
    </>
  );
}
