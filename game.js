var buttoncolors=["red", "blue", "green", "yellow"];
var gamepattern = [];
var userClickedPattern=[];
var level =0;

var started =false;



function nextSequence(){

    userClickedPattern = [];

    var x = Math.floor(Math.random()*4);
    var randomChoosenColor =buttoncolors[x];

    gamepattern.push(randomChoosenColor);

    $('#'+randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChoosenColor);
    level++;
    $('h1').text('Level '+level);

}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startover(){
        userClickedPattern=[];
        gamepattern=[];
        started=false;
        level=0;
}

function handler(){
    var userChosenColour =$(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour)
    checkanswer(userClickedPattern.length-1);
}


function animatePress(currentColour){
    $("#"+currentColour).addClass('pressed');
    setInterval(function(){
        $("#"+currentColour).removeClass('pressed')
    },100)
}


function checkanswer(currentLevel){

    if (gamepattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log(currentLevel);
  
        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamepattern.length){
  
          //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
      } else {

        console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
       
  startover();
      }
}

$('.btn').click(handler)

$('body').keypress(function(e){
    
    if(!started){
        $('h1').text("Level "+level);
        nextSequence();
        started=true;

    }
    
    
})

