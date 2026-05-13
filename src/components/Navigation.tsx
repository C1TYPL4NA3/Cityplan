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
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navLinks = [
    { href: `/${locale}/projekte`, label: t('projects') },
    { href: `/${locale}/ueber-uns`, label: t('about') },
    { href: `/${locale}/kontakt`, label: t('contact') },
  ];

  return (
    <>
      {/* ── Fixed header bar ─────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 md:h-20">

        {/* Logo */}
        <Link
          href={`/${locale}`}
          onClick={() => setMenuOpen(false)}
          className="flex items-center shrink-0"
        >
          <div className={`transition-all duration-300 ${menuOpen ? 'brightness-0 invert' : ''}`}>
            <Image
              src="/images/logo.svg"
              alt="Cityplan AG"
              width={180}
              height={50}
              priority
              className="h-10 w-auto md:h-12"
            />
          </div>
        </Link>

        {/* Hamburger button — always visible */}
        <button
          aria-label={t('toggleMenu')}
          onClick={() => setMenuOpen(v => !v)}
          className="relative z-[60] w-12 h-12 flex items-center justify-center bg-[#cc1122] hover:bg-[#a80e1b] transition-colors duration-200"
        >
          <div className="w-5 flex flex-col gap-[5px]">
            <span className={`block h-px bg-white transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`block h-px bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-px bg-white transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </div>
        </button>
      </header>

      {/* ── Menu overlay ─────────────────────────────────── */}
      {/* Dark backdrop */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Side panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-full md:w-[480px] bg-[#cc1122] flex flex-col transition-transform duration-500 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Panel header — close button area */}
        <div className="h-16 md:h-20 flex items-center justify-end px-6 md:px-12 shrink-0">
          {/* Close button placeholder — the header button is on top */}
        </div>

        {/* Nav links */}
        <nav className="flex flex-col justify-center flex-1 px-12 md:px-16 gap-2 pb-16">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-white text-4xl md:text-5xl font-light tracking-tight hover:opacity-60 transition-opacity duration-200 py-3 border-b border-white/20"
              style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Language + bottom links */}
        <div className="px-12 md:px-16 pb-12 shrink-0 flex items-center justify-between">
          <Link
            href={alternatePath}
            onClick={() => setMenuOpen(false)}
            className="text-white/60 text-sm tracking-widest uppercase hover:text-white transition-colors border-b border-white/30 pb-0.5"
          >
            {otherLocale.toUpperCase()}
          </Link>
          <div className="flex gap-6 text-white/40 text-xs tracking-widest uppercase">
            <a href="mailto:info@cityplan.ch" className="hover:text-white transition-colors">
              info@cityplan.ch
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
