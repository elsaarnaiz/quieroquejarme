import {
  buildDeputiesContext,
  buildDeputyProfileAnswer,
  buildDeputySummaryAndMessageAnswer,
  buildTopicRankingAnswer,
  buildTopicRankingContext,
  detectProvinceInText,
  fetchTopDeputiesByTopic,
  findDeputyByName,
  getDeputiesByProvince,
  isTopicRankingQuestion,
  resolveTopicFromText,
} from "../_lib/parliament";

async function callGroq(apiKey, messages, model) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: 1200,
      temperature: 0.2,
    }),
  });
  return res.json();
}

async function callOpenAI(apiKey, messages, model) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: 1200,
      temperature: 0.2,
    }),
  });
  return res.json();
}

function looksGeneric(text = "") {
  return /no tengo informacion verificada|no tengo información verificada|sitio web oficial del congreso|no puedo proporcionarte detalles|fuentes oficiales|proporciona mas contexto|proporciona más contexto/.test(text.toLowerCase());
}

function wantsDeputySummaryOrMessage(text = "") {
  return /resumeme|resúmeme|preparame|prepárame|mensaje|escribirle|escribir a|correo/i.test(String(text || ""));
}

function buildClarifyingAnswer(lastUserMessage = "", topicName = "") {
  const lower = lastUserMessage.toLowerCase();
  if (topicName && /quien|quienes|ranking|top|mas hace|m[aá]s hace|se mueve/.test(lower)) {
    return `He entendido que preguntas por **${topicName}**, pero ahora mismo no he podido verificar un ranking temático sólido de QHLD para responder sin inventar.\n\nPrueba con una de estas salidas:\n- **resúmeme qué diputados destacan en ${topicName}**\n- **encuéntrame diputados de [provincia] y ordénalos por ${topicName}**\n- **prepárame un mensaje para presionar sobre ${topicName}**`;
  }
  if (/vivienda|alquiler|casero|hipoteca/.test(lower)) {
    return "No tengo contexto verificado suficiente para responder con precisión todavía.\n\nDime cuál de estas tres buscas y voy a tiro hecho:\n- **qué diputado se mueve más en vivienda**\n- **cómo reclamar un problema de alquiler**\n- **qué herramienta política usar** para presionar en vivienda\n\nEjemplo útil: **quién es el diputado que más hace sobre vivienda**.";
  }
  if (/diputad|representante|congreso|senado|parlament/.test(lower)) {
    return "Te falta solo un poco de puntería para que no te responda con humo.\n\nPrueba con una de estas formulaciones:\n- **quién es mi diputado por [provincia]**\n- **resúmeme a [nombre del diputado]**\n- **quién encabeza el ranking de QHLD en [tema]**\n\nAsí puedo apoyarme en datos verificables en vez de improvisar como tertuliano de madrugada.";
  }
  return "No tengo datos verificados suficientes para contestar bien a eso todavía.\n\nPrueba con una de estas rutas:\n- **tema + objetivo** → `vivienda + quiero presionar en el Congreso`\n- **diputado + acción** → `resúmeme a [nombre] y cómo puedo escribirle`\n- **herramienta + caso** → `qué diferencia hay entre PNL e ILP`";
}

