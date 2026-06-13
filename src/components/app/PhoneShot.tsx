'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';

type PhoneShotProps = {
  src: string;
  alt: string;
  className?: string;
  /** Usa carga eager para la captura principal del hero (LCP); sin fade-in. */
  priority?: boolean;
};

/** Captura de pantalla de móvil (portrait) con marco de pantalla sutil. */
export function PhoneShot({ src, alt, className, priority = false }: PhoneShotProps) {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  // Imágenes cacheadas pueden completar antes de montar: no perdemos el onLoad.
  useEffect(() => {
    if (!priority && ref.current?.complete) setLoaded(true);
  }, [priority]);

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      width={780}
      height={1733}
      loading={priority ? 'eager' : 'lazy'}
      onLoad={priority ? undefined : () => setLoaded(true)}
      className={cn(
        'h-auto w-full max-w-[260px] rounded-[2rem] border border-border shadow-xl shadow-black/10',
        !priority && 'phoneshot-fade',
        loaded && 'is-loaded',
        className,
      )}
    />
  );
}
