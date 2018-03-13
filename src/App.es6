
"use strict";

import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

// loads the icon pluggin
UIkit.use(Icons);

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

	init(content = null) {
		if (content == null) {
			this.selector.innerHTML = `
				<div class="uk-child-width-expand@s uk-text-center" uk-grid>
					<div>
						<div class="uk-card uk-card-default uk-card-body">Item</div>
					</div>
				</div>
				<a id="idf_add_btn" class="float">
					<i style="margin-top:22px;" uk-icon="icon: heart"></i>
				</a>
			`;

			this.idf_add_btn = document.getElementById('idf_add_btn');
			this.idf_add_btn.addEventListener('click', this.addQuestion);
		}
		return this.selector;
	}

	addQuestion(event) {
		console.log('came in');
		console.log(event);
		console.log(this);
	}
}

// export the class instance via a function call
module.exports = (selector) => {
	return new idf(selector);
};