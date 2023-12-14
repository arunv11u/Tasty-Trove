// Enable strict mode for better error handling and code quality
'use strict';

$(() => {
	// Set focus on the 'email' input field when the page loads
	$("#email").focus();

	// Attach input event listeners for real-time validation
	$("#email").on("input", () => { validateEmail($("#email").val()) });
	$("#password").on("input", () => { validatePassword($("#password").val()) });

	// Attach focusout event listeners for validation when the user leaves the input field
	$("#email").on("focusout", () => { validateEmail($("#email").val()) });
	$("#password").on("focusout", () => { validatePassword($("#password").val()) });

	// Handle form submission for signin
	$('#signin').on("submit", (event) => {
		event.preventDefault(); // Prevent the default form submission behavior

		// Clear any existing error messages
		clearErrorMessagesInSigninForm();

		// Retrieve input values
		const email = $("#email").val();
		const password = $("#password").val();

		// Validate input fields
		const isValidEmail = validateEmail(email);
		const isValidPassword = validatePassword(password);

		// If any validation fails, stop the form submission
		if (!isValidEmail || !isValidPassword) return;

		// Retrieve user details from local storage
		const users = JSON.parse(localStorage.getItem("users")) || [];

		// Check if users exist
		if (!users.length)
			return $("#password-error-msg").text("No user details found. Please register first.");

		// Find user based on email
		const user = users.find(user => user.email === email);

		// Check if the user exists and the password matches
		if (!user || !(password === user.password)) {
			clearSigninForm();
			return $("#password-error-msg").text("Incorrect username or password. Please try again.");
		}

		// Clear form after successful signin
		clearSigninForm();

		// Redirect to the main page (index.html)
		window.location.href = "index.html";
	});
});

// Function to clear signin form fields
function clearSigninForm() {
	$("#email").val("");
	$("#password").val("");
}

// Function to clear error messages in the signin form
function clearErrorMessagesInSigninForm() {
	$("#email-error-msg").text("");
	$("#password-error-msg").text("");
}

// Function to validate the 'email' input in the signin form
function validateEmail(email) {
	if (email == "") {
		$("#email-error-msg").text("Email is required.");
		return false;
	}

	// Define the pattern for a valid email address
	const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+$/;

	// Check if the email follows the specified pattern
	if (!emailPattern.test(email)) {
		$('#email-error-msg').text("Please enter a valid email address!");
		return false;
	}

	// Clear the error message if the email is valid
	$("#email-error-msg").text("");
	
	return true;
}

// Function to validate the 'password' input in the signin form
function validatePassword(password) {
	const uppercaseCharacterRegex = /[A-Z]/;
	const lowercaseCharacterRegex = /[a-z]/;
	const digitRegex = /\d/;
	const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>;\/]/;

	// Check if the password is empty
	if (!password) {
		$("#password-error-msg").text("Password is required");
		return false;
	}

	// Check if the password meets the specified criteria
	if (password.length < 8) {
		$("#password-error-msg").text("Password must be at least 8 characters long");
		return false;
	}

	if (!uppercaseCharacterRegex.test(password)) {
		$("#password-error-msg").text("Password must contain at least one uppercase letter");
		return false;
	}

	if (!lowercaseCharacterRegex.test(password)) {
		$("#password-error-msg").text("Password must contain at least one lowercase letter");
		return false;
	}

	if (!digitRegex.test(password)) {
		$("#password-error-msg").text("Password must contain at least one number");
		return false;
	}

	if (!specialCharacterRegex.test(password)) {
		$("#password-error-msg").text("Password must contain at least one special character");
		return false;
	}

	// Clear the error message if the password is valid
	$("#password-error-msg").text("");

	return true;
}