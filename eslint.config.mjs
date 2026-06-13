import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      // El sitio es static export con `images.unoptimized`: next/image no aporta
      // optimización aquí. Usamos <img> plano para los assets de marca (SVG) y el
      // swap claro/oscuro por clase. Decisión documentada en CLAUDE.md §6.
      '@next/next/no-img-element': 'off',
    },
  },
  {
    ignores: ['out/**', '.next/**', 'node_modules/**'],
  },
];

export default eslintConfig;
