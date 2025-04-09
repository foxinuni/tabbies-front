import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingComponent as PetListingComponent } from './pets/listing/listing.component';
import { CreateComponent as PetCreateComponent } from './pets/create/create.component';
import { ViewComponent as PetViewComponent } from './pets/view/view.component';
import { EditComponent as PetEditComponent } from './pets/edit/edit.component';
import { AdminComponent } from './admin.component';
import { ListingComponent as UserListingComponent } from './users/listing/listing.component';
import { ViewComponent as UserViewComponent } from './users/userView/view.component';
import { UploadComponent } from './medicine/upload/upload.component';

const routes: Routes = [
	{
		path: '',
		component: AdminComponent,
		children: [
            { path: '', redirectTo: 'pets', pathMatch: 'full' },
			{ path: 'pets', component: PetListingComponent },
			{ path: 'pets/add', component: PetCreateComponent },
			{ path: 'pets/:id', component: PetViewComponent },
			{ path: 'pets/:id/edit', component: PetEditComponent },
			{ path: 'users', component: UserListingComponent },
			{ path: 'users/:id', component: UserViewComponent},
			{ path: 'medicine', component: UploadComponent },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminRoutingModule {}
