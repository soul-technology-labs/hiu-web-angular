import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

import SoulHIU from '@soul-technology-labs/soul-hiu-js'
const soulClient = new SoulHIU({ apiKey: "", basePath: "http://13.233.129.208:5000/api/v1" })
const healthId = "vikram@sbx"

@Component({ selector: 'app', templateUrl: './consent-request.component.html', styleUrls: ['./consent-request.component.css'] })

export class ConsentRequest implements OnInit {
	form: FormGroup;
	submitted = false;
	Data: Array<any> = [
		{ name: 'Prescription', value: 'Prescription' },
		{ name: 'Diagnostic Report', value: 'DiagnosticReport' },
		{ name: 'OP Consultation', value: 'Observation' },
		{ name: 'Discharge Summary', value: 'DischargeSummary' }
	];
	purposeList = ['Care Management', 'Break the Glass',
		'Public Health', '	Healthcare Payment', 'Disease Specific Healthcare Research', 'Self Requested'];

	consentSource: string[]
	consentColumns: string[] = ['position', 'requestId', 'status', 'refresh', 'data'];
	dataSource: Array<any>
	dataColumns: string[] = ['position', 'requestId', 'status', 'refresh', 'data'];


	constructor(private formBuilder: FormBuilder, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
		iconRegistry.addSvgIcon(
			'refresh',
			sanitizer.bypassSecurityTrustResourceUrl('../../assets/images/refresh-24px.svg'));
	}

	ngOnInit() {
		this.form = this.formBuilder.group({
			healthId: [healthId, Validators.required],
			purpose: ["", Validators.required],
			checkbox: this.formBuilder.array([], [Validators.required]),
			fromDate: ["", Validators.required],
			toDate: ["", Validators.required],
			expiry: ["", Validators.required],

		});

		this.consentList(healthId)
		this.dataRequests(healthId)
	}

	// convenience getter for easy access to form fields
	get f() { return this.form.controls; }

	onCheckboxChange(e) {
		const checkArray: FormArray = this.form.get('checkbox') as FormArray;

		if (e.target.checked) {
			checkArray.push(new FormControl(e.target.value));
		} else {
			let i: number = 0;
			checkArray.controls.forEach((item: FormControl) => {
				if (item.value == e.target.value) {
					checkArray.removeAt(i);
					return;
				}
				i++;
			});
		}
	}

	onSubmit() {
		this.submitted = true;

		// stop here if form is invalid
		if (this.form.invalid) {
			return;
		}

		soulClient.consentInit(this.form.value).then((response) => {
			console.log(response)
			this.consentList(healthId)
			// display form values on success
			alert('SUCCESS!! :-)\n\n' + JSON.stringify(response, null, 4));
		})
	}

	onReset() {
		this.submitted = false;
		this.form.reset();
	}

	consentList(healthId) {
		soulClient.consentList(healthId).then((response) => {
			console.log(response)
			return this.consentSource = response
		}).catch((error) => { return error })
	}

	dataInit(requestId) {
		soulClient.dataInit(requestId).then((response) => {
			console.log(response)
			this.dataRequests(healthId)
		}).catch((error) => { return error })

	}

	dataRequests(healthId) {
		soulClient.dataRequestList(healthId).then((response) => {
			console.log(response)
			return this.dataSource = response.data
		}).catch((error) => { return error })
	}
}