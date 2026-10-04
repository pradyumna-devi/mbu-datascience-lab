import Chart from 'chart.js/auto';
import confetti from 'canvas-confetti';
import { INITIAL_PROFILE, INITIAL_EXPERIMENTS } from './experimentsData.js';

// ==========================================
// STATE MANAGEMENT & LOCAL STORAGE
// ==========================================
const STORAGE_KEYS = {
  EXPERIMENTS: 'mbu_ds_experiments_v1',
  PROFILE: 'mbu_ds_profile_v1',
  VERSION: 'mbu_ds_data_version_v2'
};

let experiments = loadExperiments();
let profile = loadProfile();
let activeView = 'grid'; // 'grid' | 'overview' | 'workspace'
let currentExpId = null;
let currentSubTaskLetter = null;
let currentCategoryFilter = 'ALL';
let currentSearchQuery = '';
let activeChartInstance = null;

function loadExperiments() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EXPERIMENTS);
    if (!raw) {
      const initial = JSON.parse(JSON.stringify(INITIAL_EXPERIMENTS));
      localStorage.setItem(STORAGE_KEYS.EXPERIMENTS, JSON.stringify(initial));
      localStorage.setItem(STORAGE_KEYS.VERSION, 'v2_sync_videos');
      return initial;
    }

    let loaded = JSON.parse(raw);
    if (!Array.isArray(loaded) || loaded.length === 0) {
      const initial = JSON.parse(JSON.stringify(INITIAL_EXPERIMENTS));
      localStorage.setItem(STORAGE_KEYS.EXPERIMENTS, JSON.stringify(initial));
      localStorage.setItem(STORAGE_KEYS.VERSION, 'v2_sync_videos');
      return initial;
    }

    // One-time sync for unmodified default experiments to inherit official video updates
    const currentVersion = localStorage.getItem(STORAGE_KEYS.VERSION);
    if (currentVersion !== 'v2_sync_videos') {
      INITIAL_EXPERIMENTS.forEach(initialExp => {
        const existingIdx = loaded.findIndex(e => e.id === initialExp.id);
        if (existingIdx !== -1) {
          // Only update if the user has NOT explicitly modified this experiment
          if (!loaded[existingIdx].userModified) {
            loaded[existingIdx] = JSON.parse(JSON.stringify(initialExp));
          }
        } else {
          loaded.push(JSON.parse(JSON.stringify(initialExp)));
        }
      });
      localStorage.setItem(STORAGE_KEYS.VERSION, 'v2_sync_videos');
      localStorage.setItem(STORAGE_KEYS.EXPERIMENTS, JSON.stringify(loaded));
    }

    // Filter out removed experiments (such as exp-3)
    loaded = loaded.filter(e => e.id !== 'exp-3');

    // Ensure experiments are kept in numerical order
    const orderMap = new Map(INITIAL_EXPERIMENTS.map((e, idx) => [e.id, idx]));
    loaded.sort((a, b) => {
      const idxA = orderMap.has(a.id) ? orderMap.get(a.id) : (parseInt(a.number) || 99);
      const idxB = orderMap.has(b.id) ? orderMap.get(b.id) : (parseInt(b.number) || 99);
      return idxA - idxB;
    });

    return loaded;
  } catch (e) {
    console.warn("Using initial experiments due to storage error", e);
    return JSON.parse(JSON.stringify(INITIAL_EXPERIMENTS));
  }
}

function saveExperiments() {
  localStorage.setItem(STORAGE_KEYS.EXPERIMENTS, JSON.stringify(experiments));
}

function loadProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Migrate from old initial mock profile if present and not modified by user
      if (!parsed.userModified && parsed.name && parsed.name.includes("Srinivas")) {
        return { ...INITIAL_PROFILE };
      }
      return { ...INITIAL_PROFILE, ...parsed };
    }
    return { ...INITIAL_PROFILE };
  } catch (e) {
    return { ...INITIAL_PROFILE };
  }
}

function saveProfile() {
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
}

