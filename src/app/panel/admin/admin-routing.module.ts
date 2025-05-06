import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { PanelContext } from 'src/app/app-routing.module';

import { DashboardComponent } from '../../shared/dashboard/dashboard.component';

import { ListingComponent as PetListingComponent } from '../../shared/pets/listing/listing.component';
import { CreateComponent as PetCreateComponent } from '../../shared/pets/create/create.component';
import { ViewComponent as PetViewComponent } from '../../shared/pets/view/view.component';
import { EditComponent as PetEditComponent } from '../../shared/pets/edit/edit.component';
import { CreateComponent as PetProcedureComponent } from '../../shared/pets/procedure/create.component';

import { ListingComponent as UserListingComponent } from '../../shared/users/listing/listing.component';
import { ViewComponent as UserViewComponent } from '../../shared/users/view/view.component';
import { EditComponent as UserEditComponent } from '../../shared/users/edit/edit.component';
import { CreateComponent as UserCreateComponent } from '../../shared/users/create/create.component';

import { ListingComponent as VetListingComponent } from '../../shared/veterinarian/listing/listing.component';
import { ViewComponent as VetViewComponent } from '../../shared/veterinarian/view/view.component';
import { EditComponent as VetEditComponent } from '../../shared/veterinarian/edit/edit.component';
import { CreateComponent as VetCreateComponent } from '../../shared/veterinarian/create/create.component';

import { UploadComponent } from '../../shared/medicine/upload/upload.component';

const routes: Routes = [
	{
		path: '',
		component: AdminComponent,
		children: [
            { path: '', redirectTo: 'pets', pathMatch: 'full' },

			{ path: 'dashboard', component: DashboardComponent, data: { context: PanelContext.Admin } },

			{ path: 'pets', component: PetListingComponent, data: { context: PanelContext.Admin } },
			{ path: 'pets/add', component: PetCreateComponent, data: { context: PanelContext.Admin } },
			{ path: 'pets/:id', component: PetViewComponent, data: { context: PanelContext.Admin } },
			{ path: 'pets/:id/edit', component: PetEditComponent, data: { context: PanelContext.Admin } },
			{ path: 'pets/:id/procedure', component: PetProcedureComponent, data: { context: PanelContext.Admin } },


			{ path: 'users', component: UserListingComponent, data: { context: PanelContext.Admin } },
			{ path: 'users/add', component: UserCreateComponent, data: { context: PanelContext.Admin } },
			{ path: 'users/:id', component: UserViewComponent, data: { context: PanelContext.Admin } },
			{ path: 'users/:id/edit', component: UserEditComponent, data: { context: PanelContext.Admin } },

			{ path: 'medicine', component: UploadComponent, data: { context: PanelContext.Admin } },

			{ path: 'veterinarians', component: VetListingComponent, data: { context: PanelContext.Admin } },
			{ path: 'veterinarians/add', component: VetCreateComponent, data: { context: PanelContext.Admin } },
			{ path: 'veterinarians/:id', component: VetViewComponent, data: { context: PanelContext.Admin } },
			{ path: 'veterinarians/:id/edit', component: VetEditComponent, data: { context: PanelContext.Admin } },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminRoutingModule {}
