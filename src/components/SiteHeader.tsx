'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

const LINKS = [
  { href: '/profil', label: 'Profil' },
  { href: '/projekte', label: 'Projekte' },
  { href: '/jobs', label: 'Jobs' },
  { href: '/kontakt', label: 'Kontakt' },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[var(--line)]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between">
        <Link href="/" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map(link => {
            const active = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium tracking-wide pb-1 border-b-2 transition-colors"
                style={{
                  borderColor: active ? 'var(--accent)' : 'transparent',
                  color: active ? 'var(--ink)' : '#4a4642',
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          aria-label="Menü"
          onClick={() => setOpen(v => !v)}
          className="md:hidden flex flex-col gap-[5px] p-2"
        >
          <span className="block w-5 h-[1.5px] bg-current" />
          <span className="block w-5 h-[1.5px] bg-current" />
          <span className="block w-5 h-[1.5px] bg-current" />
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-[var(--line)] px-5 py-3 flex flex-col">
          {LINKS.map(link => {
            const active = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-[14px] py-2.5 border-b border-[var(--line)] last:border-0"
                style={{ fontWeight: active ? 700 : 400, color: active ? 'var(--accent)' : 'inherit' }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
