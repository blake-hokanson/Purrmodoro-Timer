let defaultStudy = 25;
let defaultRest = 5;
let countDownTime; //date and time that timer ends
let timerMin = defaultStudy; //min when started on timer
let timerSec = 0; //sec when started on timer

let isRunning = false; //if timer is running
let isStudy = false; //can access apps

let isOver = false; //used to prevent timerOver from running multiple times

let blockedSites = [
  ".netflix.com",
  ".youtube.com",
  ".twitter.com",
  ".instagram.com",
  ".twitch.tv",
  ".pinterest.com",
  ".reddit.com",
];

const setTimer = (msg) => {
  //sets a time for the timer
  if (msg !== null && msg.msg === "set") {
    timerMin = msg.min;
    timerSec = msg.sec;
    if (isRunning) {
      con;
      sendMsg("stopMsg");
      startTimer({ msg: "start" });
    } else {
      sendMsg("setMsg");
    }
    sleep(1000).then(() => {
      isOver = false;
    });
  }
};
chrome.runtime.onMessage.addListener(setTimer);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const startTimer = (msg) => {
  //starts all timers
  if (msg !== null && msg.msg === "start") {
    isRunning = true;
    if (msg.set !== false) {
      console.log("isStudy set to True");
      isStudy = true;
    }
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
      isStudy = !isStudy;
      console.log("isStudy flipped");
      if (isStudy) {
        chrome.tabs.query(
          { url: "chrome-extension://*/video.html" },
          function (tabs) {
            chrome.tabs.remove(tabs[0].id);
          }
        );
        chrome.tabs.query(
          { url: "chrome-extension://*/timer.html" },
          function (tabs) {
            if (tabs.length === 0) {
              chrome.tabs.create({ url: "timer.html" });
            }
          }
        );
        setTimer({ msg: "set", min: defaultStudy, sec: 0 });
      } else {
        setTimer({ msg: "set", min: defaultRest, sec: 0 });
        chrome.tabs.create({ url: "video.html" });
      }
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
    sendResponse(isStudy);
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

setBlockedSites = (msg) => {
  if (msg !== null && msg.msg === "setBlockedSites") {
    blockedSites = msg.blockedSites;
  }
};
chrome.runtime.onMessage.addListener(setBlockedSites);

getBlockedSitesFunc = (msg, sender, sendResponse) => {
  if (msg !== null && msg.msg === "getBlockedSites") {
    sendResponse(blockedSites);
  }
};
chrome.runtime.onMessage.addListener(getBlockedSitesFunc);

/* Use command to get isRunning
chrome.runtime.sendMessage({ msg: "isRunning" }, (response) => {
  console.log(response);
  }
);
*/
/*
chrome.tabs.onRemoved.addListener(() => {
  chrome.tabs.create({ url: "video.html" });
});
*/

chrome.runtime.onConnect.addListener(function (port) {
  if (port.name === "popup") {
    port.onDisconnect.addListener(function () {
      chrome.tabs.query(
        { url: "chrome-extension://*/timer.html" },
        function (tabs) {
          if (tabs.length === 0 && countDownTime - new Date().getTime() >= 0) {
            chrome.tabs.create({ url: "timer.html" });
          }
        }
      );
    });
  }
});
