/**
 * JSON Import utility for loading products.json files
 */

import { ProductCollection } from '@/types';

/**
 * Parse JSON file content
 * TODO: Add comprehensive error handling and validation
 */
export const parseJsonFile = (content: string): ProductCollection => {
  try {
    const data = JSON.parse(content);

    // Validate basic structure
    if (!data.products || !Array.isArray(data.products)) {
      throw new Error('Invalid format: missing "products" array');
    }

    return data as ProductCollection;
  } catch (error) {
    throw new Error(`Failed to parse JSON: ${error instanceof Error ? error.message : String(error)}`);
  }
};

/**
 * Read file from File input element
 * TODO: Add file size validation
 */
export const readFileAsJson = (file: File): Promise<ProductCollection> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const data = parseJsonFile(content);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
};
