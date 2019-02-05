// Run tests with: NODE_OPTIONS="--experimental-modules" mocha --delay test.esm.js
const { sync: globSync } = require("glob");

(async () => {
   const matches = globSync("test/*.spec.mjs");
   for (const match of matches) {
      await import("./" + match);
   }
   run();
})();
