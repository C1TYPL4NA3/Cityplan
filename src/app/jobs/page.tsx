import SiteLayout from '@/components/SiteLayout';

export const metadata = { title: 'Jobs — Cityplan AG Zürich' };

export default function JobsPage() {
  return (
    <SiteLayout>
      <section className="max-w-[1200px] mx-auto px-5 sm:px-8 pt-14 pb-20">
        <div className="text-[12px] font-bold tracking-[0.1em] mb-3" style={{ color: 'var(--accent)' }}>
          JOBS
        </div>
        <h1 className="text-[32px] sm:text-[40px] font-extrabold mb-6">Werden Sie Teil unseres Teams.</h1>
        <p className="text-[14px] leading-7 text-[var(--muted)] max-w-[620px] mb-10">
          Wir sind ein kleines, inhabergeführtes Team mit direkten Wegen und klarer Verantwortung.
          Aktuell haben wir keine offenen Stellen ausgeschrieben – Initiativbewerbungen sind jederzeit
          willkommen.
        </p>

        <div className="border-t border-[var(--line)] pt-8">
          <h2 className="text-[15px] font-bold mb-2">Initiativbewerbung</h2>
          <p className="text-[13px] leading-6 text-[var(--muted)] max-w-[560px] mb-6">
            Senden Sie uns Ihre Unterlagen mit einem kurzen Motivationsschreiben, Lebenslauf und
            relevanten Arbeitsproben.
          </p>
          <a
            href="mailto:info@cityplanag.ch?subject=Initiativbewerbung"
            className="inline-block text-[13px] font-semibold text-white px-6 py-3"
            style={{ background: 'var(--accent)' }}
          >
            Bewerbung senden
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
