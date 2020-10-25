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
    daytime;


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
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let i = Math.floor(Math.random()*20);

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();


  if (hour >= 6 && hour < 12) {
    // Morning
    daytime="morning";
    getImage();
    greeting.textContent = 'Доброе утро, ';
  } else if (hour >= 12 && hour < 18) {
    // Afternoon
    daytime="day";
    getImage();
    greeting.textContent = 'Добрый день, ';
  } else if (hour >= 18) {
    // Evening
    daytime="evening";
    getImage();
    greeting.textContent = 'Добрый вечер, ';
  }else if(hour > 0 && hour < 6){
    // Night
    daytime="night";
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
  const index = i % images.length;
  const imageSrc = window.location.href + base + daytime + "/" + images[index];
  viewBgImage(imageSrc);
  i++;
  btn.disabled = true;
  setTimeout(function() { btn.disabled = false }, 1000);
} 

const btn = document.querySelector('.btn');
btn.addEventListener('click', getImage);


// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
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
async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=ad2ae7626d7a6867eb2f52b2b6706e0b&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  weatherIcon.className = 'weather-icon owf owf-4x';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description.toUpperCase();
  pressure.textContent = `Давление: ${data.main.pressure} kPa`;
  humidity.textContent = `Влажность: ${data.main.humidity} %`;
  wind.textContent = `Ветер: ${data.wind.speed} м/с, ${data.wind.deg} град.`;
}
function setCity(event) {
  if (event.code === 'Enter') {
    getWeather();
    city.blur();
  }
}

//citate
async function getCitate(){
  const response = await fetch(cUrl);
  const data = await response.json();
  // console.log(data);
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

city.addEventListener('keypress', setCity);

// Run
showTime();
setBgGreet();
getName();
getFocus();
getCitate();
getWeather();