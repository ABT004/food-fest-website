document.querySelector('.btn-events').addEventListener('click', function() {
    window.location.href = 'events.html';
});

document.addEventListener('visibilitychange', function() {
    const track = document.querySelector('.slider-track');
    if (track) {
        track.style.animationPlayState = document.hidden ? 'paused' : 'running';
    }
});

console.log('Event Expired page loaded successfully!');
