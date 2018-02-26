import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule} from '@angular/flex-layout';
import { QuillModule } from 'ngx-quill';

import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { MaterialModule } from '../material/material.module';

import { FormCreatorComponent } from './form-creator.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule, 
		ReactiveFormsModule,
		MaterialModule,
		FlexLayoutModule,
		QuillModule,
		DynamicFormModule
	],
	declarations: [
		FormCreatorComponent
	],
	exports: [
		FormCreatorComponent
	]
})
export class FormCreatorModule { }
