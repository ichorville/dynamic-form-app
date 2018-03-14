
"use strict";

import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

// loads the icon pluggin
UIkit.use(Icons);

let idf_form_object = {
	title: '',
	formElements: []
};

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
		console.log('This is ' + this.formELements);
		if (content == null) {
			this.selector.innerHTML = `
				<div class="uk-container">
					<div class="uk-child-width-expand@s" uk-grid>
						<div id="formElements">
							<div id="form_title" class="uk-card uk-card-default uk-card-body">
								<form class="uk-form-horizontal uk-margin-large">
									<div class="uk-margin">
										<label class="uk-form-label" for="form-horizontal-text">Form Name</label>
										<div class="uk-form-controls">
											<input class="uk-input" id="form-input" type="text" placeholder="Please Enter Form Name...">
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
					<a id="idf_add_btn" class="float" uk-tooltip="title: Add Question; pos: bottom">
						<i style="margin-top:22px;" uk-icon="icon: heart" ></i>
					</a>
				</div>
			`;

			this.idf_add_btn = document.getElementById('idf_add_btn');
			this.idf_add_btn.addEventListener('click', this.addQuestion);
		}
		return this.selector;
	}

	addQuestion(event) {
		console.log(this.idf_form_object);
		this.div_form = document.getElementById('formElements');

		let formElement = {
			key: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
			label: '',
			value: '',
			controlType: '',
			type: '',
			required: '',
			order: '',
			placeholder: '',
		};
		this.idf_form_object['formElements'].push(formElement);

		this.div_form.appendChild(`
			<div id="${ formElement['key'] }" class="uk-card uk-card-default uk-card-body">					
				<form class="uk-form-horizontal uk-margin-large">
					<div class="uk-margin">
						<label class="uk-form-label" for="form-horizontal-text">Form Name</label>
						<div class="uk-form-controls">
							<select class="uk-select" id="form-horizontal-select">
								<option>Option 01</option>
								<option>Option 02</option>
							</select>
						</div>
					</div>
				</form>
			</div>
		`);

		console.log(this.idf_form_object);
	}

	refresh() {
		
	}
}

// export the class instance via a function call
module.exports = (selector) => {
	return new idf(selector);
};