"use client";
import { useEffect, useMemo, useRef, useState } from "react";

const T = {
  bg: "#FFF9F0",
  card: "#FFFFFF",
  dark: "#2D3436",
  text: "#2D3436",
  muted: "#636E72",
  light: "#B2BEC3",
  green: "#2D9E6B",
  greenBg: "#E6F7EE",
  purple: "#6C5CE7",
  purpleBg: "#F0EDFF",
  yellow: "#F9CA24",
  yellowBg: "#FFFDE6",
  blue: "#0984E3",
  blueBg: "#E8F4FD",
  orange: "#E17055",
  orangeBg: "#FFF0EC",
  pink: "#E84393",
  pinkBg: "#FFF0F7",
  red: "#D63031",
  redBg: "#FFEBEB",
  border: "#E0DCCF",
  r: 16,
  rs: 8,
  f: "'Poppins',sans-serif",
};

const FONTS = "@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');";
const CSS = `${FONTS}
*{box-sizing:border-box;margin:0}
body{font-family:'Poppins',sans-serif;background:${T.bg};color:${T.text}}
a{color:inherit}
button,input,select,textarea{font-family:'Poppins',sans-serif}
@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{opacity:.3}50%{opacity:1}}
.chat-shell{max-width:1080px;width:100%;margin:0 auto;flex:1;display:flex;flex-direction:column;padding:10px 0 0}
.chat-list{flex:1;overflow-y:auto;padding:0 16px 20px}
.chat-row{display:flex}
.chat-row.user{justify-content:flex-end}
.chat-row.assistant{justify-content:flex-start}
.chat-avatar{width:38px;height:38px;border-radius:12px;background:${T.green};display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;margin-right:8px;flex:0 0 auto}
.chat-bubble{max-width:min(80%,820px);overflow-wrap:anywhere;word-break:break-word}
.chat-inputbar{border-top:2px solid ${T.border};background:#fff;padding:16px;display:flex;gap:10px;position:sticky;bottom:0}
.chat-input{flex:1;min-width:0;padding:14px 16px;border-radius:20px;border:2px solid ${T.border};font-size:14px;background:${T.bg}}
.chat-send{border:none;border-radius:20px;padding:12px 20px;font-weight:900}
@media (max-width: 720px){
  .chat-shell{padding-top:0}
  .chat-list{padding:0 12px 16px}
  .chat-row{align-items:flex-end}
  .chat-avatar{width:30px;height:30px;font-size:15px;margin-right:6px}
  .chat-bubble{max-width:calc(100% - 36px);font-size:13px;padding:14px !important;border-radius:18px !important}
  .chat-quick{margin-left:36px !important}
  .chat-inputbar{padding:12px;gap:8px}
  .chat-input{padding:12px 14px;font-size:13px}
  .chat-send{padding:12px 14px;min-width:48px}
}
@media (max-width: 560px){
  .hero-stack{display:grid !important;grid-template-columns:1fr !important}
  .generator-grid{grid-template-columns:1fr !important}
  .rep-toolbar{grid-template-columns:1fr !important}
}
`;

const PROVINCES = ["A Coruña","Álava","Albacete","Alicante","Almería","Asturias","Ávila","Badajoz","Barcelona","Bizkaia","Burgos","Cáceres","Cádiz","Cantabria","Castellón","Ceuta","Ciudad Real","Córdoba","Cuenca","Gipuzkoa","Girona","Granada","Guadalajara","Huelva","Huesca","Illes Balears","Jaén","La Rioja","Las Palmas","León","Lleida","Lugo","Madrid","Málaga","Melilla","Murcia","Navarra","Ourense","Palencia","Pontevedra","Salamanca","Santa Cruz de Tenerife","Segovia","Sevilla","Soria","Tarragona","Teruel","Toledo","Valencia","Valladolid","Zamora","Zaragoza"];

const RESOURCES = [
  { icon: "📄", t: "Propuesta de PNL", type: "p", href: "/plantillas/plantilla_pnl.docx" },
  { icon: "✉️", t: "Petición a las Cortes", type: "p", href: "/plantillas/plantilla_peticion_cortes.docx" },
  { icon: "❓", t: "Pregunta parlamentaria", type: "p", href: "/plantillas/plantilla_pregunta_parlamentaria.docx" },
  { icon: "📋", t: "Alegación urbanística", type: "p", href: "/plantillas/plantilla_alegacion.docx" },
  { icon: "🔍", t: "Solicitud info pública", type: "p", href: "/plantillas/plantilla_solicitud_info_publica.docx" },
  { icon: "🏠", t: "Reclamación al casero", type: "p", href: "/plantillas/plantilla_reclamacion_casero.docx" },
  { icon: "🔒", t: "Derechos ARCO", type: "p", href: "/plantillas/plantilla_derechos_arco.docx" },
  { icon: "🛒", t: "Reclamación consumo", type: "p", href: "/plantillas/plantilla_reclamacion_consumo.docx" },
  { icon: "💼", t: "Denuncia laboral", type: "p", href: "/plantillas/plantilla_denuncia_laboral.docx" },
  { icon: "🇪🇺", t: "Petición al PE", type: "p", href: "/plantillas/plantilla_peticion_pe.docx" },
  { icon: "🏛️", t: "Cómo funciona el Congreso", type: "i", href: "/infografias/info_como_funciona_congreso.pdf" },
  { icon: "📜", t: "Cómo promover ILP", type: "i", href: "/infografias/info_ilp_paso_a_paso.pdf" },
  { icon: "🗺️", t: "¿A quién le toca?", type: "i", href: "/infografias/info_a_quien_le_toca.pdf" },
  { icon: "💻", t: "Derechos digitales", type: "i", href: "/infografias/info_derechos_digitales.pdf" },
  { icon: "📝", t: "Cómo hacer alegaciones", type: "i", href: "/infografias/info_como_hacer_alegaciones.pdf" },
  { icon: "🇪🇺", t: "Influir en Europa", type: "i", href: "/infografias/info_influir_en_europa.pdf" },
];

const DOC_TYPES = [
  { id: "pnl", label: "Propuesta de PNL", template: "/plantillas/plantilla_pnl.docx", desc: "Para empujar una iniciativa política desde el Congreso" },
  { id: "peticion_cortes", label: "Derecho de petición", template: "/plantillas/plantilla_peticion_cortes.docx", desc: "Para pedir formalmente una actuación a las Cortes" },
  { id: "pregunta_parlamentaria", label: "Pregunta parlamentaria", template: "/plantillas/plantilla_pregunta_parlamentaria.docx", desc: "Para que un diputado pida explicaciones al Gobierno" },
  { id: "mensaje_representante", label: "Mensaje a diputado/a o senador/a", template: "/plantillas/plantilla_peticion_cortes.docx", desc: "Para escribir a una persona representante con un caso concreto" },
  { id: "escrito_ministerio", label: "Escrito a ministerio", template: "/plantillas/plantilla_solicitud_info_publica.docx", desc: "Para dirigirte a un ministerio o secretaría de Estado" },
  { id: "escrito_autonomico", label: "Escrito a comunidad autónoma", template: "/plantillas/plantilla_solicitud_info_publica.docx", desc: "Para consejerías, parlamentos autonómicos u organismos autonómicos" },
  { id: "escrito_ayuntamiento", label: "Escrito al ayuntamiento", template: "/plantillas/plantilla_alegacion.docx", desc: "Para alcaldía, concejalías o servicios municipales" },
  { id: "defensor_pueblo", label: "Queja al Defensor del Pueblo", template: "/plantillas/plantilla_peticion_cortes.docx", desc: "Para denunciar mala administración o falta de respuesta pública" },
  { id: "alegacion", label: "Alegación", template: "/plantillas/plantilla_alegacion.docx", desc: "Para planes, ordenanzas, urbanismo o trámites públicos" },
  { id: "solicitud_info", label: "Solicitud de información pública", template: "/plantillas/plantilla_solicitud_info_publica.docx", desc: "Para exigir datos o documentos a la Administración" },
  { id: "reclamacion_casero", label: "Reclamación al casero", template: "/plantillas/plantilla_reclamacion_casero.docx", desc: "Para incidencias de alquiler y vivienda" },
  { id: "reclamacion_consumo", label: "Reclamación de consumo", template: "/plantillas/plantilla_reclamacion_consumo.docx", desc: "Para bancos, telecos, facturas o servicios" },
  { id: "denuncia_laboral", label: "Escrito laboral", template: "/plantillas/plantilla_denuncia_laboral.docx", desc: "Para problemas de empleo o condiciones de trabajo" },
  { id: "derechos_arco", label: "Derechos ARCO", template: "/plantillas/plantilla_derechos_arco.docx", desc: "Para reclamar sobre tus datos personales" },
  { id: "peticion_pe", label: "Petición al Parlamento Europeo", template: "/plantillas/plantilla_peticion_pe.docx", desc: "Para abrir una vía en instituciones europeas" },
];


const FAQS = [
  {
    q: "¿Cómo sé quién está moviendo más un tema en el Congreso?",
    a: "Pregúntale al chat por un tema concreto — por ejemplo vivienda o sanidad — y tirará de QHLD cuando haya ranking temático verificable.",
    cta: "¿Quién es el diputado que más hace sobre vivienda?",
  },
  {
    q: "¿Qué diferencia hay entre una PNL y una ILP?",
    a: "La PNL la presenta un grupo parlamentario; la ILP la impulsa la ciudadanía y exige 500.000 firmas.",
    cta: "Explícame la diferencia entre una PNL y una ILP",
  },
  {
    q: "¿Puedo escribirle directamente a un diputado?",
    a: "Sí. Puedes localizar tu provincia, abrir su ficha y usar correo o redes cuando estén publicadas.",
    cta: "Quiero encontrar a mi diputado en Madrid",
  },
  {
    q: "¿Esta web da asesoramiento legal?",
    a: "No. Ordena opciones, pasos y herramientas públicas para que no te pierdas en la burocracia.",
    cta: "Tengo un problema de alquiler abusivo, ¿qué hago?",
  },
  {
    q: "¿Qué hago si el chat no entiende mi pregunta?",
    a: "Prueba a decir tema + objetivo. Ejemplo: 'vivienda + quiero presionar en el Congreso' o 'digital + necesito denunciar'.",
    cta: "No entiendo cómo influir en vivienda desde el Congreso",
  },
  {
    q: "¿Hay plantillas listas para usar?",
    a: "Sí. Hay plantillas descargables para PNL, reclamaciones, preguntas parlamentarias y solicitudes de información.",
    cta: "Quiero generar un documento. ¿Qué tipos hay?",
  },
];

const PROBLEMS = [
  { id: "vivienda", icon: "🏠", label: "Vivienda", color: T.green, desc: "Alquiler, desahucio, ayudas" },
  { id: "servicios", icon: "🏥", label: "Servicios públicos", color: T.blue, desc: "Sanidad, educación, transporte" },
  { id: "digital", icon: "💻", label: "Derechos digitales", color: T.purple, desc: "Deepfakes, ciberacoso, IA" },
  { id: "consumo", icon: "🛒", label: "Consumo", color: T.pink, desc: "Facturas, bancos, telecos" },
  { id: "empleo", icon: "💼", label: "Empleo", color: T.orange, desc: "Despido, condiciones, acoso" },
  { id: "transparencia", icon: "🔍", label: "Transparencia", color: T.green, desc: "Información pública, gasto" },
  { id: "urbanismo", icon: "🌳", label: "Urbanismo", color: T.blue, desc: "Obras, ruido, alegaciones" },
];

