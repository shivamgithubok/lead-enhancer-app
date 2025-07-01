# Company Search Integration

This document describes the new company search functionality that integrates with the Hunter API to find and display company emails.

## Features Added

### 🔍 **Company Search Component**
- **Location**: `src/components/CompanySearch.jsx`
- **Functionality**: Search for companies by domain and retrieve email data
- **API Integration**: Connects to Hunter API via backend

### 📊 **Enhanced Lead Table**
- **New Columns**: Email and Email Score columns added
- **Visual Indicators**: 
  - Email scores displayed as colored badges (Green: 80%+, Yellow: 60%+, Orange: 40%+, Red: <40%)
  - Search results highlighted with blue background
  - Email addresses highlighted in gold

### 🎨 **UI Improvements**
- **Loading States**: Spinning animation during search
- **Search Results Summary**: Shows number of emails found
- **Reset Button**: Clear search results and return to original data
- **Responsive Design**: Works on different screen sizes

## How to Use

### 1. **Search for a Company**
1. Enter a company domain in the search box (e.g., "google.com", "stripe.com")
2. Click "Search Company" or press Enter
3. Wait for the search to complete
4. Results will appear in the table below

### 2. **View Search Results**
- Search results are highlighted with a light blue background
- Email addresses are displayed in the "Email" column
- Email confidence scores are shown as colored badges
- Source is marked as "Hunter API"

### 3. **Reset Results**
- Click the "Reset" button to clear search results
- Returns to the original mock data

## API Endpoints Used

### Backend Integration
- `GET /hunter/domain-search?domain={domain}` - Search for emails in a domain
- `GET /leads/enriched` - Get enriched leads with email data

### Frontend Features
- Real-time search with loading indicators
- Error handling for failed searches
- Automatic data transformation for table display

## Example Usage

```javascript
// Search for Google emails
// Enter: google.com
// Result: Multiple email addresses with confidence scores

// Search for Stripe emails  
// Enter: stripe.com
// Result: Company emails with source information
```

## Technical Details

### Data Flow
1. User enters domain in search box
2. Frontend calls backend Hunter API endpoint
3. Backend queries Hunter API for domain emails
4. Results are transformed to match table format
5. Data is displayed in the table with visual enhancements

### Error Handling
- Network errors are caught and logged
- Empty results are handled gracefully
- Loading states prevent multiple simultaneous requests

### Styling
- Consistent with existing dark theme
- Color-coded email scores for quick assessment
- Responsive design for mobile compatibility

## Files Modified

- `src/components/CompanySearch.jsx` - New search component
- `src/components/LeadTable.jsx` - Enhanced table with search integration
- `src/style/global.css` - Added spinning animation CSS

## Dependencies

- `react-icons` - For search and loading icons
- `fetch` API - For backend communication

## Notes

- Search results are temporary and don't persist on page refresh
- Email scores help assess data quality
- Multiple searches will replace previous results
- Reset button clears all search results 