// 20 Questions Quiz Data
let questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: 2
    },
    {
        question: "Which programming language runs natively in web browsers?",
        options: ["Python", "Java", "C++", "JavaScript"],
        answer: 3
    },
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyperlink and Text Markup Language",
            "Home Tool Markup Language"
        ],
        answer: 0
    },
    {
        question: "Which CSS property is used to change text color?",
        options: ["font-color", "text-color", "color", "background-color"],
        answer: 2
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        options: ["<script>", "<js>", "<javascript>", "<scripting>"],
        answer: 0
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Ag", "Au", "Gd", "Go"],
        answer: 1
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Saturn", "Mars", "Jupiter"],
        answer: 2
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
        answer: 2
    },
    {
        question: "What is the largest mammal on Earth?",
        options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
        answer: 1
    },
    {
        question: "In which year did the Titanic sink?",
        options: ["1912", "1905", "1920", "1898"],
        answer: 0
    },
    {
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Iron", "Diamond", "Platinum"],
        answer: 2
    },
    {
        question: "How many continents are there in the world?",
        options: ["5", "6", "7", "8"],
        answer: 2
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        answer: 1
    },
    {
        question: "What is the capital city of Japan?",
        options: ["Beijing", "Seoul", "Tokyo", "Kyoto"],
        answer: 2
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Computer Style Sheets",
            "Colorful Style Sheets"
        ],
        answer: 1
    },
    {
        question: "Which of the following is NOT a JavaScript framework or library?",
        options: ["React", "Django", "Vue", "Angular"],
        answer: 1
    },
    {
        question: "What is the main component of the sun?",
        options: ["Liquid lava", "Hydrogen", "Oxygen", "Carbon"],
        answer: 1
    },
    {
        question: "How many bits make up a single byte?",
        options: ["4", "8", "16", "32"],
        answer: 1
    },
    {
        question: "Which country is home to the kangaroo?",
        options: ["New Zealand", "South Africa", "Australia", "Brazil"],
        answer: 2
    },
    {
        question: "What is the square root of 64?",
        options: ["6", "7", "8", "9"],
        answer: 2
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 60; // Poore quiz ke liye 60 seconds (1 minute)

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const questionCount = document.getElementById("question-count");
const scoreText = document.getElementById("score-text");
const timerDisplay = document.getElementById("timer");

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
});
restartBtn.addEventListener("click", startQuiz);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 60; // Restart par timer dobara 60 seconds se shuru hoga
    startScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    
    timerDisplay.textContent = `Time: ${timeLeft}s`;
    startTimer();
    loadQuestion();
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showResults(); // Time khatam hone par seedha result screen par le jayega
        }
    }, 1000);
}

function loadQuestion() {
    nextBtn.classList.add("hidden");
    const currentQ = questions[currentQuestionIndex];
    questionCount.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    questionText.textContent = currentQ.question;
    
    optionsContainer.innerHTML = "";
    currentQ.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.classList.add("option-btn");
        btn.addEventListener("click", () => selectOption(index));
        optionsContainer.appendChild(btn);
    });
}

function selectOption(selectedIndex) {
    const currentQ = questions[currentQuestionIndex];
    const optionButtons = optionsContainer.children;

    for (let i = 0; i < optionButtons.length; i++) {
        optionButtons[i].disabled = true;
        if (i === currentQ.answer) {
            optionButtons[i].classList.add("correct");
        } else if (i === selectedIndex) {
            optionButtons[i].classList.add("incorrect");
        }
    }

    if (selectedIndex === currentQ.answer) {
        score++;
    }

    nextBtn.classList.remove("hidden");
}

function showResults() {
    clearInterval(timer); // Quiz khatam hone par timer rok diya jayega
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
    scoreText.textContent = `Your score: ${score} out of ${questions.length}`;
}