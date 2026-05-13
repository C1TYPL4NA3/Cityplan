import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { getProjectBySlug, projects } from '@/lib/projects';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const l = locale as 'de' | 'en';
  return { title: project.title[l] };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale: localeParam } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return <ProjectDetail slug={slug} localeParam={localeParam} />;
}

function ProjectDetail({ slug, localeParam }: { slug: string; localeParam: string }) {
  const t = useTranslations('project');
  const locale = useLocale() as 'de' | 'en';
  const project = getProjectBySlug(slug)!;

  const meta = [
    { label: t('category'), value: project.category },
    { label: t('location'), value: project.location },
    { label: t('year'), value: String(project.year) },
    ...(project.client ? [{ label: t('client'), value: project.client[locale] }] : []),
    ...(project.area ? [{ label: t('area'), value: project.area }] : []),
    { label: t('status'), value: project.status[locale] },
  ];

  return (
    <article>
      {/* Hero */}
      <div className="relative h-[70vh] min-h-[400px] bg-stone-200">
        <Image
          src={project.coverImage}
          alt={project.title[locale]}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-12">
          <p className="text-white/60 text-sm tracking-widest uppercase mb-3">
            {project.category} · {project.location}
          </p>
          <h1 className="text-white text-4xl md:text-6xl font-light tracking-tight">
            {project.title[locale]}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-3 gap-16">
        {/* Description */}
        <div className="md:col-span-2">
          <p className="text-xl text-stone-600 leading-relaxed mb-8">
            {project.description[locale]}
          </p>
          {project.longDescription && (
            <p className="text-stone-500 leading-relaxed">
              {project.longDescription[locale]}
            </p>
          )}

          {/* Gallery */}
          {project.images.length > 0 && (
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.images.map((src, i) => (
                <div key={i} className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                  <Image
                    src={src}
                    alt={`${project.title[locale]} ${i + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Meta */}
        <aside className="md:col-span-1">
          <dl className="space-y-6 border-t border-stone-200 pt-6">
            {meta.map(({ label, value }) => (
              <div key={label}>
                <dt className="text-xs tracking-widest uppercase text-stone-400 mb-1">
                  {label}
                </dt>
                <dd className="text-stone-800 font-medium capitalize">{value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      {/* Back link */}
      <div className="px-6 md:px-12 pb-16 max-w-7xl mx-auto">
        <Link
          href={`/${locale}/projekte`}
          className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-stone-500 hover:text-stone-900 transition-colors border-b border-stone-300 pb-0.5 hover:border-stone-900"
        >
          ← {t('backToProjects')}
        </Link>
      </div>
    </article>
  );
}
