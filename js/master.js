var conectado = false;

function touchHandler(event)
{
    var touches = event.changedTouches,
        first = touches[0],
        type = "";
    
    switch(event.type)
    {
        case "touchstart": type = "mousedown"; break;
        case "touchmove":  type="mousemove"; break;        
        case "touchend":   type="mouseup"; break;
        default: return;
    }

    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1, 
                              first.screenX, first.screenY, 
                              first.clientX, first.clientY, false, 
                              false, false, false, 0/*left*/, null);

                                                                                 first.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}

function convertDataURIToBinary(dataURI) {
  var BASE64_MARKER = ';base64,';
  var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  var base64 = dataURI.substring(base64Index);
  var raw = window.atob(base64);
  var rawLength = raw.length;
  var array = new Uint8Array(new ArrayBuffer(rawLength));

  for(i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}

function possibilitaDesenho(){
        var desenho = false;
        var paleta = false;
        var ctx = [];
        var desenhando = false;
        cor = "#000000";
        
        
    }

$(function(){
	
	var desenho = false;
	var paleta = false;
    
	var ctx = [];
	var desenhando = false;
	cor = "#000000";
    
    $("input").keyup(function(e){
        e.stopImmediatePropagation();    
    });
    
    $(document).keyup(function(e) {
        
        switch(e.which){
            case 13:
                pxm();
                if($("section > article:visible").index() < $("section > article").length-1){
                    try{
                        console.log("Oi - av");
                        connection.send('{"tipo":"comando", "comando":"avancar"}');
                        console.log("Avancar");
                    }catch(e){
                        console.log("Ops...");
                    }
                }
                break;
            case 32:
                pxm();
                if($("section > article:visible").index() < $("section > article").length-1){
                    try{
                        console.log("Oi - av");
                        connection.send('{"tipo":"comando", "comando":"avancar"}');
                        console.log("Avancar");
                    }catch(e){
                        console.log("Ops...");
                    }
                }
                break;
            case 37:
                ant();
                try{
                    connection.send('{"tipo":"comando", "comando":"voltar"}');
                    console.log("Voltar");				
                }catch(e){
                    console.log("Ops...");
                }
                break;
            case 38:
                pxm();
                if($("section > article:visible").index() < $("section > article").length-1){
                    try{
                        console.log("Oi - av");
                        connection.send('{"tipo":"comando", "comando":"avancar"}');
                        console.log("Avancar");
                    }catch(e){
                        console.log("Ops...");
                    }
                }
                break;
            case 39:
                pxm();
                if($("section > article:visible").index() < $("section > article").length-1){
                    try{
                        console.log("Oi - av");
                        connection.send('{"tipo":"comando", "comando":"avancar"}');
                        console.log("Avancar");
                    }catch(e){
                        console.log("Ops...");
                    }
                }
                break;
            case 40:
                ant();
                try{
                    connection.send('{"tipo":"comando", "comando":"voltar"}');
                    console.log("Voltar");				
                }catch(e){
                    console.log("Ops...");
                }
                break;
        }
    });
    
    
    $("div.tudo").append('<button class="btn-painel sup-1 l voz"></button><button class="nav ant"></button><button class="nav pxm"></button><button class="btn-painel sup-1 r lapis"></button><button class="escolhe-cor"></button><div class="paleta"><div class="cor-atual"></div><button class="btn-cor preto"><button class="btn-cor branco"><button class="btn-cor vermelho"><button class="btn-cor azul"><button class="btn-cor verde"></div>');
    	//<button class="full cima_direita"></button>
    	/*$("input.fechar").click(function(){
			$("div.caixa-conexao").hide();
		});*/
    //alert($("section article").size());
    if($("section article").size() < 1){
        $("div.tudo").append('<div class="nenhum-slide"><div class="inner-nenhum-slide"><h1>Nenhum slide foi encontrado</h1><h3>Arraste para cá ou selecione os slides em pdf através do botão abaixo</h3><button class="abrir-pdf">Abrir PDF</button><input type="file" accept=".pdf" class="add"></div></div>');
        $(".abrir-pdf").click(function(){
            $("input.add").click(); 
        });
        
        $("input.add").change(function(){
            var file = this.files[0];
            //console.log(this.files.length);
            var reader = new FileReader();
            
            reader.onload = function(evt){
                //console.log(evt.target.result);
                var pdfAsArray = convertDataURIToBinary(evt.target.result);
                //console.log(pdfAsArray);
                PDFJS.disableWorker = false;

                PDFJS.getDocument(pdfAsArray).then(function getPdfHelloWorld(pdf) {
                    $('div.nenhum-slide').hide();
                    $("div.tudo").append("<section></section>");
                    for(i=1;i<=pdf.numPages;i++){
                        pdf.getPage(i).then(function getPageHelloWorld(page) {
                            var viewport = page.getViewport(1);
                            if(viewport.height<=viewport.width){
                                var scale = 800/viewport.width;   
                            }else{
                                var scale = 600/viewport.height;
                            }
                            var viewport = page.getViewport(scale);

                            var $canvas = jQuery("<canvas class='borda-arredondada'></canvas>");
                            var canvas = $canvas.get(0);
                            var context = canvas.getContext('2d');
                            canvas.height = viewport.height;
                            canvas.width = viewport.width;
                            
                            page.render({canvasContext: context, viewport: viewport});
                            
                            $container = jQuery("<article></article>").css({'width':viewport.width+'px', 'height': viewport.height+'px', 'margin-top':'-'+parseInt(viewport.height)/2+'px', 'margin-left':'-'+parseInt(viewport.width)/2+'px'});
                            $container.append($canvas);
                            
                            ///aqui entra
                            $desenhos = jQuery("<canvas class='quadro'></canvas>");
                            /*
                            $desenhos.each(function(index){
                                this.setAttribute("width", 800);
                                this.setAttribute("height", 600);

                                this.addEventListener("touchstart", touchHandler, true);
                                this.addEventListener("touchmove", touchHandler, true);
                                this.addEventListener("touchend", touchHandler, true);
                                this.addEventListener("touchcancel", touchHandler, true); 

                                ctx[index] = this.getContext("2d");
                                ctx[index].lineCap = 'round';
                                ctx[index].lineWidth = 2;


                                this.onmousedown = function (evt) {	
                                    ctx[index].moveTo(evt.clientX - $(this).offset().left, evt.clientY - $(this).offset().top);
                                    ctx[index].beginPath();
                                    ctx[index].strokeStyle = cor;

                                    try{
                                    connection.send(JSON.stringify({ "tipo": "comando", "comando":"pressionar", "index": index, "clientX": evt.clientX - $(this).offset().left, "clientY": evt.clientY - $(this).offset().top, "cor": cor}));
                                    }catch(e){
                                        console.log("ops...");
                                    }

                                    desenhando = true;
                                }

                                this.onmouseup = function () {
                                    desenhando = false;               
                                }

                                this.onmousemove = function (evt) {
                                    if (desenhando && desenho) {
                                        ctx[index].lineTo(evt.clientX - $(this).offset().left, evt.clientY - $(this).offset().top);
                                        ctx[index].stroke();
                                        
                                        try{
                                        connection.send(JSON.stringify({ "tipo": "comando", "comando":"desenhar", "index": index, "clientX": evt.clientX - $(this).offset().left, "clientY": evt.clientY - $(this).offset().top}));
                                        }catch(e){
                                            console.log("ops...");
                                        }
                                    }
                                }
                                
                            });
                            */
                            /*
                            //$("section > article > canvas.quadro").each(function(index){
                            $desenho = $desenhos.get(0);

                            $desenho.setAttribute("width", viewport.width);
                            $desenho.setAttribute("height", viewport.height);

                            $desenho.addEventListener("touchstart", touchHandler, true);
                            $desenho.addEventListener("touchmove", touchHandler, true);
                            $desenho.addEventListener("touchend", touchHandler, true);
                            $desenho.addEventListener("touchcancel", touchHandler, true); 

                            ctx[index] = $desenho.getContext("2d");
                            ctx[index].lineCap = 'round';
                            ctx[index].lineWidth = 2;


                            $desenho.onmousedown = function (evt) {	
                                ctx[index].moveTo(evt.clientX - $desenhos.offset().left, evt.clientY - $desenhos.offset().top);
                                ctx[index].beginPath();
                                ctx[index].strokeStyle = cor;
                                try{
                                connection.send(JSON.stringify({ "tipo": "comando", "comando":"pressionar", "index": index, "clientX": evt.clientX - $desenhos.offset().left, "clientY": evt.clientY - $desenhos.offset().top, "cor": cor}));
                                }catch(e){
                                    console.log("ops...");
                                }
                                desenhando = true;
                            }

                            $desenho.onmouseup = function () {
                                desenhando = false;               
                            }

                            $desenho.onmousemove = function (evt) {
                                if (desenhando && desenho) {

                                    ctx[index].lineTo(evt.clientX - $desenhos.offset().left, evt.clientY - $desenhos.offset().top);
                                    ctx[index].stroke();

                                    connection.send(JSON.stringify({ "tipo": "comando", "comando":"desenhar", "index": index, "clientX": evt.clientX - $desenhos.offset().left, "clientY": evt.clientY - $desenhos.offset().top}));

                                }
                            }
                            */
                            //});
                            ///
                            $container.append($desenhos);
                            $("section").append($container);
                        });
                    }
                    
                    $("section article:first").show();
                    //possibilitaDesenho();
                    
                });  
            }
            
            var f = reader.readAsDataURL(file);
            
        });

        }
        
        $("button.voz").click(function(){
            if (annyang) {
              // Let's define a command.
              var commands = {
                'avançar': function() { pxm(); },
                'voltar': function() { ant(); }
              };

              // Add our commands to annyang
              annyang.addCommands(commands);

              annyang.setLanguage("pt-BR");
              // Start listening.
              annyang.start();
            }
        });
    	/////
    	$("div.caixa-conexao input.conectar").click(function(){
    		ip = $("input.ip").val();
    		$('input.conectar').attr('value', 'conectando...');
    		
      		if(!window.WebSocket){
				alert('Browser não suporta websocket');
			}
		    	
			//var connection = new  WebSocket('ws://10.0.0.100:8001');//Eywa
			//connection = new  WebSocket('ws://192.168.43.175:8080');
			//var connection = new  WebSocket('ws://10.19.11.10:8001');//IFF-acesso -livre
			//var connection = new  WebSocket('ws://127.0.0.1:8000');
			//var connection = new  WebSocket('ws://10.12.10.205:8000');
			//var connection = new  WebSocket('ws://192.168.43.56:8000');
		
			connection = new  WebSocket("ws://"+ip);
			
		
			connection.onopen = function (openEvent)
			{
				$('input.conectar').attr('value', 'conectado!!!');
			    //alert('onopen');
			    console.log(openEvent);
			    var indx = $("section > article:visible").index();
			    masterRequest = JSON.stringify({"tipo":"id", "id":"master", "indx": indx});
			    //alert(masterRequest);
			    connection.send(masterRequest);
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
			    
			    m = JSON.parse(messageEvent.data);
		    
    	
				if(m.tipo == "comando"){
					if(m.comando == "avancar"){
						pxm();
						console.log("Avancando slides");
					}else if(m.comando == "voltar"){
						ant();
						console.log("voltando slides");
					}else if(m.comando == "irPara"){
						console.log("irpara");
						irPara(m.indx);
					}
				}
			};  		
    			
    			//alert(ip);
    	});
	///
	
		$("button.ant").click(function(){
		
			ant();
            
        //if($("section > article:visible").index() > 0){
				try{
					connection.send('{"tipo":"comando", "comando":"voltar"}');
					console.log("Voltar");				
				}catch(e){
					console.log("Ops...");
				}
		
		});
	
		$("button.pxm").click(function(){
		
			//alert("pxm");
            pxm();
			if($("section > article:visible").index() < $("section > article").length-1){
				try{
					console.log("Oi - av");
					connection.send('{"tipo":"comando", "comando":"avancar"}');
					console.log("Avancar");
				}catch(e){
					console.log("Ops...");
				}
			}
		
		});
	
	$("button.lapis").click(function(){
		if(!desenho){
			desenho = true;
		
			$(this).css({'background-color': '#779', 'box-shadow': '0px 0px 6px 1px #779'});
			$("section aticle canvas.quadro").css({'z-index': '6'});
			
			$('button.escolhe-cor, div.paleta').animate({'bottom':'+=20px'}, 500);
		}else{
			desenho = false;
			
			$("section aticle canvas.quadro").css({'z-index': '4'});
		
			$(this).css({'background-color': 'transparent', 'box-shadow': 'none'});
			if(paleta){
				//$('button.escolhe-cor').animate({'bottom':'-20px'}, 500);
				$('button.escolhe-cor, div.paleta').animate({'bottom':'-=121px'}, 500);
			}else{
				$('button.escolhe-cor, div.paleta').animate({'bottom':'-=20px'}, 500);
			}
		}
		
	});
	
	$("button.escolhe-cor").click(function(){
		if(!paleta){
			$('button.escolhe-cor, div.paleta').animate({'bottom':'+=101px'}, 500);
			paleta = true;
		}else{
			$('button.escolhe-cor, div.paleta').animate({'bottom':'-=101px'}, 500);
			paleta = false;
		}
	});
	
	$("button.btn-cor").click(function(){
		cor = $(this).css('background-color');
		$("div.paleta div.cor-atual").css('background-color', cor);
		$('button.escolhe-cor, div.paleta').animate({'bottom':'-=101px'}, 500);
		paleta = false;
		//alert(cor);
	});

	/*document.addEventListener("touchstart", touchHandler, true);
    document.addEventListener("touchmove", touchHandler, true);
    document.addEventListener("touchend", touchHandler, true);
    document.addEventListener("touchcancel", touchHandler, true);  
	*/
	
	$("section > article video").each(function(index){
		this.volume = 0;
		this.addEventListener("play", function(){
			connection.send(JSON.stringify({ "tipo": "comando", "comando":"play", "index": index}));
		});
	});
	
	$("section > article").append("<canvas class='quadro'></canvas>");
    //possibilitaDesenho();
    $("section > article > canvas.quadro").each(function(index){
        this.setAttribute("width", 800);
        this.setAttribute("height", 600);

        this.addEventListener("touchstart", touchHandler, true);
        this.addEventListener("touchmove", touchHandler, true);
        this.addEventListener("touchend", touchHandler, true);
        this.addEventListener("touchcancel", touchHandler, true); 

        ctx[index] = this.getContext("2d");
        ctx[index].lineCap = 'round';
        ctx[index].lineWidth = 2;


        this.onmousedown = function (evt) {	
            ctx[index].moveTo(evt.clientX - $(this).offset().left, evt.clientY - $(this).offset().top);
            ctx[index].beginPath();
            ctx[index].strokeStyle = cor;
            
            try{
            connection.send(JSON.stringify({ "tipo": "comando", "comando":"pressionar", "index": index, "clientX": evt.clientX - $(this).offset().left, "clientY": evt.clientY - $(this).offset().top, "cor": cor}));
            }catch(e){
                console.log("ops...");
            }

            desenhando = true;
        }

        this.onmouseup = function () {
            desenhando = false;               
        }

        this.onmousemove = function (evt) {
            if (desenhando && desenho) {
                ctx[index].lineTo(evt.clientX - $(this).offset().left, evt.clientY - $(this).offset().top);
                ctx[index].stroke();
                try{
                connection.send(JSON.stringify({ "tipo": "comando", "comando":"desenhar", "index": index, "clientX": evt.clientX - $(this).offset().left, "clientY": evt.clientY - $(this).offset().top}));
                }catch(e){
                    console.log("ops...")   
                }
            }
        }

    });
    ///antes disso
});
