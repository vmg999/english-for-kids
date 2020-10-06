let numbers = document.querySelectorAll(".number"),
  operators = document.querySelectorAll(".operator"),
  clrBtns = document.querySelectorAll(".clear-btn"),
  dec = document.getElementById("decimal"),
  display = document.getElementById("display"),
  res = document.getElementById("result"),
  mem,
  buffer = "",
  lastOperator,
  isNewNumber = 1,
  operatorPressed = 0,
  pressedRes = 0;

// -------addEventListener--------------------

numbers.forEach((n) =>
  n.addEventListener("click", function (e) {
    numberPress(e.target.innerText);
  })
);

operators.forEach((n) =>
  n.addEventListener("click", function (e) {
    operatorPress(e.target.innerText);
  })
);

clrBtns.forEach((n) =>
  n.addEventListener("click", function (e) {
    clrBtnsPress(e.target.innerText);
  })
);

dec.addEventListener("click", function (e) {
  decPress(e.target.innerText);
});

res.addEventListener("click", function (e) {
  resPress(e.target.innerText);
});

//--------------------------------------------

function numberPress(e) {
  operatorPressed = 0;

  if (pressedRes == 1) {
    //нажатие цифры после равно начинает новое вычисление
    mem = undefined;
    buffer = "";
    pressedRes = 0;
  }

  if (isNewNumber == 0) {
    buffer += e;
  } else if (isNewNumber == 1) {
    buffer = "";
    buffer += e;
    isNewNumber = 0;
  }
  showOnDisplay(buffer);
}

function operatorPress(e) {
  if (
    (isNewNumber == 1 && operatorPressed == 1 && e === "-") ||
    (isNewNumber == 1 && mem == undefined && buffer == "" && e === "-")
  ) {
    buffer = "-";
    isNewNumber = 0;
    operatorPressed = 0;
    showOnDisplay(buffer);
  } else if (mem == undefined && isNewNumber == 0) {
    lastOperator = e;
    mem = parseFloat(buffer);
    isNewNumber = 1;
    showOnDisplay(buffer + " " + e);
  } else if (mem != undefined && isNewNumber == 0) {
    mem = calc(lastOperator);
    isNewNumber = 1;
    showOnDisplay(mem + " " + e);
    lastOperator = e;
  } else if (mem != undefined && isNewNumber == 1) {
    showOnDisplay(mem + " " + e);
    lastOperator = e;
  }

  operatorPressed = 1;
  pressedRes = 0;
}

function decPress(e) {
  operatorPressed = 0;

  if (isNewNumber == 0 && buffer.search(/\./) == -1) {
    buffer += e;
  } else if (isNewNumber == 1) {
    buffer = "0.";
    isNewNumber = 0;
  }
  showOnDisplay(buffer);
}

function showOnDisplay(value) {
  display.value = value;
}

function calc(op) {
  let answ = 0;
  if (op === "+") {
    answ = mem + parseFloat(buffer);
  } else if (op === "-") {
    answ = mem - buffer;
  } else if (op === "/") {
    if (buffer != 0) {
      answ = mem / buffer;
    } else {
      answ = "Error";
    }
  } else if (op === "*") {
    answ = mem * buffer;
  }
  return answ;
}

function resPress(e) {
  operatorPressed = 0;

  if (e === "=" && mem != undefined) {
    mem = calc(lastOperator);
    showOnDisplay(mem);
    pressedRes = 1;
    isNewNumber = 1;
  }
}

function clrBtnsPress(e) {
  operatorPressed = 0;
  buffer = "";
  isNewNumber = 1;

  if (e === "C") {
    mem = undefined;
  }
  showOnDisplay("0");
}
