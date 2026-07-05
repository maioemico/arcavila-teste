# Status do Projeto Arcavila

> Atualizado em: 2026-07-05

---

## Como este documento está organizado (LEIA PRIMEIRO)

Este STATUS.md concentra o estado **vivo** do projeto: o que está no ar, o que está pendente e as decisões em aberto. É a fonte oficial de continuidade e deve ser lido no início de cada conversa.

Em 2026-07-04 fizemos um **split leve**: o conteúdo estável e de consulta pontual saiu daqui e foi para a pasta `referencia/`. Isso mantém o STATUS.md enxuto sem perder nada. Abra o arquivo de referência **apenas quando precisar do detalhe**:

- **`referencia/credenciais-e-ids.md`** — todos os IDs, URLs, tokens, DNS/TXT e IDs do Canva. Abrir quando precisar de um valor específico (Meta Pixel, Hotmart, Mailchimp, webhook Make, verificação DNS, designs do Canva).
- **`referencia/deploy-e-git.md`** — workflow de deploy, SSH e todas as lições aprendidas de git e Canva. Abrir **antes** de fazer push/deploy ou **quando o git der erro** (index.lock, pull travado, push_files vazio).
- **`referencia/decisoes-editoriais.md`** — decisões editoriais fixas (bíblia) dos Livros 1 e 2 e do Clube de Histórias. Abrir ao escrever/editar história, definir capa ou montar funil de um livro.

Regra de manutenção: quando uma credencial, uma lição de deploy ou uma decisão editorial fixa mudar, atualizar o arquivo de referência correspondente. Quando o **estado** de uma entrega ou pendência mudar, atualizar este STATUS.md.

---

## Preferências de Interação

- Quando o Cowork enviar uma mensagem com mais de uma pergunta ou pedido de decisão, apresentá-las **numeradas** (1, 2, 3...) para facilitar a resposta do usuário. Definido em 2026-07-02.

---

## Workflow de Deploy

Resumo: planejamento e edições no Cowork; `index.html` e arquivos grandes vão por `git push` no terminal local (`~/Claude/Projects/Arcavila`); STATUS.md e arquivos pequenos são atualizados pelo GitHub MCP direto. Após qualquer push do Cowork via MCP, rodar `git pull origin main --no-rebase` antes do próximo push pelo terminal.

**Detalhes completos, SSH e lições aprendidas (index.lock, pull travado, push_files vazio, fluxo de assets do Canva): ver `referencia/deploy-e-git.md`.**

---

## Domínios e Páginas

| URL | Status | Observação |
|-----|--------|-----------|
| arcavila.online | **Redirect 301 ATIVO → arcavila.com.br + Mudança de Endereço no Google** | Migração concluída (2026-07-03). Redirect Rule 301 no Cloudflare (hosts `arcavila.online` e `www.arcavila.online`) → `https://www.arcavila.com.br/*` preservando path e query. Mudança de Endereço registrada no Search Console (aviso "Este site está sendo movido para arcavila.com.br", início 4/07/2026). A página quebrada (base64 no `/Land_Captura-amor-e-fe`) foi resolvida pelo redirect. Manter o zone ativo no Cloudflare até o Google concluir a reindexação; só então aposentar |
| www.arcavila.com.br | **Domínio oficial / no ar** | Verificado no navegador em 2026-07-03: serve o site editorial completo, com tag canonical, favicon de arquivo real e logo estruturado (Organization). Propriedade verificada no Google Search Console. CNAME `www → arcavila-captura.pages.dev` |
| arcavila.com.br (raiz) | Concluído | Redirect Rule 301 ativa no Cloudflare: `arcavila.com.br/* → https://www.arcavila.com.br/*` (preserva path e query string) |
| amorefe.arcavila.online | Publicado | Landing de captura Amor e Fé. Cloudflare Pages → projeto `arcavila-amorefe` (root dir: `amorefe/`) |
| amorefe.arcavila.com.br | **Publicado** | Landing de vendas do livro Amor e Fé. No ar, verificado no navegador em 2026-07-02. Título da página padronizado para "Amor e Fé" em 2026-07-02 (arquivo `landing-sprites-ana-pedro.html`). CNAME `amorefe → arcavila-anaepedro.pages.dev` |
| anaepedro.arcavila.online | Publicado | Landing de vendas (URL legada). Continua ativa. Cloudflare Pages → projeto `arcavila-anaepedro` |
| presente.arcavila.online | Publicado | Flipbook Ana e Pedro. Cloudflare Pages → projeto `arcavila-presente` |
| arcavila.com | Registrado | DNS migrado do GoDaddy para Cloudflare |

