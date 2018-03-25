var logger = require("../services/logger.js");
var fs = require("fs");

module.exports = function(app){

	app.post("/api/upload/image", function(req, res){
		logger.info("Receiving image");

		var filename = req.headers.filename;

		//The Request already implements the 'fs' stream feature. In order to use stream,
		// the client has to pass "Content-type: application/octet-stream" in the header
		req.pipe(fs.createWriteStream("files/"+filename))
			//Listener for finishing the process
			.on("finish", function(){
				logger.info("File written");
				res.status(201).send("Finished!");
			});

	});
}