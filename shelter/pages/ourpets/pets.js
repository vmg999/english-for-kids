let pets = [];
let fullPetsList = [];

const SLIDER = {
  size: 8,
  page: 1,
  pages: 0,
  sl: document.getElementById("pagination"),
  prev: document.getElementById("prev"),
  next: document.getElementById("next"),
  first: document.getElementById("first"),
  last: document.getElementById("last"),
  current: document.querySelector(".current"),
};
//------------------burger------------------------------
let burgerIsSet=0,
    burger_status=0,
    burgeroverlay = document.getElementById('burger-overlay'),
    logo = document.getElementById('lg'),
    logos = document.getElementById('lgs');

function createBurger(){
    burger=document.getElementById('burg');
    burgermenu=document.getElementById('burger-menu');
    burger.addEventListener('click', (e)=>{
        if(burger_status == 0){
            // console.log(e);
            console.log('op');
            openburger();
        }else if(burger_status == 1){
            closeburger();
            // console.log(e);
            console.log('cls');
        }
        
    })
    burgerIsSet=1;
}

function openburger(){
    burger_status=1;
    burgermenu.classList.remove('burg-slide-def');
    burgermenu.classList.add('burg-slide-in');
    burger.classList.add('burger-rotate');
    burgeroverlay.classList.add("active-overlay");

    logo.classList.add('logo-color');
    logos.classList.add('logo-color');
}
function closeburger(){
    burger_status=0;
    burgermenu.classList.remove('burg-slide-in');
    burgermenu.classList.add('burg-slide-out');
    burger.classList.add('burger-rotate-back');
    burgeroverlay.classList.remove("active-overlay");

    logo.classList.remove('logo-color');
    logos.classList.remove('logo-color');

    setTimeout(()=>{
        burger.classList.remove('burger-rotate');
        burger.classList.remove('burger-rotate-back');

        burgermenu.classList.remove('burg-slide-in');
        burgermenu.classList.remove('burg-slide-out');
        burgermenu.classList.add('burg-slide-def');
    },400);
}
if (bdw() < 768){
   createBurger();
}
window.addEventListener("resize", (e) => {
    // console.log(e.target.innerWidth);
    if(e.target.innerWidth<768){
        if(burgerIsSet == 0){
            createBurger();
        }
    }
    
});

//------------------modal------------------------------------------------
let overlay = document.querySelectorAll(".overlay"),
  closebutton = document.querySelectorAll(".close-button"),
  modal = document.querySelectorAll(".modal-window"),
  modal_img = document.querySelector(".mpi-img"),
  modal_h3 = document.getElementById("modal-h3"),
  modal_h4 = document.getElementById("modal-h4"),
  mpt_text = document.querySelector(".mpt-text"),
  li_age = document.getElementById("age"),
  li_inoc = document.getElementById("inoc"),
  li_dis = document.getElementById("diseas"),
  li_parasites = document.getElementById("parasites");

closebutton.forEach((n) => n.addEventListener("click", closeModal));
overlay.forEach((n) => n.addEventListener("click", ()=>{
    closeModal();
    closeburger();
}));

//------------------slider size-----------------------------------------
if (bdw() >= 1280) {
  SLIDER.size = 8;
} else if (bdw() >= 768 && bdw() < 1280) {
  SLIDER.size = 6;
} else {
  SLIDER.size = 3;
}

window.addEventListener("resize", () => {
  if (bdw() >= 1280) {
    SLIDER.size = 8;
    SLIDER.pages = fullPetsList.length / SLIDER.size;
    SLIDER.sl.innerHTML = createSlider(SLIDER.size, SLIDER.page);
    addbtn();
  } else if (bdw() >= 768 && bdw() < 1280) {
    SLIDER.size = 6;
    SLIDER.pages = fullPetsList.length / SLIDER.size;
    SLIDER.sl.innerHTML = createSlider(SLIDER.size, SLIDER.page);
    addbtn();
  } else {
    SLIDER.size = 3;
    SLIDER.pages = fullPetsList.length / SLIDER.size;
    SLIDER.sl.innerHTML = createSlider(SLIDER.size, SLIDER.page);
    addbtn();
  }
});
//-----------------------------------------------------------------------

const request = new XMLHttpRequest();
request.open("GET", "../../assets/pets.json");

