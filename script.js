function add(a, b) {
  return a+b;
}

function subtract(a, b) {
  return a-b;
}

function multiply(a, b) {
  return a*b;
}

function divide(a, b) {
  if (b == 0) return "Nah Bro";
  return a/b;
}

function operating(num1, operator, num2) {
  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);
  switch (operator) {
    case "+":
      return add(n1, n2);
    case "-":
      return subtract(n1, n2);
    case "*":
      return multiply(n1, n2);
    case "/":
      return divide(n1, n2);
  }
}

function reset(){
  num1 = '';
  num2 = '';
  currentOperator = null;
  display.textContent = '';
}


let num1 = '';
let num2 = '';
let currentOperator = null;

const digits = document.querySelectorAll(".digit");
const display = document.querySelector(".display");
const operation = document.querySelectorAll(".operation");

display.textContent = "";

digits.forEach((number) => {
  number.addEventListener("click", () => {
    if (currentOperator === null) {
      num1 += number.textContent;
      display.textContent = num1;
    } else {
      num2 += number.textContent;
      display.textContent = num2;
    }
  });
});

operation.forEach((operate) => {
  const opText = operate.textContent;
  operate.addEventListener("click", () => {
    if (operate.textContent == "AC") {
      reset();
    }
    if (operate.textContent == "=") {
      const result = operating(num1, currentOperator, num2);
      display.textContent = result;
      num1 = result.toString();
      num2 = '';
      currentOperator = null;
    }
    if (currentOperator && num1 && num2){
      const result = operate(num1,currentOperator, num2);
      display.textContent = result;
      num1 = result.toString();
      num2 = '';
      currentOperator = null;
    }
  currentOperator = opText;
  });
});

reset();