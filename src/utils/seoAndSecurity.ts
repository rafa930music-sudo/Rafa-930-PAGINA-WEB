import { Language, ScreenId } from '../types';

/**
 * Security utilities: input sanitization, anti-bot rate limiting, human timing verification,
 * external link tabnabbing protection, and drag-and-drop script injection prevention.
 */
export function sanitizeUserInput(input: string, maxLength = 800): string {
  if (!input) return '';
  return input
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, '') // Strip control & unprintable chars
    .replace(/[<>'"&`]/g, (char) => {
      // Escape HTML sensitive chars to prevent XSS / script payload injection
      const map: Record<string, string> = {
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
        '&': '&amp;',
        '`': '&#96;',
      };
      return map[char] || '';
    })
    .replace(/(?:javascript|data|vbscript|file):/gi, '') // Strip dangerous protocols
    .replace(/on\w+\s*=/gi, '') // Strip inline event handlers (onload, onerror, onclick)
    .replace(/(__proto__|constructor|prototype)/gi, '') // Prevent prototype pollution strings
    .replace(/(?:union\s+select|insert\s+into|drop\s+table|exec\s*\(|--|\/\*|\*\/)/gi, '') // Strip SQL tokens
    .trim()
    .slice(0, maxLength);
}

export function isValidEmail(email: string): boolean {
  const clean = email.trim();
  // RFC 5322 compatible defensive regex with length limit
  return (
    clean.length <= 120 &&
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(
      clean
    )
  );
}

