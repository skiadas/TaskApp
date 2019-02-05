// Run tests via: NODE_OPTIONS="--experimental-modules" mocha --delay test.esm.js
import * as chai from 'chai';
let expect = chai.default.expect;

import Person from './simpleModule.mjs';

describe('Running mocha as ES6', function() {
   it('is working', function() {
      expect(new Person().hello()).to.equal("Hello, world!");
   });
});

