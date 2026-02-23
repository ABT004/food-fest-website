document.querySelectorAll('.btn-details').forEach(button => {
});

document.addEventListener('visibilitychange', function() {
    const track = document.querySelector('.slider-track');
    if (track) {
        track.style.animationPlayState = document.hidden ? 'paused' : 'running';
    }
});

console.log('Events page loaded successfully!');
