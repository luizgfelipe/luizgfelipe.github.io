var player = '';
var winner = '';
var plays = 0;
var combo = 0;

window.addEventListener('load', escolheJogador);
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

function boxClick(element){
    if(element.getAttribute('data-box') != ""){
        return
    }

    element.innerHTML = player;
    element.setAttribute('data-box', player);
    if(player == 'x'){
        player = 'o';
    } else {
        player = 'x';
    }

    document.querySelector('.info-player').innerHTML = player;

    plays = plays + 1;

    verificaVencer();
}

function verificaVencer(){
    var a1 = document.getElementById('a1').getAttribute('data-box');
    var a2 = document.getElementById('a2').getAttribute('data-box');
    var a3 = document.getElementById('a3').getAttribute('data-box');

    var b1 = document.getElementById('b1').getAttribute('data-box');
    var b2 = document.getElementById('b2').getAttribute('data-box');
    var b3 = document.getElementById('b3').getAttribute('data-box');
    
    var c1 = document.getElementById('c1').getAttribute('data-box');
    var c2 = document.getElementById('c2').getAttribute('data-box');
    var c3 = document.getElementById('c3').getAttribute('data-box');

    if (a1 == a2 && a1 == a3 && a1 != ""){
        winner = a1;
        combo = 1;

    } else if (a1 == b1 && a1 == c1 && a1 != ""){
        winner = a1;
        combo = 2;

    } else if (a1 == b2 && a1 == c3 && a1 != "") {
        winner = a1;
        combo = 3;

    } else if (a2 == b2 && a2 == c2 && a2 != ""){
        winner = a2;
        combo = 4;

    } else if (a3 == b3 && a3 == c3 && a3 != ""){
        winner = a3;
        combo = 5;

    } else if (a3 == b2 && a3 == c1 && a3 != "") {
        winner = a3;
        combo = 6;

    } else if (b1 == b2 && b1 == b3 && b1 != ""){
        winner = b1;
        combo = 7;

    } else if (c1 == c2 && c1 == c3 && c1 != ""){
        winner = c1;
        combo = 8;

    } else if (plays == 9){
        document.querySelector('.info-winner').style.color = "red";
        document.querySelector('.info-winner').innerHTML = "Deu Velha!";
        combo = 9;
        block();
    }

    if(winner != ''){
        document.querySelector('.info-winner').style.color = "green";
        document.querySelector('.info-winner').style.fontWeight = "bold";
        document.querySelector('.info-winner').innerHTML = winner;
        block();
    }
}

function reset(){
    document.querySelectorAll('.box').forEach(box => {
        box.innerHTML = "";
        box.setAttribute('data-box', '');
    });

    document.querySelectorAll('.box').forEach(box => {
        box.setAttribute('onclick', 'boxClick(this)');
    });

    document.querySelectorAll('.box').forEach(box => {
        box.style.color = 'white';
    });

    document.querySelector('.info-winner').style.color = "white";

    document.querySelector('.info-winner').innerHTML = "?";

    document.querySelector('.structure').classList.add('structureH');

    player = '';
    winner = '';
    plays = 0;
    combo = 0;

    a1 = '';
    a2 = '';
    a3 = '';
    b1 = '';
    b2 = '';
    b3 = '';
    c1 = '';
    c2 = '';
    c3 = '';

    escolheJogador();
}

function block(){
    switch(combo){
        case 1:
            document.getElementById('a1').style.color = 'green';
            document.getElementById('a2').style.color = 'green';
            document.getElementById('a3').style.color = 'green';
            break;
        case 2:
            document.getElementById('a1').style.color = 'green';
            document.getElementById('b1').style.color = 'green';
            document.getElementById('c1').style.color = 'green';
            break;
        case 3:
            document.getElementById('a1').style.color = 'green';
            document.getElementById('b2').style.color = 'green';
            document.getElementById('c3').style.color = 'green';
            break;
        case 4:
            document.getElementById('a2').style.color = 'green';
            document.getElementById('b2').style.color = 'green';
            document.getElementById('c2').style.color = 'green';
            break;
        case 5:
            document.getElementById('a3').style.color = 'green';
            document.getElementById('b3').style.color = 'green';
            document.getElementById('c3').style.color = 'green';
            break;
        case 6:
            document.getElementById('a3').style.color = 'green';
            document.getElementById('b2').style.color = 'green';
            document.getElementById('c1').style.color = 'green';
            break;
        case 7:
            document.getElementById('b1').style.color = 'green';
            document.getElementById('b2').style.color = 'green';
            document.getElementById('b3').style.color = 'green';
            break;
        case 8:
            document.getElementById('a1').style.color = 'green';
            document.getElementById('a2').style.color = 'green';
            document.getElementById('a3').style.color = 'green';
            break;
        case 9:
            document.querySelectorAll('.box').forEach(box => {
                box.style.color = 'red';
            });
    }

    document.querySelectorAll('.box').forEach(box => {
        box.removeAttribute('onclick', 'boxClick(this)');
    });

    document.querySelector('.structure').classList.remove('structureH');
}