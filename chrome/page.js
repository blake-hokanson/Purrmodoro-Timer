let timerVar;
let countDownTime;

window.addEventListener("click", function (e) {
  //makes links open to new tab
  if (e.target.href !== undefined) {
    chrome.tabs.create({ url: e.target.href });
  }
});

//run on load
chrome.runtime.sendMessage({ msg: "timerLoaded" }, (response) => {
  if (response) {
    setTimerHTML(response.min, response.sec);
    if (response.isRunning) {
      countDownTime = response.countDownTime;
      timerVar = setInterval(timerFunc, 1000);
    }
  }
});

const setTimer = (min, sec = 0) => {
  chrome.runtime.sendMessage({ msg: "set", min: min, sec: sec });
};
chrome.runtime.onMessage.addListener((msg) => {
  //sets timer
  if (msg !== null && msg.msg === "setMsg") {
    setTimerHTML(msg.min, msg.sec);
  }
});

const startTimer = () => {
  chrome.runtime.sendMessage({ msg: "start" });
};
chrome.runtime.onMessage.addListener((msg) => {
  //starts timer
  if (msg !== null && msg.msg === "startMsg") {
    countDownTime =
      new Date().getTime() + 1000 * 60 * msg.min + 1000 * msg.sec + 1000; //add 1000ms for smooth transition
    timerVar = setInterval(timerFunc, 1000);
  }
});

const stopTimer = () => {
  chrome.runtime.sendMessage({
    msg: "stop",
  });
};
chrome.runtime.onMessage.addListener((msg) => {
  //stops timer
  if (msg !== null && msg.msg === "stopMsg") {
    clearInterval(timerVar);
  }
});

timerFunc = () => {
  // Find the distance between now and the count down date
  const distance = countDownTime - new Date().getTime();
  // Time calculations for hours, minutes and seconds
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  setTimerHTML(minutes, seconds);
  // Run Code After
  if (distance < 0) {
    clearInterval();
    setTimerHTML(0, 0);
    stopTimer();
  }
};

pad = (num) => {
  if (num < 10) return "0" + num;
  return num;
};

setTimerHTML = (min, sec) => {
  document.getElementById("timer").innerHTML = pad(min) + ":" + pad(sec);
};

console.log("Run popup.js");

document.addEventListener('DOMContentLoaded', function() {
  var link = document.getElementById('controlDiv');
  link.addEventListener('click', function() {
    location.href = "controlPage.html";
  });
});

document.addEventListener('DOMContentLoaded', function() {
  var link = document.getElementById('aboutDiv');
  link.addEventListener('click', function() {
    location.href = "aboutMe.html";
  });
});

document.addEventListener('DOMContentLoaded', function() {
  var link = document.getElementById('homeDiv');
  link.addEventListener('click', function() {
    location.href = "purrSite.html";
  });
});