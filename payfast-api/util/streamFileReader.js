var fs = require("fs");

fs.createReadStream("maze.jpg")
	.pipe(fs.createWriteStream("maze3.jpg"))
	.on("finish", function(){
		console.log("File written");
	});