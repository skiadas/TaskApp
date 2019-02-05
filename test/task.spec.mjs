// set up chai
import chai from 'chai';
let expect = chai.expect;

import Task from '../js/task';

describe('Task class', function() {
   describe('produces task objects', function() {
      it('with methods getTitle, setTitle', function() {
         let title = 'Hello there!';
         let otherTitle = 'Alternative!';
         let task = new Task(title);

         expect(task).to.respondTo('getTitle');
         expect(task).to.respondTo('setTitle');
         expect(task.getTitle()).to.equal(title);
         expect(task.setTitle(otherTitle)).to.equal(task);
         expect(task.getTitle()).to.equal(otherTitle);
      });
      it('with methods isCompleted, setCompleted', function() {
         let task = new Task('a title');

         expect(task).to.respondTo('isCompleted');
         expect(task).to.respondTo('setCompleted');
         expect(task.isCompleted()).to.equal(false);
         expect(task.setCompleted(true)).to.equal(task);
         expect(task.isCompleted()).to.equal(true);
      });
      it('with methods getLabels, addLabel, hasLabel, removeLabel', function() {
         let task = new Task('a title');
         let label1 = 'a label';
         let label2 = 'another label';

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
   it('allows us to access tasks by id', function() {
      let task1 = new Task();
      let task2 = Task.get(task1.id);
      expect(task2).to.equal(task1);
   });
});
