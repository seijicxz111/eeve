import "../src/styles/globals.css";

import { withThemeByDataAttribute } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react-vite";

const preview: Preview = {
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: "light",
        dark: "dark"
      },
      defaultTheme: "light",
      attributeName: "data-theme"
    })
  ],
  parameters: {
    actions: { argTypesRegex: "^on.*" },
    a11y: {
      test: "error"
    },
    backgrounds: {
      default: "surface",
      values: [
        { name: "surface", value: "hsl(var(--background))" },
        { name: "raised", value: "hsl(var(--surface-raised))" }
      ]
    },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    docs: {
      codePanel: true,
      source: {
        type: "dynamic"
      }
    },
    viewport: {
      viewports: {
        mobile: {
          name: "Mobile",
          styles: { width: "375px", height: "667px" }
        },
        tablet: {
          name: "Tablet",
          styles: { width: "768px", height: "1024px" }
        },
        desktop: {
          name: "Desktop",
          styles: { width: "1280px", height: "800px" }
        }
      }
    }
  },
  tags: ["autodocs"]
};

export default preview;
