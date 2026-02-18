# Flag

This component enables you to use fast and maintained flags from a single React component. The flags were adopted from [twemoji](https://github.com/twitter/twemoji) which as of now is no longer maintained. I have updated them according to the latest state of the [United Nations Member State List](https://www.un.org/en/about-us/member-states). We have 252 flags in total with the 193+2 recognized UN flags and a few territorial flags.

### Installation

`bunx --bun shadcn@latest add https://vorhdam-registry.vercel.app/r/flag.json`

### Usage

It has a `code` prop which takes a country's uppercase [ISO-3166-2 Code](https://en.wikipedia.org/wiki/ISO_3166-2#Current_codes) and it also takes React SVG Component Props (width, height, etc.) For example:

If you want to render Hungary's flag: `<Flag code={"HU"} .../>` it will result in something like this:

### Flexibility

If you ever feel like you need to modify a flag to adapt to the latest political changes or for just fun you can do that by editing the `@/hooks/useFlag.tsx` file (if you are using the default config) which stores all the flags as svgs.

You can also find an **array** _(containing all flag codes lowercase, in alphabetic order)_ and a **type** _(for typesafety)_: `@/lib/flags.ts`

### SVG Files

If you need the svgs as files navigate to the `/public/flags/` in the repo or [here](https://github.com/vorhdam/registry/tree/main/public/flags). They are all uniform 36x36 size svgs.
