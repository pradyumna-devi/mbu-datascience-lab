import { RESUME_PDF_BASE64 } from './assets/resumePdfBase64.js';
// IndexedDB Storage Layer for MBU Data Science Laboratory Modules & Syllabus PDFs
import { MODULES_LEARNING_MATERIAL } from './learningMaterialData.js';

const DB_NAME = 'mbu_datascience_modules_db';
const DB_VERSION = 1;
const PDF_STORE = 'module_syllabus_pdfs';

/**
 * Initializes and returns the IndexedDB instance
 */
export function openPdfDatabase() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      resolve(null);
      return;
    }

    try {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(PDF_STORE)) {
          db.createObjectStore(PDF_STORE, { keyPath: 'id' });
        }
      };

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        console.warn('IndexedDB failed to open:', event.target.error);
        resolve(null);
      };
    } catch (err) {
      console.warn('IndexedDB exception:', err);
      resolve(null);
    }
  });
}

/**
 * Stores a PDF file (as Data URL / Base64) for a specific module ID
 */
export async function storeModulePdf(moduleId, pdfData) {
  const db = await openPdfDatabase();
  if (!db) {
    // Fallback: try sessionStorage/localStorage with size safety
    try {
      if (pdfData.dataUrl && pdfData.dataUrl.length < 2000000) {
        localStorage.setItem(`mbu_pdf_fallback_${moduleId}`, JSON.stringify(pdfData));
        return true;
      }
    } catch (e) {
      console.warn('Fallback storage also failed:', e);
    }
    return false;
  }

  return new Promise((resolve) => {
    try {
      const transaction = db.transaction(PDF_STORE, 'readwrite');
      const store = transaction.objectStore(PDF_STORE);
      const record = {
        id: moduleId,
        name: pdfData.name || `${moduleId}-syllabus.pdf`,
        size: pdfData.size || 0,
        sizeFormatted: pdfData.sizeFormatted || formatFileSize(pdfData.size || 0),
        type: pdfData.type || 'application/pdf',
        dataUrl: pdfData.dataUrl,
        uploadDate: pdfData.uploadDate || new Date().toISOString()
      };

      const request = store.put(record);
      request.onsuccess = () => resolve(true);
      request.onerror = (e) => {
        console.error('Error saving PDF in IndexedDB:', e.target.error);
        resolve(false);
      };
    } catch (err) {
      console.error('Transaction error saving PDF:', err);
      resolve(false);
    }
  });
}

/**
 * Retrieves a stored PDF for a specific module ID
 */
export async function getModulePdf(moduleId) {
  const db = await openPdfDatabase();
  if (!db) {
    try {
      const fallback = localStorage.getItem(`mbu_pdf_fallback_${moduleId}`);
      if (fallback) return JSON.parse(fallback);
    } catch (e) {}
    return null;
  }

  return new Promise((resolve) => {
    try {
      const transaction = db.transaction(PDF_STORE, 'readonly');
      const store = transaction.objectStore(PDF_STORE);
      const request = store.get(moduleId);

      request.onsuccess = () => {
        resolve(request.result || null);
      };

      request.onerror = () => {
        resolve(null);
      };
    } catch (err) {
      console.error('Error retrieving PDF from IndexedDB:', err);
      resolve(null);
    }
  });
}

/**
 * Deletes a stored PDF for a specific module ID
 */
export async function deleteModulePdf(moduleId) {
  try {
    localStorage.removeItem(`mbu_pdf_fallback_${moduleId}`);
  } catch (e) {}

  const db = await openPdfDatabase();
  if (!db) return true;

  return new Promise((resolve) => {
    try {
      const transaction = db.transaction(PDF_STORE, 'readwrite');
      const store = transaction.objectStore(PDF_STORE);
      const request = store.delete(moduleId);

      request.onsuccess = () => resolve(true);
      request.onerror = () => resolve(false);
    } catch (err) {
      resolve(false);
    }
  });
}

/**
 * Formats byte size into human-readable string (KB, MB)
 */
