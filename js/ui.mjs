import Event from './event.mjs'
// This implementation requires jQuery
export default class UI {
   constructor(containerEl) {
      this.containerEl = containerEl;
      this.setUp();
      this.addElementListeners();
   }
   taskWasAddedToList(task) {
      this.appendTask(task);
   }
   taskWasDeletedFromList(task) {
      $('.task', this.containerEl).each(function(i, el) {
         if ($(el).data('id') == task.id) {
            $(el).hide(500, () => $(el).remove());
         }
      });
   }
   taskChanged(task){
      // TODO
   }
   updateWithList(taskList) {
      $(this.containerEl).html(listTemplate(taskList));
      taskList.eachTask(task => this.appendTask(task));
   }
   appendTask(task) {
      let ul = $('ul', this.containerEl);
      $(taskTemplate(task)).hide().appendTo(ul).show(1000);
   }
   setUp() {}
   addElementListeners() {
      this.containerEl.on('click', '#addTask', ev => this.reactToAddTaskEvent(ev));
      this.containerEl.on('click', '.deleteTask', ev => this.reactToDeleteTask(ev));
   }
   reactToAddTaskEvent(ev) {
      let title = $('#newTask .title').val();
      $('#newTask .title').val('');
      this.trigger('addTask', { title: title });
   }
   reactToDeleteTask(ev) {
      let taskEl = $(ev.target).closest('.task');
      let taskId = taskEl.data('id');
      this.trigger('deleteTask', { id: taskId });
   }
}

Event.mixin(UI.prototype);


function listTemplate(list) {
   return `
   <h3>Tasks here!</h3>
   <ul></ul>
   <div id="newTask">
       <input class="title" type="input"></input>
       <input id="addTask" type="button" value="Add"></input>
   </div>
   <!-- This input element is by default not visible. It is placed wherever we decide to edit an elements title -->
   <input id="edit" class="title" type="input" style="display: none"></input>
   `;
}

function taskTemplate(task) {
   return `
   <li class="task" data-id="${task.id}">
   <p>${task.title}</p>
   <input class="completed" type="checkbox"></input>
   <input class="deleteTask" type="button" value="X"></input>
   </li>
   `;
}

// TODO: Some leftover stuff that needs to be implemented

// this.ui.on('dblclick', '.task', function(ev) { controller.startTaskEdit(); });
// this.ui.on('keydown', '#edit', function(ev) { controller.editReactToKey(); });
// this.ui.on('click', '.completedStatus', function(ev) { controller.setCompleted(ev); });

// expect(registeredTopics).to.contain('taskIsBeingEdited');
// expect(registeredTopics).to.contain('markTaskAsCompleted');
// this.ui.on('taskIsBeingEdited', this.editReactToKey, this);
// this.ui.on('markTaskAsCompleted', this.setCompleted, this);

