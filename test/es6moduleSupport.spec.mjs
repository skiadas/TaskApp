// Run tests via: NODE_OPTIONS="--experimental-modules" mocha --delay test.esm.js
import chai from 'chai';
let expect = chai.expect;

import Person from './simpleModule.mjs';

describe('Running mocha as ES6', function() {
   it('is working', function() {
      expect(new Person().hello()).to.equal("Hello, world!");
   });
});

