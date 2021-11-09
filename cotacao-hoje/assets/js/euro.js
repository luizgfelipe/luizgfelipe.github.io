var json = JSON.parse(sessionStorage.getItem('json'));
var euro = 0;
var input1Ant = 1;

window.addEventListener('load', createElement);

document.querySelector('#coin1').addEventListener('change', cambioEURBRL);
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

    var price = json.EURBRL.ask;
    price = price.slice(0, (price.indexOf('.')) + 3);
    price = 'R$ ' + price.replace('.', ',');
    
    var name = json.EURBRL.name;
    name = name.slice(0, (name.indexOf('/')));

    boxTitle.innerHTML = '1 ' + json.EURBRL.code + ` (${name})`;
    boxContent.innerHTML = price;

    euro = json.EURBRL.ask;
    euro = euro.slice(0, (euro.indexOf('.')) + 3);

    document.querySelector('#coin1').value = 1;
    document.querySelector('#coin2').value = euro;
}


function cambioEURBRL(){
    let input1 = document.querySelector('#coin1');
    let input2 = document.querySelector('#coin2');

    if(input1.value < 0 || input2.value < 0){
        input1.value = 1;
        input2.value = euro;
    }
    else{
        input2.value = (input1.value * euro).toFixed(2);
    }
}

function cambioBRLUSD(){
    let input1 = document.querySelector('#coin1');
    let input2 = document.querySelector('#coin2');

    if(input1.value < 0 || input2.value < 0){
        input1.value = 1;
        input2.value = euro;
    }
    else{
        input1.value = (input2.value / euro).toFixed(2);
    }
}
