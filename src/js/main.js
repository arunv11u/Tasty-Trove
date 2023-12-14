/*************************************************************************************** 
*  NAME: Mital Hirapara
*  STUDENT NUMBER: 8904946
*************************************************************************************** */

'use sctrict';

// Page loading animation
$(() => {

	// Selecting the preloader element
	const preloader = $('#preloader');

	// Check if the preloader element exists
	if (preloader) {
		// Call the function to fade out the preloader
		fadeOutPreloader(preloader);
	}
});

//  fade out function for the preloader
const fadeOutPreloader = (preloader) => {

	let opacity = 1;

	// Interval for the fade-out animation
	const animationInterval = setInterval(() => {

		// Reduce opacity in each interval
		preloader.css("opacity", opacity -= 0.05);

		// If opacity becomes less than or equal to 0, stop the interval
		if (opacity <= 0) {
			clearInterval(animationInterval);

			// Set a timeout to hide the preloader after a brief delay
			setTimeout(() => {
				preloader.css("visibility", "hidden")

				preloader.css("display", "none");
			}, 300);
		}
	}, 60);
};

const showNotification = (message, notificationElement) => {
	notificationElement.removeClass('hidden');
	notificationElement.addClass('show');
	notificationElement.text(message);
};

const hideNotification = (notificationElement) => {
	setTimeout(() => {
		notificationElement.addClass("hidden");
		notificationElement.removeClass("show");
	}, 3000);
};