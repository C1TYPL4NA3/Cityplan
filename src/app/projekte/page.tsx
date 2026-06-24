import Link from 'next/link';
import { getAllProjects } from '@/lib/projects';
import SiteLayout from '@/components/SiteLayout';
import ProjectGrid from '@/components/ProjectGrid';

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
      <ProjectGrid projects={projects} />
    </SiteLayout>
  );
}
