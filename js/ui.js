// js/ui.js
import { QUESTIONS_BY_CATEGORY } from './questions.js'
import { QuizEngine } from './quizEngine.js'
import { renderQuestionHtml, renderResultsHtml } from "./templates.js"

let engine = null
let timerId = null
let timeLeft = 5

let categoryStep, quizStep, resultBox, categoryError, progressText, timerText
let questionContainer, errorBox, startBtn, nextBtn, themeToggle

/**
 * -------------------------
 * App initialization
 * -------------------------
 * Ensures DOM is ready before accessing elements.
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp)
} else {
  initApp()
}

/**
 * Initialize DOM references and event listeners.
 */
function initApp () {
  categoryStep = document.getElementById('categoryStep')
  quizStep = document.getElementById('quizStep')
  resultBox = document.getElementById('resultBox')
  categoryError = document.getElementById('categoryError')
  progressText = document.getElementById('progressText')
  timerText = document.getElementById('timerText')
  questionContainer = document.getElementById('questionContainer')
  errorBox = document.getElementById('errorBox')
  startBtn = document.getElementById('startBtn')
  nextBtn = document.getElementById('nextBtn')
  themeToggle = document.getElementById('themeToggle')

  setupEventListeners()
}

function setupEventListeners () {
  themeToggle.addEventListener('click', () => {
    const body = document.body
    const isLight = body.classList.contains('bg-light')

    if (isLight) {
      body.classList.remove('bg-light')
      body.classList.add('bg-dark', 'text-white')
      themeToggle.textContent = 'Light mode'
      themeToggle.classList.remove('btn-outline-dark')
      themeToggle.classList.add('btn-outline-light')
    } else {
      body.classList.remove('bg-dark', 'text-white')
      body.classList.add('bg-light')
      themeToggle.textContent = 'Dark mode'
      themeToggle.classList.remove('btn-outline-light')
      themeToggle.classList.add('btn-outline-dark')
    }
  })

  startBtn.addEventListener('click', handleStart)
  nextBtn.addEventListener('click', () => {
    clearTimer()
    handleNext(false)
  })
}

function updateTimerText () {
  timerText.textContent = `Tid kvar: ${timeLeft} s`
}

function clearTimer () {
  if (timerId) {
    clearInterval(timerId)
    timerId = null
  }
}

/**
 * Start a 5-second countdown for the current question.
 * Automatically moves forward on timeout.
 */
function startTimer () {
  clearTimer()
  timeLeft = 10
  updateTimerText()

  timerId = setInterval(() => {
    timeLeft--
    updateTimerText()

    if (timeLeft <= 0) {
      clearTimer()
      handleNext(true)
    }
  }, 1000)
}

/**
 * -------------------------
 * Question rendering
 * -------------------------
 */

/**
 * Render the currently active question.
 * Supports boolean, single-choice and multiple-choice questions.
 */
function renderCurrentQuestion () {
  const q = engine.getCurrentQuestion()
  const index = engine.currentIndex
  const storedAnswer = engine.userAnswers[index]

  progressText.textContent = `Fråga ${index + 1} av ${engine.questions.length}`

  questionContainer.innerHTML = renderQuestionHtml({
    q,
    index,
    total: engine.questions.length,
    storedAnswer,
  })
}

function saveCurrentAnswerFromDOM () {
  const q = engine.getCurrentQuestion()
  
  const answerHandlers = {
    boolean: () => {
      const checked = document.querySelector('input[name="answer"]:checked')
      return checked ? checked.value === 'true' : null
    },
    single: () => {
      const checked = document.querySelector('input[name="answer"]:checked')
      return checked ? Number(checked.value) : null
    },
    multiple: () => {
      const checkedBoxes = Array.from(
        document.querySelectorAll('input[name="answer"]:checked')
      )
      return checkedBoxes.length > 0 
        ? checkedBoxes.map(cb => Number(cb.value)) 
        : null
    }
  }

  const answer = answerHandlers[q.type]?.() ?? null
  engine.saveAnswer(answer)
}

function handleStart () {
  const selected = document.querySelector('input[name="category"]:checked')
  if (!selected) {
    categoryError.classList.remove('d-none')
    return
  }
  categoryError.classList.add('d-none')

  const category = selected.value
  const questions = QUESTIONS_BY_CATEGORY[category] || []

  if (!questions.length) {
    alert('Inga frågor för denna kategori.')
    return
  }

  engine = new QuizEngine(questions)

  categoryStep.classList.add('d-none')
  quizStep.classList.remove('d-none')

  renderCurrentQuestion()
  errorBox.classList.add('d-none')
  startTimer()
}

function handleNext (fromTimeout = false) {
  if (!fromTimeout) {
    saveCurrentAnswerFromDOM()

    const ans = engine.userAnswers[engine.currentIndex]
    if (ans == null && timeLeft > 0) {
      errorBox.classList.remove('d-none')
      return
    }
  }

  errorBox.classList.add('d-none')

  if (engine.hasNext()) {
    engine.next()
    renderCurrentQuestion()
    startTimer()
  } else {
    showResults()
  }
}

function showResults () {
  clearTimer()
  quizStep.classList.add('d-none')
  resultBox.classList.remove('d-none')

  const results = engine.calculateResults()

  resultBox.innerHTML = renderResultsHtml(results)

  document
    .getElementById('retryBtn')
    .addEventListener('click', restartQuizSameCategory)

  document
    .getElementById('exitBtn')
    .addEventListener('click', backToCategoryMenu)
}

function restartQuizSameCategory () {
  engine.currentIndex = 0
  engine.userAnswers = new Array(engine.questions.length).fill(null)

  resultBox.classList.add('d-none')
  quizStep.classList.remove('d-none')

  renderCurrentQuestion()
  errorBox.classList.add('d-none')
  startTimer()
}

/**
 * Exit quiz and return to category selection.
 */
function backToCategoryMenu () {
  engine = null
  clearTimer()

  quizStep.classList.add('d-none')
  resultBox.classList.add('d-none')

  categoryStep.classList.remove('d-none')
}