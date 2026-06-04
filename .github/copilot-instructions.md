# Catalog Studio - Copilot Instructions

This document provides context and guidelines for developing Catalog Studio.

## Project Overview

Catalog Studio is a browser-only visual editor for `products.json` files. It allows non-technical users to import, browse, edit, and manage product catalogs entirely in the browser without requiring a backend or database.

## Technology Stack

- React 18
- TypeScript (strict mode)
- Vite
- TailwindCSS
- Context API for state management

## Project Structure

The project follows a clean modular architecture:

- **components/**: React components for UI (presentational and container components)
- **hooks/**: Custom React hooks for state and side effects
- **context/**: React Context for global state management
- **types/**: TypeScript type definitions
- **utils/**: Utility functions and helpers
- **styles/**: CSS and Tailwind configuration
- **assets/**: Static assets
- **data/**: Sample data files

## Key Architectural Patterns

### 1. Field Registry Pattern

The field registry (`src/utils/fieldRegistry.ts`) is a central registry of all supported field types. To add a new field type:

1. Create a new component in `src/components/fields/`
2. Register it in `fieldRegistry.ts`
3. No other files need modification

### 2. Context-Based State Management

`ProductsContext` manages all global state:
- Product collection
- Current selection
- Validation issues
- Undo/redo state

Access via `useProductsContext()` hook in any component.

### 3. Type-Safe Operations

All product operations are fully type-safe:
- `Product`: Single product object
- `ProductCollection`: Collection with metadata
- `ValidationIssue`: Validation errors/warnings
- `FieldType`: Supported field types

## Development Guidelines

### Code Style

- Use TypeScript strict mode
- Prefer functional components with hooks
- Keep components small and focused
- Use descriptive names for variables and functions
- Add TODO comments for incomplete features

### Component Structure

```tsx
/**
 * ComponentName - Brief description
 * TODO: List of incomplete features (if any)
 */

import { dependencies };

interface ComponentProps {
  // Props definition
}

export default function ComponentName(props: ComponentProps) {
  // Implementation
}
```

### Testing

- Components have placeholder implementations with TODO markers
- Create unit tests for utility functions
- Create integration tests for context operations

## Phase 1 Architecture (Current)

✅ **Completed**:
- Project structure
- Configuration (Vite, TypeScript, TailwindCSS)
- Component skeletons
- Hook interfaces
- Context setup
- Type definitions
- Field registry pattern
- Utility function signatures

🚧 **TODO - Next Phase**:
- Implement component functionality
- Implement field editors
- Implement validation logic
- Implement undo/redo
- Implement import/export
- Add keyboard shortcuts
- Add comprehensive error handling
- Add unit tests

## Running the Project

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Type check
npm run type-check
```

## Common Development Tasks

### Adding a New Field Type

1. Create `src/components/fields/MyFieldEditor.tsx`
2. Update `src/utils/fieldRegistry.ts`
3. Add validation in `src/utils/validation.ts`

### Adding a New Hook

1. Create in `src/hooks/useMyHook.ts`
2. Export from `src/hooks/index.ts` (if created)
3. Add TypeScript types

### Modifying Context

1. Update `src/context/ProductsContext.ts` (interface)
2. Update `src/context/ProductsProvider.tsx` (implementation)

## TypeScript Configuration

- Target: ES2020
- Strict mode: true
- Module resolution: bundler
- Allow synthetic default imports: true
- JSX mode: react-jsx

## Browser Support

- Modern browsers with ES2020 support
- Chrome, Firefox, Safari, Edge (latest versions)

## Performance Considerations

- Products are managed in React state (no external state library yet)
- Large product collections (1000+ items) may need optimization
- Consider virtualization for ProductList with many items

## Accessibility

- Use semantic HTML
- Add ARIA labels where appropriate
- Ensure keyboard navigation works
- Test with screen readers

## Future Enhancements

See README.md for full list of planned features.

## Questions or Issues?

Refer to the README.md for feature documentation and the inline code comments for implementation details.
