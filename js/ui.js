// js/ui.js
import { QUESTIONS_BY_CATEGORY } from "./questions.js";
import { QuizEngine } from "./quizEngine.js";

let engine = null;
let timerId = null;
let timeLeft = 5;

let categoryStep, quizStep, resultBox, categoryError, progressText, timerText;
let questionContainer, errorBox, startBtn, nextBtn, themeToggle;


if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}

function initApp() {
  categoryStep = document.getElementById("categoryStep");
  quizStep = document.getElementById("quizStep");
  resultBox = document.getElementById("resultBox");
  categoryError = document.getElementById("categoryError");
  progressText = document.getElementById("progressText");
  timerText = document.getElementById("timerText");
  questionContainer = document.getElementById("questionContainer");
  errorBox = document.getElementById("errorBox");
  startBtn = document.getElementById("startBtn");
  nextBtn = document.getElementById("nextBtn");
  themeToggle = document.getElementById("themeToggle");

  setupEventListeners();
}

function setupEventListeners() {

  themeToggle.addEventListener("click", () => {
    const body = document.body;
    const isLight = body.classList.contains("bg-light");

    if (isLight) {
      body.classList.remove("bg-light");
      body.classList.add("bg-dark", "text-white");
      themeToggle.textContent = "Light mode";
      themeToggle.classList.remove("btn-outline-dark");
      themeToggle.classList.add("btn-outline-light");
    } else {
      body.classList.remove("bg-dark", "text-white");
      body.classList.add("bg-light");
      themeToggle.textContent = "Dark mode";
      themeToggle.classList.remove("btn-outline-light");
      themeToggle.classList.add("btn-outline-dark");
    }
  });

  startBtn.addEventListener("click", handleStart);
  nextBtn.addEventListener("click", () => {
    clearTimer();
    handleNext(false);
  });
}


function updateTimerText() {
  timerText.textContent = `Tid kvar: ${timeLeft} s`;
}

function clearTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
}

function startTimer() {
  clearTimer();
  timeLeft = 5;
  updateTimerText();

  timerId = setInterval(() => {
    timeLeft--;
    updateTimerText();

    if (timeLeft <= 0) {
      clearTimer();
      handleNext(true); 
    }
  }, 1000);
}


function renderCurrentQuestion() {
  const q = engine.getCurrentQuestion();
  const index = engine.currentIndex;
  const storedAnswer = engine.userAnswers[index];

  progressText.textContent = `Fråga ${index + 1} av ${engine.questions.length}`;

  let html = `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title mb-2">Fråga ${index + 1}</h5>
        <p class="card-text">${q.text}</p>
        <div class="mt-3">
  `;

  if (q.type === "boolean") {
    const checkedTrue = storedAnswer === true ? "checked" : "";
    const checkedFalse = storedAnswer === false ? "checked" : "";
    html += `
      <div class="form-check">
        <input class="form-check-input" type="radio" name="answer" id="boolTrue" value="true" ${checkedTrue}>
        <label class="form-check-label" for="boolTrue">Sant</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="answer" id="boolFalse" value="false" ${checkedFalse}>
        <label class="form-check-label" for="boolFalse">Falskt</label>
      </div>
    `;
  }

  if (q.type === "single") {
    html += q.options
      .map((opt, idx) => {
        const checked = storedAnswer === idx ? "checked" : "";
        const id = `single-${idx}`;
        return `
        <div class="form-check">
          <input class="form-check-input" type="radio" name="answer" id="${id}" value="${idx}" ${checked}>
          <label class="form-check-label" for="${id}">${opt}</label>
        </div>
      `;
      })
      .join("");
  }

  if (q.type === "multiple") {
    html += q.options
      .map((opt, idx) => {
        const isChecked =
          Array.isArray(storedAnswer) && storedAnswer.includes(idx);
        const checked = isChecked ? "checked" : "";
        const id = `multi-${idx}`;
        return `
        <div class="form-check">
          <input class="form-check-input" type="checkbox" name="answer" id="${id}" value="${idx}" ${checked}>
          <label class="form-check-label" for="${id}">${opt}</label>
        </div>
      `;
      })
      .join("");
  }

  html += `
        </div>
      </div>
    </div>
  `;

  questionContainer.innerHTML = html;
}


