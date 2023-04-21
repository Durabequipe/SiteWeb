import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone:true, 
  imports:[RouterLink,CommonModule],
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() text = '';
  @Input() img?: string;
  @Input() link = '';
  @Input() type: 'full' | 'full-sm'| 'square' | '' = '';
  @Input() callback?: () => void;
  @Input() externalLink? = false;
  @Input() color? = '';


  getImgClass() {
    if (this.img) {
      return `icon icon-${this.img}`;
    }
    return;
  }

  getClass() {
    return `${this.type}`;
  }

  onClick() {
    if (this.callback) {
      this.callback();
    }
  }
}
