var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var startedOrnot=false;

$(document).keypress(function(){
    if(startedOrnot==false){
        startedOrnot=true;
        nextSequence();
    } 
    else startAgain();
});


function startAgain(){
    level=0;
    gamePattern=[];
    $("#level-title").text("Level "+level);
    startedOrnot=false;
    nextSequence();
}


$(".btn").click(function(){
    var userChosenButton=this.id;
    userClickedPattern.push(userChosenButton);
    playSound(userChosenButton);
    animatePress(userChosenButton);
    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }

    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over Press Any Key to Start the Game");
    }
}


function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(10).fadeOut(10).fadeIn(10);
    playSound(randomChosenColour);
}


function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },50);
}

function playSound(soundname) {
    var audio = new Audio("sounds/" + soundname + ".mp3");
    audio.play();
}
