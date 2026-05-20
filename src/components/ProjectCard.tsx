import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import type { Project } from '@/lib/projects';

interface Props {
  project: Project;
  priority?: boolean;
}

export default function ProjectCard({ project, priority = false }: Props) {
  const locale = useLocale() as 'de' | 'en';

  return (
    <Link href={`/${locale}/projekte/${project.slug}`} className="group block">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 mb-4">
        <Image
          src={project.coverImage}
          alt={project.title[locale]}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority={priority}
        />
      </div>
      {/* Text — aart.dk style: bold title, small location */}
      <h3 className="font-bold text-[#1a1a1a] text-lg leading-snug mb-1 group-hover:opacity-60 transition-opacity">
        {project.title[locale]}
      </h3>
      <p className="text-stone-400 text-sm">{project.location}</p>
    </Link>
  );
}
