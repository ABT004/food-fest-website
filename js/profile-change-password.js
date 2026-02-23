document.addEventListener('DOMContentLoaded', function() {
    const changePasswordForm = document.getElementById('changePasswordForm');
    const currentPassword = document.getElementById('currentPassword');
    const newPassword = document.getElementById('newPassword');
    const retypePassword = document.getElementById('retypePassword');

    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();

            if (!currentPassword.value.trim()) {
                alert('Please enter your current password');
                currentPassword.focus();
                return;
            }

            if (!newPassword.value.trim()) {
                alert('Please enter a new password');
                newPassword.focus();
                return;
            }

            if (newPassword.value.length < 8) {
                alert('Password must be at least 8 characters long');
                newPassword.focus();
                return;
            }

            if (!retypePassword.value.trim()) {
                alert('Please confirm your new password');
                retypePassword.focus();
                return;
            }

            if (newPassword.value !== retypePassword.value) {
                alert('New passwords do not match');
                retypePassword.focus();
                return;
            }

            if (currentPassword.value === newPassword.value) {
                alert('New password must be different from current password');
                newPassword.focus();
                return;
            }

            console.log('Password change attempt:', {
                success: true,
                message: 'Passwords validated successfully'
            });

            alert('Password would be changed successfully!\n\nIn production, this would connect to backend.');
            changePasswordForm.reset();
        });
    }

    console.log('Change Password Page Loaded', {
        timestamp: new Date().toISOString(),
        page: 'profile-change-password'
    });

console.log('Password strength:', strength);
    });
});
