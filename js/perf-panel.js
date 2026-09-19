// "Sous le capot" : mesures live du site (jamais de valeurs en dur). LCP/CLS/
// INP via PerformanceObserver (démarrés au chargement, affichés à l'ouverture
// du panneau), FPS mesuré en direct pendant que le panneau est ouvert, poids
// transféré et nœuds DOM recalculés à chaque ouverture.

let lcp = null;
let cls = 0;
let inp = null;

function startObservers() {
  if (!('PerformanceObserver' in window)) return;
  try {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1];
      if (last) lcp = last.renderTime || last.loadTime || last.startTime;
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (e) {
    /* not supported */
  }
  try {
    new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (!entry.hadRecentInput) cls += entry.value;
      });
    }).observe({ type: 'layout-shift', buffered: true });
  } catch (e) {
    /* not supported */
  }
  try {
    new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.interactionId && (inp === null || entry.duration > inp)) {
          inp = entry.duration;
        }
      });
    }).observe({ type: 'event', buffered: true, durationThreshold: 16 });
  } catch (e) {
    /* not supported */
  }
}

function transferredBytes() {
  const resources = performance.getEntriesByType('resource');
  const nav = performance.getEntriesByType('navigation')[0];
  let total = nav ? nav.transferSize || 0 : 0;
  resources.forEach((r) => {
    total += r.transferSize || 0;
  });
  return total;
}

function formatKB(bytes) {
  return bytes > 0 ? (bytes / 1024).toFixed(1) + ' KB' : '—';
}

function row(label, value) {
  const el = document.createElement('div');
  el.className = 'hood-row';
  const l = document.createElement('span');
  l.className = 'hood-label';
  l.textContent = label;
  const v = document.createElement('span');
  v.className = 'hood-value';
  v.textContent = value;
  el.append(l, v);
  return el;
}

let fpsRaf = null;

function startFPS(target) {
  let frames = 0;
  let last = performance.now();
  function tick(t) {
    frames++;
    const elapsed = t - last;
    if (elapsed >= 1000) {
      target.textContent = Math.round((frames * 1000) / elapsed) + ' fps';
      frames = 0;
      last = t;
    }
    fpsRaf = requestAnimationFrame(tick);
  }
  fpsRaf = requestAnimationFrame(tick);
}

function stopFPS() {
  if (fpsRaf) cancelAnimationFrame(fpsRaf);
  fpsRaf = null;
}

function refresh() {
  const lang = document.documentElement.lang === 'en' ? 'en' : 'fr';
  const grid = document.getElementById('hoodGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const fpsRow = row('FPS', lang === 'fr' ? 'mesure…' : 'measuring…');
  grid.appendChild(fpsRow);
  startFPS(fpsRow.querySelector('.hood-value'));

  grid.appendChild(row('LCP', lcp !== null ? Math.round(lcp) + ' ms' : '—'));
  grid.appendChild(row('CLS', cls.toFixed(3)));
  grid.appendChild(row('INP', inp !== null ? Math.round(inp) + ' ms' : '—'));
  grid.appendChild(row(lang === 'fr' ? 'Poids transféré' : 'Transferred weight', formatKB(transferredBytes())));
  grid.appendChild(row(lang === 'fr' ? 'Nœuds DOM' : 'DOM nodes', String(document.getElementsByTagName('*').length)));
}

function open() {
  const backdrop = document.getElementById('hoodBackdrop');
  const panel = document.getElementById('hoodPanel');
  if (!backdrop) return;
  backdrop.hidden = false;
  requestAnimationFrame(() => backdrop.classList.add('open'));
  panel?.focus();
  refresh();
}

function close() {
  const backdrop = document.getElementById('hoodBackdrop');
  if (!backdrop || backdrop.hidden) return;
  backdrop.classList.remove('open');
  stopFPS();
  setTimeout(() => {
    backdrop.hidden = true;
  }, 200);
}

function updateFooterWeight() {
  const el = document.getElementById('footerWeight');
  if (!el) return;
  const lang = document.documentElement.lang === 'en' ? 'en' : 'fr';
  const kb = formatKB(transferredBytes());
  el.textContent = lang === 'fr' ? `Page : ${kb} transférés.` : `Page: ${kb} transferred.`;
}

export function initPerfPanel() {
  startObservers();
  document.getElementById('hoodBtn')?.addEventListener('click', open);
  document.getElementById('hoodCloseBtn')?.addEventListener('click', close);
  document.getElementById('hoodBackdrop')?.addEventListener('click', (e) => {
    if (e.target.id === 'hoodBackdrop') close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  if (document.readyState === 'complete') {
    updateFooterWeight();
  } else {
    window.addEventListener('load', updateFooterWeight);
  }
  document.addEventListener('langchange', updateFooterWeight);
}
