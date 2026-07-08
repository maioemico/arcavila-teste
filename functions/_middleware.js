// Patch do formulário leadForm — substitui o handler placeholder pelo fetch real
const LEAD_FORM_PATCH = `
<script>
(function(){
  var form = document.getElementById('leadForm');
  var msg  = document.getElementById('leadMsg');
  if(!form) return;

  // Remove o listener original clonando o elemento
  var newForm = form.cloneNode(true);
  form.parentNode.replaceChild(newForm, form);

  newForm.addEventListener('submit', function(e){
    e.preventDefault();
    var email = document.getElementById('leadEmail').value.trim();
    var ok = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
    if(!ok){
      msg.style.color='var(--vinho-vivo,#8B3A52)';
      msg.textContent='Confira o e-mail e tente de novo.';
      return;
    }
    var btn = newForm.querySelector('button[type="submit"]');
    if(btn){ btn.disabled=true; btn.textContent='Enviando...'; }

    fetch('/subscribe',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({nome:'', email:email})
    })
    .then(function(r){ return r.json(); })
    .then(function(){
      msg.style.color='var(--ouro-claro,#D4AF6A)';
      msg.textContent='Pronto! O primeiro capítulo está a caminho do seu e-mail.';
      newForm.reset();
      if(btn){ btn.disabled=false; btn.textContent='Quero ler'; }
    })
    .catch(function(){
      msg.style.color='var(--vinho-vivo,#8B3A52)';
      msg.textContent='Algo deu errado. Tente novamente.';
      if(btn){ btn.disabled=false; btn.textContent='Quero ler'; }
    });
  });
})();
<\/script>
`;