// ==========================================
// TOAST NOTIFICATIONS & FEEDBACK
// ==========================================
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i data-lucide="${type === 'success' ? 'check-circle-2' : 'info'}"></i>
    <span>${message}</span>
  `;
  container.appendChild(toast);
  lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ==========================================
// PROFILE RENDERING & EDITING
// ==========================================
function renderProfile() {
  const nameEl = document.getElementById('profileNameDisplay');
  const idEl = document.getElementById('profileIdDisplay');
  const branchEl = document.getElementById('profileBranchDisplay');
  const sectionEl = document.getElementById('profileSectionDisplay');
  const facultyEl = document.getElementById('profileFacultyDisplay');
  const designationEl = document.getElementById('profileDesignationDisplay');
  const avatarEl = document.getElementById('userAvatarImg');

  if (nameEl) nameEl.textContent = profile.name;
  if (idEl) idEl.textContent = `🎓 Roll No: ${profile.id}`;
  if (branchEl) branchEl.textContent = profile.branch || "Data Science";
  if (sectionEl) sectionEl.textContent = profile.section;
  if (facultyEl) facultyEl.textContent = profile.faculty;
  if (designationEl) designationEl.textContent = profile.designation;
  if (avatarEl && profile.avatarUrl) avatarEl.src = normalizeAssetUrl(profile.avatarUrl);
}

function openProfileModal() {
  document.getElementById('formProfileName').value = profile.name || '';
  document.getElementById('formProfileId').value = profile.id || '';
  const branchInput = document.getElementById('formProfileBranch');
  if (branchInput) branchInput.value = profile.branch || 'Data Science';
  document.getElementById('formProfileSection').value = profile.section || '';
  document.getElementById('formProfileFaculty').value = profile.faculty || '';
  document.getElementById('formProfileDesignation').value = profile.designation || '';
  document.getElementById('formProfileAvatar').value = profile.avatarUrl || '';

  const modal = document.getElementById('editProfileModal');
  modal.style.display = 'flex';
}

function closeProfileModal() {
  document.getElementById('editProfileModal').style.display = 'none';
}

// ==========================================
// VIEW SWITCHING
// ==========================================
function switchView(viewName, expId = null, subTaskLetter = null) {
  activeView = viewName;
  const gridView = document.getElementById('experimentsGridView');
  const overviewView = document.getElementById('experimentOverviewView');
  const workspaceView = document.getElementById('subTaskWorkspaceView');

  // Hide all
  gridView.style.display = 'none';
  gridView.classList.remove('active');
  overviewView.style.display = 'none';
  overviewView.classList.remove('active');
  workspaceView.style.display = 'none';
  workspaceView.classList.remove('active');

  // Reset window scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (viewName === 'grid') {
    gridView.style.display = 'block';
    gridView.classList.add('active');
    renderExperimentsGrid();
  } else if (viewName === 'overview') {
    currentExpId = expId;
    const exp = experiments.find(e => e.id === expId);
    if (!exp) return switchView('grid');

    overviewView.style.display = 'block';
    overviewView.classList.add('active');
    renderExperimentOverview(exp);
  } else if (viewName === 'workspace') {
    currentExpId = expId;
    currentSubTaskLetter = subTaskLetter;
    const exp = experiments.find(e => e.id === expId);
    if (!exp) return switchView('grid');

    const subTask = exp.subTasks.find(st => st.letter === subTaskLetter) || exp.subTasks[0];
    if (!subTask) return switchView('overview', expId);

    workspaceView.style.display = 'block';
    workspaceView.classList.add('active');
    renderSubTaskWorkspace(exp, subTask);
  }

  lucide.createIcons();
}

// ==========================================
// VIEW 1: EXPERIMENTS GRID
// ==========================================
function renderExperimentsGrid() {
  const container = document.getElementById('experimentsGrid');
  const emptyState = document.getElementById('emptyStateContainer');
  const totalCountEl = document.getElementById('totalExpsCount');
  if (totalCountEl) totalCountEl.textContent = experiments.length;

  if (!container) return;
  container.innerHTML = '';

  // Filter
  const filtered = experiments.filter(exp => {
    const matchesCategory = currentCategoryFilter === 'ALL' || exp.category.toLowerCase() === currentCategoryFilter.toLowerCase();
    
    if (!currentSearchQuery.trim()) {
      return matchesCategory;
    }

    const q = currentSearchQuery.toLowerCase();
    const matchesTitle = exp.title.toLowerCase().includes(q);
    const matchesNumber = String(exp.number).includes(q);
    const matchesDesc = exp.description.toLowerCase().includes(q);
    const matchesSubTasks = exp.subTasks && exp.subTasks.some(st => 
      st.title.toLowerCase().includes(q) || (st.codeId && st.codeId.toLowerCase().includes(q))
    );
    const matchesTags = exp.tags && exp.tags.some(t => t.toLowerCase().includes(q));

    return matchesCategory && (matchesTitle || matchesNumber || matchesDesc || matchesSubTasks || matchesTags);
  });

  if (filtered.length === 0) {
    emptyState.style.display = 'block';
    return;
  } else {
    emptyState.style.display = 'none';
  }

  filtered.forEach(exp => {
    const card = document.createElement('div');
    card.className = 'experiment-card';
    card.id = `card-${exp.id}`;

    // Generate sub-task pills [A] [B] [C] [D] as drawn in the sketch
    const subTasksHtml = (exp.subTasks || []).map(st => `
      <button 
        class="subtask-pill" 
        data-letter="${st.letter}"
        data-exp-id="${exp.id}" 
        data-task-letter="${st.letter}" 
        title="Open Sub-Task ${st.codeId || st.letter}: ${st.title}"
      >
        ${st.letter}
      </button>
    `).join('');

    card.innerHTML = `
      <div class="exp-card-body">
        
        <!-- Left: "video 10 sec" preview box from sketch -->
        <div class="exp-preview-video-box" data-action="overview" data-exp-id="${exp.id}" title="Click to view 10s video preview & overview">
          ${exp.previewVideoUrl && exp.previewVideoUrl.endsWith('.mp4') ? `
            <video class="card-preview-video" src="${normalizeAssetUrl(exp.previewVideoUrl)}" autoplay loop muted playsinline></video>
          ` : `
            <img src="${exp.videoThumbnail || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80'}" alt="${exp.title}" />
          `}
          <div class="video-time-tag">
            <span class="video-pulse-red"></span>
            <span>${exp.previewDuration || '00:10'}</span>
          </div>
          <div class="video-play-overlay">
            <i data-lucide="play-circle" class="play-circle-icon"></i>
          </div>
        </div>

        <!-- Right: Title and 15 words description -->
        <div class="exp-card-info">
          <div class="exp-card-header-line">
            <span class="exp-number-tag">Exp - ${exp.number}</span>
            <span class="exp-category-pill">${exp.category}</span>
          </div>
          <h3 class="exp-title" title="${exp.title}">${exp.title}</h3>
          <p class="exp-description" title="${exp.description}">
            ${exp.description}
          </p>
        </div>

      </div>

      <!-- Card Bottom Footer: [overview] [A] [B] [C] [D] from sketch -->
      <div class="exp-card-footer">
        <div class="footer-left-actions">
          <button class="btn-overview" data-action="overview" data-exp-id="${exp.id}" title="Open Experiment Overview">
            <i data-lucide="layers"></i>
            <span>Overview</span>
          </button>
          
          <div class="subtasks-pills-row">
            ${subTasksHtml}
          </div>
        </div>

        <div class="card-more-actions">
          <button class="card-action-icon-btn" data-action="edit" data-exp-id="${exp.id}" title="Edit Experiment">
            <i data-lucide="edit-2"></i>
          </button>
          <button class="card-action-icon-btn delete" data-action="delete" data-exp-id="${exp.id}" title="Delete Experiment">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  lucide.createIcons();
}

