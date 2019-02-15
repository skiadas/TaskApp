export default class Spy {
   constructor(object, methodName) {
      this.object = object;
      this.methodName = methodName;
      this.oldMethod = object[methodName];
      this.calls = [];
      this.setupSpy();
   }
   setupSpy() {
      let spy = this;
      this.object[this.methodName] = function(...args) {
         // This part executes with "this" being the object.
         // For clarity we store it.
         let context = this;
         spy.calls.push({
            context: context,
            args: args
         });
         // Go ahead and do what the function should have done.
         spy.oldMethod.apply(context, args);
      }
   }
   numberOfCalls() {
      return this.calls.length;
   }
   argumentsOfCall(n) {
      return this.calls[n].args;
   }
}
