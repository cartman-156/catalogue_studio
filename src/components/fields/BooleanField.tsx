/**
 * BooleanField - Checkbox field editor
 */

interface BooleanFieldProps {
  value: unknown;
  onChange: (value: boolean) => void;
  fieldName?: string;
  label?: string;
}

export default function BooleanField({
  value,
  onChange,
  fieldName,
  label,
}: BooleanFieldProps) {
  const boolValue = typeof value === 'boolean' ? value : false;

  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        checked={boolValue}
        onChange={(e) => onChange(e.target.checked)}
        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
      />
      <span className="text-sm font-medium text-gray-700">
        {label || fieldName || 'Enable this option'}
      </span>
    </label>
  );
}
