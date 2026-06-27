# eeve

A production-oriented React component library with strict TypeScript, semantic design tokens, light and dark themes, Storybook documentation, focused tests, and npm-ready packaging.

## Features

- React components with typed public APIs and forwarded refs where appropriate
- CSS custom property token system with light, dark, and custom-theme support
- Tailwind CSS, Class Variance Authority, `clsx`, and `tailwind-merge`
- Accessible Radix-backed primitives for complex menus, dialogs, tabs, overlays, and controls
- Vite library-mode build with ESM, source maps, extracted CSS, and declarations
- Storybook with autodocs, controls, a11y tooling, theme switching, and examples
- Vitest, React Testing Library, `user-event`, and `jest-axe`
- Changesets, GitHub Actions, npm release workflow, and Storybook deployment setup

## Installation

```bash
npm install eeve react react-dom
```

The package is published on npm:

```bash
npm view eeve name version
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
import { Button, Dialog, Input, ToastProvider, useToast } from "eeve";
import "eeve/styles.css";

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

## Showcase Site

The repo includes an MVP marketing and adoption site under `site/`. It demonstrates
live components, framework integration snippets, design tokens, theme switching, and
the package value proposition.

```bash
npm run site:dev
npm run site:build
npm run site:preview
```

## Development

```bash
npm install
npm run dev
npm run site:dev
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

- npm package: `https://www.npmjs.com/package/eeve`
- Storybook placeholder: `https://your-storybook-domain.example`

## License

MIT
