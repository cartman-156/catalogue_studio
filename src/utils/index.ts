/**
 * Utils barrel export
 */

export { fieldRegistry, getFieldConfig, getAvailableFieldTypes } from './fieldRegistry';
export { generateId, isValidId, idExists, ensureUniqueId, detectAndGenerateNextId } from './idGenerator';
export { inferFieldType, isValueOfType, inferFieldsFromProducts } from './typeInference';
export { parseJsonFile, readFileAsJson } from './jsonImport';
export { productCollectionToJson, downloadJson, copyJsonToClipboard } from './jsonExport';
export {
  validateProduct,
  validateProducts,
  validateField,
  hasValidationIssues,
  getProductIssues,
  getErrorCount,
  getWarningCount,
} from './validation';
export {
  saveToLocalStorage,
  loadFromLocalStorage,
  removeFromLocalStorage,
  clearLocalStorage,
  getAllLocalStorageKeys,
} from './localStorage';
