'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/projects';

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <>
      <style>{`
        .proj-container {
          width: calc(100% - (var(--page-gutter) * 2));
          max-width: var(--content-max-width);
          margin: 0 auto;
        }
        .proj-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--project-row-gap) var(--project-col-gap);
        }
        @media (max-width: 1023px) {
          .proj-grid { grid-template-columns: 1fr; }
        }
        .proj-cell { position: relative; aspect-ratio: var(--project-aspect-ratio); overflow: hidden; background: #eee; display: block; }
        .proj-cell img { transition: opacity 0.2s ease; }
        .proj-cell:hover img { opacity: 0.92; }
      `}</style>
      <div className="proj-container">
        <div className="proj-grid">
          {projects.map(project => (
            <Link key={project.id} href={`/projekte/${project.slug}`} className="proj-cell">
              {project.coverImage ? (
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1023px) 100vw, 33vw"
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
            <p style={{ gridColumn: '1/-1', padding: '24px 0', color: '#999', fontSize: 13 }}>Keine Projekte.</p>
          )}
        </div>
      </div>
    </>
  );
}
