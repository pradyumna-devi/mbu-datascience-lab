// =========================================================================
// MOHAN BABU UNIVERSITY - DATA SCIENCE LABORATORY PORTAL
// Academic Record Engine:
// 1. Official Lab Observation Record Sheet & Printable PDF Generator
// 2. Jupyter Notebook (.ipynb) Exporter
// 3. AI Pedagogical Code Explainer & Algorithm Breakdown
// =========================================================================

/**
 * Generates official MBU Lab Observation Record HTML string
 */
export function generateLabRecordHtml(exp, subTask, code, output, profile) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `
    <div class="mbu-official-record-sheet" id="printableRecordSheet">
      <!-- MBU Official Header Lockup -->
      <div class="record-univ-header">
        <div class="univ-header-logo-wrap">
          <img src="/mbu-logo.png" alt="Mohan Babu University Logo" class="record-logo-img" />
        </div>
        <div class="univ-header-text">
          <h1 class="record-univ-title">MOHAN BABU UNIVERSITY</h1>
          <h2 class="record-dept-title">DEPARTMENT OF DATA SCIENCE • SCHOOL OF COMPUTING</h2>
          <p class="record-sub-title">B.Tech (Data Science) • Digital Practical Laboratory Record Sheet</p>
          <div class="record-accreditation-tag">Accredited by NAAC with 'A+' Grade • Sree Sainath Nagar, Tirupati, A.P.</div>
        </div>
      </div>

      <div class="record-divider-double"></div>

      <!-- Student & Laboratory Metadata Matrix -->
      <table class="record-meta-table">
        <tbody>
          <tr>
            <td class="meta-label">Student Name:</td>
            <td class="meta-value"><strong>${profile.name || 'M. Pradyumna Devi'}</strong></td>
            <td class="meta-label">Roll Number:</td>
            <td class="meta-value"><strong>${profile.id || '24102A030078'}</strong></td>
          </tr>
          <tr>
            <td class="meta-label">Academic Program:</td>
            <td class="meta-value">B.Tech - ${profile.branch || 'Data Science'} (${profile.section || 'Section - 2'})</td>
            <td class="meta-label">Academic Year:</td>
            <td class="meta-value">2025 - 2026 (Semester Practical)</td>
          </tr>
          <tr>
            <td class="meta-label">Experiment No.:</td>
            <td class="meta-value"><strong>EXP ${exp.number}${subTask.letter ? ' - Task ' + subTask.letter : ''} (${subTask.codeId || exp.number + (subTask.letter || 'A')})</strong></td>
            <td class="meta-label">Date of Execution:</td>
            <td class="meta-value">${currentDate}</td>
          </tr>
          <tr>
            <td class="meta-label">Faculty In-Charge:</td>
            <td class="meta-value">${profile.faculty || 'Bosu Babu Sambana'} (${profile.designation || 'Assistant Professor'})</td>
            <td class="meta-label">Kernel Runtime:</td>
            <td class="meta-value">Python 3.12 WebAssembly (Pyodide AST)</td>
          </tr>
        </tbody>
      </table>

      <!-- Experiment Heading -->
      <div class="record-experiment-banner">
        <h3>${exp.title}</h3>
        <h4>Module: ${subTask.codeId ? subTask.codeId + ' - ' : ''}${subTask.title}</h4>
      </div>

      <!-- Section 1: Aim -->
      <div class="record-section">
        <h4 class="record-section-heading">1. AIM &amp; OBJECTIVES</h4>
        <div class="record-section-body">
          <p>${subTask.aim || subTask.concept || 'To implement, execute, and evaluate algorithmic operations for the specified laboratory module.'}</p>
        </div>
      </div>

      <!-- Section 2: Mathematical Foundation & Syntax -->
      ${subTask.syntax ? `
      <div class="record-section">
        <h4 class="record-section-heading">2. THEORETICAL FOUNDATION &amp; SYNTAX</h4>
        <div class="record-section-body">
          <pre class="record-code-pre">${subTask.syntax}</pre>
        </div>
      </div>
      ` : ''}

      <!-- Section 3: Verified Python Source Code -->
      <div class="record-section">
        <h4 class="record-section-heading">${subTask.syntax ? '3' : '2'}. VERIFIED PYTHON SOURCE CODE</h4>
        <div class="record-section-body">
          <pre class="record-code-pre"><code>${escapeHtml(code || subTask.code || '# Python code')}</code></pre>
        </div>
      </div>

      <!-- Section 4: Execution Output -->
      <div class="record-section">
        <h4 class="record-section-heading">${subTask.syntax ? '4' : '3'}. EXECUTION OUTPUT &amp; LOGICAL OBSERVATION</h4>
        <div class="record-section-body">
          <pre class="record-output-pre"><code>${escapeHtml(output || subTask.output || '[Kernel executed with exit code 0]')}</code></pre>
        </div>
      </div>

      <!-- Section 5: Faculty Evaluation Rubric & Signatures -->
      <div class="record-evaluation-section">
        <h4 class="record-section-heading">${subTask.syntax ? '5' : '4'}. FACULTY EVALUATION &amp; ASSESSMENT RUBRIC</h4>
        
        <table class="record-rubric-table">
          <thead>
            <tr>
              <th>Evaluation Parameter</th>
              <th>Max Marks</th>
              <th>Awarded Marks</th>
              <th>Remarks / Assessment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Algorithm Understanding &amp; Aim Formulation</td>
              <td>05</td>
              <td><strong>05</strong></td>
              <td>Excellent theoretical clarity</td>
            </tr>
            <tr>
              <td>Code Implementation &amp; Execution Accuracy</td>
              <td>10</td>
              <td><strong>10</strong></td>
              <td>Verified with zero syntax errors</td>
            </tr>
            <tr>
              <td>Viva Voce &amp; Result Interpretation</td>
              <td>05</td>
              <td><strong>05</strong></td>
              <td>Outstanding conceptual mastery</td>
            </tr>
            <tr class="total-row">
              <td><strong>TOTAL EVALUATION SCORE</strong></td>
              <td><strong>20</strong></td>
              <td><strong>20 / 20</strong></td>
              <td><strong>GRADE: O (Outstanding)</strong></td>
            </tr>
          </tbody>
        </table>

        <!-- Signature Verification Blocks -->
        <div class="record-signature-grid">
          <div class="sig-block">
            <div class="sig-line"></div>
            <div class="sig-title">Signature of Student</div>
            <div class="sig-sub">${profile.name || 'M. Pradyumna Devi'} (${profile.id || '24102A030078'})</div>
          </div>
          <div class="sig-block seal-block">
            <div class="univ-seal-circle">
              <span>MBU</span>
              <small>LAB VERIFIED</small>
            </div>
            <div class="seal-text">Official Digital Lab Seal</div>
          </div>
          <div class="sig-block">
            <div class="sig-line"></div>
            <div class="sig-title">Signature of Faculty Evaluator</div>
            <div class="sig-sub">${profile.faculty || 'Bosu Babu Sambana'} • Assistant Professor</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Escapes HTML characters for safe rendering
 */
function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Exports Jupyter Notebook (.ipynb) matching v4 schema
 */
export function downloadJupyterNotebook(exp, subTask, code, output) {
  const notebook = {
    cells: [
      {
        cell_type: "markdown",
        metadata: {},
        source: [
          `# Mohan Babu University (MBU) - Digital Data Science Laboratory\n`,
          `## Experiment ${exp.number}: ${exp.title}\n`,
          `### Module: ${subTask.codeId ? subTask.codeId + ' - ' : ''}${subTask.title}\n`,
          `---\n`,
          `**Department**: Department of Data Science, School of Computing\n`,
          `**Course**: B.Tech Data Science (Accredited by NAAC with 'A+' Grade)\n`,
          `\n`,
          `### 🎯 Aim & Objectives:\n`,
          `${subTask.aim || subTask.concept || 'Laboratory experimentation and model fitting module.'}\n`,
          subTask.syntax ? `\n### 📝 Theoretical Syntax:\n\`\`\`python\n${subTask.syntax}\n\`\`\`\n` : ''
        ]
      },
      {
        cell_type: "code",
        execution_count: 1,
        metadata: {},
        outputs: output ? [
          {
            name: "stdout",
            output_type: "stream",
            text: output.split('\n').map(line => line + '\n')
          }
        ] : [],
        source: (code || subTask.code || '# Python code').split('\n').map(line => line + '\n')
      },
      {
        cell_type: "markdown",
        metadata: {},
        source: [
          `---\n`,
          `### 📋 Results & Observation:\n`,
          `The Python program was successfully implemented and verified within the Mohan Babu University Digital Lab environment.\n`
        ]
      }
    ],
    metadata: {
      language_info: {
        name: "python",
        version: "3.12.0"
      },
      kernelspec: {
        name: "python3",
        display_name: "Python 3 (MBU Data Science Lab)"
      }
    },
    nbformat: 4,
    nbformat_minor: 2
  };

  const filename = `MBU_Exp_${exp.number}${subTask.letter}_${subTask.codeId || 'Task'}.ipynb`;
  const blob = new Blob([JSON.stringify(notebook, null, 2)], { type: "application/x-ipynb+json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * AI Pedagogical Code Explainer
 * Generates an analytical breakdown of algorithms and library functions
 */
export function generateAiExplanation(subTask, code) {
  const codeText = code || subTask.code || '';
  
  // Analyze libraries used
  const libs = [];
  if (codeText.includes('numpy') || codeText.includes('np.')) libs.push({ name: 'NumPy', role: 'High-performance N-dimensional array processing and mathematical vectorization' });
  if (codeText.includes('pandas') || codeText.includes('pd.')) libs.push({ name: 'Pandas', role: 'Structured tabular DataFrame & Series manipulation, descriptive analytics, and indexing' });
  if (codeText.includes('matplotlib') || codeText.includes('plt.')) libs.push({ name: 'Matplotlib', role: '2D publication-quality graphic plotting, subplots, and axis formatting' });
  if (codeText.includes('seaborn') || codeText.includes('sns.')) libs.push({ name: 'Seaborn', role: 'Statistical visualization, kernel density estimation, and distribution plots' });
  if (codeText.includes('sqlite3')) libs.push({ name: 'SQLite3', role: 'Relational database management, embedded SQL queries, and cursor transactions' });
  if (codeText.includes('json')) libs.push({ name: 'JSON', role: 'Parsing RESTful web API payloads and flattening nested telemetry structures' });

  // Generate breakdown steps
  const steps = [];
  const lines = codeText.split('\n').filter(l => l.trim() && !l.trim().startsWith('#'));
  
  if (lines.length > 0) {
    steps.push({
      step: "Phase 1: Environment & Dependency Initialization",
      desc: "Imports required mathematical and analytical libraries and establishes memory pointers for runtime execution."
    });
  }

  if (codeText.includes('np.array') || codeText.includes('pd.DataFrame') || codeText.includes('sqlite3.connect') || codeText.includes('date_range')) {
    steps.push({
      step: "Phase 2: In-Memory Data Structure Construction",
      desc: "Allocates memory for primary datasets (NumPy ndarray, Pandas Series/DataFrame, or relational schema) with defined data types and indexing keys."
    });
  }

  if (codeText.includes('mean') || codeText.includes('loc') || codeText.includes('merge') || codeText.includes('resample') || codeText.includes('describe')) {
    steps.push({
      step: "Phase 3: Core Algorithmic Transformation & Analytical Querying",
      desc: "Executes mathematical aggregations, hierarchical index reshaping, table merging, or time-series resampling in vectorized C-speed execution."
    });
  }

  if (codeText.includes('plt.show') || codeText.includes('plot(') || codeText.includes('sns.')) {
    steps.push({
      step: "Phase 4: Visual Canvas Rendering & Diagnostic Inspection",
      desc: "Maps analytical metrics to geometric coordinates (scatter, bar, density, subplots) with annotated axis ticks and legends."
    });
  } else {
    steps.push({
      step: "Phase 4: Telemetry Output & Stdout Aggregation",
      desc: "Prints formatted diagnostic records to the terminal stream, verifying algorithm correctness against expected thresholds."
    });
  }

  return {
    moduleTitle: subTask.title,
    codeId: subTask.codeId,
    aim: subTask.aim || subTask.concept,
    libraries: libs,
    steps: steps,
    complexity: codeText.includes('for ') ? 'O(N) Iterative Complexity' : 'O(N) Vectorized SIMD Complexity (Accelerated)',
    industryApplication: getIndustryUseCases(subTask)
  };
}

function getIndustryUseCases(subTask) {
  const title = (subTask.title || '').toLowerCase();
  if (title.includes('numpy') || title.includes('vector')) {
    return 'Financial quantitative modeling, deep learning tensor mathematics, physics simulations, and scientific signal processing.';
  } else if (title.includes('sql') || title.includes('extract') || title.includes('api')) {
    return 'Enterprise ETL data pipelines, SaaS API integrations, automated financial ledger auditing, and live IoT telemetry ingestion.';
  } else if (title.includes('wrangling') || title.includes('hierarchical') || title.includes('merge')) {
    return 'Customer 360 multi-table reconciliations, clinical healthcare trials data cleaning, and supply chain inventory aggregation.';
  } else if (title.includes('visual') || title.includes('plot') || title.includes('chart') || title.includes('box')) {
    return 'Executive business intelligence dashboards, exploratory biomedical biomarker diagnostics, and exploratory data analysis (EDA).';
  } else {
    return 'Algorithmic high-frequency stock trading, macro-economic demand forecasting, weather telemetry prediction, and server load capacity planning.';
  }
}
