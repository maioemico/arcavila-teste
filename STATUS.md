# Status do Projeto Arcavila

> Atualizado em: 2026-07-11

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

## Método de Criação de Livros (DNA da Coleção)

> Frente aberta em 2026-07-06. A Arcavila passa a ter um **método fixo** para criar cada novo livro, para padronizar a produção da coleção. Fluxo de 7 fases: DNA, público, bíblia do livro, escrita, sistema visual, revisão, produção. Regra de bastidor: o **texto-fonte é sempre separado do layout**, para gerar saídas diferentes do mesmo miolo (hoje só PDF de página fixa; impresso e Kindle seriam produtos de saída futuros).

**GATILHO: sempre que o usuário iniciar a criação de um novo livro Arcavila, apresentar/lembrar primeiro o formulário `ficha-dna-arcavila.html` (raiz da pasta do projeto).** É um HTML autônomo com o DNA da coleção como referência e campos preenchíveis do DNA do livro (premissa, pergunta dramática, tema espiritual, casal e feridas, conflito, cliffhangers, cenário na vila, conexões, tom), com exportar em Markdown e salvar rascunho. Uma ficha por livro.

**DNA fixo da coleção** (filtro de todo livro, decidido em 2026-07-06):

| Dimensão | Decisão |
|----------|---------|
| Fonte | Releitura cristã **livre** de doramas coreanos (esqueleto emocional; nomes e desfecho reinventados) |
| Mundo | Vila fictícia de **Arcavila**, universo compartilhado; personagens se cruzam entre livros |
| Casal | Opostos na fé: ela crente, ele distante, transformado pelo amor e pela graça |
| Arco espiritual | Ferida, encontro com a graça, entrega e transformação; virada no fundo do poço (2º→3º ato) |
| Papel de Deus | Providência sutil, mostrada nos encontros e escolhas, não pregada |
| Termômetro moral | Romance casto, sem intimidade descrita, linguagem limpa |
| Tom | Melodrama com catarse, humor leve, momento de lágrima garantido; final sempre de esperança |
| Estrutura | Cliffhangers fortes, 20 a 24 capítulos curtos, slow burn no romance com enredo acelerado |
| Voz e época | Primeira pessoa feminina, prosa enxuta; contemporâneo, cidade pequena de interior |
| Estilo de marca | Sem emoji, sem hífen no meio da frase |
| Entrega | PDF de página fixa e bem diagramado |

| Item | Status | Observação |
|------|--------|-----------|
| Método de 7 fases | Definido em 2026-07-06 | Estrutura de fluxo para todos os livros futuros |
| DNA fixo da coleção | Definido em 2026-07-06 | Tabela acima; filtro de toda história |
| Formulário `ficha-dna-arcavila.html` | **Concluído em 2026-07-06** | HTML autônomo na raiz do projeto; ficha reutilizável de DNA por livro. Apresentar ao iniciar cada novo livro |
| Formalizar DNA em `decisoes-editoriais.md` | **PENDENTE (opcional)** | Mover o DNA fixo da coleção para a bíblia editorial oficial quando quiser |
| Sistema Visual (capa + layout de miolo) | **PENDENTE** | Ativo fixo da marca a definir uma vez para toda a coleção |

---

## Workflow de Deploy

Resumo: planejamento e edições no Cowork; `index.html` e arquivos grandes vão por `git push` no terminal local (`~/Claude/Projects/Arcavila`); STATUS.md e arquivos pequenos são atualizados pelo GitHub MCP direto. Após qualquer push do Cowork via MCP, rodar `git pull origin main --no-rebase` antes do próximo push pelo terminal.

**Detalhes completos, SSH e lições aprendidas (index.lock, pull travado, push_files vazio, fluxo de assets do Canva): ver `referencia/deploy-e-git.md`.**

---

## Modal de Captura de E-mail (Newsletter)

**DESATIVADO em 2026-07-07** — o modal "Histórias que chegam até você" (popup de captura de nome/e-mail injetado pelo `functions/_middleware.js`) foi ocultado em todo o site. Motivo: foco atual é venda direta, não captação de newsletter. Implementação: flag `MODAL_ENABLED = false` no topo do arquivo `functions/_middleware.js` (raiz do repo) — o HTML/CSS/JS do modal continuam no arquivo intactos, só não são injetados nas páginas. Para reativar no futuro, bastar voltar a flag para `true`. Publicado via GitHub MCP (commit `fb2dda6`).

