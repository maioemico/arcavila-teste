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
| Modal de captura `arcavila.online` | Publicado | `functions/_middleware.js` injeta modal antes do `</body>`. Aparece após 8s ou 40% de scroll. Mesmo endpoint `/subscribe` |
| Mailchimp — lista e tag | Configurado | Audience ID `9f9b97e70e` · Server `us5` |
| Customer Journey | Ativo | Disparado pela tag `captura-amor-e-fe` |
| E-mail de boas-vindas | Configurado | Assunto: "O flipbook chegou, e tem algo mais para você". Link `presente.arcavila.online`. Journey ativo |
| **Teste ponta a ponta** | **PENDENTE** | Testar modal em `arcavila.online` + formulário em `amorefe.arcavila.online` com e-mail novo → confirmar lead + e-mail recebido |

---

## Livro — Amor e Fé

| Item | Status | Observação |
|------|--------|-----------|
| Botão de compra no flipbook | Configurado | `https://pay.hotmart.com/J106177179S` com `target="_blank"` |
| Meta Pixel | Configurado | ID `2738569696297378` · Eventos: `PageView`, `ViewContent`, `Lead` |

---

## Clube de Histórias

Iniciativa prometida no e-mail de boas-vindas: histórias curtas de romance cristão enviadas por e-mail, como uma carta de uma amiga. Arquivos completos do plano e das cartas ficam na pasta `clube-de-historias/` deste repositório e também na pasta local `Arcavila`. Esta seção é o registro de decisões e do estoque.

### Decisões editoriais (fixas)

| Decisão | Definição |
|---------|-----------|
| Nome da unidade de envio | "Carta" (nunca "episódio", para não sugerir continuidade) |
| Formato âncora | História fechada de mundo compartilhado, completa em cada e-mail, personagens que se cruzam entre cartas e com os livros |
| Formatos de variação | A cada 3 a 4 envios: carta de personagem, cena devocional, crônica em 1ª pessoa, pergunta da leitora, bastidores, história sazonal |
| Estrutura de cada carta | Abertura de carta que apresenta a personagem e para antes da virada → história fechada → fecho com link suave |
| Registro de linguagem | Português acessível, palavras do dia a dia, frases curtas, mantendo a emoção. Sem pregação explícita |
| Cadência | Semanal, domingos às 19h (horário a validar por taxa de abertura) |
| Assunto padrão | `[Título] | Arcavila` |
| Remetente | `Arcavila` |
| Preheader padrão | "Sua carta deste domingo" |
| Conversão | Link suave em todo envio; gatilho forte nas semanas 4, 8 e 13 e nos envios sazonais |
| Métrica alvo | Abertura acima de 40% |

### Estoque e produção

| Item | Status | Observação |
|------|--------|-----------|
| Plano de cadência e calendário trimestral | Definido | `clube-de-historias/cadencia-e-calendario.md` |
| Carta 1 — A mesa de domingo | Escrita | Âncora. `clube-de-historias/carta-01-a-mesa-de-domingo.md`. Personagem Teresa. Link suave para `presente.arcavila.online` |
| Carta 2 — As flores de sábado | Escrita | Âncora. `clube-de-historias/carta-02-as-flores-de-sabado.md`. Personagens Cecília e Heitor. Link suave para `presente.arcavila.online` |
| Cartas 3 a 5 | **PENDENTE** | Formar estoque antes de lançar |
| Sequência no Mailchimp (cartas após boas-vindas) | **PENDENTE** | Adicionar ao Customer Journey da tag `captura-amor-e-fe` |
| Lançamento sugerido | Planejado | 2026-07-05 (primeiro domingo com estoque pronto) |

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
