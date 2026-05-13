import { useTranslations } from 'next-intl';
import { projects } from '@/lib/projects';
import ProjectsFilter from '@/components/ProjectsFilter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projekte',
};

export default function ProjectsPage() {
  const t = useTranslations('projects');

  return (
    <div className="pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <h1 className="text-5xl md:text-6xl font-light text-stone-900 tracking-tight mb-4">
            {t('title')}
          </h1>
          <p className="text-stone-500 text-lg max-w-xl">{t('subtitle')}</p>
        </header>

        <ProjectsFilter projects={projects} />
      </div>
    </div>
  );
}
