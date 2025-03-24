import { Component, Input } from '@angular/core';

@Component({
  selector: 'home-services-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() title: string = 'Default Title';
  @Input() description: string = 'Default Description';
  @Input() icon: string = 'default-icon.png';
  @Input() alt: string = 'Default Alt Text';
}
