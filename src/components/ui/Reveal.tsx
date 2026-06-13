'use client';

import { useEffect, useRef, useState } from 'react';
import type { ComponentProps, CSSProperties, ElementType } from 'react';
import { cn } from '@/lib/cn';

type RevealProps = Omit<ComponentProps<'div'>, 'ref'> & {
  as?: ElementType;
  /** Retraso de entrada en ms, para escalonar varios reveals contiguos. */
  delay?: number;
};

/**
 * Revela su contenido con un fade-up al entrar en viewport (IntersectionObserver).
 * El ocultamiento inicial vive en CSS (`.reveal`, solo activo bajo `.js`), así que
 * sin JavaScript el contenido queda siempre visible. `prefers-reduced-motion` lo
 * neutraliza desde globals.css. Una sola vez: se desconecta tras revelar.
 */
export function Reveal({ as: Tag = 'div', delay, className, style, children, ...props }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      // Sin soporte de observer: revelar en el próximo frame (evita setState síncrono).
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const mergedStyle: CSSProperties | undefined =
    delay != null ? { ...style, transitionDelay: `${delay}ms` } : style;

  return (
    <Tag
      ref={ref}
      className={cn('reveal', visible && 'is-visible', className)}
      style={mergedStyle}
      {...props}
    >
      {children}
    </Tag>
  );
}
