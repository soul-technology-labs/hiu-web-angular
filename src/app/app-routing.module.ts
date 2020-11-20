import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsentRequest } from './consent-request/consent-request.component';


const routes: Routes = [
	{ path: 'consent-request', component: ConsentRequest }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
