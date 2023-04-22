// Create array of prohibited sites (later replace with user defined sites?? Add functionality to check if on break?)
let sites = [".netflix.com", ".youtube.com",".twitter.com",".instagram.com"];
console.log("Loaded");

// Loop through prohibited sites, check if current site matches any of them
let prohib = false;
for (let site in sites) {
  let regex = new RegExp(sites[site]); // Regex to check if url is a sub-site of one of the prohibited site
  console.log(regex);
  // Check if prohibited site regex matches current url
  if (regex.test(window.location.href)) {
    console.log("On prohibited website");
    prohib = true;
    document.open();
    document.write(`<!DOCTYPE html>
    <html>
    <head>
    </head>
    <body>
    
        <div id="message">Nice try! Get back to work.</div>
    
    </body>
    </html>`);
    document.close();
    // let body = document.body;
    // // Update page with error message and new formatting
    // body.innerHTML= "<h1 id='message'>This is a prohibited page!</h1>"
    // body.parentElement.style["backgroundColor"] = "purple";
    // body.style["backgroundColor"] = "purple";
    // body.style["color"] = "white";
  }
}
if (!prohib) {
  console.log("This site is fine :)")
}
