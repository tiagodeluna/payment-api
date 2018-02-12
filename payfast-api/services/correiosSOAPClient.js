var soap = require("soap");

soap.createClient("http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl",
	//For SOAP services, the instance is returned as a parameter in the callback
	function (error, client){
		console.log("SOAP Client created");
		client.CalcPrazo(
			{"nCdServico":"40010",
			"sCepOrigem":"59152820",
			"sCepDestino":"04101300"},
			function(errorCalcPrazo, result){
				console.log(JSON.stringify(result));
			}
		);
	}
);