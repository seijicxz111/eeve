# Contributing

## Setup

```bash
npm install
npm run typecheck
npm run lint
npm run test
npm run storybook
```

## Component Changes

- Preserve semantic token usage. Do not hardcode raw colors in components.
- Keep native HTML behavior unless a component intentionally replaces it with an accessible primitive.
- Forward refs when the component owns a focusable or measurable DOM node.
- Add or update stories for variants, states, dark theme behavior, and realistic usage.
- Add tests for behavior, ARIA attributes, focus, controlled and uncontrolled state, and cleanup.
- Avoid exporting internal helpers, fixtures, or testing utilities from `src/index.ts`.

## Versioning

Use Changesets for user-facing changes:

```bash
npm run changeset
```

Choose patch, minor, or major based on the public API impact.

## Pull Requests

Before opening a PR, run:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
npm run build:storybook
```
