/**
 * ProductsProvider - Context provider component with full state management
 * Handles products, validation, undo/redo, and persistence
 */

import { ReactNode, useCallback, useEffect, useState, useRef } from 'react';
import { Product, ProductCollection, ValidationIssue } from '@/types';
import { ProductsContext, ProductsContextType } from './ProductsContext';
import { generateId, validateProducts, saveToLocalStorage, loadFromLocalStorage } from '@/utils';

const STORAGE_KEY = 'catalog-studio-state';
const MAX_HISTORY = 50;

interface HistoryState {
  products: Product[];
  currentProductId: string | null;
}

interface ProductsProviderProps {
  children: ReactNode;
}

export const ProductsProvider = ({ children }: ProductsProviderProps) => {
  // State
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);
  const [validationIssues, setValidationIssues] = useState<ValidationIssue[]>([]);
  const [isDirty, setIsDirty] = useState(false);

  // Load persisted state on mount
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const savedState = loadFromLocalStorage<HistoryState>(STORAGE_KEY, {
        products: [],
        currentProductId: null,
      });
      setHistory([savedState]);
      setCurrentHistoryIndex(0);
      setIsDirty(false);
    }
  }, []);

  // Current state
  const currentState = history[currentHistoryIndex] || {
    products: [],
    currentProductId: null,
  };
  const { products, currentProductId } = currentState;

  // Helper to push to history
  const pushToHistory = useCallback(
    (newProducts: Product[], newCurrentId: string | null = currentProductId) => {
      const newState: HistoryState = {
        products: newProducts,
        currentProductId: newCurrentId,
      };

      // Remove any future history when making new changes
      const newHistory = history.slice(0, currentHistoryIndex + 1);
      newHistory.push(newState);

      // Limit history size
      if (newHistory.length > MAX_HISTORY) {
        newHistory.shift();
      } else {
        setCurrentHistoryIndex(newHistory.length - 1);
      }

      setHistory(newHistory);
      setIsDirty(true);

      // Persist to localStorage
      saveToLocalStorage(STORAGE_KEY, newState);
    },
    [history, currentHistoryIndex, currentProductId]
  );

  const importProducts = useCallback((collection: ProductCollection) => {
    const importedProducts = collection.products.map((p) => ({
      ...p,
      id: p.id || generateId(),
    }));
    pushToHistory(importedProducts, null);
    setValidationIssues([]);
  }, [pushToHistory]);

  const exportProducts = useCallback((): ProductCollection => {
    return {
      products,
      metadata: {
        version: '1.0',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };
  }, [products]);

  const addProduct = useCallback(
    (product: Product) => {
      const newProduct = {
        ...product,
        id: product.id || generateId(),
      };
      pushToHistory([...products, newProduct], newProduct.id as string);
    },
    [products, pushToHistory]
  );

  const updateProduct = useCallback(
    (id: string, updates: Partial<Product>) => {
      const updated = products.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      );
      pushToHistory(updated, id);
    },
    [products, pushToHistory]
  );

  const deleteProduct = useCallback(
    (id: string) => {
      const filtered = products.filter((p) => p.id !== id);
      pushToHistory(filtered, null);
    },
    [products, pushToHistory]
  );

  const duplicateProduct = useCallback(
    (id: string) => {
      const product = products.find((p) => p.id === id);
      if (product) {
        const newProduct = {
          ...product,
          id: generateId(),
        };
        pushToHistory([...products, newProduct], newProduct.id as string);
      }
    },
    [products, pushToHistory]
  );

  const selectProduct = useCallback(
    (id: string | null) => {
      // Update current state without adding to history
      const newState: HistoryState = {
        products,
        currentProductId: id,
      };
      // Update only the current history entry's selection, not history itself
      setHistory((prev) => {
        const updated = [...prev];
        updated[currentHistoryIndex] = newState;
        return updated;
      });
    },
    [products, currentHistoryIndex]
  );

  const validateAll = useCallback(() => {
    const issues = validateProducts(products);
    setValidationIssues(issues);
  }, [products]);

  const clearValidation = useCallback(() => {
    setValidationIssues([]);
  }, []);

  const undo = useCallback(() => {
    if (currentHistoryIndex > 0) {
      const newIndex = currentHistoryIndex - 1;
      setCurrentHistoryIndex(newIndex);
      saveToLocalStorage(STORAGE_KEY, history[newIndex]);
    }
  }, [currentHistoryIndex, history]);

  const redo = useCallback(() => {
    if (currentHistoryIndex < history.length - 1) {
      const newIndex = currentHistoryIndex + 1;
      setCurrentHistoryIndex(newIndex);
      saveToLocalStorage(STORAGE_KEY, history[newIndex]);
    }
  }, [currentHistoryIndex, history]);

  const value: ProductsContextType = {
    products,
    currentProductId,
    validationIssues,
    isDirty,
    importProducts,
    exportProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    duplicateProduct,
    selectProduct,
    validateAll,
    clearValidation,
    undo,
    redo,
    canUndo: currentHistoryIndex > 0,
    canRedo: currentHistoryIndex < history.length - 1,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
