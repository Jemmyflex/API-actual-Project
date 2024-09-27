document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const query = document.getElementById('search-input').value.trim();
    if (query) {
        searchCocktails(query);
    }
});

async function searchCocktails(query) {
    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();
        displayCocktails(data.drinks);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayCocktails(cocktails) {
    const cocktailList = document.getElementById('cocktail-list');
    cocktailList.innerHTML = '';  // Clear previous results

    if (cocktails) {
        cocktails.forEach(cocktail => {
            const cocktailCard = document.createElement('div');
            cocktailCard.classList.add('cocktail-card');

            cocktailCard.innerHTML = `
                <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
                <h2>${cocktail.strDrink}</h2>
                <p>${cocktail.strInstructions}</p>
            `;

            cocktailList.appendChild(cocktailCard);
        });
    } else {
        cocktailList.innerHTML = '<p>No cocktails found. Try a different search.</p>';
    }
}