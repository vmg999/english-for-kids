// DOM Elements
const time = document.querySelector('.time'),
  fullDate = document.getElementById('fullDate'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus');
  citate = document.getElementById('cit');

// Options
let tmp,
    nm,
    daytime,
    town,
    today = new Date(),
    hour = today.getHours();

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const pressure = document.querySelector('.pressure');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');

const cUrl="https://api.chucknorris.io/jokes/random";
const dayOfWeek = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
const monthName = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];

const base = '/assets/images/';
const images = ['01.jpg', '02.jpg', '03.jpg', '04.jpg','05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];

dayset=(()=>{ // -- day every hour background image set -- 
  dayset=[];
  for(let i=0;i<4;i++){
    dayset[i]=[];

    while(dayset[i].length<6){
        rnd=Math.floor(Math.random()*20);
        if(!dayset[i].some(e=>e==rnd)){
          dayset[i].push(rnd);
        }
      }
    }
  return dayset;
})();

function setBgGreet() {
  if (hour >= 6 && hour < 12) {
    // Morning
    daytime="morning";
    dtn=0;
    getImage();
    greeting.textContent = 'Доброе утро, ';
  } else if (hour >= 12 && hour < 18) {
    // Afternoon
    daytime="day";
    dtn=1;
    getImage();
    greeting.textContent = 'Добрый день, ';
  } else if (hour >= 18) {
    // Evening
    daytime="evening";
    dtn=2;
    getImage();
    greeting.textContent = 'Добрый вечер, ';
  }else if(hour >= 0 && hour < 6){
    // Night
    daytime="night";
    dtn=3;
    getImage();
    greeting.textContent = 'Доброй ночи, ';
    document.body.style.color = 'white';
  }
}

function viewBgImage(data) {
  const body = document.querySelector('body');
  const src = data;
  const img = document.createElement('img');
  img.src = src;
  img.onload = () => {      
    body.style.backgroundImage = `url(${src})`;
  }; 
}

function getImage() {
  const ind = dayset[dtn][(hour%6)];
  const imageSrc = window.location.href + base + daytime + "/" + images[ind];
  viewBgImage(imageSrc);
  btn.disabled = true;
  setTimeout(function() { btn.disabled = false }, 1000);
} 

function getImageNext(){
  tmp=dayset.flat();
  getImageNext.next++;

  k=(hour + 18 + getImageNext.next)%24;
  ind = tmp[k];

  if(k >=6 && k < 12){
    dt="day";
  }else if(k >= 12 && k < 18){
    dt="evening";
  }else if(k >= 18){
    dt="night";
  }else if(k >= 0 && k < 6){
    dt="morning";
  }

  const imageSrc = window.location.href + base + dt + "/" + images[ind];
  viewBgImage(imageSrc);
  btn.disabled = true;
  setTimeout(function() { btn.disabled = false }, 1000);

 
}
getImageNext.next=0;

const btn = document.querySelector('.btn');
btn.addEventListener('click', getImageNext);


// Show Time
function showTime() {
  let min = today.getMinutes(),
    sec = today.getSeconds();
    day = dayOfWeek[today.getDay()];
    month = monthName[today.getMonth()];
    nday = today.getDate();


  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
  fullDate.innerHTML = `${day}, ${nday} ${month}`;

  if(min==0 && sec==0){ // change background image every hour
    getImage();
  }
  setTimeout(showTime, 1000);
}


// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}



// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if(name.textContent == ""){
       nm = tmp;
       name.textContent = tmp;
       localStorage.setItem('name', nm);
       name.blur();
      }else{
        localStorage.setItem('name', e.target.innerText);
        name.blur();
      }
    }
  } else {
    if(name.textContent == ""){
       nm = tmp;
       name.textContent = tmp;
       localStorage.setItem('name', nm);
    } else{
      localStorage.setItem('name', e.target.innerText);
    }
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if(focus.textContent == ""){
        nm = tmp;
        focus.textContent = tmp;
        localStorage.setItem('focus', nm);
        focus.blur();
       }else{
         localStorage.setItem('focus', e.target.innerText);
         focus.blur();
       }
    }
  } else {
    if(focus.textContent == ""){
      nm = tmp;
      focus.textContent = tmp;
      localStorage.setItem('focus', nm);
   } else{
     localStorage.setItem('focus', e.target.innerText);
   }
  }
}

function clear(e){
  tmp = e.target.textContent;
  e.target.textContent = '';
}

//weather
lc = localStorage.getItem('city');
if(lc!= null && lc!=undefined && lc !=""){
  town=lc;
  city.textContent = town;
  getWeather();
}else if(lc=="Город не найден"){
  town="Киев";
  localStorage.setItem('city', town);
  city.textContent = town;
  getWeather();
}else if(lc == null || lc == "undefined" || lc !=""){
  town="Киев";
  getWeather();
}



async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${town}&lang=ru&appid=ad2ae7626d7a6867eb2f52b2b6706e0b&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  if(data.cod == 404){
    city.textContent="Город не найден";

    localStorage.setItem('city', tmp);

    temperature.textContent = `N/A`;
    weatherDescription.textContent = `N/A`;
    pressure.textContent = `Давление: N/A`;
    humidity.textContent = `Влажность: N/A`;;
    wind.textContent = `Ветер: N/A`;
  }else{
  weatherIcon.className = 'weather-icon owf owf-4x';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description.toUpperCase();
  pressure.textContent = `Давление: ${data.main.pressure} kPa`;
  humidity.textContent = `Влажность: ${data.main.humidity} %`;
  wind.textContent = `Ветер: ${data.wind.speed} м/с, ${data.wind.deg} град.`;

  }
}

  
function setCity(e) {
  if (e.code === 'Enter') {
    if(city.textContent != ""){
      town=city.textContent;
    }
    localStorage.setItem('city', town);
    getWeather();
    city.blur();
  }else if(e.code !== 'Enter' && e.code != null){
    return;
  }else if(city.textContent == ""){
    city.textContent=tmp;
  }
}

//citate
async function getCitate(){
  const response = await fetch(cUrl);
  const data = await response.json();
  citate.innerText = await data.value;

}

name.addEventListener('click', clear);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('click', clear);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
(document.getElementById('more')).addEventListener('click', getCitate);
document.addEventListener('DOMContentLoaded', getWeather);

city.addEventListener('click', clear);
city.addEventListener('blur', setCity);
city.addEventListener('keypress', setCity);

// Run
showTime();
setBgGreet();
getName();
getFocus();
getCitate();