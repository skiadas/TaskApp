// set up chai
var chai = require('chai');
var expect = chai.expect;

// Load template file
require('../js/templates');

describe('The template system', function() {
   it('creates a Template property within TaskApp', function() {
      expect(global).to.have.property('TaskApp');
      expect(global.TaskApp).to.have.property('Template');
   });
   it('has a function new', function() {
   	expect(TaskApp.Template).to.have.property('new');
   	expect(TaskApp.Template.new).to.be.a('function');
   });
});
describe('Template.new', function() {
	var templName = 'slaton';
	var html1 = '<div>{{hoang}}</div>';

	it('returns a "new template"', function() {
		var templ;

		expect(function() { 
			templ = TaskApp.Template.new(templName, html1);
		}).to.not.throw(Error);
		templ = TaskApp.Template.new(templName, html1);

		expect(templ).to.be.an('object');
	});
	it('logs a message if template name already exists', function() {
		// TODO: Need to find out how to do it
	});
});
