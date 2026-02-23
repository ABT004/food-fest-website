const verifyOtpForm = document.getElementById('verifyOtpForm');
const otpInput = document.getElementById('otpInput');
const errorMessage = document.getElementById('errorMessage');
const verifyBtn = document.getElementById('verifyBtn');
const emailDisplay = document.getElementById('emailDisplay');
const resendOtpLink = document.getElementById('resendOtpLink');

window.addEventListener('load', () => {
    const email = sessionStorage.getItem('email');
    const userId = sessionStorage.getItem('userId');
    
    if (!email || !userId) {
        showError('Session expired. Please register again.');
        setTimeout(() => {
            window.location.href = 'register.html';
        }, 2000);
        return;
    }
    
    const maskedEmail = maskEmail(email);
    emailDisplay.textContent = `We've sent a verification code to ${maskedEmail}`;
});

verifyOtpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const otp = otpInput.value.trim();
    const email = sessionStorage.getItem('email');
    const userId = sessionStorage.getItem('userId');
    
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';
    if (!otp) {
        showError('Please enter the OTP code');
        return;
    }
    
    if (otp.length < 4) {
        showError('OTP must be at least 4 digits');
        return;
    }
    
    verifyBtn.disabled = true;
    verifyBtn.textContent = 'Verifying...';
    
    try {
        const response = await fetch('http://localhost:3000/api/auth/verify-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: userId,
                email: email,
                otp_code: otp
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showSuccess('OTP verified successfully! Redirecting...');
            
            sessionStorage.removeItem('email');
            sessionStorage.removeItem('userId');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        } else {
            showError(data.message || 'Invalid OTP. Please try again.');
        }
    } catch (error) {
        console.error('OTP verification error:', error);
        showError('An error occurred. Please check your connection and try again.');
    } finally {
        verifyBtn.disabled = false;
        verifyBtn.textContent = 'Verify OTP';
    }
});

resendOtpLink.addEventListener('click', async (e) => {
    e.preventDefault();
    
    const email = sessionStorage.getItem('email');
    const userId = sessionStorage.getItem('userId');
    
    if (!email || !userId) {
        showError('Session expired. Please register again.');
        return;
    }
    
    resendOtpLink.disabled = true;
    resendOtpLink.textContent = 'Sending...';
    
    try {
        const response = await fetch('http://localhost:3000/api/auth/resend-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                purpose: 'registration'
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showSuccess('OTP sent! Check your email.');
            setTimeout(() => {
                resendOtpLink.disabled = false;
                resendOtpLink.textContent = 'Resend OTP';
            }, 30000);
        } else {
            showError(data.message || 'Failed to resend OTP. Please try again.');
            resendOtpLink.disabled = false;
            resendOtpLink.textContent = 'Resend OTP';
        }
    } catch (error) {
        console.error('Resend OTP error:', error);
        showError('An error occurred. Please try again.');
        resendOtpLink.disabled = false;
        resendOtpLink.textContent = 'Resend OTP';
    }
});

otpInput.addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '');
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

function maskEmail(email) {
    const [name, domain] = email.split('@');
    const maskedName = name.charAt(0) + '*'.repeat(name.length - 2) + name.charAt(name.length - 1);
    return maskedName + '@' + domain;
}

console.log('OTP verification page loaded successfully!');
