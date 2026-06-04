/**
 * AddFieldModal - Modal for adding custom fields to products
 * TODO: Implement field name input and type selection
 */

interface AddFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (fieldName: string, fieldType: string) => void;
}

export default function AddFieldModal({ isOpen, onClose, onSubmit }: AddFieldModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Add Field</h2>

        {/* TODO: Implement form with field name and type selection */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Field Name
            </label>
            <input
              type="text"
              placeholder="e.g., description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              // TODO: Implement state
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Field Type
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              {/* TODO: Populate from field registry */}
              <option>string</option>
              <option>number</option>
              <option>boolean</option>
              <option>array</option>
              <option>object</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit('fieldName', 'string')} // TODO: Pass real values
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Add Field
          </button>
        </div>
      </div>
    </div>
  );
}
