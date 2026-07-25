# Deploy e Git — Arcavila

> Arquivo de referência. Extraído do STATUS.md em 2026-07-04.
> Abrir antes de fazer push, deploy, subir asset para o Canva, ou quando o git der erro.
> O resumo do workflow continua no STATUS.md na raiz do repositório.

---

## Workflow de deploy (prático)

Ferramentas em uso:
- **Cowork** (claude.ai desktop): conversa, planejamento, previews, decisões.
- **Terminal local** (`~/Claude/Projects/Arcavila`): git add/commit/push de arquivos grandes como `index.html`.

Como funciona na prática:
1. Planejamos e decidimos no Cowork.
2. O Cowork edita os arquivos localmente e passa o comando de commit/push para o usuário rodar no terminal.
3. Para o STATUS.md e arquivos pequenos: o Cowork atualiza via GitHub MCP direto.

---

## Protocolo de Sincronização Segura (definido em 2026-07-25)

> Criado depois de um incidente real: um `git stash drop` (em vez de `git stash pop`) quase apagou toda a reorganização de pastas local, porque o stash tinha sido feito com `-u` (inclui arquivos não rastreados) e "drop" descarta sem reaplicar. Os arquivos só foram recuperados porque o objeto ainda estava solto no `.git` (não coletado pelo `git gc`) e o hash do stash apareceu na própria saída do comando anterior.

**Regra de ouro:** nunca misturar, na mesma janela de trabalho, edição de um arquivo já versionado direto na pasta local (Cowork) **e** publicação do mesmo arquivo via GitHub MCP, sem sincronizar entre os dois antes de continuar. Escolher uma direção por bloco de trabalho:
- Ou o Cowork só publica via GitHub MCP (arquivos pequenos de texto) e não toca a cópia local do mesmo arquivo — assim o próximo `git pull` local é um fast-forward limpo, sem conflito.
- Ou o trabalho é feito e commitado no terminal local, e empurrado de lá (arquivos grandes/binários).

**Checklist antes de qualquer `git pull` no terminal:**
1. Rodar `git status`.
2. Se aparecerem só pastas/arquivos **não rastreados** esperados (`criativos/`, `docs/`, `scripts/`, `arquivo/`, `livros/*`, `previews/*` e outros drafts) — são material que fica de propósito fora do git. Seguro seguir direto para `git pull origin main --no-rebase`.
3. Se aparecer "Your local changes to `<arquivo>` would be overwritten" num arquivo **já rastreado** (ex.: STATUS.md) — não usar stash direto. Primeiro comparar com `git diff <arquivo>`. Se o conteúdo local for idêntico ao que está chegando do GitHub, descartar com `git checkout -- <arquivo>` e então puxar. Se for diferente, é uma edição real ainda não publicada — decidir se commita ou descarta antes de prosseguir.
4. **Só usar `git stash` se o passo 3 não resolver** (vários arquivos rastreados e não rastreados misturados no mesmo pull travado). Nesse caso: `git stash -u`, depois `git pull origin main --no-rebase`, e depois **sempre `git stash pop`** — nunca `git stash drop`. `pop` reaplica as mudanças e remove o stash da lista; `drop` só remove a referência **sem reaplicar nada**, descartando o conteúdo. Só usar `drop` depois de confirmar, via `git status`/`git diff`, que o conteúdo do stash já está redundante com o que veio do pull.
5. Se um stash já foi perdido da lista (`drop` usado por engano) e o objeto ainda não foi coletado pelo `git gc`, recuperação de emergência: `git stash apply <hash-do-commit-do-stash>` (o hash aparece na própria saída do comando `drop`, ou pode ser buscado com `git fsck --unreachable | grep commit`). Fazer isso o quanto antes — depois de um `git gc`, o objeto pode não existir mais.

**Script auxiliar:** `scripts/git-pull-seguro.sh` (arquivo local, fora do git) automatiza os passos 1 e 2 — verifica se há mudança pendente em arquivo rastreado antes de puxar; se houver, para e avisa em vez de arriscar um stash automático. Preferir `bash scripts/git-pull-seguro.sh` a um `git pull` direto sempre que houver dúvida sobre o estado do repositório.

---

## SSH

Configurado em 2026-06-24: chave `~/.ssh/id_ed25519` cadastrada no GitHub (conta `maioemico`, título "Mac Air Caio"). Repositório local em `~/Claude/Projects/Arcavila` já inicializado com remote `git@github.com:maioemico/arcavila-teste.git`.

---

## Lições aprendidas (NÃO repetir os erros)

**Arquivos grandes com push_files vazio:** nunca usar `mcp__github__push_files` com `content: ""` para arquivos grandes. Isso apaga o conteúdo. Para `index.html`, sempre usar o terminal local.

**Pull travado por arquivo não rastreado (2026-07-02):** se `git pull` abortar com "untracked working tree files would be overwritten by merge", mover o arquivo em questão para fora (`mv arquivo /tmp/`), rodar `git pull origin main --no-rebase --no-edit` e depois `git push origin main`.

