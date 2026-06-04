/**
 * ProductEditor - Main editor form for a selected product
 * Dynamically renders fields based on product structure
 */

import { useEffect, useState } from 'react';
import { useProductsContext } from '@/context';
import { inferFieldType } from '@/utils';
import FieldRenderer from './FieldRenderer';

export default function ProductEditor() {
  const {
    products,
    currentProductId,
    updateProduct,
    deleteProduct,
    duplicateProduct,
  } = useProductsContext();

  const currentProduct = products.find((p) => p.id === currentProductId);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  // Auto-clear unsaved changes indicator after a delay
  useEffect(() => {
    if (unsavedChanges) {
      const timer = setTimeout(() => {
        setUnsavedChanges(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [unsavedChanges]);

  if (!currentProduct) {
    return (
      <div className="flex flex-col h-full">
        <div className="bg-white border-b border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900">Select a Product to Edit</h2>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <p className="text-lg">No product selected</p>
            <p className="text-sm mt-2">Select a product from the list to edit</p>
          </div>
        </div>
      </div>
    );
  }

  const productName = (currentProduct.name || currentProduct.title || '(Unnamed)') as string;

  const handleFieldChange = (fieldName: string, value: unknown) => {
    updateProduct(currentProduct.id as string, {
      [fieldName]: value,
    });
    setUnsavedChanges(true);
  };

  const handleDelete = () => {
    if (confirm(`Delete "${productName}"? This cannot be undone.`)) {
      deleteProduct(currentProduct.id as string);
    }
  };

  const handleDuplicate = () => {
    duplicateProduct(currentProduct.id as string);
  };

  // Get field entries
  const fields = Object.entries(currentProduct).filter(([key]) => key !== 'id');

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{productName}</h2>
            <p className="text-sm text-gray-500 mt-1">ID: {currentProduct.id}</p>
          </div>
          {unsavedChanges && (
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
              Unsaved changes
            </span>
          )}
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <form className="space-y-6 max-w-2xl">
          {fields.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
              <p>This product has no fields</p>
            </div>
          ) : (
            fields.map(([fieldName, value]) => (
              <div key={fieldName}>
                <FieldRenderer
                  fieldName={fieldName}
                  fieldType={inferFieldType(value)}
                  value={value}
                  onChange={(newValue) => handleFieldChange(fieldName, newValue)}
                />
              </div>
            ))
          )}
        </form>
      </div>

      {/* Footer with actions */}
      <div className="bg-white border-t border-gray-200 p-4 flex gap-2 justify-end">
        <button
          onClick={handleDuplicate}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition font-medium text-sm"
        >
          📋 Duplicate
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-medium text-sm"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}
