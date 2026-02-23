const DEFAULT_AVATAR = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%231089d3"/%3E%3Ccircle cx="50" cy="35" r="18" fill="white"/%3E%3Cpath d="M20 85 Q20 55 50 55 Q80 55 80 85 Z" fill="white"/%3E%3C/svg%3E';

document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    const userAvatar = localStorage.getItem('userAvatar') || DEFAULT_AVATAR;
    
    const navButtons = document.querySelector('.nav-buttons');
    
    if (token && navButtons) {
        navButtons.innerHTML = `
            <img src="${userAvatar}" 
                 alt="${userName || 'User'}" 
                 class="user-avatar-nav" 
                 onclick="window.location.href='/html/profile-page.html'"
                 title="${userName || 'Profile'}"
                 style="width: 40px; height: 40px; border-radius: 50%; cursor: pointer; object-fit: cover; border: 2px solid #fff; margin-right: 15px;">
            <button class="btn-ticket" onclick="window.location.href='/html/events.html'">Buy Ticket</button>
        `;
    }

    if (token) {
        const userAvatars = document.querySelectorAll('.user-avatar');
        userAvatars.forEach(avatar => {
            avatar.src = userAvatar;
        });
    }

    const logos = document.querySelectorAll('img.logo');
    logos.forEach(logo => {
        if (!logo.src || logo.src.includes('food-jatra-logo.png')) {
            logo.src = '/pictures/logo.png';
        }
    });
});

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userAvatar');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPhone');
    
    sessionStorage.clear();
    
    window.location.href = '/html/index.html';
}

window.logout = logout;
