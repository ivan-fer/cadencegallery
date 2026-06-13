# PROJECT BRIEF — Cadence Gallery (Sitio Web)

> Este documento es la especificación maestra del proyecto. No se modifica salvo cambios de alcance acordados explícitamente. Para estado operativo, decisiones técnicas y avance, ver `CLAUDE.md`.

---

## 1. Contexto

Cadence Gallery es una marca paraguas para una colección de aplicaciones musicales hechas con cuidado, dirigidas a músicos que buscan herramientas de práctica y entrenamiento. Actualmente la colección incluye dos apps:

- **Cadence Metronome**: app de metrónomo con audio preciso
- **Cadence Polypulse**: app de entrenamiento de polirritmias

Este proyecto es el **sitio web público de Cadence Gallery**: la "casa" de la marca, donde se presentan las apps, se publican las políticas legales necesarias para distribuir en App Store y Google Play, y se ofrecen guías de uso.

## 2. Objetivo del Sitio

Una landing minimalista, técnica y elegante que cumpla tres funciones:

1. **Presentar** Cadence Gallery y sus apps con identidad clara
2. **Alojar** la documentación legal necesaria para publicar en tiendas (política de privacidad, términos de uso)
3. **Documentar** uso de las apps con guías básicas

No es una plataforma compleja: es un sitio estático bien hecho que sirve como hub central de la marca.

## 3. Stack Técnico

### 3.1 Decisiones tomadas

- **Framework**: Next.js (App Router) con TypeScript
- **Estilos**: Tailwind CSS
- **Output**: static export (sin servidor, HTML/CSS/JS estático)
- **Internacionalización**: español e inglés desde el día 1, con español como idioma por defecto
- **Tema**: claro como default, con opción de tema oscuro (toggle persistente en localStorage)
- **Deploy**: Cloudflare Pages, conectado al repo de GitHub
- **Dominio**: `cadencegallery.com` (ya registrado en Cloudflare)

### 3.2 Dependencias principales sugeridas

- **next**: última versión estable
- **react** y **react-dom**: últimas versiones estables compatibles con la versión de Next
- **typescript**: última versión estable
- **tailwindcss**: v3 o v4 según lo que esté estable al momento de iniciar
- **next-intl** o **next-i18next**: para internacionalización (a evaluar cuál encaja mejor con App Router y static export)
- **lucide-react**: para iconos
- **clsx** o **classnames**: utilidades de clases (opcional)

Si proponés stack distinto, justificá. La preferencia es **simplicidad y mantenibilidad**, no features avanzados.

### 3.3 Configuración requerida

- ESLint y Prettier configurados
- `tsconfig.json` estricto
- Configuración de Next.js para **static export** (`output: 'export'`)
- Configuración de imágenes apropiada para static export (no usar `next/image` con optimización dinámica, usar imágenes estáticas optimizadas previamente)

## 4. Estructura del Sitio

### 4.1 Páginas

```
/                       — Home: presentación de Cadence Gallery + cards de las dos apps
/metronome              — Detalle de Cadence Metronome
/metronome/guides       — Guías de uso de Cadence Metronome
/polypulse              — Detalle de Cadence Polypulse
/polypulse/guides       — Guías de uso de Cadence Polypulse
/privacy                — Política de privacidad (común a Cadence Gallery)
/terms                  — Términos de uso (común)
```

Todas las páginas existen en español (`/es/...`) e inglés (`/en/...`). El idioma por defecto es español. Decidir si la URL raíz `/` redirige a `/es/` o si se sirve directo desde `/`, según convención de la librería i18n elegida.

### 4.2 Home — secciones

- **Hero**: nombre Cadence Gallery, tagline breve, símbolo de marca
- **Apps**: card por cada app con imagen, nombre, tagline corta, link a su página de detalle
- **Latest / Updates**: sección donde se anuncian novedades (nuevas versiones, nuevas apps en el futuro). Diseño simple: lista de items con fecha y descripción corta.
- **About / Contacto**: párrafo breve sobre el proyecto + email de contacto. No es una página separada por ahora, va al final del home.
- **Footer**: links a Privacy, Terms, repositorio GitHub si querés mostrarlo, copyright

