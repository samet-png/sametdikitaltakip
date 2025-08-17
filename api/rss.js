export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  try {
    const url = req.query.url || req.query.u;
    if (!url) return res.status(400).send("Missing url");
    const r = await fetch(url, { headers: { "User-Agent": "SametDijitalTakip/1.0" } });
    const text = await r.text();
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    return res.status(200).send(text);
  } catch (e) {
    return res.status(500).json({ error: "RSS error", detail: e.message });
  }
}
