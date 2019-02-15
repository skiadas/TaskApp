// set up chai
let expect = chai.expect;

import TaskListController from '../js/taskListController';
import TaskList from '../js/taskList';
import Task from '../js/task';
import Spy from '../js/spy';
import Event from '../js/event';

class TestableTaskList extends TaskList {
   constructor() {
      super();
      this.topicsRegistered = new Set();
   }
   on(topic, handler, context) {
      super.on(topic, handler, context);
      this.topicsRegistered.add(topic);
   }
}

class FakeUI {
   constructor() {
      this.topicsRegistered = new Set();
      this.handlers = new Map();
   }
   on(topic, handler, context) {
      this.handlers.set(topic, { handler: handler, context: context });
      this.topicsRegistered.add(topic);
   }
   trigger(topic, message) {
      let { handler, context } = this.handlers.get(topic);
      handler.call(context, message);
   }
   taskWasAddedToList(task) {}
   taskWasDeletedFromList(task) {}
   taskChanged(task) {}
   updateWithList(taskList) {}
}

describe('TaskList Controller', () => {
   let taskList;
   let fakeUI;
   let controller;
   beforeEach(() => {
      taskList = new TestableTaskList();
      fakeUI = new FakeUI();
      controller = new TaskListController(taskList, fakeUI);
   });
   it('registers to be notified when task list changes occur', () => {
      let registeredTopics = Array.from(taskList.topicsRegistered);
      expect(registeredTopics).to.contain('changed');
      expect(registeredTopics).to.contain('taskAdded');
      expect(registeredTopics).to.contain('taskChanged');
      expect(registeredTopics).to.contain('taskRemoved');
   });
   it('registers for ui actions', () => {
      let registeredTopics = Array.from(fakeUI.topicsRegistered);
      expect(registeredTopics).to.contain('addTask');
      expect(registeredTopics).to.contain('deleteTask');
      expect(registeredTopics).to.contain('changeTask');
   });
   it('sends added task to the ui when a task is added to list', () => {
      let aTask = new Task("a title");
      let spy = new Spy(fakeUI, 'taskWasAddedToList');
      taskList.addTask(aTask);

      expect(spy.numberOfCalls()).to.equal(1);
      expect(spy.argumentsOfCall(0)).to.deep.equal([aTask]);
   });
   it('sends deleted task to the ui when a task is deleted from list', () => {
      let aTask = new Task("a title");
      let spy = new Spy(fakeUI, 'taskWasDeletedFromList');
      taskList.addTask(aTask);
      taskList.removeTask(aTask);

      expect(spy.numberOfCalls()).to.equal(1);
      expect(spy.argumentsOfCall(0)).to.deep.equal([aTask]);
   });
   it('sends changed task to the ui when a task changes', () => {
      let aTask = new Task("a title");
      let spy = new Spy(fakeUI, 'taskChanged');
      taskList.addTask(aTask);
      aTask.setTitle("another title");

      expect(spy.numberOfCalls()).to.equal(1);
      expect(spy.argumentsOfCall(0)).to.deep.equal([aTask]);
   });
   it('triggers a UI update when the taskList changes', () => {
      let spy = new Spy(fakeUI, 'updateWithList');
      taskList.trigger("changed");

      expect(spy.numberOfCalls()).to.equal(1);
      expect(spy.argumentsOfCall(0)).to.deep.equal([taskList]);
   });
   it('tells the list to add a task with a given title when prompted by the ui', () => {
      let spy = new Spy(taskList, 'addTask');
      fakeUI.trigger('addTask', { title: 'a title' });
      expect(spy.numberOfCalls()).to.equal(1);
      expect(spy.argumentsOfCall(0)[0].title).to.equal('a title');
   });
   it('tells the list to remove a task with a given id when prompted by the ui', () => {
      let task = new Task('a task');
      taskList.addTask(task);
      let spy = new Spy(taskList, 'removeTask');
      fakeUI.trigger('deleteTask', { id: task.id });
      expect(spy.numberOfCalls()).to.equal(1);
      expect(spy.argumentsOfCall(0)[0]).to.equal(task);
   });
   it('tells a task to update when provided new information from the ui', () => {
      let task = new Task('a task');
      taskList.addTask(task);
      let spy = new Spy(task, 'update');
      fakeUI.trigger('changeTask', { id: task.id, title: 'new title' });
      expect(spy.numberOfCalls()).to.equal(1);
      expect(spy.argumentsOfCall(0)[0].title).to.equal('new title');
   });
});
