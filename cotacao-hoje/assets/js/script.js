window.addEventListener('load', async (event) => {
    var url = `https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL,GBP-BRL,AUD-BRL,CHF-BRL,CAD-BRL,CNY-BRL,ARS-BRL,JPY-BRL`;

    var result = await fetch(url);
    var json = await result.json();

    for (var prop in json) {

        var box = document.createElement('div');
        var boxTitle = document.createElement('div');
        var boxContent = document.createElement('div');

        box.classList.add('mainCoins__box');
        boxTitle.classList.add('mainCoins__box__title');
        boxContent.classList.add('mainCoins__box__content');

        document.querySelector('.mainCoins').appendChild(box);
        box.appendChild(boxTitle);
        box.appendChild(boxContent);

        if(json[prop].code != 'BTC'){
            var price = json[prop].high;
            price = price.toString();
            price = price.slice(0, (price.indexOf('.'))+3);
            price = 'R$ '+price.replace('.', ',');
        } else{
            price = 'R$ '+json[prop].high+'k';
        }
            
        var name = json[prop].name;
        name = name.slice(0, (name.indexOf('/')));

        boxTitle.innerHTML = '1 '+json[prop].code + ` (${name})`;
        boxContent.innerHTML = price;
    }
});



