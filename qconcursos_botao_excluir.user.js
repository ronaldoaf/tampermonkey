// ==UserScript==
// @name         qconcursos_botao_excluir
// @namespace    https://github.com/ronaldoaf/tampermonkey
// @version      0.1
// @description  Adiciona o botão excluir, que na verdade coloca a questão em uma caderno específico
// @author       Ronaldo Araújo de Farias
// @match        https://www.qconcursos.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

var ID_CARNERNO_EXCLUIR=1432447;

//Cria adiciona o botão excluir logo abaixo do responder
$('.ipt-responder').each(function(i,e){
        $(e).html( $(e).html()+'<span style="background-color:yellow;font-size:20px">EXCLUIR</span>');
});

//Adiciona o ação de adicionar no caderno e remover a questão da tela
$('.ipt-responder span').click(function(){
        var id_questao=$(this).parent().attr('id').split('-')[1];

        $.ajax({
            url: 'https://www.qconcursos.com/cadernos/adicionar/questoes/'+id_questao+'/'+ID_CARNERNO_EXCLUIR,
            headers: {
                'X-Requested-With':'XMLHttpRequest'
            },
            success: function(data){
                $('#uma-questao-'+id_questao).remove();
            }
        });
});

})();