export async function POST(request) {
  const { messages = [], system = "" } = await request.json();
  const groqKey = process.env.GROQ_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  const lastUserMessage = [...messages].reverse().find((m) => m.role === "user")?.content || "";

  let deputies = [];
  let province = "";
  let topicName = "";
  let topicRanking = [];
  let deputyByName = null;

  try {
    deputyByName = await findDeputyByName(lastUserMessage);
  } catch (e) {
    console.log("Deputy by name grounding warning:", e.message);
  }

  if (deputyByName) {
    const targeted = wantsDeputySummaryOrMessage(lastUserMessage);
    return Response.json({
      text: targeted ? buildDeputySummaryAndMessageAnswer(deputyByName) : buildDeputyProfileAnswer(deputyByName),
      fallback: false,
      grounded: true,
      topicGrounded: false,
      province: deputyByName.province || "",
      topic: "",
      mode: targeted ? "deputy-summary-message" : "deputy-profile",
    });
  }

  try {
    province = detectProvinceInText(lastUserMessage);
    if (province) deputies = await getDeputiesByProvince(province, 12);
  } catch (e) {
    console.log("Province grounding warning:", e.message);
  }

  try {
    topicName = await resolveTopicFromText(lastUserMessage);
    if (topicName && isTopicRankingQuestion(lastUserMessage)) {
      topicRanking = await fetchTopDeputiesByTopic(topicName, 5);
    }
  } catch (e) {
    console.log("Topic grounding warning:", e.message);
  }

  if (topicName && topicRanking.length) {
    return Response.json({
      text: buildTopicRankingAnswer(topicName, topicRanking),
      fallback: false,
      grounded: true,
      topicGrounded: true,
      province,
      topic: topicName,
      mode: "topic-ranking",
    });
  }

  if (topicName && isTopicRankingQuestion(lastUserMessage)) {
    return Response.json({
      text: buildClarifyingAnswer(lastUserMessage, topicName),
      fallback: true,
      grounded: false,
      topicGrounded: false,
      province,
      topic: topicName,
      mode: "clarify",
    });
  }

  const groundedSystem = `${system}

REGLAS EXTRA PARA IA:
- Si mencionas diputados concretos, usa SOLO los nombres del CONTEXTO VERIFICADO.
- Si hay ranking temático verificado de QHLD, úsalo y di claramente que es un índice parlamentario temático.
- No inventes comisiones, cargos, emails, enlaces, fotos, rankings ni fichas.
- Si la pregunta es ambigua o no la entiendes, NO respondas con generalidades: di exactamente qué te falta y ofrece 2-3 opciones concretas de reformulación.
- Si no tienes contexto verificado suficiente para afirmar algo concreto sobre un diputado o ranking, dilo claramente.
- Prioriza pasos accionables sobre discurso general.
- Evita frases vacías del tipo “consulta fuentes oficiales” si puedes dar una reformulación útil.

CONTEXTO VERIFICADO DE PROVINCIA:
${buildDeputiesContext(deputies, province)}

CONTEXTO VERIFICADO DE QHLD:
${buildTopicRankingContext(topicName, topicRanking)}`;

  const payloadMessages = [{ role: "system", content: groundedSystem }, ...messages];

  if (groqKey) {
    for (const model of ["llama-3.3-70b-versatile", "llama-3.1-8b-instant"]) {
      try {
        const data = await callGroq(groqKey, payloadMessages, model);
        const text = data?.choices?.[0]?.message?.content?.trim();
        if (text) {
          return Response.json({
            text: looksGeneric(text) ? buildClarifyingAnswer(lastUserMessage, topicName) : text,
            fallback: false,
            grounded: Boolean(deputies.length || topicRanking.length),
            topicGrounded: Boolean(topicRanking.length),
            province,
            topic: topicName,
            mode: looksGeneric(text) ? "clarify" : "llm",
          });
        }
        console.log(`Groq model ${model} failed`, JSON.stringify(data?.error || "no_content"));
      } catch (e) {
        console.log(`Groq model ${model} error`, e.message);
      }
    }
  }

  if (openaiKey) {
    for (const model of ["gpt-4o-mini", "gpt-4.1-mini"]) {
      try {
        const data = await callOpenAI(openaiKey, payloadMessages, model);
        const text = data?.choices?.[0]?.message?.content?.trim();
        if (text) {
          return Response.json({
            text: looksGeneric(text) ? buildClarifyingAnswer(lastUserMessage, topicName) : text,
            fallback: false,
            grounded: Boolean(deputies.length || topicRanking.length),
            topicGrounded: Boolean(topicRanking.length),
            province,
            topic: topicName,
            mode: looksGeneric(text) ? "clarify" : "llm",
          });
        }
        console.log(`OpenAI model ${model} failed`, JSON.stringify(data?.error || "no_content"));
      } catch (e) {
        console.log(`OpenAI model ${model} error`, e.message);
      }
    }
  }

  return Response.json({
    text: buildClarifyingAnswer(lastUserMessage, topicName),
    fallback: true,
    grounded: false,
    topicGrounded: false,
    province,
    topic: topicName,
    mode: "fallback",
    debug: "no_model_available",
  });
}
