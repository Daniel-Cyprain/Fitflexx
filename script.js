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

function selectCuisine(cuisine) {
    selectedCuisine = cuisine;
    alert(`You selected ${cuisine} dishes! Here's a quick meal suggestion.`);
    generateQuickSuggestion();
}

function generateQuickSuggestion() {
    if (!selectedCuisine) {
        alert('Please select a cuisine first!');
        return;
    }

    const mealsOfTheDay = ['breakfast', 'lunch', 'dinner'];
    const mealType = mealsOfTheDay[Math.floor(Math.random() * mealsOfTheDay.length)];
    const meal = getRandomMeal(selectedCuisine, mealType);

    document.getElementById('mealPlanContainer').innerHTML = `<p><strong>${mealType.charAt(0).toUpperCase() + mealType.slice(1)}:</strong> ${meal}</p>`;
    document.getElementById('downloadBtn').style.display = 'block';
    document.getElementById('regenerateBtn').style.display = 'block';
}

function getRandomMeal(cuisine, mealType) {
    const mealArray = meals[cuisine][mealType];
    return mealArray[Math.floor(Math.random() * mealArray.length)];
}

function regenerateMealSuggestion() {
    generateQuickSuggestion();
}

function downloadMealSuggestion() {
    html2canvas(document.getElementById('mealPlanContainer')).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `${selectedCuisine}_meal_suggestion.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }).catch(error => {
        alert('Failed to download the meal suggestion. Please try again.');
        console.error('Error during download:', error);
    });
}
