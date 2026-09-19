// Séquence de boot : terminal plein écran affiché une fois par session, passable
// par touche ou clic, désactivée en reduced-motion. Purement décorative : le
// contenu réel du site est déjà présent derrière (aria-hidden en permanence).

const BOOT_KEY = 'mt-boot-seen';
const LINES = [
  '[ OK ] init clock',
  '[ OK ] mount /projects',
  '[ OK ] mount /experience',
  '[ OK ] load skills.db',
  '[ OK ] init render pipeline',
  '[ OK ] load profile: Mohamed Thiam',
  '[ OK ] ready',
];
const STEP_MS = 260;
const HOLD_MS = 300;
const FADE_MS = 400;

export function initBoot() {
  const screen = document.getElementById('bootScreen');
  const log = document.getElementById('bootLog');
  if (!screen || !log) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || sessionStorage.getItem(BOOT_KEY)) return;

  screen.hidden = false;
  document.body.style.overflow = 'hidden';

  let i = 0;
  let done = false;
  let timer = null;

  function finish() {
    if (done) return;
    done = true;
    clearTimeout(timer);
    screen.removeEventListener('click', finish);
    window.removeEventListener('keydown', finish);
    sessionStorage.setItem(BOOT_KEY, '1');
    screen.classList.add('boot-exit');
    document.body.style.overflow = '';
    setTimeout(() => {
      screen.hidden = true;
      screen.classList.remove('boot-exit');
    }, FADE_MS);
  }

  function appendLine() {
    if (i >= LINES.length) {
      timer = setTimeout(finish, HOLD_MS);
      return;
    }
    const line = document.createElement('div');
    line.textContent = LINES[i];
    log.appendChild(line);
    i++;
    timer = setTimeout(appendLine, STEP_MS);
  }

  screen.addEventListener('click', finish);
  window.addEventListener('keydown', finish);
  timer = setTimeout(appendLine, STEP_MS);
}
