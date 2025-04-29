import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { ListingComponent as MyPetListingComponent } from '../../shared/my-pets/listing/listing.component';
import { ViewComponent as MyPetViewComponent } from '../../shared/my-pets/view/view.component';

const routes: Routes = [
	{
		path: '',
		component: ClientComponent,
		children: [
			{ path: '', redirectTo: 'pets', pathMatch: 'full' },
			{ path: 'pets', component: MyPetListingComponent },
			{ path: 'pets/:id', component: MyPetViewComponent },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientRoutingModule {}
