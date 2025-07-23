// Food Database Module - Contains common foods and autocomplete functionality
class FoodDatabase {
    constructor() {
        this.foods = this.getFoodDatabase();
        this.filteredFoods = [];
        this.selectedIndex = -1;
        this.isDropdownVisible = false;
        this.currentlySelectedFood = null; // Store the currently selected food
    }

    // Comprehensive food database with nutritional info per 100g
    getFoodDatabase() {
        return [
            // Proteins
            { name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
            { name: "Salmon", calories: 208, protein: 25, carbs: 0, fat: 12 },
            { name: "Eggs", calories: 155, protein: 13, carbs: 1.1, fat: 11 },
            { name: "Tuna", calories: 144, protein: 30, carbs: 0, fat: 1 },
            { name: "Turkey Breast", calories: 157, protein: 30, carbs: 0, fat: 3.6 },
            { name: "Lean Beef", calories: 250, protein: 26, carbs: 0, fat: 15 },
            { name: "Pork Chop", calories: 231, protein: 25, carbs: 0, fat: 14 },
            { name: "Shrimp", calories: 99, protein: 24, carbs: 0.2, fat: 0.3 },
            { name: "Tofu", calories: 76, protein: 8, carbs: 1.9, fat: 4.8 },
            { name: "Greek Yogurt", calories: 59, protein: 10, carbs: 3.6, fat: 0.4 },
            
            // Dairy
            { name: "Milk (2%)", calories: 50, protein: 3.3, carbs: 4.8, fat: 2 },
            { name: "Cheese (Cheddar)", calories: 403, protein: 25, carbs: 1.3, fat: 33 },
            { name: "Cottage Cheese", calories: 98, protein: 11, carbs: 3.4, fat: 4.3 },
            { name: "Butter", calories: 717, protein: 0.9, carbs: 0.1, fat: 81 },
            
            // Grains & Breads
            { name: "Brown Rice", calories: 111, protein: 2.6, carbs: 23, fat: 0.9 },
            { name: "White Rice", calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
            { name: "Quinoa", calories: 120, protein: 4.4, carbs: 22, fat: 1.9 },
            { name: "Oatmeal", calories: 68, protein: 2.4, carbs: 12, fat: 1.4 },
            { name: "Whole Wheat Bread", calories: 247, protein: 13, carbs: 41, fat: 4.2 },
            { name: "White Bread", calories: 265, protein: 9, carbs: 49, fat: 3.2 },
            { name: "Pasta", calories: 131, protein: 5, carbs: 25, fat: 1.1 },
            
            // Vegetables
            { name: "Broccoli", calories: 34, protein: 2.8, carbs: 7, fat: 0.4 },
            { name: "Spinach", calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 },
            { name: "Carrots", calories: 41, protein: 0.9, carbs: 10, fat: 0.2 },
            { name: "Sweet Potato", calories: 86, protein: 1.6, carbs: 20, fat: 0.1 },
            { name: "Potato", calories: 77, protein: 2, carbs: 17, fat: 0.1 },
            { name: "Cauliflower", calories: 25, protein: 1.9, carbs: 5, fat: 0.3 },
            { name: "Bell Pepper", calories: 31, protein: 1, carbs: 7, fat: 0.3 },
            { name: "Tomato", calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2 },
            { name: "Cucumber", calories: 16, protein: 0.7, carbs: 3.6, fat: 0.1 },
            { name: "Onion", calories: 40, protein: 1.1, carbs: 9, fat: 0.1 },
            
            // Fruits
            { name: "Apple", calories: 52, protein: 0.3, carbs: 14, fat: 0.2 },
            { name: "Banana", calories: 89, protein: 1.1, carbs: 23, fat: 0.3 },
            { name: "Orange", calories: 47, protein: 0.9, carbs: 12, fat: 0.1 },
            { name: "Strawberries", calories: 32, protein: 0.7, carbs: 8, fat: 0.3 },
            { name: "Blueberries", calories: 57, protein: 0.7, carbs: 14, fat: 0.3 },
            { name: "Grapes", calories: 62, protein: 0.6, carbs: 16, fat: 0.2 },
            { name: "Pineapple", calories: 50, protein: 0.5, carbs: 13, fat: 0.1 },
            { name: "Mango", calories: 60, protein: 0.8, carbs: 15, fat: 0.4 },
            { name: "Avocado", calories: 160, protein: 2, carbs: 9, fat: 15 },
            
            // Nuts & Seeds
            { name: "Almonds", calories: 579, protein: 21, carbs: 22, fat: 50 },
            { name: "Peanuts", calories: 567, protein: 26, carbs: 16, fat: 49 },
            { name: "Walnuts", calories: 654, protein: 15, carbs: 14, fat: 65 },
            { name: "Cashews", calories: 553, protein: 18, carbs: 30, fat: 44 },
            { name: "Chia Seeds", calories: 486, protein: 17, carbs: 42, fat: 31 },
            { name: "Sunflower Seeds", calories: 584, protein: 21, carbs: 20, fat: 51 },
            
            // Oils & Fats
            { name: "Olive Oil", calories: 884, protein: 0, carbs: 0, fat: 100 },
            { name: "Coconut Oil", calories: 862, protein: 0, carbs: 0, fat: 100 },
            { name: "Canola Oil", calories: 884, protein: 0, carbs: 0, fat: 100 },
            
            // Common Meals & Snacks
            { name: "Pizza Slice", calories: 266, protein: 11, carbs: 33, fat: 10 },
            { name: "Hamburger", calories: 295, protein: 17, carbs: 30, fat: 12 },
            { name: "French Fries", calories: 312, protein: 3.4, carbs: 41, fat: 15 },
            { name: "Chicken Nuggets", calories: 297, protein: 14, carbs: 18, fat: 19 },
            { name: "Ice Cream", calories: 207, protein: 3.5, carbs: 24, fat: 11 },
            { name: "Chocolate Bar", calories: 545, protein: 4.9, carbs: 61, fat: 31 },
            { name: "Chips", calories: 536, protein: 7, carbs: 53, fat: 35 },
            { name: "Popcorn", calories: 375, protein: 11, carbs: 74, fat: 4 },
            { name: "Granola", calories: 471, protein: 10, carbs: 64, fat: 20 },
            { name: "Protein Bar", calories: 360, protein: 20, carbs: 30, fat: 12 }
        ];
    }

    // Search foods based on input
    searchFoods(query) {
        if (!query || query.length < 2) {
            this.filteredFoods = [];
            return [];
        }

        const lowerQuery = query.toLowerCase();
        this.filteredFoods = this.foods.filter(food => 
            food.name.toLowerCase().includes(lowerQuery)
        ).slice(0, 8); // Limit to 8 results

        return this.filteredFoods;
    }

    // Get food by name
    getFoodByName(name) {
        return this.foods.find(food => 
            food.name.toLowerCase() === name.toLowerCase()
        );
    }

    // Initialize autocomplete functionality
    initAutocomplete() {
        const foodInput = document.getElementById('food-name');
        const quantityInput = document.getElementById('quantity');
        
        if (!foodInput) return;

        // Create dropdown container
        this.createDropdown();

        // Add event listeners for food input
        foodInput.addEventListener('input', (e) => {
            this.handleInput(e.target.value);
        });

        foodInput.addEventListener('keydown', (e) => {
            this.handleKeydown(e);
        });

        foodInput.addEventListener('focus', () => {
            if (this.filteredFoods.length > 0) {
                this.showDropdown();
            }
        });

        // Add event listener for quantity input to recalculate nutrition
        if (quantityInput) {
            quantityInput.addEventListener('input', () => {
                if (this.currentlySelectedFood) {
                    this.updateNutritionFromQuantity();
                }
            });
        }

        // Hide dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!foodInput.contains(e.target) && !this.dropdown.contains(e.target)) {
                this.hideDropdown();
            }
        });
    }

    // Create dropdown element
    createDropdown() {
        this.dropdown = document.createElement('div');
        this.dropdown.className = 'food-dropdown';
        this.dropdown.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid #ddd;
            border-top: none;
            border-radius: 0 0 8px 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            max-height: 200px;
            overflow-y: auto;
            z-index: 1000;
            display: none;
        `;

        // Insert dropdown after the food input
        const foodInput = document.getElementById('food-name');
        const formGroup = foodInput.closest('.form-group');
        formGroup.style.position = 'relative';
        formGroup.appendChild(this.dropdown);
    }

    // Handle input changes
    handleInput(value) {
        const results = this.searchFoods(value);
        this.selectedIndex = -1;
        
        if (results.length > 0) {
            this.renderDropdown(results);
            this.showDropdown();
        } else {
            this.hideDropdown();
        }
    }

    // Handle keyboard navigation
    handleKeydown(e) {
        if (!this.isDropdownVisible) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                this.selectedIndex = Math.min(this.selectedIndex + 1, this.filteredFoods.length - 1);
                this.updateSelection();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
                this.updateSelection();
                break;
            case 'Enter':
                e.preventDefault();
                if (this.selectedIndex >= 0) {
                    this.selectFood(this.filteredFoods[this.selectedIndex]);
                }
                break;
            case 'Escape':
                this.hideDropdown();
                break;
        }
    }

    // Render dropdown with search results
    renderDropdown(foods) {
        this.dropdown.innerHTML = foods.map((food, index) => `
            <div class="food-dropdown-item ${index === this.selectedIndex ? 'selected' : ''}" 
                 data-index="${index}">
                <div class="food-name">${food.name}</div>
                <div class="food-nutrition">
                    ${Math.round(food.calories)} cal | 
                    ${Math.round(food.protein)}g protein | 
                    ${Math.round(food.carbs)}g carbs | 
                    ${Math.round(food.fat)}g fat
                    <span class="per-100g">(per 100g)</span>
                </div>
            </div>
        `).join('');

        // Add click event listeners
        this.dropdown.querySelectorAll('.food-dropdown-item').forEach((item, index) => {
            item.addEventListener('click', () => {
                this.selectFood(foods[index]);
            });
        });
    }

    // Update selection highlighting
    updateSelection() {
        this.dropdown.querySelectorAll('.food-dropdown-item').forEach((item, index) => {
            item.classList.toggle('selected', index === this.selectedIndex);
        });
    }

    // Select a food item
    selectFood(food) {
        const foodInput = document.getElementById('food-name');
        foodInput.value = food.name;
        
        // Store the selected food for quantity-based calculations
        this.currentlySelectedFood = food;
        
        // Auto-fill nutritional information
        this.fillNutritionFields(food);
        
        this.hideDropdown();
        foodInput.focus();
    }

    // Fill nutrition fields with selected food data
    fillNutritionFields(food) {
        const quantityInput = document.getElementById('quantity');
        const caloriesInput = document.getElementById('calories');
        const proteinInput = document.getElementById('protein');
        const carbsInput = document.getElementById('carbs');
        const fatInput = document.getElementById('fat');

        if (quantityInput && caloriesInput && proteinInput && carbsInput && fatInput) {
            // Don't set default quantity - let user input their own
            const quantity = parseFloat(quantityInput.value) || 0;
            
            if (quantity > 0) {
                this.calculateAndFillNutrition(food, quantity);
            } else {
                // Show placeholder values for 100g as reference
                this.calculateAndFillNutrition(food, 100);
                // Clear the values but show they're calculated for 100g
                caloriesInput.value = '';
                proteinInput.value = '';
                carbsInput.value = '';
                fatInput.value = '';
                // Add placeholder text to show it's for 100g
                caloriesInput.placeholder = `${Math.round(food.calories)} cal (per 100g)`;
                proteinInput.placeholder = `${Math.round(food.protein * 10) / 10}g (per 100g)`;
                carbsInput.placeholder = `${Math.round(food.carbs * 10) / 10}g (per 100g)`;
                fatInput.placeholder = `${Math.round(food.fat * 10) / 10}g (per 100g)`;
            }

            // Mark as auto-calculated
            caloriesInput.dataset.autoCalculated = 'true';
        }
    }

    // Calculate and fill nutrition fields based on quantity
    calculateAndFillNutrition(food, quantity) {
        const caloriesInput = document.getElementById('calories');
        const proteinInput = document.getElementById('protein');
        const carbsInput = document.getElementById('carbs');
        const fatInput = document.getElementById('fat');

        if (caloriesInput && proteinInput && carbsInput && fatInput) {
            const multiplier = quantity / 100;

            caloriesInput.value = Math.round(food.calories * multiplier);
            proteinInput.value = Math.round(food.protein * multiplier * 10) / 10;
            carbsInput.value = Math.round(food.carbs * multiplier * 10) / 10;
            fatInput.value = Math.round(food.fat * multiplier * 10) / 10;

            // Clear placeholders when values are filled
            caloriesInput.placeholder = '';
            proteinInput.placeholder = '';
            carbsInput.placeholder = '';
            fatInput.placeholder = '';
        }
    }

    // Update nutrition values when quantity changes
    updateNutritionFromQuantity() {
        if (!this.currentlySelectedFood) return;

        const quantityInput = document.getElementById('quantity');
        const quantity = parseFloat(quantityInput.value) || 0;

        if (quantity > 0) {
            this.calculateAndFillNutrition(this.currentlySelectedFood, quantity);
        } else {
            // Clear values if quantity is 0 or invalid
            const caloriesInput = document.getElementById('calories');
            const proteinInput = document.getElementById('protein');
            const carbsInput = document.getElementById('carbs');
            const fatInput = document.getElementById('fat');

            if (caloriesInput && proteinInput && carbsInput && fatInput) {
                caloriesInput.value = '';
                proteinInput.value = '';
                carbsInput.value = '';
                fatInput.value = '';
                
                // Show placeholder values for 100g
                caloriesInput.placeholder = `${Math.round(this.currentlySelectedFood.calories)} cal (per 100g)`;
                proteinInput.placeholder = `${Math.round(this.currentlySelectedFood.protein * 10) / 10}g (per 100g)`;
                carbsInput.placeholder = `${Math.round(this.currentlySelectedFood.carbs * 10) / 10}g (per 100g)`;
                fatInput.placeholder = `${Math.round(this.currentlySelectedFood.fat * 10) / 10}g (per 100g)`;
            }
        }
    }

    // Show dropdown
    showDropdown() {
        this.dropdown.style.display = 'block';
        this.isDropdownVisible = true;
    }

    // Hide dropdown
    hideDropdown() {
        this.dropdown.style.display = 'none';
        this.isDropdownVisible = false;
        this.selectedIndex = -1;
    }

    // Add custom food to database
    addCustomFood(foodData) {
        const newFood = {
            name: foodData.foodName,
            calories: parseFloat(foodData.calories),
            protein: parseFloat(foodData.protein),
            carbs: parseFloat(foodData.carbs),
            fat: parseFloat(foodData.fat)
        };

        // Check if food already exists
        const existingIndex = this.foods.findIndex(food => 
            food.name.toLowerCase() === newFood.name.toLowerCase()
        );

        if (existingIndex >= 0) {
            // Update existing food
            this.foods[existingIndex] = newFood;
        } else {
            // Add new food
            this.foods.push(newFood);
        }

        // Save to localStorage
        this.saveCustomFoods();
    }

    // Save custom foods to localStorage
    saveCustomFoods() {
        try {
            localStorage.setItem('nutritrack_custom_foods', JSON.stringify(this.foods));
        } catch (error) {
            console.error('Error saving custom foods:', error);
        }
    }

    // Load custom foods from localStorage
    loadCustomFoods() {
        try {
            const customFoods = localStorage.getItem('nutritrack_custom_foods');
            if (customFoods) {
                const loadedFoods = JSON.parse(customFoods);
                this.foods = loadedFoods;
            }
        } catch (error) {
            console.error('Error loading custom foods:', error);
        }
    }

    // Initialize the food database
    init() {
        this.loadCustomFoods();
        this.initAutocomplete();
    }
}

// Create global instance
const foodDatabase = new FoodDatabase(); 