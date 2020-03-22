/**
 * Get the ip address from the incoming request,
 * this works even if the app is behind a proxy.
 * @param {Request} req express request
 * @returns {string} request address
 */
function getRequestAddress(req) {
    // Ip if there's a proxy (e.g.: nginx) forwarding the request.
    const addressProxy = (req.headers['x-forwarded-for'] || '').split(',').pop();

    // Ip from connection or socket.
    const connectionAddress = (
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress
    );
    return addressProxy || connectionAddress;
}

module.exports = {
    getRequestAddress,
};
