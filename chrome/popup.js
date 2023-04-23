document.addEventListener("DOMContentLoaded", function () {
  var button = document.getElementById("start-button");
  button.addEventListener("click", function () {
    startTimer();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var button = document.getElementById("stop-button");
  button.addEventListener("click", function () {
    stopTimer();
  });
});
