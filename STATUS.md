# Status do Projeto Arcavila

> Atualizado em: 2026-06-24

---

## Workflow de Deploy

| Tipo de arquivo | Quem faz o push | Como |
|-----------------|-----------------|------|
| Arquivos pequenos (STATUS.md, JS, CSS) | Claude | GitHub MCP direto |
| `index.html` (~600KB, base64 embutido) + assets | Caio roda 3 comandos no terminal | `git add index.html estande.png && git commit -m "msg" && git push origin main` |

SSH configurado em 2026-06-24: chave `~/.ssh/id_ed25519` cadastrada no GitHub (conta `maioemico`, título "Mac Air Caio"). Repositório local em `~/Claude/Projects/Arcavila` já inicializado com remote `git@github.com:maioemico/arcavila-teste.git`.

---

## Domínios e Páginas

| URL | Status | Observação |
|-----|--------|-----------|
| arcavila.online | Publicado | Site editorial. Cloudflare Pages → projeto `arcavila-captura` |
| amorefe.arcavila.online | Publicado | Landing de captura Amor e Fé. Cloudflare Pages → projeto `arcavila-amorefe` (root dir: `amorefe/`) |
| presente.arcavila.online | Publicado | Flipbook Ana e Pedro. Cloudflare Pages → projeto `arcavila-presente` |
| anaepedro.arcavila.online | **Inicializando** | Landing de vendas Ana e Pedro. Migrado Netlify → Cloudflare Pages (projeto `arcavila-anaepedro`). Domínio adicionado em 2026-06-24. Build: `mkdir -p _out && cp landing-sprites-ana-pedro.html _out/index.html`, output dir: `_out` |
| arcavila.com | Registrado | DNS migrado do GoDaddy para Cloudflare |

---

## Atualizações de Layout (em andamento)

| Item | Status | Observação |
|------|--------|-----------|
| Hero `arcavila.online` — logo sobrepondo header | Concluído | CSS padding-top no `.hero-content` |
| Hero `arcavila.online` — botões duplicados removidos | Concluído | `<div class="hero-actions">` removido |
| Hero `arcavila.online` — scroll hint "role" removido | Concluído | HTML e CSS do `.scroll-hint` removidos |
| Catálogo `arcavila.online` — layout prateleira horizontal | Concluído | `.shelf` vertical, `.book` flex-row, badge de preço R$ 37,00 |
| Catálogo `arcavila.online` — fix mobile (capa + preço) | Concluído | Altura da capa fixada via media query, preço em fluxo inline |
| Catálogo `arcavila.online` — rótulos e gênero removidos | Concluído | `.book-status` e `.book-genre` display:none globalmente |
| Catálogo `arcavila.online` — link sinopse Amor e Fé | Concluído | Aponta para `anaepedro.arcavila.online` |
| Catálogo `arcavila.online` — fundo de estante de madeira | Concluído | `estande.png` como background do `.shelf`; `.book-body` com overlay semi-transparente para leitura |

---

## Funil de Captura

| Item | Status | Observação |
|------|--------|-----------|
| Formulário `amorefe.arcavila.online` | Ativo | POST para `/subscribe` via Cloudflare Pages Function |
| Endpoint `/subscribe` | Ativo | `amorefe/functions/subscribe.js` — adiciona lead no Mailchimp com tag `captura-amor-e-fe` |
| Modal de captura `arcavila.online` | Ativo | `functions/_middleware.js` injeta modal + patch do `leadForm`. Aparece após 8s ou 40% de scroll |
| Mailchimp — lista e tag | Configurado | Audience ID `9f9b97e70e` · Server `us5` |
| Customer Journey | Ativo | Disparado pela tag `captura-amor-e-fe` |
| E-mail 0 — Dia 0 — Boas-vindas | Ativo | "O flipbook chegou, e tem algo mais para você" → link `presente.arcavila.online` |
| E-mail 1 — Dia 2 | Ativo | "Ana fez uma coisa que a maioria das mulheres faz e não conta" → link flipbook |
| E-mail 2 — Dia 4 | Ativo | "Por que Pedro não contou" → link Hotmart |
| E-mail 3 — Dia 6 | Ativo | "A ligação que Pedro recebeu no final do Capítulo 2" → link Hotmart |
| E-mail 4 — Dia 9 | Ativo | "Você chegou até aqui por algum motivo" → link Hotmart |
| **Saída do Journey para compradores** | **PENDENTE** | Webhook Hotmart → Make.com → tag `comprou-amor-e-fe` → exit condition no Journey |
| **Teste ponta a ponta completo** | **PENDENTE** | E-mail novo → lead no Mailchimp → receber sequência completa |

