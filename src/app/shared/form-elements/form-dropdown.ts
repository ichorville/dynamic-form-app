import { FormElement } from './form-element';

export class FormDropdown extends FormElement<string> {
	controlType: string;
	options: { key: string, value: string }[];
	filter?: { parent: string, child: string };

	constructor(options: {} = {}) {
		super(options);
		this.controlType = 'dropdown';
		this.options = options['options'] || [];
		this.filter = options['filter'] || [];
	}
}