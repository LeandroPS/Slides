var http = require('http');
var httpServer = http.createServer(function (request, response)
{
    // i see this if i hit http://localhost:8001/
    response.end('go away');
});

httpServer.listen(8000);

var webSocket = require('websocket');
var webSocketServer = new webSocket.server({ 'httpServer': httpServer });

function getIPAddress() {
  var interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];

    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
        return alias.address;
    }
  }

  return '0.0.0.0';
}


console.log("Este é o IP do servidor desta apresentação: "+getIPAddress()+":8000");

var slaves = [];
var masters = [];
var indx = 0;

webSocketServer.on('request', function (request)
{
	//console.log("requisicao");
	//console.log(request.origin);
    var connection = request.accept(null, request.origin); 
	//connection.sendUTF('gtfo');

	connection.on('message', function (message){
		j = JSON.parse(message.utf8Data);
		//j = eval(message.utf8Data);
		//j = message.utf8Data;
		if(j.tipo == "id"){
			if(j.id == "master"){
				if (masters.length == 0){
					indx = j.indx;
					for(i = 0; i< slaves.length; i++){
						slaves[i].sendUTF(JSON.stringify({"tipo":"comando", "comando":"irPara", "indx": indx}));	
					}
				}else{
					connection.sendUTF(JSON.stringify({"tipo":"comando", "comando":"irPara", "indx": indx}));
				}
				masters[masters.length] = connection;
				console.log("Mestre conectado");
			}else if(j.id == "slave"){
				connection.sendUTF(JSON.stringify({"tipo":"comando", "comando":"irPara", "indx": indx}));
				slaves[slaves.length] = connection;
				console.log("Escravo conectado");
				console.log(slaves.length);
			}
		}else if(j.tipo == "comando"){
			if(j.comando == "avancar"){
				//console.log(slaves.length);
				//console.log("tentando enviar");
				for(i = 0; i< slaves.length; i++){
					slaves[i].sendUTF(message.utf8Data);
				}
				exept = masters.indexOf(connection);
				for(i = 0; i< masters.length; i++){
					if(i != exept){
						masters[i].sendUTF(message.utf8Data);
					}
				}
				indx++;
				console.log("Avancando slides - "+indx);
				
				
			}else if(j.comando == "voltar"){
				for(i = 0; i< slaves.length; i++){
					slaves[i].sendUTF(message.utf8Data);
				}
				indx--;
				
				console.log("voltando slides - "+indx);
			}else if(j.comando == "pressionar"){
				
				for(i = 0; i< slaves.length; i++){
					slaves[i].sendUTF(message.utf8Data);
				}
				
				console.log("pressionando");
				
			}else if(j.comando == "desenhar"){
				for(i = 0; i< slaves.length; i++){
					slaves[i].sendUTF(message.utf8Data);
				}
				
				//console.log("desenhando");
			}else if(j.comando == "play"){
				for(i = 0; i< slaves.length; i++){
					slaves[i].sendUTF(message.utf8Data);
				}
				
				//console.log("desenhando");
			}else{
				console.log("n se aplica");
			}
		}
		
		//console.log("received");
		//console.log(message);
	});
});
