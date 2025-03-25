import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './admin/pets/create/create.component';
import { ViewComponent } from './admin/pets/view/view.component';
import { EditComponent } from './admin/pets/edit/edit.component';
import { ListingComponent } from './admin/pets/listing/listing.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'admin/pets', component: ListingComponent },
  { path: 'admin/pets/add', component: CreateComponent },
  { path: 'admin/pets/:id', component: ViewComponent },     
  { path: 'admin/pets/:id/edit', component: EditComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
