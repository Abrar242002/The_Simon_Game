
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


// starts the game when any key is pressed.
$(document).click(function() {

  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence()
    started = true;
  }
})



// answer checking function.
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // console.log("success");

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
  else {
    playSound('wrong');

    animatePress("body");

    $("#level-title").text( "Game Over, Press Any Key to Restart");

    startOver();
  }
}



// resets the game.
function startOver() {

  started = false;

  level = 0;

  gamePattern = [];
}



// User playing sequense traking
$(".btn").click( function() {
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1)
})



// computer - sequense maker
function nextSequence() {

  userClickedPattern = [];

  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);

  var randomChosenColor = buttonColours[randomNumber];

  gamePattern.push(randomChosenColor);
  // console.log(gamePattern);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
}



// sound playing function.
function playSound(name) {

  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}


// animation playing function.
function animatePress(currentColour) {

  // animation for clicked.
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100)

  // animation for game-over.
  $(currentColour).addClass("game-over")
  setTimeout(function() {
    $(currentColour).removeClass("game-over")
  }, 200);
}
