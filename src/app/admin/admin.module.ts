import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { HeaderComponent } from './header/header.component';
import { ListingComponent as PetListingComponent } from './pets/listing/listing.component';
import { CreateComponent as PetCreateComponent } from './pets/create/create.component';
import { EditComponent as PetEditComponent } from './pets/edit/edit.component';
import { ViewComponent as PetViewComponent } from './pets/view/view.component';

@NgModule({
  declarations: [
    AdminComponent,
    HeaderComponent,
    PetListingComponent,
    PetCreateComponent,
    PetEditComponent,
    PetViewComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ],
  bootstrap: [AdminComponent]
})
export class AdminModule { }
