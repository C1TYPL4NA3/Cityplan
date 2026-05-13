import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedProjects } from '@/lib/projects';
import ProjectCard from '@/components/ProjectCard';

export default function HomePage() {
  const t = useTranslations('home');
  const locale = useLocale() as 'de' | 'en';
  const featured = getFeaturedProjects();

  const services = [
    { key: 'architecture', icon: '○' },
    { key: 'urban', icon: '△' },
    { key: 'interior', icon: '□' },
    { key: 'consulting', icon: '◇' },
  ] as const;

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[600px] flex flex-col justify-end pb-16 px-6 md:px-12 overflow-hidden">
        {/* Background image placeholder — replace with real hero image */}
        <div className="absolute inset-0 bg-stone-800">
          <Image
            src="/images/hero.svg"
            alt="Cityplan AG"
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/20 to-transparent" />
        </div>

        <div className="relative max-w-5xl">
          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight whitespace-pre-line mb-6">
            {t('heroTagline')}
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-xl">
            {t('heroSubtitle')}
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs tracking-widest uppercase">{t('scrollDown')}</span>
          <div className="w-px h-12 bg-white/20 animate-pulse" />
        </div>
      </section>

      {/* ── FEATURED PROJECTS ────────────────────────────── */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-stone-900 tracking-tight">
              {t('featuredProjects')}
            </h2>
            <Link
              href={`/${locale}/projekte`}
              className="hidden md:inline-flex items-center gap-2 text-sm tracking-widest uppercase text-stone-500 hover:text-stone-900 transition-colors border-b border-stone-300 pb-0.5 hover:border-stone-900"
            >
              {t('allProjects')} →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6">
            {featured.map((project, i) => (
              <ProjectCard key={project.id} project={project} priority={i === 0} />
            ))}
          </div>

          <div className="mt-10 md:hidden">
            <Link
              href={`/${locale}/projekte`}
              className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-stone-500 hover:text-stone-900 transition-colors border-b border-stone-300 pb-0.5"
            >
              {t('allProjects')} →
            </Link>
          </div>
        </div>
      </section>

      {/* ── ABOUT TEASER ─────────────────────────────────── */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-light text-stone-900 tracking-tight mb-6">
              {t('aboutTitle')}
            </h2>
            <p className="text-stone-600 text-lg leading-relaxed mb-8">
              {t('aboutText')}
            </p>
            <Link
              href={`/${locale}/ueber-uns`}
              className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-stone-900 border-b border-stone-900 pb-0.5 hover:opacity-60 transition-opacity"
            >
              {t('aboutLink')} →
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
            <Image
              src="/images/about-teaser.svg"
              alt="Cityplan AG Büro"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-stone-900 tracking-tight mb-16">
            {t('servicesTitle')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-l border-stone-200">
            {services.map(({ key, icon }) => (
              <div
                key={key}
                className="border-r border-t border-b border-stone-200 p-8 hover:bg-stone-50 transition-colors"
              >
                <span className="text-2xl text-stone-300 block mb-6">{icon}</span>
                <h3 className="text-stone-900 font-medium mb-3">
                  {t(`services.${key}`)}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed">
                  {t(`services.${key}Desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ──────────────────────────────────── */}
      <section className="bg-stone-900 text-white py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight whitespace-pre-line max-w-xl">
            {t('contactCta')}
          </h2>
          <Link
            href={`/${locale}/kontakt`}
            className="inline-flex items-center gap-3 text-sm tracking-widest uppercase border border-white/40 px-8 py-4 hover:bg-white hover:text-stone-900 transition-all duration-300 shrink-0"
          >
            {t('contactLink')} →
          </Link>
        </div>
      </section>
    </>
  );
}
