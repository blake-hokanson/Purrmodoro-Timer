let timeData = {
    studyTime: 25,
    breakTime: 5,
    stray: false
  }
  
  document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("subby");
  form.addEventListener('click', function() {
    const studyIn = document.getElementById('studyInput').value;
    const breakIn = document.getElementById('break').value;
    if(breakIn){
      timeData.breakTime = breakIn;
    }
    if(studyIn){
      timeData.studyTime = studyIn;
    }
    console.log(timeData)
    chrome.runtime.sendMessage({ msg: "setDefault", study:timeData.studyTime, rest:timeData.breakTime });
  })
  });