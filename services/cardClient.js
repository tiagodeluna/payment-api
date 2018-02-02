var restify = require('restify');

var client = restify.createJsonClient({
	url:'http://localhost:3001'
});

client.post('/api/cards/authorize', function authorizeCard(error, req, res, result){
	console.log('Consuming cards service...');
	console.log(result);
})