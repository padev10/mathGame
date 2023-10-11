let playing = false,
  score,
  countdown,
  correctAnswer;

//****************************START RESET BUTTON
document.getElementById("sReset").onclick = () => {
  //if we are playing
  if (playing === true) {
    //reload the page
    location.reload();
  } else {
    //if we are not playing //we set score to zero
    score = 0;
    updateTextOf("scoreValue", score);
    //change game to playing mode
    playing = true;

    //setting the remaining time
    show("timeRemaining");
    countdown = 60; //restart counting

    //change start button to reset
    updateTextOf("sReset", "Reset Game");

    //calling countdown in play mode
    startCountdown();

    //we hide gameOver box and show the score
    hide("gameOver");
    show("score");

    //generate new question Q&A
    generateQA();
  }
};

for (let i = 1; i < 5; i++) {
  //check if clicked box has the answer
  document.getElementById("box" + i).onclick = function () {
    //we check if we are playing
    if (playing == true) {
      // we check if the box's number is equal to the correct answer
      ////the property 'THIS' only works within an anonymous function
      if (this.innerHTML == correctAnswer) {
        //hide wrong
        hide("wrong");
        //show correct box
        show("correct");
        //displaying correct box for a second
        hideInOneSecond("correct");
        //increase score
        score++;
        updateTextOf("scoreValue", score);
        //generate new answer
        generateQA();
      } else {
        //hide correct
        hide("correct");
        //show wrong box
        show("wrong");
        //wrong box displaying for one second
        hideInOneSecond("wrong");
      }
    }
  };
}

//*****************************FUNCTIONS
//start countdown
function startCountdown() {
  let cDown = setInterval(() => {
    //what we want to happen in every 1s
    countdown -= 1;
    updateTextOf("timeRemainValue", countdown); //update the number

    //we want to check when the time gets to 0 then apply changes
    if (countdown === 0) {
      //we stop the time
      clearInterval(cDown);
      //we hide the timeRemaining, score, correct and wrong boxes
      hide("timeRemaining");
      hide("score");
      hide("correct");
      hide("wrong");
      //we change reset to start game again
      updateTextOf("sReset", "Start Game");
      //we show the game over box
      show("gameOver");
      gameOvertxt("gameOver");
      //we make sure we/re not playing
      playing = false;
    }
  }, 1000);
}

//innerHTML
function updateTextOf(n, m) {
  document.getElementById(n).innerHTML = m;
}

//hiding elements
function hide(n) {
  document.getElementById(n).style.display = "none";
}

//showing elements
function show(n) {
  document.getElementById(n).style.display = "block";
}

//game over paragraphs display
function gameOvertxt(n) {
  document.getElementById(n).innerHTML =
    "<p>Game Over</p><p>Your Score Is " + score + ".</p>";
}

//generating questions
function generateQA() {
  //question variables
  let x = Math.floor(Math.random() * 9) + 1;
  let y = Math.floor(Math.random() * 9) + 1;

  correctAnswer = x * y;

  //showing X and Y value on screen
  updateTextOf("question", `${x}x${y}`);

  // showing the correct answer in random box
  let correctPosition = Math.floor(Math.random() * 4) + 1;

  //change correct answer position
  updateTextOf("box" + correctPosition, correctAnswer);

  //fill remaining boxes
  let answers = [correctAnswer]; //array creation to later add wrong numbers

  for (let i = 1; i < 5; i++) {
    //the statement avoids not showing the correct answer
    if (i !== correctPosition) {
      let wrongAnswer;
      //we make sure the wrong answer is different to the correct one
      do {
        wrongAnswer = Math.floor(Math.random() * 70) + 1;
      } while (answers.indexOf(wrongAnswer) > -1);
      //make sure wrong numbers dont match

      //show wrong number on screen
      updateTextOf("box" + i, wrongAnswer);

      //add wrong number to the array
      answers.push(wrongAnswer);
    }
  }
}

function hideInOneSecond(n) {
  setInterval(function () {
    hide(n);
  }, 1000);
}