const INFLUENCES = [
  { id: "pnl", icon: "📋", label: "Pedir una PNL", level: "Congreso", color: T.purple, desc: "Insta al Gobierno a actuar" },
  { id: "pregunta", icon: "❓", label: "Pregunta parlamentaria", level: "Congreso", color: T.blue, desc: "Tu diputado pregunta al Gobierno" },
  { id: "ilp", icon: "📜", label: "Proponer una ley (ILP)", level: "Nacional", color: T.orange, desc: "500.000 firmas" },
  { id: "peticion", icon: "✉️", label: "Derecho de petición", level: "Cortes", color: T.pink, desc: "Sin firmas ni abogado" },
  { id: "alegacion", icon: "📝", label: "Alegaciones municipales", level: "Ayuntamiento", color: T.green, desc: "Planes y ordenanzas" },
  { id: "europa", icon: "🇪🇺", label: "Petición al PE", level: "UE", color: T.blue, desc: "Parlamento Europeo" },
];

const CONGRESS_COMMISSION_OPTIONS = [
  { name: "Vivienda y Agenda Urbana", topic: "Vivienda" },
  { name: "Sanidad", topic: "Sanidad" },
  { name: "Educación, Formación Profesional y Deportes", topic: "Educación" },
  { name: "Derechos Sociales y Consumo", topic: "Protección social" },
  { name: "Trabajo, Economía Social, Inclusión, Seguridad Social y Migraciones", topic: "Empleo" },
  { name: "Transición Ecológica y Reto Demográfico", topic: "Clima" },
  { name: "Igualdad", topic: "Igualdad de género" },
  { name: "Juventud e Infancia", topic: "Infancia" },
  { name: "Cooperación Internacional para el Desarrollo", topic: "Cooperación al desarrollo" },
  { name: "Ciencia, Innovación y Universidades", topic: "Educación" },
  { name: "Economía, Comercio y Transformación Digital", topic: "Empleo" },
  { name: "Política Territorial", topic: "España vaciada" },
  { name: "Transportes y Movilidad Sostenible", topic: "Clima" },
];

const SENATE_COMMISSION_OPTIONS = [
  { name: "Comisión de Vivienda y Agenda Urbana", topic: "Vivienda" },
  { name: "Comisión de Sanidad", topic: "Sanidad" },
  { name: "Comisión de Educación, Formación Profesional y Deportes", topic: "Educación" },
  { name: "Comisión de Derechos Sociales, Consumo y Agenda 2030", topic: "Protección social" },
  { name: "Comisión de Trabajo y Economía Social", topic: "Empleo" },
  { name: "Comisión de Transición Ecológica", topic: "Clima" },
  { name: "Comisión de Igualdad", topic: "Igualdad de género" },
  { name: "Comisión de Juventud e Infancia", topic: "Infancia" },
  { name: "Comisión de Cooperación Internacional al Desarrollo", topic: "Cooperación al desarrollo" },
  { name: "Comisión General de las Comunidades Autónomas", topic: "España vaciada" },
  { name: "Comisión de Despoblación y Reto Demográfico", topic: "España vaciada" },
  { name: "Comisión de Ciencia, Innovación y Universidades", topic: "Educación" },
];

const MINISTRY_AREA_CONTACTS = [
  {
    id: "vivienda",
    area: "Vivienda y ciudad",
    ministry: "Ministerio de Vivienda y Agenda Urbana",
    summary: "Útil para vivienda, alquiler, rehabilitación y agenda urbana.",
    web: "https://www.mivau.gob.es/",
    organigram: "https://www.mivau.gob.es/el-ministerio/organizacion-y-funciones/organizacion-mivau",
    transparency: "https://transparencia.gob.es/publicidad-activa/por-materias/organizacion-empleo/estructura",
    contact: "060 y canales del ministerio",
  },
  {
    id: "sanidad",
    area: "Sanidad",
    ministry: "Ministerio de Sanidad",
    summary: "Para salud pública, SNS, farmacia y coordinación sanitaria.",
    web: "https://www.sanidad.gob.es/",
    organigram: "https://www.sanidad.gob.es/organizacion/funcionesEstructura/organigrama/home.htm",
    transparency: "https://www.sanidad.gob.es/organizacion/funcionesEstructura/home.htm",
    contact: "060 y sede del ministerio",
  },
  {
    id: "educacion",
    area: "Educación y deporte",
    ministry: "Ministerio de Educación, Formación Profesional y Deportes",
    summary: "Para becas, currículo, FP y educación no universitaria.",
    web: "https://www.educacionfpydeportes.gob.es/",
    organigram: "https://www.educacionfpydeportes.gob.es/ministerio/organigrama.html",
    transparency: "https://www.educacionfpydeportes.gob.es/ministerio/funciones-y-competencias.html",
    contact: "060 y canales del ministerio",
  },
  {
    id: "digital",
    area: "Digital y función pública",
    ministry: "Ministerio para la Transformación Digital y de la Función Pública",
    summary: "Para IA, telecom, ciberseguridad, administración digital y función pública.",
    web: "https://www.lamoncloa.gob.es/gobierno/composiciondelgobierno/Paginas/transformacion-digital-funcion-publica.aspx",
    organigram: "https://transparencia.gob.es/publicidad-activa/por-materias/organizacion-empleo/estructura/estructura-mtdf",
    transparency: "https://transparencia.gob.es/publicidad-activa/por-materias/organizacion-empleo/funciones/funciones-mtdf",
    contact: "060 y 017 para ciberincidencias",
  },
  {
    id: "trabajo",
    area: "Trabajo y empleo",
    ministry: "Ministerio de Trabajo y Economía Social",
    summary: "Para empleo, relaciones laborales y economía social.",
    web: "https://www.mites.gob.es/",
    organigram: "https://transparencia.gob.es/publicidad-activa/por-materias/organizacion-empleo/estructura/estructura-mtes",
    transparency: "https://transparencia.gob.es/publicidad-activa/por-materias/organizacion-empleo/estructura/estructura-mtes",
    contact: "060 y canales del ministerio",
  },
  {
    id: "sociales",
    area: "Derechos sociales y consumo",
    ministry: "Ministerio de Derechos Sociales, Consumo y Agenda 2030",
    summary: "Para consumo, derechos sociales, discapacidad y Agenda 2030.",
    web: "https://www.dsca.gob.es/",
    organigram: "https://transparencia.gob.es/publicidad-activa/por-materias/organizacion-empleo/estructura/estructura-mdca",
    transparency: "https://transparencia.gob.es/publicidad-activa/por-materias/organizacion-empleo/funciones/funciones-mdca",
    contact: "060 y canales del ministerio",
  },
  {
    id: "igualdad",
    area: "Igualdad y violencias",
    ministry: "Ministerio de Igualdad",
    summary: "Para igualdad, violencias machistas y políticas de género.",
    web: "https://www.igualdad.gob.es/",
    organigram: "https://transparencia.gob.es/publicidad-activa/por-materias/organizacion-empleo/estructura/estructura-migd",
    transparency: "https://transparencia.gob.es/publicidad-activa/por-materias/organizacion-empleo/estructura/estructura-migd",
    contact: "016 y 060",
  },
  {
    id: "clima",
    area: "Clima, energía y agua",
    ministry: "Ministerio para la Transición Ecológica y el Reto Demográfico",
    summary: "Para energía, agua, costas, clima y reto demográfico.",
    web: "https://www.miteco.gob.es/",
    organigram: "https://transparencia.gob.es/publicidad-activa/por-materias/organizacion-empleo/estructura/estructura-mted",
    transparency: "https://transparencia.gob.es/publicidad-activa/por-materias/organizacion-empleo/estructura/estructura-mted",
    contact: "060 y canales del ministerio",
  },
];

const AUTONOMIC_DIRECTORY = [
  ["Andalucía","01"], ["Aragón","02"], ["Asturias","03"], ["Illes Balears","04"], ["Canarias","05"], ["Cantabria","06"], ["Castilla y León","07"], ["Castilla-La Mancha","08"], ["Cataluña","09"], ["Comunitat Valenciana","10"], ["Extremadura","11"], ["Galicia","12"], ["Madrid","13"], ["Murcia","14"], ["Navarra","15"], ["País Vasco","16"], ["La Rioja","17"]
].map(([name, id]) => ({
  id: `aut-${id}`,
  name,
  adminHref: `https://administracion.gob.es/pagFront/espanaAdmon/directorioOrganigrama/comunidadesAutonomas/comunidadesAutonomas.htm?idCCAA=${id}`,
  searchHref: "https://administracion.gob.es/pagFront/espanaAdmon/directorioOrganigrama/quienEsQuienOrganismos.htm",
  senateHref: "https://www.senado.es/web/composicionorganizacion/senadores/composicionsenado/consultaprocedenciageografica/designados/index.html",
  desc: "Ficha autonómica oficial en administracion.gob.es con estructura, organismos y acceso a órganos dependientes.",
}));

const LOCAL_DIRECTORY = [
  { id: "local-1", name: "Ayuntamientos y entidades locales", desc: "Directorio oficial de entidades locales por provincia.", href: "https://administracion.gob.es/pag_Home/espanaAdmon/directorioOrganigramas/quienEsQuien/EELL.html" },
  { id: "local-2", name: "Buscador general de organismos", desc: "Filtra por administración local, autonómica o estatal.", href: "https://administracion.gob.es/pagFront/espanaAdmon/directorioOrganigrama/quienEsQuienOrganismos.htm" },
  { id: "local-3", name: "Buscador de oficinas", desc: "Para encontrar oficinas de atención, registro y puntos presenciales.", href: "https://administracion.gob.es/pag_Home/atencionCiudadana/encuentraTuOficina.html" },
  { id: "local-4", name: "Portal de Transparencia", desc: "Para solicitudes de información pública y alto cargo si toca apretar por esa vía.", href: "https://transparencia.gob.es" },
  { id: "local-5", name: "Canal 060", desc: "Puerta de entrada para contacto con la Administración.", href: "https://www.060.es" },
];

function buildSenateCards(province = "", commission = "", topicHint = "") {
  const label = province || "tu territorio";
  return [
    {
      icon: "🗺️",
      name: province ? `Ruta territorial para ${province}` : "Ruta territorial del Senado",
      desc: province ? `Empieza por la relación oficial de senadores electos por circunscripción y contrasta ${province} con el directorio alfabético.` : "Relación oficial de senadores electos por circunscripción.",
      href: "https://www.senado.es/web/composicionorganizacion/senadores/composicionsenado/consultaprocedenciageografica/electoscircunscripciones/index.html",
    },
    {
      icon: "🏛️",
      name: commission ? `Comisión: ${commission}` : "Comisiones del Senado",
      desc: commission ? `Comisión seleccionada. ${topicHint ? `Tema orientativo: ${topicHint}. ` : ""}Úsala para revisar sesiones, comparecencias y composición.` : "Listado oficial de comisiones y actividad.",
      href: "https://www.senado.es/web/actividadparlamentaria/sesionescomision/comisionessenado/index.html",
    },
    {
      icon: "🔤",
      name: "Directorio alfabético de senadores",
      desc: `Sirve para cerrar el círculo y localizar la ficha oficial de la persona que represente a ${label}.`,
      href: "https://www.senado.es/web/composicionorganizacion/senadores/composicionsenado/consultaordenalfabetico/index.html",
    },
    {
      icon: "🧾",
      name: "Senadores designados por parlamentos autonómicos",
      desc: "Si tu vía es autonómica, aquí se ve quién llega al Senado por designación.",
      href: "https://www.senado.es/web/composicionorganizacion/senadores/composicionsenado/consultaprocedenciageografica/designados/index.html",
    },
  ];
}

