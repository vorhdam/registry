# Phone

This component enables you to collect uniform phone number from users with the help of the [libphonenumber-js](https://www.npmjs.com/package/libphonenumber-js) library. It is great for large project which rely on consistent and international phone number formats.

### Installation

`bunx --bun shadcn@latest add https://vorhdam-registry.vercel.app/r/phone.json`

### Usage

It is super easy to use since it is built around a standard `<input type="tel"/>` element. So it also takes the properties of an input element enabling you to use it anywhere.

`<Phone name="phone" placeholder="Your phone number"/>`

### Dependencies

It uses good old shadcn components including: `command`, `input-group` and `popover`.
It also uses the [Flag Component](https://github.com/vorhdam/flags) to improve UX and make countries easier to find. The last dependency is of course the [libphonenumber-js](https://www.npmjs.com/package/libphonenumber-js) NPM package which validates the phone numbers.

### Flexibility and Translation

If you are developing an app with multiple languages I recommend you to translate every country to your available languages and follow these steps:

- Translate the counties to your languages.
- Delete the `@/lib/countries.json` file.
- In the `@/ui/phone.tsx` file you will find a variable called `countryNames`.
- This is the variable that translates [ISO-3166-2 Codes](https://en.wikipedia.org/wiki/ISO_3166-2#Current_codes) to actual countries.
- For example `countryNames["HU"]` will return `Hungary`.
- Replace this logic everywhere with your current translation logic.
