'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const otherLocale = locale === 'de' ? 'en' : 'de';
  const alternatePath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navLinks = [
    { href: `/${locale}/projekte`, label: t('projects') },
    { href: `/${locale}/ueber-uns`, label: t('about') },
    { href: `/${locale}/kontakt`, label: t('contact') },
  ];

  return (
    <>
      {/* Header bar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 h-16 md:h-18">
        <Link href={`/${locale}`} onClick={() => setMenuOpen(false)} className="flex items-center shrink-0">
          <Image
            src="/images/logo.png"
            alt="Cityplan AG"
            width={220}
            height={60}
            priority
            className="h-10 md:h-12 w-auto"
          />
        </Link>

        {/* Hamburger / Close button */}
        <button
          aria-label={menuOpen ? 'Schliessen' : t('toggleMenu')}
          onClick={() => setMenuOpen(v => !v)}
          className="relative z-[60] w-12 h-12 flex items-center justify-center"
          style={{ background: 'var(--terra)' }}
        >
          {menuOpen ? (
            /* × close icon */
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <line x1="1" y1="1" x2="17" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <line x1="17" y1="1" x2="1" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            /* ≡ hamburger icon */
            <div className="flex flex-col gap-[5px]">
              <span className="block w-5 h-0.5 bg-white" />
              <span className="block w-5 h-0.5 bg-white" />
              <span className="block w-5 h-0.5 bg-white" />
            </div>
          )}
        </button>
      </header>

      {/* Backdrop */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Side panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-full md:w-[44vw] max-w-[560px] flex flex-col transition-transform duration-500 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ background: 'var(--terra)' }}
      >
        {/* Language row */}
        <div className="h-16 md:h-18 flex items-center justify-end px-6 md:px-10 gap-6 shrink-0">
          <Link
            href={alternatePath}
            onClick={() => setMenuOpen(false)}
            className="text-white/70 text-sm font-medium hover:text-white transition-colors"
          >
            {otherLocale === 'de' ? 'Deutsch' : 'English'}
          </Link>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col justify-center flex-1 px-10 md:px-14 gap-0 pb-10">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-white text-5xl md:text-6xl font-bold tracking-tight py-4 border-b border-white/20 hover:opacity-60 transition-opacity leading-tight"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-10 md:px-14 pb-10 shrink-0 text-white/50 text-sm">
          <a href="mailto:info@cityplan.ch" className="hover:text-white transition-colors">
            info@cityplan.ch
          </a>
        </div>
      </div>
    </>
  );
}
