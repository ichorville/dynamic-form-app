
"use strict";
// import styles from '../style.css'
import UIkit from 'uikit';


class idf {
	constructor(selector) {
		this.selector = document.querySelector(selector);
		this.idf_form_object = {
			title: '',
			formElements: []
		};
	}

	html(content = null) {
		if (content !== null) {
			this.selector.innerHTML = content;
		}
		return this.selector.innerHTML;
	}

	init(content = null) {
		if (content == null) {
			// Add form title field with floating button
			this.selector.innerHTML = `
				<div id="form-container" class="uk-container">
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
						<i style="margin-top: 20px;font-size: 20px;" class="material-icons">&#xE145;</i>
					</a>
					<a id="idf_submit_btn" class="float-left" uk-tooltip="title: Submit Form; pos: bottom">
						<i style="margin-top: 20px;font-size: 20px;" class="material-icons">&#xE876;</i>
					</a>
					<a id="idf_preview_btn" class="float-top-right" uk-tooltip="title: Preview; pos: bottom">
						<i style="margin-top: 20px;font-size: 20px;" class="material-icons">&#xE8F4;</i>
					</a>
				</div>
			`;

			// make each added question editable
			let editQuestion = (event) => {
				this.idf_form_object['formElements'].forEach((element) => {
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
			let makeTitleEditable = (event) => {
				formTitle.children[0].classList.remove('inactive');
				formTitle.children[0].classList.add('active');
				formTitle.removeEventListener('click', makeTitleEditable);

				this.idf_form_object['formElements'].forEach((element) => {
					var questionCard = document.getElementById(`${ element['key'] }_parent`);
					questionCard.children[0].classList.remove('active');
					questionCard.children[0].classList.add('inactive');
					questionCard.addEventListener('click', editQuestion);
				});
			}

			// make form title editable
			var formTitle = document.getElementById('form_title_parent');
			formTitle.addEventListener('click', makeTitleEditable);

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
				this.idf_form_object['title'] = event.target.value;
				formTitlePreview.innerHTML = event.target.value;
			});

			this.idf_submit_btn = document.getElementById('idf_submit_btn');
			this.idf_submit_btn.addEventListener('click', (event) => {
				console.log(this.idf_form_object);
			});

			this.idf_preview_btn = document.getElementById('idf_preview_btn');
			this.idf_preview_btn.addEventListener('click', (event) => {
				var container = document.getElementById('form-container');
				container.classList.add('hidden');
				
				var loader = document.createElement('div');
				loader.id = 'loader';
				loader.classList.add('wrapper', 'animated', 'fadeIn');
				loader.innerHTML = `
					<ul class="loader-list">
						<li>
							<div class="loader center"><span></span></div>
						</li>
					</ul>
				`;
				container.parentElement.appendChild(loader);

				var preview_form = document.createElement('div');
				preview_form.id = 'form-preview';
				preview_form.classList.add('uk-container');

				// Intial preview DOM element
				preview_form.innerHTML = `
					<div uk-alert>
						ALERT: Form Preview 
					</div>
					<div class="uk-child-width-expand@s" uk-grid style="margin-bottom: 20px;padding-bottom: 100px;">
						<div class="uk-first-column">
							<div class="uk-card uk-card-default uk-card-body">
								<form id="previewForm" class="uk-form-stacked">
									<fieldset class="uk-fieldset">
										<legend class="uk-legend">${ this.idf_form_object['title'] == '' ? 'Untitled Form' : this.idf_form_object['title'] }</legend>
									</fieldset>
								</form>
							</div>
						</div>
					</div>
				`;
				container.parentElement.appendChild(preview_form);

				// change prevew DOM according to formElement controlType
				var previewForm = document.getElementById('previewForm');
				this.idf_form_object['formElements'].forEach((element) => {
					var formDiv = document.createElement('div');
					formDiv.classList.add('uk-margin');
					formDiv.id = element['key'];
					switch (element['controlType']) {
						// Short text form 
						case 'short_text':	
							formDiv.innerHTML = `
								<label class="uk-form-label" for="form-stacked-text">${ element['placeholder'] == '' ? 'Untitled Question' : element['placeholder'] }</label>
								<div class="uk-form-controls">
									<input class="uk-input" id="form-stacked-text" type="text" placeholder="Some text...">
								</div>
							`;	
							previewForm.appendChild(formDiv);
						break;
						// Paragraph form 
						case 'paragraph':
							formDiv.innerHTML = `
								<label class="uk-form-label" for="form-stacked-text">${ element['placeholder'] == '' ? 'Untitled Question' : element['placeholder'] }</label>
								<div class="uk-form-controls">
									<textarea class="uk-textarea" rows="5" placeholder="Textarea"></textarea>
								</div>
							`;
							previewForm.appendChild(formDiv);
						break;	
						// Radio Button
						case 'multiple_choice':
							formDiv.innerHTML = `
								<div class="uk-form-label">${ element['placeholder'] == '' ? 'Untitled Question' : element['placeholder'] }</div>
								<div id="preview_radio_options" class="uk-form-controls uk-form-controls-text">
								</div>
							`;
							previewForm.appendChild(formDiv);
							var currentPreviewOptions = document.querySelector(`#preview_radio_options`);
							element['options'].forEach((option, index) => {
								var optionLbl = document.createElement('label');
								optionLbl.style.cssText = 'display:block';
								optionLbl.innerHTML = `<input style="margin-right:5px;" class="uk-radio" type="radio" name="${ option['key'] }">${ option['value'] == '' ? 'Radio ' + (index + 1)  : option['value'] }</label>`;
								currentPreviewOptions.appendChild(optionLbl);
							});
						break;
						// Checkbox
						case 'checkbox':
							formDiv.innerHTML = `
								<div class="uk-form-label">${ element['placeholder'] == '' ? 'Untitled Question' : element['placeholder'] }</div>
								<div id="preview_checkbox_options" class="uk-form-controls">
								</div>
							`;
							previewForm.appendChild(formDiv);
							var currentPreviewOptions = document.querySelector(`#preview_checkbox_options`);
							element['options'].forEach((option, index) => {
								var optionLbl = document.createElement('label');
								optionLbl.style.cssText = 'display:block';
								optionLbl.innerHTML = `<input style="margin-right:5px;" class="uk-checkbox" type="checkbox" name="${ option['key'] }">${ option['value'] == '' ? 'Radio ' + (index + 1)  : option['value'] }</label>`;
								currentPreviewOptions.appendChild(optionLbl);
							});
						break;
						// Dropdown
						case 'dropdown':
							formDiv.innerHTML = `
								<label class="uk-form-label" for="form-horizontal-select">${ element['placeholder'] == '' ? 'Untitled Question' : element['placeholder'] }</label>
								<div class="uk-form-controls">
									<select id="preview_select_options" class="uk-select" id="form-horizontal-select">
									</select>
								</div>
							`;
							previewForm.appendChild(formDiv);
							var currentPreviewOptions = document.querySelector(`#preview_select_options`);							
							element['options'].forEach((option, index) => {
								var optionLbl = document.createElement('option');
								optionLbl.innerHTML = `${ option['value'] == '' ? 'Option ' + (index + 1)  : option['value'] }`;
								currentPreviewOptions.appendChild(optionLbl);
							});
						break;
						// Date and time
						case 'date':
						break;					
					}
				});

				// remover loader content from DOM
				loader.classList.remove('fadeIn');
				loader.classList.add('fadeOut');
				setTimeout(() => {
					container.parentElement.removeChild(loader);
				}, 1000);

				setTimeout(() => {
					var bach_btn = document.createElement('div');
					bach_btn.innerHTML = `
						<a id="idf_back_btn" class="float-top-left" uk-tooltip="title: Back; pos: right">
							<i style="margin-top: 20px;font-size: 20px;" class="material-icons">&#xE5C4;</i>
						</a>
					`;
					preview_form.appendChild(bach_btn);
					// change back to Edit view
					var backBtn = document.getElementById('idf_back_btn');
					backBtn.addEventListener('click', function (event) {
						var container = document.getElementById('form-container');
						container.parentElement.removeChild(preview_form);
						container.classList.remove('hidden');
					});
				}, 1000);
			});

			this.idf_add_btn = document.getElementById('idf_add_btn');
			this.idf_add_btn.addEventListener('click', (event) => {
				this.div_form = document.getElementById('formElements');
				
				let formElement = {
					key: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
					label: '',
					value: '',
					controlType: 'short_text',
					type: '',
					required: false,
					order: this.idf_form_object['formElements'].length + 1,
					placeholder: '',
				};
				this.idf_form_object['formElements'].push(formElement);

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
					formElement['label'] = event.target.value;
					formElement['placeholder'] = event.target.value;
				});

				// give id to parent element of question DOM
				var createdCard = document.querySelector(`#${ formElement['key'] }.uk-card-default`).parentElement;
				createdCard.id = `${ formElement['key'] }_parent`;
				
				// make all previous cards inactive
				this.idf_form_object['formElements'].forEach(element => {
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
					this.idf_form_object['formElements'].forEach(element => {
						if (element['key'] == getByKey(event.target.id)) {
							// change formElement required status
							element['required'] = !element['required'];
						}
					});
				});

				// remove formElement
				this.deleteFormElementBtn = document.getElementById(`${ formElement['key'] }_remove`);
				this.deleteFormElementBtn.addEventListener('click', (event) => {
					var x = this.idf_form_object['formElements'].forEach((element, index) => {
						if (element['key'] == getByKey(event.target.id)) {
							this.idf_form_object['formElements'].splice(index, 1);
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
							formElement['controlType'] = 'short_text';
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
							if (formElement['placeholder'] != '') {
								// populate DOM of previous data
								var shortTextInput = document.querySelector(`#${ formElement['key'] } #short_text_input`);
								var titlePreview = document.getElementById(`${ formElement['key'] }_title_preview`);
								shortTextInput.value = formElement['placeholder'];
								titlePreview.innerHTML = formElement['placeholder'];
							}
							// assign keyup event for new textInput
							var shortTextInput = document.querySelector(`#${ formElement['key'] } #short_text_input`);
							var titlePreview = document.getElementById(`${ formElement['key'] }_title_preview`);
							shortTextInput.addEventListener('keyup', (event) => {
								// assign text to preview text
								titlePreview.innerHTML = event.target.value;
								formElement['label'] = event.target.value;
								formElement['placeholder'] = event.target.value;
							});
							break;
						// Textarea selection
						case 'paragraph':
							formElement['controlType'] = 'paragraph';
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
							if (formElement['placeholder'] != '') {
								// populate DOM of previous data
								var shortTextInput = document.querySelector(`#${ formElement['key'] } #short_text_input`);
								var titlePreview = document.getElementById(`${ formElement['key'] }_title_preview`);
								shortTextInput.value = formElement['placeholder'];
								titlePreview.innerHTML = formElement['placeholder'];
							}
							// assign keyup event for new textInput
							var shortTextInput = document.querySelector(`#${ formElement['key'] } #short_text_input`);
							var titlePreview = document.getElementById(`${ formElement['key'] }_title_preview`);
							shortTextInput.addEventListener('keyup', (event) => {
								// assign text to preview text
								titlePreview.innerHTML = event.target.value;
								formElement['label'] = event.target.value;
								formElement['placeholder'] = event.target.value;
							});
							break;
						// Radio button selection 
						case 'multiple_choice':
							function editPreviewOptions(innetText) {
								var previewOptions = document.querySelector(`#${ formElement['key'] } #previewOptions`);
								previewOptions.innerHTML = ``;
								formElement['options'].forEach((element, index) => {
									var div = document.createElement('div');
			
									var label = document.createElement('label');
									label.innerHTML = innetText;
									previewOptions.insertBefore(label, span);
									label.classList.add('input-preview-icon');
			
									var span = document.createElement('span');
									if (element['value'] != '') {
										span.innerHTML = `${ element['value'] }`;
									} else {
										span.innerHTML = `Option ${ index + 1 }`;
									}
									span.style.display = 'block';
									span.style.marginBottom = '-20px';
									span.style.marginTop = '-25px';
									span.style.paddingLeft = '25px';
									span.classList.add('short-answer-text');
			
									div.appendChild(label);
									div.appendChild(span);
									previewOptions.appendChild(div);
								});
							}
							formElement['controlType'] = 'multiple_choice';
							selectedType.placeholder = 'Multiple Choice';
							if (formElement['options']) {
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
										<div id="${ formElement['key'] }_options" class="uk-form-controls">
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
								hiddenElement.innerHTML = `
									<h1 id="${ formElement['key'] }_title_preview" class="question-preview">Untitled Question</h1>
									<div id="previewOptions">
									</div>
								`;

								var options = document.getElementById(`${ formElement['key'] }_options`);
								formElement['options'].forEach((element, index) => {
									var newOption = document.createElement('div');
									newOption.innerHTML = `
										<label class="input-icon"><input class="uk-radio" type="radio" disabled></label>
										<i id="${ element['key'] }_removeOption" class="material-icons input-remove" uk-tooltip="title: Remove; pos: bottom">clear</i>	
										<input id="${ element['key'] }_option" style="padding-left:40px;" class="uk-input" type="text">
									`;
									options.insertBefore(newOption, options.childNodes[index]); 
									document.getElementById(`${ element['key'] }_option`).value = element['value'];
									document.getElementById(`${ element['key'] }_option`).placeholder = ` Option ${ index + 1 }`;
									document.getElementById(`${ element['key'] }_option`).addEventListener('keyup', (event) => {
										element['value'] = event.target.value;
										editPreviewOptions(`<input class="uk-radio" type="radio" disabled>`);
									});
									// set CSS properties to parent eliment
									var childOptionsContent = document.getElementById(`${ element['key'] }_removeOption`);
									childOptionsContent.parentElement.id = element['key'];
									childOptionsContent.parentElement.classList.add('uk-inline');
									childOptionsContent.parentElement.style.display = 'block';
									childOptionsContent.addEventListener('click', (event) => {
										formElement['options'].splice(index, 1);
											var currentOptionDiv = event.target.parentElement;
											// remove element from DOM
											document.getElementById(`${ formElement['key'] }_options`).removeChild(currentOptionDiv);
											editPreviewOptions(`<input class="uk-radio" type="radio" disabled>`);
									});
								});
								editPreviewOptions(`<input class="uk-radio" type="radio" disabled>`);
							} else {
								var rawOption = {
									key: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
									value: ''
								};
								// create new attribute options in formElement
								formElement['options'] = [];
								formElement['options'].push(rawOption);
	
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
										<div id="${ formElement['key'] }_options" class="uk-form-controls">
											<div id="${ rawOption['key'] }" class="uk-inline" style="display:block;">
												<label class="input-icon"><input class="uk-radio" type="radio" disabled></label>
												<i id="${ rawOption['key'] }_removeOption" class="material-icons input-remove" uk-tooltip="title: Remove; pos: bottom">clear</i>	
												<input id="${ rawOption['key'] }_option" style="padding-left:40px;" class="uk-input" type="text">
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
								hiddenElement.innerHTML = `
									<h1 id="${ formElement['key'] }_title_preview" class="question-preview">Untitled Question</h1>
									<div id="previewOptions">
									</div>
								`;
								editPreviewOptions(`<input class="uk-radio" type="radio" disabled>`);
	
								var rawOptionField = document.getElementById(`${ rawOption['key'] }_option`);
								rawOptionField.placeholder = 'Option 1';
								rawOptionField.addEventListener('keyup', (event) => {
									formElement['options'].forEach(element => {
										if (element['key'] == getByKey(event.target.id)) {
											element['value'] = event.target.value;
											editPreviewOptions(`<input class="uk-radio" type="radio" disabled>`);
										}
									});
								});
	
								var removeOption = document.getElementById(`${ rawOption['key'] }_removeOption`);
								removeOption.addEventListener('click', (event) => {
									formElement['options'].forEach((element, index) => {
										if (element['key'] == getByKey(event.target.id)) {
											// remove option
											formElement['options'].splice(index, 1);
											var currentOptionDiv = event.target.parentElement;
											// remove element from DOM
											document.getElementById(`${ formElement['key'] }_options`).removeChild(currentOptionDiv);
											editPreviewOptions(`<input class="uk-radio" type="radio" disabled>`);
										}
									});
								});
							}
							// bind previous options to DOM if present
							var radioBtn_title = document.querySelector(`#${ formElement['key'] } #short_text_input`);
							var radioBtn_title_preview = document.getElementById(`${ formElement['key'] }_title_preview`);
							if (formElement['placeholder'] != '') {
								radioBtn_title.value = formElement['placeholder'];
								radioBtn_title.placeholder = 'Question Name';
								radioBtn_title_preview.innerHTML = formElement['placeholder'];
							} else {
								radioBtn_title.value = '';
								radioBtn_title.placeholder = 'Question Name';
								radioBtn_title_preview.innerHTML = 'Untitled Question'
							}
							
							editPreviewOptions(`<input class="uk-radio" type="radio" disabled>`);

							// assign keyup event for new textInput
							var shortTextInput = document.querySelector(`#${ formElement['key'] } #short_text_input`);
							var titlePreview = document.getElementById(`${ formElement['key'] }_title_preview`);
							shortTextInput.addEventListener('keyup', (event) => {
								// assign text to preview text
								titlePreview.innerHTML = event.target.value;
								formElement['label'] = event.target.value;
								formElement['placeholder'] = event.target.value;
							});

							var radioBtn_addOptions = document.querySelector(`#${ formElement['key'] } #add_content`);
							radioBtn_addOptions.addEventListener('click', (event) => {
								var rawOption = {
									key: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
									value: ''
								};
								formElement['options'].push(rawOption);

								// bind new option to DOM
								var options = document.getElementById(`${ formElement['key'] }_options`);
								var newOption = document.createElement('div');
								newOption.innerHTML = `
									<label class="input-icon"><input class="uk-radio" type="radio" disabled></label>
									<i id="${ rawOption['key'] }_removeOption" class="material-icons input-remove" uk-tooltip="title: Remove; pos: bottom">clear</i>	
									<input id="${ rawOption['key'] }_option" style="padding-left:40px;" class="uk-input" type="text">
								`;
								// set CSS properties to parent eliment
								options.insertBefore(newOption, options.childNodes[formElement['options'].length]); 
								document.getElementById(`${ rawOption['key'] }_option`).placeholder = `Option ${ formElement['options'].length }`;

								var childOptionsContent = document.getElementById(`${ rawOption['key'] }_removeOption`);
								childOptionsContent.parentElement.id = rawOption['key'];
								childOptionsContent.parentElement.classList.add('uk-inline');
								childOptionsContent.parentElement.style.display = 'block';
								editPreviewOptions(`<input class="uk-radio" type="radio" disabled>`);
								
								// assign event handkler to pass data to the array
								var radioBtn_option = document.getElementById(`${ rawOption['key'] }_option`);
								radioBtn_option.addEventListener('keyup', (event) => {
									formElement['options'].forEach(element => {
										if (element['key'] == getByKey(event.target.id)) {
											element['value'] = event.target.value;
											editPreviewOptions(`<input class="uk-radio" type="radio" disabled>`);
										}
									});
								});

								// add click event handler to remove element
								var radioBtn_remove = document.getElementById(`${ rawOption['key'] }_removeOption`);
								radioBtn_remove.addEventListener('click', (event) => {
									formElement['options'].forEach((element, index) => {
										if (element['key'] == getByKey(event.target.id)) {
											// remove option
											formElement['options'].splice(index, 1);
											var currentOptionDiv = event.target.parentElement;
											// remove element from DOM
											document.getElementById(`${ formElement['key'] }_options`).removeChild(currentOptionDiv);
											editPreviewOptions(`<input class="uk-radio" type="radio" disabled>`);
										}
									});
								});
							});
						break;
						// Checkbox selection
						case 'checkbox':
							function editPreviewOptions(innetText) {
								var previewOptions = document.querySelector(`#${ formElement['key'] } #previewOptions`);
								previewOptions.innerHTML = ``;
								formElement['options'].forEach((element, index) => {
									var div = document.createElement('div');
			
									var label = document.createElement('label');
									label.innerHTML = innetText;
									previewOptions.insertBefore(label, span);
									label.classList.add('input-preview-icon');
			
									var span = document.createElement('span');
									if (element['value'] != '') {
										span.innerHTML = `${ element['value'] }`;
									} else {
										span.innerHTML = `Option ${ index + 1 }`;
									}
									span.style.display = 'block';
									span.style.marginBottom = '-20px';
									span.style.marginTop = '-25px';
									span.style.paddingLeft = '25px';
									span.classList.add('short-answer-text');
			
									div.appendChild(label);
									div.appendChild(span);
									previewOptions.appendChild(div);
								});
							}
							formElement['controlType'] = 'checkbox';
							selectedType.placeholder = 'Checkbox';
							if (formElement['options']) {
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
										<div id="${ formElement['key'] }_options" class="uk-form-controls">
											<div class="uk-inline" style="display:block;padding-top:10px;">
												<label class="input-icon" style="padding-top:10px;">
													<input class="uk-checkbox" type="checkbox" disabled>
												</label>
												<span id="add_content" style="padding-left:40px;">Add Option</span>
												<div style="border-bottom: 1px dotted rgba(0,0,0,0.38);width: 80px;margin-left: 40px;"></div>
											</div>
										</div>
									</div>
								`;
								hiddenElement.innerHTML = `
									<h1 id="${ formElement['key'] }_title_preview" class="question-preview">Untitled Question</h1>
									<div id="previewOptions">
									</div>
								`;
								
								var options = document.getElementById(`${ formElement['key'] }_options`);
								formElement['options'].forEach((element, index) => {
									var newOption = document.createElement('div');
									newOption.innerHTML = `
										<label class="input-icon"><input class="uk-checkbox" type="checkbox" disabled></label>
										<i id="${ element['key'] }_removeOption" class="material-icons input-remove" uk-tooltip="title: Remove; pos: bottom">clear</i>	
										<input id="${ element['key'] }_option" style="padding-left:40px;" class="uk-input" type="text">
									`;
									options.insertBefore(newOption, options.childNodes[index]); 
									document.getElementById(`${ element['key'] }_option`).value = element['value'];
									document.getElementById(`${ element['key'] }_option`).placeholder = ` Option ${ index + 1 }`;
									document.getElementById(`${ element['key'] }_option`).addEventListener('keyup', (event) => {
										element['value'] = event.target.value;
										editPreviewOptions(`<input class="uk-checkbox" type="checkbox" disabled>`);
									});
									// set CSS properties to parent eliment
									var childOptionsContent = document.getElementById(`${ element['key'] }_removeOption`);
									childOptionsContent.parentElement.id = element['key'];
									childOptionsContent.parentElement.classList.add('uk-inline');
									childOptionsContent.parentElement.style.display = 'block';
									childOptionsContent.addEventListener('click', (event) => {
										formElement['options'].splice(index, 1);
											var currentOptionDiv = event.target.parentElement;
											// remove element from DOM
											document.getElementById(`${ formElement['key'] }_options`).removeChild(currentOptionDiv);
											editPreviewOptions(`<input class="uk-checkbox" type="checkbox" disabled>`);
									});
								});
								editPreviewOptions(`<input class="uk-checkbox" type="checkbox" disabled>`);
							} else {
								var rawOption = {
									key: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
									value: ''
								};
								// create new attribute options in formElement
								formElement['options'] = [];
								formElement['options'].push(rawOption);
	
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
										<div id="${ formElement['key'] }_options" class="uk-form-controls">
											<div id="${ rawOption['key'] }" class="uk-inline" style="display:block;">
												<label class="input-icon"><input class="uk-checkbox" type="checkbox" disabled></label>
												<i id="${ rawOption['key'] }_removeOption" class="material-icons input-remove" uk-tooltip="title: Remove; pos: bottom">clear</i>	
												<input id="${ rawOption['key'] }_option" style="padding-left:40px;" class="uk-input" type="text">
											</div>
											<div class="uk-inline" style="display:block;padding-top:10px;">
												<label class="input-icon" style="padding-top:10px;">
													<input class="uk-checkbox" type="checkbox" disabled>
												</label>
												<span id="add_content" style="padding-left:40px;">Add Option</span>
												<div style="border-bottom: 1px dotted rgba(0,0,0,0.38);width: 80px;margin-left: 40px;"></div>
											</div>
										</div>
									</div>
								`;
								hiddenElement.innerHTML = `
									<h1 id="${ formElement['key'] }_title_preview" class="question-preview">Untitled Question</h1>
									<div id="previewOptions">
									</div>
								`;
								editPreviewOptions(`<input class="uk-checkbox" type="checkbox" disabled>`);
	
								var rawOptionField = document.getElementById(`${ rawOption['key'] }_option`);
								rawOptionField.placeholder = 'Option 1';
								rawOptionField.addEventListener('keyup', (event) => {
									formElement['options'].forEach(element => {
										if (element['key'] == getByKey(event.target.id)) {
											element['value'] = event.target.value;
											editPreviewOptions(`<input class="uk-checkbox" type="checkbox" disabled>`);
										}
									});
								});
	
								var removeOption = document.getElementById(`${ rawOption['key'] }_removeOption`);
								removeOption.addEventListener('click', (event) => {
									formElement['options'].forEach((element, index) => {
										if (element['key'] == getByKey(event.target.id)) {
											// remove option
											formElement['options'].splice(index, 1);
											var currentOptionDiv = event.target.parentElement;
											// remove element from DOM
											document.getElementById(`${ formElement['key'] }_options`).removeChild(currentOptionDiv);
											editPreviewOptions(`<input class="uk-checkbox" type="checkbox" disabled>`);
										}
									});
								});
							}
							// bind previous options to DOM if present
							var checkbox_title = document.querySelector(`#${ formElement['key'] } #short_text_input`);
							var checkbox_title_preview = document.getElementById(`${ formElement['key'] }_title_preview`);
							if (formElement['placeholder'] != '') {
								checkbox_title.value = formElement['placeholder'];
								checkbox_title_preview.innerHTML = formElement['placeholder'];
							} else {
								checkbox_title.value = '';
								checkbox_title.placeholder = 'Question Name';
								checkbox_title_preview.innerHTML = 'Untitled Question'
							}

							editPreviewOptions(`<input class="uk-checkbox" type="checkbox" disabled>`);

							// assign keyup event for new textInput
							var shortTextInput = document.querySelector(`#${ formElement['key'] } #short_text_input`);
							var titlePreview = document.getElementById(`${ formElement['key'] }_title_preview`);
							shortTextInput.addEventListener('keyup', (event) => {
								// assign text to preview text
								titlePreview.innerHTML = event.target.value;
								formElement['label'] = event.target.value;
								formElement['placeholder'] = event.target.value;
							});

							var checkbox_addOptions = document.querySelector(`#${ formElement['key'] } #add_content`);
							checkbox_addOptions.addEventListener('click', (event) => {
								var rawOption = {
									key: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
									value: ''
								};
								formElement['options'].push(rawOption);

								// bind new option to DOM
								var options = document.getElementById(`${ formElement['key'] }_options`);
								var newOption = document.createElement('div');
								newOption.innerHTML = `
									<label class="input-icon"><input class="uk-checkbox" type="checkbox" disabled></label>
									<i id="${ rawOption['key'] }_removeOption" class="material-icons input-remove" uk-tooltip="title: Remove; pos: bottom">clear</i>	
									<input id="${ rawOption['key'] }_option" style="padding-left:40px;" class="uk-input" type="text">
								`;
								// set CSS properties to parent eliment
								options.insertBefore(newOption, options.childNodes[formElement['options'].length]); 
								document.getElementById(`${ rawOption['key'] }_option`).placeholder = `Option ${ formElement['options'].length }`;

								var childOptionsContent = document.getElementById(`${ rawOption['key'] }_removeOption`);
								childOptionsContent.parentElement.id = rawOption['key'];
								childOptionsContent.parentElement.classList.add('uk-inline');
								childOptionsContent.parentElement.style.display = 'block';
								editPreviewOptions(`<input class="uk-checkbox" type="checkbox" disabled>`);
								
								// assign event handkler to pass data to the array
								var checkbox_option = document.getElementById(`${ rawOption['key'] }_option`);
								checkbox_option.addEventListener('keyup', (event) => {
									formElement['options'].forEach(element => {
										if (element['key'] == getByKey(event.target.id)) {
											element['value'] = event.target.value;
											editPreviewOptions(`<input class="uk-checkbox" type="checkbox" disabled>`);
										}
									});
								});

								// add click event handler to remove element
								var checkbox_remove = document.getElementById(`${ rawOption['key'] }_removeOption`);
								checkbox_remove.addEventListener('click', (event) => {
									formElement['options'].forEach((element, index) => {
										if (element['key'] == getByKey(event.target.id)) {
											// remove option
											formElement['options'].splice(index, 1);
											var currentOptionDiv = event.target.parentElement;
											// remove element from DOM
											document.getElementById(`${ formElement['key'] }_options`).removeChild(currentOptionDiv);
											editPreviewOptions(`<input class="uk-checkbox" type="checkbox" disabled>`);
										}
									});
								});
							});
						break;
						// Dropdown selection
						case 'dropdown':
							function editPreviewOptions() {
								var previewOptions = document.querySelector(`#${ formElement['key'] } #previewOptions`);
								previewOptions.innerHTML = ``;
								formElement['options'].forEach((element, index) => {
									var div = document.createElement('div');
			
									var label = document.createElement('label');
									label.innerHTML = `<spa>${ index + 1 }.</span>`;
									previewOptions.insertBefore(label, span);
									label.classList.add('input-preview-icon');
			
									var span = document.createElement('span');
									if (element['value'] != '') {
										span.innerHTML = `${ element['value'] }`;
									} else {
										span.innerHTML = `Option ${ index + 1 }`;
									}
									span.style.display = 'block';
									span.style.marginBottom = '-20px';
									span.style.marginTop = '-25px';
									span.style.paddingLeft = '25px';
									span.classList.add('short-answer-text');
			
									div.appendChild(label);
									div.appendChild(span);
									previewOptions.appendChild(div);
								});
							}
							formElement['controlType'] = 'dropdown';
							selectedType.placeholder = 'Dropdown';
							if (formElement['options']) {
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
										<div id="${ formElement['key'] }_options" class="uk-form-controls">
											<div class="uk-inline" style="display:block;padding-top:10px;">
												<label class="input-icon" style="padding-top:10px;"></label>
												<span id="add_content" style="padding-left:40px;">Add Option</span>
												<div style="border-bottom: 1px dotted rgba(0,0,0,0.38);width: 80px;margin-left: 40px;"></div>
											</div>
										</div>
									</div>
								`;
								hiddenElement.innerHTML = `
									<h1 id="${ formElement['key'] }_title_preview" class="question-preview">Untitled Question</h1>
									<div id="previewOptions">
									</div>
								`;
								
								var options = document.getElementById(`${ formElement['key'] }_options`);
								formElement['options'].forEach((element, index) => {
									var newOption = document.createElement('div');
									newOption.innerHTML = `
										<label class="input-icon"></label>
										<i id="${ element['key'] }_removeOption" class="material-icons input-remove" uk-tooltip="title: Remove; pos: bottom">clear</i>	
										<input id="${ element['key'] }_option" style="padding-left:40px;" class="uk-input" type="text">
									`;
									options.insertBefore(newOption, options.childNodes[index]); 
									document.getElementById(`${ element['key'] }_option`).value = element['value'];
									document.getElementById(`${ element['key'] }_option`).placeholder = ` Option ${ index + 1 }`;
									document.getElementById(`${ element['key'] }_option`).addEventListener('keyup', (event) => {
										element['value'] = event.target.value;
										editPreviewOptions();
									});
									// set CSS properties to parent eliment
									var childOptionsContent = document.getElementById(`${ element['key'] }_removeOption`);
									childOptionsContent.parentElement.id = element['key'];
									childOptionsContent.parentElement.classList.add('uk-inline');
									childOptionsContent.parentElement.style.display = 'block';
									childOptionsContent.addEventListener('click', (event) => {
										formElement['options'].splice(index, 1);
											var currentOptionDiv = event.target.parentElement;
											// remove element from DOM
											document.getElementById(`${ formElement['key'] }_options`).removeChild(currentOptionDiv);
											editPreviewOptions();
									});
								});
								editPreviewOptions();
							} else {
								var rawOption = {
									key: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
									value: ''
								};
								// create new attribute options in formElement
								formElement['options'] = [];
								formElement['options'].push(rawOption);
	
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
										<div id="${ formElement['key'] }_options" class="uk-form-controls">
											<div id="${ rawOption['key'] }" class="uk-inline" style="display:block;">
												<label class="input-icon"></label>
												<i id="${ rawOption['key'] }_removeOption" class="material-icons input-remove" uk-tooltip="title: Remove; pos: bottom">clear</i>	
												<input id="${ rawOption['key'] }_option" style="padding-left:40px;" class="uk-input" type="text">
											</div>
											<div class="uk-inline" style="display:block;padding-top:10px;">
												<label class="input-icon" style="padding-top:10px;"></label>
												<span id="add_content" style="padding-left:40px;">Add Option</span>
												<div style="border-bottom: 1px dotted rgba(0,0,0,0.38);width: 80px;margin-left: 40px;"></div>
											</div>
										</div>
									</div>
								`;
								hiddenElement.innerHTML = `
									<h1 id="${ formElement['key'] }_title_preview" class="question-preview">Untitled Question</h1>
									<div id="previewOptions">
									</div>
								`;
								editPreviewOptions();
	
								var rawOptionField = document.getElementById(`${ rawOption['key'] }_option`);
								rawOptionField.placeholder = 'Option 1';
								rawOptionField.addEventListener('keyup', (event) => {
									formElement['options'].forEach(element => {
										if (element['key'] == getByKey(event.target.id)) {
											element['value'] = event.target.value;
											editPreviewOptions();
										}
									});
								});
	
								var removeOption = document.getElementById(`${ rawOption['key'] }_removeOption`);
								removeOption.addEventListener('click', (event) => {
									formElement['options'].forEach((element, index) => {
										if (element['key'] == getByKey(event.target.id)) {
											// remove option
											formElement['options'].splice(index, 1);
											var currentOptionDiv = event.target.parentElement;
											// remove element from DOM
											document.getElementById(`${ formElement['key'] }_options`).removeChild(currentOptionDiv);
											editPreviewOptions();
										}
									});
								});
							}
							// bind previous options to DOM if present
							var dropDown_title = document.querySelector(`#${ formElement['key'] } #short_text_input`);
							var dropDown_title_preview = document.getElementById(`${ formElement['key'] }_title_preview`);
							if (formElement['placeholder'] != '') {
								dropDown_title.value = formElement['placeholder'];
								dropDown_title_preview.innerHTML = formElement['placeholder'];
							} else {
								dropDown_title.value = '';
								dropDown_title.placeholder = 'Question Name';
								dropDown_title_preview.innerHTML = 'Untitled Question'
							}
							
							editPreviewOptions();

							// assign keyup event for new textInput
							var shortTextInput = document.querySelector(`#${ formElement['key'] } #short_text_input`);
							var titlePreview = document.getElementById(`${ formElement['key'] }_title_preview`);
							shortTextInput.addEventListener('keyup', (event) => {
								// assign text to preview text
								titlePreview.innerHTML = event.target.value;
								formElement['label'] = event.target.value;
								formElement['placeholder'] = event.target.value;
							});

							var dropdown_addOptions = document.querySelector(`#${ formElement['key'] } #add_content`);
							dropdown_addOptions.addEventListener('click', (event) => {
								var rawOption = {
									key: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
									value: ''
								};
								formElement['options'].push(rawOption);

								// bind new option to DOM
								var options = document.getElementById(`${ formElement['key'] }_options`);
								var newOption = document.createElement('div');
								newOption.innerHTML = `
									<label class="input-icon"></label>
									<i id="${ rawOption['key'] }_removeOption" class="material-icons input-remove" uk-tooltip="title: Remove; pos: bottom">clear</i>	
									<input id="${ rawOption['key'] }_option" style="padding-left:40px;" class="uk-input" type="text">
								`;
								
								// set CSS properties to parent eliment
								options.insertBefore(newOption, options.childNodes[formElement['options'].length]); 
								document.getElementById(`${ rawOption['key'] }_option`).placeholder = `Option ${ formElement['options'].length }`;

								var childOptionsContent = document.getElementById(`${ rawOption['key'] }_removeOption`);
								childOptionsContent.parentElement.id = rawOption['key'];
								childOptionsContent.parentElement.classList.add('uk-inline');
								childOptionsContent.parentElement.style.display = 'block';
								editPreviewOptions();
								
								// assign event handkler to pass data to the array
								var dropdown_btn_option = document.getElementById(`${ rawOption['key'] }_option`);
								dropdown_btn_option.addEventListener('keyup', (event) => {
									formElement['options'].forEach(element => {
										if (element['key'] == getByKey(event.target.id)) {
											element['value'] = event.target.value;
											editPreviewOptions();
										}
									});
								});

								// add click event handler to remove element
								var dropdownBtn_remove = document.getElementById(`${ rawOption['key'] }_removeOption`);
								dropdownBtn_remove.addEventListener('click', (event) => {
									formElement['options'].forEach((element, index) => {
										if (element['key'] == getByKey(event.target.id)) {
											// remove option
											formElement['options'].splice(index, 1);
											var currentOptionDiv = event.target.parentElement;
											// remove element from DOM
											document.getElementById(`${ formElement['key'] }_options`).removeChild(currentOptionDiv);
											editPreviewOptions();
										}
									});
								});
							});
						break;
						case 'date':
							formElement['controlType'] = 'date';
							selectedType.placeholder = 'Date';
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
											placeholder="Date">
									</div>
								</div>
							`;
							hiddenElement.innerHTML = `
								<h1 id="${ formElement['key'] }_title_preview" class="question-preview">Untitled Question</h1>
								<span class="short-answer-text">Date</span>
								<div style="border-bottom: 1px dotted rgba(0,0,0,0.38);margin-top: -10px;"></div>
							`;
							if (formElement['placeholder'] != '') {
								// populate DOM of previous data
								var shortTextInput = document.querySelector(`#${ formElement['key'] } #short_text_input`);
								var titlePreview = document.getElementById(`${ formElement['key'] }_title_preview`);
								shortTextInput.value = formElement['placeholder'];
								titlePreview.innerHTML = formElement['placeholder'];
							}
							// assign keyup event for new textInput
							var shortTextInput = document.querySelector(`#${ formElement['key'] } #short_text_input`);
							var titlePreview = document.getElementById(`${ formElement['key'] }_title_preview`);
							shortTextInput.addEventListener('keyup', (event) => {
								// assign text to preview text
								titlePreview.innerHTML = event.target.value;
								formElement['label'] = event.target.value;
								formElement['placeholder'] = event.target.value;
							});
						break;
					}
				});
			});
		}
		return this.selector, this.idf_form_object;
	}

	submit(content = null) {
		// document.getElementById(`idf_submit_btn`).addEventListener('click', (event) => {
		// 	return this.idf_form_object;
		// });
		return this.idf_form_object
	}
}

// export the class instance via a function call
module.exports = (selector) => {
	return new idf(selector);
};