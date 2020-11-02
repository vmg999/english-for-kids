const Keyboard = {
    elements: {
      main: null,
      keysContainer: null,
      keys: [],
      shift: null
    },
  
    eventHandlers: {
      oninput: null,
      onclose: null
    },
  
    properties: {
      value: "",
      capsLock: false,
      shift: false
    },
  
    init() {
      // Create main elements
      this.elements.main = document.createElement("div");
      this.elements.keysContainer = document.createElement("div");
  
      // Setup main elements
      this.elements.main.classList.add("keyboard", "11keyboard--hidden");
      this.elements.keysContainer.classList.add("keyboard__keys");
      this.elements.keysContainer.appendChild(this._createKeys());
  
      this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
  
      // Add to DOM
      this.elements.main.appendChild(this.elements.keysContainer);
      document.body.appendChild(this.elements.main);
  
      this.elements.shift = document.querySelector(".shift");
      // Automatically use keyboard for elements with .use-keyboard-input
      document.querySelectorAll(".use-keyboard-input").forEach(element => {
        element.addEventListener("focus", () => {
          this.open(element.value, currentValue => {
            element.value = currentValue;
          });
        });
      });
    },
  
    _createKeys() {
      const fragment = document.createDocumentFragment();
      const keyLayout = [
        "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
        "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\",
        "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
        "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/",
        "done","space","En/Ru"
      ];

      const keyShiftLayout = [
        "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "backspace",
        "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "{", "}", "|",
        "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", "\"", "enter",
        "Shift", "z", "x", "c", "v", "b", "n", "m", "<", ">", "?",
        "done","space","En/Ru"
      ];
      const keyRuLayout = [
        "ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
        "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\",
        "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
        "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".",
        "done","space","En/Ru"
      ];
      const keyRuShiftLayout = [
        "ё", "!", "\"", "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "backspace",
        "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\",
        "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
        "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ",",
        "done","space","En/Ru"
      ];
  
      // Creates HTML for an icon
      const createIconHTML = (icon_name) => {
        return `<i class="material-icons">${icon_name}</i>`;
      };
  
      keyLayout.forEach(key => {
        const keyElement = document.createElement("button");
        const insertLineBreak = ["backspace", "\\", "enter", "\/"].indexOf(key) !== -1;
  
        // Add attributes/classes
        keyElement.setAttribute("type", "button");
        keyElement.classList.add("keyboard__key");
  
        switch (key) {
          case "backspace":
            keyElement.classList.add("keyboard__key--wide");
            keyElement.innerHTML = createIconHTML("backspace");
  
            keyElement.addEventListener("click", () => {
              this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
              this._triggerEvent("oninput");
            });
  
            break;
  
          case "caps":
            keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
            keyElement.innerHTML = createIconHTML("keyboard_capslock");
  
            keyElement.addEventListener("click", () => {
              this._toggleCapsLock();
              keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
            });
  
            break;
          
          case "Shift":
            keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable", "shift");
            keyElement.innerHTML = "<span>Shift</span>";
            this.elements.shift = document.querySelector(".shift");
  
            keyElement.addEventListener("click", () => {
              this._toggleShift();
            //   keyElement.classList.toggle("keyboard__key--active", this.properties.shift);
            });
  
            break;
          case "enter":
            keyElement.classList.add("keyboard__key--wide");
            keyElement.innerHTML = createIconHTML("keyboard_return");
  
            keyElement.addEventListener("click", () => {
              this.properties.value += "\n";
              this._triggerEvent("oninput");
            });
  
            break;
  
          case "space":
            keyElement.classList.add("keyboard__key--extra-wide");
            keyElement.innerHTML = createIconHTML("space_bar");
  
            keyElement.addEventListener("click", () => {
              this.properties.value += " ";
              this._triggerEvent("oninput");
            });
  
            break;
  
          case "done":
            keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
            keyElement.innerHTML = createIconHTML("check_circle");
  
            keyElement.addEventListener("click", () => {
              this.close();
              this._triggerEvent("onclose");
            });
  
            break;
  
          default:
            keyElement.textContent = key.toLowerCase();
            keyElement.defCase = key.toLocaleLowerCase();

            if(key.search(/[a-z]/) !=-1){
                keyElement.shiftCase = key.toUpperCase();
            }else{
                keyElement.shiftCase = keyShiftLayout[keyLayout.indexOf(key)];
            }

            keyRu = keyRuLayout[keyLayout.indexOf(key)];
            keyElement.ruCase = keyRu;
            if(keyRu.search(/[а-я]/) !=-1){
                keyElement.shiftRuCase = keyRu.toUpperCase();
            }else{
                keyElement.shiftRuCase = keyRuShiftLayout[keyLayout.indexOf(key)];
            }
// ------------------------key press----------------------------------------------------
            keyElement.addEventListener("click", () => {
              this.properties.value += this.properties.capsLock ? keyElement.textContent.toUpperCase() : keyElement.textContent;
              this._triggerEvent("oninput");
              if(this.properties.shift){
                this._toggleShift();
              }
            });
  
            break;
        }
  
        fragment.appendChild(keyElement);
  
        if (insertLineBreak) {
          fragment.appendChild(document.createElement("br"));
        }
      });
     
      return fragment;
    },
  
    _triggerEvent(handlerName) {
      if (typeof this.eventHandlers[handlerName] == "function") {
        this.eventHandlers[handlerName](this.properties.value);
      }
    },
  
    _toggleCapsLock() {
      this.properties.capsLock = !this.properties.capsLock;
  
      for (const key of this.elements.keys) {
        if (key.childElementCount === 0) {
          key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
        }
      }
    },

    _toggleShift(){
        this.properties.shift = !this.properties.shift;
        this.elements.shift.classList.toggle("keyboard__key--active", this.properties.shift);
        
        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
              key.textContent = this.properties.shift ? key.shiftCase : key.defCase;
            }
          }    

    },
  
    open(initialValue, oninput, onclose) {
      this.properties.value = initialValue || "";
      this.eventHandlers.oninput = oninput;
      this.eventHandlers.onclose = onclose;
      this.elements.main.classList.remove("keyboard--hidden");
    },
  
    close() {
      this.properties.value = "";
      this.eventHandlers.oninput = oninput;
      this.eventHandlers.onclose = onclose;
      this.elements.main.classList.add("keyboard--hidden");
    }
  };
  
  window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
  });