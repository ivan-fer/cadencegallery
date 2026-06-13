// One-off: optimiza las capturas fuente (design/screenshots, 1080×2400) a WebP
// servibles en public/screenshots/ a 780px de ancho (manteniendo el aspecto 9:20).
// Solo se incluyen las capturas limpias elegidas para el sitio. Ejecutar:
//   node scripts/build-screenshots.mjs
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = resolve(root, 'design/screenshots');
const OUT = resolve(root, 'public/screenshots');
const WIDTH = 780; // 9:20 → alto 1733; 3× sobre el render máximo (max-w-[260px])

const MAP = {
  // Metronome — los siete temas (Neon en parado y en marcha)
  'metronome_neon_1.jpg': 'metronome-neon.webp',
  'metronome_neon_2.jpg': 'metronome-neon-playing.webp',
  'metronome_cyber.jpg': 'metronome-cyber.webp',
  'metronome_chrome.jpg': 'metronome-chrome.webp',
  'metronome_material.jpg': 'metronome-material.webp',
  'metronome_neon_light.jpg': 'metronome-neon-light.webp',
  'metronome_zen.jpg': 'metronome-zen.webp',
  // Polypulse — solo capturas sin el bug de codificación de texto
  'polypulse_3_ploys.jpg': 'polypulse-poly.webp',
  'polypulse_play.jpg': 'polypulse-player.webp',
  'polypulse_mixer.jpg': 'polypulse-mixer.webp',
  'polypulse_coach.jpg': 'polypulse-coach.webp',
  'polypulse_voice_selector_dialog.jpg': 'polypulse-voices.webp',
};

for (const [from, to] of Object.entries(MAP)) {
  await sharp(resolve(SRC, from))
    .resize({ width: WIDTH })
    .webp({ quality: 82 })
    .toFile(resolve(OUT, to));
  console.log('✓', to);
}
console.log(`Listo: ${Object.keys(MAP).length} capturas → public/screenshots/`);
