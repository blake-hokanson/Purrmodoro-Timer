// Create array of prohibited sites (later replace with user defined sites?? Add functionality to check if on break?)
console.log("Loaded");

// HTML that will overwrite the prohibited sites' HTML
let overwriteText = `<!DOCTYPE html>
<html>
<head>
<style>
html, body {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(#c49ad2, #d9d9d9)
}


.container {
    display: flex;
    height: 200px;
    align-items: center;
}
  
.container > #message {
    color: #d9d9d9;
    background-color: #816a89;
    width: 500px;
    margin: 15px;
    text-align: center;
    line-height: 75px;
    font-size: 20px;
    font-family: open-sans, sans-serif, Arial;
    border: 0px #816a89 solid;
    border-radius: 10px;
  }

</style>
</head>
<body>
    <div class="container">
        <div id="message">This site is blocked! Finish your Purrmodoro.</div>
    </div>

</body>
</html>`;

// Checks if the timer is running. If so, calls blockProhibited.
const blockProhibitedIfTimer = () => {
  chrome.runtime.sendMessage({ msg: "isRunning" }, (response) => {
    if (response) {
      console.log(response);
      getBlockedSites();
    }
  });
};

const getBlockedSites = () => {
  chrome.runtime.sendMessage({ msg: "getBlockedSites" }, (response) => {
    if (response) {
      blockProhibited(response);
    }
  });
};

// If the site is prohibited, block it. Else, print message.
const blockProhibited = (blockedSites) => {
  // Loop through prohibited sites, check if current site matches any of them
  let prohib = false; // Track whether current site is prohibited
  for (let site in blockedSites) {
    let regex = new RegExp(blockedSites[site]); // Regex to check if url is a sub-site of one of the prohibited site
    // Check if prohibited site regex matches current url
    if (regex.test(window.location.href)) {
      console.log("On prohibited website");
      prohib = true;
      // Update page with overwrite text from above
      document.open();
      document.write(overwriteText);
      document.close();
    }
  }

  if (!prohib) {
    console.log("This site is fine :)");
  }
};

blockProhibitedIfTimer();
