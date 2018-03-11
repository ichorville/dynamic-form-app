import chai from "chai";

require('jsdom-global')()

// Import the idf class instance
import idf from "../src/App.es6";

chai.should();

// create mock html tag
document.body.innerHTML = "<div>Sample text in div</div>";

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
	});
});