function docSeedFromDirectory(item) {
  if (!item) return "";
  if (item.kind === "ministerio") {
    return {
      type: "escrito_ministerio",
      issue: `Escrito dirigido a ${item.ministry}`,
      recipient: item.ministry,
      facts: `Área: ${item.area}. Contexto: [explica aquí el problema, trámite o petición].`,
      ask: `Que ${item.ministry} valore el caso, indique la unidad competente y responda por escrito.`,
    };
  }
  if (item.kind === "autonomica") {
    return {
      type: "escrito_autonomico",
      issue: `Escrito para ${item.name}`,
      recipient: `${item.name} · órgano o consejería competente`,
      facts: `Comunidad autónoma: ${item.name}. Contexto: [describe aquí el problema, trámite o petición].`,
      ask: "Que el órgano autonómico competente responda por escrito e indique el cauce de tramitación.",
    };
  }
  return {
    type: "escrito_ayuntamiento",
    issue: `Escrito administrativo sobre ${item.name}`,
    recipient: item.name,
    facts: "Contexto: [describe aquí la incidencia o petición].",
    ask: "Que la administración competente responda y tramite la solicitud por escrito.",
  };
}

const SENATE_BETA_LINKS = [
  { icon: "🧾", name: "Senadores en activo", desc: "Listado general actualizado", href: "https://www.senado.es/web/composicionorganizacion/senadores/composicionsenado/senadoresenactivo/index.html" },
  { icon: "🔤", name: "Orden alfabético", desc: "Directorio oficial de senadores y senadoras", href: "https://www.senado.es/web/composicionorganizacion/senadores/composicionsenado/consultaordenalfabetico/index.html" },
  { icon: "🗺️", name: "Electos por circunscripción", desc: "Relación territorial oficial", href: "https://www.senado.es/web/composicionorganizacion/senadores/composicionsenado/consultaprocedenciageografica/electoscircunscripciones/index.html" },
  { icon: "🏛️", name: "Designados por parlamentos autonómicos", desc: "Relación oficial de designados por comunidad autónoma", href: "https://www.senado.es/web/composicionorganizacion/senadores/composicionsenado/consultaprocedenciageografica/designados/index.html" },
  { icon: "📚", name: "Comisiones del Senado", desc: "Listado oficial de comisiones y actividad", href: "https://www.senado.es/web/actividadparlamentaria/sesionescomision/comisionessenado/index.html" },
];


const SYSTEM_PROMPT = `Eres el asistente de QuieroQuejarme.es, una ventanilla única de incidencia ciudadana en España.

OBJETIVO:
- Ayudar a la gente a entender qué puede hacer, a quién dirigirse y qué pasos concretos dar.
- Cuando tengas datos verificados sobre diputados o rankings parlamentarios, úsalos.

ESTILO:
- Español claro y útil.
- Cero relleno corporativo.
- No des información genérica si no entiendes la pregunta: pide precisión útil.
- Estructura con negritas y viñetas cortas.

CONTENIDO:
- Incluye qué hacer, a quién dirigirse, plazos si aplican y herramientas públicas.
- No eres abogado.
- Si hay crisis o riesgo, menciona 112/016/024/017/ANAR según el caso.`;

const SMART_FALLBACKS = {
  vivienda: "Puedo ayudarte con **vivienda** de forma muy concreta.\n\n- reclamar a un casero\n- entender una ley o medida\n- localizar qué diputados se mueven en vivienda\n- redactar un texto para presionar políticamente\n\nPrueba con algo como: **'quiero saber qué diputado se mueve más en vivienda'** o **'tengo un alquiler abusivo'**.",
  congreso: "Te puedo orientar en **incidencia parlamentaria** sin rodeos.\n\n- encontrar tu diputado\n- entender PNL, preguntas e ILP\n- ver quién se mueve más en un tema\n- redactar una petición\n\nPrueba con: **'quién es mi diputado por Sevilla'** o **'cómo pido una PNL sobre vivienda'**.",
  default: "No te he entendido del todo.\n\nPuedo ayudarte con una de estas rutas:\n\n- **encontrar a tu diputado**\n- **ver qué diputados se mueven más en un tema**\n- **explicar una herramienta** (PNL, ILP, petición, alegaciones)\n- **orientarte ante un problema** (vivienda, digital, consumo, empleo)\n\nEjemplos útiles:\n- **quién es el diputado que más hace sobre vivienda**\n- **quiero encontrar a mi representante en Málaga**\n- **cómo puedo presionar en el Congreso por alquileres**",
};

function normalize(text = "") {
  return text.toLowerCase();
}

function getFallback(text = "") {
  const l = normalize(text);
  if (/vivienda|alquiler|desahucio|hipoteca/.test(l)) return SMART_FALLBACKS.vivienda;
  if (/diputad|congreso|pnl|ilp|pregunta parlamentaria|peticion/.test(l)) return SMART_FALLBACKS.congreso;
  return SMART_FALLBACKS.default;
}

function guessDocType(seed = "") {
  const l = normalize(seed);
  if (/pnl/.test(l)) return "pnl";
  if (/pregunta parlamentaria|pregunta al gobierno/.test(l)) return "pregunta_parlamentaria";
  if (/senador|diputad|representante|correo|escribirle|mensaje/.test(l)) return "mensaje_representante";
  if (/ministerio|ministra|ministerial|secretar[ií]a de estado/.test(l)) return "escrito_ministerio";
  if (/comunidad aut[oó]noma|consejer[ií]a|parlamento auton[oó]mico/.test(l)) return "escrito_autonomico";
  if (/ayuntamiento|concejal[ií]a|alcald[ií]a|municipal/.test(l)) return "escrito_ayuntamiento";
  if (/defensor del pueblo/.test(l)) return "defensor_pueblo";
  if (/petici[oó]n.*europe|parlamento europeo|\bpe\b/.test(l)) return "peticion_pe";
  if (/petici[oó]n/.test(l)) return "peticion_cortes";
  if (/alegaci[oó]n|urbanismo|ordenanza|plan general/.test(l)) return "alegacion";
  if (/informaci[oó]n p[uú]blica|transparencia/.test(l)) return "solicitud_info";
  if (/casero|alquiler|vivienda|fianza/.test(l)) return "reclamacion_casero";
  if (/consumo|factura|teleco|banco|compra|energ[ií]a/.test(l)) return "reclamacion_consumo";
  if (/laboral|empleo|despido|acoso|n[oó]mina/.test(l)) return "denuncia_laboral";
  if (/arco|datos personales|protecci[oó]n de datos|deepfake|privacidad/.test(l)) return "derechos_arco";
  return "pnl";
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function stripMarkdown(value = "") {
  return String(value)
    .replace(/\*\*/g, "")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/`/g, "")
    .trim();
}

function normalizeDocSeed(seed) {
  if (!seed) return { type: "pnl", issue: "", recipient: "", facts: "", ask: "" };
  if (typeof seed === "string") {
    return {
      type: guessDocType(seed),
      issue: seed,
      recipient: "",
      facts: "",
      ask: "",
    };
  }
  const base = seed.seedText || seed.issue || "";
  return {
    type: seed.type || guessDocType(base),
    issue: seed.issue || base,
    recipient: seed.recipient || "",
    facts: seed.facts || "",
    ask: seed.ask || "",
  };
}

function extractQuotedSuggestion(text = "") {
  const match = String(text).match(/resúmeme a .*?escribirle/i);
  return match ? match[0] : "";
}

function extractDeputyName(text = "") {
  const raw = String(text || "");
  const candidates = [
    raw.match(/ficha verificada de ([^.\n]+)/i),
    raw.match(/resúmeme a ([^.\n]+?) y prepárame/i),
    raw.match(/sobre ([A-ZÁÉÍÓÚÑ][^?.\n]+)/),
  ].filter(Boolean);

  return candidates[0]?.[1]?.replace(/[“”"'`]/g, "").trim() || "";
}


function sanitizeSeedText(value = "") {
  const raw = String(value || "").trim();
  if (!raw) return "";
  return raw
    .replace(/^si quieres,? reformula as[ií] y te lo ordeno mejor:\s*/i, "")
    .replace(/^prueba con una de estas formulaciones:\s*/i, "")
    .replace(/^ejemplo [úu]til:\s*/i, "")
    .replace(/[“”]/g, '"')
    .replace(/^"|"$/g, "")
    .trim();
}

function buildDocSeedFromMessages(option = "", msgs = []) {
  const cleanMsgs = [...msgs].filter((m) => !m.loading);
  const rawLastUser = [...cleanMsgs].reverse().find((m) => m.role === "user")?.content || "";
  const lastUser = sanitizeSeedText(rawLastUser);
  const lastAssistantRaw = [...cleanMsgs].reverse().find((m) => m.role === "assistant" && m.source !== "intro")?.content || "";
  const lastAssistant = stripMarkdown(lastAssistantRaw);
  const suggestion = sanitizeSeedText(extractQuotedSuggestion(lastAssistant));
  const deputyName = extractDeputyName(`${lastAssistant}
${lastUser}`);
  const lower = normalize(`${option} ${lastUser} ${lastAssistant}`);
  const hasDeputyProfile = /he encontrado una ficha verificada de/i.test(lastAssistant) || Boolean(deputyName);
  const asksForInfoOnly = /qu[ií]ero saber m[aá]s|qui[eé]n es|qu[eé] actividad|c[oó]mo puedo dirigirme/.test(lower);
  const wantsMessage = /escribirle|mensaje|correo|prep[aá]rame un mensaje/.test(lower) || (hasDeputyProfile && option === "Generar documento");

  let ask = "Que tramiten esta petición o reclamación y respondan por escrito.";
  if (wantsMessage) ask = `Que ${deputyName ? `la oficina de ${deputyName}` : "el destinatario"} reciba este mensaje, valore el caso y responda con una vía de actuación.`;
  else if (asksForInfoOnly && deputyName) ask = `Que se facilite información pública y canales de contacto útiles sobre ${deputyName}.`;
  else if (/pnl|pregunta parlamentaria|congreso|diputad/.test(lower)) ask = "Que registren una iniciativa o realicen una actuación parlamentaria concreta sobre este asunto.";
  else if (/casero|alquiler|vivienda/.test(lower)) ask = "Que corrijan la situación descrita y den una respuesta por escrito.";
  else if (/consumo|factura|empresa|teleco|banco/.test(lower)) ask = "Que revisen el caso, corrijan la incidencia y respondan por escrito.";

  const issue = deputyName && wantsMessage
    ? `Mensaje para ${deputyName}`
    : deputyName && asksForInfoOnly
      ? `Solicitud de información sobre ${deputyName}`
      : sanitizeSeedText(suggestion || lastUser || option || "");

  const recipient = deputyName ? deputyName : "";

  const compactAssistant = lastAssistant
    .replace(/Si quieres, reformula así y te lo ordeno mejor:[\s\S]*$/i, "")
    .trim();

  const facts = compactAssistant
    ? `Contexto inicial de la consulta: ${lastUser || option || issue}

Pistas útiles extraídas del chat:
${compactAssistant}`
    : (lastUser ? `Contexto inicial de la consulta: ${lastUser}` : "");

  return {
    type: wantsMessage ? "peticion_cortes" : (asksForInfoOnly && deputyName ? "solicitud_info" : guessDocType(lower)),
    issue,
    recipient,
    facts,
    ask,
    seedText: `${issue}${compactAssistant ? `

${compactAssistant}` : ""}`.trim(),
  };
}

