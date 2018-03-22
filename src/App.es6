
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
			let idf_form_object = {
				title: '',
				formElements: []
			};

			// Add form title field with floating button
			this.selector.innerHTML = `
				<div class="uk-container">
				<div uk-alert>
					ALERT: This is an Alert: Signify about the Form Title
				</div>
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
						<i style="margin-top:22px;" uk-icon="icon: plus" ></i>
					</a>
				</div>
			`;

			this.idf_add_btn = document.getElementById('idf_add_btn');
			this.idf_add_btn.addEventListener('click', function (event) {
				this.div_form = document.getElementById('formElements');

				let formElement = {
					key: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
					label: '',
					value: '',
					controlType: '',
					type: '',
					required: false,
					order: '',
					placeholder: '',
				};
				idf_form_object['formElements'].push(formElement);

				var div_element = document.createElement('div');
				div_element.innerHTML = `
					<div id="${ formElement['key'] }" class="uk-card uk-card-default uk-card-body">					
						<form class="uk-form-horizontal uk-margin-large">
							<div class="uk-margin">
								<label class="uk-form-label" for="form-horizontal-text">Question Type</label>
								<div class="uk-form-controls">
									<select class="uk-select" id="form-horizontal-select">
										<option>
											<span class="uk-form-icon" uk-icon="icon: user"></span>
											Option 01
										</option>
										<option>Option 02</option>
									</select>
								</div>
							</div>
							<div class="uk-margin">
								<!-- Selected Question Type Content -->
								<div class="uk-form-controls uk-form-controls-text">
									<label><input class="uk-radio" type="radio" name="radio1"> Option 01</label><br>
									<label><input class="uk-radio" type="radio" name="radio1"> Option 02</label>
								</div>
							</div>
							<div class="uk-margin">
								<div class="uk-form-controls uk-form-controls-text">
									<ul class="tg-list">
										<a style="padding:10px;" id="${ formElement['key'] }_remove" uk-icon="trash" uk-icon="icon: check; ratio: 3.5" 
										uk-tooltip="title: Remove Question; pos: bottom"></a>
										<span style="padding-left:25px;">|</span>
										<li class="tg-list-item" style="display:flex;">
											<span style="padding-top: 4px;">Required :</span>
											<input class="tgl tgl-flip" id="${ formElement['key'] }_cb" type="checkbox"/>
											<label id="${ formElement['key'] }_lbl" class="tgl-btn" data-tg-off="Nope" data-tg-on="Yeah!" for="${ formElement['key'] }_cb"
												style="margin-left:15px;"></label>
										</li>
									</ul>
								</div>
							</div>
						</form>
					</div>
				`;
				this.div_form.appendChild(div_element);

				// set required status of formElement
				this.requiredButton = document.getElementById(`${ formElement['key'] }_lbl`);
				this.requiredButton.addEventListener('click', function (event) {
					// get relevant formElement
					idf_form_object['formElements'].forEach(element => {
						if (element['key'] == getByKey(event.target.id)) {
							// change formElement required status
							element['required'] = !element['required'];
						}
					});
				});

				// remove formElement
				this.deleteFormElementBtn = document.getElementById(`${ formElement['key'] }_remove`);
				this.deleteFormElementBtn.addEventListener('click', function (event) {
					// select click event on anchor-icon
					if (event.target.nodeName == 'A') {
						var x = idf_form_object['formElements'].forEach((element, index) => {
							if (element['key'] == getByKey(event.target.id)) {
								idf_form_object['formElements'].splice(index, 1);
								// delete relative html content
								this.currentDiv = document.getElementById(`${ formElement['key'] }`);
								console.log(this.currentDiv);
								this.currentDiv.parentNode.removeChild(this.currentDiv);
							}
						});
						// try including the splice method remoing the filter metho
					}
				});

				// splice id string
				function getByKey(key) {
					var currentKey = key;
					var selector = currentKey.indexOf('_');
					currentKey = currentKey.substring(0, selector != -1 ? selector : currentKey.length);
					return currentKey; // return element key which corresponds to the actual formElement
				}
			});
		}
		return this.selector;
	}

	refresh() {
		
	}
}

// export the class instance via a function call
module.exports = (selector) => {
	return new idf(selector);
};