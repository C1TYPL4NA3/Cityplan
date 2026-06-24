'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/projects';

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div style={{ padding: '20px 16px' }}>
      <style>{`
        .proj-item { display: block; break-inside: avoid; margin-bottom: 6px; overflow: hidden; }
        .proj-img { position: relative; width: 100%; aspect-ratio: 4/3; overflow: hidden; background: #e8e8e8; }
        .proj-img img { transition: transform 0.4s ease; }
        .proj-item:hover .proj-img img { transform: scale(1.03); }
      `}</style>
      <div style={{ columns: '3 280px', gap: 6 }}>
        {projects.map(project => (
          <Link key={project.id} href={`/projekte/${project.slug}`} className="proj-item">
            <div className="proj-img">
              {project.coverImage ? (
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <div style={{ width: '100%', height: '100%', background: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: 12 }}>
                  kein Bild
                </div>
              )}
            </div>
          </Link>
        ))}
        {projects.length === 0 && (
          <p style={{ color: '#999', fontSize: 13, padding: 20 }}>Keine Projekte in dieser Kategorie.</p>
        )}
      </div>
    </div>
  );
}
