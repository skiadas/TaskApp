// taskListController.js

/*
 * Controller managing the taskList part of the interface
 */
(function(global) {
   var TaskListController;

   if (!global.hasOwnProperty('TaskApp')) {
      global.TaskApp = {};
   }

   /*
    * Exported object.
    *
    * We can create a new TaskListController object using TaskListController.new.
    */
   TaskListController = {
      /*
       * Create a new TaskListController.
       *
       * Needs to be provided with a TaskList instance, and a DOM element.
       */
      new: function(taskList, domEl) {
         var TaskListController;

         controller = Object.create(this.prototype);

         controller.el = domEl;
         controller.taskList = taskList;
         // TODO: Must set up a way to be notified when the taskList updates.
         // TODO: Must set up a way to be notified when the user interacts with the
         //       tasklist ui.

         controller.update();

         return controller;
      }
   };

   /*
    * Prototype object for TaskListController.
    */
   TaskListController.prototype = {
      // Updates the interface based on the current taskList state.
      update: function() {
         // TODO: Use the template to set the contents of the DOM element

         return this;
      },
   };


   global.TaskApp.TaskListController = TaskListController;

}(typeof window === 'undefined' ? global : window));
