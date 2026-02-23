let vipQuantity = 1;
let normalQuantity = 2;
let currentEventId = null;
let currentEventName = null;

const eventData = {
    1: { name: 'Tokha Food Fest', date: '8th & 9th January, 2026', vipPrice: 2500, normalPrice: 500 },
    2: { name: 'Tudikhel Food Fest', date: '25th & 26th January, 2026', vipPrice: 2500, normalPrice: 500 },
    4: { name: 'Bouddha Food Fest', date: '15th & 16th January, 2026', vipPrice: 2500, normalPrice: 500 }
};

document.addEventListener('DOMContentLoaded', function() {
    currentEventName = sessionStorage.getItem('eventName');
    currentEventId = parseInt(sessionStorage.getItem('eventId'), 10);

    if (!Number.isInteger(currentEventId)) {
        const fallbackName = document.getElementById('eventNameDisplay')?.textContent || '';
        currentEventId = Object.keys(eventData).find(id => eventData[id].name === fallbackName) || 1;
        currentEventId = parseInt(currentEventId, 10);
    }

    updateEventDisplay();

    const quantityButtons = document.querySelectorAll('.btn-quantity');
    quantityButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const ticketType = this.dataset.ticket;
            const isPlus = this.classList.contains('btn-plus');

            if (ticketType === 'vip') {
                vipQuantity = isPlus ? vipQuantity + 1 : Math.max(0, vipQuantity - 1);
                document.getElementById('vipQty').textContent = vipQuantity;
                updateSummary();
            } else if (ticketType === 'normal') {
                normalQuantity = isPlus ? normalQuantity + 1 : Math.max(0, normalQuantity - 1);
                document.getElementById('normalQty').textContent = normalQuantity;
                updateSummary();
            }
        });
    });

    const checkoutBtn = document.querySelector('.btn-checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }

    updateSummary();
});
function updateEventDisplay() {
    const event = eventData[currentEventId] || eventData[1];
    const eventDateDisplay = document.getElementById('eventDateDisplay');

    const eventNameDisplay = document.getElementById('eventNameDisplay');
    if (eventNameDisplay) {
        eventNameDisplay.textContent = currentEventName || event.name;
    }
    if (eventDateDisplay) {
        eventDateDisplay.textContent = event.date;
    }
}

function updateSummary() {
    const event = eventData[currentEventId] || eventData[1];
    const vipPrice = event.vipPrice;
    const normalPrice = event.normalPrice;

    const vipTotal = vipQuantity * vipPrice;
    const normalTotal = normalQuantity * normalPrice;
    const total = vipTotal + normalTotal;

    const summaryItems = document.querySelectorAll('.summary-item');
    
    if (summaryItems.length >= 3) {
        summaryItems[0].innerHTML = `<span class="item-label">${vipQuantity} x VIP Ticket</span><span class="item-price">${vipTotal}</span>`;
        summaryItems[1].innerHTML = `<span class="item-label">${normalQuantity} x Normal Ticket</span><span class="item-price">${normalTotal}</span>`;
        summaryItems[2].innerHTML = `<span class="item-label">Total</span><span class="item-price">${total}</span>`;
    }

    console.log('Summary Updated:', {
        vipQuantity,
        normalQuantity,
        vipTotal,
        normalTotal,
        total
    });
}

async function handleCheckout() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (!token || !userId) {
        alert('Please login first to complete your purchase');
        window.location.href = 'login.html';
        return;
    }
    
    if (vipQuantity === 0 && normalQuantity === 0) {
        alert('Please select at least one ticket');
        return;
    }
    
    const checkoutBtn = document.querySelector('.btn-checkout');
    checkoutBtn.disabled = true;
    checkoutBtn.textContent = 'Processing...';
    
    try {
        const event = eventData[currentEventId];
        const vipTotal = vipQuantity * event.vipPrice;
        const normalTotal = normalQuantity * event.normalPrice;
        const totalAmount = vipTotal + normalTotal;
        
        const response = await fetch('http://localhost:3000/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: userId,
                event_id: currentEventId,
                vip_ticket_count: vipQuantity,
                normal_ticket_count: normalQuantity,
                total_amount: totalAmount,
                payment_method: 'esewa'
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            sessionStorage.setItem('orderId', data.orderId);
            sessionStorage.setItem('totalAmount', totalAmount);
            sessionStorage.setItem('vipQuantity', vipQuantity);
            sessionStorage.setItem('normalQuantity', normalQuantity);
            
            window.location.href = 'checkout-2.html';
        } else {
            alert(data.message || 'Failed to create order. Please try again.');
            checkoutBtn.disabled = false;
            checkoutBtn.textContent = 'Checkout';
        }
    } catch (error) {
        alert('An error occurred while processing your order. Please try again.');
        checkoutBtn.disabled = false;
        checkoutBtn.textContent = 'Checkout';
    }
}

console.log('Checkout page loaded successfully!');
