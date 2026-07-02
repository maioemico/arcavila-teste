# Status do Projeto Arcavila

> Atualizado em: 2026-07-02

---

## Workflow de Deploy

**Ferramentas em uso:**
- **Cowork** (claude.ai desktop) → conversa, planejamento, previews, decisões
- **Terminal local** (`~/Claude/Projects/Arcavila`) → git add/commit/push de arquivos grandes como `index.html`

**Como funciona na prática:**
1. Planejamos e decidimos aqui no Cowork
2. Cowork edita os arquivos localmente e passa o comando de commit/push para o usuário rodar no terminal
3. Para STATUS.md: Cowork atualiza via GitHub MCP direto

**ATENÇÃO — lição aprendida:** nunca usar `mcp__github__push_files` com `content: ""` para arquivos grandes. Isso apaga o conteúdo. Para index.html, sempre usar o terminal local.

SSH configurado em 2026-06-24: chave `~/.ssh/id_ed25519` cadastrada no GitHub (conta `maioemico`, título "Mac Air Caio"). Repositório local em `~/Claude/Projects/Arcavila` já inicializado com remote `git@github.com:maioemico/arcavila-teste.git`.

**Atenção:** após qualquer push do Cowork via MCP, rodar `git pull origin main --no-rebase` antes do próximo push pelo terminal.

---

## Domínios e Páginas

| URL | Status | Observação |
|-----|--------|-----------|
| arcavila.online | Publicado | Site editorial. Cloudflare Pages → projeto `arcavila-captura` |
| www.arcavila.com.br | **Aguardando propagação** | CNAME `www → arcavila-captura.pages.dev`. Ativa automaticamente após propagação dos nameservers |
| arcavila.com.br (raiz) | Concluído | Redirect Rule 301 ativa no Cloudflare: `arcavila.com.br/* → https://www.arcavila.com.br/*` (preserva path e query string) |
| amorefe.arcavila.online | Publicado | Landing de captura Amor e Fé. Cloudflare Pages → projeto `arcavila-amorefe` (root dir: `amorefe/`) |
| amorefe.arcavila.com.br | **Aguardando propagação** | Landing de vendas do livro Amor e Fé. CNAME `amorefe → arcavila-anaepedro.pages.dev`. Ativa automaticamente após propagação |
| anaepedro.arcavila.online | Publicado | Landing de vendas (URL legada). Continua ativa. Cloudflare Pages → projeto `arcavila-anaepedro` |
| presente.arcavila.online | Publicado | Flipbook Ana e Pedro. Cloudflare Pages → projeto `arcavila-presente` |
| arcavila.com | Registrado | DNS migrado do GoDaddy para Cloudflare |

---

## Atualizações de Layout (em andamento)

| Item | Status | Observação |
|------|--------|-----------|
| Hero `arcavila.online` — logo sobrepondo header | Concluído | CSS padding-top no `.hero-content` |
| Hero `arcavila.online` — botões duplicados removidos | Concluído | `<div class="hero-actions">` removido |
| Hero `arcavila.online` — scroll hint "role" removido | Concluído | HTML e CSS do `.scroll-hint` removidos |
| Hero `arcavila.online` — frase sublinhada e caixa de stats removidas | Concluído | Removido "O leitor caminha..." e bloco `.obra-meta` (13 cap., epílogo, temporada) |
| Hero `arcavila.online` — botão "Receber por e-mail" removido | Concluído | Removido do hero (desktop e mobile). Link no footer preservado |
| Catálogo `arcavila.online` — layout prateleira horizontal | Concluído | `.shelf` vertical, `.book` flex-row, badge de preço R$ 37,00 |
| Catálogo `arcavila.online` — rótulos e gênero removidos | Concluído | `.book-status` e `.book-genre` display:none globalmente |
| Catálogo `arcavila.online` — link sinopse Amor e Fé | Concluído | Atualizado para `amorefe.arcavila.com.br` em 2026-06-29 |
| Catálogo `arcavila.online` — fundo de estante de madeira | Concluído | `estande.jpeg` como background do `.shelf`; grid CSS alinha livros nas prateleiras |
| Catálogo `arcavila.online` — efeitos Three.js | Concluído | Partículas âmbar flutuantes, spotlight com cursor, tilt 3D no hover dos livros |
| Catálogo `arcavila.online` — botão "Ler a sinopse" | Concluído | Styled como botão real (background dark, padding, sem borda amarela) |
| Catálogo `arcavila.online` — preço R$ 37,00 desktop | Concluído | Sem box, negrito, font-size 1.2rem, margin-left:auto |
| Seção Círculo Arcavila (`#circulo`) | **OCULTO** | `display:none` via CSS. HTML preservado intacto para reativar quando o produto estiver pronto. Reativar: mudar `#circulo{display:none}` para `#circulo{background:var(--noite)}` |
| Catálogo `arcavila.online` — mobile revisado | Concluído | `.book-desc` oculto, botão sinopse oculto, card Amor e Fé clicável, capa maior, preço 1.2rem negrito sem borda |

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
| From address dos e-mails do Journey | Concluído | Remetente atualizado para `suporte@arcavila.online` em todos os 5 e-mails em 2026-07-01 |
| **Exit condition para compradores** | **PENDENTE** | Adicionar saída do Journey pela tag `comprou-amor-e-fe` no Mailchimp |
| **Teste ponta a ponta completo** | **PENDENTE** | E-mail novo → lead no Mailchimp → receber sequência completa |

---

## Livro — Amor e Fé

