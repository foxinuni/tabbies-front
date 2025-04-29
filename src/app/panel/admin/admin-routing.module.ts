import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

import { DashboardComponent } from '../../shared/dashboard/dashboard.component';

import { ListingComponent as PetListingComponent } from '../../shared/pets/listing/listing.component';
import { CreateComponent as PetCreateComponent } from '../../shared/pets/create/create.component';
import { ViewComponent as PetViewComponent } from '../../shared/pets/view/view.component';
import { EditComponent as PetEditComponent } from '../../shared/pets/edit/edit.component';

import { ListingComponent as UserListingComponent } from '../../shared/users/listing/listing.component';
import { ViewComponent as UserViewComponent } from '../../shared/users/view/view.component';
import { EditComponent as UserEditComponent } from '../../shared/users/edit/edit.component';
import { CreateComponent as UserCreateComponent } from '../../shared/users/create/create.component';

import { UploadComponent } from '../../shared/medicine/upload/upload.component';

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
			{ path: 'users/add', component: UserCreateComponent },
			{ path: 'users/:id', component: UserViewComponent},
			{ path: 'users/:id/edit', component: UserEditComponent },

			{ path: 'medicine', component: UploadComponent },

			{ path: 'dashboard',component: DashboardComponent }

		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminRoutingModule {}
