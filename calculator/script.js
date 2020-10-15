let numbers = document.querySelectorAll(".number"),
  operators = document.querySelectorAll(".operator"),
  clrBtns = document.querySelectorAll(".clear-btn"),
  dec = document.getElementById("decimal"),
  display = document.getElementById("display"),
  res = document.getElementById("result"),
  mem,
  buffer = "",
  state = {
    lastOperator: undefined,
    isNewNumber: 1,
    operatorPressed: 0,
    pressedRes: 0
  }

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
      clrBtnsPress("→");
    }else if(e.key.search("x") != -1){
      clrBtnsPress("CE");
    }else if(e.key.search("c") != -1){
      clrBtnsPress("C");
    }else if(e.key.search("q") != -1){
      operatorPress("√");
    }else if(e.key.search("w") != -1){
      operatorPress("∛");
    }else if(e.key.search("r") != -1){
      operatorPress(",⎵ ⎵");
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
  state.operatorPressed = 0;

  if (state.pressedRes == 1) {    //нажатие цифры после равно начинает новое вычисление
    mem = undefined;
    buffer = "";
    state.pressedRes = 0;
  }

  if (state.isNewNumber == 0) {
    buffer += e;
  } else if (state.isNewNumber == 1) {
    buffer = "";
    buffer += e;
    state.isNewNumber = 0;
  }
  showOnDisplay(buffer);
}

function operatorPress(e) {
  if (
    (state.isNewNumber == 1 && state.operatorPressed == 1 && e === "-") ||
    (state.isNewNumber == 1 && mem == undefined && buffer == "" && e === "-")
  ) {
    buffer = "-";
    state.isNewNumber = 0;
    state.operatorPressed = 0;
    showOnDisplay(buffer);
  }else if(e==="√" || e==="∛"){
    buffer=calc(e);
    showOnDisplay(buffer);
    mem=undefined;
    state.lastOperator=undefined;
    state.isNewNumber = 0;
  }else if(e===",⎵ ⎵"){
    if(String(buffer).search(/\./)!=-1 || String(mem).search(/\./)!=-1 ){
    buffer=calc(e);
    showOnDisplay(buffer);
    mem=undefined;
    state.lastOperator=undefined;
    state.isNewNumber = 0;
    }
  } else if (mem == undefined && state.isNewNumber == 0) {
    state.lastOperator = e;
    mem = parseFloat(buffer);
    state.isNewNumber = 1;
    showOnDisplay(buffer + " " + e);
  } else if (mem != undefined && state.isNewNumber == 0) {
    mem = calc(state.lastOperator);
    state.isNewNumber = 1;
    showOnDisplay(mem + " " + e);
    state.lastOperator = e;
  } else if (mem != undefined && state.isNewNumber == 1) {
    showOnDisplay(mem + " " + e);
    state.lastOperator = e;
  }
  state.operatorPressed = 1;
  state.pressedRes = 0;
}

function decPress(e) {
  state.operatorPressed = 0;
  state.pressedRes = 0;

  if (state.isNewNumber == 0 && buffer.search(/\./) == -1) {
    buffer += e;
  } else if (state.isNewNumber == 1) {
    buffer = "0.";
    state.isNewNumber = 0;
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
    if(buffer && state.pressedRes == 0){
      answ = parseFloat(buffer)>=0 ? parseFloat(Math.sqrt(parseFloat(buffer)).toFixed(10)) : "Error";
    }else if(mem){
      answ=mem>=0 ? parseFloat(Math.sqrt(mem).toFixed(10)) : "Error";
    }
  }else if(op==="∛"){
    if(buffer && state.pressedRes == 0){
      answ = parseFloat(Math.cbrt(parseFloat(buffer)).toFixed(10));
    }else if(mem){
      answ=parseFloat(Math.cbrt(mem).toFixed(10));
    }
  }else if(op===",⎵ ⎵"){
    if(buffer && state.pressedRes == 0){
      answ = parseFloat(buffer).toFixed(2);
    }else if(mem){
      answ=mem.toFixed(2);
    }
  }else if(op==="ˆ"){
    answ=parseFloat(Math.pow(mem, parseFloat(buffer)).toFixed(10));
  }
  return answ;
}

function resPress(e) {
  state.operatorPressed = 0;

  if (e === "=" && mem != undefined) {
    mem = calc(state.lastOperator);
    showOnDisplay(mem);
    state.pressedRes = 1;
    state.isNewNumber = 1;
  }
}

function clrBtnsPress(e) {
  if(e==="→" && buffer != undefined && display.value !=0 && buffer.length>1){
    buffer=buffer.slice(0,-1);
    showOnDisplay(buffer);
    return;
  }
  state.operatorPressed = 0;
  buffer = "";
  state.isNewNumber = 1;

  if (e === "C") {
    mem = undefined;
    state.lastOperator=undefined;
  }
  showOnDisplay("0");
}
