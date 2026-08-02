# Status do Projeto Arcavila

> Atualizado em: 2026-07-28

> **Nota de incidente e reestruturação (2026-07-25):** uma edição via GitHub MCP truncou este arquivo, porque a ferramenta de escrita do MCP (`create_or_update_file`) corta silenciosamente conteúdo acima de ~84 mil caracteres e o STATUS.md já estava em 86,5 mil. O conteúdo foi restaurado a partir da cópia local, verificada byte a byte contra o commit íntegro `fd70a2a` por blob sha. Na mesma passada, ~19 mil caracteres de histórico saíram daqui para `referencia/historico-layout.md` e `referencia/historico-automacoes.md`, devolvendo folga de edição. **Regra prática: manter este arquivo abaixo de ~80 mil caracteres.** Se voltar a crescer, mover mais histórico para `referencia/`.

---

## Como este documento está organizado (LEIA PRIMEIRO)

Este STATUS.md concentra o estado **vivo** do projeto: o que está no ar, o que está pendente e as decisões em aberto. É a fonte oficial de continuidade e deve ser lido no início de cada conversa.

Em 2026-07-04 fizemos um **split leve**: o conteúdo estável e de consulta pontual saiu daqui e foi para a pasta `referencia/`. Isso mantém o STATUS.md enxuto sem perder nada. Abra o arquivo de referência **apenas quando precisar do detalhe**:

- **`referencia/credenciais-e-ids.md`** — todos os IDs, URLs, tokens, DNS/TXT e IDs do Canva. Abrir quando precisar de um valor específico (Meta Pixel, Hotmart, Mailchimp, webhook Make, verificação DNS, designs do Canva).
- **`referencia/deploy-e-git.md`** — workflow de deploy, SSH e todas as lições aprendidas de git e Canva, incluindo o **Protocolo de Sincronização Segura** (2026-07-25). Abrir **antes** de fazer push/deploy, **antes de qualquer `git pull`** ou **quando o git der erro** (index.lock, pull travado, push_files vazio, stash).
- **`referencia/decisoes-editoriais.md`** — decisões editoriais fixas (bíblia) dos Livros 1 e 2 e do Clube de Histórias. Abrir ao escrever/editar história, definir capa ou montar funil de um livro.
- **`referencia/historico-layout.md`** — as mudanças de layout do site já concluídas ou publicadas, com data e commit. Abrir para saber quando/como algo do site mudou.
- **`referencia/historico-automacoes.md`** — o fluxo antigo de narração no AllVoiceLab (fallback) e o histórico de depuração da automação de imagens no Make. Abrir só se precisar remontar uma dessas automações.

Regra de manutenção: quando uma credencial, uma lição de deploy ou uma decisão editorial fixa mudar, atualizar o arquivo de referência correspondente. Quando o **estado** de uma entrega ou pendência mudar, atualizar este STATUS.md.

---

## Estrutura de Pastas do Projeto (local) — reorganizado em 2026-07-25

> A pasta local `/Users/mac/Claude/Projects/Arcavila` estava com mais de 60 arquivos soltos na raiz (reels de teste e publicados misturados, dezenas de mp3 intermediários de narração, PDFs de livros novos, planilhas de pauta, previews de validação, scripts). Reorganizada em 2026-07-25 para separar por tipo. **O site publicado (o que o Cloudflare Pages faz build) continua exatamente onde estava** — `index.html`, `amorefe/`, `anaepedro/`, `presente/`, `clube-de-historias/`, `functions/`, `netlify/`, `_redirects`, `favicon.png`, `logoarcavila*.png` na raiz não foram tocados, porque os projetos do Cloudflare Pages apontam para esses caminhos exatos como root dir — mover quebraria o deploy.

Pastas novas:

| Pasta | Conteúdo |
|---|---|
| `livros/amor-e-fe/`, `livros/a-mentira-que-deus-usou/`, `livros/o-medico-das-aguas/` | PDF, manuscrito, ficha de DNA e documento de referência de cada livro, agrupados por título |
| `criativos/reels/` | Todos os reels em vídeo (testes e publicados — usuário confirmou que todos já foram ao ar) |
| `criativos/audio/narracao/` | Áudios de narração (TTS, intermediários) |
| `criativos/audio/mixagem/` | Trilhas e mixagens de ambiência dos reels |
| `criativos/imagens/` | Testes de card de imagem |
| `criativos/pautas/` | Planilhas de pauta (Instagram, cliffhangers, nomes já usados) |
| `previews/` | HTMLs de preview usados para validar mudanças visuais antes de publicar |
| `docs/` | Plano de marketing, roteiros, prompts de referência |
| `scripts/` | Scripts de push/deploy e de sincronização git (`push_index_estande.sh`, `git-pull-seguro.sh` etc.) |
| `arquivo/` | Arquivos `contexto-*.md` de chats anteriores, já absorvidos neste STATUS.md — mantidos só como histórico |

**Limitação técnica encontrada nesta reorganização, contornada em seguida:** o sandbox do Cowork não tem rede externa liberada para `git push`/`git pull` via terminal (SSH na porta 22 e HTTPS na porta 443 para github.com retornam bloqueio do proxy) e o MCP do GitHub disponível no Cowork não tem uma ferramenta de exclusão de arquivo (só `create_or_update_file` e `push_files`, ambos aditivos). **Solução aplicada em 2026-07-25:** os arquivos novos foram criados nas pastas certas via GitHub MCP, e a exclusão dos caminhos antigos foi feita via Claude in Chrome — navegando direto para a URL de exclusão do GitHub (`github.com/<owner>/<repo>/delete/<branch>/<path>`) e confirmando o commit pela interface web (usuário já estava logado no Chrome). Assim as duas ferramentas se complementam sem precisar de acesso de rede do sandbox nem de uma ferramenta de delete no MCP. `preview-onda-hero-historia.html`, `preview-quatro-momentos.html` e `referencia-pousando-no-amor-livro2.md` já estão nas pastas novas (`previews/` e `livros/o-medico-das-aguas/`), tanto no repositório quanto localmente.

**Única exceção que permanece (permanente, não é para resolver):** `Ebook__Amor_e_Fe.pdf` (6,8MB) continua na raiz do repositório e da pasta local. Recriar um PDF desse tamanho via `create_or_update_file` exigiria colar o conteúdo em base64 (~9MB de texto) numa única chamada de ferramenta — caro demais em contexto e arriscado. Não vale o benefício puramente organizacional.

Todo o resto do conteúdo reorganizado (reels, áudios, imagens de teste, manuscritos, PDFs dos livros novos, planilhas de pauta) **já estava fora do controle de versão antes desta reorganização e continua assim** — só mudou de lugar no disco local, não foi publicado no repositório público. Isso preserva a decisão implícita já existente de manter rascunhos e material ainda não lançado fora do GitHub público.

Itens removidos nesta limpeza: arquivos `.DS_Store` (agora no `.gitignore`), três arquivos `.skill` soltos na raiz (`arca-upload.skill`, `browser-chat.skill`, `claude-browser.skill` — pacotes exportados sem relação com o projeto), quatro arquivos `clube-historias-carta-*.md`/`clube-de-historias-cadencia-e-calendario.md` duplicados na raiz (a versão oficial continua em `clube-de-historias/`, a pedido do usuário porque o conteúdo do Clube será reescrito depois), e as pastas de build temporário `_reel_build/` e `Higgsfield/` — esta última, apesar do nome, **não tinha relação com o MCP Higgsfield** (ainda não testado no projeto): era só onde a narração e o render final do reel da carta da Helena tinham ficado, hoje em `criativos/audio/narracao/` e `criativos/reels/`.

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

Resumo: planejamento e edições no Cowork; `index.html` e arquivos grandes vão por `git push` no terminal local (`~/Claude/Projects/Arcavila`); STATUS.md e arquivos pequenos são atualizados pelo GitHub MCP direto. Após qualquer push do Cowork via MCP, rodar `git pull origin main --no-rebase` antes do próximo push pelo terminal — de preferência via `bash scripts/git-pull-seguro.sh` (ver "Protocolo de Sincronização Segura" em `referencia/deploy-e-git.md`).

**Detalhes completos, SSH e lições aprendidas (index.lock, pull travado, push_files vazio, fluxo de assets do Canva, protocolo de sincronização): ver `referencia/deploy-e-git.md`.**

**Lição aprendida em 2026-07-14:** o `landing-sprites-ana-pedro.html` tem hoje ~331KB, com duas imagens (fotos de Ana e Pedro) embutidas em base64 somando ~296KB. Esse tamanho quebra o fluxo de push via GitHub MCP no Cowork — o conteúdo do arquivo nem cabe inteiro no contexto de leitura/gravação de uma chamada de ferramenta. Esse arquivo passou a exigir **sempre** push pelo terminal local (mesmo padrão já usado para o `index.html`, que tem o mesmo problema com a capa em base64).

