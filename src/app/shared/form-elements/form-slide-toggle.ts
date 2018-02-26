import { FormElement } from './form-element';

export class FormSlideToggle extends FormElement<string> {
    controlType: string;

	constructor(options: {} = {}) {
		super(options);
		this.controlType = 'slide-toggle';
	}
}
