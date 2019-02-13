// Run tests via: NODE_OPTIONS="--experimental-modules" mocha --delay test.esm.js
//
// Normally we would want to do this import:
// import chai from 'chai';
// But this won't work in both browser and node. So in browser we load the chai package
// remotely in another script tag, while in node we load it globally in test.esm.js

let expect = chai.expect;

import Event from '../js/event.mjs';

Event.synchronous = true;
let expectedMessage = 'a message';

describe('With Global Events', () => {
   it('you can sign up for events on a topic', () => {
      const TOPIC = 'food';
      Event.on(TOPIC, message => {
         expect(message).to.equal(expectedMessage);
      });
      Event.trigger(TOPIC, expectedMessage);
   });
   it('you won\'t get notified about topics you have not registered', () => {
      const TOPIC = 'food2';
      const OTHER_TOPIC = 'computers';
      Event.on(TOPIC, message => {});
      Event.on(OTHER_TOPIC, () =>expect.fail());
      Event.trigger(TOPIC, expectedMessage);
   });
   it('you can remove yourself from being notified', () => {
      const TOPIC = 'food3';
      let handler = () => expect.fail();
      Event.on(TOPIC, handler);
      Event.off(TOPIC, handler);
      Event.trigger(TOPIC);
   });
   it('you can\'t remove other objects\' handlers', (done) => {
      const TOPIC = 'food4';
      let handler = () => done();
      let o1 = {};
      let o2 = {};
      Event.on(TOPIC, handler, o1);
      Event.off(TOPIC, handler, o2);
      Event.trigger(TOPIC);
   });
   it('you can\'t remove other handlers you don\'t have', (done) => {
      const TOPIC = 'food5';
      Event.on(TOPIC, () => done());
      Event.off(TOPIC, () => done());
      Event.trigger(TOPIC);
   });
   it('you can remove handlers with null context', () => {
      const TOPIC = 'food6';
      let handler = () => expect.fail();
      Event.on(TOPIC, handler);
      Event.off(TOPIC, handler);
      Event.trigger(TOPIC);
   });
});
describe('With Mixed-in Events', () => {
   it('you listen for events triggered from the specific object', (done) => {
      const TOPIC = 'food';
      const obj = {};
      Event.mixin(obj);
      obj.on(TOPIC, message => {
         expect(message).to.equal(expectedMessage);
         done();
      });
      obj.trigger(TOPIC, expectedMessage);
   });
   it('you only listen for events triggered from the specific object', () => {
      const TOPIC = 'food';
      const obj = {};
      const otherObj = {};
      Event.mixin(obj);
      Event.mixin(otherObj);
      obj.on(TOPIC, () => expect.fail());
      otherObj.trigger(TOPIC);
   });
   it('you can set up the "this" context for the handler', () => {
      const TOPIC = 'food';
      const obj = {};
      Event.mixin(obj);
      const ctx = {};

      obj.on(TOPIC, function() {
         expect(this).to.equal(ctx);
      }, ctx);
      obj.trigger(TOPIC);
   });
});
