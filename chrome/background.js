let countDownTime; //time started
let timerVar; //function that loops
let timerMin; //min when started
let timerSec; //sec when started

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
    sendMsg("startMsg");
  }
};
chrome.runtime.onMessage.addListener(startTimer);

const stopTimer = (msg) => {
  if (msg !== null && msg.msg === "stop") {
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