---

## Domínios e Páginas

| URL | Status | Observação |
|-----|--------|-----------|
| arcavila.online | **Redirect 301 ATIVO → arcavila.com.br + Mudança de Endereço no Google** | Migração concluída (2026-07-03). Redirect Rule 301 no Cloudflare (hosts `arcavila.online` e `www.arcavila.online`) → `https://www.arcavila.com.br/*` preservando path e query. Mudança de Endereço registrada no Search Console (aviso "Este site está sendo movido para arcavila.com.br", início 4/07/2026). A página quebrada (base64 no `/Land_Captura-amor-e-fe`) foi resolvida pelo redirect. Manter o zone ativo no Cloudflare até o Google concluir a reindexação; só então aposentar |
| www.arcavila.com.br | **Domínio oficial / no ar** | Verificado no navegador em 2026-07-03: serve o site editorial completo, com tag canonical, favicon de arquivo real e logo estruturado (Organization). Propriedade verificada no Google Search Console. CNAME `www → arcavila-captura.pages.dev` |
| arcavila.com.br (raiz) | Concluído | Redirect Rule 301 ativa no Cloudflare: `arcavila.com.br/* → https://www.arcavila.com.br/*` (preserva path e query string) |
| amorefe.arcavila.online | Publicado | Landing de captura Amor e Fé. Cloudflare Pages → projeto `arcavila-amorefe` (root dir: `amorefe/`) |
| amorefe.arcavila.com.br | **NO AR — várias mudanças editadas localmente aguardando push pelo terminal (ver "Atualizações de Layout")** | Site imersivo do livro Amor e Fé no estilo da referência abigail-two.vercel.app: preloader de vela, hero pinado, revelações por linha, trilho horizontal de cenas, derramamento de luz até o CTA em creme, canvas em 3 camadas e cursor de luz. Substituiu a landing de vendas anterior (recuperável no git). Commit `11b6077` via GitHub MCP, verificado no navegador. Fonte: `landing-sprites-ana-pedro.html` (build do Cloudflare copia para `anaepedro/index.html`). Fotos de Ana e Pedro embutidas em base64 (commit `c41dd2b`), confirmadas ao vivo em 2026-07-07 via fetch com anticache. Seção final "fim" removida (commit `a205572`) — a página termina no slide "derramamento" (CTA "Ler agora por R$ 37"). Textos de Ana e Pedro reescritos (commit `ba808ea`), com Laís (filha do casal) em destaque. CNAME `amorefe → arcavila-anaepedro.pages.dev` |
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
| Catálogo — botão "Ver mais" mobile no card Amor e Fé | Concluído (11/07/2026) | Pill dourada no canto superior direito do card, só em `max-width:600px` (`.book-more`, z-index 2 acima do overlay Hotmart), leva a `amorefe.arcavila.com.br`. Commit local `aba57b7`; push feito pelo Chiba via terminal |
| Catálogo `arcavila.online` — fundo de estante de madeira | Concluído | `estande.jpeg` como background do `.shelf`; grid CSS alinha livros nas prateleiras |
| Catálogo `arcavila.online` — efeitos Three.js | Concluído | Partículas âmbar flutuantes, spotlight com cursor, tilt 3D no hover dos livros |
| Catálogo `arcavila.online` — botão "Ler a sinopse" | Concluído | Styled como botão real (background dark, padding, sem borda amarela) |
| Catálogo `arcavila.online` — preço R$ 37,00 desktop | Concluído | Sem box, negrito, font-size 1.2rem, margin-left:auto |
| Seção Círculo Arcavila (`#circulo`) | **OCULTO** | `display:none` via CSS. HTML preservado intacto para reativar quando o produto estiver pronto. Reativar: mudar `#circulo{display:none}` para `#circulo{background:var(--noite)}` |
| Catálogo `arcavila.online` — mobile revisado | Concluído | `.book-desc` oculto, botão sinopse oculto, card Amor e Fé clicável, capa maior, preço 1.2rem negrito sem borda |
| Landing de vendas — título "Amor e Fé" | **Publicado em 2026-07-02** | Substituídas as 3 ocorrências de "Quando o Amor Precisa de Fé" (title, nav-logo, título da oferta) por "Amor e Fé" em `landing-sprites-ana-pedro.html`. Commit `c793dc7` no ar, verificado no navegador |
| Catálogo `arcavila.com.br` — 2º e 3º livros da estante | **Publicado em 2026-07-06** | Os dois cards seguintes ao Amor e Fé passaram a exibir "A Mentira que Deus Usou" (por Ana Veras) e "O Médico das Águas" (**por Rodrigo Alva**). Em ambos: ícone da capa trocado por "?", sinopse (`book-desc`) removida e status/link para **Em breve**. Capa do Amor e Fé na estante trocada pela **capa real do e-book** (extraída do PDF, embutida como JPEG base64). Links do rodapé atualizados para os novos títulos. Commit `cbbe685` (merge `e1a17b4`), no ar via Cloudflare Pages |
| Catálogo `arcavila.com.br` — capa da estante atualizada (nova capa pôr do sol) | **Publicado em 2026-07-06** | O `<img alt="Capa de Amor e Fé">` no `index.html` teve o JPEG base64 substituído pela **nova capa** (`capa-de-livro/capa_amor_e_fe_v2.png`, casal ao pôr do sol), redimensionada para 560×900 JPEG (~41 KB). Alinha a estante com a capa nova já usada no PDF do e-book. Commit `a09a886`, push via terminal local, deploy automático Cloudflare Pages |
| Catálogo `arcavila.com.br` — entrada cinematográfica da estande | **Publicado em 2026-07-10 (commit `c5c047b`)** | Animação de apresentação do catálogo com GSAP (ScrollTrigger + SplitText + técnica Flip) e Lenis via CDN, JS vanilla: título "Nossas histórias" letra a letra, estante abrindo em cortina (clip path), varredura de luz dourada, capas voando empilhadas do centro até as prateleiras com pouso em back.out e textos acompanhando. No celular, versão simplificada (stagger vertical). Reveal antigo preservado como fallback (sem GSAP ou com prefers-reduced-motion). Transforms limpos ao final para não quebrar o hover/tilt do Three.js |
| Nova página do livro `amorefe.arcavila.com.br` | **PUBLICADA em 2026-07-07 (commit `11b6077`)** | Refeita no estilo da referência abigail-two.vercel.app a pedido do usuário: hero pinado com scrub, títulos revelados linha a linha com máscara, trilho horizontal pinado com as 4 cenas, seção "derramamento" (frase dourada, cortina de luz com clip path ondulado, painel creme com CTA magnético), fim com "Amor não é o que a gente sente. É o que a gente carrega." e João 15:13. GSAP 3.13 + Lenis via CDN, canvas em 3 camadas (fagulhas, brasas e cursor, grão), prefers-reduced-motion respeitado. Pixel: PageView, ViewContent, InitiateCheckout. Verificada no navegador no desktop (preloader, pin, trilho, wipe, CTA ok) |
| Modal de captura removido da página `amorefe.arcavila.com.br` | **Concluído em 2026-07-07 — superado pela desativação global em 2026-07-07** | O `MODAL_DISABLED_HOSTS` continua no `_middleware.js`, mas desde a desativação global (flag `MODAL_ENABLED = false`) o modal já não aparece em nenhum domínio, tornando essa exceção por hostname redundante por ora. Ver seção "Modal de Captura de E-mail (Newsletter)" |
| Hero `amorefe.arcavila.com.br` — fonte da frase menor no mobile | **Concluído em 2026-07-07 — validado pelo usuário no celular** | A frase "Tem casamento que não acaba em briga. Acaba em silêncio." quebrava em muitas linhas (e até no meio de palavra) no celular, porque o piso do `clamp()` (2.5rem) era grande demais para telas estreitas. Adicionado `@media (max-width:600px){ .hero-frase{font-size:clamp(1.7rem,7.8vw,2.3rem)} }` em `landing-sprites-ana-pedro.html`, reduzindo a fonte só no mobile para caber em 3 linhas. Commit `5cf33da` via GitHub MCP |
| Hero `amorefe.arcavila.com.br` — distância de scroll do pin (slide 1 → 2) reduzida | **Concluído em 2026-07-07** | O pin do `#hero` (GSAP ScrollTrigger) exigia rolar `+=120%` da altura da tela antes de liberar a transição para a seção "história" (slide 2), pedindo várias voltas de scroll. Reduzido pela metade, para `+=60%`, em `landing-sprites-ana-pedro.html`. Commit `8eafd58` via GitHub MCP |
| Retratos reais de Ana e Pedro (`anaepedro/ana.jpg`, `anaepedro/pedro.jpg`) | **Concluído e confirmado ao vivo (2026-07-07)** | Os arquivos `anaepedro/ana.jpg` e `anaepedro/pedro.jpg` publicados no GitHub (commit `638e994`) não apareciam na página ao vivo — o build do Cloudflare Pages desse projeto aparentemente apaga a pasta `anaepedro/` ao gerar o `index.html` a partir de `landing-sprites-ana-pedro.html`, levando as imagens junto. Sem acesso ao painel do Cloudflare para corrigir o build. **Solução:** fotos embutidas como base64 direto no `<img src="data:image/jpeg;base64,...">` dentro de `landing-sprites-ana-pedro.html`, mesmo padrão já usado na capa do catálogo — imune ao build. Commit `c41dd2b` publicado via terminal, confirmado ao vivo com fetch anticache. Detalhe registrado em `referencia/deploy-e-git.md` |
| Última seção ("fim") removida de `amorefe.arcavila.com.br` | **Concluído (2026-07-07, commit `a205572`)** | A pedido do usuário, removida a seção `#fim` (frase "Amor não é o que a gente sente. É o que a gente carrega." + versículo João 15:13 + créditos "Ana Veras · Arcavila Editora"), incluindo o bloco CSS correspondente. A página agora termina no slide "derramamento" (cortina de luz + CTA "Ler agora por R$ 37" em painel creme). Editado e publicado em `landing-sprites-ana-pedro.html` |
| Textos de Ana e Pedro encurtados, Laís (filha) em destaque | **Concluído (2026-07-07, commit `ba808ea`)** | Os dois parágrafos descritivos (`.historia-texto.split-linhas`) sob os títulos de Ana e Pedro foram reescritos: máx. 2 linhas, frases mais impactantes, mantendo o texto de fonte maior (`.historia-titulo`) inalterado. Primeira versão usava "bilhete" e "diesel" — rejeitada pelo usuário, que pediu para destacar a filha **Laís**. Versão final: Ana — "Igreja aos domingos, café pronto, uma vida perfeita ao lado de *Laís*. Até que tudo mudou."; Pedro — "Some de madrugada e volta exausto. Guarda um segredo sobre *Laís* que jurou nunca contar." Validado por preview visual antes de aplicar |
| Texto da seção "a mesma casa" reescrito como cliffhanger (Ana, Pedro e Laís) | **Pronta localmente — AGUARDANDO PUSH (terminal)** | Título e texto do terceiro bloco da seção "história" (`#historia`, olho "a mesma casa") foram reescritos a pedido do usuário para criar um cliffhanger envolvendo os três personagens, no lugar da frase genérica "Dois caminhos, uma só fé." Versão final, com vínculo familiar explícito: título "A filha sabe o que *o pai escondeu da mãe*."; texto "Pedro escondeu a verdade de Ana. Laís descobriu primeiro, e agora carrega o peso sozinha." Validado por preview visual e aprovado. Editado em `landing-sprites-ana-pedro.html` |
| Catálogo `arcavila.com.br` — card do livro Amor e Fé leva para o Hotmart | **Publicado em 2026-07-10 (commit `c5c047b`)** | A área inteira do card (capa, título, sinopse) agora abre direto o checkout do Hotmart (`https://pay.hotmart.com/S106531572M`) via `.book-card-link`, em vez de `amorefe.arcavila.com.br`. O botão "Ler a sinopse" foi mantido apontando para `amorefe.arcavila.com.br` — CSS ajustado (`.book-link` com z-index acima do overlay do card) para o botão continuar clicável por cima da área geral, também no desktop (antes o overlay de card só existia no mobile) |
| Catálogo `arcavila.com.br` — estande full-bleed no mobile | **Publicado em 2026-07-10 (commit `c5c047b`)** | No mobile (≤600px) a `.shelf-wrapper` encosta nas duas bordas da tela: override adicionado APÓS a regra base da linha ~311 (que vencia a cascata) com `width:auto`, `max-width:none` e margens negativas `calc(-1*clamp(1.2rem,4vw,2rem))` cancelando o padding do `.wrap`; `#shelf-canvas` sem border-radius. Tablet/desktop inalterados (760px centralizado). Lições: (1) regra posterior no CSS anulava o media query; (2) `width:100%` impedia a margem negativa direita — precisa `width:auto`. Push do index.html (440KB, base64 embutido) via script curl no terminal (`push_index_estande.sh`), Caminho B da skill arca-upload. Preview de validação: `preview-mobile-estande.html` |
| `amorefe.arcavila.com.br` — pin mobile do slide "derramamento": colapso de altura corrigido | **Corrigido localmente — AGUARDANDO PUSH (terminal)** | O crossfade absoluto entre `.creme-texto` e `.oferta-card` fazia `.creme-conteudo` (pai) colapsar para altura 0, espremendo texto/oferta numa caixa de 0px — causa real do corte de texto no mobile reportado pelo usuário. Corrigido com `gsap.set(".creme-conteudo", {height: painelAltura, ...})` |
| `amorefe.arcavila.com.br` — texto/citação oculto no slide final, mobile só com a caixa de oferta | **Editado localmente — AGUARDANDO PUSH (terminal)** | A pedido do usuário, o bloco `.creme-texto` ("Toda família guarda um segredo. Esse é o deles.") passou a ficar **oculto no mobile** (`@media max-width:820px{.creme-texto{display:none}}`), sobrando só a caixa de oferta. JS mobile simplificado: sem crossfade texto/oferta, `.oferta-card` só recebe fade-in direto após a cortina de luz cobrir a tela (progresso ~0.72). Pin mobile reduzido de `+=400%` para `+=220%`, já que não há mais fase de texto para dar espaço. Substitui a solução anterior (slide vazio + crossfade), que ficou obsoleta. Desktop inalterado. JS validado (`node --check`) |
| `amorefe.arcavila.com.br` — cabeçalho mobile com fundo em degradê (evita sobrepor texto ao rolar) | **Editado localmente — AGUARDANDO PUSH (terminal)** | No mobile, `.topo` usava `mix-blend-mode:difference` (sem fundo próprio), o que deixava "Editora Arcavila" e "Ler o livro" ilegíveis ao rolar sobre fotos/textos claros. Adicionado `@media max-width:820px` com `mix-blend-mode:normal` e fundo em degradê no tom vinho da marca (`rgba(58,18,27,...)`, mesmo tom do `--vinho-fosco` do `index.html`), suavizando para transparente. Validado com preview (`preview-cabecalho-mobile.html`) |
| `amorefe.arcavila.com.br` — botão CTA "Ler agora por R$ 37" em verde menta | **Editado localmente — AGUARDANDO PUSH (terminal)** | A pedido do usuário, para dar mais destaque à venda: `#ctaBtn` trocou o fundo escuro/dourado por um gradiente verde menta (`#A7E3A0` → `#7FCB84`), texto escuro (`#173318`) para contraste, borda e sombra em tom verde. Validado com preview (`preview-botao-verde.html`, 3 opções testadas; escolhida a opção 2) |
| `arcavila.com.br` — item "Círculo" removido do menu | **Editado localmente — AGUARDANDO PUSH (terminal)** | A pedido do usuário ("não temos esse programa por enquanto"), removido o link `<a href="#circulo">Círculo</a>` do `.nav-links` no `index.html`. A seção `#circulo` continua oculta no site (`display:none`, ver linha acima), só o item do menu some |
| `arcavila.com.br` — menu mobile fecha ao rolar a página | **Editado localmente — AGUARDANDO PUSH (terminal)** | Bug reportado: com o menu mobile aberto, ao rolar a página os links continuavam visíveis mas com fundo transparente, "flutuando" sobre o conteúdo. Corrigido com um listener de `scroll` que remove a classe `.open` de `#navLinks` assim que o usuário rola, fechando o menu automaticamente |
| `arcavila.com.br` — mobile: ícone "?" trocado por texto "Em breve" nas capas placeholder | **Editado localmente — AGUARDANDO PUSH (terminal)** | Nas capas dos livros "em breve" (A Mentira que Deus Usou, O Médico das Águas), o glifo "?" central foi escondido só no mobile (`≤600px`, classe `.ph-q{display:none}`) e o texto "Em breve" (já existente como `.book-status.soon`, antes com `display:none` global) passou a aparecer centralizado, sem borda. Desktop/tablet inalterados. Validado com preview (`preview-em-breve-mobile.html`) |
| `arcavila.com.br` — texto de destaque "Amor e Fé" reescrito com suspense (Ana, Pedro e Laís) | **Editado localmente — AGUARDANDO PUSH (terminal)** | O parágrafo da seção "Em destaque" (antes "Treze capítulos sobre um casamento à beira do abismo...") foi substituído por "Entre a dúvida de Ana e o segredo de Pedro, resta uma pergunta: o amor deles resiste à verdade que Laís guarda?", a pedido do usuário, para criar suspense entre os três personagens. Não está em media query — vale para mobile, tablet e desktop |

