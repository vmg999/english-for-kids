let pets = [];
let fullPetsList = [];

const SLIDER = {
  size: 3,
  page: 1,
  pages: 0,
  sl: document.getElementById("slider"),
  prev: document.querySelectorAll(".prev"),
  next: document.querySelectorAll(".next"),
};

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
overlay.forEach((n) => n.addEventListener("click", closeModal));

//------------------slider size-----------------------------------------
if (bdw() >= 1280) {
  SLIDER.size = 3;
} else if (bdw() >= 768 &&  bdw() < 1280){
  SLIDER.size = 2;
} else {
  SLIDER.size = 1;
}

window.addEventListener("resize", () => {
  if (bdw() >= 1280) {
    SLIDER.size = 3;
    SLIDER.sl.innerHTML = createSlider(SLIDER.size, SLIDER.page);
    addbtn();
  } else if (bdw() >= 768 && bdw() < 1280){
    SLIDER.size = 2;
    SLIDER.sl.innerHTML = createSlider(SLIDER.size, SLIDER.page);
    addbtn();
  } else {
    SLIDER.size = 1;
    SLIDER.sl.innerHTML = createSlider(SLIDER.size, SLIDER.page);
    addbtn();
  }
});
//-----------------------------------------------------------------------

const request = new XMLHttpRequest();
request.open("GET", "../../assets/pets.json");

request.onload = () => {
  pets = JSON.parse(request.response);

  for (let i = 0; i < 6; i++) {
    tmpPets = pets;

    for (let j = pets.length; j > 0; j--) {
      ind = Math.floor(Math.random() * j);
      rndel = tmpPets.splice(ind, 1)[0];
      tmpPets.push(rndel);
    }
    fullPetsList = [...fullPetsList, ...tmpPets];
  }

  SLIDER.pages = fullPetsList.length / SLIDER.size;
  SLIDER.sl.innerHTML = createSlider(SLIDER.size, SLIDER.page);
  addbtn();
  //-----------------prev-next-buttons---------------------
  SLIDER.prev.forEach((n) => n.addEventListener("click", (e) => {
      if (SLIDER.page == 1) {
        SLIDER.page = SLIDER.pages;
      }
      SLIDER.page--;
      SLIDER.sl.innerHTML = createSlider(SLIDER.size, SLIDER.page);
      addbtn();

      SLIDER.sl.classList.add('slide-left');
      setTimeout(()=>{SLIDER.sl.classList.remove('slide-left');} , 800);
    })
  );

  SLIDER.next.forEach((n) => n.addEventListener("click", (e) => {
      if (SLIDER.page == SLIDER.pages) {
        SLIDER.page = 1;
      }
      SLIDER.page++;
      SLIDER.sl.innerHTML = createSlider(SLIDER.size, SLIDER.page);
      addbtn();

      SLIDER.sl.classList.add('slide-right');
      setTimeout(()=>{SLIDER.sl.classList.remove('slide-right');} , 800);
    })
  );
  
}; //onload end

request.send();

//------------------functions--------------------------------
function bdw(){
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
  document.querySelectorAll(".card-btn").forEach((n) => n.addEventListener("click", openModal)); //add modal button
}

function openModal(e) {

  modal[0].classList.add("active-modal");
  overlay[0].classList.add("active-overlay");

  if(navigator.userAgent.search('Firefox') != -1){
    name = e.explicitOriginalTarget.parentNode.childNodes[1].innerHTML;
  }else{
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
