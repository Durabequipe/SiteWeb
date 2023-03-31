import { Component } from '@angular/core';
import { Player } from './player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  constructor() {
    new Player('player', '5c9f5b5b-5b9f-5b9f-5b9f-5b9f5b9f5b9f');
  }
}
