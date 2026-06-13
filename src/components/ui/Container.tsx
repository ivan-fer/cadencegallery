import { clsx } from 'clsx';
import type { ElementType, ReactNode } from 'react';

type ContainerProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
};

/** Contenedor centrado con ancho máximo y padding horizontal responsivo. */
export function Container({ as: Tag = 'div', children, className }: ContainerProps) {
  return (
    <Tag className={clsx('mx-auto w-full max-w-6xl px-5 sm:px-8', className)}>{children}</Tag>
  );
}
