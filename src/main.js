import Chart from 'chart.js/auto';
import confetti from 'canvas-confetti';
import { INITIAL_PROFILE, INITIAL_EXPERIMENTS, INITIAL_MODULES, INITIAL_TOOLS } from './experimentsData.js';
import { executePythonCode, initPyodideKernel, subscribeKernelStatus } from './pythonRunner.js';
import { storeModulePdf, getModulePdf, deleteModulePdf, formatFileSize, generateSampleSyllabusPdfDataUrl } from './pdfStorage.js';

// ==========================================
// STATE MANAGEMENT & LOCAL STORAGE
// ==========================================
const STORAGE_KEYS = {
  EXPERIMENTS: 'mbu_ds_experiments_v1',
  PROFILE: 'mbu_ds_profile_v2_links',
  MODULES: 'mbu_ds_modules_v3_two_modules',
  THEME: 'mbu_ds_theme_mode',
  VERSION: 'mbu_ds_data_version_v7_github'
};

let experiments = loadExperiments();
let profile = loadProfile();
let modules = loadModules();
let activeView = 'grid'; // 'grid' | 'overview' | 'workspace'
let activeMainTab = 'experiments'; // 'modules' | 'experiments' | 'tools'
let currentExpId = null;
let currentSubTaskLetter = null;
let currentCategoryFilter = 'ALL';
let currentSearchQuery = '';
let activeChartInstance = null;
let editorFontSize = 12.5;
let currentActiveTool = 'scratchpad';
let currentTheme = 'dark';

