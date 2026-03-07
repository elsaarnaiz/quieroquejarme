import { getDeputiesByProvince, getDeputiesByProvinceAndTopic, getDeputiesByTopic } from "../_lib/parliament";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const provincia = searchParams.get("provincia") || "";
  const tema = searchParams.get("tema") || "";
  const limit = Number(searchParams.get("limit") || 200);

  try {
    if (tema) {
      const data = provincia
        ? await getDeputiesByProvinceAndTopic(provincia, tema, limit)
        : await getDeputiesByTopic(tema, limit);
      return Response.json({
        deputies: data.deputies,
        ranking: data.ranking,
        topic: data.topicName,
        total: data.deputies.length,
        province: provincia,
        grounded: true,
      });
    }

    const deputies = await getDeputiesByProvince(provincia, limit);
    return Response.json({
      deputies,
      total: deputies.length,
      province: provincia,
      grounded: true,
    });
  } catch (e) {
    console.error("Deputies API error:", e);
    return Response.json({ deputies: [], error: e.message, grounded: false }, { status: 500 });
  }
}
