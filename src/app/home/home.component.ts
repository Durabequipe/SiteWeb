import { Component } from '@angular/core';
import { ProjectService } from '../services/project.service';
import '@shammas44/interactive-video-player';
import {
  Player as PlayerElement,
  Project,
} from '@shammas44/interactive-video-player';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-intro',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public videoPath =
    environment.baseUrl + '/storage/videos/standalones/desktop/home.mp4';
  constructor(private projectService: ProjectService) {
    document.body.addEventListener(
      'click',
      () => {
        const video = document.querySelector('video');
        video?.play();
      },
      { once: true }
    );
  }
}
