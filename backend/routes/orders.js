// Stub handler for order routes
async function orderHandler(req, res, pathname, method, sendJSON) {
    return sendJSON(res, 200, { success: true, message: 'Order endpoints available' });
}

module.exports = orderHandler;
