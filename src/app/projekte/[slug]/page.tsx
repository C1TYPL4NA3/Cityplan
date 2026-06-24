import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getAllProjects, getProjectBySlug } from '@/lib/projects';
import SiteLayout from '@/components/SiteLayout';

export async function generateStaticParams() {
  return getAllProjects().map(p => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const allImages = project.coverImage
    ? [project.coverImage, ...project.images]
    : project.images;

  return (
    <SiteLayout>
      <article style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px 64px' }}>
        {/* Back */}
        <Link
          href="/projekte"
          style={{ fontSize: 12, color: '#888', display: 'inline-block', marginBottom: 24, letterSpacing: '0.05em' }}
        >
          ← Projekte
        </Link>

        <h1 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 6px' }}>{project.title}</h1>
        <p style={{ fontSize: 13, color: '#666', margin: '0 0 32px' }}>
          {project.category} · {project.location} · {project.year}
        </p>

        {/* Main image */}
        {project.coverImage && (
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#e8e8e8', marginBottom: 4 }}>
            <Image src={project.coverImage} alt={project.title} fill style={{ objectFit: 'cover' }} priority />
          </div>
        )}

        {/* Gallery */}
        {project.images.length > 0 && (
          <div style={{ columns: '2 300px', gap: 4, marginBottom: 40 }}>
            {project.images.map((src, i) => (
              <div key={i} style={{ position: 'relative', aspectRatio: '4/3', background: '#e8e8e8', marginBottom: 4, breakInside: 'avoid' }}>
                <Image src={src} alt={`${project.title} ${i + 1}`} fill style={{ objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        )}

        {/* Description */}
        {project.description && (
          <div style={{ maxWidth: 620, marginTop: 40 }}>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: '#333' }}>{project.description}</p>
          </div>
        )}

        {/* Meta table */}
        <dl style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '6px 24px', fontSize: 13 }}>
          {project.client && <><dt style={{ fontWeight: 700 }}>Bauherrschaft</dt><dd style={{ margin: 0 }}>{project.client}</dd></>}
          {project.area && <><dt style={{ fontWeight: 700 }}>Fläche</dt><dd style={{ margin: 0 }}>{project.area}</dd></>}
          <dt style={{ fontWeight: 700 }}>Status</dt><dd style={{ margin: 0 }}>{project.status}</dd>
          <dt style={{ fontWeight: 700 }}>Jahr</dt><dd style={{ margin: 0 }}>{project.year}</dd>
        </dl>
      </article>
    </SiteLayout>
  );
}