const SUBSCRIBE_MODAL = `
<style>
  #arc-modal-overlay {
    display: none;
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(0,0,0,0.65);
    backdrop-filter: blur(4px);
    align-items: center; justify-content: center;
  }
  #arc-modal-overlay.arc-visible { display: flex; }
  #arc-modal {
    background: linear-gradient(160deg, #1a0f08 0%, #1a0a12 100%);
    border: 1px solid rgba(184,149,62,0.35);
    padding: 48px 40px 40px;
    max-width: 420px; width: 90%;
    position: relative; text-align: center;
    animation: arc-slide-in 0.4s cubic-bezier(0.22,1,0.36,1) forwards;
  }
  @keyframes arc-slide-in {
    from { opacity:0; transform: translateY(24px); }
    to   { opacity:1; transform: translateY(0); }
  }
  #arc-modal::before {
    content:'';
    position:absolute; inset:10px;
    border:1px solid rgba(184,149,62,0.12);
    pointer-events:none;
  }
  #arc-modal-close {
    position:absolute; top:14px; right:18px;
    background:none; border:none; cursor:pointer;
    font-size:20px; color:rgba(212,175,106,0.4);
    line-height:1; padding:4px 8px;
    transition: color 0.2s;
  }
  #arc-modal-close:hover { color:rgba(212,175,106,0.9); }
  .arc-ornament {
    font-size:18px; color:#B8953E; opacity:0.7;
    letter-spacing:8px; margin-bottom:20px;
  }
  .arc-headline {
    font-family:'Cormorant Garamond',Georgia,serif;
    font-style:italic; font-size:clamp(18px,5vw,22px);
    color:rgba(212,175,106,0.9); line-height:1.5;
    margin-bottom:8px;
  }
  .arc-sub {
    font-family:'Cormorant Garamond',Georgia,serif;
    font-size:clamp(12px,3vw,14px); font-style:italic;
    color:rgba(212,175,106,0.45); line-height:1.7;
    margin-bottom:28px;
  }
  .arc-field {
    width:100%; background:rgba(255,255,255,0.05);
    border:1px solid rgba(184,149,62,0.25);
    color:rgba(212,175,106,0.9); padding:11px 14px;
    font-family:'Cormorant Garamond',Georgia,serif;
    font-size:15px; margin-bottom:10px;
    outline:none; box-sizing:border-box;
    transition: border-color 0.2s;
  }
  .arc-field::placeholder { color:rgba(212,175,106,0.3); }
  .arc-field:focus { border-color:rgba(184,149,62,0.6); }
  #arc-submit {
    width:100%; padding:13px;
    background:linear-gradient(135deg,#B8953E 0%,#8B3A52 100%);
    border:none; cursor:pointer; margin-top:4px;
    font-family:'Cinzel',serif; font-size:10px;
    letter-spacing:3px; color:white;
    transition: opacity 0.2s, transform 0.2s;
  }
  #arc-submit:hover { opacity:0.88; }
  #arc-submit:active { transform:scale(0.97); }
  #arc-submit:disabled { opacity:0.5; cursor:default; }
  #arc-msg {
    margin-top:14px;
    font-family:'Cormorant Garamond',Georgia,serif;
    font-style:italic; font-size:13px;
    color:rgba(212,175,106,0.6); min-height:18px;
  }
  .arc-disclaimer {
    margin-top:16px;
    font-family:'Cormorant Garamond',Georgia,serif;
    font-size:10px; color:rgba(212,175,106,0.25);
    letter-spacing:0.5px;
  }
</style>

<div id="arc-modal-overlay">
  <div id="arc-modal">
    <button id="arc-modal-close" aria-label="Fechar">×</button>
    <div class="arc-ornament">✦</div>
    <div class="arc-headline">Histórias que chegam até você</div>
    <div class="arc-sub">
      Em breve, a Arcavila envia histórias diretamente no seu e-mail.<br>
      Registre-se agora e garanta seu lugar na lista.
    </div>
    <input class="arc-field" id="arc-nome" type="text" placeholder="Seu nome" autocomplete="name">
    <input class="arc-field" id="arc-email" type="email" placeholder="Seu e-mail" autocomplete="email">
    <button id="arc-submit">QUERO RECEBER AS HISTÓRIAS</button>
    <div id="arc-msg"></div>
    <div class="arc-disclaimer">Sem spam. Apenas histórias.</div>
  </div>
</div>

<script>
(function(){
  var STORAGE_KEY = 'arc_modal_dismissed';
  if(sessionStorage.getItem(STORAGE_KEY)) return;

  var overlay = document.getElementById('arc-modal-overlay');
  var closeBtn = document.getElementById('arc-modal-close');
  var submitBtn = document.getElementById('arc-submit');
  var msg = document.getElementById('arc-msg');

  function openModal(){ overlay.classList.add('arc-visible'); }
  function closeModal(){
    overlay.classList.remove('arc-visible');
    sessionStorage.setItem(STORAGE_KEY,'1');
  }

  var opened = false;
  function maybeOpen(){
    if(opened) return;
    opened = true;
    openModal();
  }
  setTimeout(maybeOpen, 8000);
  window.addEventListener('scroll', function(){
    var scrolled = (window.scrollY + window.innerHeight) / document.body.scrollHeight;
    if(scrolled > 0.4) maybeOpen();
  }, {passive:true});

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', function(e){ if(e.target===overlay) closeModal(); });

  submitBtn.addEventListener('click', function(){
    var nome  = document.getElementById('arc-nome').value.trim();
    var email = document.getElementById('arc-email').value.trim();
    if(!email || !email.includes('@')){
      msg.textContent = 'Por favor, informe um e-mail válido.';
      return;
    }
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    fetch('/subscribe',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({nome:nome, email:email})
    })
    .then(function(r){ return r.json(); })
    .then(function(){
      msg.textContent = 'Você está na lista. Até breve.';
      submitBtn.textContent = 'ENVIADO';
      setTimeout(closeModal, 2200);
    })
    .catch(function(){
      msg.textContent = 'Algo deu errado. Tente novamente.';
      submitBtn.disabled = false;
      submitBtn.textContent = 'QUERO RECEBER AS HISTÓRIAS';
    });
  });
})();
<\/script>
`;

// Chave-geral do modal de captura "Histórias que chegam até você".
// Desativado em 2026-07-07: foco agora é venda, não captura de e-mail/newsletter.
// Para reativar, voltar para true (o modal e o CSS ficam intactos abaixo, só não são injetados).
const MODAL_ENABLED = false;

// Hosts onde o modal NÃO deve aparecer mesmo se MODAL_ENABLED voltar a true
const MODAL_DISABLED_HOSTS = ['amorefe.arcavila.com.br'];

export async function onRequest(context) {
  const response = await context.next();
  const contentType = response.headers.get('content-type') || '';

  if (!contentType.includes('text/html')) {
    return response;
  }

  const hostname = new URL(context.request.url).hostname;
  const skipModal = !MODAL_ENABLED || MODAL_DISABLED_HOSTS.includes(hostname);

  const html = await response.text();
  const injection = skipModal ? LEAD_FORM_PATCH : (LEAD_FORM_PATCH + SUBSCRIBE_MODAL);
  const modified = html.replace('</body>', injection + '</body>');

  const newHeaders = new Headers(response.headers);
  newHeaders.delete('content-length');

  return new Response(modified, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}
