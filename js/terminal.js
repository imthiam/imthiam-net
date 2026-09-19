// Mini-terminal (touche ` ou bouton discret) : commandes lisant data/profile.js,
// la même source unique que le reste du site (rendu, palette, CV).

import { profile } from '../data/profile.js';
import { getLang, getTheme, setThemeExternal, setLangExternal } from './main.js';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function tr(field) {
  if (field == null) return { fr: '', en: '' };
  if (typeof field === 'string') return { fr: field, en: field };
  return field;
}
function L(field) {
  return tr(field)[getLang()];
}

function println(text = '') {
  const output = document.getElementById('termOutput');
  const line = document.createElement('div');
  line.className = 'term-line';
  line.textContent = text;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

function printCommandEcho(cmd) {
  const output = document.getElementById('termOutput');
  const line = document.createElement('div');
  line.className = 'term-line term-echo';
  line.textContent = '$ ' + cmd;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

const COMMANDS = {
  help() {
    println(getLang() === 'fr' ? 'Commandes disponibles :' : 'Available commands:');
    [
      'help', 'whoami', 'skills', 'projects', 'experience', 'education',
      'contact', 'theme dark|light', 'lang fr|en', 'cv', 'clear', 'sudo hire-me',
    ].forEach((c) => println('  ' + c));
  },
  whoami() {
    println(profile.identity.name);
    println(L(profile.identity.tagline));
    println(profile.identity.taglineSuffix);
  },
  skills() {
    profile.skills.forEach((g) => {
      println(L(g.title) + ':');
      println('  ' + g.pills.map((p) => (typeof p.label === 'string' ? p.label : L(p.label))).join(', '));
    });
  },
  projects() {
    profile.projects.forEach((p, i) => {
      println(`${i + 1}. ${L(p.title)}`);
    });
  },
  experience() {
    profile.timeline
      .filter((e) => e.category !== 'formation')
      .forEach((e) => {
        println(`${L(e.date)}  ${L(e.role)}  ·  ${L(e.org)}`);
      });
  },
  education() {
    profile.timeline
      .filter((e) => e.category === 'formation')
      .forEach((e) => {
        println(`${L(e.date)}  ${L(e.role)}  ·  ${L(e.org)}`);
      });
  },
  contact() {
    println('email    ' + profile.links.email);
    println('linkedin ' + profile.links.linkedinLabel);
    println('github   ' + profile.links.githubLabel);
    println('phone    ' + profile.links.phoneLabel);
  },
  theme(arg) {
    if (arg === 'dark' || arg === 'light') {
      setThemeExternal(arg);
      println(getLang() === 'fr' ? `Thème réglé sur ${arg}.` : `Theme set to ${arg}.`);
    } else {
      println('usage: theme dark|light');
    }
  },
  lang(arg) {
    if (arg === 'fr' || arg === 'en') {
      setLangExternal(arg);
      println(arg === 'fr' ? 'Langue réglée sur fr.' : 'Language set to en.');
    } else {
      println('usage: lang fr|en');
    }
  },
  cv() {
    println(getLang() === 'fr' ? 'Ouverture du CV…' : 'Opening CV…');
    window.open('cv.html', '_blank');
  },
  clear() {
    document.getElementById('termOutput').innerHTML = '';
  },
  sudo(arg, rest) {
    if (arg === 'hire-me') {
      println(getLang() === 'fr' ? "Permission accordée. Direction : section contact." : 'Permission granted. Heading to the contact section.');
      const contact = document.getElementById('contact');
      contact?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    } else {
      println(getLang() === 'fr' ? 'Permission refusée.' : 'Permission denied.');
    }
  },
};

function run(raw) {
  const trimmed = raw.trim();
  printCommandEcho(trimmed);
  if (!trimmed) return;
  const [cmd, ...args] = trimmed.split(/\s+/);
  const handler = COMMANDS[cmd.toLowerCase()];
  if (!handler) {
    println(getLang() === 'fr' ? `Commande introuvable : ${cmd} (essayez "help")` : `Command not found: ${cmd} (try "help")`);
    return;
  }
  handler(args[0], args.slice(1));
}

let isOpen = false;
const history = [];
let historyIndex = -1;

function open() {
  const panel = document.getElementById('termPanel');
  const input = document.getElementById('termInput');
  if (!panel || !input) return;
  isOpen = true;
  panel.hidden = false;
  requestAnimationFrame(() => panel.classList.add('open'));
  input.value = '';
  input.focus();
}

function close() {
  const panel = document.getElementById('termPanel');
  if (!panel || !isOpen) return;
  isOpen = false;
  panel.classList.remove('open');
  setTimeout(
    () => {
      panel.hidden = true;
    },
    reducedMotion ? 0 : 200
  );
}

export function initTerminal() {
  const panel = document.getElementById('termPanel');
  const input = document.getElementById('termInput');
  const trigger = document.getElementById('termTrigger');
  const closeBtn = document.getElementById('termCloseBtn');
  if (!panel || !input) return;

  trigger?.addEventListener('click', () => (isOpen ? close() : open()));
  closeBtn?.addEventListener('click', close);

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = input.value;
      input.value = '';
      if (val.trim()) {
        history.push(val);
        historyIndex = history.length;
      }
      run(val);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        input.value = history[historyIndex] || '';
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        historyIndex++;
        input.value = history[historyIndex] || '';
      } else {
        historyIndex = history.length;
        input.value = '';
      }
    } else if (e.key === 'Escape') {
      close();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === '`' && !isOpen) {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      e.preventDefault();
      open();
    } else if (e.key === 'Escape' && isOpen) {
      close();
    }
  });

  println(getLang() === 'fr' ? 'Tapez "help" pour la liste des commandes.' : 'Type "help" for the list of commands.');
}
