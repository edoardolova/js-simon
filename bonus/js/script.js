// DOM elements
const userFormEl = document.getElementById("user-form");
const timeInputEl = document.getElementById("time");
const quantityInputEl = document.getElementById("quantity");
const maxInputEl = document.getElementById("max");

const numberListDivEl = document.getElementById("numbers-list-container");
const countdownEl = document.getElementById("countdown");
const numberListEl = document.getElementById("numbers-list");

const answerFormEl = document.getElementById("answers-form");
const inputsGroupAnswers = document.getElementById("input-group-answers");
const messageEl = document.getElementById("message");

// global variable
let countdown = 0;
let numberQuantity = 0;
let numberMax = 0;
let randomNumberList = [];
let inputsArr = [];

// UTILITY
const getRandomInt = (max) => Math.ceil(Math.random() * max);

function generateAndShowNumbers(quantity, max) {
  randomNumberList = [];
  numberListEl.innerHTML = "";

  while (randomNumberList.length < quantity) {
    const num = getRandomInt(max);
    randomNumberList.push(num);
    const li = document.createElement("li");
    li.innerText = num;
    numberListEl.appendChild(li);
  }

  startCountdown();
}

// Countdown
function startCountdown() {
  countdownEl.innerText = `Tempo rimasto: ${countdown}s`;

  const interval = setInterval(() => {
    countdown--;
    countdownEl.innerText = `Tempo rimasto: ${countdown}s`;

    if (countdown <= 0) {
      clearInterval(interval);
      countdownEl.innerText = "";
      numberListEl.innerHTML = "";
      showAnswerInputs();
    }
  }, 1000);
}

// show answer input
function showAnswerInputs() {
  inputsGroupAnswers.innerHTML = "";
  inputsArr = [];

  answerFormEl.classList.remove("d-none");

  for (let i = 0; i < numberQuantity; i++) {
    const input = document.createElement("input");
    input.type = "number";
    input.className = "form-control text-center";
    input.required = true;
    input.min = 1;
    input.max = numberMax;
    inputsArr.push(input);
    inputsGroupAnswers.appendChild(input);
  }
}

// submit answer form
answerFormEl.addEventListener("submit", (ev) => {
  ev.preventDefault();

  const userAnswers = inputsArr.map((input) => parseInt(input.value));
  const correctNumber = checkAnswers(userAnswers);

  messageEl.innerText = `Hai indovinato ${correctNumber} numero/i!`;
});

// answer check
function checkAnswers(userAnswers) {
  const tempList = [...randomNumberList];
  let correct = 0;

  userAnswers.forEach((val, i) => {
    const input = inputsArr[i];

    const matchI = tempList.indexOf(val);
    if (matchI !== -1) {
      tempList.splice(matchI, 1);
      input.classList.add("text-success", "fw-bold");
      correct++;
    } else {
      input.classList.add("text-danger", "fw-bold");
    }
  });

  return correct;
}

// submit initial form
userFormEl.addEventListener("submit", (ev) => {
  ev.preventDefault();

  countdown = parseInt(timeInputEl.value);
  numberQuantity = parseInt(quantityInputEl.value);
  numberMax = parseInt(maxInputEl.value);

  userFormEl.classList.add("d-none");
  numberListDivEl.classList.remove("d-none");
  messageEl.innerText = "";

  generateAndShowNumbers(numberQuantity, numberMax);
});
