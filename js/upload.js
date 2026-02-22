/**
 * Upload Page Logic for Legal Document Summarization Frontend
 * Handles drag-and-drop file upload, validation, and processing simulation
 */

// Global variables to store the selected file
let selectedFile = null;

/**
 * Initialize the upload page when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
  // Check if user is logged in
  if (!checkSession()) {
    window.location.href = 'login.html';
    return;
  }
  
  // Get DOM elements
  const uploadArea = document.getElementById('upload-area');
  const fileInput = document.getElementById('file-input');
  const fileInfo = document.getElementById('file-info');
  const generateBtn = document.getElementById('generate-btn');
  const removeFileBtn = document.getElementById('remove-file-btn');
  
  // Set up drag and drop event listeners
  uploadArea.addEventListener('dragover', handleDragOver);
  uploadArea.addEventListener('dragleave', handleDragLeave);
  uploadArea.addEventListener('drop', handleDrop);
  
  // Set up click to browse functionality
  uploadArea.addEventListener('click', function() {
    fileInput.click();
  });
  
  // Handle file selection via browse
  fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      processFile(file);
    }
  });
  
  // Set up generate summary button
  generateBtn.addEventListener('click', handleGenerateSummary);
  
  // Set up remove file button
  removeFileBtn.addEventListener('click', function(event) {
    event.stopPropagation();
    clearFileSelection();
  });
});

/**
 * Handles drag over event to provide visual feedback
 * @param {DragEvent} event - The drag over event
 */
function handleDragOver(event) {
  event.preventDefault();
  event.stopPropagation();
  
  // Add visual feedback class
  const uploadArea = document.getElementById('upload-area');
  uploadArea.classList.add('drag-over');
  
  // Set the drop effect
  event.dataTransfer.dropEffect = 'copy';
}

/**
 * Handles drag leave event to remove visual feedback
 * @param {DragEvent} event - The drag leave event
 */
function handleDragLeave(event) {
  event.preventDefault();
  event.stopPropagation();
  
  // Remove visual feedback class
  const uploadArea = document.getElementById('upload-area');
  uploadArea.classList.remove('drag-over');
}

/**
 * Handles drop event to process dropped files
 * @param {DragEvent} event - The drop event
 */
function handleDrop(event) {
  event.preventDefault();
  event.stopPropagation();
  
  // Remove visual feedback class
  const uploadArea = document.getElementById('upload-area');
  uploadArea.classList.remove('drag-over');
  
  // Get the dropped files
  const files = event.dataTransfer.files;
  
  if (files.length > 0) {
    const file = files[0];
    processFile(file);
  }
}

/**
 * Processes and validates the selected file
 * @param {File} file - The file to process
 */
function processFile(file) {
  // Hide any existing errors
  hideError('upload-error');
  
  // Validate the file
  const validation = validateFile(file);
  
  if (!validation.valid) {
    // Show error message
    showFileError(validation.error);
    return;
  }
  
  // Store the file
  selectedFile = file;
  
  // Display file information
  displayFileInfo(file);
}

/**
 * Validates file type and size
 * @param {File} file - The file to validate
 * @returns {Object} - Validation result with valid flag and error message
 */
function validateFile(file) {
  // Check if file exists
  if (!file) {
    return {
      valid: false,
      error: 'No file selected. Please choose a file to upload.'
    };
  }
  
  // Get file extension
  const fileName = file.name.toLowerCase();
  const validExtensions = ['.pdf', '.docx'];
  const hasValidExtension = validExtensions.some(ext => fileName.endsWith(ext));
  
  // Check file type
  if (!hasValidExtension) {
    return {
      valid: false,
      error: 'Invalid file format. Please upload a PDF or Word document (.pdf or .docx).'
    };
  }
  
  // Check file size (10MB = 10 * 1024 * 1024 bytes)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File size exceeds the 10MB limit. Your file is ${formatFileSize(file.size)}. Please upload a smaller document.`
    };
  }
  
  // Check for empty file
  if (file.size === 0) {
    return {
      valid: false,
      error: 'The selected file is empty. Please choose a valid document.'
    };
  }
  
  // File is valid
  return {
    valid: true,
    error: null
  };
}

/**
 * Displays file information in the UI
 * @param {File} file - The file to display information for
 */
function displayFileInfo(file) {
  const fileInfo = document.getElementById('file-info');
  const fileName = document.getElementById('file-name');
  const fileSize = document.getElementById('file-size');
  const uploadArea = document.getElementById('upload-area');
  
  // Update file information
  fileName.textContent = file.name;
  fileSize.textContent = formatFileSize(file.size);
  
  // Hide upload area and show file info
  uploadArea.classList.add('hidden');
  fileInfo.classList.remove('hidden');
}

