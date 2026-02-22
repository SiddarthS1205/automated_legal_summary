/**
 * Comparison Page Logic
 * Handles dual file upload, document comparison simulation, and results display
 */

// Check session on page load
if (!checkSession()) {
    window.location.href = 'login.html';
}

// State management
let selectedFiles = {
    file1: null,
    file2: null
};

// DOM elements
const uploadBox1 = document.getElementById('upload-box-1');
const uploadBox2 = document.getElementById('upload-box-2');
const fileInput1 = document.getElementById('file-1');
const fileInput2 = document.getElementById('file-2');
const status1 = document.getElementById('status-1');
const status2 = document.getElementById('status-2');
const compareBtn = document.getElementById('compare-btn');
const loadingDiv = document.getElementById('comparison-loading');
const resultsDiv = document.getElementById('comparison-results');

/**
 * Initialize event listeners
 */
function initializeComparison() {
    // Upload box 1 events
    uploadBox1.addEventListener('click', () => fileInput1.click());
    uploadBox1.addEventListener('dragover', (e) => handleDragOver(e, uploadBox1));
    uploadBox1.addEventListener('dragleave', (e) => handleDragLeave(e, uploadBox1));
    uploadBox1.addEventListener('drop', (e) => handleDrop(e, 1));
    fileInput1.addEventListener('change', (e) => handleFileSelect(1, e.target.files[0]));

    // Upload box 2 events
    uploadBox2.addEventListener('click', () => fileInput2.click());
    uploadBox2.addEventListener('dragover', (e) => handleDragOver(e, uploadBox2));
    uploadBox2.addEventListener('dragleave', (e) => handleDragLeave(e, uploadBox2));
    uploadBox2.addEventListener('drop', (e) => handleDrop(e, 2));
    fileInput2.addEventListener('change', (e) => handleFileSelect(2, e.target.files[0]));

    // Compare button
    compareBtn.addEventListener('click', handleCompare);
}

/**
 * Handle drag over event
 */
function handleDragOver(event, uploadBox) {
    event.preventDefault();
    uploadBox.classList.add('drag-over');
}

/**
 * Handle drag leave event
 */
function handleDragLeave(event, uploadBox) {
    event.preventDefault();
    uploadBox.classList.remove('drag-over');
}

/**
 * Handle file drop
 */
function handleDrop(event, fileNumber) {
    event.preventDefault();
    const uploadBox = fileNumber === 1 ? uploadBox1 : uploadBox2;
    uploadBox.classList.remove('drag-over');

    const file = event.dataTransfer.files[0];
    if (file) {
        handleFileSelect(fileNumber, file);
    }
}

/**
 * Handle file selection
 * @param {number} fileNumber - 1 or 2 indicating which upload slot
 * @param {File} file - The selected file
 */
function handleFileSelect(fileNumber, file) {
    if (!file) return;

    const validation = validateFile(file);
    const statusDiv = fileNumber === 1 ? status1 : status2;
    const uploadBox = fileNumber === 1 ? uploadBox1 : uploadBox2;

    if (!validation.valid) {
        statusDiv.textContent = validation.error;
        statusDiv.className = 'file-status error';
        uploadBox.classList.remove('file-selected');
        selectedFiles[`file${fileNumber}`] = null;
    } else {
        statusDiv.textContent = `✓ ${file.name}`;
        statusDiv.className = 'file-status success';
        uploadBox.classList.add('file-selected');
        selectedFiles[`file${fileNumber}`] = file;
    }

    // Enable compare button if both files are selected
    updateCompareButton();
}

/**
 * Validate file type and size
 * @param {File} file - File to validate
 * @returns {Object} - { valid: boolean, error: string }
 */
