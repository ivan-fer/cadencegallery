import type { ComponentProps } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'neutral' | 'accent';

const VARIANTS: Record<Variant, string> = {
  neutral: 'border-border bg-surface text-text-muted',
  accent: 'border-transparent bg-accent/10 text-accent',
};

type BadgeProps = ComponentProps<'span'> & { variant?: Variant };

/** Pastilla de estado (p.ej. "Próximamente en App Store"). */
export function Badge({ variant = 'neutral', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold',
        VARIANTS[variant],
        className,
      )}
      {...props}
    />
  );
}
