var http = require('http');
var httpServer = http.createServer(function (request, response)
{
    // i see this if i hit http://localhost:8001/
    response.end('go away');
});

httpServer.listen(8001);

var webSocket = require('websocket');
var webSocketServer = new webSocket.server({ 'httpServer': httpServer });

var slaves = {};
var masters = {};

webSocketServer.on('request', function (request)
{
	console.log("requisicao");
	//console.log(request.origin);
    var connection = request.accept(null, request.origin); 
	connection.sendUTF('gtfo');

	connection.on('message', function (message){
		console.log("received");
		console.log(message.utf8Data);
	});
});
