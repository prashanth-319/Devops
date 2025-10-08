const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: 0,
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: 1,
  },
  {
    question: "Which language is primarily used for web development?",
    options: ["Python", "JavaScript", "C++", "Java"],
    answer: 1,
  },
  {
    question: "What color do you get when you mix red and white?",
    options: ["Pink", "Orange", "Purple", "Brown"],
    answer: 0,
  },
];

let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const resultEl = document.getElementById('result');

function loadQuestion() {
  selectedOption = null;
  const currentQuestion = quizData[currentQuestionIndex];
  questionEl.innerText = currentQuestion.question;
  
  optionsEl.innerHTML = '';
  currentQuestion.options.forEach((option, index) => {
    const li = document.createElement('li');
    li.innerText = option;
    li.onclick = () => selectOption(li, index);
    optionsEl.appendChild(li);
  });
  
  nextBtn.disabled = true;
  resultEl.innerText = '';
}

function selectOption(li, index) {
  if (selectedOption !== null) {
    optionsEl.children[selectedOption].classList.remove('selected');
  }
  li.classList.add('selected');
  selectedOption = index;
  nextBtn.disabled = false;
}

function nextQuestion() {
  if(selectedOption === null) return;
  
  const currentQuestion = quizData[currentQuestionIndex];
  if(selectedOption === currentQuestion.answer) {
    score++;
  }
  
  currentQuestionIndex++;
  
  if(currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  questionEl.innerText = 'Quiz Completed!';
  optionsEl.innerHTML = '';
  nextBtn.style.display = 'none';
  resultEl.innerText = `Your score is ${score} out of ${quizData.length}`;
}

loadQuestion();
