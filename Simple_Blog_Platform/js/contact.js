// ============================================
// BLOGIFY - Contact Form Module
// ============================================

const ContactForm = (function () {
    function init() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name')?.value.trim() || '',
                email: document.getElementById('email')?.value.trim() || '',
                subject: document.getElementById('subject')?.value.trim() || '',
                message: document.getElementById('message')?.value.trim() || ''
            };

            // Validate
            if (validateForm(formData)) {
                // Simulate sending
                submitForm(formData);
            }
        });

        // Real-time validation on blur
        const inputs = form.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('blur', function () {
                validateField(this);
            });

            input.addEventListener('input', function () {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    }

    function validateField(field) {
        const id = field.id;
        let isValid = true;

        switch (id) {
            case 'name':
                isValid = field.value.trim().length >= 2;
                break;
            case 'email':
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
                break;
            case 'subject':
                isValid = field.value.trim().length >= 3;
                break;
            case 'message':
                isValid = field.value.trim().length >= 10;
                break;
        }

        const errorElement = field.parentElement.querySelector('.error-message');
        if (!isValid) {
            field.classList.add('error');
            field.classList.remove('success');
            if (errorElement) errorElement.classList.add('visible');
        } else {
            field.classList.remove('error');
            field.classList.add('success');
            if (errorElement) errorElement.classList.remove('visible');
        }

        return isValid;
    }

    function validateForm(data) {
        let isValid = true;

        if (data.name.length < 2) {
            const field = document.getElementById('name');
            if (field) {
                field.classList.add('error');
                const error = field.parentElement.querySelector('.error-message');
                if (error) error.classList.add('visible');
            }
            isValid = false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            const field = document.getElementById('email');
            if (field) {
                field.classList.add('error');
                const error = field.parentElement.querySelector('.error-message');
                if (error) error.classList.add('visible');
            }
            isValid = false;
        }

        if (data.subject.length < 3) {
            const field = document.getElementById('subject');
            if (field) {
                field.classList.add('error');
                const error = field.parentElement.querySelector('.error-message');
                if (error) error.classList.add('visible');
            }
            isValid = false;
        }

        if (data.message.length < 10) {
            const field = document.getElementById('message');
            if (field) {
                field.classList.add('error');
                const error = field.parentElement.querySelector('.error-message');
                if (error) error.classList.add('visible');
            }
            isValid = false;
        }

        if (!isValid) {
            showToast('Please fix the errors in the form');
        }

        return isValid;
    }

    function submitForm(data) {
        // Show loading state
        const submitBtn = document.querySelector('#contactForm .btn-primary');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '⏳ Sending...';
        }

        // Simulate API call
        setTimeout(() => {
            // Hide form, show success
            const form = document.getElementById('contactForm');
            const successMessage = document.getElementById('formSuccess');

            if (form) form.style.display = 'none';
            if (successMessage) {
                successMessage.classList.add('visible');
            }

            showToast('Message sent successfully! ✅');

            // Reset button state
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Message →';
            }

            console.log('Form submitted:', data);
        }, 1500);
    }

    function showToast(message) {
        if (typeof window.showToast === 'function') {
            window.showToast(message);
            return;
        }
        const existingToast = document.querySelector('.toast');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.className = 'toast show';
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    return {
        init
    };
})();

// Initialize contact form when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    ContactForm.init();
});