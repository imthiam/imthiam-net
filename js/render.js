// Rendu du contenu principal à partir de data/profile.js (source unique de vérité).
// Chaque élément traduit reçoit data-fr / data-en pour rester compatible avec le
// mécanisme de langue existant (js/main.js::setLang), qu'il soit statique ou généré ici.

import { profile, CONFIG } from '../data/profile.js';

function tr(field) {
  if (field == null) return { fr: '', en: '' };
  if (typeof field === 'string') return { fr: field, en: field };
  return field;
}

function bilingual(tag, field, className) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  const { fr, en } = tr(field);
  node.setAttribute('data-fr', fr);
  node.setAttribute('data-en', en);
  node.innerHTML = fr;
  return node;
}

function plain(tag, text, className) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  node.innerHTML = text;
  return node;
}

function tag(text, className = 'tag') {
  const { fr, en } = tr(text);
  const s = document.createElement('span');
  s.className = className;
  s.setAttribute('data-fr', fr);
  s.setAttribute('data-en', en);
  s.textContent = fr;
  return s;
}

/* ── HERO / IDENTITY ── */
export function renderIdentity() {
  const id = profile.identity;

  const badge = document.getElementById('heroBadge');
  if (badge) {
    const { fr, en } = tr(CONFIG.available ? id.badge : id.badgeUnavailable);
    badge.setAttribute('data-fr', fr);
    badge.setAttribute('data-en', en);
    badge.innerHTML = fr;
  }

  const h1 = document.getElementById('heroTitle');
  if (h1) {
    h1.innerHTML = `${id.titleLine1}<span class="line2">${id.titleLine2}</span>`;
  }

  const taglineEl = document.getElementById('heroTagline');
  if (taglineEl) {
    const { fr, en } = tr(id.tagline);
    const strong = document.createElement('strong');
    strong.setAttribute('data-fr', fr);
    strong.setAttribute('data-en', en);
    strong.innerHTML = fr;
    taglineEl.innerHTML = '';
    taglineEl.appendChild(strong);
    taglineEl.appendChild(document.createTextNode(' · ' + id.taglineSuffix));
  }

  const descEl = document.getElementById('heroDesc');
  if (descEl) {
    const { fr, en } = tr(id.heroDesc);
    descEl.setAttribute('data-fr', fr);
    descEl.setAttribute('data-en', en);
    descEl.innerHTML = fr;
  }

  const statsEl = document.getElementById('heroStats');
  if (statsEl) {
    statsEl.innerHTML = '';
    id.stats.forEach((s) => {
      const wrap = document.createElement('div');
      const num = document.createElement('div');
      num.className = 'stat-num';
      num.innerHTML = `${s.value}${s.suffix ? `<span>${s.suffix}</span>` : ''}`;
      const label = bilingual('div', s.label, 'stat-label');
      wrap.appendChild(num);
      wrap.appendChild(label);
      statsEl.appendChild(wrap);
    });
  }
}

/* ── COMPANIES ── */
export function renderCompanies() {
  const grid = document.getElementById('companiesGrid');
  if (!grid) return;
  grid.innerHTML = '';
  profile.companies.forEach((c) => {
    const card = document.createElement(c.link ? 'a' : 'div');
    card.className = 'company-card';
    if (c.link) {
      card.href = c.link;
      card.target = '_blank';
      card.rel = 'noopener';
    }
    card.appendChild(bilingual('div', c.role, 'company-role'));
    card.appendChild(plain('div', c.name, 'company-name'));
    card.appendChild(bilingual('div', c.desc, 'company-desc'));
    const tags = document.createElement('div');
    tags.className = 'company-tags';
    c.tags.forEach((t) => tags.appendChild(tag(t)));
    card.appendChild(tags);
    if (c.linkLabel) {
      const link = document.createElement('div');
      link.className = 'company-link';
      link.textContent = c.linkLabel;
      card.appendChild(link);
    }
    grid.appendChild(card);
  });
}

/* ── ABOUT ── */
export function renderAbout() {
  const heading = document.getElementById('aboutHeading');
  if (heading) {
    const { fr, en } = tr(profile.about.heading);
    heading.setAttribute('data-fr', fr);
    heading.setAttribute('data-en', en);
    heading.innerHTML = fr;
  }
  const textWrap = document.getElementById('aboutText');
  if (textWrap) {
    textWrap.querySelectorAll('p').forEach((p) => p.remove());
    profile.about.paragraphs.forEach((p) => {
      textWrap.appendChild(bilingual('p', p));
    });
  }
  const locList = document.getElementById('aboutLocations');
  if (locList) {
    locList.innerHTML = '';
    profile.about.locations.forEach((loc) => {
      const item = document.createElement('div');
      item.className = 'loc-item';
      const dot = document.createElement('div');
      dot.className = 'loc-dot';
      item.appendChild(dot);
      item.appendChild(bilingual('span', loc));
      locList.appendChild(item);
    });
  }
  const photo = profile.about.photo;
  const img = document.getElementById('aboutPhoto');
  if (img) {
    img.src = photo.src;
    img.alt = photo.alt;
  }
  const badgeTitle = document.getElementById('aboutPhotoBadgeTitle');
  if (badgeTitle) {
    const { fr, en } = tr(photo.badgeTitleSuffix);
    badgeTitle.innerHTML = `<strong>${photo.badgeTitle}</strong> <span data-fr="${fr}" data-en="${en}">${fr}</span>`;
  }
  const badgeSub = document.getElementById('aboutPhotoBadgeSub');
  if (badgeSub) badgeSub.textContent = photo.badgeSub;
}

