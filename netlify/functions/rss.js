export async function handler(event) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers };
  }
  try {
    const url = event.queryStringParameters.url || event.queryStringParameters.u;
    if (!url) return { statusCode: 400, headers, body: "Missing url" };
    const res = await fetch(url, { headers: { "User-Agent": "SametDijitalTakip/1.0" } });
    const text = await res.text();
    return { statusCode: 200, headers: { ...headers, "Content-Type": "application/xml; charset=utf-8" }, body: text };
  } catch (e) {
    return { statusCode: 500, headers, body: "RSS error: " + e.message };
  }
}
