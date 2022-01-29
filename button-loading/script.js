const button = document.querySelector('.button');
const p = document.querySelector('.p');
const loading = document.querySelector('.loading');
const div = document.createElement('div');

button.addEventListener('click', clickCompra);



function clickCompra(){
    button.style.width = '40px';
    p.classList.add('hide');
    setTimeout(removeElemento, 900);   
}

function removeElemento(){
    button.removeChild(p);
    mostrarLoading();
} 

function mostrarLoading(){
    button.appendChild(div);
    div.setAttribute('class', 'loading');
    setTimeout(mostrarCheck, 2000);
}

function mostrarCheck(){
    div.setAttribute('class', 'check');
}