export function formatFileSize(bytes) {
  if (!bytes || isNaN(bytes)) return '0 KB';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function escapePdf(str) {
  if (!str) return '';
  return String(str)
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/[^\x20-\x7E\n\r\t]/g, ' ');
}

function getUtf8ByteLength(str) {
  if (typeof TextEncoder !== 'undefined') {
    return new TextEncoder().encode(str).length;
  }
  if (typeof Buffer !== 'undefined' && Buffer.byteLength) {
    return Buffer.byteLength(str, 'utf8');
  }
  return unescape(encodeURIComponent(str)).length;
}

function toBase64(str) {
  if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
    try {
      return window.btoa(unescape(encodeURIComponent(str)));
    } catch (e) {
      try {
        return window.btoa(str);
      } catch (err) {}
    }
  }
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'utf-8').toString('base64');
  }
  if (typeof TextEncoder !== 'undefined' && typeof btoa === 'function') {
    const bytes = new TextEncoder().encode(str);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
  return '';
}

function buildPdfDocument(pages) {
  let objects = [];
  objects.push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj');
  
  const pageCount = pages.length;
  const pageObjIds = pages.map((_, i) => `${3 + i * 2} 0 R`).join(' ');
  objects.push(`2 0 obj\n<< /Type /Pages /Kids [${pageObjIds}] /Count ${pageCount} >>\nendobj`);
  
  const fontBoldId = 3 + pageCount * 2;
  const fontRegId = fontBoldId + 1;
  const fontItalicId = fontRegId + 1;
  
  pages.forEach((pageContent, i) => {
    const pageId = 3 + i * 2;
    const contentId = pageId + 1;
    objects.push(`${pageId} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 ${fontBoldId} 0 R /F2 ${fontRegId} 0 R /F3 ${fontItalicId} 0 R >> >> /Contents ${contentId} 0 R >>\nendobj`);
    const streamLen = getUtf8ByteLength(pageContent);
    objects.push(`${contentId} 0 obj\n<< /Length ${streamLen} >>\nstream\n${pageContent}\nendstream\nendobj`);
  });
  
  objects.push(`${fontBoldId} 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj`);
  objects.push(`${fontRegId} 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj`);
  objects.push(`${fontItalicId} 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >>\nendobj`);
  
  let pdf = '%PDF-1.4\n';
  let offsets = [0];
  objects.forEach(obj => {
    offsets.push(pdf.length);
    pdf += obj + '\n';
  });
  
  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= objects.length; i++) {
    const off = String(offsets[i]).padStart(10, '0');
    pdf += `${off} 00000 n \n`;
  }
  
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return pdf;
}

/**
 * Generates an official, comprehensive 2-page syllabus PDF for Module 1 or Module 2
 * containing all curriculum topics, units, lab mappings, assessment rubrics & citations.
 */
