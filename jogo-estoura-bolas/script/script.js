
var bolaQtd = 0;
var pontosQtd = 0;
var verPausa = false;
var iniciaJogo = true;


function placar(){
    document.querySelector(".information__balls").innerHTML = "Bolas: " + bolaQtd;
    document.querySelector(".information__points").innerHTML = "Pontos: " + pontosQtd;
}


function addBola(){
    //Criando uma div qualquer e setando a classe "bolinha" para ela
    var bola = document.createElement("div");
    bola.setAttribute("class", "bolinha");
    
    //Definindo uma posição X e Y
    var positionX = Math.floor(Math.random() * 750);
    var positionY = Math.floor(Math.random() * 650);
    
    //Posicionando a div bola em algum lugar aleatorio e adicionando a função de estourar ao clicar nela
    bola.setAttribute("style", "left:"+positionX+"px; top:"+positionY+"px");
    bola.setAttribute("onclick", "estourar(this)");
    
    //Acrescentando a bolinha dentro da div display
    document.querySelector('.display').appendChild(bola);

    //Aumentando a quantidade de bolas no placar
    bolaQtd = bolaQtd + 1;
    document.querySelector(".information__balls").innerHTML = "Bolas: "+bolaQtd;
}

function estourar(elemento){
    if(verPausa == true){
        return
    } else{
        //Seleciona o display e remove o elemento filho
        document.querySelector('.display').removeChild(elemento);
        
        bolaQtd = bolaQtd - 1;
        document.querySelector(".information__balls").innerHTML = "Bolas: "+bolaQtd;
    
        pontosQtd = pontosQtd + 1
        document.querySelector(".information__points").innerHTML = "Pontos: "+pontosQtd;
    }

}

var startStop;

function iniciarJogo(){

    if( iniciaJogo == true){
        startStop = setInterval(addBola, 800);
    }

    iniciaJogo = false;
    verPausa = false;
    
    //Remove o fundo de pause no jogo
    document.querySelector(".display").classList.remove('pause');
}

function pararJogo(){
    clearInterval(startStop);
    iniciaJogo = true;
    verPausa = true;

    //Adiciona um fundo de pause no jogo
    document.querySelector(".display").classList.add('pause');
}

function limpar(){
    pararJogo();
    iniciaJogo = true;
    verPausa = false;
    //Seleciona todos os elementos 'bolinha' e estoura cada um deles
    document.querySelectorAll('.bolinha').forEach(estourar);

    //Zera a quantidade de bolas e zera o placar
    bolaQtd = 0;
    document.querySelector(".information__balls").innerHTML = "Bolas: ";

    //Zera a quantidade de pontos e zera o placar
    pontosQtd = 0;
    document.querySelector(".information__points").innerHTML = "Pontos: ";

    //Remove o fundo de pause no jogo
    document.querySelector(".display").classList.remove('pause');

    placar();
}