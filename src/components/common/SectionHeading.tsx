interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = false,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={centered ? 'text-center' : ''}>
      {eyebrow && (
        <span
          className={`inline-block text-xs font-bold uppercase tracking-widest mb-2 ${
            light ? 'text-[#DDCFE6]' : 'text-[#7D2D76]'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-3xl md:text-4xl font-bold leading-tight mb-3 ${
          light ? 'text-white' : 'text-[#2B2430]'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-base leading-relaxed max-w-2xl ${
            centered ? 'mx-auto' : ''
          } ${light ? 'text-purple-200' : 'text-[#77717B]'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
