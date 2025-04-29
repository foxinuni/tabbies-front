import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import { PanelComponent } from './panel/panel.component'
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ListingComponent as PetListingComponent } from './pets/listing/listing.component';
import { CreateComponent as PetCreateComponent } from './pets/create/create.component';
import { EditComponent as PetEditComponent } from './pets/edit/edit.component';
import { ViewComponent as PetViewComponent } from './pets/view/view.component';

import { ListingComponent as UserListingComponent } from './users/listing/listing.component';
import { ViewComponent as UserViewComponent } from './users/view/view.component';
import { EditComponent as UserEditComponent} from './users/edit/edit.component';
import { CreateComponent as UserCreateComponent } from './users/create/create.component';

import { ListingComponent as MyPetsListingComponent } from './my-pets/listing/listing.component';
import { ViewComponent as MyPetsViewComponent } from './my-pets/view/view.component';

import { UploadComponent as MedicineUploadComponent } from './medicine/upload/upload.component';

const declarations = [
	PanelComponent,
	HeaderComponent,
	SidebarComponent,
	DashboardComponent,

	PetListingComponent,
	PetCreateComponent,
	PetEditComponent,
	PetViewComponent,

	UserListingComponent,
	UserViewComponent,
	UserEditComponent,
	UserCreateComponent,

	MyPetsListingComponent,
	MyPetsViewComponent,

	MedicineUploadComponent,
];

@NgModule({
	declarations: declarations,
	exports: declarations,
	imports: [
		HttpClientModule,
		CommonModule,
		FormsModule,
		RouterModule
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA], // This is for Ionicons to work, do not remove :>
})
export class SharedModule { }
