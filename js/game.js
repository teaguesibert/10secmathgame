const startButton = document.getElementById('start');
const gameOptions = document.getElementById('game-options');
const gameBoard = document.getElementById('game-board');
const playAgain = document.getElementById('play-again');
const results = document.getElementById('results');
const addition = document.getElementById('addition');
const multiplication = document.getElementById('multiplication');
const division = document.getElementById('division');
const substraction = document.getElementById('substraction');
const selectedOperators = document.getElementsByClassName('option-box');
const upperLimit = document.getElementById('number-limit-range');
const gameOver = document.getElementById('game-over-img');
const question = document.getElementById('question');
const answer = document.getElementById('answer');
const clock = document.getElementById("clock");
const score = document.getElementById("score");
const numberLimit = document.getElementById("number-limit");
const gameInformation = document.getElementById("game-information");
const play = document.getElementById("play");
const activeScore = document.getElementById("active-score");

let num1 = 0;
let num2 = 0;
let operator = "";
let counter = 10;
let scoreAchieved = 0;

function generateRandomNumber(upperLimit) {
  let randomNum = Math.floor(Math.random() * (upperLimit) + 1);
  return randomNum;
}

function getOperator(selectedOperators) {
  let filteredOperators = [...selectedOperators].filter(elem => elem.checked)
  let index = Math.floor(Math.random() * filteredOperators.length)
  let nameOperator = filteredOperators[index].id

  if(nameOperator === "addition") {
    return '+';
  } else if(nameOperator === "substraction") {
    return '-';
  } else if(nameOperator === "multiplication") {
    return '*';
  } else if(nameOperator === "division") {
    return '/';
  }
} 

function setNewQuestion(upperLimit) {
  num1 = generateRandomNumber(upperLimit);
  num2 = generateRandomNumber(upperLimit);
  operator = getOperator(selectedOperators);
  while(operator === '/' & getResult().toString().includes('.')) {
    num1 = generateRandomNumber(upperLimit);
    num2 = generateRandomNumber(upperLimit);
  }
  while(operator === '-' & getResult().toString().includes('-')) {
    num1 = generateRandomNumber(upperLimit);
    num2 = generateRandomNumber(upperLimit);
  }
  question.innerHTML = num1 + " " + operator + " " + num2 + " = ?"
}

function timer() {
  var callbackFunction = function () {
    clock.innerHTML = counter;
    timeoutId = setTimeout(callbackFunction, 1000);
    counter -= 1;
    if (counter < 0) {
    clearTimeout(timeoutId);
    gameBoard.classList.add('d-none');
    playAgain.classList.remove('d-none');
    results.classList.remove('d-none');
    counter = 10;
    score.innerHTML = scoreAchieved;
    }
  }
  var timeoutId = setTimeout(callbackFunction)
}

function getResult() {
  if(operator === "+") {
    return num1 + num2;
  } else if(operator === "-") {
    return num1 - num2;
  } else if(operator === "*") {
    return num1 * num2;
  } else if(operator === "/") {
    return num1 / num2;
  }
}

function addSecond() {
  counter += 1;
}

function checkResult(upperLimit) {
  if(answer.value == getResult()) {
    answer.value = "";
    addSecond(upperLimit)
    setScore()
    activeScore.innerHTML = scoreAchieved;
    setNewQuestion(upperLimit.value)
    answer.style.color = "green";
  } else {
    answer.style.color = "red";
  }
}

function setScore() {
  scoreAchieved += 1;
}

function startGame() {
  play.onclick = function() {
    gameInformation.classList.add('d-none');;
    gameOptions.classList.remove('d-none');;
  }
  upperLimit.onchange = function() {
    numberLimit.innerHTML = upperLimit.value
  }
  startButton.onclick = function() {
    activeScore.innerHTML = scoreAchieved;
    gameOptions.classList.add('d-none');;
    gameBoard.classList.remove('d-none');;
    setNewQuestion(upperLimit.value)
    timer()
    answer.focus();
    answer.onchange = function() {
      getResult();
      checkResult(upperLimit);
    }
  }
  playAgain.onclick = function() {
    gameOptions.classList.remove('d-none');;
    gameBoard.classList.add('d-none');;
    results.classList.add('d-none');;
    scoreAchieved = 0;
    activeScore.innerHTML = scoreAchieved;
  }
}

startGame();