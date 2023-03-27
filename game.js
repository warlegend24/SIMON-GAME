var compliments =["Good Job !!","Keep it up !!","You're Good !!","Awesome !!"];
var userClickedPattern=[];
var gamePattern = [];
var buttonColours=["red", "blue", "green", "yellow"];
//implementing the next sequence function:
function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("LEVEL "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);//looks like a flash animation by chaining the fade out and the fade in animations methods
    playSound(randomChosenColour);
}

//add event listener to each of the button
$(".btn").on("click",function(event){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

//creating a playSound function:
function playSound(name){
    var sound = new Audio("sounds/"+name+".mp3");
    sound.play();
}

//creating the function animate press:
function animatePress(currentColour){
    //using jquery to add the css pressed class to the currentColour id object:
    $("#"+currentColour).addClass("pressed");
    setTimeout(function (){
        $("#"+currentColour).removeClass("pressed"); 
    },100);
}



var numberOfKeypress = 0;
var level=0;



//detecting keypresses:
$(document).keypress(function (){
    numberOfKeypress++;
    if(numberOfKeypress===1){
        nextSequence();
    }
});

//checkAnswer function:
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){

        if(userClickedPattern.length===gamePattern.length){
            var randomComplimentNumber = Math.floor(Math.random()*4);
            $("h4").text(""+compliments[randomComplimentNumber]);
            $("h4").fadeIn(250).fadeOut();
            //step 1 : play round-cleared.mp3:
            playSound("round-cleared");
            //step 2 : applying the round-cleared css styles to the body of the document:
            $("body").addClass("level-completed");

            setTimeout(function (){
                $("body").removeClass("level-completed");
            },180);

            setTimeout(function (){
                nextSequence();
            },1100);
    
        }
        
    }
    

    else{
        //step 1 : play worng.mp3:
        playSound("wrong");
        //step 2 : applying the game over css styles to the body of the document:
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        },200);
        //step 3 : changing the h1 title :
        $("h1").text("Game Over, Press Any Key to Restart");
        //restarting the game:
        startOver();
    }

}


function startOver(){
    gamePattern=[];
    numberOfKeypress=0;
    level=0;
}