// CV imprimable : lit data/profile.js (source unique de vérité), aucune
// donnée dupliquée. Langue = dernier choix fait sur le site (localStorage).

import { profile } from '../data/profile.js';

const lang = localStorage.getItem('mt-lang') === 'en' ? 'en' : 'fr';

function tr(field) {
  if (field == null) return '';
  if (typeof field === 'string') return field;
  return field[lang] ?? field.fr ?? '';
}

function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

function renderHeader() {
  document.title = `CV — ${profile.identity.name}`;
  document.getElementById('cvName').textContent = profile.identity.name;
  document.getElementById('cvTagline').textContent = `${tr(profile.identity.tagline)} · ${profile.identity.taglineSuffix}`;
  const l = profile.links;
  document.getElementById('cvContact').textContent = [l.email, l.phoneLabel, l.linkedinLabel, l.githubLabel].join('  ·  ');
}

function renderAbout() {
  const wrap = document.getElementById('cvAbout');
  profile.about.paragraphs.slice(0, 3).forEach((p) => {
    wrap.appendChild(el('p', 'cv-p', tr(p)));
  });
}

function renderExperience() {
  const wrap = document.getElementById('cvExperience');
  profile.timeline
    .filter((e) => e.category !== 'formation')
    .forEach((entry) => {
      const item = el('div', 'cv-item');
      const head = el('div', 'cv-item-head');
      head.appendChild(el('span', 'cv-item-role', tr(entry.role)));
      head.appendChild(el('span', 'cv-item-date', tr(entry.date)));
      item.appendChild(head);
      item.appendChild(el('div', 'cv-item-org', tr(entry.org)));
      item.appendChild(el('div', 'cv-item-desc', tr(entry.desc)));
      wrap.appendChild(item);
    });
}

function renderEducation() {
  const wrap = document.getElementById('cvEducation');
  profile.timeline
    .filter((e) => e.category === 'formation')
    .forEach((entry) => {
      const item = el('div', 'cv-item');
      const head = el('div', 'cv-item-head');
      head.appendChild(el('span', 'cv-item-role', tr(entry.role)));
      head.appendChild(el('span', 'cv-item-date', tr(entry.date)));
      item.appendChild(head);
      item.appendChild(el('div', 'cv-item-org', tr(entry.org)));
      wrap.appendChild(item);
    });
}

function renderSkills() {
  const wrap = document.getElementById('cvSkills');
  profile.skills.forEach((g) => {
    const row = el('div', 'cv-skill-row');
    row.appendChild(el('span', 'cv-skill-title', tr(g.title)));
    const list = g.pills.map((p) => (typeof p.label === 'string' ? p.label : tr(p.label))).join(', ');
    row.appendChild(el('span', 'cv-skill-list', list));
    wrap.appendChild(row);
  });
}

function renderProjects() {
  const wrap = document.getElementById('cvProjects');
  profile.projects.forEach((p) => {
    const item = el('div', 'cv-project');
    item.appendChild(el('span', 'cv-project-title', tr(p.title) + '.'));
    item.appendChild(el('span', 'cv-project-desc', ' ' + tr(p.desc)));
    wrap.appendChild(item);
  });
}

function renderFooter() {
  document.getElementById('cvFooter').textContent =
    lang === 'fr' ? `CV généré depuis imthiam.github.io/imthiam-net · ${new Date().getFullYear()}` : `CV generated from imthiam.github.io/imthiam-net · ${new Date().getFullYear()}`;
}

function initPrintButton() {
  document.getElementById('cvPrintBtn')?.addEventListener('click', () => window.print());
}

renderHeader();
renderAbout();
renderExperience();
renderEducation();
renderSkills();
renderProjects();
renderFooter();
initPrintButton();
