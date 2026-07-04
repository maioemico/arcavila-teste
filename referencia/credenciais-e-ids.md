# Credenciais e IDs — Arcavila

> Arquivo de referência. Extraído do STATUS.md em 2026-07-04.
> Abrir quando precisar de um valor específico (Pixel, Hotmart, Mailchimp, webhook, DNS, Canva).
> O estado vivo do projeto continua no STATUS.md na raiz do repositório.

---

## Referência rápida

| Serviço | Valor |
|---------|-------|
| Meta Pixel ID | `2738569696297378` |
| Hotmart — login | `suporte@arcavila.online` |
| Hotmart — URL de pagamento | `https://pay.hotmart.com/S106531572M` |
| Hotmart — Produto ID | `8026094` |
| Mailchimp Audience ID | `9f9b97e70e` |
| Mailchimp Server | `us5` |
| Make.com webhook (Hotmart) | `https://hook.us2.make.com/f8gnefhcr70exg7mqo3gt1krwbie1l0y` |
| Zoho — conta gerenciadora | `caiochiba4@gmail.com` |
| Repositório GitHub | `maioemico/arcavila-teste` |

---

## IDs de cenários e webhooks Make.com

| Item | ID |
|------|-----|
| Cenário "Arcavila — Hotmart Compra Aprovada" (ativo) | `5549131` |
| Webhook Make.com (Hotmart) | `2526674` — `https://hook.us2.make.com/f8gnefhcr70exg7mqo3gt1krwbie1l0y` |
| Cenário Drive → GitHub → Netlify (desativado) | `5389909` |

---

## DNS e verificação (Cloudflare)

Manter estes registros TXT enquanto as propriedades estiverem verificadas no Google Search Console.

| Zone | Registro |
|------|----------|
| `arcavila.com.br` | TXT `google-site-verification=4ybcJumeYAzGJF5XeYel8sOXQCcV4FZS2pLdVo5w81w` |
| `arcavila.online` | TXT `google-site-verification=7a7e-Iw5ijK13shaKT8UECAqezBrARmRqxdqCCYLV6g` |

E-mail (Zoho) — `arcavila.com.br`:
- MX: `mx.zoho.com` (10), `mx2.zoho.com` (20), `mx3.zoho.com` (50)
- SPF: `v=spf1 include:zohomail.com ~all`
- DKIM: verificado no Zoho em 2026-07-01

---

## Designs no Canva

| Peça | ID / URL |
|------|----------|
| Criativo 1 · 4:5 (dourado) | `DAHOSJrDDXQ` · canva.com/d/gPdMc09r6k1JlKl |
| Criativo 1 · 9:16 | `DAHOWgHxapI` · canva.com/d/yp85B36hl4OsH6Z |
| Criativo 3 · 4:5 (cenas) | `DAHOSMRVNN4` · canva.com/d/7XM71C765lZ01w8 |
| Criativo 3 · 9:16 | `DAHOWlGbhS8` · canva.com/d/BvOk-1JQju4MebA |
| Criativo 2 (DESCARTADO) | `DAHOWqcqsg8` (vinho) / `DAHOSWCDTOo` (antigo) |
