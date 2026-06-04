/**
 * Sidebar - Left sidebar with project info, stats, and quick actions
 */

import { useRef } from 'react';
import { useProductsContext } from '@/context';
import { readFileAsJson } from '@/utils';
import { getErrorCount } from '@/utils/validation';

export default function Sidebar() {
  const {
    products,
    validationIssues,
    addProduct,
    importProducts,
    validateAll,
  } = useProductsContext();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const errorCount = getErrorCount(validationIssues);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await readFileAsJson(file);
      importProducts(data);
      alert(`Successfully imported ${data.products.length} products!`);
    } catch (error) {
      alert(
        `Failed to import file: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleNewProduct = () => {
    addProduct({
      id: undefined,
      name: 'New Product',
    });
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
      {/* Logo / Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Catalog Studio</h1>
        <p className="text-sm text-gray-500 mt-1">Visual Product Editor</p>
      </div>

      {/* Project Stats */}
      <div className="space-y-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Products</p>
          <p className="text-2xl font-bold text-blue-600">{products.length}</p>
        </div>

        {errorCount > 0 && (
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Validation Errors</p>
            <p className="text-2xl font-bold text-red-600">{errorCount}</p>
          </div>
        )}

        {validationIssues.length > 0 && errorCount === 0 && (
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Warnings</p>
            <p className="text-2xl font-bold text-yellow-600">{validationIssues.length}</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="space-y-3 mb-8">
        <button
          onClick={handleNewProduct}
          className="w-full btn-primary"
        >
          + New Product
        </button>

        <button
          onClick={handleImportClick}
          className="w-full btn-secondary"
        >
          📥 Import JSON
        </button>

        <button
          onClick={validateAll}
          className="w-full btn-secondary"
        >
          ✓ Validate
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Help / Info */}
      <div className="mt-auto pt-8 border-t border-gray-200">
        {products.length === 0 ? (
          <p className="text-xs text-gray-500">
            💡 Upload a products.json file to get started
          </p>
        ) : (
          <p className="text-xs text-gray-500">
            ✓ {products.length} product{products.length !== 1 ? 's' : ''} loaded
          </p>
        )}
      </div>
    </aside>
  );
}
