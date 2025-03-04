// Wait for the DOM to fully load before running the code
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const submitButton = form.querySelector("button");

    // Function to handle form submission
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the default form submission

        // Validate the form fields before submitting
        if (validateForm()) {
            submitButton.disabled = true; // Disable button during submission
            submitButton.innerText = "Sending...";

            // Simulating form submission with a delay (e.g., via AJAX)
            setTimeout(function () {
                // Here you can send the data using AJAX (e.g., fetch, XMLHttpRequest)
                const formData = new FormData(form);

                // Simulate a successful submission response
                console.log("Form submitted successfully!");

                // After submission, reset the form
                form.reset();
                resetButtonState();

                // Show success message
                showSuccessMessage();
            }, 1500);
        }
    });

    // Validation Function
    function validateForm() {
        let isValid = true;

        // Validate name (must not be empty)
        if (nameInput.value.trim() === "") {
            isValid = false;
            showError(nameInput, "Please enter your name.");
        } else {
            hideError(nameInput);
        }

        // Validate email (must be a valid email format)
        if (emailInput.value.trim() === "") {
            isValid = false;
            showError(emailInput, "Please enter your email.");
        } else if (!isValidEmail(emailInput.value.trim())) {
            isValid = false;
            showError(emailInput, "Please enter a valid email.");
        } else {
            hideError(emailInput);
        }

        // Validate message (must not be empty)
        if (messageInput.value.trim() === "") {
            isValid = false;
            showError(messageInput, "Please enter your message.");
        } else {
            hideError(messageInput);
        }

        return isValid;
    }

    // Helper function to show error messages
    function showError(input, message) {
        const errorElement = document.createElement("span");
        errorElement.classList.add("error-message");
        errorElement.innerText = message;
        input.parentElement.appendChild(errorElement);
        input.classList.add("error"); // Add error class for styling
    }

    // Helper function to hide error messages
    function hideError(input) {
        const errorElement = input.parentElement.querySelector(".error-message");
        if (errorElement) {
            errorElement.remove();
        }
        input.classList.remove("error");
    }

    // Helper function to check if email format is valid
    function isValidEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    // Function to reset the submit button state
    function resetButtonState() {
        submitButton.disabled = false;
        submitButton.innerText = "Send Message";
    }

    // Function to display a success message after form submission
    function showSuccessMessage() {
        const successMessage = document.createElement("div");
        successMessage.classList.add("success-message");
        successMessage.innerText = "Your message has been sent successfully! We will get back to you soon.";
        form.appendChild(successMessage);

        // Automatically remove the success message after a few seconds
        setTimeout(function () {
            successMessage.remove();
        }, 5000);
    }

    // Event listeners for input focus and blur
    nameInput.addEventListener("focus", () => clearErrorOnFocus(nameInput));
    emailInput.addEventListener("focus", () => clearErrorOnFocus(emailInput));
    messageInput.addEventListener("focus", () => clearErrorOnFocus(messageInput));

    // Helper function to clear errors when input is focused
    function clearErrorOnFocus(input) {
        if (input.classList.contains("error")) {
            hideError(input);
        }
    }
});