**Lição aprendida em 2026-07-25:** o sandbox do Cowork não tem rede externa liberada para `git push`/`git pull` via terminal (nem SSH porta 22, nem HTTPS porta 443 para github.com — proxy bloqueia os dois). Dentro do Cowork, todo push tem que passar pelo GitHub MCP (`create_or_update_file`/`push_files`), que **não tem ferramenta de exclusão de arquivo** — só cria/atualiza. **Solução encontrada:** para excluir um arquivo do repo a partir do Cowork, usar o Claude in Chrome (com o usuário já logado no GitHub) e navegar direto para `github.com/<owner>/<repo>/delete/<branch>/<path>`, que abre a tela de exclusão pronta para confirmar o commit — não precisa nem clicar em menus, só ajustar a URL. Validado com sucesso excluindo 3 arquivos nesta mesma reorganização.

**Incidente e protocolo novo (2026-07-25):** ao sincronizar o repo local depois da reorganização de pastas, um `git stash drop` (comando errado, deveria ser `git stash pop`) quase apagou toda a reorganização local (pastas `criativos/`, `docs/`, `scripts/`, `arquivo/`, PDFs e manuscritos dos Livros 1 e 2). Recuperado a tempo via `git stash apply <hash>` porque o objeto ainda não tinha sido coletado pelo `git gc`. Criado em resposta: um **Protocolo de Sincronização Segura** completo em `referencia/deploy-e-git.md` (checklist antes de qualquer `git pull`, regra de nunca misturar edição local + push MCP do mesmo arquivo sem sincronizar, e o aviso `pop` vs `drop`) e um script auxiliar `scripts/git-pull-seguro.sh` (local, fora do git) que nunca usa stash sozinho — para com aviso se houver mudança pendente em arquivo já rastreado, em vez de arriscar automaticamente.

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

> Só o que ainda está **aberto**. Os 33 itens já concluídos ou publicados (com data e commit) foram movidos para `referencia/historico-layout.md` em 2026-07-25, para manter este arquivo dentro do limite de tamanho das ferramentas de edição.

| Item | Status | Observação |
|------|--------|-----------|
| Seção Círculo Arcavila (`#circulo`) | **OCULTO** | `display:none` via CSS. HTML preservado intacto para reativar quando o produto estiver pronto. Reativar: mudar `#circulo{display:none}` para `#circulo{background:var(--noite)}` |
| Texto da seção "a mesma casa" reescrito como cliffhanger (Ana, Pedro e Laís) | **Pronta localmente — AGUARDANDO PUSH (terminal)** | Título e texto do terceiro bloco da seção "história" (`#historia`, olho "a mesma casa") foram reescritos a pedido do usuário para criar um cliffhanger envolvendo os três personagens, no lugar da frase genérica "Dois caminhos, uma só fé." Versão final, com vínculo familiar explícito: título "A filha sabe o que *o pai escondeu da mãe*."; texto "Pedro escondeu a verdade de Ana. Laís descobriu primeiro, e agora carrega o peso sozinha." Validado por preview visual e aprovado. Editado em `landing-sprites-ana-pedro.html` |
| `arcavila.com.br` — item "Círculo" removido do menu | **Editado localmente — AGUARDANDO PUSH (terminal)** | A pedido do usuário ("não temos esse programa por enquanto"), removido o link `<a href="#circulo">Círculo</a>` do `.nav-links` no `index.html`. A seção `#circulo` continua oculta no site (`display:none`, ver linha acima), só o item do menu some |
| `arcavila.com.br` — menu mobile fecha ao rolar a página | **Editado localmente — AGUARDANDO PUSH (terminal)** | Bug reportado: com o menu mobile aberto, ao rolar a página os links continuavam visíveis mas com fundo transparente, "flutuando" sobre o conteúdo. Corrigido com um listener de `scroll` que remove a classe `.open` de `#navLinks` assim que o usuário rola, fechando o menu automaticamente |
| `arcavila.com.br` — mobile: ícone "?" trocado por texto "Em breve" nas capas placeholder | **Editado localmente — AGUARDANDO PUSH (terminal)** | Nas capas dos livros "em breve" (A Mentira que Deus Usou, O Médico das Águas), o glifo "?" central foi escondido só no mobile (`≤600px`, classe `.ph-q{display:none}`) e o texto "Em breve" (já existente como `.book-status.soon`, antes com `display:none` global) passou a aparecer centralizado, sem borda. Desktop/tablet inalterados. Validado com preview (`previews/preview-em-breve-mobile.html`) |
| `arcavila.com.br` — texto de destaque "Amor e Fé" reescrito com suspense (Ana, Pedro e Laís) | **Editado localmente — AGUARDANDO PUSH (terminal)** | O parágrafo da seção "Em destaque" (antes "Treze capítulos sobre um casamento à beira do abismo...") foi substituído por "Entre a dúvida de Ana e o segredo de Pedro, resta uma pergunta: o amor deles resiste à verdade que Laís guarda?", a pedido do usuário, para criar suspense entre os três personagens. Não está em media query — vale para mobile, tablet e desktop |
| `amorefe.arcavila.com.br` — card de oferta do slide final: título do livro em destaque e novo parcelamento | **Editado localmente e VALIDADO pelo usuário — AGUARDANDO PUSH (terminal)** | No `.oferta-card` do slide "derramamento": o rótulo pequeno `.oferta-eyebrow` ("e-book · acesso imediato") foi substituído pelo nome do livro **Amor e Fé** numa nova classe `.oferta-titulo` (Playfair Display, sem itálico, peso 500, cor `#241A12`, para reforçar a venda). Parcelamento trocado de "ou 2x R$ 19,90 sem juros" para "ou 5x R$ 8,19 sem juros" em `.preco-parcela`. Vale para desktop e mobile (não está em media query). Editado em `landing-sprites-ana-pedro.html`. **Tentativa de publicar via GitHub MCP em 2026-07-14 não foi possível:** o arquivo (331KB, com ~296KB de imagens em base64) excede o limite de conteúdo que cabe numa única chamada de ferramenta neste ambiente Cowork. Precisa ser publicado pelo terminal local (`git add`, `git commit`, `git push`) |

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
| Preço promocional de inauguração da editora | Definido em 2026-07-11 | R$ 37 (preço já praticado) passa a ser apresentado como desconto de lançamento sobre um preço cheio ancorado de R$ 89,90. Usar essa moldura ("de R$ 89,90 por R$ 37") nas legendas e criativos de divulgação |
| Meta Pixel | **Trocado para o pixel novo em 2026-07-27** | Eventos: `PageView`, `ViewContent`, `Lead`. Pixel novo `2532444597190684`, dentro do Business Arcavila (ver seção "Redes Sociais — Contas Meta"). ID em `referencia/credenciais-e-ids.md` |
| PDF do e-book | **Capa atualizada e publicada (2026-07-07)** | `Ebook__Amor_e_Fe.pdf` na raiz da pasta do projeto (e do repositório — não foi movido para `livros/amor-e-fe/` na reorganização de 2026-07-25 por já estar versionado no GitHub e ser grande demais (6,8MB) para recriar via API, ver seção "Estrutura de Pastas do Projeto"). 50 páginas, A5. Só a **capa** (pág. 1) foi trocada pela nova foto (casal ao pôr do sol), miolo inalterado. Imagem-fonte da capa em `livros/amor-e-fe/capa-de-livro/capa_amor_e_fe_v2.png` (1632x2624). A troca de capa (feita em 2026-07-06) tinha ficado só editada localmente sem commit; publicada via terminal em 2026-07-07 junto com os retratos (commit `638e994`). Versão anterior recuperável pelo git |

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
| Seção "Quatro momentos que mudam tudo" (`#cenas`) removida da página | **PRONTA LOCALMENTE — AGUARDANDO PUSH (terminal)** | Depois de testar reescrita de texto, ícones SVG e ajustes de fonte (histórico nos commits anteriores), o usuário decidiu remover a seção inteira. Removido de `landing-sprites-ana-pedro.html`: HTML (`#cenas`, cabeçalho e os 4 `.cena-carta`), CSS (`.cenas-pin`, `.cenas-cabecalho`, `.cenas-trilho`, `.cena-carta` e regras filhas) e o bloco JS do trilho horizontal pinado (GSAP ScrollTrigger `#trilho`). Link "cenas" removido do menu do topo. A página passa a ir direto de "história" (Ana/Pedro/Laís) para "derramamento" (CTA "Ler agora por R$ 37"). HTML e JS validados (parser + `node --check`). Arquivo `previews/preview-quatro-momentos.html` (usado para revisar a versão anterior) ficou obsoleto e pode ser apagado depois |
| Transição hero → "história": frase de impacto descendo em fade (3ª versão) | **PRONTA LOCALMENTE — AGUARDANDO PUSH (terminal)** | Histórico: banda fina sem pin → cortina dourada em tela cheia (réplica do derramamento) → **ambas rejeitadas pelo usuário ("ficou ruim")**. Removida a seção `#transicao` inteira (HTML, CSS `.wipe-palco2/.wipe-luz2/.wipe-creme2`, JS). Decisão final: sem elemento novo — a própria frase do hero ("Tem casamento que não acaba em briga. Acaba em silêncio.") vira o efeito de transição. Ajustado o bloco "Hero pinado" já existente em `landing-sprites-ana-pedro.html`: `.hero-conteudo` agora desce (`yPercent: 45`, antes subia `-14`) enquanto some em fade (`opacity: 0`), scrub ligado ao scroll, pin estendido de `+=60%` para `+=90%` para o movimento ficar mais gradual. Sem cortina, sem painel extra — mais simples e mais leve. HTML e JS validados (parser + `node --check`). `previews/preview-onda-hero-historia.html` reescrito para essa versão |
| Pin mobile do slide "derramamento" — colapso de altura corrigido; texto oculto no mobile; cabeçalho em degradê vinho; CTA verde | **PRONTA LOCALMENTE — AGUARDANDO PUSH (terminal) — ver "Atualizações de Layout"** | Ver linhas detalhadas acima. Resumo: bug do corte de texto corrigido; texto/citação do slide final agora oculto no mobile (só a caixa de oferta aparece); cabeçalho ganhou fundo em degradê vinho para não sobrepor conteúdo ao rolar; botão de compra em verde menta para mais destaque |

