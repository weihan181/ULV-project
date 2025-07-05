// Main Application Module - Initializes and coordinates all components
class NutritionApp {
    constructor() {
        this.isInitialized = false;
        this.init();
    }

    // Initialize the application
    init() {
        try {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    this.setupApplication();
                });
            } else {
                this.setupApplication();
            }
        } catch (error) {
            console.error('Failed to initialize application:', error);
            this.showErrorMessage('Failed to initialize application. Please refresh the page.');
        }
    }

    // Setup the complete application
    setupApplication() {
        try {
            // Initialize core components
            this.initializeComponents();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Setup form handling
            this.setupFormHandling();
            
            // Setup history functionality
            this.setupHistoryFunctionality();
            
            // Initialize data
            this.initializeData();
            
            // Setup additional UI features
            this.setupAdditionalFeatures();
            
            this.isInitialized = true;
            console.log('Nutrition Tracker initialized successfully');
            
        } catch (error) {
            console.error('Error setting up application:', error);
            this.showErrorMessage('Error setting up application. Please refresh the page.');
        }
    }

    // Initialize core components
    initializeComponents() {
        // Initialize nutrition tracker
        nutritionTracker.init();
        
        // Initialize food database with autocomplete
        foodDatabase.init();
        
        // Initialize UI manager
        ui.setupFormValidation();
        ui.setupExportData();
        ui.setupDatePicker();
        ui.initRippleEffects();
        
        // Set up history table for today
        ui.updateHistoryTable(nutritionTracker.getCurrentDate());
    }

    // Setup event listeners
    setupEventListeners() {
        // Meal form submission
        const mealForm = document.getElementById('meal-form');
        if (mealForm) {
            mealForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleMealFormSubmission();
            });
        }

        // Export data button
        const exportBtn = document.getElementById('export-data');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.handleExportData();
            });
        }

        // Date picker for history
        const datePicker = document.getElementById('history-date');
        if (datePicker) {
            datePicker.addEventListener('change', (e) => {
                ui.updateHistoryTable(e.target.value);
            });
        }

        // Window resize handler
        window.addEventListener('resize', () => {
            this.handleWindowResize();
        });

        // Before unload handler for data persistence
        window.addEventListener('beforeunload', () => {
            this.handleBeforeUnload();
        });
    }

    // Setup form handling
    setupFormHandling() {
        // Auto-calculate calories based on macros (optional feature)
        this.setupAutoCalculation();
        
        // Form validation
        this.setupFormValidation();
        
        // Form reset handling
        this.setupFormReset();
    }

    // Setup auto-calculation feature
    setupAutoCalculation() {
        const proteinInput = document.getElementById('protein');
        const carbsInput = document.getElementById('carbs');
        const fatInput = document.getElementById('fat');
        const caloriesInput = document.getElementById('calories');

        if (proteinInput && carbsInput && fatInput && caloriesInput) {
            const calculateCalories = () => {
                const protein = parseFloat(proteinInput.value) || 0;
                const carbs = parseFloat(carbsInput.value) || 0;
                const fat = parseFloat(fatInput.value) || 0;
                
                // Calculate calories: 4 cal/g for protein and carbs, 9 cal/g for fat
                const calculatedCalories = (protein * 4) + (carbs * 4) + (fat * 9);
                
                // Only auto-fill if calories field is empty or user hasn't manually entered a value
                if (!caloriesInput.value || caloriesInput.dataset.autoCalculated === 'true') {
                    caloriesInput.value = Math.round(calculatedCalories);
                    caloriesInput.dataset.autoCalculated = 'true';
                }
            };

            proteinInput.addEventListener('input', calculateCalories);
            carbsInput.addEventListener('input', calculateCalories);
            fatInput.addEventListener('input', calculateCalories);
            
            // Clear auto-calculated flag when user manually enters calories
            caloriesInput.addEventListener('input', () => {
                caloriesInput.dataset.autoCalculated = 'false';
            });
        }
    }

    // Setup form validation
    setupFormValidation() {
        const form = document.getElementById('meal-form');
        if (!form) return;

        const inputs = form.querySelectorAll('input[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                ui.validateInput(input);
            });
            
            input.addEventListener('input', () => {
                // Clear error styling when user starts typing
                input.classList.remove('error');
                ui.hideFieldError(input);
            });
        });
    }

    // Setup form reset
    setupFormReset() {
        const form = document.getElementById('meal-form');
        const resetBtn = form?.querySelector('button[type="reset"]');
        
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                // Clear any error styling
                form.querySelectorAll('.error').forEach(input => {
                    input.classList.remove('error');
                });
                
                // Clear error messages
                form.querySelectorAll('.field-error').forEach(error => {
                    error.remove();
                });
                
                // Reset auto-calculation flag
                const caloriesInput = document.getElementById('calories');
                if (caloriesInput) {
                    caloriesInput.dataset.autoCalculated = 'false';
                }
                
                // Clear currently selected food from database
                if (foodDatabase) {
                    foodDatabase.currentlySelectedFood = null;
                }
                
                // Clear placeholders
                const nutritionInputs = ['calories', 'protein', 'carbs', 'fat'];
                nutritionInputs.forEach(fieldId => {
                    const input = document.getElementById(fieldId);
                    if (input) {
                        input.placeholder = '';
                    }
                });
            });
        }
    }

    // Setup history functionality
    setupHistoryFunctionality() {
        // Set default date to today
        const datePicker = document.getElementById('history-date');
        if (datePicker) {
            datePicker.value = nutritionTracker.getCurrentDate();
        }
    }

    // Initialize data
    initializeData() {
        // Load and display current data
        nutritionTracker.refresh();
        
        // Check if this is first time user
        this.checkFirstTimeUser();
        
        // Load storage info
        this.displayStorageInfo();
    }

    // Check if this is first time user
    checkFirstTimeUser() {
        const meals = storage.loadMeals();
        const hasData = Object.keys(meals).length > 0;
        
        if (!hasData) {
            this.showWelcomeMessage();
        }
    }

    // Show welcome message for first time users
    showWelcomeMessage() {
        const welcomeMessage = `
            <div class="message success">
                <h3>Welcome to NutriTrack! 🎉</h3>
                <p>Start tracking your nutrition by adding your first meal. You can set your daily goals anytime from the Goals section.</p>
            </div>
        `;
        
        const main = document.querySelector('main');
        if (main) {
            main.insertAdjacentHTML('afterbegin', welcomeMessage);
            
            // Auto-remove after 10 seconds
            setTimeout(() => {
                const message = main.querySelector('.message');
                if (message) {
                    message.remove();
                }
            }, 10000);
        }
    }

    // Display storage information
    displayStorageInfo() {
        const storageInfo = storage.getStorageInfo();
        console.log('Storage usage:', storageInfo);
        
        // Warn if storage is getting full
        if (storageInfo.percentage > 80) {
            this.showMessage('Storage is getting full. Consider exporting your data.', 'warning');
        }
    }

    // Setup additional features
    setupAdditionalFeatures() {
        // Keyboard shortcuts
        this.setupKeyboardShortcuts();
        
        // Offline support indicator
        this.setupOfflineSupport();
        
        // Performance monitoring
        this.setupPerformanceMonitoring();
    }

    // Setup keyboard shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + N to add new meal
            if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
                e.preventDefault();
                ui.navigateToSection('add-meal');
                setTimeout(() => {
                    document.getElementById('food-name')?.focus();
                }, 500);
            }
            
            // Ctrl/Cmd + G to open goals
            if ((e.ctrlKey || e.metaKey) && e.key === 'g') {
                e.preventDefault();
                ui.openGoalsModal();
            }
            
            // Ctrl/Cmd + H to go to history
            if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
                e.preventDefault();
                ui.navigateToSection('history');
            }
        });
    }

    // Setup offline support
    setupOfflineSupport() {
        window.addEventListener('online', () => {
            this.showMessage('You are back online!', 'success');
        });
        
        window.addEventListener('offline', () => {
            this.showMessage('You are offline. Data will be saved locally.', 'warning');
        });
    }

    // Setup performance monitoring
    setupPerformanceMonitoring() {
        // Monitor app performance
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                console.log(`App loaded in ${loadTime}ms`);
            });
        }
    }

    // Handle meal form submission
    handleMealFormSubmission() {
        const form = document.getElementById('meal-form');
        const formData = new FormData(form);
        
        const mealData = {
            foodName: formData.get('foodName'),
            mealTime: formData.get('mealTime'),
            quantity: formData.get('quantity'),
            calories: formData.get('calories'),
            protein: formData.get('protein'),
            carbs: formData.get('carbs'),
            fat: formData.get('fat')
        };

        // Validate all fields
        const inputs = form.querySelectorAll('input[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!ui.validateInput(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            this.showMessage('Please fix the errors in the form.', 'error');
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        ui.showLoading(submitBtn);

        // Add meal
        setTimeout(() => {
            if (nutritionTracker.addMeal(mealData)) {
                // Save custom food to database if it's not already there
                const existingFood = foodDatabase.getFoodByName(mealData.foodName);
                if (!existingFood) {
                    foodDatabase.addCustomFood(mealData);
                }
                
                this.showMessage('Meal added successfully!', 'success');
                form.reset();
                
                // Reset auto-calculation flag
                const caloriesInput = document.getElementById('calories');
                if (caloriesInput) {
                    caloriesInput.dataset.autoCalculated = 'false';
                }
                
                // Clear currently selected food from database
                if (foodDatabase) {
                    foodDatabase.currentlySelectedFood = null;
                }
                
                // Navigate to dashboard
                ui.navigateToSection('dashboard');
            } else {
                this.showMessage('Failed to add meal. Please try again.', 'error');
            }
            
            ui.hideLoading(submitBtn);
        }, 500);
    }

    // Handle export data
    handleExportData() {
        try {
            const data = storage.exportData();
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `nutritrack-data-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.showMessage('Data exported successfully!', 'success');
        } catch (error) {
            console.error('Export failed:', error);
            this.showMessage('Failed to export data. Please try again.', 'error');
        }
    }

    // Handle window resize
    handleWindowResize() {
        // Debounce resize events
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            // Update any responsive elements if needed
            console.log('Window resized to:', window.innerWidth, 'x', window.innerHeight);
        }, 250);
    }

    // Handle before unload
    handleBeforeUnload() {
        // Ensure data is saved
        try {
            // Force save any pending data
            const meals = storage.loadMeals();
            storage.saveMeals(meals);
        } catch (error) {
            console.error('Error saving data before unload:', error);
        }
    }

    // Show message
    showMessage(message, type = 'info') {
        ui.showMessage(message, type);
    }

    // Show error message
    showErrorMessage(message) {
        this.showMessage(message, 'error');
    }

    // Get app status
    getStatus() {
        return {
            initialized: this.isInitialized,
            currentDate: nutritionTracker.getCurrentDate(),
            totalMeals: nutritionTracker.meals.length,
            goals: nutritionTracker.goals,
            storageInfo: storage.getStorageInfo()
        };
    }

    // Reset application (for testing/development)
    reset() {
        if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
            storage.clearAllData();
            location.reload();
        }
    }
}

// Initialize the application when DOM is ready
let app;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new NutritionApp();
    });
} else {
    app = new NutritionApp();
}

// Make app globally accessible for debugging
window.nutritionApp = app; 