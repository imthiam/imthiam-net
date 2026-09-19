// Frise "parcours" : filtre Expérience/Formation/International + tracé SVG façon
// piste de circuit imprimé qui se dessine au scroll, avec vias et impulsion lumineuse.
// Décoratif uniquement : aria-hidden, le contenu réel reste en texte dans le DOM.

const NS = 'http://www.w3.org/2000/svg';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

class PCBTrace {
  constructor(container) {
    this.container = container;
    this.length = 0;
    this.raf = null;
    this.build();
  }

  build() {
    this.svg = document.createElementNS(NS, 'svg');
    this.svg.setAttribute('class', 'timeline-trace');
    this.svg.setAttribute('aria-hidden', 'true');

    this.path = document.createElementNS(NS, 'path');
    this.path.setAttribute('class', 'timeline-trace-path');
    this.svg.appendChild(this.path);

    this.pulse = document.createElementNS(NS, 'circle');
    this.pulse.setAttribute('class', 'timeline-trace-pulse');
    this.pulse.setAttribute('r', '4');
    this.svg.appendChild(this.pulse);

    this.container.prepend(this.svg);
    this.refresh();
  }

  visibleItems() {
    return Array.from(this.container.querySelectorAll('.tl-item')).filter(
      (el) => el.style.display !== 'none'
    );
  }

  refresh() {
    if (!this.svg) return;
    const containerRect = this.container.getBoundingClientRect();
    const height = this.container.scrollHeight;
    const items = this.visibleItems();

    let x = 20;
    const dotYs = [];
    items.forEach((item) => {
      const dot = item.querySelector('.tl-dot');
      if (!dot) return;
      const dr = dot.getBoundingClientRect();
      x = dr.left - containerRect.left + dr.width / 2;
      dotYs.push(dr.top - containerRect.top + dr.height / 2);
    });

    this.svg.setAttribute('width', x + 20);
    this.svg.setAttribute('height', height);
    this.svg.setAttribute('viewBox', `0 0 ${x + 20} ${height}`);

    let d = `M ${x} 0`;
    dotYs.forEach((y) => {
      d += ` L ${x} ${y}`;
    });
    d += ` L ${x} ${height}`;
    this.path.setAttribute('d', d);

    this.svg.querySelectorAll('.timeline-trace-via').forEach((v) => v.remove());
    dotYs.forEach((y) => {
      const via = document.createElementNS(NS, 'rect');
      via.setAttribute('class', 'timeline-trace-via');
      via.setAttribute('x', x - 5);
      via.setAttribute('y', y - 5);
      via.setAttribute('width', 10);
      via.setAttribute('height', 10);
      via.setAttribute('rx', 2);
      this.svg.insertBefore(via, this.pulse);
    });

    this.length = this.path.getTotalLength();
    this.path.style.strokeDasharray = String(this.length);

    if (reducedMotion) {
      this.path.style.strokeDashoffset = '0';
      this.pulse.style.opacity = '0';
    } else {
      this.onScroll();
    }
  }

  onScroll() {
    if (reducedMotion || !this.path || this.raf) return;
    this.raf = requestAnimationFrame(() => {
      this.raf = null;
      const rect = this.container.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.85 - rect.top) / rect.height));
      this.path.style.strokeDashoffset = String(this.length * (1 - progress));
      const drawn = this.length * progress;
      if (drawn > 0 && this.path.getPointAtLength) {
        const pt = this.path.getPointAtLength(Math.min(drawn, this.length));
        this.pulse.setAttribute('cx', String(pt.x));
        this.pulse.setAttribute('cy', String(pt.y));
        this.pulse.style.opacity = progress > 0.01 && progress < 0.995 ? '1' : '0';
      }
    });
  }
}

function initFilter(trace) {
  const tabs = document.querySelectorAll('#timelineFilterTabs .ftab');
  if (!tabs.length) return;
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      const f = tab.dataset.filter;
      document.querySelectorAll('#timelineList .tl-item').forEach((item) => {
        item.style.display = f === 'all' || item.dataset.cat === f ? '' : 'none';
      });
      trace.refresh();
    });
  });
}

export function initTimeline() {
  const container = document.getElementById('timelineList');
  if (!container) return;
  const trace = new PCBTrace(container);
  initFilter(trace);

  if (!reducedMotion) {
    window.addEventListener('scroll', () => trace.onScroll(), { passive: true });
    window.addEventListener('resize', () => trace.refresh());
  }
  document.addEventListener('langchange', () => trace.refresh());
}
