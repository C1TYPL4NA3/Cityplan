import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import type { Project } from '@/lib/projects';

interface Props {
  project: Project;
  priority?: boolean;
}

const categoryColors: Record<string, string> = {
  residential: 'bg-amber-50 text-amber-800',
  commercial: 'bg-blue-50 text-blue-800',
  urban: 'bg-emerald-50 text-emerald-800',
  public: 'bg-violet-50 text-violet-800',
};

export default function ProjectCard({ project, priority = false }: Props) {
  const locale = useLocale() as 'de' | 'en';
  const t = useTranslations('projects');

  return (
    <Link
      href={`/${locale}/projekte/${project.slug}`}
      className="group block overflow-hidden"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <Image
          src={project.coverImage}
          alt={project.title[locale]}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority={priority}
        />
        <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/20 transition-colors duration-500" />
      </div>
      <div className="pt-4 pb-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-stone-900 font-medium leading-snug group-hover:opacity-60 transition-opacity">
            {project.title[locale]}
          </h3>
          <span className="text-stone-500 text-sm shrink-0">{project.year}</span>
        </div>
        <div className="flex items-center gap-3 mt-1">
          <span className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[project.category]}`}>
            {t(project.category)}
          </span>
          <span className="text-stone-400 text-sm">{project.location}</span>
        </div>
      </div>
    </Link>
  );
}
