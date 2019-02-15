// taskListController.js
import Task from './task.mjs';
/*
 * Controller managing the taskList part of the interface
 */
export default class TaskListController {
    constructor(taskList, ui) {
        this.taskList = taskList;
        this.ui = ui;

        this.listenToListChanges();
        this.listenToUserInput();
        this.update();
    }
    listenToListChanges() {
         // React to list updates
        this.taskList.on('changed', this.listChanged, this);
        this.taskList.on('taskChanged', this.taskChanged, this);
        this.taskList.on('taskAdded', this.taskAdded, this);
        this.taskList.on('taskRemoved', this.taskRemoved, this);
    }
    listenToUserInput() {
        this.ui.on('addTask', this.addTask, this);
        this.ui.on('deleteTask', this.deleteTask, this);
        this.ui.on('changeTask', this.changeTask, this);
        // TODO: Add reactions to label operations
    }
    // Reactions to list changes
    update() {
        this.ui.updateWithList(this.taskList);
    }
    listChanged() {
        this.update();
    }
    taskChanged(task) {
        this.ui.taskChanged(task);
    }
    taskAdded(task) {
        this.ui.taskWasAddedToList(task);
    }
    taskRemoved(task) {
        this.ui.taskWasDeletedFromList(task);
    }
    // Reactions to UI actions
    addTask(changeDetails) {
        let task = new Task(changeDetails.title);
        this.taskList.addTask(task);
    }
    deleteTask(changeDetails) {
        let task = Task.get(changeDetails.id);
        this.taskList.removeTask(task);
    }
    changeTask(changeDetails) {
        let task = Task.get(changeDetails.id);
        task.update(changeDetails);
    }
}
