let userClickedPattern = []
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
var started = false;
var level = 0;

$(document).keypress(function() {
    if (!started) {
  
      //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
$(".btn").click(handlerFunc);


function handlerFunc(){
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    $(userChosenColour).click(animatePress(userChosenColour));
    $(userChosenColour).click(playSound(userChosenColour));
    checkAnswer(userClickedPattern.length - 1);
}

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $('#'+currentColour).addClass("pressed");
    setTimeout(function() {$('#'+currentColour).removeClass("pressed")},100 );
}

function checkAnswer(currentLevel){

    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        if (userClickedPattern.length == gamePattern.length){
            setTimeout(function() {userClickedPattern = []; nextSequence();},1000 );
        }
    } else {
        playSound("wrong");
        $('body').addClass("game-over");
        setTimeout(function() {$('body').removeClass("game-over")},200 );
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }


}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor( Math.random()*4 );
    let randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}


