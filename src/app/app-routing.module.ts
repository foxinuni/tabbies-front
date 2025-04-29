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

export function getPathForContext(context: PanelContext): string {
	switch (context) {
		case PanelContext.Admin:
			return '/admin';
		case PanelContext.Client:
			return '/client';
		case PanelContext.Veterinarian:
			return '/veterinarian';
	}

	return '/';
}

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent },
  { path: 'admin', loadChildren: () => import('./panel/admin/admin.module').then(m => m.AdminModule), data: { context: PanelContext.Admin } },
  { path: 'client', loadChildren: () => import('./panel/client/client.module').then(m => m.ClientModule), data: { context: PanelContext.Client} },
  { path: 'veterinarian', loadChildren: () => import('./panel/veterinarian/veterinarian.module').then(m => m.VeterinarianModule), data: { context: PanelContext.Veterinarian } },
  { path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