// ==========================================
// VIEW 2: EXPERIMENT OVERVIEW
function formatYouTubeEmbedUrl(url) {
  if (!url) return '';
  if (url.includes('/embed/')) return url;
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortMatch && shortMatch[1]) {
    return `https://www.youtube.com/embed/${shortMatch[1]}`;
  }
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch && watchMatch[1]) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }
  return url;
}

function normalizeAssetUrl(url) {
  if (!url) return url;
  if (url.startsWith('/') && !url.startsWith('//')) {
    return '.' + url;
  }
  return url;
}

// ==========================================
// VIEW 2: EXPERIMENT OVERVIEW
// ==========================================
function renderExperimentOverview(exp) {
  document.getElementById('overviewBreadcrumbTitle').textContent = `Experiment - ${exp.number}: ${exp.title}`;
  document.getElementById('overviewExpBadge').textContent = `Experiment - ${exp.number}`;
  document.getElementById('overviewCategoryBadge').textContent = exp.category;
  document.getElementById('overviewTitleDisplay').textContent = exp.title;
  document.getElementById('overviewDescDisplay').textContent = exp.description;
  document.getElementById('overviewSubTasksCount').textContent = `${(exp.subTasks || []).length} Modules`;

  // Video embed / playback
  const html5Video = document.getElementById('overviewHtml5Video');
  const iframe = document.getElementById('overviewVideoPlayer');
  const fallback = document.getElementById('overviewVideoFallback');

  if (exp.previewVideoUrl && exp.previewVideoUrl.endsWith('.mp4')) {
    if (html5Video) {
      html5Video.src = normalizeAssetUrl(exp.previewVideoUrl);
      html5Video.style.display = 'block';
      html5Video.play().catch(() => {});
    }
    if (iframe) iframe.style.display = 'none';
    if (fallback) fallback.style.display = 'none';
  } else if (exp.previewVideoUrl && (exp.previewVideoUrl.includes('youtube') || exp.previewVideoUrl.includes('youtu.be'))) {
    if (html5Video) {
      html5Video.pause();
      html5Video.style.display = 'none';
    }
    if (iframe) {
      iframe.src = formatYouTubeEmbedUrl(exp.previewVideoUrl);
      iframe.style.display = 'block';
    }
    if (fallback) fallback.style.display = 'none';
  } else {
    if (html5Video) {
      html5Video.pause();
      html5Video.style.display = 'none';
    }
    if (iframe) iframe.style.display = 'none';
    if (fallback) fallback.style.display = 'flex';
  }

  // Render Sub-Tasks List (A, B, C, D) matching Middle diagram from sketch
  const listContainer = document.getElementById('overviewSubTasksList');
  listContainer.innerHTML = '';

  (exp.subTasks || []).forEach(st => {
    const item = document.createElement('div');
    item.className = 'subtask-list-item';
    item.dataset.letter = st.letter;
    item.dataset.expId = exp.id;

    item.innerHTML = `
      <div class="subtask-item-left">
        <div class="subtask-letter-badge" data-letter="${st.letter}">${st.letter}</div>
        <div class="subtask-item-content">
          <h4>${st.codeId ? st.codeId + ': ' : ''}${st.title}</h4>
          <p>${st.concept || 'Laboratory implementation and execution module.'}</p>
        </div>
      </div>
      <div class="subtask-item-right">
        <span class="subtask-duration-tag">
          <i data-lucide="clock" style="width: 12px; height: 12px; display: inline-block; vertical-align: middle;"></i>
          ${st.duration || '10:00'}
        </span>
        <button class="btn-open-workspace" title="Open Lab Execution Workspace">
          <span>Open Lab (${st.codeId || st.letter})</span>
          <i data-lucide="arrow-right" style="width: 14px; height: 14px;"></i>
        </button>
      </div>
    `;

    item.addEventListener('click', () => {
      switchView('workspace', exp.id, st.letter);
    });

    listContainer.appendChild(item);
  });

  lucide.createIcons();
}