---

## Funil de Captura

| Item | Status | Observação |
|------|--------|-----------|
| Formulário `amorefe.arcavila.online` | Ativo | POST para `/subscribe` via Cloudflare Pages Function |
| Endpoint `/subscribe` | Ativo | `amorefe/functions/subscribe.js` — adiciona lead no Mailchimp com tag `captura-amor-e-fe` |
| Modal de captura `arcavila.online` | **DESATIVADO em 2026-07-07** | `functions/_middleware.js` injetava modal + patch do `leadForm` (após 8s ou 40% de scroll). Desativado globalmente via flag `MODAL_ENABLED = false` — foco atual é venda direta, não newsletter. Código preservado para reativar depois (ver seção "Modal de Captura de E-mail (Newsletter)") |
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
| PDF do e-book | **Capa atualizada e publicada (2026-07-07)** | `Ebook__Amor_e_Fe.pdf` na raiz da pasta do projeto. 50 páginas, A5. Só a **capa** (pág. 1) foi trocada pela nova foto (casal ao pôr do sol), miolo inalterado. Imagem-fonte da capa em `capa-de-livro/capa_amor_e_fe_v2.png` (1632x2624). A troca de capa (feita em 2026-07-06) tinha ficado só editada localmente sem commit; publicada via terminal em 2026-07-07 junto com os retratos (commit `638e994`). Versão anterior recuperável pelo git |

