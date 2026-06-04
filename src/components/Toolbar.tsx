/**
 * Toolbar - Top toolbar with undo/redo, export, validation
 */

import React, { useEffect } from 'react';
import { useProductsContext } from '@/context';
import { downloadJson } from '@/utils';

export default function Toolbar() {
  const {
    products,
    isDirty,
    canUndo,
    canRedo,
    undo,
    redo,
    exportProducts,
    validateAll,
  } = useProductsContext();

  const handleExport = () => {
    try {
      const data = exportProducts();
      downloadJson(data, 'products.json');
    } catch (error) {
      alert(`Failed to export: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleUndo = () => {
    if (canUndo) {
      undo();
    }
  };

  const handleRedo = () => {
    if (canRedo) {
      redo();
    }
  };

  // Register keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo]);

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left: Undo/Redo */}
        <div className="flex gap-2">
          <button
            onClick={handleUndo}
            disabled={!canUndo}
            className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded transition disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
            title="Undo (Ctrl+Z)"
          >
            ↶ Undo
          </button>
          <button
            onClick={handleRedo}
            disabled={!canRedo}
            className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded transition disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
            title="Redo (Ctrl+Y)"
          >
            ↷ Redo
          </button>
        </div>

        {/* Center: File Status */}
        <div className="text-center">
          <p className="text-sm font-medium text-gray-900">
            products.json
            {isDirty && <span className="text-yellow-600 ml-2">●</span>}
          </p>
        </div>

        {/* Right: Export/Actions */}
        <div className="flex gap-2">
          <button
            onClick={validateAll}
            className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded transition font-medium text-sm"
            title="Validate products"
          >
            ✓ Validate
          </button>

          <button
            onClick={handleExport}
            disabled={products.length === 0}
            className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:bg-gray-300 font-medium text-sm"
            title="Download products.json"
          >
            ⬇ Export
          </button>
        </div>
      </div>
    </nav>
  );
}
