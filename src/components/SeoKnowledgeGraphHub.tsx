import React from 'react';
import { Language, ScreenId } from '../types';

interface SeoKnowledgeGraphHubProps {
  language: Language;
  onNavigate: (screen: ScreenId) => void;
}

/**
 * Crawlable Semantic Knowledge Hub for Googlebot & Search Engine Indexing.
 * Ensures that 100% of RAFA 930's biography, discography, full lyrics,
 * editorial photography archive, creative services, EPK technical rider,
 * and contact details remain present in the DOM across all SPA tabs.
 */
export const SeoKnowledgeGraphHub: React.FC<SeoKnowledgeGraphHubProps> = ({
  language,
  onNavigate,
}) => {
  return (
    <aside
      id="seo-knowledge-graph-hub"
      aria-label="Archivo Documental Completo e Índice de Contenidos Oficial de RAFA 930 (Rafael Moreno Román)"
      className="sr-only hidden"
      hidden
      aria-hidden="true"
      lang={language}
    >
      <article itemScope itemType="https://schema.org/Person">
        <h2>
          RAFA 930 (Rafael Moreno Román) — Artista de Música Urbana, Fotógrafo Editorial y Desarrollador Web en Barcelona (Código Postal 08930)
        </h2>
        <p itemProp="description">
          RAFA 930, cuyo nombre real es Rafael Moreno Román, es un artista independiente de música urbana,
          compositor de rap consciente y trap melódico, director de fotografía editorial en claroscuro y
          desarrollador web full-stack originario del barrio de La Mina, en Sant Adrià de Besòs (Código Postal 08930,
          Barcelona, Cataluña, España). Su proyecto une crónica de barrio, estética cinematográfica en blanco y negro
          junto al fotógrafo Incrife, y desarrollo de plataformas digitales a medida bajo el sello 930 Digital Studio.
        </p>

        <section aria-label="Datos Biográficos y Identidad Oficial de RAFA 930">
          <h3>Ficha Biográfica Oficial de RAFA 930</h3>
          <ul>
            <li>Nombre artístico: <span itemProp="name">RAFA 930</span></li>
            <li>Nombre completo: <span itemProp="alternateName">Rafael Moreno Román</span></li>
            <li>Origen y sede: Barrio de La Mina, Sant Adrià de Besòs (08930), Barcelona, España</li>
            <li>Disciplinas: Música Urbana, Rap Consciente, Trap Melódico, Fotografía Editorial de Retrato y Moda, Desarrollo Web Frontend & UX/UI</li>
            <li>Sello y estudio creativo: 930 Records &amp; 930 Digital Studio</li>
            <li>Dirección de fotografía principal: Incrife &amp; RAFA 930</li>
            <li>Web Oficial de RAFA 930: <a href="https://rafa930music-sudo.github.io/Rafa-930-PAGINA-WEB/" itemProp="url">https://rafa930music-sudo.github.io/Rafa-930-PAGINA-WEB/</a></li>
            <li>Correo electrónico oficial de contratación y booking: <a href="mailto:rafa.930music@gmail.com" itemProp="email">rafa.930music@gmail.com</a></li>
            <li>Teléfono y WhatsApp directo de booking: <a href="tel:+34671591814" itemProp="telephone">+34 671 591 814</a></li>
            <li>Spotify Oficial: <a href="https://open.spotify.com/artist/2YyY3BFuxnqeYXlupNRcng" itemProp="sameAs">https://open.spotify.com/artist/2YyY3BFuxnqeYXlupNRcng</a></li>
            <li>YouTube Oficial: <a href="https://youtube.com/@rafa_930" itemProp="sameAs">https://youtube.com/@rafa_930</a></li>
            <li>Instagram Oficial: <a href="https://instagram.com/rafa930_oficial" itemProp="sameAs">https://instagram.com/rafa930_oficial</a></li>
            <li>Portfolio Digital 930: <a href="https://rafa930music-sudo.github.io/930-Digital/" itemProp="sameAs">https://rafa930music-sudo.github.io/930-Digital/</a></li>
          </ul>
        </section>

        <section aria-label="Discografía Oficial Completa y Letras de Canciones de RAFA 930 (2023-2026)">
          <h3>Discografía Oficial y Letras Completas de RAFA 930 (2023–2026)</h3>

          <article>
            <h4>1. Nose si estaré mañana — Single Oficial (2026) · RAFA 930</h4>
            <p>
              Lanzamiento principal 2026 de RAFA 930. Videoclip oficial disponible en YouTube (https://www.youtube.com/watch?v=WaV1KeSN5_4).
              Producción: 930 Records / Barcelona. Duración: 2:48. Género: Rap Consciente / Trap Melódico Urbano.
            </p>
            <blockquote>
              Letra oficial de Nose si estaré mañana (RAFA 930):
              No sé si estaré mañana, por eso hoy lo doy todo en cada barra.
              Entre bloques de cemento y miradas que callan, el código 930 nunca falla.
              Crecimos viendo la tormenta desde la ventana, convirtiendo cada herida en una melodía sana.
              Mamá reza por mí cuando salgo de madrugada, sabe que en la calle la suerte no regala nada.
            </blockquote>
          </article>

          <article>
            <h4>2. EP My World — Proyecto Conceptual (2025) · RAFA 930</h4>
            <p>
              Obra conceptual de 6 minutos y 35 segundos publicada en 2025 (https://www.youtube.com/watch?v=lCwhG67eijs).
              Un viaje introspectivo por el universo interior de Rafael Moreno Román desde el barrio de La Mina (08930).
            </p>
            <blockquote>
              Extracto de letra de EP My World (RAFA 930):
              Bienvenidos a mi mundo, donde el silencio pesa más que el oro.
              Cada cicatriz del barrio es parte de mi tesoro.
              No busco fama efímera ni luces de cartón, escribo con la sangre que bombea el corazón.
            </blockquote>
          </article>

          <article>
            <h4>3. La Vida Es Bella (Adelanto Oficial: Tú Aroma) — Álbum / Proyecto (2025–2026) · RAFA 930</h4>
            <p>
              Corte melódico e íntimo perteneciente al proyecto La Vida Es Bella de RAFA 930.
            </p>
            <blockquote>
              Extracto de letra de Tú Aroma — La Vida Es Bella (RAFA 930):
              Todavía queda tu aroma en el asiento de atrás, mientras Barcelona duerme y yo busco mi paz.
              La vida es bella aunque duela el caminar, aprendimos a volar sin despegar del arrabal.
            </blockquote>
          </article>

          <article>
            <h4>4. Un Amor Prohibido (ft. Daniela) — Single Colaborativo (2024) · RAFA 930</h4>
            <p>
              Colaboración vocal junto a Daniela publicada en 2024. Fusión de R&amp;B urbano, rap melódico y narrativa cinematográfica.
            </p>
          </article>

          <article>
            <h4>5. Hago Dinero — Single Urbano (2024) · RAFA 930</h4>
            <p>
              Lanzamiento de 2024 enfocado en la ética de trabajo, la independencia económica y la superación personal desde el código postal 08930.
            </p>
          </article>

          <article>
            <h4>6. Vive, sueña en tu mundo — Single Debut Oficial (24 de marzo de 2023) · RAFA 930</h4>
            <p>
              Primera referencia oficial publicada por RAFA 930 el 24 de marzo de 2023, marcando el inicio de su carrera musical en Barcelona.
            </p>
          </article>
        </section>

        <section aria-label="Archivo de Fotografía Editorial y Dirección de Arte en Barcelona">
          <h3>Galería de Fotografía Editorial, Retrato en Claroscuro y Moda Urbana (RAFA 930 &amp; Incrife)</h3>
          <p>
            Archivo visual comisariado en Barcelona y Sant Adrià de Besòs. Especializados en retrato editorial en blanco y negro
            de alto contraste (claroscuro), fotografía de moda urbana (streetwear), portadas de discos y reportaje documental de artista.
            Equipo técnico empleado: Cámaras Sony Alpha (A7III / A7IV) con ópticas fijas G Master (85mm f/1.4, 50mm f/1.2, 35mm f/1.4).
          </p>
        </section>

        <section aria-label="Servicios Creativos, Tarifas y Calculadora de Presupuesto Online — 930 Digital Studio">
          <h3>Catálogo de Servicios Profesionales y Tarifas de RAFA 930 en Barcelona</h3>
          <ul>
            <li>
              <strong>Producción Musical, Composición de Letras &amp; Colaboraciones (Feats) — Desde 150 €</strong>:
              Composición de letras originales, grabación de voces, versos o estribillos colaborativos (featuring), dirección vocal y entrega de stems WAV 24-bit.
            </li>
            <li>
              <strong>Sesión Fotográfica Editorial, Retrato de Autor &amp; Moda Urbana — Desde 120 €</strong>:
              Sesión en localización exterior de Barcelona o estudio con iluminación controlada, dirección de pose, revelado RAW y entrega en alta resolución para prensa, portadas de Spotify y redes.
            </li>
            <li>
              <strong>Desarrollo Web a Medida, Diseño UX/UI &amp; Presskits Digitales (930 Digital) — Desde 250 €</strong>:
              Diseño y programación de páginas web para artistas, marcas y creativos con React, TypeScript, reproductor de audio integrado, galería interactiva, optimización SEO para Google y diseño móvil tipo app.
            </li>
          </ul>
        </section>

        <section aria-label="Presskit Oficial EPK y Rider Técnico de Escenario 2026">
          <h3>Presskit Oficial (EPK) y Rider Técnico para Conciertos, Salas y Festivales</h3>
          <p>
            Especificaciones técnicas de directo de RAFA 930 para promotores culturales, festivales y salas de conciertos:
            Micrófono principal inalámbrico Shure SM58 / Beta 58A (cápsula dinámica cardioide), sistema de monitoreo In-Ear (IEM estéreo) más 2 monitores de cuña en escenario,
            sistema PA line array con cobertura uniforme y refuerzo de subgraves (808), reproducción de pistas por interfaz estéreo balanceada (XLR L/R + pista de claqueta),
            pantalla LED o proyector trasero HDMI 1080p/4K para visuales sincronizados, e iluminación DMX con paleta estética en lila (#a855f7), rosa (#ec4899), rojo carmesí (#e11d48) y azul eléctrico (#00d4ff).
          </p>
        </section>

        <nav aria-label="Índice de Navegación Directa de Secciones de RAFA 930">
          <h3>Mapa del Sitio Web Oficial de RAFA 930</h3>
          <ul>
            <li><a href="#revista" onClick={() => onNavigate('revista')}>Revista Editorial &amp; Biografía de RAFA 930</a></li>
            <li><a href="#discografia" onClick={() => onNavigate('discografia')}>Discografía Oficial, Reproductor &amp; Letras Completas</a></li>
            <li><a href="#galeria" onClick={() => onNavigate('galeria')}>Galería de Fotografía Editorial &amp; Archivo Visual</a></li>
            <li><a href="#serveis" onClick={() => onNavigate('serveis')}>Servicios Creativos, Tarifas &amp; Calculadora de Presupuesto</a></li>
            <li><a href="#presskit" onClick={() => onNavigate('presskit')}>Presskit Oficial (EPK) &amp; Rider Técnico 2026</a></li>
            <li><a href="#contacte" onClick={() => onNavigate('contacte')}>Contacto Directo, Booking &amp; Contratación</a></li>
            <li><a href="#legal" onClick={() => onNavigate('legal')}>Aviso Legal LSSI-CE, Privacidad RGPD &amp; Créditos Oficiales</a></li>
          </ul>
        </nav>
      </article>
    </aside>
  );
};
