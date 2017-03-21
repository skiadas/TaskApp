// taskListController.js
/*
 * Controller managing the taskList part of the interface
 */
(function(global) {
   var TaskListController;

   if (!global.hasOwnProperty('TaskApp')) {
      global.TaskApp = {};
   }

   /**
    * Controller that manages a taskList.
    * We can create a new TaskListController object using `TaskListController.new`.
    * @module TaskListController
    */
   TaskListController = {
      /**
       * Create a new `TaskListController`.
       *
       * @param {TaskList} taskList     The `TaskList` instance to manage.
       * @param {jQuery}   domEl        The DOM Element to use for printing the list.
       * @returns {TaskListController} A new `TaskListController` instance.
       * @example TaskListController.new(myList, $('#list'));
       * @memberof TaskListController
       * @static
       * @public
       */
      new: function(taskList, domEl) {
         var TaskListController;

         controller = Object.create(this.prototype);

         controller.el = domEl;
         controller.taskList = taskList;
         controller.template = TaskApp.Template.get('taskList');
         controller.taskTemplate = TaskApp.Template.get('task');
         // React to list updates
         taskList.on('changed', controller.listChanged, controller);
         taskList.on('taskChanged', controller.taskChanged, controller);
         taskList.on('taskAdded', controller.taskAdded, controller);
         taskList.on('taskRemoved', controller.taskRemoved, controller);
         // React to user interaction
         domEl.on('click', '#addTask', function(ev) { controller.addTask(ev); });
         domEl.on('click', '.deleteTask', function(ev) { controller.deleteTask(ev); });
         domEl.on('dblclick', '.task', function(ev) { controller.startTaskEdit(); });
         domEl.on('keydown', '#edit', function(ev) { controller.editReactToKey(); });
         domEl.on('click', '.completedStatus', function(ev) { controller.setCompleted(ev); });
         // TODO: Add reactions to label operations

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
         this.el.hide().html(
            this.template.parse(this.taskList)
         ).show();

         return this;
      },
      changed: function() {
         this.update();
      },
      taskChanged: function(task) {
         // TODO:
         // Find the DOM element that has this task, using the task's id
         // Change the task with its new form using taskTemplate, and animate
      },
      taskAdded: function(task) {
         // Use the task template to create a new task UI element.
         // Append to the end of the list
         this.el.find('ul').append(
            $(this.taskTemplate.parse(task)).hide().fadeIn(1000)
         );
      },
      taskRemoved: function(task) {
         // TODO:
         // Find the DOM element that has this task, using the task's id
         // Animate hiding of the DOM element
         // At the end of the animation, remove the element
      },
      addTask: function() {
         var titleInput;
         // Find the input that contains the new title
         titleInput = this.el.find('#newTask .title');
         // Create a new task then add it to TaskList
         this.taskList.addTask(
            TaskApp.Task.new(titleInput.val())
         );
         // Clear the new title entry
         titleInput.val('');
      },
      editReactToKey: function(ev) {
         // TODO
         // If the key is escape:
         //     cancelEdit
         // else if the key is enter:
         //     saveEdit
         // else normal behavior
      },
      startTaskEdit: function(ev) {
         // TODO:
         // Cancel out any ongoing edits
         // Find out the element that was clicked on
         // Set its class to "edited" to indicate it is currently being edited
         // Append the edit box to the element
         // Set the edit box to have focus
      },
      cancelEdit: function() {
         // TODO:
         // Find the element containing the edit box
         // Disable its "edited" status/class
         // Empty out the edit box and move it to end
      },
      saveEdit: function() {
         // TODO:
         // Find the element containing the edit box
         // Disable its "edited" status/class
         // Read the new title from the edit box and save it to the task
         // Empty out the edit box and move it to end
      }
   };


   global.TaskApp.TaskListController = TaskListController;

}(typeof window === 'undefined' ? global : window));