export function generateModuleSyllabusPdfDataUrl(mod) {
  if (!mod) return null;
  const isMod1 = mod.id === 'mod-1' || String(mod.code).includes('101');
  const isMod2 = mod.id === 'mod-2' || String(mod.code).includes('102');
  const isMod3 = mod.id === 'mod-3' || String(mod.code).includes('103');
  const isMod4 = mod.id === 'mod-4' || String(mod.code).includes('104');

  // PAGE 1: Course Identity, Overview, Complete Topics & Units
  let p1Lines = [
    'BT',
    '/F1 15 Tf',
    '50 740 Td',
    '(MOHAN BABU UNIVERSITY - SCHOOL OF COMPUTING) Tj',
    '0 -18 Td',
    '/F1 11 Tf',
    '(DEPARTMENT OF DATA SCIENCE | OFFICIAL ACADEMIC SYLLABUS SPECIFICATION) Tj',
    '0 -24 Td',
    '/F1 12 Tf',
    `(${escapePdf(mod.code)}: ${escapePdf(mod.title)}) Tj`,
    '0 -16 Td',
    '/F2 9.5 Tf',
    `(Academic Program: B.Tech in Data Science | Credits: ${escapePdf(mod.credits || '4 Credits')} | Load: ${escapePdf(mod.hours || '14 Theory + 28 Lab Hours')}) Tj`,
    '0 -14 Td',
    '(Faculty Evaluator: S. Bosubabu, Assistant Professor | Candidate: M. Pradyumna Devi - 24102A030078) Tj',
    '0 -24 Td',
    '/F1 11 Tf',
    '(1. COURSE OVERVIEW & PEDAGOGICAL OBJECTIVES) Tj',
    '0 -15 Td',
    '/F2 8.5 Tf'
  ];

  const desc = mod.description || '';
  const descParts = desc.match(/.{1,88}(\s|$)/g) || [desc];
  descParts.forEach(part => {
    p1Lines.push(`(${escapePdf(part.trim())}) Tj`);
    p1Lines.push('0 -13 Td');
  });

  p1Lines.push('0 -10 Td');
  p1Lines.push('/F1 11 Tf');
  p1Lines.push('(2. CURRICULUM TOPICS & COMPETENCY BENCHMARKS) Tj');
  p1Lines.push('0 -15 Td');
  p1Lines.push('/F2 8.5 Tf');

  (mod.topics || []).forEach((topic, idx) => {
    p1Lines.push(`(${idx + 1}. ${escapePdf(topic)}) Tj`);
    p1Lines.push('0 -14 Td');
  });

  p1Lines.push('0 -10 Td');
  p1Lines.push('/F1 11 Tf');
  p1Lines.push('(3. SYLLABUS UNITS & THEORETICAL FRAMEWORK) Tj');
  p1Lines.push('0 -15 Td');
  p1Lines.push('/F2 8.5 Tf');

  (mod.syllabusUnits || []).forEach(unit => {
    p1Lines.push(`(- ${escapePdf(unit)}) Tj`);
    p1Lines.push('0 -13 Td');
  });

  p1Lines.push('0 -18 Td');
  p1Lines.push('/F3 8 Tf');
  p1Lines.push('(Department of Data Science Curriculum Document - Page 1 of 2 - Verified Official Syllabus) Tj');
  p1Lines.push('ET');

  // PAGE 2: Laboratory Mapping, Assessment Rubric, Textbooks & Approval
  let p2Lines = [
    'BT',
    '/F1 14 Tf',
    '50 740 Td',
    `(${escapePdf(mod.code)} - PRACTICAL LABORATORY WORKSPACE & ASSESSMENT RUBRIC) Tj`,
    '0 -20 Td',
    '/F1 11 Tf',
    '(4. APPLIED LABORATORY EXPERIMENT MAPPING) Tj',
    '0 -16 Td',
    '/F2 9 Tf'
  ];

  if (isMod1) {
    p2Lines.push('(Laboratory Experiment: Experiment 1 - Introduction to Data Science & Tabular Computing) Tj');
    p2Lines.push('0 -15 Td');
    p2Lines.push('(- Task 1A: NumPy Vector Arrays & Mathematical Computations - Vectorization, Broadcasting, Z-Scores) Tj');
    p2Lines.push('0 -14 Td');
    p2Lines.push('(- Task 1B: Pandas DataFrame Construction & Exploratory Inspection - Indexing, Slicing, Summary Stats) Tj');
    p2Lines.push('0 -14 Td');
    p2Lines.push('(- Computational Runtime: Python 3.12 WebAssembly Virtual Kernel with Pyodide) Tj');
  } else if (isMod2) {
    p2Lines.push('(Laboratory Experiment: Experiment 2 - Data Extraction, REST APIs & Web Scraping) Tj');
    p2Lines.push('0 -15 Td');
    p2Lines.push('(- Task 2A: Structured Data Extraction from SQLite Database with SQL Queries & Pandas Ingestion) Tj');
    p2Lines.push('0 -14 Td');
    p2Lines.push('(- Task 2B: RESTful JSON API Data Consumption, Bearer Authentication & Schema Normalization) Tj');
    p2Lines.push('0 -14 Td');
    p2Lines.push('(- Web Scraping: BeautifulSoup DOM tree navigation, robots.txt compliance & rate limiting) Tj');
  } else if (isMod3) {
    p2Lines.push('(Laboratory Experiment: Experiment 5 - Data Visualization with Matplotlib & Seaborn) Tj');
    p2Lines.push('0 -15 Td');
    p2Lines.push('(- Task 5A: Matplotlib API Primer - Subplots, Axes, Ticks, Labels, Arrow Annotations & Hi-Res PNG Export) Tj');
    p2Lines.push('0 -14 Td');
    p2Lines.push('(- Task 5B & 5C: Statistical Plotting with Pandas & Seaborn - Line, Bar, Histograms & KDE Density Curves) Tj');
    p2Lines.push('0 -14 Td');
    p2Lines.push('(- Task 5D & 5E: Bivariate Scatter Plots, Linear Regression & Multi-Panel Categorical FacetGrids) Tj');
    p2Lines.push('0 -14 Td');
    p2Lines.push('(- Modern Toolkits: Interactive Plotly Visualizations, Bokeh Dashboards, Altair & Geospatial Folium Maps) Tj');
  } else if (isMod4) {
    p2Lines.push('(Laboratory Experiment: Experiment 1 & 5 - Descriptive Statistics, Distributions & Modeling) Tj');
    p2Lines.push('0 -15 Td');
    p2Lines.push('(- Task 1B: Empirical Distribution Representation, Histogram Binning & Outlier Identification) Tj');
    p2Lines.push('0 -14 Td');
    p2Lines.push('(- Task 5C: Probability Mass Functions (PMF), Class Size Paradox & Cumulative Distribution Functions) Tj');
    p2Lines.push('0 -14 Td');
    p2Lines.push('(- Statistical Suite: Percentile Statistics, Random Number Sampling & Analytic Distribution Modeling) Tj');
    p2Lines.push('0 -14 Td');
    p2Lines.push('(- Computational Runtime: Python 3.12 WebAssembly Virtual Kernel with Pyodide & SciPy) Tj');
  } else {
    p2Lines.push(`(Applied Laboratory Domain: ${escapePdf(mod.category)} | Relevant Track: ${escapePdf(mod.relevantExpTitle || 'Digital Lab')}) Tj`);
    p2Lines.push('0 -15 Td');
    p2Lines.push('(- Applied Practical Workspace with Interactive Kernel Evaluation) Tj');
  }

  p2Lines.push('0 -22 Td');
  p2Lines.push('/F1 11 Tf');
  p2Lines.push('(5. EVALUATION SCHEME & CONTINUOUS ASSESSMENT RUBRIC) Tj');
  p2Lines.push('0 -16 Td');
  p2Lines.push('/F2 8.5 Tf');
  p2Lines.push('(Continuous Internal Evaluation - CIE: 40 Marks) Tj');
  p2Lines.push('0 -13 Td');
  p2Lines.push('(- Practical Laboratory Observation & Code Execution: 20 Marks) Tj');
  p2Lines.push('0 -13 Td');
  p2Lines.push('(- Weekly Lab Record Submission & Algorithm Complexity Defense: 10 Marks) Tj');
  p2Lines.push('0 -13 Td');
  p2Lines.push('(- Oral Viva Voce & Conceptual Defense Examination: 10 Marks) Tj');
  p2Lines.push('0 -15 Td');
  p2Lines.push('(Semester End Practical Examination - SEE: 60 Marks) Tj');
  p2Lines.push('0 -13 Td');
  p2Lines.push('(- Algorithm Formulation, Code Implementation & Execution: 40 Marks | Viva Voce: 20 Marks) Tj');

  p2Lines.push('0 -22 Td');
  p2Lines.push('/F1 11 Tf');
  p2Lines.push('(6. RECOMMENDED TEXTBOOKS & REFERENCE LITERATURE) Tj');
  p2Lines.push('0 -15 Td');
  p2Lines.push('/F2 8.5 Tf');
  if (isMod3) {
    p2Lines.push('(1. Claus O. Wilke, "Fundamentals of Data Visualization: A Primer on Making Informative Figures", O\'Reilly.) Tj');
    p2Lines.push('0 -13 Td');
    p2Lines.push('(2. Colin Ware, "Information Visualization: Perception for Design", 4th Ed., Morgan Kaufmann.) Tj');
    p2Lines.push('0 -13 Td');
    p2Lines.push('(3. Jake VanderPlas, "Python Data Science Handbook: Essential Tools for Working with Data", O\'Reilly.) Tj');
  } else if (isMod4) {
    p2Lines.push('(1. Allen B. Downey, "Think Stats: Exploratory Data Analysis in Python", 2nd Ed., O\'Reilly.) Tj');
    p2Lines.push('0 -13 Td');
    p2Lines.push('(2. Peter Bruce & Andrew Bruce, "Practical Statistics for Data Scientists: 50+ Essential Concepts", O\'Reilly.) Tj');
    p2Lines.push('0 -13 Td');
    p2Lines.push('(3. Larry Wasserman, "All of Statistics: A Concise Course in Statistical Inference", Springer.) Tj');
  } else {
    p2Lines.push('(1. Wes McKinney, "Python for Data Analysis: Data Wrangling with Pandas, NumPy, and Jupyter", 3rd Ed., O\'Reilly.) Tj');
    p2Lines.push('0 -13 Td');
    p2Lines.push('(2. Jake VanderPlas, "Python Data Science Handbook: Essential Tools for Working with Data", O\'Reilly.) Tj');
    p2Lines.push('0 -13 Td');
    p2Lines.push('(3. Joel Grus, "Data Science from Scratch: First Principles with Python", 2nd Ed., O\'Reilly.) Tj');
  }
  p2Lines.push('0 -24 Td');
  p2Lines.push('/F1 9.5 Tf');
  p2Lines.push('(APPROVAL & INSTITUTIONAL ACCREDITATION:) Tj');
  p2Lines.push('0 -14 Td');
  p2Lines.push('/F2 8.5 Tf');
  p2Lines.push('(Board of Studies in Data Science | School of Computing | Mohan Babu University, Tirupati, A.P.) Tj');
  p2Lines.push('0 -13 Td');
  p2Lines.push('(NAAC A+ Accredited Institution | Academic Session 2026-2027) Tj');
  p2Lines.push('ET');

function generateStudyPages(studyMaterial, mod) {
  if (!studyMaterial || !studyMaterial.topics || !studyMaterial.topics.length) return [];
  const pages = [];
  let currentPageLines = [];
  let currentY = 740;
  let pageNum = 3;

  function startNewPage() {
    currentPageLines = [
      'BT',
      '/F1 11 Tf',
      '50 740 Td',
      `(${escapePdf(mod.code)}: ${escapePdf(mod.title)} - SYLLABUS LEARNING MATERIAL) Tj`,
      '0 -15 Td',
      '/F3 8 Tf',
      `(Mohan Babu University | Department of Data Science | Academic Study Guide - Page ${pageNum}) Tj`,
      '0 -18 Td'
    ];
    currentY = 707;
    pageNum++;
  }

  function addLine(text, font = '/F2 8 Tf', step = 11.5) {
    if (currentY - step < 50) {
      currentPageLines.push('0 -12 Td', '/F3 7.5 Tf', '(Official Learning Guide Continued on next page...) Tj', 'ET');
      pages.push(currentPageLines.join('\n'));
      startNewPage();
    }
    currentPageLines.push(font);
    currentPageLines.push(`(${escapePdf(text)}) Tj`);
    currentPageLines.push(`0 -${step} Td`);
    currentY -= step;
  }

  startNewPage();

  studyMaterial.topics.forEach((t) => {
    // Topic header
    addLine(`--- TOPIC ${t.number}: ${t.title.toUpperCase()} ---`, '/F1 9.5 Tf', 15);
    addLine(`Unit: ${t.unit} | Practical Lab: ${t.labCorrelation || 'Experiment Mapped'}`, '/F3 7.5 Tf', 12);
    
    // Concept / Theory
    addLine('[THEORETICAL FOUNDATION & ACADEMIC CONCEPTS]', '/F1 8 Tf', 11);
    const conceptLines = (t.concept || '').split('\n');
    conceptLines.forEach(cLine => {
      const parts = cLine.match(/.{1,88}(\s|$)/g) || [cLine];
      parts.forEach(p => {
        if (p.trim()) addLine(p.trim(), '/F2 7.5 Tf', 10.5);
      });
    });

    // Practical Python Code
    if (t.codeExample) {
      addLine('[PRACTICAL PYTHON 3.12 IMPLEMENTATION]', '/F1 8 Tf', 11);
      const codeLines = t.codeExample.split('\n');
      codeLines.forEach(codeL => {
        const cParts = codeL.match(/.{1,85}(\s|$)/g) || [codeL];
        cParts.forEach(cp => {
          if (cp.trim()) addLine(`  ${cp.trim()}`, '/F2 7 Tf', 9.5);
        });
      });
    }

    // Key Takeaways
    if (Array.isArray(t.keyPoints) && t.keyPoints.length) {
      addLine('[KEY ACADEMIC TAKEAWAYS & EXAM POINTS]', '/F1 8 Tf', 11);
      t.keyPoints.forEach(kp => {
        const kpParts = kp.match(/.{1,85}(\s|$)/g) || [kp];
        kpParts.forEach((kpp, kIdx) => {
          addLine(kIdx === 0 ? `* ${kpp.trim()}` : `  ${kpp.trim()}`, '/F2 7.5 Tf', 10.5);
        });
      });
    }

    addLine('', '/F2 7 Tf', 8); // spacer
  });

  if (currentPageLines.length > 5) {
    currentPageLines.push('0 -12 Td', '/F3 7.5 Tf', '(End of Official Syllabus Learning Material - Mohan Babu University) Tj', 'ET');
    pages.push(currentPageLines.join('\n'));
  }

  return pages;
}

  const studyMaterial = MODULES_LEARNING_MATERIAL[mod.id] || Object.values(MODULES_LEARNING_MATERIAL).find(m => m.code === mod.code);
  const studyPages = generateStudyPages(studyMaterial, mod);

  const allPages = [p1Lines.join('\n'), p2Lines.join('\n'), ...studyPages];
  const pdfBinary = buildPdfDocument(allPages);
  return `data:application/pdf;base64,${toBase64(pdfBinary)}`;
}

