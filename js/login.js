const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');
const loginBtn = document.getElementById('loginBtn');

loginForm.addEventListener('submit', async (e) => {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    errorMessage.style.display = 'none';
    errorMessage.textContent = '';

    if (!email) {
        showError('Please enter your email');
        return;
    }

    if (!password) {
        showError('Please enter your password');
        return;
    }

    loginBtn.disabled = true;
    loginBtn.textContent = 'Logging in...';

    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();
        
        console.log('Login response:', data);

        if (data.success) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.user.userId);
            localStorage.setItem('userName', data.user.firstName + ' ' + data.user.lastName);
            localStorage.setItem('userEmail', data.user.email);
            localStorage.setItem('userPhone', data.user.phone || '');
            localStorage.setItem('userAvatar', data.user.avatar || DEFAULT_AVATAR);
            
            loginForm.reset();

            setTimeout(() => {
                window.location.href = '/html/index.html';
            }, 1500);
        } else {
            showError(data.message || 'Login failed. Please check your credentials.');
        }
    } catch (error) {
        console.error('Login error:', error);
        showError('Could not connect to server. Please make sure the backend is running on http://localhost:3000');
    } finally {
        loginBtn.disabled = false;
        loginBtn.textContent = 'Login';
    }
});

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    errorMessage.style.color = '#ff4444';
}

function showSuccess(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    errorMessage.style.color = '#44ff44';
}

document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Social login will be implemented soon');
    });
});

console.log('Login page loaded successfully!');
