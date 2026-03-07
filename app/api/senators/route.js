import { OFFICIAL_SENATE_COMMISSIONS, buildSenateProvinceLinks, getSenatorsByProvince } from "../_lib/parliament";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const provincia = searchParams.get("provincia") || "";
  const comision = searchParams.get("comision") || "";
  const topic = OFFICIAL_SENATE_COMMISSIONS.find((item) => item.name === comision)?.topic || "";

  try {
    const data = await getSenatorsByProvince(provincia, comision, 24);
    return Response.json({
      province: provincia,
      commission: comision,
      topicHint: topic,
      links: buildSenateProvinceLinks(provincia),
      commissions: OFFICIAL_SENATE_COMMISSIONS,
      senators: data.senators || [],
      notice: data.notice || "",
      grounded: true,
    });
  } catch (e) {
    return Response.json({
      province: provincia,
      commission: comision,
      topicHint: topic,
      links: buildSenateProvinceLinks(provincia),
      commissions: OFFICIAL_SENATE_COMMISSIONS,
      senators: [],
      notice: e.message || "No pude consultar el Senado ahora mismo.",
      grounded: false,
    }, { status: 500 });
  }
}
