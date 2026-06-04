/**
 * ImportExportToolbar - Toolbar for import/export operations
 * TODO: Integrate with context and add event handlers
 */

interface ImportExportToolbarProps {
  onImport?: (file: File) => void;
  onExport?: () => void;
}

export default function ImportExportToolbar({ onImport, onExport }: ImportExportToolbarProps) {
  return (
    <div className="flex gap-3">
      {/* Import Button */}
      <div className="relative">
        <input
          type="file"
          accept=".json"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file && onImport) {
              onImport(file);
            }
          }}
          className="hidden"
          id="json-import"
        />
        <label
          htmlFor="json-import"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
        >
          📥 Import
        </label>
      </div>

      {/* Export Button */}
      <button
        onClick={onExport}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        📤 Export
      </button>
    </div>
  );
}
