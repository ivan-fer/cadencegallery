import type { ComponentProps } from 'react';
import { cn } from '@/lib/cn';

/** Contenedor de texto largo (legales, guías). Estilos en globals.css (.prose-cadence). */
export function Prose({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('prose-cadence', className)} {...props} />;
}