export function isValidPhone(phone: string): boolean {
  if (!phone.trim()) return true; // Optional field
  return /^[+\d\s().-]{6,25}$/.test(phone.trim());
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
 * 2. Enforces rel="noopener noreferrer" and referrerpolicy="strict-origin-when-cross-origin" on all target="_blank" links
 * 3. Nullifies window.opener reference on external navigation
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
      target.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
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
      title: 'RAFA 930 | Música, Fotografia & Web',
      description:
        'Web oficial de RAFA 930 (Rafael Moreno Román): música urbana des de La Mina (Barcelona), discografia, fotografia editorial i desenvolupament web 930 Digital.',
      keywords:
        'RAFA 930, Rafael Moreno Román, música urbana Barcelona, La Mina, Sant Adrià de Besòs, 08930, rap conscient, fotografia editorial, Incrife, 930 Digital',
      locale: 'ca_ES',
    },
    es: {
      title: 'RAFA 930 | Música, Fotografía & Web',
      description:
        'Web oficial de RAFA 930 (Rafael Moreno Román): música urbana desde La Mina (Barcelona), discografía, fotografía editorial y desarrollo web 930 Digital.',
      keywords:
        'RAFA 930, Rafael Moreno Román, música urbana Barcelona, La Mina, Sant Adrià de Besòs, 08930, rap consciente, fotografía editorial, Incrife, 930 Digital',
      locale: 'es_ES',
    },
    en: {
      title: 'RAFA 930 | Music, Photography & Web',
      description:
        'Official website of RAFA 930 (Rafael Moreno Román): urban music from La Mina (Barcelona), discography, editorial photography, and 930 Digital web studio.',
      keywords:
        'RAFA 930, Rafael Moreno Román, Barcelona urban music, conscious rap, editorial portrait photography, Incrife, 930 Digital web studio',
      locale: 'en_US',
    },
  },
  discografia: {
    ca: {
      title: 'Discografia Oficial · RAFA 930 (2023–2026)',
      description:
        'Escolta el catàleg musical oficial de RAFA 930: De Vuelta, Nose si estaré mañana, Tú Aroma, EP My World, La Vida Es Bella, Un Amor Prohibido, Romeo y Julieta, Hago Dinero i més.',
      keywords:
        'Discografia RAFA 930, De Vuelta, Nose si estaré mañana, EP My World, La Vida Es Bella, Tú Aroma, Un Amor Prohibido, Hago Dinero, Romeo y Julieta, Vive sueña en tu mundo',
      locale: 'ca_ES',
    },
    es: {
      title: 'Discografía Oficial · RAFA 930 (2023–2026)',
      description:
        'Escucha el catálogo musical oficial de RAFA 930: De Vuelta, Nose si estaré mañana, Tú Aroma, EP My World, La Vida Es Bella, Un Amor Prohibido, Romeo y Julieta, Hago Dinero y más.',
      keywords:
        'Discografía RAFA 930, De Vuelta, Nose si estaré mañana, EP My World, La Vida Es Bella, Tú Aroma, Un Amor Prohibido, Hago Dinero, Romeo y Julieta, Vive sueña en tu mundo',
      locale: 'es_ES',
    },
    en: {
      title: 'Official Discography · RAFA 930 (2023–2026)',
      description:
        'Stream the official music catalog of RAFA 930: De Vuelta, Nose si estaré mañana, Tú Aroma, EP My World, La Vida Es Bella, Un Amor Prohibido, Romeo and Juliet, Hago Dinero and more.',
      keywords:
        'RAFA 930 discography, De Vuelta, Nose si estaré mañana, EP My World, La Vida Es Bella, Tú Aroma, Un Amor Prohibido, Hago Dinero, Romeo y Julieta',
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
      title: 'Booking & Contractació Directa · RAFA 930',
      description:
        'Canal directe per a contractacions de concerts, col·laboracions i projectes a mida de RAFA 930.',
      keywords:
        'Booking RAFA 930, contractació concerts, música urbana Barcelona',
      locale: 'ca_ES',
    },
    es: {
      title: 'Booking & Contratación Directa · RAFA 930',
      description:
        'Canal directo para contrataciones de conciertos, colaboraciones y proyectos a medida de RAFA 930.',
      keywords:
        'Booking RAFA 930, contratación conciertos, música urbana Barcelona',
      locale: 'es_ES',
    },
    en: {
      title: 'Booking & Direct Management · RAFA 930',
      description:
        'Direct channel for booking concerts, collaborations, and custom projects with RAFA 930.',
      keywords:
        'Booking RAFA 930, hire urban artist Barcelona, concerts booking',
      locale: 'en_US',
    },
  },

  enllacos: {
    ca: {
      title: 'Enllaços Oficials & Spotify · RAFA 930',
      description:
        'Tots els enllaços oficials de RAFA 930: perfil de Spotify, videoclips a YouTube, Instagram, presskit i contractació.',
      keywords:
        'Enllaços RAFA 930, Spotify oficial, YouTube, Instagram, música urbana Barcelona',
      locale: 'ca_ES',
    },
    es: {
      title: 'Enlaces Oficiales & Spotify · RAFA 930',
      description:
        'Todos los enlaces oficiales de RAFA 930: perfil de Spotify, videoclips en YouTube, Instagram, presskit y contratación.',
      keywords:
        'Enlaces RAFA 930, Spotify oficial, YouTube, Instagram, música urbana Barcelona',
      locale: 'es_ES',
    },
    en: {
      title: 'Official Links & Spotify · RAFA 930',
      description:
        'All official links for RAFA 930: Spotify artist profile, YouTube music videos, Instagram, presskit, and booking.',
      keywords:
        'RAFA 930 links, official Spotify, YouTube, Instagram, Barcelona urban music',
      locale: 'en_US',
    },
  },
  redes: {
    ca: {
      title: 'Redes Socials & Canals Oficials · RAFA 930',
      description:
        'Tots els perfils oficials de RAFA 930: Spotify, YouTube, Instagram, TikTok, Deezer, Apple Music i canal de booking.',
      keywords:
        'Redes RAFA 930, Instagram rafa930_oficial, TikTok, Spotify oficial, YouTube',
      locale: 'ca_ES',
    },
    es: {
      title: 'Redes Sociales & Canales Oficiales · RAFA 930',
      description:
        'Todos los perfiles oficiales de RAFA 930: Spotify, YouTube, Instagram, TikTok, Deezer, Apple Music y canal de booking.',
      keywords:
        'Redes RAFA 930, Instagram rafa930_oficial, TikTok, Spotify oficial, YouTube',
      locale: 'es_ES',
    },
    en: {
      title: 'Official Social Networks & Channels · RAFA 930',
      description:
        'All official profiles for RAFA 930: Spotify, YouTube, Instagram, TikTok, Deezer, Apple Music and booking channel.',
      keywords:
        'RAFA 930 social networks, Instagram rafa930_oficial, TikTok, official Spotify, YouTube',
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
  conciertos: {
    ca: {
      title: 'Concerts, Directes & Gira 2026 · RAFA 930',
      description:
        'Pròximament: concerts en directe, xous d’escenari i contractació oficial de RAFA 930 des de La Mina (Sant Adrià de Besòs, Barcelona).',
      keywords:
        'Concerts RAFA 930, directes música urbana Barcelona, gira 2026, contractar concert rap',
      locale: 'ca_ES',
    },
    es: {
      title: 'Conciertos, Directos & Gira 2026 · RAFA 930',
      description:
        'Próximamente: conciertos en directo, shows de escenario y contratación oficial de RAFA 930 desde La Mina (Sant Adrià de Besòs, Barcelona).',
      keywords:
        'Conciertos RAFA 930, directos música urbana Barcelona, gira 2026, contratar concierto rap',
      locale: 'es_ES',
    },
    en: {
      title: 'Concerts, Live Shows & Tour 2026 · RAFA 930',
      description:
        'Coming soon: live concerts, stage shows, and official booking for RAFA 930 from La Mina (Sant Adrià de Besòs, Barcelona).',
      keywords:
        'RAFA 930 concerts, live urban music Barcelona, tour 2026, book live rap show',
      locale: 'en_US',
    },
  },
  presskit: {
    ca: {
      title: 'Press Kit Oficial & Rider Tècnic · RAFA 930',
      description:
        'Electronic Press Kit (EPK), biografia oficial, rider d’escenari i recursos de premsa de RAFA 930.',
      keywords:
        'Press Kit RAFA 930, EPK música urbana, rider tècnic, biografia Rafael Moreno Román',
      locale: 'ca_ES',
    },
    es: {
      title: 'Press Kit Oficial & Rider Técnico · RAFA 930',
      description:
        'Electronic Press Kit (EPK), biografía oficial, rider de escenario y recursos de prensa de RAFA 930.',
      keywords:
        'Press Kit RAFA 930, EPK música urbana, rider técnico, biografía Rafael Moreno Román',
      locale: 'es_ES',
    },
    en: {
      title: 'Official Press Kit & Technical Rider · RAFA 930',
      description:
        'Electronic Press Kit (EPK), official artist biography, stage rider, and press assets for RAFA 930.',
      keywords:
        'RAFA 930 press kit, EPK urban music, stage technical rider, biography Rafael Moreno Román',
      locale: 'en_US',
    },
  },
  home: {
    ca: {
      title: 'RAFA 930 | Música, Fotografia & Web',
      description:
        'Web oficial de RAFA 930 (Rafael Moreno Román): música urbana des de La Mina (Barcelona), discografia, fotografia editorial i desenvolupament web 930 Digital.',
      keywords:
        'RAFA 930, Rafael Moreno Román, música urbana Barcelona, La Mina, Sant Adrià de Besòs, 08930, rap conscient, fotografia editorial, Incrife, 930 Digital',
      locale: 'ca_ES',
    },
    es: {
      title: 'RAFA 930 | Música, Fotografía & Web',
      description:
        'Web oficial de RAFA 930 (Rafael Moreno Román): música urbana desde La Mina (Barcelona), discografía, fotografía editorial y desarrollo web 930 Digital.',
      keywords:
        'RAFA 930, Rafael Moreno Román, música urbana Barcelona, La Mina, Sant Adrià de Besòs, 08930, rap consciente, fotografía editorial, Incrife, 930 Digital',
      locale: 'es_ES',
    },
    en: {
      title: 'RAFA 930 | Music, Photography & Web',
      description:
        'Official website of RAFA 930 (Rafael Moreno Román): urban music from La Mina (Barcelona), discography, editorial photography, and 930 Digital web studio.',
      keywords:
        'RAFA 930, Rafael Moreno Román, Barcelona urban music, conscious rap, editorial portrait photography, Incrife, 930 Digital web studio',
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
  return /bot|googlebot|bingbot|crawler|spider|robot|crawling|lighthouse|headless|facebookexternalhit|twitterbot|whatsapp|slackbot|applebot|gptbot|oai-searchbot|claudebot|perplexitybot|duckduckbot/i.test(
    ua
  );
}

export const OFFICIAL_SITE_URL = 'https://rafa930.com/';
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
    const cleanName = sanitizeUserInput(payload.name, 100);
    const cleanEmail = sanitizeUserInput(payload.email, 120);
    const cleanPhone = sanitizeUserInput(payload.phone || '', 25);
    const cleanType = sanitizeUserInput(payload.inquiryType, 50);
    const cleanBudget = sanitizeUserInput(payload.estimatedBudget || '', 50);
    const cleanMessage = sanitizeUserInput(payload.message, 1000);
    const cleanSource = sanitizeUserInput(payload.sourceScreen, 80);

    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: `[RAFA 930 Web · ${cleanType.toUpperCase()}] Nueva solicitud de ${cleanName}`,
        Nombre: cleanName,
        email: cleanEmail,
        Telefono_WhatsApp: cleanPhone || 'No especificado',
        Area_Proyecto: cleanType,
        Presupuesto_Estimado: cleanBudget || 'A medida / Consultar',
        Mensaje: cleanMessage,
        Origen_Formulario: cleanSource,
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
  setMetaTag('meta[name="DC.title"]', 'content', meta.title);
  setMetaTag('meta[name="DC.description"]', 'content', meta.description);
  setMetaTag('meta[property="og:title"]', 'content', meta.title);
  setMetaTag('meta[property="og:description"]', 'content', meta.description);
  setMetaTag('meta[property="og:locale"]', 'content', meta.locale);
  setMetaTag('meta[name="twitter:title"]', 'content', meta.title);
  setMetaTag('meta[name="twitter:description"]', 'content', meta.description);

  const canonicalUrl =
    screen === 'revista' ? OFFICIAL_SITE_URL : `${OFFICIAL_SITE_URL}#${screen}`;
  setMetaTag('link[rel="canonical"]', 'href', canonicalUrl);
  setMetaTag('meta[property="og:url"]', 'content', canonicalUrl);
  setMetaTag('meta[name="twitter:url"]', 'content', canonicalUrl);
}

