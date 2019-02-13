// set up chai
let expect = chai.expect;

import TaskList from '../js/taskList';
import Task from '../js/task';

describe('Tasklists', () => {
   it('start out empty', () => {
      let taskList = new TaskList();
      expect(taskList.getTasks().length).to.equal(0);
   });
   it('can have tasks added to them', () => {
      let taskList = new TaskList();
      let aTask = new Task("a task");
      taskList.addTask(aTask);
      expect(taskList.getTasks()).to.include(aTask);
      expect(taskList.getTasks().length).to.equal(1);
   });
   it('can have tasks removed', () => {
      let taskList = new TaskList();
      let task1 = new Task("a task");
      let task2 = new Task("another task");
      taskList.addTask(task1).addTask(task2);
      taskList.removeTask(task1);
      expect(taskList.getTasks()).to.not.include(task1);
      expect(taskList.getTasks()).to.include(task2);
   });
   it('triggers a notification when task is added', () => {
      let taskList = new TaskList();
      let gotCalled = 0;
      taskList.on('taskAdded', () => gotCalled += 1);
      expect(gotCalled).to.equal(0);
      taskList.addTask(new Task("a task"));
      expect(gotCalled).to.equal(1);
      taskList.addTask(new Task("another task"));
      expect(gotCalled).to.equal(2);
   });
   it('triggers a notification when task is removed', () => {
      let taskList = new TaskList();
      let gotCalled = 0;
      taskList.on('taskRemoved', () => gotCalled += 1);
      let aTask = new Task("a task");
      taskList.addTask(aTask);
      expect(gotCalled).to.equal(0);
      taskList.removeTask(aTask);
      expect(gotCalled).to.equal(1);
   });
   it('triggers a notification when task is changed, while the task is on the list', () => {
      let taskList = new TaskList();
      let gotCalled = 0;
      taskList.on('taskChanged', () => gotCalled += 1);
      let aTask = new Task('a task');
      taskList.addTask(aTask);
      expect(gotCalled).to.equal(0);
      aTask.setTitle('new title');
      expect(gotCalled).to.equal(1);
      taskList.removeTask(aTask);
      aTask.setTitle('even newer title');
      expect(gotCalled).to.equal(1);
   });
});
