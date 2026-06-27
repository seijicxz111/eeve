# Component Guidelines

## Public API

- Prefer named exports.
- Keep prop names consistent across components.
- Preserve native HTML attributes with `ComponentPropsWithoutRef` or explicit native interfaces.
- Avoid leaking implementation-specific Radix or testing types unless composition requires it.

## Styling

- Use semantic token-backed classes such as `bg-surface`, `text-foreground`, and `border-border`.
- Use CVA for reusable variant systems.
- Use `cn` for all external `className` merging.
- Do not hardcode raw hex or HSL values in component files.

## Testing

Test behavior and accessibility-facing output. Avoid asserting internal state shape.

## Documentation

Stories should show default, variants, disabled, error, loading, interactive, dark-theme, narrow viewport, and realistic examples where relevant.
