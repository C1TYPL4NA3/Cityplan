'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/projects';

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <>
      <style>{`
        .proj-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3px; padding: 3px; }
        @media (max-width: 900px) { .proj-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .proj-grid { grid-template-columns: 1fr; } }
        .proj-cell { position: relative; aspect-ratio: 4/3; overflow: hidden; background: #e0e0e0; display: block; }
        .proj-cell img { transition: transform 0.5s ease; }
        .proj-cell:hover img { transform: scale(1.04); }
      `}</style>
      <div className="proj-grid">
        {projects.map(project => (
          <Link key={project.id} href={`/projekte/${project.slug}`} className="proj-cell">
            {project.coverImage ? (
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: 12 }}>
                kein Bild
              </div>
            )}
          </Link>
        ))}
        {projects.length === 0 && (
          <p style={{ gridColumn: '1/-1', padding: 24, color: '#999', fontSize: 13 }}>Keine Projekte.</p>
        )}
      </div>
    </>
  );
}