### 4.3 Página de App — secciones

- **Hero**: nombre app, tagline, screenshot principal o ilustración
- **Descripción**: párrafos describiendo qué es la app y para quién
- **Features**: lista de características principales con iconos
- **Screenshots**: galería de capturas
- **Disponibilidad**: por ahora, mensaje claro de "Próximamente en App Store y Google Play" (sin links a tiendas porque no están publicadas). Cuando se publiquen, esta sección se actualizará con badges oficiales de descarga.
- **Link a Guides**: invitación a leer las guías de uso

### 4.4 Página de Guides

- Lista de guías disponibles para esa app
- Cada guía puede ser una página interna (`/metronome/guides/tap-tempo`) o secciones dentro de la misma página, según se decida

Para arrancar, alcanza con **2-3 guías mínimas por app**. Pueden agregarse más con el tiempo.

### 4.5 Políticas Legales (Privacy y Terms)

- Páginas simples con texto bien tipografiado
- Última fecha de actualización visible
- Email de contacto al final
- Versión en ambos idiomas

## 5. Identidad Visual

### 5.1 Paleta de colores

Extraída del brand kit existente (`design/brand/cadence_brand.html`):

| Nombre        | Hex      | Uso sugerido                                  |
| ------------- | -------- | --------------------------------------------- |
| Berenjena     | #241826  | Fondo de tema oscuro, textos sobre claro      |
| Morado        | #6E2C8F  | Acentos secundarios                           |
| Magenta       | #C42BA6  | Color de marca principal, CTAs               |
| Magenta claro | #E24FCB  | Variantes, hover states                       |
| Gallery       | #9A55C4  | Color de la palabra "gallery" en el logo     |
| Tinta         | #1A1320  | Texto principal sobre fondo claro             |

**Sugerencias adicionales necesarias** (proponé en el análisis previo):
- Color de fondo claro (no blanco puro probablemente, algo tipo `#FAFAFA` o un blanco con leve tinte cálido)
- Color de fondo de cards/secciones (sutil contraste con el fondo principal)
- Borders y dividers (gris muy claro)
- Color de texto secundario/muted

Definí una **escala neutra** completa (5-6 grises) coherente con el resto de la paleta para todo lo que no es color de marca.

### 5.2 Tipografía

- **Familia**: **Manrope** (Variable Font)
- **Archivo**: `design/brand/Manrope-VariableFont_wght.ttf` (incluir como font local con `next/font/local`)
- **Pesos a usar**: 400 (regular), 600 (semibold), 700 (bold), 800 (extrabold) — usar variable font features para optimizar
- **Fallback**: `system-ui, sans-serif`

Para tipografía monoespaciada (si se usa para versiones, fechas, código): usar la del sistema o agregar JetBrains Mono / IBM Plex Mono si encaja.

### 5.3 Tono Visual

- **Limpio y aireado**: mucho whitespace, no saturar de información
- **Técnico pero accesible**: la sensación es de "instrumento profesional", no de "fabricante de juguetes"
- **Coherente con las apps**: las apps son oscuras y minimalistas; el sitio es claro pero comparte la misma identidad tipográfica y de marca
- **Sin floritura innecesaria**: animaciones sutiles, transiciones suaves, nada estridente

### 5.4 Sistema de Tema (claro/oscuro)

- **Claro como default**: la landing arranca en claro
- **Toggle accesible**: botón discreto en el header (icono sol/luna)
- **Persistencia**: la elección se guarda en `localStorage`
- **Respeto a `prefers-color-scheme`**: en primera visita, si el usuario tiene preferencia de sistema marcada, respetarla
- **Implementar con Tailwind dark mode** (`class` strategy) para que sea fácil de mantener

## 6. Internacionalización (i18n)

### 6.1 Idiomas soportados

- Español (`es`) — idioma por defecto
- Inglés (`en`)

### 6.2 Estructura

