export default function Logo({ dark = false }: { dark?: boolean }) {
  const fg = dark ? '#fff' : '#181614';
  const muted = dark ? 'rgba(255,255,255,0.6)' : '#6b6660';

  return (
    <span className="inline-flex items-center gap-2.5">
      <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true" className="shrink-0">
        <circle cx="17" cy="17" r="17" fill="var(--accent)" />
        <text
          x="17"
          y="18.5"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="Inter, sans-serif"
          fontWeight="700"
          fontSize="14"
          fill="#fff"
          letterSpacing="-0.5"
        >
          cp
        </text>
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-[13px] font-bold tracking-tight" style={{ color: fg }}>
          cityplan
        </span>
        <span className="text-[8px] uppercase tracking-[0.08em] mt-0.5" style={{ color: muted }}>
          architektur generalunternehmung
        </span>
        <span className="text-[8px] font-semibold uppercase tracking-[0.08em] mt-px" style={{ color: 'var(--accent)' }}>
          cityplanAGZürich
        </span>
      </span>
    </span>
  );
}
