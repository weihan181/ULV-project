// Storage Module - Handles localStorage operations
class StorageManager {
    constructor() {
        this.mealsKey = 'nutritrack_meals';
        this.goalsKey = 'nutritrack_goals';
        this.historyKey = 'nutritrack_history';
    }

    // Save meals data
    saveMeals(meals) {
        try {
            localStorage.setItem(this.mealsKey, JSON.stringify(meals));
            return true;
        } catch (error) {
            console.error('Error saving meals:', error);
            return false;
        }
    }

    // Load meals data
    loadMeals() {
        try {
            const meals = localStorage.getItem(this.mealsKey);
            return meals ? JSON.parse(meals) : {};
        } catch (error) {
            console.error('Error loading meals:', error);
            return {};
        }
    }

    // Save goals data
    saveGoals(goals) {
        try {
            localStorage.setItem(this.goalsKey, JSON.stringify(goals));
            return true;
        } catch (error) {
            console.error('Error saving goals:', error);
            return false;
        }
    }

    // Load goals data
    loadGoals() {
        try {
            const goals = localStorage.getItem(this.goalsKey);
            return goals ? JSON.parse(goals) : this.getDefaultGoals();
        } catch (error) {
            console.error('Error loading goals:', error);
            return this.getDefaultGoals();
        }
    }

    // Save history data
    saveHistory(history) {
        try {
            localStorage.setItem(this.historyKey, JSON.stringify(history));
            return true;
        } catch (error) {
            console.error('Error saving history:', error);
            return false;
        }
    }

    // Load history data
    loadHistory() {
        try {
            const history = localStorage.getItem(this.historyKey);
            return history ? JSON.parse(history) : {};
        } catch (error) {
            console.error('Error loading history:', error);
            return {};
        }
    }

    // Get default goals
    getDefaultGoals() {
        return {
            calories: 2000,
            protein: 150,
            carbs: 250,
            fat: 65
        };
    }

    // Add meal to storage
    addMeal(date, meal) {
        const meals = this.loadMeals();
        if (!meals[date]) {
            meals[date] = [];
        }
        meals[date].push({
            ...meal,
            id: Date.now() + Math.random(),
            timestamp: new Date().toISOString()
        });
        return this.saveMeals(meals);
    }

    // Remove meal from storage
    removeMeal(date, mealId) {
        const meals = this.loadMeals();
        if (meals[date]) {
            meals[date] = meals[date].filter(meal => meal.id !== mealId);
            if (meals[date].length === 0) {
                delete meals[date];
            }
            return this.saveMeals(meals);
        }
        return false;
    }

    // Get meals for a specific date
    getMealsForDate(date) {
        const meals = this.loadMeals();
        return meals[date] || [];
    }

    // Calculate daily totals
    calculateDailyTotals(date) {
        const meals = this.getMealsForDate(date);
        return meals.reduce((totals, meal) => {
            totals.calories += meal.calories;
            totals.protein += meal.protein;
            totals.carbs += meal.carbs;
            totals.fat += meal.fat;
            return totals;
        }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
    }

    // Export data as JSON
    exportData() {
        const data = {
            meals: this.loadMeals(),
            goals: this.loadGoals(),
            history: this.loadHistory(),
            exportDate: new Date().toISOString()
        };
        return JSON.stringify(data, null, 2);
    }

    // Import data from JSON
    importData(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            if (data.meals) this.saveMeals(data.meals);
            if (data.goals) this.saveGoals(data.goals);
            if (data.history) this.saveHistory(data.history);
            return true;
        } catch (error) {
            console.error('Error importing data:', error);
            return false;
        }
    }

    // Clear all data
    clearAllData() {
        try {
            localStorage.removeItem(this.mealsKey);
            localStorage.removeItem(this.goalsKey);
            localStorage.removeItem(this.historyKey);
            return true;
        } catch (error) {
            console.error('Error clearing data:', error);
            return false;
        }
    }

    // Get storage usage info
    getStorageInfo() {
        try {
            const meals = localStorage.getItem(this.mealsKey);
            const goals = localStorage.getItem(this.goalsKey);
            const history = localStorage.getItem(this.historyKey);
            
            const totalSize = (meals?.length || 0) + (goals?.length || 0) + (history?.length || 0);
            const maxSize = 5 * 1024 * 1024; // 5MB typical localStorage limit
            
            return {
                used: totalSize,
                max: maxSize,
                percentage: (totalSize / maxSize) * 100
            };
        } catch (error) {
            console.error('Error getting storage info:', error);
            return { used: 0, max: 0, percentage: 0 };
        }
    }
}

// Create global instance
const storage = new StorageManager(); 