// ==========================================
// VIEW 3: SUB-TASK EXECUTION WORKSPACE
// ==========================================
function renderSubTaskWorkspace(exp, subTask) {
  // Update header badges
  const codeChip = document.getElementById('workspaceCodeIdBadge');
  codeChip.textContent = subTask.codeId || `${exp.number}${subTask.letter}`;
  codeChip.dataset.letter = subTask.letter;

  const titleEl = document.getElementById('workspaceTaskTitleDisplay');
  titleEl.textContent = subTask.title;

  // Render subtask switcher tabs [A] [B] [C] [D] in workspace header
  const tabsContainer = document.getElementById('workspaceSubTaskTabs');
  tabsContainer.innerHTML = '';
  (exp.subTasks || []).forEach(st => {
    const tabBtn = document.createElement('button');
    tabBtn.className = `tab-switcher-btn ${st.letter === subTask.letter ? 'active' : ''}`;
    tabBtn.dataset.letter = st.letter;
    tabBtn.textContent = st.letter;
    tabBtn.title = `Switch to Sub-Task ${st.letter}: ${st.title}`;
    tabBtn.addEventListener('click', () => {
      switchView('workspace', exp.id, st.letter);
    });
    tabsContainer.appendChild(tabBtn);
  });

  // Video playback (HTML5 MP4 or YouTube embed)
  const wsHtml5Video = document.getElementById('workspaceHtml5Video');
  const youtubeIframe = document.getElementById('workspaceYoutubeIframe');
  const videoDuration = document.getElementById('workspaceVideoDuration');
  const conceptText = document.getElementById('workspaceConceptText');
  const targetVideo = subTask.videoUrl || exp.previewVideoUrl;

  if (targetVideo && targetVideo.endsWith('.mp4')) {
    if (wsHtml5Video) {
      wsHtml5Video.src = normalizeAssetUrl(targetVideo);
      wsHtml5Video.style.display = 'block';
      wsHtml5Video.play().catch(() => {});
    }
    if (youtubeIframe) {
      youtubeIframe.src = '';
      youtubeIframe.style.display = 'none';
    }
  } else if (targetVideo && (targetVideo.includes('youtube') || targetVideo.includes('youtu.be'))) {
    if (wsHtml5Video) {
      wsHtml5Video.pause();
      wsHtml5Video.style.display = 'none';
    }
    if (youtubeIframe) {
      youtubeIframe.src = formatYouTubeEmbedUrl(targetVideo);
      youtubeIframe.style.display = 'block';
    }
  } else {
    if (wsHtml5Video) {
      wsHtml5Video.pause();
      wsHtml5Video.style.display = 'none';
    }
    if (youtubeIframe) {
      youtubeIframe.src = '';
      youtubeIframe.style.display = 'none';
    }
  }
  if (videoDuration) {
    videoDuration.textContent = subTask.duration || "10:45 min";
  }
  if (conceptText) {
    if (subTask.aim || subTask.syntax) {
      conceptText.innerHTML = `
        <div class="aim-block" style="margin-bottom: 10px;">
          <div style="color: #38bdf8; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 3px;">🎯 Aim:</div>
          <div style="color: #e2e8f0; font-size: 12.5px; line-height: 1.5;">${subTask.aim || subTask.concept}</div>
        </div>
        ${subTask.syntax ? `
          <div class="syntax-block">
            <div style="color: #fbbf24; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 3px;">📝 Syntax & General Form:</div>
            <pre style="margin: 0; padding: 8px 12px; background: rgba(0,0,0,0.45); border-radius: 6px; font-family: var(--font-code); font-size: 11.5px; color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.2); white-space: pre-wrap; line-height: 1.45;">${subTask.syntax}</pre>
          </div>
        ` : ''}
      `;
    } else {
      conceptText.textContent = subTask.concept || "Laboratory experimentation and model fitting module.";
    }
  }

  // Python Code block
  const codeBlock = document.getElementById('workspaceCodeBlock');
  if (codeBlock) {
    codeBlock.textContent = subTask.code || `# Lab Task: ${subTask.title}\nprint("Kernel execution ready.")`;
  }

  // Console Output block
  const terminal = document.getElementById('workspaceTerminalOutput');
  if (terminal) {
    terminal.textContent = subTask.output || `[Virtual Kernel Initialized]\nReady to execute ${subTask.codeId || subTask.letter}`;
  }

  // Visual Output & Charts
  renderChartOrImage(subTask);

  lucide.createIcons();
}

function renderChartOrImage(subTask) {
  const chartCanvas = document.getElementById('experimentVisualChart');
  const staticImg = document.getElementById('staticPlotImg');
  const chartContainer = document.getElementById('interactiveChartContainer');
  const staticContainer = document.getElementById('staticPlotContainer');

  if (subTask.outputImage) {
    staticImg.src = subTask.outputImage;
  } else {
    staticImg.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80";
  }

  // Default to interactive chart
  chartContainer.style.display = 'flex';
  staticContainer.style.display = 'none';
  document.getElementById('showInteractiveChartBtn').classList.add('active');
  document.getElementById('showStaticPlotBtn').classList.remove('active');

  // Build Chart.js instance
  if (activeChartInstance) {
    activeChartInstance.destroy();
    activeChartInstance = null;
  }

  const chartData = subTask.chartData || {
    labels: ["Point 1", "Point 2", "Point 3", "Point 4", "Point 5", "Point 6"],
    datasets: [{
      label: "Metric Evaluation",
      data: [12, 19, 8, 15, 22, 30],
      borderColor: "#38bdf8",
      backgroundColor: "rgba(56, 189, 248, 0.2)",
      tension: 0.3
    }]
  };

  const chartType = (subTask.chartType === 'bar') ? 'bar' : (subTask.chartType === 'scatter' ? 'scatter' : 'line');

  activeChartInstance = new Chart(chartCanvas, {
    type: chartType,
    data: chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#cbd5e1',
            font: { family: 'Plus Jakarta Sans', size: 11 }
          }
        },
        tooltip: {
          backgroundColor: '#0f172a',
          titleColor: '#38bdf8',
          bodyColor: '#fff',
          borderColor: 'rgba(56, 189, 248, 0.4)',
          borderWidth: 1
        }
      },
      scales: {
        x: {
          type: subTask.chartType === 'scatter' ? 'linear' : undefined,
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#94a3b8', font: { family: 'JetBrains Mono', size: 10 } }
        },
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#94a3b8', font: { family: 'JetBrains Mono', size: 10 } }
        }
      }
    }
  });
}

