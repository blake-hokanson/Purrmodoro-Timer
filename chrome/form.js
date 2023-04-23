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
    const area = document.getElementById('text');
    let list = '';
    chrome.runtime.sendMessage({ msg: "getBlockedSites" }, (response) => {
      if (response) {
        for(let i = 0; i < response.length; i++){
          list+="\n"+response[i];
        }
        area.value = list;
        getText();
      }
    });  
  })

  getText = () => {
    const subText = document.getElementById('sub');
    const area = document.getElementById('text');
    let blocked = area.value.split('\n');
    subText.addEventListener('click', function() {
      chrome.runtime.sendMessage({ msg: "setBlockedSites", blockedSites: blocked }
    )
  })}

  document.addEventListener('DOMContentLoaded', function() {
    const subText = document.getElementById('sub');
    subText.addEventListener('click', function() {
      const area = document.getElementById('text');
    let strung = area.value;
    let blocked = strung.split("\n");
      chrome.runtime.sendMessage({ msg: "setBlockedSites", blockedSites: blocked }
    )
  })
});