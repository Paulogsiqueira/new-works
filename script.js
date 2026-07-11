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
  { repo: 'template-psicologo',        nome: 'Espaço Acolher',       area: 'Psicólogo',             cor: '#7a9b86' },
  { repo: 'template-nutricionista',    nome: 'NutriVida',            area: 'Nutricionista',         cor: '#3aa860' },
  { repo: 'template-energia-solar',    nome: 'SolarUp',              area: 'Energia Solar',         cor: '#f7b529' },
  { repo: 'template-dentista',         nome: 'OdontoVita',           area: 'Dentista',              cor: '#1aa6c4' },
  { repo: 'template-casamento',        nome: 'João & Maria',         area: 'Casamento',             cor: '#c99a8c' },
  { repo: 'template-curso-online',     nome: 'Método Acelera',       area: 'Curso Online',          cor: '#ff6a3d' },
  { repo: 'template-hamburgueria',     nome: 'Brasa Burger',         area: 'Hamburgueria',          cor: '#e8471f' },
  { repo: 'template-fotografo',        nome: 'Studio Lente',         area: 'Fotografia',            cor: '#1a1a1a' },
];

const PREVIEW_W = 1280; // largura "virtual" do site dentro do iframe
const grid = document.getElementById('workGrid');

if (grid) {
  const PER_PAGE = 6;
  const totalPages = Math.ceil(projects.length / PER_PAGE);
  let page = 0;
  let previews = [];
  let io = null;

  const fit = (preview) => {
    const iframe = preview.querySelector('iframe');
    if (!iframe) return;
    const scale = preview.clientWidth / PREVIEW_W;
    iframe.style.width = PREVIEW_W + 'px';
    iframe.style.height = Math.ceil(preview.clientHeight / scale) + 'px';
    iframe.style.transform = 'scale(' + scale + ')';
  };

  const cardHTML = (p) => {
    const url = BASE + p.repo + '/';
    return `<article class="work" style="--c:${p.cor}">
      <div class="work-preview">
        <span class="ph">carregando preview…</span>
        <iframe data-src="${url}" title="Prévia do site ${p.nome}" loading="lazy" scrolling="no" tabindex="-1" aria-hidden="true"></iframe>
        <a class="work-overlay" href="${url}" target="_blank" rel="noopener"><span>Ver site ao vivo →</span></a>
      </div>
      <div class="work-meta">
        <div><h3>${p.nome}</h3><span class="work-tag">${p.area}</span></div>
      </div>
    </article>`;
  };

  function renderPage() {
    const items = projects.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);
    grid.innerHTML = items.map(cardHTML).join('');
    if (io) io.disconnect();
    previews = Array.from(grid.querySelectorAll('.work-preview'));
    io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const preview = entry.target;
        const iframe = preview.querySelector('iframe');
        fit(preview);
        if (iframe && !iframe.src && iframe.dataset.src) {
          iframe.src = iframe.dataset.src;
          iframe.addEventListener('load', () => { const ph = preview.querySelector('.ph'); if (ph) ph.remove(); fit(preview); });
        }
        obs.unobserve(preview);
      });
    }, { rootMargin: '300px' });
    previews.forEach((p) => io.observe(p));
    renderPager();
  }

  function renderPager() {
    const pager = document.getElementById('workPager');
    if (!pager) return;
    if (totalPages <= 1) { pager.innerHTML = ''; return; }
    let html = `<button class="pg-btn" data-pg="prev" ${page === 0 ? 'disabled' : ''} aria-label="Página anterior">‹</button>`;
    for (let i = 0; i < totalPages; i++) html += `<button class="pg-btn ${i === page ? 'active' : ''}" data-pg="${i}">${i + 1}</button>`;
    html += `<button class="pg-btn" data-pg="next" ${page === totalPages - 1 ? 'disabled' : ''} aria-label="Próxima página">›</button>`;
    pager.innerHTML = html;
    pager.querySelectorAll('[data-pg]').forEach((b) => b.addEventListener('click', () => {
      const v = b.dataset.pg;
      if (v === 'prev') page = Math.max(0, page - 1);
      else if (v === 'next') page = Math.min(totalPages - 1, page + 1);
      else page = +v;
      renderPage();
      document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }));
  }

  renderPage();
  let t;
  window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(() => previews.forEach(fit), 150); });
}