---

## SEO e Migração de Domínio (arcavila.online → arcavila.com.br)

> Decisão 2026-07-03: **arcavila.com.br passa a ser o único domínio oficial.** O arcavila.online foi aposentado via redirect 301 + Mudança de Endereço no Google (não deletado — o 301 transfere a autoridade de ranking acumulada e conserta a página quebrada para quem chega pelo Google). **Migração técnica concluída em 2026-07-03; aguardando reindexação do Google.** Em 4/07/2026 a busca do Google já passou a exibir `arcavila.com.br`.

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
| 5. Aguardar reindexação | **CONCLUÍDO (4/07/2026)** | A busca do Google já mostra `arcavila.com.br` como resultado principal. Só aposentar de fato o arcavila.online (remover DNS/redirect) mais adiante, quando não houver mais tráfego residual pelo domínio antigo |
| 6. Favicon real + og:image + logo estruturado na busca | **CONCLUÍDO (2026-07-04) — em observação** | O favicon era um data-URI (base64), que o Google ignora → aparecia globo genérico; e a imagem grande da busca puxava a capa do livro. Correção: `favicon.png` de arquivo real (selo Arcavila, 512×512, `/favicon.png`), `apple-touch-icon`, `og:image` e JSON-LD `Organization` com `logo` apontando pro selo. Commit `6084ec4`, deploy verificado no ar (favicon 200 image/png; tags presentes). Google atualiza favicon/imagem na busca em dias a semanas |

> Valores dos registros TXT de verificação e demais DNS: ver `referencia/credenciais-e-ids.md`. Manter enquanto as propriedades estiverem verificadas.

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
| Mailchimp — lista e tag | Configurado | Audience ID e Server em `referencia/credenciais-e-ids.md`. Tags existentes na conta em 2026-07-05: `captura-amor-e-fe` e `Amor e Fé` |
| Customer Journey | Ativo | Disparado pela tag `captura-amor-e-fe` |
| E-mail 0 — Dia 0 — Boas-vindas | Ativo | "O flipbook chegou, e tem algo mais para você" → link `presente.arcavila.online` |
| E-mail 1 — Dia 2 | Ativo | "Ana fez uma coisa que a maioria das mulheres faz e não conta" → link flipbook |
| E-mail 2 — Dia 4 | Ativo | "Por que Pedro não contou" → link Hotmart |
| E-mail 3 — Dia 6 | Ativo | "A ligação que Pedro recebeu no final do Capítulo 2" → link Hotmart |
| E-mail 4 — Dia 9 | Ativo | "Você chegou até aqui por algum motivo" → link Hotmart |
| From address dos e-mails do Journey | Concluído | Remetente atualizado para `suporte@arcavila.online` em todos os 5 e-mails em 2026-07-01 |
| **Exit condition para compradores** | **PENDENTE (destravado após 1ª compra)** | Ver detalhamento em Pipeline Pós-Compra. Descoberto em 2026-07-05 que o Mailchimp desta conta NÃO tem exit criteria nativo; será feito com blocos Se/Senão. Depende da tag `comprou-amor-e-fe` existir, o que só ocorre após a 1ª compra passar pelo cenário |
| **Teste ponta a ponta completo** | **PENDENTE (fazer por último)** | E-mail novo → lead no Mailchimp → receber sequência completa. Combinar com o teste de compra para validar captação e pós-compra de uma vez |

---

## Livro — Amor e Fé

| Item | Status | Observação |
|------|--------|-----------|
| Conta Hotmart | Ativo | Nova conta criada com `suporte@arcavila.online` em 2026-06-28 |
| Produto no Hotmart | Configurado | E-book Amor e Fé criado na nova conta. IDs em `referencia/credenciais-e-ids.md` |
| URL de pagamento | Concluído | Atualizada em todas as páginas. Valor em `referencia/credenciais-e-ids.md` |
| Meta Pixel | Configurado | Eventos: `PageView`, `ViewContent`, `Lead`. ID em `referencia/credenciais-e-ids.md` |

---

## Página de Vendas amorefe.arcavila.com.br — Ajustes (planejado)

