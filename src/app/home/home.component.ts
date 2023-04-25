import { Component } from '@angular/core';
import { ProjectService } from '../services/project.service';
import '@shammas44/interactive-video-player';
import {
  Player as PlayerElement,
  Project,
} from '@shammas44/interactive-video-player';

@Component({
  selector: 'app-intro',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public videoPath =
    'https://admin.durabilia.tarrit.ch/storage/videos/standalones/desktop/home.mp4';
  constructor(private projectService: ProjectService) {
    document.body.addEventListener(
      'click',
      () => {
        const video = document.querySelector('video');
        video?.play()
        console.log(video);
      },
      { once: true }
    );
  }
}
