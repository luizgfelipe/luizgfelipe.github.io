
var bolaQtd = 0;
var pontosQtd = 0;
var startStop;
var verPausa = false;
var iniciaJogo = true;
var verFim = false;
var nivel = 1;

function placar(){
    document.querySelector(".information__balls").innerHTML = "Bolas na tela: " + bolaQtd;
    document.querySelector(".information__points").innerHTML = "Pontos: " + pontosQtd;
}


function addBola(){
    //Criando uma div qualquer e setando a classe "bolinha" para ela
    var bola = document.createElement("div");
    bola.setAttribute("class", "bolinha");
    
    //Definindo uma posição X e Y
    var positionX = Math.floor(Math.random() * 750);
    var positionY = Math.floor(Math.random() * 450);
    
    //Posicionando a div bola em algum lugar aleatorio e adicionando a função de estourar ao clicar nela
    bola.setAttribute("style", "left:"+positionX+"px; top:"+positionY+"px");
    bola.setAttribute("onclick", "estourar(this)");
    
    //Acrescentando a bolinha dentro da div display
    document.querySelector('.display').appendChild(bola);

    //Aumentando a quantidade de bolas no placar
    bolaQtd = bolaQtd + 1;
    document.querySelector(".information__balls").innerHTML = "Bolas na tela: "+bolaQtd;

    if(bolaQtd >= 10){
        fimDeJogo()
    }
}

function estourar(elemento){
    if(verPausa == true){
        return
    } else if(verFim == true){
        return
    } else{
        //Seleciona o display (tela) e remove o elemento filho (bolas)
        document.querySelector('.display').removeChild(elemento);
        
        bolaQtd = bolaQtd - 1;
        document.querySelector(".information__balls").innerHTML = "Bolas na tela: "+bolaQtd;
    
        pontosQtd = pontosQtd + 1
        document.querySelector(".information__points").innerHTML = "Pontos: "+pontosQtd;

        if(pontosQtd == 20){
            fimDeJogo();
        }
    }
}

function nivelJogo(elemento){
    nivel = elemento.value;
}

function iniciarJogo(){

    if(verFim == true){
        verFim = false;
        limpar();
    }

    if( iniciaJogo == true && nivel == 1){
        startStop = setInterval(addBola, 1000);
    } else if(iniciaJogo == true && nivel == 2){
        startStop = setInterval(addBola, 700);
    } else if(iniciaJogo == true && nivel == 3){
        startStop = setInterval(addBola, 450);
    } else {
        return
    }

    iniciaJogo = false;
    verPausa = false;
    
    //Remove o fundo de pause no jogo
    document.querySelector(".display").classList.remove('pause');

    //Remove o fundo de game over
    document.querySelector(".display").classList.remove("loser");

    //Habilitando o botão pausa
    document.querySelector(".controls__button--red").removeAttribute('disabled', 'disabled');

    //Desabilitando os níveis
    document.querySelector(".controls__difficulty").classList.add("none");
}

function pararJogo(){

    //Verifica se o jogo foi iniciado pelo menos
    if(bolaQtd == 0){
        return
    }

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
    verFim = false;
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

    //Remove o fundo de game over
    document.querySelector(".display").classList.remove("loser");

    //Remove o fundo winner
    document.querySelector(".display").classList.remove("winner");

    //Habilitando o botão pausa
    document.querySelector(".controls__button--red").removeAttribute('disabled', 'disabled');

    //Habilitando os níveis
    document.querySelector(".controls__difficulty").classList.remove("none");

    placar();
}

function fimDeJogo(){

    pararJogo();

    if(bolaQtd >= 10){
        //Adiciona o fundo de game over
        document.querySelector(".display").classList.add("loser");
    } else if(pontosQtd == 20){
        //Adiciona o fundo de winner
        document.querySelector(".display").classList.add("winner");
    }
    
    
    //Desabilita o botão pausa
    document.querySelector(".controls__button--red").setAttribute('disabled', 'disabled');

    //Confirma que o jogo acabou
    verFim = true;
}