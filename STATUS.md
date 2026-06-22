# Status do Projeto Arcavila

> Atualizado em: 2026-06-22

---

## Domínios e Páginas

| URL | Status | Observação |
|-----|--------|-----------|
| arcavila.online | Publicado | Site editorial. Cloudflare Pages → projeto `arcavila-captura` |
| amorefe.arcavila.online | Publicado | Landing de captura Amor e Fé. Cloudflare Pages → projeto `arcavila-amorefe` (root dir: `amorefe/`) |
| presente.arcavila.online | Publicado | Flipbook Ana e Pedro. Cloudflare Pages → projeto `arcavila-presente` |
| arcavila.com | Registrado | DNS migrado do GoDaddy para Cloudflare |

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

Objetivo: remover o comprador da sequência de nutrição assim que a compra for aprovada na Hotmart.

| Item | Status | Observação |
|------|--------|-----------|
| Cenário Make.com | **PENDENTE** | Custom Webhook (trigger) → Add/Update Subscriber → Add Tag `comprou-amor-e-fe` |
| Webhook Hotmart | **PENDENTE** | Configurar após ter a URL do Make.com. Evento: `PURCHASE_APPROVED` |
| Exit Condition no Journey | **PENDENTE** | Abrir Journey "Boas-vindas Amor e Fé" → adicionar saída pela tag `comprou-amor-e-fe` |

Fluxo esperado: Compra confirmada → Hotmart dispara webhook → Make.com adiciona tag `comprou-amor-e-fe` → Journey remove contato da sequência.

---

## Clube de Histórias

Iniciativa prometida no e-mail de boas-vindas: histórias curtas de romance cristão enviadas por e-mail, como uma carta de uma amiga.

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
