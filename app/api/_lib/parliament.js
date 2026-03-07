const CONGRESS_OPENDATA_PAGE = "https://www.congreso.es/es/opendata/diputados";
const CONGRESS_LEGISLATURE = "XV";
const QHLD_API_BASE = "https://api.quehacenlosdiputados.es";
const QHLD_SITE_BASE = "https://quehacenlosdiputados.es";
const QHLD_KNOWLEDGEBASE = "politicas";

const PROVINCE_ALIASES = {
  "a coruna": "A Coruña",
  "acoruna": "A Coruña",
  "alava": "Álava",
  "avila": "Ávila",
  "asturias": "Asturias",
  "bizkaia": "Bizkaia",
  "cadiz": "Cádiz",
  "caceres": "Cáceres",
  "castellon": "Castellón",
  "cordoba": "Córdoba",
  "gipuzkoa": "Gipuzkoa",
  "guipuzcoa": "Gipuzkoa",
  "illes balears": "Illes Balears",
  "islas baleares": "Illes Balears",
  "jaen": "Jaén",
  "la coruna": "A Coruña",
  "lerida": "Lleida",
  "lleida": "Lleida",
  "malaga": "Málaga",
  "murcia": "Murcia",
  "navarra": "Navarra",
  "orense": "Ourense",
  "ourense": "Ourense",
  "palmas": "Las Palmas",
  "las palmas": "Las Palmas",
  "rioja": "La Rioja",
  "santa cruz de tenerife": "Santa Cruz de Tenerife",
  "s/c tenerife": "Santa Cruz de Tenerife",
  "sevilla": "Sevilla",
  "tenerife": "Santa Cruz de Tenerife",
  "valencia": "Valencia",
  "valencia/valencia": "Valencia",
  "valencia/valència": "Valencia",
  "valencia/valencià": "Valencia",
};

export const PROVINCES = [
  "A Coruña", "Álava", "Albacete", "Alicante", "Almería", "Asturias", "Ávila", "Badajoz", "Barcelona", "Bizkaia", "Burgos", "Cáceres", "Cádiz", "Cantabria", "Castellón", "Ceuta", "Ciudad Real", "Córdoba", "Cuenca", "Gipuzkoa", "Girona", "Granada", "Guadalajara", "Huelva", "Huesca", "Illes Balears", "Jaén", "La Rioja", "Las Palmas", "León", "Lleida", "Lugo", "Madrid", "Málaga", "Melilla", "Murcia", "Navarra", "Ourense", "Palencia", "Pontevedra", "Salamanca", "Santa Cruz de Tenerife", "Segovia", "Sevilla", "Soria", "Tarragona", "Teruel", "Toledo", "Valencia", "Valladolid", "Zamora", "Zaragoza",
];

const TOPIC_ALIASES = {
  vivienda: ["vivienda", "alquiler", "desahucio", "inquil", "hipoteca", "hogar", "precio de la vivienda"],
  sanidad: ["sanidad", "salud", "atención primaria", "hospital"],
  empleo: ["empleo", "trabajo", "paro", "laboral"],
  educación: ["educacion", "educación", "universidad", "becas", "colegio"],
  infancia: ["infancia", "niñez", "ninez", "menores", "niños", "ninos"],
  "igualdad de género": ["igualdad", "igualdad de genero", "igualdad de género", "machismo", "violencia de genero", "violencia de género", "feminismo"],
  clima: ["clima", "cambio climatico", "cambio climático", "emisiones", "calentamiento global"],
  "personas sin hogar": ["personas sin hogar", "sinhogarismo", "sin hogar"],
  "protección social": ["proteccion social", "protección social", "prestaciones", "servicios sociales"],
  "cooperación al desarrollo": ["cooperacion", "cooperación", "desarrollo global", "ayuda al desarrollo"],
  "españa vaciada": ["españa vaciada", "espana vaciada", "reto demografico", "reto demográfico", "despoblacion", "despoblación"],
  "personas mayores": ["personas mayores", "mayores", "dependencia", "envejecimiento"],
};

export const OFFICIAL_CONGRESS_COMMISSIONS = [
  { name: "Vivienda y Agenda Urbana", topic: "Vivienda", scope: "congreso" },
  { name: "Sanidad", topic: "Sanidad", scope: "congreso" },
  { name: "Educación, Formación Profesional y Deportes", topic: "Educación", scope: "congreso" },
  { name: "Derechos Sociales y Consumo", topic: "Protección social", scope: "congreso" },
  { name: "Trabajo, Economía Social, Inclusión, Seguridad Social y Migraciones", topic: "Empleo", scope: "congreso" },
  { name: "Transición Ecológica y Reto Demográfico", topic: "Clima", scope: "congreso" },
  { name: "Igualdad", topic: "Igualdad de género", scope: "congreso" },
  { name: "Juventud e Infancia", topic: "Infancia", scope: "congreso" },
  { name: "Cooperación Internacional para el Desarrollo", topic: "Cooperación al desarrollo", scope: "congreso" },
  { name: "Ciencia, Innovación y Universidades", topic: "Educación", scope: "congreso" },
  { name: "Economía, Comercio y Transformación Digital", topic: "Empleo", scope: "congreso" },
  { name: "Política Territorial", topic: "España vaciada", scope: "congreso" },
  { name: "Transportes y Movilidad Sostenible", topic: "Clima", scope: "congreso" },
];

