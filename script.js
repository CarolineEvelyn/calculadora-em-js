const resultado = document.querySelector(".resultado"); //pega a referencia para o resultado
const buttons = document.querySelectorAll(".buttons button"); //pega todos os buttons dentro da class buttom

let currentNumber = ""; //numero atual
let firstOperand = null; //primeiro numero
let operator = null; //operação
let restart = false; //recomeçar

function updateResult(originClear = false){
    resultado.innerText = originClear ? 0 : currentNumber.replace("." , ",");
} //se a origem vier do C(clear) vai voltar pra 0 se nao vai continuar o numero

function addDigit(digit) {
    if (digit === "," && (currentNumber.includes("," || !currentNumber.includes))) return; //se o digito for uma virgula e ja tiver uma, nao faz nada
    
    if (restart) { //se for recomeçar
        currentNumber = digit; //zera o numero atual
        restart = false; //e reinicia o restart
    } else {
        currentNumber += digit; //se nao for recomeçar, adiciona o digito ao numero atual
    }
    
    updateResult(); //atualiza o resultado
}

function setOperator(newOperator) {
    if (currentNumber) { //verifica se o numero atual existe
        calculate(); //se existir, chama a função calculate

        firstOperand = parseFloat(currentNumber.replace(",", ".")); //pega o numero atual e transforma em float, trocando a virgula por ponto
        currentNumber = ""; //zera o numero atual
    }
    operator = newOperator; //define o operador atual
}

function calculate() {
    if (operator === null || firstOperand === null) return;
    let secondOperand = parseFloat(currentNumber.replace("," , ".")); //pega o numero atual e transforma em float, trocando a virgula por ponto
    let resultValue;

    switch(operator){
        case '+':
            resultValue = firstOperand + secondOperand; //soma os dois numeros
            break;

        case '-':
            resultValue = firstOperand - secondOperand; //subtrai os dois numeros
            break;

        case '×':
            resultValue = firstOperand * secondOperand; //multiplica os dois numeros
            break;
                   
        case '÷':
         resultValue = firstOperand / secondOperand; //divide os dois numeros
            break;
        default:
            return; //se o operador for invalido, nao faz nada
}

    if (resultValue.toString().split(".")[1]?.length > 5) { //verifica se o resultado tem mais de duas casas decimais
        currentNumber = parseFloat(resultValue.toFixed(5)).toString();
    } else {
        currentNumber = resultValue.toString();
    }

    operator = null; //zera o operador
    firstOperand = null; //zera o primeiro numero
    restart = true; //define que vai reiniciar
    PercentageValue = null; //zera o valor da porcentagem
    updateResult(); //atualiza o resultado para 0
}

function clearCalculator() {
    currentNumber = ""; //zera o numero atual
    firstOperand = null; //zera o primeiro numero
    operator = null; //zera o operador
    updateResult(true); //atualiza o resultado para 0
}

function setPercentage() {
    let result = parseFloat (currentNumber) / 100;

    if (["+" , "-"].includes(operator)){
        result = result * (firstOperand || 1); //se o operador for + ou - multiplica o resultado pela primeira operacao, se nao tiver, multiplica por 1
    }

    if (result.toString().split(".")[1]?.length > 5) {
        result = result.toFixed(5).toString(); 
    }

    currentNumber = result.toString();
    updateResult();
}


buttons.forEach((button) => {
    button.addEventListener("click" , () =>{ //cada botao vai adicionar um evento de click
        const buttonText = button.innerText; //pega o texto do botao que esta clicando
        if (/^[0-9,]+$/.test(buttonText)) { //verifica se o texto do botao é um numero ou uma virgula
            addDigit(buttonText); //e chama a função addDigit passando o texto do botao
        } else if (["+" , "-" , "×" , "÷"].includes(buttonText) ){ //verifica se o botao que clicou é um operador
            setOperator(buttonText);
        } else if (buttonText === "=") { //verifica se o botao que clicou é o igual
            calculate();
        } else if (buttonText === "C") { //verifica se o botao que clicou é o C
            clearCalculator();
        } else if (buttonText === "±") {
            currentNumber = (
                parseFloat(currentNumber || firstOperand) * -1 //vai passar primeiro para o currentNumber, se noa tiver vai passar o primeiro numero (firstOperand) e multiplica por -1 para inverter o sinal
            ).toString();
            updateResult();
        } else if (buttonText === "%") { //verifica se o botao que clicou é o %
            setPercentage();
        }

       
    });
})

