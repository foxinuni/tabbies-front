import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ClientComponent } from './client.component';
import { ClientRoutingComponent } from './client-routing.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ListingComponent as PetListingComponent } from './pets/listing/listing.component';
import { ViewComponent as PetViewComponent } from './pets/view/view.component';


@NgModule({
  declarations: [
    ClientComponent,
    HeaderComponent,
    SidebarComponent,
	PetListingComponent,
	PetViewComponent
  ],
  imports: [
	HttpClientModule,
    CommonModule,
    ClientRoutingComponent,
    FormsModule
  ],
  bootstrap: [ClientComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // This is for Ionicons to work, do not remove :>
})
export class ClientModule { }
