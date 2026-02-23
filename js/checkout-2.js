document.addEventListener('DOMContentLoaded', function() {
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const confirmEmail = document.getElementById('confirmEmail');
    const loginMessage = document.getElementById('loginMessage');
    const confirmEmailLabel = document.getElementById('confirmEmailLabel');
    
    if (token && userName) {
        if (loginMessage) {
            loginMessage.style.display = 'none';
        }
        
        const firstNameValue = nameParts[0] || '';
        const lastNameValue = nameParts.slice(1).join(' ') || '';
        
        if (firstName) {
            firstName.parentElement.querySelector('label').style.display = 'none';
        }
        if (lastName) {
            lastName.value = lastNameValue;
            lastName.parentElement.querySelector('label').style.display = 'none';
        if (email && userEmail) {
            email.value = userEmail;
            email.parentElement.querySelector('label').style.display = 'none';
        }
        if (confirmEmail) {
            confirmEmail.parentElement.querySelector('label').style.display = 'none';
        }
    }
    
    const placeOrderBtn = document.querySelector('.btn-place-order');

    const paymentOptions = document.querySelectorAll('.payment-option');
    let selectedPayment = null;
paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            paymentOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            
            const paymentName = this.querySelector('.payment-name').textContent;
            selectedPayment = paymentName;
            
            console.log('Payment method selected:', selectedPayment);
        });
    });

    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', function() {
            const token = localStorage.getItem('token');
            
            if (!token) {
                if (!firstName.value.trim()) {
                    alert('Please enter your first name');
                    firstName.focus();
                    return;
                }

                if (!lastName.value.trim()) {
                    alert('Please enter your last name');
                    lastName.focus();
                    return;
                }

                if (!email.value.trim()) {
                    alert('Please enter your email address');
                    email.focus();
                    return;
                }

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email.value)) {
                    alert('Please enter a valid email address');
                    email.focus();
                    return;
                }

                if (!confirmEmail.value.trim()) {
                    alert('Please confirm your email address');
                    confirmEmail.focus();
                    return;
                }

                if (email.value !== confirmEmail.value) {
                    alert('Email addresses do not match');
                    confirmEmail.focus();
                    return;
                }
            }

            if (!selectedPayment) {
                alert('Please select a payment method');
                return;
            }

            handlePlaceOrder();
        });
    }

    if (paymentOptions.length > 0) {
        paymentOptions[0].click();
    }
    
    updateOrderSummary();
});

function updateOrderSummary() {
    const orderId = sessionStorage.getItem('orderId');
    const totalAmount = sessionStorage.getItem('totalAmount');
    const eventName = sessionStorage.getItem('eventName');
    
    const eventData = {
        1: { name: 'Tokha Food Fest', date: '8th & 9th January, 2026', vipPrice: 2500, normalPrice: 500 },
        2: { name: 'Tudikhel Food Fest', date: '25th & 26th January, 2026', vipPrice: 2500, normalPrice: 500 },
        3: { name: 'Kritipur Food Fest', date: '15th & 16th January, 2026', vipPrice: 2500, normalPrice: 500 },
        4: { name: 'Bouddha Food Fest', date: '15th & 16th January, 2026', vipPrice: 2500, normalPrice: 500 }
    };
    
    if (eventName) {
        const eventNameDisplay = document.querySelector('.event-name');
        if (eventNameDisplay) {
            eventNameDisplay.textContent = eventName;
        }
    }
    
    if (eventId && eventData[eventId]) {
        const eventDateDisplay = document.querySelector('.event-date');
        if (eventDateDisplay) {
            eventDateDisplay.textContent = eventData[eventId].date;
        }
    }
    
    if (eventId && eventData[eventId]) {
    const normalQty = sessionStorage.getItem('normalQuantity') || 2;
    const vipPrice = eventData[eventId]?.vipPrice || 2500;
    const normalPrice = eventData[eventId]?.normalPrice || 500;
    
    const vipTotal = vipQty * vipPrice;
    const normalTotal = normalQty * normalPrice;
    const total = vipTotal + normalTotal;
    
    const summaryItems = document.querySelectorAll('.summary-item');
    if (summaryItems.length >= 3) {
        summaryItems[0].innerHTML = `<span class="item-label">${vipQty} x VIP Ticket</span><span class="item-price">${vipTotal}</span>`;
        summaryItems[1].innerHTML = `<span class="item-label">${normalQty} x Normal Ticket</span><span class="item-price">${normalTotal}</span>`;
        summaryItems[2].innerHTML = `<span class="item-label">Total</span><span class="item-price">${total}</span>`;
    }
}

async function handlePlaceOrder() {
    const token = localStorage.getItem('token');
    const orderId = sessionStorage.getItem('orderId');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const confirmEmail = document.getElementById('confirmEmail');
    const paymentOptions = document.querySelectorAll('.payment-option');
    let selectedPayment = null;
    
    paymentOptions.forEach(option => {
        if (option.classList.contains('selected')) {
            selectedPayment = option.querySelector('.payment-name').textContent;
        }
    });
    
    const placeOrderBtn = document.querySelector('.btn-place-order');
    placeOrderBtn.disabled = true;
    placeOrderBtn.textContent = 'Processing...';
    
    try {
        const orderData = {
            orderId: orderId,
            firstName: firstName.value || localStorage.getItem('userName')?.split(' ')[0] || '',
            lastName: lastName.value || localStorage.getItem('userName')?.split(' ').slice(1).join(' ') || '',
            email: email.value || localStorage.getItem('userEmail') || '',
            alternativeEmail: confirmEmail.value || null,
            paymentMethod: selectedPayment.toLowerCase().replace('-', ''),
            eventUpdates: document.getElementById('eventUpdates').checked,
            eventEmails: document.getElementById('eventEmails').checked
        };
        
        console.log('Order data:', orderData);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const success = true;
        
        if (success) {
            sessionStorage.setItem('orderConfirmed', 'true');
            sessionStorage.setItem('confirmationEmail', orderData.email);
            
            window.location.href = 'checkout-confirmed.html';
        } else {
            window.location.href = 'checkout-failed.html';
        }
    } catch (error) {
        console.error('Order processing error:', error);
        window.location.href = 'checkout-failed.html';
    }
}
