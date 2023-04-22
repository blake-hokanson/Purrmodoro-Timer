let timerVar;
let countDownTime;

window.addEventListener("click", function (e) {
  if (e.target.href !== undefined) {
    chrome.tabs.create({ url: e.target.href });
  }
});

const setTimer = (min, sec = 0) => {
  chrome.runtime.sendMessage({ msg: "set", min: min, sec: sec });
};
chrome.runtime.onMessage.addListener((msg) => {
  if (msg !== null && msg.msg === "setMsg") {
    document.getElementById("timer").innerHTML = msg.min + ":" + msg.sec;
  }
});

const startTimer = () => {
  chrome.runtime.sendMessage({ msg: "start" });
};
chrome.runtime.onMessage.addListener((msg) => {
  if (msg !== null && msg.msg === "startMsg") {
    countDownTime =
      new Date().getTime() + 1000 * 60 * msg.min + 1000 * msg.sec + 1000; //add 1000ms for smooth transition
    timerVar = setInterval(timerFunc, 1000);
    console.log(timerVar);
  }
});

const stopTimer = () => {
  chrome.runtime.sendMessage({
    msg: "stop",
    time: countDownTime - new Date().getTime(),
  });
};
chrome.runtime.onMessage.addListener((msg) => {
  if (msg !== null && msg.msg === "stopMsg") {
    clearInterval(timerVar);
    console.log("error with stop");
  }
});

timerFunc = () => {
  const distance = countDownTime - new Date().getTime(); // Find the distance between now and the count down date

  // Time calculations for hours, minutes and seconds
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="timer"
  document.getElementById("timer").innerHTML = minutes + ":" + seconds;
  // Run Code After
  if (distance < 0) {
    clearInterval();
    document.getElementById("timer").innerHTML = 0 + ":" + 0;
  }
};

console.log("Run popup.js");