---

## Livro — Amor e Fé

| Item | Status | Observação |
|------|--------|-----------|
| Botão de compra no flipbook | Configurado | `https://pay.hotmart.com/J106177179S` com `target="_blank"` |
| Meta Pixel | Configurado | ID `2738569696297378` · Eventos: `PageView`, `ViewContent`, `Lead` |

---

## Pipeline Pós-Compra (Hotmart → Make → Mailchimp)

| Item | Status | Observação |
|------|--------|-----------|
| Cenário Make.com | **PENDENTE** | Custom Webhook (trigger) → Add/Update Subscriber → Add Tag `comprou-amor-e-fe` |
| Webhook Hotmart | **PENDENTE** | Configurar após ter a URL do Make.com. Evento: `PURCHASE_APPROVED` |
| Exit Condition no Journey | **PENDENTE** | Abrir Journey "Boas-vindas Amor e Fé" → adicionar saída pela tag `comprou-amor-e-fe` |

---

## Clube de Histórias

### Decisões editoriais (fixas)

| Decisão | Definição |
|---------|-----------|
| Nome da unidade de envio | "Carta" (nunca "episódio") |
| Formato âncora | História fechada de mundo compartilhado, completa em cada e-mail |
| Cadência | Semanal, domingos às 19h |
| Assunto padrão | `[Título] | Arcavila` |
| Preheader padrão | "Sua carta deste domingo" |
| Conversão | Link suave em todo envio; gatilho forte nas semanas 4, 8 e 13 |
| Métrica alvo | Abertura acima de 40% |

### Estoque e produção

| Item | Status | Observação |
|------|--------|-----------|
| Plano de cadência e calendário trimestral | Definido | `clube-de-historias/cadencia-e-calendario.md` |
| Carta 1 — A mesa de domingo | Escrita | Personagem Teresa. Link suave para `presente.arcavila.online` |
| Carta 2 — As flores de sábado | Escrita | Personagens Cecília e Heitor. Link suave para `presente.arcavila.online` |
| Carta 3 — A carta da Ana | Escrita | Variação (carta de personagem). Ana, de Amor e Fé, escreve para a leitora |
| Cartas 4 a 5 | **PENDENTE** | Formar estoque antes de lançar |
| Sequência no Mailchimp | **PENDENTE** | Adicionar cartas ao Customer Journey |
| Lançamento sugerido | Planejado | 2026-07-05 |

---

## E-mail

| Item | Status | Observação |
|------|--------|-----------|
| `historias@arcavila.online` | **PENDENTE** | Conta Zoho com arcavila.online está em outra organização (provável login via GitHub OAuth). Ticket de suporte aberto |
| `arcavila.com` — verificação Zoho | **PENDENTE** | TXT `zoho-verification=zb88462006.zmverify.zoho.com` adicionado no Cloudflare. Aguardando verificação |
| Autenticação de domínio no Mailchimp | **PENDENTE** | Após resolver Zoho: adicionar registros DKIM e SPF no Cloudflare |

---

## Credenciais e IDs (referência rápida)

| Serviço | Valor |
|---------|-------|
| Meta Pixel ID | `2738569696297378` |
| Hotmart link | `https://pay.hotmart.com/J106177179S` |
| Mailchimp Audience ID | `9f9b97e70e` |
| Mailchimp Server | `us5` |
| Repositório GitHub | `maioemico/arcavila-teste` |
