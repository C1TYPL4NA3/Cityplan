import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const tn = useTranslations('nav');
  const locale = useLocale();

  return (
    <footer className="bg-[#1a1a1a] text-stone-400 py-16 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <Image
            src="/images/logo.svg"
            alt="Cityplan AG"
            width={150}
            height={42}
            className="h-10 w-auto mb-6 brightness-0 invert opacity-70"
          />
          <address className="not-italic text-sm leading-relaxed">
            Musterstrasse 12<br />
            8001 Zürich<br />
            Schweiz
          </address>
        </div>
        <nav className="flex flex-col gap-3">
          {[
            { href: `/${locale}/projekte`, label: tn('projects') },
            { href: `/${locale}/ueber-uns`, label: tn('about') },
            { href: `/${locale}/kontakt`, label: tn('contact') },
          ].map(link => (
            <Link key={link.href} href={link.href}
              className="text-sm uppercase tracking-widest hover:text-white transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="text-sm leading-loose">
          <a href="tel:+41441234567" className="hover:text-white transition-colors block">+41 44 123 45 67</a>
          <a href="mailto:info@cityplan.ch" className="hover:text-white transition-colors block">info@cityplan.ch</a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between gap-4 text-xs">
        <p>© {new Date().getFullYear()} Cityplan AG — {t('rights')}</p>
        <div className="flex gap-6">
          <Link href={`/${locale}/datenschutz`} className="hover:text-white transition-colors">{t('privacy')}</Link>
          <Link href={`/${locale}/impressum`} className="hover:text-white transition-colors">{t('imprint')}</Link>
        </div>
      </div>
    </footer>
  );
}
