
import confetti from 'canvas-confetti';

export const triggerConfetti = (options = {}) => {
  const defaults = {
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  };

  confetti({
    ...defaults,
    ...options
  });
};
