# Accessibility

The library targets WCAG 2.2 AA practices where practical, but automated tests do not guarantee full compliance.

## Implemented Practices

- Visible focus states through the `--focus-ring` token
- Native buttons, inputs, labels, and form attributes where possible
- `aria-describedby` for descriptions and validation messages
- `aria-invalid` for invalid form controls
- Radix-backed focus trapping, Escape closing, and restoration for dialogs
- Radix-backed roving focus and keyboard behavior for menus, tabs, select, and radio controls
- Toast announcements through Radix Toast live regions
- Reduced-motion CSS and hook support

## Manual QA Checklist

- Tab order matches the visual order
- Shift+Tab returns through controls predictably
- Enter and Space activate controls
- Arrow keys move through tabs, radios, sliders, and menus
- Escape closes overlays
- Screen-reader labels and descriptions are meaningful
- Error messages are announced or discoverable
- Color contrast is checked against real brand overrides
- Touch targets remain usable on narrow viewports
