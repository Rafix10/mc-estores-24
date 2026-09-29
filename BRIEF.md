# MC Estores — projeto mínimo

Landing page one-page em React, TypeScript, Vite, Tailwind CSS 4 e Framer Motion.
O build usa `vite-plugin-singlefile` e gera apenas `dist/index.html`.

## Ficheiros importantes

- `src/App.tsx` — conteúdo, componentes, animações e todas as secções.
- `src/index.css` — estilos, responsividade e animações CSS.
- `src/assets/repair-estores.jpg` — imagem local da reparação, importada com `?inline`.
- `index.html` — SEO, Open Graph, favicon e JSON-LD.

## Dados editáveis

No topo de `src/App.tsx`: telefone, WhatsApp, logótipo, serviços, galeria, processo, testemunhos, FAQ e textos da faixa 24h.

## Notas

- Não colocar imagens em `public/`; o singlefile não as embute. Imagens locais devem ser importadas de `src/assets` com `?inline`.
- Logótipo principal: `https://i.imgur.com/Qzs0t5f.png`.
- Logótipo branco do footer e menu móvel: `https://i.imgur.com/RA1eHjq.png`.
- Telefone e WhatsApp: `965 285 851`.
- Depois de alterar, executar `npm run build`.
