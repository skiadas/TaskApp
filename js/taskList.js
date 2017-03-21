// taskList.js
/* global: Event */
/*
 * Model handling a list of tasks
 */
(function(global) {
   var TaskList;

   if (!global.hasOwnProperty('TaskApp')) {
      global.TaskApp = {};
   }

   /*
    * Exported object. Represents the class for a list of tasks
    *
    * We can create a new TaskList object using TaskList.new.
    */
   TaskList = {
      /*
       * Create a new TaskList.
       *
       * Task lists manage a list of tasks stored in the property `tasks`.
       *
       * You should NOT try to access the tasks list directly.
       * Instead, use the getters and setters in the prototype.
       */
      new: function(title) {
         var taskList;  // The new taskList object to create

         // Using `this` instead of `TaskList` here allows for subclassing.
         taskList = Object.create(this.prototype);

         taskList.tasks = [];

         return taskList;
      }
   };

   /*
    * Prototype object for TaskList.
    */
   TaskList.prototype = {
      // Return the list of tasks. Do NOT use this method to add or remove tasks.
      getTasks: function() {
         return this.tasks;
      },
      // Add a new task to the list.
      addTask: function(task) {
         this.tasks.push(task);
         task.on('changed', this.taskChanged, this);
         this.trigger('taskAdded', task, this);

         return this;
      },
      // Remove a task from the list, if it is present.
      removeTask: function(task) {
         var index;

         index = this.tasks.indexOf(task);
         if (index !== -1) {
            task.off('changed', this.taskChanged, this);
            this.tasks.splice(index, 1);
            this.trigger('taskRemoved', task, this);
         }

         return this;
      },
      // Call the function `f(task, index)` for each task.
      eachTask: function(f) {
         this.tasks.forEach(f);

         return this;
      },
      taskChanged: function(task) {
         this.trigger('taskChanged', task, this);
      }
   };

   Event.mixin(TaskList.prototype);

   global.TaskApp.TaskList = TaskList;

}(typeof window === 'undefined' ? global : window));
