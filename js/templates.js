// templates.js
//
// This file handles the various templates for us.
//
(function(global) {
   var Template, templateStorage;

   if (!global.hasOwnProperty('TaskApp')) {
      global.TaskApp = {};
   }

   // Object keeping the stored templates
   templateStorage = {};

   /*
    * Exported object. `new` is used to create a template, `get` is used to
    * retrieve a stored template.
    *
    * Template objects themselves have a `parse` method that can be used to
    * produce the needed substitutions.
    *
    * The objects have a property `template` holding the actual template text.
    */
   Template = {
      /*
       * Returns a new template object based on the text in `html`.
       * The `name` can be used to access the template in the future
       * If a template with the same name exists, it prints a warning message
       * and replaces it.
       */
      new: function newTemplate(name, html) {
         var templateObject;

         // TODO: Update using getTemplate when that is done
         if (templateStorage.hasOwnProperty(name)) {
            console.log('Template already exists with name: ' + name + '. Overwriting.');
         }

         templateObject = Object.create(Template.prototype);
         templateObject.template = html;

         templateStorage[name] = templateObject;

         return templateObject;
      },
      /*
       * Returns the template with a given name, or `null` if it does not exist.
       */
      get: function getTemplate(name) {
         if (!templateStorage.hasOwnProperty(name)) {
            return null;
         }

         return templateStorage[name];
      }
   };

   /*
    * Prototype object for created templates
    */
   Template.prototype = {
      /*
       * Parses the template named `name`, using the `values` object
       * to resolve parameter entries. For instance {{foo}} will be
       * replaced by values.foo
       */
      parse: function(values) {

      }
   };

   global.TaskApp.Template = Template;
}(typeof window === 'undefined' ? global : window));
