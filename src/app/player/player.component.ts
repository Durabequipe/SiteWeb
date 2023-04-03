import { Component, OnInit  } from '@angular/core';
import { ProjectService } from '../services/project.service';
import '@shammas44/interactive-video-player';
import {
  Player as PlayerElement,
  Project,
} from '@shammas44/interactive-video-player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  constructor(
    private projectService: ProjectService,
  ) {}
  ngOnInit() {
    this.init();
  }

  async init() {
    const project = await this.projectService.getPlayer(
      '98cdc820-e51e-4636-9ada-bb3d7e132f4a'
    );

    const player: PlayerElement | null =
      document.querySelector('shammas-player');


    if (player != null) {
      player.initProject(project as Project);
    }
  }
}
