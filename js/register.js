const registerForm = document.getElementById('registerForm');
const errorMessage = document.getElementById('errorMessage');
const registerBtn = document.getElementById('registerBtn');

registerForm.addEventListener('submit', async (e) => {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    errorMessage.style.display = 'none';
    errorMessage.textContent = '';

    if (!firstName || !lastName) {
        showError('Please enter your full name');
        return;
    }

    if (!email) {
        showError('Please enter a valid email');
        return;
    }

    if (!phone) {
        showError('Please enter your phone number');
        return;
    }

    if (password.length < 8) {
        showError('Password must be at least 8 characters long');
        return;
    }

    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
    }

    registerBtn.disabled = true;
    registerBtn.textContent = 'Registering...';

    try {
        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                password: password
            })
        });

        const data = await response.json();
        
        console.log('Registration response:', data);

        if (data.success) {
            showSuccess('Registration successful! Redirecting to login...');
            
            registerForm.reset();

            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            showError(data.message || 'Registration failed. Please try again.');
        }
    } catch (error) {
        console.error('Registration error:', error);
        showError('Could not connect to server. Please make sure the backend is running on http://localhost:3000');
    } finally {
        registerBtn.disabled = false;
        registerBtn.textContent = 'Register';
    }
});

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    errorMessage.style.color = '#ff4444';
}

function showSuccess(message) {
    errorMessage.innerHTML = message;
    errorMessage.style.display = 'block';
    errorMessage.style.color = '#44ff44';
}

document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Social login will be implemented soon');
    });
});

console.log('Register page loaded successfully!');
