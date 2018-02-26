import { FormElement } from './form-element';

export class FormDatepicker extends FormElement<string> {
    controlType: string;

	constructor(options: {} = {}) {
		super(options);
		this.controlType = 'datepicker';
	}
}