> Frente aberta em 2026-07-05 a pedido do usuário. **Prioridade definida: executar ANTES de subir o tráfego pago** — a campanha do Meta leva direto para esta página, então ela precisa estar afiada antes de gastar verba. **Método das imagens: o usuário fornece** as imagens dos personagens; o Cowork aplica e ajusta no landing `landing-sprites-ana-pedro.html`.

| Item | Status | Observação |
|------|--------|-----------|
| Imagens dos personagens (Ana e Pedro) | **PENDENTE** | Usuário fornece as imagens. Aplicar e ajustar Ana e Pedro nas seções do landing `landing-sprites-ana-pedro.html`. Referência visual da Ana já registrada em "Personagens — Referências Visuais" |
| Melhorias de conteúdo | **PENDENTE** | Revisar copy da oferta, sinopse, prova social e clareza do CTA e do preço (R$ 37) |
| Melhorias de UX e experiência | **PENDENTE** | Hierarquia visual, responsividade mobile, velocidade de carregamento e fluidez das seções |

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
| Criativo 1 (dilema, capa) — 4:5 | **Aprovado** | Fundo dourado escuro. Capa real no mockup, headline "Amor e Fé", subtítulo "Ela amava a Deus. E amava um homem que não podia ter.", botão "Ler agora por R$ 37", logo. ID Canva em `referencia/credenciais-e-ids.md` |
| Criativo 3 (trecho/cena) — 4:5 | **Aprovado** | Três cenas com faixas de leitura + botão "CONTINUE A LEITURA · R$ 37". ID Canva em `referencia/credenciais-e-ids.md` |
| Criativo 2 (prova social, capa) | **DESCARTADO** | Descartado a pedido do usuário em 2026-07-03. Chegou a ser refeito em vinho mas ficou parecido demais com o 1. Campanha seguirá só com criativos 1 e 3 |
| Versões 9:16 (stories/reels) | **Concluído em 2026-07-03** | Criativo 1 (resize limpo) e Criativo 3 (resize + fundo escuro `dark-bg.png` cobrindo as faixas brancas = letterbox cinematográfico). IDs Canva em `referencia/credenciais-e-ids.md`. Trial de resize esgotado |
| Criativo de marketing "Caminhos de Fé / Editora Arcavila" | **A utilizar (registrado 2026-07-03)** | Peça de divulgação enviada pelo usuário (PNG). Arte estática dourada, fundo escuro: headline "Fortaleça sua Fé", mockup de capa "Caminhos de Fé" sobre mesa de madeira com Bíblia aberta, bullets, botão "Comprar agora" e selo Editora Arcavila. **Arquivo-fonte ainda NÃO commitado no repo** — subir para `assets/` via terminal (ex.: `assets/mkt-caminhos-de-fe.png`) se virar asset oficial |
| Exportar PNGs finais | **PENDENTE (usuário)** | Baixar do Canva em PNG 1080×1350 (4:5) e 1080×1920 (9:16), sem compressão, sem fundo transparente |
| Subida da campanha no Meta Ads | **PENDENTE (depende das contas Meta)** | Estrutura de teste: criativos 1 e 3, mesma verba, matar o fraco em 3-4 dias, escalar o vencedor. Depois transformar o vencedor em vídeo/reel. Pré-requisito: seção "Redes Sociais — Contas Meta" concluída |

---

## Redes Sociais — Contas Meta (Editora Arcavila)

> Fase iniciada em 2026-07-05: montar a infraestrutura de contas no Meta para rodar Facebook/Instagram Ads dos criativos 1 e 3 (venda direta → `amorefe.arcavila.com.br`). **Decisões travadas em 2026-07-05:** nome de marca **Editora Arcavila**; canais **Instagram + Facebook**; administrador = **perfil pessoal real já existente do usuário** (não criar perfil falso, sob risco de perder todos os ativos). Handle sugerido `@editoraarcavila` (alternativa `@arcavila` se estiver livre).

