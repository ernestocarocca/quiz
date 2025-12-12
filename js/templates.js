/**
 * Helper: Render a single input field (radio or checkbox)
 */
function renderInputField({ type, name, id, value, checked, label }) {
  return `
    <div class="form-check">
      <input class="form-check-input" type="${type}" name="${name}" id="${id}" value="${value}" ${checked ? 'checked' : ''}>
      <label class="form-check-label" for="${id}">${label}</label>
    </div>
  `;
}

/**
 * Helper: Render boolean question
 */
function renderBooleanOptions(storedAnswer) {
  const options = [
    { value: 'true', label: 'Sant', isChecked: storedAnswer === true },
    { value: 'false', label: 'Falskt', isChecked: storedAnswer === false }
  ];
  
  return options
    .map((opt) => renderInputField({
      type: 'radio',
      name: 'answer',
      id: `bool${opt.value}`,
      value: opt.value,
      checked: opt.isChecked,
      label: opt.label
    }))
    .join('');
}

/**
 * Helper: Render single choice options
 */
function renderSingleOptions(options, storedAnswer) {
  return options
    .map((opt, idx) => renderInputField({
      type: 'radio',
      name: 'answer',
      id: `single-${idx}`,
      value: idx,
      checked: storedAnswer === idx,
      label: opt
    }))
    .join('');
}

/**
 * Helper: Render multiple choice options
 */
function renderMultipleOptions(options, storedAnswer) {
  return options
    .map((opt, idx) => renderInputField({
      type: 'checkbox',
      name: 'answer',
      id: `multi-${idx}`,
      value: idx,
      checked: Array.isArray(storedAnswer) && storedAnswer.includes(idx),
      label: opt
    }))
    .join('');
}

/**
 * Build HTML for the current question card.
 */
export function renderQuestionHtml({ q, index, total, storedAnswer }) {
  const questionTypes = {
    boolean: () => renderBooleanOptions(storedAnswer),
    single: () => renderSingleOptions(q.options, storedAnswer),
    multiple: () => renderMultipleOptions(q.options, storedAnswer)
  };

  const optionsHtml = questionTypes[q.type]?.() || '';

  return `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title mb-2">Fråga ${index + 1}</h5>
        <p class="card-text">${q.text}</p>
        <div class="mt-3">
          ${optionsHtml}
        </div>
      </div>
    </div>
  `;
}

/**
 * Helper: Get result status based on percentage
 */
function getResultStatus(percentage) {
  if (percentage < 50) {
    return { alertClass: 'alert-danger', message: 'Underkänt - Du behöver öva mer!' };
  } else if (percentage < 75) {
    return { alertClass: 'alert-warning', message: 'Bra jobbat! Du är på rätt väg.' };
  } else {
    return { alertClass: 'alert-success', message: 'Riktigt bra jobbat! Utmärkt resultat!' };
  }
}

/**
 * Helper: Render a single question detail card
 */
function renderDetailCard(detail, index) {
  const borderClass = detail.isCorrect ? "border-success" : "border-danger";
  const icon = detail.isCorrect ? "✅" : "❌";

  return `
    <div class="card mb-2 border ${borderClass}">
      <div class="card-body">
        <h6>${icon} Fråga ${index + 1}</h6>
        <p class="mb-2">${detail.question.text}</p>
        <p class="mb-1"><strong>Ditt svar:</strong> ${detail.userAnswerText}</p>
        <p class="mb-0"><strong>Rätt svar:</strong> ${detail.correctAnswer}</p>
      </div>
    </div>
  `;
}

/**
 * Helper: Render summary section
 */
function renderSummary(correctCount, total, percentage, message, alertClass) {
  return `
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
}

/**
 * Build HTML for the results screen (summary + details).
 */
export function renderResultsHtml({ correctCount, total, percentage, details }) {
  const { alertClass, message } = getResultStatus(percentage);
  
  const summaryHtml = renderSummary(correctCount, total, percentage, message, alertClass);
  const detailsHtml = details.map(renderDetailCard).join('');

  return summaryHtml + detailsHtml;
}