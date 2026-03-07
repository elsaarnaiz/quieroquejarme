import { getAllTopics } from "../_lib/parliament";

export async function GET() {
  try {
    const topics = await getAllTopics();
    return Response.json({ topics, grounded: true });
  } catch (e) {
    console.error("Topics API error:", e);
    return Response.json({ topics: [], error: e.message, grounded: false }, { status: 500 });
  }
}
