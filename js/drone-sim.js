// Simulation de drone autonome (hero) : contrôleur PID réel (codé à la main,
// pas d'animation pré-calculée) suivant une boucle de waypoints, "scan" de
// marqueurs façon codes-barres, télémétrie live. Générique : aucun détail
// interne d'une entreprise. Un clic ajoute un waypoint et recalcule la route.

const DEFAULT_WAYPOINTS = [
  { x: 0.15, y: 0.28 },
  { x: 0.48, y: 0.16 },
  { x: 0.85, y: 0.32 },
  { x: 0.68, y: 0.78 },
  { x: 0.22, y: 0.68 },
];

const MAX_SPEED = 220; // px/s
const SCAN_RADIUS = 16; // px, distance under which the drone starts scanning
const SCAN_DURATION = 700; // ms
const TRAIL_LENGTH = 40;

class PID {
  constructor(kp, ki, kd) {
    this.kp = kp;
    this.ki = ki;
    this.kd = kd;
    this.reset();
  }
  reset() {
    this.integral = 0;
    this.prevError = 0;
    this.hasPrev = false;
  }
  update(error, dt) {
    this.integral = Math.max(-300, Math.min(300, this.integral + error * dt));
    const derivative = this.hasPrev && dt > 0 ? (error - this.prevError) / dt : 0;
    this.prevError = error;
    this.hasPrev = true;
    return this.kp * error + this.ki * this.integral + this.kd * derivative;
  }
}

