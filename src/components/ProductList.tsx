/**
 * ProductList - Lists all products with search and filtering
 */

import { useState, useMemo } from 'react';
import { useProductsContext } from '@/context';

export default function ProductList() {
  const { products, currentProductId, selectProduct } = useProductsContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    for (const product of products) {
      const category = product.category || product.type || 'Uncategorized';
      if (typeof category === 'string') {
        cats.add(category);
      }
    }
    return Array.from(cats).sort();
  }, [products]);

  // Filter and search products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (categoryFilter !== 'all') {
        const productCategory = (product.category || product.type || 'Uncategorized') as string;
        if (productCategory !== categoryFilter) {
          return false;
        }
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const id = String(product.id || '').toLowerCase();
        const name = String(product.name || product.title || '').toLowerCase();
        const category = String(product.category || product.type || '').toLowerCase();

        return id.includes(query) || name.includes(query) || category.includes(query);
      }

      return true;
    });
  }, [products, searchQuery, categoryFilter]);

  return (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200 space-y-3">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Category Filter */}
        {categories.length > 0 && (
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Products List */}
      <div className="flex-1 overflow-y-auto">
        {filteredProducts.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <p className="text-sm">
              {products.length === 0 ? 'No products loaded' : 'No products match your search'}
            </p>
            <p className="text-xs mt-2">
              {products.length === 0 ? 'Import a products.json file to get started' : ''}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => selectProduct(product.id as string)}
                className={`w-full text-left p-3 border-l-4 transition ${
                  product.id === currentProductId
                    ? 'bg-blue-50 border-l-blue-600'
                    : 'border-l-transparent hover:bg-gray-50'
                }`}
              >
                <p className="font-medium text-sm truncate">
                  {(product.name || product.title || '(Unnamed)') as string}
                </p>
                <p className="text-xs text-gray-500 truncate">ID: {product.id || 'N/A'}</p>
                {product.category && (
                  <p className="text-xs text-gray-400">
                    {String(product.category)}
                  </p>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
