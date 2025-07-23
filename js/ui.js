// UI Module - Handles user interface interactions and responsive design
class UIManager {
    constructor() {
        this.currentSection = 'dashboard';
        this.init();
    }

    // Initialize UI components
    init() {
        this.setupNavigation();
        this.setupModal();
        this.setupResponsiveMenu();
        this.setupScrollEffects();
        this.setupAnimations();
        this.setupQuickAdd();
        this.setupGoalsChart();
        this.showMotivationTip();
    }

    // Show a random motivational tip in the Daily Goals section
    showMotivationTip() {
        const tips = [
            "Small changes add up to big results!",
            "Consistency is the key to success.",
            "You’re one meal closer to your goal!",
            "Progress, not perfection.",
            "Fuel your body, feed your goals.",
            "Every healthy choice counts.",
            "Stay hydrated and keep moving!",
            "Believe in yourself and all that you are.",
            "Healthy habits create a healthy life.",
            "You’ve got this! Keep going."
        ];
        const tip = tips[Math.floor(Math.random() * tips.length)];
        const tipDiv = document.getElementById('goals-motivation-tip');
        if (tipDiv) tipDiv.textContent = tip;
    }

    // Setup navigation
    setupNavigation() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.navigateToSection(targetId);
            });
        });

        // Update active navigation link
        this.updateActiveNavLink();
    }

    // Navigate to a specific section
    navigateToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            this.currentSection = sectionId;
            this.updateActiveNavLink();
        }
    }

    // Update active navigation link
    updateActiveNavLink() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${this.currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Setup modal functionality
    setupModal() {
        const modal = document.getElementById('goals-modal');
        const openBtn = document.getElementById('update-goals-btn');
        const closeBtn = document.getElementById('close-goals-modal');
        const cancelBtn = document.getElementById('cancel-goals');
        const goalsForm = document.getElementById('goals-form');
        const calculateBtn = document.getElementById('calculate-goals-btn');

        // Open modal
        openBtn.addEventListener('click', () => {
            this.openGoalsModal();
        });

        // Close modal
        closeBtn.addEventListener('click', () => {
            this.closeGoalsModal();
        });

        cancelBtn.addEventListener('click', () => {
            this.closeGoalsModal();
        });

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeGoalsModal();
            }
        });

        // Handle form submission
        goalsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleGoalsSubmit();
        });

        // Calculate recommended goals
        calculateBtn.addEventListener('click', () => {
            this.calculateRecommendedGoals();
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                this.closeGoalsModal();
            }
        });
    }

    // Open goals modal
    openGoalsModal() {
        const modal = document.getElementById('goals-modal');
        const caloriesInput = document.getElementById('modal-calories');
        const proteinInput = document.getElementById('modal-protein');
        const carbsInput = document.getElementById('modal-carbs');
        const fatInput = document.getElementById('modal-fat');
        const weightInput = document.getElementById('modal-weight');
        const heightInput = document.getElementById('modal-height');

        // Populate form with current goals
        caloriesInput.value = nutritionTracker.goals.calories;
        proteinInput.value = nutritionTracker.goals.protein;
        carbsInput.value = nutritionTracker.goals.carbs;
        fatInput.value = nutritionTracker.goals.fat;
        weightInput.value = nutritionTracker.goals.weight;
        heightInput.value = nutritionTracker.goals.height;

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Focus first input
        setTimeout(() => weightInput.focus(), 100);
    }

    // Close goals modal
    closeGoalsModal() {
        const modal = document.getElementById('goals-modal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Handle goals form submission
    handleGoalsSubmit() {
        const formData = new FormData(document.getElementById('goals-form'));
        const newGoals = {
            calories: parseInt(formData.get('calories')),
            protein: parseInt(formData.get('protein')),
            carbs: parseInt(formData.get('carbs')),
            fat: parseInt(formData.get('fat')),
            weight: parseInt(formData.get('weight')),
            height: parseInt(formData.get('height'))
        };

        if (nutritionTracker.updateGoals(newGoals)) {
            // Save last updated timestamp
            localStorage.setItem('nutritrack_goals_last_updated', Date.now().toString());
            this.showMessage('Goals updated successfully!', 'success');
            this.closeGoalsModal();
            this.refreshGoalsChart(); // Update chart after goals are updated
        } else {
            this.showMessage('Failed to update goals. Please try again.', 'error');
        }
    }

    // Calculate recommended goals based on weight and height
    calculateRecommendedGoals() {
        const weight = parseFloat(document.getElementById('modal-weight').value);
        const height = parseFloat(document.getElementById('modal-height').value);
        // Use a simple formula: Calories = 24 * weight (BMR estimate), macros: 20% protein, 50% carbs, 30% fat
        if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
            this.showMessage('Please enter valid weight and height to calculate recommendations.', 'error');
            return;
        }
        // Estimate BMR (simple): 24 * weight
        const calories = Math.round(24 * weight);
        const protein = Math.round((0.20 * calories) / 4); // 4 kcal/g
        const carbs = Math.round((0.50 * calories) / 4);   // 4 kcal/g
        const fat = Math.round((0.30 * calories) / 9);     // 9 kcal/g
        document.getElementById('modal-calories').value = calories;
        document.getElementById('modal-protein').value = protein;
        document.getElementById('modal-carbs').value = carbs;
        document.getElementById('modal-fat').value = fat;
        this.showMessage('Recommended goals calculated! Adjust as needed before saving.', 'success');
    }

    // Setup responsive menu
    setupResponsiveMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Setup scroll effects
    setupScrollEffects() {
        // Header background change on scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(102, 126, 234, 0.95)';
            } else {
                header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            }
        });

        // Update active section based on scroll position
        window.addEventListener('scroll', () => {
            this.updateActiveSectionOnScroll();
        });
    }

    // Update active section based on scroll position
    updateActiveSectionOnScroll() {
        const sections = ['dashboard', 'add-meal', 'goals', 'history'];
        const scrollPosition = window.scrollY + 100;

        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    this.currentSection = sectionId;
                    this.updateActiveNavLink();
                }
            }
        });
    }

    // Setup animations
    setupAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.summary-card, .feature-card, .testimonial-card').forEach(el => {
            observer.observe(el);
        });
    }

    // Setup quick add functionality
    setupQuickAdd() {
        const quickAddBtn = document.getElementById('quick-add-btn');
        
        quickAddBtn.addEventListener('click', () => {
            this.navigateToSection('add-meal');
            // Focus on the first input
            setTimeout(() => {
                document.getElementById('food-name').focus();
            }, 500);
        });
    }

    // Setup the mini chart in Daily Goals
    setupGoalsChart() {
        this.goalsChart = null;
        this.currentMacro = 'calories';
        this.renderGoalsChart('calories');
        // Toggle buttons
        document.querySelectorAll('.goals-chart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.goals-chart-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const macro = btn.getAttribute('data-macro');
                this.currentMacro = macro;
                this.renderGoalsChart(macro);
            });
        });
    }

    // Render the chart for the selected macro
    renderGoalsChart(macro) {
        const ctx = document.getElementById('goalsChart').getContext('2d');
        const days = 7;
        const labels = [];
        const data = [];
        const today = new Date();
        for (let i = days - 1; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            labels.push(d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }));
            const totals = nutritionTracker.getTotalsForDate(dateStr);
            data.push(Math.round(totals[macro] || 0));
        }
        // Destroy previous chart if exists
        if (this.goalsChart) this.goalsChart.destroy();
        this.goalsChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: macro.charAt(0).toUpperCase() + macro.slice(1),
                    data: data,
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102,126,234,0.08)',
                    pointBackgroundColor: '#764ba2',
                    pointRadius: 4,
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { color: '#666', font: { size: 12 } },
                        grid: { color: '#e9ecef' }
                    },
                    x: {
                        ticks: { color: '#666', font: { size: 12 } },
                        grid: { display: false }
                    }
                }
            }
        });
    }

    // After meals are added/removed or goals updated, update the chart
    refreshGoalsChart() {
        this.renderGoalsChart(this.currentMacro || 'calories');
    }

    // Show message
    showMessage(message, type = 'info') {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;

        // Insert at the top of the main content
        const main = document.querySelector('main');
        main.insertBefore(messageDiv, main.firstChild);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }

    // Show loading state
    showLoading(element) {
        element.classList.add('loading');
    }

    // Hide loading state
    hideLoading(element) {
        element.classList.remove('loading');
    }

    // Update history table
    updateHistoryTable(date) {
        const tbody = document.getElementById('history-tbody');
        const meals = nutritionTracker.getMealsForDate(date);
        const totals = nutritionTracker.getTotalsForDate(date);
        const progress = nutritionTracker.getGoalProgressForDate(date);

        tbody.innerHTML = '';

        if (meals.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="text-center">No data for this date</td></tr>';
            return;
        }

        const row = document.createElement('tr');
        row.className = 'fade-in-up';
        
        const formattedDate = new Date(date).toLocaleDateString();
        const avgProgress = Math.round((progress.calories + progress.protein + progress.carbs + progress.fat) / 4);

        row.innerHTML = `
            <td>${formattedDate}</td>
            <td>${Math.round(totals.calories)}</td>
            <td>${Math.round(totals.protein)}</td>
            <td>${Math.round(totals.carbs)}</td>
            <td>${Math.round(totals.fat)}</td>
            <td>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${avgProgress}%"></div>
                </div>
                <span>${avgProgress}%</span>
            </td>
        `;
        
        tbody.appendChild(row);
    }

    // Export data functionality
    setupExportData() {
        const exportBtn = document.getElementById('export-data');
        
        exportBtn.addEventListener('click', () => {
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
        });
    }

    // Setup date picker for history
    setupDatePicker() {
        const datePicker = document.getElementById('history-date');
        
        // Set default to today
        datePicker.value = nutritionTracker.getCurrentDate();
        
        datePicker.addEventListener('change', (e) => {
            this.updateHistoryTable(e.target.value);
        });
    }

    // Add ripple effect to buttons
    addRippleEffect(element) {
        element.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            const rect = element.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            element.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }

    // Initialize ripple effects
    initRippleEffects() {
        document.querySelectorAll('.btn').forEach(btn => {
            this.addRippleEffect(btn);
        });
    }

    // Handle form validation
    setupFormValidation() {
        const mealForm = document.getElementById('meal-form');
        
        mealForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleMealSubmit();
        });

        // Real-time validation
        const inputs = mealForm.querySelectorAll('input[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateInput(input);
            });
        });
    }

    // Validate input field
    validateInput(input) {
        const value = input.value.trim();
        const fieldName = input.name;
        
        // Remove existing error styling
        input.classList.remove('error');
        
        // Validate based on field type
        let isValid = true;
        let errorMessage = '';
        
        switch (fieldName) {
            case 'foodName':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Food name is required';
                }
                break;
            case 'quantity':
                if (!value || parseFloat(value) <= 0) {
                    isValid = false;
                    errorMessage = 'Quantity must be greater than 0';
                }
                break;
            case 'calories':
            case 'protein':
            case 'carbs':
            case 'fat':
                if (!value || parseFloat(value) < 0) {
                    isValid = false;
                    errorMessage = 'Value must be 0 or greater';
                }
                break;
        }
        
        if (!isValid) {
            input.classList.add('error');
            this.showFieldError(input, errorMessage);
        } else {
            this.hideFieldError(input);
        }
        
        return isValid;
    }

    // Show field error
    showFieldError(input, message) {
        this.hideFieldError(input);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#dc3545';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        
        input.parentNode.appendChild(errorDiv);
    }

    // Hide field error
    hideFieldError(input) {
        const existingError = input.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    // Handle meal form submission
    handleMealSubmit() {
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
            if (!this.validateInput(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            this.showMessage('Please fix the errors in the form.', 'error');
            return;
        }

        // Add meal
        if (nutritionTracker.addMeal(mealData)) {
            this.showMessage('Meal added successfully!', 'success');
            form.reset();
            this.navigateToSection('dashboard');
            this.refreshGoalsChart(); // Update chart after adding a meal
        } else {
            this.showMessage('Failed to add meal. Please try again.', 'error');
        }
    }
}

// Create global instance
const ui = new UIManager(); 