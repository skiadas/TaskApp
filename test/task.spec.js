// set up chai
var chai = require('chai');
var expect = chai.expect;

// Loads the Handlebars module
// index.html load it differently
global.Handlebars = require('handlebars');
// Load Task class
require('../js/task');

var Task;

if (typeof TaskApp !== 'undefined') {
   Task = TaskApp.Task;
}

describe('Task class', function() {
   it('is a property of the TaskApp global', function() {
      expect(global).to.have.property('TaskApp');
      expect(global.TaskApp).to.have.property('Task');
   });
   it('has a Task.new constructor', function() {
      expect(Task).to.respondTo('new');
      expect(function() { Task.new(); }).to.not.throw(Error);
   });
   describe('produces task objects', function() {
      it('with methods getTitle, setTitle', function() {
         var title = 'Hello there!';
         var otherTitle = 'Alternative!';
         var task = Task.new(title);

         expect(task).to.respondTo('getTitle');
         expect(task).to.respondTo('setTitle');
         expect(task.getTitle()).to.equal(title);
         expect(task.setTitle(otherTitle)).to.equal(task);
         expect(task.getTitle()).to.equal(otherTitle);
      });
      it('with methods isCompleted, setCompleted', function() {
         var task = Task.new('a title');

         expect(task).to.respondTo('isCompleted');
         expect(task).to.respondTo('setCompleted');
         expect(task.isCompleted()).to.equal(false);
         expect(task.setCompleted(true)).to.equal(task);
         expect(task.isCompleted()).to.equal(true);
      });
      it('with methods getLabels, addLabel, hasLabel, removeLabel', function() {
         var task = Task.new('a title');
         var label1 = 'a label';
         var label2 = 'another label';

         expect(task).to.respondTo('getLabels');
         expect(task).to.respondTo('addLabel');
         expect(task).to.respondTo('hasLabel');
         expect(task).to.respondTo('addLabel');
         expect(task).to.respondTo('removeLabel');

         expect(task.getLabels().length).to.equal(0);
         expect(task.addLabel(label1)).to.equal(task);
         expect(task.getLabels()).to.contain(label1);
         expect(task.hasLabel(label1)).to.equal(true);
         task.addLabel(label1);
         expect(task.getLabels().length).to.equal(1);
         task.addLabel(label2);
         expect(task.getLabels().length).to.equal(2);
         expect(task.hasLabel(label1)).to.equal(true);
         expect(task.hasLabel(label2)).to.equal(true);
         expect(task.removeLabel(label1)).to.equal(task);
         expect(task.hasLabel(label1)).to.equal(false);
         expect(task.hasLabel(label2)).to.equal(true);
      });
   });
});
