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
  @Input() type: 'full' | 'square' | '' = '';
  @Input() position?:
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | '' = '';

  getImgClass() {
    if (this.img) {
      return `icon icon-${this.img}`;
    }
    return;
  }

  getClass() {
    return `${this.type} ${this.position}`;
  }
}
