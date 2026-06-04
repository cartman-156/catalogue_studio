/**
 * App - Main application component
 * TODO: Wire up all context and state management
 */

import { ProductsProvider } from '@/context/ProductsProvider';
import Sidebar from '@/components/Sidebar';
import Toolbar from '@/components/Toolbar';
import ProductList from '@/components/ProductList';
import ProductEditor from '@/components/ProductEditor';
import ValidationPanel from '@/components/ValidationPanel';
import ErrorBoundary from '@/components/ErrorBoundary';
import '@/styles/globals.css';

export default function App() {
  return (
    <ErrorBoundary>
      <ProductsProvider>
        <div className="flex h-screen bg-gray-50">
          {/* Left Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Top Toolbar */}
            <Toolbar />

            {/* Content Area */}
            <div className="flex-1 overflow-hidden flex">
              {/* Product List */}
              <div className="w-64 border-r border-gray-200 overflow-y-auto">
                <ProductList />
              </div>

              {/* Product Editor */}
              <div className="flex-1 overflow-y-auto">
                <ProductEditor />
              </div>
            </div>

            {/* Validation Panel */}
            <div className="border-t border-gray-200 max-h-48">
              <ValidationPanel />
            </div>
          </div>
        </div>
      </ProductsProvider>
    </ErrorBoundary>
  );
}
