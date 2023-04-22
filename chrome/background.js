let isRunning = false; //function that loops
let countDownTime; //time started
let timerMin = 15; //min when started
let timerSec = 0; //sec when started

const setTimer = (msg) => {
  if (msg !== null && msg.msg === "set") {
    timerMin = msg.min;
    timerSec = msg.sec;
    sendMsg("setMsg");
  }
};
chrome.runtime.onMessage.addListener(setTimer);

const startTimer = (msg) => {
  if (msg !== null && msg.msg === "start") {
    isRunning = true;
    countDownTime =
      new Date().getTime() + 1000 * 60 * timerMin + 1000 * timerSec + 1000; //add 1000ms for smooth transition
    sendMsg("startMsg");
  }
};
chrome.runtime.onMessage.addListener(startTimer);

const stopTimer = (msg) => {
  if (msg !== null && msg.msg === "stop") {
    isRunning = false;
    sendMsg("stopMsg");
    timerMin = Math.floor((msg.time % (1000 * 60 * 60)) / (1000 * 60));
    timerSec = Math.floor((msg.time % (1000 * 60)) / 1000);
  }
};
chrome.runtime.onMessage.addListener(stopTimer);

const sendMsg = (msg, min = timerMin, sec = timerSec) => {
  /* not needed
  chrome.tabs.query(
    { url: "chrome-extension://" + "*" + "/*" }, // could replace "*" with chrome.runtime.id
    (tabs) => {
      for (let tab of tabs) {
        chrome.tabs.sendMessage(tab.id, {
          msg: msg,
          min: min,
          sec: sec,
        });
      }
    }
  );
  */
  chrome.runtime.sendMessage({
    msg: msg,
    min: min,
    sec: sec,
  });
};

sendData = (msg, sender, sendResponse) => {
  if (msg !== null && msg.msg === "timerLoaded") {
    sendResponse({
      countDownTime: countDownTime,
      isRunning: isRunning,
      min: timerMin,
      sec: timerSec,
    });
  }
};
chrome.runtime.onMessage.addListener(sendData);

isRunningSend = (msg, sender, sendResponse) => {
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
