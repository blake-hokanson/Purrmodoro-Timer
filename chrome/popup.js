window.addEventListener("click", function (e) {
  console.log("TEST1");
  if (e.target.href !== undefined) {
    chrome.tabs.create({ url: e.target.href });
  }
});

let countDownTime; //time started
let timerVar; //function that loops
let timerMin; //min when started
let timerSec; //sec when started

const setTimer = (min, sec = 0) => {
  timerMin = min;
  timerSec = sec;

  document.getElementById("timer").innerHTML = min + ":" + sec;
};

const startTimer = () => {
  countDownTime =
    new Date().getTime() + 1000 * 60 * timerMin + 1000 * timerSec + 1000; //add 1000ms for smooth transition
  timerVar = setInterval(timerFunc, 1000);
};

const stopTimer = () => {
  clearInterval(timerVar);

  const distance = countDownTime - new Date().getTime(); // Find the distance between now and the count down date

  // Time calculations for hours, minutes and seconds
  timerMin = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  timerSec = Math.floor((distance % (1000 * 60)) / 1000);
};

timerFunc = () => {
  const distance = countDownTime - new Date().getTime(); // Find the distance between now and the count down date

  // Time calculations for hours, minutes and seconds
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Run Code After
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("timer").innerHTML = "EXPIRED";
    return;
  }

  // Display the result in the element with id="timer"
  document.getElementById("timer").innerHTML = minutes + ":" + seconds;
};

console.log("Run popup.js");
