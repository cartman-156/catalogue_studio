/**
 * LocalStorage utilities for persisting application state
 */

/**
 * Save data to localStorage
 * TODO: Add encryption for sensitive data
 */
export const saveToLocalStorage = <T>(key: string, data: T): void => {
  try {
    const jsonString = JSON.stringify(data);
    localStorage.setItem(key, jsonString);
  } catch (error) {
    console.error(`Failed to save to localStorage: ${error}`);
  }
};

/**
 * Load data from localStorage
 */
export const loadFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Failed to load from localStorage: ${error}`);
    return defaultValue;
  }
};

/**
 * Remove data from localStorage
 */
export const removeFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Failed to remove from localStorage: ${error}`);
  }
};

/**
 * Clear all application data from localStorage
 */
export const clearLocalStorage = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error(`Failed to clear localStorage: ${error}`);
  }
};

/**
 * Get all localStorage keys for this application
 */
export const getAllLocalStorageKeys = (prefix?: string): string[] => {
  const keys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (!prefix || key.startsWith(prefix))) {
      keys.push(key);
    }
  }
  return keys;
};
