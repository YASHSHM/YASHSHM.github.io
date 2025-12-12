document.addEventListener("DOMContentLoaded", () => {

    // --- Theme (Day/Night Mode) Switcher ---
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = 'fa-sun';
    const moonIcon = 'fa-moon';

    const applyTheme = () => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        const icon = themeToggle.querySelector('i');
        icon.classList.toggle(moonIcon, savedTheme === 'dark');
        icon.classList.toggle(sunIcon, savedTheme === 'light');
    };

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        const icon = themeToggle.querySelector('i');
        icon.classList.toggle(sunIcon);
        icon.classList.toggle(moonIcon);
    });

    // --- Responsive Navigation Menu ---
    const menuButton = document.getElementById('menu-button');
    const navLinks = document.getElementById('nav-links');

    menuButton.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Contact Form Validation ---
    const contactForm = document.getElementById("contactForm");
    const formFeedback = document.getElementById("form-feedback");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const message = formData.get('message').trim();

            if (name === '' || email === '' || message === '') {
                showFeedback("Please fill out all fields.", "error");
                return;
            }

            if (!isValidEmail(email)) {
                showFeedback("Please enter a valid email address.", "error");
                return;
            }

            console.log({ name, email, message });
            showFeedback("Your message has been sent successfully!", "success");
            contactForm.reset();
        });
    }

    const isValidEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(email);
    };

    const showFeedback = (message, type) => {
        formFeedback.innerHTML = `<div class="${type}-message">${message}</div>`;
        setTimeout(() => {
            formFeedback.innerHTML = '';
        }, 5000);
    };

    // --- Initializations ---
    applyTheme(); // Set the theme when the page loads
});