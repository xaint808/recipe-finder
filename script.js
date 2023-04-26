const API_KEY = "906d2e6970ee4b0193393e12404fffc0";
const SEARCH_URL = "https://api.spoonacular.com/recipes/findByIngredients";
const INFO_URL = "https://api.spoonacular.com/recipes/{id}/information";

// Search for recipes by ingredients
function searchRecipes() {
	const ingredients = $("#ingredients").val().split(",");
	const params = {
		apiKey: API_KEY,
		ingredients: ingredients.join(","),
		number: 10,
	};

	$.getJSON(SEARCH_URL, params, displayResults);
}

// Display search results
function displayResults(data) {
	let resultsHtml = "";

	if (data.length === 0) {
		resultsHtml += "<p>No results found.</p>";
	} else {
		data.forEach(recipe => {
			resultsHtml += `<div class="result">
								<img src="${recipe.image}" alt="${recipe.title}">
								<h3>${recipe.title}</h3>
								<button class="info" data-id="${recipe.id}">View Recipe</button>
							</div>`;
		});
	}

	$("#results").html(resultsHtml);
}

// Get recipe details
function getRecipeDetails(id) {
	const url = INFO_URL.replace("{id}", id);
	const params = {
		apiKey: API_KEY,
	};

	$.getJSON(url, params, displayRecipe);
}

// Display recipe details
function displayRecipe(data) {
	let recipeHtml = "";

	recipeHtml += `<div class="recipeDetails">
				   <h1>${data.title}</h1>
				   <img src="${data.image}" alt="${data.title}">
				   <ul><h3>Ingredients:</h3>`;
	data.extendedIngredients.forEach(ingredient => {
		recipeHtml += `<li>${ingredient.original}</li>`;
	});
	recipeHtml += `</ul>
				   <ul>
				   <h3>Instructions:</h3>
				   <li>${data.instructions}</li>
				   </ul
				   </div>`;

	$("#results").html(recipeHtml);
}

$(function () {
	// Search for recipes when the search button is clicked
	$("#search").click(searchRecipes);

	// Get recipe details when the view recipe button is clicked
	$("#results").on("click", ".info", function () {
		const id = $(this).data("id");
		getRecipeDetails(id);
	});
});