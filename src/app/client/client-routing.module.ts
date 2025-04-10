import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { ListingComponent as PetListingComponent } from './pets/listing/listing.component';
import { ViewComponent as PetViewComponent } from './pets/view/view.component';

const routes: Routes = [
	{
		path: '',
		component: ClientComponent,
		children: [
			{ path: '', redirectTo: 'pets', pathMatch: 'full' },
			{ path: 'pets', component: PetListingComponent },
			{ path: 'pets/:id', component: PetViewComponent },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientRoutingComponent {}
