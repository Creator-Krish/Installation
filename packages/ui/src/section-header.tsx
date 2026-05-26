type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="max-w-3xl space-y-3">
      <p className="text-xs uppercase tracking-[0.3em] text-teal-300">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
      <p className="text-base leading-7 text-slate-300 md:text-lg">{description}</p>
    </div>
  );
}
