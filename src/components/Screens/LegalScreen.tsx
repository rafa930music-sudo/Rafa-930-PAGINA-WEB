import React, { useState, useEffect } from 'react';
import { Language, LegalDocId, ScreenId } from '../../types';
import {
  Scale,
  Shield,
  Cookie,
  Award,
  Printer,
  Copy,
  Check,
  ArrowLeft,
  FileText,
  Sparkles,
  CheckCircle2,
  Mail,
} from 'lucide-react';

interface LegalScreenProps {
  language: Language;
  initialTab?: LegalDocId;
  onNavigate: (screen: ScreenId) => void;
}

export const LegalScreen: React.FC<LegalScreenProps> = ({
  language,
  initialTab = 'aviso',
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<LegalDocId>(initialTab);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const tabs: {
    id: LegalDocId;
    number: string;
    label: Record<Language, string>;
    subtitle: Record<Language, string>;
    icon: React.FC<{ className?: string }>;
  }[] = [
    {
      id: 'aviso',
      number: '01',
      label: {
        ca: 'Avís Legal & LSSI-CE',
        es: 'Aviso Legal & LSSI-CE',
        en: 'Legal Notice & LSSI-CE',
      },
      subtitle: {
        ca: 'Titularitat, Propietat Intel·lectual i Reserva IA',
        es: 'Titularidad, Propiedad Intelectual y Reserva IA',
        en: 'Ownership, Intellectual Property & AI Reservation',
      },
      icon: Scale,
    },
    {
      id: 'privacitat',
      number: '02',
      label: {
        ca: 'Política de Privacitat RGPD',
        es: 'Política de Privacidad RGPD',
        en: 'GDPR Privacy Policy',
      },
      subtitle: {
        ca: 'Tractament de dades, finalitat i drets ARCO',
        es: 'Tratamiento de datos, finalidad y derechos ARCO',
        en: 'Data processing, purpose & ARCO rights',
      },
      icon: Shield,
    },
    {
      id: 'cookies',
      number: '03',
      label: {
        ca: 'Política de Cookies & Storage',
        es: 'Política de Cookies & Storage',
        en: 'Cookie & Storage Policy',
      },
      subtitle: {
        ca: 'Emmagatzematge local tècnic i preferències',
        es: 'Almacenamiento local técnico y preferencias',
        en: 'Technical local storage & preferences',
      },
      icon: Cookie,
    },
    {
      id: 'credits',
      number: '04',
      label: {
        ca: 'Crèdits & Fitxa Tècnica',
        es: 'Créditos & Ficha Técnica',
        en: 'Credits & Technical Sheet',
      },
      subtitle: {
        ca: 'Autoria musical, fotografia i desenvolupament',
        es: 'Autoría musical, fotografía y desarrollo',
        en: 'Musical authorship, photography & development',
      },
      icon: Award,
    },
  ];

  const handleCopyDoc = () => {
    const el = document.getElementById('legal-document-body');
    if (el) {
      navigator.clipboard.writeText(el.innerText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-8 sm:py-14 space-y-10">
      {/* Top Breadcrumb & Return Action */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#22222e] pb-6">
        <button
          type="button"
          onClick={() => onNavigate('revista')}
          className="touch-target-44 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#ec4899] text-xs font-mono text-[#ffffff] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#ec4899]" />
          <span>
            {language === 'ca'
              ? 'Tornar a la pàgina principal'
              : language === 'es'
              ? 'Volver a la página principal'
              : 'Back to main website'}
          </span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyDoc}
            className="touch-target-44 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#a855f7] text-xs font-mono text-[#a1a1b5] hover:text-[#ffffff] transition-colors"
          >
            {copied ? (
              <Check className="w-4 h-4 text-[#ec4899]" />
            ) : (
              <Copy className="w-4 h-4 text-[#a855f7]" />
            )}
            <span>
              {copied
                ? language === 'ca'
                  ? 'Copiat'
                  : language === 'es'
                  ? 'Copiado'
                  : 'Copied'
                : language === 'ca'
                ? 'Copiar document'
                : language === 'es'
                ? 'Copiar documento'
                : 'Copy document'}
            </span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="touch-target-44 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#ec4899] text-xs font-mono text-[#a1a1b5] hover:text-[#ffffff] transition-colors"
          >
            <Printer className="w-4 h-4 text-[#ec4899]" />
            <span className="hidden sm:inline">
              {language === 'ca'
                ? 'Imprimir / PDF'
                : language === 'es'
                ? 'Imprimir / PDF'
                : 'Print / PDF'}
            </span>
          </button>
        </div>
      </div>

      {/* Dedicated Legal Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#a1a1b5]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] shadow-[0_0_8px_#00d4ff]" />
          <span className="text-[#ec4899] font-semibold">
            {language === 'ca'
              ? 'APARTAT OFICIAL JURÍDIC & NORMATIU'
              : language === 'es'
              ? 'APARTADO OFICIAL JURÍDICO & NORMATIVO'
              : 'OFFICIAL LEGAL & REGULATORY SECTION'}
          </span>
          <span aria-hidden="true" className="text-[#00d4ff]">·</span>
          <span>LSSI-CE · RGPD UE 2016/679 · LOPDGDD 3/2018 · LPI</span>
        </div>

        <h1 className="font-['Cormorant_Garamond'] text-3xl sm:text-5xl md:text-6xl font-semibold text-[#ffffff]">
          {language === 'ca'
            ? 'Centre Legal, Privacitat & Crèdits · RAFA 930'
            : language === 'es'
            ? 'Centro Legal, Privacidad & Créditos · RAFA 930'
            : 'Legal, Privacy & Credits Center · RAFA 930'}
        </h1>

        <p className="text-[#a1a1b5] text-sm sm:text-base max-w-3xl leading-relaxed">
          {language === 'ca'
            ? 'Documentació legal completa, separada i estructurada sobre la titularitat del lloc web, el tractament confidencial de dades personals, l’ús de memòria tècnica i els drets de propietat intel·lectual.'
            : language === 'es'
            ? 'Documentación legal completa, separada y estructurada sobre la titularidad del sitio web, el tratamiento confidencial de datos personales, el uso de memoria técnica y los derechos de propiedad intelectual.'
            : 'Complete, dedicated, and structured legal documentation covering website ownership, confidential personal data processing, technical storage usage, and intellectual property rights.'}
        </p>
      </div>

      {/* Responsive Split Architecture: Left Navigation Index + Right Detailed Document */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Structured Section Index */}
        <aside className="lg:col-span-4 space-y-3 lg:sticky lg:top-24">
          <div className="text-xs font-mono text-[#a855f7] uppercase px-1">
            {language === 'ca'
              ? 'Índex de Documents Oficials'
              : language === 'es'
              ? 'Índice de Documentos Oficiales'
              : 'Official Document Index'}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 ${
                    isActive
                      ? 'bg-[#111118] border-[#ec4899] shadow-lg'
                      : 'bg-[#0a0a0f] border-[#22222e] hover:border-[#a855f7]'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      isActive
                        ? 'gradient-lila-rosa-rojo text-white'
                        : 'bg-[#111118] border border-[#22222e] text-[#a1a1b5]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-mono text-[#ec4899] tabular-nums">
                      DOC. {tab.number}
                    </div>
                    <div className="font-semibold text-sm text-[#ffffff] truncate">
                      {tab.label[language]}
                    </div>
                    <div className="text-xs text-[#a1a1b5] mt-0.5 line-clamp-2">
                      {tab.subtitle[language]}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Summary Quick Card */}
          <div className="p-5 rounded-xl bg-[#0a0a0f] border border-[#22222e] space-y-2.5 hidden lg:block">
            <div className="flex items-center gap-2 text-xs font-mono text-[#a855f7]">
              <FileText className="w-4 h-4 text-[#ec4899]" />
              <span>
                {language === 'ca'
                  ? 'DADES DEL RESPONSABLE'
                  : language === 'es'
                  ? 'DATOS DEL RESPONSABLE'
                  : 'CONTROLLER DETAILS'}
              </span>
            </div>
            <div className="text-xs text-[#a1a1b5] space-y-1 font-mono">
              <p className="text-[#ffffff] font-semibold">RAFA 930 · Rafael Moreno Román</p>
              <p>Sant Adrià de Besòs (CP 08930)</p>
              <p>Barcelona, España</p>
              <a
                href="mailto:rafa.930music@gmail.com"
                className="text-[#ec4899] hover:underline block pt-1"
              >
                rafa.930music@gmail.com
              </a>
            </div>
          </div>
        </aside>

        {/* Right Column: Detailed & Ordered Legal Content */}
        <div
          id="legal-document-body"
          className="lg:col-span-8 bg-[#111118] border border-[#22222e] rounded-2xl p-5 sm:p-8 md:p-10 space-y-8"
        >
          {activeTab === 'aviso' && <DetailedAvisoLegal lang={language} />}
          {activeTab === 'privacitat' && <DetailedPrivacidad lang={language} />}
          {activeTab === 'cookies' && <DetailedCookies lang={language} />}
          {activeTab === 'credits' && <DetailedCredits lang={language} />}

          {/* Document Footer Seal */}
          <div className="pt-6 border-t border-[#22222e] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#a1a1b5] font-mono">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#ec4899]" />
              <span>
                {language === 'ca'
                  ? 'Vigent i actualitzat: Setembre 2026 · Barcelona'
                  : language === 'es'
                  ? 'Vigente y actualizado: Septiembre 2026 · Barcelona'
                  : 'Valid and updated: September 2026 · Barcelona'}
              </span>
            </div>
            <a
              href="mailto:rafa.930music@gmail.com?subject=Consulta%20Legal%20RGPD%20-%20RAFA%20930"
              className="inline-flex items-center gap-1.5 text-[#ec4899] hover:underline"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>rafa.930music@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
   01. AVISO LEGAL & LSSI-CE (DETAILED)
   ============================================================================ */
function DetailedAvisoLegal({ lang }: { lang: Language }) {
  const articles =
    lang === 'ca'
      ? [
          {
            num: 'ARTICLE 01',
            title: 'Dades Identificatives del Titular (Llei 34/2002 LSSI-CE)',
            body: 'En compliment del deure d’informació recollit a l’article 10 de la Llei 34/2002, d’11 de juliol, de Serveis de la Societat de la Informació i de Comerç Electrònic (LSSI-CE), es fa constar les dades identificatives del titular d’aquest lloc web:',
            bullets: [
              'Titular i Nom Artístic Oficial: Rafael Moreno Román (RAFA 930)',
              'Segell & Estudi Creatiu: 930 Records & 930 Digital Studio',
              'Domicili d’activitat: Sant Adrià de Besòs (Barri de La Mina), Codi Postal 08930, Barcelona (Espanya)',
              'Correu electrònic oficial de contacte: rafa.930music@gmail.com',
              'Telèfon / WhatsApp professional: +34 671 59 18 14',
              'Activitat: Creació musical, producció discogràfica, direcció de fotografia editorial i desenvolupament web.',
            ],
          },
          {
            num: 'ARTICLE 02',
            title: 'Objecte i Condicions Generals d’Ús',
            body: 'El present lloc web té per objecte difondre l’obra musical, l’arxiu fotogràfic, el dossier de premsa (Presskit) i els serveis professionals de RAFA 930. L’accés i navegació atribueix la condició d’Usuari i implica l’acceptació íntegra d’aquestes condicions.',
          },
          {
            num: 'ARTICLE 03',
            title: 'Propietat Intel·lectual i Industrial (RDL 1/1996 LPI)',
            body: 'Totes les obres musicals, fonogrames, màsters d’àudio, lletres originals, retrats fotogràfics (autoritzats per Incrife i RAFA 930), logotips, dissenys tridimensionals (WebGL) i codi font estan protegits pel Text Refós de la Llei de Propietat Intel·lectual. Queda prohibida la seva reproducció, distribució o transformació sense autorització expressa.',
          },
          {
            num: 'ARTICLE 04',
            title: 'Clàusula de Reserva Expressa enfront d’IA Generativa (Directiva UE 2019/790)',
            body: 'De conformitat amb l’article 4.3 de la Directiva (UE) 2019/790 sobre drets d’autor en el mercat únic digital, el titular reserva de forma expressa els drets sobre totes les obres sonores, líriques i visuals d’aquesta web, prohibint qualsevol tècnica de mineria de textos i dades (Text and Data Mining / Web Scraping) per entrenar models d’intel·ligència artificial.',
          },
          {
            num: 'ARTICLE 05',
            title: 'Exempció de Responsabilitat i Enllaços Externs',
            body: 'El titular vetlla pel correcte funcionament tècnic de la plataforma, però no garanteix l’absència d’interrupcions puntuals alienes. Els enllaços a plataformes de tercers (Spotify, YouTube, Instagram, WhatsApp) tenen finalitat informativa i es regeixen pels seus propis termes legals.',
          },
          {
            num: 'ARTICLE 06',
            title: 'Legislació Aplicable i Jurisdicció Competent',
            body: 'Aquest Avís Legal es regeix íntegrament per la legislació espanyola i europea. Per a qualsevol controvèrsia derivada de l’accés o ús d’aquest lloc web, les parts se sotmeten als Jutjats i Tribunals de la ciutat de Barcelona.',
          },
        ]
      : lang === 'es'
      ? [
          {
            num: 'ARTÍCULO 01',
            title: 'Datos Identificativos del Titular (Ley 34/2002 LSSI-CE)',
            body: 'En cumplimiento del deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se hacen constar los datos identificativos del titular de este sitio web:',
            bullets: [
              'Titular y Nombre Artístico Oficial: Rafael Moreno Román (RAFA 930)',
              'Sello & Estudio Creativo: 930 Records & 930 Digital Studio',
              'Domicilio de actividad: Sant Adrià de Besòs (Barrio de La Mina), Código Postal 08930, Barcelona (España)',
              'Correo electrónico oficial de contacto: rafa.930music@gmail.com',
              'Teléfono / WhatsApp profesional: +34 671 59 18 14',
              'Actividad: Creación musical, producción discográfica, dirección de fotografía editorial y desarrollo web.',
            ],
          },
          {
            num: 'ARTÍCULO 02',
            title: 'Objeto y Condiciones Generales de Uso',
            body: 'El presente sitio web tiene por objeto difundir la obra musical, el archivo fotográfico, el dossier de prensa (Presskit) y los servicios profesionales de RAFA 930. El acceso y navegación atribuye la condición de Usuario e implica la aceptación íntegra de estas condiciones.',
          },
          {
            num: 'ARTÍCULO 03',
            title: 'Propiedad Intelectual e Industrial (RDL 1/1996 LPI)',
            body: 'Todas las obras musicales, fonogramas, másters de audio, letras originales, retratos fotográficos (autoría de Incrife y RAFA 930), logotipos, diseños tridimensionales (WebGL) y código fuente están protegidos por el Texto Refundido de la Ley de Propiedad Intelectual. Queda prohibida su reproducción, distribución o transformación sin autorización expresa.',
          },
          {
            num: 'ARTÍCULO 04',
            title: 'Cláusula de Reserva Expresa frente a IA Generativa (Directiva UE 2019/790)',
            body: 'De conformidad con el artículo 4.3 de la Directiva (UE) 2019/790 sobre derechos de autor en el mercado único digital, el titular reserva de forma expresa los derechos sobre todas las obras sonoras, líricas y visuales de esta web, prohibiendo cualquier técnica de minería de textos y datos (Text and Data Mining / Web Scraping) para entrenar modelos de inteligencia artificial.',
          },
          {
            num: 'ARTÍCULO 05',
            title: 'Exención de Responsabilidad y Enlaces Externos',
            body: 'El titular vela por el correcto funcionamiento técnico de la plataforma, pero no garantiza la ausencia de interrupciones puntuales ajenas. Los enlaces a plataformas de terceros (Spotify, YouTube, Instagram, WhatsApp) tienen finalidad informativa y se rigen por sus propios términos legales.',
          },
          {
            num: 'ARTÍCULO 06',
            title: 'Legislación Aplicable y Jurisdicción Competente',
            body: 'Este Aviso Legal se rige íntegramente por la legislación española y europea. Para cualquier controversia derivada del acceso o uso de este sitio web, las partes se someten a los Juzgados y Tribunales de la ciudad de Barcelona.',
          },
        ]
      : [
          {
            num: 'ARTICLE 01',
            title: 'Operator Identification (Spanish Law 34/2002 LSSI-CE)',
            body: 'In compliance with Article 10 of Law 34/2002 on Information Society Services and Electronic Commerce (LSSI-CE), the identifying details of the owner and operator of this website are set forth below:',
            bullets: [
              'Owner & Official Artist Name: Rafael Moreno Román (RAFA 930)',
              'Imprint & Creative Studio: 930 Records & 930 Digital Studio',
              'Registered Location: Sant Adrià de Besòs (La Mina), Postal Code 08930, Barcelona (Spain)',
              'Official Contact Email: rafa.930music@gmail.com',
              'Professional Phone / WhatsApp: +34 671 59 18 14',
              'Activity: Music creation, record production, editorial photography direction, and web development.',
            ],
          },
          {
            num: 'ARTICLE 02',
            title: 'Purpose and General Terms of Use',
            body: 'This website is designed to showcase the musical catalog, photography archive, electronic press kit (EPK), and professional creative services of RAFA 930. Accessing and browsing this platform grants User status and implies full acceptance of these terms.',
          },
          {
            num: 'ARTICLE 03',
            title: 'Intellectual and Industrial Property Rights',
            body: 'All musical compositions, master recordings, original lyrics, editorial portraits (by Incrife & RAFA 930), logos, 3D WebGL sculptures, and source code are protected under national and international copyright laws. Unauthorized reproduction or distribution is strictly prohibited.',
          },
          {
            num: 'ARTICLE 04',
            title: 'Express AI Training Opt-Out (EU Directive 2019/790 Art. 4.3)',
            body: 'Pursuant to Article 4(3) of Directive (EU) 2019/790 on copyright in the Digital Single Market, the owner expressly reserves all rights over audio tracks, lyrics, and photographs, strictly prohibiting automated text and data mining (TDM) or scraping for training generative AI models.',
          },
          {
            num: 'ARTICLE 05',
            title: 'Liability Disclaimer & External Links',
            body: 'External links to third-party platforms (Spotify, YouTube, Instagram, WhatsApp) are provided for convenience and are governed by their respective operators’ privacy and legal policies.',
          },
          {
            num: 'ARTICLE 06',
            title: 'Governing Law & Jurisdiction',
            body: 'This Legal Notice is governed by Spanish and European Union law. Any disputes arising in connection with this website shall be submitted to the exclusive jurisdiction of the Courts and Tribunals of Barcelona, Spain.',
          },
        ];

  return (
    <div className="space-y-6">
      <div className="border-b border-[#22222e] pb-4">
        <span className="text-xs font-mono text-[#ec4899]">
          {lang === 'ca'
            ? 'DOCUMENT 01 · LSSI-CE & LPI'
            : lang === 'es'
            ? 'DOCUMENTO 01 · LSSI-CE & LPI'
            : 'DOCUMENT 01 · LSSI-CE & COPYRIGHT'}
        </span>
        <h2 className="font-['Cormorant_Garamond'] text-2xl sm:text-4xl font-semibold text-[#ffffff] mt-1">
          {lang === 'ca'
            ? 'Avís Legal i Condicions d’Ús'
            : lang === 'es'
            ? 'Aviso Legal y Condiciones de Uso'
            : 'Legal Notice & Terms of Use'}
        </h2>
      </div>

      <div className="space-y-5">
        {articles.map((art, i) => (
          <div
            key={i}
            className="p-5 rounded-xl bg-[#0a0a0f] border border-[#22222e] space-y-2.5"
          >
            <div className="text-[11px] font-mono text-[#a855f7] font-semibold">{art.num}</div>
            <h3 className="text-base sm:text-lg font-semibold text-[#ffffff]">{art.title}</h3>
            <p className="text-xs sm:text-sm text-[#a1a1b5] leading-relaxed">{art.body}</p>
            {art.bullets && (
              <ul className="pt-2 space-y-1.5 text-xs text-[#ffffff]">
                {art.bullets.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ec4899] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================================
   02. POLÍTICA DE PRIVACIDAD RGPD (DETAILED)
   ============================================================================ */
function DetailedPrivacidad({ lang }: { lang: Language }) {
  const sections =
    lang === 'ca'
      ? [
          {
            num: 'SECCIÓ 01',
            title: 'Responsable del Tractament de Dades',
            body: 'El responsable del tractament de les dades personals recollides a través dels formularis de contacte i pressupost és Rafael Moreno Román (RAFA 930), amb domicili a Sant Adrià de Besòs (08930 Barcelona) i correu de contacte rafa.930music@gmail.com.',
          },
          {
            num: 'SECCIÓ 02',
            title: 'Tipologia de Dades Recollides i Finalitat',
            body: 'Únicament recollim les dades estrictament necessàries facilitades voluntàriament per l’usuari: nom complet, correu electrònic, telèfon/WhatsApp opcional i detalls del projecte. La finalitat exclusiva és respondre a sol·licituds de contractació artística (booking), sessions fotogràfiques o desenvolupament web.',
          },
          {
            num: 'SECCIÓ 03',
            title: 'Base Jurídica i Legitimació (Art. 6.1.a RGPD)',
            body: 'La base legal per al tractament de les dades és el consentiment exprés, lliure i inequívoc de l’interessat en marcar la casella d’acceptació abans d’enviar qualsevol formulari o consulta.',
          },
          {
            num: 'SECCIÓ 04',
            title: 'Termini de Conservació i Destinataris',
            body: 'Les dades es conservaran únicament durant el temps necessari per atendre la consulta o executar la relació contractual. No se cediran ni vendran dades a tercers sota cap concepte, excepte per obligació legal.',
          },
          {
            num: 'SECCIÓ 05',
            title: 'Exercici de Drets ARCO+ (Accés, Rectificació, Supressió, Oposició i Portabilitat)',
            body: 'Qualsevol persona té dret a obtenir confirmació sobre si estem tractant les seves dades, així com a sol·licitar-ne l’accés, la rectificació, la supressió («dret a l’oblit»), la limitació o la portabilitat enviant un correu electrònic a rafa.930music@gmail.com. També pot presentar una reclamació davant l’Agència Espanyola de Protecció de Dades (AEPD - www.aepd.es).',
          },
        ]
      : lang === 'es'
      ? [
          {
            num: 'SECCIÓN 01',
            title: 'Responsable del Tratamiento de Datos',
            body: 'El responsable del tratamiento de los datos personales recogidos a través de los formularios de contacto y presupuesto es Rafael Moreno Román (RAFA 930), con domicilio en Sant Adrià de Besòs (08930 Barcelona) y correo de contacto rafa.930music@gmail.com.',
          },
          {
            num: 'SECCIÓN 02',
            title: 'Tipología de Datos Recogidos y Finalidad',
            body: 'Únicamente recogemos los datos estrictamente necesarios facilitados voluntariamente por el usuario: nombre completo, correo electrónico, teléfono/WhatsApp opcional y detalles del proyecto. La finalidad exclusiva es responder a solicitudes de contratación artística (booking), sesiones fotográficas o desarrollo web.',
          },
          {
            num: 'SECCIÓN 03',
            title: 'Base Jurídica y Legitimación (Art. 6.1.a RGPD)',
            body: 'La base legal para el tratamiento de los datos es el consentimiento expreso, libre e inequívoco del interesado al marcar la casilla de aceptación antes de enviar cualquier formulario o consulta.',
          },
          {
            num: 'SECCIÓN 04',
            title: 'Plazo de Conservación y Destinatarios',
            body: 'Los datos se conservarán únicamente durante el tiempo necesario para atender la consulta o ejecutar la relación contractual. No se cederán ni venderán datos a terceros bajo ningún concepto, salvo obligación legal.',
          },
          {
            num: 'SECCIÓN 05',
            title: 'Ejercicio de Derechos ARCO+ (Acceso, Rectificación, Supresión, Oposición y Portabilidad)',
            body: 'Cualquier persona tiene derecho a obtener confirmación sobre si estamos tratando sus datos, así como a solicitar su acceso, rectificación, supresión («derecho al olvido»), limitación o portabilidad enviando un correo electrónico a rafa.930music@gmail.com. También puede presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD - www.aepd.es).',
          },
        ]
      : [
          {
            num: 'SECTION 01',
            title: 'Data Controller Identity',
            body: 'The data controller responsible for personal data collected through contact and quote forms is Rafael Moreno Román (RAFA 930), based in Sant Adrià de Besòs (08930 Barcelona, Spain), contact email: rafa.930music@gmail.com.',
          },
          {
            num: 'SECTION 02',
            title: 'Categories of Data Collected & Purpose',
            body: 'We only collect the minimum data voluntarily provided by the user: full name, email address, optional phone/WhatsApp number, and project details. The sole purpose is responding to artistic booking inquiries, photography sessions, or web development quotes.',
          },
          {
            num: 'SECTION 03',
            title: 'Legal Basis for Processing (Art. 6.1.a GDPR)',
            body: 'The legal basis for processing your data is your explicit, informed consent given when checking the mandatory acceptance box prior to submitting a form.',
          },
          {
            num: 'SECTION 04',
            title: 'Data Retention & Third-Party Disclosure',
            body: 'Personal data is retained strictly for the time required to fulfill the inquiry or contractual service. We never sell, rent, or transfer personal data to third parties.',
          },
          {
            num: 'SECTION 05',
            title: 'Your GDPR Rights (Access, Rectification, Erasure, Portability)',
            body: 'You may exercise your rights of access, rectification, erasure (“right to be forgotten”), restriction, objection, and portability at any time by emailing rafa.930music@gmail.com. You also have the right to lodge a complaint with the Spanish Data Protection Agency (AEPD - www.aepd.es).',
          },
        ];

  return (
    <div className="space-y-6">
      <div className="border-b border-[#22222e] pb-4">
        <span className="text-xs font-mono text-[#ec4899]">
          {lang === 'ca'
            ? 'DOCUMENT 02 · RGPD UE 2016/679 & LOPDGDD'
            : lang === 'es'
            ? 'DOCUMENTO 02 · RGPD UE 2016/679 & LOPDGDD'
            : 'DOCUMENT 02 · EU GDPR 2016/679'}
        </span>
        <h2 className="font-['Cormorant_Garamond'] text-2xl sm:text-4xl font-semibold text-[#ffffff] mt-1">
          {lang === 'ca'
            ? 'Política de Privacitat i Protecció de Dades'
            : lang === 'es'
            ? 'Política de Privacidad y Protección de Datos'
            : 'Privacy & Data Protection Policy'}
        </h2>
      </div>

      <div className="space-y-5">
        {sections.map((sec, i) => (
          <div
            key={i}
            className="p-5 rounded-xl bg-[#0a0a0f] border border-[#22222e] space-y-2"
          >
            <div className="text-[11px] font-mono text-[#a855f7] font-semibold">{sec.num}</div>
            <h3 className="text-base sm:text-lg font-semibold text-[#ffffff]">{sec.title}</h3>
            <p className="text-xs sm:text-sm text-[#a1a1b5] leading-relaxed">{sec.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================================
   03. POLÍTICA DE COOKIES & STORAGE (DETAILED)
   ============================================================================ */
function DetailedCookies({ lang }: { lang: Language }) {
  return (
    <div className="space-y-6">
      <div className="border-b border-[#22222e] pb-4">
        <span className="text-xs font-mono text-[#ec4899]">
          {lang === 'ca'
            ? 'DOCUMENT 03 · TRANSPARÈNCIA TÈCNICA'
            : lang === 'es'
            ? 'DOCUMENTO 03 · TRANSPARENCIA TÉCNICA'
            : 'DOCUMENT 03 · TECHNICAL TRANSPARENCY'}
        </span>
        <h2 className="font-['Cormorant_Garamond'] text-2xl sm:text-4xl font-semibold text-[#ffffff] mt-1">
          {lang === 'ca'
            ? 'Política de Cookies i Emmagatzematge Local'
            : lang === 'es'
            ? 'Política de Cookies y Almacenamiento Local'
            : 'Cookie & Local Storage Policy'}
        </h2>
      </div>

      <div className="p-5 rounded-xl bg-[#0a0a0f] border border-[#22222e] space-y-2">
        <div className="text-[11px] font-mono text-[#a855f7] font-semibold">01. AUDITORIA DE RASTREIG</div>
        <h3 className="text-base sm:text-lg font-semibold text-[#ffffff]">
          {lang === 'ca'
            ? 'Sense cookies publicitàries ni rastrejadors de tercers'
            : lang === 'es'
            ? 'Sin cookies publicitarias ni rastreadores de terceros'
            : 'Zero advertising cookies or third-party trackers'}
        </h3>
        <p className="text-xs sm:text-sm text-[#a1a1b5] leading-relaxed">
          {lang === 'ca'
            ? 'Aquesta plataforma web oficial de RAFA 930 no instal·la cookies publicitàries, analítiques invasives ni píxels de seguiment comercial. Únicament utilitza l’emmagatzematge tècnic local (localStorage) del navegador per recordar les preferències d’interfície de l’usuari.'
            : lang === 'es'
            ? 'Esta plataforma web oficial de RAFA 930 no instala cookies publicitarias, analíticas invasivas ni píxeles de seguimiento comercial. Únicamente utiliza el almacenamiento técnico local (localStorage) del navegador para recordar las preferencias de interfaz del usuario.'
            : 'This official RAFA 930 web platform does not install advertising cookies, invasive analytics, or commercial tracking pixels. It exclusively uses your browser’s technical localStorage to remember your interface preferences.'}
        </p>
      </div>

      {/* Responsive Table of Technical Keys */}
      <div className="overflow-x-auto rounded-xl border border-[#22222e] bg-[#0a0a0f]">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[#22222e] bg-[#111118] font-mono text-[#ec4899]">
              <th className="p-3.5">
                {lang === 'ca' ? 'Clau Tècnica' : lang === 'es' ? 'Clave Técnica' : 'Storage Key'}
              </th>
              <th className="p-3.5">
                {lang === 'ca' ? 'Tipus' : lang === 'es' ? 'Tipo' : 'Type'}
              </th>
              <th className="p-3.5">
                {lang === 'ca' ? 'Finalitat Exclusiva' : lang === 'es' ? 'Finalidad Exclusiva' : 'Sole Purpose'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#22222e] text-[#a1a1b5]">
            <tr>
              <td className="p-3.5 font-mono text-[#ffffff]">rafa930_lang</td>
              <td className="p-3.5 font-mono">localStorage</td>
              <td className="p-3.5">
                {lang === 'ca'
                  ? ' Desa l’idioma escollit per l’usuari (ca / es / en).'
                  : lang === 'es'
                  ? 'Guarda el idioma elegido por el usuario (ca / es / en).'
                  : 'Stores the user’s selected language (ca / es / en).'}
              </td>
            </tr>
            <tr>
              <td className="p-3.5 font-mono text-[#ffffff]">rafa930_theme</td>
              <td className="p-3.5 font-mono">localStorage</td>
              <td className="p-3.5">
                {lang === 'ca'
                  ? 'Desa la preferència visual de Mode Fosc o Mode Clar.'
                  : lang === 'es'
                  ? 'Guarda la preferencia visual de Modo Oscuro o Modo Claro.'
                  : 'Stores the visual preference for Dark Mode or Light Mode.'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ============================================================================
   04. CRÉDITOS ARTÍSTICOS & FICHA TÉCNICA (DETAILED)
   ============================================================================ */
function DetailedCredits({ lang }: { lang: Language }) {
  const creditsList = [
    {
      role: {
        ca: '01. DIRECCIÓ GENERAL, VEU & COMPOSICIÓ LÍRICA',
        es: '01. DIRECCIÓN GENERAL, VOZ & COMPOSICIÓN LÍRICA',
        en: '01. EXECUTIVE DIRECTION, VOCALS & LYRICS',
      },
      name: 'RAFA 930 (Rafael Moreno Román)',
      detail: {
        ca: 'Autoria de totes les lletres, interpretació vocal, concepte d’àlbums i direcció creativa.',
        es: 'Autoría de todas las letras, interpretación vocal, concepto de álbumes y dirección creativa.',
        en: 'Authorship of all lyrics, vocal performance, album concepts, and creative direction.',
      },
    },
    {
      role: {
        ca: '02. PRODUCCIÓ MUSICAL, BEATS & ENGINYERIA SONORA',
        es: '02. PRODUCCIÓN MUSICAL, BEATS & INGENIERÍA SONORA',
        en: '02. MUSIC PRODUCTION, BEATS & SOUND ENGINEERING',
      },
      name: 'Ouxxox & 930 Records',
      detail: {
        ca: 'Producció d’instrumentals, arranjaments d’estudi, mescla i masterització des dels inicis a La Mina.',
        es: 'Producción de instrumentales, arreglos de estudio, mezcla y masterización desde los inicios en La Mina.',
        en: 'Instrumental production, studio arrangements, mixing, and mastering since the beginnings in La Mina.',
      },
    },
    {
      role: {
        ca: '03. DIRECCIÓ DE FOTOGRAFIA & IMATGE EDITORIAL',
        es: '03. DIRECCIÓN DE FOTOGRAFÍA & IMAGEN EDITORIAL',
        en: '03. PHOTOGRAPHY DIRECTION & EDITORIAL IMAGERY',
      },
      name: 'Incrife & RAFA 930',
      detail: {
        ca: 'Retrats en clarobscur, fotografia fixa de rodatges, portades oficials i arxiu documental.',
        es: 'Retratos en claroscuro, fotografía fija de rodajes, portadas oficiales y archivo documental.',
        en: 'Chiaroscuro portraits, on-set still photography, official cover art, and documentary archive.',
      },
    },
    {
      role: {
        ca: '04. COL·LABORADORS OFICIALS (ARTISTES & MODELS)',
        es: '04. COLABORADORES OFICIALES (ARTISTAS & MODELOS)',
        en: '04. OFFICIAL COLLABORATORS (ARTISTS & MODELS)',
      },
      name: 'Therassam · Kingsla · Salma · Toliyug · Quiriat Jearim Deras Menjivar',
      detail: {
        ca: 'Artistes: Therassam (@therassam), Kingsla (@amine_grafi) · Models: Salma (@ssalmaem), Toliyug (@toliyug), Quiriat Jearim Deras Menjivar (@derasmenjivar_13).',
        es: 'Artistas: Therassam (@therassam), Kingsla (@amine_grafi) · Modelos: Salma (@ssalmaem), Toliyug (@toliyug), Quiriat Jearim Deras Menjivar (@derasmenjivar_13).',
        en: 'Artists: Therassam (@therassam), Kingsla (@amine_grafi) · Models: Salma (@ssalmaem), Toliyug (@toliyug), Quiriat Jearim Deras Menjivar (@derasmenjivar_13).',
      },
    },
    {
      role: {
        ca: '05. ARQUITECTURA WEB, DISSENY 3D & DESENVOLUPAMENT',
        es: '05. ARQUITECTURA WEB, DISEÑO 3D & DESARROLLO',
        en: '05. WEB ARCHITECTURE, 3D DESIGN & DEVELOPMENT',
      },
      name: 'RAFA 930 · 930 Digital Studio',
      detail: {
        ca: 'Desenvolupament Full-Stack amb React 19, TypeScript, Tailwind CSS i escultura interactiva Three.js WebGL.',
        es: 'Desarrollo Full-Stack con React 19, TypeScript, Tailwind CSS y escultura interactiva Three.js WebGL.',
        en: 'Full-Stack development with React 19, TypeScript, Tailwind CSS, and interactive Three.js WebGL sculpture.',
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-[#22222e] pb-4">
        <span className="text-xs font-mono text-[#ec4899]">
          {lang === 'ca'
            ? 'DOCUMENT 04 · FITXA TÈCNICA OFICIAL'
            : lang === 'es'
            ? 'DOCUMENTO 04 · FICHA TÉCNICA OFICIAL'
            : 'DOCUMENT 04 · OFFICIAL TECHNICAL CREDITS'}
        </span>
        <h2 className="font-['Cormorant_Garamond'] text-2xl sm:text-4xl font-semibold text-[#ffffff] mt-1">
          {lang === 'ca'
            ? 'Crèdits Artístics i Tècnics'
            : lang === 'es'
            ? 'Créditos Artísticos y Técnicos'
            : 'Artistic & Technical Credits'}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {creditsList.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl bg-[#0a0a0f] border border-[#22222e] space-y-1.5"
          >
            <span className="text-[11px] font-mono text-[#a855f7] font-semibold block">
              {item.role[lang]}
            </span>
            <h3 className="text-base sm:text-lg font-semibold text-[#ffffff]">{item.name}</h3>
            <p className="text-xs sm:text-sm text-[#a1a1b5] leading-relaxed">
              {item.detail[lang]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
