module.exports = function(app) {

	app.post("/api/delivery/calculate-date", function(req, res){
		var deliveryData = req.body;
		var correiosSOAPClient = new app.services.correiosSOAPClient();
		correiosSOAPClient.calculateDate(deliveryData,
			function(error, result){
				if (error) {
					res.status(500).send(error);
					return;
				} else {
					console.log("Delivery date calculated!");
					res.json(result);
				}
			}
		);
	});
}