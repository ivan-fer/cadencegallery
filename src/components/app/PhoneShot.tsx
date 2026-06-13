import { cn } from '@/lib/cn';

type PhoneShotProps = {
  src: string;
  alt: string;
  className?: string;
  /** Usa carga eager para la captura principal del hero (LCP). */
  priority?: boolean;
};

/** Captura de pantalla de móvil (portrait) con marco de pantalla sutil. */
export function PhoneShot({ src, alt, className, priority = false }: PhoneShotProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={780}
      height={1768}
      loading={priority ? 'eager' : 'lazy'}
      className={cn(
        'h-auto w-full max-w-[260px] rounded-[2rem] border border-border shadow-xl shadow-black/10',
        className,
      )}
    />
  );
}
