var ctx = [];
var connection;

$(function(){
	$("section > article").append("<canvas class='quadro'></canvas>");
    
    $("div.tudo").append('<button class="btn-painel sup-1 r full">');
    
	$("section > article > canvas.quadro").each(function(index){
		this.setAttribute("width", 800);
		this.setAttribute("height", 600);
		
		ctx[index] = this.getContext("2d");
		ctx[index].lineCap = 'round';
		ctx[index].lineWidth = 2;
		
	});
    
    if($("section article").size() < 1){
        $("div.tudo").append('<div class="nenhum-slide"><div class="inner-nenhum-slide"><h1>Nenhum slide foi encontrado</h1><h3>Aguarde enquanto o apresentador adiciona slides a esta apresentação</h3></div></div>');
    }
	$("input.fechar").click(function(){
		//$("div.caixa-conexao").hide();
        $("div.caixa-conexao").removeClass("ativo");
	});
	///
	$("div.caixa-conexao input.conectar").click(function(){
    		ip = $("input.ip").val();
    		$('input.conectar').attr('value', 'conectando...');
    		
      		if(!window.WebSocket){
			alert('Browser não suporta websocket');
		}
    	
    connection = new  WebSocket("ws://"+ip);
    		
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
});