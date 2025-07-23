// Nutrition Tracker Module - Handles meal management and calculations
class NutritionTracker {
    constructor() {
        this.currentDate = this.getCurrentDate();
        this.goals = storage.loadGoals();
        this.meals = storage.getMealsForDate(this.currentDate);
    }

    // Get current date in YYYY-MM-DD format
    getCurrentDate() {
        const today = new Date();
        return today.toISOString().split('T')[0];
    }

    // Add a new meal
    addMeal(mealData) {
        const meal = {
            foodName: mealData.foodName,
            mealTime: mealData.mealTime,
            quantity: parseFloat(mealData.quantity),
            calories: parseFloat(mealData.calories),
            protein: parseFloat(mealData.protein),
            carbs: parseFloat(mealData.carbs),
            fat: parseFloat(mealData.fat)
        };

        const success = storage.addMeal(this.currentDate, meal);
        if (success) {
            this.meals = storage.getMealsForDate(this.currentDate);
            this.updateSummary();
            this.updateMealsTable();
            if (window.ui && typeof ui.refreshGoalsChart === 'function') ui.refreshGoalsChart();
            return true;
        }
        return false;
    }

    // Remove a meal
    removeMeal(mealId) {
        const success = storage.removeMeal(this.currentDate, mealId);
        if (success) {
            this.meals = storage.getMealsForDate(this.currentDate);
            this.updateSummary();
            this.updateMealsTable();
            if (window.ui && typeof ui.refreshGoalsChart === 'function') ui.refreshGoalsChart();
            return true;
        }
        return false;
    }

