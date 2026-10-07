// =========================================================================
// MOHAN BABU UNIVERSITY - DATA SCIENCE LABORATORY PORTAL
// Ultra-Interactive Cybernetic Experience Engine:
// 1. Interactive Neural Constellation Particle Canvas
// 2. 3D Holographic Parallax Tilt with Cursor Specular Glare
// 3. Audio Synthesizer (Web Audio API - Zero External Dependencies)
// 4. Academic Mastery Progress Tracker & Gamification XP
// 5. Laser Scan Code Execution & Frequency Wave Pulse
// 6. Floating Cyber-Navigation HUD Dock
// =========================================================================

import confetti from 'canvas-confetti';

// -------------------------------------------------------------------------
// 1. WEB AUDIO API SYNTHESIZER
// -------------------------------------------------------------------------
let audioCtx = null;
let audioEnabled = localStorage.getItem('mbu_ds_audio_fx') !== 'false'; // default ON

function getAudioContext() {
  if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playSound(type = 'click') {
  if (!audioEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'click') {
      // Subtle soft sci-fi tick
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'execute') {
      // Futuristic dual harmonic chord
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc.start(now);
      osc.stop(now + 0.14);
    } else if (type === 'success') {
      // Triple ascending harmony
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(freq, now + idx * 0.07);
        g.gain.setValueAtTime(0.06, now + idx * 0.07);
        g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.18);
        o.connect(g);
        g.connect(ctx.destination);
        o.start(now + idx * 0.07);
        o.stop(now + idx * 0.07 + 0.2);
      });
    } else if (type === 'celebrate') {
      // Grand victory fanfare
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'triangle';
        o.frequency.setValueAtTime(freq, now + idx * 0.09);
        g.gain.setValueAtTime(0.08, now + idx * 0.09);
        g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.28);
        o.connect(g);
        g.connect(ctx.destination);
        o.start(now + idx * 0.09);
        o.stop(now + idx * 0.09 + 0.3);
      });
    }
  } catch (err) {
    // Ignore audio permission or context restrictions
  }
}

export function toggleAudioFx() {
  audioEnabled = !audioEnabled;
  localStorage.setItem('mbu_ds_audio_fx', audioEnabled ? 'true' : 'false');
  if (audioEnabled) playSound('click');
  return audioEnabled;
}

export function isAudioEnabled() {
  return audioEnabled;
}

// -------------------------------------------------------------------------
// 2. INTERACTIVE NEURAL CONSTELLATION CANVAS
// -------------------------------------------------------------------------
let particlesActive = localStorage.getItem('mbu_ds_particles_fx') !== 'false';
let canvasAnimId = null;

export function initNeuralCanvas() {
  const canvas = document.getElementById('neuralCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const particleCount = Math.min(65, Math.floor((width * height) / 18000));
  const mouse = { x: null, y: null, radius: 140 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize, { passive: true });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Shockwave burst on click
  window.addEventListener('click', (e) => {
    if (!particlesActive) return;
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI * 2 * i) / 6;
      particles.push({
        x: e.clientX,
        y: e.clientY,
        vx: Math.cos(angle) * (2 + Math.random() * 2),
        vy: Math.sin(angle) * (2 + Math.random() * 2),
        size: 2 + Math.random() * 2,
        life: 1,
        isSparks: true
      });
    }
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.75;
      this.vy = (Math.random() - 0.5) * 0.75;
      this.size = Math.random() * 2.2 + 1;
      this.baseColor = Math.random() > 0.4 ? 'rgba(56, 189, 248,' : 'rgba(99, 102, 241,';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse gentle interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }
      }
    }

    draw(isLight) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = isLight
        ? `rgba(2, 132, 199, 0.45)`
        : `${this.baseColor} 0.75)`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function render() {
    if (!particlesActive) {
      ctx.clearRect(0, 0, width, height);
      canvasAnimId = requestAnimationFrame(render);
      return;
    }

    ctx.clearRect(0, 0, width, height);
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';

    // Update and draw particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      if (p.isSparks) {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.025;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${p.life})`;
        ctx.fill();
        if (p.life <= 0) particles.splice(i, 1);
        continue;
      }

      p.update();
      p.draw(isLight);

      // Connect nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        if (p2.isSparks) continue;
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        const maxDist = 125;
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * (isLight ? 0.22 : 0.32);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = isLight
            ? `rgba(2, 132, 199, ${alpha})`
            : `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      }

      // Connect to mouse
      if (mouse.x !== null && mouse.y !== null) {
        const mDist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (mDist < mouse.radius) {
          const alpha = (1 - mDist / mouse.radius) * 0.45;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = isLight
            ? `rgba(79, 70, 229, ${alpha})`
            : `rgba(99, 102, 241, ${alpha})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }
      }
    }

    canvasAnimId = requestAnimationFrame(render);
  }

  render();
}

