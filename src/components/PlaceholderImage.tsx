export default function PlaceholderImage({
  className = '',
  tone = 'warm',
}: {
  className?: string;
  tone?: 'warm' | 'cool' | 'green';
}) {
  const gradients: Record<string, string> = {
    warm: 'linear-gradient(135deg, #d9d2c6 0%, #b9ada0 45%, #8f8479 100%)',
    cool: 'linear-gradient(135deg, #cfd3cc 0%, #a9ad9f 50%, #7c8172 100%)',
    green: 'linear-gradient(135deg, #6b7660 0%, var(--green) 60%, #333b29 100%)',
  };

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: gradients[tone] }}>
      <svg className="absolute inset-0 w-full h-full opacity-25" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <pattern id={`grid-${tone}`} width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M28 0H0V28" fill="none" stroke="#fff" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${tone})`} />
      </svg>
    </div>
  );
}
