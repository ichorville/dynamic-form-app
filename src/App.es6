
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
					ALERT: Select Question Field To Edit 
				</div>
					<div class="uk-child-width-expand@s" uk-grid style="margin-bottom: 20px;padding-bottom: 100px;">
						<div id="formElements">
							<div id="form_title_parent">
								<div id="form_title" class="uk-card uk-card-default uk-card-body inactive">
									<form id="title-form" class="uk-form-horizontal uk-margin-large">
										<div class="uk-margin">
											<label class="uk-form-label" for="form-horizontal-text">Form Name</label>
											<div class="uk-form-controls">
												<input class="uk-input" id="form-input" type="text" placeholder="Please Enter Form Name...">
											</div>
										</div>
									</form>
									<div class="uk-margin hidden">
										<h1 id="form-title-preview">Untitled form</h1>
									</div>
								</div>
							</div>
						</div>
					</div>
					<a id="idf_add_btn" class="float" uk-tooltip="title: Add Question; pos: bottom">
						<i style="margin-top: 15px;font-size: 30px;" class="material-icons">&#xE145;</i>
					</a>
				</div>
			`;

			// make form title editable
			var formTitle = document.getElementById('form_title_parent');
			formTitle.addEventListener('click', makeTitleEditable);

			// make each added question editable
			function editQuestion(event) {
				idf_form_object['formElements'].forEach(element => {
					var card = document.getElementById(`${ element['key'] }_parent`);
					if (card.children[0].id == getByKey(event.target.id)) {
						card.children[0].classList.remove('inactive');
						card.children[0].classList.add('active');
						formTitle.children[0].classList.remove('active');
						formTitle.children[0].classList.add('inactive');
						formTitle.addEventListener('click', makeTitleEditable);
						// remove event handler to avoid multiple triggering of the function 
						card.removeEventListener('click', editQuestion);
					} else {
						card.children[0].classList.remove('active');
						card.children[0].classList.add('inactive');
						formTitle.children[0].classList.remove('active');
						formTitle.children[0].classList.add('inactive');
						// make all other questions editable
						card.addEventListener('click', editQuestion);
						formTitle.addEventListener('click', makeTitleEditable);
					}
				});
			}

			// make form title editable
			function makeTitleEditable(event) {
				formTitle.children[0].classList.remove('inactive');
				formTitle.children[0].classList.add('active');
				formTitle.removeEventListener('click', makeTitleEditable);

				idf_form_object['formElements'].forEach(element => {
					var questionCard = document.getElementById(`${ element['key'] }_parent`);
					questionCard.children[0].classList.remove('active');
					questionCard.children[0].classList.add('inactive');
					questionCard.addEventListener('click', editQuestion);
				});
			}

			// splice id string
			function getByKey(key) {
				var currentKey = key;
				var selector = currentKey.indexOf('_');
				currentKey = currentKey.substring(0, selector != -1 ? selector : currentKey.length);
				return currentKey; // return element key which corresponds to the actual formElement
			}

			var formInput = document.getElementById('form-input');
			var formTitlePreview = document.getElementById('form-title-preview');
			formInput.addEventListener('keyup', (event) => {
				idf_form_object['title'] = event.target.value;
				formTitlePreview.innerHTML = event.target.value;
			});

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
					<div id="${ formElement['key'] }" class="uk-card uk-card-default uk-card-body active">					
						<form class="uk-form-horizontal uk-margin-large">
							<div class="uk-margin">
								<label class="uk-form-label" for="form-horizontal-text">Question Type</label>
								<div class="uk-form-controls">
									<input id="selectedType" class="uk-input" disabled type="text" placeholder="Short answer">
									<div class="dropdownContain">
										<div class="dropOut">
											<ul>
												<li id="short_text">
													<i id="short_text" class="material-icons">short_text</i>
													<span id="short_text" class="icon-text">Short answer</span>
												</li>
												<li id="paragraph">
													<i id="paragraph" class="material-icons">subject</i>
													<span id="paragraph" class="icon-text">Paragraph</span>
												</li>
												<li id="multiple_choice" style="border-top: 1px solid rgba(0,0,0,0.12);">
													<i id="multiple_choice" class="material-icons">radio_button_checked</i>
													<span id="multiple_choice" class="icon-text">Multiple Choice</span>
												</li>
												<li id="checkbox">
													<i id="checkbox" class="material-icons">check_box</i>
													<span id="checkbox" class="icon-text">Checkboxes</span>
												</li>
												<li id="dropdown">
													<i id="dropdown" class="material-icons">arrow_drop_down_circle</i>
													<span id="dropdown" class="icon-text">Dropdown</span>
												</li>
												<li id="date" style="border-top: 1px solid rgba(0,0,0,0.12);">
													<i id="date" class="material-icons">event</i>
													<span id="date" class="icon-text">Date</span>
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
											id="short_text_input"
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
							<div id="bottom-controls" class="uk-margin">
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
						<div id="hiddenElement" class="uk-margin hidden">
							<h1 id="${ formElement['key'] }_title_preview" class="question-preview">Untitled Question</h1>
							<span class="short-answer-text">Short answer text</span>
							<div style="border-bottom: 1px dotted rgba(0,0,0,0.38);margin-top: -10px;"></div>
						</div>
					</div>
				`;
				this.div_form.appendChild(div_element);

				// assign keyup event for raw textInput
				var shortTextInput = document.querySelector(`#${ formElement['key'] } #short_text_input`);
				var titlePreview = document.getElementById(`${ formElement['key'] }_title_preview`);
				shortTextInput.addEventListener('keyup', (event) => {
					// assign text to preview text
					titlePreview.innerHTML = event.target.value;
				});

				// give id to parent element of question DOM
				var createdCard = document.querySelector(`#${ formElement['key'] }.uk-card-default`).parentElement;
				createdCard.id = `${ formElement['key'] }_parent`;
				
				// make all previous cards inactive
				idf_form_object['formElements'].forEach(element => {
					var formCard = document.getElementById(`${ element['key'] }_parent`);
					if (formCard.children[0].id != formElement['key']) {
						formCard.children[0].classList.remove('active');
						formCard.children[0].classList.add('inactive');
						// assign click event events to make each question editable
						formCard.addEventListener('click', editQuestion);
					}
				});
				// make form title inactive
				formTitle.children[0].classList.remove('active');
				formTitle.children[0].classList.add('inactive');
				formTitle.addEventListener('click', makeTitleEditable);

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
					var x = idf_form_object['formElements'].forEach((element, index) => {
						if (element['key'] == getByKey(event.target.id)) {
							idf_form_object['formElements'].splice(index, 1);
							// delete relative html content
							this.currentDiv = document.getElementById(`${ formElement['key'] }`);
							document.getElementById('formElements').removeChild(this.currentDiv.parentNode);
						}
					});
				});

				this.selectedQuestionType = document.querySelector(`#${ formElement['key'] } .dropdownContain`);
				this.selectedQuestionType.addEventListener('click', (event) => {
					var selectedType = document.querySelector(`#${ formElement['key'] } #selectedType`);
					var selectedQuestionDOM = document.querySelector(`#${ formElement['key'] } #selected_question_dom`);
					var hiddenElement = document.querySelector(`#${ formElement['key'] } #hiddenElement`)
					var elementID = event.target.id;
					switch (elementID) {
						// Short text form selection
						case 'short_text':
							selectedType.placeholder = 'Short answer';
							selectedQuestionDOM.innerHTML = `
								<div class="uk-margin">
									<label class="uk-form-label" for="form-horizontal-text">Question Name</label>
									<div class="uk-form-controls">
										<input 
											id="short_text_input"
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
							`;
							hiddenElement.innerHTML = `
								<h1 id="${ formElement['key'] }_title_preview" class="question-preview">Untitled Question</h1>
								<span class="short-answer-text">Short answer text</span>
								<div style="border-bottom: 1px dotted rgba(0,0,0,0.38);margin-top: -10px;"></div>
							`;
							// assign keyup event for new textInput
							var shortTextInput = document.querySelector(`#${ formElement['key'] } #short_text_input`);
							var titlePreview = document.getElementById(`${ formElement['key'] }_title_preview`);
							shortTextInput.addEventListener('keyup', (event) => {
								// assign text to preview text
								titlePreview.innerHTML = event.target.value;
							});
							break;
						// Textarea selection
						case 'paragraph':
							selectedType.placeholder = 'Paragraph';
							selectedQuestionDOM.innerHTML = `
								<div class="uk-margin">
									<label class="uk-form-label" for="form-horizontal-text">Question Name</label>
									<div class="uk-form-controls">
										<input 
											id="short_text_input"
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
											placeholder="Long answer text">
									</div>
								</div>
							`;
							hiddenElement.innerHTML = `
								<h1 id="${ formElement['key'] }_title_preview" class="question-preview">Untitled Question</h1>
								<span class="short-answer-text">Long answer text</span>
								<div style="border-bottom: 1px dotted rgba(0,0,0,0.38);margin-top: -10px;"></div>
							`;
							// assign keyup event for new textInput
							var shortTextInput = document.querySelector(`#${ formElement['key'] } #short_text_input`);
							var titlePreview = document.getElementById(`${ formElement['key'] }_title_preview`);
							shortTextInput.addEventListener('keyup', (event) => {
								// assign text to preview text
								titlePreview.innerHTML = event.target.value;
							});
							break;
						// Radio button selection 
						case 'multiple_choice':
							var rawOption = {
								key: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
								value: ''
							};
							// create new attribute options in formElement
							formElement['options'] = [];
							formElement['options'].push(rawOption);
							selectedType.placeholder = 'Multiple Choice';
							selectedQuestionDOM.innerHTML = `
								<div class="uk-margin">
									<label class="uk-form-label" for="form-horizontal-text">Question Name</label>
									<div class="uk-form-controls">
										<input 
											id="short_text_input"
											class="uk-input" 
											type="text" 
											placeholder="Question Name">
									</div>
								</div>
								<div class="uk-margin">
									<label class="uk-form-label" for="form-horizontal-text">Content</label>
									<div class="uk-form-controls">
										<div class="uk-inline" style="display:block;">
											<label class="input-icon"><input class="uk-radio" type="radio" disabled></label>
											<i class="material-icons input-remove" uk-tooltip="title: Remove; pos: bottom">clear</i>	
											<input style="padding-left:40px;" class="uk-input" type="text">
										</div>
										<div class="uk-inline" style="display:block;padding-top:10px;">
											<label class="input-icon" style="padding-top:10px;">
												<input class="uk-radio" type="radio" disabled>
											</label>
											<span id="add_content" style="padding-left:40px;">Add Option</span>
											<div style="border-bottom: 1px dotted rgba(0,0,0,0.38);width: 80px;margin-left: 40px;"></div>
										</div>
									</div>
								</div>
							`;

							var checkbox_addOptions = document.querySelector(`#${ formElement['key'] } #add_content`);
							checkbox_addOptions.addEventListener('click', (event) => {

							});
							break;
					}
				});
			});
		}
		return this.selector;
	}
}

// export the class instance via a function call
module.exports = (selector) => {
	return new idf(selector);
};