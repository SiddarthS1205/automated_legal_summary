# Legal Document Summarization Frontend

A professional web-based frontend for an Automated Legal Document Summarization System. This SaaS application enables law firms to upload contracts and receive AI-generated summaries, extracted clauses, risk assessments, and document comparisons.

## Features

- **User Authentication**: Secure login system with session management
- **Dashboard**: Overview of document processing activity with statistics
- **Contract Upload**: Drag-and-drop interface for PDF and DOCX files
- **Summary Display**: View extracted clauses, executive summaries, and risk flags
- **Document Comparison**: Side-by-side comparison of two contract versions
- **Error Handling**: User-friendly error pages and inline error messages
- **Responsive Design**: Optimized for desktop (1024px+) and tablet (768px-1023px)

## Project Structure

```
legal-document-summarization-frontend/
├── index.html              # Entry point with redirect to login
├── pages/                  # HTML pages
│   ├── login.html         # User authentication
│   ├── dashboard.html     # Main dashboard with statistics
│   ├── upload.html        # Contract upload interface
│   ├── summary.html       # Summary results display
│   ├── comparison.html    # Document comparison interface
│   └── error.html         # Error page
├── css/                    # Stylesheets
│   ├── main.css           # Global styles and utilities
│   ├── login.css          # Login page styles
│   ├── dashboard.css      # Dashboard styles
│   ├── upload.css         # Upload page styles
│   ├── summary.css        # Summary page styles
│   ├── comparison.css     # Comparison page styles
│   └── error.css          # Error page styles
├── js/                     # JavaScript modules
│   ├── auth.js            # Authentication logic
│   ├── dashboard.js       # Dashboard functionality
│   ├── upload.js          # File upload handling
│   ├── summary.js         # Summary display logic
│   ├── comparison.js      # Comparison functionality
│   ├── api.js             # API simulation layer
│   └── utils.js           # Shared utility functions
└── data/                   # Dummy JSON data
    ├── upload-response.json
    ├── summary-response.json
    ├── comparison-response.json
    └── risk-flags.json
```

## Getting Started

### Prerequisites

- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Local web server (e.g., Live Server, Python HTTP server, or Node.js http-server)

### Installation

1. Clone or download this repository
2. Open the project folder in your preferred code editor
3. Start a local web server in the project root directory

**Using Python:**
```bash
python -m http.server 8000
```

**Using Node.js:**
```bash
npx http-server -p 8000
```

**Using VS Code Live Server:**
- Install the Live Server extension
- Right-click on `index.html` and select "Open with Live Server"

4. Open your browser and navigate to `http://localhost:8000`

## Usage

### Login
- Navigate to the application (redirects to login page)
- Enter any email and password (demo accepts all non-empty credentials)
- Click "Login" to access the dashboard

### Upload Contract
1. Click "Upload Contract" from the dashboard or sidebar
2. Drag and drop a PDF or DOCX file (or click to browse)
3. Click "Generate Summary" to process the document
4. View the summary results with extracted clauses and risk flags

### Compare Documents
1. Click "Compare Documents" from the dashboard or sidebar
2. Upload two versions of a contract (original and revised)
3. Click "Compare Documents" to analyze differences
4. View the comparison table with highlighted conflicts and risk levels

### Download Summary
- On the summary page, click "Download Summary" to export results

## Technical Details

### Technologies
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid, Flexbox, and CSS Variables
- **JavaScript (ES6+)**: Vanilla JavaScript with modern features
- **LocalStorage**: Session management
- **SessionStorage**: Temporary data storage

### Design System
- **Color Scheme**: Professional blue (#2563eb) and white
- **Typography**: System fonts with responsive sizing
- **Spacing**: Consistent spacing scale (4px, 8px, 16px, 24px, 32px, 48px, 64px)
- **Shadows**: Layered shadows for depth
- **Animations**: Smooth transitions and loading indicators

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Accessibility
- Semantic HTML elements
- ARIA labels for screen readers
- Keyboard navigation support
- Focus indicators
- Minimum 4.5:1 contrast ratio
- Touch-friendly interaction targets (44px minimum)

## API Simulation

This frontend uses dummy JSON data to simulate backend API responses. All API calls include realistic delays (2-4 seconds) to mimic real network requests.

### Dummy Data Files
- `data/upload-response.json`: Sample upload confirmation
- `data/summary-response.json`: Sample summary with clauses and risk flags
- `data/comparison-response.json`: Sample comparison results
- `data/risk-flags.json`: Sample risk flag definitions

### API Functions (js/api.js)
- `fetchUploadResponse(file)`: Simulates document upload
- `fetchSummaryResponse(documentId)`: Simulates summary generation
- `fetchComparisonResponse(doc1, doc2)`: Simulates document comparison
- `fetchRiskFlags()`: Loads risk flag data
- `fetchDashboardStats()`: Loads dashboard statistics

## Development

### File Organization
- **Separation of Concerns**: HTML, CSS, and JavaScript are separated into logical folders
- **Modular JavaScript**: Each page has its own JavaScript module
- **Reusable Styles**: Global styles in `main.css`, page-specific styles in separate files
- **Shared Utilities**: Common functions in `utils.js`

### Code Style
- Descriptive variable and function names
- JSDoc comments for functions
- Consistent indentation (2 spaces)
- ES6+ features (const/let, arrow functions, template literals)

### Session Management
- User email stored in `localStorage` as `userEmail`
- Login timestamp stored as `loginTime`
- Protected pages check session on load
- Logout clears session data

## Future Enhancements

### Backend Integration
When integrating with a real backend:
1. Replace `js/api.js` functions with actual API calls
2. Add authentication token management
3. Implement real file upload with multipart/form-data
4. Add WebSocket for real-time processing updates
5. Implement proper error handling for API responses

### Additional Features
- User profile management
- Document history and search
- Advanced filtering and sorting
- Batch document processing
- Export to multiple formats (PDF, Word, JSON)
- Collaborative features (sharing, comments)

## License

This project is for demonstration purposes.

## Support

For questions or issues, please contact your development team.