function saveCurrentAnswerFromDOM() {
  const q = engine.getCurrentQuestion();

  if (q.type === "boolean") {
    const checked = document.querySelector('input[name="answer"]:checked');
    if (!checked) {
      engine.saveAnswer(null);
      return;
    }
    engine.saveAnswer(checked.value === "true");
  }

  if (q.type === "single") {
    const checked = document.querySelector('input[name="answer"]:checked');
    if (!checked) {
      engine.saveAnswer(null);
      return;
    }
    engine.saveAnswer(Number(checked.value));
  }

  if (q.type === "multiple") {
    const checkedBoxes = Array.from(
      document.querySelectorAll('input[name="answer"]:checked')
    );
    if (checkedBoxes.length === 0) {
      engine.saveAnswer(null);
      return;
    }
    engine.saveAnswer(checkedBoxes.map((cb) => Number(cb.value)));
  }
}


function handleStart() {
  const selected = document.querySelector('input[name="category"]:checked');
  if (!selected) {
    categoryError.classList.remove("d-none");
    return;
  }
  categoryError.classList.add("d-none");

  const category = selected.value;
  const questions = QUESTIONS_BY_CATEGORY[category] || [];

  if (!questions.length) {
    alert("Inga frågor för denna kategori.");
    return;
  }

  engine = new QuizEngine(questions);

  categoryStep.classList.add("d-none");
  quizStep.classList.remove("d-none");

  renderCurrentQuestion();
  errorBox.classList.add("d-none");
  startTimer();
}


function handleNext(fromTimeout = false) {
  if (!fromTimeout) {
    saveCurrentAnswerFromDOM();

    const ans = engine.userAnswers[engine.currentIndex];
    if (ans == null && timeLeft > 0) {
      errorBox.classList.remove("d-none");
      return;
    }
  }

  errorBox.classList.add("d-none");

  if (engine.hasNext()) {
    engine.next();
    renderCurrentQuestion();
    startTimer();
  } else {
    showResults();
  }
}


function showResults() {
  clearTimer();
  quizStep.classList.add("d-none");
  resultBox.classList.remove("d-none");

  const { correctCount, total, percentage, details } = engine.calculateResults();

  let alertClass = "alert-danger";
  let message = "Underkänt – fortsätt öva!";
  if (percentage >= 50 && percentage <= 75) {
    alertClass = "alert-warning";
    message = "Bra!";
  } else if (percentage > 75) {
    alertClass = "alert-success";
    message = "Riktigt bra jobbat!";
  }

  const summaryHtml = `
    <div class="alert ${alertClass}">
      <h4 class="alert-heading mb-1">Ditt resultat</h4>
      <p class="mb-1">Du fick <strong>${correctCount} av ${total}</strong> rätt (${percentage}%).</p>
      <p class="mb-3">${message}</p>

      <div class="d-flex gap-2">
        <button id="retryBtn" class="btn btn-primary">Kör om</button>
        <button id="exitBtn" class="btn btn-secondary">Avsluta</button>
      </div>
    </div>
  `;

  const detailsHtml = details
    .map((d, idx) => {
      const borderClass = d.isCorrect ? "border-success" : "border-danger";
      const icon = d.isCorrect ? "✅" : "❌";

      return `
        <div class="card mb-2 border ${borderClass}">
          <div class="card-body">
            <h6>${icon} Fråga ${idx + 1}</h6>
            <p>${d.question.text}</p>
            <p><strong>Ditt svar:</strong> ${d.userAnswerText}</p>
            <p><strong>Rätt svar:</strong> ${d.correctAnswer}</p>
          </div>
        </div>
      `;
    })
    .join("");

  resultBox.innerHTML = summaryHtml + detailsHtml;

  // KOPPLA KNAPPARNA HÄR (efter att innerHTML är satt)
  document
    .getElementById("retryBtn")
    .addEventListener("click", restartQuizSameCategory);
  document
    .getElementById("exitBtn")
    .addEventListener("click", backToCategoryMenu);
}


function restartQuizSameCategory() {
  engine.currentIndex = 0;
  engine.userAnswers = new Array(engine.questions.length).fill(null);

  resultBox.classList.add("d-none");
  quizStep.classList.remove("d-none");

  renderCurrentQuestion();
  errorBox.classList.add("d-none");
  startTimer();
}

function backToCategoryMenu() {
  engine = null;
  clearTimer();

  quizStep.classList.add("d-none");
  resultBox.classList.add("d-none");

  categoryStep.classList.remove("d-none");
}
