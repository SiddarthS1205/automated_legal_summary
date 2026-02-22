# Testing Checklist - Legal Document Summarization Frontend

## Manual Testing Guide

This checklist helps verify that all features of the application are working correctly.

### Prerequisites
- [ ] Local web server is running
- [ ] Browser is open to the application URL
- [ ] Browser console is open (F12) to check for errors

---

## 1. Entry Point & Login Flow

### Index Page (index.html)
- [ ] Page loads with LegalDoc AI logo
- [ ] Loading animation displays
- [ ] Automatically redirects to login page after ~1.5 seconds

### Login Page (pages/login.html)
- [ ] Login form displays with email and password fields
- [ ] Professional blue and white color scheme is visible
- [ ] Form validation works:
  - [ ] Empty email shows error
  - [ ] Empty password shows error
  - [ ] Both empty shows error
- [ ] Valid credentials (any non-empty email/password) navigate to dashboard
- [ ] Error message displays inline without page reload
- [ ] Page is responsive on tablet size (768px-1023px)

---

## 2. Dashboard (pages/dashboard.html)

### Layout & Navigation
- [ ] Sidebar displays on the left with logo
- [ ] Navigation menu shows: Dashboard, Upload Contract, Compare Documents, Logout
- [ ] Dashboard menu item is highlighted/active
- [ ] Welcome message displays user's email (before @ symbol)

### Statistics Cards
- [ ] Three stat cards display: Total Documents, Processed, Flagged Risks
- [ ] Numbers are visible and formatted correctly
- [ ] Cards have hover effect (lift up slightly)

### Quick Actions
- [ ] Two action cards display: Upload New Contract, Compare Documents
- [ ] Cards are clickable and navigate to correct pages
- [ ] Cards have hover effect

### Responsive Design
- [ ] Sidebar adjusts width on tablet (768px-1023px)
- [ ] Layout remains usable on smaller screens
- [ ] All text is readable

---

## 3. Upload Page (pages/upload.html)

### Layout
- [ ] Back to Dashboard link works
- [ ] Upload area displays with dashed border
- [ ] Upload icon and instructions are visible

### Drag and Drop
- [ ] Dragging a file over the upload area shows visual feedback (border color change)
- [ ] Dragging away removes the visual feedback
- [ ] Dropping a PDF file accepts it and shows file name
- [ ] Dropping a DOCX file accepts it and shows file name
- [ ] Dropping an invalid file type (e.g., .txt, .jpg) shows error message

### File Selection
- [ ] Clicking upload area opens file browser
- [ ] Selecting a valid file shows file name and size
- [ ] "Generate Summary" button appears after file selection
- [ ] Remove file button (X) clears the selection

### Processing
- [ ] Clicking "Generate Summary" shows AI processing animation
- [ ] Multi-stage processing displays with 5 stages:
  - [ ] Stage 1: Reading document structure (📄)
  - [ ] Stage 2: Extracting key clauses (🔍)
  - [ ] Stage 3: Detecting risk deviations (⚠️)
  - [ ] Stage 4: Generating summary report (📊)
  - [ ] Stage 5: Finalizing analysis (✨)
- [ ] Each stage shows ⏳ while pending
- [ ] Active stage has blue background highlight
- [ ] Completed stages show ✅ with green background
- [ ] Progress bar animates from 0% to 100%
- [ ] Progress percentage text updates (20%, 40%, 60%, 80%, 100%)
- [ ] Loading spinner rotates at top
- [ ] After ~3 seconds, redirects to summary page

### Error Handling
- [ ] File size over 10MB shows error (if tested)
- [ ] Invalid file type shows clear error message
- [ ] Error messages are user-friendly

---

## 4. Summary Page (pages/summary.html)

### Layout
- [ ] Page title "Document Summary" displays
- [ ] Download Summary button is visible in header

### Executive Summary Section
- [ ] "Executive Summary" heading displays
- [ ] Summary text is readable and formatted
- [ ] Text wraps properly

### Extracted Clauses Section
- [ ] "Extracted Clauses" heading displays
- [ ] Clause cards display in a grid layout
- [ ] Each card shows:
  - [ ] Clause title
  - [ ] Clause text
  - [ ] Clause type tag
- [ ] Cards have proper spacing and shadows

