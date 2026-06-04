/**
 * ObjectField - Recursive object editor with nested fields
 */

import { useState } from 'react';
import { inferFieldType } from '@/utils';
import StringField from './StringField';
import NumberField from './NumberField';
import BooleanField from './BooleanField';
import ArrayField from './ArrayField';

interface ObjectFieldProps {
  value: unknown;
  onChange: (value: Record<string, unknown>) => void;
  fieldName?: string;
  level?: number;
}

export default function ObjectField({
  value,
  onChange,
  fieldName,
  level = 0,
}: ObjectFieldProps) {
  const objValue = typeof value === 'object' && value !== null
    ? (value as Record<string, unknown>)
    : {};

  const [expandedFields, setExpandedFields] = useState<Set<string>>(new Set());
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldType, setNewFieldType] = useState<string>('string');

  const toggleExpand = (key: string) => {
    const newExpanded = new Set(expandedFields);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedFields(newExpanded);
  };

  const handleUpdateField = (key: string, newValue: unknown) => {
    onChange({ ...objValue, [key]: newValue });
  };

  const handleRemoveField = (key: string) => {
    const updated = { ...objValue };
    delete updated[key];
    onChange(updated);
  };

  const handleAddField = () => {
    if (!newFieldName.trim()) return;
    const defaultValues: Record<string, unknown> = {
      string: '',
      number: 0,
      boolean: false,
      array: [],
      object: {},
    };
    onChange({
      ...objValue,
      [newFieldName]: defaultValues[newFieldType] || '',
    });
    setNewFieldName('');
    setNewFieldType('string');
  };

  const isNested = level > 0;

  return (
    <div className={`space-y-3 ${isNested ? 'pl-4 border-l-2 border-gray-300' : ''}`}>
      {/* Existing Fields */}
      {Object.entries(objValue).map(([key, fieldValue]) => {
        const fieldType = inferFieldType(fieldValue);
        const isExpanded = expandedFields.has(key);

        return (
          <div key={key} className="bg-gray-50 p-3 rounded border border-gray-200">
            <div className="flex items-start justify-between mb-2">
              <button
                type="button"
                onClick={() => toggleExpand(key)}
                className="text-left flex-1 font-medium text-sm text-gray-700 hover:text-gray-900"
              >
                {isExpanded ? '▼' : '▶'} {key}
                <span className="text-xs text-gray-500 ml-2">({fieldType})</span>
              </button>
              <button
                type="button"
                onClick={() => handleRemoveField(key)}
                className="px-2 py-1 text-red-600 hover:bg-red-50 rounded transition text-xs font-medium"
              >
                ✕
              </button>
            </div>

            {isExpanded && (
              <div className="mt-3">
                {fieldType === 'string' && (
                  <StringField
                    value={fieldValue}
                    onChange={(v) => handleUpdateField(key, v)}
                    isMultiline={typeof fieldValue === 'string' && fieldValue.length > 100}
                  />
                )}
                {fieldType === 'number' && (
                  <NumberField
                    value={fieldValue}
                    onChange={(v) => handleUpdateField(key, v)}
                  />
                )}
                {fieldType === 'boolean' && (
                  <BooleanField
                    value={fieldValue}
                    onChange={(v) => handleUpdateField(key, v)}
                    label={key}
                  />
                )}
                {fieldType === 'array' && (
                  <ArrayField
                    value={fieldValue}
                    onChange={(v) => handleUpdateField(key, v)}
                    fieldName={key}
                  />
                )}
                {fieldType === 'object' && (
                  <ObjectField
                    value={fieldValue}
                    onChange={(v) => handleUpdateField(key, v)}
                    fieldName={key}
                    level={level + 1}
                  />
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* Add Field Form */}
      {!isNested && (
        <div className="bg-blue-50 p-4 rounded border-2 border-blue-200">
          <p className="text-sm font-medium text-gray-900 mb-3">Add New Property</p>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newFieldName}
              onChange={(e) => setNewFieldName(e.target.value)}
              placeholder="Property name"
              className="input-field flex-1 text-sm"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddField();
                }
              }}
            />
            <select
              value={newFieldType}
              onChange={(e) => setNewFieldType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="string">Text</option>
              <option value="number">Number</option>
              <option value="boolean">Boolean</option>
              <option value="array">List</option>
              <option value="object">Object</option>
            </select>
          </div>
          <button
            type="button"
            onClick={handleAddField}
            disabled={!newFieldName.trim()}
            className="w-full px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 transition text-sm font-medium"
          >
            Add Property
          </button>
        </div>
      )}
    </div>
  );
}
