import { Component, OnInit } from '@angular/core'
import { Router, NavigationExtras } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';


@Component({ selector: 'app', templateUrl: './medical-records.component.html', styleUrls: ['./medical-records.component.css'] })


export class MedicalRecords implements OnInit {

	dataSource: any
	records: any

	constructor(private router: Router) { }

	ngOnInit() {

		this.dataSource = JSON.parse(history.state.hiData);
		this.records = this.dataSource.entry
		console.log("on medical records")
		console.log(this.records)
	}
}