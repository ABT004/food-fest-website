document.querySelectorAll('.btn-buy-now').forEach(button => {
    button.addEventListener('click', function() {
        window.location.href = '/html/checkout-1.html';
    });
});

document.addEventListener('visibilitychange', function() {
    const track = document.querySelector('.slider-track');
    if (track) {
        track.style.animationPlayState = document.hidden ? 'paused' : 'running';
    }
});

console.log('Tokha Food Fest 2026 page loaded successfully!');
