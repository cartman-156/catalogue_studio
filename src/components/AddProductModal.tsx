/**
 * AddProductModal - Modal for creating new products
 */

import { useMemo, useState } from 'react';
import { useProductsContext } from '@/context';
import { Product } from '@/types';
import { generateId } from '@/utils';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const getEmptyValue = (value: unknown) => {
  if (Array.isArray(value)) return [];
  if (value === null || value === undefined) return '';
  if (typeof value === 'boolean') return false;
  if (typeof value === 'number') return 0;
  if (typeof value === 'object') return {};
  return '';
};

const cloneStructure = (product: Product, name: string, id: string): Product => {
  const newProduct: Record<string, unknown> = { id, name };

  Object.entries(product).forEach(([key, value]) => {
    if (key === 'id') return;
    if (key === 'name') {
      newProduct.name = name;
      return;
    }
    if (key === 'title') {
      newProduct.title = '';
      return;
    }
    newProduct[key] = getEmptyValue(value);
  });

  return newProduct as Product;
};

export default function AddProductModal({ isOpen, onClose }: AddProductModalProps) {
  const { addProduct, products, currentProductId } = useProductsContext();
  const [productName, setProductName] = useState('New Product');
  const [productId, setProductId] = useState(() => generateId());

  const selectedProduct = useMemo(() => {
    const current = products.find((product) => product.id === currentProductId);
    return current || products[0];
  }, [products, currentProductId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim()) {
      alert('Please enter a product name');
      return;
    }

    const newProduct = selectedProduct
      ? cloneStructure(selectedProduct, productName.trim(), productId.trim() || generateId())
      : { id: productId.trim() || generateId(), name: productName.trim() };

    addProduct(newProduct);
    setProductName('New Product');
    setProductId(generateId());
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Create New Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Product Name
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
              autoFocus
              className="input-field"
            />
          </div>
        </form>

        {/* Buttons */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium"
          >
            Create Product
          </button>
        </div>
      </div>
    </div>
  );
}
