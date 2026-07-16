# New Works Desenvolvimento — Site institucional

Site da **New Works Desenvolvimento**, empresa de software que oferece criação de sites e landing pages para qualquer segmento, desenvolvimento de software sob medida e automações com RPA.

**Demo ao vivo:** https://paulogsiqueira.github.io/new-works/ _(GitHub Pages)_
**Domínio próprio:** `newworks.com.br` — registrado no registro.br, pendente de apontamento de DNS.

## Destaques
- Single page responsiva (mobile-first), sem build — HTML5 + CSS3 + JavaScript puro
- Tema dark moderno com gradiente índigo→ciano e cards em vidro
- Logo próprio (monograma NW em SVG com gradiente) e favicon
- **Portfólio com prévia ao vivo**: cada modelo de site é exibido em um `iframe` real (carregado sob demanda e escalonado), com link para a demo ao vivo
- Animações: reveal ao rolar, contadores no hero, chips de tecnologia com hover e símbolo de infinito com energia em movimento (todas respeitam `prefers-reduced-motion`)
- Seções: hero, serviços, portfólio, sistemas fullstack, processo, diferenciais e contato

## Portfólio
A grade de portfólio é gerada por JavaScript a partir do array `projects` em `script.js`, que aponta para os modelos publicados em `https://paulogsiqueira.github.io/template-*`. Para adicionar/remover um modelo, basta editar esse array.

## Estrutura
```
index.html    · marcação e conteúdo
styles.css    · estilos, paleta e componentes
script.js     · menu, portfólio dinâmico, previews em iframe e animações
favicon.svg   · logo da New Works (monograma NW)
```

---
Imagens dos modelos via [Unsplash](https://unsplash.com).