/**
 * Clears the file selection and resets the UI
 */
function clearFileSelection() {
  selectedFile = null;
  
  const fileInfo = document.getElementById('file-info');
  const uploadArea = document.getElementById('upload-area');
  const fileInput = document.getElementById('file-input');
  
  // Reset file input
  fileInput.value = '';
  
  // Hide file info and show upload area
  fileInfo.classList.add('hidden');
  uploadArea.classList.remove('hidden');
  
  // Hide any errors
  hideError('upload-error');
}

/**
 * Shows an error message specific to file upload
 * @param {string} errorMessage - The error message to display
 */
function showFileError(errorMessage) {
  const errorContainer = document.getElementById('upload-error');
  const errorText = document.getElementById('error-text');
  
  // Create error message HTML
  errorText.innerHTML = `
    <p><strong>Upload Error</strong></p>
    <p>${errorMessage}</p>
  `;
  
  // Show error container
  errorContainer.classList.remove('hidden');
  
  // Scroll error into view
  errorContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Handles the generate summary button click
 * Shows loading animation and simulates processing
 */
function handleGenerateSummary() {
  if (!selectedFile) {
    showFileError('No file selected. Please upload a document first.');
    return;
  }
  
  // Hide file info and show loading
  const fileInfo = document.getElementById('file-info');
  const loading = document.getElementById('loading');
  
  fileInfo.classList.add('hidden');
  loading.classList.remove('hidden');
  
  // Start AI processing animation
  startAIProcessingAnimation();
  
  // Simulate upload and processing
  simulateUpload(selectedFile)
    .then(response => {
      // Store the response data in sessionStorage
      setSessionData('uploadResponse', response);
      setSessionData('summaryData', response.summaryData);
      
      // Update dashboard stats
      updateDashboardStats();
      
      // Redirect to summary page
      window.location.href = 'summary.html';
    })
    .catch(error => {
      // Hide loading and show error
      loading.classList.add('hidden');
      fileInfo.classList.remove('hidden');
      
      showFileError('Failed to process the document. Please try again.');
      console.error('Upload error:', error);
    });
}

/**
 * Animates the AI processing stages
 * Shows progressive stages with status updates
 */
function startAIProcessingAnimation() {
  const stages = [
    { id: 'stage-1', duration: 600, progress: 20 },
    { id: 'stage-2', duration: 800, progress: 40 },
    { id: 'stage-3', duration: 700, progress: 60 },
    { id: 'stage-4', duration: 600, progress: 80 },
    { id: 'stage-5', duration: 400, progress: 100 }
  ];
  
  let currentStage = 0;
  
  function activateNextStage() {
    if (currentStage >= stages.length) return;
    
    const stage = stages[currentStage];
    const stageElement = document.getElementById(stage.id);
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
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
 * Simulates file upload and processing with dummy data
 * @param {File} file - The file to upload
 * @returns {Promise} - Promise that resolves with dummy upload response
 */
function simulateUpload(file) {
  return new Promise((resolve, reject) => {
    // Simulate processing delay (2-3 seconds)
    const delay = 2000 + Math.random() * 1000;
    
    setTimeout(() => {
      // Load the dummy summary response data
      fetch('../data/summary-response.json')
        .then(response => response.json())
        .then(summaryData => {
          // Create upload response
          const uploadResponse = {
            success: true,
            documentId: summaryData.documentId,
            fileName: file.name,
            fileSize: file.size,
            uploadTime: new Date().toISOString(),
            status: 'completed',
            summaryData: summaryData
          };
          
          resolve(uploadResponse);
        })
        .catch(error => {
          console.error('Error loading dummy data:', error);
          reject(error);
        });
    }, delay);
  });
}

/**
 * Updates dashboard statistics after successful upload
 */
function updateDashboardStats() {
  // Get current stats or initialize defaults
  let stats = getSessionData('dashboardStats') || {
    totalDocuments: 0,
    processedDocuments: 0,
    flaggedRisks: 0
  };
  
  // Increment counters
  stats.totalDocuments += 1;
  stats.processedDocuments += 1;
  
  // Get risk count from summary data
  const summaryData = getSessionData('summaryData');
  if (summaryData && summaryData.riskFlags) {
    stats.flaggedRisks += summaryData.riskFlags.length;
  }
  
  // Store updated stats
  setSessionData('dashboardStats', stats);
}
