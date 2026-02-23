// Stub handler for payment routes
async function paymentHandler(req, res, pathname, method, sendJSON) {
    return sendJSON(res, 200, { success: true, message: 'Payment endpoints available' });
}

module.exports = paymentHandler;
