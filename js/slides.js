var f = false;

function pxm(){
	
	//alert("pxm");
	
	var indx = $('section > article:visible').index();
	var qt = $('section > article').size()-1;
	
	if(indx < qt){
		$('section > article:visible').hide();
	 
		$('section > article').eq(indx+1).show();
	}
}

function irPara(x){
	$('section > article').hide();
	$('section > article').eq(x).show();
}

function ant(){
	
	//alert("ant");
	
	var indx = $('section > article:visible').index();
	
	if(indx>0){ 
		$('section > article:visible').hide();
	 
		$('section > article').eq(indx-1).show();
	}
}

function nofull(){
	//alert("no-full");

	$("section > article").css('transform','scale(1)');
	
	$("button.cima_direita").toggleClass("full nofull");
	
	f = false;
}

function full(){
	//alert("full");
	//if(document.fullScreen){
		var w = $(document).width();
		var h = $(document).height();
		
		//alert(w);
		//alert(h);
		
		if(h > w){
			var s = w/798;
			//alert(s);
			
			//$("section > article").css('transform', 'scale('+ s +')');
			$("section > article").css('transform', 'scale('+ s +')');
		}else{
			var s = h/598;
			//alert(s);
			
			$("section > article").css('transform', 'scale('+ s +')');
		}
		
		$("button.cima_direita").toggleClass("full nofull");
		
		f = true;
	//}else{
		//$("section > article:visible").eq(0).requestFullScreen();
	//}
}

$(function(){
    
    $("div.tudo").append("<div class='caixa-conexao'><input type='button' class='fechar'></input><span class='aviso'>Digite abaixo o IP fornecido pelo servidor da apresentação: </span><br/><span class='ws'>ws://</span><input type='text' class='ip'></input><br/><input type='button' value='conectar' class= 'conectar'></input><div class='area-nao-conectar'><a href='#' class='nao-conectar'>Não quero iniciar uma apresentação agora.</a> </div></div>");
	
	$("button.cima_direita").click(function(){
		if(f){
			nofull();	
		}else{
			full();
		}
	});
	
	
	/*
	$("button.full").click(function(){
		full();
	});
	
	$("button.nofull").click(function(){
		nofull();
	});
	*/
});
