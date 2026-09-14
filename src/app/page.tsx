import SiteLayout from '@/components/SiteLayout';
import CtaBanner from '@/components/CtaBanner';
import PlaceholderImage from '@/components/PlaceholderImage';

const STATS = [
  { value: '25+', label: 'Jahre Erfahrung in Planung und Realisation' },
  { value: 'Zürich', label: 'Verankert im Herzen der Stadt' },
  { value: '360°', label: 'Von der Machbarkeit bis zur Übergabe' },
  { value: 'Fokus', label: 'Umbau, Sanierung und Bestandsbauten' },
];

const PROCESS = [
  {
    step: '01 · Planung',
    title: 'Analyse & Entwicklung',
    text: 'Machbarkeit, Projektentwicklung, Detailplanung, Studien und Sanierungskonzepte.',
  },
  {
    step: '02 · Ausschreibung',
    title: 'Kosten & Submission',
    text: 'Kostengrundlagen, Ausschreibungen, Unternehmer-Submission und Vergabe.',
  },
  {
    step: '03 · Realisation',
    title: 'Bauausführung & Management',
    text: 'Bauleitung, Koordination, Qualität, Termine, Abnahmen und Projektabschluss.',
  },
];

export default function HomePage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="max-w-[1200px] mx-auto px-5 sm:px-8 pt-14 pb-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-[12px] font-bold tracking-[0.1em] mb-4" style={{ color: 'var(--accent)' }}>
              CITYPLAN AG ZÜRICH
            </div>
            <h1 className="text-[40px] sm:text-[52px] leading-[1.05] font-extrabold mb-6">
              Architektur.
              <br />
              Umbau.
              <br />
              Realisation.
            </h1>
            <p className="text-[15px] leading-7 text-[var(--muted)] max-w-[440px]">
              Seit über 25 Jahren begleiten wir Bauvorhaben in Zürich und Umgebung – von der ersten
              Analyse und Planung bis zur erfolgreichen Realisation und Übergabe.
            </p>
          </div>
          <PlaceholderImage className="aspect-[4/3] w-full" tone="warm" />
        </div>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 border-t border-[var(--line)]">
          {STATS.map(s => (
            <div key={s.label} className="py-6 px-4 border-b md:border-b-0 md:border-r last:border-r-0 border-[var(--line)]">
              <div className="text-[22px] font-extrabold mb-1" style={{ color: 'var(--accent)' }}>
                {s.value}
              </div>
              <div className="text-[12px] leading-5 text-[var(--muted)]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Erfahrung / process */}
      <section className="max-w-[1200px] mx-auto px-5 sm:px-8 py-16">
        <div className="border-l-4 pl-5 mb-4" style={{ borderColor: 'var(--accent)' }}>
          <h2 className="text-[24px] sm:text-[28px] font-bold">Erfahrung im Bestand. Präzision in der Umsetzung.</h2>
        </div>
        <p className="text-[14px] leading-7 text-[var(--muted)] max-w-[680px] mb-12">
          Wir verbinden Architektur, Planung und Baumanagement zu einem durchgängigen Prozess. Im
          Mittelpunkt stehen klare Abläufe, sorgfältige Details und eine zuverlässige Realisation.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {PROCESS.map(p => (
            <div key={p.step} className="pt-4 border-t-2" style={{ borderColor: 'var(--accent)' }}>
              <div className="text-[11px] font-bold tracking-[0.08em] uppercase text-[var(--muted)] mb-3">
                {p.step}
              </div>
              <h3 className="text-[17px] font-bold mb-2">{p.title}</h3>
              <p className="text-[13px] leading-6 text-[var(--muted)]">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Umbau und Sanierung */}
      <section style={{ background: 'var(--bg-soft)' }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-16 grid md:grid-cols-2 gap-10 items-center">
          <PlaceholderImage className="aspect-[4/3] w-full order-2 md:order-1" tone="green" />
          <div className="order-1 md:order-2">
            <h2 className="text-[26px] sm:text-[30px] font-bold mb-5">Umbau und Sanierung mit Erfahrung.</h2>
            <p className="text-[14px] leading-7 text-[var(--muted)] mb-4">
              Bestehende Gebäude bringen ihre eigene Geschichte, Konstruktion und technische
              Ausgangslage mit. Wir entwickeln Lösungen, die vorhandene Qualitäten respektieren und
              neue Anforderungen präzise integrieren.
            </p>
            <p className="text-[14px] leading-7 text-[var(--muted)]">
              Dabei arbeiten wir eng mit Bauherrschaften, Fachplanern, Spezialisten und ausführenden
              Unternehmen zusammen.
            </p>
          </div>
        </div>
      </section>

      <CtaBanner
        heading="Sie planen ein Bauvorhaben?"
        text="Gerne besprechen wir die Ausgangslage und die nächsten Schritte für Ihr Projekt."
      />
    </SiteLayout>
  );
}
