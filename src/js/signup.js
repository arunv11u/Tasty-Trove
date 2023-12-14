// Enable strict mode for better error handling and code quality
'use strict';

$(() => {
	// Set focus on the 'name' input field when the page loads
	$("#name").focus();

	// Attach input event listeners for real-time validation
	$("#name").on("input", () => { validateName($("#name").val()) });
	$("#email").on("input", () => { validateEmail($("#email").val()) });
	$("#phone").on("input", () => { validatePhoneNumber($("#phone").val()) });
	$("#password").on("input", () => { validatePassword($("#password").val()) });

	// Attach focusout event listeners for validation when the user leaves the input field
	$("#name").on("focusout", () => { validateName($("#name").val()) });
	$("#email").on("focusout", () => { validateEmail($("#email").val()) });
	$("#phone").on("focusout", () => { validatePhoneNumber($("#phone").val()) });
	$("#password").on("focusout", () => { validatePassword($("#password").val()) });

	// Handle form submission for signup
	$('#signup').on("submit", (event) => {
		event.preventDefault(); // Prevent the default form submission behavior

		// Clear any existing error messages
		clearErrorMessagesInsignupForm();

		// Retrieve input values
		let name = $('#name').val();
		let email = $('#email').val();
		let phone = $('#phone').val();
		let password = $('#password').val();

		// Validate input fields
		const isValidName = validateName(name);
		const isValidEmail = validateEmail(email);
		const isValidPhoneNumber = validatePhoneNumber(phone);
		const isValidPassword = validatePassword(password);

		// If any validation fails, stop the form submission
		if (!isValidName || !isValidEmail || !isValidPhoneNumber || !isValidPassword) return;

		// Create a new user object
		const newUser = {
			name: name,
			email: email,
			phone: phone,
			password: password
		};

		// Retrieve existing users from local storage or create an empty array
		const users = JSON.parse(localStorage.getItem("users")) || [];

		// Check if the user already exists
		const isUserAlreadyExists = users.find(user => (user.email === newUser.email));
		if (isUserAlreadyExists)
			return $("#password-error-msg")
				.text("User already exists, please sign in to continue");

		// Add the new user to the array
		users.push(newUser);

		// Save the updated user array to local storage
		localStorage.setItem("users", JSON.stringify(users));

		// Clear form after successful signup
		clearSignupForm();

		// Redirect to the sign-in page
		window.location.href = "signin.html";
	});
});

// Function to clear error messages in the signup form
function clearErrorMessagesInsignupForm() {
	$('#name-error-msg').text("");
	$('#email-error-msg').text("");
	$('#phone-error-msg').text("");
	$('#password-error-msg').text("");
}

// Function to clear signup form fields
function clearSignupForm() {
	$('#name').val("");
	$('#email').val("");
	$('#phone').val("");
	$('#password').val("");
}

// Function to validate the 'name' input in the signup form
function validateName(name) {
	if (name == "") {
		$("#name-error-msg").text("Name is required.");
		return false;
	}

	// Define the pattern for a valid name (letters and spaces)
	const namePattern = /^[a-zA-Z ]+$/;
	if (!namePattern.test(name)) {
		$('#name-error-msg').text("Please enter a valid name!");
		return false;
	}

	// Clear the error message if the name is valid
	$("#name-error-msg").text("");

	return true;
}

// Function to validate the 'email' input in the signup form
function validateEmail(email) {
	if (email == "") {
		$("#email-error-msg").text("Email is required.");
		return false;
	}

	// Define the pattern for a valid email address
	const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+$/;
	if (!emailPattern.test(email)) {
		$('#email-error-msg').text("Please enter a valid email address!");
		return false;
	}

	// Clear the error message if the email is valid
	$("#email-error-msg").text("");

	return true;
}

// Function to validate the 'phone' input in the signup form
function validatePhoneNumber(phone) {
	if (phone == "") {
		$("#phone-error-msg").text("Phone number is required.");
		return false;
	}

	// Define the pattern for a valid phone number
	const phonePattern = /^\+\d{1,3} \(\d{3}\) \d{3}-\d{4}$/;
	if (!phonePattern.test(phone)) {
		$('#phone-error-msg')
			.text("Please enter a valid phone number! (e.g., +1 (123) 456-7890)");
		return false;
	}

	// Clear the error message if the phone number is valid
	$("#phone-error-msg").text("");

	return true;
}

// Function to validate the 'password' input in the signup form
function validatePassword(password) {
	const uppercaseCharacterRegex = /[A-Z]/;
	const lowercaseCharacterRegex = /[a-z]/;
	const digitRegex = /\d/;
	const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>;\/]/;

	// Check if the password is empty
	if (!password) {
		$("#password-error-msg")
			.text("Password is required");
		return false;
	}

	// Check if the password meets the specified criteria
	if (password.length < 8) {
		$("#password-error-msg")
			.text("Password must be at least 8 characters long");
		return false;
	}

	if (!uppercaseCharacterRegex.test(password)) {
		$("#password-error-msg")
			.text("Password must contain at least one uppercase letter");
		return false;
	}

	if (!lowercaseCharacterRegex.test(password)) {
		$("#password-error-msg")
			.text("Password must contain at least one lowercase letter");
		return false;
	}

	if (!digitRegex.test(password)) {
		$("#password-error-msg")
			.text("Password must contain at least one number");
		return false;
	}

	if (!specialCharacterRegex.test(password)) {
		$("#password-error-msg")
			.text("Password must contain at least one special character");
		return false;
	}

	// Clear the error message if the password is valid
	$("#password-error-msg").text("");

	return true;
}