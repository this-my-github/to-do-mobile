# Welcome to my Todo app

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the server

   ```bash
    node server.js
   ```

3. Start the app

   ```bash
    npx expo start
   ```

If you want to open the app in Android emulator you need:

1. open file constansts/url.ts find first line
   export const URL = 'http://TOUR_API:3000' and replace YOUR_API with your API
2. open file constansts/url.ts find 10 line
   origin: ['http://localhost:8081', 'http://YOUR_API:8081'], and replace YOUR_API with your API
3. run project

If you want to open the app in web you need:

1. uncommit second line in file constansts/url.ts
2. // export const URL = 'http://localhost:3000'
3. commit first line
4. run project
