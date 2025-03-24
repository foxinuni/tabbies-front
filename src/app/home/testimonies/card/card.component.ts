import { Component, Input } from '@angular/core';

@Component({
  selector: 'home-testimonies-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() title: string = 'Default Title';
  @Input() description: string = 'Default Description';
  @Input() image: string = 'default-icon.png';
  @Input() alt: string = 'Default Alt Text';
}
