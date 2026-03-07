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
      max_tokens: 1600,
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
      max_tokens: 1600,
      temperature: 0.2,
    }),
  });
  return res.json();
}

const DOC_META = {
  pnl: {
    title: "Propuesta de proposición no de ley",
    objective: "plantear una iniciativa política con exposición de motivos y propuestas claras",
  },
  peticion_cortes: {
    title: "Derecho de petición",
    objective: "formular una petición formal a las Cortes Generales",
  },
  pregunta_parlamentaria: {
    title: "Propuesta de pregunta parlamentaria",
    objective: "redactar una pregunta concreta, verificable y útil para control al Gobierno",
  },
  mensaje_representante: {
    title: "Mensaje a representante público",
    objective: "escribir a una diputada, senador o representante con un caso concreto y una petición clara",
  },
  escrito_ministerio: {
    title: "Escrito dirigido a un ministerio",
    objective: "ordenar una petición o queja administrativa dirigida a un ministerio o secretaría de Estado",
  },
  escrito_autonomico: {
    title: "Escrito dirigido a una comunidad autónoma",
    objective: "formular una petición o queja clara ante una consejería, parlamento autonómico u organismo autonómico",
  },
  escrito_ayuntamiento: {
    title: "Escrito dirigido a un ayuntamiento",
    objective: "presentar una solicitud, queja o petición clara ante un órgano municipal",
  },
  defensor_pueblo: {
    title: "Queja al Defensor del Pueblo",
    objective: "exponer un caso de mala administración y solicitar actuación institucional",
  },
  alegacion: {
    title: "Escrito de alegaciones",
    objective: "formular alegaciones claras, ordenadas y accionables",
  },
  solicitud_info: {
    title: "Solicitud de información pública",
    objective: "pedir documentación o datos públicos de forma precisa",
  },
  reclamacion_casero: {
    title: "Reclamación al casero o propiedad",
    objective: "reclamar por problemas de alquiler o vivienda con tono firme y usable",
  },
  reclamacion_consumo: {
    title: "Reclamación de consumo",
    objective: "reclamar frente a una empresa, servicio o factura",
  },
  denuncia_laboral: {
    title: "Escrito laboral",
    objective: "ordenar un problema laboral y pedir una actuación concreta",
  },
  derechos_arco: {
    title: "Ejercicio de derechos ARCO",
    objective: "solicitar acceso, rectificación, supresión u oposición sobre datos personales",
  },
  peticion_pe: {
    title: "Petición al Parlamento Europeo",
    objective: "elevar un problema con dimensión europea de forma comprensible",
  },
};


function fallbackDocument({ type, issue, recipient, facts, ask }) {
  const meta = DOC_META[type] || DOC_META.pnl;
  const to = recipient?.trim() ? recipient.trim() : "A quien corresponda";
  return `${meta.title.toUpperCase()}\n\nDESTINATARIO\n${to}\n\nASUNTO\n${issue}\n\nHECHOS\n${facts}\n\nSOLICITUD\n${ask}\n\nBORRADOR\nYo, como persona interesada y afectada por la situación descrita, expongo que ${issue}.\n\nLos hechos relevantes son los siguientes:\n${facts}\n\nPor todo ello, solicito expresamente ${ask}.\n\nAgradezco que esta petición sea valorada y tramitada por el cauce que corresponda, y quedo a disposición para ampliar información o aportar documentación adicional.\n\nEn [lugar], a [fecha].\n\n[Firma / nombre y datos de contacto]`;
}

export async function POST(request) {
  const { type = "pnl", issue = "", recipient = "", facts = "", ask = "" } = await request.json();
  const cleanIssue = String(issue).trim();
  const cleanFacts = String(facts).trim();
  const cleanAsk = String(ask).trim();

  if (!cleanIssue || !cleanFacts || !cleanAsk) {
    return Response.json({ error: "Faltan datos para generar el borrador." }, { status: 400 });
  }

  const meta = DOC_META[type] || DOC_META.pnl;
  const system = `Eres un asistente que redacta borradores de incidencia ciudadana en España.

OBJETIVO:
- Crear un borrador útil, concreto y editable.
- El documento es de tipo: ${meta.title}.
- Debe servir para ${meta.objective}.

REGLAS:
- Responde SOLO con texto plano, sin markdown, sin asteriscos.
- Usa estos encabezados exactos, en este orden:
TÍTULO
DESTINATARIO
ASUNTO
HECHOS
SOLICITUD
BORRADOR
CIERRE
- En BORRADOR redacta un texto completo, claro, firme y razonable.
- No inventes leyes, artículos o plazos si no te los han dado.
- Si faltan datos personales o fechas, deja marcadores visibles entre corchetes.`;

  const user = `Tipo: ${meta.title}
Destinatario: ${recipient || "A quien corresponda"}
Tema o problema: ${cleanIssue}
Hechos: ${cleanFacts}
Qué se pide: ${cleanAsk}`;

  const messages = [
    { role: "system", content: system },
    { role: "user", content: user },
  ];

  const groqKey = process.env.GROQ_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (groqKey) {
    for (const model of ["llama-3.3-70b-versatile", "llama-3.1-8b-instant"]) {
      try {
        const data = await callGroq(groqKey, messages, model);
        const text = data?.choices?.[0]?.message?.content?.trim();
        if (text) {
          return Response.json({ text, provider: "groq", model, fallback: false });
        }
      } catch (e) {
        console.log("Document Groq error", e.message);
      }
    }
  }

  if (openaiKey) {
    for (const model of ["gpt-4o-mini", "gpt-4.1-mini"]) {
      try {
        const data = await callOpenAI(openaiKey, messages, model);
        const text = data?.choices?.[0]?.message?.content?.trim();
        if (text) {
          return Response.json({ text, provider: "openai", model, fallback: false });
        }
      } catch (e) {
        console.log("Document OpenAI error", e.message);
      }
    }
  }

  return Response.json({ text: fallbackDocument({ type, issue: cleanIssue, recipient, facts: cleanFacts, ask: cleanAsk }), fallback: true });
}
