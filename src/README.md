
<!-- Installations to do before running the code -->
<!-- ---------------professor installations------------------------------------------------- -->

Getting Started
If you check out this code, it won't have the next/react scripts installed, so the first thing you would do is:

npm install next@latest
npm install react@latest
npm install react-dom@latest


The above takes several minutes to install. Once done, the folder should contain about 300 MB of content.

Running
Run the development server:

npm run dev



Open http://localhost:3000 with your browser to see the result.

Testing
To install the necessary test scripts, execute the following:

npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom


Modify package.json as follows:

"scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest"
  },

<!-- ---------extra installation for my test files to work----------- -->
npm install vitest @testing-library/react @testing-library/jest-dom --save-dev
npm install canvas
<!-- ---------------------------------------------------------------- -->

There also needs to be a vitest.config.ts file, provided by the professor:

import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
 test: {
environment: 'jsdom'
},
})



Installing Canvas
If you have a Canvas element into which you are drawing, then for testing you need to install a special
canvas module.
npm install canvas
Note that this is only required if you have Canvas.

Installing @vitest/coverage-v8
When you run npm run test you will be prompted to install @vitest which you should accept.
Now run it again, this time with npm run test -- --coverage to generate a coverage report:

<!-- How to play the puzzle -->

How the application works:
1. Select any Configuration (by deafult the first configuration will be visible)
2. Select 2 Syllables and click swap 
3. If you want to do undo your move click the undo button
4. If you want reset the puzzle to it's intial state click the reset button
5. One needs to score 16 points to win the Game  