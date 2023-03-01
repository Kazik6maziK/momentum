

function showTime() {
  const time = document.querySelector('.time');
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = (currentTime);
  showDate();
  setTimeout(showTime, 1000);
  }
  showTime();

function showDate() {
  const data = document.querySelector('.date');
  const date = new Date();
  const options = {month: 'long', day: 'numeric'};
  let daysarr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const den = daysarr[date.getDay()];
  const currentDate = date.toLocaleDateString('en-EN', options);
  data.textContent = (den + ', ' + currentDate);
}

const greeting = document.querySelector('.greeting');
function showTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  let timeOfTheDay = ['morning', 'afternoon', 'evening', 'night'];
  if (hours > 3 && hours < 12) {
    return timeOfTheDay[0];
  } else if (hours > 11 && hours < 17) {
    return timeOfTheDay[1];
  } else if (hours > 16 && hours < 24) {
    return timeOfTheDay[2];
  } else {
    return timeOfTheDay[3];
  }
}
  const timeOfDay = showTimeOfDay();
  const greetingText = `Good ${timeOfDay}`;
  greeting.textContent = (greetingText);
  showTimeOfDay();

let randomNum;
const body = document.querySelector('body');
const sliderNext = document.querySelector('.slide-next');
const sliderPrev = document.querySelector('.slide-prev');

function getRandomNum(min, max) {
  randomNum = (Math.floor(Math.random() * (max - min + 1) + min));
}
getRandomNum(1, 20);

function setBg () {
  const timeOfDay = showTimeOfDay();
  const bgNum = randomNum.toString().padStart(2, '0');
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/Buffy795/stage1-momentum-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  }
}
setBg();

function getSlideNext() {
  randomNum++;
  if(randomNum > 20) randomNum = 1;
  setBg();
}
sliderNext.addEventListener('click', getSlideNext);

function getSlidePrev() {
  randomNum--;
  if(randomNum < 1) randomNum = 20;
  setBg();
}
sliderPrev.addEventListener('click', getSlidePrev);

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');

async function getQuotes() {
  const quotes = 'https://type.fit/api/quotes';
  const res = await fetch(quotes);
  const data = await res.json();

  const randomNum = Math.floor(Math.random() * (data.length - 1)) + 1;

  quote.textContent = data[randomNum].text;
  author.textContent = data[randomNum].author;
}
getQuotes();

const changeQuote = document.querySelector('.change-quote');

changeQuote.addEventListener('click', getQuotes);


const name = document.querySelector('.name');
const city = document.querySelector('.city');

function setLocalStorage() {
  localStorage.setItem('name', name.value);
  localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
  if(localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  } else {
    city.value = 'Minsk';
  }
  getWeather();
}

window.addEventListener('load', getLocalStorage);


const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const error = document.querySelector('.weather-error');


async function getWeather() {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=5525072cd42fbe436703f7c1c81791bd&units=metric`;
  const res = await fetch(url);
  const data = await res.json(); 
  
  if (data.cod === '404' || data.cod === '400') {
    temperature.textContent = '';
    wind.textContent = '';
    humidity.textContent = '';
    weatherDescription.textContent = '';
    error.textContent = `Error! Can't find weather for ${city.value}.`;
  } else {
      weatherIcon.className = 'weather-icon owf';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
      wind.textContent = `Wind speed: ${data.wind.speed.toFixed(0)} m/s`;
      humidity.textContent = `Humidity: ${data.main.humidity}%`;
      weatherDescription.textContent = data.weather[0].description;
      error.textContent = '';
  }
}

city.onchange = () => {
  localStorage.setItem('city', city.value);
  weatherIcon.className = 'weather-icon owf';
  getWeather();
};
  
document.addEventListener('DOMContentLoaded', getWeather);


import playList from './playlist.js';

let playNum = 0;
const audioList = document.querySelector('.play-list');
const playBtn = document.querySelector('.play');
const playPrev = document.querySelector('.play-prev');
const playNext = document.querySelector('.play-next');
const audio = new Audio();
let isPlay = false;

playList.forEach (el => {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = el.title;
  audioList.append(li);
})

function colorItem () {
  const song = document.querySelectorAll('.play-item');
  song.forEach((el, key) => {
    if (key === playNum) {
      el.classList.add('item-active');
    } else {
      el.classList.remove('item-active');
    }
  })
}

function playAudio() {
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  if (!isPlay) {
    audio.play();
    isPlay = true;
    colorItem();
  } else {
    audio.pause();
    isPlay = false;
  }
}
playBtn.addEventListener('click', playAudio);

function togglePause() {
  playBtn.classList.toggle('pause');
  playPrev.classList.toggle('pause');
  playNext.classList.toggle('pause');
}
playBtn.addEventListener('click', togglePause);

function playSwitch() {
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  audio.play();
  isPlay = true;
  colorItem();
}

function next() {
  playNum++;
  if (playNum > 3) {
    playNum = 0;
  }
  playSwitch();
}

function prev() {
  playNum--;
  if (playNum < 0) {
    playNum = 3;
  }
  playSwitch();
}

playPrev.addEventListener('click', prev);
playNext.addEventListener('click', next);