// ==========================================
// CODE RUNNER SIMULATION & COPY
// ==========================================
function executeVirtualKernel() {
  const btn = document.getElementById('executeCodeBtn');
  const terminal = document.getElementById('workspaceTerminalOutput');
  const statusTag = document.getElementById('executionStatusTag');

  btn.innerHTML = `<i data-lucide="loader-2" class="spin"></i> Executing...`;
  btn.style.opacity = '0.7';
  statusTag.innerHTML = `<span class="pulse-green"></span> Running...`;

  const initialText = terminal.textContent;
  terminal.textContent = ">>> Sending job to GPU Cluster Node [NVIDIA A100]...\n>>> Initializing PyTorch & statsmodels environment...\n>>> Compiling computational graph...";

  setTimeout(() => {
    terminal.textContent = initialText + `\n\n[SUCCESS] Kernel exited with code 0 at ${new Date().toLocaleTimeString()}.\nMemory allocated: 412 MB | Wall Time: 0.38s`;
    btn.innerHTML = `<i data-lucide="play"></i> Run Code`;
    btn.style.opacity = '1';
    statusTag.innerHTML = `<span class="green-dot"></span> Executed (0.38s)`;
    
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    showToast("Virtual kernel execution completed successfully!");
    lucide.createIcons();
  }, 1200);
}

function copyCodeToClipboard() {
  const code = document.getElementById('workspaceCodeBlock').textContent;
  navigator.clipboard.writeText(code).then(() => {
    showToast("Code copied to clipboard!");
  }).catch(() => {
    showToast("Could not copy code", "info");
  });
}

// ==========================================
// ADD / EDIT EXPERIMENT MODAL & FORM
// ==========================================
let formSubTasksState = [];

function openAddExperimentModal(editId = null) {
  const modal = document.getElementById('addExperimentModal');
  const heading = document.getElementById('expModalHeading');
  const icon = document.getElementById('expModalIcon');
  const editInput = document.getElementById('editExperimentId');
  const form = document.getElementById('experimentForm');

  form.reset();

  if (editId) {
    const exp = experiments.find(e => e.id === editId);
    if (!exp) return;
    heading.textContent = `Edit Experiment ${exp.number}`;
    icon.setAttribute('data-lucide', 'edit');
    editInput.value = exp.id;

    document.getElementById('formExpNumber').value = exp.number;
    document.getElementById('formExpTitle').value = exp.title;
    document.getElementById('formExpCategory').value = exp.category;
    document.getElementById('formExpDescription').value = exp.description;
    document.getElementById('formExpVideoUrl').value = exp.previewVideoUrl || '';
    document.getElementById('formExpThumbnail').value = exp.videoThumbnail || '';

    formSubTasksState = JSON.parse(JSON.stringify(exp.subTasks || []));
  } else {
    heading.textContent = "Add New Laboratory Experiment";
    icon.setAttribute('data-lucide', 'plus-circle');
    editInput.value = "";

    // Next experiment number suggestion
    const maxNum = experiments.reduce((max, e) => Math.max(max, parseInt(e.number) || 0), 0);
    document.getElementById('formExpNumber').value = maxNum + 1;

    // Default template with subtasks A and B
    formSubTasksState = [
      {
        letter: "A",
        codeId: `${maxNum + 1}A`,
        title: "Model Architecture & Pipeline Formulation",
        duration: "08:30",
        videoUrl: "https://www.youtube.com/embed/e8Yw4alG16Q",
        concept: "Experimental design and feature transformation pipeline.",
        code: `import numpy as np\nimport pandas as pd\n\nprint("Executing Experiment ${maxNum + 1}A...")\ndf = pd.DataFrame(np.random.randn(100, 4), columns=list('ABCD'))\nprint(df.describe())`,
        output: `[INITIALIZATION COMPLETED]\nBatch size: 64\nLearning rate: 1e-3\nConvergence criteria satisfied.`
      },
      {
        letter: "B",
        codeId: `${maxNum + 1}B`,
        title: "Optimization & Validation Diagnostics",
        duration: "10:15",
        videoUrl: "https://www.youtube.com/embed/bS4tQ_JjO1M",
        concept: "Hyperparameter tuning and cross-validation assessment.",
        code: `print("Evaluating convergence metrics...")\nprint("Loss: 0.0142 | Accuracy: 98.4%")`,
        output: `Cross-Validation k=5 F1-Score: 0.978\nStatus: Benchmark achieved.`
      }
    ];
  }

  updateWordCountBadge();
  renderFormSubTasks();
  modal.style.display = 'flex';
  lucide.createIcons();
}

