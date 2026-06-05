/**
 * ProductList - Lists all products with search and filtering
 */

import { useState, useMemo } from "react";
import { useProductsContext } from "@/context";

export default function ProductList() {
  const { products, currentProductId, selectProduct } = useProductsContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Normalize ID safely
  const getId = (id: unknown): string => {
    return typeof id === "string" && id.trim() !== "" ? id : "";
  };

  // Normalize name safely
  const getName = (product: any): string => {
    if (typeof product.name === "string" && product.name.trim()) return product.name;
    if (typeof product.title === "string" && product.title.trim()) return product.title;
    return "(Unnamed)";
  };

  // Normalize category safely
  const getCategory = (product: any): string => {
    if (typeof product.category === "string" && product.category.trim()) return product.category;
    if (typeof product.type === "string" && product.type.trim()) return product.type;
    return "Uncategorized";
  };

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();

    for (const product of products) {
      cats.add(getCategory(product));
    }

    return Array.from(cats).sort();
  }, [products]);

  // Filter and search products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const id = getId(product.id);
      const name = getName(product).toLowerCase();
      const category = getCategory(product).toLowerCase();

      // Category filter
      if (categoryFilter !== "all") {
        if (category !== categoryFilter.toLowerCase()) {
          return false;
        }
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();

        return (
          id.toLowerCase().includes(query) ||
          name.includes(query) ||
          category.includes(query)
        );
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
              {products.length === 0
                ? "No products loaded"
                : "No products match your search"}
            </p>
            <p className="text-xs mt-2">
              {products.length === 0
                ? "Import a products.json file to get started"
                : ""}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredProducts.map((product, index) => {
              const id = getId(product.id);
              const name = getName(product);
              const category = getCategory(product);

              return (
                <button
                  key={id || index}
                  onClick={() => {
                    if (id) selectProduct(id);
                  }}
                  className={`w-full text-left p-3 border-l-4 transition ${
                    id === currentProductId
                      ? "bg-blue-50 border-l-blue-600"
                      : "border-l-transparent hover:bg-gray-50"
                  }`}
                >
                  <p className="font-medium text-sm truncate">{name}</p>

                  <p className="text-xs text-gray-500 truncate">
                    ID: {id || "N/A"}
                  </p>

                  {category && (
                    <p className="text-xs text-gray-400">{category}</p>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  )
}
