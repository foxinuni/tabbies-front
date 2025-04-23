import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { VeterinarianComponent } from './veterinarian.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VeterinarianRoutingModule } from './veterinarian-routing.module';
import { HeaderComponent } from './header/header.component';
import { ListingComponent as PetListingComponent } from './pets/listing/listing.component';
import { CreateComponent as PetCreateComponent } from './pets/create/create.component';
import { EditComponent as PetEditComponent } from './pets/edit/edit.component';
import { ViewComponent as PetViewComponent } from './pets/view/view.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ListingComponent } from './users/listing/listing.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewComponent } from './users/view/view.component';
import { UploadComponent } from './medicine/upload/upload.component';
import { EditComponent } from './users/edit/edit.component';
import { CreateComponent } from './users/create/create.component';

@NgModule({
  declarations: [
    VeterinarianComponent,
    HeaderComponent,
    PetListingComponent,
    PetCreateComponent,
    PetEditComponent,
    PetViewComponent,
    SidebarComponent,
    ListingComponent,
    ViewComponent,
    UploadComponent,
    EditComponent,
    CreateComponent,
  ],
  imports: [
	HttpClientModule,
    CommonModule,
    VeterinarianRoutingModule,
    FormsModule
  ],
  bootstrap: [VeterinarianComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // This is for Ionicons to work, do not remove :>
})
export class VeterinarianModule { }
