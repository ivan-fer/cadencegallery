import type { LucideIcon } from 'lucide-react';

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function FeatureGrid({ items }: { items: Feature[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(({ icon: Icon, title, description }) => (
        <div key={title} className="rounded-2xl border border-border bg-surface p-6">
          <div className="inline-flex size-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <Icon className="size-5" aria-hidden="true" />
          </div>
          <h3 className="mt-4 font-bold text-text">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">{description}</p>
        </div>
      ))}
    </div>
  );
}
