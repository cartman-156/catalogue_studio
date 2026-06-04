/**
 * ValidationPanel - Shows validation issues and errors
 */

import { useProductsContext } from '@/context';
import { getErrorCount } from '@/utils/validation';

export default function ValidationPanel() {
  const { validationIssues, selectProduct, products } = useProductsContext();

  const errorCount = getErrorCount(validationIssues);
  const warningCount = validationIssues.filter((i) => i.type === 'warning').length;

  const handleIssueClick = (productId: string) => {
    selectProduct(productId);
  };

  return (
    <div className="bg-white overflow-y-auto h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
        <h3 className="font-medium text-gray-900">Validation</h3>
        <div className="flex gap-4 text-sm">
          {errorCount > 0 && (
            <span className="text-red-600 font-medium">{errorCount} Error{errorCount !== 1 ? 's' : ''}</span>
          )}
          {warningCount > 0 && (
            <span className="text-yellow-600 font-medium">{warningCount} Warning{warningCount !== 1 ? 's' : ''}</span>
          )}
          {validationIssues.length === 0 && (
            <span className="text-green-600 font-medium">✓ All Clear</span>
          )}
        </div>
      </div>

      {/* Issues List */}
      <div className="divide-y divide-gray-100">
        {validationIssues.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-500">
            <p className="text-sm">No validation issues found</p>
          </div>
        ) : (
          validationIssues.map((issue, index) => {
            const product = products.find((p) => p.id === issue.productId);
            const productName = (product?.name || product?.title || '(Unnamed)') as string;

            return (
              <button
                key={index}
                onClick={() => handleIssueClick(issue.productId)}
                className="w-full text-left px-6 py-4 hover:bg-gray-50 transition"
              >
                <div className="flex items-start gap-3">
                  <span className={`text-lg flex-shrink-0 ${
                    issue.type === 'error' ? 'text-red-500' : 'text-yellow-500'
                  }`}>
                    {issue.type === 'error' ? '✕' : '⚠'}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">{productName}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                        {issue.field}
                      </span>
                    </p>
                    <p className="text-xs text-gray-600 mt-1">{issue.message}</p>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
