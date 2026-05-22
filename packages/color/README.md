# @nordaun/color

A simple color provider and context for your React apps.

### Install

```bash
npm install @nordaun/color
#or
yarn add @nordaun/color
#or
pnpm add @nordaun/color
#or
bun add @nordaun/color
```

### Usage

Add this to your layout or app file (where your providers are)

```jsx
// provider-demo.tsx

import { ColorProvider } from "@nordaun/color";

<ColorProvider
  cookieName="COLOR"
  classPrefix="color-"
  colors={["red", "green", "blue"]}
  defaultColor="red"
>
  {children}
</ColorProvider>;
```

Use the `useColor()` function to get or set a color

```jsx
// hook-demo.tsx

import { useColor } from "@nordaun/color";

const { color, colors, setColor } = useColor();
console.log("Current color:", color);
console.log("All avialable colors:", colors);
setColor("red");
```

### Example

The site that host the documentation of this package was built using `@nordaun/color`.
You can interact with the color selector at the header of [this page](https://ui.nordaun.com/packages/color)
