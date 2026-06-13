import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// APIs de navegación conscientes del locale (prefijan el idioma activo).
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
