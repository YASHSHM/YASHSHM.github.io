document.addEventListener('DOMContentLoaded', () => {

    // ------------------- //
    // 1. Theme Toggler
    // ------------------- //
    const themeBtn = document.getElementById('theme-toggle');
const body = document.body;

// DEFAULT TO DARK MODE if no theme is saved
let savedTheme = localStorage.getItem('theme');

if (!savedTheme) {
    // No theme stored → set dark mode as default
    localStorage.setItem('theme', 'dark');
    savedTheme = 'dark';
}

if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeBtn.querySelector('i').classList.replace('fa-moon', 'fa-sun');
} else {
    body.classList.remove('dark-mode');
    themeBtn.querySelector('i').classList.replace('fa-sun', 'fa-moon');
}

themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    const icon = themeBtn.querySelector('i');
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    window.dispatchEvent(new Event('resize'));
});



    // ------------------- //
    // 2. ELLIPTIC CURVE ANIMATION
    // ------------------- //
    // Animates y^2 = x^3 + ax + b
    const canvas = document.getElementById('math-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let w, h;

        const resize = () => {
            w = canvas.width = canvas.parentElement.offsetWidth;
            h = canvas.height = canvas.parentElement.offsetHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        // Animation parameters
        let time = 0;
        const b = 1; 
        
        function drawCurve() {
            ctx.clearRect(0, 0, w, h);
            
            const isDark = body.classList.contains('dark-mode');
            const strokeStyle = isDark ? 'rgba(96, 165, 250, 0.4)' : 'rgba(37, 99, 235, 0.3)';
            ctx.strokeStyle = strokeStyle;
            ctx.lineWidth = 2;

            // Vary 'a' slightly over time to make the curve "breathe"
            // We use sin(time) to oscillate 'a' between -2.0 and 0.0
            const a = -1 + Math.sin(time * 0.5); 
            
            const scale = 50; // Zoom level
            const cx = w / 2;
            const cy = h / 2;

            // Plot pixel by pixel (optimization: step by 1px)
            // We iterate X from left of screen to right
            for (let pixelX = 0; pixelX < w; pixelX++) {
                // Convert screen X to graph x
                let x = (pixelX - cx) / scale;
                
                // Elliptic Curve Equation: y^2 = x^3 + ax + b
                let rhs = (x * x * x) + (a * x) + b;

                if (rhs >= 0) {
                    let y = Math.sqrt(rhs);
                    
                    // Convert graph y back to screen Y (top and bottom branches)
                    let pixelY_top = cy - (y * scale);
                    let pixelY_bot = cy + (y * scale);

                    // Draw a tiny dot or connect lines
                    // Using fillRect for 1px dots is faster than beginPath/stroke for every point
                    ctx.fillStyle = strokeStyle;
                    ctx.fillRect(pixelX, pixelY_top, 1.5, 1.5);
                    ctx.fillRect(pixelX, pixelY_bot, 1.5, 1.5);
                }
            }

            time += 0.02;
            requestAnimationFrame(drawCurve);
        }
        drawCurve();
    }

    // ------------------- //
    // 3. Prime Generator
    // ------------------- //
    const btnPrime = document.getElementById('btn-prime');
    const outPrime = document.getElementById('out-prime');
    
    if (btnPrime) {
        btnPrime.addEventListener('click', () => {
            const val = document.getElementById('prime-limit').value;
            const n = parseInt(val);

            if (!n || n < 2) {
                outPrime.innerHTML = "Please enter N ≥ 2";
                return;
            }
            if (n > 10000) {
                outPrime.innerHTML = "Limit too high for demo (max 10,000)";
                return;
            }
            
            const sieve = new Array(n + 1).fill(true);
            sieve[0] = sieve[1] = false;
            for (let i = 2; i * i <= n; i++) {
                if (sieve[i]) {
                    for (let j = i * i; j <= n; j += i) sieve[j] = false;
                }
            }
            
            const primes = [];
            for (let i = 2; i <= n; i++) if (sieve[i]) primes.push(i);

            outPrime.innerHTML = primes.join(', ');
        });
    }

    // ------------------- //
    // 4. RSA Visualizer
    // ------------------- //
    const btnRsa = document.getElementById('btn-rsa');
    const outRsa = document.getElementById('out-rsa');

    if (btnRsa) {
        btnRsa.addEventListener('click', () => {
            const msg = document.getElementById('rsa-msg').value;
            if (!msg) {
                outRsa.innerHTML = "Please enter text";
                return;
            }
            const n = 143n;
            const e = 7n;
            
            let encryptedArr = [];
            for (let i = 0; i < msg.length; i++) {
                const charCode = BigInt(msg.charCodeAt(i));
                const c = (charCode ** e) % n;
                encryptedArr.push(Number(c));
            }
            outRsa.innerHTML = `Ciphertext: [${encryptedArr.join(', ')}]`;
        });
    }

    // ------------------- //
    // 5. Books & Modals
    // ------------------- //
    const projectCards = document.querySelectorAll('.project-card-minimal');
    const closeBtns = document.querySelectorAll('.close-btn');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const modalId = card.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if(modal) modal.classList.add('active');
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal').classList.remove('active');
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });

    // Bookshelf Links
    const books = document.querySelectorAll('.book');
    books.forEach(book => {
        book.addEventListener('click', () => {
            if(book.dataset.link) window.open(book.dataset.link, '_blank');
        });
    });

    // ------------------- //
    // 6. Scroll Reveal
    // ------------------- //
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    
    // ------------------- //
    // 7. Contact Form Simulation
    // ------------------- //
    const form = document.getElementById('contact-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const status = document.getElementById('form-status');
            status.textContent = "Message Sent! (Demo)";
            status.style.color = "green";
            form.reset();
        });
    }
});

// ------------------- //
    // 8. NEW: Profile Image Slideshow
    // ------------------- //
    const profileImages = document.querySelectorAll('.profile-image-wrapper img');
    
    if (profileImages.length > 1) {
        let currentImageIndex = 0;
        
        setInterval(() => {
            // 1. Remove active class from current
            profileImages[currentImageIndex].classList.remove('active');
            
            // 2. Calculate next index (loop back to 0 at the end)
            currentImageIndex = (currentImageIndex + 1) % profileImages.length;
            
            // 3. Add active class to next
            profileImages[currentImageIndex].classList.add('active');
            
        }, 4000); // Change image every 4000ms (4 seconds)
    }
