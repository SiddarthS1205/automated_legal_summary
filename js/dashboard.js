/**
 * Dashboard Module
 * Handles dashboard initialization, statistics display, and user session management
 */

/**
 * Loads dashboard statistics from localStorage or returns default values
 * @returns {Object} Dashboard statistics with totalDocuments, processedDocuments, and flaggedRisks
 */
function loadDashboardStats() {
  // Try to load stats from localStorage
  const storedStats = localStorage.getItem('dashboardStats');
  
  if (storedStats) {
    try {
      return JSON.parse(storedStats);
    } catch (error) {
      console.error('Error parsing dashboard stats:', error);
    }
  }
  
  // Return default stats if none exist
  return {
    totalDocuments: 0,
    processedDocuments: 0,
    flaggedRisks: 0,
    lastUpdated: new Date().toISOString()
  };
}

/**
 * Updates the statistics display with animation
 * @param {Object} stats - Statistics object containing totalDocuments, processedDocuments, and flaggedRisks
 */
function updateStatsDisplay(stats) {
  // Get stat number elements
  const totalDocsElement = document.getElementById('total-docs');
  const processedDocsElement = document.getElementById('processed-docs');
  const flaggedRisksElement = document.getElementById('flagged-risks');
  
  if (!totalDocsElement || !processedDocsElement || !flaggedRisksElement) {
    console.error('Stat elements not found in DOM');
    return;
  }
  
  // Animate count-up effect for each stat
  animateCount(totalDocsElement, 0, stats.totalDocuments, 800);
  animateCount(processedDocsElement, 0, stats.processedDocuments, 800);
  animateCount(flaggedRisksElement, 0, stats.flaggedRisks, 800);
}

/**
 * Animates a number counting up from start to end value
 * @param {HTMLElement} element - The element to update
 * @param {number} start - Starting number
 * @param {number} end - Ending number
 * @param {number} duration - Animation duration in milliseconds
 */
function animateCount(element, start, end, duration) {
  const startTime = performance.now();
  const difference = end - start;
  
  function updateCount(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function for smooth animation
    const easeOutQuad = progress * (2 - progress);
    const currentValue = Math.floor(start + difference * easeOutQuad);
    
    element.textContent = currentValue;
    
    if (progress < 1) {
      requestAnimationFrame(updateCount);
    } else {
      element.textContent = end;
    }
  }
  
  requestAnimationFrame(updateCount);
}

/**
 * Displays the user's name from session data
 */
function displayUserName() {
  const userEmail = localStorage.getItem('userEmail');
  const userNameElement = document.getElementById('user-name');
  
  if (!userNameElement) {
    console.error('User name element not found');
    return;
  }
  
  if (userEmail) {
    // Extract name from email (part before @)
    const name = userEmail.split('@')[0];
    // Capitalize first letter
    const displayName = name.charAt(0).toUpperCase() + name.slice(1);
    userNameElement.textContent = displayName;
  } else {
    userNameElement.textContent = 'User';
  }
}

/**
 * Initializes the dashboard when the page loads
 * Checks session, loads stats, and sets up the display
 */
function initializeDashboard() {
  // Check if user is logged in
  if (!checkSession()) {
    // Redirect to login if no valid session
    window.location.href = 'login.html';
    return;
  }
  
  // Display user name
  displayUserName();
  
  // Load and display statistics
  const stats = loadDashboardStats();
  updateStatsDisplay(stats);
}

/**
 * Updates dashboard statistics (called after document processing)
 * @param {Object} updates - Object with stat updates (e.g., { totalDocuments: 1, processedDocuments: 1 })
 */
function updateDashboardStats(updates) {
  const currentStats = loadDashboardStats();
  
  // Merge updates with current stats
  const newStats = {
    totalDocuments: currentStats.totalDocuments + (updates.totalDocuments || 0),
    processedDocuments: currentStats.processedDocuments + (updates.processedDocuments || 0),
    flaggedRisks: currentStats.flaggedRisks + (updates.flaggedRisks || 0),
    lastUpdated: new Date().toISOString()
  };
  
  // Save to localStorage
  localStorage.setItem('dashboardStats', JSON.stringify(newStats));
  
  // Update display if on dashboard page
  if (document.getElementById('total-docs')) {
    updateStatsDisplay(newStats);
  }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeDashboard);
