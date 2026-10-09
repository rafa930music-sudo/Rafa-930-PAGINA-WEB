import { Language, ScreenId } from '../types';

/**
 * Security utilities: input sanitization, anti-bot rate limiting, human timing verification,
 * external link tabnabbing protection, and drag-and-drop script injection prevention.
 */
export function sanitizeUserInput(input: string, maxLength = 800): string {
  if (!input) return '';
  return input
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '') // Strip control chars
    .replace(/[<>]/g, '') // Strip HTML angle brackets to prevent XSS injection
    .replace(/(?:javascript|data|vbscript):/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/(__proto__|constructor|prototype)/gi, '') // Prevent prototype pollution strings
    .trim()
    .slice(0, maxLength);
}

export function isValidEmail(email: string): boolean {
  const clean = email.trim();
  return /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/.test(clean) && clean.length <= 120;
}

export function isValidPhone(phone: string): boolean {
  if (!phone.trim()) return true; // Optional field
  return /^[+\d\s()-]{6,22}$/.test(phone.trim());
}

const RATE_LIMIT_KEY = 'rafa930_last_submit_ts';
const COOLDOWN_MS = 25000; // 25 seconds anti-flood cooldown

export function checkSubmissionRateLimit(): { allowed: boolean; waitSeconds: number } {
  try {
    const last = Number(sessionStorage.getItem(RATE_LIMIT_KEY) || '0');
    const now = Date.now();
    if (now - last < COOLDOWN_MS) {
      return {
        allowed: false,
        waitSeconds: Math.ceil((COOLDOWN_MS - (now - last)) / 1000),
      };
    }
    sessionStorage.setItem(RATE_LIMIT_KEY, String(now));
    return { allowed: true, waitSeconds: 0 };
  } catch {
    return { allowed: true, waitSeconds: 0 };
  }
}

/**
 * Installs runtime DOM security guards:
 * 1. Prevents drag-and-drop file/script injection into the window
 * 2. Enforces rel="noopener noreferrer" on all target="_blank" external links
 */
export function installRuntimeSecurityGuards(): () => void {
  const preventDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const enforceSecureLinks = (e: MouseEvent) => {
    const target = (e.target as HTMLElement | null)?.closest?.('a');
    if (target && target.getAttribute('target') === '_blank') {
      const currentRel = target.getAttribute('rel') || '';
      if (!currentRel.includes('noopener') || !currentRel.includes('noreferrer')) {
        target.setAttribute('rel', 'noopener noreferrer');
      }
    }
  };

  window.addEventListener('dragover', preventDrop, { passive: false });
  window.addEventListener('drop', preventDrop, { passive: false });
  document.addEventListener('click', enforceSecureLinks, true);

  return () => {
    window.removeEventListener('dragover', preventDrop);
    window.removeEventListener('drop', preventDrop);
    document.removeEventListener('click', enforceSecureLinks, true);
  };
}

/**
 * Dynamic Multilingual SEO & OpenGraph Manager
 */
interface SeoMetadata {
  title: string;
  description: string;
  keywords: string;
  locale: string;
}

