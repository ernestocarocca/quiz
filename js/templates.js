
function renderInputField({ type, name, id, value, checked, label }) {
  return `
    <label class="form-check" for="${id}">
      <input class="form-check-input" type="${type}" name="${name}" id="${id}" value="${value}" ${checked ? 'checked' : ''} hidden>
      <div class="form-check-content">
        <div class="form-check-radio"></div>
        <span class="form-check-label">${label}</span>
      </div>
    </label>
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


export function renderQuestionHtml({ q, index, total, storedAnswer }) {
  const questionTypes = {
    boolean: () => renderBooleanOptions(storedAnswer),
    single: () => renderSingleOptions(q.options, storedAnswer),
    multiple: () => renderMultipleOptions(q.options, storedAnswer)
  };

  const optionsHtml = questionTypes[q.type]?.() || '';

  return `
    <div class="question-wrapper">
      <div class="question-header mb-4">
        <span class="badge bg-primary mb-2">
          <i class="bi bi-question-circle-fill me-1"></i>Fråga ${index + 1} av ${total}
        </span>
        <h5 class="question-text fw-bold">${q.text}</h5>
      </div>
      <div class="options-container">
        ${optionsHtml}
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
  const bgClass = detail.isCorrect ? "success" : "danger";
  const icon = detail.isCorrect ? '<i class="bi bi-check-circle-fill text-success"></i>' : '<i class="bi bi-x-circle-fill text-danger"></i>';

  return `
    <div class="card mb-3 border ${borderClass}">
      <div class="card-body">
        <div class="d-flex align-items-start gap-3">
          <div class="detail-icon-wrapper">
            ${icon}
          </div>
          <div class="flex-grow-1">
            <h6 class="fw-bold mb-2">Fråga ${index + 1}</h6>
            <p class="mb-3">${detail.question.text}</p>
            <div class="detail-answers">
              <div class="mb-2">
                <strong><i class="bi bi-person-fill me-1"></i>Ditt svar:</strong> 
                <span class="${detail.isCorrect ? 'text-success' : 'text-danger'}">${detail.userAnswerText}</span>
              </div>
              <div>
                <strong><i class="bi bi-check-circle me-1"></i>Rätt svar:</strong> 
                <span class="text-success">${detail.correctAnswer}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Helper: Render summary section
 */
function renderSummary(correctCount, total, percentage, message, alertClass) {
  const getIcon = () => {
    if (percentage >= 75) return '<i class="bi bi-trophy-fill"></i>';
    if (percentage >= 50) return '<i class="bi bi-star-fill"></i>';
    return '<i class="bi bi-exclamation-triangle-fill"></i>';
  };

  return `
    <div class="alert ${alertClass} mb-4">
      <div class="text-center mb-3">
        <div class="result-icon mb-3">
          ${getIcon()}
        </div>
        <h4 class="alert-heading fw-bold mb-3">Ditt resultat</h4>
        <div class="result-score-big">
          ${correctCount}<span class="text-muted">/${total}</span>
        </div>
        <p class="fs-4 mb-2">${percentage}% rätt</p>
        <p class="mb-0">${message}</p>
      </div>
      <div class="d-flex gap-2 justify-content-center mt-4">
        <button id="retryBtn" class="btn btn-gradient px-4 py-2">
          <i class="bi bi-arrow-clockwise me-2"></i>Kör om
        </button>
        <button id="exitBtn" class="btn btn-outline-secondary px-4 py-2">
          <i class="bi bi-x-circle me-2"></i>Avsluta
        </button>
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