/**
 * Summary Display Logic
 * Handles loading and rendering of document summary, clauses, and risk flags
 */

// Initialize summary page on load
document.addEventListener('DOMContentLoaded', () => {
    initializeSummaryPage();
});

/**
 * Initialize the summary page
 * Loads data and renders all sections
 */
function initializeSummaryPage() {
    // Check if user is logged in
    if (!checkSession()) {
        window.location.href = 'login.html';
        return;
    }

    const data = loadSummaryData();
    
    if (!data) {
        // If no data available, show error and redirect
        alert('No summary data available. Please upload a document first.');
        window.location.href = 'upload.html';
        return;
    }

    // Render all sections
    renderSummary(data);
    renderClauses(data.clauses);
    renderRiskFlags(data.riskFlags);

    // Set up download button
    const downloadBtn = document.getElementById('download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => handleDownload(data));
    }
}

/**
 * Load summary data from sessionStorage or dummy JSON
 * @returns {Object|null} Summary data object or null if not found
 */
function loadSummaryData() {
    // Use utility function to get data from sessionStorage
    const data = getSessionData('summaryData');
    
    if (data) {
        return data;
    }

    // If no stored data, try to load from dummy JSON file
    // Note: In a real application, this would be an API call
    // For now, we'll use the dummy data directly
    return loadDummyData();
}

/**
 * Load dummy data from the JSON file
 * This simulates an API call to retrieve summary data
 * @returns {Object|null} Dummy summary data
 */
function loadDummyData() {
    // In a real scenario, this would be an async fetch call
    // For this implementation, we'll return null and expect data in sessionStorage
    // The upload page should store the dummy data in sessionStorage
    
    // Fallback: If running this page directly, we can't load the JSON file
    // due to CORS restrictions in browsers
    console.warn('No summary data in sessionStorage. Please upload a document first.');
    return null;
}

/**
 * Render the executive summary text
 * @param {Object} data - Summary data object containing summary text
 */
function renderSummary(data) {
    const summaryTextElement = document.getElementById('summary-text');
    
    if (!summaryTextElement) {
        console.error('Summary text element not found');
        return;
    }

    // Display the summary text
    summaryTextElement.textContent = data.summary || 'No summary available.';
}

/**
 * Render extracted clauses as cards
 * @param {Array} clauses - Array of clause objects
 */
function renderClauses(clauses) {
    const clausesGrid = document.getElementById('clauses-grid');
    
    if (!clausesGrid) {
        console.error('Clauses grid element not found');
        return;
    }

    // Clear existing content
    clausesGrid.innerHTML = '';

    // Check if clauses exist
    if (!clauses || clauses.length === 0) {
        clausesGrid.innerHTML = '<p class="no-data">No clauses extracted.</p>';
        return;
    }

    // Create and append clause cards
    clauses.forEach(clause => {
        const card = createClauseCard(clause);
        clausesGrid.appendChild(card);
    });
}

/**
 * Create a single clause card element
 * @param {Object} clause - Clause object with title, text, type, and page
 * @returns {HTMLElement} Clause card element
 */
function createClauseCard(clause) {
    // Create card container
    const card = document.createElement('div');
    card.className = 'clause-card';

    // Create title
    const title = document.createElement('h3');
    title.className = 'clause-title';
    title.textContent = clause.title || 'Untitled Clause';

    // Create text content
    const text = document.createElement('p');
    text.className = 'clause-text';
    text.textContent = clause.text || 'No text available.';

    // Create type tag
    const tag = document.createElement('span');
    tag.className = 'clause-tag';
    tag.textContent = clause.type || 'General';

    // Append elements to card
    card.appendChild(title);
    card.appendChild(text);
    card.appendChild(tag);

    return card;
}

/**
 * Render risk flags with severity styling
 * @param {Array} risks - Array of risk flag objects
 */
function renderRiskFlags(risks) {
    const risksList = document.getElementById('risks-list');
    
    if (!risksList) {
        console.error('Risks list element not found');
        return;
    }

    // Clear existing content
    risksList.innerHTML = '';

    // Check if risks exist
    if (!risks || risks.length === 0) {
        risksList.innerHTML = '<p class="no-data">No risk flags identified.</p>';
        return;
    }

    // Create and append risk items
    risks.forEach(risk => {
        const item = createRiskItem(risk);
        risksList.appendChild(item);
    });
}

/**
 * Create a single risk flag item element
 * @param {Object} risk - Risk object with title, description, severity, and recommendation
 * @returns {HTMLElement} Risk item element
 */
