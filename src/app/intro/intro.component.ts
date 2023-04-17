import { Component } from '@angular/core';
import '@shammas44/interactive-video-player';
import {
  Player as PlayerElement,
  Project,
} from '@shammas44/interactive-video-player';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent {
  onVideoEnd() {
    console.log("yo");
  }
}
