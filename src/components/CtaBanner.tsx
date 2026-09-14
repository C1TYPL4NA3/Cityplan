export default function CtaBanner({
  heading,
  text,
  ctaLabel = 'Projekt besprechen',
}: {
  heading: string;
  text: string;
  ctaLabel?: string;
}) {
  return (
    <section className="border-t border-b border-[var(--line)]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-12 md:py-14 grid md:grid-cols-[1fr_auto] gap-8 items-center">
        <div className="border-l-4 pl-5" style={{ borderColor: 'var(--accent)' }}>
          <h2 className="text-[20px] sm:text-[24px] font-bold mb-2">{heading}</h2>
          <p className="text-[13px] text-[var(--muted)] max-w-[460px]">{text}</p>
        </div>
        <div className="flex flex-col items-start md:items-end gap-3">
          <a href="mailto:info@cityplanag.ch" className="text-[13px] font-semibold">
            cityplan AG Zürich
            <br />
            <span className="text-[var(--accent)]">info@cityplanag.ch</span>
          </a>
          <a
            href="mailto:info@cityplanag.ch"
            className="inline-block text-[13px] font-semibold text-white px-6 py-3"
            style={{ background: 'var(--accent)' }}
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
