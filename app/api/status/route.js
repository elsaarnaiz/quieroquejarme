export async function GET() {
  const key = process.env.GROQ_API_KEY;
  return Response.json({
    keySet: !!key,
    keyPrefix: key ? key.substring(0, 8) + "..." : "not set",
    env: process.env.NODE_ENV,
  });
}