---

## Personagens — Referências Visuais

| Personagem | Referência | Uso pretendido | Observação |
|-----------|-----------|----------------|-----------|
| **Ana** (protagonista de Amor e Fé / autora fictícia das cartas do Clube) | Retrato real enviado pelo usuário no Cowork em 2026-07-07 (PNG, convertido para JPEG, embutido em base64 no HTML) | Foto da personagem na página `amorefe.arcavila.com.br` (seção "história") | Retrato realista, close frontal: mulher morena, cabelos pretos longos e ondulados, expressão séria, fundo neutro acinzentado. Substituiu a tentativa via Canva (link expirado) |
| **Pedro** (par romântico de Ana em Amor e Fé) | Retrato real enviado pelo usuário no Cowork em 2026-07-07 (PNG, convertido para JPEG, embutido em base64 no HTML) | Foto da personagem na página `amorefe.arcavila.com.br` (seção "história") | Retrato realista: homem careca, barba grisalha, terno cinza, colar com crucifixo, meio-sorriso, fundo neutro acinzentado |
| **Laís** (filha de Ana e Pedro) | Retrato de IA gerado via Higgsfield (Soul 2.0) em 2026-07-15, mulher brasileira, 25 anos, cabelos castanho-escuros longos ondulados, olhos castanhos, pele com textura realista | Referência de identidade para os clipes de vídeo do primeiro anúncio (Reels/Ads) | Job id `6766ce8b-6e6c-4032-87df-c4baa2db7e66` no Higgsfield. Usado como `image_references` nos 4 clipes de vídeo do roteiro "opção C" (conflito moral) |

---

## Tráfego Pago — Criativos (Amor e Fé)

> Início do tráfego pago no Meta (Facebook e Instagram Ads). Objetivo definido em 2026-07-02: **venda direta**, com clique levando para `amorefe.arcavila.com.br`.

| Item | Status | Observação |
|------|--------|-----------|
| Formato do criativo | Definido em 2026-07-02 | Imagem estática vertical (4:5 feed e 9:16 stories/reels). Vídeo só depois, no ângulo vencedor |
| Primeiro vídeo de anúncio (roteiro "opção C", mistério/Laís) | **Finalizado e publicado em anúncio (2026-07-28)** | Produzido via conector Higgsfield: retrato de referência da Laís (Soul 2.0) + 4 clipes de vídeo (Seedance 2.0, 9:16, clipes 1-2 em 1080p, clipes 3-4 em 720p por limite de créditos) + narração em português (ElevenLabs, voz "Nora", com sufixo "(audio em pt-br)" no prompt para reforçar sotaque brasileiro — validado pelo usuário). Montagem final concluída pelo Chiba fora do Cowork (arquivo `0715(1).mov`, 32s) e usada como criativo do primeiro anúncio em vídeo da campanha (ver linha "Subida da campanha no Meta Ads" abaixo) |
| Objetivo / destino | Definido em 2026-07-02 | Venda direta → `amorefe.arcavila.com.br`. URL confirmada no ar em 2026-07-02. Título da página padronizado para "Amor e Fé" |
| Copies dos ângulos | Concluído em 2026-07-02 | Dilema, prova social, trecho/cena. Headline, texto principal e CTA escritos |
| Criativo 1 (dilema, capa) — 4:5 | **Aprovado** | Fundo dourado escuro. Capa real no mockup, headline "Amor e Fé", subtítulo "Ela amava a Deus. E amava um homem que não podia ter.", botão "Ler agora por R$ 37", logo. ID Canva em `referencia/credenciais-e-ids.md` |
| Criativo 3 (trecho/cena) — 4:5 | **Aprovado** | Três cenas com faixas de leitura + botão "CONTINUE A LEITURA · R$ 37". ID Canva em `referencia/credenciais-e-ids.md` |
| Criativo 2 (prova social, capa) | **DESCARTADO** | Descartado a pedido do usuário em 2026-07-03. Chegou a ser refeito em vinho mas ficou parecido demais com o 1. Campanha seguirá só com criativos 1 e 3 |
| Versões 9:16 (stories/reels) | **Concluído em 2026-07-03** | Criativo 1 (resize limpo) e Criativo 3 (resize + fundo escuro `dark-bg.png` cobrindo as faixas brancas = letterbox cinematográfico). IDs Canva em `referencia/credenciais-e-ids.md`. Trial de resize esgotado |
| Criativo de marketing "Caminhos de Fé / Editora Arcavila" | **A utilizar (registrado 2026-07-03)** | Peça de divulgação enviada pelo usuário (PNG). Arte estática dourada, fundo escuro: headline "Fortaleça sua Fé", mockup de capa "Caminhos de Fé" sobre mesa de madeira com Bíblia aberta, bullets, botão "Comprar agora" e selo Editora Arcavila. **Arquivo-fonte ainda NÃO commitado no repo** — subir para `assets/` via terminal (ex.: `assets/mkt-caminhos-de-fe.png`) se virar asset oficial |
| Exportar PNGs finais | **PENDENTE (usuário)** | Baixar do Canva em PNG 1080×1350 (4:5) e 1080×1920 (9:16), sem compressão, sem fundo transparente |
| Subida da campanha no Meta Ads | **PAUSADA em 2026-08-02, a pedido do Chiba** | Mudança de escopo decidida pelo Chiba: em vez do teste A/B com os criativos de imagem 1 e 3, foi publicado direto um anúncio em VÍDEO para Stories, usando o vídeo "opção C" já finalizado (`0715(1).mov`, 32s, comprimido para upload). Estrutura: campanha "Amor e Fé — Vídeo Stories — Teste 2026-07-28" → conjunto "Stories — Público Livros e Fé" → anúncio "Vídeo Stories — Opção C". Orçamento R$ 20/dia (CBO na campanha), início 2026-07-28 20h, sem data de término definida (rodar indefinidamente até pausar manualmente). Público: Brasil, mulheres, 25-65+, interesses Romance/E-books (publicações) como sugestão — Advantage+ pode alcançar pessoas fora dessas configurações. Copy reaproveitada do Criativo 1 (headline "Amor e Fé", subtítulo "Ela amava a Deus. E amava um homem que não podia ter."). CTA "Comprar agora" → `amorefe.arcavila.com.br`, evento Comprar rastreado via Arcavila - Pixel Site. Publicado manualmente pelo Chiba diretamente no Ads Manager — o upload do vídeo não pôde ser automatizado no Cowork porque o seletor de arquivo do Meta Ads Manager usa um diálogo nativo do sistema operacional sem `<input type="file">` acessível via automação de navegador (tentativas via GitHub, Higgsfield e outros hosts de arquivo também bloqueadas pelo allowlist de rede do sandbox). Status confirmado após publicação: anúncio e conjunto "Em análise/Em processamento" no Meta, R$ 0,00 gasto até o momento. **Nota sobre segmentação:** Chiba pediu segmentar por público cristão; confirmado que o Meta não oferece categoria de direcionamento detalhado por religião (removida da plataforma por ser atributo sensível, testado com múltiplos termos em PT e EN sem retorno relevante) — mantidos os interesses Romance/E-books; alternativa futura é montar Custom Audience/Lookalike a partir dos compradores reais do livro. Posicionamento ficou em Advantage+ automático (inclui Stories entre outros formatos); não há toggle manual nessa versão do Ads Manager para restringir só a Stories. **Confirmação de gasto real (2026-07-29):** verificado que a campanha já estava entregando de verdade — na Cobrança e Pagamentos do Meta Business Suite, o cartão MasterCard ····5144 já tinha sido cobrado em R$ 11,75 (pago em 29/07) com mais R$ 1,56 acumulando (limite de gastos diário da conta: R$ 257,56, dentro do limite). O "R$ 0,00" que aparecia nas tabelas de Campanhas/Anúncios do Ads Manager era só efeito do filtro de intervalo de datas da visualização, fixado em "Últimos 30 dias: 29/06 a 28/07" — ou seja, excluindo o próprio dia 29/07, quando a entrega estava acontecendo. Não houve nenhum problema real de veiculação, pagamento ou configuração. **Orçamento reduzido para R$ 5,12/dia (2026-07-29):** a pedido do Chiba, o orçamento diário da campanha foi reduzido de R$ 20,00 para R$ 5,00 — o Meta recusou o valor exato de R$ 5,00 por estar abaixo do mínimo técnico da plataforma para essa campanha (R$ 5,12), então o orçamento foi ajustado para R$ 5,12/dia, o valor mais próximo permitido. Alteração publicada com sucesso (status "Em processamento" logo após a mudança, normal). **Campanha pausada (2026-08-02):** a pedido do Chiba, a campanha foi pausada no Ads Manager (status mudou de "Ativo" para "Desativado", confirmado pela própria interface do Meta). Performance final acumulada em ~5 dias de veiculação (28/07 a 02/08): R$ 23,53 gastos, 672 impressões, 631 de alcance, 67 cliques, CTR de 9,97% (havia começado em ~12% e foi caindo aos poucos), CPC de R$ 0,35 (começou em ~R$0,27), 32 visualizações da página de destino e nenhuma venda atribuída. Engajamento (CTR e CPC) ficou consistentemente acima da média do mercado durante toda a veiculação; o volume de visitas à página (32) ainda era pequeno demais para uma leitura estatisticamente confiável sobre conversão. |

