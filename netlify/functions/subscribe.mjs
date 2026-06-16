export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
  const AUDIENCE_ID       = '9f9b97e70e';
  const SERVER_PREFIX     = 'us5';

  if (!MAILCHIMP_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'Chave de API não configurada.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ error: 'Body inválido.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const { nome, email } = body;

  if (!email) {
    return new Response(
      JSON.stringify({ error: 'E-mail obrigatório.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const payload = {
    email_address: email,
    status: 'subscribed',
    merge_fields: {}
  };

  if (nome) {
    payload.merge_fields.FNAME = nome;
  }

  const url = `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

  const mcRes = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Basic ${btoa(`anystring:${MAILCHIMP_API_KEY}`)}`
    },
    body: JSON.stringify(payload)
  });

  if (mcRes.ok) {
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const err = await mcRes.json();

  if (err.title === 'Member Exists') {
    return new Response(
      JSON.stringify({ success: true, info: 'already_subscribed' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify({ error: err.detail || 'Erro no Mailchimp.' }),
    { status: 500, headers: { 'Content-Type': 'application/json' } }
  );
};

export const config = { path: '/api/subscribe' };
