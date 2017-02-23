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
});
