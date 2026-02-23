document.addEventListener('DOMContentLoaded', function () {
    const returnsRows = document.querySelectorAll('.returns-row');
    returnsRows.forEach(row => {
        row.addEventListener('click', function () {
            const locationCell = this.querySelector('.location-cell').textContent.trim();
            const dateCell = this.querySelector('.date-cell').textContent.trim();
            
            if (locationCell && dateCell) {
                console.log('Returns/Cancel item selected:', {
                    location: locationCell,
                    date: dateCell
                });
            }
        });
    });

    console.log('Profile Cancel page loaded - User viewing returns and cancellations');
});

function submitReturnRequest(orderId, reason) {
    if (!orderId || !orderId.trim()) {
        alert('Please select an order to return');
        return;
    }

    if (!reason || !reason.trim()) {
        alert('Please provide a reason for the return');
        return;
    }

    console.log('Return request submitted:', {
        orderId: orderId,
        reason: reason,
        timestamp: new Date().toISOString()
    });

    alert('Return request submitted successfully! We will process your request shortly.');
}

function submitCancellationRequest(orderId) {
    if (!orderId || !orderId.trim()) {
        alert('Please select an order to cancel');
        return;
    }

    console.log('Cancellation request submitted:', {
        orderId: orderId,
        timestamp: new Date().toISOString()
    });

    alert('Order cancellation request submitted! We will process it shortly.');
}

function filterByStatus(status) {
    const rows = document.querySelectorAll('.returns-row');
    
    rows.forEach(row => {
        const statusCell = row.querySelector('.status-cell.payment');
        if (status === 'all' || statusCell.textContent.includes(status)) {
            row.style.display = 'grid';
        } else {
            row.style.display = 'none';
        }
    });

    console.log('Filtered returns by status:', status);
}

function exportReturnsData() {
    const rows = document.querySelectorAll('.returns-row');
    const data = [];

    rows.forEach(row => {
        const location = row.querySelector('.location-cell').textContent.trim();
        const date = row.querySelector('.date-cell').textContent.trim();
        const payment = row.querySelector('.status-cell.payment').textContent.trim();
        const tickets = row.querySelector('.status-cell.tickets').textContent.trim();

        if (location && date) {
            data.push({
                location: location,
                date: date,
                payment: payment,
                tickets: tickets
            });
        }
    });

    console.log('Exported returns data:', data);
    
    return data;
}

function sortByDate() {
    const rowsContainer = document.querySelector('.profile-content-area');
    const rows = Array.from(document.querySelectorAll('.returns-row'));

    rows.sort((a, b) => {
        const dateA = new Date(a.querySelector('.date-cell').textContent);
        const dateB = new Date(b.querySelector('.date-cell').textContent);
        return dateB - dateA;
    });

    rows.forEach(row => {
        rowsContainer.appendChild(row);
    });

    console.log('Returns sorted by date (newest first)');
}

function viewReturnDetails(orderId) {
    const row = document.querySelector(`[data-order-id="${orderId}"]`);
    
    if (row) {
        const location = row.querySelector('.location-cell').textContent.trim();
        const date = row.querySelector('.date-cell').textContent.trim();
        const payment = row.querySelector('.status-cell.payment').textContent.trim();
        const tickets = row.querySelector('.status-cell.tickets').textContent.trim();

        console.log('Return details viewed:', {
            orderId: orderId,
            location: location,
            date: date,
            payment: payment,
            tickets: tickets
        });
    }
}

function markReturnAsComplete(orderId) {
    console.log('Return marked as complete:', orderId);
}
