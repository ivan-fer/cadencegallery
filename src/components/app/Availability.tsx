import { Smartphone } from 'lucide-react';
import { Container } from '@/components/ui/Container';

type AvailabilityProps = {
  title: string;
  note: string;
  appStore: string;
  googlePlay: string;
};

/**
 * Disponibilidad de la app. Las apps aún no están publicadas: se muestran las
 * tiendas como "Próximamente" sin links. Al publicar se reemplaza por badges reales.
 */
export function Availability({ title, note, appStore, googlePlay }: AvailabilityProps) {
  return (
    <section className="border-t border-border bg-surface/40">
      <Container className="py-16 text-center sm:py-20">
        <Smartphone className="mx-auto size-7 text-accent" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-text">{title}</h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-text-muted">{note}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {[appStore, googlePlay].map((store) => (
            <span
              key={store}
              className="inline-flex items-center rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-text-subtle"
            >
              {store}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
