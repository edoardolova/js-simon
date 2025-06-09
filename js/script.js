// Descrizione: Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi. Dopo 30 secondi i numeri scompaiono e appaiono invece 5 input in cui l'utente deve inserire i numeri che ha visto precedentemente, nell'ordine che preferisce.
// Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.
const countdownEl = document.getElementById("countdown");
const numberListEl = document.getElementById("numbers-list");
const answerFormEl = document.getElementById("answers-form");
const messageEl = document.getElementById("message");
const inputs = document.querySelectorAll("#input-group input");

let countdown = 30;
const randomNumberList = [];


const randomInt = (max) =>{
    const number = Math.ceil(Math.random()*max);
    randomNumberList.push(number);
    return number;
};

const createNumberLi = (parent) =>{
    const numberLiEl = document.createElement("li");
    numberLiEl.innerText = randomInt(50);
    parent.appendChild(numberLiEl);
}


//print numbers
for(let i = 0; i < 5; i++){
    createNumberLi(numberListEl);
}

//start the countdown and stop it after 30 sec
const startCountdown = () => {
    countdownEl.innerText = `Tempo rimasto: ${countdown}`;

    const countdownInterval = setInterval(() => {
        countdown--;
        countdownEl.innerText = `Tempo rimasto: ${countdown}`;

        if (countdown <= 0) {
            clearInterval(countdownInterval);
            countdownEl.innerHTML = "";
            numberListEl.innerHTML = "";
            showInputFields();
        }
    }, 1000);
};

const showInputFields = () => {
    answerFormEl.classList.remove("d-none");
    for(let i = 0; i < inputs.length; i++){
        inputs[i].value = 0;
    }
};

answerFormEl.addEventListener("submit", ev =>{
    ev.preventDefault();
    let correctAnswer = 0;
    
    for(let i = 0; i < inputs.length; i++){
        let found = false;
        const userValue = parseInt(inputs[i].value);

        for(let j = 0; j < randomNumberList.length; j++){
            if (userValue === randomNumberList[j]) {
                //remove the number if correct to avoid error
                randomNumberList.splice(j, 1);
                correctAnswer++;
                inputs[i].classList.add("text-success", "fw-bold");
                found = true;
                break;
            }
        }
        if (!found) {
            inputs[i].classList.add("text-danger", "fw-bold");
        }
    }
    messageEl.innerText = `Complimenti ti sei ricordato correttamente: ${correctAnswer} numeri`;

});

startCountdown();
