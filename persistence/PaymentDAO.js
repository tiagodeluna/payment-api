function PaymentDAO(connection) {
    this._connection = connection;
}

PaymentDAO.prototype.list = function(callback) {
    this._connection.query('SELECT * FROM payments', callback);
}

PaymentDAO.prototype.findById = function(id, callback) {
    this._connection.query('SELECT * FROM payments WHERE id = ?', id, callback);
}

PaymentDAO.prototype.save = function(payment, callback) {
    this._connection.query('INSERT INTO payments SET ?', payment, callback);
}

PaymentDAO.prototype.update = function(payment, callback) {
    this._connection.query('UPDATE payments SET status = ? WHERE id = ?',
        [payment.status, payment.id], callback);
}

module.exports = function() {
    return PaymentDAO;
}