const cluster = require("cluster");
const os = require("os");
const logger = require("./services/logger.js");

logger.info("Executing thread");

if (cluster.isMaster) {
	console.log("MASTER thread");

	//Gets the list of CPUs running and create workers for each one
	os.cpus().forEach(function() {
		cluster.fork();
	})

	//Displays cluster Id when event Listen is started
	cluster.on("listening", function(worker){
		logger.info("Connected cluster: " + worker.process.pid);
	});

	cluster.on("exit", worker => {
		logger.info("Disconnected cluster: %d", worker.process.pid);
		cluster.fork();
	});

} else {
	console.log("SLAVE thread");
	require("./index.js");
}