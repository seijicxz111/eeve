# eeve-ui-components

A production-oriented React component library with strict TypeScript, semantic design tokens, light and dark themes, Storybook documentation, focused tests, and npm-ready packaging.

## Features

- React components with typed public APIs and forwarded refs where appropriate
- CSS custom property token system with light, dark, and custom-theme support
- Tailwind CSS, Class Variance Authority, `clsx`, and `tailwind-merge`
- Accessible Radix-backed primitives for complex menus, dialogs, tabs, overlays, and controls
- Vite library-mode build with ESM, CJS, source maps, extracted CSS, and declarations
- Storybook with autodocs, controls, a11y tooling, theme switching, and examples
- Vitest, React Testing Library, `user-event`, and `jest-axe`
- Changesets, GitHub Actions, npm release workflow, and Storybook deployment setup

## Installation

```bash
npm install eeve-ui-components react react-dom
```

The package is prepared for npm publication. Re-check availability before first publish:

```bash
npm view eeve-ui-components name version
```

## Peer Dependencies

```json
{
  "react": "^18.3.0 || ^19.0.0",
  "react-dom": "^18.3.0 || ^19.0.0"
}
```

## Usage

```tsx
import { Button, Dialog, Input, ToastProvider, useToast } from "eeve-ui-components";
import "eeve-ui-components/styles.css";

function SaveButton() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() =>
        toast({
          title: "Saved",
          description: "Your changes were saved successfully.",
          variant: "success"
        })
      }
    >
      Save
    </Button>
  );
}
```

Wrap app surfaces that use toasts:

```tsx
<ToastProvider>
  <App />
</ToastProvider>
```

## Theming

Use `data-theme` at an application boundary:

```html
<html data-theme="dark">
  ...
</html>
```

For system preference and persistence, read `docs/theming.md`. Override semantic variables instead of editing component classes:

```css
[data-theme="brand"] {
  --primary: 173 58% 39%;
  --primary-foreground: 0 0% 100%;
  --focus-ring: 173 58% 45%;
}
```

## Components

Available public exports include primitives, forms, feedback, content, navigation, overlays, and layout utilities such as `Button`, `IconButton`, `Input`, `Textarea`, `Select`, `Checkbox`, `RadioGroup`, `Switch`, `Slider`, `SearchInput`, `Alert`, `ToastProvider`, `Spinner`, `Progress`, `Skeleton`, `EmptyState`, `Card`, `Badge`, `Avatar`, `Divider`, `Typography`, `Code`, `StatCard`, `Tabs`, `Breadcrumb`, `Pagination`, `DropdownMenu`, `NavigationMenu`, `Dialog`, `Drawer`, `Tooltip`, `Popover`, `ConfirmDialog`, `Stack`, `Inline`, `Container`, `Grid`, and `AspectRatio`.

## Storybook

Placeholder Storybook URL: `https://your-storybook-domain.example`

```bash
npm run storybook
npm run build:storybook
```

## Development

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run test
npm run build
```

## Testing

```bash
npm run test
npm run test:coverage
npm run build:storybook
npm run test:storybook
```

Automated accessibility tests are useful regression checks, but they do not guarantee complete WCAG conformance.

## Publishing

Publishing is managed with Changesets.

```bash
npm run changeset
npm run version
npm run build
npm pack --dry-run
```

Do not run `npm publish` until maintainers explicitly approve the release and required npm credentials are configured.

## Links

- npm placeholder: `https://www.npmjs.com/package/eeve-ui-components`
- Storybook placeholder: `https://your-storybook-domain.example`

## License

MIT
