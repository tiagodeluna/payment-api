var winston = require("winston");
var fs = require("fs");

//Creates logs folder, if it does not exist
if (!fs.existsSync("logs")) {
	fs.mkdirSync("logs");
}

var logger = winston.createLogger({
	transports: [
		//new winston.transports.Console(),
		new winston.transports.File({
			name: "combined_log",
			level: "info",
			filename: "logs/combined.log",
			maxsize: 100000,
			maxFiles: 10
		}),
		new winston.transports.File({
			name: "error_log",
			level: "error",
			filename: "logs/error.log",
			maxsize: 100000,
			maxFiles: 10
		})
	]
});


//Creates a Console Logger if not in Production
if (process.env.NODE_ENV !== "production") {
	logger.add(new winston.transports.Console());
}

module.exports = logger;