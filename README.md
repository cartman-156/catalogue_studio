# Catalog Studio

A browser-only visual editor for `products.json` files. Catalog Studio allows non-technical users to browse, edit, and manage product catalogs without requiring a backend or database.

## Features

- 📥 **Import/Export**: Load and save `products.json` files with drag-and-drop support
- ✏️ **Visual Editing**: Edit products with a clean, intuitive interface
- ➕ **Add Products**: Create new products with automatic ID generation
- 🗑️ **Delete Products**: Remove products from the catalog
- 📋 **Duplicate Products**: Quickly create copies with automatic ID pattern detection
- 🔧 **Dynamic Fields**: Automatically detect and edit any field type
- ✅ **Smart Validation**: Built-in validation for IDs, required fields, and data integrity
- ↩️ **Undo/Redo**: Full undo/redo support with keyboard shortcuts (Ctrl+Z / Ctrl+Y)
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 💾 **Auto-Save**: Automatically persists changes to browser localStorage
- 🎨 **Professional UI**: Clean, accessible interface designed for non-technical users
- 🚀 **No Backend Required**: Everything runs in your browser - no server needed

## Quick Start

1. **Visit the app**: https://yourusername.github.io/Catalog_Studio/
2. **Import your products**: Click "Import JSON" and select your `products.json` file
3. **Edit products**: Click any product to edit it in the visual editor
4. **Export**: Click "Export" to download your updated `products.json`

## Installation & Development

### Prerequisites

