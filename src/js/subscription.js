// Enable strict mode for better error handling and code quality
'use strict';

// Wait for the DOM to be ready
$(() => {

	// Set focus on the 'name' input field when the page loads
	$("#name").focus();

	// Attach input event listeners for real-time validation
	$("#name").on("input", () => { validateName($("#name").val()) });
	$("#email").on("input", () => { validateEmail($("#email").val()) });

	// Attach focusout event listeners for validation when the user leaves the input field
	$("#name").on("focusout", () => { validateName($("#name").val()) });
	$("#email").on("focusout", () => { validateEmail($("#email").val()) });

	// Handle subscription form submission
	$('#subscribe').on("submit", (event) => {
		event.preventDefault(); // Prevent the default form submission behavior

		// Clear any existing error messages
		clearErrorMessagesInSubscriptionForm();

		// Retrieve input values
		const name = $("#name").val();
		const email = $("#email").val();

		// Validate input fields
		const isValidName = validateName(name);
		const isValidEmail = validateEmail(email);

		// If any validation fails, stop the form submission
		if (!isValidName || !isValidEmail) return;

		// Display a notification message for successful subscription
		showNotification("Subscription done successfully!", $('#notification'));

		// Hide the notification after a brief period
		hideNotification($("#notification"));

		// Clear form fields after successful subscription
		clearSubscriptionForm();
	});
});

// Function to clear subscription form fields
function clearSubscriptionForm() {
	$("#name").val("");
	$("#email").val("");
}

// Function to clear error messages in the subscription form
function clearErrorMessagesInSubscriptionForm() {
	$("#name-error-msg").text("");
	$("#email-error-msg").text("");
}

// Function to validate the 'name' input in the subscription form
function validateName(name) {
	
	// Check if the name is empty
	if (name == "") {
		$("#name-error-msg").text("Name is required.");
		return false;
	}
	
	// Check if the name follows the specified pattern
	const namePattern = /^[a-zA-Z ]+/;
	if (!namePattern.test(name)) {
		$('#name-error-msg').text("Please enter a valid name!");
		return false;
	}

	// Clear the error message if the name is valid
	$("#name-error-msg").text("");

	return true;
}

// Function to validate the 'email' input in the subscription form
function validateEmail(email) {
	// Check if the email is empty
	if (email == "") {
		$("#email-error-msg").text("Email is required.");
		return false;
	}
	
	// Check if the email follows the specified pattern
	const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+$/;
	if (!emailPattern.test(email)) {
		$('#email-error-msg').text("Please enter a valid email address!");
		return false;
	}

	// Clear the error message if the email is valid
	$("#email-error-msg").text("");

	return true;
}