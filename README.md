# NutriTrack - Full-Featured Nutrition Tracker

A comprehensive, responsive web application for tracking daily calorie and macronutrient intake. Built with vanilla HTML, CSS, and JavaScript with a modular architecture.

## 🌟 Features

### Core Functionality
- **Meal Entry Form**: Add meals with food name, quantity, calories, protein, carbs, and fat
- **Dynamic Dashboard**: Real-time summary cards showing daily progress
- **Smart Goal Setting**: Set and update daily nutrition goals via modal
- **Data Persistence**: LocalStorage support for data persistence between sessions
- **Responsive Design**: Mobile-first design with collapsible navigation

### Advanced Features
- **Auto-Calculation**: Automatically calculate calories from macronutrients
- **Progress Tracking**: Visual progress bars for each nutrition category
- **Data Export**: Export all nutrition data as JSON file
- **History View**: View nutrition data for any specific date
- **Form Validation**: Real-time validation with error messages
- **Keyboard Shortcuts**: Quick navigation and actions

### User Experience
- **Smooth Animations**: Fade-in effects and smooth transitions
- **Fixed CTA Button**: Quick access to add meals from anywhere
- **Responsive Navigation**: Hamburger menu for mobile devices
- **Loading States**: Visual feedback during operations
- **Success/Error Messages**: Clear feedback for user actions

## 🚀 Getting Started

### Prerequisites
- Modern web browser with JavaScript enabled
- No additional dependencies required

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. Start tracking your nutrition!

### File Structure
```
Summer project/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── js/
│   ├── storage.js      # LocalStorage management
│   ├── nutrition-tracker.js  # Core nutrition logic
│   ├── ui.js           # User interface management
│   └── app.js          # Main application controller
└── README.md           # This file
```

## 📱 Usage

### Adding Meals
1. Navigate to "Add Meal" section or click the "+ Add Meal" button
2. Fill in the food details:
   - **Food Name**: Name of the food item
   - **Meal Time**: Breakfast, Lunch, Dinner, or Snack
   - **Quantity**: Amount in grams
   - **Calories**: Total calories
   - **Protein**: Protein content in grams
   - **Carbs**: Carbohydrate content in grams
   - **Fat**: Fat content in grams
3. Click "Add Meal" to save

### Setting Goals
1. Go to the "Goals" section
2. Click "Update Goals" button
3. Enter your daily targets for:
   - Calories
   - Protein (grams)
   - Carbs (grams)
   - Fat (grams)
4. Click "Save Goals"

### Viewing History
1. Navigate to "History" section
2. Select a date using the date picker
3. View nutrition data for that specific date

### Exporting Data
1. Go to "History" section
2. Click "Export Data" button
3. Download your nutrition data as JSON file

## 🎯 Features in Detail

### Dashboard
- **Summary Cards**: Visual cards showing daily intake vs goals
- **Progress Bars**: Real-time progress indicators
- **Meals Table**: List of all meals logged today
- **Empty State**: Helpful message when no meals are logged

### Meal Management
- **Form Validation**: Ensures all required fields are filled
- **Auto-Calculation**: Automatically calculates calories from macros
- **Meal Categories**: Organize meals by time of day
- **Delete Functionality**: Remove meals from the table

### Data Persistence
- **LocalStorage**: All data saved locally in browser
- **Automatic Saving**: Data saved immediately when changes are made
- **Data Export**: Backup your data as JSON file
- **Storage Monitoring**: Tracks storage usage

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Responsive layout for tablets
- **Desktop Experience**: Full-featured desktop interface
- **Touch-Friendly**: Large touch targets for mobile

## ⌨️ Keyboard Shortcuts

- **Ctrl/Cmd + N**: Add new meal
- **Ctrl/Cmd + G**: Open goals modal
- **Ctrl/Cmd + H**: Go to history section
- **Escape**: Close modal

## 🔧 Technical Details

### Architecture
- **Modular Design**: Separated concerns with dedicated modules
- **Event-Driven**: Responsive to user interactions
- **Error Handling**: Comprehensive error handling throughout
- **Performance Optimized**: Efficient data management and rendering

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Storage
- **LocalStorage**: Primary data storage
- **JSON Format**: Structured data storage
- **5MB Limit**: Typical localStorage capacity
- **Data Validation**: Ensures data integrity

## 🎨 Design Features

### Visual Design
- **Modern UI**: Clean, professional interface
- **Gradient Backgrounds**: Eye-catching color schemes
- **Card-Based Layout**: Organized information display
- **Consistent Spacing**: Professional typography and spacing

### Animations
- **Fade-In Effects**: Smooth element transitions
- **Hover Effects**: Interactive feedback
- **Progress Animations**: Dynamic progress bars
- **Modal Transitions**: Smooth modal open/close

### Color Scheme
- **Primary**: Purple gradient (#667eea to #764ba2)
- **Accent**: Gold (#ffd700)
- **Success**: Green (#28a745)
- **Error**: Red (#dc3545)
- **Neutral**: Gray scale (#f8f9fa, #e9ecef, #6c757d)

## 🚀 Future Enhancements

### Planned Features
- **Food Database**: Pre-populated food items
- **Barcode Scanner**: Scan food packages
- **Photo Recognition**: Identify foods from photos
- **Social Features**: Share progress with friends
- **Cloud Sync**: Backup data to cloud storage
- **Analytics**: Detailed nutrition insights and trends
- **Meal Planning**: Plan meals in advance
- **Recipe Integration**: Import recipes and calculate nutrition

### Technical Improvements
- **PWA Support**: Progressive Web App capabilities
- **Offline Mode**: Enhanced offline functionality
- **Data Visualization**: Charts and graphs
- **API Integration**: Connect to nutrition databases
- **Push Notifications**: Reminder notifications

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with vanilla web technologies
- Inspired by modern nutrition tracking apps
- Designed for simplicity and ease of use

---

**NutriTrack** - Your personal nutrition companion for a healthier lifestyle! 🥗💪
