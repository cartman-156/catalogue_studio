/**
 * NumberField - Number input field editor
 */

interface NumberFieldProps {
  value: unknown;
  onChange: (value: number) => void;
  fieldName?: string;
  min?: number;
  max?: number;
  step?: number;
}

export default function NumberField({
  value,
  onChange,
  fieldName,
  min,
  max,
  step = 1,
}: NumberFieldProps) {
  const numberValue = typeof value === 'number' ? value : 0;

  return (
    <input
      type="number"
      value={numberValue}
      onChange={(e) => onChange(Number(e.target.value))}
      className="input-field"
      min={min}
      max={max}
      step={step}
      placeholder="Enter a number..."
    />
  );
}
