// question array
const questions = [
    {
        question: "Inside which HTML element do we put the JavaScript??",
        choices: ["<javascript>", "<script>", "<scripting>", "<js>"],
        correctAnswer: 1
    },

    {
        question: "Which operator is used to assign a value to a variable?",
        choices: ["'-'", "'*'", "'='", "'X'"],
        correctAnswer: 2
    },

    {
        question: "What will the following code return: Boolean(10 > 9)",
        choices: ["NaN", "true", "undefined", "false"],
        correctAnswer: 1
    },

    {
        question: "How to write an IF statement in JavaScript?",
        choices: ["if (i == 5)", "if i = 5", "if i == 5 then", "if i = 5 then"],
        correctAnswer: 0
    }
];

const container = document.querySelector(".container");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const submitButton = document.getElementById("submit-btn");
const restartButton = document.getElementById("restart-btn");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("time");

let currentQuestion = 0;
let score = 0;
let timeLeft = 120;

// Load question function
function loadQuestion() {
    const question = questions[currentQuestion];
    questionElement.textContent = question.question;

    choicesElement.innerHTML="";
    for (let i = 0; i < question.choices.length; i++) {
        const li = document.createElement("li");
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "choice";
        radio.value = i;

        li.appendChild(radio);
        li.appendChild(document.createTextNode(question.choices[i]));
        choicesElement.appendChild(li);
    }
}

// Check Answer Function
function checkAnswer() {
    const selectOption = document.querySelector("input[name ='choice']:checked");

    if (selectOption) {
        const selectedAnswer = parseInt(selectOption.value);
        if (selectedAnswer === questions[currentQuestion].correctAnswer) {
            score++;
        }
        currentQuestion++;

        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showScore();
        }
    }
}

// Showscore Function
function showScore() {
    
    timeLeft = 0;

    questionElement.style.display = "none";
    choicesElement.style.display = "none";
    submitButton.style.display = "none";
    scoreElement.textContent = `Your score is: ${score} out of ${questions.length}`;
    scoreElement.style.display = "block";
    restartButton.style.display = "block";
}

// Restart Quiz Function
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    timeLeft = 120;
    loadQuestion();
    restartButton.style.display = "none";
    questionElement.style.display = "block";
    choicesElement.style.display = "block";
    submitButton.style.display = "block";
    scoreElement.style.display = "none";
    timerInterval = setInterval(updateTimer, 1000);
}

// Update timer Function
function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    seconds = seconds < 10 ? "0" + seconds:seconds;
    timerElement.textContent = `${minutes}:${seconds}`;

    if (timeLeft === 0) {
        showScore();
    } else {
        timeLeft--;
    }
}
 let timerInterval = setInterval(updateTimer, 1000);
 submitButton.addEventListener("click", checkAnswer);
 restartButton.addEventListener("click", restartQuiz);

 loadQuestion();
 restartButton.style.display = "none";
