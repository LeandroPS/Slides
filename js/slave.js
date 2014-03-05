var ctx = [];

$(function(){
	$("section > article").append("<canvas class='quadro'></canvas>");
	$("section > article > canvas.quadro").each(function(index){
		this.setAttribute("width", 800);
		this.setAttribute("height", 600);
		
		ctx[index] = this.getContext("2d");
		ctx[index].lineCap = 'round';
		ctx[index].lineWidth = 2;
		
	});
	
	$("input.fechar").click(function(){
		$("div.caixa-conexao").hide();
	});
	///
	$("div.caixa-conexao input.conectar").click(function(){
    		ip = $("input.ip").val();
    		$('input.conectar').attr('value', 'conectando...');
    		
      		if(!window.WebSocket){
			alert('Browser não suporta websocket');
		}
    	
    		connection = new  WebSocket("ws://"+ip+":8000");
    		
		//var connection = new  WebSocket('ws://10.0.0.100:8001');//Eywa
		//var connection = new  WebSocket('ws://192.168.43.175:8001');
		//var connection = new  WebSocket('ws://10.19.11.10:8001');//IFF-acesso -livre
		//var connection = new  WebSocket('ws://127.0.0.1:8000');
		//var connection = new  WebSocket('ws://10.12.10.205:8000');
		//var connection = new  WebSocket('ws://192.168.43.56:8000');
		//var connection = new  WebSocket();
    		
		connection.onopen = function (openEvent)
		{
			
		    $('input.conectar').attr('value', 'conectado!!!');
		    //alert('onopen');
		    //console.log(openEvent);
		    slaveRequest = JSON.stringify({"tipo":"id", "id":"slave"});
		    //alert(slaveRequest);
		    connection.send(slaveRequest);
		    //console.log("enviou");
		    
		    conectado = true;
		};
				
		connection.onclose = function (closeEvent)
		{
		    //alert('onclose');
		    //console.log(closeEvent);
		}
		connection.onerror = function (errorEvent)
		{
		    alert('onerror');
		    //console.log(errorEvent);
		};
		connection.onmessage = function (messageEvent)
		{
		    //alert('onmessage');
		    console.log(messageEvent);
		    m = JSON.parse(messageEvent.data);
		    
		    
			if(m.tipo == "comando"){
				console.log("comando recebido");
				if(m.comando == "avancar"){
					pxm();
					console.log("Avancando slides");
				}else if(m.comando == "voltar"){
					//alert("voltando");
					ant();
					console.log("voltando slides");
				}else if(m.comando == "irPara"){
					console.log("irpara");
					irPara(m.indx);
				}else if(m.comando == "pressionar"){
					ctx[m.index].moveTo(m.clientX, m.clientY);
					ctx[m.index].beginPath();
				    ctx[m.index].strokeStyle = m.cor;
				
				}else if(m.comando == "desenhar"){
					console.log("desenhando");
					ctx[m.index].lineTo(m.clientX, m.clientY);
		        	ctx[m.index].stroke();
				}else if(m.comando == "desenhar"){
					$("section > article video").index(m.index).get(0).play();
				}
			}
		    
			console.log(messageEvent);
		    	console.log(m);
		    	//connection.send("teste");
		};
				
				
	});
	///
});

/*
if(!window.WebSocket){
	alert('Browser não suporta websocket');
}

alert("oioioi");
    	
//var connection = new  WebSocket('ws://10.0.0.100:8001');//Eywa
//var connection = new  WebSocket('ws://192.168.43.175:8001');
//var connection = new  WebSocket('ws://10.19.11.10:8001');//IFF-acesso -livre
//var connection = new  WebSocket('ws://127.0.0.1:8000');
//var connection = new  WebSocket('ws://10.12.10.205:8000');
//var connection = new  WebSocket('ws://192.168.43.56:8000');
var connection = new  WebSocket('ws://10.0.0.100:8000');
    	
connection.onopen = function (openEvent)
{
    //alert('onopen');
    //console.log(openEvent);
    slaveRequest = JSON.stringify({"tipo":"id", "id":"slave"});
    //alert(slaveRequest);
    connection.send(slaveRequest);
    //console.log("enviou");
};
		
connection.onclose = function (closeEvent)
{
    //alert('onclose');
    //console.log(closeEvent);
}
connection.onerror = function (errorEvent)
{
    alert('onerror');
    //console.log(errorEvent);
};
connection.onmessage = function (messageEvent)
{
    //alert('onmessage');
    console.log(messageEvent);
    m = JSON.parse(messageEvent.data);
    
    
	if(m.tipo == "comando"){
		console.log("comando recebido");
		if(m.comando == "avancar"){
			pxm();
			console.log("Avancando slides");
		}else if(m.comando == "voltar"){
			ant();
			console.log("voltando slides");
		}else if(m.comando == "irPara"){
			console.log("irpara");
			irPara(m.indx);
		}else if(m.comando == "pressionar"){
			ctx[m.index].moveTo(m.clientX, m.clientY);
			ctx[m.index].beginPath();
		    	ctx[m.index].strokeStyle = m.cor;
		
		}else if(m.comando == "desenhar"){
			console.log("desenhando");
			//var bytes = new Uint8Array(m.imagem);
			//var image = ctx[m.index].createImageData(800, 600);
			//for (var i=0; i<bytes.length; i++) {
			  //  image.data[i] = bytes[i];
			//}
			//ctx[m.index].drawImage(image, 0, 0);

			//ctx[m.index] = m.imagem;
			
			ctx[m.index].lineTo(m.clientX, m.clientY);
        		ctx[m.index].stroke();
		}else if(m.comando == "desenhar"){
			$("section > article video").index(m.index).get(0).play();
		}
	}/*else if(m.tipo == "irPara"){
		irPara(m.indx);
	}*/
    
   // console.log(messageEvent);
    //console.log(m);
    //connection.send("teste");
//};