function applyThemeMode(theme, showToastNotification = true) {
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEYS.THEME, theme);

  const darkBtn = document.getElementById('themeDarkBtn');
  const lightBtn = document.getElementById('themeLightBtn');

  if (darkBtn && lightBtn) {
    darkBtn.classList.toggle('active', theme === 'dark');
    lightBtn.classList.toggle('active', theme === 'light');
    darkBtn.setAttribute('aria-checked', theme === 'dark' ? 'true' : 'false');
    lightBtn.setAttribute('aria-checked', theme === 'light' ? 'true' : 'false');
  }

  if (showToastNotification) {
    showToast(`Switched to ${theme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
  }

  // Update workspace charts contrast if active
  if (activeChartInstance && activeChartInstance.options && activeChartInstance.options.scales) {
    const isLight = theme === 'light';
    const textColor = isLight ? '#475569' : '#94a3b8';
    const gridColor = isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)';

    if (activeChartInstance.options.scales.x) {
      if (activeChartInstance.options.scales.x.ticks) activeChartInstance.options.scales.x.ticks.color = textColor;
      if (activeChartInstance.options.scales.x.grid) activeChartInstance.options.scales.x.grid.color = gridColor;
    }
    if (activeChartInstance.options.scales.y) {
      if (activeChartInstance.options.scales.y.ticks) activeChartInstance.options.scales.y.ticks.color = textColor;
      if (activeChartInstance.options.scales.y.grid) activeChartInstance.options.scales.y.grid.color = gridColor;
    }
    activeChartInstance.update('none');
  }

  lucide.createIcons();
}

function initThemeMode() {
  const saved = localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
  applyThemeMode(saved, false);

  document.getElementById('themeDarkBtn')?.addEventListener('click', () => {
    applyThemeMode('dark');
  });

  document.getElementById('themeLightBtn')?.addEventListener('click', () => {
    applyThemeMode('light');
  });
}

function loadExperiments() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EXPERIMENTS);
    if (!raw) {
      const initial = JSON.parse(JSON.stringify(INITIAL_EXPERIMENTS));
      localStorage.setItem(STORAGE_KEYS.EXPERIMENTS, JSON.stringify(initial));
      localStorage.setItem(STORAGE_KEYS.VERSION, 'mbu_ds_data_version_v6_modules');
      return initial;
    }

    let loaded = JSON.parse(raw);
    if (!Array.isArray(loaded) || loaded.length === 0) {
      const initial = JSON.parse(JSON.stringify(INITIAL_EXPERIMENTS));
      localStorage.setItem(STORAGE_KEYS.EXPERIMENTS, JSON.stringify(initial));
      localStorage.setItem(STORAGE_KEYS.VERSION, 'mbu_ds_data_version_v6_modules');
      return initial;
    }

    // Force-sync official experiments and subtasks
    const currentVersion = localStorage.getItem(STORAGE_KEYS.VERSION);
    if (currentVersion !== 'mbu_ds_data_version_v7_github') {
      INITIAL_EXPERIMENTS.forEach(initialExp => {
        const existingIdx = loaded.findIndex(e => e.id === initialExp.id);
        if (existingIdx !== -1) {
          loaded[existingIdx].githubUrl = initialExp.githubUrl;
          loaded[existingIdx].previewVideoUrl = initialExp.previewVideoUrl;
          if (Array.isArray(initialExp.subTasks) && Array.isArray(loaded[existingIdx].subTasks)) {
            initialExp.subTasks.forEach(initSt => {
              const stIdx = loaded[existingIdx].subTasks.findIndex(s => s.letter === initSt.letter);
              if (stIdx !== -1) {
                loaded[existingIdx].subTasks[stIdx].githubUrl = initSt.githubUrl;
                loaded[existingIdx].subTasks[stIdx].videoUrl = initSt.videoUrl;
                loaded[existingIdx].subTasks[stIdx].duration = initSt.duration;
              }
            });
          }
          if (!loaded[existingIdx].userModified) {
            loaded[existingIdx] = JSON.parse(JSON.stringify(initialExp));
          }
        } else {
          loaded.push(JSON.parse(JSON.stringify(initialExp)));
        }
      });
      localStorage.setItem(STORAGE_KEYS.VERSION, 'mbu_ds_data_version_v7_github');
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
      return { ...INITIAL_PROFILE, ...parsed };
    }
    // Also check older profile key
    const oldRaw = localStorage.getItem('mbu_ds_profile_v1');
    if (oldRaw) {
      const oldParsed = JSON.parse(oldRaw);
      return { ...INITIAL_PROFILE, ...oldParsed };
    }
    return { ...INITIAL_PROFILE };
  } catch (e) {
    return { ...INITIAL_PROFILE };
  }
}

function saveProfile() {
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
}

function loadModules() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MODULES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length === INITIAL_MODULES.length && parsed.every(m => m.id === 'mod-1' || m.id === 'mod-2')) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Storage load modules error", e);
  }

  // Pre-seed initial modules with default syllabus metadata
  const initial = JSON.parse(JSON.stringify(INITIAL_MODULES)).map(mod => ({
    ...mod,
    hasPdf: true,
    pdfFileName: `${mod.code}_Syllabus.pdf`,
    pdfFileSize: '1.24 MB',
    pdfUploadDate: 'Academic 2026-27'
  }));

  saveModules(initial);
  return initial;
}

function saveModules(data = modules) {
  try {
    // Strip very large dataUrl before writing to localStorage to prevent quota overflow
    const safeData = data.map(mod => {
      const copy = { ...mod };
      if (copy.pdfDataUrl && copy.pdfDataUrl.length > 200000) {
        delete copy.pdfDataUrl;
      }
      return copy;
    });
    localStorage.setItem(STORAGE_KEYS.MODULES, JSON.stringify(safeData));
  } catch (e) {
    console.warn("Quota warning saving modules; using minimal representation:", e);
    const minimal = data.map(mod => {
      const { pdfDataUrl, ...rest } = mod;
      return rest;
    });
    try {
      localStorage.setItem(STORAGE_KEYS.MODULES, JSON.stringify(minimal));
    } catch (err2) {
      console.error("Critical error saving modules:", err2);
    }
  }
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
// PROFILE RENDERING & UPLOAD & PORTFOLIO
// ==========================================
function renderProfile() {
  // Header Profile Card elements
  const nameEl = document.getElementById('profileNameDisplay');
  const idEl = document.getElementById('profileIdDisplay');
  const branchEl = document.getElementById('profileBranchDisplay');
  const sectionEl = document.getElementById('profileSectionDisplay');
  const facultyEl = document.getElementById('profileFacultyDisplay');
  const designationEl = document.getElementById('profileDesignationDisplay');
  const avatarEl = document.getElementById('userAvatarImg');

  if (nameEl) nameEl.textContent = profile.name;
  if (idEl) idEl.textContent = `Roll: ${profile.id}`;
  if (branchEl) branchEl.textContent = profile.branch || "Data Science";
  if (sectionEl) sectionEl.textContent = profile.section;
  if (facultyEl) facultyEl.textContent = profile.faculty;
  if (designationEl) designationEl.textContent = profile.designation;
  if (avatarEl && profile.avatarUrl) avatarEl.src = normalizeAssetUrl(profile.avatarUrl);

  // Portfolio Modal elements
  const portAvatar = document.getElementById('portfolioAvatarImg');
  const portName = document.getElementById('portfolioNameDisplay');
  const portRoll = document.getElementById('portfolioRollDisplay');
  const portBio = document.getElementById('portfolioBioDisplay');
  const portGuide = document.getElementById('portfolioGuideDisplay');
  const portResumeFile = document.getElementById('portfolioResumeFileName');
  
  if (portAvatar && profile.avatarUrl) portAvatar.src = normalizeAssetUrl(profile.avatarUrl);
  if (portName) portName.textContent = profile.name;
  if (portRoll) portRoll.textContent = `Roll No: ${profile.id} • ${profile.branch || "Data Science"} (${profile.section || "Section - 2"})`;
  if (portBio) portBio.textContent = profile.bio || INITIAL_PROFILE.bio;
  if (portGuide) portGuide.textContent = profile.faculty;
  if (portResumeFile) portResumeFile.textContent = profile.resumeName || "M_Pradyumna_Devi_Resume.pdf";

  // Social & Professional links
  const ghLink = document.getElementById('portfolioGithubLink');
  const ghHandle = document.getElementById('portfolioGithubHandle');
  if (ghLink) ghLink.href = profile.githubUrl || "https://github.com/pradyumna-devi";
  if (ghHandle) ghHandle.textContent = `@${(profile.githubUrl || '').replace(/https?:\/\/(www\.)?github\.com\/?/, '') || 'pradyumna-devi'}`;

  const inLink = document.getElementById('portfolioLinkedinLink');
  const inHandle = document.getElementById('portfolioLinkedinHandle');
  if (inLink) inLink.href = profile.linkedinUrl || "https://linkedin.com/in/pradyumna-devi";
  if (inHandle) inHandle.textContent = (profile.linkedinUrl || '').replace(/https?:\/\/(www\.)?/, '') || 'linkedin.com/in/pradyumna-devi';

  const webLink = document.getElementById('portfolioWebsiteLink');
  const webHandle = document.getElementById('portfolioWebsiteHandle');
  if (webLink) webLink.href = profile.portfolioUrl || "https://pradyumna-devi.dev";
  if (webHandle) webHandle.textContent = (profile.portfolioUrl || '').replace(/https?:\/\/(www\.)?/, '') || 'pradyumna-devi.dev';

  const mailLink = document.getElementById('portfolioEmailLink');
  const mailHandle = document.getElementById('portfolioEmailHandle');
  if (mailLink) mailLink.href = `mailto:${profile.email || "devi.pradyumna@mbu.asia"}`;
  if (mailHandle) mailHandle.textContent = profile.email || "devi.pradyumna@mbu.asia";

  const kaggleLink = document.getElementById('portfolioKaggleLink');
  const kaggleHandle = document.getElementById('portfolioKaggleHandle');
  if (kaggleLink) kaggleLink.href = profile.kaggleUrl || "https://kaggle.com/pradyumnadevi";
  if (kaggleHandle) kaggleHandle.textContent = (profile.kaggleUrl || '').replace(/https?:\/\/(www\.)?/, '') || 'kaggle.com/pradyumnadevi';

  const leetLink = document.getElementById('portfolioLeetcodeLink');
  const leetHandle = document.getElementById('portfolioLeetcodeHandle');
  if (leetLink) leetLink.href = profile.leetcodeUrl || "https://leetcode.com/pradyumna_devi";
  if (leetHandle) leetHandle.textContent = (profile.leetcodeUrl || '').replace(/https?:\/\/(www\.)?/, '') || 'leetcode.com/pradyumna_devi';

  // CV / Resume Viewer Modal elements
  const cvName = document.getElementById('cvNameDisplay');
  const cvRoll = document.getElementById('cvRollDisplay');
  const cvEmail = document.getElementById('cvEmailDisplay');
  const cvGithub = document.getElementById('cvGithubDisplay');
  const cvLinkedin = document.getElementById('cvLinkedinDisplay');
  const cvFaculty = document.getElementById('cvFacultyDisplay');
  const cvDesignation = document.getElementById('cvDesignationDisplay');

  if (cvName) cvName.textContent = (profile.name || "M. PRADYUMNA DEVI").toUpperCase();
  if (cvRoll) cvRoll.textContent = profile.id;
  if (cvEmail) cvEmail.textContent = profile.email || "devi.pradyumna@mbu.asia";
  if (cvGithub) cvGithub.textContent = (profile.githubUrl || '').replace(/https?:\/\/(www\.)?/, '') || "github.com/pradyumna-devi";
  if (cvLinkedin) cvLinkedin.textContent = (profile.linkedinUrl || '').replace(/https?:\/\/(www\.)?/, '') || "linkedin.com/in/pradyumna-devi";
  if (cvFaculty) cvFaculty.textContent = profile.faculty;
  if (cvDesignation) cvDesignation.textContent = profile.designation;

  // Header count pill
  const expPill = document.getElementById('experimentsHeaderCountPill');
  if (expPill) expPill.textContent = `${experiments.length} Labs`;
}

function handleAvatarFileUpload(file) {
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    showToast("Please select a valid image file (PNG, JPG, WebP)", "info");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    profile.avatarUrl = e.target.result;
    profile.userModified = true;
    saveProfile();
    renderProfile();
    showToast("Profile photo updated successfully!");
  };
  reader.readAsDataURL(file);
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
  
  // Extra fields
  const ghIn = document.getElementById('formProfileGithub');
  const inIn = document.getElementById('formProfileLinkedin');
  const webIn = document.getElementById('formProfilePortfolio');
  const mailIn = document.getElementById('formProfileEmail');
  const bioIn = document.getElementById('formProfileBio');
  const resNameIn = document.getElementById('formProfileResumeName');
  const avatarPrev = document.getElementById('formAvatarPreviewImg');

  if (ghIn) ghIn.value = profile.githubUrl || '';
  if (inIn) inIn.value = profile.linkedinUrl || '';
  if (webIn) webIn.value = profile.portfolioUrl || '';
  if (mailIn) mailIn.value = profile.email || '';
  if (bioIn) bioIn.value = profile.bio || '';
  if (resNameIn) resNameIn.value = profile.resumeName || 'M_Pradyumna_Devi_Resume.pdf';
  if (avatarPrev && profile.avatarUrl) avatarPrev.src = normalizeAssetUrl(profile.avatarUrl);

  const modal = document.getElementById('editProfileModal');
  modal.style.display = 'flex';
}

function closeProfileModal() {
  document.getElementById('editProfileModal').style.display = 'none';
}

function openPortfolioModal() {
  renderProfile();
  const modal = document.getElementById('profilePortfolioModal');
  if (modal) modal.style.display = 'flex';
  lucide.createIcons();
}

function closePortfolioModal() {
  const modal = document.getElementById('profilePortfolioModal');
  if (modal) modal.style.display = 'none';
}

function openResumeViewerModal() {
  renderProfile();
  const modal = document.getElementById('resumeViewerModal');
  if (modal) modal.style.display = 'flex';
  lucide.createIcons();
}

function closeResumeViewerModal() {
  const modal = document.getElementById('resumeViewerModal');
  if (modal) modal.style.display = 'none';
}

function downloadAcademicResume() {
  // If user uploaded a custom file and stored it
  if (profile.customResumeDataUrl) {
    const a = document.createElement('a');
    a.href = profile.customResumeDataUrl;
    a.download = profile.resumeName || "M_Pradyumna_Devi_Resume.pdf";
    a.click();
    showToast("Downloaded resume document!");
    return;
  }

  // Generate downloadable resume text/html document
  const paper = document.getElementById('resumePaper');
  if (!paper) return;

  const resumeHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${profile.name} - Academic Resume</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #1e293b; max-width: 800px; margin: 0 auto; line-height: 1.5; }
    h1 { margin: 0; color: #0f172a; font-size: 26px; }
    .tagline { color: #0284c7; font-weight: 600; }
    .institute { color: #475569; font-size: 13px; margin-bottom: 12px; }
    .divider { height: 2px; background: #0284c7; margin: 12px 0 20px 0; }
    .heading { font-size: 13px; font-weight: 800; color: #0369a1; text-transform: uppercase; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 4px; margin: 20px 0 10px 0; letter-spacing: 0.5px; }
    .top-row { display: flex; justify-content: space-between; font-weight: bold; }
    .sub { color: #0284c7; font-size: 13px; }
    ul { padding-left: 20px; font-size: 13px; }
  </style>
</head>
<body>
  ${paper.innerHTML}
</body>
</html>`;

  const blob = new Blob([resumeHtml], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = profile.resumeName || `${(profile.name || "Student").replace(/\s+/g, '_')}_Resume.html`;
  a.click();
  URL.revokeObjectURL(url);
  showToast("Academic Resume downloaded successfully!");
}

// ==========================================
// HOMEPAGE MAIN TABS: MODULES | EXPERIMENTS | TOOLS
// ==========================================
function switchMainTab(tabName) {
  activeMainTab = tabName;

  // Update tabs buttons UI
  document.querySelectorAll('.portal-nav-tab').forEach(btn => {
    const isTarget = btn.dataset.tab === tabName;
    btn.classList.toggle('active', isTarget);
    btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
  });

  const gridView = document.getElementById('experimentsGridView');
  const modulesView = document.getElementById('modulesGridView');
  const toolsView = document.getElementById('toolsGridView');
  const actionBarStrip = document.querySelector('.action-bar-strip');

  // Hide all 3 main views
  if (gridView) gridView.style.display = 'none';
  if (modulesView) modulesView.style.display = 'none';
  if (toolsView) toolsView.style.display = 'none';

  if (tabName === 'modules') {
    if (modulesView) modulesView.style.display = 'block';
    if (actionBarStrip) actionBarStrip.style.display = 'none';
    renderModules();
  } else if (tabName === 'experiments') {
    if (gridView) gridView.style.display = 'block';
    if (actionBarStrip) actionBarStrip.style.display = 'flex';
    renderExperimentsGrid();
  } else if (tabName === 'tools') {
    if (toolsView) toolsView.style.display = 'block';
    if (actionBarStrip) actionBarStrip.style.display = 'none';
    renderTools();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
  lucide.createIcons();
}

// ==========================================
// VIEW SWITCHING
// ==========================================
function switchView(viewName, expId = null, subTaskLetter = null) {
  activeView = viewName;
  const gridView = document.getElementById('experimentsGridView');
  const modulesView = document.getElementById('modulesGridView');
  const toolsView = document.getElementById('toolsGridView');
  const overviewView = document.getElementById('experimentOverviewView');
  const workspaceView = document.getElementById('subTaskWorkspaceView');
  const mainTabsNav = document.getElementById('portalMainTabsNav');
  const actionBarStrip = document.querySelector('.action-bar-strip');

  // Hide all panels
  if (gridView) { gridView.style.display = 'none'; gridView.classList.remove('active'); }
  if (modulesView) { modulesView.style.display = 'none'; modulesView.classList.remove('active'); }
  if (toolsView) { toolsView.style.display = 'none'; toolsView.classList.remove('active'); }
  if (overviewView) { overviewView.style.display = 'none'; overviewView.classList.remove('active'); }
  if (workspaceView) { workspaceView.style.display = 'none'; workspaceView.classList.remove('active'); }

  // Reset window scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (viewName === 'grid') {
    if (mainTabsNav) mainTabsNav.style.display = 'block';
    switchMainTab(activeMainTab);
  } else if (viewName === 'overview') {
    if (mainTabsNav) mainTabsNav.style.display = 'none';
    if (actionBarStrip) actionBarStrip.style.display = 'none';
    currentExpId = expId;
    const exp = experiments.find(e => e.id === expId);
    if (!exp) return switchView('grid');

    if (overviewView) {
      overviewView.style.display = 'block';
      overviewView.classList.add('active');
    }
    renderExperimentOverview(exp);
  } else if (viewName === 'workspace') {
    if (mainTabsNav) mainTabsNav.style.display = 'none';
    if (actionBarStrip) actionBarStrip.style.display = 'none';
    currentExpId = expId;
    currentSubTaskLetter = subTaskLetter;
    const exp = experiments.find(e => e.id === expId);
    if (!exp) return switchView('grid');

    const subTask = exp.subTasks.find(st => st.letter === subTaskLetter) || exp.subTasks[0];
    if (!subTask) return switchView('overview', expId);

    if (workspaceView) {
      workspaceView.style.display = 'block';
      workspaceView.classList.add('active');
    }
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

    const firstSubTaskLetter = (exp.subTasks && exp.subTasks.length > 0) ? exp.subTasks[0].letter : 'A';

    // Generate sub-task pills [A] [B] [C] [D] with distinct letter indicators
    const subTasksHtml = (exp.subTasks || []).map(st => `
      <button 
        class="subtask-pill" 
        data-letter="${st.letter}"
        data-exp-id="${exp.id}" 
        data-task-letter="${st.letter}" 
        title="Launch Sub-Task ${st.codeId || st.letter}: ${st.title}"
      >
        ${st.letter}
      </button>
    `).join('');

    // Tech tags micro-row
    const tagsHtml = (exp.tags && exp.tags.length > 0) ? `
      <div class="exp-tags-row">
        ${exp.tags.slice(0, 3).map(tag => `<span class="exp-tech-tag">${tag}</span>`).join('')}
        ${exp.tags.length > 3 ? `<span class="exp-tech-tag more">+${exp.tags.length - 3}</span>` : ''}
      </div>
    ` : '';

    card.innerHTML = `
      <!-- Top 16:9 Media Preview Banner -->
      <div class="exp-media-banner" data-action="overview" data-exp-id="${exp.id}" title="Click to view experiment overview & demonstration">
        ${exp.previewVideoUrl && exp.previewVideoUrl.endsWith('.mp4') ? `
          <video class="card-preview-media" src="${normalizeAssetUrl(exp.previewVideoUrl)}" autoplay loop muted playsinline></video>
        ` : `
          <img class="card-preview-media" src="${exp.videoThumbnail || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80'}" alt="${exp.title}" />
        `}
        <div class="exp-banner-overlay"></div>
        <div class="exp-banner-top-badges">
          <span class="exp-category-glass-pill">${exp.category}</span>
          <span class="exp-duration-glass-pill">
            <span class="video-pulse-dot"></span>
            <span>${exp.previewDuration || '00:10'}</span>
          </span>
        </div>
        <div class="video-play-glass-btn" title="Open Demonstration">
          <i data-lucide="play" class="play-triangle-icon"></i>
        </div>
      </div>

      <!-- Card Body Content -->
      <div class="exp-card-body-content">
        <div class="exp-card-header-meta">
          <span class="exp-number-tag">EXP - ${exp.number}</span>
          <span class="exp-curriculum-status">
            <span class="status-dot-active"></span>
            <span>Curriculum Standard</span>
          </span>
        </div>

        <h3 class="exp-title" title="${exp.title}" data-action="overview" data-exp-id="${exp.id}">${exp.title}</h3>
        <p class="exp-description" title="${exp.description}">
          ${exp.description}
        </p>

        ${tagsHtml}
      </div>

      <!-- Card Bottom Toolbar: Subtasks & Direct Launch Actions -->
      <div class="exp-card-footer">
        <div class="footer-left-actions">
          <span class="subtasks-label-meta">Tasks:</span>
          <div class="subtasks-pills-row">
            ${subTasksHtml}
          </div>
        </div>

        <div class="footer-right-actions">
          <a class="btn-card-github" href="${exp.githubUrl || 'https://github.com/pradyumna-devi/mbu-datascience-lab'}" target="_blank" rel="noopener noreferrer" title="View Experiment Source Code on GitHub" onclick="event.stopPropagation();">
            <i data-lucide="github"></i>
            <span>GitHub</span>
          </a>

          <button class="btn-card-overview" data-action="overview" data-exp-id="${exp.id}" title="Open Experiment Syllabus & Objectives">
            <i data-lucide="layers"></i>
            <span>Overview</span>
          </button>
          
          <button class="btn-card-launch" data-action="launch" data-exp-id="${exp.id}" data-first-letter="${firstSubTaskLetter}" title="Launch Interactive Lab Workspace">
            <span>Launch Lab</span>
            <i data-lucide="arrow-right"></i>
          </button>

          <div class="card-more-actions">
            <button class="card-action-icon-btn" data-action="edit" data-exp-id="${exp.id}" title="Edit Experiment">
              <i data-lucide="edit-2"></i>
            </button>
            <button class="card-action-icon-btn delete" data-action="delete" data-exp-id="${exp.id}" title="Delete Experiment">
              <i data-lucide="trash-2"></i>
            </button>
          </div>
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

  const overviewGh = document.getElementById('overviewGithubLinkBtn');
  if (overviewGh) {
    overviewGh.href = exp.githubUrl || 'https://github.com/pradyumna-devi/mbu-datascience-lab';
  }

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
        <a class="btn-subtask-github" href="${st.githubUrl || exp.githubUrl || 'https://github.com/pradyumna-devi/mbu-datascience-lab'}" target="_blank" rel="noopener noreferrer" title="View Python Script on GitHub" onclick="event.stopPropagation();">
          <i data-lucide="github"></i>
          <span>Code</span>
        </a>
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

  const wsGhBtn = document.getElementById('workspaceGithubBtn');
  if (wsGhBtn) {
    wsGhBtn.href = subTask.githubUrl || exp.githubUrl || 'https://github.com/pradyumna-devi/mbu-datascience-lab';
  }

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
        <div class="aim-block">
          <div class="aim-title">🎯 Aim:</div>
          <div class="aim-text">${subTask.aim || subTask.concept}</div>
        </div>
        ${subTask.syntax ? `
          <div class="syntax-block">
            <div class="syntax-title">📝 Syntax &amp; General Form:</div>
            <pre class="syntax-pre">${subTask.syntax}</pre>
          </div>
        ` : ''}
      `;
    } else {
      conceptText.textContent = subTask.concept || "Laboratory experimentation and model fitting module.";
    }
  }

  // Interactive Python Code Editor setup
  const codeEditor = document.getElementById('workspaceCodeEditor');
  const codeBlock = document.getElementById('workspaceCodeBlock');
  if (codeEditor) {
    codeEditor.value = subTask.code || `# Lab Task: ${subTask.title}\nprint("Kernel execution ready.")`;
    codeEditor.style.fontSize = `${editorFontSize}px`;
    updateCodeEditorGutter();
  }
  if (codeBlock) {
    codeBlock.textContent = codeEditor ? codeEditor.value : (subTask.code || '');
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

function updateCodeEditorGutter() {
  const editor = document.getElementById('workspaceCodeEditor');
  const gutter = document.getElementById('editorGutter');
  const linesBadge = document.getElementById('editorLinesBadge');
  if (!editor || !gutter) return;

  const lines = editor.value.split('\n');
  const count = Math.max(1, lines.length);
  gutter.innerHTML = Array.from({ length: count }, (_, i) => i + 1).join('<br>');
  if (linesBadge) {
    linesBadge.textContent = `Lines: ${count} | Chars: ${editor.value.length}`;
  }
}

function resetWorkspaceCode() {
  const exp = experiments.find(e => e.id === currentExpId);
  if (!exp) return;
  const subTask = exp.subTasks.find(st => st.letter === currentSubTaskLetter) || exp.subTasks[0];
  if (!subTask) return;

  const editor = document.getElementById('workspaceCodeEditor');
  if (editor) {
    editor.value = subTask.code || '';
    updateCodeEditorGutter();
    showToast("Code reset to original laboratory template!");
  }
}

function downloadWorkspaceCode() {
  const editor = document.getElementById('workspaceCodeEditor');
  const code = editor ? editor.value : '';
  const blob = new Blob([code], { type: 'text/x-python' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `experiment_${currentExpId || 'lab'}_${currentSubTaskLetter || 'code'}.py`;
  a.click();
  URL.revokeObjectURL(url);
  showToast("Downloaded Python script (.py)!");
}

function renderChartOrImage(subTask) {
  const chartCanvas = document.getElementById('experimentVisualChart');
  const staticImg = document.getElementById('staticPlotImg');
  const chartContainer = document.getElementById('interactiveChartContainer');
  const staticContainer = document.getElementById('staticPlotContainer');

  const videoContainer = document.getElementById('videoLectureContainer');
  const chartBtn = document.getElementById('showInteractiveChartBtn');
  const plotBtn = document.getElementById('showStaticPlotBtn');
  const videoBtn = document.getElementById('showVideoLectureBtn');

  if (subTask.outputImage) {
    staticImg.src = subTask.outputImage;
  } else {
    staticImg.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80";
  }

  // Check if subTask has a video lecture (YouTube or MP4)
  const exp = experiments.find(e => e.id === currentExpId);
  const targetVideo = subTask.videoUrl || (exp && exp.previewVideoUrl);
  const hasVideo = targetVideo && (targetVideo.includes('youtube') || targetVideo.includes('youtu.be') || targetVideo.endsWith('.mp4'));

  // If subTask has an official lecture video (such as YouTube), activate Video Lecture by default!
  if (hasVideo) {
    if (chartContainer) chartContainer.style.display = 'none';
    if (staticContainer) staticContainer.style.display = 'none';
    if (videoContainer) videoContainer.style.display = 'block';
    if (chartBtn) chartBtn.classList.remove('active');
    if (plotBtn) plotBtn.classList.remove('active');
    if (videoBtn) videoBtn.classList.add('active');
  } else {
    if (chartContainer) chartContainer.style.display = 'flex';
    if (staticContainer) staticContainer.style.display = 'none';
    if (videoContainer) videoContainer.style.display = 'none';
    if (chartBtn) chartBtn.classList.add('active');
    if (plotBtn) plotBtn.classList.remove('active');
    if (videoBtn) videoBtn.classList.remove('active');
  }

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
// CODE RUNNER: REAL-TIME PYTHON EXECUTION
// ==========================================

// Subscribe to real-time WebAssembly kernel status
subscribeKernelStatus((status) => {
  const dot = document.getElementById('kernelStatusDot');
  const text = document.getElementById('kernelStatusText');
  if (!dot || !text) return;

  if (status === 'loading') {
    dot.style.background = '#f59e0b';
    dot.style.boxShadow = '0 0 8px #f59e0b';
    text.textContent = 'Python 3.12 Kernel • Initializing Wasm...';
  } else if (status === 'ready') {
    dot.style.background = '#10b981';
    dot.style.boxShadow = '0 0 8px #10b981';
    text.textContent = 'Python 3.12 Kernel • Online (Wasm)';
  } else if (status === 'fallback') {
    dot.style.background = '#06b6d4';
    dot.style.boxShadow = '0 0 8px #06b6d4';
    text.textContent = 'Python 3.12 Kernel • Client Engine';
  }
});

// Warm up WebAssembly kernel in the background
initPyodideKernel().catch(() => {});

async function executeVirtualKernel() {
  const btn = document.getElementById('executeCodeBtn');
  const terminal = document.getElementById('workspaceTerminalOutput');
  const statusTag = document.getElementById('executionStatusTag');
  const editor = document.getElementById('workspaceCodeEditor');
  const userCode = editor ? editor.value : '';

  if (!userCode.trim()) {
    showToast("Editor is empty. Write or load Python code to execute.", "info");
    return;
  }

  btn.innerHTML = `<i data-lucide="loader-2" class="spin"></i> Executing...`;
  btn.style.opacity = '0.7';
  btn.disabled = true;
  statusTag.innerHTML = `<span class="pulse-green"></span> Executing...`;

  terminal.textContent = ">>> Initializing Python execution environment...\n>>> Parsing and executing script...\n";

  try {
    const result = await executePythonCode(userCode, (progressMsg) => {
      terminal.textContent = `>>> ${progressMsg}\n`;
    });

    if (result.success) {
      let displayOutput = "";
      if (result.stdout && result.stdout.trim()) {
        displayOutput = result.stdout;
      } else {
        displayOutput = "[Process finished with exitcode 0 (No stdout output)]";
      }

      if (result.stderr && result.stderr.trim()) {
        displayOutput += "\n\n--- Standard Error (stderr) ---\n" + result.stderr;
      }

      displayOutput += `\n\n------------------------------------------------------------\n[SUCCESS] Exited with code 0 at ${new Date().toLocaleTimeString()}.\nEngine: ${result.engine} | Execution Time: ${result.executionTime}s`;
      terminal.textContent = displayOutput;

      // Handle dynamic matplotlib plot if generated by code
      if (result.plotBase64) {
        const staticImg = document.getElementById('staticPlotImg');
        if (staticImg) {
          staticImg.src = `data:image/png;base64,${result.plotBase64}`;
        }
        // Switch view to plot tab if user generated a plot
        const showPlotBtn = document.getElementById('showStaticPlotBtn');
        const showChartBtn = document.getElementById('showInteractiveChartBtn');
        const showVideoBtn = document.getElementById('showVideoLectureBtn');
        const chartContainer = document.getElementById('interactiveChartContainer');
        const staticContainer = document.getElementById('staticPlotContainer');
        const videoContainer = document.getElementById('videoLectureContainer');

        if (showPlotBtn) showPlotBtn.classList.add('active');
        if (showChartBtn) showChartBtn.classList.remove('active');
        if (showVideoBtn) showVideoBtn.classList.remove('active');
        if (chartContainer) chartContainer.style.display = 'none';
        if (staticContainer) staticContainer.style.display = 'block';
        if (videoContainer) videoContainer.style.display = 'none';

        showToast("Generated Matplotlib plot displayed in Diagnostic Visualizer!");
      }

      statusTag.innerHTML = `<span class="green-dot"></span> Executed (${result.executionTime}s)`;
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
      showToast("Python code executed successfully!");
    } else {
      // Execution error (Traceback / SyntaxError)
      let errorOutput = "";
      if (result.stdout && result.stdout.trim()) {
        errorOutput += result.stdout + "\n\n";
      }
      errorOutput += (result.error || result.stderr || "Execution error encountered.");
      errorOutput += `\n\n------------------------------------------------------------\n[ERROR] Process exited with error code 1 at ${new Date().toLocaleTimeString()}.\nEngine: ${result.engine} | Execution Time: ${result.executionTime}s`;
      
      terminal.textContent = errorOutput;
      statusTag.innerHTML = `<span class="status-pulse-dot" style="background: #ef4444; box-shadow: 0 0 8px #ef4444;"></span> Error (${result.executionTime}s)`;
      showToast("Execution error in script. Check terminal traceback.", "info");
    }
  } catch (err) {
    terminal.textContent = `>>> System Execution Error:\n${err.message || err}`;
    statusTag.innerHTML = `<span class="status-pulse-dot" style="background: #ef4444;"></span> Failed`;
    showToast("Execution engine failure", "info");
  } finally {
    btn.innerHTML = `<i data-lucide="play"></i> Run Code`;
    btn.style.opacity = '1';
    btn.disabled = false;
    lucide.createIcons();
  }
}

function copyCodeToClipboard() {
  const editor = document.getElementById('workspaceCodeEditor');
  const codeBlock = document.getElementById('workspaceCodeBlock');
  const code = editor ? editor.value : (codeBlock ? codeBlock.textContent : '');
  navigator.clipboard.writeText(code).then(() => {
    showToast("Code copied to clipboard!");
  }).catch(() => {
    showToast("Could not copy code", "info");
  });
}

// ==========================================
// VIEW: CURRICULUM MODULES (OPTION 1)
// ==========================================
let currentFormPdfState = null;
let pendingDirectUploadModuleId = null;

function renderModules() {
  const container = document.getElementById('modulesCardsContainer');
  if (!container) return;
  container.innerHTML = '';

  // Update counters
  const countBadge = document.getElementById('modulesCountBadge');
  if (countBadge) countBadge.textContent = `${modules.length} Core Modules`;
  const headerCountPill = document.getElementById('modulesHeaderCountPill');
  if (headerCountPill) headerCountPill.textContent = `${modules.length} Tracks`;

  if (modules.length === 0) {
    container.innerHTML = `
      <div class="empty-state-card" style="grid-column: 1 / -1; padding: 48px 24px; text-align: center;">
        <div class="empty-icon-wrap" style="margin: 0 auto 16px;">
          <i data-lucide="layers" style="width: 32px; height: 32px; color: var(--accent-indigo);"></i>
        </div>
        <h3 class="empty-state-title" style="margin-bottom: 8px;">No Academic Modules Configured</h3>
        <p style="color: var(--text-muted); margin-bottom: 20px;">Add custom curriculum modules and upload syllabus PDF documents to populate your department library.</p>
        <button class="btn-primary" id="emptyAddModuleBtn">
          <i data-lucide="plus-circle"></i> + Add First Module
        </button>
      </div>
    `;
    document.getElementById('emptyAddModuleBtn')?.addEventListener('click', () => openModuleModal());
    lucide.createIcons();
    return;
  }

  modules.forEach(mod => {
    const card = document.createElement('div');
    card.className = 'module-card';
    card.style.borderColor = mod.borderColor || 'rgba(56, 189, 248, 0.3)';

    const topics = Array.isArray(mod.topics) ? mod.topics : [];
    const topicsHtml = topics.map(t => `
      <div class="module-topic-item">
        <i data-lucide="check-circle-2"></i>
        <span>${t}</span>
      </div>
    `).join('');

    const hasPdf = Boolean(mod.hasPdf || mod.pdfFileName);

    const pdfSectionHtml = hasPdf ? `
      <div class="module-pdf-section">
        <div class="module-pdf-chip has-pdf">
          <div class="pdf-chip-left">
            <div class="pdf-file-icon-square">
              <i data-lucide="file-text"></i>
            </div>
            <div class="pdf-chip-meta">
              <span class="pdf-chip-filename" title="${mod.pdfFileName || (mod.code + ' Syllabus.pdf')}">${mod.pdfFileName || (mod.code + ' Syllabus.pdf')}</span>
              <span class="pdf-chip-subtext">${mod.pdfFileSize || 'PDF Document'} &bull; ${mod.pdfUploadDate || 'Attached'}</span>
            </div>
          </div>
          <div class="pdf-chip-right-actions">
            <button class="btn-view-pdf" data-action="view-pdf" data-id="${mod.id}" title="Preview Syllabus PDF Document">
              <i data-lucide="eye"></i>
              <span>View PDF</span>
            </button>
            <button class="btn-download-pdf-mini" data-action="download-pdf" data-id="${mod.id}" title="Download Syllabus PDF">
              <i data-lucide="download"></i>
            </button>
          </div>
        </div>
      </div>
    ` : `
      <div class="module-pdf-section">
        <div class="module-pdf-chip no-pdf">
          <div class="pdf-chip-left">
            <i data-lucide="file-up" style="width: 18px; height: 18px; color: var(--text-dim);"></i>
            <div class="pdf-chip-meta">
              <span class="pdf-chip-filename" style="color: var(--text-muted); font-weight: normal;">No syllabus PDF attached</span>
              <span class="pdf-chip-subtext">Click to upload syllabus document</span>
            </div>
          </div>
          <div class="pdf-chip-right-actions">
            <button class="btn-attach-pdf-trigger" data-action="upload-pdf-card" data-id="${mod.id}" title="Upload Syllabus PDF">
              <i data-lucide="upload-cloud"></i>
              <span>+ Upload PDF</span>
            </button>
          </div>
        </div>
      </div>
    `;

    card.innerHTML = `
      <div class="module-card-header">
        <div class="module-header-left">
          <span class="module-code-badge" style="color: ${mod.badgeColor || '#38bdf8'}; border-color: ${mod.borderColor || 'rgba(56, 189, 248, 0.3)'}; background: rgba(56, 189, 248, 0.1);">${mod.code}</span>
          <span class="module-credits-pill">${mod.credits || '4 Credits'} &bull; ${mod.hours || 'Course Load'}</span>
        </div>
        <div class="module-header-actions">
          <button class="module-action-btn edit" data-action="edit-module" data-id="${mod.id}" title="Edit Module &amp; Syllabus PDF">
            <i data-lucide="edit-3"></i>
          </button>
          <button class="module-action-btn delete" data-action="delete-module" data-id="${mod.id}" title="Remove Module">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      </div>

      <h3 class="module-title">${mod.title}</h3>
      <p class="module-description">${mod.description || ''}</p>

      ${pdfSectionHtml}

      <div class="module-topics-list">
        <div class="module-topics-title">Curriculum Topics &amp; Competencies:</div>
        ${topicsHtml || '<div class="module-topic-item" style="color: var(--text-dim); font-style: italic;">No specific topics listed.</div>'}
      </div>

      <div class="module-footer-action">
        <span class="module-hours-tag">Domain: <strong>${mod.category}</strong></span>
        <button class="btn-open-module-exp" data-category="${mod.category}" data-exp-id="${mod.relevantExpId || ''}">
          <span>Explore Experiments</span>
          <i data-lucide="arrow-right" style="width: 14px; height: 14px;"></i>
        </button>
      </div>
    `;

    // Action listener: Edit Module
    card.querySelector('[data-action="edit-module"]')?.addEventListener('click', (e) => {
      e.stopPropagation();
      openModuleModal(mod.id);
    });

    // Action listener: Delete Module
    card.querySelector('[data-action="delete-module"]')?.addEventListener('click', (e) => {
      e.stopPropagation();
      handleDeleteModule(mod.id);
    });

    // Action listener: View PDF
    card.querySelector('[data-action="view-pdf"]')?.addEventListener('click', (e) => {
      e.stopPropagation();
      openPdfViewerModal(mod.id);
    });

    // Action listener: Download PDF
    card.querySelector('[data-action="download-pdf"]')?.addEventListener('click', (e) => {
      e.stopPropagation();
      handleDownloadModulePdf(mod.id);
    });

    // Action listener: Quick upload PDF from card
    card.querySelector('[data-action="upload-pdf-card"]')?.addEventListener('click', (e) => {
      e.stopPropagation();
      pendingDirectUploadModuleId = mod.id;
      const directInput = document.getElementById('directCardPdfUploadInput');
      if (directInput) {
        directInput.value = '';
        directInput.click();
      } else {
        openModuleModal(mod.id, true);
      }
    });

    // Explore experiments button
    const expBtn = card.querySelector('.btn-open-module-exp');
    expBtn?.addEventListener('click', () => {
      currentCategoryFilter = mod.category;
      document.querySelectorAll('.category-chip').forEach(c => {
        c.classList.toggle('active', c.dataset.category.toLowerCase() === mod.category.toLowerCase());
      });
      switchMainTab('experiments');
      showToast(`Showing experiments for ${mod.category}`);
    });

    container.appendChild(card);
  });

  lucide.createIcons();
}

function openModuleModal(editId = null, focusPdf = false) {
  const modal = document.getElementById('moduleFormModal');
  const heading = document.getElementById('moduleModalHeading');
  const icon = document.getElementById('moduleModalIcon');
  const form = document.getElementById('moduleForm');
  const dropzone = document.getElementById('modulePdfDropzone');
  const attachedCard = document.getElementById('attachedPdfInfoCard');
  const statusTag = document.getElementById('formPdfStatusTag');
  const fileInput = document.getElementById('formModulePdfFileInput');

  if (fileInput) fileInput.value = '';
  form.reset();

  if (editId) {
    const mod = modules.find(m => m.id === editId);
    if (!mod) return;

    heading.textContent = `Edit Module: ${mod.code}`;
    icon.setAttribute('data-lucide', 'edit-3');
    document.getElementById('editModuleId').value = mod.id;
    document.getElementById('formModuleCode').value = mod.code;
    document.getElementById('formModuleCategory').value = mod.category;
    document.getElementById('formModuleTitle').value = mod.title;
    document.getElementById('formModuleCredits').value = mod.credits || '4 Credits';
    document.getElementById('formModuleHours').value = mod.hours || '14 Theory + 28 Lab Hours';
    document.getElementById('formModuleDescription').value = mod.description || '';
    document.getElementById('formModuleTopics').value = Array.isArray(mod.topics) ? mod.topics.join('\n') : '';

    if (mod.hasPdf || mod.pdfFileName) {
      currentFormPdfState = {
        name: mod.pdfFileName || `${mod.code}_Syllabus.pdf`,
        sizeFormatted: mod.pdfFileSize || '1.24 MB',
        date: mod.pdfUploadDate || 'Attached',
        isExisting: true,
        moduleId: mod.id,
        dataUrl: mod.pdfDataUrl || null
      };

      document.getElementById('attachedPdfNameDisplay').textContent = currentFormPdfState.name;
      document.getElementById('attachedPdfSizeDisplay').textContent = currentFormPdfState.sizeFormatted;
      document.getElementById('attachedPdfDateDisplay').textContent = currentFormPdfState.date;
      attachedCard.style.display = 'flex';
      dropzone.style.display = 'none';
      statusTag.textContent = 'Syllabus Attached';
    } else {
      currentFormPdfState = null;
      attachedCard.style.display = 'none';
      dropzone.style.display = 'block';
      statusTag.textContent = 'Supported format: PDF';
    }
  } else {
    // Add New Module
    heading.textContent = 'Add Academic Curriculum Module';
    icon.setAttribute('data-lucide', 'layers');
    document.getElementById('editModuleId').value = '';

    const nextNum = modules.length + 1;
    document.getElementById('formModuleCode').value = `DS-MOD-10${nextNum}`;
    document.getElementById('formModuleCategory').value = 'Deep Learning';
    document.getElementById('formModuleTitle').value = '';
    document.getElementById('formModuleCredits').value = '4 Credits';
    document.getElementById('formModuleHours').value = '16 Theory + 32 Lab Hours';
    document.getElementById('formModuleDescription').value = '';
    document.getElementById('formModuleTopics').value = '';

    currentFormPdfState = null;
    attachedCard.style.display = 'none';
    dropzone.style.display = 'block';
    statusTag.textContent = 'Supported format: PDF';
  }

  modal.style.display = 'flex';
  lucide.createIcons();

  if (focusPdf && dropzone) {
    setTimeout(() => {
      dropzone.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }
}

function closeModuleModal() {
  const modal = document.getElementById('moduleFormModal');
  if (modal) modal.style.display = 'none';
  currentFormPdfState = null;
}

function handleFormPdfSelect(file) {
  if (!file) return;
  if (!file.type.includes('pdf') && !file.name.toLowerCase().endsWith('.pdf')) {
    showToast('Please upload a valid PDF document (.pdf)', 'info');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const dataUrl = e.target.result;
    currentFormPdfState = {
      name: file.name,
      size: file.size,
      sizeFormatted: formatFileSize(file.size),
      type: file.type || 'application/pdf',
      dataUrl: dataUrl,
      uploadDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      isNew: true
    };

    document.getElementById('attachedPdfNameDisplay').textContent = file.name;
    document.getElementById('attachedPdfSizeDisplay').textContent = formatFileSize(file.size);
    document.getElementById('attachedPdfDateDisplay').textContent = 'Ready to save';

    document.getElementById('attachedPdfInfoCard').style.display = 'flex';
    document.getElementById('modulePdfDropzone').style.display = 'none';
    document.getElementById('formPdfStatusTag').textContent = 'New PDF Selected';
    lucide.createIcons();
    showToast(`Attached ${file.name} (${formatFileSize(file.size)})`);
  };

  reader.onerror = () => {
    showToast('Failed to read PDF file', 'info');
  };

  reader.readAsDataURL(file);
}

async function handleModuleFormSubmit(e) {
  e.preventDefault();

  const editId = document.getElementById('editModuleId').value;
  const code = document.getElementById('formModuleCode').value.trim();
  const category = document.getElementById('formModuleCategory').value.trim();
  const title = document.getElementById('formModuleTitle').value.trim();
  const credits = document.getElementById('formModuleCredits').value.trim() || '4 Credits';
  const hours = document.getElementById('formModuleHours').value.trim() || '14 Theory + 28 Lab Hours';
  const description = document.getElementById('formModuleDescription').value.trim();
  const rawTopics = document.getElementById('formModuleTopics').value.trim();

  const topics = rawTopics
    ? rawTopics.split('\n').map(t => t.trim()).filter(Boolean)
    : ["Fundamental Principles & Algorithms", "Digital Laboratory Practical", "Diagnostic Assessment"];

  const colorMap = {
    'introduction to data science': { badge: '#38bdf8', border: 'rgba(14, 165, 233, 0.4)' },
    'data extraction': { badge: '#c084fc', border: 'rgba(168, 85, 247, 0.4)' },
    'data wrangling': { badge: '#38bdf8', border: 'rgba(14, 165, 233, 0.4)' },
    'data visualization': { badge: '#c084fc', border: 'rgba(168, 85, 247, 0.4)' },
    'time series': { badge: '#34d399', border: 'rgba(16, 185, 129, 0.4)' },
    'deep learning': { badge: '#fb7185', border: 'rgba(244, 63, 94, 0.4)' },
    'machine learning': { badge: '#fbbf24', border: 'rgba(245, 158, 11, 0.4)' },
    'natural language processing': { badge: '#818cf8', border: 'rgba(99, 102, 241, 0.4)' },
    'computer vision': { badge: '#2dd4bf', border: 'rgba(45, 212, 191, 0.4)' }
  };
  const categoryKey = category.toLowerCase();
  const palette = colorMap[categoryKey] || { badge: '#38bdf8', border: 'rgba(56, 189, 248, 0.4)' };

  if (editId) {
    const idx = modules.findIndex(m => m.id === editId);
    if (idx !== -1) {
      modules[idx].code = code;
      modules[idx].category = category;
      modules[idx].title = title;
      modules[idx].credits = credits;
      modules[idx].hours = hours;
      modules[idx].description = description;
      modules[idx].topics = topics;
      modules[idx].badgeColor = palette.badge;
      modules[idx].borderColor = palette.border;

      if (currentFormPdfState?.isNew) {
        await storeModulePdf(editId, currentFormPdfState);
        modules[idx].hasPdf = true;
        modules[idx].pdfFileName = currentFormPdfState.name;
        modules[idx].pdfFileSize = currentFormPdfState.sizeFormatted;
        modules[idx].pdfUploadDate = currentFormPdfState.uploadDate;
        if (currentFormPdfState.dataUrl && currentFormPdfState.dataUrl.length < 150000) {
          modules[idx].pdfDataUrl = currentFormPdfState.dataUrl;
        } else {
          delete modules[idx].pdfDataUrl;
        }
      } else if (currentFormPdfState?.isRemoved) {
        await deleteModulePdf(editId);
        modules[idx].hasPdf = false;
        delete modules[idx].pdfFileName;
        delete modules[idx].pdfFileSize;
        delete modules[idx].pdfUploadDate;
        delete modules[idx].pdfDataUrl;
      }
    }
  } else {
    const targetId = `mod-${Date.now()}`;
    const newMod = {
      id: targetId,
      code,
      title,
      category,
      hours,
      credits,
      badgeColor: palette.badge,
      borderColor: palette.border,
      gradient: "linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(37, 99, 235, 0.1))",
      description,
      topics,
      syllabusUnits: [
        "Unit I: Foundations & Theory",
        "Unit II: Practical Implementations",
        "Unit III: Advanced Applications & Evaluation"
      ],
      relevantExpId: "exp-4",
      hasPdf: false
    };

    if (currentFormPdfState?.isNew) {
      await storeModulePdf(targetId, currentFormPdfState);
      newMod.hasPdf = true;
      newMod.pdfFileName = currentFormPdfState.name;
      newMod.pdfFileSize = currentFormPdfState.sizeFormatted;
      newMod.pdfUploadDate = currentFormPdfState.uploadDate;
      if (currentFormPdfState.dataUrl && currentFormPdfState.dataUrl.length < 150000) {
        newMod.pdfDataUrl = currentFormPdfState.dataUrl;
      }
    }

    modules.push(newMod);
  }

  saveModules();
  closeModuleModal();
  renderModules();
  showToast(`Module "${code}" saved successfully!`);
}

async function handleDeleteModule(moduleId) {
  const mod = modules.find(m => m.id === moduleId);
  if (!mod) return;

  const confirmed = confirm(`Are you sure you want to remove curriculum module "${mod.code}: ${mod.title}"?\n\nThis will permanently remove this module and any attached syllabus PDF document.`);
  if (!confirmed) return;

  await deleteModulePdf(moduleId);
  modules = modules.filter(m => m.id !== moduleId);
  saveModules();
  renderModules();
  showToast(`Module "${mod.code}" deleted successfully.`);
}

async function openPdfViewerModal(moduleId, fallbackDataUrl = null) {
  const mod = modules.find(m => m.id === moduleId);
  if (!mod && !fallbackDataUrl) return;

  const modal = document.getElementById('modulePdfViewerModal');
  const titleEl = document.getElementById('pdfViewerModalTitle');
  const subtitleEl = document.getElementById('pdfViewerModalSubtitle');
  const iframe = document.getElementById('modulePdfIframe');
  const downloadBtn = document.getElementById('downloadPdfViewerBtn');
  const openNewTabBtn = document.getElementById('openPdfNewTabBtn');
  const fallbackState = document.getElementById('modulePdfFallbackState');
  const fallbackDownload = document.getElementById('fallbackDownloadLink');

  const titleText = mod ? `${mod.code}: ${mod.title}` : 'Syllabus PDF Document';
  const fileName = mod?.pdfFileName || `${mod?.code || 'Module'}_Syllabus.pdf`;
  const fileSize = mod?.pdfFileSize || 'PDF';

  titleEl.textContent = titleText;
  subtitleEl.textContent = `${fileName} • ${fileSize} • Mohan Babu University`;

  let pdfDataUrl = fallbackDataUrl;

  if (!pdfDataUrl && mod) {
    const stored = await getModulePdf(mod.id);
    if (stored?.dataUrl) {
      pdfDataUrl = stored.dataUrl;
    } else if (mod.pdfDataUrl) {
      pdfDataUrl = mod.pdfDataUrl;
    } else {
      pdfDataUrl = generateSampleSyllabusPdfDataUrl(
        mod.code,
        mod.title,
        mod.category,
        mod.hours || '30 Hours',
        mod.credits || '4 Credits'
      );
    }
  }

  if (pdfDataUrl) {
    iframe.src = pdfDataUrl;
    iframe.style.display = 'block';
    fallbackState.style.display = 'none';

    downloadBtn.href = pdfDataUrl;
    downloadBtn.download = fileName;

    fallbackDownload.href = pdfDataUrl;
    fallbackDownload.download = fileName;

    openNewTabBtn.onclick = () => {
      try {
        const arr = pdfDataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        const blob = new Blob([u8arr], { type: mime });
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, '_blank');
      } catch (e) {
        window.open(pdfDataUrl, '_blank');
      }
    };
  } else {
    iframe.style.display = 'none';
    fallbackState.style.display = 'flex';
  }

  modal.style.display = 'flex';
  lucide.createIcons();
}

function closePdfViewerModal() {
  const modal = document.getElementById('modulePdfViewerModal');
  const iframe = document.getElementById('modulePdfIframe');
  if (iframe) iframe.src = '';
  if (modal) modal.style.display = 'none';
}

async function handleDownloadModulePdf(moduleId) {
  const mod = modules.find(m => m.id === moduleId);
  if (!mod) return;

  let pdfDataUrl = null;
  const stored = await getModulePdf(mod.id);
  if (stored?.dataUrl) {
    pdfDataUrl = stored.dataUrl;
  } else if (mod.pdfDataUrl) {
    pdfDataUrl = mod.pdfDataUrl;
  } else {
    pdfDataUrl = generateSampleSyllabusPdfDataUrl(
      mod.code,
      mod.title,
      mod.category,
      mod.hours || '30 Hours',
      mod.credits || '4 Credits'
    );
  }

  const a = document.createElement('a');
  a.href = pdfDataUrl;
  a.download = mod.pdfFileName || `${mod.code}_Syllabus.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast(`Downloading ${a.download}`);
}

function resetModulesToDefaults() {
  const confirmed = confirm("Reset all curriculum modules to official Mohan Babu University presets? (Any uploaded syllabus PDFs and custom tracks will be replaced)");
  if (!confirmed) return;

  const initial = JSON.parse(JSON.stringify(INITIAL_MODULES)).map(mod => ({
    ...mod,
    hasPdf: true,
    pdfFileName: `${mod.code}_Curriculum_Syllabus.pdf`,
    pdfFileSize: '1.24 MB',
    pdfUploadDate: 'Academic 2026-27'
  }));

  modules = initial;
  saveModules();
  renderModules();
  showToast("Curriculum modules reset to official defaults!");
}

// ==========================================
// VIEW: INTERACTIVE DATA SCIENCE TOOLS (OPTION 3)
// ==========================================
const SAMPLE_DATASETS = {
  iris: {
    name: "Iris Flower Dataset",
    rows: 150,
    cols: 5,
    columns: ["sepal_length", "sepal_width", "petal_length", "petal_width", "species"],
    data: [
      ["5.1", "3.5", "1.4", "0.2", "setosa"],
      ["4.9", "3.0", "1.4", "0.2", "setosa"],
      ["4.7", "3.2", "1.3", "0.2", "setosa"],
      ["7.0", "3.2", "4.7", "1.4", "versicolor"],
      ["6.4", "3.2", "4.5", "1.5", "versicolor"],
      ["6.3", "3.3", "6.0", "2.5", "virginica"],
      ["5.8", "2.7", "5.1", "1.9", "virginica"],
      ["7.1", "3.0", "5.9", "2.1", "virginica"]
    ]
  },
  titanic: {
    name: "Titanic Passenger Demographics",
    rows: 891,
    cols: 6,
    columns: ["PassengerId", "Survived", "Pclass", "Sex", "Age", "Fare"],
    data: [
      ["1", "0", "3", "male", "22.0", "7.25"],
      ["2", "1", "1", "female", "38.0", "71.28"],
      ["3", "1", "3", "female", "26.0", "7.925"],
      ["4", "1", "1", "female", "35.0", "53.10"],
      ["5", "0", "3", "male", "35.0", "8.05"],
      ["6", "0", "3", "male", "NaN", "8.458"]
    ]
  },
  stocks: {
    name: "Tech Stock Time Series",
    rows: 100,
    cols: 5,
    columns: ["Date", "Ticker", "Open", "High", "Close"],
    data: [
      ["2026-10-01", "AAPL", "228.50", "232.10", "231.40"],
      ["2026-10-02", "AAPL", "231.80", "234.00", "233.25"],
      ["2026-10-03", "MSFT", "425.10", "429.50", "428.80"],
      ["2026-10-04", "GOOGL", "168.20", "171.40", "170.90"],
      ["2026-10-05", "NVDA", "124.50", "129.80", "128.90"]
    ]
  },
  students: {
    name: "MBU Data Science Lab Performance",
    rows: 50,
    cols: 6,
    columns: ["Roll_No", "Student_Name", "Exp4_Score", "Exp5_Score", "Exp6_Score", "Status"],
    data: [
      ["24102A030078", "M. Pradyumna Devi", "98", "96", "99", "Exemplary"],
      ["24102A030079", "K. Sai Tharun", "92", "94", "91", "Proficient"],
      ["24102A030080", "P. Ananya Rao", "95", "97", "96", "Exemplary"],
      ["24102A030081", "B. Vamsi Krishna", "88", "90", "89", "Competent"],
      ["24102A030082", "D. Meghana", "94", "93", "95", "Proficient"]
    ]
  }
};

const SCRATCHPAD_TEMPLATES = {
  custom: `# Interactive Data Science Python Scratchpad
import numpy as np
import pandas as pd

print("Hello from MBU Data Science REPL!")
data = np.random.randn(5, 3)
print("Generated Matrix shape:", data.shape)
print("Mean:", np.round(np.mean(data), 4))
`,
  numpy: `# NumPy Matrix & Statistical Operations
import numpy as np

A = np.array([[2, 1], [5, 3]])
inv_A = np.linalg.inv(A)
det_A = np.linalg.det(A)

print("Original Matrix A:\n", A)
print("Determinant of A:", round(det_A, 4))
print("Inverse Matrix A^(-1):\n", np.round(inv_A, 4))
print("Identity Check:\n", np.round(A @ inv_A, 2))
`,
  pandas: `# Pandas MultiIndex & Reshaping
import pandas as pd

arrays = [
    ['Engineering', 'Engineering', 'Science', 'Science'],
    ['DataScience', 'CSE', 'Physics', 'Chemistry']
]
idx = pd.MultiIndex.from_arrays(arrays, names=['School', 'Major'])
s = pd.Series([96, 92, 88, 85], index=idx, name="Enrollment")

print("Hierarchical Series:")
print(s)
print("\nSlicing 'Engineering':")
print(s.loc['Engineering'])
`,
  timeseries: `# Stationarity ADF Simulation
import numpy as np

# Simulate random walk (non-stationary)
np.random.seed(42)
white_noise = np.random.normal(0, 1, 100)
random_walk = np.cumsum(white_noise)

# First differencing to induce weak stationarity
stationary_diff = np.diff(random_walk)

print("Original Random Walk Variance:", np.round(np.var(random_walk), 4))
print("Differenced Series Variance:", np.round(np.var(stationary_diff), 4))
print("ADF Null Hypothesis: Presence of Unit Root")
print("Status: First differencing successfully stabilized series variance!")
`,
  linear_reg: `# Ordinary Least Squares (OLS) Linear Regression
import numpy as np

x = np.array([1, 2, 3, 4, 5, 6, 7, 8])
y = np.array([2.1, 3.8, 6.2, 7.9, 10.3, 11.9, 14.1, 16.0])

slope, intercept = np.polyfit(x, y, 1)
y_pred = slope * x + intercept
residuals = y - y_pred
r2 = 1 - (np.sum(residuals**2) / np.sum((y - np.mean(y))**2))

print(f"Fitted Equation: y = {slope:.3f}x + {intercept:.3f}")
print(f"Coefficient of Determination R^2: {r2:.4f}")
print("Status: Strong positive linear association detected.")
`
};

function renderTools() {
  initScratchpadTool();
  initDatasetTool();
  initMetricsCalculatorTool();
  renderCheatsheets();
}

function initScratchpadTool() {
  const editor = document.getElementById('scratchpadEditor');
  if (editor && !editor.value) {
    editor.value = SCRATCHPAD_TEMPLATES.custom;
  }
}

function initDatasetTool() {
  const selector = document.getElementById('datasetSelector');
  if (selector) {
    loadDatasetView(selector.value || 'iris');
  }
}

function loadDatasetView(key) {
  const dataset = SAMPLE_DATASETS[key];
  if (!dataset) return;

  const metaStrip = document.getElementById('datasetMetaStrip');
  const tableContainer = document.getElementById('datasetTableContainer');
  if (!metaStrip || !tableContainer) return;

  metaStrip.innerHTML = `
    <div class="dataset-pill"><strong>Dataset:</strong> ${dataset.name}</div>
    <div class="dataset-pill"><strong>Records:</strong> ${dataset.rows} Rows</div>
    <div class="dataset-pill"><strong>Features:</strong> ${dataset.cols} Columns</div>
    <div class="dataset-pill"><strong>Missing Values:</strong> 0 (Clean)</div>
    <div class="dataset-pill"><strong>Memory Footprint:</strong> ~${Math.round(dataset.rows * dataset.cols * 8 / 1024 * 10) / 10} KB</div>
  `;

  const thead = dataset.columns.map(c => `<th>${c}</th>`).join('');
  const tbody = dataset.data.map(row => `
    <tr>
      ${row.map(cell => `<td>${cell}</td>`).join('')}
    </tr>
  `).join('');

  tableContainer.innerHTML = `
    <table class="dataset-table">
      <thead>
        <tr>${thead}</tr>
      </thead>
      <tbody>
        ${tbody}
      </tbody>
    </table>
  `;
}

function initMetricsCalculatorTool() {
  calculateConfusionMatrix();
  evaluateAdfStationarity();
}

function calculateConfusionMatrix() {
  const tp = parseFloat(document.getElementById('calcTP')?.value) || 0;
  const fp = parseFloat(document.getElementById('calcFP')?.value) || 0;
  const fn = parseFloat(document.getElementById('calcFN')?.value) || 0;
  const tn = parseFloat(document.getElementById('calcTN')?.value) || 0;

  const total = tp + fp + fn + tn;
  const accuracy = total > 0 ? ((tp + tn) / total) : 0;
  const precision = (tp + fp) > 0 ? (tp / (tp + fp)) : 0;
  const recall = (tp + fn) > 0 ? (tp / (tp + fn)) : 0;
  const specificity = (tn + fp) > 0 ? (tn / (tn + fp)) : 0;
  const f1 = (precision + recall) > 0 ? (2 * precision * recall / (precision + recall)) : 0;

  const container = document.getElementById('cmCalcResults');
  if (container) {
    container.innerHTML = `
      <div class="calc-result-card">
        <div class="calc-result-val">${(accuracy * 100).toFixed(1)}%</div>
        <div class="calc-result-label">Accuracy</div>
      </div>
      <div class="calc-result-card">
        <div class="calc-result-val">${(precision * 100).toFixed(1)}%</div>
        <div class="calc-result-label">Precision</div>
      </div>
      <div class="calc-result-card">
        <div class="calc-result-val">${(recall * 100).toFixed(1)}%</div>
        <div class="calc-result-label">Recall (Sensitivity)</div>
      </div>
      <div class="calc-result-card">
        <div class="calc-result-val">${(specificity * 100).toFixed(1)}%</div>
        <div class="calc-result-label">Specificity</div>
      </div>
      <div class="calc-result-card">
        <div class="calc-result-val">${f1.toFixed(3)}</div>
        <div class="calc-result-label">F1-Score</div>
      </div>
      <div class="calc-result-card">
        <div class="calc-result-val">${total}</div>
        <div class="calc-result-label">Total Samples</div>
      </div>
    `;
  }
}

function evaluateAdfStationarity() {
  const stat = parseFloat(document.getElementById('calcAdfStat')?.value) || 0;
  const crit1 = parseFloat(document.getElementById('calcAdfCrit1')?.value) || -3.48;
  const crit5 = parseFloat(document.getElementById('calcAdfCrit5')?.value) || -2.88;

  const box = document.getElementById('adfVerdictBox');
  if (!box) return;

  const isStationary5 = stat < crit5;
  const isStationary1 = stat < crit1;

  if (isStationary1) {
    box.innerHTML = `
      <div class="adf-verdict-title text-green"><i data-lucide="check-circle"></i> Highly Stationary Series (p < 0.01)</div>
      <div class="adf-verdict-desc">Test statistic (${stat}) is more negative than the 1% critical threshold (${crit1}). We firmly reject the null hypothesis of a unit root at the 99% confidence level. Appropriate for immediate ARIMA modeling without differencing.</div>
    `;
  } else if (isStationary5) {
    box.innerHTML = `
      <div class="adf-verdict-title text-cyan"><i data-lucide="check-circle-2"></i> Stationary Series (p < 0.05)</div>
      <div class="adf-verdict-desc">Test statistic (${stat}) is more negative than the 5% critical threshold (${crit5}). Reject the null hypothesis of unit root at 95% confidence level. Appropriate for stochastic modeling.</div>
    `;
  } else {
    box.innerHTML = `
      <div class="adf-verdict-title text-amber"><i data-lucide="alert-triangle"></i> Non-Stationary Series (Fail to Reject Null)</div>
      <div class="adf-verdict-desc">Test statistic (${stat}) is greater than the 5% critical threshold (${crit5}). Strong presence of unit root. Action required: apply first differencing <code>df['diff'] = df.diff()</code> or logarithmic transformations.</div>
    `;
  }
  lucide.createIcons();
}

function renderCheatsheets() {
  const container = document.getElementById('cheatsheetsContainer');
  if (!container) return;

  const CHEATSHEETS = [
    {
      category: "Pandas Tabular & MultiIndex",
      snippets: [
        { code: "pd.MultiIndex.from_arrays([outer, inner])", desc: "Build hierarchical index" },
        { code: "df.unstack(level='Branch')", desc: "Pivot inner index into columns" },
        { code: "df.combine_first(fallback_df)", desc: "Impute nulls with fallback values" },
        { code: "df.resample('3h').mean()", desc: "Downsample temporal datetime series" }
      ]
    },
    {
      category: "Time Series & Econometrics",
      snippets: [
        { code: "from statsmodels.tsa.stattools import adfuller", desc: "Import ADF stationarity test" },
        { code: "result = adfuller(series.dropna())", desc: "Compute ADF statistic & p-value" },
        { code: "from statsmodels.tsa.seasonal import seasonal_decompose", desc: "STL trend & seasonal decomposition" },
        { code: "from statsmodels.tsa.arima.model import ARIMA", desc: "Fit ARIMA(p,d,q) forecasting model" }
      ]
    },
    {
      category: "NumPy Vectorized Math",
      snippets: [
        { code: "np.random.randn(rows, cols)", desc: "Standard normal matrix distribution" },
        { code: "np.linalg.inv(matrix)", desc: "Compute inverse of square matrix" },
        { code: "np.where(condition, if_true, if_false)", desc: "Vectorized ternary conditional" },
        { code: "np.cumsum(white_noise)", desc: "Generate stochastic random walk" }
      ]
    },
    {
      category: "Matplotlib & Seaborn Graphics",
      snippets: [
        { code: "fig, axes = plt.subplots(nrows, ncols, figsize=(10,6))", desc: "Multi-panel figure grid" },
        { code: "sns.heatmap(df.corr(), annot=True, cmap='coolwarm')", desc: "Correlation matrix heatmap" },
        { code: "plt.tight_layout()", desc: "Prevent subplot label overlapping" },
        { code: "plt.savefig('output.png', dpi=300, bbox_inches='tight')", desc: "Export high-resolution figure" }
      ]
    }
  ];

  container.innerHTML = CHEATSHEETS.map(cs => `
    <div class="cheatsheet-card">
      <div class="cheatsheet-header">
        <i data-lucide="bookmark" class="text-cyan"></i>
        <span>${cs.category}</span>
      </div>
      <div class="cheatsheet-snippets">
        ${cs.snippets.map(s => `
          <div class="snippet-row">
            <div>
              <div class="snippet-code"><code>${s.code}</code></div>
              <div class="snippet-desc">${s.desc}</div>
            </div>
            <button class="btn-copy-snippet" data-copy="${s.code}" title="Copy snippet">
              <i data-lucide="copy" style="width: 13px; height: 13px;"></i>
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.btn-copy-snippet').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.dataset.copy;
      navigator.clipboard.writeText(code).then(() => {
        showToast("Snippet copied!");
      });
    });
  });

  lucide.createIcons();
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
    experiments,
    modules: modules.map(m => {
      const copy = { ...m };
      delete copy.pdfDataUrl;
      return copy;
    })
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
        if (parsed.modules && Array.isArray(parsed.modules)) {
          modules = parsed.modules;
          saveModules();
          renderModules();
        }
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
  if (confirm("Reset all experiments and modules to official Mohan Babu University presets? (Custom experiments will be replaced)")) {
    experiments = JSON.parse(JSON.stringify(INITIAL_EXPERIMENTS));
    profile = { ...INITIAL_PROFILE };
    resetModulesToDefaults();
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
  initThemeMode();
  renderProfile();
  renderExperimentsGrid();
  renderModules();

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

      // Direct Launch Lab button clicked
      const launchBtn = e.target.closest('[data-action="launch"]');
      if (launchBtn) {
        const expId = launchBtn.dataset.expId;
        const letter = launchBtn.dataset.firstLetter || 'A';
        switchView('workspace', expId, letter);
        return;
      }

      // Overview button clicked or preview video banner clicked: open View 2
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

  // Workspace Plot & Diagnostic View Toggles
  const showChartBtn = document.getElementById('showInteractiveChartBtn');
  const showPlotBtn = document.getElementById('showStaticPlotBtn');
  const showVideoBtn = document.getElementById('showVideoLectureBtn');
  const chartContainer = document.getElementById('interactiveChartContainer');
  const staticContainer = document.getElementById('staticPlotContainer');
  const videoContainer = document.getElementById('videoLectureContainer');

  function setDiagnosticMode(mode) {
    if (showChartBtn) showChartBtn.classList.toggle('active', mode === 'chart');
    if (showPlotBtn) showPlotBtn.classList.toggle('active', mode === 'plot');
    if (showVideoBtn) showVideoBtn.classList.toggle('active', mode === 'video');

    if (chartContainer) chartContainer.style.display = (mode === 'chart') ? 'flex' : 'none';
    if (staticContainer) staticContainer.style.display = (mode === 'plot') ? 'block' : 'none';
    if (videoContainer) videoContainer.style.display = (mode === 'video') ? 'block' : 'none';
  }

  showChartBtn?.addEventListener('click', () => setDiagnosticMode('chart'));
  showPlotBtn?.addEventListener('click', () => setDiagnosticMode('plot'));
  showVideoBtn?.addEventListener('click', () => setDiagnosticMode('video'));

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

  // ==========================================
  // AVATAR UPLOADS (DIRECT & IN MODALS)
  // ==========================================
  document.getElementById('avatarFileInput')?.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handleAvatarFileUpload(e.target.files[0]);
      e.target.value = '';
    }
  });

  document.getElementById('portfolioAvatarUploadInput')?.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handleAvatarFileUpload(e.target.files[0]);
      e.target.value = '';
    }
  });

  document.getElementById('formProfileAvatarFileInput')?.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handleAvatarFileUpload(e.target.files[0]);
      const avatarPrev = document.getElementById('formAvatarPreviewImg');
      if (avatarPrev) avatarPrev.src = profile.avatarUrl;
      e.target.value = '';
    }
  });

  // ==========================================
  // VIEW MORE & PORTFOLIO MODAL
  // ==========================================
  document.getElementById('openProfilePortfolioBtn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    openPortfolioModal();
  });

  document.getElementById('closeProfilePortfolioModalBtn')?.addEventListener('click', closePortfolioModal);
  document.getElementById('closePortfolioModalBottomBtn')?.addEventListener('click', closePortfolioModal);
  
  document.getElementById('editFromPortfolioBtn')?.addEventListener('click', () => {
    closePortfolioModal();
    openProfileModal();
  });

  document.getElementById('copyGithubLinkBtn')?.addEventListener('click', () => {
    navigator.clipboard.writeText(profile.githubUrl || 'https://github.com/pradyumna-devi').then(() => {
      showToast("GitHub URL copied to clipboard!");
    });
  });

  document.getElementById('copyLinkedinLinkBtn')?.addEventListener('click', () => {
    navigator.clipboard.writeText(profile.linkedinUrl || 'https://linkedin.com/in/pradyumna-devi').then(() => {
      showToast("LinkedIn URL copied to clipboard!");
    });
  });

  // ==========================================
  // RESUME VIEWER & DOWNLOAD
  // ==========================================
  document.getElementById('openResumeViewerBtn')?.addEventListener('click', openResumeViewerModal);
  document.getElementById('closeResumeViewerModalBtn')?.addEventListener('click', closeResumeViewerModal);
  document.getElementById('downloadResumeBtn')?.addEventListener('click', downloadAcademicResume);
  document.getElementById('downloadResumeFromViewerBtn')?.addEventListener('click', downloadAcademicResume);
  document.getElementById('printResumeBtn')?.addEventListener('click', () => window.print());

  document.getElementById('uploadPortfolioResumeInput')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      profile.resumeName = file.name;
      const reader = new FileReader();
      reader.onload = (evt) => {
        profile.customResumeDataUrl = evt.target.result;
        profile.userModified = true;
        saveProfile();
        renderProfile();
        showToast(`Resume updated: ${file.name}`);
      };
      reader.readAsDataURL(file);
      e.target.value = '';
    }
  });

  document.getElementById('formProfileResumeFileInput')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      profile.resumeName = file.name;
      const nameInput = document.getElementById('formProfileResumeName');
      if (nameInput) nameInput.value = file.name;
      const reader = new FileReader();
      reader.onload = (evt) => {
        profile.customResumeDataUrl = evt.target.result;
      };
      reader.readAsDataURL(file);
      showToast(`Attached ${file.name}`);
    }
  });

  // ==========================================
  // HOMEPAGE MAIN TABS (MODULES | LAB EXPERIMENTS | TOOLS)
  // ==========================================
  document.getElementById('mainTabModules')?.addEventListener('click', () => switchMainTab('modules'));
  document.getElementById('mainTabExperiments')?.addEventListener('click', () => switchMainTab('experiments'));
  document.getElementById('mainTabTools')?.addEventListener('click', () => switchMainTab('tools'));

  // ==========================================
  // INTERACTIVE CODE EDITOR CONTROLS & SHORTCUTS
  // ==========================================
  const codeEditorEl = document.getElementById('workspaceCodeEditor');
  const gutterEl = document.getElementById('editorGutter');

  if (codeEditorEl) {
    codeEditorEl.addEventListener('input', updateCodeEditorGutter);
    
    // Sync gutter scroll with editor textarea
    codeEditorEl.addEventListener('scroll', () => {
      if (gutterEl) gutterEl.scrollTop = codeEditorEl.scrollTop;
    });

    // Handle Tab key and Shift+Enter
    codeEditorEl.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = codeEditorEl.selectionStart;
        const end = codeEditorEl.selectionEnd;
        codeEditorEl.value = codeEditorEl.value.substring(0, start) + '    ' + codeEditorEl.value.substring(end);
        codeEditorEl.selectionStart = codeEditorEl.selectionEnd = start + 4;
        updateCodeEditorGutter();
      } else if (e.key === 'Enter' && e.shiftKey) {
        e.preventDefault();
        executeVirtualKernel();
      }
    });
  }

  document.getElementById('resetCodeBtn')?.addEventListener('click', resetWorkspaceCode);
  document.getElementById('downloadCodeBtn')?.addEventListener('click', downloadWorkspaceCode);

  document.getElementById('fontDecreaseBtn')?.addEventListener('click', () => {
    if (editorFontSize > 10) {
      editorFontSize -= 1;
      if (codeEditorEl) codeEditorEl.style.fontSize = `${editorFontSize}px`;
      if (gutterEl) gutterEl.style.fontSize = `${editorFontSize}px`;
    }
  });

  document.getElementById('fontIncreaseBtn')?.addEventListener('click', () => {
    if (editorFontSize < 18) {
      editorFontSize += 1;
      if (codeEditorEl) codeEditorEl.style.fontSize = `${editorFontSize}px`;
      if (gutterEl) gutterEl.style.fontSize = `${editorFontSize}px`;
    }
  });

  // ==========================================
  // DATA SCIENCE TOOLS SUITE EVENT LISTENERS
  // ==========================================
  // Tool Sub-tabs switcher
  document.querySelectorAll('.tool-subtab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tool-subtab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const toolName = btn.dataset.tool;
      currentActiveTool = toolName;

      const panels = {
        scratchpad: document.getElementById('toolPanelScratchpad'),
        dataset: document.getElementById('toolPanelDataset'),
        metrics: document.getElementById('toolPanelMetrics'),
        cheatsheet: document.getElementById('toolPanelCheatsheet')
      };

      Object.keys(panels).forEach(k => {
        if (panels[k]) {
          panels[k].style.display = (k === toolName) ? 'block' : 'none';
        }
      });

      if (toolName === 'dataset') initDatasetTool();
      if (toolName === 'metrics') initMetricsCalculatorTool();
      if (toolName === 'cheatsheet') renderCheatsheets();
    });
  });

  // Scratchpad Run & Clear & Templates
  document.getElementById('runScratchpadBtn')?.addEventListener('click', () => {
    const code = document.getElementById('scratchpadEditor')?.value || '';
    const out = document.getElementById('scratchpadOutput');
    if (!out) return;

    out.textContent = ">>> Sending snippet to virtual Python REPL...\n>>> Interpreting abstract syntax tree...";
    setTimeout(() => {
      let printed = [];
      const regex = /print\s*\(\s*(?:f?["'](.*?)["']|(.*?))\s*\)/g;
      let m;
      while ((m = regex.exec(code)) !== null) {
        printed.push(m[1] || m[2] || '');
      }

      let res = `[REPL Output - Python 3.11 Kernel]\nTimestamp: ${new Date().toLocaleTimeString()}\n`;
      if (printed.length > 0) {
        res += printed.map(p => `>>> ${p}`).join('\n');
      } else {
        res += `>>> Script executed without uncaught exceptions.\n>>> Return code: 0 | CPU cycles: 12ms`;
      }
      out.textContent = res;
      showToast("REPL script executed!");
    }, 600);
  });

  document.getElementById('clearScratchpadOutputBtn')?.addEventListener('click', () => {
    const out = document.getElementById('scratchpadOutput');
    if (out) out.textContent = "[Console cleared. Kernel ready for next instruction]";
  });

  document.getElementById('scratchpadTemplateSelect')?.addEventListener('change', (e) => {
    const key = e.target.value;
    const editor = document.getElementById('scratchpadEditor');
    if (editor && SCRATCHPAD_TEMPLATES[key]) {
      editor.value = SCRATCHPAD_TEMPLATES[key];
    }
  });

  // Dataset selector
  document.getElementById('datasetSelector')?.addEventListener('change', (e) => {
    loadDatasetView(e.target.value);
  });

  // Custom CSV file upload
  document.getElementById('customCsvUploadInput')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target.result;
      const lines = text.trim().split('\n');
      if (lines.length > 0) {
        const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));
        const rows = lines.slice(1, 11).map(line => line.split(',').map(c => c.trim().replace(/^["']|["']$/g, '')));
        
        SAMPLE_DATASETS['custom'] = {
          name: file.name,
          rows: lines.length - 1,
          cols: headers.length,
          columns: headers,
          data: rows
        };

        const selector = document.getElementById('datasetSelector');
        if (selector) {
          let opt = selector.querySelector('option[value="custom"]');
          if (!opt) {
            opt = document.createElement('option');
            opt.value = 'custom';
            selector.appendChild(opt);
          }
          opt.textContent = `📁 ${file.name} (${lines.length - 1} rows)`;
          opt.selected = true;
        }

        loadDatasetView('custom');
        showToast(`Loaded ${file.name} successfully!`);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  });

  // Metric Calculator inputs
  ['calcTP', 'calcFP', 'calcFN', 'calcTN'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', calculateConfusionMatrix);
  });

  document.getElementById('evaluateAdfBtn')?.addEventListener('click', evaluateAdfStationarity);

  // Profile modal submission
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
    
    // Extra portfolio fields
    profile.githubUrl = document.getElementById('formProfileGithub')?.value || profile.githubUrl;
    profile.linkedinUrl = document.getElementById('formProfileLinkedin')?.value || profile.linkedinUrl;
    profile.portfolioUrl = document.getElementById('formProfilePortfolio')?.value || profile.portfolioUrl;
    profile.email = document.getElementById('formProfileEmail')?.value || profile.email;
    profile.bio = document.getElementById('formProfileBio')?.value || profile.bio;
    profile.resumeName = document.getElementById('formProfileResumeName')?.value || profile.resumeName;
    profile.userModified = true;

    saveProfile();
    renderProfile();
    closeProfileModal();
    showToast("Profile and portfolio details updated!");
  });

  // ==========================================
  // MODULES CRUD & PDF ATTACHMENTS LISTENERS
  // ==========================================
  document.getElementById('openAddModuleModalBtn')?.addEventListener('click', () => openModuleModal());
  document.getElementById('headerAddModuleBtn')?.addEventListener('click', () => openModuleModal());
  document.getElementById('resetModulesBtn')?.addEventListener('click', resetModulesToDefaults);
  document.getElementById('closeModuleFormModalBtn')?.addEventListener('click', closeModuleModal);
  document.getElementById('cancelModuleFormBtn')?.addEventListener('click', closeModuleModal);
  document.getElementById('moduleForm')?.addEventListener('submit', handleModuleFormSubmit);

  // PDF Dropzone click & drag
  const pdfDropzone = document.getElementById('modulePdfDropzone');
  const pdfFileInput = document.getElementById('formModulePdfFileInput');
  const triggerBrowseBtn = document.getElementById('triggerBrowsePdfBtn');

  triggerBrowseBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    pdfFileInput?.click();
  });

  pdfDropzone?.addEventListener('click', () => {
    pdfFileInput?.click();
  });

  pdfFileInput?.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFormPdfSelect(e.target.files[0]);
    }
  });

  if (pdfDropzone) {
    pdfDropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      pdfDropzone.classList.add('dragover');
    });
    pdfDropzone.addEventListener('dragleave', () => {
      pdfDropzone.classList.remove('dragover');
    });
    pdfDropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      pdfDropzone.classList.remove('dragover');
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFormPdfSelect(e.dataTransfer.files[0]);
      }
    });
  }

  // Attached PDF action buttons in modal
  document.getElementById('removeFormPdfBtn')?.addEventListener('click', () => {
    currentFormPdfState = { isRemoved: true };
    document.getElementById('attachedPdfInfoCard').style.display = 'none';
    if (pdfDropzone) pdfDropzone.style.display = 'block';
    if (pdfFileInput) pdfFileInput.value = '';
    const statusTag = document.getElementById('formPdfStatusTag');
    if (statusTag) statusTag.textContent = 'PDF removed';
  });

  document.getElementById('previewFormPdfBtn')?.addEventListener('click', async () => {
    if (currentFormPdfState?.dataUrl) {
      openPdfViewerModal(null, currentFormPdfState.dataUrl);
    } else if (currentFormPdfState?.isExisting && currentFormPdfState?.moduleId) {
      openPdfViewerModal(currentFormPdfState.moduleId);
    } else {
      showToast('No PDF available to preview', 'info');
    }
  });

  // Direct card PDF upload handler
  document.getElementById('directCardPdfUploadInput')?.addEventListener('change', async (e) => {
    if (e.target.files && e.target.files[0] && pendingDirectUploadModuleId) {
      const file = e.target.files[0];
      const modId = pendingDirectUploadModuleId;
      const reader = new FileReader();
      reader.onload = async (evt) => {
        const dataUrl = evt.target.result;
        const pdfData = {
          name: file.name,
          size: file.size,
          sizeFormatted: formatFileSize(file.size),
          type: file.type || 'application/pdf',
          dataUrl: dataUrl,
          uploadDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };

        await storeModulePdf(modId, pdfData);

        const modIdx = modules.findIndex(m => m.id === modId);
        if (modIdx !== -1) {
          modules[modIdx].hasPdf = true;
          modules[modIdx].pdfFileName = pdfData.name;
          modules[modIdx].pdfFileSize = pdfData.sizeFormatted;
          modules[modIdx].pdfUploadDate = pdfData.uploadDate;
          if (dataUrl.length < 150000) {
            modules[modIdx].pdfDataUrl = dataUrl;
          }
          saveModules();
          renderModules();
          showToast(`Syllabus PDF for ${modules[modIdx].code} uploaded & saved!`);
        }
      };
      reader.readAsDataURL(file);
      e.target.value = '';
      pendingDirectUploadModuleId = null;
    }
  });

  // PDF Viewer Modal Close Button
  document.getElementById('closeModulePdfViewerModalBtn')?.addEventListener('click', closePdfViewerModal);

  // Export / Import / Reset
  document.getElementById('exportDataBtn')?.addEventListener('click', exportLaboratoryJson);
  document.getElementById('importJsonFileInput')?.addEventListener('change', handleImportJsonFile);
  document.getElementById('resetDefaultsBtn')?.addEventListener('click', resetToDefaults);

  lucide.createIcons();
});
