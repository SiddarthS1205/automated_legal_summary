/**
 * Authentication Module
 * Handles user login, session management, and authentication validation
 * for the Legal Document Summarization System
 */

/**
 * Validates user credentials by checking if both email and password fields are non-empty
 * @param {string} email - The email address entered by the user
 * @param {string} password - The password entered by the user
 * @returns {Object} Validation result with 'valid' boolean and 'message' string
 */
function validateCredentials(email, password) {
    // Check if email is empty or only whitespace
    if (!email || email.trim() === '') {
        return {
            valid: false,
            message: 'Please enter your email address'
        };
    }
    
    // Check if password is empty or only whitespace
    if (!password || password.trim() === '') {
        return {
            valid: false,
            message: 'Please enter your password'
        };
    }
    
    // Both fields are non-empty
    return {
        valid: true,
        message: ''
    };
}

/**
 * Handles the login form submission event
 * Validates credentials, stores session data, and redirects to dashboard
 * @param {Event} event - The form submit event
 */
function handleLogin(event) {
    // Prevent default form submission behavior (page reload)
    event.preventDefault();
    
    // Get form field values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Validate credentials
    const validation = validateCredentials(email, password);
    
    // Get error message element
    const errorElement = document.getElementById('error-message');
    
    if (!validation.valid) {
        // Display error message without page reload
        errorElement.textContent = validation.message;
        errorElement.classList.remove('hidden');
        return;
    }
    
    // Hide any existing error messages
    errorElement.classList.add('hidden');
    
    // Store user session in localStorage
    localStorage.setItem('userEmail', email);
    localStorage.setItem('loginTime', Date.now().toString());
    
    // Navigate to dashboard page
    window.location.href = 'dashboard.html';
}

/**
 * Checks if a user session exists and is valid
 * @returns {boolean} True if user is logged in, false otherwise
 */
function checkSession() {
    // Check if user email exists in localStorage
    const userEmail = localStorage.getItem('userEmail');
    const loginTime = localStorage.getItem('loginTime');
    
    // Session is valid if both email and login time exist
    return !!(userEmail && loginTime);
}

/**
 * Logs out the current user by clearing session data and redirecting to login page
 */
function logout() {
    // Clear all session data from localStorage
    localStorage.removeItem('userEmail');
    localStorage.removeItem('loginTime');
    
    // Redirect to login page
    window.location.href = 'login.html';
}

// Initialize login form when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    
    // Attach login handler to form submit event
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});
