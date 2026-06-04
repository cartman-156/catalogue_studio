/**
 * useUndoRedo hook - Manages undo/redo state
 * TODO: Implement complete undo/redo functionality
 */

import { useState, useCallback } from 'react';

interface UseUndoRedoResult<T> {
  state: T;
  setState: (newState: T) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  clearHistory: () => void;
}

export const useUndoRedo = <T>(initialState: T, maxHistory: number = 50): UseUndoRedoResult<T> => {
  const [history, setHistory] = useState<T[]>([initialState]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const state = history[currentIndex];

  const setState = useCallback(
    (newState: T) => {
      const newHistory = history.slice(0, currentIndex + 1);
      newHistory.push(newState);

      if (newHistory.length > maxHistory) {
        newHistory.shift();
      } else {
        setCurrentIndex(newHistory.length - 1);
      }

      setHistory(newHistory);
      // TODO: Persist to localStorage
    },
    [history, currentIndex, maxHistory]
  );

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      // TODO: Update global state
    }
  }, [currentIndex]);

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      // TODO: Update global state
    }
  }, [currentIndex, history.length]);

  const clearHistory = useCallback(() => {
    setHistory([state]);
    setCurrentIndex(0);
  }, [state]);

  return {
    state,
    setState,
    undo,
    redo,
    canUndo: currentIndex > 0,
    canRedo: currentIndex < history.length - 1,
    clearHistory,
  };
};
