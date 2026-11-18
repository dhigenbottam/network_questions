const questions = JSON.parse(document.querySelector("#quiz-questions").textContent);

const questionCount = document.querySelector("#question-count");
const progressPercent = document.querySelector("#progress-percent");
const progressTrack = document.querySelector("#progress-track");
const progressBar = document.querySelector("#progress-bar");
const questionHeading = document.querySelector("#question");
const answerForm = document.querySelector("#answer-form");
const answersContainer = document.querySelector("#answers");
const feedback = document.querySelector("#feedback");
const submitButton = document.querySelector("#submit-button");
const quizContent = document.querySelector("#quiz-content");
const results = document.querySelector("#results");
const scoreMessage = document.querySelector("#score-message");
const scoreDetail = document.querySelector("#score-detail");
const resultIcon = document.querySelector("#result-icon");
const restartButton = document.querySelector("#restart-button");

let currentQuestion = 0;
let score = 0;
let answered = false;

function renderQuestion() {
  const item = questions[currentQuestion];
  const progress = currentQuestion + 1;

  questionCount.textContent = `Question ${progress} of ${questions.length}`;
  progressPercent.textContent = `${Math.round((progress / questions.length) * 100)}%`;
  progressTrack.setAttribute("aria-valuemax", String(questions.length));
  progressTrack.setAttribute("aria-valuenow", String(progress));
  progressBar.style.width = `${(progress / questions.length) * 100}%`;
  questionHeading.textContent = item.question;
  answersContainer.replaceChildren(answersContainer.querySelector("legend"));
  feedback.textContent = "";
  feedback.className = "feedback";
  submitButton.disabled = true;
  submitButton.innerHTML = 'Check answer <span aria-hidden="true">→</span>';
  answered = false;

  item.answers.forEach((answer, index) => {
    const option = document.createElement("div");
    option.className = "answer-option";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "answer";
    input.id = `answer-${index}`;
    input.value = String(index);

    const label = document.createElement("label");
    label.htmlFor = input.id;

    const letter = document.createElement("span");
    letter.className = "answer-letter";
    letter.setAttribute("aria-hidden", "true");
    letter.textContent = String.fromCharCode(65 + index);

    const text = document.createElement("span");
    text.textContent = answer;

    label.append(letter, text);
    option.append(input, label);
    answersContainer.append(option);

    input.addEventListener("change", () => {
      submitButton.disabled = false;
    });
  });
}

function showResults() {
  quizContent.hidden = true;
  results.hidden = false;
  questionCount.textContent = "All questions complete";
  progressPercent.textContent = "100%";
  progressTrack.setAttribute("aria-valuenow", String(questions.length));
  progressBar.style.width = "100%";
  scoreMessage.textContent = `${score} out of ${questions.length}`;

  if (score === questions.length) {
    resultIcon.textContent = "★";
    scoreDetail.textContent = "Perfect score! You’re a computing superstar.";
  } else if (score >= 7) {
    resultIcon.textContent = "✓";
    scoreDetail.textContent = "Great job! You know your stuff.";
  } else if (score >= 4) {
    resultIcon.textContent = "↗";
    scoreDetail.textContent = "Good effort! A little more practice will make you a pro.";
  } else {
    resultIcon.textContent = "✦";
    scoreDetail.textContent = "Keep learning — every network expert starts somewhere.";
  }

  restartButton.focus();
}

answerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!answered) {
    const selected = answerForm.querySelector('input[name="answer"]:checked');
    if (!selected) return;

    const item = questions[currentQuestion];
    const selectedIndex = Number(selected.value);
    const isCorrect = selectedIndex === item.correct;
    const selectedOption = selected.closest(".answer-option");
    const correctOption = document.querySelector(`#answer-${item.correct}`).closest(".answer-option");

    answered = true;
    if (isCorrect) {
      score += 1;
      selectedOption.classList.add("is-correct");
      feedback.textContent = `Correct! ${item.explanation}`;
      feedback.classList.add("is-correct");
    } else {
      selectedOption.classList.add("is-incorrect");
      correctOption.classList.add("is-correct");
      feedback.textContent = `Not quite. ${item.explanation}`;
      feedback.classList.add("is-incorrect");
    }

    answersContainer.querySelectorAll("input").forEach((input) => {
      input.disabled = true;
    });
    submitButton.disabled = false;
    submitButton.innerHTML = currentQuestion === questions.length - 1
      ? 'See my score <span aria-hidden="true">→</span>'
      : 'Next question <span aria-hidden="true">→</span>';
    submitButton.focus();
    return;
  }

  currentQuestion += 1;
  if (currentQuestion === questions.length) {
    showResults();
    return;
  }

  renderQuestion();
  questionHeading.focus();
});

restartButton.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  results.hidden = true;
  quizContent.hidden = false;
  renderQuestion();
  questionHeading.focus();
});

renderQuestion();
