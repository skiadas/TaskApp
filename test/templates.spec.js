// set up chai
var chai = require('chai');
var expect = chai.expect;

// Load template file
require('../js/templates');

var templName = 'slaton';
var html1 = '<div>{{hoang}}</div>';

describe('The template system', function() {
   it('creates a Template property within TaskApp', function() {
      expect(global).to.have.property('TaskApp');
      expect(global.TaskApp).to.have.property('Template');
   });
   it('has a function new', function() {
   	expect(TaskApp.Template).to.have.property('new');
   	expect(TaskApp.Template.new).to.be.a('function');
   });
   it('has a function get', function() {
   	expect(TaskApp.Template).to.have.property('get');
   	expect(TaskApp.Template.get).to.be.a('function');
   });
});
describe('Template.new', function() {
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
describe('Template.get', function() {
	it('returns the correct template', function() {
		var templ;

		templ = TaskApp.Template.new(templName, html1);

		expect(TaskApp.Template.get(templName)).to.equal(templ);
	});
	it('returns null if template does not exist', function() {
		expect(TaskApp.Template.get('notThere')).to.equal(null);
	});
});
describe('Template#parse', function() {
	var templ;

	templ = TaskApp.Template.new(templName, html1);

	it('exists', function() {
		expect(templ).to.respondTo('parse');
	});
	it('performs the correct substitutions', function() {
		expect(templ.parse({ hoang: 'van' }))
			.to.equal('<div>van</div>');
	});
	it('performs multiple substitutions', function() {
		var templ2 = TaskApp.Template.new('cam',
			'{{term}} is {{feeling}}');

		var result = templ2.parse({ term: 'Winter', feeling: 'fun'});

		expect(result).to.equal('Winter is fun');
	});
});
