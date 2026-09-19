// Graphe de compétences à forces (physique codée à la main) : les nœuds sont
// les compétences et les projets qui les utilisent, les liens les relient.
// Survol/focus clavier met en surbrillance les voisins. Décoratif et
// additionnel : le repli reduced-motion/no-JS est la grille de compétences
// statique déjà présente juste au-dessus (aucune duplication nécessaire ici).

import { profile } from '../data/profile.js';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function tr(field) {
  if (field == null) return '';
  if (typeof field === 'string') return field;
  const lang = document.documentElement.lang === 'en' ? 'en' : 'fr';
  return field[lang] ?? field.fr ?? '';
}

function buildGraph() {
  const skillLabels = new Map(); // normalized -> display label
  profile.skills.forEach((g) => {
    g.pills.forEach((p) => {
      const label = tr(p.label);
      skillLabels.set(label.toLowerCase(), label);
    });
  });

  const nodes = [];
  const links = [];
  const skillNodeId = new Map();

  profile.projects.forEach((project) => {
    const projectId = 'p-' + project.slug;
    const matched = [];
    project.stack.forEach((s) => {
      const key = String(s).toLowerCase();
      if (skillLabels.has(key)) matched.push(skillLabels.get(key));
    });
    if (!matched.length) return;

    nodes.push({ id: projectId, label: tr(project.title), type: 'project' });
    matched.forEach((label) => {
      const skillId = 'k-' + label.toLowerCase().replace(/\s+/g, '-');
      if (!skillNodeId.has(skillId)) {
        skillNodeId.set(skillId, label);
        nodes.push({ id: skillId, label, type: 'skill' });
      }
      links.push({ source: projectId, target: skillId });
    });
  });

  return { nodes, links };
}

class ForceGraph {
  constructor(wrap, nodesData, links) {
    this.wrap = wrap;
    this.svg = wrap.querySelector('#skillsGraphEdges');
    this.nodesLayer = wrap.querySelector('#skillsGraphNodes');
    this.links = links;
    this.nodes = nodesData.map((n) => ({
      ...n,
      x: Math.random() * 400,
      y: Math.random() * 260,
      vx: 0,
      vy: 0,
    }));
    this.neighbors = new Map();
    this.nodes.forEach((n) => this.neighbors.set(n.id, new Set()));
    this.links.forEach((l) => {
      this.neighbors.get(l.source)?.add(l.target);
      this.neighbors.get(l.target)?.add(l.source);
    });

    this.buildDom();
    this.raf = null;
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.start();
  }

  buildDom() {
    const NS = 'http://www.w3.org/2000/svg';
    this.edgeEls = this.links.map(() => {
      const line = document.createElementNS(NS, 'line');
      line.setAttribute('class', 'sg-edge');
      this.svg.appendChild(line);
      return line;
    });

    this.nodeEls = this.nodes.map((n) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'sg-node sg-node-' + n.type;
      btn.textContent = n.label;
      btn.setAttribute('aria-label', n.label);
      btn.addEventListener('mouseenter', () => this.highlight(n.id));
      btn.addEventListener('focus', () => this.highlight(n.id));
      btn.addEventListener('mouseleave', () => this.highlight(null));
      btn.addEventListener('blur', () => this.highlight(null));
      this.nodesLayer.appendChild(btn);
      return btn;
    });
  }

  highlight(id) {
    const neighborSet = id ? this.neighbors.get(id) : null;
    this.nodes.forEach((n, i) => {
      const isActive = !id || n.id === id || neighborSet?.has(n.id);
      this.nodeEls[i].classList.toggle('sg-dim', !isActive);
    });
    this.links.forEach((l, i) => {
      const isActive = !id || l.source === id || l.target === id;
      this.edgeEls[i].classList.toggle('sg-dim', !isActive);
    });
  }

  resize() {
    this.width = this.wrap.clientWidth;
    this.height = this.wrap.clientHeight;
    this.svg.setAttribute('viewBox', `0 0 ${this.width} ${this.height}`);
  }

  tick(dt) {
    const nodes = this.nodes;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      let fx = 0;
      let fy = 0;
      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue;
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distSq = Math.max(200, dx * dx + dy * dy);
        const force = 2200 / distSq;
        fx += (dx / Math.sqrt(distSq)) * force;
        fy += (dy / Math.sqrt(distSq)) * force;
      }
      fx += (this.width / 2 - a.x) * 0.008;
      fy += (this.height / 2 - a.y) * 0.008;
      a.vx = (a.vx + fx) * 0.82;
      a.vy = (a.vy + fy) * 0.82;
    }
    this.links.forEach((l) => {
      const a = nodes.find((n) => n.id === l.source);
      const b = nodes.find((n) => n.id === l.target);
      if (!a || !b) return;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const restLength = 90;
      const force = (dist - restLength) * 0.02;
      const fx = (dx / dist) * force;
      const fy = (dy / dist) * force;
      a.vx += fx;
      a.vy += fy;
      b.vx -= fx;
      b.vy -= fy;
    });
    nodes.forEach((n) => {
      n.x = Math.max(20, Math.min(this.width - 20, n.x + n.vx));
      n.y = Math.max(14, Math.min(this.height - 14, n.y + n.vy));
    });
  }

  render() {
    this.nodes.forEach((n, i) => {
      this.nodeEls[i].style.transform = `translate(${n.x}px, ${n.y}px)`;
    });
    this.links.forEach((l, i) => {
      const a = this.nodes.find((n) => n.id === l.source);
      const b = this.nodes.find((n) => n.id === l.target);
      if (!a || !b) return;
      const line = this.edgeEls[i];
      line.setAttribute('x1', a.x);
      line.setAttribute('y1', a.y);
      line.setAttribute('x2', b.x);
      line.setAttribute('y2', b.y);
    });
  }

  start() {
    let last = performance.now();
    let settled = 0;
    const loop = (t) => {
      const dt = Math.min(0.05, (t - last) / 1000) * 60;
      last = t;
      this.tick(dt);
      this.render();
      const totalV = this.nodes.reduce((s, n) => s + Math.abs(n.vx) + Math.abs(n.vy), 0);
      settled = totalV < 0.5 ? settled + 1 : 0;
      if (settled < 60) this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }
}

export function initSkillsGraph() {
  const wrap = document.getElementById('skillsGraphWrap');
  if (!wrap) return;
  if (reducedMotion) {
    wrap.hidden = true;
    return;
  }
  const { nodes, links } = buildGraph();
  if (!nodes.length) {
    wrap.hidden = true;
    return;
  }
  new ForceGraph(wrap, nodes, links);
}
