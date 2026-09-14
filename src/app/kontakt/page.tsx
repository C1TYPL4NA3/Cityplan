import SiteLayout from '@/components/SiteLayout';
import PlaceholderImage from '@/components/PlaceholderImage';

export const metadata = { title: 'Kontakt — Cityplan AG Zürich' };

export default function KontaktPage() {
  return (
    <SiteLayout>
      <section className="max-w-[1200px] mx-auto px-5 sm:px-8 pt-14 pb-16">
        <div className="text-[12px] font-bold tracking-[0.1em] mb-3" style={{ color: 'var(--accent)' }}>
          KONTAKT
        </div>
        <h1 className="text-[32px] sm:text-[40px] font-extrabold mb-10">Sprechen wir über Ihr Projekt.</h1>

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <address className="not-italic text-[15px] leading-8 mb-8">
              <strong className="block text-[16px] mb-1">cityplan AG Zürich</strong>
              Architektur &amp; Generalunternehmung
              <br />
              Musterstrasse 12
              <br />
              8001 Zürich
            </address>

            <div className="flex flex-col gap-1 text-[15px]">
              <a href="tel:+41440000000" className="hover:text-[var(--accent)] transition-colors">
                T +41 44 000 00 00
              </a>
              <a
                href="mailto:info@cityplanag.ch"
                className="font-semibold hover:text-[var(--accent)] transition-colors"
                style={{ color: 'var(--accent)' }}
              >
                info@cityplanag.ch
              </a>
            </div>

            <a
              href="mailto:info@cityplanag.ch"
              className="inline-block mt-10 text-[13px] font-semibold text-white px-6 py-3"
              style={{ background: 'var(--accent)' }}
            >
              Projekt besprechen
            </a>
          </div>

          <PlaceholderImage className="aspect-[4/3] w-full" tone="cool" />
        </div>
      </section>
    </SiteLayout>
  );
}
