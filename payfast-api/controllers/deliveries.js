var logger = require("../services/logger.js");

module.exports = function(app) {

	app.post("/api/delivery/calculate-date", function(req, res){
		var deliveryData = req.body;
		var correiosSOAPClient = new app.services.correiosSOAPClient();
		correiosSOAPClient.calculateDate(deliveryData,
			function(error, result){
				if (error) {
					logger.error("Failed to calculate delivery date: " + error);
					res.status(500).send(error);
					return;
				} else {
					logger.info("Delivery date calculated!");
					res.json(result);
				}
			}
		);
	});
}