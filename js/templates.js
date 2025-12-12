// js/templates.js

/**
 * Build HTML for the current question card.
 * Pure function: returns a string, no DOM access.
 */
export function renderQuestionHtml({ q, index, total, storedAnswer }) {
  let html = `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title mb-2">Fråga ${index + 1}</h5>
        <p class="card-text">${q.text}</p>
        <div class="mt-3">
  `;

  // boolean (true/false)
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

  // single choice
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

  // multiple choice
  if (q.type === "multiple") {
    html += q.options
      .map((opt, idx) => {
        const isChecked = Array.isArray(storedAnswer) && storedAnswer.includes(idx);
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

  return html;
}

/**
 * Decide result styling based on percentage.
 */
function getResultStatus(percentage) {
  if (percentage > 75) return { alertClass: "alert-success", message: "Riktigt bra jobbat!" };
  if (percentage >= 50) return { alertClass: "alert-warning", message: "Bra!" };
  return { alertClass: "alert-danger", message: "Underkänt – fortsätt öva!" };
}

/**
 * Build HTML for the results screen (summary + details).
 * Pure function: returns a string, no DOM access.
 */
export function renderResultsHtml({ correctCount, total, percentage, details }) {
  const { alertClass, message } = getResultStatus(percentage);

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

  return summaryHtml + detailsHtml;
}