export function toggleParticles() {
  particlesActive = !particlesActive;
  localStorage.setItem('mbu_ds_particles_fx', particlesActive ? 'true' : 'false');
  return particlesActive;
}

export function isParticlesActive() {
  return particlesActive;
}

// -------------------------------------------------------------------------
// 3. 3D HOLOGRAPHIC PARALLAX TILT WITH DYNAMIC SPECULAR GLARE
// -------------------------------------------------------------------------
export function init3DCardTilt() {
  const cards = document.querySelectorAll('.experiment-card, .profile-card, .overview-hero-card, .tool-panel-content .card-panel');
  cards.forEach(card => {
    let glare = card.querySelector('.card-specular-glare');
    if (!glare) {
      glare = document.createElement('div');
      glare.className = 'card-specular-glare';
      card.appendChild(glare);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4.5;
      const rotateY = ((x - centerX) / centerX) * 4.5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-3px)`;
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const glareColor = isLight ? 'rgba(2, 132, 199, 0.12)' : 'rgba(56, 189, 248, 0.2)';
      glare.style.background = `radial-gradient(circle 240px at ${x}px ${y}px, ${glareColor}, transparent 70%)`;
      glare.style.opacity = '1';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      glare.style.opacity = '0';
    });
  });
}

// -------------------------------------------------------------------------
// 4. STUDENT LABORATORY MASTERY & GAMIFICATION TRACKER
// -------------------------------------------------------------------------
const TOTAL_CURRICULUM_MODULES = 19; // 2 in exp1, 2 in exp2, 3 in exp4, 5 in exp5, 7 in exp6

export function getCompletedModules() {
  try {
    const raw = localStorage.getItem('mbu_ds_completed_modules');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function getTotalExecutions() {
  return parseInt(localStorage.getItem('mbu_ds_execution_count') || '0', 10);
}

export function recordModuleCompletion(subTaskCodeId) {
  const completed = getCompletedModules();
  if (subTaskCodeId && !completed.includes(subTaskCodeId)) {
    completed.push(subTaskCodeId);
    localStorage.setItem('mbu_ds_completed_modules', JSON.stringify(completed));
  }
  const currentCount = getTotalExecutions() + 1;
  localStorage.setItem('mbu_ds_execution_count', String(currentCount));
  updateMasteryHUD();
  return { completedCount: completed.length, totalExecutions: currentCount };
}

export function updateMasteryHUD() {
  const completed = getCompletedModules();
  const count = completed.length;
  const pct = Math.min(100, Math.round((count / TOTAL_CURRICULUM_MODULES) * 100));

  const pctDisplay = document.getElementById('masteryPercentageDisplay');
  const barFill = document.getElementById('masteryProgressBarFill');
  const circleProgress = document.getElementById('masteryCircleProgress');
  const subtext = document.getElementById('masterySubtextDisplay');
  const levelBadge = document.getElementById('masteryLevelBadge');
  const executionsEl = document.getElementById('hudExecutionsCount');

  if (pctDisplay) pctDisplay.textContent = `${pct}%`;
  if (barFill) barFill.style.width = `${pct}%`;
  if (circleProgress) circleProgress.setAttribute('stroke-dasharray', `${pct}, 100`);
  if (subtext) {
    subtext.textContent = `${count} of ${TOTAL_CURRICULUM_MODULES} Practical Modules Mastered • Earn XP by executing code in the laboratory`;
  }

  if (executionsEl) {
    executionsEl.textContent = `${getTotalExecutions()} Runs`;
  }

  if (levelBadge) {
    let levelName = 'Level 1 • Lab Initiate';
    if (pct >= 80) levelName = 'Level 5 • Grandmaster';
    else if (pct >= 60) levelName = 'Level 4 • Lead Researcher';
    else if (pct >= 40) levelName = 'Level 3 • Data Scientist';
    else if (pct >= 20) levelName = 'Level 2 • Data Explorer';
    levelBadge.innerHTML = `<i data-lucide="award"></i> ${levelName}`;
  }

  if (window.lucide) lucide.createIcons();
}

export function triggerMasteryCelebration() {
  playSound('celebrate');
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#38bdf8', '#6366f1', '#a855f7', '#10b981', '#f59e0b']
  });

  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#38bdf8', '#34d399', '#60a5fa']
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#f43f5e', '#a855f7', '#fbbf24']
    });
  }, 250);
}

// -------------------------------------------------------------------------
// 5. LASER SCAN & FREQUENCY SOUNDWAVE EXECUTION VISUALIZER
// -------------------------------------------------------------------------
export function triggerLaserScanAnimation() {
  playSound('execute');
  const editorBody = document.getElementById('editorWorkspaceBody');
  if (editorBody) {
    let scanLine = editorBody.querySelector('.editor-laser-scan-line');
    if (!scanLine) {
      scanLine = document.createElement('div');
      scanLine.className = 'editor-laser-scan-line';
      editorBody.appendChild(scanLine);
    }
    scanLine.classList.remove('scanning');
    void scanLine.offsetWidth; // trigger reflow
    scanLine.classList.add('scanning');
  }

  // Neon pulse sweep on terminal
  const terminal = document.getElementById('workspaceTerminalOutput');
  if (terminal) {
    terminal.classList.add('kernel-executing-pulse');
    setTimeout(() => {
      terminal.classList.remove('kernel-executing-pulse');
    }, 600);
  }
}

// -------------------------------------------------------------------------
// 6. FLOATING HUD CYBER-DOCK INITIALIZATION
// -------------------------------------------------------------------------
export function initFloatingCyberDock(callbacks = {}) {
  const dock = document.getElementById('floatingCyberDock');
  if (!dock) return;

  const particlesBtn = document.getElementById('dockToggleParticlesBtn');
  const audioBtn = document.getElementById('dockAudioFxBtn');
  const audioIcon = document.getElementById('dockAudioIcon');
  const audioTooltip = document.getElementById('dockAudioTooltip');
  const scratchpadBtn = document.getElementById('dockScratchpadBtn');
  const confettiBtn = document.getElementById('dockConfettiBtn');
  const scrollTopBtn = document.getElementById('dockScrollTopBtn');

  // Particles Toggle
  particlesBtn?.addEventListener('click', () => {
    const active = toggleParticles();
    particlesBtn.classList.toggle('active', active);
    const tooltip = particlesBtn.querySelector('.dock-tooltip');
    if (tooltip) tooltip.textContent = `Particles FX: ${active ? 'ON' : 'OFF'}`;
    playSound('click');
  });

  // Audio Toggle
  audioBtn?.addEventListener('click', () => {
    const active = toggleAudioFx();
    audioBtn.classList.toggle('active', active);
    if (audioIcon) audioIcon.setAttribute('data-lucide', active ? 'volume-2' : 'volume-x');
    if (audioTooltip) audioTooltip.textContent = `Sound FX: ${active ? 'ON' : 'OFF'}`;
    if (window.lucide) lucide.createIcons();
  });

  // Scratchpad shortcut
  scratchpadBtn?.addEventListener('click', () => {
    playSound('click');
    if (callbacks.onOpenScratchpad) callbacks.onOpenScratchpad();
  });

  // Confetti celebration
  confettiBtn?.addEventListener('click', () => {
    triggerMasteryCelebration();
  });

  // Smooth Scroll to Top
  scrollTopBtn?.addEventListener('click', () => {
    playSound('click');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Update scroll button visibility on window scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      dock.classList.add('scrolled');
    } else {
      dock.classList.remove('scrolled');
    }
  }, { passive: true });

  if (window.lucide) lucide.createIcons();
}
