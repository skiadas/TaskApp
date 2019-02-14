// task.js
/*
 * The main model, handling individual Task items.
 */
import Event from './event.mjs';

let taskCounter = 0;

function getAvailableId() {
    taskCounter += 1;

    return taskCounter;
}

 // Object holding all tasks by id
 let allTasks = new Map();

 /*
  * Exported object. Represents the Task class.
  *
  * - If no title is provided, a default empty message will be used.
  * - Tasks have associated labels in the form of an array `labels`.
  * - Tasks have a `completed` status boolean that is `false` by default.
  *
  * You should NOT try to access the title, labels and completed status directly.
  * Instead, use the getters and setters in the prototype.
  */
 export default class Task {
    constructor(title) {
        if (typeof title === 'undefined') {
            title = '';
        }
        this.title = title;
        this.id = getAvailableId();
        this.labels = new Set();
        this.completed = false;

        allTasks.set(this.id, this);
    }
    save() {
        this.trigger('changed', this);
    }

    getTitle() { return this.title; }
    setTitle(newTitle) {
        this.title = newTitle;
        this.save();

        return this;
    }

    getLabels() { return Array.from(this.labels); }
    hasLabel(label) {
       return this.labels.has(label);
    }
    addLabel(label) {
       this.labels.add(label);
       this.save();

       return this;
    }
    removeLabel(label) {
       this.labels.delete(label);
       this.save();

       return this;
    }
    isCompleted() {
       return this.completed;
    }
    setCompleted(isCompleted) {
        this.completed = isCompleted;
        this.save();

        return this;
    }

}

// Returns the task with a given id
Task.get = function(id) {
    return allTasks.get(id);
};

Event.mixin(Task.prototype);


