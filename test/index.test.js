import chai from "chai";

require('jsdom-global')()

// Import the idf class instance
import idf from "../src/App.es6";

chai.should();

// create mock html tag
document.body.innerHTML = "<div>Sample text in div</div><div id='form'></div>";

describe('#IDF Library Test', function () {

	describe('#Element Selector', function () {
		it('should be an object', function () {
			idf('div').selector.should.be.an('object');
		});
	});

	describe('#DivContent', function () {
		it('should be a string', function () {
			idf('div').html().should.be.a('string');
		});

		it('should equal Sample text in div', function () {
			idf('div').html().should.equal('Sample text in div');
		});

		it('should equal paragraph text', function () {
			idf('div').html('<p>changed value</p>').should.equal('<p>changed value</p>');
		});

		it('should equal empty string', function () {
			idf('div').html('').should.equal('');
		});

		it('should initlaie the library', function () {
			idf('div').init().should.be.an('object');
		});

		it('should return the form object', function () {
			idf('div').getFormObject().should.be.an('object');
		});		

		it('should be an object', function () {
			idf('#form').selector.should.be.an('object');
		});

		it('should create a new Form', function () {
			idf('#form').create().should.equal('Form Created');
		});

		it('should submit Form Values', function () {
			idf('#form').submit(Array).should.be.an('object');
		});
	});

	describe('#FormContent', function () {
		describe('#Element Selector', function () {
			
		});
	});
});