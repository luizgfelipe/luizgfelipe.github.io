// Funcões para requisição
const API_BASE = 'http://localhost:3000'
const API_INDICATORS = '/indicadores';
const API_SIMULATIONS = '/simulacoes';
const beforeIncome = 'tipoRendimento=';
const beforeIndexing = 'tipoIndexacao=';
const simulatorInputs = [...document.querySelectorAll('.label__input')];

function getIPCA_CDI(answerIndicators) {
    fetch(`${API_BASE}${API_INDICATORS}`)
        .then((result) => {
            return result.json();
        })
        .then((indicatorsJson) => {
            answerIndicators(indicatorsJson);
        })
        .catch((error) => {
            console.log(`Erro na requisição: ${API_INDICATORS}`);
        });
}

function getSimulations(income, indexing) {
    fetch(`${API_BASE}${API_SIMULATIONS}?${beforeIncome}${income}&${beforeIndexing}${indexing}`)
        .then((result) => {
            return result.json();
        })
        .then((simulationJson) => {
            const aliquotaIR = simulationJson[0].aliquotaIR;
            const ganhoLiquido = simulationJson[0].ganhoLiquido.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
            const valorFinalBruto = simulationJson[0].valorFinalBruto.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
            const valorFinalLiquido = simulationJson[0].valorFinalLiquido.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
            const valorPagoIR = simulationJson[0].valorPagoIR.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
            const valorTotalInvestido = simulationJson[0].valorTotalInvestido.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
            
            document.querySelector('#grossFinalValue').innerHTML = valorFinalBruto;
            document.querySelector('#aliquot').innerHTML = aliquotaIR + '%';
            document.querySelector('#amountPaid').innerHTML = valorPagoIR;
            document.querySelector('#liquidFinalValue').innerHTML = valorFinalLiquido;
            document.querySelector('#totalInvested').innerHTML = valorTotalInvestido;
            document.querySelector('#liquidGain').innerHTML = ganhoLiquido;
            
            const chartData = simulationJson[0].graficoValores;          
           
            const ctx = document.querySelector('.canva').getContext('2d');
            teste = new Chart(ctx, {
                type: 'bar',
                data:{
                    labels: Object.keys(chartData.comAporte),
                    datasets: [{
                        label: 'Sem Aporte | R$',
                        backgroundColor: '#111111',
                        data: Object.values(chartData.semAporte),
                        stack: 'Stack 0',
                    },{
                        label: 'Com aporte | R$',
                        data: Object.values(chartData.comAporte),
                        backgroundColor: '#ed8e53',
                        stack: 'Stack 0',
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Projeção de Valores'
                          }
                    },
                    interaction: {
                        intersect: false,
                      }
                },              
            });

            
        })
        .catch((error) => {
            console.log(`Erro na requisição: ${API_BASE}${API_SIMULATIONS}`)
        });
}

//Pegando os valores do CDI e IPCA
window.addEventListener('load', getIPCA_CDI((listIPCA_CDI) => {
    const cdi = document.querySelector('#cdi');
    const ipca = document.querySelector('#ipca');
    const valuesString = [];

    for (let i in listIPCA_CDI){
        let valueString = listIPCA_CDI[i].valor + "";
        valuesString.push(valueString.replace('.', ','));
    }

    cdi.value = valuesString[0] + '%';
    ipca.value = valuesString[1] + '%';
}));


document.querySelectorAll('.label__input').forEach((input) => {
    input.addEventListener('focusout', verifyEmpty);
});


function verifyEmpty() {
    for (i in simulatorInputs) {
        if((simulatorInputs[i].value === '') || simulatorInputs[3].value == '%'){
            document.querySelector('#button__submit__form').setAttribute('disabled', 'disabled');
            document.querySelector('#button__submit__form').classList.remove('submit');
            
            return
        }
    }

    document.querySelector('#button__submit__form').removeAttribute('disabled');
    document.querySelector('#button__submit__form').classList.add('submit');
}


document.querySelector('#button__clear__form').addEventListener('click', (event) => {

    document.querySelector('.results__simulator').style.visibility = 'hidden';
    
    document.querySelector('#button__submit__form').setAttribute('disabled', 'disabled');
    document.querySelector('#button__submit__form').classList.remove('submit');

    for(i in simulatorInputs) {
        if((simulatorInputs[i].id == 'ipca') || simulatorInputs[i].id == 'cdi'){
            return
        } else {
            simulatorInputs[i].value = '';
        }
    }
})

const graphicBar = document.createElement('div').classList.add('graphic__bar');
const subtitleBar = document.createElement('div');
const withContribuition = document.createElement('div');
const withoutContribuition = document.createElement('div');

subtitleBar.classList.add('month__contribuition');
withoutContribuition.classList.add('without__contribuition');
withContribuition.classList.add('with__contribuition');


//Valores Form
const form = document.querySelector('.simulator__data');
let teste = null;

form.addEventListener('submit', (event) => {
    
    let incomeType = document.querySelector('input[name="incomeType"]:checked').value; // Radios
    let indexing = document.querySelector('input[name="indexing"]:checked').value;
    
    let initial = document.querySelector('input[id="initialContribution"]').value; // Inputs
    let month = document.querySelector('input[id="monthContribution"]').value;
    let deadline = document.querySelector('input[id="deadline"]').value;
    let income = document.querySelector('input[id="income"]').value;

    document.querySelector('.results__simulator').style.visibility = 'visible';

    if(teste != null){
        teste.destroy();
    }

    event.preventDefault();
    
    getSimulations(incomeType, indexing);
});