| Item | Status | Observação |
|------|--------|-----------|
| Conta Hotmart | Ativo | Nova conta criada com `suporte@arcavila.online` em 2026-06-28 |
| Produto no Hotmart | Configurado | E-book Amor e Fé criado na nova conta. ID do produto: `8026094` |
| URL de pagamento | Concluído | Atualizada para `https://pay.hotmart.com/S106531572M` em todas as páginas |
| Meta Pixel | Configurado | ID `2738569696297378` · Eventos: `PageView`, `ViewContent`, `Lead` |

---

## Pipeline Pós-Compra (Hotmart → Make → Mailchimp)

| Item | Status | Observação |
|------|--------|-----------|
| Cenário Make.com | **Concluído** | ID `5549131` · "Arcavila — Hotmart Compra Aprovada" · Ativo. Webhook → HTTP POST Mailchimp API → tag `comprou-amor-e-fe` |
| Webhook Make.com | **Concluído** | ID `2526674` · URL: `https://hook.us2.make.com/f8gnefhcr70exg7mqo3gt1krwbie1l0y` |
| Webhook Hotmart | **Concluído** | Cadastrado em Ferramentas → Webhook. Nome: "Make.com - Compra Aprovada". Produto: Amor e Fé (ID 8026094). Versão 2.0.0. Evento: Compra aprovada. Status: Ativo |
| Exit Condition no Journey | **PENDENTE** | Abrir Journey "Boas-vindas Amor e Fé" no Mailchimp → adicionar saída pela tag `comprou-amor-e-fe` |

---

## Novo Livro — Referência "Pousando no Amor" (Crash Landing on You)

| Item | Status | Observação |
|------|--------|-----------|
| Pesquisa da história de referência | Concluído | Sinopse completa, personagens, beats episódio a episódio e final explicado levantados em fontes nacionais e internacionais (Wikipedia, KDramaWorlds, AsianWiki) |
| Documento de referência | Salvo | `referencia-pousando-no-amor.md` na raiz do repositório local/GitHub |
| Nota de direitos autorais | Registrada | Uso permitido apenas como inspiração de tropo/estrutura (amor impossível, disfarce, sacrifício, final agridoce) — sem copiar personagens, falas ou cenas específicas |
| Adaptação para romance cristão | **PENDENTE** | Definir enredo, personagens e cenário 100% originais inspirados nos tropos levantados |
| Título, sinopse e estrutura do novo livro | **PENDENTE** | Próxima etapa de decisão |

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
| Cartas 4 a 5 | **PAUSADO** | Aguardando lançamento da plataforma e primeiros clientes antes de lançar o Clube |
| Sequência no Mailchimp | **PAUSADO** | Idem |
| Lançamento | **PAUSADO** | Clube de Histórias será lançado após oficialização da plataforma e primeiros clientes |

---

## E-mail

| Item | Status | Observação |
|------|--------|-----------|
| Zoho — plano | Ativo | Mail Lite anual, 1 licença, expira 28/06/2027. Conta gerenciadora: `caiochiba4@gmail.com` |
| Zoho — domínios configurados | Ativo | `arcavila.online` e `arcavila.com.br` adicionados no Zoho |
| `suporte@arcavila.online` | Criado | Conta criada no Zoho em 2026-06-28. Login da conta Hotmart. Remetente do Customer Journey |
| `contato@arcavila.online` | Criado | Conta criada no Zoho |
| `historias@arcavila.com.br` | **PAUSADO** | Não criado — plano Zoho tem apenas 1 licença. Criar somente se/quando ampliar o plano |
| DNS arcavila.com.br — MX | Concluído | mx.zoho.com (10), mx2.zoho.com (20), mx3.zoho.com (50) — propagados no Cloudflare |
| DNS arcavila.com.br — SPF | Concluído | `v=spf1 include:zohomail.com ~all` — propagado no Cloudflare |
| DNS arcavila.com.br — DKIM | Concluído | Verificado no Zoho em 2026-07-01 |
| Autenticação arcavila.online no Mailchimp | Concluído | CNAMEs k2/k3 já estavam no Cloudflare. Verificado em 2026-07-01 |
| Autenticação arcavila.com.br no Mailchimp | **PAUSADO** | Não necessário enquanto remetente for `suporte@arcavila.online` |

---

## Make.com

| Item | Status | Observação |
|------|--------|-----------|
| Cenário Drive → GitHub → Netlify (ID 5389909) | **Desativado** | Desativado em 2026-07-01 para liberar vaga de cenário ativo no plano Free. Workflow atual usa terminal local para pushes |
| Cenário Arcavila — Hotmart Compra Aprovada (ID 5549131) | **Ativo** | Webhook recebe Hotmart → HTTP POST Mailchimp API adiciona tag `comprou-amor-e-fe` |

---

## Serviços Pagos

| Serviço | Modelo | Conta / Observação |
|---------|--------|-------------------|
| Zoho Mail | Anual | Mail Lite, 1 licença. Conta gerenciadora: `caiochiba4@gmail.com` |
| Registro.br — `arcavila.com.br` | Anuidade de domínio | Domínio .com.br registrado no Registro.br |
| Hotmart | Comissão por venda (~9,9% + R$1) | Login: `suporte@arcavila.online`. Sem mensalidade |
| Mailchimp | Free até 500 contatos | Monitorar crescimento da lista para antecipar upgrade |
| Cloudflare Pages | Free tier | Hospedagem dos 4 sites do projeto |
| Make.com | Free tier (1 cenário ativo) | Cenário ativo: Hotmart → Mailchimp pós-compra |
| GitHub | Free (repo público) | `maioemico/arcavila-teste` |
| Meta Ads | Por investimento (não ativo) | Tráfego pago ainda não iniciado |

---

## Credenciais e IDs (referência rápida)

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
