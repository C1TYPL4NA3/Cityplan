'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ProjectCard from './ProjectCard';
import type { Project, ProjectCategory } from '@/lib/projects';

type Filter = 'all' | ProjectCategory;

const filters: Filter[] = ['all', 'residential', 'commercial', 'urban', 'public'];

export default function ProjectsFilter({ projects }: { projects: Project[] }) {
  const t = useTranslations('projects');
  const [active, setActive] = useState<Filter>('all');

  const visible = active === 'all' ? projects : projects.filter(p => p.category === active);

  return (
    <>
      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 mb-12">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`text-xs tracking-widest uppercase px-4 py-2 border transition-colors duration-200 ${
              active === f
                ? 'bg-stone-900 text-white border-stone-900'
                : 'bg-transparent text-stone-600 border-stone-300 hover:border-stone-600 hover:text-stone-900'
            }`}
          >
            {t(f)}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6">
        {visible.map((project, i) => (
          <ProjectCard key={project.id} project={project} priority={i < 3} />
        ))}
      </div>
    </>
  );
}
