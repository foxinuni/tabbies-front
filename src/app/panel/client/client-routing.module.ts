import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { ListingComponent as MyPetListingComponent } from '../../shared/my-pets/listing/listing.component';
import { ViewComponent as MyPetViewComponent } from '../../shared/my-pets/view/view.component';
import { PanelContext } from 'src/app/app-routing.module';

const routes: Routes = [
	{
		path: '',
		component: ClientComponent,
		children: [
			{ path: '', redirectTo: 'pets', pathMatch: 'full' },
			{ path: 'pets', component: MyPetListingComponent, data: { context: PanelContext.Client} },
			{ path: 'pets/:id', component: MyPetViewComponent, data: { context: PanelContext.Client} },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientRoutingModule {}