**index.lock travando o git (2026-07-03):** se o git acusar `Unable to create '.git/index.lock': File exists` (pode sobrar de um processo interrompido), rodar `rm -f .git/index.lock` na raiz do repo e repetir o comando.

**Imagens/binários não vão pelo GitHub MCP (2026-07-07):** `mcp__github__create_or_update_file` e `push_files` tratam o parâmetro `content` como texto e o codificam em base64 por conta própria. Se o Cowork já manda o conteúdo pré-codificado em base64 (tentativa de subir JPEG/PNG), o resultado é um arquivo corrompido (base64 codificado duas vezes). Testado e confirmado em 2026-07-07 com `anaepedro/_test_pedro.jpg`. Regra: qualquer imagem (fotos, JPEG, PNG) sempre vai pelo terminal local, nunca pelo GitHub MCP.

**Imagens do projeto `arcavila-anaepedro` (amorefe.arcavila.com.br) somem no deploy (2026-07-07):** mesmo com `anaepedro/ana.jpg` e `anaepedro/pedro.jpg` corretos e commitados no GitHub, a página ao vivo (`amorefe.arcavila.com.br/ana.jpg` e também direto em `arcavila-anaepedro.pages.dev/ana.jpg`) não servia a imagem — caía de volta no HTML da página (fallback tipo SPA). Suspeita: o build do Cloudflare Pages desse projeto provavelmente recria/limpa a pasta `anaepedro/` ao copiar `landing-sprites-ana-pedro.html` para `anaepedro/index.html`, apagando as imagens junto. Não há acesso ao painel do Cloudflare para confirmar ou ajustar o build command. **Solução aplicada:** embutir as fotos como base64 direto no `<img src="data:image/jpeg;base64,...">` dentro do `landing-sprites-ana-pedro.html`, igual já é feito com a capa do catálogo em `index.html`. Assim a imagem viaja junto com o HTML e não depende de arquivo estático separado sobrevivendo ao build. Regra: para este projeto especificamente, preferir sempre embutir fotos pequenas (até ~200KB) como base64 no HTML em vez de arquivo `.jpg` separado em `anaepedro/`.

**Pull travado por arquivo já publicado via MCP (2026-07-07):** quando o Cowork edita um arquivo direto na pasta local (Edit tool, pasta com bind mount) e também publica o mesmo conteúdo via GitHub MCP, o git local não sabe que os dois são idênticos — ele vê "mudança local não commitada" e o `git pull` aborta com "Your local changes... would be overwritten by merge". Solução: comparar o conteúdo local com o do GitHub (`git hash-object <arquivo>` local vs. o SHA do blob retornado por `get_file_contents`); se forem iguais, é seguro descartar a cópia local com `git checkout -- <arquivo>` antes do `git pull`. Se forem diferentes, investigar antes de descartar — pode ser uma mudança real ainda não publicada (aconteceu com `Ebook__Amor_e_Fe.pdf`: a troca de capa de 2026-07-06 tinha sido editada localmente mas nunca chegou a ser commitada). **Desde 2026-07-25, a forma padrão de evitar isso é simplesmente não editar a cópia local quando o mesmo arquivo for publicado via MCP no mesmo bloco de trabalho — ver "Protocolo de Sincronização Segura" acima.**

**`git stash drop` apaga sem reaplicar (2026-07-25):** ver "Protocolo de Sincronização Segura" acima. O comando certo para recuperar um stash é `git stash pop` (reaplica e remove da lista). `git stash apply <hash>` também reaplica mas mantém o stash na lista — útil para recuperação de emergência quando o stash já foi perdido via `drop`, usando o hash do commit (aparece na saída do próprio comando `drop`, ou via `git fsck --unreachable`). `drop` sozinho é destrutivo: remove a referência sem reaplicar nada. Quase causou perda de toda a reorganização de pastas local desta sessão (recuperado a tempo, ver STATUS.md).

---

## Assets do Canva via GitHub

O Canva só importa imagem a partir de URL pública. Fluxo usado: gerar o PNG na pasta `assets/`, push pelo terminal, e usar a URL `raw.githubusercontent.com/maioemico/arcavila-teste/main/assets/<arquivo>` no upload do Canva.

Assets publicados: `logoarcavila-semfundo.png`, `assets/btn-continue-leitura.png`, `assets/btn-quero-ler.png`, `assets/capa-amor-e-fe.png`, `assets/capa-angulo.png` (descartado), `assets/faixa-cena1.png`, `assets/faixa-cena2.png`, `assets/bg-criativo2.png`, `assets/dark-bg.png`.

Limitações do editor do Canva via MCP: só insere imagem/vídeo (não cria texto nem forma nova); elemento inserido sempre vai para o topo (z-order); página responsiva não aceita insert/position. Duplicar design = `copy-design`; redimensionar = `resize-design` (**trial esgotado em 2026-07-03**, 0 usos restantes).
