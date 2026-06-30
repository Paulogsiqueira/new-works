// ===== Menu mobile =====
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
toggle?.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
links?.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => links.classList.remove('open'))
);

// ===== Ano no rodapé =====
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// ===== Portfólio: modelos prontos =====
const BASE = 'https://paulogsiqueira.github.io/';
const projects = [
  { repo: 'template-padaria',          nome: 'Pão Dourado',          area: 'Padaria & Cafeteria',   cor: '#c8842b' },
  { repo: 'template-restaurante',      nome: 'Sabor & Arte',         area: 'Restaurante',           cor: '#c89b54' },
  { repo: 'template-barbearia',        nome: 'Navalha & Co',         area: 'Barbearia',             cor: '#c9a24a' },
  { repo: 'template-salao',            nome: 'Studio Bella',         area: 'Salão de Beleza',       cor: '#c9748a' },
  { repo: 'template-clinica',          nome: 'Clínica Vida+',        area: 'Clínica Médica',        cor: '#1ba0a8' },
  { repo: 'template-petshop',          nome: 'Mundo Pet',            area: 'Pet Shop & Vet',        cor: '#14b8a6' },
  { repo: 'template-academia',         nome: 'Power Gym',            area: 'Academia',              cor: '#b9e60a' },
  { repo: 'template-personal-trainer', nome: 'Felipe Costa',         area: 'Personal Trainer',      cor: '#7bc70a' },
  { repo: 'template-oficina',          nome: 'AutoMec',              area: 'Oficina Mecânica',      cor: '#ff6b1a' },
  { repo: 'template-advocacia',        nome: 'Almeida & Associados', area: 'Advocacia',             cor: '#b08a3e' },
  { repo: 'template-arquitetura',      nome: 'Studio Arq',           area: 'Arquitetura',           cor: '#9aa3b2' },
  { repo: 'template-marcenaria',       nome: 'João Silva',           area: 'Móveis Planejados',     cor: '#b08a5e' },
];

const PREVIEW_W = 1280; // largura "virtual" do site dentro do iframe
const grid = document.getElementById('workGrid');

if (grid) {
  projects.forEach((p) => {
    const url = BASE + p.repo + '/';
    const card = document.createElement('article');
    card.className = 'work';
    card.style.setProperty('--c', p.cor);
    card.innerHTML = `
      <div class="work-preview">
        <span class="ph">carregando preview…</span>
        <iframe data-src="${url}" title="Prévia do site ${p.nome}" loading="lazy" scrolling="no" tabindex="-1" aria-hidden="true"></iframe>
        <a class="work-overlay" href="${url}" target="_blank" rel="noopener"><span>Ver site ao vivo →</span></a>
      </div>
      <div class="work-meta">
        <div>
          <h3>${p.nome}</h3>
          <span class="work-tag">${p.area}</span>
        </div>
        <a class="work-code" href="https://github.com/Paulogsiqueira/${p.repo}" target="_blank" rel="noopener" aria-label="Ver código de ${p.nome}">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-1.8c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z"/></svg>
        </a>
      </div>`;
    grid.appendChild(card);
  });

  // Escala cada iframe para caber na largura do card
  const fit = (preview) => {
    const iframe = preview.querySelector('iframe');
    if (!iframe) return;
    const scale = preview.clientWidth / PREVIEW_W;
    iframe.style.width = PREVIEW_W + 'px';
    iframe.style.height = Math.ceil(preview.clientHeight / scale) + 'px';
    iframe.style.transform = 'scale(' + scale + ')';
  };

  const previews = Array.from(grid.querySelectorAll('.work-preview'));

  // Carrega o iframe só quando o card se aproxima da tela
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const preview = entry.target;
      const iframe = preview.querySelector('iframe');
      fit(preview);
      if (iframe && !iframe.src && iframe.dataset.src) {
        iframe.src = iframe.dataset.src;
        iframe.addEventListener('load', () => {
          const ph = preview.querySelector('.ph');
          if (ph) ph.remove();
          fit(preview);
        });
      }
      obs.unobserve(preview);
    });
  }, { rootMargin: '300px' });

  previews.forEach((p) => io.observe(p));

  // Reajusta no redimensionamento
  let t;
  window.addEventListener('resize', () => {
    clearTimeout(t);
    t = setTimeout(() => previews.forEach(fit), 150);
  });
}
