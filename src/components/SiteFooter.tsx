import Link from 'next/link';

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Leistungen',
    links: [
      { label: 'Planung', href: '/profil' },
      { label: 'Umbau & Sanierung', href: '/projekte?kat=umbau-sanierung' },
      { label: 'Ausschreibung', href: '/profil' },
      { label: 'Baumanagement', href: '/profil' },
      { label: 'Bauherrenvertretung', href: '/profil' },
    ],
  },
  {
    title: 'Unternehmen',
    links: [
      { label: 'Profil', href: '/profil' },
      { label: 'Projekte', href: '/projekte' },
      { label: 'Jobs', href: '/jobs' },
      { label: 'Kontakt', href: '/kontakt' },
    ],
  },
  {
    title: 'Rechtliches',
    links: [
      { label: 'Impressum', href: '/kontakt' },
      { label: 'Datenschutz', href: '/kontakt' },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="text-white" style={{ background: 'var(--brown)' }}>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <div className="text-[14px] font-bold mb-3">cityplan AG Zürich</div>
          <p className="text-[13px] leading-7 text-white/60">
            Architektur &amp; Generalunternehmung
            <br />
            Zürich
            <br />
            <a href="mailto:info@cityplanag.ch" className="hover:text-white transition-colors">
              info@cityplanag.ch
            </a>
            <br />
            <a href="https://www.cityplanag.ch" className="hover:text-white transition-colors">
              www.cityplanag.ch
            </a>
          </p>
        </div>

        {COLUMNS.map(col => (
          <div key={col.title}>
            <div className="text-[14px] font-bold mb-3">{col.title}</div>
            <ul className="flex flex-col gap-2">
              {col.links.map(l => (
                <li key={l.label}>
                  <Link href={l.href} className="text-[13px] text-white/60 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px] text-white/45">
          <span>© {new Date().getFullYear()} cityplan AG Zürich</span>
          <span>Architektur · Generalunternehmung · Zürich</span>
        </div>
      </div>
    </footer>
  );
}