// ===== Sistemas completos (carrossel) =====
const systems = [
  {
    repo: 'horizonte-imoveis',
    demo: 'https://paulogsiqueira.github.io/horizonte-imoveis/',
    admin: 'https://paulogsiqueira.github.io/horizonte-imoveis/login.html',
    badge: 'Fullstack · Supabase',
    nome: 'Horizonte Imóveis',
    desc: 'Portal imobiliário com painel administrativo. O corretor faz login e gerencia os imóveis; o site público lista tudo com busca, galeria e contato.',
    feats: [
      'Login seguro do corretor (Supabase Auth)',
      'Cadastrar, editar e excluir imóveis',
      'Upload de até 6 fotos por imóvel (Storage)',
      'Busca por finalidade, tipo, cidade e preço',
      'Banco PostgreSQL + API em tempo real',
    ],
  },
  {
    repo: 'barbearia-agendamento',
    demo: 'https://paulogsiqueira.github.io/barbearia-agendamento/',
    badge: 'Fullstack · Supabase',
    nome: 'Barbearia Império',
    desc: 'Sistema de agendamento para barbearia com 3 profissionais. O cliente escolhe o barbeiro, o dia num calendário e o horário livre; o barbeiro gerencia a própria agenda pela área logada.',
    feats: [
      'Agendamento online (barbeiro → data → horário)',
      'Área do barbeiro com login (Supabase Auth)',
      'Define horários disponíveis por dia',
      'Vê cliente + telefone de cada reserva',
      'Site institucional com equipe e serviços',
    ],
  },
  {
    repo: 'fitgo-delivery',
    demo: 'https://paulogsiqueira.github.io/fitgo-delivery/',
    badge: 'Fullstack · Supabase',
    nome: 'FitGo · Delivery Fitness',
    desc: 'Delivery de comida fitness com login, carrinho e cálculo de frete pelo endereço. Ao finalizar, o pedido vira uma mensagem pronta para o WhatsApp e fica salvo no histórico do cliente.',
    feats: [
      'Cadastro e login de clientes (Supabase Auth)',
      'Carrinho + cardápio vindo do banco',
      'Frete calculado por CEP + distância real',
      'Pedido formatado em mensagem (WhatsApp)',
      'Histórico de pedidos por usuário',
    ],
  },
  {
    repo: 'meubolso-financas',
    demo: 'https://paulogsiqueira.github.io/meubolso-financas/',
    badge: 'Fullstack · Supabase · Chart.js',
    nome: 'MeuBolso · Controle Financeiro',
    desc: 'Dashboard de finanças pessoais com login, lançamento de receitas e despesas, segmentos personalizáveis e análise em gráficos configuráveis — tudo salvo por usuário.',
    feats: [
      'Conta de usuário com dados privados (RLS)',
      'Despesas por segmento + receitas (ativa/passiva)',
      'Dashboard com cartões de resumo do mês',
      'Gráficos configuráveis (tipo + filtro de segmentos)',
      'Evolução de 6 meses e renda por origem',
    ],
  },
];

const track = document.getElementById('systemsTrack');
const SYS_W = 1280;
if (track) {
  track.innerHTML = systems.map((s) => `
    <article class="system-card">
      <div class="system-bg">
        <iframe data-src="${s.demo}" title="Layout do sistema ${s.nome}" loading="lazy" scrolling="no" tabindex="-1" aria-hidden="true"></iframe>
        <div class="system-shade"></div>
      </div>
      <div class="system-content">
        <span class="system-badge">${s.badge}</span>
        <h3>${s.nome}</h3>
        <p class="system-desc">${s.desc}</p>
        <ul class="system-feats">${s.feats.map((f) => `<li>${f}</li>`).join('')}</ul>
        <div class="system-actions">
          <a class="btn btn-primary" href="${s.demo}" target="_blank" rel="noopener">Ver demonstração</a>
        </div>
      </div>
    </article>`).join('');

  const fitSys = (card) => {
    const bg = card.querySelector('.system-bg');
    const f = card.querySelector('iframe');
    if (!f || !bg) return;
    const scale = bg.clientWidth / SYS_W;
    f.style.width = SYS_W + 'px';
    f.style.height = Math.ceil(bg.clientHeight / scale) + 'px';
    f.style.transform = 'scale(' + scale + ')';
  };
  const cards = Array.from(track.querySelectorAll('.system-card'));

  const ioSys = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const card = entry.target;
      const f = card.querySelector('iframe');
      fitSys(card);
      if (f && !f.src && f.dataset.src) { f.src = f.dataset.src; f.addEventListener('load', () => fitSys(card)); }
      obs.unobserve(card);
    });
  }, { rootMargin: '400px' });
  cards.forEach((c) => ioSys.observe(c));
  window.addEventListener('resize', () => { clearTimeout(window._sysT); window._sysT = setTimeout(() => cards.forEach(fitSys), 150); });

  const prev = document.getElementById('sysPrev');
  const next = document.getElementById('sysNext');
  const dotsBox = document.getElementById('systemsDots');
  const step = () => (cards[0] ? cards[0].getBoundingClientRect().width + 24 : track.clientWidth);
  prev?.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  next?.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));

  if (cards.length <= 1) {
    if (prev) prev.style.display = 'none';
    if (next) next.style.display = 'none';
  } else if (dotsBox) {
    dotsBox.innerHTML = cards.map((_, i) => `<button aria-label="Ir para o sistema ${i + 1}"></button>`).join('');
    const dots = Array.from(dotsBox.children);
    dots.forEach((d, i) => d.addEventListener('click', () => track.scrollTo({ left: i * step(), behavior: 'smooth' })));
    const setActive = () => {
      const idx = Math.round(track.scrollLeft / step());
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    };
    setActive();
    track.addEventListener('scroll', () => { clearTimeout(track._s); track._s = setTimeout(setActive, 80); });
  }
}

// ===== Animações: revelar ao rolar + contadores =====
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealSel = '.section-head, .service, .steps li, .why-card, .contact-inner > div, .hero-text > *, .hero-visual';
  const targets = Array.from(document.querySelectorAll(revealSel));
  targets.forEach((elx) => {
    elx.classList.add('reveal');
    const sibs = [...elx.parentElement.children].filter((c) => c.classList.contains('reveal'));
    elx.style.transitionDelay = Math.min(sibs.indexOf(elx), 6) * 0.07 + 's';
  });
  const revObs = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  targets.forEach((t) => revObs.observe(t));

  // contador animado nos números do hero
  const countUp = (elm) => {
    const m = elm.textContent.trim().match(/^(\D*)(\d[\d.,]*)(\D*)$/);
    if (!m) return;
    const prefix = m[1], suffix = m[3];
    const alvo = parseFloat(m[2].replace(/\./g, '').replace(',', '.'));
    if (isNaN(alvo)) return;
    const dur = 1200, t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      elm.textContent = prefix + Math.round(alvo * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    const so = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => { if (e.isIntersecting) { heroStats.querySelectorAll('strong').forEach(countUp); obs.disconnect(); } });
    }, { threshold: 0.5 });
    so.observe(heroStats);
  }
}
