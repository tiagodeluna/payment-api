var memcached = require("memcached");

/*
Memcached is a free, open source, and high-performing framework for caching objects in memory. It is generic
 by nature, but with a strong intention to accelerate the processing of dynamic web applications, easing the
 load of access to the database.

It works based on a key-value scheme that stores small pieces of data of any desired type (string, objects ...)
 in memory. This data may come from database queries, other APIs, or even from page loading.
*/

module.exports = function(){
	return createMemcachedClient;
}

function createMemcachedClient(){
	var client = new memcached("localhost:11211", {
	    retries: 10, //number of retries
	    retry: 10000, //intreval to retry a failed node
	    remove: true //to remove dead nodes
	});

	return client;
}

//Add object to cache
//client.set("payment-2", {"id":2}, 600000, function callback(error){
//    console.log("New key added to cache");
//});
