import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() text = '';
  @Input() img?: string;
  @Input() link = '';

  getImgSrc() {
    const imgSrc = this?.img ?? '';
    return imgSrc ? `assets/${imgSrc}.svg` : '';
  }
}
