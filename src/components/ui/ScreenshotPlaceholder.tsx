import { Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

type ScreenshotPlaceholderProps = {
  label: string;
  caption?: string;
  className?: string;
};

/**
 * Placeholder diseñado para imágenes que todavía no existen (capturas de apps).
 * Caja con tinte de marca + etiqueta; se reemplaza por la imagen real más adelante.
 */
export function ScreenshotPlaceholder({ label, caption, className }: ScreenshotPlaceholderProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-gradient-to-br from-magenta/5 via-surface to-morado/5 p-6 text-center',
        className,
      )}
    >
      <ImageIcon className="size-6 text-text-subtle" aria-hidden="true" />
      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
        {label}
      </span>
      {caption && <span className="text-xs text-text-subtle">{caption}</span>}
    </div>
  );
}
