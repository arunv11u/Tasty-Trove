// Enable strict mode for better error handling and code quality
'use strict';

$(() => {
	// Extract the 'name' parameter from the URL query string
	const params = new URLSearchParams(window.location.search);
	const name = params.get("name");

	// Fetch recipe data from the JSON file
	fetch("./json/recipes.json")
		.then(response => response.json())
		.then(recipes => {
			// Find the recipe with the matching name
			const recipe = recipes.find(recipe => recipe.name === name)

			// Set the recipe image source
			const recipeImage = $("#recipe-image");
			recipeImage.attr("src", recipe.image);

			// Set the recipe creation date
			const recipeCreatedOn = $("#recipe-created-on");
			recipeCreatedOn.html(recipe.createdOn);

			// Set the recipe name
			const recipeName = $("#recipe-name");
			recipeName.html(recipe.name);

			// Set the recipe preparation duration
			const recipePrepDuration = $("#recipe-prep-duration");
			recipePrepDuration.html(`Prep: ${recipe.prepDuration} mins`);

			// Set the recipe cooking duration
			const recipeCookDuration = $("#recipe-cook-duration");
			recipeCookDuration.html(`Cook: ${recipe.cookingDuration} mins`);

			// Set the recipe yields information
			const recipeYields = $("#recipe-yeild");
			recipeYields.html(`Yields: ${recipe.yields} Servings`);

			// Set the recipe difficulty level
			const recipeLevel = $("#recipe-level");
			recipeLevel.html(recipe.level);

			// Set the recipe preparation steps
			const recipesElement = $("#recipes");
			let recipeSteps = ``;
			recipe.steps.forEach((step, index) => {
				// Format each preparation step with an index and description
				recipeSteps += `
				<div class="single-preparation-step d-flex">
					<h4>0${index + 1}.</h4>
					<p>${step}</p>
				</div>`;
			});
			recipesElement.html(recipeSteps);

			// Set the recipe ingredients
			const ingredientsElement = $("#ingredients");
			let ingredients = ``;
			recipe.ingredients.forEach((ingredient, index) => {
				// Create a label for each ingredient using a custom control style
				ingredients += `<label class="custom-control">${ingredient}</label>`;
			});
			ingredientsElement.html(ingredients);
		})
		.catch(err => console.error(err)); // Handle any errors that occur during the fetch operation
});