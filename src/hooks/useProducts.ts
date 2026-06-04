/**
 * useProducts hook - Manages product collection state
 * TODO: Implement full product management logic
 */

import { useState, useCallback } from 'react';
import { Product, ProductCollection } from '@/types';
import { generateId } from '@/utils/idGenerator';

interface UseProductsResult {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  duplicateProduct: (id: string) => void;
  loadProducts: (collection: ProductCollection) => void;
  getProductById: (id: string) => Product | undefined;
}

export const useProducts = (): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);

  const addProduct = useCallback((product: Product) => {
    const newProduct = {
      ...product,
      id: product.id || generateId(),
    };
    setProducts((prev) => [...prev, newProduct]);
    // TODO: Save to context/state
  }, []);

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    // TODO: Save to context/state
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    // TODO: Save to context/state
  }, []);

  const duplicateProduct = useCallback((id: string) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      const newProduct = {
        ...product,
        id: generateId(),
      };
      setProducts((prev) => [...prev, newProduct]);
      // TODO: Save to context/state
    }
  }, [products]);

  const loadProducts = useCallback((collection: ProductCollection) => {
    setProducts(collection.products);
    // TODO: Store metadata
  }, []);

  const getProductById = useCallback(
    (id: string): Product | undefined => {
      return products.find((p) => p.id === id);
    },
    [products]
  );

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    duplicateProduct,
    loadProducts,
    getProductById,
  };
};
