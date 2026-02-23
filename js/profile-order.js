document.addEventListener('DOMContentLoaded', function () {
    const orderRows = document.querySelectorAll('.table-row:not(.header-row)');
    orderRows.forEach(row => {
        row.addEventListener('click', function () {
            const locationCell = this.querySelector('.location-cell').textContent.trim();
            const dateCell = this.querySelector('.date-cell').textContent.trim();
            
            if (locationCell && dateCell) {
                console.log('Order selected:', {
                    location: locationCell,
                    date: dateCell
                });
            }
        });

        row.style.cursor = 'pointer';
        row.addEventListener('mouseenter', function () {
            this.style.opacity = '0.8';
        });
        row.addEventListener('mouseleave', function () {
            this.style.opacity = '1';
        });
    });

    console.log('Profile Order page loaded - User viewing their orders');
});

function viewOrderDetails(orderId, orderDate) {
    if (!orderId || !orderDate) {
        alert('Invalid order information');
        return;
    }

    console.log('Order details viewed:', {
        orderId: orderId,
        orderDate: orderDate,
        timestamp: new Date().toISOString()
    });
}

    if (!orderId || !orderId.trim()) {
        alert('Invalid order ID');
        return;
    }

    console.log('Downloading receipt for order:', orderId);

    alert('Receipt download initiated for order: ' + orderId);
}

    if (!startDate || !endDate) {
        alert('Please provide valid date range');
        return;
    }

    const orderRows = document.querySelectorAll('.table-row:not(.header-row)');
    let visibleCount = 0;

    orderRows.forEach(row => {
        const dateCell = row.querySelector('.date-cell').textContent.trim();
        const orderDate = new Date(dateCell);
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (orderDate >= start && orderDate <= end) {
            row.style.display = 'grid';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });

    console.log(`Filtered orders - ${visibleCount} orders found in date range`);
}

function sortOrdersByDate(ascending = false) {
    const rows = Array.from(document.querySelectorAll('.table-row:not(.header-row)'));

    rows.sort((a, b) => {
        const dateA = new Date(a.querySelector('.date-cell').textContent);
        const dateB = new Date(b.querySelector('.date-cell').textContent);
        return ascending ? dateA - dateB : dateB - dateA;
    });

    rows.forEach(row => {
        tableContainer.appendChild(row);
    });

    console.log('Orders sorted by date -', ascending ? 'oldest first' : 'newest first');
}

function searchOrdersByLocation(searchTerm) {
        console.log('Showing all orders');
        const orderRows = document.querySelectorAll('.table-row:not(.header-row)');
        orderRows.forEach(row => row.style.display = 'grid');
        return;
    }

    const searchLower = searchTerm.toLowerCase();
    const orderRows = document.querySelectorAll('.table-row:not(.header-row)');
    let foundCount = 0;

    orderRows.forEach(row => {
        const location = row.querySelector('.location-cell').textContent.toLowerCase();
        if (location.includes(searchLower)) {
            row.style.display = 'grid';
            foundCount++;
        } else {
            row.style.display = 'none';
        }
    });

    console.log(`Search results: ${foundCount} orders found for location "${searchTerm}"`);
}

function getOrderStatistics() {
    const orderRows = document.querySelectorAll('.table-row:not(.header-row)');
    let totalOrders = orderRows.length;

    const locations = new Set();

    orderRows.forEach(row => {
        const location = row.querySelector('.location-cell').textContent.trim();
        locations.add(location);

        const ticketsCell = row.querySelector('.tickets-cell').textContent;
        const vipMatch = ticketsCell.match(/VIP Ticket x (\d+)/);
        const normalMatch = ticketsCell.match(/Normal Ticket x (\d+)/);
        
        if (vipMatch) totalTickets += parseInt(vipMatch[1]);
        if (normalMatch) totalTickets += parseInt(normalMatch[1]);
    });

    const stats = {
        totalOrders: totalOrders,
        uniqueLocations: locations.size,
        totalTickets: totalTickets,
        averageTicketsPerOrder: totalOrders > 0 ? (totalTickets / totalOrders).toFixed(2) : 0
    };

    console.log('Order Statistics:', stats);
    return stats;
}

function cancelOrder(orderId, orderDate) {
    if (!orderId || !orderDate) {
        return;
    }

    const confirmCancel = confirm(`Are you sure you want to cancel this order from ${orderDate}? This action cannot be undone.`);
    
    if (!confirmCancel) {
        console.log('Order cancellation cancelled by user');
        return;
    }

    console.log('Order cancellation initiated:', {
        orderId: orderId,
        orderDate: orderDate,
        timestamp: new Date().toISOString()
    });

    alert('Order cancelled successfully!');
}

function exportOrdersToCSV() {
    const orderRows = document.querySelectorAll('.table-row:not(.header-row)');
    let csvContent = 'data:text/csv;charset=utf-8,';
    
    csvContent += 'Location,Date,VIP Tickets,Normal Tickets\n';
    orderRows.forEach(row => {
        const location = row.querySelector('.location-cell').textContent.trim();
        const date = row.querySelector('.date-cell').textContent.trim();
        const ticketsCell = row.querySelector('.tickets-cell').textContent;
        
        const vipMatch = ticketsCell.match(/VIP Ticket x (\d+)/);
        const normalMatch = ticketsCell.match(/Normal Ticket x (\d+)/);
        
        const vipCount = vipMatch ? vipMatch[1] : '0';
        const normalCount = normalMatch ? normalMatch[1] : '0';

        csvContent += `"${location}","${date}",${vipCount},${normalCount}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'orders.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log('Orders exported to CSV');
}

function initializeActionCells() {
    const actionCells = document.querySelectorAll('.action-cell');
    
    actionCells.forEach((cell, index) => {
        if (index > 0) {
            const locationCell = row.querySelector('.location-cell');
            const dateCell = row.querySelector('.date-cell');
            
            cell.style.cursor = 'pointer';
            cell.addEventListener('click', function (e) {
                e.stopPropagation();
                viewOrderDetails(index, dateCell.textContent.trim());
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    initializeActionCells();
    
    getOrderStatistics();
});
