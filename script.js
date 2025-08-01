function add(a, b) {
  let num = a + b;
  return parseFloat(num.toFixed(2));
}

function subtract(a, b) {
  let num = a - b;
  return parseFloat(num.toFixed(2));
}

function multiply(a, b) {
  let num = a * b;
  return parseFloat(num.toFixed(4));
}

function divide(a, b) {
  if (b == 0) return "Nah Bro";

  let num = a / b;
  return parseFloat(num.toFixed(4));
}

//Operation selecting
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

//self explanatory
function reset() {
  num1 = "";
  num2 = "";
  currentOperator = null;
  display.textContent = "";
}

let num1 = "";
let num2 = "";
let currentOperator = null;
let justCalculated = false;

const digits = document.querySelectorAll(".digit");
const display = document.querySelector(".display");
const operation = document.querySelectorAll(".operation");
const number = "0123456789";

//keyboard
document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (number.includes(key) && currentOperator === null) {
    num1 += key;
    display.textContent = num1;
  } else if (number.includes(key)) {
    if (justCalculated || display.textContent === num1) {
      display.textContent = "";
    }
    num2 += key;
    display.textContent = num2;
  }
});

digits.forEach((number) => {
  number.addEventListener("click", () => {
    const digit = number.textContent;

    //Backspacing
    if (digit === "⌫") {
      if (currentOperator === null) {
        if (num1.length > 0) {
          num1 = num1.slice(0, -1);
          display.textContent = num1;
        }
      } else {
        if (num2.length > 0) {
          num2 = num2.slice(0, -1);
          display.textContent = num2;
        }
      }
      return;
    }

    //Adding 0. when decimal point is clicked before any number
    if (digit === "." && display.textContent === "") {
      if (currentOperator === null) {
        num1 = "0.";
        display.textContent = num1;
      } else {
        num2 = "0.";
        display.textContent = num2;
      }
      return;
    }

    //Preventing multiple decimal points
    if (digit === "." && display.textContent.includes(".")) {
      return;
    }

    //Making the numbers
    if (currentOperator === null) {
      num1 += digit;
      display.textContent = num1;
    } else {
      if (justCalculated || display.textContent === num1) {
        display.textContent = "";
      }
      num2 += digit;
      display.textContent = num2;
    }
  });
});

operation.forEach((operate) => {
  const opText = operate.textContent;
  operate.addEventListener("click", () => {
    //All Clear button
    if (opText == "AC") {
      reset();
      return;
    }

    //Equal button
    if (opText == "=") {
      const result = operating(num1, currentOperator, num2);
      display.textContent = result;
      num1 = result.toString();
      num2 = "";
      currentOperator = null;
      justCalculated = true;
      return;
    }

    //Operation calling
    if (currentOperator && num1 && num2) {
      const result = operating(num1, currentOperator, num2);
      display.textContent = result;
      num1 = result.toString();
      num2 = "";
    }
    currentOperator = opText;
    justCalculated = true;
  });
});

reset();
