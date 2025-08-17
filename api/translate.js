export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  try {
    const { q, provider="google", source="en", target="tr" } = req.body || {};
    if (!q) return res.status(400).json({ error:"Missing q" });

    if (provider === "deepl") {
      const key = process.env.DEEPL_KEY;
      const endpoint = process.env.DEEPL_ENDPOINT || "https://api-free.deepl.com/v2/translate";
      if (!key) return res.status(400).json({ error:"DEEPL_KEY missing" });
      const params = new URLSearchParams({ text: q, target_lang: target.toUpperCase(), source_lang: source.toUpperCase() });
      const r = await fetch(endpoint, { method:"POST", headers:{ "Authorization": `DeepL-Auth-Key ${key}`, "Content-Type":"application/x-www-form-urlencoded" }, body: params.toString() });
      const j = await r.json();
      const out = j?.translations?.[0]?.text || q;
      return res.status(200).json({ text: out });
    } else {
      const key = process.env.GOOGLE_KEY;
      if (!key) return res.status(400).json({ error:"GOOGLE_KEY missing" });
      const r = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q, source, target, format: "text" })
      });
      const j = await r.json();
      const out = j?.data?.translations?.[0]?.translatedText || q;
      return res.status(200).json({ text: out });
    }
  } catch (e) {
    return res.status(500).json({ error:"Translate error", detail:e.message });
  }
}
