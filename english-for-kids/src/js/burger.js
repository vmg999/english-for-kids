let burger_status = 0;
let burgerIsSet = 0;
let burger;
let burgermenu;
let mainmenu;
let body;

export function createBurger() {
  burger = document.getElementById("burg");
  burgermenu = document.getElementById("burger-menu");
  burger.addEventListener("click", (e) => {
    if (burger_status == 0) {
      openburger();
    } else if (burger_status == 1) {
      closeburger();
    }
  });
  burgerIsSet = 1;
}

export function openburger() {
  burger_status = 1;
  burgermenu.classList.remove("burg-slide-def");
  burgermenu.classList.add("burg-slide-in");
  burger.classList.add("burger-rotate");
}

export function closeburger() {
  burger_status = 0;
  burgermenu.classList.remove("burg-slide-in");
  burgermenu.classList.add("burg-slide-out");
  burger.classList.add("burger-rotate-back");

  setTimeout(() => {
    burger.classList.remove("burger-rotate");
    burger.classList.remove("burger-rotate-back");

    burgermenu.classList.remove("burg-slide-in");
    burgermenu.classList.remove("burg-slide-out");
    burgermenu.classList.add("burg-slide-def");
  }, 400);
}

mainmenu = document.querySelectorAll('.b-list-current');
mainmenu.forEach(el=>{
  el.addEventListener('click', ()=>{
    closeburger();
  });
})
body = document.getElementById('app');
body.addEventListener('click', ()=>{
  if(burger_status === 1) {
    closeburger();
  }
})