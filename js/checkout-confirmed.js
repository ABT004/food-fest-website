document.addEventListener('DOMContentLoaded', function() {
    const confirmationContainer = document.querySelector('.checkout-confirmed-content');

    if (confirmationContainer) {
        document.addEventListener('click', function() {
            console.log('Exiting checkout confirmation page');
            
            window.location.href = '../HTML/index.html';
        });
    }

    console.log('Order Confirmed Page Loaded', {
        timestamp: new Date().toISOString(),
        page: 'checkout-confirmed'
    });
});
