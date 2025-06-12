const resultado = document.querySelector(".resultado");
        const buttons = document.querySelectorAll(".buttons button");
        const listaHistorico = document.querySelector(".lista-historico");

        let expressao = "";

        function updateResult(value = "0") {
            resultado.innerText = value;
        }

        function adicionarAoHistorico(exp, res) {
            const item = document.createElement("li");
            item.innerText = `${exp} = ${res}`;
            listaHistorico.prepend(item);
        }

        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                const btn = button.innerText;

                if (/^[0-9,]$/.test(btn)) {
                    expressao += btn === "," ? "." : btn;
                    updateResult(expressao);
                } else if (["+", "-", "×", "÷"].includes(btn)) {
                    const op = btn.replace("×", "*").replace("÷", "/");
                    expressao += ` ${op} `;
                    updateResult(expressao);
                } else if (btn === "=") {
                    try {
                        const resultadoCalc = eval(expressao).toFixed(5).replace(/\.0+$/, "").replace(/(\.\d*?)0+$/, "$1");
                        adicionarAoHistorico(expressao.replace(/\./g, ","), resultadoCalc.replace(/\./g, ","));
                        expressao = resultadoCalc;
                        updateResult(resultadoCalc.replace(/\./g, ","));
                    } catch {
                        updateResult("Erro");
                        expressao = "";
                    }
                } else if (btn === "C") {
                    expressao = "";
                    updateResult("0");
                } else if (btn === "%") {
                    try {
                        const valor = eval(expressao);
                        const porcento = (valor / 100).toString();
                        expressao = porcento;
                        updateResult(porcento.replace(/\./g, ","));
                    } catch {
                        updateResult("Erro");
                        expressao = "";
                    }
                } else if (btn === "±") {
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