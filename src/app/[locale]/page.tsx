import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedProjects } from '@/lib/projects';
import ProjectCard from '@/components/ProjectCard';

export default function HomePage() {
  const t = useTranslations('home');
  const locale = useLocale() as 'de' | 'en';
  const featured = getFeaturedProjects();

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-stone-700">
          <Image
            src="/images/hero.jpg"
            alt="Cityplan AG — Zürich"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        {/* Scroll arrow bottom right — aart.dk style */}
        <div className="absolute bottom-6 right-6 w-10 h-10 border border-white/50 flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v12M1 7l6 6 6-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a]">
              {t('featuredProjects')}
            </h2>
            <Link
              href={`/${locale}/projekte`}
              className="hidden md:block text-sm font-medium text-stone-500 hover:text-[#1a1a1a] transition-colors underline underline-offset-4"
            >
              {t('allProjects')}
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((project, i) => (
              <ProjectCard key={project.id} project={project} priority={i === 0} />
            ))}
          </div>
          <div className="mt-8 md:hidden">
            <Link href={`/${locale}/projekte`} className="text-sm font-medium underline underline-offset-4 text-stone-500">
              {t('allProjects')}
            </Link>
          </div>
        </div>
      </section>

      {/* ── ABOUT TEASER ── */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6">{t('aboutTitle')}</h2>
            <p className="text-stone-600 text-lg leading-relaxed mb-8">{t('aboutText')}</p>
            <Link
              href={`/${locale}/ueber-uns`}
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#1a1a1a] underline underline-offset-4 hover:opacity-60 transition-opacity"
            >
              {t('aboutLink')}
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
            <Image src="/images/about-teaser.svg" alt="Cityplan AG" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-14">{t('servicesTitle')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-stone-200">
            {(['architecture','urban','interior','consulting'] as const).map(key => (
              <div key={key} className="bg-white p-8 hover:bg-stone-50 transition-colors">
                <h3 className="font-bold text-[#1a1a1a] mb-3">{t(`services.${key}`)}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{t(`services.${key}Desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ── */}
      <section className="py-28 px-6 md:px-10" style={{ background: 'var(--terra)' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-xl whitespace-pre-line">
            {t('contactCta')}
          </h2>
          <Link
            href={`/${locale}/kontakt`}
            className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest border-2 border-white text-white px-8 py-4 hover:bg-white hover:text-[#b85535] transition-all duration-300 shrink-0"
          >
            {t('contactLink')}
          </Link>
        </div>
      </section>
    </>
  );
}
