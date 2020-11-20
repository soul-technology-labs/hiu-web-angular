import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsentRequest } from './consent-request/consent-request.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";

import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from "@angular/material/icon";
import { HttpClientModule } from "@angular/common/http";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';


@NgModule({
	declarations: [
		AppComponent,
		ConsentRequest
	],
	imports: [
		BrowserModule,
		FormsModule,
		FlexLayoutModule,
		ReactiveFormsModule,
		AppRoutingModule,
		MatTableModule,
		MatIconModule,
		HttpClientModule,
		MatGridListModule,
		MatDividerModule,
		MatCardModule

	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
