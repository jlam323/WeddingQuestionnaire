/**
 * Quiz question definitions.
 *
 * Question 1 uses `type: 'unique'` and renders via <QuestionOne />
 * with the runaway "No" button interaction.
 *
 * Standard questions use `type: 'multiple-choice'` and render via
 * <MultipleChoiceQuestion />.
 *
 * Option fields:
 * - `fail` (optional boolean): If true, selecting this option denies the invitation.
 * - `feedback` (optional string): Custom feedback displayed on the result screen
 *   when this option is chosen (shown on both denied and approved screens).
 */
export const questions = [
  {
    id: 'q1',
    type: 'unique',
    label: 'Question 1',
    prompt: 'Do you want to come to my wedding?',
    options: [
      {
        id: 'q1-yes',
        label: 'Yes',
      },
      {
        id: 'q1-no',
        label: 'No',
        fail: true,
      },
    ],
  },
  {
    id: 'q2',
    type: 'multiple-choice',
    label: 'Question 2',
    prompt: 'How excited are you for my wedding?',
    options: [
      {
        id: 'q2-so-excited',
        label: 'SO excited!!',
      },
      {
        id: 'q2-cant-wait',
        label: 'Can’t wait',
      },
      {
        id: 'q2-food',
        label: 'I’m mainly excited for the food',
      },
      {
        id: 'q2-open-bar',
        label: 'Open bar?',
        feedback: 'Hell yes it’s an open bar. We’ll get shots together!',
      },
      {
        id: 'q2-forgot',
        label: 'I forgot you were getting married',
        feedback: 'You forgot we’re getting married but we’ll have you anyways.',
      },
    ],
  },
  {
    id: 'q3',
    type: 'multiple-choice',
    label: 'Question 3',
    prompt: 'Are you going to cry during the ceremony?',
    options: [
      {
        id: 'q3-obviously',
        label: 'Obviously',
      },
      {
        id: 'q3-sobbing',
        label: 'Absolutely sobbing',
      },
      {
        id: 'q3-hold-together',
        label: 'I’ll try to hold it together',
      },
      {
        id: 'q3-everyone-else',
        label: 'Only if everyone else cries',
      },
      {
        id: 'q3-no',
        label: 'No <3',
        feedback: 'If you don’t cry during the ceremony, I’ll poke your eyes to help.',
      },
    ],
  },
  {
    id: 'q4',
    type: 'multiple-choice',
    label: 'Question 4',
    prompt: 'What are you bringing as a wedding gift?',
    options: [
      {
        id: 'q4-cash',
        label: 'Cash, obviously',
      },
      {
        id: 'q4-registry',
        label: 'Something from the registry',
      },
      {
        id: 'q4-cute',
        label: 'Something cute I found',
      },
      {
        id: 'q4-panic-buy',
        label: 'I’ll panic buy something on the way',
      },
      {
        id: 'q4-presence',
        label: 'My presence is the gift',
      },
    ],
  },
  {
    id: 'q5',
    type: 'multiple-choice',
    label: 'Question 5',
    prompt: 'What color dress will you wear to my wedding?',
    options: [
      {
        id: 'q5-white',
        label: 'White',
        fail: true,
        feedback: 'White!? At MY wedding?!',
      },
      {
        id: 'q5-red',
        label: 'Red',
      },
      {
        id: 'q5-black',
        label: 'Black',
      },
      {
        id: 'q5-bright-pink',
        label: 'Bright pink',
      },
      {
        id: 'q5-whatever',
        label: 'Whatever you tell me to',
      },
    ],
  },
];
