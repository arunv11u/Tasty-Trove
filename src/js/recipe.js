// Enable strict mode for better error handling and code quality
'use strict';

$(() => {
	// Fetch recipes from the JSON file when the page loads
	fetch("./json/recipes.json")
		.then(response => response.json())
		.then(recipes => {
			// Select the recipes container element
			const recipesElement = $("#recipes");
			let recipesCollection = ``;

			// Iterate through each recipe, limit to the first 6 recipes
			recipes.forEach((recipe, index) => {
				if (index > 5) return; // Skip recipes beyond the first 6

				// Build HTML markup for each recipe card
				recipesCollection += `<div class="col-lg-4">
				<div class="right-first-image">
					<div class="img-shadow">
						<div class="hover-content">
							<div class="inner">
								<h4 class="recipe-name">${recipe.name}</h4>
								<div class="main-border-button">
									<a href="./recipe-blog.html?name=${recipe.name}">Discover More!</a>
								</div>
							</div>
						</div>
						<img src=${recipe.image}>
						<div class="recipe-content">
							<h5>${recipe.name}</h5>
							<div class="rating">
								<i class="fa fa-star"></i>
								<i class="fa fa-star"></i>
								<i class="fa fa-star"></i>
								<i class="fa fa-star"></i>
								<i class="fa fa-star-o"></i>
							</div>
						</div>
					</div>
				</div>
			</div>`;
			});

			// Set the HTML content of the recipes container
			recipesElement.html(recipesCollection);
		})
		.catch(err => console.error(err)); // Handle any errors that occur during the fetch operation

	// Handle click event on "Explore More" button
	$("#explore-more").on("click", () => {
		// Fetch recipes again when "Explore More" is clicked
		fetch("./json/recipes.json")
			.then(response => response.json())
			.then(recipes => {
				// Select the recipes container element
				const recipesElement = $("#recipes");
				let recipesCollection = ``;

				// Iterate through each recipe and build HTML markup for each recipe card
				recipes.forEach((recipe, index) => {
					recipesCollection += `<div class="col-lg-4">
				<div class="right-first-image">
					<div class="img-shadow">
						<div class="hover-content">
							<div class="inner">
								<h4 class="recipe-name">${recipe.name}</h4>
								<div class="main-border-button">
									<a href="./recipe-blog.html?name=${recipe.name}">Discover More!</a>
								</div>
							</div>
						</div>
						<img src=${recipe.image}>
						<div class="recipe-content">
							<h5>${recipe.name}</h5>
							<div class="rating">
								<i class="fa fa-star"></i>
								<i class="fa fa-star"></i>
								<i class="fa fa-star"></i>
								<i class="fa fa-star"></i>
								<i class="fa fa-star-o"></i>
							</div>
						</div>
					</div>
				</div>
			</div>`;
				});

				// Set the HTML content of the recipes container
				recipesElement.html(recipesCollection);

				// Hide the "Explore More" button after loading additional recipes
				$("#explore-more").hide();
			})
			.catch(err => console.error(err)); // Handle any errors that occur during the fetch operation
	});
});