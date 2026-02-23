async function eventHandler(req, res, pathname, method, sendJSON) {
    const pool = req.pool;

    // GET /api/events - Get all events
    if (pathname === '/api/events' && method === 'GET') {
        try {
            const [events] = await pool.query(
                'SELECT * FROM events WHERE is_active = TRUE ORDER BY event_date ASC'
            );

            return sendJSON(res, 200, {
                success: true,
                events: events
            });
        } catch (error) {
            console.error('Get events error:', error);
            return sendJSON(res, 500, {
                success: false,
                message: 'Failed to fetch events'
            });
        }
    }

    // GET /api/events/:eventId - Get specific event
    const eventIdMatch = pathname.match(/^\/api\/events\/(\d+)$/);
    if (eventIdMatch && method === 'GET') {
        const eventId = parseInt(eventIdMatch[1]);

        try {
            const [events] = await pool.query(
                'SELECT * FROM events WHERE event_id = ?',
                [eventId]
            );

            if (events.length === 0) {
                return sendJSON(res, 404, {
                    success: false,
                    message: 'Event not found'
                });
            }

            return sendJSON(res, 200, {
                success: true,
                event: events[0]
            });
        } catch (error) {
            console.error('Get event error:', error);
            return sendJSON(res, 500, {
                success: false,
                message: 'Failed to fetch event'
            });
        }
    }

    // GET /api/events/:eventId/availability
    const availabilityMatch = pathname.match(/^\/api\/events\/(\d+)\/availability$/);
    if (availabilityMatch && method === 'GET') {
        const eventId = parseInt(availabilityMatch[1]);

        try {
            const [events] = await pool.query(
                'SELECT vip_tickets_available, normal_tickets_available, vip_price, normal_price FROM events WHERE event_id = ? AND is_active = TRUE',
                [eventId]
            );

            if (events.length === 0) {
                return sendJSON(res, 404, {
                    success: false,
                    message: 'Event not found'
                });
            }

            return sendJSON(res, 200, {
                success: true,
                availability: events[0]
            });
        } catch (error) {
            console.error('Check availability error:', error);
            return sendJSON(res, 500, {
                success: false,
                message: 'Failed to check availability'
            });
        }
    }

    return sendJSON(res, 404, { success: false, message: 'Route not found' });
}

module.exports = eventHandler;
