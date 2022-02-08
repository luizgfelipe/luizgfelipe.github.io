$(function() {
    $('#initialContribution').maskMoney({prefix:'R$ ', allowNegative: true, thousands:'.', decimal:',', affixesStay: true});
    $('#monthContribution').maskMoney({prefix:'R$ ', allowNegative: true, thousands:'.', decimal:',', affixesStay: true});
});

$(function() {
    $('#deadline').mask('000', {reverse: true});
    $('#income').mask('000%', {reverse: true});
});