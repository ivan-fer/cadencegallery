// One-off: genera la imagen Open Graph (1200×630) de marca en public/brand/og.png.
// Fondo berenjena + lockup centrado + URL en monospace. Ejecutar: node scripts/build-og.mjs
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const W = 1200;
const H = 630;
const BG = '#241826';
const SUBTLE = '#9A92A6';

const LOCKUP_W = 680;
const LOCKUP_H = Math.round((LOCKUP_W * 72) / 359.6); // mantiene el aspecto del lockup

const lockupSvg = readFileSync(resolve(root, 'public/brand/lockup_dark.svg'));
const lockupPng = await sharp(lockupSvg).resize(LOCKUP_W, LOCKUP_H).png().toBuffer();

const urlSvg = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="40">
     <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
       font-family="ui-monospace, Menlo, Consolas, monospace" font-size="26"
       letter-spacing="2" fill="${SUBTLE}">cadencegallery.com</text>
   </svg>`,
);

await sharp({ create: { width: W, height: H, channels: 4, background: BG } })
  .composite([
    { input: lockupPng, top: Math.round((H - LOCKUP_H) / 2) - 24, left: Math.round((W - LOCKUP_W) / 2) },
    { input: urlSvg, top: 410, left: 0 },
  ])
  .png()
  .toFile(resolve(root, 'public/brand/og.png'));

console.log('og.png generado:', `${W}x${H}`);
