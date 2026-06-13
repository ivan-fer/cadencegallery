import type { ComponentProps, ElementType } from 'react';
import { cn } from '@/lib/cn';

type CardProps = ComponentProps<'div'> & {
  as?: ElementType;
  /** Aplica hover lift + sombra (para cards clickeables, p.ej. las de apps). */
  interactive?: boolean;
};

export function Card({ as: Tag = 'div', interactive = false, className, ...props }: CardProps) {
  return (
    <Tag
      className={cn(
        'rounded-2xl border border-border bg-surface p-6',
        interactive &&
          'transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-lg hover:shadow-black/5',
        className,
      )}
      {...props}
    />
  );
}
