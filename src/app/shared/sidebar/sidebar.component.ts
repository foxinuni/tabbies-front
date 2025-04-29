import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PanelContext } from 'src/app/app-routing.module';

interface SidebarItem {
	label: string;
	icon: string;
	route: string;
}

@Component({
	selector: 'sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
	public items: SidebarItem[] = [];

	constructor(
		private readonly route: ActivatedRoute,
	) {}

	public ngOnInit() {
		const { context } = this.route.snapshot.data;

		switch (context) {
			case PanelContext.Admin:
				this.items = [
					{ label: 'Dashboard', icon: 'stats-chart', route: '/admin/dashboard' },
					{ label: 'Mascotas', icon: 'paw', route: '/admin/pets' },
					{ label: 'Usuarios', icon: 'person', route: '/admin/users' },
					{ label: 'Medicamentos', icon: 'medkit', route: '/admin/medicine' },
				];
				break;
			case PanelContext.Client:
				this.items = [
					{ label: 'Mis Mascotas', icon: 'paw', route: '/client/pets' },
				];
				break;
			case PanelContext.Veterinarian:
				this.items = [
					{ label: 'Mascotas', icon: 'paw', route: '/admin/pets' },
					{ label: 'Usuarios', icon: 'person', route: '/admin/users' },
					{ label: 'Medicamentos', icon: 'medkit', route: '/admin/medicine' },
				];
				break;
			default:
				this.items = [];
				break;
		}
	}
}
