import React from 'react';

const OPTION_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function MultipleChoiceQuestion({ question, selectedValue, onSelect }) {
  return (
    <div className="question-body">
      <h2 className="question-prompt">{question.prompt}</h2>
      {question.subtitle && <p className="question-subtitle">{question.subtitle}</p>}

      <div className="options-list" role="radiogroup" aria-label={question.prompt}>
        {question.options.map((option, idx) => {
          const isSelected = selectedValue === option.id;
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`option-card ${isSelected ? 'is-selected' : ''}`}
              onClick={() => onSelect(option.id)}
            >
              <span className="option-badge" aria-hidden="true">
                {OPTION_LETTERS[idx] ?? idx + 1}
              </span>
              <span className="option-label">{option.label}</span>
              <span className="option-check" aria-hidden="true">
                {isSelected ? '✓' : ''}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
