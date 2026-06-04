/**
 * useLocalStorage hook - Syncs state with localStorage
 */

import { useState, useCallback, useEffect } from 'react';
import { loadFromLocalStorage, saveToLocalStorage } from '@/utils/localStorage';

interface UseLocalStorageResult<T> {
  value: T;
  setValue: (newValue: T) => void;
  removeValue: () => void;
}

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): UseLocalStorageResult<T> => {
  const [value, setValue] = useState<T>(() => {
    return loadFromLocalStorage(key, initialValue);
  });

  const handleSetValue = useCallback(
    (newValue: T) => {
      setValue(newValue);
      saveToLocalStorage(key, newValue);
    },
    [key]
  );

  const removeValue = useCallback(() => {
    setValue(initialValue);
    localStorage.removeItem(key);
  }, [key, initialValue]);

  // Listen for changes in other tabs/windows
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue) {
        try {
          setValue(JSON.parse(event.newValue) as T);
        } catch (error) {
          console.error(`Failed to parse localStorage value for key ${key}`);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return {
    value,
    setValue: handleSetValue,
    removeValue,
  };
};
