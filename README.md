# Catálogo por Variante — PWA

Ferramenta para gerar catálogos de tecido com uma variante de cor por página, a partir de books PDF de fornecedores.

## Como publicar no GitHub Pages

### Opção A — Repositório dedicado (mais simples)

1. Crie um repositório novo no GitHub, ex: `catalogo-variante`
2. Faça upload de todos estes arquivos para a raiz do repositório:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `icon-192.png`
   - `icon-512.png`
3. Vá em **Settings → Pages → Source: Deploy from branch → main / root**
4. Aguarde ~1 minuto e acesse: `https://seu-usuario.github.io/catalogo-variante/`

### Opção B — Dentro do Estoque Beta existente

1. Crie uma pasta `catalogo/` dentro do repositório ESTOQUE-BETA
2. Copie todos os arquivos para dentro de `catalogo/`
3. No `sw.js`, o `start_url` e os paths do cache já funcionam relativos à pasta
4. Acesse: `https://leonardogj62.github.io/ESTOQUE-BETA/catalogo/`

## Como instalar no celular (após publicar)

### iPhone (Safari):
1. Abra a URL no Safari
2. Toque no botão de compartilhar (quadrado com seta)
3. Toque em **"Adicionar à Tela de Início"**
4. O app aparece com ícone e abre em tela cheia (sem barra do Safari)

### Android (Chrome):
1. Abra a URL no Chrome
2. Chrome mostra automaticamente um banner "Instalar app"
3. Ou toque nos 3 pontinhos → **"Adicionar à tela inicial"**

## Atualizar o app

Quando fizer mudanças no `index.html`:
1. Suba o arquivo atualizado para o GitHub
2. No `sw.js`, mude `CACHE_NAME = 'catalogo-v1'` para `'catalogo-v2'` (ou qualquer versão nova)
3. Isso força os celulares a baixar a versão nova na próxima visita

## Estrutura de arquivos

```
index.html      — app principal
manifest.json   — configuração do PWA (nome, ícone, cores)
sw.js           — service worker (cache offline)
icon-192.png    — ícone para Android / tela inicial
icon-512.png    — ícone de alta resolução / splash screen
```
