
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var highscore=0;
var started = false;
var level = 0;

$(document).keypress(function() {     //press to start
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
 
$(".btn").click(function() {   //buutton click

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});


    function checkAnswer(currentLevel) {            //match answer

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {

      console.log("wrong");

      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      var currscore=nextSequence()-1;
      highscore=Math.max(highscore,currscore);
      $("#level-title").text("Game Over! Your score is "+currscore+" Press Any Key to Restart");
      $('h3').text('Highscore : '+highscore);
      startOver();
    }

}
$('.title').click(function()
{
    alert('Rules are : \n 1. Press any key. Simon will give the first signal. Repeat the signal by pressing the same color lens \n Simon will duplicate the first signal and add one. Repeat these two signals by pressing the same color lenses, in order. \n 3. Simon will duplicate these first two signals and add one. \n 4.Continue playing as long as you can repeat each sequence of signals correctly. \n 5. If you fail to repeat a sequence exactly Simon responds with a RAZZ sound. This means you have lost, and the sequence of signals ends.');
}
    );

function nextSequence() {               //generating random flash

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  return level;

}

function playSound(name) {                  //playing audio
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {               //animating flash
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {                  //restart

  level = 0;
  gamePattern = [];
  started = false;
}