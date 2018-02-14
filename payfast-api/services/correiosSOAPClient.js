var soap = require("soap");

function CorreiosSOAPClient() {
	this._url = "http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl";
}

CorreiosSOAPClient.prototype.calculateDate = function(args, callback){
	//For SOAP services, the method is called immediately after instantiation, so
	// the service instance (client) is returned as a parameter in the callback
	soap.createClient(this._url, function (error, client){
			console.log("SOAP Client created");
			//Calls the WS method
			client.CalcPrazo(args, callback);
		});
}

module.exports = function(){
	return CorreiosSOAPClient;
}