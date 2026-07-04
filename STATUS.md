# Status do Projeto Arcavila

> Atualizado em: 2026-07-03

---

## Preferências de Interação

- Quando o Cowork enviar uma mensagem com mais de uma pergunta ou pedido de decisão, apresentá-las **numeradas** (1, 2, 3...) para facilitar a resposta do usuário. Definido em 2026-07-02.

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

**Lição aprendida 2026-07-02 (pull travado por arquivo não rastreado):** se `git pull` abortar com "untracked working tree files would be overwritten by merge", mover o arquivo em questão para fora (`mv arquivo /tmp/`), rodar `git pull origin main --no-rebase --no-edit` e depois `git push origin main`.

**Lição aprendida 2026-07-03 (index.lock travando git):** se o git acusar `Unable to create '.git/index.lock': File exists` (pode sobrar de um processo interrompido), rodar `rm -f .git/index.lock` na raiz do repo e repetir o comando.

**Assets do Canva via GitHub:** o Canva só importa imagem a partir de URL pública. Fluxo usado: gerar o PNG na pasta `assets/`, push pelo terminal, e usar a URL `raw.githubusercontent.com/maioemico/arcavila-teste/main/assets/<arquivo>` no upload do Canva. Assets publicados: `logoarcavila-semfundo.png`, `assets/btn-continue-leitura.png`, `assets/btn-quero-ler.png`, `assets/capa-amor-e-fe.png`, `assets/capa-angulo.png` (descartado), `assets/faixa-cena1.png`, `assets/faixa-cena2.png`, `assets/bg-criativo2.png`, `assets/dark-bg.png`. Limitações do editor do Canva via MCP: só insere imagem/vídeo (não cria texto nem forma nova); elemento inserido sempre vai para o topo (z-order); página responsiva não aceita insert/position. Duplicar design = `copy-design`; redimensionar = `resize-design` (**trial esgotado em 2026-07-03**, 0 usos restantes).

SSH configurado em 2026-06-24: chave `~/.ssh/id_ed25519` cadastrada no GitHub (conta `maioemico`, título "Mac Air Caio"). Repositório local em `~/Claude/Projects/Arcavila` já inicializado com remote `git@github.com:maioemico/arcavila-teste.git`.

**Atenção:** após qualquer push do Cowork via MCP, rodar `git pull origin main --no-rebase` antes do próximo push pelo terminal.

---

## Domínios e Páginas

| URL | Status | Observação |
|-----|--------|-----------|
| arcavila.online | **Redirect 301 ATIVO → arcavila.com.br + Mudança de Endereço no Google** | Migração concluída (2026-07-03). Redirect Rule 301 no Cloudflare (hosts `arcavila.online` e `www.arcavila.online`) → `https://www.arcavila.com.br/*` preservando path e query. Mudança de Endereço registrada no Search Console (aviso "Este site está sendo movido para arcavila.com.br", início 4/07/2026). A página quebrada (base64 no `/Land_Captura-amor-e-fe`) foi resolvida pelo redirect. Manter o zone ativo no Cloudflare até o Google concluir a reindexação; só então aposentar |
| www.arcavila.com.br | **Domínio oficial / no ar** | Verificado no navegador em 2026-07-03: serve o site editorial completo, com tag canonical própria. Propriedade verificada no Google Search Console. CNAME `www → arcavila-captura.pages.dev` |
| arcavila.com.br (raiz) | Concluído | Redirect Rule 301 ativa no Cloudflare: `arcavila.com.br/* → https://www.arcavila.com.br/*` (preserva path e query string) |
| amorefe.arcavila.online | Publicado | Landing de captura Amor e Fé. Cloudflare Pages → projeto `arcavila-amorefe` (root dir: `amorefe/`) |
| amorefe.arcavila.com.br | **Publicado** | Landing de vendas do livro Amor e Fé. No ar, verificado no navegador em 2026-07-02. Título da página padronizado para "Amor e Fé" em 2026-07-02 (arquivo `landing-sprites-ana-pedro.html`). CNAME `amorefe → arcavila-anaepedro.pages.dev` |
| anaepedro.arcavila.online | Publicado | Landing de vendas (URL legada). Continua ativa. Cloudflare Pages → projeto `arcavila-anaepedro` |
| presente.arcavila.online | Publicado | Flipbook Ana e Pedro. Cloudflare Pages → projeto `arcavila-presente` |
| arcavila.com | Registrado | DNS migrado do GoDaddy para Cloudflare |