---

## Página de Vendas amorefe.arcavila.com.br — Ajustes (planejado)

> Frente aberta em 2026-07-05. **Superada em 2026-07-06:** a landing antiga foi substituída por uma página nova imersiva criada do zero (ver "Atualizações de Layout"). As pendências abaixo foram absorvidas ou reformuladas.

| Item | Status | Observação |
|------|--------|-----------|
| Imagens dos personagens (Ana e Pedro) | **Concluído e confirmado ao vivo (2026-07-07)** | A tentativa via Canva foi abandonada (link expirado, arquivos corrompidos). Usuário enviou os retratos reais diretamente no Cowork. Embutidos como base64 no HTML (commit `c41dd2b`) — ver linha em "Atualizações de Layout" |
| Melhorias de conteúdo | **Concluído em 2026-07-06** | Copy nova baseada no livro real: apresentação de Ana e Pedro, 4 cenas com gancho, CTA claro "Ler agora por R$ 37" |
| Melhorias de UX e experiência | **Concluído em 2026-07-06** | Página nova responsiva, com prefers-reduced-motion, fontes via Google Fonts e libs via CDN (GSAP 3.13, Lenis) |
| Teste da página nova no ar | **Desktop e mobile OK (2026-07-07)** | Desktop e celular verificados: preloader, hero pinado, revelações, trilho horizontal, wipe de luz e CTA funcionando; fonte do hero corrigida no mobile. Falta validar o pixel no Events Manager antes do tráfego pago |
| Retratos ana.jpg e pedro.jpg no ar | **Concluído (2026-07-07)** | Base64 embutido no HTML, publicado e confirmado ao vivo |
| Última seção ("fim") removida | **Concluído (2026-07-07)** | Página passa a terminar no slide "derramamento" |
| Textos de Ana e Pedro encurtados, Laís em destaque | **Concluído (2026-07-07)** | Parágrafos descritivos reescritos, máx. 2 linhas, Laís (filha) em destaque |
| Texto "a mesma casa" reescrito como cliffhanger | **AGUARDANDO PUSH (terminal) — ver "Atualizações de Layout"** | Título e texto reescritos, vínculo familiar explícito (pai/mãe/filha) |
| Modal de captura sobre a página nova | **Superado em 2026-07-07** | A exceção por hostname (`MODAL_DISABLED_HOSTS`) ficou redundante após a desativação global do modal (flag `MODAL_ENABLED = false`, ver "Modal de Captura de E-mail (Newsletter)") |
| Seção "Quatro momentos que mudam tudo" (`#cenas`) removida da página | **PRONTA LOCALMENTE — AGUARDANDO PUSH (terminal)** | Depois de testar reescrita de texto, ícones SVG e ajustes de fonte (histórico nos commits anteriores), o usuário decidiu remover a seção inteira. Removido de `landing-sprites-ana-pedro.html`: HTML (`#cenas`, cabeçalho e os 4 `.cena-carta`), CSS (`.cenas-pin`, `.cenas-cabecalho`, `.cenas-trilho`, `.cena-carta` e regras filhas) e o bloco JS do trilho horizontal pinado (GSAP ScrollTrigger `#trilho`). Link "cenas" removido do menu do topo. A página passa a ir direto de "história" (Ana/Pedro/Laís) para "derramamento" (CTA "Ler agora por R$ 37"). HTML e JS validados (parser + `node --check`). Arquivo `preview-quatro-momentos.html` (usado para revisar a versão anterior) ficou obsoleto e pode ser apagado depois |
| Transição hero → "história": frase de impacto descendo em fade (3ª versão) | **PRONTA LOCALMENTE — AGUARDANDO PUSH (terminal)** | Histórico: banda fina sem pin → cortina dourada em tela cheia (réplica do derramamento) → **ambas rejeitadas pelo usuário ("ficou ruim")**. Removida a seção `#transicao` inteira (HTML, CSS `.wipe-palco2/.wipe-luz2/.wipe-creme2`, JS). Decisão final: sem elemento novo — a própria frase do hero ("Tem casamento que não acaba em briga. Acaba em silêncio.") vira o efeito de transição. Ajustado o bloco "Hero pinado" já existente em `landing-sprites-ana-pedro.html`: `.hero-conteudo` agora desce (`yPercent: 45`, antes subia `-14`) enquanto some em fade (`opacity: 0`), scrub ligado ao scroll, pin estendido de `+=60%` para `+=90%` para o movimento ficar mais gradual. Sem cortina, sem painel extra — mais simples e mais leve. HTML e JS validados (parser + `node --check`). `preview-onda-hero-historia.html` reescrito para essa versão |
| Pin mobile do slide "derramamento" — colapso de altura corrigido; texto oculto no mobile; cabeçalho em degradê vinho; CTA verde | **PRONTA LOCALMENTE — AGUARDANDO PUSH (terminal) — ver "Atualizações de Layout"** | Ver linhas detalhadas acima. Resumo: bug do corte de texto corrigido; texto/citação do slide final agora oculto no mobile (só a caixa de oferta aparece); cabeçalho ganhou fundo em degradê vinho para não sobrepor conteúdo ao rolar; botão de compra em verde menta para mais destaque |

