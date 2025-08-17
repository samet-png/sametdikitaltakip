# Samet Dijital Takip (Proxy'li sürüm)

Bu paket, RSS'i **sunucu tarafında** çekip CORS engelini aşar ve çevirileri **Google/DeepL anahtarların** ile güvenli biçimde sunucuda yapar.

## 1) Hızlı kurulum (Vercel)
1. `api/` klasörü Vercel için hazırdır. Bu klasörü ve `index.html` dosyasını bir GitHub repo'ya koy.
2. Vercel'de `New Project` → repoyu seç.
3. **Environment Variables** ekle:
   - `GOOGLE_KEY` = (Google Translate API anahtarın) — opsiyonel, Google kullanacaksan
   - `DEEPL_KEY` = (DeepL anahtarın) — opsiyonel, DeepL kullanacaksan
   - `DEEPL_ENDPOINT` = `https://api-free.deepl.com/v2/translate` (ücretsiz hesap için, istersen boş bırak)
4. Deploy et. Site adresin: `https://<senin-projen>.vercel.app`
5. `index.html` dosyasını sitenin köküne koyduysan `https://<senin-projen>.vercel.app/index.html` ile aç.

## 2) Hızlı kurulum (Netlify)
1. Bu klasörü Netlify'a yükle (Git ile bağlayarak).
2. **netlify/functions/** klasörü fonksiyonlar için hazırdır.
3. `Site settings → Environment variables`:
   - `GOOGLE_KEY` ve/veya `DEEPL_KEY` ekle.
   - (opsiyonel) `DEEPL_ENDPOINT`
4. Deploy et. `index.html` kökte olduğu için ana alan adından açılır.
5. Frontend, otomatik olarak `/.netlify/functions/*` uçlarına istek atar.

## Notlar
- Frontend kendi kendine hangi backend'in (Vercel `/api/*` mi, Netlify `/.netlify/functions/*` mü) çalıştığını **otomatik dener**.
- `index.html` dosyasını tek başına yerelden açarsan proxy çalışmaz; bu paket **bir host üzerinde** çalışacak şekilde tasarlanmıştır.
- Kaynak listesi `index.html` üstündedir, istersen ekleyip/çıkarabilirsin.
