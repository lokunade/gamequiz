const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeguage = document.getElementById("timeGuage");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

//creating questions in an array
let questions = [{
    question: "What is the capital of Ogun",
    choiceA: "Abeokuta North",
    choiceB: "Abeokuta",
    choiceC: "Adeokuta",
    choiceD: "Ijebu",
    correct: "B"
}, {
    question: "What is the capital of CrossRiver",
    choiceA: "Uyo",
    choiceB: "Alwa Ibom",
    choiceC: "Calabar",
    choiceD: "Akpabio",
    correct: "C"
}, {
    question: "What is the capital of Anambra",
    choiceA: "Awka",
    choiceB: "Aba",
    choiceC: "Akwa",
    choiceD: "Aba-North",
    correct: "A"
}, {
    question: "What is the capital of Ebonyi",
    choiceA: "Efikpo",
    choiceB: "Abakaliki",
    choiceC: "Ebonyi",
    choiceD: "Uto",
    correct: "B"
}, {
    question: "What is the capital of Jigawa",
    choiceA: "Lafia",
    choiceB: "Duse",
    choiceC: "Jigawa",
    choiceD: "Dutse",
    correct: "D"
}, {
    question: "What is the capital of Kano",
    choiceA: "Kno",
    choiceB: "Katsina",
    choiceC: "Kano",
    choiceD: "Kaduna",
    correct: "C"
}, {
    question: "What is the capital of Zamfara",
    choiceA: "Gusau",
    choiceB: "Gusua",
    choiceC: "Gasau",
    choiceD: "Gasua",
    correct: "A"
}, {
    question: "What is the capital of Kebbi",
    choiceA: "Binin Kebbi",
    choiceB: "Birnin Kebbi",
    choiceC: "Kebbi",
    choiceD: "Yola",
    correct: "B"
}, {
    question: "What is the capital of Gombe",
    choiceA: "Bassa",
    choiceB: "Yola",
    choiceC: "Gombe",
    choiceD: "Gmbe",
    correct: "C"
}, {
    question: "What is the capital of Kogi",
    choiceA: "Lakoja",
    choiceB: "Yagba West",
    choiceC: "Kabba",
    choiceD: "Lokoja",
    correct: "D"
}];
// create some variables
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 8;
const gaugeWidth = 150;
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion() {
    let m = questions[runningQuestion];

    question.innerHTML = "<p>" + m.question + "</p>";
    choiceA.innerHTML = m.choiceA;
    choiceB.innerHTML = m.choiceB;
    choiceC.innerHTML = m.choiceC;
    choiceD.innerHTML = m.choiceD;
}


start.addEventListener("click", startQuiz);
//start quiz

function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000);
}

//render progress
function renderProgress() {
    for (let mIndex = 0; mIndex <= lastQuestion; mIndex++) {
        progress.innerHTML += "<div class='prog' id=" +
            mIndex + "></div>";
    }
}

//counter


function renderCounter() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGuage.style.width = count * gaugeUnit + "px";
        count++
    } else {
        count = 0;
        // change progress bar to red
        answerIsWrong();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        } else {
            //end of quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

//checkAnswer
function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        //answer is correct
        score++
        // change progress color to green
        answerIsCorrect();
    } else {
        // answer is wrong
        // change progress bar to red
        answerIsWrong();
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        //end of quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}


//answer is correct
function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

//answer is wrong
function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

//score render
function scoreRender() {
    scoreContainer.style.display = "block";

    // calculate the amount of question scored
    const scorePercent = Math.round(100 * score / questions.length);
    scoreContainer.innerHTML += "<p>" + scorePercent + "%</p>";
}