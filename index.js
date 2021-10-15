// grabbing dom
// i personnaly use these funstions to gram dom elements
const grabEle = (e) => document.querySelector(e);
const grabAll = (e) => document.querySelectorAll(e);

// grabbing ele
const timeEle = grabEle(".time");
const startPauseBtn = grabEle(".start-pause-btn");
const resetBtn = grabEle(".reset-btn");

// main variables
let isStarted = false;
let run;
let time = new Date();
let counter = 0;
let ms = 0;
let sec = 0;
let min = 0;
let hrs = 0;

window.onload = () => {
  ms = Math.floor(localStorage.getItem("ms"));
  sec = Math.floor(ms / 100);
  min = Math.floor(sec / 60);
  hrs = Math.floor(min / 60);

  timeEle.innerHTML = `
  ${min % 60 < 10 ? `0${min % 60}` : min % 60}<span class="symbol">:</span>${
    sec % 60 < 10 ? `0${sec % 60}` : sec % 60
  }<span
class="symbol">.</span><span class="ms">${
    ms % 100 < 10 ? `0${ms % 100}` : ms % 100
  }</span>`;
};

const start = () => {
  startPauseBtn.innerText = "Pause";
  run = setInterval(() => {
    ms += 1;
    sec = Math.floor(ms / 100);
    min = Math.floor(sec / 60);
    hrs = Math.floor(min / 60);
    if (hrs > 0)
      timeEle.innerHTML = `
      ${
        hrs % 60 < 10 ? `0${hrs % 60}` : hrs % 60
      }<span class="symbol">:</span>${
        min % 60 < 10 ? `0${min % 60}` : min % 60
      }<span class="symbol">:</span>${
        sec % 60 < 10 ? `0${sec % 60}` : sec % 60
      }`;
    else
      timeEle.innerHTML = `
        ${
          min % 60 < 10 ? `0${min % 60}` : min % 60
        }<span class="symbol">:</span>${
        sec % 60 < 10 ? `0${sec % 60}` : sec % 60
      }<span
      class="symbol">.</span><span class="ms">${
        ms % 100 < 10 ? `0${ms % 100}` : ms % 100
      }</span>`;
  }, 10);
};

const pause = () => {
  localStorage.setItem("ms", ms);
  startPauseBtn.innerText = "Start";
  clearInterval(run);
};

startPauseBtn.onclick = (e) => {
  isStarted = !isStarted;
  isStarted ? start() : pause();
};

// start stop watch when space button is presses
window.onkeydown = ({ keyCode }) => {
  if (keyCode == 32) {
    isStarted = !isStarted;
    isStarted ? start() : pause();
  }
};

// stops stop watch when window refeshes
window.onbeforeunload = pause;

resetBtn.onclick = () => {
  timeEle.innerHTML = `00<span class="symbol">:</span>00<span
    class="symbol">.</span><span class="ms">00</span>`;
  ms = 0;
  localStorage.setItem("ms", ms);
};