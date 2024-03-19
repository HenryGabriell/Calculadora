function getHistory(){
    return document.getElementById("history-value").innerText;
}

function printHistory(num){
    document.getElementById("history-value").innerText=num;
}

// funções de saida para recuperar e mostrar o resultado

function getOutput(){
    return document.getElementById("output-value").innerText;
}

function printOutput(num) {
    if (num == ""){
        document.getElementById("output-value").innerText=num;
    } else{
        document.getElementById("output-value").innerText=getFormattedNumber(num);
    }
}

function getFormattedNumber(num){
    if (num == "-"){
        return "";
    }
    var n = Number(num);
    var value = n.toLocaleString("en");
    return value;
}

// função para limpar comando no campo de saida

function reverseNumberFormat(num) {
    return Number(num.replace(/,/g,''));
}

var operador = document.getElementsByClassName("operador");
for(var i = 0; i < operador.length; i++){
    operador[i].addEventListener("click", function(){
        if(this.id == "limpar"){
            printHistory("");
            printOutput("");
        } else if (this.id == "espaço") {
            var output = reverseNumberFormat(getOutput()).toString();
            if(output) { //Se a saida tiver um valor
                output = output.substr(0, output.length-1);
                printOutput(output);
            }
        } else {
            var output = getOutput();
            var history = getHistory();
            if(output == "" && history != ""){
                if(isNaN(history[history.length-1])) {
                    history = history.substr(0, history.length-1);
                }
            }
            if(output != "" || history != ""){
                output = output == ""?
                output:reverseNumberFormat(output);
                history = history+output;
                if(this.id == "="){
                    var result = eval(history);
                    printOutput(result);
                    printHistory("");
                } else {
                    history = history + this.id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }
    });
}

var number = document.getElementsByClassName("numero");
for(var i = 0; i < number.length; i++){
    number[i].addEventListener("click", function(){
        var output = reverseNumberFormat(getOutput());
        if(!isNaN(output)){ //se a saida for numero
            output = output + this.id;
            printOutput(output);
        }
    });
}