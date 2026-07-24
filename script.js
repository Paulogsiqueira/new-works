// ===== Menu mobile =====
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
toggle?.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
links?.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  })
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

const grid = document.getElementById('workGrid');

if (grid) {
  const PER_PAGE = 6;
  const totalPages = Math.ceil(projects.length / PER_PAGE);
  let page = 0;

  const cardHTML = (p) => {
    const url = BASE + p.repo + '/';
    return `<article class="work" style="--c:${p.cor}">
      <a class="work-preview" href="${url}" target="_blank" rel="noopener" aria-label="Ver o site ${p.nome} (${p.area}) ao vivo, abre em nova aba">
        <img src="previews/${p.repo}.webp" alt="Prévia do site ${p.nome} — modelo de ${p.area}" width="880" height="572" loading="lazy" decoding="async" />
        <span class="work-overlay"><span>Ver site ao vivo →</span></span>
      </a>
      <div class="work-meta">
        <div><h3>${p.nome}</h3><span class="work-tag">${p.area}</span></div>
      </div>
    </article>`;
  };

  function renderPage() {
    const items = projects.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);
    grid.innerHTML = items.map(cardHTML).join('');
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
if (track) {
  track.innerHTML = systems.map((s) => `
    <article class="system-card">
      <div class="system-bg">
        <img src="previews/${s.repo}.webp" alt="Layout do sistema ${s.nome}" width="1000" height="625" loading="lazy" decoding="async" />
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

  const cards = Array.from(track.querySelectorAll('.system-card'));

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

// ===== Formulário de contato: validação + envio AJAX (sem sair da página) =====
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const AJAX_URL = 'https://api.web3forms.com/submit';
  const OBRIGADO = 'obrigado.html';
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const btn = document.getElementById('contactSubmit');
  const btnText = btn ? btn.textContent : 'Enviar mensagem';
  const status = document.getElementById('formStatus');
  const nome = form.querySelector('[name="Nome"]');
  const email = form.querySelector('[name="email"]');
  const celular = form.querySelector('[name="Celular"]');
  const msg = form.querySelector('[name="Mensagem"]');
  const honey = form.querySelector('[name="botcheck"]');

  // máscara simples de celular: (14) 99999-9999
  if (celular) {
    celular.addEventListener('input', () => {
      let d = celular.value.replace(/\D/g, '').slice(0, 11);
      let v = d;
      if (d.length > 2) v = '(' + d.slice(0, 2) + ') ' + d.slice(2);
      if (d.length > 7) v = '(' + d.slice(0, 2) + ') ' + d.slice(2, 7) + '-' + d.slice(7);
      celular.value = v;
    });
  }

  const setStatus = (text, kind) => {
    if (!status) return;
    status.textContent = text || '';
    status.className = 'form-status' + (kind ? ' is-' + kind : '');
    status.hidden = !text;
  };

  const clearError = (field) => {
    field.classList.remove('invalid');
    field.removeAttribute('aria-invalid');
    const err = field.parentElement.querySelector('.field-error');
    if (err) err.remove();
  };

  const showError = (field, message) => {
    field.classList.add('invalid');
    field.setAttribute('aria-invalid', 'true');
    let err = field.parentElement.querySelector('.field-error');
    if (!err) {
      err = document.createElement('span');
      err.className = 'field-error';
      field.parentElement.appendChild(err);
    }
    err.textContent = message;
  };

  // limpa o erro do campo assim que o usuário corrige
  [nome, email, celular, msg].forEach((f) => {
    if (!f) return;
    f.addEventListener('input', () => { if (f.classList.contains('invalid')) clearError(f); });
  });

  const validate = () => {
    let firstInvalid = null;
    const check = (field, ok, message) => {
      if (!field) return;
      if (ok) { clearError(field); }
      else { showError(field, message); if (!firstInvalid) firstInvalid = field; }
    };
    check(nome, nome.value.trim().length >= 2, 'Informe o seu nome.');
    check(email, EMAIL_RE.test(email.value.trim()), 'Informe um e-mail válido (ex: voce@email.com).');
    check(celular, celular.value.replace(/\D/g, '').length >= 10, 'Informe um celular válido com DDD (ex: (14) 99999-9999).');
    check(msg, msg.value.trim().length >= 5, 'Escreva uma mensagem com pelo menos 5 caracteres.');
    if (firstInvalid) { firstInvalid.focus(); return false; }
    return true;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // honeypot marcado/preenchido = robô: finge sucesso e não envia
    if (honey && (honey.checked || honey.value)) { window.location.href = OBRIGADO; return; }

    if (!validate()) {
      setStatus('Confira os campos destacados acima.', 'error');
      return;
    }

    const payload = Object.fromEntries(new FormData(form).entries());
    delete payload.botcheck;
    delete payload.redirect; // o redirect é feito por JS após confirmar o sucesso

    btn.disabled = true;
    btn.textContent = 'Enviando…';
    setStatus('Enviando a sua mensagem…', 'sending');

    try {
      const res = await fetch(AJAX_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && (data.success === 'true' || data.success === true)) {
        setStatus('Mensagem enviada! Redirecionando…', 'ok');
        window.location.href = OBRIGADO;
        return;
      }
      throw new Error(data.message || 'Falha no envio');
    } catch (err) {
      btn.disabled = false;
      btn.textContent = btnText;
      setStatus('Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp (14) 99782-0009.', 'error');
    }
  });
})();

// ===== Efeito de digitação no bloco de código do hero =====
(function () {
  const code = document.getElementById('heroCode');
  if (!code) return;

  // conteúdo com destaque de sintaxe (classe null = texto simples)
  const tokens = [
    { t: 'const', c: 'c-key' }, { t: ' newWorks = ' }, { t: 'criar', c: 'c-fn' }, { t: '({\n' },
    { t: '  ' }, { t: 'sites', c: 'c-prop' }, { t: ': ' }, { t: "'qualquer segmento'", c: 'c-str' }, { t: ',\n' },
    { t: '  ' }, { t: 'software', c: 'c-prop' }, { t: ': ' }, { t: "'sob medida'", c: 'c-str' }, { t: ',\n' },
    { t: '  ' }, { t: 'automacao', c: 'c-prop' }, { t: ': ' }, { t: "'RPA'", c: 'c-str' }, { t: ',\n' },
    { t: '});\n\n' },
    { t: 'newWorks.' }, { t: 'entregar', c: 'c-fn' }, { t: '(); ' }, { t: '// 🚀', c: 'c-cmt' },
  ];

  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const finalHTML = tokens.map((tk) => (tk.c ? `<span class="${tk.c}">${esc(tk.t)}</span>` : esc(tk.t))).join('');

  // sem animação: mostra o código completo direto
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    code.innerHTML = finalHTML;
    return;
  }

  // achata em caracteres, preservando a classe de cada um
  const chars = [];
  tokens.forEach((tk) => { for (const ch of tk.t) chars.push({ ch, c: tk.c || null }); });

  const CARET = '<span class="type-caret"></span>';
  const render = (n) => {
    let html = '', j = 0;
    while (j < n) {
      const c = chars[j].c; let seg = '';
      while (j < n && chars[j].c === c) { seg += chars[j].ch; j++; }
      html += c ? `<span class="${c}">${esc(seg)}</span>` : esc(seg);
    }
    code.innerHTML = html + CARET;
  };

  code.classList.add('typing');
  code.innerHTML = CARET; // evita o flash do conteúdo estático

  let i = 0;
  const type = () => {
    render(i);
    if (i >= chars.length) { code.innerHTML = finalHTML + '<span class="type-caret type-caret--done"></span>'; return; }
    const justCh = i > 0 ? chars[i - 1].ch : '';
    i++;
    let delay = 28 + Math.random() * 42;          // ritmo humano
    if (justCh === '\n') delay = 260;             // pausa ao pular linha
    else if (',{}();'.includes(justCh)) delay = 120; // respira na pontuação
    setTimeout(type, delay);
  };

  // começa quando o hero entra em cena (ou logo após carregar)
  const start = () => setTimeout(type, 450);
  const visual = code.closest('.hero-visual') || code;
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => { if (e.isIntersecting) { obs.disconnect(); start(); } });
    }, { threshold: 0.3 });
    io.observe(visual);
  } else {
    start();
  }
})();
