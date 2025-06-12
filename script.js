// Seleciona os elementos principais da calculadora
const resultado = document.querySelector(".resultado");
const buttons = document.querySelectorAll(".buttons button");
const listaHistorico = document.querySelector(".lista-historico");

let expressao = "";

// Atualiza o display com o valor atual ou "0" por padrão
function updateResult(value = "0") {
    resultado.innerText = value;
}

// Adiciona a expressão e o resultado ao histórico
function adicionarAoHistorico(exp, res) {
    const item = document.createElement("li");
    item.innerText = `${exp} = ${res}`;
    listaHistorico.prepend(item);
}

// Adiciona eventos de clique para cada botão
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const btn = button.innerText;

        // Verifica se o botão é um número ou vírgula
        if (/^[0-9,]$/.test(btn)) {
            expressao += btn === "," ? "." : btn;
            updateResult(expressao);
        } 
        // Verifica se o botão é uma operação (+, -, ×, ÷)
        else if (["+", "-", "×", "÷"].includes(btn)) {
            const op = btn.replace("×", "*").replace("÷", "/");
            expressao += ` ${op} `;
            updateResult(expressao);
        } 
        // Calcula o resultado ao pressionar "="
        else if (btn === "=") {
            try {
                const resultadoCalc = Function(`'use strict'; return (${expressao})`)()
                    .toFixed(5)
                    .replace(/\.0+$/, "")
                    .replace(/(\.\d*?)0+$/, "$1");
                adicionarAoHistorico(expressao.replace(/\./g, ","), resultadoCalc.replace(/\./g, ","));
                expressao = resultadoCalc;
                updateResult(resultadoCalc.replace(/\./g, ","));
            } catch {
                updateResult("Erro");
                expressao = "";
            }
        } 
        // Limpa a expressão ao pressionar "C"
        else if (btn === "C") {
            expressao = "";
            updateResult("0");
        } 
        // Calcula porcentagem ao pressionar "%"
        else if (btn === "%") {
            try {
                const valor = Function(`'use strict'; return (${expressao})`)();
                const porcento = (valor / 100).toString();
                expressao = porcento;
                updateResult(porcento.replace(/\./g, ","));
            } catch {
                updateResult("Erro");
                expressao = "";
            }
        } 
        // Inverte o sinal ao pressionar "±"
        else if (btn === "±") {
            try {
                const valor = eval(expressao);
                expressao = (-valor).toString();
                updateResult(expressao.replace(/\./g, ","));
            } catch {
                updateResult("Erro");
                expressao = "";
            }
        }
    });
});