import type { ComponentProps } from 'react';
import { cn } from '@/lib/cn';

/** Etiqueta pequeña en mono/uppercase con color de acento (encabezados de sección). */
export function Eyebrow({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'font-mono text-xs font-semibold uppercase tracking-[0.12em] text-accent',
        className,
      )}
      {...props}
    />
  );
}