### Risk Flags Section
- [ ] "Risk Flags" heading displays
- [ ] Risk items display with proper styling
- [ ] High risk items have red highlighting
- [ ] Medium risk items have yellow highlighting
- [ ] Each risk shows:
  - [ ] Warning icon
  - [ ] Risk title
  - [ ] Risk description
  - [ ] Recommendation

### Navigation
- [ ] "Back to Dashboard" button works
- [ ] Download button triggers file download (check browser downloads)

### Responsive Design
- [ ] Layout adapts on tablet size
- [ ] All content remains readable
- [ ] Cards stack properly on smaller screens

---

## 5. Comparison Page (pages/comparison.html)

### Layout
- [ ] Sidebar displays with navigation
- [ ] "Compare Documents" is highlighted in sidebar
- [ ] Page title and subtitle display
- [ ] Two upload boxes display side by side

### File Upload
- [ ] Both upload boxes accept drag and drop
- [ ] Clicking upload box opens file browser
- [ ] Valid files show success message with checkmark
- [ ] Invalid files show error message
- [ ] Upload boxes show visual feedback on drag over

### Compare Button
- [ ] Compare button is disabled initially
- [ ] Button enables only when both files are selected
- [ ] Button styling changes when enabled

### Processing
- [ ] Clicking "Compare Documents" shows AI comparison animation
- [ ] Multi-stage comparison displays with 5 stages:
  - [ ] Stage 1: Analyzing document structures (📄)
  - [ ] Stage 2: Identifying clause differences (🔍)
  - [ ] Stage 3: Detecting conflicts (⚖️)
  - [ ] Stage 4: Assessing risk levels (⚠️)
  - [ ] Stage 5: Generating comparison report (📊)
- [ ] Each stage shows ⏳ while pending
- [ ] Active stage has blue background highlight
- [ ] Completed stages show ✅ with green background
- [ ] Progress bar animates from 0% to 100%
- [ ] Progress percentage text updates (20%, 40%, 60%, 80%, 100%)
- [ ] Loading spinner rotates at top
- [ ] After ~3 seconds, results appear

### Comparison Results
- [ ] "Comparison Results" heading displays

#### Sticky Summary Bar
- [ ] Sticky summary bar displays at top of results
- [ ] Bar stays fixed when scrolling down the page
- [ ] Summary statistics show:
  - [ ] Total Changes (correct count)
  - [ ] High Risk count (in red)
  - [ ] Conflicts count (in yellow)
- [ ] Color legend displays on right side:
  - [ ] Risk levels: 🔴 High, 🟠 Medium, 🟢 Low
  - [ ] Change types: 🟡 Modified, 🟢 Added, 🔴 Removed

#### Filter System
- [ ] Filter dropdown displays with 🔍 icon
- [ ] Filter options available:
  - [ ] All Changes (default)
  - [ ] High Risk Only
  - [ ] Conflicts Only
  - [ ] Modified Only
  - [ ] Added Only
  - [ ] Removed Only
- [ ] Selecting each filter shows/hides appropriate rows
- [ ] Filter count updates: "Showing X of Y changes"
- [ ] Filtered rows hide smoothly (not removed from DOM)

#### Comparison Table
- [ ] Comparison table displays with columns:
  - [ ] Clause
  - [ ] Original
  - [ ] Revised
  - [ ] Risk Level
- [ ] Conflict rows have red background
- [ ] Risk level badges show correct colors:
  - [ ] High = red
  - [ ] Medium = yellow
  - [ ] Low = green
  - [ ] None = gray
- [ ] Change type indicators display (modified, added, removed)

### Responsive Design
- [ ] Upload boxes stack vertically on tablet
- [ ] Table is scrollable horizontally on small screens
- [ ] Sidebar adjusts width appropriately

---

## 6. Error Page (pages/error.html)

### Access Error Page
To test, you can:
1. Manually navigate to `pages/error.html`
2. Or modify code temporarily to trigger an error

### Layout
- [ ] Error page displays with gradient background
- [ ] Error icon (⚠️) displays and pulses
- [ ] Error message displays
- [ ] Error hint/guidance displays
- [ ] Two buttons display: "Go Back" and "Return to Dashboard"

### Functionality
- [ ] "Go Back" button returns to previous page
- [ ] "Return to Dashboard" button navigates to dashboard
- [ ] Page is centered and responsive

---

## 7. Session Management

### Protected Pages
- [ ] Accessing dashboard without login redirects to login
- [ ] Accessing upload without login redirects to login
- [ ] Accessing summary without login redirects to login
- [ ] Accessing comparison without login redirects to login

