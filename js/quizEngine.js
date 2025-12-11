// js/quizEngine.js

function arraysEqualAsSet(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b)) return false;
  if (a.length !== b.length) return false;
  const setA = new Set(a);
  const setB = new Set(b);
  if (setA.size !== setB.size) return false;
  for (const v of setA) {
    if (!setB.has(v)) return false;
  }
  return true;
}

export class QuizEngine {
  constructor(questions) {
    this.questions = questions;
    this.currentIndex = 0;
    this.userAnswers = new Array(questions.length).fill(null);
  }

  getCurrentQuestion() {
    return this.questions[this.currentIndex];
  }

  saveAnswer(answer) {
    this.userAnswers[this.currentIndex] = answer;
  }

  hasNext() {
    return this.currentIndex < this.questions.length - 1;
  }

  next() {
    if (this.hasNext()) {
      this.currentIndex++;
    }
  }

  isFinished() {
    return this.currentIndex >= this.questions.length - 1;
  }

  _isAnswerCorrect(question, answer) {
    if (answer == null) return false;
    if (question.type === "boolean") {
      return answer === question.correct;
    }
    if (question.type === "single") {
      return answer === question.correctIndex;
    }
    if (question.type === "multiple") {
      return arraysEqualAsSet(answer, question.correctIndices);
    }
    return false;
  }

  formatCorrectAnswer(question) {
    if (question.type === "boolean") {
      return question.correct ? "Sant" : "Falskt";
    }
    if (question.type === "single") {
      return question.options[question.correctIndex];
    }
    if (question.type === "multiple") {
      return question.correctIndices.map((i) => question.options[i]).join(", ");
    }
    return "";
  }

  formatUserAnswer(question, answer) {
    if (answer == null) return "(Ej svarat i tid)";
    if (question.type === "boolean") {
      return answer ? "Sant" : "Falskt";
    }
    if (question.type === "single") {
      return question.options[answer] ?? "(Ogiltigt svar)";
    }
    if (question.type === "multiple") {
      if (!Array.isArray(answer) || answer.length === 0) return "(Inga val)";
      return answer.map((i) => question.options[i]).join(", ");
    }
    return "";
  }

  calculateResults() {
    let correctCount = 0;
    const details = this.questions.map((q, index) => {
      const answer = this.userAnswers[index];
      const isCorrect = this._isAnswerCorrect(q, answer);
      if (isCorrect) correctCount++;
      return {
        question: q,
        answer,
        isCorrect,
        correctAnswer: this.formatCorrectAnswer(q),
        userAnswerText: this.formatUserAnswer(q, answer),
      };
    });

    const total = this.questions.length;
    const percentage = Math.round((correctCount / total) * 100);

    return {
      correctCount,
      total,
      percentage,
      details,
    };
  }
}
