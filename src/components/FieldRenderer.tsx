/**
 * FieldRenderer - Renders form fields based on field type
 * Uses field registry for extensible field type support
 */

import { FieldType } from '@/types';
import { getFieldConfig } from '@/utils/fieldRegistry';

interface FieldRendererProps {
  fieldName: string;
  fieldType: FieldType;
  value: unknown;
  onChange: (value: unknown) => void;
}

export default function FieldRenderer({
  fieldName,
  fieldType,
  value,
  onChange,
}: FieldRendererProps) {
  const config = getFieldConfig(fieldType);
  const Component = config.component;

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-900 mb-2">
        {fieldName}
        <span className="text-xs text-gray-500 ml-2">({fieldType})</span>
      </label>
      <Component value={value} onChange={onChange} fieldName={fieldName} />
    </div>
  );
}