---

## Analytics de Site (PostHog)

> Frente aberta em 2026-07-16 para medir performance dos anúncios: entrada na página, navegação do usuário e cliques no CTA de compra. Ferramenta escolhida: **PostHog** (plano grátis, 1M eventos/mês), com MCP conectado no Cowork para o Claude consultar os dados direto. IDs e token em `referencia/credenciais-e-ids.md`.

| Item | Status | Observação |
|------|--------|-----------|
| Conta e projeto PostHog | Concluído em 2026-07-16 | Organização "Arcavila", projeto "Default project" (id 515572), região US. MCP conectado no Cowork |
| Snippet no `index.html` (www.arcavila.com.br) | **NO AR — verificado em 2026-07-16** | Snippet oficial posthog-js no `<head>` (autocapture + pageviews). Push pelo terminal, commit `013723d`. `$pageview` confirmado chegando via MCP |
| Snippet no `landing-sprites-ana-pedro.html` (amorefe.arcavila.com.br) | **NO AR — verificado em 2026-07-16** | Mesmo snippet; página destino dos anúncios. Commit `013723d`. `$pageview` confirmado |
| Evento `clique_cta_hotmart` | **NO AR — verificado em 2026-07-16** | Listener de clique (delegação) em links `pay.hotmart.com`, com propriedades `pagina` e `texto_cta`. Cliques de teste confirmados nos dois domínios. Base do funil pageview → clique CTA |
| Teste de ponta a ponta | Concluído em 2026-07-16 | Sessão de teste do usuário: pageviews nos dois domínios, 3 cliques no CTA, replay de 70s gravado começando em amorefe. Mesma pessoa e mesma sessão nos dois subdomínios (cookie cross-subdomain funcionando) |
| Session replay + heatmaps + dead clicks | Concluído em 2026-07-16 via MCP | Gravação de sessões ativa (retenção 30d), heatmaps e detecção de rage clicks. Fuso do projeto ajustado para America/Sao_Paulo. `app_urls` configuradas com www e amorefe |
| Funil e dashboard no PostHog | **Concluído em 2026-07-16** | Dashboard "Campanha Amor e Fé — Tráfego Pago" (id 1861808, definido como dashboard inicial do projeto) com 4 insights: funil visita → clique CTA (janela 14d), visitas/dia por domínio, cliques CTA por utm_campaign (popula com os anúncios), visitantes únicos por canal de aquisição ($channel_type). URL: us.posthog.com/project/515572/dashboard/1861808 |

Rastreio entre subdomínios (www e amorefe) funciona automaticamente: o cookie do PostHog é gravado no domínio raiz `arcavila.com.br`.

---

## Redes Sociais — Contas Meta (Editora Arcavila)

> Fase iniciada em 2026-07-05: montar a infraestrutura de contas no Meta para rodar Facebook/Instagram Ads dos criativos 1 e 3 (venda direta → `amorefe.arcavila.com.br`). **Decisões travadas em 2026-07-05:** nome de marca **Editora Arcavila**; canais **Instagram + Facebook**; administrador = **perfil pessoal real já existente do usuário** (não criar perfil falso, sob risco de perder todos os ativos). Handle sugerido `@editoraarcavila` (alternativa `@arcavila` se estiver livre).
>
> **Decisão em 2026-07-11:** em vez de criar um Business Manager novo, o usuário reaproveitou um portfólio já existente ("arteiropro"), renomeado para "Arcavila" (ID `213802926265845`). Diagnóstico feito antes de reaproveitar: dados cadastrais da empresa (razão social, endereço em Campinas/SP, telefone, site `arcavila.com.br`) já corretos; histórico de conformidade no Suporte para Empresas limpo (sem penalização nos últimos 30 dias); a página antiga estava desativada por ação manual do usuário (encerramento do projeto anterior), não por bloqueio da Meta — validando o reaproveitamento em vez de começar do zero.

| Item | Status | Observação |
|------|--------|-----------|
| Meta Business Portfolio | **Concluído (reaproveitado) em 2026-07-11** | Portfólio "Arcavila" (ID `213802926265845`), antigo "arteiropro". IDs em `referencia/credenciais-e-ids.md` |
| Página do Facebook "Arcavila" | **Em andamento (2026-07-11)** | Página antiga "arteiropro" reativada. Solicitação de renomeação para "Arcavila" enviada, em análise da Meta (até 3 dias); após aprovado, nome fica travado por 60 dias |
| Verificação do domínio arcavila.com.br no Business | **PENDENTE** | Via TXT no Cloudflare (DNS já sob controle). Necessário para medição de conversões pós-iOS 14 |
| Verificação da empresa (Business Verification) | **PENDENTE** | Enquanto não verificada, o limite de contas de anúncios no portfólio fica em 1 |
| Meta Pixel dentro do Business Arcavila | **RESOLVIDO em 2026-07-27 — pixel novo criado** | A Central de Ajuda da Meta confirma: não é possível transferir/excluir um conjunto de dados entre portfólios. O pixel antigo (`2738569696297378`) ficou órfão, preso a uma conta pessoal fora de qualquer Business. Solução: criado um pixel **novo** direto dentro do Business "Arcavila" — ID `2532444597190684`, já com Conversions API habilitada e conectado à conta de anúncios `2117830595442608`. O pixel antigo foi trocado pelo novo em todos os snippets do site (`index.html`, `landing-sprites-ana-pedro.html`, `amorefe/index.html`, `landing-ana-pedro-v2.html`) — **já publicado no ar (commit `a93c5a0`, 2026-07-28)**. IDs em `referencia/credenciais-e-ids.md` |
| Conta de anúncios "arcavila" | **Criada em 2026-07-11** | ID `2117830595442608`, dentro do portfólio. Caio Chiba com acesso total de administrador. ID em `referencia/credenciais-e-ids.md` |
| Meio de pagamento na conta de anúncios | **Concluído em 2026-07-28** | Cartão cadastrado pelo próprio Chiba nas Configurações de Faturamento da conta |
| Instagram profissional `@editora.arcavila` | **Perfil já existe e publica (verificado 2026-07-11); conexão ao Business ainda não confirmada** | Handle real ficou `@editora.arcavila` (com ponto), diferente do sugerido em 2026-07-05 (`@editoraarcavila`/`@arcavila`) — usar esse handle em todas as peças/QR codes daqui em diante. Visualmente (sem login) não aparece tag de categoria comercial nem botão de contato, então não dá para confirmar de fora se já é conta profissional vinculada ao Business "Arcavila" — conferir em Configurações > Conta |
| Instagram — seguidores | **PENDENTE (0 seguidores em 2026-07-11)** | Perfil com 5 posts mas zero seguidores; antes de puxar tráfego (orgânico ou pago) vale semear uma base inicial (contatos próprios, beta leitores, equipe) para a página não parecer vazia a quem chega pelo anúncio |
| Instagram — Reels/vídeo | **PENDENTE** | Os 5 posts publicados são todos imagens estáticas; não há aba de Reels visível no perfil. Vídeo curto é o principal mecanismo de descoberta do algoritmo — considerar transformar 1 a 2 dos criativos já aprovados em Reels simples antes de escalar |
| Instagram — link da bio | **A avaliar** | Bio ("Romances que fazem o coração e a fé crescerem juntos.") aponta para `arcavila.com.br` (home institucional), não para uma página de conversão direta. Avaliar trocar para a landing de vendas (`amorefe.arcavila.com.br`) ou um link único com destino à oferta de lançamento, já que o objetivo do funil é venda direta |
| Segundo administrador no portfólio (backup) | **PENDENTE (a considerar)** | Hoje só Caio Chiba é admin — risco de ponto único de falha |
| Aquecimento orgânico | **Instagram concluído (verificado 2026-07-11); Facebook ainda não conferido** | Perfil `@editora.arcavila` tem 5 posts no grid (Fortaleça sua fé/Amor & Fé, "a graça chega antes", "seja um dos primeiros a entrar na vila", "o que Laís escolheu esconder", capa Amor & Fé) — bate com a meta de 3 a 5 posts antes de anunciar. Página do Facebook ainda não verificada visualmente |
| Política de conteúdo religioso no Meta | **Nota** | Não segmentar por religião (atributo sensível); a copy não pode presumir a fé do leitor de forma pessoal. Segmentar por interesses (livros, fé, romance) e falar da obra. **Atualização 2026-07-28:** confirmado na prática que o Meta nem oferece categoria de direcionamento detalhado por religião nessa conta/mercado (testado com múltiplos termos em PT e EN) — a regra acima passa a ser também uma limitação técnica da plataforma, não só uma escolha editorial |

