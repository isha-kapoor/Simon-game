var buttonColors =["red","blue","green","yellow"];
var gamePattern=[];
var userPattern=[];
var started=false;
var level=0;
$(document).keydown(function(){
  if(!started)
  {
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
  }
});
function nextSequence(){
  userPattern=[];
  level++;
  $("#level-title").text("Level "+level);
  var randomNo=Math.random();
  randomNo = randomNo*4;
  randomNo=Math.floor(randomNo);
  var randomcolour=buttonColors[randomNo];
  gamePattern.push(randomcolour);
  $("#"+randomcolour).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(randomcolour);
}
$(".btn").on("click" , function(){
  var userColor=$(this).attr('id');
  userPattern.push(userColor);
  playsound(userColor);
  animatePress(userColor);
  checkAnswer(userPattern.length-1);
});
function playsound(name){
  var audio = new Audio("sounds/" + name +".mp3");
  audio.play();
}
function animatePress(currentColor){
  $("#" +currentColor).addClass("pressed");
  setTimeout(function(){
      $("#" +currentColor).removeClass("pressed");
  },100);
}
function checkAnswer(currentLevel)
{

    if(userPattern[currentLevel]===gamePattern[currentLevel]){
      if(userPattern.length===gamePattern.length){
        setTimeout(function(){
          nextSequence();

        },1000);
      }
    } else {
      playsound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press any key to restart");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      startOver();
    }
  }
function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
