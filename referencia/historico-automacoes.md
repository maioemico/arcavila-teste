# Histórico de Automações e Narração

> Separado do `STATUS.md` em 2026-07-25 para manter aquele arquivo dentro do limite de tamanho das ferramentas de edição. Conteúdo estável, de consulta pontual: o fluxo de narração AllVoiceLab (superado pelo Higgsfield, mantido como fallback) e o histórico de depuração da automação de imagens no Make (já resolvida e funcionando). O estado vivo de ambos continua no `STATUS.md`.

---

## 1. Narração (AllVoiceLab) — fluxo antigo, superado em 2026-07-25

MCP AllVoiceLab conectado. Voz oficial do projeto: **Rachel**, `voice_id 280801072249831431`, modelo `tts-multilingual`. Não trocar sem aprovação. Descartadas por soarem jovens demais: "Inspirational Girl" e "Instructor Lady". Contexto completo no Drive: `contexto-voz-narracao-arcavila.md`.

Tratamento obrigatório, aplicar sempre sem o usuário pedir: `ffmpeg -y -i entrada.mp3 -filter:a "atempo=0.8" -b:a 192k saida.mp3`.

Dois ajustes ao fluxo documentado, descobertos ao rodar a primeira narração:

1. **Não é mais preciso arrastar o arquivo para o chat.** Passando `output_dir` como `/Users/mac/Claude/Projects/Arcavila/criativos/audio/narracao`, o mp3 cai direto na pasta certa, que o sandbox enxerga. O fluxo antigo mandava salvar no Desktop e pedir upload manual.
2. **O comando ffmpeg documentado degradava o áudio.** Sem `-b:a`, o ffmpeg recodificava de 261 kbps para 67 kbps. O `-b:a 192k` acima corrige isso.

**Pipeline de Reels narrado validado ponta a ponta em 2026-07-19.** Primeira peça: `reel-regina-narrado-v1.mp4` (hoje em `criativos/reels/`), 1080x1920, 30 fps, 29,1s. Etapas: gerar cada frase separada no AllVoiceLab → `silenceremove` nas pontas → `atempo` por frase conforme o mapa emocional → concatenar com silêncios medidos → mixar ambiência com `sidechaincompress` (ducking) → ajustar ao tamanho do vídeo → juntar com `-c:v copy`, sem recodificar o vídeo.

Mapa emocional padrão, sempre a partir de 0,8 como teto: montagem 0,80, desenvolvimento 0,78, virada 0,73, revelação 0,65. Frase final muito longa (acima de ~25 palavras) fica em 0,70, senão arrasta. Pausas: 0,5s entre frases comuns e 1,1s antes da revelação.

Receita de mixagem: ambiência a **-15 dB**, lead-in de 1,0s antes da voz, cauda de 1,5 a 2,0s com fade, `sidechaincompress` threshold 0.04 ratio 5 attack 15 release 350, `alimiter` no fim. Trilha de referência aprovada: "Daytime Forrest Bonfire".

Limitação encontrada em 2026-07-18: o parâmetro `speed` do `text_to_speech` **só aceita número inteiro**, apesar da documentação da ferramenta dizer que o intervalo é [0.5, 1.5]. Passar 0.6 dá erro de validação. Consequência: todo ajuste fino de velocidade tem que ser feito no ffmpeg via `atempo`, que além de funcionar dá controle mais fino.

Pendência de segurança herdada do contexto: a API key do AllVoiceLab foi exposta em texto no chat de instalação. Gerar nova key em allvoicelab.com/workbench/api-keys e atualizar o `claude_desktop_config.json` se ainda não foi feito.

**Segundo reel narrado concluído em 2026-07-25:** `reel-carta-helena-narrado-v1.mp4` (Carta 3 do Clube, "A carta da Ana" / Helena), hoje em `criativos/reels/`. Narração gerada em `criativos/audio/narracao/` (frase1 a frase4 + título). Pasta de build temporário (`_reel_build/`, com frames, wav intermediários e o mp4 final duplicado) foi removida após a reorganização de pastas, já que o resultado final já está preservado em `criativos/reels/`.

---

## 2. Automação de imagens no Instagram (Make) — histórico de construção e depuração

Modelo híbrido (opção escolhida pelo Chiba): o card é gerado por mim no Canva sob demanda; o Make cuida da planilha e da publicação.

Cenário criado: **"Arcavila — Publicar Imagem no Instagram"** (id 5724924), on-demand, desligado até validação visual no Make. Fluxo: filterRows (coluna M preenchida E coluna L vazia) → instagram-business:CreatePostPhoto (image_url = coluna M, caption = coluna G + site + hashtags, accountId 17841449774005730, conexão Facebook 10021614) → updateRow (coluna L = "Sim", índice 11 base-0). Espelha o cenário de Reels 5716956, que já funciona.

Planilha de pautas: `1OzPF-hzL1fUobfEclh3NCe4PElEoKvih9hKH9Rr4whc`, aba "Untitled". Colunas: F=Tema Arcavila, G=Reflexão 4 frases (legenda), K=Reflexão imagem (texto do card), L=Imagem postada?, M=URL imagem (a criar). Índices base-0 no updateRow: K=10, L=11, M=12.

