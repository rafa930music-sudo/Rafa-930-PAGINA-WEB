# RAFA 930 · Revista de Barrio | Web Oficial (08930)

Plataforma oficial, revista interactiva, discografía 3D, galería editorial y estudio digital de **RAFA 930 (Rafael Moreno Román)** — desde La Mina, Sant Adrià de Besòs (Barcelona, `08930`).

- **URL de Producción (GitHub Pages):** [https://rafa930music-sudo.github.io/Rafa-930-PAGINA-WEB/](https://rafa930music-sudo.github.io/Rafa-930-PAGINA-WEB/)
- **Estudio Web:** [930 Digital](https://rafa930music-sudo.github.io/930-Digital/)
- **Spotify Oficial:** [RAFA 930 en Spotify](https://open.spotify.com/artist/2YyY3BFuxnqeYXlupNRcng)
- **YouTube Oficial:** [@rafa_930](https://youtube.com/@rafa_930)
- **Instagram Oficial:** [@rafa930_oficial](https://instagram.com/rafa930_oficial)

---

## Arquitectura & Características Incluidas

1. **Escenarios 3D Interactivos (WebGL / Three.js) por sección:**
   - **Revista (Portada):** Burbujas cristalinas 3D flotantes con iluminación neón (`#ec4899` / `#3b82f6`).
   - **Discografía:** Mar sonoro 3D interactivo de ondas profundas sincronizado con el ratón.
   - **Galería Editorial (Incrife):** Rayos de luz volumétricos de estudio en claroscuro y polvo atmosférico.
   - **930 Digital, Presskit y Contacto:** Red geométrica 3D, anillos orbitales y constelación de señales.
2. **Catálogo Musical Actualizado (2023–2026):**
   - **Obras Destacadas:** *De Vuelta* (2026, con su portada oficial en el metro), *EP My World* (2025) y *La Vida Es Bella* (Álbum 2026).
   - **Cronología 2026:** *De Vuelta*, *Tú Aroma* (adelanto de *La Vida Es Bella*) y *Nose si estaré mañana*.
   - **Cronología 2025:** *EP My World*, *Un Amor Prohibido*, *Hago Dinero*, *Vive sueña en tu mundo*.
   - **Cronología 2024:** *Siento · Cambié · Algo Imposible · No Love* y *Te Quiero · Mi Destino · Pensándote · Una Mirada*.
3. **Integración de Contacto Real:**
   - Conectado directamente a **Formspree** (`https://formspree.io/f/xjgjonqv`), **WhatsApp directo** (`+34 671 59 18 14`) y correo electrónico (`rafa.930music@gmail.com`).
4. **Trilingüe (ES / CA / EN) + SEO & Google Knowledge Graph:**
   - Datos estructurados `Schema.org` (`Person`, `MusicGroup`, `MusicAlbum`, `MusicRecording`, `ProfessionalService`, `FAQPage`), `sitemap.xml`, `robots.txt` y `manifest.json` preconfigurados con rutas relativas (`base: './'`) compatibles al 100% con GitHub Pages.

---

## Cómo subirla y publicarla en GitHub Pages (Paso a Paso)

El proyecto ya incluye el flujo automático **GitHub Actions** en `.github/workflows/deploy.yml` y configuración de rutas relativas (`base: './'`).

### 1. Subir el código a tu repositorio de GitHub
Abre la terminal en la carpeta del proyecto y ejecuta:

```bash
git init
git add .
git commit -m "feat: lanzamiento web oficial RAFA 930 con De Vuelta y fondos 3D"
git branch -M main
git remote add origin https://github.com/rafa930music-sudo/Rafa-930-PAGINA-WEB.git
git push -u origin main --force
```

### 2. Activar GitHub Pages (Solo la primera vez)
1. Entra en tu repositorio en GitHub: `https://github.com/rafa930music-sudo/Rafa-930-PAGINA-WEB`
2. Ve a **Settings** (Configuración) → **Pages** (en el menú lateral izquierdo).
3. En **Build and deployment** → **Source**, selecciona **GitHub Actions**.
4. ¡Listo! Cada vez que hagas `git push`, GitHub compilará la web automáticamente con Vite y la publicará en:
   `https://rafa930music-sudo.github.io/Rafa-930-PAGINA-WEB/`

---

## Comandos para Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo (http://localhost:3000)
npm run dev

# Compilar versión de producción (genera la carpeta ./dist)
npm run build
```