---

## Conteúdo Orgânico — Imagens Instagram (Canva)

> Fase iniciada em 2026-07-17. Objetivo: posts estáticos/carrosséis de alto engajamento no formato "cena-metáfora" (a foto ilustra literalmente a frase), além dos Reels. **Pipeline oficial de imagens = Canva** (MCP conectado), validado ponta a ponta: gerar → escolher → inserir selo → exportar PNG. Adobe Express foi testado mas o export estava caindo (instabilidade de backend deles); Higgsfield ficou sem créditos. Anti-shadowban: publicar sempre via API oficial, nunca automatizar engajamento, foto original/licenciada e selo Arcavila para não parecer conta genérica de frases.

| Item | Status | Observação |
|------|--------|-----------|
| Molde/modelo aprovado | **Concluído (2026-07-17)** | Card "cena-metáfora": foto full-bleed, frase serifada com palavra em destaque, régua dourada, selo Arcavila + handle no rodapé. Design Canva `DAHPqSQwQhc`. Piloto: "O que parece morto em ti ainda vai FLORESCER." (broto rompendo solo rachado) |
| Fonte de pautas | **Definido (2026-07-17)** | Google Sheets como painel. Planilha semente `criativos/pautas/pautas-imagens-arcavila.csv/.xlsx` na pasta do projeto (colunas: ID, Frase, Destaque, Palavra-chave da foto EN, Status, Link PNG, Observações), 8 frases iniciais no tom Arcavila |
| Motor de geração | **Definido (2026-07-17)** | Claude gera sob demanda via Canva MCP (copiar molde → trocar frase + foto por palavra-chave → exportar PNG). Automação no Make.com fica para depois de validar o volume |
| Foto por post | **REVISADO (2026-07-18)** | Palavra-chave (EN) na planilha → foto de banco livre. **Fonte que funciona no pipeline automático: Unsplash** (`images.unsplash.com`), licença livre para uso comercial, o Canva baixa direto pela URL pública. O Adobe Stock continua válido para escolhas manuais, mas exige que o Chiba baixe o arquivo licenciado e suba nos Uploads do Canva (ver linha abaixo) |
| Lição — Adobe Stock não entra no Canva por API | **Registrado (2026-07-18)** | O Canva não baixa a URL S3 assinada do arquivo licenciado (`fetch_failed`). A prévia pública `1000_F_...` do `ftcdn.net` o Canva BAIXA, mas ela vem com marca d'água Adobe Stock, então é inutilizável. As ferramentas de imagem da Adobe (`image_crop_and_resize` etc.) pedem autenticação extra e não estão disponíveis nesta conexão. Conclusão: para usar Adobe Stock, o download e o upload precisam ser manuais |
| Selo no card | **Concluído (2026-07-17)** | Logo subido ao Canva via `raw.githubusercontent.com/maioemico/arcavila-teste/main/logoarcavila-semfundo.png` — o site `arcavila.online` NÃO serve o arquivo no root (upload por essa URL falhou) |
| Handle nas peças | **ATENÇÃO — corrigir no v1** | Card-piloto saiu com "@editoraarcavila" (sem ponto); handle real é `@editora.arcavila` (com ponto). Já correto no molde oficial; falta corrigir no design v1 `DAHPqSQwQhc` |
| **MOLDE OFICIAL do card** | **Concluído (2026-07-18)** | Design Canva `DAHPxd59xaI` — "Arcavila — Molde Card Instagram", 1080x1080. Edit: https://www.canva.com/d/Elb74ZGqIIyJ6n4 . Criado por importação de HTML (`molde-card-instagram.html` no repo), o que contornou a limitação da API do Canva de não criar caixas de texto novas. Tem **duas caixas de texto separadas e estilizadas**: frase (Playfair 54px, creme #F4EBDA) e destaque (Playfair 70px, itálico bold, dourado #C9A227). Element IDs da página `PBNFsl83ybQm9jT1`: fundo `-LBqJTNvSXwWpRTmQ`, scrim `-LBD2T5wl05zlw1TB`, logo `-LBjVTkm9jWvfx5jz`, aspa `-LBFZbjQVrHmXZmfK`, frase `-LBRKgJ0Y9bLb4n29`, destaque `-LB1zQ6gdHkHrYc0l`, handle `-LBYd0MhlFxnrp05j` |
| Logo do molde | **Concluído (2026-07-18)** | `assets/logo-faixa.png` publicado no repo (commit `8b7ff96`) e subido ao Canva como asset `MAHPxRDj_CQ`. No molde: 440x237,88 (proporção real 640x346), topo 56, esquerda 320. Novo element ID do logo: `PBNFsl83ybQm9jT1-LBGVXJVXKgQXp0jy` (o anterior foi deletado) |
| **Layout aprovado (v2)** | **Definido (2026-07-18)** | Chiba inverteu o layout: **texto no alto, logo centralizado embaixo**. Motivo: o céu é a área mais uniforme da foto, o texto ganha legibilidade. Aspa no alto à esquerda (topo 50, esq 85), frase no topo 200, destaque logo abaixo, logo centralizado (440x237,88 em topo 691, esq 320), handle no topo 960. Variante com logo no canto inferior esquerdo foi testada e **descartada** |
| **Tarja no texto de destaque** | **REGRA FIXA (2026-07-18)** | Decisão do Chiba: o destaque **sempre** vai sobre uma tarja de fundo em cor de contraste (creme da paleta do logo, texto em dourado). Motivo: garante legibilidade em qualquer foto, sem depender de julgar a luminosidade caso a caso. **Testado e validado:** a tarja sobrevive ao `replace_text` da API, se redimensiona e se recentraliza sozinha. **Limite:** com frase longa a tarja vira uma barra de ponta a ponta e fica pesada. Manter o destaque em no máximo ~22 caracteres (com 16 caracteres a tarja mede 533px; com 29 vai a 968px de 1080) |
| **MOLDE OFICIAL v2** | **Concluído (2026-07-18)** | Design `DAHPxiESun8` — "Arcavila — MOLDE OFICIAL Card Instagram v2". Edit: https://www.canva.com/d/zY4vNLomFLkc_Nd . Já contém layout v2 + tarja do destaque + logo correto. **É este que deve ser copiado na geração em lote**, não o `DAHPxd59xaI` (v1, layout antigo). Element IDs seguem os mesmos do v1, pois vieram por cópia |
| Lição — tarja só existe se vier do molde | **Registrado (2026-07-18)** | O `format_text` da API do Canva não tem opção de cor de fundo de texto. A tarja não pode ser aplicada por API num card que não a tenha. Ou seja: todo card precisa nascer de uma cópia do molde v2 |
| Regra da foto (atualizada) | **Definido (2026-07-18)** | Não é mais "terço superior limpo" e sim **metade superior limpa**, porque agora são duas linhas de texto ali. Palavra-chave deve pedir céu aberto ou área lisa no alto |
| Cards de exemplo | **Concluído (2026-07-18)** | Deserto: `DAHPxhZbIeA`. Dia das Mães: `DAHPxgY50bo` ("Antes de eu saber rezar, minha mãe já rezava por mim." / "E Deus escutava."). Ano Novo: `DAHPx3mrPBM` ("Não peça um ano fácil. Peça um coração firme." / "Deus vai com você."), primeiro card gerado 100% a partir do molde v2. Fotos do Unsplash, licença livre |
| Ajuste pendente no molde | **PENDENTE** | O destaque tem posição fixa, então quando a frase ocupa duas linhas ele precisa descer manualmente. Regra a embutir na geração em lote: topo do destaque = topo da frase + altura da frase + 33px. Além disso, ao reposicionar o destaque é preciso recalcular a esquerda para manter a centralização, porque a caixa encolhe conforme o texto |
| Lição — API do Canva, recorte de imagem | **Registrado (2026-07-18)** | `update_fill` mantém a moldura do elemento antigo, e `resize_element` com `preserve_aspect_ratio` usa a proporção da MOLDURA, não a da imagem nova. Resultado: imagem cortada no topo e na base. Solução que funciona: `delete_element` no elemento antigo + `insert_fill` novo já com width e height na proporção exata da imagem |
| Método de importação HTML → Canva | **Validado (2026-07-18)** | `import-design-from-url` com raw URL do GitHub e `data-document-role="page"` no container. Fontes Google e imagens por raw URL são resolvidas pelo Canva. É o caminho para criar qualquer molde novo com estrutura que a API não monta |

### Especificação fechada do card (layout v2) — 2026-07-18

