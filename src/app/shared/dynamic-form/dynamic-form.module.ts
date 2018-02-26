import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	MatInputModule,
	MatDatepickerModule,
	MatNativeDateModule,
	MatListModule,
	MatCardModule,
	MatProgressBarModule,
	MatRadioModule,
	MatCheckboxModule,
	MatButtonModule,
	MatIconModule,
	MatStepperModule,
	MatSelectModule,
	MatSlideToggleModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuillModule } from 'ngx-quill';

import { DynamicFormComponent } from './dynamic-form.component';

import { FormControlService } from './form-control.service';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatInputModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatListModule,
		MatCardModule,
		MatProgressBarModule,
		MatRadioModule,
		MatCheckboxModule,
		MatButtonModule,
		MatIconModule,
		MatStepperModule,
		MatSelectModule,
		FlexLayoutModule,
		QuillModule,
		MatSlideToggleModule
	],
	declarations: [
		DynamicFormComponent
	],
	providers: [
		FormControlService
	],
	exports: [
		DynamicFormComponent
	]
})
export class DynamicFormModule { }