const SCREEN_SEO: Record<ScreenId, Record<Language, SeoMetadata>> = {
  revista: {
    ca: {
      title: 'RAFA 930 · Revista de Barrio | Música, Fotografia & Web',
      description:
        'Web oficial de RAFA 930 (Rafael Moreno Román): música urbana des de La Mina (Barcelona), discografia, fotografia editorial i desenvolupament web 930 Digital.',
      keywords:
        'RAFA 930, Rafael Moreno Román, música urbana Barcelona, La Mina, Sant Adrià de Besòs, 08930, rap conscient, fotografia editorial, Incrife, 930 Digital',
      locale: 'ca_ES',
    },
    es: {
      title: 'RAFA 930 · Revista de Barrio | Música, Fotografía & Web',
      description:
        'Web oficial de RAFA 930 (Rafael Moreno Román): música urbana desde La Mina (Barcelona), discografía, fotografía editorial y desarrollo web 930 Digital.',
      keywords:
        'RAFA 930, Rafael Moreno Román, música urbana Barcelona, La Mina, Sant Adrià de Besòs, 08930, rap consciente, fotografía editorial, Incrife, 930 Digital',
      locale: 'es_ES',
    },
    en: {
      title: 'RAFA 930 · Revista de Barrio | Music, Photography & Web',
      description:
        'Official website of RAFA 930 (Rafael Moreno Román): urban music from La Mina (Barcelona), discography, editorial photography, and 930 Digital web studio.',
      keywords:
        'RAFA 930, Rafael Moreno Román, Barcelona urban music, conscious rap, editorial portrait photography, Incrife, 930 Digital web studio',
      locale: 'en_US',
    },
  },
  discografia: {
    ca: {
      title: 'Discografia & Lletres Oficials · RAFA 930 (2023–2026)',
      description:
        'Escolta el catàleg musical oficial de RAFA 930: De Vuelta, Nose si estaré mañana, Tú Aroma, EP My World, La Vida Es Bella, Un Amor Prohibido i lletres completes.',
      keywords:
        'Discografia RAFA 930, De Vuelta, Nose si estaré mañana, EP My World, La Vida Es Bella, Tú Aroma, Un Amor Prohibido, Hago Dinero, Vive sueña en tu mundo',
      locale: 'ca_ES',
    },
    es: {
      title: 'Discografía & Letras Oficiales · RAFA 930 (2023–2026)',
      description:
        'Escucha el catálogo musical oficial de RAFA 930: De Vuelta, Nose si estaré mañana, Tú Aroma, EP My World, La Vida Es Bella, Un Amor Prohibido y letras completas.',
      keywords:
        'Discografía RAFA 930, De Vuelta, Nose si estaré mañana, EP My World, La Vida Es Bella, Tú Aroma, Un Amor Prohibido, Hago Dinero, Vive sueña en tu mundo',
      locale: 'es_ES',
    },
    en: {
      title: 'Official Discography & Lyrics · RAFA 930 (2023–2026)',
      description:
        'Stream the official music catalog of RAFA 930: De Vuelta, Nose si estaré mañana, Tú Aroma, EP My World, La Vida Es Bella, Un Amor Prohibido, and full lyrics.',
      keywords:
        'RAFA 930 discography, De Vuelta, Nose si estaré mañana, EP My World, La Vida Es Bella, Tú Aroma, Un Amor Prohibido, Hago Dinero',
      locale: 'en_US',
    },
  },
  galeria: {
    ca: {
      title: 'Arxiu Fotogràfic & Direcció d’Art · RAFA 930 Barcelona',
      description:
        'Portfoli de fotografia editorial, retrat d’autor en blanc i negre, moda urbana i arxiu documental per RAFA 930 i Incrife a Barcelona.',
      keywords:
        'Fotografia editorial Barcelona, retrat blanc i negre, moda urbana streetwear, Incrife, RAFA 930 fotografia',
      locale: 'ca_ES',
    },
    es: {
      title: 'Archivo Fotográfico & Dirección de Arte · RAFA 930',
      description:
        'Portfolio de fotografía editorial, retrato de autor en blanco y negro, moda urbana y archivo documental por RAFA 930 e Incrife en Barcelona.',
      keywords:
        'Fotografía editorial Barcelona, retrato blanco y negro, moda urbana streetwear, Incrife, RAFA 930 fotografía',
      locale: 'es_ES',
    },
    en: {
      title: 'Photography Archive & Art Direction · RAFA 930',
      description:
        'Editorial photography portfolio, monochrome auteur portraits, urban streetwear fashion, and documentary archive by RAFA 930 and Incrife.',
      keywords:
        'Barcelona editorial photography, monochrome portrait, urban fashion photography, Incrife, RAFA 930',
      locale: 'en_US',
    },
  },
  serveis: {
    ca: {
      title: 'Serveis Creatius, Tarifes & Pressupost · RAFA 930',
      description:
        'Contracta producció musical, sessions de fotografia editorial o desenvolupament web a mida amb la calculadora de pressupost de RAFA 930.',
      keywords:
        'Serveis musicals Barcelona, sessió fotogràfica preu, desenvolupament web artistes, 930 Digital Studio, pressupost online',
      locale: 'ca_ES',
    },
    es: {
      title: 'Servicios Creativos, Tarifas & Presupuesto · RAFA 930',
      description:
        'Contrata producción musical, sesiones de fotografía editorial o desarrollo web a medida con la calculadora de presupuesto de RAFA 930.',
      keywords:
        'Servicios musicales Barcelona, sesión fotográfica precio, desarrollo web artistas, 930 Digital Studio, presupuesto online',
      locale: 'es_ES',
    },
    en: {
      title: 'Creative Services, Rates & Quote Calculator · RAFA 930',
      description:
        'Book music production, editorial photography sessions, or custom web development using RAFA 930’s interactive quote calculator.',
      keywords:
        'Barcelona music production, editorial photoshoot rates, artist web development, 930 Digital Studio',
      locale: 'en_US',
    },
  },
  presskit: {
    ca: {
      title: 'Presskit Oficial (EPK) & Rider Tècnic 2026 · RAFA 930',
      description:
        'Dossier de premsa oficial (EPK), biografia executiva i Rider Tècnic d’escenari de RAFA 930 per a promotors, sales i festivals.',
      keywords:
        'Presskit RAFA 930, EPK artista urbà, Rider tècnic concert, contractació concerts Barcelona',
      locale: 'ca_ES',
    },
    es: {
      title: 'Presskit Oficial (EPK) & Rider Técnico 2026 · RAFA 930',
      description:
        'Dossier de prensa oficial (EPK), biografía ejecutiva y Rider Técnico de escenario de RAFA 930 para promotores, salas y festivales.',
      keywords:
        'Presskit RAFA 930, EPK artista urbano, Rider técnico concierto, contratación conciertos Barcelona',
      locale: 'es_ES',
    },
    en: {
      title: 'Official Press Kit (EPK) & Stage Rider 2026 · RAFA 930',
      description:
        'Official Electronic Press Kit (EPK), executive biography, and stage technical rider of RAFA 930 for promoters, venues, and festivals.',
      keywords:
        'RAFA 930 EPK, electronic press kit, live technical rider, urban artist booking Barcelona',
      locale: 'en_US',
    },
  },
  contacte: {
    ca: {
      title: 'Contacte Directe & Booking Oficial · RAFA 930 Barcelona',
      description:
        'Contacta directament amb RAFA 930 per a contractació d’espectacles en viu, col·laboracions musicals, sessions fotogràfiques o projectes web.',
      keywords:
        'Contacte RAFA 930, booking concerts Barcelona, rafa.930music@gmail.com, contractar RAFA 930',
      locale: 'ca_ES',
    },
    es: {
      title: 'Contacto Directo & Booking Oficial · RAFA 930 Barcelona',
      description:
        'Contacta directamente con RAFA 930 para contratación de shows en directo, colaboraciones musicales, sesiones fotográficas o proyectos web.',
      keywords:
        'Contacto RAFA 930, booking conciertos Barcelona, rafa.930music@gmail.com, contratar RAFA 930',
      locale: 'es_ES',
    },
    en: {
      title: 'Direct Contact & Official Booking · RAFA 930 Barcelona',
      description:
        'Contact RAFA 930 directly for live show bookings, musical collaborations, editorial photography sessions, or web development projects.',
      keywords:
        'Contact RAFA 930, live booking Barcelona, rafa.930music@gmail.com, book RAFA 930',
      locale: 'en_US',
    },
  },
  legal: {
    ca: {
      title: 'Avís Legal, Privacitat RGPD & Crèdits · RAFA 930',
      description:
        'Informació jurídica oficial de RAFA 930: Avís Legal LSSI-CE, Política de Privacitat RGPD, Política de Cookies i Crèdits Artístics.',
      keywords: 'Avís legal RAFA 930, Privacitat RGPD, LSSI-CE, Crèdits oficials 930 Records',
      locale: 'ca_ES',
    },
    es: {
      title: 'Aviso Legal, Privacidad RGPD & Créditos · RAFA 930',
      description:
        'Información jurídica oficial de RAFA 930: Aviso Legal LSSI-CE, Política de Privacidad RGPD, Política de Cookies y Créditos Artísticos.',
      keywords: 'Aviso legal RAFA 930, Privacidad RGPD, LSSI-CE, Créditos oficiales 930 Records',
      locale: 'es_ES',
    },
    en: {
      title: 'Legal Notice, GDPR Privacy Policy & Credits · RAFA 930',
      description:
        'Official legal documentation for RAFA 930: LSSI-CE Legal Notice, EU GDPR Privacy Policy, Cookie & Storage Policy, and Artistic Credits.',
      keywords: 'RAFA 930 legal notice, GDPR privacy policy, artistic credits 930 Records',
      locale: 'en_US',
    },
  },
};

