import { clsx, type ClassValue } from 'clsx';

/** Une clases condicionalmente (wrapper fino sobre clsx). */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
