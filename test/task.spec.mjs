// set up chai
let expect = chai.expect;

import Task from '../js/task';

describe('Task class', () => {
   describe('produces task objects', () => {
      it('with methods getTitle, setTitle', () => {
         let title = 'Hello there!';
         let otherTitle = 'Alternative!';
         let task = new Task(title);

         expect(task).to.respondTo('getTitle');
         expect(task).to.respondTo('setTitle');
         expect(task.getTitle()).to.equal(title);
         expect(task.setTitle(otherTitle)).to.equal(task);
         expect(task.getTitle()).to.equal(otherTitle);
      });
      it('with methods isCompleted, setCompleted', () => {
         let task = new Task('a title');

         expect(task).to.respondTo('isCompleted');
         expect(task).to.respondTo('setCompleted');
         expect(task.isCompleted()).to.equal(false);
         expect(task.setCompleted(true)).to.equal(task);
         expect(task.isCompleted()).to.equal(true);
      });
      it('with methods getLabels, addLabel, hasLabel, removeLabel', () => {
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
      it('allows us to register to be notified when tasks are "saved"', () => {
         let task = new Task();
         let gotCalled = 0;
         task.on('changed', () => gotCalled += 1);
         expect(gotCalled).to.equal(0);
         task.setTitle('new title!');
         expect(gotCalled).to.equal(1);
         task.addLabel('aLabel!');
         expect(gotCalled).to.equal(2);
      });
   });
   it('allows us to access tasks by id', () => {
      let task1 = new Task();
      let task2 = Task.get(task1.id);
      expect(task2).to.equal(task1);
   });
});