async function askAI(messages) {
  const lastMsg = messages[messages.length - 1]?.content || "";
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ system: SYSTEM_PROMPT, messages: messages.map((m) => ({ role: m.role, content: m.content })) }),
    });
    const data = await res.json();
    if (!data.text) {
      return { text: getFallback(lastMsg), source: "fallback", grounded: false, mode: "fallback" };
    }
    if (data.fallback) {
      return { text: data.text, source: "reformulación útil", grounded: false, mode: data.mode || "fallback" };
    }
    return {
      text: data.text,
      source: data.mode === "topic-ranking" ? "QHLD + Congreso" : data.mode === "deputy-profile" ? "perfil verificado" : data.mode === "clarify" ? "reformulación útil" : data.grounded ? "datos verificados" : "IA",
      grounded: Boolean(data.grounded),
      mode: data.mode || "llm",
    };
  } catch {
    return { text: getFallback(lastMsg), source: "fallback", grounded: false, mode: "fallback" };
  }
}

function SectionHead({ children, color = T.purple }) {
  return (
    <div style={{ display: "inline-block", background: color, borderRadius: T.rs, padding: "6px 16px", marginBottom: 12 }}>
      <h2 style={{ fontWeight: 800, fontSize: 14, color: "#fff", textTransform: "uppercase", letterSpacing: "0.03em" }}>{children}</h2>
    </div>
  );
}

function Chip({ children, bg, color }) {
  return <span style={{ background: bg, color, borderRadius: 999, padding: "4px 10px", fontSize: 11, fontWeight: 700 }}>{children}</span>;
}

function Md({ text = "" }) {
  return (
    <>
      {(text || "").split("\n").map((line, i) => {
        const isBullet = /^[-•→]\s/.test(line);
        const clean = isBullet ? line.replace(/^[-•→]\s/, "") : line;
        const parts = clean.split(/\*\*(.*?)\*\*/g);
        const rendered = parts.map((part, j) => {
          if (j % 2 === 1) return <strong key={j}>{part}</strong>;
          const links = part.split(/\[([^\]]+)\]\(([^)]+)\)/g);
          return links.map((chunk, k) => {
            if (k % 3 === 1) return null;
            if (k % 3 === 2) {
              return (
                <a key={k} href={chunk} target="_blank" rel="noreferrer" style={{ color: T.blue, textDecoration: "underline" }}>
                  {links[k - 1]}
                </a>
              );
            }
            return <span key={k}>{chunk}</span>;
          });
        });
        if (!line.trim()) return <div key={i} style={{ height: 10 }} />;
        if (isBullet) {
          return (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
              <span style={{ color: T.green, fontWeight: 800 }}>→</span>
              <div>{rendered}</div>
            </div>
          );
        }
        return <div key={i} style={{ marginBottom: 6 }}>{rendered}</div>;
      })}
    </>
  );
}

function TopBar({ title, subtitle, color, onBack }) {
  return (
    <div style={{ background: color, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10 }}>
      {onBack && (
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.18)", border: "none", color: "#fff", borderRadius: T.rs, padding: "7px 12px", cursor: "pointer", fontWeight: 700 }}>
          ←
        </button>
      )}
      <div>
        <div style={{ color: "#fff", fontWeight: 800, fontSize: 16 }}>{title}</div>
        {subtitle ? <div style={{ color: "rgba(255,255,255,0.82)", fontSize: 11 }}>{subtitle}</div> : null}
      </div>
    </div>
  );
}

function Landing({ go }) {
  const [tab, setTab] = useState("acciones");

  const actionCards = [
    { icon: "🔎", label: "Tu representante", color: T.blue, action: () => go("rep") },
    { icon: "💬", label: "Chat con IA", color: T.green, action: () => go("chat") },
    { icon: "📄", label: "Generar documento", color: T.orange, action: () => go("generator") },
    { icon: "📊", label: "Qué hacen los diputados", color: T.purple, action: () => go("chat", null, "¿Quién es el diputado que más hace sobre vivienda?") },
    { icon: "🏠", label: "Problemas cotidianos", color: T.pink, action: () => go("problem") },
    { icon: "✊", label: "Quiero influir", color: T.purple, action: () => go("influence") },
  ];

  const quickRoutes = [
    { icon: "🏠", t: "Alquiler abusivo", d: "Qué hacer paso a paso", color: T.green, q: "Tengo un problema de vivienda, alquiler abusivo" },
    { icon: "🏛️", t: "Cómo pedir una PNL", d: "Incidencia parlamentaria", color: T.purple, q: "Cómo pido una PNL sobre vivienda" },
    { icon: "📊", t: "Quién se mueve en vivienda", d: "Ranking temático QHLD", color: T.blue, q: "¿Quién es el diputado que más hace sobre vivienda?" },
    { icon: "💻", t: "Deepfake o ciberacoso", d: "Protección inmediata", color: T.orange, q: "Han hecho un deepfake mío, qué hago" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: T.f }}>
      <style>{CSS}</style>

      <div style={{ background: T.green, padding: "40px 24px 96px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <span style={{ background: T.yellow, color: T.dark, borderRadius: 999, padding: "4px 10px", fontWeight: 800, fontSize: 11 }}>BETA CÍVICA</span>
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 11 }}>Menos laberinto, más palancas</span>
          </div>
          <h1 style={{ color: "#fff", fontSize: 34, lineHeight: 1.05, marginBottom: 10, maxWidth: 760 }}>Tu derecho a quejarte. Tu poder para mover la política.</h1>
          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 15, lineHeight: 1.6, maxWidth: 760, marginBottom: 18 }}>
            Encuentra a tus diputados, mira quién se mueve de verdad en un tema, descarga plantillas y usa un chat que intenta apoyarse en datos verificables en vez de soltar humo con traje.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
            <Chip bg="rgba(255,255,255,0.18)" color="#fff">Congreso + QHLD</Chip>
            <Chip bg="rgba(255,255,255,0.18)" color="#fff">Plantillas listas</Chip>
            <Chip bg="rgba(255,255,255,0.18)" color="#fff">FAQ práctica</Chip>
          </div>
          <div className="hero-stack" style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <button onClick={() => go("chat")} style={heroButton(T.yellow, T.dark)}>Abrir el chat</button>
            <button onClick={() => go("rep")} style={heroOutlineButton()}>Encontrar representante</button>
            <button onClick={() => go("resources")} style={heroOutlineButton()}>Ver recursos</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1120, margin: "-44px auto 0", padding: "0 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 10 }}>
          {[
            { k: "350", l: "diputados en el Congreso", c: T.purple },
            { k: "QHLD", l: "actividad parlamentaria temática", c: T.blue },
            { k: "16", l: "plantillas e infografías", c: T.orange },
            { k: "FAQ", l: "respuestas rápidas sin jerga", c: T.green },
          ].map((item, i) => (
            <div key={i} style={{ background: "#fff", border: `2px solid ${T.border}`, borderRadius: T.r, padding: 16 }}>
              <div style={{ color: item.c, fontWeight: 900, fontSize: 26 }}>{item.k}</div>
              <div style={{ color: T.muted, fontSize: 12 }}>{item.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1120, margin: "44px auto 0", padding: "0 24px 40px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          {[{ id: "acciones", label: "Acciones rápidas" }, { id: "faq", label: "FAQ" }].map((item) => (
            <button key={item.id} onClick={() => setTab(item.id)} style={{ background: tab === item.id ? T.purple : "#fff", color: tab === item.id ? "#fff" : T.text, border: `2px solid ${tab === item.id ? T.purple : T.border}`, borderRadius: 999, padding: "8px 14px", fontSize: 12, fontWeight: 800, cursor: "pointer" }}>
              {item.label}
            </button>
          ))}
        </div>

        {tab === "acciones" ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 10 }}>
            {actionCards.map((a, i) => (
              <button key={i} onClick={a.action} style={{ background: "#fff", border: `2px solid ${a.color}30`, borderRadius: T.r, padding: 16, cursor: "pointer", textAlign: "left" }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{a.icon}</div>
                <div style={{ fontWeight: 800, fontSize: 14, color: a.color, marginBottom: 4 }}>{a.label}</div>
                <div style={{ color: T.muted, fontSize: 11 }}>Entrar →</div>
              </button>
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 10 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ background: "#fff", border: `2px solid ${T.border}`, borderRadius: T.r, padding: 16 }}>
                <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 8 }}>{faq.q}</div>
                <div style={{ color: T.muted, fontSize: 12, lineHeight: 1.6, marginBottom: 12 }}>{faq.a}</div>
                <button onClick={() => go("chat", null, faq.cta)} style={{ background: T.purpleBg, color: T.purple, border: `1px solid ${T.purple}30`, borderRadius: 999, padding: "7px 12px", fontSize: 11, fontWeight: 800, cursor: "pointer" }}>
                  Probar en el chat
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ maxWidth: 980, margin: "24px auto 0", padding: "0 16px" }}>
        <SectionHead color={T.pink}>Rutas más consultadas</SectionHead>
        <div style={{ display: "grid", gap: 8 }}>
          {quickRoutes.map((r, i) => (
            <button key={i} onClick={() => go("chat", null, r.q)} style={{ display: "flex", alignItems: "center", gap: 12, background: "#fff", border: `2px solid ${T.border}`, borderLeft: `5px solid ${r.color}`, borderRadius: T.r, padding: "14px 16px", cursor: "pointer", textAlign: "left" }}>
              <div style={{ fontSize: 22 }}>{r.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 14 }}>{r.t}</div>
                <div style={{ fontSize: 11, color: T.muted }}>{r.d}</div>
              </div>
              <div style={{ color: r.color, fontWeight: 900 }}>→</div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 980, margin: "24px auto 0", padding: "0 16px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <SectionHead color={T.orange}>Descargas útiles</SectionHead>
          <button onClick={() => go("resources")} style={{ background: T.orange, color: "#fff", border: "none", borderRadius: 999, padding: "7px 12px", fontSize: 11, fontWeight: 800, cursor: "pointer" }}>Ver todo</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: 8 }}>
          {RESOURCES.slice(0, 8).map((r, i) => (
            <a key={i} href={r.href} download style={{ textDecoration: "none", background: "#fff", border: `2px solid ${T.border}`, borderRadius: T.r, padding: 14, display: "block", textAlign: "center" }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{r.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 800, lineHeight: 1.3 }}>{r.t}</div>
            </a>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 980, margin: "0 auto", padding: "0 16px 26px" }}>
        <div style={{ background: T.purpleBg, border: `2px solid ${T.purple}22`, borderRadius: T.r, padding: 16 }}>
          <div style={{ fontWeight: 800, marginBottom: 6 }}>Cómo funciona</div>
          <div style={{ color: T.muted, fontSize: 13, lineHeight: 1.7 }}>
            1) eliges problema o objetivo, 2) localizas representantes o herramientas, 3) el chat intenta usar datos verificables cuando los tiene, especialmente con rankings temáticos de QHLD y listados de diputados. No hace milagros, pero intenta no venderte humo institucional con tipografía bonita.
          </div>
        </div>
      </div>

      <footer style={{ background: T.dark, padding: "14px 16px", textAlign: "center" }}>
        <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 11, marginBottom: 4 }}>QuieroQuejarme.es · democracia usable para gente ocupada</div>
        <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 10 }}>No sustituye asesoramiento legal. Emergencias: 112 · 016 · 024 · 017 · 900 20 20 10</div>
      </footer>
    </div>
  );
}