---

## SEO e Migração de Domínio (arcavila.online → arcavila.com.br)

> Decisão 2026-07-03: **arcavila.com.br passa a ser o único domínio oficial.** O arcavila.online foi aposentado via redirect 301 + Mudança de Endereço no Google (não deletado — o 301 transfere a autoridade de ranking acumulada e conserta a página quebrada para quem chega pelo Google). **Migração técnica concluída em 2026-07-03; aguardando reindexação do Google.**

**Diagnóstico (2026-07-03):**
- O Google rankeava o `arcavila.online` porque é o domínio mais antigo, já rastreado e indexado. O `.com.br` era novo e sem histórico de indexação.
- Os dois domínios servem o mesmo conteúdo (mesmo projeto Cloudflare Pages `arcavila-captura`) e o `index.html` **não tinha tag canonical** — sem sinal de qual é o preferido, o Google escolheu o estabelecido (`.online`). Corrigido no passo 2.
- A "página quebrada" do `.online`: a home redirecionava (301 cacheado no navegador) para `/Land_Captura-amor-e-fe`, que devolve o HTML em base64 cru como texto — bug de deploy do setup legado. Resolvida pelo redirect de domínio.

**Plano de migração:**

| Passo | Status | Observação |
|-------|--------|-----------|
| 1. Redirect 301 `arcavila.online/*` → `https://www.arcavila.com.br/*` | **CONCLUÍDO (2026-07-03)** | Redirect Rule criada e implantada no Cloudflare (zone arcavila.online), filtro `(http.host eq "arcavila.online") or (http.host eq "www.arcavila.online")`, target dinâmico `concat("https://www.arcavila.com.br", http.request.uri.path)`, 301, preserve query string. Verificado no navegador: apex e paths redirecionam limpo. Não afeta subdomínios amorefe./presente./anaepedro |
| 2. Tag canonical `https://www.arcavila.com.br/` no `index.html` | **CONCLUÍDO (2026-07-03)** | `<link rel="canonical" href="https://www.arcavila.com.br/">` inserido no `index.html` (commit `7bac4db`). Deploy do Cloudflare Pages no ar e verificado no navegador: a tag é servida em www.arcavila.com.br |
| 3. Google Search Console — verificar propriedade `arcavila.com.br` | **CONCLUÍDO (2026-07-03)** | Propriedade de domínio adicionada e verificada via TXT no Cloudflare (selo "Propriedade verificada"). Indexação da home https://www.arcavila.com.br/ solicitada via Inspeção de URL ("Indexação solicitada"). Não havia sitemap.xml real no site, envio de sitemap pulado |
| 4. Search Console — "Mudança de Endereço" | **CONCLUÍDO (2026-07-03)** | Também foi preciso criar e verificar a propriedade `arcavila.online` no Search Console (2º TXT no DNS). Ferramenta "Mudança de Endereço" usada em arcavila.online → arcavila.com.br. Google validou automaticamente o 301 e a verificação das duas propriedades. Aviso ativo: "Este site está sendo movido para arcavila.com.br", início 4/07/2026 |
| 5. Aguardar reindexação | **EM ANDAMENTO** | Google leva de dias a algumas semanas para trocar o domínio exibido nos resultados. Só aposentar de fato o arcavila.online (remover DNS/redirect) depois que a busca já mostrar o `.com.br` |

