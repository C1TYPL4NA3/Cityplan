import SiteLayout from '@/components/SiteLayout';
import CtaBanner from '@/components/CtaBanner';
import PlaceholderImage from '@/components/PlaceholderImage';

export const metadata = { title: 'Profil — Cityplan AG Zürich' };

const LEISTUNGEN = [
  { title: 'Planung', text: 'Machbarkeit, Vorprojekt, Bauprojekt und Baueingabe.' },
  { title: 'Ausschreibung', text: 'Kostengrundlagen, Unternehmer-Submission und Vergabe.' },
  { title: 'Baumanagement', text: 'Bauleitung, Kosten- und Terminkontrolle, Qualitätssicherung.' },
  { title: 'Bauherrenvertretung', text: 'Vertretung der Interessen der Bauherrschaft über alle Phasen.' },
  { title: 'Umbau & Sanierung', text: 'Bestandsanalyse, Sanierungskonzepte, Umsetzung im bewohnten Zustand.' },
  { title: 'Generalunternehmung', text: 'Schlüsselfertige Realisation aus einer Hand, termingerecht und kostensicher.' },
];

export default function ProfilPage() {
  return (
    <SiteLayout>
      <section className="max-w-[1200px] mx-auto px-5 sm:px-8 pt-14 pb-12">
        <div className="text-[12px] font-bold tracking-[0.1em] mb-3" style={{ color: 'var(--accent)' }}>
          PROFIL
        </div>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-[32px] sm:text-[40px] font-extrabold leading-tight mb-6">
              Architektur und Generalunternehmung aus einer Hand.
            </h1>
            <p className="text-[14px] leading-7 text-[var(--muted)] mb-4">
              Die cityplan AG wurde in Zürich gegründet. Als inhabergeführtes Architekturbüro und
              Generalunternehmung begleiten wir unsere Bauherrschaften von der ersten Idee bis zur
              schlüsselfertigen Übergabe.
            </p>
            <p className="text-[14px] leading-7 text-[var(--muted)]">
              Unsere Projekte haben einen starken Bezug zum Ort und seinem Umfeld. Der sorgfältige
              Umgang mit dem Bestand, der richtige Einsatz von Materialien und eine schlanke
              Organisationsstruktur bestimmen unsere Arbeit.
            </p>
          </div>
          <PlaceholderImage className="aspect-[4/3] w-full" tone="cool" />
        </div>
      </section>

      <section style={{ background: 'var(--bg-soft)' }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-16">
          <div className="border-l-4 pl-5 mb-10" style={{ borderColor: 'var(--accent)' }}>
            <h2 className="text-[22px] sm:text-[26px] font-bold">Leistungen.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {LEISTUNGEN.map(l => (
              <div key={l.title} className="pt-4 border-t-2" style={{ borderColor: 'var(--accent)' }}>
                <h3 className="text-[15px] font-bold mb-2">{l.title}</h3>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{l.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-5 sm:px-8 py-16">
        <div className="border-l-4 pl-5 mb-4" style={{ borderColor: 'var(--accent)' }}>
          <h2 className="text-[22px] sm:text-[26px] font-bold">Organisation.</h2>
        </div>
        <p className="text-[14px] leading-7 text-[var(--muted)] max-w-[680px]">
          Die cityplan AG ist inhabergeführt. Die schlanke Organisationsstruktur garantiert eine
          verlässliche Partnerschaft und direkte Kommunikation mit der Bauherrschaft – über alle
          Projektphasen hinweg.
        </p>
      </section>

      <CtaBanner
        heading="Sie planen ein Bauvorhaben?"
        text="Gerne besprechen wir die Ausgangslage und die nächsten Schritte für Ihr Projekt."
      />
    </SiteLayout>
  );
}
