const cluster = require("cluster");
const os = require("os");
const logger = require("./services/logger.js");

logger.info("Executing thread");

//MASTER
if (cluster.isMaster) {
	console.log("MASTER thread");

	//Gets the list of CPUs running and create workers for each one
	os.cpus().forEach(function() {
		cluster.fork();
	})

	//Displays worker Id when event Listen is started
	cluster.on("listening", function(worker){
		logger.info("Connected thread: " + worker.process.pid);
	});

  	cluster.on("disconnect", worker => {
        console.log("Thread %d disconnected", worker.process.pid);
	});

	//When a process is finished for some reason, a new process is created to replace it
	cluster.on("exit", worker => {
		logger.info("Lost thread %d. Creating a new one...", worker.process.pid);
		cluster.fork();
	});

//SLAVE
} else {
	console.log("SLAVE thread");
	require("./index.js");
}