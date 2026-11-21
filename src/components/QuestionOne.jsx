import React, { useCallback, useEffect, useRef, useState } from 'react';

const ARENA_PADDING = 12;
const YES_BUFFER = 16;

/**
 * Dedicated component for Question 1 ("Do you want to come to my wedding?").
 * The "No" button smoothly dodges away whenever the user hovers or taps on it.
 */
export function QuestionOne({ question, selectedValue, onSelect }) {
  const yesOption = question.options[0];
  const noOption = question.options[1];

  const arenaRef = useRef(null);
  const yesBtnRef = useRef(null);
  const noSlotRef = useRef(null);

  const [offset, setOffset] = useState({ dx: 0, dy: 0 });
  const [dodgeCount, setDodgeCount] = useState(0);

  // Reset runaway button position if the viewport resizes
  useEffect(() => {
    const handleResize = () => {
      setOffset({ dx: 0, dy: 0 });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const dodgeNoButton = useCallback(
    (event) => {
      if (event) {
        event.preventDefault();
      }

      const arenaEl = arenaRef.current;
      const yesEl = yesBtnRef.current;
      const noSlotEl = noSlotRef.current;
      if (!arenaEl || !yesEl || !noSlotEl) return;

      const arenaRect = arenaEl.getBoundingClientRect();
      const yesRect = yesEl.getBoundingClientRect();
      const noSlotRect = noSlotEl.getBoundingClientRect();

      const noW = noSlotRect.width;
      const noH = noSlotRect.height;

      const minX = ARENA_PADDING;
      const maxX = Math.max(ARENA_PADDING, arenaRect.width - noW - ARENA_PADDING);
      const minY = ARENA_PADDING;
      const maxY = Math.max(ARENA_PADDING, arenaRect.height - noH - ARENA_PADDING);

      const originX = noSlotRect.left - arenaRect.left;
      const originY = noSlotRect.top - arenaRect.top;
      const currentX = originX + offset.dx;
      const currentY = originY + offset.dy;

      const yesBox = {
        left: yesRect.left - arenaRect.left - YES_BUFFER,
        right: yesRect.right - arenaRect.left + YES_BUFFER,
        top: yesRect.top - arenaRect.top - YES_BUFFER,
        bottom: yesRect.bottom - arenaRect.top + YES_BUFFER,
      };

      const minDistance = Math.min(125, Math.max(65, arenaRect.width * 0.28));

      let bestCandidate = null;
      let bestDistance = -1;

      for (let i = 0; i < 36; i += 1) {
        const x = minX + Math.random() * (maxX - minX);
        const y = minY + Math.random() * (maxY - minY);

        const overlapsYes =
          x < yesBox.right &&
          x + noW > yesBox.left &&
          y < yesBox.bottom &&
          y + noH > yesBox.top;

        if (overlapsYes) continue;

        const distance = Math.hypot(x - currentX, y - currentY);
        if (distance >= minDistance) {
          bestCandidate = { x, y };
          break;
        }

        if (distance > bestDistance) {
          bestDistance = distance;
          bestCandidate = { x, y };
        }
      }

      if (bestCandidate) {
        setOffset({
          dx: Math.round(bestCandidate.x - originX),
          dy: Math.round(bestCandidate.y - originY),
        });
        setDodgeCount((count) => count + 1);
      }
    },
    [offset]
  );

  const isYesSelected = selectedValue === yesOption.id;

  return (
    <div className="question-body question-one">
      <h2 className="question-prompt">{question.prompt}</h2>
      {question.subtitle && <p className="question-subtitle">{question.subtitle}</p>}

      <div className="q1-arena" ref={arenaRef}>
        <div className="q1-buttons-row">
          <button
            ref={yesBtnRef}
            type="button"
            className={`q1-choice-btn q1-yes-btn ${isYesSelected ? 'is-selected' : ''}`}
            aria-pressed={isYesSelected}
            onClick={() => onSelect(yesOption.id)}
          >
            <span>{yesOption.label}</span>
            {isYesSelected && (
              <span className="q1-check" aria-hidden="true">
                ✓
              </span>
            )}
          </button>

          <div className="q1-no-slot" ref={noSlotRef}>
            <button
              type="button"
              className="q1-choice-btn q1-no-btn"
              style={{
                transform: `translate(${offset.dx}px, ${offset.dy}px)`,
              }}
              onMouseEnter={dodgeNoButton}
              onTouchStart={dodgeNoButton}
              onClick={dodgeNoButton}
              onFocus={dodgeNoButton}
            >
              {noOption.label}
            </button>
          </div>
        </div>
      </div>

      <p className={`q1-hint ${dodgeCount >= 3 ? 'is-visible' : ''}`} aria-live="polite">
        {dodgeCount >= 3 ? 'Nice try — looks like “Yes” is the only option.' : '\u00A0'}
      </p>
    </div>
  );
}
