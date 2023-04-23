let defaultStudy = 25;
let defaultRest = 5;

let isRunning = false; //function that loops
let countDownTime; //date and time that timer ends
let timerMin = defaultStudy; //min when started on timer
let timerSec = 0; //sec when started on timer
let isOver = false;
let isWork = true;

const setTimer = (msg) => {
  //sets a time for the timer
  if (msg !== null && msg.msg === "set") {
    isOver = false;
    timerMin = msg.min;
    timerSec = msg.sec;
    if (isRunning) {
      sendMsg("stopMsg");
      startTimer({ msg: "start" });
    } else {
      sendMsg("setMsg");
    }
  }
};
chrome.runtime.onMessage.addListener(setTimer);

const startTimer = (msg) => {
  //starts all timers
  if (msg !== null && msg.msg === "start") {
    isRunning = true;
    countDownTime =
      new Date().getTime() + 1000 * 60 * timerMin + 1000 * timerSec + 1000; //add 1000ms for smooth transition
    sendMsg("startMsg");
  }
};
chrome.runtime.onMessage.addListener(startTimer);

const stopTimer = (msg) => {
  //stops all timers
  if (msg !== null && msg.msg === "stop") {
    isRunning = false;
    sendMsg("stopMsg");
    const time = countDownTime - new Date().getTime();
    [timerMin, timerSec] = getMinSec(time);
  }
};
chrome.runtime.onMessage.addListener(stopTimer);

const sendMsg = (msg, min = timerMin, sec = timerSec) => {
  //sends given message and data to all extension tabs
  chrome.runtime.sendMessage({
    msg: msg,
    min: min,
    sec: sec,
  });
};

addTimer = (msg, sender, sendResponse) => {
  //sends data when new timer is added and then syncs them all
  if (msg !== null && msg.msg === "timerLoaded") {
    if (!isRunning) {
      sendResponse({
        countDownTime: countDownTime,
        isRunning: isRunning,
        min: timerMin,
        sec: timerSec,
      });
    } else {
      const time = countDownTime - new Date().getTime();
      const [min, sec] = getMinSec(time);
      sendResponse({
        countDownTime: countDownTime,
        isRunning: isRunning,
        min: min,
        sec: sec,
      });
      stopTimer({ msg: "stop" });
      startTimer({ msg: "start" });
    }
  }
};
chrome.runtime.onMessage.addListener(addTimer);

const timerOver = (msg) => {
  if (msg !== null && msg.msg === "over") {
    if (!isOver) {
      isOver = true;
      isWork = !isWork;
      if (isWork) {
        chrome.tabs.query(
          { url: "chrome-extension://*/video.html" },
          function (tabs) {
            chrome.tabs.remove(tabs[0].id);
          }
        );
        //chrome.tabs.create({ url: "popup.html" });
        setTimer({ msg: "set", min: defaultStudy, sec: 0 });
      } else {
        setTimer({ msg: "set", min: defaultRest, sec: 0 });
        chrome.tabs.create({ url: "video.html" }, () => console.log("test"));
      }
      startTimer({ msg: "start" });
    }
  }
};
chrome.runtime.onMessage.addListener(timerOver);

getMinSec = (time) => {
  //converts time into mins and secs
  min = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  sec = Math.floor((time % (1000 * 60)) / 1000);
  return [min, sec];
};

isRunningSend = (msg, sender, sendResponse) => {
  //returns if the timers are running or notlog
  if (msg !== null && msg.msg === "isRunning") {
    sendResponse(isRunning);
  }
};
chrome.runtime.onMessage.addListener(isRunningSend);

setDefault = (msg) => {
  if (msg !== null && msg.msg === "setDefault") {
    let defaultStudy = msg.study;
    let defaultRest = msg.rest;
  }
};
chrome.runtime.onMessage.addListener(setDefault);

/* Use command to get isRunning
chrome.runtime.sendMessage({ msg: "isRunning" }, (response) => {
  console.log(response);
  }
);
*/
