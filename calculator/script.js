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
    if(e.clientX != 0){  // предотвращение повторного нажатия кнопки Enter'ом
    numberPress(e.target.innerText);
    }
  })
);

  document.addEventListener("keydown", function (e) {
    if(e.key.search(/[01-9]/g) != -1){
      numberPress(e.key);
    }else if(e.key.search(/[-\+\*\/]/g) != -1){
      operatorPress(e.key);
    }else if(e.key == "Enter"){
      resPress("=");
    }else if(e.key.search("Backspace") != -1){
      clrBtnsPress("CE");
    }else if(e.key.search("c") != -1){
      clrBtnsPress("C");
    }else if(e.key.search("q") != -1){
      operatorPress("√");
    }else if(e.key.search(/[\^p]/) != -1){
      operatorPress("ˆ");
    }else if(e.key.search(/[\.,]/) != -1){
      decPress(".");
    }
  })

operators.forEach((n) =>
  n.addEventListener("click", function (e) {
    if(e.clientX != 0){  // предотвращение повторного нажатия кнопки Enter'ом
    operatorPress(e.target.innerText);
   }
  })
);

clrBtns.forEach((n) =>
  n.addEventListener("click", function (e) {
    if(e.clientX != 0){  // предотвращение повторного нажатия кнопки Enter'ом
    clrBtnsPress(e.target.innerText);
    }
  })
);

dec.addEventListener("click", function (e) {
  if(e.clientX != 0){  // предотвращение повторного нажатия кнопки Enter'ом
  decPress(e.target.innerText);
  }
});

res.addEventListener("click", function (e) {
  if(e.clientX != 0){  // предотвращение повторного нажатия кнопки Enter'ом
  resPress(e.target.innerText);
  }
});

//--------------------------------------------

function numberPress(e) {
  operatorPressed = 0;

  if (pressedRes == 1) {    //нажатие цифры после равно начинает новое вычисление
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
  } else if(e==="√"){
    mem=calc(e);
    showOnDisplay(mem);
    isNewNumber = 1;
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
  pressedRes = 0;

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
    answ = parseFloat((mem + parseFloat(buffer)).toFixed(10));
  } else if (op === "-") {
    answ = parseFloat((mem - buffer).toFixed(10));
  } else if (op === "/") {
    if (buffer != 0) {
      answ = parseFloat((mem / buffer).toFixed(10));
    } else {
      answ = "Error";
    }
  } else if (op === "*") {
    answ = parseFloat((mem * buffer).toFixed(10));
  }else if(op==="√"){
    if(buffer && pressedRes == 0){
      answ = parseFloat(buffer)>=0 ? parseFloat(Math.sqrt(parseFloat(buffer)).toFixed(10)) : "Error";
      buffer='';
    }else if(mem){
      answ=mem>=0 ? parseFloat(Math.sqrt(mem).toFixed(10)) : "Error";
      buffer='';
    }
  }else if(op==="ˆ"){
    answ=parseFloat(Math.pow(mem, parseFloat(buffer)).toFixed(10));
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
    lastOperator=undefined;
  }
  showOnDisplay("0");
}
