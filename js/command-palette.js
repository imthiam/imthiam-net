// Palette de commandes (Cmd/Ctrl+K) : recherche floue, navigation clavier,
// actions lues depuis data/profile.js (source unique de vérité).

import { profile } from '../data/profile.js';
import { getLang, getTheme, setThemeExternal, setLangExternal } from './main.js';
import { openProjectBySlug } from './projects.js';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function tr(field) {
  if (field == null) return { fr: '', en: '' };
  if (typeof field === 'string') return { fr: field, en: field };
  return field;
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
}

function copyEmail() {
  navigator.clipboard?.writeText(profile.links.email).catch(() => {});
}

function buildCommands() {
  const nav = [
    { id: 'nav-companies', label: { fr: 'Aller à : Ventures', en: 'Go to: Ventures' }, run: () => scrollToSection('companies') },
    { id: 'nav-about', label: { fr: 'Aller à : À propos', en: 'Go to: About' }, run: () => scrollToSection('about') },
    { id: 'nav-skills', label: { fr: 'Aller à : Compétences', en: 'Go to: Skills' }, run: () => scrollToSection('skills') },
    { id: 'nav-projects', label: { fr: 'Aller à : Projets', en: 'Go to: Projects' }, run: () => scrollToSection('projects') },
    { id: 'nav-experience', label: { fr: 'Aller à : Parcours', en: 'Go to: Journey' }, run: () => scrollToSection('experience') },
    { id: 'nav-contact', label: { fr: 'Aller à : Contact', en: 'Go to: Contact' }, run: () => scrollToSection('contact') },
  ];

  const projectCmds = profile.projects.map((p) => ({
    id: 'project-' + p.slug,
    label: { fr: 'Projet : ' + tr(p.title).fr, en: 'Project: ' + tr(p.title).en },
    run: () => openProjectBySlug(p.slug),
  }));

  const themeLabel =
    getTheme() === 'dark' ? { fr: 'Passer en thème clair', en: 'Switch to light theme' } : { fr: 'Passer en thème sombre', en: 'Switch to dark theme' };
  const langLabel = getLang() === 'fr' ? { fr: 'Passer en anglais', en: 'Switch to English' } : { fr: 'Passer en français', en: 'Switch to French' };

  const actions = [
    { id: 'toggle-theme', label: themeLabel, run: () => setThemeExternal(getTheme() === 'dark' ? 'light' : 'dark') },
    { id: 'toggle-lang', label: langLabel, run: () => setLangExternal(getLang() === 'fr' ? 'en' : 'fr') },
    { id: 'download-cv', label: { fr: 'Télécharger le CV', en: 'Download CV' }, run: () => window.open('cv.html', '_blank') },
    { id: 'copy-email', label: { fr: 'Copier mon email', en: 'Copy my email' }, run: copyEmail },
    { id: 'open-github', label: { fr: 'Ouvrir GitHub', en: 'Open GitHub' }, run: () => window.open(profile.links.github, '_blank') },
    { id: 'open-linkedin', label: { fr: 'Ouvrir LinkedIn', en: 'Open LinkedIn' }, run: () => window.open(profile.links.linkedin, '_blank') },
  ];

  return [...nav, ...actions, ...projectCmds];
}

function normalize(s) {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
}

function fuzzyScore(query, text) {
  query = normalize(query);
  text = normalize(text);
  let qi = 0;
  let score = 0;
  let lastMatch = -1;
  for (let ti = 0; ti < text.length && qi < query.length; ti++) {
    if (text[ti] === query[qi]) {
      score += lastMatch === ti - 1 ? 3 : 1;
      lastMatch = ti;
      qi++;
    }
  }
  if (qi < query.length) return -1;
  if (text.includes(query)) score += 10;
  if (text.startsWith(query)) score += 10;
  return score;
}

let isOpen = false;
let activeIndex = 0;
let filtered = [];

function runCommand(cmd) {
  close();
  cmd.run();
}

function setActive(i) {
  const items = document.querySelectorAll('.cmdk-item');
  activeIndex = i;
  items.forEach((el, idx) => el.classList.toggle('active', idx === i));
  items[i]?.scrollIntoView({ block: 'nearest' });
}

function renderList(query) {
  const lang = getLang();
  const commands = buildCommands();
  let results;
  if (!query) {
    results = commands;
  } else {
    results = commands
      .map((c) => ({ c, score: fuzzyScore(query, tr(c.label)[lang]) }))
      .filter((r) => r.score >= 0)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.c);
  }
  filtered = results;
  activeIndex = 0;

  const list = document.getElementById('cmdkList');
  list.innerHTML = '';
  if (!filtered.length) {
    const empty = document.createElement('div');
    empty.className = 'cmdk-empty';
    empty.textContent = lang === 'fr' ? 'Aucun résultat' : 'No results';
    list.appendChild(empty);
    return;
  }
  filtered.forEach((c, i) => {
    const item = document.createElement('div');
    item.className = 'cmdk-item' + (i === 0 ? ' active' : '');
    item.setAttribute('role', 'option');
    item.textContent = tr(c.label)[lang];
    item.addEventListener('mouseenter', () => setActive(i));
    item.addEventListener('click', () => runCommand(c));
    list.appendChild(item);
  });
}

function open() {
  const backdrop = document.getElementById('cmdkBackdrop');
  const input = document.getElementById('cmdkInput');
  if (!backdrop || !input) return;
  isOpen = true;
  backdrop.hidden = false;
  requestAnimationFrame(() => backdrop.classList.add('open'));
  input.value = '';
  renderList('');
  input.focus();
  document.body.style.overflow = 'hidden';
}

function close() {
  const backdrop = document.getElementById('cmdkBackdrop');
  if (!backdrop || !isOpen) return;
  isOpen = false;
  backdrop.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => {
    backdrop.hidden = true;
  }, reducedMotion ? 0 : 150);
}

export function initCommandPalette() {
  const backdrop = document.getElementById('cmdkBackdrop');
  const input = document.getElementById('cmdkInput');
  if (!backdrop || !input) return;

  document.getElementById('cmdkBtn')?.addEventListener('click', open);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) close();
  });

  input.addEventListener('input', () => renderList(input.value));
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (filtered.length) setActive((activeIndex + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (filtered.length) setActive((activeIndex - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[activeIndex]) runCommand(filtered[activeIndex]);
    } else if (e.key === 'Escape') {
      close();
    }
  });

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      isOpen ? close() : open();
    } else if (e.key === 'Escape' && isOpen) {
      close();
    }
  });
}
