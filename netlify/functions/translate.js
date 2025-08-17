export async function handler(event) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers };
  }
  try {
    const body = JSON.parse(event.body || "{}");
    const { q, provider="google", source="en", target="tr" } = body;
    if (!q) return { statusCode: 400, headers, body: JSON.stringify({ error:"Missing q" }) };

    if (provider === "deepl") {
      const key = process.env.DEEPL_KEY;
      const endpoint = process.env.DEEPL_ENDPOINT || "https://api-free.deepl.com/v2/translate";
      if (!key) return { statusCode: 400, headers, body: JSON.stringify({ error:"DEEPL_KEY missing" }) };
      const params = new URLSearchParams({ text: q, target_lang: target.toUpperCase(), source_lang: source.toUpperCase() });
      const r = await fetch(endpoint, { method:"POST", headers:{ "Authorization": `DeepL-Auth-Key ${key}`, "Content-Type":"application/x-www-form-urlencoded" }, body: params.toString() });
      const j = await r.json();
      const out = j?.translations?.[0]?.text || q;
      return { statusCode: 200, headers: { ...headers, "Content-Type": "application/json" }, body: JSON.stringify({ text: out }) };
    } else {
      const key = process.env.GOOGLE_KEY;
      if (!key) return { statusCode: 400, headers, body: JSON.stringify({ error:"GOOGLE_KEY missing" }) };
      const r = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q, source, target, format: "text" })
      });
      const j = await r.json();
      const out = j?.data?.translations?.[0]?.translatedText || q;
      return { statusCode: 200, headers: { ...headers, "Content-Type": "application/json" }, body: JSON.stringify({ text: out }) };
    }
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error:"Translate error", detail: e.message }) };
  }
}
