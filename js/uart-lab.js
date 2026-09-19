// Labo UART (P2, lié au projet "IP UART sur FPGA") : un caractère tapé est
// converti en trame 8N1 (start, 8 bits de données LSB d'abord, stop) et
// animé façon oscilloscope. Le temps réel par bit (1/baud) est affiché ;
// la vitesse d'animation est simplement lisible, pas électriquement exacte.

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const VISUAL_DURATION = { 300: 3000, 1200: 2200, 9600: 1400, 115200: 700 };
const LABELS = ['START', 'D0', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'STOP'];

function frameBits(charCode) {
  const bits = [0]; // start bit
  for (let i = 0; i < 8; i++) bits.push((charCode >> i) & 1); // LSB first
  bits.push(1); // stop bit
  return bits;
}

let raf = null;

function draw(ctx, width, height, bits, progress, accent, muted) {
  ctx.clearRect(0, 0, width, height);
  const segW = width / bits.length;
  const highY = height * 0.3;
  const lowY = height * 0.7;
  const cursorX = progress * width;

  ctx.strokeStyle = accent;
  ctx.lineWidth = 2;
  ctx.beginPath();
  let started = false;
  for (let i = 0; i < bits.length; i++) {
    const x0 = i * segW;
    const x1 = Math.min((i + 1) * segW, cursorX);
    if (x1 <= x0) break;
    const y = bits[i] ? highY : lowY;
    if (!started) {
      ctx.moveTo(x0, y);
      started = true;
    } else {
      ctx.lineTo(x0, y);
    }
    ctx.lineTo(x1, y);
  }
  ctx.stroke();

  ctx.fillStyle = muted;
  ctx.font = '10px DM Mono, monospace';
  ctx.textAlign = 'center';
  bits.forEach((_, i) => {
    if (cursorX > i * segW) {
      ctx.fillText(LABELS[i], i * segW + segW / 2, height - 6);
    }
  });

  if (progress < 1) {
    ctx.strokeStyle = accent;
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.moveTo(cursorX, 0);
    ctx.lineTo(cursorX, height - 16);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
}

function animate(canvas, bits, duration) {
  if (raf) cancelAnimationFrame(raf);
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = canvas.clientWidth || 400;
  const height = canvas.clientHeight || 140;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const style = getComputedStyle(document.documentElement);
  const accent = style.getPropertyValue('--accent').trim() || '#00d4ff';
  const muted = style.getPropertyValue('--text3').trim() || '#888';

  if (reducedMotion) {
    draw(ctx, width, height, bits, 1, accent, muted);
    return;
  }

  const start = performance.now();
  function tick(t) {
    const progress = Math.min(1, (t - start) / duration);
    draw(ctx, width, height, bits, progress, accent, muted);
    if (progress < 1) raf = requestAnimationFrame(tick);
  }
  draw(ctx, width, height, bits, 0, accent, muted);
  raf = requestAnimationFrame(tick);
}

function update(container) {
  const input = container.querySelector('#uartCharInput');
  const baudSelect = container.querySelector('#uartBaudSelect');
  const canvas = container.querySelector('#uartCanvas');
  const readout = container.querySelector('#uartReadout');
  const char = (input.value || 'A').charAt(0) || 'A';
  const code = char.charCodeAt(0) & 0xff;
  const baud = parseInt(baudSelect.value, 10);
  const bits = frameBits(code);
  const binary = code.toString(2).padStart(8, '0');
  const bitTimeUs = (1 / baud) * 1e6;

  readout.textContent = `'${char}'  →  ASCII ${code}  →  ${binary}  ·  ${bitTimeUs.toFixed(1)} µs/bit @ ${baud} baud`;

  animate(canvas, bits, VISUAL_DURATION[baud] || 1400);
}

export function initUartLab(container) {
  if (!container || container.dataset.uartInit) {
    if (container) update(container);
    return;
  }
  container.dataset.uartInit = '1';
  const input = container.querySelector('#uartCharInput');
  const baudSelect = container.querySelector('#uartBaudSelect');
  input.addEventListener('input', () => update(container));
  baudSelect.addEventListener('change', () => update(container));
  window.addEventListener('resize', () => update(container));
  update(container);
}
