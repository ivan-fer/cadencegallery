import { useFormatter, useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';

type Update = { date: string; title: string; body: string };

export function LatestSection() {
  const t = useTranslations('home.latest');
  const format = useFormatter();
  const items = t.raw('items') as Update[];

  return (
    <Section
      id="latest"
      eyebrow={t('eyebrow')}
      title={t('title')}
      className="border-t border-border"
      reveal
    >
      <ul className="max-w-3xl">
        {items.map((item) => (
          <li
            key={item.date}
            className="flex flex-col gap-1 border-t border-divider py-5 first:border-t-0 first:pt-0 sm:flex-row sm:gap-8"
          >
            <time
              dateTime={item.date}
              className="font-mono text-sm text-text-subtle sm:w-36 sm:shrink-0 sm:pt-0.5"
            >
              {format.dateTime(new Date(item.date), {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                timeZone: 'UTC',
              })}
            </time>
            <div>
              <h3 className="font-bold text-text">{item.title}</h3>
              <p className="mt-1 leading-relaxed text-text-muted">{item.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
