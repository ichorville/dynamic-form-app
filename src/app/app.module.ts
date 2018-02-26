import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from './shared/material/material.module';
import 'hammerjs';

import { FormCreatorModule } from './shared/form-creator/form-creator.module';

import { AppComponent } from './app.component';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		FormsModule, 
		ReactiveFormsModule,
		HttpModule,
		MaterialModule,
		FormCreatorModule
	],
	providers: [

	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule { }
