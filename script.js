document.addEventListener('DOMContentLoaded', () => {
    
    // --- Elements ---
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const feedbackForm = document.getElementById('feedbackForm');
    const resetBtn = document.getElementById('resetBtn');
    const successMessage = document.getElementById('successMessage');
    const newFeedbackBtn = document.getElementById('newFeedbackBtn');
    const ratingInputs = document.querySelectorAll('input[name="rating"]');
    const ratingText = document.getElementById('ratingText');

    // --- Mobile Menu Toggle ---
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('is-active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('is-active');
        navMenu.classList.remove('active');
    }));

    // --- Star Rating Logic ---
    const ratingLabels = {
        '5': 'Excellent',
        '4': 'Good',
        '3': 'Average',
        '2': 'Fair',
        '1': 'Poor'
    };

    ratingInputs.forEach(input => {
        input.addEventListener('change', () => {
            ratingText.textContent = ratingLabels[input.value];
            ratingText.style.color = '#FEB139'; // Gold color for active rating
            clearError('ratingError');
        });
    });

    // --- Form Validation & Submission ---
    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            // Simulate API call / Submission delay
            const submitBtn = feedbackForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            
            submitBtn.innerText = 'Submitting...';
            submitBtn.disabled = true;

            setTimeout(() => {
                feedbackForm.style.display = 'none';
                successMessage.style.display = 'block';
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
                feedbackForm.reset();
                resetRating();
                window.scrollTo({ top: document.getElementById('feedback').offsetTop, behavior: 'smooth' });
            }, 1500);
        }
    });

    // Reset Button
    resetBtn.addEventListener('click', () => {
        if(confirm('Are you sure you want to reset the form?')) {
            feedbackForm.reset();
            resetRating();
            clearAllErrors();
        }
    });

    // Submit Another Response Button
    newFeedbackBtn.addEventListener('click', () => {
        successMessage.style.display = 'none';
        feedbackForm.style.display = 'block';
        // Add fade-in animation
        feedbackForm.style.animation = 'fadeIn 0.5s ease-in-out';
    });

    // --- Helper Functions ---

    function validateForm() {
        let isValid = true;
        
        // Full Name
        const name = document.getElementById('fullName');
        if (name.value.trim() === '') {
            showError('nameError', 'Full Name is required');
            isValid = false;
        } else {
            clearError('nameError');
        }

        // Email
        const email = document.getElementById('email');
        if (email.value.trim() === '') {
            showError('emailError', 'Email Address is required');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError('emailError');
        }

        // Category
        const category = document.getElementById('category');
        if (category.value === '') {
            // Usually required attribute handles this, but custom check:
            // (Note: The select has 'required' attribute, but explicit check good for custom UI)
        }

        // Rating
        const rating = document.querySelector('input[name="rating"]:checked');
        if (!rating) {
            showError('ratingError', 'Please select a rating');
            isValid = false;
        } else {
            clearError('ratingError');
        }

        // Message
        const message = document.getElementById('message');
        if (message.value.trim().length < 10) {
            showError('messageError', 'Feedback must be at least 10 characters');
            isValid = false;
        } else {
            clearError('messageError');
        }

        return isValid;
    }

    function isValidEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
    }

    function clearError(elementId) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = '';
    }

    function clearAllErrors() {
        const errors = document.querySelectorAll('.error-msg');
        errors.forEach(err => err.textContent = '');
    }

    function resetRating() {
        ratingText.textContent = 'Select a rating';
        ratingText.style.color = 'var(--primary-color)';
    }
});
