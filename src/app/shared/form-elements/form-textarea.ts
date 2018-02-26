import { FormElement } from './form-element';

export class FormTextarea extends FormElement<string> {
    controlType: string;

	constructor(options: {} = {}) {
		super(options);
		this.controlType = 'textarea';
	}
}
