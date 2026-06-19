export async function onRequestPost(context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  let body;
  try {
    body = await context.request.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: 'JSON inválido.' }), { status: 400, headers });
  }

  const { nome, email } = body;

  if (!email || !email.includes('@')) {
    return new Response(JSON.stringify({ error: 'E-mail inválido.' }), { status: 400, headers });
  }

  const apiKey = context.env.MAILCHIMP_API_KEY;
  const listId = '9f9b97e70e';
  const server = 'us5';

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key não configurada.' }), { status: 500, headers });
  }

  const payload = JSON.stringify({
    email_address: email.toLowerCase().trim(),
    status: 'subscribed',
    merge_fields: {
      FNAME: nome ? nome.trim() : '',
    },
    tags: ['captura-amor-e-fe'],
  });

  const credentials = btoa(`anystring:${apiKey}`);

  const response = await fetch(`https://${server}.api.mailchimp.com/3.0/lists/${listId}/members`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${credentials}`,
    },
    body: payload,
  });

  const data = await response.json();

  if (response.status === 200) {
    return new Response(JSON.stringify({ success: true, message: 'Inscrição realizada com sucesso.' }), { status: 200, headers });
  } else if (response.status === 400 && data.title === 'Member Exists') {
    return new Response(JSON.stringify({ success: true, message: 'E-mail já cadastrado.' }), { status: 200, headers });
  } else {
    return new Response(JSON.stringify({ error: 'Erro ao cadastrar. Tente novamente.' }), { status: 500, headers });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
    },
  });
}