function setMetaTag(selector: string, attribute: string, value: string) {
  const el = document.querySelector(selector);
  if (el) {
    el.setAttribute(attribute, value);
  }
}

export function isSearchCrawler(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  return /bot|googlebot|bingbot|crawler|spider|robot|crawling|lighthouse|headless|facebookexternalhit|twitterbot|whatsapp|slackbot|applebot/i.test(
    ua
  );
}

export const OFFICIAL_SITE_URL = 'https://rafa930music-sudo.github.io/Rafa-930-PAGINA-WEB/';
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xjgjonqv';

export interface FormspreePayload {
  name: string;
  email: string;
  phone?: string;
  inquiryType: string;
  message: string;
  sourceScreen: string;
  language: Language;
  estimatedBudget?: string;
}

export async function submitToFormspree(
  payload: FormspreePayload
): Promise<{ ok: boolean; error?: string }> {
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: `[RAFA 930 Web · ${payload.inquiryType.toUpperCase()}] Nueva solicitud de ${payload.name}`,
        Nombre: payload.name,
        email: payload.email,
        Telefono_WhatsApp: payload.phone || 'No especificado',
        Area_Proyecto: payload.inquiryType,
        Presupuesto_Estimado: payload.estimatedBudget || 'A medida / Consultar',
        Mensaje: payload.message,
        Origen_Formulario: payload.sourceScreen,
        Idioma: payload.language.toUpperCase(),
      }),
    });

    if (response.ok) {
      return { ok: true };
    }
    const errData = await response.json().catch(() => null);
    return {
      ok: false,
      error: errData?.error || `Error HTTP ${response.status}`,
    };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Network error',
    };
  }
}

export function applyDynamicSeo(screen: ScreenId, language: Language) {
  const meta = SCREEN_SEO[screen]?.[language] || SCREEN_SEO.revista.es;
  document.title = meta.title;
  document.documentElement.lang = language;

  setMetaTag('meta[name="description"]', 'content', meta.description);
  setMetaTag('meta[name="keywords"]', 'content', meta.keywords);
  setMetaTag('meta[property="og:title"]', 'content', meta.title);
  setMetaTag('meta[property="og:description"]', 'content', meta.description);
  setMetaTag('meta[property="og:locale"]', 'content', meta.locale);
  setMetaTag('meta[name="twitter:title"]', 'content', meta.title);
  setMetaTag('meta[name="twitter:description"]', 'content', meta.description);

  const canonicalUrl =
    screen === 'revista' ? OFFICIAL_SITE_URL : `${OFFICIAL_SITE_URL}#${screen}`;
  setMetaTag('link[rel="canonical"]', 'href', canonicalUrl);
  setMetaTag('meta[property="og:url"]', 'content', canonicalUrl);
}