### Logout
- [ ] Clicking "Logout" in sidebar clears session
- [ ] After logout, redirects to login page
- [ ] Cannot access protected pages after logout without logging in again

### Session Persistence
- [ ] After logging in, refresh the page - should stay logged in
- [ ] User name persists across page navigation
- [ ] Dashboard stats persist (if implemented)

---

## 8. Cross-Browser Testing

Test in multiple browsers:

### Chrome
- [ ] All features work
- [ ] No console errors
- [ ] Styling is correct

### Firefox
- [ ] All features work
- [ ] No console errors
- [ ] Styling is correct

### Safari (if available)
- [ ] All features work
- [ ] No console errors
- [ ] Styling is correct

### Edge
- [ ] All features work
- [ ] No console errors
- [ ] Styling is correct

---

## 9. Responsive Design Testing

### Desktop (1024px+)
- [ ] Full sidebar displays
- [ ] All content is properly spaced
- [ ] No horizontal scrolling
- [ ] Cards display in grid layout

### Tablet (768px-1023px)
- [ ] Sidebar adjusts width
- [ ] Content remains readable
- [ ] Touch targets are adequate (44px minimum)
- [ ] Grid layouts adjust appropriately

### Mobile (below 768px) - if supported
- [ ] Sidebar collapses or adjusts
- [ ] Content stacks vertically
- [ ] Text remains readable
- [ ] Buttons are touch-friendly

---

## 10. Accessibility Testing

### Keyboard Navigation
- [ ] Tab key moves through interactive elements
- [ ] Enter key submits forms
- [ ] Focus indicators are visible
- [ ] All buttons are keyboard accessible

### Screen Reader (if available)
- [ ] Page titles are announced
- [ ] Form labels are associated with inputs
- [ ] Error messages are announced
- [ ] Button purposes are clear

### Visual Accessibility
- [ ] Text has sufficient contrast (4.5:1 minimum)
- [ ] Color is not the only indicator (icons accompany colors)
- [ ] Text is resizable without breaking layout
- [ ] Focus indicators are visible

---

## 11. Performance Testing

### Page Load Times
- [ ] Index page loads quickly
- [ ] Login page loads quickly
- [ ] Dashboard loads quickly
- [ ] No excessive network requests

### Animations
- [ ] Loading spinners rotate smoothly
- [ ] AI processing stages activate sequentially
- [ ] Progress bars fill smoothly from 0% to 100%
- [ ] Stage transitions are smooth (active → completed)
- [ ] Checkmarks appear when stages complete
- [ ] Transitions are smooth (not janky)
- [ ] Hover effects respond immediately
- [ ] No layout shifts during loading

### Data Loading
- [ ] Dummy data loads successfully
- [ ] No JSON parsing errors in console
- [ ] Simulated delays feel realistic (2-4 seconds)

---

## 12. Error Handling

### Network Errors (simulate by going offline)
- [ ] Appropriate error messages display
- [ ] User is guided on what to do
- [ ] Application doesn't crash

### Invalid Data
- [ ] Empty form submissions show errors
- [ ] Invalid file types show errors
- [ ] Missing data shows appropriate fallbacks

### Console Errors
- [ ] No JavaScript errors in console
- [ ] No 404 errors for missing resources
- [ ] No CSS errors

---

## Common Issues & Solutions

### Issue: Page doesn't load
- **Solution**: Ensure web server is running and you're accessing the correct URL

### Issue: Styles not applying
- **Solution**: Check that CSS files are linked correctly with relative paths

### Issue: JavaScript not working
- **Solution**: Check browser console for errors, ensure scripts are loaded

### Issue: Session not persisting
- **Solution**: Check that localStorage is enabled in browser settings

### Issue: Files not uploading
- **Solution**: This is a demo - files are validated but not actually uploaded

---

## Test Results Summary

**Date Tested**: _______________  
**Tested By**: _______________  
**Browser**: _______________  
**Screen Size**: _______________  

**Overall Status**: ☐ Pass  ☐ Fail  ☐ Needs Review

**Notes**:
_____________________________________________
_____________________________________________
_____________________________________________

**Issues Found**:
1. _____________________________________________
2. _____________________________________________
3. _____________________________________________

**Recommendations**:
1. _____________________________________________
2. _____________________________________________
3. _____________________________________________