export const OFFICIAL_SENATE_COMMISSIONS = [
  { name: "Comisión de Vivienda y Agenda Urbana", topic: "Vivienda", scope: "senado" },
  { name: "Comisión de Sanidad", topic: "Sanidad", scope: "senado" },
  { name: "Comisión de Educación, Formación Profesional y Deportes", topic: "Educación", scope: "senado" },
  { name: "Comisión de Derechos Sociales, Consumo y Agenda 2030", topic: "Protección social", scope: "senado" },
  { name: "Comisión de Trabajo y Economía Social", topic: "Empleo", scope: "senado" },
  { name: "Comisión de Transición Ecológica", topic: "Clima", scope: "senado" },
  { name: "Comisión de Igualdad", topic: "Igualdad de género", scope: "senado" },
  { name: "Comisión de Juventud e Infancia", topic: "Infancia", scope: "senado" },
  { name: "Comisión de Cooperación Internacional al Desarrollo", topic: "Cooperación al desarrollo", scope: "senado" },
  { name: "Comisión General de las Comunidades Autónomas", topic: "España vaciada", scope: "senado" },
  { name: "Comisión de Despoblación y Reto Demográfico", topic: "España vaciada", scope: "senado" },
  { name: "Comisión de Ciencia, Innovación y Universidades", topic: "Educación", scope: "senado" },
];

