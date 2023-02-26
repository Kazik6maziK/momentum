

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

function showGreeting() {
  const greeting = document.querySelector('.greeting');
  const date = new Date();
  const hours = date.getHours();
  let timeOfTheDay = ['morning', 'afternoon', 'evening', 'night'];
  const timeOfDay = timeOfTheDay[Math.trunc(hours/6)];
  const greetingText = `Good ${timeOfDay}`;
  greeting.textContent = (greetingText);
} 
showGreeting();

function setLocalStorage() {
  const name = document.querySelector('.name');
  localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  const name = document.querySelector('.name');
  if(localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
}
window.addEventListener('load', getLocalStorage)


/*function setBg () {
  const body = document.querySelector('body');
  const rand = Math.trunc(Math.random()*20) + 1;
  body.style.backgroundImage = "url('https://raw.Kazik6maziK.com/rolling-scopes-school/stage1-tasks/assets/images/evening/18.jpg'";




}
setBg();*/



const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

const citybtn = document.querySelector('.city');
citybtn.addEventListener('change', getWeather);

async function getWeather() {  
  const city = document.querySelector('.city').value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=9983ba497ae5f90a4211eba1f0c4bd14&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
  wind.textContent = `Wind speed: ${data.wind.speed} m/s`;
  humidity.textContent = `Humidity: ${data.main.humidity} %`;
}


const quote = document.querySelector('.quote');
const author = document.querySelector('.author');

const changeQuote = document.querySelector('.change-quote');
changeQuote.addEventListener('click', getQuotes);

async function getQuotes() {  
  const quotes = 'https://type.fit/api/quotes';
  const res = await fetch(quotes);
  const data = await res.json(); 
  console.log(data);
  const rand = Math.trunc(Math.random()*1643) + 1;
  quote.textContent = `"${data[rand].text}"`;
  author.textContent = data[rand].author;
}
getQuotes();


import playList from './playList.js';

const play = document.querySelector('.playbtn');
const play1 = document.querySelector('.pausebtn');
const playPrev = document.querySelector('.play-prev');
const playNext = document.querySelector('.play-next');

play.addEventListener('click', change);
play1.addEventListener('click', change1);
playPrev.addEventListener('click', getplayPrev);
playNext.addEventListener('click', getplayNext);

function change() {
  play.classList.add('play1');
  play1.classList.remove('play1');
}
function change1() {
  play1.classList.add('play1');
  play.classList.remove('play1');
}

let playNum = 0;

function getplayPrev () {
  playNum = playNum - 1;
  if (playNum > 3) {
    playNum = 0;
  }
  if (playNum < 0) {
    playNum = 3;
  }
  console.log(playNum);
}

function getplayNext () {
  playNum = playNum + 1;
  if (playNum < 0) {
    playNum = 3;
  }
  if (playNum > 3) {
    playNum = 0;
  }
  console.log(playNum);
}
const audio = new Audio();

function playAudio() {
  audio.src = playList[playNum].src;
  audio.currentTime = playList[playNum].duration;
  audio.play();
}
function pauseAudio() {
  audio.pause();
}

play.addEventListener('click', playAudio);
play1.addEventListener('click', pauseAudio);

const playListContainer = document.querySelector('.play-list');

for(let i = 0; i < playList.length; i++) {
  const li = document.createElement('li');
  li.textContent = playList[i].title;
  li.classList.add('play-item');
  playListContainer.append(li);
}

