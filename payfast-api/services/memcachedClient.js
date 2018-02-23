var memcached = require("memcached");

var client = new memcached("localhost:11211", {
    retries: 10, //number of retries
    retry: 10000, //intreval to retry a failed node
    remove: true //to remove dead nodes
});

//Add object to cache
client.set("payment-2", {"id":2}, 600000, function callback(error){
    console.log("New key added to cache");
});

//Get object in cache by key
client.get("payment-2", function callback(error, result){
    if (error || !result) {
        console.log("MISS - Key not found");
    } else {
        console.log("HIT - value: " + JSON.stringify(result));
    }
});
