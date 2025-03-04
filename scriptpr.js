// Progress bar animation
document.addEventListener('scroll', function() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            const progress = bar.getAttribute('data-progress');
            bar.querySelector('::after').style.width = progress + '%';
        }
    });
});

// Form validation (basic simulation)
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert("Message Sent!");
});


