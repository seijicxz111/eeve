# Testing

## Commands

```bash
npm run typecheck
npm run lint
npm run test
npm run test:coverage
npm run build
npm run build:storybook
```

## Scope

Tests cover:

- Rendering and native attributes
- Variants and class merging
- Ref forwarding
- Click and keyboard activation
- Disabled and loading states
- Form ARIA wiring
- Controlled and uncontrolled state
- Hook cleanup behavior
- Dialog focus and Escape behavior
- Toast creation and dismissal
- Representative automated accessibility checks

Automated accessibility checks are regression tests, not a replacement for manual assistive-technology review.