| Item | Status | Observação |
|------|--------|-----------|
| Meta Business Manager | **PENDENTE** | Criar em business.facebook.com logado no perfil pessoal. Negócio: Editora Arcavila; e-mail de contato: `suporte@arcavila.online` ou `contato@arcavila.online` |
| Verificação do domínio arcavila.com.br no Business | **PENDENTE** | Via TXT no Cloudflare (DNS já sob controle). Necessário para medição de conversões pós-iOS 14 |
| Reivindicar o Meta Pixel no Business | **PENDENTE** | Pixel já configurado (ID em `referencia/credenciais-e-ids.md`); transferir a posse para o negócio |
| Página do Facebook "Editora Arcavila" | **PENDENTE** | Foto: selo Arcavila; capa; bio curta; link `arcavila.com.br` |
| Instagram profissional `@editoraarcavila` | **PENDENTE** | Conectar à Página dentro do Business (alternativa de handle: `@arcavila` se estiver livre) |
| Aquecimento orgânico | **PENDENTE** | 3 a 5 posts por canal antes de anunciar (capas dos livros, um trecho, o selo) para reduzir risco de bloqueio |
| Conta de anúncios + meio de pagamento | **PENDENTE** | Criar no Business e adicionar cartão. Conta nova começa com limite de gasto diário baixo. Só então subir criativos 1 e 3 |
| Política de conteúdo religioso no Meta | **Nota** | Não segmentar por religião (atributo sensível); a copy não pode presumir a fé do leitor de forma pessoal. Segmentar por interesses (livros, fé, romance) e falar da obra |

---

## Pipeline Pós-Compra (Hotmart → Make → Mailchimp)

> **Verificação 2026-07-05 (via conector do Make):** a configuração do cenário está correta — o Make escreve a tag exata `comprou-amor-e-fe` na audiência `9f9b97e70e` (us5), via API de tags do Mailchimp, disparado pelo webhook do Hotmart. O cenário está ativo/rodando (resposta "already running" ao tentar ativar; o campo `isPaused` da API veio inconsistente — conferir o toggle "ON" visualmente no teste final). A tag `comprou-amor-e-fe` ainda NÃO existe no Mailchimp porque nenhuma compra passou pelo cenário; ela nasce na 1ª compra (teste ou real).

| Item | Status | Observação |
|------|--------|-----------|
| Cenário Make.com | **Concluído / config verificada** | "Arcavila — Hotmart Compra Aprovada" (ID 5549131). Config conferida em 2026-07-05: tag `comprou-amor-e-fe` e audiência `9f9b97e70e` corretas. Ativo. IDs em `referencia/credenciais-e-ids.md` |
| Webhook Make.com | **Concluído** | URL e ID em `referencia/credenciais-e-ids.md` |
| Webhook Hotmart | **Concluído** | Cadastrado em Ferramentas → Webhook. Nome: "Make.com - Compra Aprovada". Produto: Amor e Fé. Versão 2.0.0. Evento: Compra aprovada. Status: Ativo |
| Exit Condition no Journey | **PENDENTE (bloqueado até 1ª compra)** | Mailchimp desta conta NÃO tem exit criteria nativo. Plano aprovado (2026-07-05): inserir bloco Se/Senão antes de cada e-mail restante (E-mails 1 a 4), checando a tag `comprou-amor-e-fe`; ramo "tem a tag" fica sem etapas (contato sai). Só é possível montar depois que a tag existir (1ª compra a cria). Prompt do Browser Chat já preparado |

---

## Livro 1 (matriz CLOY) — A Mentira que Deus Usou

> Romance cristão original. Autora: Ana Veras. **Bíblia editorial completa (barreira, cenário, final, personagens, tom, estrutura) em `referencia/decisoes-editoriais.md`.** Referência de origem: `referencia-pousando-no-amor.md` na raiz.

| Item | Status | Observação |
|------|--------|-----------|
| Pesquisa da história de referência | Concluído | Documento `referencia-pousando-no-amor.md` na raiz, com grade de tradução e diretrizes de originalidade |
| Definições editoriais aprovadas | Concluído em 2026-07-02 | Bíblia completa em `referencia/decisoes-editoriais.md` |
| Título definitivo | Concluído em 2026-07-02 | "A Mentira que Deus Usou" — escolhido entre 10 opções com foco em curiosidade e tensão fé/mentira |
| Manuscrito completo | Concluído em 2026-07-02 | 13 capítulos + epílogo, ~20,3 mil palavras, cliffhanger no fim de cada capítulo. Protagonistas: Helena Vasconcelos e pastor Rafael Antunes. Arquivos em `a-mentira-que-deus-usou/manuscrito/` (pasta local do projeto) |
| PDF diagramado | Concluído em 2026-07-02 | `Ebook__A_Mentira_que_Deus_Usou.pdf` — 95 páginas, A5, padrão visual do Amor e Fé. Logo sem fundo na capa e no sumário. Versículo da capa: Cânticos 8:7. Na pasta local do projeto |
| Revisão de leitura pelo usuário | **PENDENTE** | Leitura completa do PDF e ajustes de texto |
| Capa ilustrada | **PENDENTE** | Capa atual é tipográfica com logo; produzir arte de capa |
| Landing / funil do novo livro | **PENDENTE** | Definir estratégia de captura e venda (espelhar funil do Amor e Fé) |

