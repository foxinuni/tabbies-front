import { NgModule } from '@angular/core';
import { ClientComponent } from './client.component';
import { SharedModule } from '../shared/shared.module';
import { ClientRoutingModule } from './client-routing.module';


@NgModule({
  declarations: [ClientComponent],
  imports: [
	SharedModule,
	ClientRoutingModule
  ],
  bootstrap: [ClientComponent],
})
export class ClientModule {}
