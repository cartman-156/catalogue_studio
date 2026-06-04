/**
 * Validation utilities for products and fields
 */

import { Product, ValidationIssue } from '@/types';

/**
 * Validate a single product
 */
export const validateProduct = (product: Product, allProducts: Product[] = []): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];
  const productId = (product.id as string) || 'unknown';

  // Check for missing ID
  if (!product.id) {
    issues.push({
      productId,
      field: 'id',
      message: 'Product ID is required',
      type: 'error',
    });
  }

  // Check for duplicate IDs
  const duplicateIds = allProducts.filter((p) => p.id === product.id && p !== product);
  if (duplicateIds.length > 0) {
    issues.push({
      productId,
      field: 'id',
      message: `Duplicate ID: ${product.id}`,
      type: 'error',
    });
  }

  // Check for missing title/name field
  const hasTitle = 'title' in product || 'name' in product;
  if (!hasTitle) {
    issues.push({
      productId,
      field: 'title',
      message: 'Product should have a title or name field',
      type: 'warning',
    });
  }

  // Check for malformed arrays
  for (const [key, value] of Object.entries(product)) {
    if (Array.isArray(value)) {
      if (!Array.isArray(value)) {
        issues.push({
          productId,
          field: key,
          message: `Field "${key}" should be an array`,
          type: 'error',
        });
      }
    }

    // Check for null values
    if (value === null) {
      issues.push({
        productId,
        field: key,
        message: `Field "${key}" is null`,
        type: 'warning',
      });
    }
  }

  return issues;
};

/**
 * Validate all products in a collection
 */
export const validateProducts = (products: Product[]): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];

  // Check for duplicate IDs across all products
  const ids = products.map((p) => p.id).filter((id) => id !== undefined);
  const duplicateIds = ids.filter((id, i) => ids.indexOf(id) !== i);

  for (const product of products) {
    const productIssues = validateProduct(product, products);
    issues.push(...productIssues);

    // Additional duplicate ID detection
    if (duplicateIds.includes(product.id)) {
      const existing = issues.find(
        (i) => i.productId === (product.id as string) && i.field === 'id'
      );
      if (!existing) {
        issues.push({
          productId: (product.id as string) || 'unknown',
          field: 'id',
          message: `Duplicate ID found in collection`,
          type: 'error',
        });
      }
    }
  }

  return issues;
};

/**
 * Validate a single field value
 */
export const validateField = (
  value: unknown,
  fieldName: string,
  productId: string,
  rules?: Record<string, unknown>
): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];

  // Check for required field
  if (rules?.required && (value === null || value === undefined || value === '')) {
    issues.push({
      productId,
      field: fieldName,
      message: `"${fieldName}" is required`,
      type: 'error',
    });
  }

  // Type-specific validation
  if (rules?.type === 'string' && typeof value !== 'string') {
    issues.push({
      productId,
      field: fieldName,
      message: `"${fieldName}" must be a string`,
      type: 'error',
    });
  }

  if (rules?.type === 'number' && typeof value !== 'number') {
    issues.push({
      productId,
      field: fieldName,
      message: `"${fieldName}" must be a number`,
      type: 'error',
    });
  }

  if (rules?.minLength && typeof value === 'string' && value.length < (rules.minLength as number)) {
    issues.push({
      productId,
      field: fieldName,
      message: `"${fieldName}" must be at least ${rules.minLength} characters`,
      type: 'error',
    });
  }

  if (rules?.maxLength && typeof value === 'string' && value.length > (rules.maxLength as number)) {
    issues.push({
      productId,
      field: fieldName,
      message: `"${fieldName}" must be at most ${rules.maxLength} characters`,
      type: 'error',
    });
  }

  return issues;
};

/**
 * Check if product has validation errors
 */
export const hasValidationIssues = (issues: ValidationIssue[], productId: string): boolean => {
  return issues.some((issue) => issue.productId === productId && issue.type === 'error');
};

/**
 * Get validation issues for a product
 */
export const getProductIssues = (
  issues: ValidationIssue[],
  productId: string
): ValidationIssue[] => {
  return issues.filter((issue) => issue.productId === productId);
};

/**
 * Get validation error count
 */
export const getErrorCount = (issues: ValidationIssue[]): number => {
  return issues.filter((issue) => issue.type === 'error').length;
};

/**
 * Get validation warning count
 */
export const getWarningCount = (issues: ValidationIssue[]): number => {
  return issues.filter((issue) => issue.type === 'warning').length;
};
