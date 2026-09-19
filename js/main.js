// Cœur du site : thème, langue, menu mobile, reveal au scroll, filtre projets,
// formulaire de contact. Module ES natif, aucune dépendance.

import { renderAll } from './render.js';
import { profile } from '../data/profile.js';
import { initTimeline } from './timeline.js';
import { initProjects } from './projects.js';
import { initBoot } from './boot.js';
import { initDroneSim } from './drone-sim.js';
import { initCommandPalette } from './command-palette.js';

const html = document.documentElement;
let theme = localStorage.getItem('mt-theme') || 'dark';
let lang = localStorage.getItem('mt-lang') || 'fr';

export function getLang() {
  return lang;
}
export function getTheme() {
  return theme;
}
export function setThemeExternal(t) {
  setTheme(t);
}
export function setLangExternal(l) {
  setLang(l);
}

function setTheme(t) {
  theme = t;
  html.setAttribute('data-theme', t);
  const icon = t === 'dark' ? '🌙' : '☀️';
  const themeBtn = document.getElementById('themeBtn');
  const mThemeBtn = document.getElementById('mThemeBtn');
  if (themeBtn) themeBtn.textContent = icon;
  if (mThemeBtn) mThemeBtn.textContent = icon;
  localStorage.setItem('mt-theme', t);
  document.dispatchEvent(new CustomEvent('themechange', { detail: { theme: t } }));
}
function toggleTheme() {
  setTheme(theme === 'dark' ? 'light' : 'dark');
}

function setLang(l) {
  lang = l;
  localStorage.setItem('mt-lang', l);
  html.setAttribute('lang', l);
  const langBtn = document.getElementById('langBtn');
  const mLangBtn = document.getElementById('mLangBtn');
  if (langBtn) langBtn.textContent = l === 'fr' ? 'EN' : 'FR';
  if (mLangBtn) mLangBtn.textContent = l === 'fr' ? 'EN' : 'FR';

  document.querySelectorAll('[data-fr]').forEach((el) => {
    const val = el.getAttribute('data-' + l);
    if (val !== null) el.innerHTML = val;
  });
  document.querySelectorAll('[data-ph-fr]').forEach((el) => {
    el.placeholder = el.getAttribute('data-ph-' + l) || '';
  });

  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: l } }));
}
function toggleLang() {
  setLang(lang === 'fr' ? 'en' : 'fr');
}

function openMMenu() {
  document.getElementById('mobileMenu')?.classList.add('open');
}
function closeMMenu() {
  document.getElementById('mobileMenu')?.classList.remove('open');
}

function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.07 }
  );
  els.forEach((el) => io.observe(el));
}

function initContactForm() {
  const sendBtn = document.getElementById('sendBtn');
  if (!sendBtn) return;
  sendBtn.addEventListener('click', () => {
    const name = document.getElementById('fName').value.trim();
    const email = document.getElementById('fEmail').value.trim();
    const subject = document.getElementById('fSubject').value.trim();
    const msg = document.getElementById('fMsg').value.trim();
    if (!name || !email || !msg) {
      alert(lang === 'fr' ? "Merci de remplir le nom, l'email et le message." : 'Please fill in name, email and message.');
      return;
    }
    const body = `From: ${name} (${email})\n\n${msg}`;
    const subj = subject || (lang === 'fr' ? 'Contact Portfolio' : 'Portfolio Contact');
    window.location.href = `mailto:${profile.links.email}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;
  });
}

function initNav() {
  document.getElementById('themeBtn')?.addEventListener('click', toggleTheme);
  document.getElementById('mThemeBtn')?.addEventListener('click', toggleTheme);
  document.getElementById('langBtn')?.addEventListener('click', toggleLang);
  document.getElementById('mLangBtn')?.addEventListener('click', toggleLang);
  document.getElementById('hamburgerBtn')?.addEventListener('click', openMMenu);
  document.getElementById('mmCloseBtn')?.addEventListener('click', closeMMenu);
  document.querySelectorAll('.mobile-menu a').forEach((a) => a.addEventListener('click', closeMMenu));
}

export function initCore() {
  renderAll();

  setTheme(theme);
  setLang(lang);

  initNav();
  initReveal();
  initContactForm();
  initTimeline();
  initProjects();
  initBoot();
  initDroneSim();
  initCommandPalette();
}

initCore();
