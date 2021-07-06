var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

function nextSequence() {
  var userClickedPattern = [];
  level ++;
  $("#level-title").text("Level " + level.toString());
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  var aidi = "#" + randomChosenColour;
  $(aidi).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log('right');
  } else {
    console.log('wrong');
  }
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer() {

}

function gameOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 100);
  $("#level-title").text("Game Over. Please Any Key to Restart");
}

$(document).keypress(function(event) {
  if (started === false) {
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  if (started === false) {
    gameOver();
    playSound(userChosenColour);
  } else {
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    var indexLastAnswer = (userClickedPattern.length) - 1;
    animatePress(userChosenColour);
    checkAnswer(indexLastAnswer);
  }
});
