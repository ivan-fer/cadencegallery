import { useTranslations } from 'next-intl';
import { buttonStyles } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';

export function AboutSection() {
  const t = useTranslations('home.about');
  const email = t('email');

  return (
    <Section
      id="about"
      eyebrow={t('eyebrow')}
      title={t('title')}
      className="border-t border-border"
    >
      <div className="max-w-2xl">
        <p className="text-lg leading-relaxed text-text-muted">{t('body')}</p>
        <a href={`mailto:${email}`} className={buttonStyles({ variant: 'secondary', className: 'mt-8' })}>
          {t('contactLabel')} {email}
        </a>
      </div>
    </Section>
  );
}
