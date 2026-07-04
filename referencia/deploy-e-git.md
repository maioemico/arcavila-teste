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

Regra fixa: após qualquer push do Cowork via MCP, rodar `git pull origin main --no-rebase` antes do próximo push pelo terminal.

---

## SSH

Configurado em 2026-06-24: chave `~/.ssh/id_ed25519` cadastrada no GitHub (conta `maioemico`, título "Mac Air Caio"). Repositório local em `~/Claude/Projects/Arcavila` já inicializado com remote `git@github.com:maioemico/arcavila-teste.git`.

---

## Lições aprendidas (NÃO repetir os erros)

**Arquivos grandes com push_files vazio:** nunca usar `mcp__github__push_files` com `content: ""` para arquivos grandes. Isso apaga o conteúdo. Para `index.html`, sempre usar o terminal local.

**Pull travado por arquivo não rastreado (2026-07-02):** se `git pull` abortar com "untracked working tree files would be overwritten by merge", mover o arquivo em questão para fora (`mv arquivo /tmp/`), rodar `git pull origin main --no-rebase --no-edit` e depois `git push origin main`.

**index.lock travando o git (2026-07-03):** se o git acusar `Unable to create '.git/index.lock': File exists` (pode sobrar de um processo interrompido), rodar `rm -f .git/index.lock` na raiz do repo e repetir o comando.

---

## Assets do Canva via GitHub

O Canva só importa imagem a partir de URL pública. Fluxo usado: gerar o PNG na pasta `assets/`, push pelo terminal, e usar a URL `raw.githubusercontent.com/maioemico/arcavila-teste/main/assets/<arquivo>` no upload do Canva.

Assets publicados: `logoarcavila-semfundo.png`, `assets/btn-continue-leitura.png`, `assets/btn-quero-ler.png`, `assets/capa-amor-e-fe.png`, `assets/capa-angulo.png` (descartado), `assets/faixa-cena1.png`, `assets/faixa-cena2.png`, `assets/bg-criativo2.png`, `assets/dark-bg.png`.

Limitações do editor do Canva via MCP: só insere imagem/vídeo (não cria texto nem forma nova); elemento inserido sempre vai para o topo (z-order); página responsiva não aceita insert/position. Duplicar design = `copy-design`; redimensionar = `resize-design` (**trial esgotado em 2026-07-03**, 0 usos restantes).
