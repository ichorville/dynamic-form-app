import { FormElement } from './form-element';

export class FormTextbox extends FormElement<string> {
	controlType: string;
	type: string;

	constructor(options: {} = {}) {
		super(options);
		this.controlType = options['controlType'] || '';
		this.type = options['type'] || '';
	}
}
