/**
 * Contact Integration Script
 * This script fetches contact information from the API and handles contact form submission
 */

document.addEventListener('DOMContentLoaded', function() {
    // Load contact information
    loadContactInfo();
    
    // Set up contact form submission
    setupContactForm();
});

/**
 * Loads contact information from the API and populates the contact info section
 */
function loadContactInfo() {
    // Get the containers where contact info will be displayed
    const addressElement = document.getElementById('contact-address');
    const phoneElement = document.getElementById('contact-phone');
    const emailElement = document.getElementById('contact-email');
    const hoursElement = document.getElementById('contact-hours');
    
    // Set initial loading state
    if (addressElement) addressElement.textContent = 'Loading address...';
    if (phoneElement) phoneElement.textContent = 'Loading phone...';
    if (emailElement) emailElement.textContent = 'Loading email...';
    if (hoursElement) hoursElement.textContent = 'Loading hours...';
    
    // Direct fetch to ensure we get the raw response
    fetch('https://kingdom-spices-herbs-backend-dashbo.vercel.app/api/contact')
        .then(response => response.json())
        .then(data => {
            console.log('Raw contact data:', data);
            
            // Process the data directly
            if (data && data.data && Array.isArray(data.data)) {
                data.data.forEach(item => {
                    if (item.type === 'address' && addressElement) {
                        addressElement.textContent = item.value || 'Address not available';
                    }
                    
                    if (item.type === 'phone' && phoneElement) {
                        phoneElement.innerHTML = item.value ? 
                            `<a href="tel:${item.value}">${item.value}</a>` : 
                            'Phone not available';
                    }
                    
                    if (item.type === 'email' && emailElement) {
                        emailElement.innerHTML = item.value ? 
                            `<a href="mailto:${item.value}">${item.value}</a>` : 
                            'Email not available';
                    }
                });
                
                // Set default hours
                if (hoursElement) {
                    hoursElement.textContent = 'Sun - Fri (08AM - 10PM)';
                }
            } else {
                console.error('Invalid contact data format:', data);
                setDefaultValues();
            }
        })
        .catch(error => {
            console.error('Error fetching contact information:', error);
            setDefaultValues();
        });
        
    // Helper function to set default values
    function setDefaultValues() {
        if (addressElement) addressElement.textContent = 'Address not available';
        if (phoneElement) phoneElement.textContent = 'Phone not available';
        if (emailElement) emailElement.textContent = 'Email not available';
        if (hoursElement) hoursElement.textContent = 'Sun - Fri (08AM - 10PM)';
    }
}

/**
 * Sets up the contact form submission handler
 */
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form data
            const nameInput = contactForm.querySelector('input[name="name"]');
            const emailInput = contactForm.querySelector('input[name="email"]');
            const subjectInput = contactForm.querySelector('input[name="subject"]');
            const messageInput = contactForm.querySelector('textarea[name="message"]');
            
            if (!nameInput || !emailInput || !subjectInput || !messageInput) {
                console.error('Form fields not found');
                return;
            }
            
            const name = nameInput.value;
            const email = emailInput.value;
            const subject = subjectInput.value;
            const message = messageInput.value;
            
            // Validate form data
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="far fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Send message
            ApiService.sendContactMessage({ name, email, subject, message })
                .then(response => {
                    // Reset button state
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                    
                    // Show result
                    if (response.success) {
                        alert('Message sent successfully!');
                        contactForm.reset();
                    } else {
                        alert('Failed to send message: ' + (response.message || 'Unknown error'));
                    }
                })
                .catch(error => {
                    // Reset button state
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                    
                    console.error('Error sending message:', error);
                    alert('An error occurred. Please try again later.');
                });
        });
    }
}