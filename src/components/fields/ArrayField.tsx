/**
 * ArrayField - Array editor with add/remove/reorder
 */

import { useState } from 'react';
import { inferFieldType } from '@/utils';
import StringField from './StringField';
import NumberField from './NumberField';
import BooleanField from './BooleanField';
import ImageArrayField from './ImageArrayField';

interface ArrayFieldProps {
  value: unknown;
  onChange: (value: unknown[]) => void;
  fieldName?: string;
}

export default function ArrayField({
  value,
  onChange,
  fieldName,
}: ArrayFieldProps) {
  const arrayValue = Array.isArray(value) ? value : [];
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleAddItem = () => {
    const newItem = arrayValue.length > 0 ? '' : '';
    onChange([...arrayValue, newItem]);
  };

  const handleRemoveItem = (index: number) => {
    onChange(arrayValue.filter((_, i) => i !== index));
  };

  const handleUpdateItem = (index: number, newValue: unknown) => {
    const updated = [...arrayValue];
    updated[index] = newValue;
    onChange(updated);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetIndex: number) => {
    if (draggedIndex === null) return;
    const updated = [...arrayValue];
    const [draggedItem] = updated.splice(draggedIndex, 1);
    updated.splice(targetIndex, 0, draggedItem);
    onChange(updated);
    setDraggedIndex(null);
  };

  // Detect if this is an image array
  const isImageArray =
    arrayValue.length > 0 &&
    arrayValue.every(
      (item) =>
        typeof item === 'string' &&
        /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(item)
    );

  if (isImageArray) {
    return <ImageArrayField value={arrayValue} onChange={onChange} />;
  }

  return (
    <div className="space-y-3">
      {arrayValue.length === 0 ? (
        <div className="bg-gray-50 p-4 rounded text-center text-gray-500 text-sm">
          No items. Click "Add Item" to create one.
        </div>
      ) : (
        <div className="space-y-3">
          {arrayValue.map((item, index) => (
            <div
              key={index}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
              className="flex gap-2 p-3 bg-gray-50 rounded border border-gray-200 hover:border-gray-300 transition cursor-move"
            >
              <div className="flex-1 min-w-0">
                {typeof item === 'string' && (
                  <StringField
                    value={item}
                    onChange={(v) => handleUpdateItem(index, v)}
                  />
                )}
                {typeof item === 'number' && (
                  <NumberField
                    value={item}
                    onChange={(v) => handleUpdateItem(index, v)}
                  />
                )}
                {typeof item === 'boolean' && (
                  <BooleanField
                    value={item}
                    onChange={(v) => handleUpdateItem(index, v)}
                  />
                )}
                {typeof item === 'object' && item !== null && (
                  <pre className="text-xs bg-white p-2 rounded border border-gray-200 overflow-auto max-h-24">
                    {JSON.stringify(item, null, 2)}
                  </pre>
                )}
              </div>
              <button
                type="button"
                onClick={() => handleRemoveItem(index)}
                className="px-2 py-1 text-red-600 hover:bg-red-50 rounded transition text-sm font-medium"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={handleAddItem}
        className="w-full px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-blue-500 hover:text-blue-600 transition font-medium"
      >
        + Add Item
      </button>
    </div>
  );
}
