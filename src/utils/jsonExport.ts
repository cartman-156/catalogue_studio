/**
 * JSON Export utility for downloading products.json files
 */

import { ProductCollection } from '@/types';

/**
 * Convert ProductCollection to JSON string
 * TODO: Add formatting options (pretty print, etc.)
 */
export const productCollectionToJson = (collection: ProductCollection): string => {
  return JSON.stringify(collection, null, 2);
};

/**
 * Download JSON as file
 * TODO: Add custom filename support
 */
export const downloadJson = (data: ProductCollection, filename: string = 'products.json'): void => {
  const jsonString = productCollectionToJson(data);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Copy JSON to clipboard
 * TODO: Add success/error feedback
 */
export const copyJsonToClipboard = (data: ProductCollection): Promise<void> => {
  const jsonString = productCollectionToJson(data);
  return navigator.clipboard.writeText(jsonString);
};