**Capacidades reais confirmadas por teste em 2026-07-21:**

1. **EU CONSIGO escrever na planilha** rodando um scenario Make com google-sheets:updateRow. Testado: escrevi a reflexão da linha LD-20260720-01 na coluna K. Portanto posso preencher K, M e L via Make. (A ferramenta de Google Drive que tenho só lê/cria arquivos, não edita células — por isso a escrita passa pelo Make.)
2. **EU NÃO CONSIGO baixar os bytes da imagem exportada do Canva** no meu ambiente: o proxy do sandbox bloqueia saída externa (curl retorna `403 from proxy after CONNECT`). Mas não preciso: o módulo do Instagram baixa a `image_url` no lado do servidor na hora de publicar.
3. **URL do Canva é temporária** (~24h, header X-Amz-Expires). Para postar no mesmo dia serve direto na coluna M. Para permanência, adicionar passo no Make: HTTP baixa a imagem → github push → usa a raw URL.
4. **Único passo não automatizável em Make: a criação do card** (edição no Canva depende de mim ou de plano Enterprise). Todo o resto (escrever K/M, publicar, marcar L) roda no Make.

Cenário de teste "Escrever Reflexão (teste)" (id 5726450) foi criado, usado para provar a escrita e **deletado** em seguida.

**TESTE DE PONTA A PONTA — sucesso em 2026-07-22.** Primeiro post automático publicado: linha LD-20260720-01 ("Conquista e gratidão"). Card gerado do molde v2 (foto de picos ao amanhecer, Unsplash), reflexão "Toda bênção que chega tem um remetente. | Não esqueça o Autor." gravada na K, URL na M, publicado no Instagram e coluna L marcada "Sim" — tudo via Make. Cenário usado: "Publicar Imagem (teste fixo)" id 5727071 (desativado após o teste).

**Bug em aberto a resolver na próxima sessão:** o cenário que lê a coluna dinamicamente (filterRows → pega URL e legenda da linha) falha com "image_url required". Testei referência por letra (`{{1.M}}`), por nome de cabeçalho (`{{1.\`URL imagem\`}}`) e com includesHeaders true/false — nenhuma resolveu o valor da coluna. O token interno do Make para o valor da coluna do filterRows não bate com esses formatos e não dá para descobrir às cegas por API. **Solução:** abrir o cenário na interface do Make e remapear os campos image_url e caption clicando nas colunas no dropdown, o que fixa o token correto. O teste fixo (URL e legenda hardcoded) provou que a publicação e a marcação da L funcionam; só falta o mapeamento dinâmico. Header "URL imagem" foi adicionado na M1 da planilha.

Limite do plano Make Free: **máximo 2 cenários ativos** ao mesmo tempo. Precisei desativar/deletar cenários auxiliares durante o teste para caber.

**Bug de mapeamento RESOLVIDO em 2026-07-22.** Causa-raiz (achada pelo Browser inspecionando o DOM): referências a colunas de Google Sheets criadas por API entram no Make com classe "unknown" e não resolvem, porque o Make só valida e só lista as colunas no menu **depois que o módulo de leitura roda uma vez e gera amostra**. Além disso, o formato correto do token NÃO é letra nem nome de cabeçalho: é o **índice numérico da coluna (base 0) entre crases** — `{{1.\`12\`}}` para a coluna M (URL imagem) e `{{1.\`6\`}}` para a coluna G (Reflexao 4 frases). Confirmado no blueprint salvo (cenário 5727133) e na amostra gravada.

Receita definitiva para montar automação de planilha no Make por API + Browser: (1) crio o esqueleto por API; (2) Browser roda "Run this module only" no módulo de leitura (só lê, não publica) para gerar a amostra; (3) Browser remapeia os campos clicando nas colunas no menu, agora povoado; (4) salva. Token final = índice base-0 da coluna entre crases.

**Cenário de publicação de imagem PRONTO E VALIDADO PONTA A PONTA (2026-07-22):** id 5727133, "Arcavila — Publicar Imagem no Instagram", on-demand, mapeamento dinâmico. Segunda validação completa com card novo e URL fresca: linha PP-20260720-03 ("Herança e legado", card de campo de trigo, frase "Tem uma fé que te ensinaram em silêncio. / Agora ela é sua."). O cenário achou a linha sozinho (M preenchida, L vazia), publicou no Instagram com a legenda da coluna G e marcou L "Sim" — 100% dinâmico, nada hardcoded. **A automação está funcionando.**

Fluxo operacional confirmado para cada post: (1) eu escolho uma linha NOVA da planilha; (2) gero o card no Canva do molde v2 a partir do tema da coluna F; (3) exporto JPG e escrevo, via Make, a reflexão na K e a URL na M da linha; (4) rodo o cenário 5727133, que publica e marca a L. Lembrete: a URL do Canva expira em ~13h a ~24h, então rodar o cenário no mesmo dia da geração.

Linhas já postadas no teste: LD-20260720-01 (Conquista e gratidão) e PP-20260720-03 (Herança e legado). Ambas com L="Sim".

Estado da planilha após os testes: linha LD-20260720-01 com L="Sim" (post do teste está publicado no Instagram), M com URL do Canva já expirada, K com a reflexão. Cabeçalho "URL imagem" na M1.

---