Todos los textos del sitio deben venir de archivos de traducción, no hardcodeados. Estructura sugerida:

```
locales/
├── es/
│   ├── common.json        — textos compartidos (nav, footer, botones)
│   ├── home.json
│   ├── metronome.json
│   ├── polypulse.json
│   ├── privacy.json
│   └── terms.json
└── en/
    └── (misma estructura)
```

### 6.3 Switch de idioma

- Selector visible en el header
- Cambiar idioma debe mantener al usuario en la misma página equivalente (si está en `/es/metronome`, cambiar a EN lo lleva a `/en/metronome`)
- La elección se persiste

### 6.4 URLs

Convención sugerida (a confirmar según librería i18n elegida):
- `cadencegallery.com/` → redirige a `cadencegallery.com/es/`
- `cadencegallery.com/es/metronome`
- `cadencegallery.com/en/metronome`

Alternativa: idioma por defecto sin prefijo (`/metronome` = español, `/en/metronome` = inglés). Evaluar cuál es mejor para SEO.

## 7. Contenido

### 7.1 Extracción de contenido de las apps

Las descripciones de las apps deben generarse a partir de las carpetas de las apps existentes en disco. Específicamente:

- **Cadence Metronome**: `C:\Users\ivanf\Documents\ivan\cadence_metronome\cadence_metronome`
- **Cadence Polypulse**: `C:\Users\ivanf\Documents\ivan\cadence_polipulse\cadence_polypulse`

Ambas carpetas contienen `CLAUDE.md`, `docs/` con documentación de fases y arquitectura, y código fuente. **Leer estos materiales** para entender qué hace cada app, qué features tiene, qué la hace especial, y redactar:

- Tagline corta (una línea, máximo 8 palabras)
- Descripción corta (2-3 líneas)
- Descripción larga (2-3 párrafos)
- Lista de 5-8 features principales
- Posibles temas para guías iniciales

Una vez redactado en español, traducir al inglés. **No usar traducciones automáticas literales**: adaptar el tono y las expresiones idiomáticas si hace falta.

**Para revisión humana**: presentarme los textos generados antes de incorporarlos al sitio. Probablemente quiera ajustar matices.

### 7.2 Políticas legales (drafts a redactar por Claude Code)

Redactar drafts iniciales de:

**Política de privacidad**:
- Las apps no recolectan, almacenan ni transmiten datos personales
- Toda configuración se guarda localmente en el dispositivo
- No hay analytics, publicidad ni tracking de terceros
- No requieren conexión a internet
- Permisos del sistema utilizados (audio principalmente)
- Cláusula de cambios futuros y contacto

**Términos de uso**:
- App "as-is" sin garantías
- Limitación de responsabilidad (uso de auriculares, volumen, etc.)
- Propiedad intelectual
- Cláusula de cambios futuros y contacto

Ambas en español e inglés. Mantenerlas **simples y honestas**, no documentos legales pesados. Mi objetivo es cumplir con las tiendas, no escribir 20 páginas de jerga legal.

**Importante**: estos son drafts. Voy a revisarlos antes de publicarlos. No son asesoramiento legal vinculante.

### 7.3 Guías iniciales

Para cada app, redactar al menos 2-3 guías iniciales basadas en las features que existan. Ejemplos posibles:

**Cadence Metronome**:
- Cómo usar tap tempo
- Cómo configurar acentos
- Subdivisiones rítmicas explicadas

**Cadence Polypulse**:
- Qué es una polirritmia y cómo leerla
- Cómo usar el modo entrenamiento
- Cómo usar el mixer para volumen y paneo

El tono de las guías: **claro, breve, didáctico**. Cada guía idealmente cabe en una pantalla sin scroll excesivo. Imágenes/diagramas opcionales (no son obligatorios para arrancar).

## 8. Recursos Disponibles

### 8.1 Brand kit

Ubicación: `design/brand/` dentro del repo

