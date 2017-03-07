// templates.js
//
// This file handles the various templates for us.
//
(function(global) {
   /* global Handlebars, $ */
   var Template, templateStorage;

   if (!global.hasOwnProperty('TaskApp')) {
      global.TaskApp = {};
   }
   if (!global.hasOwnProperty('Handlebars')) {
      throw new Error('Need to have Handlebars loaded first');
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
         templateObject.template = Handlebars.compile(html);

         templateStorage[name] = templateObject;
         // Also make templates available as partials
         Handlebars.registerPartial(name, html);

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
         // "this" is the template object
         return this.template(values);
      }
   };

   /*
    * If this file is loaded on a web page, try to load all "template scripts".
    * It detects that it must run by making sure jQuery has been loaded.
    * A "template script" must have an id of the form "fooTemplate" and it must
    * have a type of "text/template".
    */
   if (global.hasOwnProperty('jQuery')) {
      // Get all scripts whose id ends in Template
      $('script[id$="Template"]').each(function(index, el) {
         Template.new(
            el.id.replace('Template', ''),
            $(el).html()
         );
      });
   }


   global.TaskApp.Template = Template;
}(typeof window === 'undefined' ? global : window));
