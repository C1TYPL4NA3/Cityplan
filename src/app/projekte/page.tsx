import Image from 'next/image';
import Link from 'next/link';
import { getAllProjects } from '@/lib/projects';
import SiteLayout from '@/components/SiteLayout';

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

  return (
    <SiteLayout>
      <div style={{ padding: '20px 16px', columns: '3 280px', gap: 6 }}>
        {projects.map(project => (
          <Link
            key={project.id}
            href={`/projekte/${project.slug}`}
            style={{ display: 'block', breakInside: 'avoid', marginBottom: 6, overflow: 'hidden' }}
          >
            <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden', background: '#e8e8e8' }}>
              {project.coverImage ? (
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
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
    </SiteLayout>
  );
}
