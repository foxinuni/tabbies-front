import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VeterinarianComponent } from './veterinarian.component';

import { ListingComponent as PetListingComponent } from '../../shared/pets/listing/listing.component';
import { CreateComponent as PetCreateComponent } from '../../shared/pets/create/create.component';
import { ViewComponent as PetViewComponent } from '../../shared/pets/view/view.component';
import { EditComponent as PetEditComponent } from '../../shared/pets/edit/edit.component';

import { ListingComponent as UserListingComponent } from '../../shared/users/listing/listing.component';
import { ViewComponent as UserViewComponent } from '../../shared/users/view/view.component';
import { EditComponent as UserEditComponent } from '../../shared/users/edit/edit.component';
import { CreateComponent as UserCreateComponent } from '../../shared/users/create/create.component';

import { CreateComponent } from '../../shared/procedures/create/create.component';

import { UploadComponent } from '../../shared/medicine/upload/upload.component';
import { PanelContext } from 'src/app/app-routing.module';

const routes: Routes = [
	{
		path: '',
		component: VeterinarianComponent,
		children: [
            { path: '', redirectTo: 'pets', pathMatch: 'full' },

			{ path: 'pets', component: PetListingComponent, data: { context: PanelContext.Veterinarian }  },
			{ path: 'pets/add', component: PetCreateComponent, data: { context: PanelContext.Veterinarian }  },
			{ path: 'pets/:id', component: PetViewComponent, data: { context: PanelContext.Veterinarian }  },
			{ path: 'pets/:id/edit', component: PetEditComponent, data: { context: PanelContext.Veterinarian }  },

			{ path: 'users', component: UserListingComponent, data: { context: PanelContext.Veterinarian }  },
			{ path: 'users/add', component: UserCreateComponent, data: { context: PanelContext.Veterinarian }  },
			{ path: 'users/:id', component: UserViewComponent, data: { context: PanelContext.Veterinarian } },
			{ path: 'users/:id/edit', component: UserEditComponent, data: { context: PanelContext.Veterinarian }  },

			{ path: 'medicine', component: UploadComponent },
			{ path: 'procedures/:id', component: CreateComponent}
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class VeterinarianRoutingModule {}
