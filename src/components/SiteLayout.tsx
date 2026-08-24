'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!sidebarOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSidebarOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [sidebarOpen]);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 13px; color: #1a1a1a; background: #fff; }
        a { color: inherit; text-decoration: none; }
        .nav-link { display: block; padding: 8px 0; border-bottom: 1px solid #e0e0e0; font-size: 13px; line-height: 1.4; color: #1a1a1a; }
        .nav-link:hover { color: #767676; }
        .hamburger-btn { background: none; border: none; padding: 0; margin: 0; cursor: pointer; display: flex; flex-direction: column; gap: 5px; }
        .hamburger-line { display: block; width: 22px; height: 2px; background: #1a1a1a; }
      `}</style>

      <div className="site-shell">

        {/* Header: hamburger + instagram left, logo right — no box, no border, no shadow */}
        <header style={{
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          padding: 'var(--page-gutter) var(--page-gutter) var(--header-bottom-space)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
            <button
              className="hamburger-btn"
              onClick={() => setSidebarOpen(v => !v)}
              aria-label={sidebarOpen ? 'Menü schliessen' : 'Menü öffnen'}
              aria-expanded={sidebarOpen}
              aria-controls="site-nav"
            >
              <span className="hamburger-line" />
              <span className="hamburger-line" />
              <span className="hamburger-line" />
            </button>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="#1a1a1a" stroke="none"/>
              </svg>
            </a>
          </div>

          <Link href="/">
            <Image src="/images/logo.png" alt="Cityplan AG" width={160} height={44} priority style={{ height: 26, width: 'auto' }} />
          </Link>
        </header>

        {/* Body: nav becomes a real layout column when open, no overlay */}
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <nav
            id="site-nav"
            style={{
              width: sidebarOpen ? 'var(--nav-width)' : 0,
              minWidth: sidebarOpen ? 'var(--nav-width)' : 0,
              overflow: 'hidden',
              flexShrink: 0,
              transition: 'width 0.25s ease, min-width 0.25s ease',
            }}
          >
            <div style={{ width: 'var(--nav-width)', paddingLeft: 'var(--page-gutter)', paddingRight: 24 }}>
              {NAV.map(group => (
                <div key={group.group} style={{ marginBottom: 28 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>
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
            </div>
          </nav>

          <main style={{ flex: '1 1 0%', minWidth: 0 }}>
            {children}
          </main>
        </div>

        {/* Footer */}
        <footer style={{ background: '#111', color: '#999', padding: '48px var(--page-gutter)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, fontSize: 13, marginTop: 64 }}>
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

      </div>
    </>
  );
}
