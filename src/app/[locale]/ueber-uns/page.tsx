import { useTranslations } from 'next-intl';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Über uns' };

const team = [
  { name: 'Anna Müller', role: { de: 'Geschäftsführerin & Architektin', en: 'Managing Director & Architect' }, image: '/images/team/anna.svg' },
  { name: 'Peter Huber', role: { de: 'Partner & Stadtplaner', en: 'Partner & Urban Planner' }, image: '/images/team/peter.svg' },
  { name: 'Sarah Weber', role: { de: 'Leiterin Innenarchitektur', en: 'Head of Interior Design' }, image: '/images/team/sarah.svg' },
  { name: 'Thomas Keller', role: { de: 'Projektleiter', en: 'Project Manager' }, image: '/images/team/thomas.svg' },
];

const values = ['sustainability', 'quality', 'collaboration', 'innovation'] as const;

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <div className="pt-32">
      {/* Header */}
      <header className="px-6 md:px-12 pb-24 max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-stone-900 tracking-tight mb-6">
          {t('title')}
        </h1>
        <p className="text-xl md:text-2xl text-stone-500 font-light max-w-2xl">
          {t('subtitle')}
        </p>
      </header>

      {/* Studio section */}
      <section className="bg-stone-50 py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-light text-stone-900 tracking-tight mb-8">
              {t('studioTitle')}
            </h2>
            <p className="text-stone-600 leading-relaxed mb-6">{t('studioText1')}</p>
            <p className="text-stone-500 leading-relaxed">{t('studioText2')}</p>
          </div>
          <div className="relative aspect-[3/4] bg-stone-200 overflow-hidden">
            <Image
              src="/images/studio.svg"
              alt="Cityplan AG Studio"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-stone-900 tracking-tight mb-16">
            {t('valuesTitle')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div key={v} className="border-t-2 border-stone-900 pt-6">
                <span className="text-stone-300 text-sm font-medium mb-4 block">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-stone-900 font-medium mb-3">{t(`values.${v}`)}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{t(`values.${v}Desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-stone-50 py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-stone-900 tracking-tight mb-16">
            {t('teamTitle')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map(member => (
              <div key={member.name} className="group">
                <div className="relative aspect-[3/4] bg-stone-200 overflow-hidden mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <p className="text-stone-900 font-medium text-sm">{member.name}</p>
                <p className="text-stone-400 text-xs mt-0.5">
                  {/* Role depends on locale — use server-side approach */}
                  {member.role.de}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
