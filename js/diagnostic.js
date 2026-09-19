// Konami code → mode diagnostic (grille, contours des blocs, FPS). ASCII art
// en console au chargement, visible dès l'ouverture des devtools puisque
// l'historique de la console conserve les logs précédents.

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

function logAsciiArt() {
  const art = [
    ' __  __      _______ _     _                 ',
    '|  \\/  |    |__   __| |   (_)                ',
    '| \\  / | ___   | |  | |__  _  __ _ _ __ ___   ',
    "| |\\/| |/ _ \\  | |  | '_ \\| |/ _` | '_ ` _ \\  ",
    '| |  | | (_) | | |  | | | | | (_| | | | | | | ',
    '|_|  |_|\\___/  |_|  |_| |_|_|\\__,_|_| |_| |_| ',
  ].join('\n');
  console.log('%c' + art, 'color:#00d4ff;font-family:monospace;font-size:10px;line-height:1.2;');
  console.log('%cVous regardez sous le capot ? Parlons-en : imthiam@icloud.com', 'color:#8b95a3;font-family:monospace;font-size:12px;');
  console.log('%cLooking under the hood? Let\'s talk: imthiam@icloud.com', 'color:#8b95a3;font-family:monospace;font-size:12px;');
}

let fpsRaf = null;
function startFPS() {
  const el = document.getElementById('diagnosticFps');
  let frames = 0;
  let last = performance.now();
  function tick(t) {
    frames++;
    const elapsed = t - last;
    if (elapsed >= 1000) {
      if (el) el.textContent = Math.round((frames * 1000) / elapsed) + ' fps';
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

function toggleDiagnostic() {
  const active = document.body.classList.toggle('diagnostic-active');
  const badge = document.getElementById('diagnosticBadge');
  if (badge) badge.hidden = !active;
  if (active) startFPS();
  else stopFPS();
}

export function initDiagnostic() {
  logAsciiArt();
  let buffer = [];
  window.addEventListener('keydown', (e) => {
    const tag = document.activeElement?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    buffer.push(e.key);
    if (buffer.length > KONAMI.length) buffer.shift();
    if (buffer.length === KONAMI.length && buffer.every((k, i) => k === KONAMI[i])) {
      toggleDiagnostic();
      buffer = [];
    }
  });
}
