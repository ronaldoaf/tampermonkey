// ==UserScript==
// @name         Cacular placar bolao
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.oddsportal.com/soccer/brazil/serie-a/*
// @grant        none
// ==/UserScript==

window.res=function(eH,eA,oH,oA){
	//eR='H' if eH>eA else ('A' if eH<eA else 'D') 
	//oR='H' if oH>oA else ('A' if oH<oA else 'D')
	eR= eH>eA ? 'H' : ( eH<eA  ? 'A' :  'D'); 
	oR= oH>oA ? 'H' : ( oH<oA  ? 'A' :  'D');   
	if (eR==oR){
		//placar exato
		if ((eH==oH) && (eA==oA)) return 12.;

		//acerta empate
		if (oR=='D') return 7.;

		//acerta score do vencedor
		if ( ( (oR=='H') && (eH==oH) ) || ( (oR=='A') && (eA==oA))  ) return 9.;

		//acerta score perdedor
		if  ((  (oR=='H') && (eA==oA)) || ( (oR=='A') && (eH==oH))  ) return 6.;

		//acerta diferença de gols
		if (Math.abs(eH-eA)==Math.abs(oH-oA)) return 4.;

		//acerta sem as combinacoes acima         
		return 3.;
		
	}
	else{
		return 0.;
	}
}

window.calcula=function(mm){


	soma=0;
	$('#odds-data-table.bt-8 .table-header-light').each(function(i,e){  
		placar=$(e).find('strong').text();
		odds=parseFloat($(e).find('.avg').text());
		
		h=placar.split(':')[0];
		a=placar.split(':')[1];
		if (h>=5) return;
		if (a>=5) return;
		
		
		soma+=window.res(mm[0], mm[1], h, a) * 1/odds/0.95
		//console.log( placar + ' ' +  odds );
		

	});


	return Math.round(soma*100)/100.0;
}


window.bolao=function(){
	for(i=0;i<=4;i++) for(j=0;j<=4;j++) { console.log( i+'x'+j+ ' '+calcula([i,j])  ) }
}


