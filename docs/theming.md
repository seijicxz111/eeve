# Theming

The main theming contract is CSS custom properties.

## Light And Dark

```html
<html data-theme="light"></html>
<html data-theme="dark"></html>
```

The same dark tokens also apply under `.dark`.

## System Preference With Persistence

```ts
const storedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
document.documentElement.dataset.theme = storedTheme ?? (prefersDark ? "dark" : "light");
```

## Custom Brand Theme

```css
[data-theme="brand"] {
  --background: 210 40% 99%;
  --foreground: 222 47% 11%;
  --surface: 0 0% 100%;
  --primary: 173 58% 39%;
  --primary-foreground: 0 0% 100%;
  --focus-ring: 173 58% 45%;
}
```

Override semantic variables at the app boundary. Component classes should not need to change.
