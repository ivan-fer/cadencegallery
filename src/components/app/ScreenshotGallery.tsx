import type { ReactNode } from 'react';

/** Galería de capturas (móviles portrait) en fila adaptable. */
export function ScreenshotGallery({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-start justify-center gap-6 sm:gap-8">{children}</div>;
}

/** Item con su leyenda debajo. */
export function ScreenshotItem({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <figure className="flex w-full max-w-[260px] flex-col items-center">
      {children}
      <figcaption className="mt-3 font-mono text-xs uppercase tracking-wider text-text-subtle">
        {caption}
      </figcaption>
    </figure>
  );
}
