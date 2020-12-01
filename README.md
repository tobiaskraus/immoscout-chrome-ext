# ImmoScout - Chrome Extension

Chrome Extension of ImmoScout project (scrape, see results and organize them)

## Getting started

- `npm i`
- `npm run watch`
- In Chrome: Menu > More tools > Extensions, click on "Load unpacked" and select our ./dist folder
- The Chrome extension should be visible and always reload on code change (& save)

## Deploy

This Chrome Extension is not in official Chrome Web Store. So "Deploy" is only a local build:

- `npm build`
- zip /dist folder
- In Chrome: Menu > More tools > Extensions, click on "Pack extension" and select our zip file

## Further Info

- Base Setup inspired by article [Create a Chrome Extension Using React and TypeScript](https://medium.com/better-programming/create-a-chrome-extension-using-react-and-typescript-50e94e14320c)
