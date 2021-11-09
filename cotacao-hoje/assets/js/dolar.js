var json = JSON.parse(sessionStorage.getItem('json'));
var dolar = 0;
var input1Ant = 1;

window.addEventListener('load', createElement);

document.querySelector('#coin1').addEventListener('change', cambioUSDBRL);
document.querySelector('#coin2').addEventListener('change', cambioBRLUSD);

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

    var price = json.USDBRL.ask;
    price = price.slice(0, (price.indexOf('.')) + 3);
    price = 'R$ ' + price.replace('.', ',');
    
    var name = json.USDBRL.name;
    name = name.slice(0, (name.indexOf('/')));

    boxTitle.innerHTML = '1 ' + json.USDBRL.code + ` (${name})`;
    boxContent.innerHTML = price;

    dolar = json.USDBRL.ask;
    dolar = dolar.slice(0, (dolar.indexOf('.')) + 3);

    document.querySelector('#coin1').value = 1;
    document.querySelector('#coin2').value = dolar;
}


function cambioUSDBRL(){
    let input1 = document.querySelector('#coin1');
    let input2 = document.querySelector('#coin2');

    if(input1.value < 0 || input2.value < 0){
        input1.value = 1;
        input2.value = dolar;
    }
    else{
        input2.value = (input1.value * dolar).toFixed(2);
    }
}

function cambioBRLUSD(){
    let input1 = document.querySelector('#coin1');
    let input2 = document.querySelector('#coin2');

    if(input1.value < 0 || input2.value < 0){
        input1.value = 1;
        input2.value = dolar;
    }
    else{
        input1.value = (input2.value / dolar).toFixed(2);
    }
}
