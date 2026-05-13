import { useTranslations } from 'next-intl';
import ContactForm from '@/components/ContactForm';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Kontakt' };

export default function ContactPage() {
  const t = useTranslations('contact');

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <header className="mb-20">
          <h1 className="text-5xl md:text-6xl font-light text-stone-900 tracking-tight mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-stone-500">{t('subtitle')}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Form */}
          <div className="md:col-span-2">
            <ContactForm />
          </div>

          {/* Contact info */}
          <aside className="space-y-10">
            <div>
              <p className="text-xs tracking-widest uppercase text-stone-400 mb-3">
                {t('address')}
              </p>
              <address className="not-italic text-stone-700 leading-relaxed">
                Cityplan AG<br />
                Musterstrasse 12<br />
                8001 Zürich<br />
                Schweiz
              </address>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase text-stone-400 mb-3">
                {t('phone')}
              </p>
              <a href="tel:+41441234567" className="text-stone-700 hover:text-stone-900 transition-colors">
                +41 44 123 45 67
              </a>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase text-stone-400 mb-3">
                {t('email')}
              </p>
              <a href="mailto:info@cityplan.ch" className="text-stone-700 hover:text-stone-900 transition-colors">
                info@cityplan.ch
              </a>
            </div>

            {/* Map placeholder */}
            <div className="bg-stone-100 aspect-square w-full flex items-center justify-center text-stone-400 text-sm">
              <span className="text-xs tracking-widest uppercase">Karte</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
