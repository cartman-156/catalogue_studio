/**
 * StringField - Text input field editor
 */

interface StringFieldProps {
  value: unknown;
  onChange: (value: string) => void;
  fieldName?: string;
  isMultiline?: boolean;
}

export default function StringField({
  value,
  onChange,
  fieldName,
  isMultiline = false,
}: StringFieldProps) {
  const stringValue = typeof value === 'string' ? value : '';

  if (isMultiline) {
    return (
      <textarea
        value={stringValue}
        onChange={(e) => onChange(e.target.value)}
        className="input-field resize-none"
        rows={4}
        placeholder="Enter text..."
      />
    );
  }

  return (
    <input
      type="text"
      value={stringValue}
      onChange={(e) => onChange(e.target.value)}
      className="input-field"
      placeholder="Enter text..."
    />
  );
}
