var fs = require("fs");

fs.readFile("maze.jpg", function(errRd, buffer){
	console.log("Read file");
	fs.writeFile("maze2.jpg", buffer, function(errWr){
		console.log("Written file");
	});
});