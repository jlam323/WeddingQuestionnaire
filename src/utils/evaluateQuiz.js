/**
 * Evaluates all submitted quiz answers and builds custom feedback
 * based on the specific responses the guest selected.
 *
 * An answer fails if the selected option has `fail: true` (or if no option
 * was selected). Custom `feedback` is collected for any selected option that
 * defines it, so playful notes can appear on both approved and denied screens.
 *
 * @param {Array} questionList
 * @param {Record<string, any>} answers - Map of questionId -> selected optionId
 * @returns {{
 *   passed: boolean,
 *   failedItems: Array<{
 *     questionId: string,
 *     questionLabel: string,
 *     prompt: string,
 *     selectedLabel: string,
 *     feedback: string,
 *     failed: boolean,
 *   }>,
 *   noteItems: Array<{
 *     questionId: string,
 *     questionLabel: string,
 *     prompt: string,
 *     selectedLabel: string,
 *     feedback: string,
 *     failed: boolean,
 *   }>,
 *   feedbackItems: Array<{
 *     questionId: string,
 *     questionLabel: string,
 *     prompt: string,
 *     selectedLabel: string,
 *     feedback: string,
 *     failed: boolean,
 *   }>
 * }}
 */
export function evaluateQuiz(questionList, answers) {
  const failedItems = [];
  const noteItems = [];

  for (const question of questionList) {
    const answer = answers[question.id];

    if (typeof question.evaluate === 'function') {
      const outcome = question.evaluate(answer, answers);
      const item = {
        questionId: question.id,
        questionLabel: question.label || question.id,
        prompt: question.prompt,
        selectedLabel: outcome.selectedLabel ?? String(answer ?? ''),
        feedback: outcome.feedback || '',
        failed: Boolean(outcome.failed),
      };

      if (item.failed) {
        failedItems.push({
          ...item,
          feedback: item.feedback || 'That response did not quite pass the test.',
        });
      } else if (item.feedback) {
        noteItems.push(item);
      }
      continue;
    }

    const selectedOption = question.options?.find((opt) => opt.id === answer);
    const failed = !selectedOption || Boolean(selectedOption.fail);

    if (failed) {
      failedItems.push({
        questionId: question.id,
        questionLabel: question.label || question.id,
        prompt: question.prompt,
        selectedLabel: selectedOption?.label ?? 'No answer selected',
        feedback:
          selectedOption?.feedback ||
          question.defaultWrongFeedback ||
          'Not quite the answer we were hoping for!',
        failed: true,
      });
    } else if (selectedOption.feedback) {
      noteItems.push({
        questionId: question.id,
        questionLabel: question.label || question.id,
        prompt: question.prompt,
        selectedLabel: selectedOption.label,
        feedback: selectedOption.feedback,
        failed: false,
      });
    }
  }

  return {
    passed: failedItems.length === 0,
    failedItems,
    noteItems,
    feedbackItems: [...failedItems, ...noteItems],
  };
}