- Node.js 16+ ([Download](https://nodejs.org/))
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/catalog-studio.git
cd catalog-studio

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

## Usage Guide

### Importing Products

1. Click the **"Import JSON"** button in the sidebar
2. Select your `products.json` file
3. Products are automatically parsed and displayed

**File Format**: Your JSON must have this structure:
```json
{
  "products": [
    {
      "id": "prod_001",
      "name": "Product Name",
      "price": 99.99,
      "...": "other fields"
    }
  ]
}
```

### Editing Products

1. **Select a product** from the list on the left
2. **Edit fields** in the editor on the right:
   - **Text fields**: Type directly
   - **Numbers**: Use number input
   - **Booleans**: Check/uncheck
   - **Arrays**: Add/remove items, drag to reorder
   - **Images**: Automatic image preview for image URLs
   - **Objects**: Expand/collapse nested properties
3. **Changes auto-save** to your browser
4. See the yellow indicator when changes are unsaved

### Creating Products

1. Click **"+ New Product"** in the sidebar
2. Enter a product name
3. Edit the product fields immediately
4. New products get automatic unique IDs

### Duplicating Products

1. Select a product
2. Click **"Duplicate"** button
3. A copy is created with a new ID
4. IDs are intelligently incremented:
   - `prod_001` → `prod_002`
   - `sku-123` → `sku-124`
   - Custom prefixes are preserved

### Deleting Products

1. Select a product
2. Click **"Delete"** button
3. Confirm deletion

### Searching & Filtering

1. Use the **search box** to find products by:
   - Product ID
   - Product name/title
   - Category
2. Use the **category dropdown** to filter by category

### Validation

1. Click **"Validate"** button in the toolbar
2. Issues appear in the Validation panel at the bottom
3. Validation checks for:
   - Duplicate IDs
   - Missing required fields
   - Malformed data
4. Click on any issue to jump to that product

### Undo/Redo

- Press **Ctrl+Z** (or Cmd+Z on Mac) to undo
- Press **Ctrl+Y** (or Cmd+Shift+Z on Mac) to redo
- Or use the buttons in the toolbar
- Up to 50 actions are kept in history

### Exporting

1. Click **"Export"** button in the toolbar
2. Your `products.json` file downloads automatically
3. File includes your products with all edits

### Data Persistence

Your changes are **automatically saved** to:
- Browser localStorage (temporary, survives page refresh)
- Your computer (when you download the file)

**Important**: Clearing browser cache will erase unsaved changes. Always export when done!

## Field Type Support

Catalog Studio automatically detects and renders fields based on their type:

| Type | Editor |
|------|--------|
| **String** | Text input (auto-detects multi-line) |
| **Number** | Number spinner input |
| **Boolean** | Checkbox |
| **Array** | Add/remove/reorder items (drag-and-drop) |
| **Images** | Image URLs with preview grid |
| **Object** | Nested expandable properties |
| **null/undefined** | Text input (editable) |

### Image Arrays

Arrays of image URLs are automatically detected and shown as:
- Preview grid with thumbnails
- URL editors
- Reorder buttons
- Remove buttons

Detected formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.svg`, `.webp`

## Architecture

### Field Registry Pattern

Adding new field types is easy:

1. Create a new component in `src/components/fields/MyField.tsx`
2. Update `src/utils/fieldRegistry.ts`
3. No other files need changes!

### State Management

- **Context API** for global state
- **localStorage** for persistence
- **History tracking** for undo/redo
- All state updates are immutable

### Type Safety

- Full TypeScript strict mode
- All operations are type-safe
- Compile-time error checking

## npm Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check (no build)
npm run type-check
```

## Deployment

### GitHub Pages

1. Push your code to GitHub
2. Go to repository **Settings** → **Pages**
3. Set source to `gh-pages` branch
4. To deploy:
   ```bash
   npm run build
   # Copy dist/ contents to gh-pages branch or use a GitHub Action
   ```

### Other Hosting

1. Run `npm run build`
2. Upload contents of `dist/` folder to your server
3. Serve over HTTPS for best compatibility

### Environment

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020 JavaScript support
- No backend server required
- No authentication required

## Troubleshooting

### "Failed to import file"
- Check JSON is valid: Use a JSON validator
- Ensure file has a `products` array at root
- File should be UTF-8 encoded

### "Export not downloading"
- Check browser's download settings
- Try a different browser
- Ensure pop-ups aren't blocked

### "Changes disappeared"
- Browser cache was cleared
- LocalStorage was disabled
- Too many tabs open (localStorage limit)
- **Solution**: Export regularly to save locally

### "Product names look wrong"
- Check your JSON encoding
- Ensure product `name` or `title` field exists
- Remove any non-printable characters

## Performance

- Handles up to 1000+ products smoothly
- ~2MB uncompressed app size
- ~500KB gzipped
- Single-page app - fast navigation
- No external API calls

## Browser Support

| Browser | Status |
|---------|--------|
| Chrome 90+ | ✅ Full support |
| Firefox 88+ | ✅ Full support |
| Safari 14+ | ✅ Full support |
| Edge 90+ | ✅ Full support |
| Mobile Safari | ✅ Full support |
| Mobile Chrome | ✅ Full support |

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Undo | Ctrl+Z (Cmd+Z) |
| Redo | Ctrl+Y (Cmd+Shift+Z) |
| Export | (Button click) |
| Search | Focus search box |

## Sample Data

A sample `products.json` file is included in the `src/data/` folder. You can use it to test the application.

## FAQ

**Q: Is my data sent to a server?**  
A: No! Everything runs locally in your browser.

**Q: Can I edit the JSON directly?**  
A: Currently, the visual editor is the only interface. Direct JSON editing might be added in future versions.

**Q: How many products can I manage?**  
A: Theoretically unlimited, but practical limit is ~1000+ before experiencing slowdowns.

**Q: Can I backup my products?**  
A: Yes! Click "Export" to save a local copy. This is recommended regularly.

**Q: What happens if I close the browser?**  
A: Your changes are saved to localStorage automatically and will be restored when you return. But always export for permanent backup!

**Q: Can I use this offline?**  
A: Yes! After loading once, it can work offline (with some limitations).

## Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Ensure TypeScript compilation succeeds (`npm run type-check`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Development Notes

### Project Structure

```
src/
├── components/          # React UI components
│   ├── fields/         # Field type editors
│   └── *.tsx           # Main components
├── context/            # Global state management
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── styles/             # CSS (Tailwind + custom)
├── data/               # Sample data
└── main.tsx            # Entry point
```

### Key Design Decisions

1. **No external state library**: Context API is simpler for this use case
2. **Client-only**: No backend = faster, no servers to maintain
3. **localStorage**: Simple persistence without databases
4. **Type-first design**: TypeScript strict mode prevents bugs
5. **Field registry pattern**: New field types don't require core changes

### Future Enhancements

- [ ] CSV import/export
- [ ] Field templates
- [ ] Product templates
- [ ] Batch operations
- [ ] Dark mode
- [ ] More validation rules
- [ ] Custom field validators
- [ ] Multi-language support
- [ ] Keyboard shortcuts editor

## License

MIT License - feel free to use in commercial projects!

## Support

- 📧 Email: support@example.com
- 🐛 Report bugs: Open an issue on GitHub
- 💡 Feature requests: Discuss on GitHub

---

Built with ❤️ by developers, for non-technical product managers and content editors.
