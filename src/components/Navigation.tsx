'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const otherLocale = locale === 'de' ? 'en' : 'de';

  // Build alternate locale path
  const alternatePath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  const isTransparent = !scrolled && !menuOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isTransparent
            ? 'bg-transparent'
            : 'bg-white border-b border-stone-200'
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 h-16 md:h-20">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className={`text-lg font-semibold tracking-widest uppercase transition-colors duration-300 ${
              isTransparent ? 'text-white' : 'text-stone-900'
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Cityplan AG
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-widest uppercase transition-colors duration-200 hover:opacity-60 ${
                  isTransparent ? 'text-white' : 'text-stone-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={alternatePath}
              className={`text-sm tracking-widest uppercase transition-colors duration-200 hover:opacity-60 border-b ${
                isTransparent
                  ? 'text-white border-white/40'
                  : 'text-stone-800 border-stone-400'
              }`}
            >
              {otherLocale.toUpperCase()}
            </Link>
          </nav>

          {/* Mobile: lang + burger */}
          <div className="flex md:hidden items-center gap-4">
            <Link
              href={alternatePath}
              className={`text-xs tracking-widest uppercase ${
                isTransparent ? 'text-white' : 'text-stone-800'
              }`}
            >
              {otherLocale.toUpperCase()}
            </Link>
            <button
              aria-label={t('toggleMenu')}
              onClick={() => setMenuOpen(v => !v)}
              className={`flex flex-col gap-1.5 w-6 ${
                isTransparent ? 'text-white' : 'text-stone-900'
              }`}
            >
              <span
                className={`block h-px w-full bg-current transition-transform origin-center duration-300 ${
                  menuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block h-px w-full bg-current transition-opacity duration-300 ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-px w-full bg-current transition-transform origin-center duration-300 ${
                  menuOpen ? '-rotate-45 -translate-y-2.5' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-stone-900 flex flex-col transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="h-16" />
        <nav className="flex flex-col items-center justify-center flex-1 gap-10 pb-20">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-white text-2xl tracking-widest uppercase hover:opacity-60 transition-opacity"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
