// Filtre de projets avec transition FLIP + vue détaillée accessible (modale),
// routée par hash partageable (#/projects/<slug>), lue depuis data/profile.js.

import { profile } from '../data/profile.js';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let lastFocused = null;

function tr(field) {
  if (field == null) return { fr: '', en: '' };
  if (typeof field === 'string') return { fr: field, en: field };
  return field;
}

function currentLang() {
  return document.documentElement.lang === 'en' ? 'en' : 'fr';
}

/* ── FLIP FILTER ── */
function initProjectFilter() {
  const tabs = document.querySelectorAll('#projects .ftab');
  const grid = document.getElementById('projectsGrid');
  if (!grid || !tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      const f = tab.dataset.filter;
      const cards = Array.from(grid.querySelectorAll('.pcard'));
      const shouldShow = (c) => f === 'all' || (c.dataset.cat || '').includes(f);

      if (reducedMotion) {
        cards.forEach((c) => {
          c.style.display = shouldShow(c) ? '' : 'none';
        });
        return;
      }

      const first = new Map();
      cards.forEach((c) => {
        if (c.style.display !== 'none') first.set(c, c.getBoundingClientRect());
      });

      cards.forEach((c) => {
        c.style.display = shouldShow(c) ? '' : 'none';
      });

      cards.forEach((c) => {
        if (c.style.display === 'none') return;
        const resetTransition = () => {
          c.style.transition = '';
        };
        const prev = first.get(c);
        if (!prev) {
          c.style.transition = 'none';
          c.style.opacity = '0';
          c.style.transform = 'scale(0.96)';
          requestAnimationFrame(() => {
            c.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            c.style.opacity = '1';
            c.style.transform = 'none';
            c.addEventListener('transitionend', resetTransition, { once: true });
          });
          return;
        }
        const last = c.getBoundingClientRect();
        const dx = prev.left - last.left;
        const dy = prev.top - last.top;
        if (dx || dy) {
          c.style.transition = 'none';
          c.style.transform = `translate(${dx}px, ${dy}px)`;
          requestAnimationFrame(() => {
            c.style.transition = 'transform 0.35s ease';
            c.style.transform = 'none';
            c.addEventListener('transitionend', resetTransition, { once: true });
          });
        }
      });
    });
  });
}

/* ── DETAIL MODAL ── */
function fillModal(project) {
  const lang = currentLang();
  document.getElementById('pmType').textContent = tr(project.typeLabel)[lang];
  document.getElementById('pmTitle').textContent = tr(project.title)[lang];

  const stackWrap = document.getElementById('pmStack');
  stackWrap.innerHTML = '';
  project.stack.forEach((s) => {
    const span = document.createElement('span');
    span.className = 'stag';
    span.textContent = typeof s === 'string' ? s : tr(s)[lang];
    stackWrap.appendChild(span);
  });

  document.getElementById('pmContext').textContent = tr(project.detail.context)[lang];
  document.getElementById('pmRole').textContent = tr(project.detail.role)[lang];
  document.getElementById('pmChallenges').textContent = tr(project.detail.challenges)[lang];
  document.getElementById('pmResult').textContent = tr(project.detail.result)[lang];
}

function openProject(slug, { pushHash = true } = {}) {
  const project = profile.projects.find((p) => p.slug === slug);
  const backdrop = document.getElementById('projectModalBackdrop');
  const panel = document.getElementById('projectModalPanel');
  if (!project || !project.detail || !backdrop || !panel) return;

  fillModal(project);
  lastFocused = document.activeElement;
  backdrop.hidden = false;
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => backdrop.classList.add('open'));
  panel.focus();

  if (pushHash) history.pushState(null, '', `#/projects/${slug}`);
}

function closeProject({ popHash = true } = {}) {
  const backdrop = document.getElementById('projectModalBackdrop');
  if (!backdrop || backdrop.hidden) return;
  backdrop.classList.remove('open');
  document.body.style.overflow = '';
  const restore = lastFocused;
  setTimeout(
    () => {
      backdrop.hidden = true;
    },
    reducedMotion ? 0 : 200
  );
  if (restore) restore.focus();
  if (popHash && /^#\/projects\//.test(location.hash)) {
    history.pushState(null, '', location.pathname + location.search);
  }
}

function routeFromHash() {
  const m = location.hash.match(/^#\/projects\/([a-z0-9-]+)$/);
  if (m) openProject(m[1], { pushHash: false });
  else closeProject({ popHash: false });
}

function initModal() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.pcard');
    if (card && card.dataset.slug) openProject(card.dataset.slug);
  });

  grid.querySelectorAll('.pcard').forEach((card) => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openProject(card.dataset.slug);
      }
    });
  });

  document.getElementById('pmCloseBtn')?.addEventListener('click', () => closeProject());
  document.getElementById('projectModalBackdrop')?.addEventListener('click', (e) => {
    if (e.target.id === 'projectModalBackdrop') closeProject();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProject();
  });
  window.addEventListener('popstate', routeFromHash);
  document.addEventListener('langchange', () => {
    const backdrop = document.getElementById('projectModalBackdrop');
    if (backdrop && !backdrop.hidden) {
      const m = location.hash.match(/^#\/projects\/([a-z0-9-]+)$/);
      if (m) openProject(m[1], { pushHash: false });
    }
  });

  routeFromHash();
}

export function initProjects() {
  initProjectFilter();
  initModal();
}

export function openProjectBySlug(slug) {
  openProject(slug);
}
