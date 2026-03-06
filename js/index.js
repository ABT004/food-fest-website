document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

document.querySelectorAll('.btn-details').forEach(button => {
    button.addEventListener('click', function() {
        
    });
});

document.querySelectorAll('.btn-vendor, .btn-sponsor').forEach(button => {
    button.addEventListener('click', function() {
        window.location.href = 'contact-us-vendor-sponsor.html';
    });
});

document.querySelector('.btn-ticket').addEventListener('click', function() {
});

document.querySelector('.btn-login').addEventListener('click', function() {
});

document.querySelector('.btn-explore').addEventListener('click', function() {
    document.getElementById('events').scrollIntoView({ behavior: 'smooth' });
});

document.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#bfbfbf';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#d9d9d9';
    });
});

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.animation = 'fadeIn 0.5s ease-in';
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('.gallery-item img').forEach(img => {
        imageObserver.observe(img);
    });
}

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

document.addEventListener('visibilitychange', function() {
    const track = document.querySelector('.gallery-track');
    if (track) {
        if (document.hidden) {
            track.style.animationPlayState = 'paused';
        } else {
            track.style.animationPlayState = 'running';
        }
    }
});

// FAQ Accordion functionality
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', function() {
        const faqId = this.getAttribute('data-faq');
        const faqAnswer = document.getElementById('faq-' + faqId);
        const isActive = faqAnswer.classList.contains('active');
        
        // Close all other open FAQs
        document.querySelectorAll('.faq-answer.active').forEach(answer => {
            answer.classList.remove('active');
        });
        document.querySelectorAll('.faq-question.active').forEach(q => {
            q.classList.remove('active');
        });
        
        // Toggle current FAQ
        if (!isActive) {
            faqAnswer.classList.add('active');
            this.classList.add('active');
        }
    });
});

console.log('Food Fest Website with video and sliding gallery loaded successfully!');
