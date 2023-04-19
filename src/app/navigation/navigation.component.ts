import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  standalone:true,
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class NavigationComponent {
  @Input() position: 'top'|'bottom' = 'top';

}