/* ── SKILLS ── */
export function renderSkills() {
  const grid = document.getElementById('skillsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  profile.skills.forEach((group) => {
    const card = document.createElement('div');
    card.className = 'skill-group';
    const icon = document.createElement('div');
    icon.className = 'sg-icon';
    icon.textContent = group.icon;
    card.appendChild(icon);
    card.appendChild(bilingual('div', group.title, 'sg-title'));
    const pills = document.createElement('div');
    pills.className = 'pills';
    group.pills.forEach((p) => {
      pills.appendChild(tag(p.label, p.featured ? 'pill f' : 'pill'));
    });
    card.appendChild(pills);
    if (group.context) {
      card.appendChild(bilingual('div', group.context, 'sg-context'));
    }
    grid.appendChild(card);
  });
}

/* ── PROJECTS ── */
export function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  profile.projects.forEach((p) => {
    const card = document.createElement('div');
    card.className = 'pcard';
    card.dataset.cat = p.cat.join(' ');
    card.dataset.slug = p.slug;

    const img = document.createElement('div');
    img.className = 'pimg';
    const gradDiv = document.createElement('div');
    gradDiv.className = 'pimg-grad';
    gradDiv.style.background = `linear-gradient(135deg,${p.gradient},transparent)`;
    const iconDiv = document.createElement('div');
    iconDiv.className = 'pimg-icon';
    iconDiv.textContent = p.icon;
    const typeDiv = bilingual('div', p.typeLabel, 'ptype');
    img.append(gradDiv, iconDiv, typeDiv);

    const body = document.createElement('div');
    body.className = 'pbody';
    body.appendChild(bilingual('div', p.title, 'ptitle'));
    body.appendChild(bilingual('div', p.desc, 'pdesc'));
    const stack = document.createElement('div');
    stack.className = 'pstack';
    p.stack.forEach((s) => stack.appendChild(tag(s, 'stag')));
    body.appendChild(stack);

    card.append(img, body);
    grid.appendChild(card);
  });
}

/* ── TIMELINE ── */
export function renderTimeline() {
  const list = document.getElementById('timelineList');
  if (!list) return;
  list.innerHTML = '';
  profile.timeline.forEach((entry, i) => {
    const item = document.createElement('div');
    item.className = 'tl-item';
    item.dataset.cat = entry.category;
    item.style.setProperty('--i', String(i));

    const dot = document.createElement('div');
    dot.className = entry.current ? 'tl-dot now' : 'tl-dot';
    item.appendChild(dot);

    item.appendChild(bilingual('div', entry.date, 'tl-date'));

    const content = document.createElement('div');
    content.className = 'tl-content';
    content.appendChild(bilingual('div', entry.role, 'tl-role'));
    content.appendChild(bilingual('div', entry.org, 'tl-org'));
    content.appendChild(bilingual('div', entry.desc, 'tl-desc'));
    if (entry.tags && entry.tags.length) {
      const tags = document.createElement('div');
      tags.className = 'tl-tags';
      entry.tags.forEach((t) => tags.appendChild(tag(t)));
      content.appendChild(tags);
    }
    item.appendChild(content);
    list.appendChild(item);
  });
}

/* ── CONTACT ── */
export function renderContact() {
  const heading = document.getElementById('contactHeading');
  if (heading) {
    const { fr, en } = tr(profile.contact.heading);
    heading.setAttribute('data-fr', fr);
    heading.setAttribute('data-en', en);
    heading.innerHTML = fr;
  }
  const text = document.getElementById('contactText');
  if (text) {
    const { fr, en } = tr(profile.contact.text);
    text.setAttribute('data-fr', fr);
    text.setAttribute('data-en', en);
    text.innerHTML = fr;
  }
  const l = profile.links;
  const emailLink = document.getElementById('linkEmail');
  if (emailLink) {
    emailLink.href = 'mailto:' + l.email;
    const textEl = emailLink.querySelector('.clink-text');
    if (textEl) textEl.textContent = l.email;
  }
  const linkedinLink = document.getElementById('linkLinkedin');
  if (linkedinLink) {
    linkedinLink.href = l.linkedin;
    const textEl = linkedinLink.querySelector('.clink-text');
    if (textEl) textEl.textContent = l.linkedinLabel;
  }
  const githubLink = document.getElementById('linkGithub');
  if (githubLink) {
    githubLink.href = l.github;
    const textEl = githubLink.querySelector('.clink-text');
    if (textEl) textEl.textContent = l.githubLabel;
  }
  const phoneLink = document.getElementById('linkPhone');
  if (phoneLink) {
    phoneLink.href = l.phoneHref;
    const textEl = phoneLink.querySelector('.clink-text');
    if (textEl) textEl.textContent = l.phoneLabel;
  }
}

/* ── FOOTER ── */
export function renderFooter() {
  const name = document.getElementById('footerName');
  if (name) name.textContent = profile.identity.name;
  const copy = document.getElementById('footerCopy');
  if (copy) {
    const { fr, en } = tr(profile.footer.copy);
    copy.setAttribute('data-fr', fr);
    copy.setAttribute('data-en', en);
    copy.innerHTML = fr;
  }
  const tagline = document.getElementById('footerTagline');
  if (tagline) {
    const { fr, en } = tr(profile.footer.tagline);
    tagline.setAttribute('data-fr', fr);
    tagline.setAttribute('data-en', en);
    tagline.innerHTML = fr;
  }
}

export function renderAll() {
  renderIdentity();
  renderCompanies();
  renderAbout();
  renderSkills();
  renderProjects();
  renderTimeline();
  renderContact();
  renderFooter();
}
