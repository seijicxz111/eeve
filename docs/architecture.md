# Architecture

The package is a Vite library-mode React component system.

## Source Layout

- `src/styles`: token, theme, and global CSS entry points
- `src/utilities`: class merging, ID generation, environment, focus, events, and keyboard helpers
- `src/hooks`: reusable browser and state hooks
- `src/components`: public component categories
- `src/stories`: Storybook documentation and showcase examples
- `tests`: shared test setup

## Packaging

`src/index.ts` is the only package entry point. It imports `globals.css` and intentionally exports public components, hooks, tokens, and utilities. Package export maps expose:

- `.`
- `./styles.css`
- `./tokens.css`
- `./themes.css`

React and React DOM are peer dependencies and are marked external in Vite.

## Accessibility Strategy

Complex widgets wrap Radix primitives for keyboard support, focus management, portals, and ARIA behavior. Simpler components use native HTML semantics.
