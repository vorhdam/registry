# @nordaun/theme

A simple theme provider and context for your React apps.

### Install

```bash
npm install @nordaun/theme
#or
yarn add @nordaun/theme
#or
pnpm add @nordaun/theme
#or
bun add @nordaun/theme
```

### Usage

Add this to your layout or app file (where your providers are)

```jsx
// provider-demo.tsx

import { ThemeProvider } from "@nordaun/theme";

<ThemeProvider
  cookieName="THEME"
  defaultTheme="system"
  enableSystem
  disableTransition
>
  {children}
</ThemeProvider>;
```

Use the `useTheme()` function to get or set a theme

```jsx
// hook-demo.tsx

import { useTheme } from "@nordaun/theme";

const { theme, themes, setTheme } = useTheme();
console.log("Current theme:", theme);
console.log("All avialable themes:", themes);
setTheme("system");
```

### Example

The site that host the documentation of this package was built using `@nordaun/theme`.
You can interact with the theme selector at the header of [this page](https://ui.nordaun.com/packages/theme)
