const questions = [
  {
    question: "What is a computer network?",
    answers: [
      "A group of connected devices that can share information",
      "A program used to draw pictures",
      "A single computer with a large screen",
      "A type of computer keyboard"
    ],
    correct: 0,
    explanation: "A network connects devices so they can communicate and share resources."
  },
  {
    question: "Which network usually connects devices across a school building?",
    answers: [
      "A WAN (Wide Area Network)",
      "A LAN (Local Area Network)",
      "The World Wide Web",
      "A personal area network only"
    ],
    correct: 1,
    explanation: "A LAN connects devices in a small area, such as a school, home, or office."
  },
  {
    question: "What does a router do in a home network?",
    answers: [
      "Prints documents from every computer",
      "Stores every website on the internet",
      "Directs data between devices and other networks",
      "Protects a screen from scratches"
    ],
    correct: 2,
    explanation: "A router directs data to the right place, including between your home network and the internet."
  },
  {
    question: "What is the internet?",
    answers: [
      "One very large computer",
      "A worldwide network of connected networks",
      "Another name for Wi-Fi",
      "A program that sends emails"
    ],
    correct: 1,
    explanation: "The internet is a huge collection of connected networks around the world."
  },
  {
    question: "Which of these is an example of a server?",
    answers: [
      "A computer that provides files or services to other computers",
      "A cable that connects a screen",
      "A password written on paper",
      "A computer mouse"
    ],
    correct: 0,
    explanation: "A server provides resources, such as files or web pages, to other devices on a network."
  },
  {
    question: "What is one advantage of using a network to share a printer?",
    answers: [
      "Each person needs a separate printer",
      "The printer works without electricity",
      "Several users can use the same printer",
      "It makes every document public"
    ],
    correct: 2,
    explanation: "Sharing a printer means multiple devices can use one printer on the network."
  },
  {
    question: "What does Wi-Fi let a device do?",
    answers: [
      "Connect to a network wirelessly",
      "Make its battery last forever",
      "Turn a file into a website",
      "Work without any network equipment"
    ],
    correct: 0,
    explanation: "Wi-Fi uses radio signals to connect devices to a network without a cable."
  },
  {
    question: "Which device is used to connect a computer to a wired network?",
    answers: [
      "A webcam",
      "A network interface card (NIC)",
      "A speaker",
      "A graphics tablet"
    ],
    correct: 1,
    explanation: "A network interface card (NIC) allows a device to connect to a network."
  },
  {
    question: "Why should you use a strong password on a network?",
    answers: [
      "To make the internet faster",
      "To stop the computer from needing updates",
      "To help keep your account and data safe",
      "To let anyone connect more easily"
    ],
    correct: 2,
    explanation: "A strong password makes it harder for someone else to access your account or data."
  },
  {
    question: "What is one possible disadvantage of a computer network?",
    answers: [
      "Devices can never share files",
      "A network problem may stop people accessing shared resources",
      "Computers cannot connect to printers",
      "Every device must be in a different building"
    ],
    correct: 1,
    explanation: "If part of a network fails, users may temporarily lose access to shared files or devices."
  }
];

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
    scoreDetail.textContent = "Perfect score! You’re a network superstar.";
  } else if (score >= 7) {
    resultIcon.textContent = "✓";
    scoreDetail.textContent = "Great job! You know your way around a network.";
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
