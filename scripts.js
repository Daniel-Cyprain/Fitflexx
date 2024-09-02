// const meals = {
//     breakfast: [
//         'Oatmeal with fruits', 'Scrambled eggs', 'Pancakes', 'Smoothie bowl', 'Yogurt with granola', 'Avocado toast', 'Bagel with cream cheese'
//     ],
//     lunch: [
//         'Grilled chicken salad', 'Turkey sandwich', 'Vegetable stir-fry', 'Chicken wrap', 'Pasta with marinara sauce', 'Quinoa bowl', 'Tuna salad'
//     ],
//     dinner: [
//         'Baked salmon with vegetables', 'Steak with mashed potatoes', 'Chicken curry', 'Vegetarian chili', 'Shrimp tacos', 'Spaghetti bolognese', 'Stuffed bell peppers'
//     ]
// };

function getRandomMeal(mealType) {
    const mealArray = meals[mealType];
    return mealArray[Math.floor(Math.random() * mealArray.length)];
}

function generateRoster() {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let rosterContent = document.getElementById('rosterContent');
    rosterContent.innerHTML = '';

    days.forEach(day => {
        const breakfast = getRandomMeal('breakfast');
        const lunch = getRandomMeal('lunch');
        const dinner = getRandomMeal('dinner');

        const daySection = document.createElement('div');
        daySection.classList.add('day');

        const dayHeader = document.createElement('h3');
        dayHeader.textContent = day;
        daySection.appendChild(dayHeader);

        const mealList = document.createElement('ul');
        mealList.innerHTML = `
            <li><strong>Breakfast:</strong> ${breakfast}</li>
            <li><strong>Lunch:</strong> ${lunch}</li>
            <li><strong>Dinner:</strong> ${dinner}</li>
        `;
        daySection.appendChild(mealList);

        rosterContent.appendChild(daySection);
    });
}

// .....
const meals = {
    Nigerian: {
        breakfast: ['Moi Moi', 'Akara', 'Puff Puff', 'Yam and Egg Sauce', 'Pap and Akara'],
        lunch: ['Jollof Rice', 'Egusi Soup and Pounded Yam', 'Amala and Ewedu', 'Fried Rice and Chicken', 'Okra Soup'],
        dinner: ['Afang Soup', 'Oha Soup', 'Banga Soup and Starch', 'Efo Riro and Semovita', 'Suya with Fries']
    },
    Italian: {
        breakfast: ['Frittata', 'Bruschetta', 'Panettone', 'Cornetto', 'Italian Omelette'],
        lunch: ['Pasta Carbonara', 'Margherita Pizza', 'Risotto', 'Lasagna', 'Caprese Salad'],
        dinner: ['Spaghetti Bolognese', 'Gnocchi', 'Osso Buco', 'Minestrone', 'Chicken Parmigiana']
    },
    Mexican: {
        breakfast: ['Chilaquiles', 'Huevos Rancheros', 'Tamales', 'Breakfast Burrito', 'Tortilla with Avocado'],
        lunch: ['Tacos', 'Enchiladas', 'Quesadillas', 'Burrito', 'Taco Salad'],
        dinner: ['Pozole', 'Chiles en Nogada', 'Mole Poblano', 'Fajitas', 'Cochinita Pibil']
    },
    Chinese: {
        breakfast: ['Congee', 'Dim Sum', 'Baozi', 'Scallion Pancakes', 'Soy Milk and You Tiao'],
        lunch: ['Sweet and Sour Pork', 'Kung Pao Chicken', 'Chow Mein', 'Fried Rice', 'Spring Rolls'],
        dinner: ['Peking Duck', 'Hot Pot', 'Ma Po Tofu', 'Szechuan Chicken', 'Dumplings']
    }
};

let selectedCuisine = '';
let plannerType = '';

function selectCuisine(cuisine) {
    selectedCuisine = cuisine;
    alert(`You selected ${cuisine} dishes! Now choose a meal planner.`);
}

function navigateToPlanner(planner) {
    if (!selectedCuisine) {
        alert('Please select a cuisine first!');
        return;
    }

    plannerType = planner;

    let planContent = '';
    const mealsOfTheDay = ['breakfast', 'lunch', 'dinner'];

    if (planner === 'suggestion') {
        planContent = generateQuickSuggestion(mealsOfTheDay);
    } else if (planner === 'daily') {
        planContent = generateDailyPlan(mealsOfTheDay);
    } else if (planner === 'weekly') {
        planContent = generateWeeklyPlan(mealsOfTheDay);
    }

    document.getElementById('mealPlanContainer').innerHTML = planContent;
    document.getElementById('downloadBtn').style.display = 'block';
    document.getElementById('regenerateBtn').style.display = 'block';
}

function generateWeeklyPlan(mealsOfTheDay) {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let planContent = '<h2>Weekly Meal Planner</h2>';
    days.forEach(day => {
        planContent += `<h3>${day}</h3><ul>`;
        mealsOfTheDay.forEach(type => {
            const meal = getRandomMeal(selectedCuisine, type);
            planContent += `<li><strong>${type.charAt(0).toUpperCase() + type.slice(1)}:</strong> ${meal}</li>`;
        });
        planContent += `</ul>`;
    });
    return planContent;
}

function generateDailyPlan(mealsOfTheDay) {
    let planContent = '<h2>Daily Meal Planner</h2>';
    mealsOfTheDay.forEach(type => {
        const meal = getRandomMeal(selectedCuisine, type);
        planContent += `<p><strong>${type.charAt(0).toUpperCase() + type.slice(1)}:</strong> ${meal}</p>`;
    });
    return planContent;
}

function generateQuickSuggestion(mealsOfTheDay) {
    const mealType = mealsOfTheDay[Math.floor(Math.random() * mealsOfTheDay.length)];
    const meal = getRandomMeal(selectedCuisine, mealType);
    return `<p><strong>${mealType.charAt(0).toUpperCase() + mealType.slice(1)}:</strong> ${meal}</p>`;
}

function getRandomMeal(cuisine, mealType) {
    const mealArray = meals[cuisine][mealType];
    return mealArray[Math.floor(Math.random() * mealArray.length)];
}

function regenerateMealPlan() {
    navigateToPlanner(plannerType);
}

function downloadMealPlan() {
    html2canvas(document.getElementById('mealPlanContainer')).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `${selectedCuisine}_meal_plan.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }).catch(error => {
        alert('Failed to download the meal plan. Please try again.');
        console.error('Error during download:', error);
    });
}

