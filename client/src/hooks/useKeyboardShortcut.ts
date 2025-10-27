import { useEffect } from 'react';

type KeyboardShortcutOptions = {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
  preventDefault?: boolean;
};

/**
 * Custom hook for keyboard shortcuts
 * @param options - Keyboard shortcut configuration
 * @param callback - Function to call when shortcut is pressed
 */
export const useKeyboardShortcut = (
  options: KeyboardShortcutOptions,
  callback: () => void
) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const { key, ctrl, shift, alt, meta, preventDefault = true } = options;

      const ctrlMatch = ctrl ? event.ctrlKey : !event.ctrlKey;
      const shiftMatch = shift ? event.shiftKey : !event.shiftKey;
      const altMatch = alt ? event.altKey : !event.altKey;
      const metaMatch = meta ? event.metaKey : !event.metaKey;

      if (
        event.key.toLowerCase() === key.toLowerCase() &&
        ctrlMatch &&
        shiftMatch &&
        altMatch &&
        metaMatch
      ) {
        if (preventDefault) {
          event.preventDefault();
        }
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [options, callback]);
};