function validateFile(file) {
    const validExtensions = ['.pdf', '.docx'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    const fileName = file.name.toLowerCase();
    const hasValidExtension = validExtensions.some(ext => fileName.endsWith(ext));

    if (!hasValidExtension) {
        return {
            valid: false,
            error: 'Please upload a PDF or Word document (.pdf or .docx)'
        };
    }

    if (file.size > maxSize) {
        return {
            valid: false,
            error: 'File size must be less than 10MB'
        };
    }

    return { valid: true, error: '' };
}

/**
 * Update compare button state based on file selection
 */
function updateCompareButton() {
    if (selectedFiles.file1 && selectedFiles.file2) {
        compareBtn.disabled = false;
    } else {
        compareBtn.disabled = true;
    }
}

/**
 * Handle compare button click
 */
async function handleCompare() {
    if (!selectedFiles.file1 || !selectedFiles.file2) return;

    // Show loading
    compareBtn.style.display = 'none';
    loadingDiv.classList.remove('hidden');
    resultsDiv.classList.add('hidden');
    
    // Start AI processing animation
    startComparisonAnimation();

    try {
        // Simulate comparison API call
        const comparisonData = await simulateComparison(selectedFiles.file1, selectedFiles.file2);
        
        // Hide loading
        loadingDiv.classList.add('hidden');
        
        // Display results
        renderComparisonResults(comparisonData);
        resultsDiv.classList.remove('hidden');
    } catch (error) {
        loadingDiv.classList.add('hidden');
        compareBtn.style.display = 'block';
        alert('Error comparing documents. Please try again.');
        console.error('Comparison error:', error);
    }
}

/**
 * Animates the AI comparison processing stages
 */
function startComparisonAnimation() {
    const stages = [
        { id: 'comp-stage-1', duration: 600, progress: 20 },
        { id: 'comp-stage-2', duration: 700, progress: 40 },
        { id: 'comp-stage-3', duration: 800, progress: 60 },
        { id: 'comp-stage-4', duration: 600, progress: 80 },
        { id: 'comp-stage-5', duration: 500, progress: 100 }
    ];
    
    let currentStage = 0;
    
    function activateNextStage() {
        if (currentStage >= stages.length) return;
        
        const stage = stages[currentStage];
        const stageElement = document.getElementById(stage.id);
        const progressFill = document.getElementById('comp-progress-fill');
        const progressText = document.getElementById('comp-progress-text');
        
        // Mark current stage as active
        stageElement.classList.add('active');
        
        // Update progress bar
        progressFill.style.width = stage.progress + '%';
        progressText.textContent = stage.progress + '% Complete';
        
        // After stage duration, mark as completed and move to next
        setTimeout(() => {
            stageElement.classList.remove('active');
            stageElement.classList.add('completed');
            
            // Update status icon to checkmark
            const statusIcon = stageElement.querySelector('.stage-status');
            statusIcon.textContent = '✅';
            
            currentStage++;
            
            if (currentStage < stages.length) {
                activateNextStage();
            }
        }, stage.duration);
    }
    
    // Start the animation sequence
    activateNextStage();
}

/**
 * Simulate comparison API call with delay
 * @param {File} file1 - First file
 * @param {File} file2 - Second file
 * @returns {Promise<Object>} - Comparison response data
 */
function simulateComparison(file1, file2) {
    return new Promise((resolve) => {
        setTimeout(async () => {
            try {
                // Load dummy comparison data
                const response = await fetch('../data/comparison-response.json');
                const data = await response.json();
                
                // Customize with actual file names
                data.document1.name = file1.name;
                data.document2.name = file2.name;
                
                resolve(data);
            } catch (error) {
                console.error('Error loading comparison data:', error);
                resolve({
                    comparisonId: 'comp-' + Date.now(),
                    document1: { id: 'doc1', name: file1.name },
                    document2: { id: 'doc2', name: file2.name },
                    differences: [],
                    summary: { totalChanges: 0, highRiskChanges: 0, conflicts: 0 }
                });
            }
        }, 3000); // 3 second delay
    });
}

/**
 * Render comparison results
 * @param {Object} data - Comparison response data
 */
function renderComparisonResults(data) {
    // Store data globally for filtering
    window.comparisonData = data;
    
    // Render sticky summary bar
    renderStickySummaryBar(data.summary);
    
    // Render comparison table
    const tbody = document.getElementById('comparison-tbody');
    tbody.innerHTML = '';
    
    data.differences.forEach(diff => {
        const row = createComparisonRow(diff);
        tbody.appendChild(row);
    });
    
    // Set up filter functionality
    setupFilterDropdown();
    
    // Update filter count
    updateFilterCount(data.differences.length, data.differences.length);
}

/**
 * Render sticky summary bar with statistics
 * @param {Object} summary - Summary statistics
 */
function renderStickySummaryBar(summary) {
    document.getElementById('total-changes').textContent = summary.totalChanges || 0;
    document.getElementById('high-risk-count').textContent = summary.highRiskChanges || 0;
    document.getElementById('conflicts-count').textContent = summary.conflicts || 0;
}

/**
 * Set up filter dropdown functionality
 */
function setupFilterDropdown() {
    const filterDropdown = document.getElementById('risk-filter');
    
    if (!filterDropdown) return;
    
    filterDropdown.addEventListener('change', function() {
        const filterValue = this.value;
        applyFilter(filterValue);
    });
}

/**
 * Apply filter to comparison table
 * @param {string} filterValue - Filter type (all, high, conflicts, modified, added, removed)
 */
function applyFilter(filterValue) {
    const tbody = document.getElementById('comparison-tbody');
    const rows = tbody.querySelectorAll('tr');
    let visibleCount = 0;
    
    rows.forEach(row => {
        const riskLevel = row.dataset.riskLevel;
        const changeType = row.dataset.changeType;
        const isConflict = row.dataset.isConflict === 'true';
        
        let shouldShow = false;
        
        switch(filterValue) {
            case 'all':
                shouldShow = true;
                break;
            case 'high':
                shouldShow = riskLevel === 'high';
                break;
            case 'conflicts':
                shouldShow = isConflict;
                break;
            case 'modified':
                shouldShow = changeType === 'modified';
                break;
            case 'added':
                shouldShow = changeType === 'added';
                break;
            case 'removed':
                shouldShow = changeType === 'removed';
                break;
        }
        
        if (shouldShow) {
            row.classList.remove('filtered-hidden');
            visibleCount++;
        } else {
            row.classList.add('filtered-hidden');
        }
    });
    
    // Update filter count
    updateFilterCount(visibleCount, rows.length);
}

/**
 * Update filter count display
 * @param {number} visible - Number of visible rows
 * @param {number} total - Total number of rows
 */
function updateFilterCount(visible, total) {
    const filterCount = document.getElementById('filter-count');
    if (filterCount) {
        filterCount.textContent = `Showing ${visible} of ${total} changes`;
    }
}

/**
 * Create a comparison table row
 * @param {Object} clauseData - Clause comparison data
 * @returns {HTMLTableRowElement} - Table row element
 */
function createComparisonRow(clauseData) {
    const row = document.createElement('tr');
    
    // Add data attributes for filtering
    row.dataset.riskLevel = clauseData.riskLevel;
    row.dataset.changeType = clauseData.changeType;
    row.dataset.isConflict = clauseData.isConflict;
    
    // Add conflict class if applicable
    if (clauseData.isConflict) {
        row.classList.add('conflict');
    }
    
    // Clause title cell
    const titleCell = document.createElement('td');
    titleCell.innerHTML = `
        <strong>${clauseData.clauseTitle}</strong>
        <br>
        <span class="change-type ${clauseData.changeType}">${clauseData.changeType}</span>
    `;
    row.appendChild(titleCell);
    
    // Original text cell
    const originalCell = document.createElement('td');
    originalCell.textContent = clauseData.original || '—';
    row.appendChild(originalCell);
    
    // Revised text cell
    const revisedCell = document.createElement('td');
    revisedCell.textContent = clauseData.revised || '—';
    row.appendChild(revisedCell);
    
    // Risk level cell
    const riskCell = document.createElement('td');
    riskCell.innerHTML = `<span class="risk-badge ${clauseData.riskLevel}">${clauseData.riskLevel}</span>`;
    row.appendChild(riskCell);
    
    return row;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeComparison);
