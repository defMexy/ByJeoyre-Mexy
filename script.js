/* ===========================
   ByJeoyre — JavaScript
   =========================== */

// ── Nav scroll behaviour ──────────────────────────────────────────
const nav = document.getElementById('nav');

const updateNav = () => {
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
};

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ── Mobile nav toggle ─────────────────────────────────────────────
const navToggle   = document.getElementById('navToggle');
const navLinks    = document.getElementById('navLinks');
const navBackdrop = document.getElementById('navBackdrop');

const closeNav = () => {
  navLinks.classList.remove('open');
  navToggle.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Menu openen');
  if (navBackdrop) navBackdrop.classList.remove('open');
  document.body.style.overflow = '';
};

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Menu sluiten' : 'Menu openen');
  if (navBackdrop) navBackdrop.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

if (navBackdrop) navBackdrop.addEventListener('click', closeNav);

navLinks.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', closeNav);
});

// ── Scroll reveal ─────────────────────────────────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Portfolio filters ─────────────────────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('filter-btn--active'));
    btn.classList.add('filter-btn--active');

    const filter = btn.dataset.filter;

    portfolioItems.forEach(item => {
      const match = filter === 'all' || item.dataset.cat === filter;
      item.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
      if (match) {
        item.style.opacity  = '1';
        item.style.transform = 'scale(1)';
        item.style.pointerEvents = '';
      } else {
        item.style.opacity  = '0.15';
        item.style.transform = 'scale(0.97)';
        item.style.pointerEvents = 'none';
      }
    });
  });
});

// ── Contact form ──────────────────────────────────────────────────
const form = document.getElementById('contactForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  const original = btn.textContent;

  btn.textContent = 'Verzenden...';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = 'Verstuurd!';
    btn.style.background = '#5a7a5a';
    form.reset();

    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  }, 1200);
});

// ── Smooth active nav link on scroll ────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav__link:not(.nav__link--cta)');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinksAll.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = 'var(--gold)';
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));

// ── Animated stat counters ────────────────────────────────────────
const animateCounter = (el) => {
  const text  = el.textContent.trim();
  const num   = parseInt(text, 10);
  const suffix = text.replace(/^\d+/, '');
  const duration = 1600;
  const startTime = performance.now();

  const update = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * num) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

document.querySelectorAll('.stat__num').forEach(el => counterObserver.observe(el));

// ── Hero parallax (background position) ──────────────────────────
const heroBg  = document.querySelector('.hero__bg');
const heroEl  = document.querySelector('.hero');

if (heroBg && heroEl) {
  const onScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY <= heroEl.offsetHeight) {
      const pct = (scrollY / heroEl.offsetHeight) * 40;
      heroBg.style.backgroundPositionY = `calc(50% + ${pct}px)`;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

// ── Portfolio touch toggle ────────────────────────────────────────
document.querySelectorAll('.portfolio-item').forEach(item => {
  item.addEventListener('touchstart', () => {
    item.classList.toggle('touched');
  }, { passive: true });
});

// ── Section title em underline trigger ───────────────────────────
const titleObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll('.section-title').forEach(el => titleObserver.observe(el));