- `favicon.ico` — favicon multi-tamaño
- `icons/` — variantes en PNG de varios tamaños (incluyendo apple-touch-icon, maskable)
- `cadence_brand.html` — referencia visual del brand kit (paleta, logos, archivos)
- `Manrope-VariableFont_wght.ttf` — tipografía oficial

Los archivos finales para el sitio (favicon, icons que el navegador descarga) deben copiarse o referenciarse desde `public/` siguiendo la convención de Next.js.

### 8.2 Screenshots

Ubicación: `design/screenshots/`

Por ahora pueden estar vacíos o con placeholders. **Trabajá con placeholders bien diseñados** (no usar Lorem Picsum genérico, mejor mockups con el color de marca o cajas grises sutiles indicando "Screenshot — Cadence Metronome — Pantalla principal"). Cuando tenga los screenshots reales, los reemplazo.

## 9. SEO y Performance

### 9.1 SEO

- Meta tags completos por página (title, description, og:image, twitter:card)
- Sitemap.xml
- robots.txt
- Canonical URLs
- Datos estructurados (JSON-LD) para "SoftwareApplication" en las páginas de las apps
- Versión correcta de `hreflang` para multi-idioma

### 9.2 Performance

- **Lighthouse score objetivo**: 95+ en todas las categorías
- Imágenes optimizadas (WebP, lazy loading nativo)
- CSS y JS minificados (Next.js lo hace automáticamente)
- Fuentes con `font-display: swap`
- Sin librerías pesadas innecesarias

## 10. Accesibilidad

- Contraste WCAG AA mínimo
- Navegación por teclado funcional en toda la UI
- `aria-label` en iconos sin texto
- `lang` en `<html>` actualizado según idioma activo
- Skip-link para saltar a contenido principal
- Toggle de tema accesible (no solo visual)
- Soporte de `prefers-reduced-motion` (deshabilitar animaciones si el usuario lo prefiere)

## 11. Lo que necesito antes de codear

**No empieces a programar todavía.** Primero:

1. **Leé** los siguientes recursos:
   - Este brief completo
   - `design/brand/cadence_brand.html` para ver la identidad visual
   - Estructura de `design/brand/` para inventariar qué assets hay disponibles
   - Las carpetas de las apps mencionadas en sección 7.1 (CLAUDE.md y docs/) para entender qué hacen

2. **Confirmá la información del brand kit**:
   - Listá qué archivos exactos hay en `design/brand/` y `design/brand/icons/`
   - Confirmá que la paleta y la fuente Manrope están donde se mencionan
   - Si hay archivos que no se mencionan en este brief y son relevantes, listamelos

3. **Proponé**:
   - **Stack técnico final** con versiones específicas
   - **Librería i18n a usar** (next-intl, next-i18next, o alternativa) con justificación
   - **Estructura de carpetas del proyecto Next.js**
   - **Convención de URLs para i18n** (prefijo siempre o no para el idioma default)
   - **Cómo manejar las imágenes** dado que es static export

4. **Plan de implementación incremental** en fases. Propuesta inicial:
   - **Fase 1**: Setup del proyecto Next.js + TypeScript + Tailwind + i18n + tema. Configuración base, layout principal, header con switch de idioma y tema, footer. Sin contenido todavía.
   - **Fase 2**: Sistema de tipografía y paleta de colores en Tailwind. Componentes base (botón, card, container, sección). Estilo visual establecido.
   - **Fase 3**: Home (hero, sección de apps, latest, contacto). Contenido placeholder en ambos idiomas.
   - **Fase 4**: Páginas de detalle de las apps. Extracción de contenido real desde las carpetas de las apps.
   - **Fase 5**: Políticas legales (privacy y terms). Drafts en ambos idiomas.
   - **Fase 6**: Guías iniciales (2-3 por app).
   - **Fase 7**: SEO, meta tags, sitemap, robots.txt, accesibilidad.
   - **Fase 8**: Setup de Cloudflare Pages, configuración del dominio, deploy a producción.
   - **Fase 9**: Pulido visual, animaciones sutiles, micro-interacciones.

   Si proponés otra granularidad, justificá.

