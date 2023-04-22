let isRunning = false; //function that loops
let countDownTime; //date and time that timer ends
let timerMin = 15; //min when started on timer
let timerSec = 0; //sec when started on timer

const setTimer = (msg) => {
  //sets a time for the timer
  if (msg !== null && msg.msg === "set") {
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

/* Use command to get isRunning
chrome.runtime.sendMessage({ msg: "isRunning" }, (response) => {
  console.log(response);
  }
);
*/