**Registros TXT de verificação no DNS Cloudflare (manter enquanto as propriedades estiverem verificadas):**
- Zone `arcavila.com.br`: TXT `google-site-verification=4ybcJumeYAzGJF5XeYel8sOXQCcV4FZS2pLdVo5w81w`
- Zone `arcavila.online`: TXT `google-site-verification=7a7e-Iw5ijK13shaKT8UECAqezBrARmRqxdqCCYLV6g`

**Pendência opcional de limpeza:** arquivo órfão `/Land_Captura-amor-e-fe` no projeto principal (`arcavila-captura`) serve base64 quebrado. Não atrapalha a migração (a landing de captura real está em `amorefe.arcavila.com.br`), mas pode ser removido do projeto depois.

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
| Landing de vendas — título "Amor e Fé" | **Publicado em 2026-07-02** | Substituídas as 3 ocorrências de "Quando o Amor Precisa de Fé" (title, nav-logo, título da oferta) por "Amor e Fé" em `landing-sprites-ana-pedro.html`. Commit `c793dc7` no ar, verificado no navegador |

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

## Personagens — Referências Visuais

| Personagem | Referência | Uso pretendido | Observação |
|-----------|-----------|----------------|-----------|
| **Ana** (protagonista de Amor e Fé / autora fictícia das cartas do Clube) | Retrato enviado pelo usuário no Cowork em 2026-07-03 (PNG) | Rosto/base visual da personagem Ana em criativos, landing e cartas | Retrato realista, close frontal: mulher morena, cabelos pretos longos e ondulados, expressão séria, fundo neutro acinzentado. **Arquivo-fonte ainda NÃO commitado no repo** — subir para `assets/` via terminal (ex.: `assets/personagem-ana-ref.png`) se virar asset oficial |

---

## Tráfego Pago — Criativos (Amor e Fé)

> Início do tráfego pago no Meta (Facebook e Instagram Ads). Objetivo definido em 2026-07-02: **venda direta**, com clique levando para `amorefe.arcavila.com.br`.

| Item | Status | Observação |
|------|--------|-----------|
| Formato do criativo | Definido em 2026-07-02 | Imagem estática vertical (4:5 feed e 9:16 stories/reels). Vídeo só depois, no ângulo vencedor |
| Objetivo / destino | Definido em 2026-07-02 | Venda direta → `amorefe.arcavila.com.br`. URL confirmada no ar em 2026-07-02. Título da página padronizado para "Amor e Fé" |
| Copies dos ângulos | Concluído em 2026-07-02 | Dilema, prova social, trecho/cena. Headline, texto principal e CTA escritos |
| Criativo 1 (dilema, capa) — 4:5 | **Aprovado** | Design `DAHOSJrDDXQ` (canva.com/d/gPdMc09r6k1JlKl). Fundo dourado escuro. Capa real no mockup, headline "Amor e Fé", subtítulo "Ela amava a Deus. E amava um homem que não podia ter.", botão "Ler agora por R$ 37", logo |
| Criativo 3 (trecho/cena) — 4:5 | **Aprovado** | Design `DAHOSMRVNN4` (canva.com/d/7XM71C765lZ01w8). Três cenas com faixas de leitura + botão "CONTINUE A LEITURA · R$ 37" |
| Criativo 2 (prova social, capa) | **DESCARTADO** | Descartado a pedido do usuário em 2026-07-03. Chegou a ser refeito em vinho (`DAHOWqcqsg8`) mas ficou parecido demais com o 1. Campanha seguirá só com criativos 1 e 3 |
| Versões 9:16 (stories/reels) | **Concluído em 2026-07-03** | Criativo 1 → `DAHOWgHxapI` (resize do Canva, ficou limpo). Criativo 3 → `DAHOWlGbhS8` (resize + fundo escuro `dark-bg.png` cobrindo as faixas brancas = letterbox cinematográfico). Trial de resize esgotado |
| Criativo de marketing "Caminhos de Fé / Editora Arcavila" | **A utilizar (registrado 2026-07-03)** | Peça de divulgação enviada pelo usuário (PNG). Arte estática dourada, fundo escuro: headline "Fortaleça sua Fé", mockup de capa "Caminhos de Fé" sobre mesa de madeira com Bíblia aberta, bullets (mensagens/reflexões/propósito), botão "Comprar agora" e selo Editora Arcavila. **Arquivo-fonte ainda NÃO commitado no repo** — subir para `assets/` via terminal (ex.: `assets/mkt-caminhos-de-fe.png`) se virar asset oficial |
| Exportar PNGs finais | **PENDENTE (usuário)** | Baixar do Canva em PNG 1080×1350 (4:5) e 1080×1920 (9:16), sem compressão, sem fundo transparente |
| Subida da campanha no Meta Ads | **PENDENTE** | Estrutura de teste: criativos 1 e 3, mesma verba, matar o fraco em 3-4 dias, escalar o vencedor. Depois transformar o vencedor em vídeo/reel |