export function initDroneSim() {
  const wrap = document.getElementById('droneSimWrap');
  const canvas = document.getElementById('droneCanvas');
  if (!wrap || !canvas || !canvas.getContext) return;
  const ctx = canvas.getContext('2d');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const style = getComputedStyle(document.documentElement);
  const accent = style.getPropertyValue('--accent').trim() || '#00d4ff';

  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  const waypoints = DEFAULT_WAYPOINTS.map((w) => ({ ...w }));
  let targetIndex = 0;
  let pos = { x: 0, y: 0 };
  let vel = { x: 0, y: 0 };
  let items = 0;
  let state = 'TRANSIT';
  let scanUntil = 0;
  const trail = [];
  const pidX = new PID(2.4, 0.15, 0.9);
  const pidY = new PID(2.4, 0.15, 0.9);

  function resize() {
    const rect = wrap.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(width * dpr));
    canvas.height = Math.max(1, Math.round(height * dpr));
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function wpPixel(w) {
    return { x: w.x * width, y: w.y * height };
  }

  function currentTarget() {
    return wpPixel(waypoints[targetIndex % waypoints.length]);
  }

  function updateTelemetry() {
    const posEl = document.getElementById('dtPos');
    const velEl = document.getElementById('dtVel');
    const errEl = document.getElementById('dtErr');
    const stateEl = document.getElementById('dtState');
    const itemsEl = document.getElementById('dtItems');
    const target = currentTarget();
    const err = Math.hypot(target.x - pos.x, target.y - pos.y);
    if (posEl) posEl.textContent = `${(pos.x / width * 100).toFixed(1)}, ${(pos.y / height * 100).toFixed(1)}`;
    if (velEl) velEl.textContent = Math.hypot(vel.x, vel.y).toFixed(0);
    if (errEl) errEl.textContent = err.toFixed(0);
    if (stateEl) stateEl.textContent = state;
    if (itemsEl) itemsEl.textContent = String(items);
  }

  function step(dt) {
    const target = currentTarget();
    const dx = target.x - pos.x;
    const dy = target.y - pos.y;
    const dist = Math.hypot(dx, dy);

    if (state === 'SCAN') {
      vel.x = 0;
      vel.y = 0;
      if (performance.now() >= scanUntil) {
        state = 'TRANSIT';
        targetIndex = (targetIndex + 1) % waypoints.length;
        pidX.reset();
        pidY.reset();
      }
      return;
    }

    if (dist < SCAN_RADIUS) {
      state = 'SCAN';
      scanUntil = performance.now() + SCAN_DURATION;
      items++;
      vel.x = 0;
      vel.y = 0;
      return;
    }

    const ax = pidX.update(dx, dt);
    const ay = pidY.update(dy, dt);
    vel.x += ax * dt;
    vel.y += ay * dt;
    const speed = Math.hypot(vel.x, vel.y);
    if (speed > MAX_SPEED) {
      vel.x = (vel.x / speed) * MAX_SPEED;
      vel.y = (vel.y / speed) * MAX_SPEED;
    }
    pos.x += vel.x * dt;
    pos.y += vel.y * dt;

    trail.push({ x: pos.x, y: pos.y });
    if (trail.length > TRAIL_LENGTH) trail.shift();
  }

  function drawGrid() {
    ctx.strokeStyle = 'rgba(0,212,255,0.06)';
    ctx.lineWidth = 1;
    const gap = 28;
    for (let x = 0; x < width; x += gap) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gap) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }

  function drawBarcode(x, y, active) {
    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = active ? 1 : 0.55;
    const barW = 2;
    const widths = [1, 2, 1, 3, 1, 2, 1, 1, 2];
    let bx = -14;
    ctx.fillStyle = active ? accent : 'rgba(255,255,255,0.4)';
    widths.forEach((w, i) => {
      if (i % 2 === 0) ctx.fillRect(bx, -8, barW * w, 16);
      bx += barW * w + 1;
    });
    if (active) {
      ctx.strokeStyle = accent;
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.arc(0, 0, 20, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawDrone() {
    const angle = Math.atan2(vel.y, vel.x) || 0;
    ctx.save();
    ctx.translate(pos.x, pos.y);
    ctx.rotate(angle);
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.moveTo(10, 0);
    ctx.lineTo(-8, 6);
    ctx.lineTo(-4, 0);
    ctx.lineTo(-8, -6);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = accent;
    ctx.globalAlpha = 0.35;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    trail.forEach((p, i) => {
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.stroke();
    ctx.restore();
  }

  function render() {
    ctx.clearRect(0, 0, width, height);
    drawGrid();
    waypoints.forEach((w, i) => {
      const p = wpPixel(w);
      drawBarcode(p.x, p.y, i === targetIndex && state === 'SCAN');
    });
    drawDrone();
  }

  function drawStaticFrame() {
    resize();
    pos = wpPixel(waypoints[0]);
    ctx.clearRect(0, 0, width, height);
    drawGrid();
    waypoints.forEach((w) => {
      const p = wpPixel(w);
      drawBarcode(p.x, p.y, false);
    });
    ctx.save();
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.moveTo(pos.x + 10, pos.y);
    ctx.lineTo(pos.x - 8, pos.y + 6);
    ctx.lineTo(pos.x - 4, pos.y);
    ctx.lineTo(pos.x - 8, pos.y - 6);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  if (reducedMotion) {
    drawStaticFrame();
    const note = document.getElementById('droneSimStaticNote');
    if (note) note.hidden = false;
    return;
  }

  resize();
  pos = wpPixel(waypoints[0]);

  let running = false;
  let lastTime = 0;
  let rafId = null;

  function loop(t) {
    if (!running) return;
    const dt = Math.min(0.05, lastTime ? (t - lastTime) / 1000 : 0.016);
    lastTime = t;
    step(dt);
    render();
    updateTelemetry();
    rafId = requestAnimationFrame(loop);
  }

  function start() {
    if (running) return;
    running = true;
    lastTime = 0;
    rafId = requestAnimationFrame(loop);
  }
  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
  }

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !document.hidden) start();
          else stop();
        });
      },
      { threshold: 0.1 }
    );
    io.observe(wrap);
  } else {
    start();
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else if (wrap.getBoundingClientRect().top < window.innerHeight) start();
  });

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / width;
    const ny = (e.clientY - rect.top) / height;
    waypoints.splice(targetIndex + 1, 0, { x: nx, y: ny });
  });
}
