let result = document.getElementById("result");
let currentValue = "";

function appendToDisplay(value){
    currentValue += value;
    result.value = currentValue;
}

function clearDisplay(){
    currentValue = "";
    result.value = "";
}

function calculate() {
    try{
        currentValue = evaluateExpression(currentValue);
        result.value = currentValue;
    } catch (error) {
        result.value = "Error";
    }
}

function evaluateExpression(expression) {
    const operators = [];
    const operands = [];

    const precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    };

    const tokens = expression.split(/(\+|-|\*|\/)/);

    for (const token of tokens) {
        const trimmedToken = token.trim();
        
        if (!trimmedToken) {
            continue; 
        }

        if (trimmedToken in precedence) {
            while (
                operators.length > 0 &&
                precedence[trimmedToken] <= precedence[operators[operators.length - 1]]
            ) {
                const operator = operators.pop();
                const operand2 = operands.pop();
                const operand1 = operands.pop();
                operands.push(applyOperator(operand1, operand2, operator));
            }
            operators.push(trimmedToken);
        } else {
            operands.push(parseFloat(trimmedToken));
        }
    }

    while (operators.length > 0) {
        const operator = operators.pop();
        const operand2 = operands.pop();
        const operand1 = operands.pop();
        operands.push(applyOperator(operand1, operand2, operator));
    }

    if (operands.length === 1) {
        return operands[0];
    } else {
        throw new Error("Invalid expression");
    }
}

function applyOperator(num1, num2, operator) {
    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            if (num2 !== 0) {
                return num1 / num2;
            } else {
                throw new Error("Division by zero");
            }
        default:
            throw new Error("Unexpected operator: " + operator);
    }
}