---

## Pipeline Pós-Compra (Hotmart → Make → Mailchimp)

| Item | Status | Observação |
|------|--------|-----------|
| Cenário Make.com | **Concluído** | ID `5549131` · "Arcavila — Hotmart Compra Aprovada" · Ativo. Webhook → HTTP POST Mailchimp API → tag `comprou-amor-e-fe` |
| Webhook Make.com | **Concluído** | ID `2526674` · URL: `https://hook.us2.make.com/f8gnefhcr70exg7mqo3gt1krwbie1l0y` |
| Webhook Hotmart | **Concluído** | Cadastrado em Ferramentas → Webhook. Nome: "Make.com - Compra Aprovada". Produto: Amor e Fé (ID 8026094). Versão 2.0.0. Evento: Compra aprovada. Status: Ativo |
| Exit Condition no Journey | **PENDENTE** | Abrir Journey "Boas-vindas Amor e Fé" no Mailchimp → adicionar saída pela tag `comprou-amor-e-fe` |

---

## Livro 1 (matriz CLOY) — A Mentira que Deus Usou

> Romance cristão original inspirado na arquitetura emocional de "Pousando no Amor" (ver `referencia-pousando-no-amor.md`). Autora: Ana Veras (mesmo selo do Amor e Fé). Título anterior de trabalho: "Onde Florescem as Sempre Vivas", alterado em 2026-07-02.

| Item | Status | Observação |
|------|--------|-----------|
| Pesquisa da história de referência | Concluído | Documento `referencia-pousando-no-amor.md` na raiz do repositório, com grade de tradução e diretrizes de originalidade |
| Definições editoriais aprovadas | Concluído em 2026-07-02 | Barreira: vocação vs. império familiar. Cenário: São Paulo + vila fictícia Pedra do Sino (Serra do Espinhaço, MG). Final: feliz com custo. Casal secundário: renúncia sem morte. Tom: fé vivida. 13 capítulos + epílogo, cliffhanger em cada capítulo |
| Título definitivo | Concluído em 2026-07-02 | "A Mentira que Deus Usou" — escolhido entre 10 opções propostas com foco em curiosidade e tensão fé/mentira |
| Manuscrito completo | Concluído em 2026-07-02 | 13 capítulos + epílogo, cerca de 20,3 mil palavras, cliffhanger no fim de cada capítulo. Protagonistas: Helena Vasconcelos e pastor Rafael Antunes. Arquivos em `a-mentira-que-deus-usou/manuscrito/` (pasta local do projeto) |
| PDF diagramado | Concluído em 2026-07-02 | `Ebook__A_Mentira_que_Deus_Usou.pdf` — 95 páginas, A5, padrão visual do Amor e Fé. Logo da Arcavila sem fundo na capa e no sumário (`logoarcavila-semfundo.png`). Versículo da capa: Cânticos 8:7. Na pasta local do projeto |
| Revisão de leitura pelo usuário | **PENDENTE** | Leitura completa do PDF e ajustes de texto |
| Capa ilustrada | **PENDENTE** | Capa atual é tipográfica com logo; produzir arte de capa |
| Landing / funil do novo livro | **PENDENTE** | Definir estratégia de captura e venda (espelhar funil do Amor e Fé) |