---

## Personagens — Referências Visuais

| Personagem | Referência | Uso pretendido | Observação |
|-----------|-----------|----------------|-----------|
| **Ana** (protagonista de Amor e Fé / autora fictícia das cartas do Clube) | Retrato real enviado pelo usuário no Cowork em 2026-07-07 (PNG, convertido para JPEG, embutido em base64 no HTML) | Foto da personagem na página `amorefe.arcavila.com.br` (seção "história") | Retrato realista, close frontal: mulher morena, cabelos pretos longos e ondulados, expressão séria, fundo neutro acinzentado. Substituiu a tentativa via Canva (link expirado) |
| **Pedro** (par romântico de Ana em Amor e Fé) | Retrato real enviado pelo usuário no Cowork em 2026-07-07 (PNG, convertido para JPEG, embutido em base64 no HTML) | Foto da personagem na página `amorefe.arcavila.com.br` (seção "história") | Retrato realista: homem careca, barba grisalha, terno cinza, colar com crucifixo, meio-sorriso, fundo neutro acinzentado |
| **Laís** (filha de Ana e Pedro) | Sem referência visual ainda | Citada nos textos descritivos de Ana e Pedro em `amorefe.arcavila.com.br` e no texto de destaque do `index.html` (2026-07-07/11) | Personagem mencionada, não retratada; introduzida na copy como elemento emocional central do conflito do casal |

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
