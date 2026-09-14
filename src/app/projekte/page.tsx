import Link from 'next/link';
import { getAllProjects, CATEGORIES } from '@/lib/projects';
import SiteLayout from '@/components/SiteLayout';
import ProjectGrid from '@/components/ProjectGrid';

export const metadata = { title: 'Projekte — Cityplan AG Zürich' };

export default function ProjektePage({
  searchParams,
}: {
  searchParams: Promise<{ kat?: string }>;
}) {
  return <ProjectePageInner searchParamsPromise={searchParams} />;
}

async function ProjectePageInner({ searchParamsPromise }: { searchParamsPromise: Promise<{ kat?: string }> }) {
  const { kat } = await searchParamsPromise;
  const all = getAllProjects();
  const projects = kat ? all.filter(p => p.category === kat) : all;

  const firstHalf = projects.slice(0, 3);
  const secondHalf = projects.slice(3);

  return (
    <SiteLayout>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 pt-12 pb-8">
        <div className="text-[12px] font-bold tracking-[0.1em] mb-3" style={{ color: 'var(--accent)' }}>
          AUSZUG ARBEITEN
        </div>
        <h1 className="text-[38px] sm:text-[48px] font-extrabold mb-5">Projekte.</h1>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] pb-6 border-b border-[var(--line)]">
          <Link
            href="/projekte"
            className="font-semibold"
            style={{ color: !kat ? 'var(--accent)' : 'var(--muted)' }}
          >
            Alle
          </Link>
          {CATEGORIES.map(c => (
            <span key={c.value} className="flex items-center gap-2">
              <span className="text-[var(--line)]">/</span>
              <Link
                href={`/projekte?kat=${c.value}`}
                className="font-semibold"
                style={{ color: kat === c.value ? 'var(--accent)' : 'var(--muted)' }}
              >
                {c.label}
              </Link>
            </span>
          ))}
        </div>
      </div>

      <ProjectGrid projects={firstHalf} />

      {secondHalf.length > 0 && (
        <>
          <section style={{ background: 'var(--green)' }}>
            <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-12 grid md:grid-cols-2 gap-8 items-center text-white">
              <div>
                <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-white/70 mb-2">
                  Cityplan Projekte
                </div>
                <h2 className="text-[22px] sm:text-[26px] font-bold leading-tight">
                  Bestand weiterdenken. Neues präzise entwickeln.
                </h2>
              </div>
              <p className="text-[13px] leading-7 text-white/75">
                Jedes Projekt beginnt mit einer eigenen Ausgangslage. Wir entwickeln daraus Lösungen,
                die Architektur, Nutzung und technische Anforderungen zu einem stimmigen Ganzen
                verbinden – im Neubau ebenso wie im Umbau und in der Sanierung.
              </p>
            </div>
          </section>

          <ProjectGrid projects={secondHalf} />
        </>
      )}
    </SiteLayout>
  );
}
