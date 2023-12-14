'use strict';

$(() => {
	const params = new URLSearchParams(window.location.search);
	const name = params.get("name");

	fetch("./json/recipes.json")
		.then(response => response.json())
		.then(recipes => {
			const recipe = recipes.find(recipe => recipe.name === name)

			const recipeImage = $("#recipe-image");
			recipeImage.attr("src", recipe.image);

			const recipeCreatedOn = $("#recipe-created-on");
			recipeCreatedOn.html(recipe.createdOn);

			const recipeName = $("#recipe-name");
			recipeName.html(recipe.name);

			const recipePrepDuration = $("#recipe-prep-duration");
			recipePrepDuration.html(`Prep: ${recipe.prepDuration} mins`);

			const recipeCookDuration = $("#recipe-cook-duration");
			recipeCookDuration.html(`Cook: ${recipe.cookingDuration} mins`);

			const recipeYields = $("#recipe-yeild");
			recipeYields.html(`Yields: ${recipe.yields} Servings`);

			const recipeLevel = $("#recipe-level");
			recipeLevel.html(recipe.level);

			const recipesElement = $("#recipes");

			let recipeSteps = ``;
			recipe.steps.forEach((step, index) => {

				recipeSteps += `
				<div class="single-preparation-step d-flex">
								<h4>0${index + 1}.</h4>
								<p>${step}
								</p>
							</div>`;
			});

			recipesElement.html(recipeSteps);

			const ingredientsElement = $("#ingredients");

			let ingredents = ``;
			recipe.ingredients.forEach((ingredent, index) => {

				ingredents += `<label class="custom-control">${ingredent}</label>`;
			});

			ingredientsElement.html(ingredents);
		}).catch(err => console.error(err));
});