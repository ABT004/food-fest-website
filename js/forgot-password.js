document.getElementById('forgotPasswordForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('emailInput').value.trim();
    const newPassword = document.getElementById('newPasswordInput').value.trim();
    const retypePassword = document.getElementById('retypePasswordInput').value.trim();
    
    if (!email || !newPassword || !retypePassword) {
        alert('Please fill in all fields');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    if (newPassword.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }
    
    if (newPassword !== retypePassword) {
        alert('Passwords do not match!');
        return;
    }
    
    console.log('Password reset initiated for:', email);
    alert('OTP has been sent to your email address');
    
});

