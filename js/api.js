/**
 * API Simulation Layer
 * Provides dummy API functions that load JSON data with simulated delays
 * to mimic real backend API calls
 */

/**
 * Simulates network delay
 * @param {number} min - Minimum delay in milliseconds
 * @param {number} max - Maximum delay in milliseconds
 * @returns {Promise} - Resolves after random delay
 */
function simulateDelay(min = 2000, max = 4000) {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    return new Promise(resolve => setTimeout(resolve, delay));
}

/**
 * Fetches upload response data
 * Simulates the response after a document is uploaded
 * @param {File} file - The uploaded file
 * @returns {Promise<Object>} - Upload response data
 */
async function fetchUploadResponse(file) {
    try {
        // Simulate network delay
        await simulateDelay(2000, 3000);
        
        // Load dummy data
        const response = await fetch('../data/upload-response.json');
        if (!response.ok) {
            throw new Error('Failed to load upload response data');
        }
        
        const data = await response.json();
        
        // Customize with actual file information
        data.fileName = file.name;
        data.fileSize = file.size;
        data.uploadTime = new Date().toISOString();
        data.documentId = 'doc-' + Date.now();
        
        return data;
    } catch (error) {
        console.error('Error fetching upload response:', error);
        throw error;
    }
}

/**
 * Fetches summary response data
 * Simulates the response after document processing is complete
 * @param {string} documentId - The document ID
 * @returns {Promise<Object>} - Summary response data with clauses and risk flags
 */
async function fetchSummaryResponse(documentId) {
    try {
        // Simulate processing delay
        await simulateDelay(3000, 4000);
        
        // Load dummy data
        const response = await fetch('../data/summary-response.json');
        if (!response.ok) {
            throw new Error('Failed to load summary response data');
        }
        
        const data = await response.json();
        
        // Customize with actual document ID
        data.documentId = documentId;
        data.metadata.processedAt = new Date().toISOString();
        
        return data;
    } catch (error) {
        console.error('Error fetching summary response:', error);
        throw error;
    }
}

/**
 * Fetches comparison response data
 * Simulates the response after comparing two documents
 * @param {string} documentId1 - First document ID
 * @param {string} documentId2 - Second document ID
 * @returns {Promise<Object>} - Comparison response data
 */
async function fetchComparisonResponse(documentId1, documentId2) {
    try {
        // Simulate comparison processing delay
        await simulateDelay(3000, 4000);
        
        // Load dummy data
        const response = await fetch('../data/comparison-response.json');
        if (!response.ok) {
            throw new Error('Failed to load comparison response data');
        }
        
        const data = await response.json();
        
        // Customize with actual document IDs
        data.comparisonId = 'comp-' + Date.now();
        data.document1.id = documentId1;
        data.document2.id = documentId2;
        
        return data;
    } catch (error) {
        console.error('Error fetching comparison response:', error);
        throw error;
    }
}

/**
 * Fetches risk flags data
 * Loads the risk flags reference data
 * @returns {Promise<Array>} - Array of risk flag definitions
 */
async function fetchRiskFlags() {
    try {
        const response = await fetch('../data/risk-flags.json');
        if (!response.ok) {
            throw new Error('Failed to load risk flags data');
        }
        
        const data = await response.json();
        return data.riskFlags || [];
    } catch (error) {
        console.error('Error fetching risk flags:', error);
        throw error;
    }
}

/**
 * Simulates an API error for testing error handling
 * @param {string} errorType - Type of error to simulate ('network', 'timeout', 'server')
 * @returns {Promise} - Rejects with appropriate error
 */
async function simulateError(errorType = 'network') {
    await simulateDelay(1000, 2000);
    
    switch (errorType) {
        case 'network':
            throw new Error('Network error: Unable to reach the server');
        case 'timeout':
            throw new Error('Request timeout: The request took too long to complete');
        case 'server':
            throw new Error('Server error: The server encountered an error processing your request');
        case 'json':
            throw new Error('JSON parse error: Invalid response format');
        default:
            throw new Error('Unknown error occurred');
    }
}

/**
 * Fetches dashboard statistics
 * Simulates loading user's document processing statistics
 * @returns {Promise<Object>} - Dashboard statistics
 */
async function fetchDashboardStats() {
    try {
        // Simulate quick API call
        await simulateDelay(500, 1000);
        
        // Return dummy statistics
        // In a real app, this would come from the backend
        return {
            totalDocuments: 24,
            processedDocuments: 22,
            flaggedRisks: 8,
            lastUpdated: new Date().toISOString()
        };
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        throw error;
    }
}

/**
 * Simulates user authentication
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} - Authentication response
 */
async function authenticateUser(email, password) {
    try {
        // Simulate authentication delay
        await simulateDelay(1000, 2000);
        
        // Simple validation for demo purposes
        // In a real app, this would validate against backend
        if (!email || !password) {
            throw new Error('Email and password are required');
        }
        
        // Accept any non-empty credentials for demo
        return {
            success: true,
            user: {
                email: email,
                name: email.split('@')[0],
                role: 'lawyer'
            },
            token: 'demo-token-' + Date.now()
        };
    } catch (error) {
        console.error('Error authenticating user:', error);
        throw error;
    }
}

/**
 * Validates if all required fields are present in data
 * Used for testing data integrity
 * @param {Object} data - Data object to validate
 * @param {Array<string>} requiredFields - Array of required field names
 * @returns {boolean} - True if all required fields are present
 */
function validateDataStructure(data, requiredFields) {
    if (!data || typeof data !== 'object') {
        return false;
    }
    
    return requiredFields.every(field => {
        // Support nested field checking with dot notation
        const fieldParts = field.split('.');
        let value = data;
        
        for (const part of fieldParts) {
            if (value === null || value === undefined || !(part in value)) {
                return false;
            }
            value = value[part];
        }
        
        return true;
    });
}