function closeAddExperimentModal() {
  document.getElementById('addExperimentModal').style.display = 'none';
}

function updateWordCountBadge() {
  const desc = document.getElementById('formExpDescription').value.trim();
  const words = desc ? desc.split(/\s+/).length : 0;
  const badge = document.getElementById('wordCountBadge');
  badge.textContent = `${words} / ~15 words`;
  badge.style.color = (words >= 10 && words <= 20) ? '#10b981' : (words > 25 ? '#f43f5e' : '#38bdf8');
}

function renderFormSubTasks() {
  const container = document.getElementById('subTasksRowsContainer');
  container.innerHTML = '';

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  formSubTasksState.forEach((st, idx) => {
    st.letter = letters[idx] || `${idx + 1}`;
    const card = document.createElement('div');
    card.className = 'subtask-form-card';
    card.innerHTML = `
      <div class="subtask-form-card-header">
        <span class="subtask-code-badge">Sub-Task (${st.letter})</span>
        ${formSubTasksState.length > 1 ? `
          <button type="button" class="btn-remove-subtask" data-idx="${idx}">
            <i data-lucide="trash-2" style="width: 12px; height: 12px;"></i> Remove
          </button>
        ` : ''}
      </div>
      <div class="form-row-2">
        <div class="form-group">
          <label>Task Title <span class="required">*</span></label>
          <input type="text" class="subtask-title-input" data-idx="${idx}" value="${st.title || ''}" placeholder="e.g. Model Training & Validation" required />
        </div>
        <div class="form-group">
          <label>YouTube Video URL</label>
          <input type="url" class="subtask-video-input" data-idx="${idx}" value="${st.videoUrl || ''}" placeholder="https://www.youtube.com/embed/..." />
        </div>
      </div>
      <div class="form-group" style="margin-top: 8px;">
        <label>Python Code Snippet</label>
        <textarea rows="3" class="subtask-code-input" data-idx="${idx}" placeholder="import torch...">${st.code || ''}</textarea>
      </div>
      <div class="form-group" style="margin-top: 8px;">
        <label>Execution Output Text</label>
        <textarea rows="2" class="subtask-output-input" data-idx="${idx}" placeholder="Output statistics...">${st.output || ''}</textarea>
      </div>
    `;

    container.appendChild(card);
  });

  // Attach input sync listeners
  container.querySelectorAll('.subtask-title-input').forEach(input => {
    input.addEventListener('input', e => {
      formSubTasksState[e.target.dataset.idx].title = e.target.value;
    });
  });
  container.querySelectorAll('.subtask-video-input').forEach(input => {
    input.addEventListener('input', e => {
      formSubTasksState[e.target.dataset.idx].videoUrl = e.target.value;
    });
  });
  container.querySelectorAll('.subtask-code-input').forEach(input => {
    input.addEventListener('input', e => {
      formSubTasksState[e.target.dataset.idx].code = e.target.value;
    });
  });
  container.querySelectorAll('.subtask-output-input').forEach(input => {
    input.addEventListener('input', e => {
      formSubTasksState[e.target.dataset.idx].output = e.target.value;
    });
  });
  container.querySelectorAll('.btn-remove-subtask').forEach(btn => {
    btn.addEventListener('click', e => {
      const idx = parseInt(e.currentTarget.dataset.idx);
      formSubTasksState.splice(idx, 1);
      renderFormSubTasks();
    });
  });

  lucide.createIcons();
}

