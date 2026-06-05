/**
 * Validation utilities for products and fields
 */

import { Product, ValidationIssue } from "@/types";

/**
 * Validate a single product
 */
export const validateProduct = (
  product: Product,
  allProducts: Product[] = []
): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];
  const productId: string = typeof product.id === "string" ? product.id : "unknown";

  // Check for missing ID
  if (typeof product.id !== "string" || product.id.trim() === "") {
    issues.push({
      productId,
      field: "id",
      message: "Product ID is required",
      type: "error",
    });
  }

  // Check for duplicate IDs
  if (typeof product.id === "string") {
    const duplicateIds = allProducts.filter(
      (p) => p !== product && p.id === product.id
    );

    if (duplicateIds.length > 0) {
      issues.push({
        productId,
        field: "id",
        message: `Duplicate ID: ${product.id}`,
        type: "error",
      });
    }
  }

  // Check for missing title/name field
  const hasTitle =
    (typeof product.title === "string" && product.title.trim() !== "") ||
    (typeof product.name === "string" && product.name.trim() !== "");

  if (!hasTitle) {
    issues.push({
      productId,
      field: "title",
      message: "Product should have a title or name field",
      type: "warning",
    });
  }

  // Check for null or invalid values
  for (const [key, value] of Object.entries(product)) {
    if (value === null) {
      issues.push({
        productId,
        field: key,
        message: `Field "${key}" is null`,
        type: "warning",
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

  // Normalize IDs safely
  const ids: string[] = products
    .map((p) => p.id)
    .filter((id): id is string => typeof id === "string" && id.length > 0);

  // Find duplicates safely
  const duplicateIds = ids.filter((id, i) => ids.indexOf(id) !== i);

  for (const product of products) {
    const productIssues = validateProduct(product, products);
    issues.push(...productIssues);

    if (typeof product.id === "string" && duplicateIds.includes(product.id)) {
      const alreadyReported = issues.some(
        (i) => i.productId === product.id && i.field === "id"
      );

      if (!alreadyReported) {
        issues.push({
          productId: product.id,
          field: "id",
          message: "Duplicate ID found in collection",
          type: "error",
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

  // Required check
  if (
    rules?.required &&
    (value === null || value === undefined || value === "")
  ) {
    issues.push({
      productId,
      field: fieldName,
      message: `"${fieldName}" is required`,
      type: "error",
    });
  }

  // Type checks
  if (rules?.type === "string" && typeof value !== "string") {
    issues.push({
      productId,
      field: fieldName,
      message: `"${fieldName}" must be a string`,
      type: "error",
    });
  }

  if (rules?.type === "number" && typeof value !== "number") {
    issues.push({
      productId,
      field: fieldName,
      message: `"${fieldName}" must be a number`,
      type: "error",
    });
  }

  // Length checks
  if (
    typeof value === "string" &&
    typeof rules?.minLength === "number" &&
    value.length < rules.minLength
  ) {
    issues.push({
      productId,
      field: fieldName,
      message: `"${fieldName}" must be at least ${rules.minLength} characters`,
      type: "error",
    });
  }

  if (
    typeof value === "string" &&
    typeof rules?.maxLength === "number" &&
    value.length > rules.maxLength
  ) {
    issues.push({
      productId,
      field: fieldName,
      message: `"${fieldName}" must be at most ${rules.maxLength} characters`,
      type: "error",
    });
  }

  return issues;
};

/**
 * Check if product has validation errors
 */
export const hasValidationIssues = (
  issues: ValidationIssue[],
  productId: string
): boolean => {
  return issues.some(
    (issue) => issue.productId === productId && issue.type === "error"
  );
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
  return issues.filter((issue) => issue.type === "error").length;
};

/**
 * Get validation warning count
 */
export const getWarningCount = (issues: ValidationIssue[]): number => {
  return issues.filter((issue) => issue.type === "warning").length;
};
