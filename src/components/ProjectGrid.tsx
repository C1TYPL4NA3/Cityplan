'use client';

import Image from 'next/image';
import Link from 'next/link';
import PlaceholderImage from './PlaceholderImage';
import { CATEGORIES } from '@/lib/categories';
import type { Project } from '@/lib/categories';

const TONES: Array<'warm' | 'cool' | 'green'> = ['warm', 'cool', 'green'];

function categoryLabel(value: string) {
  return CATEGORIES.find(c => c.value === value)?.label ?? value;
}

function Tile({ project, big, tone }: { project: Project; big: boolean; tone: 'warm' | 'cool' | 'green' }) {
  return (
    <Link
      href={`/projekte/${project.slug}`}
      className="group relative block overflow-hidden"
      style={{ aspectRatio: big ? '21/10' : '4/3' }}
    >
      {project.coverImage ? (
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes={big ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <PlaceholderImage className="absolute inset-0 transition-transform duration-500 group-hover:scale-105" tone={tone} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
      <div className="absolute left-0 right-0 bottom-0 p-5 sm:p-6">
        <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-white/80 mb-1">
          {categoryLabel(project.category)}
        </div>
        <div className={`font-bold text-white ${big ? 'text-[22px] sm:text-[28px]' : 'text-[16px] sm:text-[18px]'}`}>
          {project.title}
        </div>
        {project.location && (
          <div className="text-[12px] text-white/70 mt-1">{project.location}</div>
        )}
      </div>
    </Link>
  );
}

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-24 text-center text-[var(--muted)] text-[14px]">
        Keine Projekte in dieser Kategorie.
      </div>
    );
  }

  // Pattern: 1 large tile, then pairs of 2 — repeating.
  const groups: Project[][] = [];
  let i = 0;
  let big = true;
  while (i < projects.length) {
    if (big) {
      groups.push([projects[i]]);
      i += 1;
    } else {
      groups.push(projects.slice(i, i + 2));
      i += 2;
    }
    big = !big;
  }

  return (
    <div className="flex flex-col gap-1">
      {groups.map((group, gi) => (
        <div key={gi} className={group.length === 1 ? 'grid grid-cols-1 gap-1' : 'grid grid-cols-1 sm:grid-cols-2 gap-1'}>
          {group.map((p, pi) => (
            <Tile key={p.id} project={p} big={group.length === 1} tone={TONES[(gi + pi) % TONES.length]} />
          ))}
        </div>
      ))}
    </div>
  );
}
