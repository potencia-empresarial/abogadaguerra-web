/* ============================================
   Meta Conversions API (CAPI) — Abogada Guerra
   Reenvío server-side de eventos de conversión.

   El frontend (js/tracking.js) llama a este endpoint con el mismo
   event_id que ya envió el Pixel del navegador. Meta deduplica por
   event_id, así que un evento cuenta UNA vez aunque llegue por las
   dos vías. La vía server (CAPI) resiste bloqueadores de anuncios
   e iOS, mejorando la atribución.

   Requiere 2 variables de entorno configuradas en Netlify:
     META_PIXEL_ID    — el ID del píxel (1637086874251811)
     META_CAPI_TOKEN  — el access token de la API de conversiones

   Diseño defensivo: si falta config o Meta falla, responde con
   error JSON pero NUNCA lanza — el sitio no se ve afectado.
============================================ */

const crypto = require('crypto');

const GRAPH_VERSION = 'v21.0';

// SHA-256 en minúsculas y sin espacios — formato que Meta exige para PII.
function hash(value) {
  if (!value) return undefined;
  return crypto
    .createHash('sha256')
    .update(String(value).trim().toLowerCase())
    .digest('hex');
}

exports.handler = async (event) => {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Preflight CORS
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: cors, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: cors, body: JSON.stringify({ error: 'Método no permitido' }) };
  }

  const PIXEL_ID = process.env.META_PIXEL_ID;
  const ACCESS_TOKEN = process.env.META_CAPI_TOKEN;
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.error('[CAPI] Faltan env vars META_PIXEL_ID / META_CAPI_TOKEN');
    return { statusCode: 500, headers: cors, body: JSON.stringify({ error: 'CAPI no configurado en el servidor' }) };
  }

  // Parseo defensivo del body
  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (e) {
    return { statusCode: 400, headers: cors, body: JSON.stringify({ error: 'JSON inválido' }) };
  }

  const {
    event_name,
    event_id,
    event_source_url,
    user_data = {},
    custom_data = {},
  } = payload;

  if (!event_name) {
    return { statusCode: 400, headers: cors, body: JSON.stringify({ error: 'Falta event_name' }) };
  }

  // IP y user-agent del visitante (Meta los usa para matching)
  const ip = (event.headers['x-forwarded-for'] || '').split(',')[0].trim() || undefined;
  const ua = event.headers['user-agent'] || undefined;

  const body = {
    data: [
      {
        event_name: event_name,
        event_time: Math.floor(Date.now() / 1000),
        event_id: event_id,            // <-- deduplicación con el Pixel
        event_source_url: event_source_url,
        action_source: 'website',
        user_data: {
          client_ip_address: ip,
          client_user_agent: ua,
          em: hash(user_data.email),
          ph: hash(user_data.phone),
        },
        custom_data: custom_data,
      },
    ],
  };

  const url = `https://graph.facebook.com/${GRAPH_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(ACCESS_TOKEN)}`;

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const result = await resp.json();
    if (!resp.ok) {
      console.error('[CAPI] Meta rechazó el evento:', JSON.stringify(result));
      return { statusCode: 502, headers: cors, body: JSON.stringify({ ok: false, meta: result }) };
    }
    console.log(`[CAPI] OK ${event_name} (event_id=${event_id})`);
    return { statusCode: 200, headers: cors, body: JSON.stringify({ ok: true, meta: result }) };
  } catch (e) {
    console.error('[CAPI] Error de red al contactar Meta:', String(e));
    return { statusCode: 502, headers: cors, body: JSON.stringify({ ok: false, error: String(e) }) };
  }
};
