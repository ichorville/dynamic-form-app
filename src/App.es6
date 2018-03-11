
"use strict";

class idf {
	constructor(selector) {
		this.selector = document.querySelector(selector);
	}

	html(content = null) {
		if (content !== null) {
			this.selector.innerHTML = content;
		}
		return this.selector.innerHTML;
	}

	init() {

	}
}

// export the class instance via a function call
module.exports = (selector) => {
	return new idf(selector);
};