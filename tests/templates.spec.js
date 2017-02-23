// set up chai
var chai = require('chai');
var expect = chai.expect;

// Load template file
require('../js/templates');

describe('The template system', function() {
   it('creates a Template property within TaskApp', function() {
      expect(root).to.have.property('TaskApp');
      expect(root.TaskApp).to.have.property('Template');
   });
});
