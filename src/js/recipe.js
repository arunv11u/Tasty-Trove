'use strict';

$(() => {
	fetch("./json/recipes.json")
		.then(response => response.json())
		.then(recipes => {
			const recipesElement = $("#recipes");
			let recipesCollection = ``;

			recipes.forEach((recipe, index) => {
				if (index > 5) return;

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

			recipesElement.html(recipesCollection);
		}).catch(err => console.error(err));

	$("#explore-more").on("click", () => {
		console.log("click called ::");

		fetch("./json/recipes.json")
			.then(response => response.json())
			.then(recipes => {
				const recipesElement = $("#recipes");
				let recipesCollection = ``;

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

				recipesElement.html(recipesCollection);

				$("#explore-more").hide();
			}).catch(err => console.error(err));
	});
});