function handleExperimentFormSubmit(e) {
  e.preventDefault();

  const editId = document.getElementById('editExperimentId').value;
  const num = document.getElementById('formExpNumber').value.trim();
  const title = document.getElementById('formExpTitle').value.trim();
  const category = document.getElementById('formExpCategory').value;
  const description = document.getElementById('formExpDescription').value.trim();
  const videoUrl = document.getElementById('formExpVideoUrl').value.trim() || 'https://www.youtube.com/embed/e8Yw4alG16Q';
  const thumbnail = document.getElementById('formExpThumbnail').value.trim() || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80';

  // Format subtasks - preserve all existing metadata (aim, syntax, code, output, etc.)
  const formattedSubTasks = formSubTasksState.map((st, i) => ({
    ...st,
    letter: st.letter,
    codeId: `${num}${st.letter}`,
    title: st.title || `Sub-Task ${st.letter}`,
    duration: st.duration || "10:00",
    videoUrl: formatYouTubeEmbedUrl(st.videoUrl) || formatYouTubeEmbedUrl(videoUrl),
    concept: st.concept || `Theoretical framework for ${st.title}`,
    code: st.code || `# Lab Module ${num}${st.letter}\nprint("Executed successfully")`,
    output: st.output || `[OUTPUT ${num}${st.letter}]\nExecution time: 0.24s\nAccuracy: 97.2%`,
    chartType: st.chartType || "line",
    chartData: st.chartData || {
      labels: ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"],
      datasets: [{
        label: "Performance Trajectory",
        data: [10, 25, 45, 78, 92],
        borderColor: "#38bdf8",
        backgroundColor: "rgba(56, 189, 248, 0.2)",
        tension: 0.3
      }]
    }
  }));

  if (editId) {
    // Update existing
    const idx = experiments.findIndex(exp => exp.id === editId);
    if (idx !== -1) {
      experiments[idx] = {
        ...experiments[idx],
        number: num,
        title,
        category,
        description,
        previewVideoUrl: formatYouTubeEmbedUrl(videoUrl),
        videoThumbnail: thumbnail,
        subTasks: formattedSubTasks,
        userModified: true,
        updatedAt: new Date().toISOString()
      };
      showToast(`Experiment ${num} successfully updated!`);
    }
  } else {
    // Add new
    const newExp = {
      id: `exp-${Date.now()}`,
      number: num,
      title,
      category,
      previewDuration: "00:10",
      videoThumbnail: thumbnail,
      previewVideoUrl: formatYouTubeEmbedUrl(videoUrl),
      description,
      tags: [category, "Data Science", "Python"],
      subTasks: formattedSubTasks,
      userModified: true,
      createdAt: new Date().toISOString()
    };
    experiments.unshift(newExp);
    showToast(`Experiment ${num} added to laboratory curriculum!`);
    
    // Celebration confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  saveExperiments();
  closeAddExperimentModal();
  switchView('grid');
}

// ==========================================
// IMPORT / EXPORT / RESET DATA
// ==========================================
function exportLaboratoryJson() {
  const data = {
    metadata: {
      institution: "Mohan Babu University",
      lab: "Data Science Digital Lab Library",
      department: "Department of Data Science",
      motto: "Dream. Believe. Achieve.",
      exportedAt: new Date().toISOString(),
      version: "1.0.0"
    },
    profile,
    experiments
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `MBU_DataScience_Digital_Lab_Library_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast("Curriculum JSON exported successfully!");
}

function handleImportJsonFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      if (parsed.experiments && Array.isArray(parsed.experiments)) {
        experiments = parsed.experiments;
        if (parsed.profile) profile = parsed.profile;
        saveExperiments();
        saveProfile();
        renderProfile();
        renderExperimentsGrid();
        showToast(`Imported ${experiments.length} experiments successfully!`);
      } else {
        showToast("Invalid JSON file schema", "info");
      }
    } catch (err) {
      showToast("Error parsing JSON file", "info");
    }
  };
  reader.readAsText(file);
  event.target.value = ''; // Reset input
}

function resetToDefaults() {
  if (confirm("Reset all experiments to official Mohan Babu University presets? (Custom experiments will be replaced)")) {
    experiments = JSON.parse(JSON.stringify(INITIAL_EXPERIMENTS));
    profile = { ...INITIAL_PROFILE };
    saveExperiments();
    saveProfile();
    renderProfile();
    switchView('grid');
    showToast("Reset to official MBU laboratory defaults!");
  }
}

// ==========================================
// EVENT LISTENERS & INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  renderProfile();
  renderExperimentsGrid();

  // Search input listeners
  const searchInput = document.getElementById('experimentSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const activeQueryNotice = document.getElementById('activeQueryNotice');
  const activeQueryText = document.getElementById('activeQueryText');
  const resetQueryFilterBtn = document.getElementById('resetQueryFilterBtn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value;
      if (clearSearchBtn) clearSearchBtn.style.display = currentSearchQuery ? 'flex' : 'none';
      
      if (activeQueryNotice) {
        if (currentSearchQuery.trim()) {
          activeQueryNotice.style.display = 'flex';
          activeQueryText.textContent = `"${currentSearchQuery}"`;
        } else {
          activeQueryNotice.style.display = 'none';
        }
      }

      if (activeView !== 'grid') switchView('grid');
      else renderExperimentsGrid();
    });

    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      currentSearchQuery = '';
      clearSearchBtn.style.display = 'none';
      if (activeQueryNotice) activeQueryNotice.style.display = 'none';
      renderExperimentsGrid();
      searchInput.focus();
    });

    resetQueryFilterBtn?.addEventListener('click', () => {
      searchInput.value = '';
      currentSearchQuery = '';
      clearSearchBtn.style.display = 'none';
      activeQueryNotice.style.display = 'none';
      renderExperimentsGrid();
    });

    const searchSubmitBtn = document.getElementById('searchSubmitBtn');
    if (searchSubmitBtn) {
      searchSubmitBtn.addEventListener('click', () => {
        searchInput.focus();
        if (activeView !== 'grid') switchView('grid');
        else renderExperimentsGrid();
      });
    }

    // Keyboard shortcut Ctrl+K or / to focus search
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA')) {
        e.preventDefault();
        searchInput.focus();
      }
    });
  }

  // Category chips
  const categoryChips = document.querySelectorAll('.category-chip');
  categoryChips.forEach(chip => {
    chip.addEventListener('click', () => {
      categoryChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentCategoryFilter = chip.dataset.category;
      if (activeView !== 'grid') switchView('grid');
      else renderExperimentsGrid();
    });
  });

  // Delegated clicks on Experiments Grid
  const gridContainer = document.getElementById('experimentsGrid');
  if (gridContainer) {
    gridContainer.addEventListener('click', (e) => {
      // Sub-task pill clicked: jump directly to View 3
      const subtaskBtn = e.target.closest('.subtask-pill');
      if (subtaskBtn) {
        const expId = subtaskBtn.dataset.expId;
        const letter = subtaskBtn.dataset.taskLetter;
        switchView('workspace', expId, letter);
        return;
      }

      // Overview button clicked or preview video box clicked: open View 2
      const overviewAction = e.target.closest('[data-action="overview"]');
      if (overviewAction) {
        const expId = overviewAction.dataset.expId;
        switchView('overview', expId);
        return;
      }

      // Edit action
      const editBtn = e.target.closest('[data-action="edit"]');
      if (editBtn) {
        const expId = editBtn.dataset.expId;
        openAddExperimentModal(expId);
        return;
      }

      // Delete action
      const deleteBtn = e.target.closest('[data-action="delete"]');
      if (deleteBtn) {
        const expId = deleteBtn.dataset.expId;
        const exp = experiments.find(x => x.id === expId);
        if (confirm(`Are you sure you want to delete Experiment ${exp ? exp.number : ''}?`)) {
          experiments = experiments.filter(x => x.id !== expId);
          saveExperiments();
          renderExperimentsGrid();
          showToast("Experiment removed from curriculum");
        }
        return;
      }
    });
  }

  // Navigation Buttons
  document.getElementById('overviewBackToGridBtn')?.addEventListener('click', () => switchView('grid'));
  document.getElementById('workspaceBackToOverviewBtn')?.addEventListener('click', () => switchView('overview', currentExpId));
  
  document.getElementById('overviewStartFirstSubTaskBtn')?.addEventListener('click', () => {
    const exp = experiments.find(e => e.id === currentExpId);
    if (exp && exp.subTasks && exp.subTasks.length > 0) {
      switchView('workspace', currentExpId, exp.subTasks[0].letter);
    }
  });

  document.getElementById('overviewEditExpBtn')?.addEventListener('click', () => {
    openAddExperimentModal(currentExpId);
  });

  // Workspace buttons
  document.getElementById('executeCodeBtn')?.addEventListener('click', executeVirtualKernel);
  document.getElementById('copyCodeBtn')?.addEventListener('click', copyCodeToClipboard);

  // Workspace Plot View Toggles
  const showChartBtn = document.getElementById('showInteractiveChartBtn');
  const showPlotBtn = document.getElementById('showStaticPlotBtn');
  const chartContainer = document.getElementById('interactiveChartContainer');
  const staticContainer = document.getElementById('staticPlotContainer');

  showChartBtn?.addEventListener('click', () => {
    showChartBtn.classList.add('active');
    showPlotBtn.classList.remove('active');
    chartContainer.style.display = 'flex';
    staticContainer.style.display = 'none';
  });

  showPlotBtn?.addEventListener('click', () => {
    showPlotBtn.classList.add('active');
    showChartBtn.classList.remove('active');
    chartContainer.style.display = 'none';
    staticContainer.style.display = 'block';
  });

  // Modal triggers: Add Experiment
  document.getElementById('openAddExperimentModalBtn')?.addEventListener('click', () => openAddExperimentModal());
  document.getElementById('emptyStateAddBtn')?.addEventListener('click', () => openAddExperimentModal());
  document.getElementById('closeAddExpModalBtn')?.addEventListener('click', closeAddExperimentModal);
  document.getElementById('cancelAddExpBtn')?.addEventListener('click', closeAddExperimentModal);
  document.getElementById('experimentForm')?.addEventListener('submit', handleExperimentFormSubmit);

  // Description word count listener
  document.getElementById('formExpDescription')?.addEventListener('input', updateWordCountBadge);

  // Sub-task builder Add button
  document.getElementById('addNewSubTaskRowBtn')?.addEventListener('click', () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nextLetter = letters[formSubTasksState.length] || `T${formSubTasksState.length + 1}`;
    formSubTasksState.push({
      letter: nextLetter,
      codeId: `${document.getElementById('formExpNumber').value || ''}${nextLetter}`,
      title: `Sub-Task ${nextLetter}: Diagnostic Evaluation`,
      duration: "10:00",
      videoUrl: "",
      concept: "Diagnostic metrics and visualization.",
      code: `print("Sub-task ${nextLetter} running...")`,
      output: `Evaluation completed successfully.`
    });
    renderFormSubTasks();
  });

  // Profile modal
  document.getElementById('editProfileTriggerBtn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    openProfileModal();
  });
  document.getElementById('profileCardWidget')?.addEventListener('click', openProfileModal);
  document.getElementById('closeProfileModalBtn')?.addEventListener('click', closeProfileModal);
  document.getElementById('cancelProfileBtn')?.addEventListener('click', closeProfileModal);
  document.getElementById('profileForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    profile.name = document.getElementById('formProfileName').value;
    profile.id = document.getElementById('formProfileId').value;
    const branchInput = document.getElementById('formProfileBranch');
    if (branchInput) profile.branch = branchInput.value;
    profile.section = document.getElementById('formProfileSection').value;
    profile.faculty = document.getElementById('formProfileFaculty').value;
    profile.designation = document.getElementById('formProfileDesignation').value;
    profile.avatarUrl = document.getElementById('formProfileAvatar').value || profile.avatarUrl;
    profile.userModified = true;

    saveProfile();
    renderProfile();
    closeProfileModal();
    showToast("Profile details updated!");
  });

  // Export / Import / Reset
  document.getElementById('exportDataBtn')?.addEventListener('click', exportLaboratoryJson);
  document.getElementById('importJsonFileInput')?.addEventListener('change', handleImportJsonFile);
  document.getElementById('resetDefaultsBtn')?.addEventListener('click', resetToDefaults);

  lucide.createIcons();
});
