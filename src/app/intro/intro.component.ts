import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
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
export class IntroComponent implements OnInit {
  constructor(private projectService: ProjectService) {}
  ngOnInit() {
    this.init();
  }

  async init() {
    const project = await this.projectService.getPlayers();

    const player: PlayerElement | null =
      document.querySelector('shammas-player');

    // if (player != null) {
    //   player.initProject(project as Project);
    //   console.log(project)
    // }
  }

  onVideoEnd() {
    console.log('end');
  }

  onSequenceStarted(e: any) {
    console.log(e.detail);
  }
}