5. **Identificá riesgos técnicos**:
   - i18n + static export: ¿algún tipo de fricción esperada?
   - Manrope variable font con `next/font/local` y static export: ¿funciona bien?
   - Tema claro/oscuro con SSG: evitar flash de tema incorrecto al cargar (FOUC)
   - Cualquier otro que detectes

6. **Preguntas** sobre cualquier ambigüedad.

Cuando me devuelvas todo eso, lo revisamos y arrancamos con la Fase 1.

## 12. Sobre el archivo CLAUDE.md

Una vez acordadas las decisiones iniciales y antes de empezar la Fase 1, creá un `CLAUDE.md` en la raíz del repo que sirva como memoria persistente del proyecto. Estructura sugerida (similar a la usada en las apps):

1. **Visión del proyecto**: qué es Cadence Gallery (sitio) en 3-4 líneas
2. **Stack técnico final** con versiones
3. **Reglas de arquitectura**: estructura de carpetas, convenciones de imports
4. **Convenciones de código**: naming, organización de archivos de traducción, dónde van los componentes, etc.
5. **Sistema de diseño**: paleta de colores con sus nombres semánticos, tipografía, espaciados base, etc.
6. **Decisiones técnicas tomadas** con justificación
7. **Estado actual**: qué fase está activa, qué se completó, qué sigue
8. **Cómo correr el proyecto**: comandos de dev, build, preview, deploy

Mantenelo actualizado al final de cada fase.

## 13. Reglas de Trabajo

- **Ante ambigüedad de requisitos, preguntar antes de asumir.**
- **Antes de cada fase, armar TODOs con TodoWrite** y esperar confirmación antes de codear.
- **Commits atómicos** con conventional commits al final de cada TODO significativo.
- **Verificar APIs y versiones** de paquetes externos consultando documentación actual, no asumir de memoria.
- **Validar visualmente** después de cada cambio significativo (correr `next dev` y verificar en navegador).
- **No publicar a producción** hasta que yo lo autorice explícitamente (Cloudflare Pages puede tener entornos preview que está bien usar).
- **Mantener el repositorio en buen estado**: sin warnings de lint, sin TypeScript errors, sin console.logs olvidados.

## 14. Estructura Esperada del Repo

```
cadencegallery/
├── .github/                          (opcional, para workflows futuros)
├── design/                           ← fuentes de diseño (NO se sirven)
│   ├── brand/
│   │   ├── icons/
│   │   ├── cadence_brand.html
│   │   ├── favicon.ico
│   │   └── Manrope-VariableFont_wght.ttf
│   └── screenshots/
├── docs/                             ← documentación del proyecto sitio
│   ├── PROJECT_BRIEF.md              ← este archivo
│   └── phases/
│       ├── phase-1.md
│       └── ...
├── public/                           ← assets que SÍ se sirven
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   └── (otros assets procesados)
├── src/
│   ├── app/                          (Next.js App Router)
│   ├── components/
│   ├── lib/
│   └── styles/
├── locales/                          ← textos de traducción
│   ├── es/
│   └── en/
├── CLAUDE.md
├── README.md
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.mjs
└── .gitignore
```

## 15. Aspiración Subjetiva

> El sitio debe transmitir que detrás hay un proyecto cuidado, hecho por alguien que se preocupa por los detalles. No debe parecer una landing genérica de SaaS, sino más cercano a las páginas de pequeños estudios independientes que hacen herramientas con personalidad (algunos ejemplos de tono: Panic.com, Ableton.com, Native Instruments). Sin imitarlos, sí compartir esa sensación de "esto no es producto masivo, es trabajo de autor".

Si en algún momento detectás algo que se siente genérico o templated, proponé alternativas.

## 16. Estado del Proyecto

Repo Git inicializado, vacío salvo `.git` y `README.md`. Carpeta `design/` con brand kit ya disponible. Dominio `cadencegallery.com` registrado en Cloudflare, sin DNS apuntando a nada todavía. Listo para empezar la fase de descubrimiento y planificación descrita en la sección 11.
