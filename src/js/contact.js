// Enable strict mode for better error handling and code quality
'use strict';

// Wait for the DOM to be ready
$(() => {

	// Set focus on the 'name' input field when the page loads
	$("#name").focus();

	// Attach input event listeners for real-time validation
	$("#name").on("input", () => { validateName($("#name").val()) });
	$("#email").on("input", () => { validateEmail($("#email").val()) });
	$("#subject").on("input", () => { validateSubject($("#subject").val()) });
	$("#message").on("input", () => { validateMessage($("#message").val()) });

	// Attach focusout event listeners for validation when the user leaves the input field
	$("#name").on("focusout", () => { validateName($("#name").val()) });
	$("#email").on("focusout", () => { validateEmail($("#email").val()) });
	$("#subject").on("focusout", () => { validateSubject($("#subject").val()) });
	$("#message").on("focusout", () => { validateMessage($("#message").val()) });

	// Handle form submission
	$("#contact-form").on("submit", (event) => {
		event.preventDefault(); // Prevent the default form submission behavior

		// Clear any existing error messages
		clearErrorMessagesInContactForm();

		// Retrieve input values
		let name = $('#name').val();
		let email = $('#email').val();
		let subject = $('#subject').val();
		let message = $('#message').val();

		// Validate input fields
		const isValidName = validateName(name);
		const isValidEmail = validateEmail(email);
		const isValidSubject = validateSubject(subject);
		const isValidMessage = validateMessage(message);

		// If any validation fails, stop the form submission
		if (!isValidName || !isValidEmail || !isValidSubject || !isValidMessage)
			return;

		// Display a notification message
		showNotification("Our team will contact you shortly!", $('#notification'));

		// Hide the notification after a brief period
		hideNotification($("#notification"));

		// Clear form fields after successful submission
		clearContactForm();
	});
});

// Function to clear all form fields
function clearContactForm() {
	$("#name").val("");
	$("#email").val("");
	$("#subject").val("");
	$("#message").val("");
}

// Function to clear error messages in the form
function clearErrorMessagesInContactForm() {
	$("#name-error-msg").text("");
	$("#email-error-msg").text("");
	$("#subject-error-msg").text("");
	$("#message-error-msg").text("");
}

// Function to validate the 'name' input
function validateName(name) {

	// Check if the name is empty
	if (name == "") {
		$("#name-error-msg").text("Name is required.");
		return false;
	}

	// Check if the name follows the specified pattern
	const namePattern = /^[a-zA-Z ]+$/;
	if (!namePattern.test(name)) {
		$('#name-error-msg').text("Please enter a valid name!");
		return false;
	}

	// Clear the error message if the name is valid
	$("#name-error-msg").text("");

	return true;
}

// Function to validate the 'email' input
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

// Function to validate the 'subject' input
function validateSubject(subject) {
	// Check if the subject is empty
	if (subject == "") {
		$("#subject-error-msg").text("Subject is required.");
		return false;
	}

	// Clear the error message if the subject is valid
	$("#subject-error-msg").text("");

	return true;
}

// Function to validate the 'message' input
function validateMessage(message) {
	// Check if the message is empty
	if (message == "") {
		$("#message-error-msg").text("Message is required.");
		return false;
	}

	// Check if the message exceeds the character limit
	if (message.length > 1000) {
		$("#message-error-msg").text("Message should be less than 1000 characters");
		return false;
	}

	// Clear the error message if the message is valid
	$("#message-error-msg").text("");

	return true;
}