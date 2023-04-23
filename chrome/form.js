let timeData = {
    studyTime: 25,
    breakTime: 5
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

  document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('controlDiv');
    link.addEventListener('click', function() {
      location.href = "controlPage.html";
    });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('aboutDiv');
    link.addEventListener('click', function() {
      location.href = "aboutUs.html";
    });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('homeDiv');
    link.addEventListener('click', function() {
      location.href = "purrSite.html";
    });
  });

  

  document.addEventListener('DOMContentLoaded', function() {
    const area = document.getElementsById('text');
    
    area.value = getArray;

    const subText = document.getElementById('sub');
    subText.addEventListener('click', function() {
      
    })
  })
