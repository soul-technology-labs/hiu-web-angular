import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

import SoulHIU from '@soul-technology-labs/soul-hiu-js'
const soulClient = new SoulHIU({ apiKey: "", basePath: "https://demohrp.soul.technology/api/v1" })
const healthId = "vikram@sbx"
const fromDate = "2020-10-20T00:40:35.705Z"
const toDate = "2020-11-16T23:40:35.705Z"

@Component({ selector: 'app', templateUrl: './consent-request.component.html', styleUrls: ['./consent-request.component.css'] })

export class ConsentRequest implements OnInit {
	form: FormGroup;
	submitted = false;
	Data: Array<any> = [
		{ name: 'Prescription', value: 'Prescription' },
		{ name: 'Diagnostic Report', value: 'DiagnosticReport' },
		{ name: 'OP Consultation', value: 'OPConsultation' },
		{ name: 'Discharge Summary', value: 'DischargeSummary' }
	];
	purposeList = ['Care Management', 'Break the Glass',
		'Public Health', '	Healthcare Payment', 'Disease Specific Healthcare Research', 'Self Requested'];

	consentSource: string[]
	consentColumns: string[] = ['position', 'requestId', 'status', 'refresh', 'data'];
	dataSource: Array<any>
	dataColumns: string[] = ['position', 'requestId', 'status', 'refresh', 'data'];
	fromDate: string
	toDate: string


	constructor(private formBuilder: FormBuilder, private router: Router, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
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

		this.refreshConsent()
		this.refreshData()
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

			this.refreshConsent()
			// display form values on success
			//alert('SUCCESS!! :-)\n\n' + JSON.stringify(response, null, 4));
		})
	}

	onReset() {
		this.submitted = false;
		this.form.reset();
	}

	refreshConsent() {
		this.consentList(healthId)

	}

	refreshData() {
		this.dataRequestList(healthId)
	}

	consentList(healthId) {
		soulClient.consentList(healthId).then((response) => {
			console.log(JSON.stringify(response))
			return this.consentSource = response
		}).catch((error) => { return error })
	} e

	dataInit(requestId) {
		soulClient.consentStatus(requestId).then((response) => {
			console.log("Consent Status: " + JSON.stringify(response[0].consentArtefactId[0]))
			soulClient.dataInit(response[0].consentArtefactId[0].id, fromDate, toDate).then((response) => {
				console.log(response)
				this.refreshData()
			}).catch((error) => { return error })
		}).catch((error) => { return error })
	}

	dataRequestList(healthId) {
		soulClient.dataRequestList(healthId).then((response) => {
			console.log(response)
			return this.dataSource = response.data
		}).catch((error) => { return error })
	}

	viewRecords(requestId) {
		soulClient.dataFetch(requestId).then((hiData) => {
			//console.log(JSON.stringify(hiData))

			this.router.navigate(['medical-records'], { state: { hiData: hiData.records[0].data } })
		}).catch((error) => { return error })

	}
} 