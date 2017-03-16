// task.js

/*
 * The main model, handling individual Task items.
 */
(function(global) {
   var Task;

   if (!global.hasOwnProperty('TaskApp')) {
      global.TaskApp = {};
   }

   /*
    * Exported object. Represents the Task class.
    *
    * We can create a new Task object using Task.new.
    */
   Task = {
      /*
       * Create a new Task with an optional `title`.
       *
       * If no title is provided, a default empty message will be used.
       *
       * Tasks have associated labels in the form of an array `labels`.
       *
       * Tasks have a `completed` status boolean that is `false` by default.
       *
       * You should NOT try to access the title, labels and completed status directly.
       * Instead, use the getters and setters in the prototype.
       */
      new: function(title) {
         var task;  // The new task object to create

         if (typeof title === 'undefined') {
            title = '';
         }

         // Using `this` instead of `Task` here allows for subclassing.
         task = Object.create(this.prototype);

         task.title = title;
         task.labels = [];
         task.completed = false;

         return task;
      }
   };

   /*
    * Prototype object for tasks
    */
   Task.prototype = {
      // Return the task's title
      getTitle: function() {
         return this.title;
      },
      // Set the task's title and notify observers
      setTitle: function(newTitle) {
         this.title = newTitle;
         // TODO: We will need to add event triggers

         return this;
      },
      // Return the array of labels. You should not use this for any other reason
      // than to iterate over the list of labels. See `Task#addLabel` and `Tqsk#removeLabel`
      // to add/remove a label.
      getLabels: function() {
         return this.labels;
      },
      // Look through the task's labels array to find if the label exists
      hasLabel: function(label) {
         return this.labels.indexOf(label) !== -1;
      },
      // Add the label to the labels array, if it doesn't already exist
      addLabel: function(label) {
         if (!this.hasLabel(label)) {
            this.labels.push(label);
            // TODO: Notify observers on added label
         }

         return this;
      },
      // Remove the label if it is in the list
      removeLabel: function(label) {
         var index;

         index = this.labels.indexOf(label);
         if (index !== -1) {
            this.labels.splice(index, 1);
         }

         return this;
      },
      // Get the completed status
      isCompleted: function() {
         return this.completed;
      },
      // Set the completed status
      setCompleted: function(isCompleted) {
         this.completed = isCompleted;

         return this;
      }
   };


   global.TaskApp.Task = Task;

}(typeof window === 'undefined' ? global : window));
