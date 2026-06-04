/**
 * useProductsContext hook - Access products context
 */

import { useContext } from 'react';
import { ProductsContext, ProductsContextType } from './ProductsContext';

export const useProductsContext = (): ProductsContextType => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProductsContext must be used within a ProductsProvider');
  }
  return context;
};
