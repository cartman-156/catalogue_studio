/**
 * ImageArrayField - Specialized editor for image arrays with previews
 */

interface ImageArrayFieldProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function ImageArrayField({
  value,
  onChange,
}: ImageArrayFieldProps) {
  const handleAddImage = () => {
    onChange([...value, '']);
  };

  const handleRemoveImage = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleUpdateImage = (index: number, url: string) => {
    const updated = [...value];
    updated[index] = url;
    onChange(updated);
  };

  const handleMove = (fromIndex: number, toIndex: number) => {
    const updated = [...value];
    const [item] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, item);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {/* Image Grid Preview */}
      {value.length > 0 && (
        <div className="grid grid-cols-4 gap-3">
          {value.map((url, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
                {url && /^https?:\/\//.test(url) ? (
                  <img
                    src={url}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs text-center p-2">
                    Invalid URL
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 rounded-lg transition flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleMove(index, index - 1)}
                    className="p-1 bg-white rounded hover:bg-gray-100"
                    title="Move left"
                  >
                    ←
                  </button>
                )}
                {index < value.length - 1 && (
                  <button
                    type="button"
                    onClick={() => handleMove(index, index + 1)}
                    className="p-1 bg-white rounded hover:bg-gray-100"
                    title="Move right"
                  >
                    →
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                  title="Remove image"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image URL Inputs */}
      <div className="space-y-2">
        {value.map((url, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={url}
              onChange={(e) => handleUpdateImage(index, e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="input-field text-sm"
            />
          </div>
        ))}
      </div>

      {/* Add Button */}
      <button
        type="button"
        onClick={handleAddImage}
        className="w-full px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-blue-500 hover:text-blue-600 transition font-medium"
      >
        📷 Add Image URL
      </button>
    </div>
  );
}