---

## Livro 2 (matriz CLOY) — O Médico das Águas

> Segundo romance cristão original, sem repetir transposições do Livro 1. Autora: Ana Veras. **Bíblia editorial completa em `referencia/decisoes-editoriais.md`.** Referência de origem: `referencia-pousando-no-amor-livro2.md` na raiz.

| Item | Status | Observação |
|------|--------|-----------|
| Documento de referência do Livro 2 | Concluído em 2026-07-02 | `referencia-pousando-no-amor-livro2.md` na raiz |
| Definições editoriais aprovadas | Concluído em 2026-07-02 | Bíblia completa em `referencia/decisoes-editoriais.md` |
| Estrutura de capítulos | Aprovada em 2026-07-02 | 13 capítulos + epílogo, cliffhanger em cada um |
| Manuscrito completo | Concluído em 2026-07-02 | ~17,3 mil palavras. Arquivos em `o-medico-das-aguas/manuscrito/` (pasta local do projeto) |
| Título definitivo | **Concluído em 2026-07-02** | "O Médico das Águas" — escolhido pelo usuário na rodada de títulos com a palavra "médico" |
| PDF diagramado | **Concluído em 2026-07-02** | `Ebook__O_Medico_das_Aguas.pdf` — 81 páginas, A5, padrão visual do catálogo, logo sem fundo na capa e no sumário. Versículo da capa: Isaías 43:2. Na pasta local do projeto |
| Revisão de leitura pelo usuário | **PENDENTE** | Leitura completa do PDF e ajustes de texto |
| Capa ilustrada | **PENDENTE** | Capa atual é tipográfica com logo |
| Landing / funil | **PENDENTE** | Definir estratégia de captura e venda |

---

## Clube de Histórias

> **Decisões editoriais fixas (nome da unidade, formato, cadência, assunto, preheader, conversão, métrica alvo) em `referencia/decisoes-editoriais.md`.**

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
| DNS arcavila.com.br — MX / SPF / DKIM | Concluído | Valores em `referencia/credenciais-e-ids.md`. DKIM verificado no Zoho em 2026-07-01 |
| Autenticação arcavila.online no Mailchimp | Concluído | CNAMEs k2/k3 já estavam no Cloudflare. Verificado em 2026-07-01 |
| Autenticação arcavila.com.br no Mailchimp | **PAUSADO** | Não necessário enquanto remetente for `suporte@arcavila.online` |

---

## Make.com

| Item | Status | Observação |
|------|--------|-----------|
| Cenário Drive → GitHub → Netlify | **Desativado** | Desativado em 2026-07-01 para liberar vaga de cenário ativo no plano Free. Workflow atual usa terminal local para pushes. ID em `referencia/credenciais-e-ids.md` |
| Cenário Arcavila — Hotmart Compra Aprovada | **Ativo (verificado 2026-07-05)** | Webhook recebe Hotmart → HTTP POST Mailchimp API adiciona tag `comprou-amor-e-fe`. Config e estado conferidos via conector. ID em `referencia/credenciais-e-ids.md` |

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
| Meta Ads | Por investimento | Em preparação. Criativos 1 e 3 finalizados (4:5 e 9:16) em 2026-07-03. Contas Meta (Business, Página, Instagram) pendentes — ver seção "Redes Sociais — Contas Meta" |

---

## Referências (pasta `referencia/`)

- `referencia/credenciais-e-ids.md` — IDs, URLs, tokens, DNS/TXT, designs do Canva.
- `referencia/deploy-e-git.md` — workflow de deploy, SSH, lições aprendidas de git e Canva.
- `referencia/decisoes-editoriais.md` — bíblia editorial dos Livros 1 e 2 e decisões fixas do Clube.
