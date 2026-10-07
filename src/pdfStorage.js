// IndexedDB Storage Layer for MBU Data Science Laboratory Modules & Syllabus PDFs

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

/**
 * Generates an official, lightweight valid PDF Data URL for sample syllabus
 * Creates a valid PDF binary representation containing Mohan Babu University syllabus info
 */
export function generateSampleSyllabusPdfDataUrl(moduleCode, moduleTitle, category, hours, credits) {
  // Generates a valid PDF 1.4 document stream
  const contentText = `BT
/F1 18 Tf
50 740 Td
(MOHAN BABU UNIVERSITY - SCHOOL OF COMPUTING) Tj
0 -26 Td
/F1 14 Tf
(DEPARTMENT OF DATA SCIENCE - COURSE SYLLABUS) Tj
0 -24 Td
/F1 12 Tf
(Module Code: ${moduleCode} | Category: ${category}) Tj
0 -18 Td
(Course Title: ${moduleTitle}) Tj
0 -18 Td
(Academic Load: ${hours} | Credits: ${credits}) Tj
0 -30 Td
/F1 11 Tf
(SYLLABUS OUTLINE & LEARNING OUTCOMES:) Tj
0 -18 Td
(1. Theoretical Foundations & Mathematical Formulations) Tj
0 -16 Td
(2. Digital Laboratory Experiments & Implementation Workspaces) Tj
0 -16 Td
(3. Continuous Diagnostic Assessment & Model Performance Evaluation) Tj
0 -16 Td
(4. Final Laboratory Practical Examination & Comprehensive Viva) Tj
0 -36 Td
/F1 9 Tf
(Official Curriculum Approved By Department of Data Science, Mohan Babu University 2026-2027) Tj
ET`;

  const streamLen = contentText.length;
  const pdfString = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>
endobj
5 0 obj
<< /Length ${streamLen} >>
stream
${contentText}
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000228 00000 n 
0000000305 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
${400 + streamLen}
%%EOF`;

  return `data:application/pdf;base64,${btoa(pdfString)}`;
}
