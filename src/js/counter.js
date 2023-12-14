'use strict';

$(() => {
	const duration = 3000; // Animation duration in milliseconds

	setIntialValueToRecipesCount();

	const healthRecipeCount = parseInt(localStorage.getItem("healthRecipeCount"));
	const burgerRecipeCount = parseInt(localStorage.getItem("burgerRecipeCount"));
	const meatRecipeCount = parseInt(localStorage.getItem("meatRecipeCount"));
	const desertRecipeCount = parseInt(localStorage.getItem("desertRecipeCount"));
	

	// Increment the counter for Healthy Recipes on page load
	incrementCounter(healthRecipeCount, duration, $("#health-recipe-counter"));

	// Increment the counter for Burger Recipes on page load
	incrementCounter(burgerRecipeCount, duration, $("#burger-recipe-counter"));

	// Increment the counter for Meat Recipes on page load
	incrementCounter(meatRecipeCount, duration, $("#meat-recipe-counter"));

	// Increment the counter for Desert Recipes on page load
	incrementCounter(desertRecipeCount, duration, $("#desert-recipe-counter"));

	updateRecipesCounts(healthRecipeCount, burgerRecipeCount, meatRecipeCount, desertRecipeCount);
});

function incrementCounter(endValue, duration, counterElement) {
	$({ Counter: 0 }).animate({
		Counter: endValue
	}, {
		duration: duration,
		easing: 'swing',
		step: function () {
			counterElement.text(Math.ceil(this.Counter));
		}
	});
}

function setIntialValueToRecipesCount() {
	localStorage.setItem("healthRecipeCount", 1287);
	localStorage.setItem("burgerRecipeCount", 25);
	localStorage.setItem("meatRecipeCount", 471);
	localStorage.setItem("desertRecipeCount", 326);
}

function updateRecipesCounts(
	healthRecipeCount,
	burgerRecipeCount,
	meatRecipeCount,
	desertRecipeCount
) {
	localStorage.setItem("healthRecipeCount", healthRecipeCount + 20);
	localStorage.setItem("burgerRecipeCount", burgerRecipeCount + 1);
	localStorage.setItem("meatRecipeCount", meatRecipeCount + 5);
	localStorage.setItem("desertRecipeCount", desertRecipeCount + 3);
}