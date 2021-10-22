window.addEventListener('load', escolheJogador);

var player = '';

document.querySelector('.reset').addEventListener('click', reset);

document.querySelectorAll('.box').forEach(box => {
    box.setAttribute('onclick', 'boxClick(this)');
});


function escolheJogador(){
    let change = Math.floor(Math.random() * 2);

    if (change == 0){
        player = 'x';
    } else {
        player = 'o';
    }
    
    document.querySelector('.info-player').innerHTML = player;
}

function boxClick(elemento){
    elemento.innerHTML = player;
    if(player == 'x'){
        player = 'o';
    } else {
        player = 'x';
    }
}


function reset(){
    document.querySelectorAll('.box').forEach(box => {
        box.innerHTML = "";
    });

    escolheJogador();
}