function createRiskItem(risk) {
    // Create risk item container with severity class
    const item = document.createElement('div');
    item.className = `risk-item risk-${risk.severity || 'low'}`;

    // Create icon
    const icon = document.createElement('span');
    icon.className = 'risk-icon';
    icon.textContent = '⚠️';

    // Create content container
    const content = document.createElement('div');
    content.className = 'risk-content';

    // Create title
    const title = document.createElement('h4');
    title.textContent = risk.title || 'Untitled Risk';

    // Create description
    const description = document.createElement('p');
    description.textContent = risk.description || 'No description available.';

    // Create recommendation section if available
    if (risk.recommendation) {
        const recommendation = document.createElement('div');
        recommendation.className = 'risk-recommendation';
        recommendation.innerHTML = `<strong>Recommendation:</strong> ${risk.recommendation}`;
        content.appendChild(title);
        content.appendChild(description);
        content.appendChild(recommendation);
    } else {
        content.appendChild(title);
        content.appendChild(description);
    }

    // Append elements to item
    item.appendChild(icon);
    item.appendChild(content);

    return item;
}

/**
 * Handle download button click
 * Generates and downloads a PDF file with the summary content
 * @param {Object} data - Complete summary data object
 */
function handleDownload(data) {
    const downloadBtn = document.getElementById('download-btn');
    
    // Check if jsPDF is loaded
    if (typeof window.jspdf === 'undefined') {
        alert('PDF library is loading. Please wait a moment and try again.');
        console.error('jsPDF library not loaded');
        return;
    }
    
    // Add downloading state
    downloadBtn.classList.add('downloading');
    downloadBtn.disabled = true;
    
    // Simulate processing delay for smooth UX
    setTimeout(() => {
        console.log('Starting PDF generation...');
        console.log('jsPDF available:', typeof window.jspdf !== 'undefined');
        
        try {
            // Initialize jsPDF
            const { jsPDF } = window.jspdf;
            
            if (!jsPDF) {
                throw new Error('jsPDF not available');
            }
            
            console.log('jsPDF initialized successfully');
            
            const doc = new jsPDF();
            
            // Set up document properties
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 20;
            const maxWidth = pageWidth - (margin * 2);
            let yPosition = margin;
            
            // Helper function to add new page if needed
            const checkPageBreak = (requiredSpace) => {
                if (yPosition + requiredSpace > pageHeight - margin) {
                    doc.addPage();
                    yPosition = margin;
                    return true;
                }
                return false;
            };
            
            // Helper function to add text with word wrap
            const addText = (text, fontSize, fontStyle = 'normal', color = [0, 0, 0]) => {
                doc.setFontSize(fontSize);
                doc.setFont('helvetica', fontStyle);
                doc.setTextColor(...color);
                
                const lines = doc.splitTextToSize(text, maxWidth);
                lines.forEach(line => {
                    checkPageBreak(fontSize * 0.5);
                    doc.text(line, margin, yPosition);
                    yPosition += fontSize * 0.5;
                });
            };
            
            // Add header with blue background
            doc.setFillColor(37, 99, 235); // Primary blue color
            doc.rect(0, 0, pageWidth, 40, 'F');
            
            // Add title
            doc.setFontSize(24);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(255, 255, 255);
            doc.text('DOCUMENT SUMMARY REPORT', pageWidth / 2, 25, { align: 'center' });
            
            yPosition = 50;
            
            // Add metadata section
            if (data.metadata) {
                doc.setFontSize(10);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(100, 100, 100);
                
                const metadataText = [
                    `Document Type: ${data.metadata.documentType || 'N/A'}`,
                    `Processed: ${new Date(data.metadata.processedAt).toLocaleString()}`,
                    `Page Count: ${data.metadata.pageCount || 'N/A'}`
                ].join(' | ');
                
                doc.text(metadataText, pageWidth / 2, yPosition, { align: 'center' });
                yPosition += 15;
            }
            
            // Add horizontal line
            doc.setDrawColor(200, 200, 200);
            doc.line(margin, yPosition, pageWidth - margin, yPosition);
            yPosition += 10;
            
            // Executive Summary Section
            checkPageBreak(30);
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(37, 99, 235);
            doc.text('EXECUTIVE SUMMARY', margin, yPosition);
            yPosition += 10;
            
            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(0, 0, 0);
            const summaryLines = doc.splitTextToSize(data.summary || 'No summary available.', maxWidth);
            summaryLines.forEach(line => {
                checkPageBreak(6);
                doc.text(line, margin, yPosition);
                yPosition += 6;
            });
            yPosition += 10;
            
            // Extracted Clauses Section
            checkPageBreak(30);
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(37, 99, 235);
            doc.text('EXTRACTED CLAUSES', margin, yPosition);
            yPosition += 10;
            
            if (data.clauses && data.clauses.length > 0) {
                data.clauses.forEach((clause, index) => {
                    checkPageBreak(25);
                    
                    // Clause number and title
                    doc.setFontSize(12);
                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor(0, 0, 0);
                    doc.text(`${index + 1}. ${clause.title || 'Untitled'}`, margin, yPosition);
                    yPosition += 7;
                    
                    // Clause type and page
                    doc.setFontSize(9);
                    doc.setFont('helvetica', 'italic');
                    doc.setTextColor(100, 100, 100);
                    doc.text(`Type: ${clause.type || 'General'} | Page: ${clause.page || 'N/A'}`, margin + 5, yPosition);
                    yPosition += 6;
                    
                    // Clause text
                    doc.setFontSize(10);
                    doc.setFont('helvetica', 'normal');
                    doc.setTextColor(50, 50, 50);
                    const clauseLines = doc.splitTextToSize(clause.text || 'No text available.', maxWidth - 5);
                    clauseLines.forEach(line => {
                        checkPageBreak(5);
                        doc.text(line, margin + 5, yPosition);
                        yPosition += 5;
                    });
                    yPosition += 8;
                });
            } else {
                doc.setFontSize(10);
                doc.setFont('helvetica', 'italic');
                doc.setTextColor(100, 100, 100);
                doc.text('No clauses extracted.', margin, yPosition);
                yPosition += 10;
            }
            
            // Risk Flags Section
            checkPageBreak(30);
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(37, 99, 235);
            doc.text('RISK FLAGS', margin, yPosition);
            yPosition += 10;
            
            if (data.riskFlags && data.riskFlags.length > 0) {
                data.riskFlags.forEach((risk, index) => {
                    checkPageBreak(30);
                    
                    // Risk severity color
                    let severityColor = [76, 175, 80]; // Green for low
                    if (risk.severity === 'high') {
                        severityColor = [220, 53, 69]; // Red
                    } else if (risk.severity === 'medium') {
                        severityColor = [255, 193, 7]; // Yellow
                    }
                    
                    // Risk number and title with severity badge
                    doc.setFontSize(12);
                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor(0, 0, 0);
                    doc.text(`${index + 1}. ${risk.title || 'Untitled'}`, margin, yPosition);
                    
                    // Severity badge
                    const severityText = (risk.severity || 'low').toUpperCase();
                    const badgeWidth = doc.getTextWidth(severityText) + 6;
                    const badgeX = pageWidth - margin - badgeWidth;
                    
                    doc.setFillColor(...severityColor);
                    doc.roundedRect(badgeX, yPosition - 4, badgeWidth, 6, 1, 1, 'F');
                    doc.setFontSize(8);
                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor(255, 255, 255);
                    doc.text(severityText, badgeX + 3, yPosition);
                    
                    yPosition += 7;
                    
                    // Risk description
                    doc.setFontSize(10);
                    doc.setFont('helvetica', 'normal');
                    doc.setTextColor(50, 50, 50);
                    const descLines = doc.splitTextToSize(risk.description || 'No description available.', maxWidth - 5);
                    descLines.forEach(line => {
                        checkPageBreak(5);
                        doc.text(line, margin + 5, yPosition);
                        yPosition += 5;
                    });
                    
                    // Recommendation
                    if (risk.recommendation) {
                        yPosition += 3;
                        checkPageBreak(15);
                        
                        // Recommendation box
                        doc.setFillColor(240, 248, 255);
                        const recLines = doc.splitTextToSize(`Recommendation: ${risk.recommendation}`, maxWidth - 10);
                        const boxHeight = recLines.length * 5 + 4;
                        doc.roundedRect(margin + 5, yPosition - 3, maxWidth - 10, boxHeight, 2, 2, 'F');
                        
                        doc.setFontSize(9);
                        doc.setFont('helvetica', 'normal');
                        doc.setTextColor(37, 99, 235);
                        recLines.forEach(line => {
                            doc.text(line, margin + 8, yPosition);
                            yPosition += 5;
                        });
                        yPosition += 2;
                    }
                    
                    yPosition += 8;
                });
            } else {
                doc.setFontSize(10);
                doc.setFont('helvetica', 'italic');
                doc.setTextColor(100, 100, 100);
                doc.text('No risk flags identified.', margin, yPosition);
                yPosition += 10;
            }
            
            // Add footer to all pages
            const pageCount = doc.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(150, 150, 150);
                doc.text(
                    `Page ${i} of ${pageCount} | Generated: ${new Date().toLocaleString()}`,
                    pageWidth / 2,
                    pageHeight - 10,
                    { align: 'center' }
                );
            }
            
            // Save the PDF
            const fileName = `summary_${data.documentId || 'document'}_${Date.now()}.pdf`;
            console.log('Saving PDF as:', fileName);
            doc.save(fileName);
            console.log('PDF saved successfully!');
            
            // Show success state
            downloadBtn.classList.remove('downloading');
            downloadBtn.classList.add('success');
            
            const originalText = downloadBtn.querySelector('.download-text').textContent;
            downloadBtn.querySelector('.download-text').textContent = 'Downloaded!';
            
            // Reset button after 2 seconds
            setTimeout(() => {
                downloadBtn.classList.remove('success');
                downloadBtn.querySelector('.download-text').textContent = originalText;
                downloadBtn.disabled = false;
            }, 2000);
            
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try again.');
            
            // Reset button on error
            downloadBtn.classList.remove('downloading');
            downloadBtn.disabled = false;
        }
    }, 800); // Small delay for smooth animation
}
