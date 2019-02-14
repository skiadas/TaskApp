// taskList.js
import Event from './event';

export default class TaskList {
    constructor() {
        this.tasks = [];
    }
    getTasks() {
        return this.tasks;
    }
    addTask(task) {
        this.tasks.push(task);
        task.on('changed', this.taskChanged, this);
        this.trigger('taskAdded', task, this);

        return this;
    }
    removeTask(task) {
        let index = this.tasks.indexOf(task);

        if (index !== -1) {
            task.off('changed', this.taskChanged, this);
            this.tasks.splice(index, 1);
            this.trigger('taskRemoved', task, this);
        }

        return this;
    }
    eachTask(f) {
        this.tasks.forEach(f);

        return this;
    }
    taskChanged(task) {
        this.trigger('taskChanged', task, this);
    }
}

Event.mixin(TaskList.prototype);