request.onload = () => {
  pets = JSON.parse(request.response);

  //------randomization---------------
  ranomization = (function () {
    for (let i = 0; i < 6; i++) {
      tmpPets = pets;

      for (let j = pets.length; j > 0; j--) {
        ind = Math.floor(Math.random() * j);
        rndel = tmpPets.splice(ind, 1)[0];
        tmpPets.push(rndel);
      }
      fullPetsList = [...fullPetsList, ...tmpPets];
    }

    for (let q = 6; q < fullPetsList.length; q += 6) {
      for (let w = q; w < q + 6; w++) {
        for (let e = q; e < q + 6; e++) {
          if (fullPetsList[e] && fullPetsList[w].name === fullPetsList[e].name && w != e && w < e){
            eightn = Math.ceil(w / 8);
            strt = (eightn - 1) * 8;
            fullPetsList.splice(strt, 0, fullPetsList.splice(fullPetsList[w], 1)[0]);
          }
        }
      }
    }
  })();

  //------------------------------------------------------
  SLIDER.pages = fullPetsList.length / SLIDER.size;
  SLIDER.sl.innerHTML = createSlider(SLIDER.size, SLIDER.page);
  addbtn();
  //-----------------prev-next-buttons---------------------
  SLIDER.first.addEventListener("click", (e) => {
    SLIDER.page=1;
    SLIDER.sl.innerHTML = createSlider(SLIDER.size, SLIDER.page);
    addbtn();

    SLIDER.current.innerHTML=SLIDER.page;
    SLIDER.sl.classList.add("slide-left");
    setTimeout(() => {SLIDER.sl.classList.remove("slide-left");}, 800);

    mklin();
    mkrac();
  });

  SLIDER.prev.addEventListener("click", (e) => {
      SLIDER.page--;
      SLIDER.sl.innerHTML = createSlider(SLIDER.size, SLIDER.page);
      addbtn();

      SLIDER.current.innerHTML=SLIDER.page;
      SLIDER.sl.classList.add("slide-left");
      setTimeout(() => {SLIDER.sl.classList.remove("slide-left");}, 800);

      if(SLIDER.page == 1){
          mklin();
      }
      if(SLIDER.page < SLIDER.pages){
          mkrac();
      }
    });


  SLIDER.next.addEventListener("click", (e) => {
      SLIDER.page++;
      SLIDER.sl.innerHTML = createSlider(SLIDER.size, SLIDER.page);
      addbtn();

      SLIDER.current.innerHTML=SLIDER.page;
      SLIDER.sl.classList.add("slide-right");
      setTimeout(() => {
      SLIDER.sl.classList.remove("slide-right");}, 800);
      
        if (SLIDER.page == SLIDER.pages) {
            mkrin();
          }
        if(SLIDER.page>1){
            mklac();
        }  
    })
  

  SLIDER.last.addEventListener("click", (e) => {
    SLIDER.page = SLIDER.pages;
    SLIDER.sl.innerHTML = createSlider(SLIDER.size, SLIDER.page);
    addbtn();

    SLIDER.current.innerHTML=SLIDER.page;
    SLIDER.sl.classList.add("slide-left");
    setTimeout(() => {SLIDER.sl.classList.remove("slide-left");}, 800);

    mkrin();
    mklac();
  });
}; //onload end

request.send();

//------------------functions--------------------------------
function bdw() {
  return document.querySelector("body").offsetWidth;
}

function createSlider(size, page) {
  slider = "";
  start = (page - 1) * size;
  end = start + size;
  for (let i = start; i < end; i++) {
    slider += createCard(i);
  }

  return slider;
}

function createCard(i) {
  card = `<div class="card">`;
  card += `<img class="card-img" src="${fullPetsList[i].img}" alt="${fullPetsList[i].name}" />`;
  card += `<h4>${fullPetsList[i].name}</h4>`;
  card += `<button class="card-btn">Learn more</button></div>`;

  return card;
}

//----------modal window funcs---------------
function addbtn() {
  document
    .querySelectorAll(".card-btn")
    .forEach((n) => n.addEventListener("click", openModal)); //add modal button
}

function openModal(e) {
  modal[0].classList.add("active-modal");
  overlay[0].classList.add("active-overlay");

  if (navigator.userAgent.search("Firefox") != -1) {
    name = e.explicitOriginalTarget.parentNode.childNodes[1].innerHTML;
  } else {
    name = e.path[1].children[1].innerHTML;
  }

  i = getInd(name);

  modal_img.src = fullPetsList[i].img;
  modal_h3.innerHTML = name;
  modal_h4.innerHTML = fullPetsList[i].type + " - " + fullPetsList[i].breed;
  mpt_text.innerHTML = fullPetsList[i].description;
  li_age.innerHTML = fullPetsList[i].age;
  li_inoc.innerHTML = fullPetsList[i].inoculations.join(", ");
  li_dis.innerHTML = fullPetsList[i].diseases.join(", ");
  li_parasites.innerHTML = fullPetsList[i].parasites.join(", ");
}

function closeModal(e) {
  modal[0].classList.remove("active-modal");
  overlay[0].classList.remove("active-overlay");
}

function getInd(name) {
  for (i = 0; i < fullPetsList.length; i++) {
    if (fullPetsList[i].name === name) {
      return i;
    }
  }
}

//-------------pagination button functions---------------------------
function mkrac(){
    SLIDER.next.classList.add("active");
    SLIDER.last.classList.add("active");
    SLIDER.next.classList.remove("inactive");
    SLIDER.last.classList.remove("inactive");
}
function mkrin(){
    SLIDER.next.classList.add("inactive");
    SLIDER.last.classList.add("inactive");
    SLIDER.next.classList.remove("active");
    SLIDER.last.classList.remove("active"); 
}
function mklac(){
    SLIDER.prev.classList.remove("inactive");
    SLIDER.prev.classList.add("active");
    SLIDER.first.classList.remove("inactive");
    SLIDER.first.classList.add("active");
}
function mklin(){
    SLIDER.prev.classList.remove("active");
    SLIDER.prev.classList.add("inactive");
    SLIDER.first.classList.remove("active");
    SLIDER.first.classList.add("inactive");
}