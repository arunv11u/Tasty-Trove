'use sctrict';

$(() => {
	// Array of sentences to be typed
	const sentencesToType = [
		"We are Glamour & Grace",
		"Elevate Your Style with Our Latest Collections!",
		"Shop the Latest Trends in Fashion Today.",
		"Express yourself through fashion!",
		"Elevate your everyday with Glamour & Grace"
	];

	let typer = $("#typer").get(0);  // Selecting the element with the id 'typer'
	// Speed of typing and delay between sentences
	let speed = 70;
	let delay = 700;

	// Set variables to keep track of the current sentence and character
	let currentIndex = 0, currentChar = 0;

	// Function to type characters onto the page
	function type() {

		// Get the current sentence to type
		const sentenceType = sentencesToType[currentIndex % sentencesToType.length];

		if (currentChar < sentenceType.length) {
			// Append the next character and set a timeout for the next character
			typer.innerHTML += sentenceType[currentChar++];
			setTimeout(type, speed);
		} else {
			// If the sentence is fully typed, set a timeout for erasing
			setTimeout(erase, delay);
		}
	}

	// Function to erase characters from the page
	function erase() {

		// Get the current sentence to erase
		const sentenceType = sentencesToType[currentIndex % sentencesToType.length];

		// If there are characters remaining to erase
		if (currentChar > 0) {
			// Remove the last character and set a timeout for the next erasing step
			typer.innerHTML = sentenceType.slice(0, --currentChar);
			setTimeout(erase, speed);
		} else {
			// If the sentence is fully erased, move to the next sentence and set a timeout for typing
			currentIndex++;
			setTimeout(type, delay);
		}
	}

	// Start typing when the window loads
	window.onload = function () {
		type();
	};
});