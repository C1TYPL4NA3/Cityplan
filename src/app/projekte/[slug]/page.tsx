import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getAllProjects, getProjectBySlug, CATEGORIES } from '@/lib/projects';
import SiteLayout from '@/components/SiteLayout';
import PlaceholderImage from '@/components/PlaceholderImage';

export async function generateStaticParams() {
  return getAllProjects().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return { title: project ? `${project.title} — Cityplan AG Zürich` : 'Projekt' };
}

function categoryLabel(value: string) {
  return CATEGORIES.find(c => c.value === value)?.label ?? value;
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const all = getAllProjects();
  const idx = all.findIndex(p => p.slug === slug);
  const next = all.length > 1 ? all[(idx + 1) % all.length] : null;

  return (
    <SiteLayout>
      <article>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 pt-12 pb-8">
          <div className="text-[12px] font-bold tracking-[0.1em] mb-3" style={{ color: 'var(--accent)' }}>
            PROJEKT · {categoryLabel(project.category).toUpperCase()}
          </div>
          <div className="grid md:grid-cols-2 gap-6 items-end">
            <div>
              <h1 className="text-[34px] sm:text-[46px] font-extrabold leading-none mb-3">{project.title}</h1>
              <p className="text-[14px] text-[var(--muted)]">{project.location}</p>
            </div>
            {project.intro && (
              <p className="text-[13px] leading-7 text-[var(--muted)]">{project.intro}</p>
            )}
          </div>
        </div>

        {/* Main image */}
        {project.coverImage ? (
          <div className="relative w-full aspect-[16/9]">
            <Image src={project.coverImage} alt={project.title} fill priority className="object-cover" />
          </div>
        ) : (
          <PlaceholderImage className="w-full aspect-[16/9]" tone="warm" />
        )}

        {/* Info block */}
        <section className="text-white" style={{ background: 'var(--green)' }}>
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-12 grid md:grid-cols-2 gap-8">
            <div>
              <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-white/70 mb-3">
                Das Projekt
              </div>
              <h2 className="text-[24px] sm:text-[28px] font-bold leading-tight">
                {project.highlight || project.title}
              </h2>
            </div>
            <p className="text-[13px] leading-7 text-white/80">{project.description}</p>
          </div>

          <div className="max-w-[1200px] mx-auto px-5 sm:px-8 pb-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/15 pt-8">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.05em] text-white/60 mb-1">
                Realisation
              </div>
              <div className="text-[14px]">{project.realisation || project.year}</div>
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.05em] text-white/60 mb-1">
                Bauherrschaft
              </div>
              <div className="text-[14px]">{project.client || '—'}</div>
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.05em] text-white/60 mb-1">
                Objekt
              </div>
              <div className="text-[14px]">{project.objekt || project.area || '—'}</div>
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.05em] text-white/60 mb-1">
                Leistungen
              </div>
              <div className="text-[14px]">{project.leistungen || 'Cityplan AG'}</div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        {project.images.length > 0 && (
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-12">
            <div className="flex items-baseline justify-between mb-5">
              <h3 className="text-[15px] font-bold">Einblicke</h3>
              <span className="text-[12px] text-[var(--muted)]">Ausgewählte Aufnahmen</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-1">
              {project.images.map((src, i) => (
                <div key={i} className="relative aspect-[4/3]">
                  <Image src={src} alt={`${project.title} ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Prev / Next */}
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-8 border-t border-[var(--line)] flex items-center justify-between text-[13px] font-semibold">
          <Link href="/projekte" className="hover:text-[var(--accent)] transition-colors">
            ← Alle Projekte
          </Link>
          {next && (
            <Link href={`/projekte/${next.slug}`} className="hover:text-[var(--accent)] transition-colors">
              Nächstes Projekt →
            </Link>
          )}
        </div>
      </article>
    </SiteLayout>
  );
}
