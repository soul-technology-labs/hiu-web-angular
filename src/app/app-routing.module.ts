import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsentRequest } from './consent-request/consent-request.component';
import { MedicalRecords } from './medical-records/medical-records.component';

const routes: Routes = [
	{ path: 'consent-request', component: ConsentRequest },
	{ path: 'medical-records', component: MedicalRecords }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
