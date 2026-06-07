/**
 * JSON Import utility for loading products.json files
 */

import { ProductCollection } from '@/types';

/**
 * Parse JSON file content
 * Supports both direct array format [{}] and object format { "products": [{}] }
 */
export const parseJsonFile = (content: string): ProductCollection => {
  try {
    const data = JSON.parse(content);

    let products;

    // Handle direct array format: [{ id, title, ... }]
    if (Array.isArray(data)) {
      products = data;
    }
    // Handle object format: { "products": [{ id, title, ... }] }
    else if (data.products && Array.isArray(data.products)) {
      products = data.products;
    }
    // Invalid format
    else {
      throw new Error('Invalid format: expected either a direct array or an object with "products" array');
    }

    // Return as ProductCollection with metadata
    return {
      products,
      metadata: {
        version: '1.0',
        lastUpdated: new Date().toISOString(),
        itemCount: products.length,
      },
    } as ProductCollection;
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
