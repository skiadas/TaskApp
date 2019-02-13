// Run tests with: NODE_OPTIONS="--experimental-modules" mocha --delay test.esm.js
const { sync: globSync } = require("glob");

global.chai = require('chai');

(async () => {
   const matches = globSync("test/*.spec.mjs");
   try {
      for (const match of matches) {
         await import("./" + match);
      }
   } catch (e) {
      throw e;
   }
   run();
})();
