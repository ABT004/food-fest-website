document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    if (document.querySelector('.hamburger-menu')) return;

    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger-menu';
    hamburger.setAttribute('aria-label', 'Toggle menu');
    hamburger.innerHTML = `
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
    `;

    navbar.insertBefore(hamburger, navbar.firstChild);

    const navLinks = document.querySelector('.nav-links');
    const navButtons = document.querySelector('.nav-buttons');
    const userSection = document.querySelector('.user-section');
    
    let mobileMenu = document.querySelector('.mobile-menu');
    if (!mobileMenu && (navLinks || navButtons || userSection)) {
        mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        navbar.appendChild(mobileMenu);

        const logo = navbar.querySelector('.navbar-logo, .logo, .logo-img');
        const logoContainer = navbar.querySelector('.navbar-logo, .logo');
        if (logoContainer) {
            const clonedLogo = logoContainer.cloneNode(true);
            clonedLogo.className = 'mobile-menu-logo';
            mobileMenu.appendChild(clonedLogo);
        }

        if (navLinks) {
            const clonedNavLinks = navLinks.cloneNode(true);
            mobileMenu.appendChild(clonedNavLinks);
        }
        if (navButtons) {
            const clonedNavButtons = navButtons.cloneNode(true);
            mobileMenu.appendChild(clonedNavButtons);
        }
        if (userSection) {
            const clonedUserSection = userSection.cloneNode(true);
            mobileMenu.appendChild(clonedUserSection);
        }
    }

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        if (mobileMenu) {
            mobileMenu.classList.toggle('active');
        }
    });

    if (mobileMenu) {
        const allLinks = mobileMenu.querySelectorAll('a, button');
        allLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }


    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navbar.contains(event.target);
        if (!isClickInsideMenu && hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
        }
    });
});
