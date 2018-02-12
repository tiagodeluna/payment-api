var restify = require("restify-clients");

function CardClient() {
    this._client = restify.createJsonClient({
        url:"http://localhost:3001"
    });
}

CardClient.prototype.authorize = function(card, callback) {
	this._client.post("/api/cards/authorize", card, callback);
}

module.exports = function(){
    return CardClient;
}