function stripAccents(value = "") {
  return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function normalizeText(value = "") {
  return stripAccents(value)
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

export function canonicalProvince(value = "") {
  const clean = normalizeText(value)
    .replace(/^provincia de /, "")
    .replace(/^santa c\.? .*tenerife$/, "santa cruz de tenerife");
  return PROVINCE_ALIASES[clean] || value || "";
}

function pickFirst(...values) {
  return values.find((v) => v !== undefined && v !== null && String(v).trim() !== "") || "";
}

function slugify(value = "") {
  return normalizeText(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function extractArray(raw, keys = []) {
  if (Array.isArray(raw)) return raw;
  for (const key of keys) {
    if (Array.isArray(raw?.[key])) return raw[key];
  }
  return [];
}

async function fetchJson(url, init) {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(`HTTP ${res.status} on ${url}`);
  return res.json();
}

async function fetchText(url, init) {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(`HTTP ${res.status} on ${url}`);
  return res.text();
}

function buildCongressProfileUrl(code = "") {
  if (!code) return "";
  return `https://www.congreso.es/es/busqueda-de-diputados?codParlamentario=${encodeURIComponent(code)}&idLegislatura=${CONGRESS_LEGISLATURE}&mostrarFicha=true`;
}

function buildCongressSearchUrl() {
  return "https://www.congreso.es/es/busqueda-de-diputados";
}

function buildQhldDeputyUrl(id = "") {
  if (!id) return "https://quehacenlosdiputados.es/diputados";
  return `${QHLD_SITE_BASE}/diputados/${encodeURIComponent(id)}`;
}

function buildQhldTopicUrl(topic = {}) {
  const slug = topic.slug || slugify(topic.name || topic.id || "");
  return slug ? `${QHLD_SITE_BASE}/tematicas/${slug}` : `${QHLD_SITE_BASE}/tematicas`;
}

async function discoverCongressActiveJsonUrl() {
  const html = await fetchText(CONGRESS_OPENDATA_PAGE, { next: { revalidate: 86400 } });
  const absolute = html.match(/https:\/\/www\.congreso\.es\/webpublica\/opendata\/diputados\/DiputadosActivos__[^"']+\.json/);
  if (absolute?.[0]) return absolute[0];

  const relative = html.match(/\/webpublica\/opendata\/diputados\/DiputadosActivos__[^"']+\.json/);
  if (relative?.[0]) return `https://www.congreso.es${relative[0]}`;

  throw new Error("No pude localizar el JSON de diputados activos del Congreso");
}

export async function fetchCongressDeputies() {
  const jsonUrl = await discoverCongressActiveJsonUrl();
  const raw = await fetchJson(jsonUrl, { next: { revalidate: 86400 } });
  const arr = Array.isArray(raw) ? raw : extractArray(raw, ["data", "items", "diputados"]);
  if (!Array.isArray(arr) || !arr.length) throw new Error("Formato inesperado en el open data del Congreso");

  return arr.map((item) => {
    const fullName = pickFirst(item.NOMBRE, item.nombre, item.NombreCompleto, item.nombreCompleto);
    const [lastName = "", firstName = ""] = fullName.split(",").map((v) => v.trim());
    const province = canonicalProvince(pickFirst(item.CIRCUNSCRIPCION, item.circunscripcion, item.PROVINCIA, item.provincia));
    const code = pickFirst(
      item.CODPARLAMENTARIO,
      item.COD_PARLAMENTARIO,
      item.codParlamentario,
      item.cod_parlamentario,
      item.CODDIPUTADO,
      item.codDiputado,
      item.ID,
      item.id
    );

    return {
      source: { congress: true, qhld: false },
      id: code || slugify(fullName),
      name: fullName,
      firstName,
      lastName,
      normalizedName: normalizeText(fullName),
      province,
      party: pickFirst(item.FORMACIONELECTORAL, item.formacionElectoral, item.PARTIDO, item.partido),
      group: pickFirst(item.GRUPOPARLAMENTARIO, item.grupoParlamentario, item.GRUPO, item.grupo),
      biography: pickFirst(item.BIOGRAFIA, item.biografia),
      congressCode: code,
      congressSearchUrl: buildCongressSearchUrl(),
      congressProfileUrl: pickFirst(item.URLFICHA, item.urlFicha, item.URL, item.url, buildCongressProfileUrl(code)),
      qhldId: "",
      qhldUrl: "",
      photoUrl: pickFirst(item.FOTO, item.foto, item.URLFOTO, item.urlFoto),
      email: pickFirst(item.EMAIL, item.email),
      twitter: pickFirst(item.TWITTER, item.twitter),
    };
  });
}

function parseQhldDeputy(item = {}) {
  const fullName = pickFirst(item.name, item.nombreCompleto, item.nombre_completo, item.nombre, item.full_name);
  const qhldId = pickFirst(item.id, item._id, item.slug, item.uuid);
  return {
    raw: item,
    source: { congress: false, qhld: true },
    id: qhldId || slugify(fullName),
    qhldId,
    qhldUrl: pickFirst(item.url, item.profile_url, item.profileUrl, buildQhldDeputyUrl(qhldId)),
    name: fullName,
    normalizedName: normalizeText(fullName),
    province: canonicalProvince(pickFirst(item.province, item.place, item.place_name, item.district, item.constituency, item.circunscripcion)),
    party: pickFirst(item.party_name, item.party, item.partido),
    group: pickFirst(item.parliamentary_group_name, item.group_name, item.group, item.grupo),
    email: pickFirst(item.email, item.mail),
    twitter: pickFirst(item.twitter, item.x),
    photoUrl: pickFirst(item.image, item.photoUrl, item.photo, item.foto, item.avatar),
  };
}

export async function fetchQhldDeputies(limit = 500) {
  const params = new URLSearchParams({
    knowledgebase: QHLD_KNOWLEDGEBASE,
    limit: String(limit),
  });

  const raw = await fetchJson(`${QHLD_API_BASE}/deputies/?${params.toString()}`, { next: { revalidate: 3600 } });
  const arr = extractArray(raw, ["deputies", "results", "result", "data"]);
  return arr.map(parseQhldDeputy).filter((item) => item.name);
}

export async function fetchQhldTopics() {
  const params = new URLSearchParams({ knowledgebase: QHLD_KNOWLEDGEBASE });
  const raw = await fetchJson(`${QHLD_API_BASE}/topics/?${params.toString()}`, { next: { revalidate: 86400 } });
  return extractArray(raw, ["topics", "results", "result", "data"])
    .map((topic) => ({
      id: pickFirst(topic.id, topic.slug),
      slug: pickFirst(topic.slug, topic.id ? slugify(topic.id) : ""),
      name: pickFirst(topic.name, topic.nombre),
    }))
    .filter((topic) => topic.name)
    .sort((a, b) => a.name.localeCompare(b.name, "es"));
}

async function resolveTopicObject(topicInput = "") {
  const normalized = normalizeText(topicInput);
  if (!normalized) return null;

  let topics = [];
  try {
    topics = await fetchQhldTopics();
  } catch {
    topics = [];
  }

  const direct = topics.find((topic) => normalizeText(topic.name) === normalized || normalizeText(topic.id) === normalized || normalizeText(topic.slug) === normalized);
  if (direct) return direct;

  const partial = topics.find((topic) => normalized.includes(normalizeText(topic.name)) || normalizeText(topic.name).includes(normalized));
  if (partial) return partial;

  for (const [aliasName, aliases] of Object.entries(TOPIC_ALIASES)) {
    const canonicalAlias = normalizeText(aliasName);
    if (aliases.some((alias) => normalized.includes(normalizeText(alias)))) {
      const matched = topics.find((topic) => normalizeText(topic.name) === canonicalAlias || normalizeText(topic.slug) === canonicalAlias || normalizeText(topic.id) === canonicalAlias);
      return matched || { id: canonicalAlias, slug: slugify(aliasName), name: aliasName };
    }
  }

  return null;
}

async function fetchTopicRankingCandidate(candidate = "") {
  const params = new URLSearchParams({ knowledgebase: QHLD_KNOWLEDGEBASE, topic: candidate });
  const raw = await fetchJson(`${QHLD_API_BASE}/footprint/by-topic?${params.toString()}`, { next: { revalidate: 3600 } });
  return extractArray(raw, ["deputies", "results", "result", "data"]);
}

export async function fetchTopDeputiesByTopic(topicInput = "", limit = 5) {
  const topic = typeof topicInput === "string" ? await resolveTopicObject(topicInput) : topicInput;
  if (!topic?.name && !topic?.id && !topic?.slug) return [];

  const candidates = [...new Set([
    topic.id,
    topic.name,
    topic.slug,
    normalizeText(topic.name || ""),
    slugify(topic.name || ""),
  ].filter(Boolean))];

  let ranking = [];
  for (const candidate of candidates) {
    try {
      ranking = await fetchTopicRankingCandidate(candidate);
      if (ranking.length) break;
    } catch {}
  }
  if (!ranking.length) return [];

  const allDeputies = await fetchQhldDeputies().catch(() => []);
  const byName = new Map(allDeputies.map((d) => [d.normalizedName, d]));

  return ranking.slice(0, limit).map((item, index) => {
    const name = pickFirst(item.name, item.deputy_name, item.deputy, item.nombre);
    const deputy = byName.get(normalizeText(name));
    return {
      rank: index + 1,
      name,
      score: Number(item.score ?? item.footprint ?? item.value ?? 0),
      province: deputy?.province || canonicalProvince(pickFirst(item.province, item.place, item.circunscripcion)),
      party: deputy?.party || pickFirst(item.party, item.party_name),
      group: deputy?.group || pickFirst(item.group, item.group_name),
      qhldId: deputy?.qhldId || pickFirst(item.id, item.deputy_id),
      qhldUrl: deputy?.qhldUrl || buildQhldDeputyUrl(deputy?.qhldId || pickFirst(item.id, item.deputy_id)),
      photoUrl: deputy?.photoUrl || "",
      topicName: topic.name,
      topicSlug: topic.slug,
    };
  });
}

function mergeDeputy(congressDeputy, qhldDeputy) {
  if (!qhldDeputy) return congressDeputy;
  return {
    ...congressDeputy,
    source: { congress: true, qhld: true },
    id: qhldDeputy.qhldId || congressDeputy.id,
    province: qhldDeputy.province || congressDeputy.province,
    party: qhldDeputy.party || congressDeputy.party,
    group: qhldDeputy.group || congressDeputy.group,
    email: qhldDeputy.email || congressDeputy.email,
    twitter: qhldDeputy.twitter || congressDeputy.twitter,
    photoUrl: qhldDeputy.photoUrl || congressDeputy.photoUrl,
    qhldId: qhldDeputy.qhldId || congressDeputy.qhldId,
    qhldUrl: qhldDeputy.qhldUrl || congressDeputy.qhldUrl,
  };
}

function finalizeDeputy(d) {
  return {
    ...d,
    links: {
      congressSearch: d.congressSearchUrl,
      congressProfile: d.congressProfileUrl || d.congressSearchUrl,
      qhld: d.qhldUrl || buildQhldDeputyUrl(d.qhldId),
      ask: `/chat?diputado=${encodeURIComponent(d.name)}`,
    },
  };
}

export async function getAllDeputies(limit = 9999) {
  const [congressDeputies, qhldDeputies] = await Promise.all([
    fetchCongressDeputies(),
    fetchQhldDeputies().catch(() => []),
  ]);

  const qhldMap = new Map(qhldDeputies.map((d) => [d.normalizedName, d]));
  const used = new Set();

  const merged = congressDeputies.map((d) => {
    used.add(d.normalizedName);
    return finalizeDeputy(mergeDeputy(d, qhldMap.get(d.normalizedName)));
  });

  for (const d of qhldDeputies) {
    if (used.has(d.normalizedName)) continue;
    merged.push(finalizeDeputy({
      source: { congress: false, qhld: true },
      id: d.qhldId || d.id,
      name: d.name,
      firstName: "",
      lastName: "",
      normalizedName: d.normalizedName,
      province: d.province,
      party: d.party,
      group: d.group,
      biography: "",
      congressCode: "",
      congressSearchUrl: buildCongressSearchUrl(),
      congressProfileUrl: "",
      qhldId: d.qhldId,
      qhldUrl: d.qhldUrl,
      photoUrl: d.photoUrl,
      email: d.email,
      twitter: d.twitter,
    }));
  }

  return merged
    .sort((a, b) => a.name.localeCompare(b.name, "es"))
    .slice(0, limit);
}

export async function getDeputiesByProvince(province = "", limit = 200) {
  const canonical = canonicalProvince(province);
  const deputies = await getAllDeputies();
  const filtered = canonical
    ? deputies.filter((d) => normalizeText(d.province) === normalizeText(canonical))
    : deputies;

  return filtered.slice(0, limit);
}

export async function getDeputiesByProvinceAndTopic(province = "", topic = "", limit = 200) {
  const deputies = await getDeputiesByProvince(province, 9999);
  if (!topic) return { deputies: deputies.slice(0, limit), ranking: [], topicName: "" };

  const ranking = await fetchTopDeputiesByTopic(topic, 100).catch(() => []);
  const scoreMap = new Map(ranking.map((item) => [normalizeText(item.name), item]));
  const sorted = deputies
    .map((deputy) => ({ ...deputy, topicScore: scoreMap.get(deputy.normalizedName)?.score || 0, topicRank: scoreMap.get(deputy.normalizedName)?.rank || null }))
    .sort((a, b) => (b.topicScore || 0) - (a.topicScore || 0) || a.name.localeCompare(b.name, "es"));

  return {
    deputies: sorted.slice(0, limit),
    ranking,
    topicName: ranking[0]?.topicName || (typeof topic === "string" ? topic : topic?.name || ""),
  };
}

export async function findDeputyByName(text = "") {
  const normalizedText = normalizeText(text);
  if (!normalizedText) return null;

  const deputies = await getAllDeputies();

  const exact = deputies.find((d) => normalizedText.includes(d.normalizedName));
  if (exact) return exact;

  const candidates = deputies.map((d) => {
    const tokens = d.normalizedName
      .replace(/,/g, " ")
      .split(" ")
      .filter((token) => token.length >= 3);
    const matchedTokens = tokens.filter((token) => normalizedText.includes(token));
    const score = matchedTokens.length;
    return { deputy: d, score, matchedTokens };
  }).filter((item) => item.score >= 2);

  if (!candidates.length) return null;

  candidates.sort((a, b) => b.score - a.score || a.deputy.name.localeCompare(b.deputy.name, "es"));
  if (candidates[1] && candidates[0].score === candidates[1].score && candidates[0].score < 3) return null;
  return candidates[0].deputy;
}

export function detectProvinceInText(text = "") {
  const normalized = normalizeText(text);
  return PROVINCES.find((province) => normalized.includes(normalizeText(province))) || "";
}

export async function resolveTopicFromText(text = "") {
  const topic = await resolveTopicObject(text);
  return topic?.name || "";
}

export async function getAllTopics() {
  return fetchQhldTopics();
}

export function isTopicRankingQuestion(text = "") {
  const normalized = normalizeText(text);
  return /quien|quienes|ranking|lider|encabeza|mas hace|trabaja mas|mas activo|top|se mueve mas|mueve mas/.test(normalized);
}

export function buildDeputiesContext(deputies = [], province = "") {
  if (!deputies.length) return "No hay contexto parlamentario verificado para esta consulta.";
  const items = deputies.slice(0, 12).map((d) => {
    const parts = [d.name, d.party, d.group, d.province].filter(Boolean).join(" | ");
    return `- ${parts}`;
  });
  return `Diputados verificados${province ? ` de ${province}` : ""}:\n${items.join("\n")}`;
}

export function buildTopicRankingContext(topicName = "", ranking = []) {
  if (!ranking.length) return `No hay ranking verificado de QHLD para ${topicName || "ese tema"}.`;
  const items = ranking.map((item) => {
    const parts = [item.name, item.party, item.province, `${item.score}/100`].filter(Boolean).join(" | ");
    return `- ${parts}`;
  });
  return `Ranking QHLD verificado para ${topicName}:\n${items.join("\n")}`;
}

export function buildTopicRankingAnswer(topicName = "", ranking = []) {
  if (!ranking.length) {
    return `No he podido verificar un ranking de **Qué Hacen los Diputados** para **${topicName || "ese tema"}**. Prueba con otro tema o revisa la temática en QHLD.`;
  }

  const leader = ranking[0];
  const bullets = ranking.map((item) => {
    const extras = [item.party, item.province].filter(Boolean).join(" · ");
    const link = item.qhldUrl ? ` ([ficha QHLD](${item.qhldUrl}))` : "";
    return `- **${item.rank}. ${item.name}** — ${item.score}/100${extras ? ` · ${extras}` : ""}${link}`;
  });

  return [
    `**Según el índice parlamentario de Qué Hacen los Diputados para ${topicName}, quien encabeza ahora mismo el ranking es ${leader.name}.**`,
    leader.party || leader.province ? `**Perfil:** ${[leader.party, leader.province].filter(Boolean).join(" · ")}` : "",
    `\n**Top ${ranking.length} en ${topicName}:**`,
    ...bullets,
    `\nEste ranking mide **actividad y relevancia parlamentaria** en esa temática, no una valoración política o moral.`,
    `Puedes abrir la temática en QHLD aquí: [${topicName}](${buildQhldTopicUrl({ name: topicName, slug: ranking[0]?.topicSlug })}).`,
  ].filter(Boolean).join("\n");
}

export function buildDeputyProfileAnswer(deputy) {
  if (!deputy) return "";
  const parts = [];
  parts.push(`**He encontrado una ficha verificada de ${deputy.name}.**`);

  const profile = [deputy.party, deputy.group, deputy.province].filter(Boolean).join(" · ");
  if (profile) parts.push(`**Perfil básico:** ${profile}`);

  const links = [];
  if (deputy.links?.congressProfile) links.push(`[ficha del Congreso](${deputy.links.congressProfile})`);
  if (deputy.links?.qhld) links.push(`[ficha de QHLD](${deputy.links.qhld})`);
  if (links.length) parts.push(`**Fichas para comprobar actividad e iniciativas:** ${links.join(" · ")}`);

  const contactBits = [];
  if (deputy.email) contactBits.push(`correo: ${deputy.email}`);
  if (deputy.twitter) contactBits.push(`X/Twitter: ${deputy.twitter}`);
  if (contactBits.length) {
    parts.push(`**Cómo dirigirte a esta persona:** ${contactBits.join(" · ")}`);
  } else {
    parts.push(`**Cómo dirigirte a esta persona:** abre su ficha del Congreso o la de QHLD para localizar los canales públicos disponibles. Si no aparece correo directo, usa el grupo parlamentario o el formulario institucional.`);
  }

  parts.push(`**Lo que sí puedo afirmar desde aquí:** identidad, provincia y enlaces públicos verificados. Para su actividad parlamentaria concreta, abre la ficha y revisa iniciativas, preguntas o posicionamiento temático.`);
  parts.push(`Si quieres, reformula así y te lo ordeno mejor: **resúmeme a ${deputy.name} y prepárame un mensaje para escribirle**.`);

  return parts.join("\n\n");
}


export function getOfficialCongressCommissions() {
  return OFFICIAL_CONGRESS_COMMISSIONS;
}

export function getOfficialSenateCommissions() {
  return OFFICIAL_SENATE_COMMISSIONS;
}

export async function getDeputiesByTopic(topic = "", limit = 200) {
  const deputies = await getAllDeputies(9999);
  if (!topic) return { deputies: deputies.slice(0, limit), ranking: [], topicName: "" };

  const ranking = await fetchTopDeputiesByTopic(topic, 100).catch(() => []);
  const scoreMap = new Map(ranking.map((item) => [normalizeText(item.name), item]));
  const sorted = deputies
    .map((deputy) => ({ ...deputy, topicScore: scoreMap.get(deputy.normalizedName)?.score || 0, topicRank: scoreMap.get(deputy.normalizedName)?.rank || null }))
    .sort((a, b) => (b.topicScore || 0) - (a.topicScore || 0) || a.name.localeCompare(b.name, "es"));

  return {
    deputies: sorted.slice(0, limit),
    ranking,
    topicName: ranking[0]?.topicName || (typeof topic === "string" ? topic : topic?.name || ""),
  };
}



const SENATE_ELECTED_INDEX_URL = "https://www.senado.es/web/composicionorganizacion/senadores/composicionsenado/consultaprocedenciageografica/electoscircunscripciones/index.html";
const SENATE_DESIGNATED_INDEX_URL = "https://www.senado.es/web/composicionorganizacion/senadores/composicionsenado/consultaprocedenciageografica/designados/index.html";
const SENATE_ALPHABETICAL_URL = "https://www.senado.es/web/composicionorganizacion/senadores/composicionsenado/consultaordenalfabetico/index.html";

const SENATE_CIRCUNSCRIPTION_MAP = {
  "a coruna": ["A Coruña"],
  "alava": ["Araba/Álava"],
  "alicante": ["Alicante/Alacant"],
  "asturias": ["Asturias"],
  "bizkaia": ["Bizkaia"],
  "castellon": ["Castellón/Castelló"],
  "coruna": ["A Coruña"],
  "gipuzkoa": ["Gipuzkoa"],
  "guipuzcoa": ["Gipuzkoa"],
  "illes balears": ["Mallorca", "Menorca", "Eivissa-Formentera"],
  "islas baleares": ["Mallorca", "Menorca", "Eivissa-Formentera"],
  "las palmas": ["Gran Canaria", "Lanzarote", "Fuerteventura"],
  "rioja": ["La Rioja"],
  "santa cruz de tenerife": ["Tenerife", "La Palma", "La Gomera", "El Hierro"],
  "tenerife": ["Tenerife", "La Palma", "La Gomera", "El Hierro"],
  "valencia": ["Valencia/València"],
};

function senateCircunscriptionsForProvince(province = "") {
  const canonical = canonicalProvince(province);
  const normalized = normalizeText(canonical || province);
  if (!normalized) return [];
  return SENATE_CIRCUNSCRIPTION_MAP[normalized] || [canonical || province];
}

function stripTags(html = "") {
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function absolutizeSenateUrl(href = "") {
  if (!href) return "";
  if (/^https?:\/\//i.test(href)) return href;
  return `https://www.senado.es${href.startsWith('/') ? '' : '/'}${href}`;
}

function buildSenateSearchUrl(name = "") {
  const q = encodeURIComponent(name);
  return `https://www.senado.es/web/busqueda/index.html?op=1&st=${q}`;
}

function escapeRegex(value = "") {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractSenatorsFromCircunscriptionHtml(html = "", targets = []) {
  const targetSet = new Set(targets.map((item) => normalizeText(item)));
  const source = String(html);
  const provinceMatches = [...source.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)];
  const results = [];
  for (let i = 0; i < provinceMatches.length; i += 1) {
    const provinceLabel = stripTags(provinceMatches[i][1]);
    const normalizedProvince = normalizeText(provinceLabel);
    if (targetSet.size && !targetSet.has(normalizedProvince)) continue;
    const start = provinceMatches[i].index + provinceMatches[i][0].length;
    const end = i + 1 < provinceMatches.length ? provinceMatches[i + 1].index : source.length;
    const block = source.slice(start, end);
    const senatorMatches = [...block.matchAll(/<h3[^>]*>[\s\S]*?<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>[\s\S]*?<\/h3>([\s\S]*?)(?=<h3|$)/gi)];
    for (const match of senatorMatches) {
      const profileUrl = absolutizeSenateUrl(match[1]);
      const name = stripTags(match[2]);
      const tail = stripTags(match[3]).slice(0, 120);
      const groupMatch = tail.match(/\b(GPP|GPS|GPV|GPERB|GPMX|GPI|GPIC|GPD|GPM)\b/);
      results.push({
        chamber: "Senado",
        kind: "electo",
        name,
        province: provinceLabel,
        group: groupMatch?.[1] || "",
        senateProfileUrl: profileUrl,
        senateSearchUrl: buildSenateSearchUrl(name),
      });
    }
  }
  return results;
}

function extractProfileDetailsFromSenateHtml(html = "") {
  const text = stripTags(html);
  const lines = text.split(/(?=Pregunta con respuesta escrita:|Pregunta oral en Pleno:|Pregunta oral en Comisión:|Interpelación:|Moción en Comisión:|Moción ante el Pleno:|Comparecencia)/);
  const metrics = [];
  [
    ["Preguntas escritas", /Pregunta con respuesta escrita:\s*(\d+)/i],
    ["Preguntas orales en Pleno", /Pregunta oral en Pleno:\s*(\d+)/i],
    ["Preguntas orales en Comisión", /Pregunta oral en Comisi[oó]n:\s*(\d+)/i],
    ["Interpelaciones", /Interpelaci[oó]n:\s*(\d+)/i],
    ["Mociones en Comisión", /Moci[oó]n en Comisi[oó]n:\s*(\d+)/i],
    ["Mociones ante el Pleno", /Moci[oó]n ante el Pleno:\s*(\d+)/i],
    ["Comparecencias", /Comparecencia[^:]*:\s*(\d+)/i],
  ].forEach(([label, rx]) => {
    const m = text.match(rx);
    if (m) metrics.push({ label, value: Number(m[1]) });
  });
  const commissionLines = Array.from(text.matchAll(/(?:PRESIDENT[EA]|VICEPRESIDENT[EA](?: PRIMERA| PRIMERO| SEGUNDA| SEGUNDO)?|PORTAVOZ|PORTAVOZ ADJUNTO|SECRETARI[AO]|VOCAL)\.\s+([^\.]+COMISI[ÓO]N[^\.]+)/gi)).map((m) => m[1].trim());
  const electedMatch = text.match(/Elect[oa]:\s*([^\.]+)\./i);
  const designatedMatch = text.match(/Designad[oa]:\s*([^\.]+)\./i);
  return {
    province: electedMatch?.[1]?.trim() || "",
    designatedBy: designatedMatch?.[1]?.trim() || "",
    commissionLines,
    metrics,
    summary: metrics.slice(0, 3).map((m) => `${m.label}: ${m.value}`).join(" · "),
  };
}

export async function getSenatorsByProvince(province = "", commission = "", limit = 24) {
  const circunscriptions = senateCircunscriptionsForProvince(province);
  if (!circunscriptions.length) {
    return { senators: [], notice: "El Senado se ordena por territorio. Elige una provincia o territorio para ver nombres concretos." };
  }
  const html = await fetchText(SENATE_ELECTED_INDEX_URL, { next: { revalidate: 43200 } });
  let senators = extractSenatorsFromCircunscriptionHtml(html, circunscriptions).slice(0, limit);
  if (!senators.length) {
    return { senators: [], notice: `No he encontrado senadores electos para ${province} en la relación oficial del Senado.` };
  }
  if (commission) {
    const normalizedCommission = normalizeText(commission);
    const enriched = await Promise.all(senators.map(async (senator) => {
      try {
        const profileHtml = await fetchText(senator.senateProfileUrl, { next: { revalidate: 43200 } });
        const details = extractProfileDetailsFromSenateHtml(profileHtml);
        return {
          ...senator,
          ...details,
          matchesCommission: details.commissionLines.some((line) => normalizeText(line).includes(normalizedCommission)),
        };
      } catch {
        return { ...senator, matchesCommission: false, commissionLines: [], metrics: [], summary: "" };
      }
    }));
    const filtered = enriched.filter((item) => item.matchesCommission);
    senators = filtered.length ? filtered : enriched;
  }
  return {
    senators: senators.slice(0, limit),
    notice: commission && !senators.some((item) => item.matchesCommission)
      ? `No he podido verificar membresía directa en ${commission}; te enseño igualmente la representación territorial para ${province}.`
      : "",
  };
}

export function buildDeputySummaryAndMessageAnswer(deputy) {
  if (!deputy) return "";
  const links = [];
  if (deputy.links?.congressProfile) links.push(`[ficha del Congreso](${deputy.links.congressProfile})`);
  if (deputy.links?.qhld) links.push(`[ficha de QHLD](${deputy.links.qhld})`);
  const profile = [deputy.party, deputy.group, deputy.province].filter(Boolean).join(" · ");
  const contact = deputy.email ? `correo público: ${deputy.email}` : "si no aparece correo directo, usa el grupo parlamentario o el formulario institucional";
  return [
    `**Resumen rápido de ${deputy.name}:**`,
    profile ? `- **Perfil:** ${profile}` : "",
    links.length ? `- **Dónde mirar su actividad:** ${links.join(" · ")}` : "",
    `- **Qué puedo afirmar sin inventar:** identidad, provincia, grupo y enlaces públicos verificados. Para su actividad concreta, hay que abrir sus fichas y revisar iniciativas, preguntas o posicionamiento temático.`,
    `- **Cómo escribirle:** ${contact}.`,
    `\n**Borrador breve para escribirle:**`,
    `Asunto: Seguimiento de su actividad parlamentaria sobre [tema]`,
    ``,
    `Hola ${deputy.name}:`,
    ``,
    `Le escribo como ciudadano/a interesado/a en [tema]. He revisado su ficha pública y me gustaría conocer mejor su posición y su actividad parlamentaria en este asunto.`,
    ``,
    `En concreto, me gustaría saber:`,
    `- qué iniciativas, preguntas o comparecencias considera más relevantes en esta materia;`,
    `- qué medidas cree prioritarias ahora;`,
    `- y por qué vía puedo trasladarle propuestas o preocupaciones ciudadanas de forma útil.`,
    ``,
    `Gracias por su atención.`,
    ``,
    `[Tu nombre]`,
    `\nSi quieres, también puedo prepararte un **mensaje más combativo**, **más institucional** o **centrado en un tema concreto**.`
  ].filter(Boolean).join("\n");
}

export function buildSenateProvinceLinks(province = "") {
  const label = province || "tu territorio";
  return [
    {
      name: `Senadores por procedencia geográfica (${label})`,
      desc: province ? `Ruta oficial del Senado para ubicar representación territorial de ${province}.` : "Ruta oficial del Senado para ubicar senadores por procedencia geográfica.",
      href: "https://www.senado.es/web/composicionorganizacion/senadores/composicionsenado/consultaprocedenciageografica/electoscircunscripciones/index.html",
      type: "provincia",
    },
    {
      name: "Senadores designados por parlamentos autonómicos",
      desc: "Relación oficial de senadores designados por cada comunidad autónoma.",
      href: "https://www.senado.es/web/composicionorganizacion/senadores/composicionsenado/consultaprocedenciageografica/designados/index.html",
      type: "autonomico",
    },
    {
      name: "Directorio alfabético de senadores",
      desc: "Listado oficial para contrastar nombres y fichas.",
      href: "https://www.senado.es/web/composicionorganizacion/senadores/composicionsenado/consultaordenalfabetico/index.html",
      type: "alfabetico",
    },
    {
      name: "Comisiones del Senado",
      desc: "Listado oficial de comisiones con actividad y composición.",
      href: "https://www.senado.es/web/actividadparlamentaria/sesionescomision/comisionessenado/index.html",
      type: "comisiones",
    },
  ];
}
