document.addEventListener('DOMContentLoaded', function() {
    const failureContainer = document.querySelector('.checkout-failed-content');

    if (failureContainer) {
        document.addEventListener('click', function() {
            console.log('Exiting checkout failure page');
            
            window.location.href = '../HTML/checkout-1.html';
        });
    }

    console.log('Order Failed Page Loaded', {
        timestamp: new Date().toISOString(),
        page: 'checkout-failed',
        action: 'Click anywhere to retry'
    });
});
