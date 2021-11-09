var json = JSON.parse(sessionStorage.getItem('json'));
var libra = 0;
var input1Ant = 1;

window.addEventListener('load', createElement);

document.querySelector('#coin1').addEventListener('change', cambioGBPBRL);
document.querySelector('#coin2').addEventListener('change', cambioBRLGBP);

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

    var price = json.GBPBRL.ask;
    price = price.slice(0, (price.indexOf('.')) + 3);
    price = 'R$ ' + price.replace('.', ',');
    
    var name = json.GBPBRL.name;
    name = name.slice(0, (name.indexOf('/')));

    boxTitle.innerHTML = '1 ' + json.GBPBRL.code + ` (${name})`;
    boxContent.innerHTML = price;

    libra = json.GBPBRL.ask;
    libra = libra.slice(0, (libra.indexOf('.')) + 3);

    document.querySelector('#coin1').value = 1;
    document.querySelector('#coin2').value = libra;
}


function cambioGBPBRL(){
    let input1 = document.querySelector('#coin1');
    let input2 = document.querySelector('#coin2');

    if(input1.value < 0 || input2.value < 0){
        input1.value = 1;
        input2.value = libra;
    }
    else{
        input2.value = (input1.value * libra).toFixed(2);
    }
}

function cambioBRLGBP(){
    let input1 = document.querySelector('#coin1');
    let input2 = document.querySelector('#coin2');

    if(input1.value < 0 || input2.value < 0){
        input1.value = 1;
        input2.value = libra;
    }
    else{
        input1.value = (input2.value / libra).toFixed(2);
    }
}
