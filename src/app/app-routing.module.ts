import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';

export enum PanelContext {
	Admin = 'admin',
	Client = 'client',
	Veterinarian = 'veterinarian',
};

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), data: { context: 'admin' } },
  { path: 'client', loadChildren: () => import('./client/client.module').then(m => m.ClientModule), data: { context: 'client' } },
  { path: 'veterinarian', loadChildren: () => import('./veterinarian/veterinarian.module').then(m => m.VeterinarianModule), data: { context: 'veterinarian' } },
  { path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
