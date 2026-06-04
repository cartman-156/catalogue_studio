/**
 * useValidation hook - Manages product validation state
 * TODO: Implement comprehensive validation logic
 */

import { useState, useCallback } from 'react';
import { Product, ValidationIssue } from '@/types';
import { validateProducts } from '@/utils/validation';

interface UseValidationResult {
  issues: ValidationIssue[];
  validate: (products: Product[]) => void;
  clearIssues: () => void;
  getIssuesForProduct: (productId: string) => ValidationIssue[];
  hasErrors: (productId?: string) => boolean;
}

export const useValidation = (): UseValidationResult => {
  const [issues, setIssues] = useState<ValidationIssue[]>([]);

  const validate = useCallback((products: Product[]) => {
    const validationIssues = validateProducts(products);
    setIssues(validationIssues);
    // TODO: Persist validation results
  }, []);

  const clearIssues = useCallback(() => {
    setIssues([]);
  }, []);

  const getIssuesForProduct = useCallback(
    (productId: string): ValidationIssue[] => {
      return issues.filter((issue) => issue.productId === productId);
    },
    [issues]
  );

  const hasErrors = useCallback(
    (productId?: string): boolean => {
      if (productId) {
        return getIssuesForProduct(productId).some((issue) => issue.type === 'error');
      }
      return issues.some((issue) => issue.type === 'error');
    },
    [issues, getIssuesForProduct]
  );

  return {
    issues,
    validate,
    clearIssues,
    getIssuesForProduct,
    hasErrors,
  };
};
