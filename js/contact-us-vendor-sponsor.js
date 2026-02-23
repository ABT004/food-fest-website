document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('nameInput').value.trim();
            const email = document.getElementById('emailInput').value.trim();
            const number = document.getElementById('numberInput').value.trim();
            const message = document.getElementById('messageInput').value.trim();
            
            if (!name || !email || !number || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            const phoneRegex = /^[0-9+\-\s()]+$/;
            if (!phoneRegex.test(number)) {
                alert('Please enter a valid phone number');
                return;
            }
            
            console.log('Form submitted with data:', {
                name: name,
                email: email,
                number: number,
                message: message,
                submissionTime: new Date().toISOString()
            });
            
            alert('Thank you for your inquiry! We will get back to you soon.');
            form.reset();
        });
    }
});
