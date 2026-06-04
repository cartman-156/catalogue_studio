/**
 * Type inference for product fields
 * Infers field types from actual data values
 */

import { FieldType } from '@/types';

/**
 * Infer the field type from a value
 * TODO: Enhance with more sophisticated type inference
 */
export const inferFieldType = (value: unknown): FieldType => {
  if (value === null || value === undefined) {
    return 'string';
  }

  if (typeof value === 'string') {
    return 'string';
  }

  if (typeof value === 'number') {
    return 'number';
  }

  if (typeof value === 'boolean') {
    return 'boolean';
  }

  if (Array.isArray(value)) {
    return 'array';
  }

  if (typeof value === 'object') {
    return 'object';
  }

  return 'string';
};

/**
 * Check if a value matches an expected field type
 */
export const isValueOfType = (value: unknown, type: FieldType): boolean => {
  const inferredType = inferFieldType(value);
  return inferredType === type;
};

/**
 * Infer all field types from products
 */
export const inferFieldsFromProducts = (products: Record<string, unknown>[]): Record<string, FieldType> => {
  const fieldTypes: Record<string, FieldType> = {};

  for (const product of products) {
    for (const [key, value] of Object.entries(product)) {
      if (!fieldTypes[key]) {
        fieldTypes[key] = inferFieldType(value);
      }
    }
  }

  return fieldTypes;
};
