import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/Badge';
import { Button, ButtonLink } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Prose } from '@/components/ui/Prose';
import { Section } from '@/components/ui/Section';

// Página de validación visual del sistema de diseño (Fase 2). Dev aid:
// no se enlaza desde el sitio y no debe indexarse. Se remueve antes de
// producción (Fase 8) y se excluye del sitemap (Fase 7).
export const metadata: Metadata = {
  title: 'Styleguide',
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ locale: string }> };

export default async function StyleguidePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Section
        eyebrow="Sistema de diseño"
        title="Styleguide"
        description="Validación de los componentes base de la Fase 2 en tema claro y oscuro."
      >
        <div className="space-y-16">
          {/* Tipografía */}
          <div>
            <Eyebrow>Tipografía</Eyebrow>
            <div className="mt-4 space-y-3">
              <h1 className="text-4xl font-extrabold tracking-tight text-text sm:text-5xl">
                Heading 1 — Manrope ExtraBold
              </h1>
              <h2 className="text-3xl font-extrabold tracking-tight text-text">Heading 2</h2>
              <h3 className="text-xl font-bold text-text">Heading 3</h3>
              <p className="text-lg leading-relaxed text-text-muted">
                Lead — herramientas de práctica para músicos, hechas con cuidado.
              </p>
              <p className="text-base leading-relaxed text-text">
                Body — texto base sobre el color de tema. The quick brown fox jumps over the lazy
                dog.
              </p>
              <p className="text-sm text-text-subtle">Caption — metadatos y notas secundarias.</p>
              <p className="font-mono text-sm text-text-muted">Mono — 120 BPM · 3:2 · v1.0.0</p>
            </div>
          </div>

          {/* Botones */}
          <div>
            <Eyebrow>Botones</Eyebrow>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="primary" disabled>
                Disabled
              </Button>
              <ButtonLink href="/" variant="secondary">
                ButtonLink → home
              </ButtonLink>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          {/* Badges */}
          <div>
            <Eyebrow>Badges</Eyebrow>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Badge variant="accent">Próximamente</Badge>
              <Badge variant="neutral">Neutral</Badge>
            </div>
          </div>

          {/* Cards */}
          <div>
            <Eyebrow>Cards</Eyebrow>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              <Card>
                <h3 className="text-lg font-bold text-text">Card estática</h3>
                <p className="mt-2 text-text-muted">
                  Superficie con borde y radio. Para contenido general.
                </p>
              </Card>
              <Card interactive>
                <h3 className="text-lg font-bold text-text">Card interactiva</h3>
                <p className="mt-2 text-text-muted">
                  Hover lift + sombra. Para las cards de apps del home.
                </p>
              </Card>
            </div>
          </div>

          {/* Prose */}
          <div>
            <Eyebrow>Prose (texto largo)</Eyebrow>
            <Prose className="mt-4">
              <h2>Política de privacidad</h2>
              <p>
                Las apps de Cadence no recolectan, almacenan ni transmiten datos personales. Toda la
                configuración se guarda <strong>localmente</strong> en tu dispositivo.
              </p>
              <h3>Permisos</h3>
              <ul>
                <li>Audio, para la reproducción del metrónomo.</li>
                <li>Sin analytics, sin publicidad, sin tracking de terceros.</li>
              </ul>
              <p>
                Más información en{' '}
                <a href="https://cadencegallery.com">cadencegallery.com</a>.
              </p>
            </Prose>
          </div>
        </div>
      </Section>
    </>
  );
}
