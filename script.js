var timeEl = document.querySelector(".time");

var mainEl = document.getElementById("main");

var secondsLeft = 90;

function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " left!";
    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      logScore();
    }
  }, 1000);
}

// Function to create and append colorsplosion image
function logScore() {
}

setTime();