/**
 * Backward compatibility wrapper for sample syllabus generation
 */
export function generateSampleSyllabusPdfDataUrl(moduleCode, moduleTitle, category, hours, credits) {
  return generateModuleSyllabusPdfDataUrl({
    code: moduleCode,
    title: moduleTitle,
    category: category,
    hours: hours,
    credits: credits,
    description: `Official Curriculum syllabus specification for ${moduleTitle} across ${category}.`,
    topics: [
      'Data Science computational architectures & analytical workflows',
      'Theoretical formulations and mathematical problem definitions',
      'Digital laboratory experiments & interactive kernel implementations',
      'Exploratory diagnostics, model validation & performance telemetry',
      'Data governance, ethical analytics, reproducibility & privacy standards'
    ],
    syllabusUnits: [
      'Unit I: Theoretical Foundations & Architecture',
      'Unit II: Computational Implementation & Algorithms',
      'Unit III: Laboratory Assessment & Evaluation'
    ]
  });
}

/**
 * Generates an authentic 1-page Academic & Technical Resume PDF for Mudimela Pradyumna Devi
 * matching the official resume layout.
 */
export function generateCandidateResumePdfDataUrl(profile = {}) {
  if (RESUME_PDF_BASE64) {
    return RESUME_PDF_BASE64;
  }
  const name = profile.name || "Mudimela Pradyumna Devi";
  const location = profile.location || "Nandyal";
  const email = profile.email || "mudimelapradyumnadevi@gmail.com";
  const phone = profile.phone || "9182361994";
  const youtube = "YouTube Channel";
  const linkedin = (profile.linkedinUrl || "linkedin.com/in/mudimela-pradyumna-devi").replace(/^https?:\/\/(www\.)?/, '');
  const github = (profile.githubUrl || "github.com/pradyumna-devi").replace(/^https?:\/\/(www\.)?/, '');

  let lines = [
    'BT',
    // Name Header
    '/F1 18 Tf',
    '180 740 Td',
    `(${escapePdf(name)}) Tj`,
    '0 -18 Td',
    // Contact Details Row 1
    '/F2 9 Tf',
    '-60 0 Td',
    `(${escapePdf(`${location} | ${email} | ${phone} | ${youtube}`)}) Tj`,
    '0 -14 Td',
    // Contact Details Row 2
    `(${escapePdf(`${linkedin} | ${github}`)}) Tj`,
    '0 -24 Td',

    // Section 1: Education
    '/F1 11.5 Tf',
    '-70 0 Td',
    '(Education) Tj',
    '0 -15 Td',
    '/F1 9 Tf',
    '(MOHAN BABU UNIVERSITY, B.Tech in Computer Science and Engineering (Data Science)) Tj',
    '/F2 8.5 Tf',
    '330 0 Td',
    '(Aug 2024 - Present) Tj',
    '-330 -13 Td',
    '(* CGPA: 9.76 / 10.0) Tj',
    '0 -12 Td',
    '(* Coursework: Data Structures and Algorithms (DSA), Object-Oriented Programming (OOP), Database) Tj',
    '0 -11 Td',
    '(  Management Systems (DBMS), Operating Systems, Software Engineering, Computer Networks) Tj',
    '0 -18 Td',

    // Section 2: Skills
    '/F1 11.5 Tf',
    '(Skills) Tj',
    '0 -14 Td',
    '/F2 8.5 Tf',
    '(* Programming Languages: C, C++, Java, Python) Tj',
    '0 -12 Td',
    '(* Core Concepts: Data Structures and Algorithms, Object-Oriented Programming, Problem Solving) Tj',
    '0 -12 Td',
    '(* Databases: MySQL (Basic)) Tj',
    '0 -12 Td',
    '(* Tools: Git, GitHub) Tj',
    '0 -18 Td',

    // Section 3: Projects
    '/F1 11.5 Tf',
    '(Projects) Tj',
    '0 -14 Td',
    '/F1 9 Tf',
    '(* Telegram Automation Bot using n8n) Tj',
    '0 -12 Td',
    '/F2 8.5 Tf',
    '(  - Built an automated Telegram bot using n8n to design event-driven workflows) Tj',
    '0 -12 Td',
    '(  - Implemented conditional logic to process and respond to user messages) Tj',
    '0 -18 Td',

    // Section 4: Activities & Community Engagement
    '/F1 11.5 Tf',
    '(Activities & Community Engagement) Tj',
    '0 -14 Td',
    '/F2 8.5 Tf',
    '(* Created and manage a YouTube channel focused on explaining Data Structures and Algorithms concepts) Tj',
    '0 -12 Td',
    '(* Shared DSA logic explanations through short videos) Tj',
    '0 -12 Td',
    '(* Built an early learner community) Tj',
    '0 -18 Td',

    // Section 5: Certifications
    '/F1 11.5 Tf',
    '(Certifications) Tj',
    '0 -14 Td',
    '/F2 8.5 Tf',
    '(* Microsoft Python Development Specialization - Microsoft) Tj',
    '0 -12 Td',
    '(* Google Data Analytics Specialization - Google) Tj',
    'ET'
  ];

  const pdfBinary = buildPdfDocument([lines.join('\n')]);
  return `data:application/pdf;base64,${toBase64(pdfBinary)}`;
}


