
"use strict";
/**
 * Additional referrences
 * http://cssdeck.com/labs/soothing-css3-dropdown-animation
 */
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
					<div class="uk-child-width-expand@s" uk-grid style="margin-bottom: 20px;padding-bottom: 100px;">
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
					order: idf_form_object['formElements'].length + 1,
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
									<input class="uk-input" disabled type="text" placeholder="Short answer">
									<div class="dropdownContain">
										<div class="dropOut">
											<ul>
												<li>
													<i class="material-icons">short_text</i>
													<span class="icon-text">Short answer</span>
													</li>
												<li>
													<i class="material-icons">subject</i>
													<span class="icon-text">Paragraph</span>
												</li>
												<li style="border-top: 1px solid rgba(0,0,0,0.12);">
													<i class="material-icons">radio_button_checked</i>
													<span class="icon-text">Multiple Choice</span>
												</li>
												<li>
													<i class="material-icons">check_box</i>
													<span class="icon-text">Checkboxes</span>
												</li>
												<li>
													<i class="material-icons">arrow_drop_down_circle</i>
													<span class="icon-text">Dropdown</span>
												</li>
												<li style="border-top: 1px solid rgba(0,0,0,0.12);">
													<i class="material-icons">event</i>
													<span class="icon-text">Date</span>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
							<div id="selected_question_dom" class="uk-margin">
								<!-- Selected Question Type Content -->
								<div class="uk-margin">
									<label class="uk-form-label" for="form-horizontal-text">Question Name</label>
									<div class="uk-form-controls">
										<input 
											class="uk-input" 
											type="text" 
											placeholder="Question Name">
									</div>
								</div>
								<div class="uk-margin">
									<label class="uk-form-label" for="form-horizontal-text">Content</label>
									<div class="uk-form-controls">
										<input 
											class="uk-input" 
											type="text" 
											disabled
											placeholder="Short answer text">
									</div>
								</div>
							</div>
							<div id="bottom-controls" class="uk-margin" style="text-align:right;margin-bottom:0px;">
								<div class="uk-form-controls uk-form-controls-text" style="display:flex;">
									<span id="selected-type"></span>
									<span style="flex: 1 1 auto;"></span>
									<ul class="tg-list">
										<i id="${ formElement['key'] }_remove" class="material-icons" uk-tooltip="title: Remove Question; pos: bottom">delete</i>
										<span style="padding-left:25px;border-left: 1px solid #e0e0e0;height: 32px;margin: 0 16px;width: 0;"></span>
										<li class="tg-list-item" style="display:flex;margin-left:-10px;">
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

				var questionCard = document.querySelector(`#${ formElement['key'] }.uk-card-default`).parentElement;
				questionCard.id = `${ formElement['key'] }_parent`;
				questionCard.children[0].style.cssText = 'pointer-events: none';
				questionCard.addEventListener('click', function editableQuestion(event) {
					idf_form_object['formElements'].forEach(element => {
						var questionElem = document.getElementById(`${ element['key'] }_parent`);
						if (questionElem.id != element['key']) {
							questionElem.children[0].style.cssText = 'pointer-events: none';
						}
						var bottomControls = document.querySelector(`#${ element['key'] }.uk-card-default #bottom-controls`);
						bottomControls.style.cssText = 'display:none;';
					});
					event.target.children[0].style.cssText = 'padding-top: 20px;box-shadow: 0 -2px 2px 0 rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.3);margin-bottom: 2px;border-left: 3px solid #4d90fe';

					var bottomControls = document.querySelector(`#${ formElement['key'] }.uk-card-default #bottom-controls`);
					bottomControls.style.cssText = 'display:block;margin-bottom:-20px;border-top: 1px solid #e0e0e0;padding-top: 10px;';
					//  remove click event from element
					questionCard.removeEventListener('click', editableQuestion);
				});

				// set required status of formElement
				this.requiredButton = document.getElementById(`${ formElement['key'] }_lbl`);
				this.requiredButton.addEventListener('click', (event) => {
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
					console.log(event);
					var x = idf_form_object['formElements'].forEach((element, index) => {
						if (element['key'] == getByKey(event.target.id)) {
							idf_form_object['formElements'].splice(index, 1);
							// delete relative html content
							this.currentDiv = document.getElementById(`${ formElement['key'] }`);
							document.getElementById('formElements').removeChild(this.currentDiv.parentNode);
						}
					});
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
}

// export the class instance via a function call
module.exports = (selector) => {
	return new idf(selector);
};