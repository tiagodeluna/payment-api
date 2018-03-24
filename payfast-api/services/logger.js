var winston = require("winston");
var fs = require("fs");

//Creates logs folder, if it does not exist
if (!fs.existsSync("logs")) {
	fs.mkdirSync("logs");
}

var logger = new winston.Logger({
	transports: [
		new winston.transports.File({
			name: "log1",
			level: "info",
			filename: "logs/combined.log",
			maxsize: 100000,
			maxFiles: 10
		}),
		new winston.transports.File({
			name: "log2",
			level: "error",
			filename: "logs/error.log",
			maxsize: 100000,
			maxFiles: 10
		})
	]
});


/*
if (process.env.NODE_ENV !== "production") {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
*/
module.exports = logger;