window.addEventListener('load', request);

document.querySelector('#coin1').addEventListener('change', handleInput);
document.querySelector('#coin2').addEventListener('change', handleInput);
document.querySelector('#list1').addEventListener('change', handleInput);
document.querySelector('#list2').addEventListener('change', handleInput);

var json = undefined;
var BRL = 1;

async function request() {
    var url = `https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL,GBP-BRL,AUD-BRL,CHF-BRL,CAD-BRL,CNY-BRL,ARS-BRL`;
    
    var result = await fetch(url);
    json = await result.json();

    createElement();

    sessionStorage.setItem('json', JSON.stringify(json));
}

function createElement() {
    for (let prop in json) {

        var box = document.createElement('div');
        var boxTitle = document.createElement('div');
        var boxContent = document.createElement('div');

        box.classList.add('mainCoins__box');
        boxTitle.classList.add('mainCoins__box__title');
        boxContent.classList.add('mainCoins__box__content');

        document.querySelector('.mainCoins').appendChild(box);
        box.appendChild(boxTitle);
        box.appendChild(boxContent);

        if (json[prop].code != 'BTC') {
            price = json[prop].ask;
            price = price.slice(0, (price.indexOf('.')) + 3);
            price = 'R$ ' + price.replace('.', ',');
        } else {
            price = json[prop].ask;
            price = price.slice(0,5);
            price = 'R$ ' + price + 'k';
        }

        var name = json[prop].name;
        name = name.slice(0, (name.indexOf('/')));

        boxTitle.innerHTML = '1 ' + json[prop].code + ` (${name})`;
        boxContent.innerHTML = price;
    }

    let dolar = json.USDBRL.ask;
    dolar = dolar.slice(0, (dolar.indexOf('.')) + 3);

    document.querySelector('#coin1').value = BRL;
    document.querySelector('#coin2').value = BRL;
}

function handleInput() {

    let moeda1 = BRL;
    let moeda2 = undefined;

    let select1 = document.querySelector('#list1');
    let valorSelect1 = select1.options[select1.selectedIndex].value;

    let select2 = document.querySelector('#list2');
    let valorSelect2 = select2.options[select2.selectedIndex].value;

    let valorInput1 = document.querySelector('#coin1').value;
    let valorInput2 = document.querySelector('#coin2').value;

    for (let prop in json) {
        if (valorSelect2 === json[prop].code) {
            moeda2 = json[prop].ask;
        }
    }

    cambio(valorInput1, valorInput2, moeda1, moeda2, valorSelect1, valorSelect2);

}

function cambio(input1, input2, moeda1, moeda2, select1, select2) {

    let result = undefined;

    if(select2 == 'BRL'){
        document.querySelector('#coin2').value = input1;
    } else if (select2 == 'BTC'){
        result = (input1 / (moeda2 * 1000)).toFixed(8);
        document.querySelector('#coin2').value = result;
    } else{
        result = input1 / moeda2;
        result = result.toFixed(2);
        document.querySelector('#coin2').value = result;
    }
    

}