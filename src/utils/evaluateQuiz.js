/**
 * Evaluates a single question's answer.
 *
 * @param {object} question
 * @param {any} answer
 * @param {Record<string, any>} allAnswers
 * @returns {{
 *   answered: boolean,
 *   failed: boolean,
 *   questionId: string,
 *   questionLabel: string,
 *   prompt: string,
 *   selectedLabel: string,
 *   feedback: string,
 * }}
 */
export function evaluateQuestion(question, answer, allAnswers = {}) {
  const isAnswered = answer !== undefined && answer !== null && answer !== '';

  if (typeof question.evaluate === 'function') {
    const outcome = question.evaluate(answer, allAnswers);
    const failed = Boolean(outcome.failed);
    return {
      answered: isAnswered,
      failed,
      questionId: question.id,
      questionLabel: question.label || question.id,
      prompt: question.prompt,
      selectedLabel: outcome.selectedLabel ?? String(answer ?? ''),
      feedback: failed
        ? outcome.feedback || 'That response did not quite pass the test.'
        : outcome.feedback || '',
    };
  }

  const selectedOption = question.options?.find((opt) => opt.id === answer);
  const failed = isAnswered && (!selectedOption || Boolean(selectedOption.fail));

  return {
    answered: isAnswered && Boolean(selectedOption),
    failed,
    questionId: question.id,
    questionLabel: question.label || question.id,
    prompt: question.prompt,
    selectedLabel: selectedOption?.label ?? 'No answer selected',
    feedback: failed
      ? selectedOption?.feedback ||
        question.defaultWrongFeedback ||
        'Not quite the answer we were hoping for!'
      : selectedOption?.feedback || '',
  };
}

/**
 * Evaluates all answered quiz questions and builds custom feedback
 * based on the specific responses the guest selected.
 *
 * Supports early failure (when a failing answer stops the quiz before
 * later questions are reached) without creating bogus feedback for
 * unanswered questions.
 *
 * @param {Array} questionList
 * @param {Record<string, any>} answers - Map of questionId -> selected optionId
 */
export function evaluateQuiz(questionList, answers) {
  const failedItems = [];
  const noteItems = [];
  let answeredCount = 0;

  for (const question of questionList) {
    const outcome = evaluateQuestion(question, answers[question.id], answers);

    if (!outcome.answered) {
      continue;
    }

    answeredCount += 1;

    if (outcome.failed) {
      failedItems.push(outcome);
    } else if (outcome.feedback) {
      noteItems.push(outcome);
    }
  }

  return {
    passed: failedItems.length === 0 && answeredCount === questionList.length,
    failedItems,
    noteItems,
    feedbackItems: [...failedItems, ...noteItems],
  };
}
