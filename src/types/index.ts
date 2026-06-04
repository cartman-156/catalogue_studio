/**
 * Types for Catalog Studio product editor
 */

import type { ComponentType } from 'react';

export type FieldType = 'string' | 'number' | 'boolean' | 'array' | 'object';

export interface ProductField {
  name: string;
  type: FieldType;
  required?: boolean;
  description?: string;
}

export interface Product {
  [key: string]: unknown;
  id?: string;
}

export interface ProductCollection {
  products: Product[];
  fields?: ProductField[];
  metadata?: {
    version?: string;
    createdAt?: string;
    updatedAt?: string;
  };
}

export interface ValidationIssue {
  productId: string;
  field: string;
  message: string;
  type: 'error' | 'warning';
}

export interface EditorState {
  currentProductId: string | null;
  isDirty: boolean;
  selectedFields: string[];
  validationIssues: ValidationIssue[];
}

export interface FieldConfig {
  type: FieldType;
  label: string;
  component: ComponentType<{
    value: unknown;
    onChange: (value: unknown) => void;
    fieldName?: string;
    [key: string]: unknown;
  }>;
  validator?: (value: unknown) => ValidationIssue[];
}
