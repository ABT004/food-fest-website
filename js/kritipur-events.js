document.querySelectorAll('.btn-buy-now').forEach(button => {
    button.addEventListener('click', function() {
        window.location.href = '/html/checkout-1.html';
    });
});

document.addEventListener('visibilitychange', function() {
    const sliderTrack = document.querySelector('.slider-track');
    if (document.hidden) {
        sliderTrack.style.animationPlayState = 'paused';
    } else {
        sliderTrack.style.animationPlayState = 'running';
    }
});

console.log('Kritipur Events page loaded');
