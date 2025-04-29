import { NgModule } from '@angular/core';
import { VeterinarianComponent } from './veterinarian.component';
import { VeterinarianRoutingModule } from './veterinarian-routing.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [VeterinarianComponent],
  imports: [
	SharedModule,
	VeterinarianRoutingModule
  ],
  bootstrap: [VeterinarianComponent],
})
export class VeterinarianModule {}
