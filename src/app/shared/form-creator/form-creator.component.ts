import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { FormElement } from '../form-elements/form-element';
import { FormTextbox } from '../form-elements/form-textbox';
import { FormDropdown } from '../form-elements/form-dropdown';
import { FormTextarea } from '../form-elements/form-textarea';
import { FormDatepicker } from '../form-elements/form-datepicker';

@Component({
	selector: 'app-form-creator',
	templateUrl: './form-creator.component.html',
	styleUrls: ['./form-creator.component.css']
})
export class FormCreatorComponent implements OnInit {

	title: string;
	submitPreview = false;

	formElements: FormElement<any>[];

	types = [
		{ icon: 'short_text', value: 'Text Field', type: 'textbox' },
		{ icon: 'subject', value: 'Text Area', type: 'textarea' },
		{ icon: 'arrow_drop_down', value: 'Dropdown', type: 'dropdown' },
		{ icon: 'event', value: 'Date', type: 'datepicker' }
	];

	constructor (
		private snackBar: MatSnackBar
	) {
		this.formElements = [];
	}

	ngOnInit() {
		
	}

	onTypeChange(event, element) {
		// fix issue in displaying icon name in mat-select
		this.types.forEach(element => {
			if (element.type == event.value) {
				event['source']._elementRef.nativeElement.children["0"].children["0"].children["0"].innerText = element.value;
			}
		});

		if (event.value == 'textbox') {
			element = new FormTextbox({
				key: element['key'],
				label: element['label'],
				value: element['value'],
				controlType: event.value,
				type: element['type'],
				required: element['required'],
				order: element['order'],
				placeholder: element['placeholder'],
				validators: element['validators']
			});
		} else if (event.value == 'textarea') {
			element = new FormTextarea({
				key: element['key'],
				label: element['label'],
				value: element['value'],
				controlType: event.value,
				type: element['type'],
				required: element['required'],
				order: element['order'],
				placeholder: element['placeholder'],
				validators: element['validators']
			});
		} else if (event.value == 'datepicker') {
			element = new FormDatepicker({
				key: element['key'],
				label: element['label'],
				value: element['value'],
				controlType: event.value,
				type: element['type'],
				required: element['required'],
				order: element['order'],
				placeholder: element['placeholder'],
				validators: element['validators']
			});
		}
	}

	addItem() {
		this.formElements.push(new FormTextbox({
			key: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5), 
			label: 'Name',
			value: '',
			controlType: 'textbox',
			type: 'text',
			required: true,
			order: 1,
			placeholder: 'Name',
			validators: [
				Validators.required
			]
		}));
	}

	requiredElement(element) {
		if (element.required == true) {
			element.required = false;
			element.validators = [];
		} else {
			element.required = true;
			element.validators = [
				Validators.required
			];
		}
	}

	removeElement(element) {
		let index;
		for (var i in this.formElements) {
			if (this.formElements[i].key == element.key) {
				index = i;
				this.formElements.splice(index, 1);

				this.openSnackBar(`Question Deleted!`);
			}
		}
	}

	openSnackBar(message) {
		this.snackBar.open(`${ message }`, 'close', { duration: 2000 });
	}
}
