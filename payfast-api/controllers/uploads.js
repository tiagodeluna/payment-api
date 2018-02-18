var fs = require("fs");

module.exports = function(app){

	app.post("/api/upload/image", function(req, res){
		console.log("Receiving image");

		var filename = req.headers.filename;

		//The Request already implements the 'fs' stream feature. In order to use stream,
		// the client has to pass "Content-type: application/octet-stream" in the header
		req.pipe(fs.createWriteStream("files/"+filename))
			//Listener for finishing the process
			.on("finish", function(){
				console.log("File written");
				res.status(201).send("Finished!");
			});

	});
}