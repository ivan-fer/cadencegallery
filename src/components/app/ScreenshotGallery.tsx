import type { ReactNode } from 'react';

/** Galería de capturas (móviles portrait) en fila adaptable. */
export function ScreenshotGallery({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-start justify-center gap-6 sm:gap-8">{children}</div>;
}

/** Item con su leyenda debajo. Lift sutil de la captura al hover. */
export function ScreenshotItem({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <figure className="group flex w-full max-w-[260px] flex-col items-center">
      <div className="transition-transform duration-300 ease-cadence group-hover:-translate-y-1.5">
        {children}
      </div>
      <figcaption className="mt-3 font-mono text-xs uppercase tracking-wider text-text-subtle">
        {caption}
      </figcaption>
    </figure>
  );
}