Molde oficial: `DAHPxiESun8` (https://www.canva.com/d/zY4vNLomFLkc_Nd). Página `PBNFsl83ybQm9jT1`. Canvas 1080x1080.

| Elemento | Element ID | Posição e estilo |
|---|---|---|
| Foto de fundo | `PBNFsl83ybQm9jT1-LBqJTNvSXwWpRTmQ` | 1080x1080, full bleed, topo 0 esq 0 |
| Scrim (gradiente) | `PBNFsl83ybQm9jT1-LBD2T5wl05zlw1TB` | 1080x1080, fixo, não mexer |
| Aspa | `PBNFsl83ybQm9jT1-LBFZbjQVrHmXZmfK` | topo 50, esq 85, dourado `#C9A227` |
| Frase | `PBNFsl83ybQm9jT1-LBRKgJ0Y9bLb4n29` | topo 200, esq 110, largura 860, Playfair Display 54px, creme `#F4EBDA`, centralizado, até 2 linhas |
| Destaque | `PBNFsl83ybQm9jT1-LB1zQ6gdHkHrYc0l` | topo 366, Playfair Display 70px itálico bold, dourado `#C9A227` **sobre tarja creme**, centralizado, máximo ~22 caracteres |
| Logo | `PBNFsl83ybQm9jT1-LBGVXJVXKgQXp0jy` | asset `MAHPxRDj_CQ`, 440x237,88, topo 691, esq 320 |
| Handle | `PBNFsl83ybQm9jT1-LBYd0MhlFxnrp05j` | topo 960, esq 190, largura 700, Lato 30px, creme, `@editora.arcavila` |

Regras de produção:

1. Todo card nasce de uma **cópia do molde v2**. Nunca criar do zero, porque a tarja do destaque não pode ser aplicada por API.
2. Foto precisa ter a **metade superior limpa** (céu aberto ou área lisa).
3. Se a frase ocupar duas linhas, o destaque desce: topo do destaque = topo da frase + altura da frase + 33px. Ao reposicionar, recalcular a esquerda para manter a centralização, porque a caixa encolhe conforme o texto.
4. Fonte de fotos padrão: Unsplash, licença livre.

### Narração (AllVoiceLab) — SUPERADA em 2026-07-25, mantida como fallback

Fluxo antigo com a voz Rachel do AllVoiceLab. Substituído pela narração Higgsfield/Nora (seção abaixo). O detalhamento completo (voz, mapa emocional de atempo, receita de mixagem com ducking, limitações da API e pendência de segurança da key exposta) foi movido para `referencia/historico-automacoes.md` em 2026-07-25. Abrir aquele arquivo só se o fluxo AllVoiceLab for retomado.
### Reels layout carta v2 — definido em 2026-07-25

Três mudanças definidas com o Chiba em 2026-07-25, valendo somente para reels novos (os já publicados não serão refeitos):

1. **Capa sem ícone de envelope (opção A, "centro puro").** A capa passa a ser só tipografia: "Carta para" em EB Garamond itálico e o NOME grande em Playfair Display, centralizados verticalmente no espaço inteiro; moldura fina e @editora.arcavila no rodapé mantidos como antes. Template pronto para render em 1080x1920: `docs/template-capa-reel-carta.html` (basta trocar o nome). Opções B ("abertura de carta") e C ("convite") foram descartadas; preview de validação em `previews/preview-capa-reel-carta.html`. Continua valendo a REGRA CRÍTICA do frame 0: a capa completa deve ser o primeiro frame, sem fade a partir do preto, com thumb_offset=1000 no módulo do Instagram.

2. **Nome real da manchete no vocativo.** O nome da carta deixa de ser sorteado. Passa a ser o primeiro nome real da pessoa da manchete de referência (ex.: Vinícius Júnior vira "Carta para Vinícius"), citado no título da capa e no início da carta. Somente o primeiro nome, nunca sobrenome. Se a pessoa for conhecida por apelido, criar um nome verossímil que lembre o apelido (ex.: Dida vira Fernanda), sem regra rígida de semelhança. A reflexão em si continua sem citar nomes, times ou obras que identifiquem a pessoa: a conexão com a manchete fica só no vocativo e no tema. Repetição de nomes passa a ser permitida; o `docs/nomes-utilizados.csv` deixa de ser bloqueante e vira registro histórico.

3. **Narração migra do AllVoiceLab para o Higgsfield** — ver seção seguinte.

### Reels layout carta v3 — estrutura de 3 slides, definida em 2026-07-25

Evolução do layout v2 acima, aprovada pelo Chiba no reel `criativos/reels/reel-carta-victoria-teste-v7.mp4`. **Publicado no Instagram em 2026-07-25** via cenário Make 5716956 (arquivo no repo: `reels/reel-carta-victoria-v1.mp4`; legenda no padrão da Helena: "Carta para Victoria." + frase + "Histórias completas em arcavila.com.br" + as 5 hashtags). O que muda:

1. **Estrutura fixa de 3 slides: CAPA > CONTEÚDO > SLIDE FINAL COM O LOGO ARCAVILA.** Acabaram os reels de 4 a 6 slides com a carta fatiada em várias frases. O corpo da carta agora cabe num slide só. Toda a construção de montagem, virada e gancho que existia nas versões anteriores foi descartada.

2. **Conteúdo: um conselho, numa frase só, com humor.** O texto deixa de ser reflexão descritiva e vira conselho direto para a pessoa da manchete, escrito para arrancar sorriso do leitor. O humor vem de uma comparação concreta e do cotidiano, não de trocadilho nem de piada montada. Frase aprovada no v7: "Victoria, curar leva tempo. Para de checar se já sarou toda hora, feito bolo no forno." O vocativo com o primeiro nome real da manchete continua abrindo a frase, mesmo com a capa já trazendo "Carta para NOME".

3. **O que reprovou antes (não repetir):** frases divididas em três partes que não fechavam sentido entre si (ex.: "Porque alguém estava vindo que ia saber cuidar disso"); humor construído em cima de metáfora abstrata ou financeira, que o Chiba avaliou como sem sentido nenhum. Escrever primeiro a frase completa e conferir se ela se sustenta sozinha, lida em voz alta, antes de gerar qualquer áudio ou slide.

4. **Ritmo do v7 (referência de duração):** capa 3,5s (narração "Carta para NOME" + 0,5s de pausa), conteúdo 9,3s (narração da frase + 1,0s de pausa) e slide de logo 2,5s em silêncio, totalizando 14,5s. O slide de conteúdo reaproveita o layout de página de papel (fundo 0xEDE3CC, moldura marrom dupla, texto 0x33291E, aspas douradas 0x9A7B52) e o logo do slide final está com o tamanho já reduzido em 30% a pedido do Chiba. Continua valendo a REGRA CRÍTICA do frame 0: a capa completa no primeiro frame, sem fade a partir do preto, com `thumb_offset=1000` no módulo do Instagram.

### Narração (Higgsfield) — regra nova, definida em 2026-07-25

Substitui o AllVoiceLab para todos os reels novos. Decidido após teste cego com a frase 1 da carta da Helena em 7 versões (Rachel/AllVoiceLab atual + Nora, Emily e Sienna em ElevenLabs/Seed Audio + as mesmas três em Qwen Audio 3.0). Preview do teste: `previews/preview-teste-vozes-helena.html`.

- **Voz oficial: Nora** (preset do catálogo Higgsfield, `voice_id d081b915-6623-4a44-bacf-80d0f1c90a03`), engine **ElevenLabs**, via `generate_audio` com `model: text2speech_v2`, `variant: elevenlabs`, `voice_type: preset`. Não trocar sem aprovação do Chiba.
- **Prompt — CORRIGIDO em 2026-07-25 (teste da carta da Victoria): sempre terminar o texto com o sufixo `(áudio em pt-br)`.** Sem o sufixo, o Chiba reprovou a narração: "parece que não está em português pt-br e está bem com cara de ia". O teste de naturalidade (`previews/preview-teste-naturalidade-victoria.html`) comparou a versão reprovada contra quatro variantes (Nora com sufixo pt-br, Nora no Seed Speech, e as vozes Elena e Isabella no ElevenLabs) e a aprovada foi **Nora + sufixo `(áudio em pt-br)`**. O sufixo entra no fim do prompt e não é lido em voz alta. O wrapper do Higgsfield não expõe parâmetros de ajuste fino do ElevenLabs (nada de stability ou style), confirmado por `models_explore(action:"get", model_id:"text2speech_v2")`, então o sufixo no prompt é a única alavanca de sotaque disponível.
- **Custo:** ~0,3 crédito por frase no ElevenLabs. O Qwen custa 0,03 (10x mais barato) mas perdeu na avaliação por ouvido; fica como opção econômica para rascunhos. Fazer preflight com `get_cost: true` antes de gerar.
- **Fluxo de download — automatizado em 2026-07-25 (teste da carta da Victoria):** a pasta de download do Chrome ("Narrações") fica em `Higgsfield/Narrações/` **dentro da própria pasta do projeto Arcavila**, que já é a pasta conectada do Cowork. Isso significa que o sandbox lê os mp3 direto de lá por bash: **não é preciso Finder nem computer-use para mover nada** (o passo com o Finder que existia na primeira versão deste fluxo foi eliminado). O download em si roda pelo Claude in Chrome: para cada URL de CDN do Higgsfield, um `fetch` seguido de `URL.createObjectURL` gera um blob same-origin e dispara o download já com o nome de arquivo certo. **Detalhe que faz a diferença:** o atributo `download` de um `<a>` só funciona em URL same-origin, então apontar direto para a URL cross-origin do CDN apenas navega a aba em vez de baixar; o blob contorna isso (o CDN do Higgsfield responde com CORS liberado). Executar o script numa aba de página HTML real (ex.: example.com) — numa aba servindo XML ou em `chrome://newtab` o `document.createElement` não se comporta como HTMLElement e o `.click()` falha. Depois é só copiar os mp3 de `Higgsfield/Narrações/` para `criativos/audio/narracao/` por bash, para manter o registro oficial.
- **Pós-processamento — CORRIGIDO em 2026-07-25 (teste da carta da Victoria): NÃO aplicar atempo nas narrações Higgsfield/Nora.** O Chiba ouviu o primeiro reel de teste com o mapa emocional antigo (0,80 / 0,78 / 0,73 / 0,65, calibrado para a Rachel do AllVoiceLab) e reprovou: a narração ficou péssima. A entrega da Nora/ElevenLabs já vem no ritmo natural certo e não pede nenhum ajuste de velocidade. Manter apenas o corte de silêncio nas pontas. **Receita validada do corte de silêncio:** usar `stop_periods` positivo no filtro `silenceremove` TRUNCA o áudio no primeiro silêncio interno em vez de só aparar a ponta (no teste, uma frase de 7,1s virou 0,2s) — não usar dessa forma. O que funciona é aparar o início, reverter, aparar de novo e reverter de volta: `silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,areverse`. O mapa de atempo antigo só volta a valer se o fluxo com Rachel/AllVoiceLab for retomado.
- **Descobertas técnicas (2026-07-25):** os presets de voz são compartilhados entre engines (campo `supported_models`: elevenlabs, minimax, seed_speech, qwen_audio), então dá para manter a voz e trocar de engine; a instrução de estilo do `qwen_audio_tts` tem limite de 128 caracteres; o `seed_audio` aceita clonagem de voz por referência de áudio (não usado por ora).

### Cadência de publicação — definida em 2026-07-18

Ritmo alvo: **5 peças por semana**, sendo 3 cards estáticos e 2 Reels, mais Stories quase diários. Referência de mercado para 2026: 3 a 5 posts de feed e 2 a 4 Reels por semana, com consistência pesando mais que volume. Começar em 4 peças (2 cards e 2 Reels) por 3 ou 4 semanas e só subir para 5 depois que a produção estiver rodando sem atraso. Regra de variação: os 3 estáticos da semana não podem ser os 3 no mesmo formato de card de frase, senão o alcance cai por fadiga de formato.

### Automação de posts de imagem no Instagram (Make) — FUNCIONANDO desde 2026-07-22

Modelo híbrido: o card é gerado por mim no Canva sob demanda; o Make cuida da planilha e da publicação.

**Cenário oficial: id 5727133**, "Arcavila — Publicar Imagem no Instagram", on-demand, mapeamento dinâmico, validado ponta a ponta duas vezes. Acha sozinho a linha a postar (coluna M preenchida e L vazia), publica no Instagram com a legenda da coluna G e marca L="Sim".

Planilha de pautas: `1OzPF-hzL1fUobfEclh3NCe4PElEoKvih9hKH9Rr4whc`, aba "Untitled". Colunas: F=Tema Arcavila, G=Reflexão 4 frases (legenda), K=Reflexão imagem (texto do card), L=Imagem postada?, M=URL imagem. Índices base-0 no updateRow: K=10, L=11, M=12.

Fluxo operacional de cada post: (1) escolho uma linha NOVA da planilha; (2) gero o card no Canva do molde v2 a partir do tema da coluna F; (3) exporto JPG e escrevo, via Make, a reflexão na K e a URL na M; (4) rodo o cenário 5727133, que publica e marca a L. Lembrete: a URL do Canva expira em ~13h a ~24h, então rodar o cenário no mesmo dia da geração.

Limite do plano Make Free: **máximo 2 cenários ativos** ao mesmo tempo.

Linhas já postadas: LD-20260720-01 (Conquista e gratidão) e PP-20260720-03 (Herança e legado), ambas com L="Sim".

> O histórico completo desta automação (cenários de teste criados e deletados, o bug de mapeamento de colunas do Make e sua causa-raiz, a receita definitiva de montar automação de planilha por API + Browser, capacidades e limites confirmados por teste) foi movido para `referencia/historico-automacoes.md` em 2026-07-25.

---
## Pipeline Pós-Compra (Hotmart → Make → Mailchimp)

> **Verificação 2026-07-05 (via conector do Make):** configuração inicial conferida como correta.
>
> **RESOLVIDO em 2026-07-28.** Dois bugs de configuração corrigidos e confirmados com execução de teste bem-sucedida: (1) o schema de dados do webhook nunca tinha sido finalizado (`hooks_learn_start` fica pendurado sem o `hooks_learn_stop` correspondente) — reaprendido e finalizado, o `data.buyer.email` agora resolve corretamente; (2) o módulo HTTP que chama a Mailchimp API tinha dois parâmetros mal configurados (`method` precisa ser `"post"` minúsculo, não `"POST"`; faltava o parâmetro `followAllRedirects`) — corrigido via `validate_module_configuration` + `scenarios_update`. Os 13 itens antigos da fila do webhook (acumulados desde pelo menos 2026-07-10, todos com corpo de requisição vazio e irrecuperável, capturados antes da correção) foram excluídos manualmente pelo Chiba na interface do Make (fila em `https://us2.make.com/1570507/hooks/2526674/queue`) — exclusão permanente é ação que nem eu nem o Claude Browser executamos, por regra de segurança. Cenário reativado e testado ponta a ponta com sucesso (execução real, tag enviada à Mailchimp API, 698ms).
>
> **Pendência de reconciliação manual:** as 13 notificações descartadas provavelmente correspondem a poucas compras reais de verdade (não 13 distintas — os horários batem com reenvios da Hotmart do mesmo evento), por volta de 10/07 e 27-28/07/2026. Como o payload original é irrecuperável, é preciso conferir o painel de vendas da Hotmart nesse período e taguear manualmente os compradores como `comprou-amor-e-fe` no Mailchimp.
>
> **Evento Purchase via Conversions API (Meta) — CONCLUÍDO em 2026-07-28.** Adicionado um terceiro módulo HTTP no mesmo cenário, que envia o evento `Purchase` para `https://graph.facebook.com/v19.0/2532444597190684/events` a cada compra aprovada (e-mail e telefone do comprador com hash SHA-256, `event_id` = transação Hotmart para deduplicar com o pixel do navegador, valor e moeda da compra). O token de acesso foi gerado e colado pelo próprio Chiba direto no campo do módulo no Make — nunca passou por mim, por regra de segurança. Duas tentativas de teste falharam com o campo do token vazio (Meta retornou `400`, `code 100 / subcode 33` — "objeto não existe ou permissão ausente"); depois do Chiba salvar o token corretamente, o teste seguinte teve resposta `200` do Meta: `{"events_received":1,"messages":[],"fbtrace_id":"..."}` — confirmado funcionando.

| Item | Status | Observação |
|------|--------|-----------|
| Cenário Make.com | **CORRIGIDO e ATIVO, com CAPI (2026-07-28)** | "Arcavila — Hotmart Compra Aprovada" (ID 5549131), agora com 3 módulos: (1) webhook Hotmart, (2) tag `comprou-amor-e-fe` na Mailchimp, (3) evento `Purchase` via Conversions API no Meta. Schema do webhook finalizado e módulo 2 corrigido (method minúsculo + followAllRedirects). Fila antiga (13 itens vazios/irrecuperáveis) limpa manualmente pelo Chiba. Módulos 2 e 3 confirmados funcionando em execução de teste. IDs em `referencia/credenciais-e-ids.md` |
| Webhook Make.com | **Concluído** | URL e ID em `referencia/credenciais-e-ids.md` |
| Webhook Hotmart | **Concluído** | Cadastrado em Ferramentas → Webhook. Nome: "Make.com - Compra Aprovada". Produto: Amor e Fé. Versão 2.0.0. Evento: Compra aprovada. Status: Ativo |
| Reconciliação manual das compras de 10/07 e 27-28/07 | **PENDENTE** | Conferir painel de vendas da Hotmart nesse período e taguear manualmente os compradores como `comprou-amor-e-fe` no Mailchimp, já que o payload original das 13 notificações descartadas era irrecuperável |
| Exit Condition no Journey | **PENDENTE (destravado após 1ª compra)** | Mailchimp desta conta NÃO tem exit criteria nativo. Plano aprovado (2026-07-05): inserir bloco Se/Senão antes de cada e-mail restante (E-mails 1 a 4), checando a tag `comprou-amor-e-fe`; ramo "tem a tag" fica sem etapas (contato sai). Só é possível montar depois que a tag existir (1ª compra a cria). Prompt do Browser Chat já preparado |

---

## Livro 1 (matriz CLOY) — A Mentira que Deus Usou

> Romance cristão original. Autora: Ana Veras. **Bíblia editorial completa (barreira, cenário, final, personagens, tom, estrutura) em `referencia/decisoes-editoriais.md`.** Referência de origem: `livros/a-mentira-que-deus-usou/referencia-pousando-no-amor.md`.

| Item | Status | Observação |
|------|--------|-----------|
| Pesquisa da história de referência | Concluído | Documento `livros/a-mentira-que-deus-usou/referencia-pousando-no-amor.md`, com grade de tradução e diretrizes de originalidade |
| Definições editoriais aprovadas | Concluído em 2026-07-02 | Bíblia completa em `referencia/decisoes-editoriais.md` |
| Título definitivo | Concluído em 2026-07-02 | "A Mentira que Deus Usou" — escolhido entre 10 opções com foco em curiosidade e tensão fé/mentira |
| Manuscrito completo | Concluído em 2026-07-02 | 13 capítulos + epílogo, ~20,3 mil palavras, cliffhanger no fim de cada capítulo. Protagonistas: Helena Vasconcelos e pastor Rafael Antunes. Arquivos em `livros/a-mentira-que-deus-usou/manuscrito/` |
| PDF diagramado | Concluído em 2026-07-02 | `Ebook__A_Mentira_que_Deus_Usou.pdf` — 95 páginas, A5, padrão visual do Amor e Fé. Logo sem fundo na capa e no sumário. Versículo da capa: Cânticos 8:7. Em `livros/a-mentira-que-deus-usou/` |
| Revisão de leitura pelo usuário | **PENDENTE** | Leitura completa do PDF e ajustes de texto |
| Capa ilustrada | **PENDENTE** | Capa atual é tipográfica com logo; produzir arte de capa |
| Landing / funil do novo livro | **PENDENTE** | Definir estratégia de captura e venda (espelhar funil do Amor e Fé) |

---

## Livro 2 (matriz CLOY) — O Médico das Águas

> Segundo romance cristão original, sem repetir transposições do Livro 1. Autora: Ana Veras. **Bíblia editorial completa em `referencia/decisoes-editoriais.md`.** Referência de origem: `livros/o-medico-das-aguas/referencia-pousando-no-amor-livro2.md`.

| Item | Status | Observação |
|------|--------|-----------|
| Documento de referência do Livro 2 | Concluído em 2026-07-02 | `livros/o-medico-das-aguas/referencia-pousando-no-amor-livro2.md` |
| Definições editoriais aprovadas | Concluído em 2026-07-02 | Bíblia completa em `referencia/decisoes-editoriais.md` |
| Estrutura de capítulos | Aprovada em 2026-07-02 | 13 capítulos + epílogo, cliffhanger em cada um |
| Manuscrito completo | Concluído em 2026-07-02 | ~17,3 mil palavras. Arquivos em `livros/o-medico-das-aguas/manuscrito/` |
| Título definitivo | **Concluído em 2026-07-02** | "O Médico das Águas" — escolhido pelo usuário na rodada de títulos com a palavra "médico" |
| PDF diagramado | **Concluído em 2026-07-02** | `Ebook__O_Medico_das_Aguas.pdf` — 81 páginas, A5, padrão visual do catálogo, logo sem fundo na capa e no sumário. Versículo da capa: Isaías 43:2. Em `livros/o-medico-das-aguas/` |
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
| Carta 3 — A carta da Ana | Escrita | Variação (carta de personagem). Ana, de Amor e Fé, escreve para a leitora. Narração em áudio produzida em 2026-07-25 (`criativos/audio/narracao/`) e reel `reel-carta-helena-narrado-v1.mp4` gerado (`criativos/reels/`) |
| Cartas 4 a 5 | **PAUSADO** | Aguardando lançamento da plataforma e primeiros clientes antes de lançar o Clube |
| Sequência no Mailchimp | **PAUSADO** | Idem |
| Lançamento | **PAUSADO** | Clube de Histórias será lançado após oficialização da plataforma e primeiros clientes |

**Nota de limpeza (2026-07-25):** existiam cópias soltas das cartas na raiz do projeto (`clube-de-historias-cadencia-e-calendario.md`, `clube-historias-carta-01/02/03-*.md`), duplicando o que já estava em `clube-de-historias/`. Removidas a pedido do usuário, já que o conteúdo do Clube será reescrito antes do lançamento — a versão oficial é sempre a de dentro de `clube-de-historias/`.

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
| Cenário Arcavila — Hotmart Compra Aprovada | **CORRIGIDO e ATIVO, com CAPI (2026-07-28)** | Webhook recebe Hotmart → (1) HTTP POST Mailchimp API adiciona tag `comprou-amor-e-fe`; (2) HTTP POST evento Purchase na Conversions API do Meta. Schema do webhook e módulo Mailchimp corrigidos; módulo CAPI adicionado e testado com sucesso (Meta retornou `200`, `events_received:1`). Ver "Pipeline Pós-Compra" para detalhe. ID em `referencia/credenciais-e-ids.md` |
| Cenário Arcavila — Publicar Reel no Instagram | **Inativo por padrão; corrigido em 2026-07-25** | ID 5716956, on-demand. NÃO lê a planilha dinamicamente: a URL do vídeo e a legenda são fixas no módulo `CreateAReelPost` e precisam ser editadas a cada reel (hoje apontam para o reel da Victoria). Fluxo de publicação: subir o mp4 para `reels/` no GitHub via terminal, editar URL+legenda no módulo, ativar, rodar, desativar. A trava de segurança (filtro `SEM-CORRESPONDENCIA-TRAVA-DE-SEGURANCA` na coluna A) foi corrigida em 2026-07-25: antes ela não impedia os módulos seguintes de rodarem (o `updateRow` quebrava com linha undefined — erro da execução de 2026-07-25 15:48); agora os módulos 2 e 3 têm filtro próprio exigindo `__ROW_NUMBER__` do passo 1. Publicou o reel da Victoria em 2026-07-25. Ver cenário irmão de imagens (5727133) |
| Limite do plano Free | **Nota** | Máximo 2 cenários ativos e 1000 operações/mês — gerenciar quais cenários ficam ligados por vez |

---

## Serviços Pagos

| Serviço | Modelo | Conta / Observação |
|---------|--------|-------------------|
| Zoho Mail | Anual | Mail Lite, 1 licença. Conta gerenciadora: `caiochiba4@gmail.com` |
| Registro.br — `arcavila.com.br` | Anuidade de domínio | Domínio .com.br registrado no Registro.br |
| Hotmart | Comissão por venda (~9,9% + R$1) | Login: `suporte@arcavila.online`. Sem mensalidade |
| Mailchimp | Free até 500 contatos | Monitorar crescimento da lista para antecipar upgrade |
| Cloudflare Pages | Free tier | Hospedagem dos 4 sites do projeto |
| Make.com | Free tier (2 cenários ativos) | Cenário Hotmart → Mailchimp + Meta CAPI pós-compra corrigido e ativo desde 2026-07-28 (ver "Pipeline Pós-Compra"). O de Publicar Reel (5716956) fica desativado entre publicações desde 2026-07-25 (é on-demand; ativar só na hora de rodar) |
| GitHub | Free (repo público) | `maioemico/arcavila-teste` |
| Canva | Trial de resize esgotado (0 usos) | Resize 9:16 já usado nos criativos 1 e 3. Pipeline de cards de Instagram (molde v2) não depende do resize |
| PostHog | Free (1M eventos/mês) | Analytics do site, ver seção "Analytics de Site (PostHog)" |
| AllVoiceLab | Ver plano na conta | Substituído pelo Higgsfield na narração de reels novos em 2026-07-25; manter como fallback (voz Rachel) |
| Higgsfield | Assinatura paga (conta ativa) | Narração de reels (voz Nora, ElevenLabs) desde 2026-07-25; retratos e clipes de vídeo (Soul/Seedance) para anúncios |
| Meta Ads | Por investimento | Primeira campanha publicada em 2026-07-28: "Amor e Fé — Vídeo Stories — Teste 2026-07-28", R$ 5,12/dia, ativa e com gasto real confirmado. Ver seção "Tráfego Pago — Criativos" |

---

## Referências (pasta `referencia/`)

- `referencia/credenciais-e-ids.md` — IDs, URLs, tokens, DNS/TXT, designs do Canva.
- `referencia/deploy-e-git.md` — workflow de deploy, SSH, lições aprendidas de git e Canva, e o Protocolo de Sincronização Segura.
- `referencia/decisoes-editoriais.md` — bíblia editorial dos Livros 1 e 2 e decisões fixas do Clube.
- `referencia/historico-layout.md` — histórico das mudanças de layout já concluídas (separado daqui em 2026-07-25).
- `referencia/historico-automacoes.md` — narração AllVoiceLab (fallback) e histórico da automação de imagens no Make (separado daqui em 2026-07-25).
