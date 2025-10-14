let quizData = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;

// HTML elements
const startBtn = document.getElementById('start-btn');
const startContainer = document.getElementById('start-container');
const quizContainer = document.getElementById('quiz-container');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const resultEl = document.getElementById('result');
const restartBtn = document.getElementById('restart-btn');

// Start Quiz
startBtn.addEventListener('click', () => {
  startContainer.style.display = 'none';
  quizContainer.style.display = 'block';
  loadQuestions();
});

// Load Questions from JSON
function loadQuestions() {
  fetch('questions.json')
    .then(response => response.json())
    .then(data => {
      quizData = shuffleArray(data).slice(0, 4); // 10 random questions per session
      loadQuestion();
    })
    .catch(error => console.error('Error loading questions:', error));
}

// Shuffle Array
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Load a question
function loadQuestion() {
  if (currentQuestionIndex >= quizData.length) {
    showResult();
    return;
  }

  selectedOption = null;
  const currentQuestion = quizData[currentQuestionIndex];
  questionEl.innerText = `Q${currentQuestionIndex + 1}. ${currentQuestion.question}`;

  optionsEl.innerHTML = '';
  const shuffledOptions = shuffleArray([...currentQuestion.options]);
  shuffledOptions.forEach(option => {
    const li = document.createElement('li');
    li.innerText = option;
    li.onclick = () => selectOption(li, currentQuestion.options.indexOf(option));
    optionsEl.appendChild(li);
  });

  nextBtn.disabled = true;
}

// Select Option
function selectOption(li, index) {
  if (selectedOption !== null) optionsEl.children[selectedOption].classList.remove('selected');
  li.classList.add('selected');
  selectedOption = index;
  nextBtn.disabled = false;
}

// Next Question
function nextQuestion() {
  if (selectedOption === null) return;
  if (selectedOption === quizData[currentQuestionIndex].answer) score++;
  currentQuestionIndex++;
  loadQuestion();
}

// Show Result
function showResult() {
  questionEl.innerText = 'Quiz Completed!';
  optionsEl.innerHTML = '';
  nextBtn.style.display = 'none';
  restartBtn.style.display = 'block';
  resultEl.innerText = `Your score: ${score} / ${quizData.length}`;
}

// Restart Quiz
function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  restartBtn.style.display = 'none';
  nextBtn.style.display = 'block';
  quizData = shuffleArray(quizData).slice(0, 10);
  loadQuestion();
  quizContainer.style.display = 'block';
}
