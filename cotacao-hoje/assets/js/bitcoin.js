var json = JSON.parse(sessionStorage.getItem('json'));
var bitcoin = 0;
var input1Ant = 1;

window.addEventListener('load', createElement);

document.querySelector('#coin1').addEventListener('change', cambioBTCBRL);
document.querySelector('#coin2').addEventListener('change', cambioBRLBTC);

function createElement() {
    
    var box = document.createElement('div');
    var boxTitle = document.createElement('div');
    var boxContent = document.createElement('div');

    box.classList.add('mainCoins__box');
    boxTitle.classList.add('mainCoins__box__title');
    boxContent.classList.add('mainCoins__box__content');

    document.querySelector('.mainCoins').appendChild(box);
    box.appendChild(boxTitle);
    box.appendChild(boxContent);

    var price = json.BTCBRL.ask * 1000;
    
    var name = json.BTCBRL.name;
    name = name.slice(0, (name.indexOf('/')));

    boxTitle.innerHTML = '1 ' + json.BTCBRL.code + ` (${name})`;
    boxContent.innerHTML = 'R$ ' + price;

    bitcoin = json.BTCBRL.ask * 1000; 

    document.querySelector('#coin1').value = 1;
    document.querySelector('#coin2').value = bitcoin;
}


function cambioBTCBRL(){
    let input1 = document.querySelector('#coin1');
    let input2 = document.querySelector('#coin2');

    if(input1.value < 0 || input2.value < 0){
        input1.value = 1;
        input2.value = bitcoin;
    }
    else{
        input2.value = (input1.value * bitcoin);
    }
}

function cambioBRLBTC(){
    let input1 = document.querySelector('#coin1');
    let input2 = document.querySelector('#coin2');

    if(input1.value < 0 || input2.value < 0){
        input1.value = 1;
        input2.value = bitcoin;
    }
    else{
        input1.value = (input2.value / bitcoin).toFixed(7);
    }
}
