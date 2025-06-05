/**
 * Keyboard accessibility helpers
 * 
 * This file contains helper functions for keyboard accessibility in React components.
 */

/**
 * Keys to check for in keyboard events
 */
export const Keys = {
  Escape: ['Escape', 'Esc'],
  Enter: ['Enter'],
  Space: [' ', 'Spacebar'],
  Tab: ['Tab'],
  ArrowUp: ['ArrowUp', 'Up'],
  ArrowDown: ['ArrowDown', 'Down'],
  ArrowLeft: ['ArrowLeft', 'Left'],
  ArrowRight: ['ArrowRight', 'Right'],
  Home: ['Home'],
  End: ['End'],
  PageUp: ['PageUp'],
  PageDown: ['PageDown'],
} as const;

export type KeyboardKey = keyof typeof Keys;

/**
 * Checks if a keyboard event matches a specific key
 * @param event The keyboard event to check
 * @param key The key to check for
 * @returns Whether the event matches the key
 */
export function isKey(event: React.KeyboardEvent, key: KeyboardKey): boolean {
  return Keys[key].includes(event.key);
}

/**
 * Handles keyboard interactions for clickable elements
 * This can be useful for divs that should be keyboard accessible
 * 
 * @param handler The handler function to call on Enter or Space
 * @returns A keyboard event handler
 */
export function createKeyboardHandler(
  handler: (event: React.KeyboardEvent) => void
): (event: React.KeyboardEvent) => void {
  return (event: React.KeyboardEvent) => {
    if (isKey(event, 'Enter') || isKey(event, 'Space')) {
      event.preventDefault();
      handler(event);
    }
  };
}

/**
 * Make a div or other non-interactive element act like a button
 * for accessibility. This adds role="button" and tabIndex={0}
 * and handles keyboard events.
 * 
 * @example
 * <div 
 *   {...makeButtonProps(() => console.log('clicked'))}
 *   className="my-custom-button"
 * >
 *   Click me!
 * </div>
 */
export function makeButtonProps(onClick: (event: React.MouseEvent | React.KeyboardEvent) => void): {
  role: string;
  tabIndex: number;
  onClick: (event: React.MouseEvent) => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
} {
  return {
    role: "button",
    tabIndex: 0,
    onClick: onClick,
    onKeyDown: (event) => {
      if (isKey(event, 'Enter') || isKey(event, 'Space')) {
        event.preventDefault();
        onClick(event);
      }
    },
  };
}