---

## Livro 2 (matriz CLOY) — O Médico das Águas

> Segundo romance cristão original derivado da mesma matriz de "Pousando no Amor" (ver `referencia-pousando-no-amor-livro2.md`), sem repetir nenhuma transposição do Livro 1. Autora: Ana Veras. Título anterior de trabalho: "A Estação das Águas", alterado para "O Médico das Águas" em 2026-07-02.

| Item | Status | Observação |
|------|--------|-----------|
| Documento de referência do Livro 2 | Concluído em 2026-07-02 | `referencia-pousando-no-amor-livro2.md` na raiz do repositório |
| Definições editoriais aprovadas | Concluído em 2026-07-02 | Polos invertidos: ele cai no mundo dela. Cirurgião famoso (Théo Meireles) + professora e parteira pantaneira (Luzia Cáceres). Cenário: Pantanal na cheia, comunidade fictícia Porto do Sossego. Gatilho: pouso forçado de monomotor. Final: agridoce fiel à matriz (amor por estações: ele volta com a cheia todo ano, via serviço de saúde itinerante Expedição Água Nova). Casal secundário: viúvos em segunda chance (Aparício e Benedita). Antagonista: Nelson Bragança, Grupo Excelsior. Símbolos: camalote, caderno de partos, a voz no rádio (destino cruzado). Tom: fé vivida |
| Estrutura de capítulos | Aprovada em 2026-07-02 | 13 capítulos + epílogo, cliffhanger em cada um |
| Manuscrito completo | Concluído em 2026-07-02 | Cerca de 17,3 mil palavras. Arquivos em `o-medico-das-aguas/manuscrito/` (pasta local do projeto) |
| Título definitivo | **Concluído em 2026-07-02** | "O Médico das Águas" — escolhido pelo usuário na rodada de títulos com a palavra "médico" |
| PDF diagramado | **Concluído em 2026-07-02** | `Ebook__O_Medico_das_Aguas.pdf` — 81 páginas, A5, padrão visual do catálogo, logo sem fundo na capa e no sumário. Versículo da capa: Isaías 43:2. Na pasta local do projeto |
| Revisão de leitura pelo usuário | **PENDENTE** | Leitura completa do PDF e ajustes de texto |
| Capa ilustrada | **PENDENTE** | Capa atual é tipográfica com logo |
| Landing / funil | **PENDENTE** | Definir estratégia de captura e venda |

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
| Canva | Trial de resize esgotado (0 usos) | Resize 9:16 já usado nos criativos 1 e 3. Novos resizes exigem upgrade |
| Meta Ads | Por investimento | Em preparação. Criativos 1 e 3 finalizados (4:5 e 9:16) em 2026-07-03 |

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
| Search Console TXT — arcavila.com.br | `google-site-verification=4ybcJumeYAzGJF5XeYel8sOXQCcV4FZS2pLdVo5w81w` |
| Search Console TXT — arcavila.online | `google-site-verification=7a7e-Iw5ijK13shaKT8UECAqezBrARmRqxdqCCYLV6g` |
| Canva — Criativo 1 · 4:5 (dourado) | `DAHOSJrDDXQ` · canva.com/d/gPdMc09r6k1JlKl |
| Canva — Criativo 1 · 9:16 | `DAHOWgHxapI` · canva.com/d/yp85B36hl4OsH6Z |
| Canva — Criativo 3 · 4:5 (cenas) | `DAHOSMRVNN4` · canva.com/d/7XM71C765lZ01w8 |
| Canva — Criativo 3 · 9:16 | `DAHOWlGbhS8` · canva.com/d/BvOk-1JQju4MebA |
| Canva — Criativo 2 (DESCARTADO) | `DAHOWqcqsg8` (vinho) / `DAHOSWCDTOo` (antigo) |
