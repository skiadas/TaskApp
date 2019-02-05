// task.js
/*
 * The main model, handling individual Task items.
 */

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
       this.labels = [];
       this.completed = false;

       allTasks.set(this.id, this);
    }
    save() {
       // this.trigger('changed', task);
       // TODO: Fix this once tests pass
    }

    getTitle() { return this.title; }
    setTitle(newTitle) {
       this.title = newTitle;
       this.save();

       return this;
    }

    getLabels() { return this.labels; }
    hasLabel(label) {
       return this.labels.indexOf(label) !== -1;
    }
    addLabel(label) {
       if (!this.hasLabel(label)) {
          this.labels.push(label);
          this.save();
       }

       return this;
    }
    removeLabel(label) {
       var index;

       index = this.labels.indexOf(label);
       if (index !== -1) {
          this.labels.splice(index, 1);
          this.save();
       }

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

 // Event.mixin(Task.prototype);


