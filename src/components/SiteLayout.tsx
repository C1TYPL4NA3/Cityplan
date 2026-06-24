'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
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

  useEffect(() => {
    setSidebarOpen(window.innerWidth >= 768);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 52, background: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px',
        borderBottom: '1px solid #e8e8e8',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            onClick={() => setSidebarOpen(v => !v)}
            aria-label="Menü"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, lineHeight: 1 }}
          >
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
              <rect y="0" width="22" height="2" fill="#1a1a1a"/>
              <rect y="7" width="22" height="2" fill="#1a1a1a"/>
              <rect y="14" width="22" height="2" fill="#1a1a1a"/>
            </svg>
          </button>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" fill="#1a1a1a" stroke="none"/>
            </svg>
          </a>
        </div>

        <Link href="/" style={{ lineHeight: 1 }}>
          <Image
            src="/images/logo.png"
            alt="Cityplan AG"
            width={180}
            height={50}
            priority
            style={{ height: 32, width: 'auto' }}
          />
        </Link>
      </header>

      {/* Body below header */}
      <div style={{ display: 'flex', flex: 1, marginTop: 52 }}>
        {/* Sidebar */}
        <aside style={{
          width: sidebarOpen ? 220 : 0,
          minWidth: sidebarOpen ? 220 : 0,
          overflow: 'hidden',
          transition: 'width 0.25s ease, min-width 0.25s ease',
          flexShrink: 0,
          padding: sidebarOpen ? '32px 0 32px 20px' : 0,
          borderRight: sidebarOpen ? '1px solid #e8e8e8' : 'none',
          background: '#fff',
          position: 'sticky',
          top: 52,
          height: 'calc(100vh - 52px)',
          overflowY: 'auto',
        }}>
          {NAV.map(group => (
            <div key={group.group} style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, color: '#1a1a1a' }}>
                {group.group}
              </div>
              {group.links.map(link => {
                const active = pathname === link.href || pathname === link.href.split('?')[0];
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      display: 'block',
                      fontSize: 13,
                      color: '#1a1a1a',
                      padding: '4px 0',
                      borderBottom: '1px solid #ddd',
                      fontWeight: active ? 700 : 400,
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, minWidth: 0 }}>
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer style={{ background: '#111', color: '#aaa', padding: '40px 40px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, fontSize: 13 }}>
        <address style={{ fontStyle: 'normal', lineHeight: 1.8 }}>
          Cityplan AG<br />
          Musterstrasse 12<br />
          8001 Zürich<br />
          T +41 44 000 00 00<br />
          <a href="mailto:info@cityplanag.ch" style={{ color: '#aaa' }}>info@cityplanag.ch</a>
        </address>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 6, lineHeight: 1.8 }}>
          <Link href="/projekte" style={{ color: '#aaa' }}>Portfolio</Link>
          <Link href="/buero" style={{ color: '#aaa' }}>Büro</Link>
          <Link href="/kontakt" style={{ color: '#aaa' }}>Kontakt</Link>
        </nav>
      </footer>
    </div>
  );
}
