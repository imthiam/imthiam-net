// Micro-interactions "signature ingénieur" : scramble-text sur les titres de
// section, tilt 3D + halo curseur sur les cartes, boutons magnétiques, barre
// de progression de scroll, compteurs animés. Toutes désactivées ou réduites
// sous prefers-reduced-motion ; tilt/halo/magnétisme réservés au pointeur fin.

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;

/* ── SCRAMBLE TEXT ── */
const SCRAMBLE_CHARS = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&';

function plainTextWithBreaks(el) {
  const clone = el.cloneNode(true);
  clone.querySelectorAll('br').forEach((br) => br.replaceWith(' '));
  return clone.textContent;
}

function scrambleElement(el) {
  const original = el.innerHTML;
  const plain = plainTextWithBreaks(el);
  const len = plain.length;
  const totalFrames = Math.min(28, Math.max(10, len));
  let frame = 0;

  function tick() {
    frame++;
    const revealCount = Math.floor((frame / totalFrames) * len);
    let out = '';
    for (let i = 0; i < len; i++) {
      if (plain[i] === ' ') {
        out += ' ';
      } else {
        out += i < revealCount ? plain[i] : SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0];
      }
    }
    el.textContent = out;
    if (frame < totalFrames) {
      requestAnimationFrame(tick);
    } else {
      el.innerHTML = original;
    }
  }
  requestAnimationFrame(tick);
}

function initScramble() {
  if (reducedMotion || !('IntersectionObserver' in window)) return;
  const headings = document.querySelectorAll('section h2');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          scrambleElement(e.target);
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  headings.forEach((h) => io.observe(h));
}

/* ── TILT + HALO ── */
function initTilt() {
  if (reducedMotion || !finePointer) return;
  const cards = document.querySelectorAll('.company-card, .pcard, .skill-group');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * 8;
      const rotateX = (0.5 - py) * 8;
      card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
      card.style.setProperty('--halo-x', `${px * 100}%`);
      card.style.setProperty('--halo-y', `${py * 100}%`);
      card.classList.add('tilt-active');
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.classList.remove('tilt-active');
    });
  });
}

/* ── MAGNETIC BUTTONS ── */
function initMagnetic() {
  if (reducedMotion || !finePointer) return;
  const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
  const radius = 60;
  buttons.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < radius) {
        btn.style.transform = `translate(${dx * 0.25}px, ${dy * 0.25}px)`;
      }
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

/* ── SCROLL PROGRESS ── */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  let raf = null;
  function update() {
    raf = null;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
    bar.style.transform = `scaleX(${progress})`;
  }
  window.addEventListener(
    'scroll',
    () => {
      if (!raf) raf = requestAnimationFrame(update);
    },
    { passive: true }
  );
  update();
}

/* ── ANIMATED COUNTERS ── */
function initCounters() {
  const nums = document.querySelectorAll('.stat-num-value[data-value]');
  if (!nums.length) return;
  if (reducedMotion || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        const el = e.target;
        const target = parseInt(el.dataset.value, 10) || 0;
        const duration = 900;
        const start = performance.now();
        function tick(t) {
          const p = Math.min(1, (t - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = String(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.3 }
  );
  nums.forEach((el) => io.observe(el));
}

/* ── CROSSHAIR CURSOR (P2, pointer: fine only) ── */
function initCrosshairCursor() {
  if (reducedMotion || !finePointer) return;
  const h = document.getElementById('crosshairH');
  const v = document.getElementById('crosshairV');
  const label = document.getElementById('crosshairLabel');
  if (!h || !v || !label) return;

  let shown = false;
  document.addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse') return;
      if (!shown) {
        document.body.classList.add('crosshair-active');
        shown = true;
      }
      h.style.transform = `translateY(${e.clientY}px)`;
      v.style.transform = `translateX(${e.clientX}px)`;
      label.style.transform = `translate(${e.clientX + 14}px, ${e.clientY + 14}px)`;
      label.textContent = `${e.clientX}, ${e.clientY}`;
    },
    { passive: true }
  );
  document.addEventListener('pointerleave', () => {
    document.body.classList.remove('crosshair-active');
    shown = false;
  });
}

export function initMicrointeractions() {
  initScramble();
  initTilt();
  initMagnetic();
  initScrollProgress();
  initCounters();
  initCrosshairCursor();
}
