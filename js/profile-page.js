document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/html/login.html';
        return;
    }

    const userName = localStorage.getItem('userName') || 'User';
    const userEmail = localStorage.getItem('userEmail') || '';
    const userPhone = localStorage.getItem('userPhone') || '';
    let userAvatar = localStorage.getItem('userAvatar') || DEFAULT_AVATAR;

    console.log('Profile Page - User Data:', { userName, userEmail, userPhone, hasCustomAvatar: userAvatar !== DEFAULT_AVATAR });

    const isPhoneLike = (value) => /^\+?\d[\d\s-]{5,}$/.test((value || '').trim());
    const displayName = isPhoneLike(userName) ? 'User' : userName;

    const userNameElements = document.querySelectorAll('.user-name');
    userNameElements.forEach(el => el.textContent = displayName);

    const applyAvatar = (avatarUrl) => {
        const sidebarAvatar = document.getElementById('sidebarAvatar');
        if (sidebarAvatar) {
            sidebarAvatar.style.backgroundImage = `url('${avatarUrl}')`;
            sidebarAvatar.style.backgroundSize = 'cover';
            sidebarAvatar.style.backgroundPosition = 'center';
        }

        if (profileAvatar) {
            profileAvatar.style.backgroundImage = `url('${avatarUrl}')`;
            profileAvatar.style.backgroundSize = 'cover';
            profileAvatar.style.backgroundPosition = 'center';
        }

        const navUserAvatar = document.getElementById('navUserAvatar');
        if (navUserAvatar) {
            navUserAvatar.src = avatarUrl;
        }

        const userAvatarLarge = document.querySelector('.user-avatar-large');
        if (userAvatarLarge) {
            userAvatarLarge.style.backgroundImage = `url('${avatarUrl}')`;
            userAvatarLarge.style.backgroundSize = 'cover';
            userAvatarLarge.style.backgroundPosition = 'center';
        }
    };

    const sidebarUserName = document.getElementById('sidebarUserName');
    if (sidebarUserName) {
        sidebarUserName.textContent = displayName;
    }

    const profileAvatar = document.getElementById('profileAvatar');
    const avatarFileInput = document.getElementById('avatarFileInput');
    if (profileAvatar) {
        applyAvatar(userAvatar);
        
        profileAvatar.addEventListener('mouseenter', function() {
            this.style.opacity = '0.8';
        });
        profileAvatar.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    }

    applyAvatar(userAvatar);


    const userId = localStorage.getItem('userId');
    if (userId && token && userAvatar === DEFAULT_AVATAR) {
        fetch(`http://localhost:3000/api/profile/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.success && data.user && data.user.avatar) {
                    userAvatar = data.user.avatar;
                    localStorage.setItem('userAvatar', userAvatar);
                    applyAvatar(userAvatar);
                }
            })
            .catch(error => {
                console.error('Error loading avatar:', error);
            });
    }

    const nameInput = document.getElementById('profileName');
    if (nameInput && displayName) nameInput.value = displayName;

    const emailInput = document.getElementById('profileEmail');
    if (emailInput && userEmail) emailInput.value = userEmail;

    const phoneInput = document.getElementById('profilePhone');
    if (phoneInput && userPhone) phoneInput.value = userPhone;


    const editButton = document.querySelector('.edit-button');
    if (editButton) {
        console.log('Edit button found and listener attached');
        editButton.addEventListener('click', function() {
            console.log('Edit button clicked');
            const inputs = document.querySelectorAll('.field-input input');
            console.log('Found inputs:', inputs.length);
            if (inputs.length === 0) return;
            
            const isEditing = inputs[0].hasAttribute('readonly');
            console.log('Is currently readonly:', isEditing);
            
            inputs.forEach(input => {
                if (isEditing) {
                    input.removeAttribute('readonly');
                    input.style.backgroundColor = '#e8f4f8';
                    input.style.border = '2px solid #1089d3';
                    input.style.cursor = 'text';
                } else {
                    input.setAttribute('readonly', true);
                    input.style.backgroundColor = '';
                    input.style.border = '';
                    input.style.cursor = 'default';
                    
                    if (input.id === 'profileName' && input.value) {
                        const newName = input.value;
                        console.log('Saving userName:', newName);
                        localStorage.setItem('userName', newName);
                        userNameElements.forEach(el => el.textContent = newName);
                        if (sidebarUserName) sidebarUserName.textContent = newName;
                    }
                    if (input.id === 'profileEmail' && input.value) {
                        console.log('Saving userEmail:', input.value);
                        localStorage.setItem('userEmail', input.value);
                    }
                    if (input.id === 'profilePhone' && input.value) {
                        console.log('Saving userPhone:', input.value);
                        localStorage.setItem('userPhone', input.value);
                    }
                }
            });
            
            const editText = this.querySelector('.edit-text');
            if (editText) {
                editText.textContent = isEditing ? 'Save Changes' : 'Change Profile Information';
            }
        });
    } else {
        console.error('Edit button not found!');
    }

    if (avatarFileInput) {
        avatarFileInput.addEventListener('change', async function(event) {
            const file = event.target.files[0];
            if (!file) return;

            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                alert('Image size must be less than 5MB');
                return;
            }

            if (!file.type.startsWith('image/')) {
                alert('Please select a valid image file');
                return;
            }

            try {
                const reader = new FileReader();
                reader.onload = async function(e) {
                    const base64Avatar = e.target.result;

                    localStorage.setItem('userAvatar', base64Avatar);
                    applyAvatar(base64Avatar);

                    const profileAvatar = document.getElementById('profileAvatar');
                    const originalOpacity = profileAvatar.style.opacity;
                    profileAvatar.style.opacity = '0.5';

                    try {
                        const userId = localStorage.getItem('userId');
                        const token = localStorage.getItem('token');

                        if (!userId || !token) {
                            alert('User session not found');
                            profileAvatar.style.opacity = originalOpacity;
                            return;
                        }

                        const response = await fetch(`http://localhost:3000/api/profile/${userId}/avatar`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify({ avatarData: base64Avatar })
                        });

                        const data = await response.json();

                        if (data.success) {
                            alert('Avatar updated successfully!');
                        } else {
                            console.warn('Avatar update failed:', data.message);
                            alert(data.message || 'Failed to update avatar on server.');
                        }
                    } catch (error) {
                        console.error('Error updating avatar:', error);
                        alert('Avatar saved locally, but failed to upload to server.');
                    } finally {
                        profileAvatar.style.opacity = originalOpacity;
                    }
                };
                
                reader.readAsDataURL(file);
            } catch (error) {
                console.error('Error reading file:', error);
                alert('Error reading file. Please try again.');
            }

            avatarFileInput.value = '';
        });
    }
});

console.log('Profile Page JavaScript Loaded');