function heroButton(bg, color) {
  return { background: bg, color, border: "none", borderRadius: 999, padding: "11px 16px", fontSize: 13, fontWeight: 900, cursor: "pointer" };
}
function heroOutlineButton() {
  return { background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.28)", borderRadius: 999, padding: "9px 16px", fontSize: 13, fontWeight: 800, cursor: "pointer" };
}

function ProblemView({ go, onBack }) {
  return (
    <div style={{ minHeight: "100vh", background: T.bg }}>
      <style>{CSS}</style>
      <TopBar title="😤 Tengo un problema" subtitle="Escoge un tema y te llevo a una ruta útil" color={T.orange} onBack={onBack} />
      <div style={{ maxWidth: 980, margin: "0 auto", padding: 16 }}>
        <SectionHead color={T.orange}>¿Sobre qué tema?</SectionHead>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 10 }}>
          {PROBLEMS.map((p) => (
            <button key={p.id} onClick={() => go("chat", null, `Tengo un problema de ${p.label.toLowerCase()}. ¿Qué puedo hacer paso a paso?`)} style={{ background: "#fff", border: `2px solid ${T.border}`, borderBottom: `5px solid ${p.color}`, borderRadius: T.r, padding: 16, cursor: "pointer", textAlign: "left" }}>
              <div style={{ fontSize: 26 }}>{p.icon}</div>
              <div style={{ fontWeight: 800, fontSize: 14, marginTop: 8 }}>{p.label}</div>
              <div style={{ color: T.muted, fontSize: 11, marginTop: 4 }}>{p.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function InfluenceView({ go, onBack }) {
  return (
    <div style={{ minHeight: "100vh", background: T.bg }}>
      <style>{CSS}</style>
      <TopBar title="✊ Quiero influir" subtitle="Herramientas para empujar decisiones públicas" color={T.purple} onBack={onBack} />
      <div style={{ maxWidth: 980, margin: "0 auto", padding: 16 }}>
        <SectionHead color={T.purple}>¿Qué quieres hacer?</SectionHead>
        <div style={{ display: "grid", gap: 8 }}>
          {INFLUENCES.map((item) => (
            <button key={item.id} onClick={() => go("chat", null, `Quiero ${item.label.toLowerCase()}. Explícame cómo funciona y los pasos.`)} style={{ display: "flex", alignItems: "center", gap: 12, background: "#fff", border: `2px solid ${T.border}`, borderLeft: `5px solid ${item.color}`, borderRadius: T.r, padding: "14px 16px", cursor: "pointer", textAlign: "left" }}>
              <div style={{ fontSize: 22 }}>{item.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 14 }}>{item.label}</div>
                <div style={{ color: T.muted, fontSize: 11 }}>{item.desc}</div>
              </div>
              <Chip bg={`${item.color}14`} color={item.color}>{item.level}</Chip>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Chat({ onBack, initialQ, onGoRep, onGoDoc }) {
  const [msgs, setMsgs] = useState([
    {
      role: "assistant",
      content: "¡Hola! 👋 Soy el asistente de **QuieroQuejarme.es**.\n\nPuedo ayudarte a encontrar representantes, entender herramientas parlamentarias o ubicar qué diputados se mueven más en un tema.\n\n¿Qué necesitas?",
      qr: initialQ ? null : ["¿Quién es el diputado que más hace sobre vivienda?", "Quiero encontrar a mi representante", "Explícame cómo pedir una PNL", "Tengo un problema de alquiler"],
      source: "intro",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [didAuto, setDidAuto] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);
  useEffect(() => {
    if (initialQ && !didAuto) {
      setDidAuto(true);
      setTimeout(() => send(initialQ), 250);
    }
  }, [initialQ, didAuto]);

  function handleQR(text, msgIndex = null) {
    const t = normalize(text);
    if (t.includes("representante")) return onGoRep?.();
    if (/documento|reclamaci|plantilla|denuncia|alegaci|petici[oó]n|pnl/.test(t)) return onGoDoc?.(buildDocSeedFromMessages(text, msgs.slice(0, msgIndex === null ? msgs.length : msgIndex + 1)));
    if (/como escribirle|cómo escribirle/.test(t)) {
      const seed = buildDocSeedFromMessages("Necesito escribir a un representante", msgs.slice(0, msgIndex === null ? msgs.length : msgIndex + 1));
      return send(`Ayúdame a escribirle a un representante sobre esto: ${seed.issue || "este tema"}. Dame estructura, tono y pasos.`);
    }
    send(text);
  }

  async function send(text) {
    if (!text.trim() || loading) return;
    const clean = text.trim();
    const newMsgs = [...msgs, { role: "user", content: clean }];
    setMsgs([...newMsgs, { role: "assistant", content: "", loading: true }]);
    setInput("");
    setLoading(true);

    const history = newMsgs.filter((m) => !m.loading && !m.qr).slice(-10).map((m) => ({ role: m.role, content: m.content }));
    const reply = await askAI(history);
    const lower = normalize(reply.text);

    let qr = ["Buscar representante", "Generar documento", "Otra pregunta"];
    if (/resumeme a|resúmeme a|ficha verificada/.test(lower)) qr = ["Cómo escribirle", "Generar documento", "Buscar representante"];
    if (/vivienda|alquiler/.test(lower)) qr = ["Buscar representante", "Tengo otro problema de vivienda", "Generar reclamación"];
    if (/diputad|qhld|ranking|perfil verificado/.test(lower) || reply.mode === "deputy-profile") qr = ["Buscar representante", "Cómo escribirle", "Generar documento", "Otra temática"];
    if (/pnl|ilp|petici[oó]n|pregunta parlamentaria/.test(lower)) qr = ["Generar documento", "Buscar representante", "Otra herramienta"];

    setMsgs([...newMsgs, { role: "assistant", content: reply.text, qr, source: reply.source, mode: reply.mode }]);
    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: T.bg }}>
      <style>{CSS}</style>
      <TopBar title="💬 Chat de incidencia" subtitle="Mejor con tema + objetivo: 'vivienda + Congreso'" color={T.green} onBack={onBack} />

      <div className="chat-shell">
        <div style={{ margin: "8px 16px 14px", background: T.yellowBg, border: `2px solid ${T.yellow}`, borderRadius: T.r, padding: "14px 16px", fontSize: 12, lineHeight: 1.7 }}>
          <strong>Consejo útil:</strong> si preguntas por una temática concreta — por ejemplo vivienda, sanidad o educación — el chat intentará usar rankings temáticos de QHLD cuando existan.
        </div>

        <div className="chat-list">
          {msgs.map((m, i) => (
            <div key={i} style={{ marginBottom: 12, animation: "fadeIn .25s" }}>
              <div className={`chat-row ${m.role === "user" ? "user" : "assistant"}`}>
                {m.role !== "user" && <div className="chat-avatar">⚡</div>}
                <div className="chat-bubble" style={{ background: m.role === "user" ? T.purple : "#fff", color: m.role === "user" ? "#fff" : T.text, border: m.role === "user" ? "none" : `2px solid ${T.border}`, borderRadius: 22, padding: "16px 18px", fontSize: 13, lineHeight: 1.7, boxShadow: m.role === "user" ? "none" : "0 8px 20px rgba(0,0,0,0.03)" }}>
                  {m.loading ? (
                    <div style={{ display: "flex", gap: 5 }}>
                      {[0, 1, 2].map((j) => <div key={j} style={{ width: 7, height: 7, borderRadius: "50%", background: T.green, animation: `pulse 1.2s ${j * 0.15}s infinite` }} />)}
                    </div>
                  ) : (
                    <Md text={m.content} />
                  )}
                  {m.source && m.role !== "user" && m.source !== "intro" && !m.loading ? (
                    <div style={{ marginTop: 8 }}>
                      <Chip bg={m.mode === "topic-ranking" ? T.blueBg : T.greenBg} color={m.mode === "topic-ranking" ? T.blue : T.green}>{m.source}</Chip>
                    </div>
                  ) : null}
                </div>
              </div>
              {m.qr ? (
                <div className="chat-quick" style={{ display: "flex", flexWrap: "wrap", gap: 6, margin: "8px 0 0 46px" }}>
                  {m.qr.map((option, j) => (
                    <button key={j} onClick={() => handleQR(option, i)} style={{ background: T.purpleBg, border: `1px solid ${T.purple}22`, color: T.purple, borderRadius: 999, padding: "6px 12px", fontSize: 11, fontWeight: 800, cursor: "pointer" }}>
                      {option}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <div className="chat-inputbar">
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send(input)} placeholder="Ejemplo: quién es el diputado que más hace sobre vivienda" disabled={loading} className="chat-input" />
          <button onClick={() => send(input)} disabled={!input.trim() || loading} className="chat-send" style={{ background: input.trim() && !loading ? T.green : T.border, color: "#fff", cursor: input.trim() && !loading ? "pointer" : "default" }}>
            →
          </button>
        </div>
      </div>
    </div>
  );
}

function RepFinder({ onBack, onAsk, onOpenDirectory, onGoDoc }) {
  const [scope, setScope] = useState("congreso");
  const [prov, setProv] = useState("");
  const [topic, setTopic] = useState("");
  const [commission, setCommission] = useState("");
  const [topics, setTopics] = useState([]);
  const [deputies, setDeputies] = useState([]);
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [senProv, setSenProv] = useState("");
  const [senCommission, setSenCommission] = useState("");
  const [senateLinks, setSenateLinks] = useState(buildSenateCards());
  const [senateTopicHint, setSenateTopicHint] = useState("");
  const [senateLoading, setSenateLoading] = useState(false);
  const [senateResults, setSenateResults] = useState([]);
  const [senateNotice, setSenateNotice] = useState("");

  useEffect(() => {
    fetch("/api/topics").then((r) => r.json()).then((data) => setTopics(data.topics || [])).catch(() => setTopics([]));
  }, []);

  async function fetchDeps(province = "", selectedTopic = "") {
    setLoading(true);
    setError("");
    setDeputies([]);
    setRanking([]);
    try {
      const params = new URLSearchParams();
      if (province) params.set("provincia", province);
      if (selectedTopic) params.set("tema", selectedTopic);
      const res = await fetch(`/api/deputies?${params.toString()}`);
      const data = await res.json();
      if (data.deputies?.length) {
        setDeputies(data.deputies);
        setRanking(data.ranking || []);
      } else {
        setError(data.error || "No he encontrado representantes para ese filtro.");
      }
    } catch {
      setError("No se pudo cargar la información en este momento.");
    }
    setLoading(false);
  }

  async function fetchSenators(province = "", comision = "") {
    setSenateLoading(true);
    setSenateResults([]);
    setSenateNotice("");
    const localTopic = SENATE_COMMISSION_OPTIONS.find((item) => item.name === comision)?.topic || "";
    setSenateLinks(buildSenateCards(province, comision, localTopic));
    setSenateTopicHint(localTopic);
    try {
      const params = new URLSearchParams();
      if (province) params.set("provincia", province);
      if (comision) params.set("comision", comision);
      const res = await fetch(`/api/senators?${params.toString()}`);
      const data = await res.json();
      setSenateLinks(buildSenateCards(province, comision, data.topicHint || localTopic));
      setSenateTopicHint(data.topicHint || localTopic || "");
      setSenateResults(data.senators || []);
      setSenateNotice(data.notice || "");
    } catch {
      setSenateLinks(buildSenateCards(province, comision, localTopic));
      setSenateTopicHint(localTopic);
      setSenateNotice("No se pudo cargar la información del Senado en este momento.");
    }
    setSenateLoading(false);
  }

  function selectCongressCommission(value) {
    setCommission(value);
    const mapped = CONGRESS_COMMISSION_OPTIONS.find((item) => item.name === value)?.topic || "";
    if (mapped) setTopic(mapped);
  }

  function selectSenateCommission(value) {
    setSenCommission(value);
    fetchSenators(senProv, value);
  }

  function renderDeputyCard(d, idx) {
    const congressHref = d.links?.congressProfile || d.links?.congressSearch || "https://www.congreso.es/es/busqueda-de-diputados";
    const qhldHref = d.links?.qhld || "https://quehacenlosdiputados.es/diputados";
    const twitterHref = d.twitter ? (String(d.twitter).startsWith("http") ? d.twitter : `https://x.com/${String(d.twitter).replace(/^@/, "")}`) : "";
    return (
      <div key={idx} style={{ background: "#fff", border: `2px solid ${T.border}`, borderRadius: T.r, overflow: "hidden" }}>
        <div style={{ display: "flex", gap: 12, padding: 14 }}>
          <div style={{ width: 72, height: 88, borderRadius: 12, overflow: "hidden", background: T.purpleBg, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {d.photoUrl ? <img src={d.photoUrl} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: 26 }}>🏛️</span>}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 800, fontSize: 14, lineHeight: 1.3 }}>{d.name}</div>
            {d.topicScore ? <div style={{ marginTop: 4, color: T.blue, fontSize: 11, fontWeight: 900 }}>Actividad en {topic}: {d.topicScore}/100{d.topicRank ? ` · #${d.topicRank}` : ""}</div> : null}
            {d.group ? <div style={{ marginTop: 4, color: T.purple, fontSize: 11, fontWeight: 700 }}>{d.group}</div> : null}
            {d.party && d.party !== d.group ? <div style={{ color: T.muted, fontSize: 11, marginTop: 2 }}>{d.party}</div> : null}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
              <a href={congressHref} target="_blank" rel="noreferrer" style={miniLink(T.blueBg, T.blue)}>🏛️ Ficha Congreso</a>
              <a href={qhldHref} target="_blank" rel="noreferrer" style={miniLink(T.purpleBg, T.purple)}>📊 Ficha QHLD</a>
              {d.email ? <a href={`mailto:${d.email}`} style={miniLink(T.greenBg, T.green)}>✉️ Email</a> : null}
              {twitterHref ? <a href={twitterHref} target="_blank" rel="noreferrer" style={miniLink(T.orangeBg, T.orange)}>𝕏 Perfil</a> : null}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, padding: "0 14px 14px" }}>
          <button onClick={() => onAsk?.(d)} style={{ flex: 1, background: T.green, color: "#fff", border: "none", borderRadius: 12, padding: "10px 12px", fontSize: 12, fontWeight: 800, cursor: "pointer" }}>Preguntar a la IA</button>
          <a href={qhldHref} target="_blank" rel="noreferrer" style={{ ...miniLink(T.purpleBg, T.purple), display: "flex", alignItems: "center", justifyContent: "center", minWidth: 90, fontSize: 11 }}>Abrir QHLD ↗</a>
        </div>
      </div>
    );
  }

  function renderSenatorCard(s, idx) {
    const profileHref = s.senateProfileUrl || s.senateSearchUrl || "https://www.senado.es/web/composicionorganizacion/senadores/composicionsenado/consultaordenalfabetico/index.html";
    return (
      <div key={`sen-${idx}-${s.name}`} style={{ background: "#fff", border: `2px solid ${T.border}`, borderRadius: T.r, overflow: "hidden" }}>
        <div style={{ display: "flex", gap: 12, padding: 14 }}>
          <div style={{ width: 72, height: 88, borderRadius: 12, overflow: "hidden", background: T.blueBg, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 26 }}>🏛️</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 800, fontSize: 14, lineHeight: 1.3 }}>{s.name}</div>
            <div style={{ color: T.blue, fontSize: 11, fontWeight: 800, marginTop: 4 }}>{[s.group, s.province].filter(Boolean).join(" · ")}</div>
            {s.summary ? <div style={{ color: T.muted, fontSize: 11, marginTop: 6 }}>{s.summary}</div> : null}
            {Array.isArray(s.commissionLines) && s.commissionLines.length ? <div style={{ color: T.muted, fontSize: 11, marginTop: 6 }}>Comisiones verificadas: {s.commissionLines.slice(0, 2).join(" · ")}</div> : null}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
              <a href={profileHref} target="_blank" rel="noreferrer" style={miniLink(T.blueBg, T.blue)}>🏛️ Ficha Senado</a>
              <a href={s.senateSearchUrl || "https://www.senado.es/web/composicionorganizacion/senadores/composicionsenado/consultaordenalfabetico/index.html"} target="_blank" rel="noreferrer" style={miniLink(T.purpleBg, T.purple)}>🔎 Buscar en Senado</a>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, padding: "0 14px 14px" }}>
          <button onClick={() => onAsk?.({ name: s.name, chamber: "Senado", province: s.province, links: { senateProfile: profileHref } })} style={{ flex: 1, background: T.green, color: "#fff", border: "none", borderRadius: 12, padding: "10px 12px", fontSize: 12, fontWeight: 800, cursor: "pointer" }}>Preguntar a la IA</button>
          <a href={profileHref} target="_blank" rel="noreferrer" style={{ ...miniLink(T.blueBg, T.blue), display: "flex", alignItems: "center", justifyContent: "center", minWidth: 96, fontSize: 11 }}>Abrir ficha ↗</a>
        </div>
      </div>
    );
  }


  return (
    <div style={{ minHeight: "100vh", background: T.bg }}>
      <style>{CSS}</style>
      <TopBar title="🔎 Encuentra a tu representante" subtitle="Congreso, Senado y directorios institucionales" color={T.blue} onBack={onBack} />
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: 20 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
          {[["congreso", "Congreso"], ["senado", "Senado"], ["directorios", "Directorios oficiales"]].map(([value, label]) => (
            <button key={value} onClick={() => setScope(value)} style={{ background: scope === value ? T.purple : "#fff", color: scope === value ? "#fff" : T.text, border: `2px solid ${scope === value ? T.purple : T.border}`, borderRadius: 999, padding: "8px 14px", fontSize: 12, fontWeight: 800, cursor: "pointer" }}>{label}</button>
          ))}
        </div>

        {scope === "congreso" ? (
          <>
            <div style={{ background: "#fff", border: `2px solid ${T.border}`, borderRadius: T.r, padding: 18, marginBottom: 14 }}>
              <div className="rep-toolbar" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 800, marginBottom: 8 }}>Provincia</div>
                  <select value={prov} onChange={(e) => setProv(e.target.value)} style={{ width: "100%", padding: 14, borderRadius: 16, border: `2px solid ${T.border}`, fontSize: 15, background: T.bg }}>
                    <option value="">Toda España</option>
                    {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <div style={{ fontWeight: 800, marginBottom: 8 }}>Temática QHLD</div>
                  <select value={topic} onChange={(e) => setTopic(e.target.value)} style={{ width: "100%", padding: 14, borderRadius: 16, border: `2px solid ${T.border}`, fontSize: 15, background: T.bg }}>
                    <option value="">Sin filtro temático</option>
                    {topics.map((t) => <option key={t.id || t.slug || t.name} value={t.name}>{t.name}</option>)}
                  </select>
                </div>
                <div>
                  <div style={{ fontWeight: 800, marginBottom: 8 }}>Comisión oficial del Congreso</div>
                  <select value={commission} onChange={(e) => selectCongressCommission(e.target.value)} style={{ width: "100%", padding: 14, borderRadius: 16, border: `2px solid ${T.border}`, fontSize: 15, background: T.bg }}>
                    <option value="">Sin filtro por comisión</option>
                    {CONGRESS_COMMISSION_OPTIONS.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div style={{ display: "flex", alignItems: "end" }}>
                  <button onClick={() => fetchDeps(prov, topic)} style={{ width: "100%", background: T.blue, color: "#fff", border: "none", borderRadius: 16, padding: "14px 16px", fontWeight: 900, cursor: "pointer" }}>Buscar</button>
                </div>
              </div>
              <div style={{ marginTop: 10, color: T.muted, fontSize: 12, lineHeight: 1.65 }}>
                La comisión oficial sirve como atajo político. Si tiene correspondencia temática, la uso para ordenar por actividad de QHLD. Traducción simultánea entre burocracia y vida real.
              </div>
              {commission ? <div style={{ marginTop: 10 }}><Chip bg={T.blueBg} color={T.blue}>Comisión seleccionada: {commission}{topic ? ` → ranking temático ${topic}` : ""}</Chip></div> : null}
            </div>

            {loading ? <div style={{ padding: 30, textAlign: "center", color: T.muted }}>Consultando Congreso y cruzando con QHLD…</div> : null}
            {error ? <div style={{ background: T.orangeBg, border: `2px solid ${T.orange}`, borderRadius: T.r, padding: 14, color: T.orange, fontWeight: 700, marginBottom: 14 }}>{error}</div> : null}

            {ranking.length > 0 ? (
              <div style={{ background: T.blueBg, border: `2px solid ${T.blue}`, borderRadius: T.r, padding: 16, marginBottom: 14 }}>
                <div style={{ fontWeight: 900, marginBottom: 6 }}>{prov ? `Top actividad en ${topic} + representantes de ${prov}` : `Top estatal en ${topic}`}</div>
                <div style={{ color: T.muted, fontSize: 12, lineHeight: 1.7, marginBottom: 8 }}>Arriba ves el ranking temático de QHLD; debajo, el listado cruzado con Congreso para que tengas nombres y fichas públicas.</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 10 }}>
                  {ranking.slice(0, 6).map((item) => (
                    <a key={item.rank + item.name} href={item.qhldUrl} target="_blank" rel="noreferrer" style={{ textDecoration: "none", background: "#fff", border: `2px solid ${T.border}`, borderRadius: 14, padding: 12 }}>
                      <div style={{ color: T.blue, fontSize: 11, fontWeight: 900, marginBottom: 4 }}>#{item.rank} · {item.score}/100</div>
                      <div style={{ fontWeight: 800, fontSize: 13 }}>{item.name}</div>
                      <div style={{ color: T.muted, fontSize: 11 }}>{[item.party, item.province].filter(Boolean).join(" · ")}</div>
                    </a>
                  ))}
                </div>
              </div>
            ) : null}

            {deputies.length > 0 ? (
              <>
                <SectionHead color={T.purple}>{prov ? `Representantes de ${prov}` : "Representantes"} ({deputies.length})</SectionHead>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 12, marginBottom: 20 }}>
                  {deputies.map(renderDeputyCard)}
                </div>
              </>
            ) : null}
          </>
        ) : null}

        {scope === "senado" ? (
          <div style={{ display: "grid", gap: 14 }}>
            <div style={{ background: T.yellowBg, border: `2px solid ${T.yellow}`, borderRadius: T.r, padding: 16, lineHeight: 1.7, fontSize: 13 }}>
              <strong>Senado:</strong> aquí tienes buscador territorial y comisiones oficiales. Todavía no hago cruce fino senador-a-senador, pero ya no te mando a pasear por internet sin mapa.
            </div>
            <div style={{ background: "#fff", border: `2px solid ${T.border}`, borderRadius: T.r, padding: 18 }}>
              <div className="rep-toolbar" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 800, marginBottom: 8 }}>Provincia / territorio</div>
                  <select value={senProv} onChange={(e) => setSenProv(e.target.value)} style={{ width: "100%", padding: 14, borderRadius: 16, border: `2px solid ${T.border}`, fontSize: 15, background: T.bg }}>
                    <option value="">Sin filtro territorial</option>
                    {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <div style={{ fontWeight: 800, marginBottom: 8 }}>Comisión oficial del Senado</div>
                  <select value={senCommission} onChange={(e) => selectSenateCommission(e.target.value)} style={{ width: "100%", padding: 14, borderRadius: 16, border: `2px solid ${T.border}`, fontSize: 15, background: T.bg }}>
                    <option value="">Sin filtro por comisión</option>
                    {SENATE_COMMISSION_OPTIONS.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div style={{ display: "flex", alignItems: "end" }}>
                  <button onClick={() => fetchSenators(senProv, senCommission)} style={{ width: "100%", background: T.blue, color: "#fff", border: "none", borderRadius: 16, padding: "14px 16px", fontWeight: 900, cursor: "pointer" }}>Buscar en Senado</button>
                </div>
              </div>
              {senateTopicHint ? <div style={{ marginTop: 10 }}><Chip bg={T.greenBg} color={T.green}>Esta comisión suele tocar: {senateTopicHint}</Chip></div> : null}
            </div>
            {senateLoading ? <div style={{ padding: 20, color: T.muted }}>Consultando Senado y cruzando fichas oficiales…</div> : null}
            {senateNotice ? <div style={{ background: T.yellowBg, border: `2px solid ${T.yellow}`, borderRadius: T.r, padding: 14, color: T.text, fontSize: 13 }}>{senateNotice}</div> : null}
            {senateResults.length > 0 ? (
              <>
                <SectionHead color={T.blue}>Senadores encontrados ({senateResults.length})</SectionHead>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 12, marginBottom: 14 }}>
                  {senateResults.map(renderSenatorCard)}
                </div>
              </>
            ) : null}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 12 }}>
              {senateLinks.map((item) => (
                <a key={item.name} href={item.href} target="_blank" rel="noreferrer" style={{ textDecoration: "none", background: "#fff", border: `2px solid ${T.border}`, borderRadius: T.r, padding: 16 }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon || "🏛️"}</div>
                  <div style={{ fontWeight: 900, marginBottom: 4 }}>{item.name}</div>
                  <div style={{ color: T.muted, fontSize: 12 }}>{item.desc}</div>
                </a>
              ))}
            </div>
            <div style={{ background: "#fff", border: `2px solid ${T.border}`, borderRadius: T.r, padding: 16 }}>
              <div style={{ fontWeight: 900, marginBottom: 8 }}>Contacto general del Senado</div>
              <div style={{ fontSize: 13, lineHeight: 1.8 }}>Bailén, 3. 28071 Madrid · 915 381 000 · informacion@senado.es</div>
            </div>
          </div>
        ) : null}

        {scope === "directorios" ? (
          <div style={{ display: "grid", gap: 16 }}>
            <div style={{ background: "#fff", border: `2px solid ${T.border}`, borderRadius: T.r, padding: 16 }}>
              <SectionHead color={T.green}>Ministerios por área</SectionHead>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 12 }}>
                {MINISTRY_AREA_CONTACTS.map((item) => (
                  <button key={item.id} onClick={() => onOpenDirectory?.({ ...item, kind: "ministerio" })} style={{ textAlign: "left", background: T.bg, border: `2px solid ${T.border}`, borderRadius: 14, padding: 14, cursor: "pointer" }}>
                    <div style={{ fontSize: 24, marginBottom: 6 }}>🏛️</div>
                    <div style={{ fontWeight: 800, marginBottom: 4 }}>{item.area}</div>
                    <div style={{ color: T.muted, fontSize: 12, lineHeight: 1.6 }}>{item.ministry}</div>
                    <div style={{ color: T.muted, fontSize: 11, lineHeight: 1.6, marginTop: 6 }}>{item.summary}</div>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ background: "#fff", border: `2px solid ${T.border}`, borderRadius: T.r, padding: 16 }}>
              <SectionHead color={T.purple}>Autonómica y parlamentos</SectionHead>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 10 }}>
                {AUTONOMIC_DIRECTORY.map((item) => (
                  <button key={item.id} onClick={() => onOpenDirectory?.({ ...item, kind: "autonomica" })} style={{ textAlign: "left", background: T.bg, border: `2px solid ${T.border}`, borderRadius: 14, padding: 14, cursor: "pointer" }}>
                    <div style={{ fontWeight: 800, marginBottom: 4 }}>{item.name}</div>
                    <div style={{ color: T.muted, fontSize: 12, lineHeight: 1.6 }}>{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ background: "#fff", border: `2px solid ${T.border}`, borderRadius: T.r, padding: 16 }}>
              <SectionHead color={T.orange}>Ayuntamientos y acceso general</SectionHead>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 10 }}>
                {LOCAL_DIRECTORY.map((item) => (
                  <div key={item.id} style={{ background: T.bg, border: `2px solid ${T.border}`, borderRadius: 14, padding: 14 }}>
                    <div style={{ fontWeight: 800, marginBottom: 4 }}>{item.name}</div>
                    <div style={{ color: T.muted, fontSize: 12, lineHeight: 1.6, marginBottom: 8 }}>{item.desc}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      <a href={item.href} target="_blank" rel="noreferrer" style={miniLink(T.blueBg, T.blue)}>Abrir</a>
                      <button onClick={() => onGoDoc?.(docSeedFromDirectory({ ...item, kind: "local" }))} style={{ ...miniLink(T.purpleBg, T.purple), border: "none", cursor: "pointer" }}>Generar escrito</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function miniLink(bg, color) {
  return { background: bg, color, borderRadius: 999, padding: "5px 9px", fontSize: 10, fontWeight: 800, textDecoration: "none" };
}


function DirectoryDetail({ item, onBack, onGoDoc }) {
  if (!item) return null;
  const isMinistry = item.kind === "ministerio";
  const isAutonomic = item.kind === "autonomica";

  return (
    <div style={{ minHeight: "100vh", background: T.bg }}>
      <style>{CSS}</style>
      <TopBar title={isMinistry ? "🏛️ Ficha ministerial" : isAutonomic ? "🗺️ Ficha autonómica" : "📚 Directorio"} subtitle={item.name || item.area || ""} color={isMinistry ? T.green : T.purple} onBack={onBack} />
      <div style={{ maxWidth: 980, margin: "0 auto", padding: 16, display: "grid", gap: 16 }}>
        <div style={{ background: "#fff", border: `2px solid ${T.border}`, borderRadius: T.r, padding: 18 }}>
          <SectionHead color={isMinistry ? T.green : T.purple}>{isMinistry ? item.area : item.name}</SectionHead>
          <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 8 }}>{isMinistry ? item.ministry : item.name}</div>
          <div style={{ color: T.muted, fontSize: 13, lineHeight: 1.75, marginBottom: 14 }}>
            {isMinistry ? item.summary : item.desc}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 10 }}>
            {isMinistry ? (
              <>
                <a href={item.organigram} target="_blank" rel="noreferrer" style={{ textDecoration: "none", background: T.bg, border: `2px solid ${T.border}`, borderRadius: 14, padding: 14 }}>
                  <div style={{ fontWeight: 900, marginBottom: 4 }}>Organigrama oficial</div>
                  <div style={{ color: T.muted, fontSize: 12 }}>Abre la estructura y altos cargos del ministerio correcto.</div>
                </a>
                <a href={item.web} target="_blank" rel="noreferrer" style={{ textDecoration: "none", background: T.bg, border: `2px solid ${T.border}`, borderRadius: 14, padding: 14 }}>
                  <div style={{ fontWeight: 900, marginBottom: 4 }}>Web del ministerio</div>
                  <div style={{ color: T.muted, fontSize: 12 }}>Portada oficial para trámites, noticias y secciones temáticas.</div>
                </a>
                <a href={item.transparency} target="_blank" rel="noreferrer" style={{ textDecoration: "none", background: T.bg, border: `2px solid ${T.border}`, borderRadius: 14, padding: 14 }}>
                  <div style={{ fontWeight: 900, marginBottom: 4 }}>Transparencia / funciones</div>
                  <div style={{ color: T.muted, fontSize: 12 }}>Para ver estructura, normativa o funciones del departamento.</div>
                </a>
                <a href="https://www.060.es" target="_blank" rel="noreferrer" style={{ textDecoration: "none", background: T.bg, border: `2px solid ${T.border}`, borderRadius: 14, padding: 14 }}>
                  <div style={{ fontWeight: 900, marginBottom: 4 }}>Canal 060</div>
                  <div style={{ color: T.muted, fontSize: 12 }}>{item.contact}</div>
                </a>
              </>
            ) : (
              <>
                <a href={item.adminHref} target="_blank" rel="noreferrer" style={{ textDecoration: "none", background: T.bg, border: `2px solid ${T.border}`, borderRadius: 14, padding: 14 }}>
                  <div style={{ fontWeight: 900, marginBottom: 4 }}>Directorio autonómico oficial</div>
                  <div style={{ color: T.muted, fontSize: 12 }}>Abre la ficha oficial de {item.name} en administracion.gob.es.</div>
                </a>
                <a href={item.searchHref} target="_blank" rel="noreferrer" style={{ textDecoration: "none", background: T.bg, border: `2px solid ${T.border}`, borderRadius: 14, padding: 14 }}>
                  <div style={{ fontWeight: 900, marginBottom: 4 }}>Buscador de organismos</div>
                  <div style={{ color: T.muted, fontSize: 12 }}>Para localizar consejerías, agencias y unidades con filtro autonómico.</div>
                </a>
                <a href={item.senateHref} target="_blank" rel="noreferrer" style={{ textDecoration: "none", background: T.bg, border: `2px solid ${T.border}`, borderRadius: 14, padding: 14 }}>
                  <div style={{ fontWeight: 900, marginBottom: 4 }}>Senadores designados</div>
                  <div style={{ color: T.muted, fontSize: 12 }}>Útil para conectar parlamento autonómico y Senado cuando toque presión institucional.</div>
                </a>
                <a href="https://www.060.es" target="_blank" rel="noreferrer" style={{ textDecoration: "none", background: T.bg, border: `2px solid ${T.border}`, borderRadius: 14, padding: 14 }}>
                  <div style={{ fontWeight: 900, marginBottom: 4 }}>Canal 060</div>
                  <div style={{ color: T.muted, fontSize: 12 }}>Entrada general para contacto administrativo y oficinas.</div>
                </a>
              </>
            )}
          </div>
        </div>
        <div style={{ background: T.yellowBg, border: `2px solid ${T.yellow}`, borderRadius: T.r, padding: 16, fontSize: 13, lineHeight: 1.7 }}>
          <strong>Ruta recomendada:</strong> empieza por el órgano competente, revisa su estructura y, si necesitas presión política o una respuesta formal, genera un escrito base y adáptalo antes de enviarlo.
          <div style={{ marginTop: 12 }}>
            <button onClick={() => onGoDoc?.(docSeedFromDirectory(item))} style={{ background: T.orange, color: "#fff", border: "none", borderRadius: 12, padding: "10px 12px", fontWeight: 800, cursor: "pointer" }}>Generar escrito base</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Recursos({ onBack }) {
  const [filter, setFilter] = useState("all");
  const list = useMemo(() => (filter === "all" ? RESOURCES : RESOURCES.filter((r) => r.type === filter)), [filter]);

  return (
    <div style={{ minHeight: "100vh", background: T.bg }}>
      <style>{CSS}</style>
      <TopBar title="📥 Plantillas e infografías" subtitle="Descargas listas para editar o usar" color={T.orange} onBack={onBack} />
      <div style={{ maxWidth: 980, margin: "0 auto", padding: 16 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
          {[
            ["all", "Todo"],
            ["p", "📄 Plantillas"],
            ["i", "🎨 Infografías"],
          ].map(([value, label]) => (
            <button key={value} onClick={() => setFilter(value)} style={{ background: filter === value ? T.purple : "#fff", color: filter === value ? "#fff" : T.text, border: `2px solid ${filter === value ? T.purple : T.border}`, borderRadius: 999, padding: "8px 14px", fontSize: 12, fontWeight: 800, cursor: "pointer" }}>
              {label}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 10 }}>
          {list.map((r, i) => (
            <a key={i} href={r.href} download style={{ textDecoration: "none", background: "#fff", border: `2px solid ${T.border}`, borderRadius: T.r, padding: 16 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{r.icon}</div>
              <div style={{ fontWeight: 800, fontSize: 13, lineHeight: 1.3, marginBottom: 4 }}>{r.t}</div>
              <div style={{ color: T.muted, fontSize: 11 }}>{r.type === "p" ? "Documento editable" : "PDF descargable"}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function Generador({ onBack, initialSeed, onOpenResources }) {
  const boot = normalizeDocSeed(initialSeed);
  const [type, setType] = useState(boot.type);
  const [issue, setIssue] = useState(boot.issue);
  const [recipient, setRecipient] = useState(boot.recipient);
  const [facts, setFacts] = useState(boot.facts);
  const [ask, setAsk] = useState(boot.ask);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const currentType = DOC_TYPES.find((d) => d.id === type) || DOC_TYPES[0];

  useEffect(() => {
    const next = normalizeDocSeed(initialSeed);
    setType(next.type);
    setIssue(next.issue);
    setRecipient(next.recipient);
    setFacts(next.facts);
    setAsk(next.ask);
  }, [initialSeed]);

  async function generate() {
    if (!issue.trim() || !facts.trim() || !ask.trim()) return;
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("/api/document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, issue, recipient, facts, ask }),
      });
      const data = await res.json();
      setResult(data.text || "No se pudo generar el borrador.");
    } catch {
      setResult("No se pudo generar el borrador en este momento.");
    }
    setLoading(false);
  }

  function downloadDoc() {
    if (!result) return;
    const title = `${currentType.label} — borrador`;
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(title)}</title></head><body style="font-family:Arial,sans-serif;line-height:1.55;padding:32px;color:#222"><h1 style="font-size:22px">${escapeHtml(title)}</h1><p style="color:#666">Generado en QuieroQuejarme.es</p><div>${escapeHtml(result).split("\n").join("<br>")}</div></body></html>`;
    const blob = new Blob([html], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentType.id}_borrador.doc`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function copyText() {
    if (!result) return;
    try { await navigator.clipboard.writeText(result); } catch {}
  }

  return (
    <div style={{ minHeight: "100vh", background: T.bg }}>
      <style>{CSS}</style>
      <TopBar title="📄 Generador de documentos" subtitle="Te prepara un borrador editable y arrastra el contexto del chat cuando vienes desde allí" color={T.orange} onBack={onBack} />
      <div className="generator-grid" style={{ maxWidth: 1040, margin: "0 auto", padding: 16, display: "grid", gridTemplateColumns: "minmax(320px,420px) minmax(0,1fr)", gap: 16 }}>
        <div style={{ display: "grid", gap: 12, alignSelf: "start" }}>
          <div style={{ background: "#fff", border: `2px solid ${T.border}`, borderRadius: T.r, padding: 16 }}>
            <SectionHead color={T.orange}>Rellena lo mínimo</SectionHead>
            <div style={{ display: "grid", gap: 10 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 6 }}>Tipo de documento</div>
                <select value={type} onChange={(e) => setType(e.target.value)} style={{ width: "100%", padding: 12, borderRadius: 14, border: `2px solid ${T.border}`, background: T.bg }}>
                  {DOC_TYPES.map((d) => <option key={d.id} value={d.id}>{d.label}</option>)}
                </select>
                <div style={{ color: T.muted, fontSize: 11, marginTop: 6 }}>{currentType.desc}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 6 }}>Tema o problema</div>
                <input value={issue} onChange={(e) => setIssue(e.target.value)} placeholder="Ej: alquiler abusivo, vivienda turística, opacidad en un contrato..." style={{ width: "100%", padding: 12, borderRadius: 14, border: `2px solid ${T.border}`, background: T.bg }} />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 6 }}>Destinatario</div>
                <input value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="Ej: Grupo Parlamentario Socialista, Ayuntamiento de Rivas, casero..." style={{ width: "100%", padding: 12, borderRadius: 14, border: `2px solid ${T.border}`, background: T.bg }} />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 6 }}>Hechos clave</div>
                <textarea value={facts} onChange={(e) => setFacts(e.target.value)} rows={6} placeholder="Cuenta qué ha pasado, fechas, impacto, datos o contexto." style={{ width: "100%", padding: 12, borderRadius: 14, border: `2px solid ${T.border}`, background: T.bg, resize: "vertical" }} />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 6 }}>Qué pides exactamente</div>
                <textarea value={ask} onChange={(e) => setAsk(e.target.value)} rows={4} placeholder="Ej: que registren una pregunta parlamentaria, que revisen el contrato, que retiren una cláusula..." style={{ width: "100%", padding: 12, borderRadius: 14, border: `2px solid ${T.border}`, background: T.bg, resize: "vertical" }} />
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
              <button onClick={generate} disabled={loading || !issue.trim() || !facts.trim() || !ask.trim()} style={{ background: !loading && issue.trim() && facts.trim() && ask.trim() ? T.orange : T.border, color: "#fff", border: "none", borderRadius: 14, padding: "12px 16px", fontWeight: 900, cursor: !loading && issue.trim() && facts.trim() && ask.trim() ? "pointer" : "default" }}>
                {loading ? "Generando…" : "Generar borrador"}
              </button>
              <a href={currentType.template} download style={{ ...miniLink(T.blueBg, T.blue), fontSize: 12, padding: "10px 12px" }}>Descargar plantilla base</a>
              <button onClick={onOpenResources} style={{ ...miniLink(T.purpleBg, T.purple), border: "none", cursor: "pointer", fontSize: 12, padding: "10px 12px" }}>Ver todas las plantillas</button>
            </div>
          </div>

          <div style={{ background: T.yellowBg, border: `2px solid ${T.yellow}`, borderRadius: T.r, padding: 16, fontSize: 12, lineHeight: 1.65 }}>
            <strong>Cómo usarlo bien:</strong><br />
            1) mete hechos concretos, 2) di qué acción pides, 3) elige bien el tipo: ahora también tienes mensaje a representante, escrito a ministerio, escrito autonómico, ayuntamiento y Defensor del Pueblo, 4) descarga el borrador y retócalo antes de enviarlo. La IA te acelera el trabajo; no te sustituye el criterio.
          </div>
        </div>

        <div style={{ background: "#fff", border: `2px solid ${T.border}`, borderRadius: T.r, padding: 16, minHeight: 520 }}>
          <SectionHead color={T.green}>Borrador editable</SectionHead>
          {!result ? (
            <div style={{ color: T.muted, fontSize: 13, lineHeight: 1.7 }}>
              Aquí aparecerá el texto generado. Si has llegado desde el chat, verás ya arrastrado el contexto básico para que no empieces desde cero.
            </div>
          ) : (
            <>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                <button onClick={downloadDoc} style={{ background: T.green, color: "#fff", border: "none", borderRadius: 12, padding: "10px 12px", fontWeight: 800, cursor: "pointer" }}>Descargar .doc</button>
                <button onClick={copyText} style={{ background: T.purpleBg, color: T.purple, border: `1px solid ${T.purple}33`, borderRadius: 12, padding: "10px 12px", fontWeight: 800, cursor: "pointer" }}>Copiar texto</button>
              </div>
              <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{result}</pre>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("landing");
  const [chatQ, setChatQ] = useState(null);
  const [docSeed, setDocSeed] = useState("");
  const [directoryItem, setDirectoryItem] = useState(null);

  function go(v, payload = null, q = null) {
    setView(v);
    setChatQ(v === "chat" ? (q || payload || null) : null);
    setDocSeed(v === "generator" ? (payload || q || "") : "");
    setDirectoryItem(v === "directory" ? payload || null : null);
  }

  function home() {
    setView("landing");
    setChatQ(null);
    setDocSeed("");
    setDirectoryItem(null);
  }

  switch (view) {
    case "problem":
      return <ProblemView go={go} onBack={home} />;
    case "influence":
      return <InfluenceView go={go} onBack={home} />;
    case "rep":
      return <RepFinder onBack={home} onAsk={(d) => go("chat", `Quiero saber más sobre ${d.name}. ¿Qué actividad parlamentaria tiene y cómo puedo dirigirme a esta persona?`)} onOpenDirectory={(item) => go("directory", item)} onGoDoc={(seed) => go("generator", seed)} />;
    case "chat":
      return <Chat onBack={home} initialQ={chatQ} onGoRep={() => go("rep")} onGoDoc={(seed) => go("generator", seed)} />;
    case "resources":
      return <Recursos onBack={home} />;
    case "directory":
      return <DirectoryDetail item={directoryItem} onBack={() => go("rep")} onGoDoc={(seed) => go("generator", seed)} />;
    case "generator":
      return <Generador onBack={home} initialSeed={docSeed} onOpenResources={() => go("resources")} />;
    default:
      return <Landing go={go} />;
  }
}
