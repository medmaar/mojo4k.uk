// /go/wa: the only WhatsApp link the site uses. The number lives here (or in the
// WHATSAPP_NUMBER environment variable in Cloudflare Pages), never in the pages,
// so it isn't shared with other sites and can be changed in one place.
const FALLBACK_NUMBER = '17828026280';
const DEFAULT_TEXT = "Hi, I'm interested in your MOJO 4K service";

export function onRequest({ request, env }) {
  const number = String(env.WHATSAPP_NUMBER || FALLBACK_NUMBER).replace(/\D/g, '');
  const text = (new URL(request.url).searchParams.get('text') || DEFAULT_TEXT).slice(0, 1500);
  return new Response(null, {
    status: 302,
    headers: {
      Location: `https://wa.me/${number}?text=${encodeURIComponent(text)}`,
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}
