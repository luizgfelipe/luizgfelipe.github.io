var total = 0;
var imagem = 306;
var cont = 0;
var aberto = false;

document.querySelector('.menu-mobile-icon').setAttribute('onclick', 'Menu()');
function slider(){
    cont += 1;
    total = total - imagem;
    if(cont < 5){
        document.querySelector('.slider').style.marginLeft = total+"px";
    } else{
        document.querySelector('.slider').style.marginLeft = "0px";
        cont = 0;
        total = 0;
    }
    
}

var timeoutID = setInterval(slider, 5000);

document.querySelectorAll('.button').forEach(button => {
    button.setAttribute('onclick', 'buttonClick(this)');
});

function buttonClick(element){
    let margin = document.querySelector('.vertical-slider-topic').clientHeight;
    let valor = element.getAttribute('data-value');
    
    document.querySelector('.vertical-slider').style.marginTop = '-'+valor * margin+'px';

}

function Menu(){
    if(aberto == true){
        document.querySelector('.menu-mobile-list').style.display = 'none'; 
        aberto = false
    } else{
        document.querySelector('.menu-mobile-list').style.display = 'block'; 
        aberto = true
    }
}