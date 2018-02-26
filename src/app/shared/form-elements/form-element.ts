export class FormElement<T> {
	value: T;
	key: string;
	label: string;
	required: boolean;
	order: number;
	disabled?: boolean
	controlType: string;
	placeholder: string;
	validators: any[];
	errors: string[];

	constructor(options: {
		value?: T,
		key?: string,
		label?: string,
		required?: boolean,
		order?: number,
		disabled?: boolean,
		controlType?: string,
		placeholder?: string,
		validators?: any[]
	} = {}) {
		this.value = options.value;
		this.key = options.key || '';
		this.label = options.label || '';
		this.required = !!options.required;
		this.order = options.order === undefined ? 1 : options.order;
		this.disabled = options.disabled || false;
		this.controlType = options.controlType || '';
		this.placeholder = options.placeholder || '';
		this.validators = options.validators || [];
		this.errors = [];
	}
}
