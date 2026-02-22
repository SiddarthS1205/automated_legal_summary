/**
 * Shared Utility Functions for Legal Document Summarization Frontend
 * Provides error handling, user feedback, and common helper functions
 */

/**
 * Displays an inline error message with optional hint
 * @param {string} message - The main error message to display
 * @param {string} hint - Optional actionable guidance for the user
 * @param {string} elementId - Optional specific element ID to show error in (defaults to 'error-message')
 */
function showError(message, hint = '', elementId = 'error-message') {
  const errorElement = document.getElementById(elementId);
  
  if (!errorElement) {
    console.error(`Error element with ID '${elementId}' not found`);
    return;
  }
  
  // Clear any existing content
  errorElement.innerHTML = '';
  
  // Create error message structure
  const messageDiv = document.createElement('div');
  messageDiv.className = 'error-message-text';
  messageDiv.textContent = message;
  errorElement.appendChild(messageDiv);
  
  // Add hint if provided
  if (hint) {
    const hintDiv = document.createElement('div');
    hintDiv.className = 'error-hint-text';
    hintDiv.textContent = hint;
    errorElement.appendChild(hintDiv);
  }
  
  // Show the error element
  errorElement.classList.remove('hidden');
  errorElement.classList.add('visible');
  
  // Scroll error into view for better visibility
  errorElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Hides an error message element
 * @param {string} elementId - The ID of the error element to hide
 */
function hideError(elementId = 'error-message') {
  const errorElement = document.getElementById(elementId);
  
  if (!errorElement) {
    return;
  }
  
  errorElement.classList.add('hidden');
  errorElement.classList.remove('visible');
  errorElement.innerHTML = '';
}

/**
 * Redirects to the error page with error details
 * @param {string} errorType - The type of error (e.g., 'network', 'upload', 'auth')
 * @param {string} message - The error message to display
 */
function redirectToErrorPage(errorType, message) {
  // Store error information in sessionStorage for the error page to retrieve
  const errorData = {
    type: errorType,
    message: message,
    timestamp: new Date().toISOString(),
    previousPage: window.location.pathname
  };
  
  sessionStorage.setItem('errorData', JSON.stringify(errorData));
  
  // Redirect to error page
  window.location.href = 'error.html';
}

/**
 * Standardized network error handling
 * Provides user-friendly messages and actionable guidance
 * @param {Error} error - The error object from a failed network request
 * @param {boolean} critical - Whether this is a critical error requiring page redirect
 */
function handleNetworkError(error, critical = false) {
  console.error('Network error:', error);
  
  let message = 'We couldn\'t connect to the server.';
  let hint = 'Please check your internet connection and try again.';
  
  // Customize message based on error type
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    message = 'Unable to reach the server.';
    hint = 'Please check your internet connection and try again. If the problem persists, the service may be temporarily unavailable.';
  } else if (error.message.includes('timeout')) {
    message = 'The request took too long to complete.';
    hint = 'Please try again. If you\'re uploading a large file, consider using a smaller document.';
  } else if (error.message.includes('JSON')) {
    message = 'We received an unexpected response from the server.';
    hint = 'Please try again. If the problem persists, contact support.';
  }
  
  // Handle critical errors with page redirect
  if (critical) {
    redirectToErrorPage('network', message);
  } else {
    // Show inline error for non-critical errors
    showError(message, hint);
  }
}

/**
 * Validates email format
 * @param {string} email - The email address to validate
 * @returns {boolean} - True if email format is valid
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Formats file size in human-readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} - Formatted file size (e.g., "2.5 MB")
 */
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Formats a date string to a readable format
 * @param {string} isoString - ISO date string
 * @returns {string} - Formatted date (e.g., "Jan 15, 2024 at 2:30 PM")
 */
function formatDate(isoString) {
  const date = new Date(isoString);
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };
  
  return date.toLocaleDateString('en-US', options).replace(',', ' at');
}

/**
 * Safely retrieves data from sessionStorage with error handling
 * @param {string} key - The storage key
 * @returns {any} - Parsed data or null if not found/invalid
 */
function getSessionData(key) {
  try {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error retrieving session data for key '${key}':`, error);
    return null;
  }
}

/**
 * Safely stores data in sessionStorage with error handling
 * @param {string} key - The storage key
 * @param {any} data - The data to store (will be JSON stringified)
 * @returns {boolean} - True if successful, false otherwise
 */
function setSessionData(key, data) {
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Error storing session data for key '${key}':`, error);
    
    // Handle quota exceeded error
    if (error.name === 'QuotaExceededError') {
      showError(
        'Storage limit reached.',
        'Please clear your browser data or close some tabs and try again.'
      );
    }
    
    return false;
  }
}

/**
 * Navigates back to the previous page or to dashboard if no history
 */
function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = 'dashboard.html';
  }
}

/**
 * Debounces a function call
 * @param {Function} func - The function to debounce
 * @param {number} wait - The debounce delay in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