    // Calculate daily totals
    calculateDailyTotals() {
        return this.meals.reduce((totals, meal) => {
            totals.calories += meal.calories;
            totals.protein += meal.protein;
            totals.carbs += meal.carbs;
            totals.fat += meal.fat;
            return totals;
        }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
    }

    // Calculate progress percentages
    calculateProgress(totals) {
        return {
            calories: Math.min((totals.calories / this.goals.calories) * 100, 100),
            protein: Math.min((totals.protein / this.goals.protein) * 100, 100),
            carbs: Math.min((totals.carbs / this.goals.carbs) * 100, 100),
            fat: Math.min((totals.fat / this.goals.fat) * 100, 100)
        };
    }

    // Update nutrition summary
    updateSummary() {
        const totals = this.calculateDailyTotals();
        const progress = this.calculateProgress(totals);

        // Update consumed values
        document.getElementById('calories-consumed').textContent = Math.round(totals.calories);
        document.getElementById('protein-consumed').textContent = Math.round(totals.protein);
        document.getElementById('carbs-consumed').textContent = Math.round(totals.carbs);
        document.getElementById('fat-consumed').textContent = Math.round(totals.fat);

        // Update goal values
        document.getElementById('calories-goal').textContent = this.goals.calories;
        document.getElementById('protein-goal').textContent = this.goals.protein;
        document.getElementById('carbs-goal').textContent = this.goals.carbs;
        document.getElementById('fat-goal').textContent = this.goals.fat;

        // Update progress bars
        document.getElementById('calories-progress').style.width = `${progress.calories}%`;
        document.getElementById('protein-progress').style.width = `${progress.protein}%`;
        document.getElementById('carbs-progress').style.width = `${progress.carbs}%`;
        document.getElementById('fat-progress').style.width = `${progress.fat}%`;

        // Update current goals display
        document.getElementById('current-calories-goal').textContent = this.goals.calories;
        document.getElementById('current-protein-goal').textContent = `${this.goals.protein}g`;
        document.getElementById('current-carbs-goal').textContent = `${this.goals.carbs}g`;
        document.getElementById('current-fat-goal').textContent = `${this.goals.fat}g`;
        // Add weight and height
        document.getElementById('current-weight-goal').textContent = `${this.goals.weight}kg`;
        document.getElementById('current-height-goal').textContent = `${this.goals.height}cm`;

        // Update summary card text
        const summaryText = document.getElementById('goals-summary-text');
        const caloriesLeft = Math.max(this.goals.calories - totals.calories, 0);
        if (caloriesLeft === 0) {
            summaryText.textContent = "You've reached your calorie goal for today! 🎉";
        } else if (totals.calories === 0) {
            summaryText.textContent = "Start logging your meals to see your progress.";
        } else {
            summaryText.textContent = `Only ${caloriesLeft} calories left to reach your goal!`;
        }
        // Update last updated date
        const lastUpdated = localStorage.getItem('nutritrack_goals_last_updated');
        const lastUpdatedDate = document.getElementById('goals-last-updated-date');
        if (lastUpdated && lastUpdatedDate) {
            const date = new Date(parseInt(lastUpdated, 10));
            lastUpdatedDate.textContent = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        } else if (lastUpdatedDate) {
            lastUpdatedDate.textContent = 'today';
        }
        // Update next goal message
        const nextGoalText = document.getElementById('goals-next-goal-text');
        if (caloriesLeft > 0) {
            nextGoalText.textContent = `Eat ${caloriesLeft} more calories to hit your goal!`;
        } else {
            nextGoalText.textContent = "Goal reached! Maintain or adjust as needed.";
        }
    }

    // Update meals table
    updateMealsTable() {
        const tbody = document.getElementById('meals-tbody');
        const emptyState = document.getElementById('empty-state');

        if (this.meals.length === 0) {
            tbody.innerHTML = '';
            emptyState.style.display = 'block';
            return;
        }

        emptyState.style.display = 'none';
        tbody.innerHTML = '';

        this.meals.forEach(meal => {
            const row = document.createElement('tr');
            row.className = 'fade-in-up';
            
            const time = new Date(meal.timestamp).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
            });

            row.innerHTML = `
                <td>${time}</td>
                <td>${meal.foodName}</td>
                <td>${Math.round(meal.calories)}</td>
                <td>${Math.round(meal.protein)}</td>
                <td>${Math.round(meal.carbs)}</td>
                <td>${Math.round(meal.fat)}</td>
                <td>
                    <button class="btn btn-danger" onclick="nutritionTracker.removeMeal(${meal.id})">
                        Delete
                    </button>
                </td>
            `;
            
            tbody.appendChild(row);
        });
    }

    // Update goals
    updateGoals(newGoals) {
        this.goals = { ...newGoals };
        const success = storage.saveGoals(this.goals);
        if (success) {
            this.updateSummary();
            return true;
        }
        return false;
    }

    // Get meals for a specific date
    getMealsForDate(date) {
        return storage.getMealsForDate(date);
    }

    // Calculate totals for a specific date
    getTotalsForDate(date) {
        const meals = this.getMealsForDate(date);
        return meals.reduce((totals, meal) => {
            totals.calories += meal.calories;
            totals.protein += meal.protein;
            totals.carbs += meal.carbs;
            totals.fat += meal.fat;
            return totals;
        }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
    }

    // Get goal progress for a specific date
    getGoalProgressForDate(date) {
        const totals = this.getTotalsForDate(date);
        return {
            calories: Math.min((totals.calories / this.goals.calories) * 100, 100),
            protein: Math.min((totals.protein / this.goals.protein) * 100, 100),
            carbs: Math.min((totals.carbs / this.goals.carbs) * 100, 100),
            fat: Math.min((totals.fat / this.goals.fat) * 100, 100)
        };
    }

    // Get average daily totals for a date range
    getAverageTotals(startDate, endDate) {
        const dates = this.getDateRange(startDate, endDate);
        let totalCalories = 0, totalProtein = 0, totalCarbs = 0, totalFat = 0;
        let daysWithData = 0;

        dates.forEach(date => {
            const totals = this.getTotalsForDate(date);
            if (totals.calories > 0) {
                totalCalories += totals.calories;
                totalProtein += totals.protein;
                totalCarbs += totals.carbs;
                totalFat += totals.fat;
                daysWithData++;
            }
        });

        if (daysWithData === 0) return { calories: 0, protein: 0, carbs: 0, fat: 0 };

        return {
            calories: Math.round(totalCalories / daysWithData),
            protein: Math.round(totalProtein / daysWithData),
            carbs: Math.round(totalCarbs / daysWithData),
            fat: Math.round(totalFat / daysWithData)
        };
    }

    // Get date range between two dates
    getDateRange(startDate, endDate) {
        const dates = [];
        const currentDate = new Date(startDate);
        const end = new Date(endDate);

        while (currentDate <= end) {
            dates.push(currentDate.toISOString().split('T')[0]);
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
    }

    // Validate meal data
    validateMeal(mealData) {
        const errors = [];

        if (!mealData.foodName || mealData.foodName.trim() === '') {
            errors.push('Food name is required');
        }

        if (!mealData.quantity || mealData.quantity <= 0) {
            errors.push('Quantity must be greater than 0');
        }

        if (!mealData.calories || mealData.calories < 0) {
            errors.push('Calories must be 0 or greater');
        }

        if (!mealData.protein || mealData.protein < 0) {
            errors.push('Protein must be 0 or greater');
        }

        if (!mealData.carbs || mealData.carbs < 0) {
            errors.push('Carbs must be 0 or greater');
        }

        if (!mealData.fat || mealData.fat < 0) {
            errors.push('Fat must be 0 or greater');
        }

        return errors;
    }

    // Format nutrition values
    formatNutrition(value, unit = '') {
        return `${Math.round(value)}${unit}`;
    }

    // Get meal time display name
    getMealTimeDisplay(mealTime) {
        const displayNames = {
            breakfast: 'Breakfast',
            lunch: 'Lunch',
            dinner: 'Dinner',
            snack: 'Snack'
        };
        return displayNames[mealTime] || mealTime;
    }

    // Initialize the tracker
    init() {
        this.updateSummary();
        this.updateMealsTable();
        if (window.ui && typeof ui.refreshGoalsChart === 'function') ui.refreshGoalsChart();
    }

    // Refresh data for current date
    refresh() {
        this.currentDate = this.getCurrentDate();
        this.meals = storage.getMealsForDate(this.currentDate);
        this.updateSummary();
        this.updateMealsTable();
        if (window.ui && typeof ui.refreshGoalsChart === 'function') ui.refreshGoalsChart();
    }
}

// Create global instance
const nutritionTracker = new NutritionTracker(); 