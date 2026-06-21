# Status do Projeto Arcavila

> Atualizado em: 2026-06-21

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
| Mailchimp — lista e tag | Configurado | Audience ID `9f9b97e70e` · Server `us5` |
| Customer Journey | Configurado (sem e-mail) | Disparado pela tag `captura-amor-e-fe`. E-mail de boas-vindas pendente |
| **E-mail de boas-vindas** | **PENDENTE** | Criar dentro do Customer Journey com link `presente.arcavila.online` + texto do clube de leitoras |
| **Teste ponta a ponta** | **PENDENTE** | Formulário → Mailchimp → e-mail → pixel `Lead` |

---

## Livro — Amor e Fé

| Item | Status | Observação |
|------|--------|-----------|
| Botão de compra no flipbook | Configurado | `https://pay.hotmart.com/J106177179S` com `target="_blank"` |
| Meta Pixel | Configurado | ID `2738569696297378` · Eventos: `PageView`, `ViewContent`, `Lead` |

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
