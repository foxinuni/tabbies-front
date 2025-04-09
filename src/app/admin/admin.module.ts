import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AdminComponent } from './admin.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { HeaderComponent } from './header/header.component';
import { ListingComponent as PetListingComponent } from './pets/listing/listing.component';
import { CreateComponent as PetCreateComponent } from './pets/create/create.component';
import { EditComponent as PetEditComponent } from './pets/edit/edit.component';
import { ViewComponent as PetViewComponent } from './pets/view/view.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ListingComponent } from './users/listing/listing.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewComponent } from './users/userView/view.component';
import { UploadComponent } from './medicine/upload/upload.component';

@NgModule({
  declarations: [
    AdminComponent,
    HeaderComponent,
    PetListingComponent,
    PetCreateComponent,
    PetEditComponent,
    PetViewComponent,
    SidebarComponent,
    ListingComponent,
    ViewComponent,
    UploadComponent,
  ],
  imports: [
		HttpClientModule,
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ],
  bootstrap: [AdminComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // This is for Ionicons to work, do not remove :>
})
export class AdminModule { }
